import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock, UserX, Ban } from "lucide-react"
import { DashboardStats as DashboardStatsType } from "@/types"

interface DashboardStatsProps {
  stats: DashboardStatsType
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Signed Up",
      value: stats.signedUp,
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Need Reminder",
      value: stats.needReminder,
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Not Coming",
      value: stats.notComing,
      icon: UserX,
      color: "text-red-600"
    }
  ]

  return (
    <>
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.title === "Total Contacts" && "Total registered contacts"}
                {stat.title === "Signed Up" && "Confirmed attendees"}
                {stat.title === "Need Reminder" && "Require follow-up"}
                {stat.title === "Not Coming" && "Declined invitations"}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}