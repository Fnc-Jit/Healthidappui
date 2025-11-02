import { FileText, Bell, Shield, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useLanguage } from "../LanguageProvider";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();
  
  const quickActions = [
    {
      icon: FileText,
      title: t.myCertificates,
      description: t.viewAllCertificates,
      action: "certificates",
      color: "text-blue-600"
    },
    {
      icon: Bell,
      title: t.notifications,
      description: t.checkRecentUpdates,
      action: "notifications",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: t.healthRecords,
      description: t.accessMedicalHistory,
      action: "certificates",
      color: "text-green-600"
    },
    {
      icon: Activity,
      title: t.healthTracking,
      description: t.monitorVitalSigns,
      action: "certificates",
      color: "text-red-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">{t.welcomeToPortal}</h2>
        <p className="text-muted-foreground">{t.manageHealthDocuments}</p>
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
          <CardTitle>{t.recentActivity}</CardTitle>
          <CardDescription>{t.latestHealthUpdates}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{t.covid19Certificate}</p>
                <p className="text-sm text-muted-foreground">{t.addedWeeksAgo}</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">{t.valid}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{t.annualCheckup}</p>
                <p className="text-sm text-muted-foreground">{t.addedMonthAgo}</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">{t.valid}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
