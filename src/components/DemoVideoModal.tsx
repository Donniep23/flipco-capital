"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  PlayCircle,
  Home,
  Clock,
  DollarSign,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VideoClip {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  phase: string;
}

export default function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // House remodel video compilation with CEO introduction
  const videoClips: VideoClip[] = [
    {
      id: "ceo-introduction",
      title: "Welcome to Flipco Capital",
      description: "Meet our CEO and learn about our transparent investment partnership model",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&face=center",
      phase: "Introduction"
    },
    {
      id: "demolition",
      title: "Demolition & Preparation",
      description: "Watch as we carefully remove outdated fixtures and prepare for transformation",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      phase: "Week 1-2"
    },
    {
      id: "framing",
      title: "Structural Work & Framing",
      description: "New framing creates the open-concept layout our investors love",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      phase: "Week 3-4"
    },
    {
      id: "kitchen",
      title: "Kitchen Transformation",
      description: "Complete kitchen remodel with modern appliances and premium finishes",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      phase: "Week 8-12"
    },
    {
      id: "bathroom",
      title: "Luxury Bathroom Renovation",
      description: "Master bathroom becomes a spa-like retreat with premium materials",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop",
      phase: "Week 10-14"
    },
    {
      id: "final",
      title: "Final Reveal & Staging",
      description: "The complete transformation ready for market - stunning results!",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      phase: "Week 15-16"
    }
  ];

  const currentVideo = videoClips[currentVideoIndex];

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isOpen, currentVideoIndex]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoClips.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoClips.length) % videoClips.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div ref={modalRef} className="w-full max-w-7xl bg-white rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 sm:px-6 py-3 sm:py-4 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="min-w-0 flex-1 mr-4">
              {currentVideoIndex === 0 ? (
                <>
                  <h2 className="text-lg sm:text-2xl font-bold truncate">Welcome to Flipco Capital</h2>
                  <p className="text-blue-100 text-sm hidden sm:block">Meet Our Team & Learn About Our Transparent Investment Model</p>
                  <p className="text-blue-100 text-xs sm:hidden">Company Introduction</p>
                </>
              ) : (
                <>
                  <h2 className="text-lg sm:text-2xl font-bold truncate">Complete House Remodel Demo</h2>
                  <p className="text-blue-100 text-sm hidden sm:block">Oakwood Drive Transformation - From Purchase to Sale</p>
                  <p className="text-blue-100 text-xs sm:hidden">Oakwood Drive Project</p>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 flex-shrink-0"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-0">
          {/* Video Player */}
          <div className="order-1 lg:col-span-3 relative bg-black">
            <div className="aspect-video relative">
              {currentVideoIndex === 0 ? (
                // CEO Presentation Simulation
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center relative overflow-hidden">
                  {/* Professional Background */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop')] bg-cover bg-center opacity-20"></div>

                  {/* CEO Avatar */}
                  <div className="relative z-10 flex items-center space-x-8 p-8 max-w-5xl">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/30 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&face=center"
                          alt="CEO"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 text-white">
                      <h3 className="text-2xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                        Welcome to Flipco Capital
                      </h3>
                      <div className="text-lg sm:text-xl leading-relaxed space-y-4 text-blue-100">
                        <p className="drop-shadow-md">
                          "Hi, I'm the founder of Flipco Capital. We've revolutionized real estate investing through complete transparency."
                        </p>
                        <p className="drop-shadow-md">
                          "Unlike traditional firms, we create individual LLCs for each property where you become our co-owner, not just an investor."
                        </p>
                        <p className="drop-shadow-md">
                          "With our 95% profitability rate and live video monitoring, you'll see exactly where your money goes and how it grows."
                        </p>
                      </div>

                      {/* Key Points */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                          ✓ 95% Success Rate
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                          ✓ Co-Ownership Model
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                          ✓ Live Monitoring
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Speaking Indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white/80">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">LIVE</span>
                  </div>
                </div>
              ) : (
                // Regular Video Player for Project Videos
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  poster={currentVideo.thumbnailUrl}
                  controls
                  key={currentVideo.id}
                  playsInline
                  webkit-playsinline="true"
                >
                  <source src={currentVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Play Button Overlay - Only for video content */}
              {!isPlaying && currentVideoIndex > 0 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={togglePlayPause}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 sm:p-6"
                  >
                    <Play className="h-8 w-8 sm:h-12 sm:w-12" />
                  </Button>
                </div>
              )}

              {/* Video Navigation - Hidden on Mobile */}
              <div className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevVideo}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3"
                  disabled={currentVideoIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>
              <div className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextVideo}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3"
                  disabled={currentVideoIndex === videoClips.length - 1}
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>

              {/* Video Info Overlay - Only for video content */}
              {currentVideoIndex > 0 && (
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                  <div className="bg-black/80 rounded-lg p-2 sm:p-4 text-white">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-lg font-semibold truncate">{currentVideo.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-300 hidden sm:block">{currentVideo.description}</p>
                      </div>
                      <div className="flex items-center justify-between sm:block">
                        <Badge className="bg-blue-600 text-white text-xs">
                          {currentVideo.phase}
                        </Badge>
                        <span className="text-xs sm:hidden">
                          {currentVideoIndex + 1}/{videoClips.length}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs sm:text-sm hidden sm:block">
                        Video {currentVideoIndex + 1} of {videoClips.length}
                      </span>
                      <div className="flex space-x-1">
                        {videoClips.map((_, index) => (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                              index === currentVideoIndex ? 'bg-white' : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CEO Introduction Info */}
              {currentVideoIndex === 0 && (
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                  <div className="bg-black/80 rounded-lg p-2 sm:p-4 text-white">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-lg font-semibold">CEO Introduction</h3>
                        <p className="text-xs sm:text-sm text-gray-300 hidden sm:block">Learn about our transparent investment model</p>
                      </div>
                      <Badge className="bg-blue-600 text-white text-xs self-start sm:self-auto">
                        Live Presentation
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Thumbnails - Mobile Optimized */}
            <div className="bg-gray-900 p-2 sm:p-4">
              <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
                {videoClips.map((video, index) => (
                  <div
                    key={video.id}
                    className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all touch-manipulation ${
                      index === currentVideoIndex
                        ? 'border-blue-500'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    onClick={() => setCurrentVideoIndex(index)}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-16 h-12 sm:w-24 sm:h-16 object-cover"
                    />
                    <div className="p-1 sm:p-2 bg-gray-800">
                      <h4 className="text-xs font-medium text-white truncate">{video.title}</h4>
                      <p className="text-xs text-gray-400 hidden sm:block">{video.phase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex sm:hidden bg-gray-800 px-4 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevVideo}
                className="flex-1 text-white hover:bg-gray-700 mr-2"
                disabled={currentVideoIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextVideo}
                className="flex-1 text-white hover:bg-gray-700 ml-2"
                disabled={currentVideoIndex === videoClips.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Project Information Sidebar */}
          <div className="bg-gray-50 p-6 space-y-6">
            {currentVideoIndex === 0 ? (
              // CEO Introduction Content
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Meet Flipco Capital</h3>
                <p className="text-gray-600 text-sm">Learn about our revolutionary transparent investment approach</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">Company Overview</Badge>
              </div>
            ) : (
              // Project Specific Content
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Oakwood Drive Project</h3>
                <p className="text-gray-600 text-sm">1950s ranch home transformed into modern luxury living</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Sold Successfully</Badge>
              </div>
            )}

            {/* Stats - Company or Project */}
            <div className="space-y-3">
              {currentVideoIndex === 0 ? (
                // Company Stats for CEO Introduction
                <>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Home className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Properties Flipped</span>
                    </div>
                    <span className="font-semibold">50+</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Success Rate</span>
                    </div>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Avg ROI</span>
                    </div>
                    <span className="font-semibold">25%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Min Investment</span>
                    </div>
                    <span className="font-bold text-blue-900">$50,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Avg Timeline</span>
                    </div>
                    <span className="font-semibold">4-6 months</span>
                  </div>
                </>
              ) : (
                // Project Specific Stats
                <>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Purchase</span>
                    </div>
                    <span className="font-semibold">$180,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Home className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Renovation</span>
                    </div>
                    <span className="font-semibold">$45,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Sale Price</span>
                    </div>
                    <span className="font-semibold text-green-600">$285,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Net Profit</span>
                    </div>
                    <span className="font-bold text-blue-900">$60,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Timeline</span>
                    </div>
                    <span className="font-semibold">4 months</span>
                  </div>
                </>
              )}
            </div>

            {/* Timeline or Features */}
            <div>
              {currentVideoIndex === 0 ? (
                // Business Features for CEO Introduction
                <>
                  <h4 className="font-semibold text-gray-900 mb-3">Our Advantages</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Co-Ownership Model</p>
                        <p className="text-xs text-gray-500">Each project has its own LLC</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Live Video Monitoring</p>
                        <p className="text-xs text-gray-500">24/7 project visibility</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Real-Time Cost Tracking</p>
                        <p className="text-xs text-gray-500">Complete transparency</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">95% Success Rate</p>
                        <p className="text-xs text-gray-500">Proven track record</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Project Timeline for renovation videos
                <>
                  <h4 className="font-semibold text-gray-900 mb-3">Project Timeline</h4>
                  <div className="space-y-3">
                    {videoClips.map((video, index) => (
                      <div
                        key={video.id}
                        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                          index === currentVideoIndex
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setCurrentVideoIndex(index)}
                      >
                        <div className={`w-3 h-3 rounded-full ${
                          index <= currentVideoIndex ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
                          <p className="text-xs text-gray-500">{video.phase}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Key Features */}
            <div>
              {currentVideoIndex === 0 ? (
                // Business Model Benefits for CEO Introduction
                <>
                  <h4 className="font-semibold text-gray-900 mb-3">Investment Benefits</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>True partnership structure</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Complete cost transparency</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Live project monitoring</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Data-driven property selection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Proven 95% success rate</span>
                    </li>
                  </ul>
                </>
              ) : (
                // Project Features for renovation videos
                <>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features Added</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Modern kitchen with island</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Luxury master bathroom</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Hardwood floors</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Open concept layout</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Energy efficient systems</span>
                    </li>
                  </ul>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="bg-blue-600 rounded-lg p-4 text-white">
              {currentVideoIndex === 0 ? (
                // CEO Introduction CTA
                <>
                  <h4 className="font-semibold mb-2">Ready to Partner With Us?</h4>
                  <p className="text-sm text-blue-100 mb-3">Join our transparent investment model with co-ownership and live monitoring.</p>
                  <Button
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    onClick={onClose}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Start Investing Today
                  </Button>
                </>
              ) : (
                // Project Video CTA
                <>
                  <h4 className="font-semibold mb-2">See This Transparency Live</h4>
                  <p className="text-sm text-blue-100 mb-3">Experience real-time project monitoring on your next investment.</p>
                  <Button
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    onClick={onClose}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Your Investment
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
