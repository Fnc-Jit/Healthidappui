import { User, Bell, Shield, Globe, Moon, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useTheme } from "../ThemeProvider";
import { toast } from "sonner@2.0.3";

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleDarkModeToggle = () => {
    toggleTheme();
    toast.success(`${isDarkMode ? "Light" : "Dark"} mode enabled`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <Button onClick={() => toast.success("Profile updated successfully")}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Certificate Expiry Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified before certificates expire</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info("Two-factor authentication setup coming soon")}
            >
              Enable
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Change Password</Label>
              <p className="text-sm text-muted-foreground">Update your password regularly</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info("Password change coming soon")}
            >
              Change
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how the app looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                {isDarkMode ? "Dark theme is active" : "Switch to dark theme"}
              </p>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={handleDarkModeToggle} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Language</Label>
              <p className="text-sm text-muted-foreground">English (US)</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info("Language selection coming soon")}
            >
              <Globe className="h-4 w-4 mr-2" />
              Change
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
