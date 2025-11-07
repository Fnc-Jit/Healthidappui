import { useState, useRef, useEffect } from "react";
import { 
  Droplets, 
  Heart, 
  Home as HomeIcon, 
  Utensils, 
  AlertCircle,
  Camera,
  MapPin,
  Users,
  Shield,
  Send,
  Smartphone,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  X,
  Upload
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../LanguageProvider";

type NeedType = "water" | "medical" | "shelter" | "food" | "other" | null;

interface QueuedReport {
  id: string;
  needType: NeedType;
  microUpdate: string;
  timestamp: string;
  status: "queued" | "sending" | "sent" | "failed";
}

interface ReportData {
  id: string;
  caseId: string;
  needType: NeedType;
  description: string;
  location: string;
  dependents: number;
  timestamp: string;
}

export function HomePage() {
  const { t } = useLanguage();
  const [userMode, setUserMode] = useState<string>("anonymous");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedNeed, setSelectedNeed] = useState<NeedType>(null);
  const [microUpdate, setMicroUpdate] = useState("");
  const [dependents, setDependents] = useState("0");
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState("Detecting location...");
  const [vulnerableTags, setVulnerableTags] = useState<string[]>([]);
  const [shareWithResponders, setShareWithResponders] = useState(true);
  const [sharePreciseCoords, setSharePreciseCoords] = useState(false);
  const [reportAnonymously, setReportAnonymously] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queuedReports, setQueuedReports] = useState<QueuedReport[]>([]);
  const [isOnline] = useState(navigator.onLine);
  
  // Dialog state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [verificationPhoto, setVerificationPhoto] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const verificationPhotoInputRef = useRef<HTMLInputElement>(null);
  
  // Get user mode from localStorage
  useEffect(() => {
    const mode = localStorage.getItem("userMode") || "anonymous";
    setUserMode(mode);
  }, []);

  // Mock reports data for volunteer dashboard
  const mockReports: ReportData[] = [
    {
      id: "1",
      caseId: "CASE-2024-046",
      needType: "medical",
      description: "Need urgent medical supplies for elderly residents",
      location: "MG Road Area, Bangalore",
      dependents: 8,
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      caseId: "CASE-2024-045",
      needType: "water",
      description: "Water supply disrupted, community of 50+ families",
      location: "Koramangala, Bangalore",
      dependents: 12,
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      caseId: "CASE-2024-041",
      needType: "shelter",
      description: "Families displaced due to flooding",
      location: "Whitefield, Bangalore",
      dependents: 15,
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
  ];

  const needs = [
    { type: "water" as NeedType, label: t.needWater, icon: Droplets, color: "blue" },
    { type: "medical" as NeedType, label: t.needMedical, icon: Heart, color: "red" },
    { type: "shelter" as NeedType, label: t.needShelter, icon: HomeIcon, color: "purple" },
    { type: "food" as NeedType, label: t.needFood, icon: Utensils, color: "green" },
    { type: "other" as NeedType, label: t.needOther, icon: AlertCircle, color: "gray" },
  ];

  const vulnerableOptions = [
    { id: "elderly", label: t.elderly },
    { id: "disability", label: t.disability },
    { id: "medication", label: t.medication },
    { id: "pregnant", label: t.pregnant },
    { id: "children", label: t.children },
  ];

  const quickPhrases = [
    "Urgent - immediate assistance needed",
    "Safe for now but need supplies",
    "Multiple families affected",
    "Road access blocked",
    "Communication difficult",
  ];

  const handleNeedSelect = (need: NeedType) => {
    setSelectedNeed(need);
    setStep(2);
  };

  const handleViewReport = (report: ReportData) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleVerifyReport = (report: ReportData) => {
    setSelectedReport(report);
    setVerifyDialogOpen(true);
  };

  const handleSubmitVerification = () => {
    if (!verificationNotes.trim()) {
      toast.error("Please add verification notes");
      return;
    }

    // Simulate verification submission
    toast.success(t.verificationSuccess);
    setVerifyDialogOpen(false);
    setVerificationNotes("");
    setVerificationPhoto(null);
    setSelectedReport(null);
  };

  const handleVerificationPhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.photoTooLarge || "Photo size must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setVerificationPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const diffMinutes = Math.floor((now - then) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.photoTooLarge || "Photo size must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          setLocation(`Approx: ${lat}, ${lng}`);
          toast.success("Location captured");
        },
        () => {
          toast.error(t.locationPermissionDenied || "Location permission denied");
          setLocation("Location not available");
        }
      );
    }
  };

  const toggleVulnerableTag = (tag: string) => {
    setVulnerableTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitReport = () => {
    if (!selectedNeed || !microUpdate.trim()) {
      toast.error(t.fillAllFields || "Please fill in the required fields");
      return;
    }

    setIsSubmitting(true);

    const newReport: QueuedReport = {
      id: `CASE-${Date.now()}`,
      needType: selectedNeed,
      microUpdate: microUpdate,
      timestamp: new Date().toISOString(),
      status: isOnline ? "sending" : "queued",
    };

    // Simulate submission
    setTimeout(() => {
      if (isOnline) {
        toast.success(t.reportSubmitted || "Report submitted successfully!");
        // In real app, would send to API
      } else {
        setQueuedReports(prev => [...prev, { ...newReport, status: "queued" }]);
        toast.info(t.reportQueued || "Report queued - will send when online");
      }
      
      // Reset form
      setSelectedNeed(null);
      setMicroUpdate("");
      setDependents("0");
      setPhoto(null);
      setVulnerableTags([]);
      setStep(1);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleSendViaSMS = () => {
    toast.success(t.smsSent || "Minimal report sent via SMS");
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Offline indicator */}
      {!isOnline && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">
                {t.offlineModeActive || "Offline mode - reports will be queued"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Volunteer Dashboard */}
      {userMode === "volunteer" && (
        <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <Shield className="h-6 w-6" />
              {t.volunteerDashboard}
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-500">
              {t.verifyAndAssist}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t.reportsVerified}</p>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">47</p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t.pendingVerifications}</p>
                </div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">12</p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t.hoursVolunteered}</p>
                </div>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">28</p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t.trustScore}</p>
                </div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">94%</p>
              </div>
            </div>

            {/* Reports to Verify */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t.reportsToVerify}</h3>
              
              {mockReports.map((report, index) => {
                const needType = needs.find(n => n.type === report.needType);
                const NeedIcon = needType?.icon || AlertCircle;
                const borderColor = 
                  needType?.color === 'red' ? 'border-l-red-500' :
                  needType?.color === 'blue' ? 'border-l-blue-500' :
                  needType?.color === 'purple' ? 'border-l-purple-500' :
                  needType?.color === 'green' ? 'border-l-green-500' :
                  'border-l-gray-500';
                const iconColor =
                  needType?.color === 'red' ? 'text-red-600' :
                  needType?.color === 'blue' ? 'text-blue-600' :
                  needType?.color === 'purple' ? 'text-purple-600' :
                  needType?.color === 'green' ? 'text-green-600' :
                  'text-gray-600';

                return (
                  <div key={report.id} className={`p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 ${borderColor} space-y-2`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <NeedIcon className={`h-4 w-4 ${iconColor}`} />
                          {index === 0 && <Badge variant="destructive" className="text-xs">{t.needsUrgentAttention}</Badge>}
                          <Badge variant="outline" className="text-xs">{needType?.label}</Badge>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-gray-100 mb-1">
                          {report.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>📍 {report.location.split(',')[0]}</span>
                          <span>👥 {report.dependents} dependents</span>
                          <span>⏱️ {formatTimeAgo(report.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleVerifyReport(report)}
                      >
                        {t.verifyNow}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewReport(report)}
                      >
                        {t.viewReport}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Queued Reports */}
      {queuedReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              {t.offlineQueue || "Offline Queue"} ({queuedReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {queuedReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{report.id}</p>
                  <p className="text-xs text-gray-500">{report.microUpdate.slice(0, 40)}...</p>
                </div>
                <Badge variant="secondary">{report.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Step 1: Select Need Type */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{t.whatDoYouNeed}</CardTitle>
            <CardDescription>{t.selectNeedType}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {needs.map((need) => {
                const Icon = need.icon;
                return (
                  <button
                    key={need.type}
                    onClick={() => handleNeedSelect(need.type)}
                    className={`
                      p-6 rounded-lg border-2 transition-all hover:scale-105
                      ${need.color === 'blue' ? 'border-blue-200 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30' : ''}
                      ${need.color === 'red' ? 'border-red-200 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/30' : ''}
                      ${need.color === 'purple' ? 'border-purple-200 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30' : ''}
                      ${need.color === 'green' ? 'border-green-200 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950/30' : ''}
                      ${need.color === 'gray' ? 'border-gray-200 hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                    `}
                  >
                    <Icon className={`h-12 w-12 mx-auto mb-2 ${
                      need.color === 'blue' ? 'text-blue-600' :
                      need.color === 'red' ? 'text-red-600' :
                      need.color === 'purple' ? 'text-purple-600' :
                      need.color === 'green' ? 'text-green-600' :
                      'text-gray-600'
                    }`} />
                    <p className="text-sm font-medium text-center">{need.label}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Add Details */}
      {step === 2 && selectedNeed && (
        <Card>
          <CardHeader>
            <CardTitle>{t.addDetails}</CardTitle>
            <CardDescription>
              {t.reportNeed}: <Badge>{needs.find(n => n.type === selectedNeed)?.label}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Update */}
            <div className="space-y-2">
              <Label>{t.microUpdate}</Label>
              <Textarea
                placeholder={t.microUpdatePlaceholder}
                value={microUpdate}
                onChange={(e) => setMicroUpdate(e.target.value)}
                rows={3}
                className="resize-none"
              />
              <div className="flex flex-wrap gap-2">
                {quickPhrases.map((phrase) => (
                  <Button
                    key={phrase}
                    variant="outline"
                    size="sm"
                    onClick={() => setMicroUpdate(phrase)}
                  >
                    {phrase}
                  </Button>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <Label>{t.addPhoto}</Label>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoCapture}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {photo ? "Change Photo" : "Take/Upload Photo"}
                </Button>
                {photo && (
                  <div className="h-20 w-20 rounded border overflow-hidden">
                    <img src={photo} alt="Report" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>{t.location}</Label>
              <div className="flex gap-2">
                <Input value={location} readOnly className="flex-1" />
                <Button variant="outline" onClick={handleGetLocation}>
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Dependents */}
            <div className="space-y-2">
              <Label>{t.numberOfDependents}</Label>
              <Select
                value={dependents}
                onValueChange={setDependents}
              >
                <SelectTrigger>
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="10+">10+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vulnerable Tags */}
            <div className="space-y-2">
              <Label>{t.vulnerableTags}</Label>
              <div className="flex flex-wrap gap-2">
                {vulnerableOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleVulnerableTag(option.id)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm transition-colors border
                      ${vulnerableTags.includes(option.id)
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-orange-500'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1">
                Next: Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Privacy & Submit */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t.privacyConsent}
            </CardTitle>
            <CardDescription>Control who can see your information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{t.shareWithResponders}</p>
                  <p className="text-sm text-gray-500">Verified emergency responders only</p>
                </div>
                <Switch
                  checked={shareWithResponders}
                  onCheckedChange={setShareWithResponders}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{t.sharePreciseCoords}</p>
                  <p className="text-sm text-gray-500">Share exact GPS location</p>
                </div>
                <Switch
                  checked={sharePreciseCoords}
                  onCheckedChange={setSharePreciseCoords}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{t.reportAnonymously}</p>
                  <p className="text-sm text-gray-500">Don't include your identity</p>
                </div>
                <Switch
                  checked={reportAnonymously}
                  onCheckedChange={setReportAnonymously}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2">Report Summary</h4>
              <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <p><strong>Need:</strong> {needs.find(n => n.type === selectedNeed)?.label}</p>
                <p><strong>Description:</strong> {microUpdate.slice(0, 60)}...</p>
                {dependents && <p><strong>Dependents:</strong> {dependents}</p>}
                {vulnerableTags.length > 0 && (
                  <p><strong>Tags:</strong> {vulnerableTags.join(", ")}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleSubmitReport}
                disabled={isSubmitting}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
              >
                {isSubmitting ? (
                  <>{t.submitting}</>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    {t.submitReport}
                  </>
                )}
              </Button>

              {!isOnline && (
                <Button
                  onClick={handleSendViaSMS}
                  variant="outline"
                  className="w-full"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  {t.sendViaSMS}
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={() => setStep(2)}
                className="w-full"
              >
                Back to Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Report Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.reportDetails}</DialogTitle>
            <DialogDescription>
              {selectedReport?.caseId}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportedBy}</Label>
                  <p className="font-medium">Anonymous User</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportTime}</Label>
                  <p className="font-medium">{new Date(selectedReport.timestamp).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.needType}</Label>
                <div className="mt-1">
                  <Badge>{needs.find(n => n.type === selectedReport.needType)?.label}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.reportDescription}</Label>
                <p className="mt-1">{selectedReport.description}</p>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.reportLocation}</Label>
                <p className="mt-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedReport.location}
                </p>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.numberOfDependents}</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {selectedReport.dependents} people affected
                </p>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.reportPriority}</Label>
                <div className="mt-1">
                  <Badge variant="destructive">{t.priorityHigh}</Badge>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              {t.close}
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                setViewDialogOpen(false);
                if (selectedReport) {
                  handleVerifyReport(selectedReport);
                }
              }}
            >
              {t.verifyNow}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Report Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.verificationTitle}</DialogTitle>
            <DialogDescription>
              {selectedReport?.caseId} - {selectedReport?.description.substring(0, 50)}...
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  {t.confirmVerification}
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="verification-notes">{t.addVerificationNotes}</Label>
              <Textarea
                id="verification-notes"
                placeholder={t.notesPlaceholder}
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label>{t.uploadVerificationPhoto}</Label>
              <div className="mt-2 space-y-2">
                <input
                  ref={verificationPhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleVerificationPhotoCapture}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => verificationPhotoInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {verificationPhoto ? "Change Photo" : "Upload Photo"}
                </Button>
                {verificationPhoto && (
                  <div className="relative">
                    <img
                      src={verificationPhoto}
                      alt="Verification"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setVerificationPhoto(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setVerifyDialogOpen(false);
              setVerificationNotes("");
              setVerificationPhoto(null);
            }}>
              {t.cancel}
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubmitVerification}
            >
              {t.submitVerification}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
