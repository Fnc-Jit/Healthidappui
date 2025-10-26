import { FileText, Bell, Shield, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const quickActions = [
    {
      icon: FileText,
      title: "My Certificates",
      description: "View all health certificates",
      action: "certificates",
      color: "text-blue-600"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Check recent updates",
      action: "notifications",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Health Records",
      description: "Access medical history",
      action: "certificates",
      color: "text-green-600"
    },
    {
      icon: Activity,
      title: "Health Tracking",
      description: "Monitor vital signs",
      action: "certificates",
      color: "text-red-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Welcome to Your Health Portal</h2>
        <p className="text-muted-foreground">Manage your health documents and records in one place</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Card 
            key={action.title}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate(action.action)}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${action.color}`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-[16px]">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest health updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">COVID-19 Vaccination Certificate</p>
                <p className="text-sm text-muted-foreground">Added 2 weeks ago</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">Valid</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Annual Health Checkup Report</p>
                <p className="text-sm text-muted-foreground">Added 1 month ago</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">Valid</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
