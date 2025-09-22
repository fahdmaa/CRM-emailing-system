import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { StatusChart } from '@/components/dashboard/StatusChart'

async function getDashboardData() {
  const [contacts, emailLogs] = await Promise.all([
    prisma.contact.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    }),
    prisma.emailLog.findMany({
      include: {
        contact: true,
        event: true,
        template: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })
  ])

  const stats = {
    totalContacts: contacts.reduce((sum, group) => sum + group._count.id, 0),
    signedUp: contacts.find(g => g.status === 'SIGNED_UP')?._count.id || 0,
    needReminder: contacts.find(g => g.status === 'NEED_REMINDER')?._count.id || 0,
    notComing: contacts.find(g => g.status === 'NOT_COMING')?._count.id || 0,
    blacklisted: contacts.find(g => g.status === 'BLACKLISTED')?._count.id || 0,
    invited: contacts.find(g => g.status === 'INVITED')?._count.id || 0,
    totalEmailsSent: emailLogs.length,
    recentActivity: emailLogs
  }

  return stats
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const stats = await getDashboardData()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats stats={stats} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <StatusChart stats={stats} />
        </div>
        <div className="col-span-3">
          <RecentActivity recentActivity={stats.recentActivity} />
        </div>
      </div>
    </div>
  )
}