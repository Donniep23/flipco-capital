"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  Upload,
  MapPin,
  Calendar,
  Clock,
  Tag,
  Download,
  Eye,
  Grid,
  List,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  X,
  Plus
} from "lucide-react";

interface PhotoData {
  id: string;
  url: string;
  thumbnail: string;
  filename: string;
  category: "before" | "during" | "after";
  projectId: string;
  projectName: string;
  taskId?: string;
  taskName?: string;
  uploadDate: string;
  captureDate: string;
  location?: {
    room: string;
    area: string;
  };
  notes?: string;
  tags: string[];
  metadata: {
    size: number;
    dimensions: {
      width: number;
      height: number;
    };
    deviceInfo?: string;
  };
  uploadProgress?: number;
  uploadStatus: "uploading" | "completed" | "failed";
}

interface PhotoProgressTrackingProps {
  contractorId: string;
  currentProjectId?: string;
}

export default function PhotoProgressTracking({
  contractorId,
  currentProjectId
}: PhotoProgressTrackingProps) {
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "before" | "during" | "after">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newPhotoData, setNewPhotoData] = useState({
    category: "during" as PhotoData["category"],
    room: "",
    area: "",
    notes: "",
    tags: [] as string[]
  });

  // Mock data - in real app this would come from API
  const photos: PhotoData[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1556909114-5bb31e9e5b4e?w=800",
      thumbnail: "https://images.unsplash.com/photo-1556909114-5bb31e9e5b4e?w=200",
      filename: "kitchen_before_001.jpg",
      category: "before",
      projectId: "project-1",
      projectName: "Oakwood Renovation",
      uploadDate: "2025-10-15T08:00:00Z",
      captureDate: "2025-10-15T08:00:00Z",
      location: {
        room: "Kitchen",
        area: "Main Counter Area"
      },
      notes: "Initial state before cabinet removal",
      tags: ["cabinets", "countertops", "appliances"],
      metadata: {
        size: 2450000,
        dimensions: { width: 1920, height: 1080 },
        deviceInfo: "iPhone 14 Pro"
      },
      uploadStatus: "completed"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
      filename: "kitchen_during_002.jpg",
      category: "during",
      projectId: "project-1",
      projectName: "Oakwood Renovation",
      taskId: "task-1",
      taskName: "Kitchen Cabinet Installation",
      uploadDate: "2025-10-25T14:30:00Z",
      captureDate: "2025-10-25T14:30:00Z",
      location: {
        room: "Kitchen",
        area: "Upper Cabinets"
      },
      notes: "60% cabinet installation complete",
      tags: ["cabinets", "installation", "progress"],
      metadata: {
        size: 3200000,
        dimensions: { width: 1920, height: 1080 },
        deviceInfo: "iPhone 14 Pro"
      },
      uploadStatus: "completed"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200",
      filename: "kitchen_during_003.jpg",
      category: "during",
      projectId: "project-1",
      projectName: "Oakwood Renovation",
      taskId: "task-1",
      taskName: "Kitchen Cabinet Installation",
      uploadDate: "2025-10-30T10:15:00Z",
      captureDate: "2025-10-30T10:15:00Z",
      location: {
        room: "Kitchen",
        area: "Complete Installation"
      },
      notes: "All cabinets installed, ready for hardware",
      tags: ["cabinets", "completion", "hardware-ready"],
      metadata: {
        size: 2890000,
        dimensions: { width: 1920, height: 1080 },
        deviceInfo: "iPhone 14 Pro"
      },
      uploadStatus: "completed"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1556908231-f9d6cc134b3d?w=800",
      thumbnail: "https://images.unsplash.com/photo-1556908231-f9d6cc134b3d?w=200",
      filename: "bathroom_before_001.jpg",
      category: "before",
      projectId: "project-2",
      projectName: "Pine Street Fix & Flip",
      uploadDate: "2025-10-20T09:00:00Z",
      captureDate: "2025-10-20T09:00:00Z",
      location: {
        room: "Master Bathroom",
        area: "Shower Area"
      },
      notes: "Original tile condition before renovation",
      tags: ["bathroom", "tile", "shower"],
      metadata: {
        size: 2100000,
        dimensions: { width: 1920, height: 1080 },
        deviceInfo: "iPhone 14 Pro"
      },
      uploadStatus: "completed"
    }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory;
    const matchesSearch = photo.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.location?.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = !currentProjectId || photo.projectId === currentProjectId;

    return matchesCategory && matchesSearch && matchesProject;
  });

  const categoryStats = {
    before: photos.filter(p => p.category === "before").length,
    during: photos.filter(p => p.category === "during").length,
    after: photos.filter(p => p.category === "after").length,
    total: photos.length
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const photoId = `upload-${Date.now()}-${Math.random()}`;

      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [photoId]: 0 }));
      setIsUploading(true);

      // Simulate upload with progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[photoId] || 0;
          const newProgress = Math.min(currentProgress + Math.random() * 20, 100);

          if (newProgress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            // In real app, would add to photos array from API response
          }

          return { ...prev, [photoId]: newProgress };
        });
      }, 500);
    });
  };

  const getCategoryColor = (category: PhotoData["category"]) => {
    switch (category) {
      case "before": return "bg-red-100 text-red-800";
      case "during": return "bg-blue-100 text-blue-800";
      case "after": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{categoryStats.total}</div>
            <div className="text-sm text-slate-600">Total Photos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{categoryStats.before}</div>
            <div className="text-sm text-slate-600">Before</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{categoryStats.during}</div>
            <div className="text-sm text-slate-600">Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{categoryStats.after}</div>
            <div className="text-sm text-slate-600">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Upload Button */}
            <Button
              onClick={handleFileUpload}
              className="bg-green-600 hover:bg-green-700"
              disabled={isUploading}
            >
              <Camera className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Photos"}
            </Button>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "timeline" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("timeline")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4 mr-2" />
                Timeline
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-1">
              {(["all", "before", "during", "after"] as const).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(uploadProgress).map(([id, progress]) => (
              <div key={id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading photo...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Photo Display */}
      {viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="relative" onClick={() => setSelectedPhoto(photo)}>
                <img
                  src={photo.thumbnail}
                  alt={photo.filename}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getCategoryColor(photo.category)}>
                    {photo.category}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Button variant="outline" size="sm" className="bg-white/80">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm truncate">{photo.filename}</h4>
                  <div className="flex items-center text-xs text-slate-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{photo.location?.room} - {photo.location?.area}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(photo.captureDate)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {photo.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{photo.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Timeline View */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Photo Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredPhotos
                .sort((a, b) => new Date(b.captureDate).getTime() - new Date(a.captureDate).getTime())
                .map((photo, index) => (
                <div key={photo.id} className="flex space-x-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      photo.category === "before" ? "bg-red-500" :
                      photo.category === "during" ? "bg-blue-500" : "bg-green-500"
                    }`} />
                    {index < filteredPhotos.length - 1 && (
                      <div className="w-px h-16 bg-gray-300 mt-2" />
                    )}
                  </div>

                  {/* Photo Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-start space-x-4">
                      <img
                        src={photo.thumbnail}
                        alt={photo.filename}
                        className="w-20 h-20 object-cover rounded cursor-pointer"
                        onClick={() => setSelectedPhoto(photo)}
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-slate-900">{photo.filename}</h4>
                          <Badge className={getCategoryColor(photo.category)}>
                            {photo.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {photo.location?.room} - {photo.location?.area}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(photo.captureDate)}
                            </span>
                          </div>
                        </div>
                        {photo.notes && (
                          <p className="text-sm text-slate-700">{photo.notes}</p>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {photo.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{selectedPhoto.filename}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Photo */}
                <div>
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.filename}
                    className="w-full rounded-lg"
                  />
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Category:</span>
                        <Badge className={getCategoryColor(selectedPhoto.category)}>
                          {selectedPhoto.category}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Project:</span>
                        <span>{selectedPhoto.projectName}</span>
                      </div>
                      {selectedPhoto.taskName && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Task:</span>
                          <span>{selectedPhoto.taskName}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">Location:</span>
                        <span>{selectedPhoto.location?.room} - {selectedPhoto.location?.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Captured:</span>
                        <span>{formatDate(selectedPhoto.captureDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">File Size:</span>
                        <span>{formatFileSize(selectedPhoto.metadata.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Dimensions:</span>
                        <span>{selectedPhoto.metadata.dimensions.width}x{selectedPhoto.metadata.dimensions.height}</span>
                      </div>
                      {selectedPhoto.metadata.deviceInfo && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Device:</span>
                          <span>{selectedPhoto.metadata.deviceInfo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedPhoto.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-sm text-slate-700">{selectedPhoto.notes}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedPhoto.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Tag className="h-4 w-4 mr-2" />
                      Edit Tags
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
