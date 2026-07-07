import { Suspense } from "react";
import EventDetailClient from "./EventDetailClient";

export default function EventDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scout-green mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <EventDetailClient />
    </Suspense>
  );
}
