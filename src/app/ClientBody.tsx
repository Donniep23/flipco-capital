"use client";

import { useEffect } from "react";
import PWAInstaller from "@/components/PWAInstaller";

export default function ClientBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = `antialiased ${className || ""}`.trim();
  }, [className]);

  return (
    <body className={`antialiased ${className || ""}`.trim()} suppressHydrationWarning>
      {children}
      <PWAInstaller />
    </body>
  );
}
