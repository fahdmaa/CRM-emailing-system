import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats as DashboardStatsType } from "@/types"

interface StatusChartProps {
  stats: DashboardStatsType
}

export function StatusChart({ stats }: StatusChartProps) {
  const chartData = [
    { name: "Invited", value: stats.invited, color: "#3b82f6" },
    { name: "Signed Up", value: stats.signedUp, color: "#10b981" },
    { name: "Need Reminder", value: stats.needReminder, color: "#f59e0b" },
    { name: "Not Coming", value: stats.notComing, color: "#ef4444" },
    { name: "Blacklisted", value: stats.blacklisted, color: "#6b7280" },
  ]

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chartData.map((item) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0
            return (
              <div key={item.name} className="flex items-center space-x-4">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.value} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="h-2 rounded-full"
                      style={{ 
                        backgroundColor: item.color,
                        width: `${percentage}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}