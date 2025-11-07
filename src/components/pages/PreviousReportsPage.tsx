import { useState } from "react";
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  MapPin,
  Calendar,
  Filter,
  Search,
  Droplets,
  Heart,
  Home as HomeIcon,
  Utensils,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../LanguageProvider";

type ReportStatus = "queued" | "sent" | "verified" | "failed" | "duplicate";
type NeedType = "water" | "medical" | "shelter" | "food" | "other";
type Priority = "low" | "medium" | "high" | "critical";

interface Report {
  id: string;
  caseId: string;
  needType: NeedType;
  description: string;
  status: ReportStatus;
  priority: Priority;
  location: string;
  timestamp: string;
  verifications: number;
  dependents?: number;
}

export function PreviousReportsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  
  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  // Edit form state
  const [editDescription, setEditDescription] = useState("");
  const [editDependents, setEditDependents] = useState("0");

  // Mock data for previous reports
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      caseId: "CASE-2024-001",
      needType: "water",
      description: "Urgent - immediate assistance needed for water supply",
      status: "verified",
      priority: "high",
      location: "Approx: 12.9716, 77.5946",
      timestamp: "2024-11-07T10:30:00Z",
      verifications: 3,
      dependents: 5,
    },
    {
      id: "2",
      caseId: "CASE-2024-002",
      needType: "medical",
      description: "Medical emergency - elderly person needs medication",
      status: "sent",
      priority: "critical",
      location: "Approx: 12.9800, 77.6000",
      timestamp: "2024-11-06T14:20:00Z",
      verifications: 1,
      dependents: 2,
    },
    {
      id: "3",
      caseId: "CASE-2024-003",
      needType: "shelter",
      description: "Multiple families affected, need temporary shelter",
      status: "verified",
      priority: "medium",
      location: "Approx: 12.9500, 77.5800",
      timestamp: "2024-11-05T08:15:00Z",
      verifications: 5,
      dependents: 12,
    },
    {
      id: "4",
      caseId: "CASE-2024-004",
      needType: "food",
      description: "Food supplies needed for community center",
      status: "sent",
      priority: "medium",
      location: "Approx: 12.9650, 77.5900",
      timestamp: "2024-11-04T16:45:00Z",
      verifications: 2,
    },
    {
      id: "5",
      caseId: "CASE-2024-005",
      needType: "other",
      description: "Road access blocked, communication difficult",
      status: "queued",
      priority: "low",
      location: "Approx: 12.9400, 77.5700",
      timestamp: "2024-11-03T12:00:00Z",
      verifications: 0,
    },
  ]);

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "verified": return "bg-green-500 text-white";
      case "sent": return "bg-blue-500 text-white";
      case "queued": return "bg-yellow-500 text-white";
      case "failed": return "bg-red-500 text-white";
      case "duplicate": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "critical": return "bg-red-600 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-blue-500 text-white";
      case "low": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getNeedIcon = (needType: NeedType) => {
    switch (needType) {
      case "water": return <Droplets className="h-4 w-4" />;
      case "medical": return <Heart className="h-4 w-4" />;
      case "shelter": return <HomeIcon className="h-4 w-4" />;
      case "food": return <Utensils className="h-4 w-4" />;
      case "other": return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case "verified": return <CheckCircle2 className="h-4 w-4" />;
      case "sent": return <CheckCircle2 className="h-4 w-4" />;
      case "queued": return <Clock className="h-4 w-4" />;
      case "failed": return <XCircle className="h-4 w-4" />;
      case "duplicate": return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleEditReport = (report: Report) => {
    setSelectedReport(report);
    setEditDescription(report.description);
    setEditDependents(report.dependents?.toString() || "0");
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedReport) return;
    
    // Update the report
    setReports(reports.map(r => 
      r.id === selectedReport.id 
        ? { ...r, description: editDescription, dependents: parseInt(editDependents) }
        : r
    ));
    
    toast.success("Report updated successfully");
    setEditDialogOpen(false);
    setSelectedReport(null);
  };

  const handleDeleteReport = (report: Report) => {
    setSelectedReport(report);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedReport) return;
    
    // Remove the report
    setReports(reports.filter(r => r.id !== selectedReport.id));
    
    toast.success("Report deleted successfully");
    setDeleteDialogOpen(false);
    setSelectedReport(null);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = 
      report.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6 pb-6">
      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-6 w-6" />
            {t.previousReports}
          </CardTitle>
          <CardDescription>
            {t.viewTrackReports}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.filterByStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allStatuses}</SelectItem>
                <SelectItem value="queued">{t.queued}</SelectItem>
                <SelectItem value="sent">{t.sent}</SelectItem>
                <SelectItem value="verified">{t.verified}</SelectItem>
                <SelectItem value="failed">{t.failed}</SelectItem>
                <SelectItem value="duplicate">{t.duplicate}</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.filterByPriority} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allPriorities}</SelectItem>
                <SelectItem value="critical">{t.priorityCritical}</SelectItem>
                <SelectItem value="high">{t.priorityHigh}</SelectItem>
                <SelectItem value="medium">{t.priorityMedium}</SelectItem>
                <SelectItem value="low">{t.priorityLow}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t.showingResults} {filteredReports.length} of {reports.length} reports
        </p>
        <Button variant="outline" size="sm" onClick={() => {
          setSearchQuery("");
          setStatusFilter("all");
          setPriorityFilter("all");
        }}>
          {t.clearFilters}
        </Button>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">{t.noReportsFound}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
                ? t.adjustFilters
                : t.noReportsYet}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Left: Icon & Content */}
                  <div className="flex gap-4 flex-1 min-w-0">
                    {/* Need Type Icon */}
                    <div className={`
                      h-12 w-12 rounded-lg flex items-center justify-center
                      ${report.needType === 'water' ? 'bg-blue-100 text-blue-600 dark:bg-blue-950/30' : ''}
                      ${report.needType === 'medical' ? 'bg-red-100 text-red-600 dark:bg-red-950/30' : ''}
                      ${report.needType === 'shelter' ? 'bg-purple-100 text-purple-600 dark:bg-purple-950/30' : ''}
                      ${report.needType === 'food' ? 'bg-green-100 text-green-600 dark:bg-green-950/30' : ''}
                      ${report.needType === 'other' ? 'bg-gray-100 text-gray-600 dark:bg-gray-800' : ''}
                    `}>
                      {getNeedIcon(report.needType)}
                    </div>

                    {/* Report Details */}
                    <div className="flex-1 min-w-0">
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{report.caseId}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {report.description}
                          </p>
                        </div>
                      </div>

                      {/* Badges Row */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getStatusColor(report.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            {report.status}
                          </span>
                        </Badge>
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority}
                        </Badge>
                        {report.verifications > 0 && (
                          <Badge variant="outline" className="bg-white dark:bg-gray-800">
                            <Eye className="h-3 w-3 mr-1" />
                            {report.verifications} verified
                          </Badge>
                        )}
                        {report.dependents && (
                          <Badge variant="outline" className="bg-white dark:bg-gray-800">
                            👥 {report.dependents} dependents
                          </Badge>
                        )}
                      </div>

                      {/* Meta Info Row */}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(report.timestamp)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <MoreVertical className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleViewReport(report)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {t.viewDetails}
                      </DropdownMenuItem>
                      {report.status === "queued" && (
                        <DropdownMenuItem onClick={() => handleEditReport(report)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t.editReport}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteReport(report)}
                        className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t.deleteReport}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {reports.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {reports.length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.totalReports}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {reports.filter(r => r.status === "verified").length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.verified}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {reports.filter(r => r.status === "sent").length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.inProgress}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {reports.reduce((sum, r) => sum + (r.verifications || 0), 0)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.totalVerifications}</p>
              </div>
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
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportTime}</Label>
                  <p className="font-medium">{formatDate(selectedReport.timestamp)}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportStatus}</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedReport.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(selectedReport.status)}
                        {selectedReport.status}
                      </span>
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">Need Type</Label>
                <div className="mt-1 flex items-center gap-2">
                  {getNeedIcon(selectedReport.needType)}
                  <span className="capitalize">{selectedReport.needType}</span>
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

              <div className="grid grid-cols-2 gap-4">
                {selectedReport.dependents && (
                  <div>
                    <Label className="text-gray-600 dark:text-gray-400">Number of Dependents</Label>
                    <p className="mt-1 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {selectedReport.dependents} people
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportPriority}</Label>
                  <div className="mt-1">
                    <Badge className={getPriorityColor(selectedReport.priority)}>
                      {selectedReport.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              {selectedReport.verifications > 0 && (
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Verifications</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    {selectedReport.verifications} volunteer{selectedReport.verifications > 1 ? 's' : ''} verified this report
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              {t.close}
            </Button>
            {selectedReport?.status === "queued" && (
              <Button onClick={() => {
                setViewDialogOpen(false);
                if (selectedReport) handleEditReport(selectedReport);
              }}>
                <Edit className="h-4 w-4 mr-2" />
                {t.editReport}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Report Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.editReport}</DialogTitle>
            <DialogDescription>
              Update your report details - {selectedReport?.caseId}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-description">{t.reportDescription}</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={4}
                className="mt-2"
                placeholder="Describe the emergency situation..."
              />
            </div>

            <div>
              <Label htmlFor="edit-dependents">Number of Dependents</Label>
              <Select value={editDependents} onValueChange={setEditDependents}>
                <SelectTrigger id="edit-dependents" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num === 0 ? "None" : num === 10 ? "10+" : num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> You can only edit reports that are still in the queue and haven't been sent yet.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your report <strong>{selectedReport?.caseId}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
