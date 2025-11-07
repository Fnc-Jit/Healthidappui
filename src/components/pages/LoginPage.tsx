import { useState } from "react";
import { AlertCircle, ShieldAlert, UserPlus, User } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../LanguageProvider";

interface LoginPageProps {
  onLogin: (isAnonymous: boolean) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useLanguage();
  
  // User login state
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRememberMe, setUserRememberMe] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  
  // Volunteer login state
  const [volUsername, setVolUsername] = useState("");
  const [volPassword, setVolPassword] = useState("");
  const [volRememberMe, setVolRememberMe] = useState(false);
  const [isVolLoading, setIsVolLoading] = useState(false);

  const handleAnonymousReport = () => {
    // Allow immediate anonymous reporting
    localStorage.setItem("userMode", "anonymous");
    toast.success(t.reportSubmitted || "You can now report anonymously");
    onLogin(true);
  };

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userUsername || !userPassword) {
      toast.error(t.fillAllFields);
      return;
    }

    setIsUserLoading(true);

    // Simulate login
    setTimeout(() => {
      // Demo credentials for user login
      if (userUsername === "user" && userPassword === "user123") {
        if (userRememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("username", userUsername);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userMode", "user");
        localStorage.setItem("userName", "John Citizen");
        toast.success(t.loginSuccessful);
        onLogin(false);
      } else {
        toast.error(t.invalidCredentials || "Invalid credentials. Use: user / user123");
      }
      setIsUserLoading(false);
    }, 1000);
  };

  const handleVolunteerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!volUsername || !volPassword) {
      toast.error(t.fillAllFields);
      return;
    }

    setIsVolLoading(true);

    // Simulate login
    setTimeout(() => {
      // Demo credentials for volunteer login
      if (volUsername === "volunteer" && volPassword === "emergency2024") {
        if (volRememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("username", volUsername);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userMode", "volunteer");
        localStorage.setItem("userName", "Volunteer Smith");
        toast.success(t.loginSuccessful);
        onLogin(false);
      } else {
        toast.error(t.invalidCredentials || "Invalid credentials. Use: volunteer / emergency2024");
      }
      setIsVolLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-5xl space-y-6">
        {/* App Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShieldAlert className="h-12 w-12 text-red-600 dark:text-red-500" />
            <h1 className="text-4xl text-gray-900 dark:text-white">{t.emergencyResponse}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {t.signInOrReport}
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {/* Quick Anonymous Report */}
          <Card className="border-2 border-red-200 dark:border-red-900 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                {t.quickReportAnonymous}
              </CardTitle>
              <CardDescription>{t.reportWithoutLogin}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-100 dark:border-red-900">
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-500 mt-0.5">•</span>
                      <span>Report immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-500 mt-0.5">•</span>
                      <span>Works offline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-500 mt-0.5">•</span>
                      <span>Privacy protected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-500 mt-0.5">•</span>
                      <span>SMS fallback</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button
                onClick={handleAnonymousReport}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                <AlertCircle className="h-5 w-5 mr-2" />
                {t.reportNeed}
              </Button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                No login required
              </p>
            </CardContent>
          </Card>

          {/* User Login */}
          <Card className="border-2 border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <User className="h-5 w-5" />
                {t.userLogin}
              </CardTitle>
              <CardDescription>
                {t.trackYourReports}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserLogin} className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900 text-sm">
                  <p className="text-blue-800 dark:text-blue-300">
                    <strong>Demo:</strong> user / user123
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-username">{t.username}</Label>
                  <Input
                    id="user-username"
                    type="text"
                    placeholder={t.enterUsername}
                    value={userUsername}
                    onChange={(e) => setUserUsername(e.target.value)}
                    disabled={isUserLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-password">{t.password}</Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder={t.enterPassword}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    disabled={isUserLoading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="user-remember"
                      checked={userRememberMe}
                      onCheckedChange={(checked) => setUserRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="user-remember"
                      className="text-sm cursor-pointer select-none"
                    >
                      {t.rememberMe}
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    onClick={() => toast.info("Password recovery coming soon")}
                  >
                    {t.forgotPassword}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isUserLoading}
                >
                  {isUserLoading ? t.signingIn : t.signIn}
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Or <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={() => toast.info("Registration coming soon")}>{t.createAccount}</button>
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Volunteer Login */}
          <Card className="border-2 border-green-200 dark:border-green-900 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <UserPlus className="h-5 w-5" />
                {t.volunteerLogin}
              </CardTitle>
              <CardDescription>
                {t.verifyAndAssist}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVolunteerLogin} className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-900 text-sm">
                  <p className="text-green-800 dark:text-green-300">
                    <strong>Demo:</strong> volunteer / emergency2024
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vol-username">{t.username}</Label>
                  <Input
                    id="vol-username"
                    type="text"
                    placeholder={t.enterUsername}
                    value={volUsername}
                    onChange={(e) => setVolUsername(e.target.value)}
                    disabled={isVolLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vol-password">{t.password}</Label>
                  <Input
                    id="vol-password"
                    type="password"
                    placeholder={t.enterPassword}
                    value={volPassword}
                    onChange={(e) => setVolPassword(e.target.value)}
                    disabled={isVolLoading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vol-remember"
                      checked={volRememberMe}
                      onCheckedChange={(checked) => setVolRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="vol-remember"
                      className="text-sm cursor-pointer select-none"
                    >
                      {t.rememberMe}
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:underline dark:text-green-400"
                    onClick={() => toast.info("Password recovery coming soon")}
                  >
                    {t.forgotPassword}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isVolLoading}
                >
                  {isVolLoading ? t.signingIn : t.signIn}
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  {t.volunteerAccessOnly}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Multi-channel Notice */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-blue-200 dark:border-gray-600">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <p className="text-sm">
                <strong>Multiple ways to report:</strong> App • SMS • WhatsApp • USSD • IVR
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                All channels are monitored 24/7 • Help is always available
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
