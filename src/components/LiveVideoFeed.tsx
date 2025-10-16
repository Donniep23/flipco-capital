"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Camera,
  Circle,
  Download,
  Share,
  Settings,
  AlertCircle,
  Wifi,
  WifiOff
} from "lucide-react";

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  type: "interior" | "exterior" | "aerial" | "progress";
  status: "online" | "offline" | "recording";
  videoUrl: string;
  thumbnailUrl: string;
  lastUpdate: string;
  motionDetected?: boolean;
}

interface LiveVideoFeedProps {
  projectId: string;
  projectName: string;
}

export default function LiveVideoFeed({ projectId, projectName }: LiveVideoFeedProps) {
  const [selectedCamera, setSelectedCamera] = useState<string>("cam-1");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCircleing, setIsCircleing] = useState(false);
  const [volume, setVolume] = useState(50);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock camera feeds data - in production this would come from API
  const cameraFeeds: CameraFeed[] = [
    {
      id: "cam-1",
      name: "Main Construction View",
      location: "Front Exterior",
      type: "exterior",
      status: "online",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1590725175092-8cab7c0d6b33?w=400&h=300&fit=crop",
      lastUpdate: "2 min ago",
      motionDetected: true
    },
    {
      id: "cam-2",
      name: "Kitchen Renovation",
      location: "Interior - Kitchen",
      type: "interior",
      status: "online",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      lastUpdate: "1 min ago"
    },
    {
      id: "cam-3",
      name: "Bathroom Progress",
      location: "Interior - Master Bath",
      type: "interior",
      status: "recording",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop",
      lastUpdate: "5 min ago"
    },
    {
      id: "cam-4",
      name: "Aerial Overview",
      location: "Drone - Property Overview",
      type: "aerial",
      status: "online",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop",
      lastUpdate: "3 min ago"
    },
    {
      id: "cam-5",
      name: "Progress Time-lapse",
      location: "Multi-angle Compilation",
      type: "progress",
      status: "offline",
      videoUrl: "",
      thumbnailUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
      lastUpdate: "1 hour ago"
    }
  ];

  const currentCamera = cameraFeeds.find(cam => cam.id === selectedCamera) || cameraFeeds[0];

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleCircleing = () => {
    setIsCircleing(!isCircleing);
    // In production, this would start/stop recording via API
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const getCameraStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800";
      case "recording":
        return "bg-red-100 text-red-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCameraTypeIcon = (type: string) => {
    switch (type) {
      case "interior":
        return "🏠";
      case "exterior":
        return "🏗️";
      case "aerial":
        return "🚁";
      case "progress":
        return "⏱️";
      default:
        return "📹";
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-blue-600" />
              Live Construction Cameras - {projectName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Wifi className="h-3 w-3" />
                {cameraFeeds.filter(cam => cam.status === "online").length} Online
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Circle className="h-3 w-3 text-red-500" />
                {cameraFeeds.filter(cam => cam.status === "recording").length} Circleing
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Video Player */}
          <div ref={containerRef} className="relative bg-black rounded-lg overflow-hidden">
            <div className="aspect-video relative">
              {currentCamera.status === "offline" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                  <div className="text-center">
                    <WifiOff className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Camera Offline</h3>
                    <p className="text-gray-400">This camera is currently unavailable</p>
                  </div>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  poster={currentCamera.thumbnailUrl}
                >
                  <source src={currentCamera.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Motion Detection Alert */}
              {currentCamera.motionDetected && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white gap-1 animate-pulse">
                    <AlertCircle className="h-3 w-3" />
                    Motion Detected
                  </Badge>
                </div>
              )}

              {/* Camera Info Overlay */}
              <div className="absolute top-4 left-4">
                <Badge className={`gap-1 ${getCameraStatusColor(currentCamera.status)}`}>
                  {currentCamera.status === "online" && <Wifi className="h-3 w-3" />}
                  {currentCamera.status === "recording" && <Circle className="h-3 w-3" />}
                  {currentCamera.status === "offline" && <WifiOff className="h-3 w-3" />}
                  {currentCamera.status.toUpperCase()}
                </Badge>
              </div>

              {/* Circleing Indicator */}
              {isCircleing && (
                <div className="absolute top-16 left-4">
                  <Badge className="bg-red-500 text-white gap-1 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    REC
                  </Badge>
                </div>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlayPause}
                      className="text-white hover:bg-white/20"
                      disabled={currentCamera.status === "offline"}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20"
                      disabled={currentCamera.status === "offline"}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-4 w-4" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                        disabled={currentCamera.status === "offline"}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleCircleing}
                      className={`text-white hover:bg-white/20 ${isCircleing ? 'bg-red-500/20' : ''}`}
                      disabled={currentCamera.status === "offline"}
                    >
                      <Circle className={`h-4 w-4 ${isCircleing ? 'text-red-400' : ''}`} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      disabled={currentCamera.status === "offline"}
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      disabled={currentCamera.status === "offline"}
                    >
                      <Share className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-sm">
                    <span className="font-medium">{currentCamera.name}</span>
                    <span className="mx-2">•</span>
                    <span>{currentCamera.location}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-300">Last updated: {currentCamera.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Camera Selection Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Cameras</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {cameraFeeds.map((camera) => (
                <div
                  key={camera.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedCamera === camera.id
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedCamera(camera.id)}
                >
                  <div className="aspect-video relative">
                    <img
                      src={camera.thumbnailUrl}
                      alt={camera.name}
                      className={`w-full h-full object-cover ${camera.status === "offline" ? "grayscale" : ""}`}
                    />

                    {/* Camera Type Icon */}
                    <div className="absolute top-2 left-2">
                      <div className="text-lg">{getCameraTypeIcon(camera.type)}</div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className={`text-xs ${getCameraStatusColor(camera.status)}`}>
                        {camera.status}
                      </Badge>
                    </div>

                    {/* Motion Detection */}
                    {camera.motionDetected && (
                      <div className="absolute bottom-2 right-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    {selectedCamera !== camera.id && camera.status !== "offline" && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    )}

                    {/* Offline Overlay */}
                    {camera.status === "offline" && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <WifiOff className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h4 className="font-medium text-sm truncate">{camera.name}</h4>
                    <p className="text-xs text-gray-600 truncate">{camera.location}</p>
                    <p className="text-xs text-gray-500 mt-1">{camera.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Camera System Status</h4>
              <p className="text-xs text-gray-600">
                {cameraFeeds.filter(cam => cam.status === "online").length} of {cameraFeeds.length} cameras online
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Refresh All
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Footage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
