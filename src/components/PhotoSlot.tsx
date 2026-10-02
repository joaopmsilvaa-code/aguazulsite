import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/site";

export function PhotoSlot({ photo, className }: { photo: Photo; className?: string }) {
  if (photo.src) {
    return (
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={photo.alt}
      className={cn(
        "bg-photo-slot flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground",
        className,
      )}
    >
      <ImageIcon className="h-6 w-6 opacity-60" aria-hidden />
      <span className="text-xs font-medium tracking-wide opacity-70">Foto real em breve</span>
    </div>
  );
}
