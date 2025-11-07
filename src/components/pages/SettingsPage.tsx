import { User, Bell, Shield, Globe, Moon, Lock, Camera, Upload, Wifi, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "../ThemeProvider";
import { useLanguage } from "../LanguageProvider";
import { Language, languageNames } from "../translations";
import { toast } from "sonner@2.0.3";
import { useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const isDarkMode = theme === "dark";
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Profile form state
  const [fullName, setFullName] = useState<string>(
    localStorage.getItem("userName") || ""
  );
  const [email, setEmail] = useState<string>(
    localStorage.getItem("userEmail") || ""
  );
  const [phone, setPhone] = useState<string>(
    localStorage.getItem("userPhone") || ""
  );

  const handleDarkModeToggle = () => {
    toggleTheme();
    toast.success(isDarkMode ? t.lightModeEnabled : t.darkModeEnabled);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast.success(t.languageChanged);
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.imageTooLarge || "Image size must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setProfileImage(imageDataUrl);
        localStorage.setItem("profileImage", imageDataUrl);
        toast.success(t.profilePictureUpdated || "Profile picture updated successfully");
        
        // Dispatch custom event to update header avatar
        window.dispatchEvent(new CustomEvent("profileImageUpdated", { 
          detail: { imageUrl: imageDataUrl } 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem("profileImage");
    toast.success(t.profilePictureRemoved || "Profile picture removed successfully");
    
    // Dispatch custom event to update header avatar
    window.dispatchEvent(new CustomEvent("profileImageUpdated", { 
      detail: { imageUrl: null } 
    }));
  };

  const handleSaveProfile = () => {
    // Save profile information to localStorage
    if (fullName.trim()) {
      localStorage.setItem("userName", fullName.trim());
    }
    if (email.trim()) {
      localStorage.setItem("userEmail", email.trim());
    }
    if (phone.trim()) {
      localStorage.setItem("userPhone", phone.trim());
    }

    // Dispatch custom event to update header name
    window.dispatchEvent(new CustomEvent("profileNameUpdated", { 
      detail: { userName: fullName.trim() } 
    }));

    toast.success(t.profileUpdated);
  };

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h2 className="text-2xl mb-2">{t.settings}</h2>
        <p className="text-muted-foreground">{t.manageAccount}</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t.profileInformation}
          </CardTitle>
          <CardDescription>{t.updatePersonalInfo}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Picture Section */}
          <div className="space-y-2">
            <Label>{t.profilePicture || "Profile Picture"}</Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImage || undefined} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleProfileImageClick}
                  className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-colors"
                  aria-label="Change profile picture"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  aria-label="Upload profile picture"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleProfileImageClick}
                  className="w-full sm:w-auto"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {t.uploadPhoto || "Upload Photo"}
                </Button>
                {profileImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="w-full sm:w-auto"
                  >
                    {t.removePhoto || "Remove Photo"}
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">
                  {t.profilePictureHint || "JPG, PNG or GIF (max. 5MB)"}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="name">{t.fullName}</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t.phoneNumber}</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveProfile}>
            {t.saveChanges}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t.notificationPreferences}
          </CardTitle>
          <CardDescription>{t.chooseNotifications}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.emergencyAlerts}</Label>
              <p className="text-sm text-muted-foreground">{t.emergencyAlertsDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.reportStatusUpdates}</Label>
              <p className="text-sm text-muted-foreground">{t.reportStatusUpdatesDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.verificationNotifications}</Label>
              <p className="text-sm text-muted-foreground">{t.verificationNotificationsDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.smsFallback}</Label>
              <p className="text-sm text-muted-foreground">{t.smsFallbackDesc}</p>
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
            {t.privacySecurity}
          </CardTitle>
          <CardDescription>{t.manageSecuritySettings}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.locationPrivacy}</Label>
              <p className="text-sm text-muted-foreground">{t.locationPrivacyDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.anonymousReporting}</Label>
              <p className="text-sm text-muted-foreground">{t.anonymousReportingDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.dataSharing}</Label>
              <p className="text-sm text-muted-foreground">{t.dataSharingDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.clearReportHistory}</Label>
              <p className="text-sm text-muted-foreground">{t.clearReportHistoryDesc}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info(t.clearReportHistory)}
            >
              {t.clear}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data & Offline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t.dataOffline}
          </CardTitle>
          <CardDescription>{t.dataOfflineDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.autoSyncReports}</Label>
              <p className="text-sm text-muted-foreground">{t.autoSyncReportsDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.offlineModeToggle}</Label>
              <p className="text-sm text-muted-foreground">{t.offlineModeToggleDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.photoCompression}</Label>
              <p className="text-sm text-muted-foreground">{t.photoCompressionDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.clearLocalData}</Label>
              <p className="text-sm text-muted-foreground">{t.clearLocalDataDesc}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info(t.clearLocalData)}
            >
              {t.clear}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            {t.appearance}
          </CardTitle>
          <CardDescription>{t.customizeAppLooks}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.darkMode}</Label>
              <p className="text-sm text-muted-foreground">
                {isDarkMode ? t.darkThemeActive : t.switchToDarkTheme}
              </p>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={handleDarkModeToggle} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1">
              <Label>{t.language}</Label>
              <p className="text-sm text-muted-foreground">{t.selectLanguage}</p>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[200px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{languageNames.en}</SelectItem>
                <SelectItem value="hi">{languageNames.hi}</SelectItem>
                <SelectItem value="kn">{languageNames.kn}</SelectItem>
                <SelectItem value="ml">{languageNames.ml}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
