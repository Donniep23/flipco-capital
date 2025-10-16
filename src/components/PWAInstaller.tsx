"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Download, Smartphone, Bell, BellOff } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone) ||
                         document.referrer.includes('android-app://');
    setIsInstalled(isStandalone);

    // Register service worker
    registerServiceWorker();

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show install prompt after a delay (don't be too aggressive)
      setTimeout(() => {
        if (!isStandalone) {
          setShowInstallPrompt(true);
        }
      }, 10000); // Show after 10 seconds
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
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

  // Don't show install prompt if already installed or not supported
  if (isInstalled || !deferredPrompt || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
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
