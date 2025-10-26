import { useState } from "react";
import { Menu, User, Home, FileText, Settings, LogOut, Bell, UserCircle, HelpCircle } from "lucide-react";
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

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleMenuClick = (page: string, label: string) => {
    setOpen(false);
    onNavigate(page);
  };

  const menuItems = [
    { icon: Home, label: "Home", page: "home" },
    { icon: FileText, label: "My Certificates", page: "certificates" },
    { icon: Bell, label: "Notifications", page: "notifications" },
    { icon: Settings, label: "Settings", page: "settings" },
    { icon: LogOut, label: "Log Out", page: "logout" },
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
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Navigate through your health management app</SheetDescription>
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
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="font-medium">Health User</p>
              <p className="text-xs text-muted-foreground">
                user@healthid.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onNavigate("home")}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate("certificates")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>My Certificates</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate("notifications")}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onNavigate("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info("Help center coming soon")}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => onNavigate("logout")}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}