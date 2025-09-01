"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin page immediately
    router.push("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB] mx-auto"></div>
        <p className="mt-4 text-[#888] text-sm">Redirecting to admin...</p>
      </div>
    </div>
  );
}
