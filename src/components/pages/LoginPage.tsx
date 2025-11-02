import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Heart, Lock, Mail } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../LanguageProvider";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error(t.fillAllFields);
      return;
    }

    setIsLoading(true);
    
    // Validate credentials
    setTimeout(() => {
      setIsLoading(false);
      
      // Check for correct credentials
      if (email === "hi" && password === "passHere") {
        toast.success(t.loginSuccessful);
        onLogin();
      } else {
        toast.error(t.invalidCredentials);
      }
    }, 1500);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 overflow-hidden">
      <Card className="w-full max-w-md shadow-lg max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2rem)] overflow-y-auto">
        <CardHeader className="space-y-1 text-center px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Heart className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-lg sm:text-2xl leading-tight">{t.healthIdManagement}</CardTitle>
          <CardDescription className="text-xs sm:text-sm leading-tight">
            {t.signInToAccess}
            <div className="mt-1.5 sm:mt-2 text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 p-1.5 sm:p-2 rounded break-all leading-tight">
              {t.demoCredentials} <span className="font-mono font-medium">hi</span> | {t.password.toLowerCase()}: <span className="font-mono font-medium">passHere</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm">{t.username}</Label>
              <div className="relative">
                <Mail className="absolute left-2.5 sm:left-3 top-2 sm:top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder={t.enterUsername}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 sm:pl-10 h-8 sm:h-10 text-xs sm:text-base"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="password" className="text-xs sm:text-sm">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-2.5 sm:left-3 top-2 sm:top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t.enterPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 sm:pl-10 h-8 sm:h-10 text-xs sm:text-base"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0 pt-0.5">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <Checkbox id="remember" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <Label
                  htmlFor="remember"
                  className="text-xs sm:text-sm font-normal cursor-pointer leading-tight"
                >
                  {t.rememberMe}
                </Label>
              </div>
              <Button
                type="button"
                variant="link"
                className="px-0 text-xs sm:text-sm h-auto justify-start sm:justify-center leading-tight"
                disabled={isLoading}
              >
                {t.forgotPassword}
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full h-8 sm:h-10 text-xs sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? t.signingIn : t.signIn}
            </Button>

            <div className="relative my-2 sm:my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t.orContinueWith}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => toast.info(t.googleLoginComingSoon)}
                className="h-8 sm:h-10 text-[10px] sm:text-sm px-2 sm:px-4"
              >
                <svg className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="truncate">{t.google}</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => toast.info(t.appleLoginComingSoon)}
                className="h-8 sm:h-10 text-[10px] sm:text-sm px-2 sm:px-4"
              >
                <svg className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="truncate">{t.apple}</span>
              </Button>
            </div>

            <div className="text-center text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 leading-tight">
              {t.dontHaveAccount}{" "}
              <Button
                type="button"
                variant="link"
                className="px-0.5 sm:px-1 h-auto text-xs sm:text-sm leading-tight"
                disabled={isLoading}
                onClick={() => toast.info(t.registrationComingSoon)}
              >
                {t.signUp}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
