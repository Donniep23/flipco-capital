"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, X, Smartphone } from "lucide-react";

export default function InstallAppButton() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'firefox' | 'chrome' | 'other'>('other');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isDisplayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isNavigatorStandalone = 'standalone' in window.navigator &&
                                  (window.navigator as { standalone?: boolean }).standalone === true;
    setIsInstalled(isDisplayModeStandalone || isNavigatorStandalone);

    // Detect device type and browser
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
    const isFirefox = /firefox/i.test(userAgent);
    const isChrome = /chrome/i.test(userAgent) && !/edg/i.test(userAgent);

    setIsMobile(mobile);

    // Determine platform for showing appropriate instructions
    if (/iphone|ipad|ipod/i.test(userAgent)) {
      setPlatform('ios');
      setShowButton(true);
    } else if (/android/i.test(userAgent)) {
      setPlatform('android');
      setShowButton(true);
    } else if (isFirefox) {
      setPlatform('firefox');
      setShowButton(true); // Show for Firefox desktop/mobile
    } else if (isChrome) {
      setPlatform('chrome');
      setShowButton(true); // Show for Chrome desktop
    }
  }, []);

  if (isInstalled || !showButton) {
    return null; // Don't show if already installed or browser not supported
  }

  return (
    <>
      {/* Floating Install Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          onClick={() => setShowInstructions(true)}
          className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full h-14 px-6"
        >
          <Download className="h-5 w-5 mr-2" />
          <span className="font-semibold">Install App</span>
        </Button>
      </div>

      {/* Installation Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white animate-in slide-in-from-bottom duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Install Flipco Capital</CardTitle>
                    <p className="text-sm text-slate-600">Get the app experience</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInstructions(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {platform === 'ios' && (
                <div className="space-y-3">
                  <p className="font-semibold text-slate-900">For iPhone/iPad:</p>
                  <ol className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Tap the <strong>Share button</strong> (box with arrow) at the bottom of Safari</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>Tap <strong>"Add"</strong> in the top right corner</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">4.</span>
                      <span>The app icon will appear on your home screen!</span>
                    </li>
                  </ol>
                  <div className="bg-blue-50 p-3 rounded-lg mt-4">
                    <p className="text-xs text-blue-800">
                      💡 <strong>Tip:</strong> The Share button looks like a box with an arrow pointing up, located at the bottom center of Safari.
                    </p>
                  </div>
                </div>
              )}

              {platform === 'android' && (
                <div className="space-y-3">
                  <p className="font-semibold text-slate-900">For Android:</p>
                  <ol className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Tap the <strong>menu button</strong> (three dots) in Chrome</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>Tap <strong>"Install"</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">4.</span>
                      <span>The app will be added to your home screen!</span>
                    </li>
                  </ol>
                  <div className="bg-blue-50 p-3 rounded-lg mt-4">
                    <p className="text-xs text-blue-800">
                      💡 <strong>Tip:</strong> You may see an automatic install banner appear - just tap "Install" on it!
                    </p>
                  </div>
                </div>
              )}

              {platform === 'firefox' && (
                <div className="space-y-3">
                  <p className="font-semibold text-slate-900">For Firefox:</p>
                  <ol className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Look for the <strong>install icon</strong> (house with a plus sign) in the address bar</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Click the <strong>install icon</strong> or right-click on the page</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>Select <strong>"Install Flipco Capital"</strong> from the menu</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">4.</span>
                      <span>Click <strong>"Install"</strong> in the confirmation dialog</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">5.</span>
                      <span>The app will open in its own window!</span>
                    </li>
                  </ol>
                  <div className="bg-blue-50 p-3 rounded-lg mt-4">
                    <p className="text-xs text-blue-800">
                      💡 <strong>Tip:</strong> On Firefox Android, tap the menu (three dots) → "Install" to add to home screen.
                    </p>
                  </div>
                </div>
              )}

              {platform === 'chrome' && (
                <div className="space-y-3">
                  <p className="font-semibold text-slate-900">For Chrome:</p>
                  <ol className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Look for the <strong>install icon</strong> (computer with arrow) in the address bar</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Click the <strong>install icon</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>Click <strong>"Install"</strong> in the popup</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600">4.</span>
                      <span>The app will open in its own window!</span>
                    </li>
                  </ol>
                  <div className="bg-blue-50 p-3 rounded-lg mt-4">
                    <p className="text-xs text-blue-800">
                      💡 <strong>Tip:</strong> You may also see an automatic install banner at the bottom - just click "Install"!
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-xs text-slate-600 text-center">
                  After installing, you'll be able to open Flipco Capital like any other app!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
