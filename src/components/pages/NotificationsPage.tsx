import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "success",
      icon: CheckCircle,
      title: "Certificate Verified",
      message: "Your COVID-19 Vaccination Certificate has been verified successfully.",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "warning",
      icon: AlertCircle,
      title: "Certificate Expiring Soon",
      message: "Your Blood Test Results certificate will expire in 7 days. Please renew.",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      type: "info",
      icon: Info,
      title: "New Health Guidelines",
      message: "Updated health and safety guidelines are now available for review.",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      type: "success",
      icon: CheckCircle,
      title: "Document Uploaded",
      message: "Your Annual Health Checkup Report has been uploaded successfully.",
      time: "2 days ago",
      read: true
    },
    {
      id: 5,
      type: "info",
      icon: Info,
      title: "System Maintenance",
      message: "Scheduled maintenance on Sunday, 2 AM - 4 AM EST.",
      time: "3 days ago",
      read: true
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your health records</p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="default" className="bg-blue-600">
            {unreadCount} New
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>
                  <notification.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium">{notification.title}</h3>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
