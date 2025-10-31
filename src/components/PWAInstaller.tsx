"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Download, Smartphone, Bell, BellOff, Share2, Plus } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showIOSBanner, setShowIOSBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const iOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone) ||
                         document.referrer.includes('android-app://');
    setIsInstalled(isStandalone);

    // Register service worker
    registerServiceWorker();

    // For iOS Safari, show the banner if not installed
    if (iOS && !isStandalone) {
      // Check if user has dismissed the banner before
      const dismissed = localStorage.getItem('ios-banner-dismissed');
      if (!dismissed) {
        setTimeout(() => {
          setShowIOSBanner(true);
        }, 2000);
      }
    }

    // Listen for install prompt (Chrome, Firefox, Edge, Opera)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('PWA: Install prompt event fired!');
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show install prompt after a delay
      const isMobile = /Android/i.test(navigator.userAgent);
      const delay = isMobile ? 3000 : 5000;

      setTimeout(() => {
        if (!isStandalone) {
          setShowInstallPrompt(true);
        }
      }, delay);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setShowIOSBanner(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);
        setIsServiceWorkerReady(true);

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available
                if (confirm('New version available! Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });

        // Handle controller change
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error during install prompt:', error);
    }
  };

  const dismissIOSBanner = () => {
    setShowIOSBanner(false);
    localStorage.setItem('ios-banner-dismissed', 'true');
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);

        if (permission === 'granted') {
          // Subscribe to push notifications
          const registration = await navigator.serviceWorker.ready;

          // Check if push messaging is supported
          if ('pushManager' in registration) {
            try {
              const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertVapidKey(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '')
              });

              // Send subscription to server
              await fetch('/api/notifications/subscribe', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription),
              });

              console.log('Push notification subscription successful');

              // Show a test notification
              registration.showNotification('Flipco Capital', {
                body: 'Notifications enabled! You\'ll receive updates about your projects.',
                icon: '/icons/icon-192x192.png',
                badge: '/icons/badge-72x72.png',
                tag: 'welcome'
              });

            } catch (error) {
              console.error('Failed to subscribe to push notifications:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  };

  const convertVapidKey = (vapidKey: string) => {
    const padding = '='.repeat((4 - vapidKey.length % 4) % 4);
    const base64 = (vapidKey + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // iOS Safari Banner (Top of screen)
  if (isIOS && showIOSBanner && !isInstalled) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-lg">FC</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Install Flipco Capital</p>
                <div className="flex items-center space-x-1 text-xs opacity-90">
                  <span>Tap</span>
                  <Share2 className="h-3 w-3 inline" />
                  <span>then</span>
                  <span className="inline-flex items-center">
                    "Add to Home Screen"
                    <Plus className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissIOSBanner}
              className="h-8 w-8 p-0 text-white hover:bg-white/20 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Chrome/Firefox/Edge/Opera Install Prompt (Bottom of screen)
  if (!isIOS && deferredPrompt && showInstallPrompt && !isInstalled) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50">
        <Card className="w-full sm:w-80 shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FC</span>
                </div>
                <div>
                  <CardTitle className="text-lg">Install Flipco Capital</CardTitle>
                  <CardDescription className="text-sm">
                    Get the mobile app experience
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInstallPrompt(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Smartphone className="h-4 w-4" />
                <span>Quick access from home screen</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Bell className="h-4 w-4" />
                <span>Get investment updates instantly</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Download className="h-4 w-4" />
                <span>Fast, app-like experience</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleInstallClick}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Install App
              </Button>

              {isServiceWorkerReady && notificationPermission !== 'granted' && (
                <Button
                  variant="outline"
                  onClick={requestNotificationPermission}
                  className="w-full"
                >
                  {notificationPermission === 'denied' ? (
                    <>
                      <BellOff className="h-4 w-4 mr-2" />
                      Notifications Blocked
                    </>
                  ) : (
                    <>
                      <Bell className="h-4 w-4 mr-2" />
                      Enable Notifications
                    </>
                  )}
                </Button>
              )}
            </div>

            <p className="text-xs text-slate-500 text-center">
              Install for the best mobile experience
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
