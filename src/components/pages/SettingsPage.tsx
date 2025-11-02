import { User, Bell, Shield, Globe, Moon, Lock, Camera, Upload } from "lucide-react";
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
        toast.error(t.imageTooLarge);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setProfileImage(imageDataUrl);
        localStorage.setItem("profileImage", imageDataUrl);
        toast.success(t.profilePictureUpdated);
        
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
    toast.success(t.profilePictureRemoved);
    
    // Dispatch custom event to update header avatar
    window.dispatchEvent(new CustomEvent("profileImageUpdated", { 
      detail: { imageUrl: null } 
    }));
  };

  return (
    <div className="space-y-6">
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
            <Label>{t.profilePicture}</Label>
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
                  {t.uploadPhoto}
                </Button>
                {profileImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="w-full sm:w-auto"
                  >
                    {t.removePhoto}
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">
                  {t.profilePictureHint}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="name">{t.fullName}</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t.phoneNumber}</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <Button onClick={() => toast.success(t.profileUpdated)}>
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
              <Label>{t.emailNotifications}</Label>
              <p className="text-sm text-muted-foreground">{t.receiveEmailUpdates}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.pushNotifications}</Label>
              <p className="text-sm text-muted-foreground">{t.receivePushNotifications}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.certificateExpiryAlerts}</Label>
              <p className="text-sm text-muted-foreground">{t.notifyBeforeExpiry}</p>
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
              <Label>{t.twoFactorAuth}</Label>
              <p className="text-sm text-muted-foreground">{t.extraLayerSecurity}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info(t.twoFactorComingSoon)}
            >
              {t.enable}
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.changePassword}</Label>
              <p className="text-sm text-muted-foreground">{t.updatePasswordRegularly}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info(t.passwordChangeComingSoon)}
            >
              {t.change}
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
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
