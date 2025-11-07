import { useState, useEffect } from "react";
import { Menu, User, AlertCircle, FileText, Settings, LogOut, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "./LanguageProvider";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || t.emergencyUser
  );

  const userMode = localStorage.getItem("userMode") || "anonymous";

  useEffect(() => {
    const handleProfileImageUpdate = (event: CustomEvent) => {
      setProfileImage(event.detail.imageUrl);
    };

    const handleProfileNameUpdate = (event: CustomEvent) => {
      setUserName(event.detail.userName);
    };

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate as EventListener);
    window.addEventListener("profileNameUpdated", handleProfileNameUpdate as EventListener);

    return () => {
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate as EventListener);
      window.removeEventListener("profileNameUpdated", handleProfileNameUpdate as EventListener);
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
  };

  const handleMenuClick = (page: string, label: string) => {
    // If clicking on the currently active page, just close the menu
    if (currentPage === page) {
      setOpen(false);
      return;
    }
    
    // Otherwise, close menu and navigate
    setOpen(false);
    onNavigate(page);
  };

  const menuItems = [
    { icon: AlertCircle, label: t.home, page: "home" },
    // Show different menu item based on user mode
    userMode === "volunteer" 
      ? { icon: CheckCircle2, label: t.reportsReviewed, page: "reports-reviewed" }
      : { icon: Clock, label: t.previousReports, page: "previous-reports" },
    { icon: Settings, label: t.settings, page: "settings" },
    { icon: LogOut, label: t.logout, page: "logout" },
  ];

  return (
    <header className="w-full flex items-center justify-between p-4 bg-card border-b">
      {/* Hamburger Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>{t.menu}</SheetTitle>
            <SheetDescription>{t.menuDescription}</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-2 mt-6">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant={currentPage === item.page ? "secondary" : "ghost"}
                className="justify-start gap-3"
                onClick={() => handleMenuClick(item.page, item.label)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Greeting */}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-medium text-foreground">{getGreeting()}</h1>
      </div>

      {/* User Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profileImage || undefined} alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">
                {userMode === "anonymous" ? t.anonymousUser : t.userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onNavigate("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t.settings}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => onNavigate("logout")}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t.logout}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}