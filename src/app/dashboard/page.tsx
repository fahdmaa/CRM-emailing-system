import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

// Simple dashboard page for deployment
export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  // Temporary simple stats for build
  const stats = {
    totalContacts: 0,
    signedUp: 0,
    needReminder: 0,
    notComing: 0,
    blacklisted: 0,
    invited: 0,
    totalEmailsSent: 0,
    recentActivity: []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold">Total Contacts</h3>
          <p className="text-2xl font-bold">{stats.totalContacts}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold">Signed Up</h3>
          <p className="text-2xl font-bold text-green-600">{stats.signedUp}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold">Need Reminder</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.needReminder}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold">Not Coming</h3>
          <p className="text-2xl font-bold text-red-600">{stats.notComing}</p>
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Welcome to Event Invitation Dashboard</h3>
        <p className="text-gray-600">
          Your dashboard is ready! Set up your database connection and start managing your event invitations.
        </p>
      </div>
    </div>
  )
}