import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmailLogWithRelations } from "@/types"
import { formatDateTime, getEmailStatusColor } from "@/lib/utils"

interface RecentActivityProps {
  recentActivity: EmailLogWithRelations[]
}

export function RecentActivity({ recentActivity }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((log) => (
              <div key={log.id} className="flex items-center space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {log.contact.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {log.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(log.createdAt)}
                  </p>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${getEmailStatusColor(log.status)}`}>
                  {log.status}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}