import { cn } from "@/lib/cn";

/**
 * Editorial "two worlds" composition — warm Africa on the left, cool Europe on
 * the right, a single figure bridging the seam. This is a designed placeholder:
 * the admin can later drop a real cropped portrait into this same slot.
 */
export function HeroPortrait({ className }: { className?: string }) {
  return (
    <div
      data-asset-slot="hero-portrait"
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-[var(--shadow-raise)] ring-1 ring-ink/5",
        className
      )}
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label="A student between two worlds — Africa and Europe."
      >
        <defs>
          <linearGradient id="warm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d39a4f" />
            <stop offset="1" stopColor="#974c25" />
          </linearGradient>
          <linearGradient id="cool" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#465662" />
            <stop offset="1" stopColor="#1f262d" />
          </linearGradient>
          <clipPath id="frame">
            <rect width="400" height="500" rx="20" />
          </clipPath>
        </defs>

        <g clipPath="url(#frame)">
          <rect width="200" height="500" fill="url(#warm)" />
          <rect x="200" width="200" height="500" fill="url(#cool)" />

          {/* Sun over Africa */}
          <circle cx="74" cy="112" r="46" fill="#f1c878" opacity="0.92" />
          {/* Pale moon over Europe */}
          <circle cx="330" cy="104" r="40" fill="#cdd6dd" opacity="0.22" />

          {/* Baobab silhouette (left) */}
          <g fill="#3d3d3d" opacity="0.85">
            <rect x="58" y="360" width="12" height="120" rx="4" />
            <ellipse cx="64" cy="352" rx="46" ry="20" />
          </g>

          {/* European skyline (right) */}
          <g fill="#161c22" opacity="0.7">
            <rect x="250" y="400" width="26" height="80" />
            <rect x="286" y="370" width="22" height="110" />
            <rect x="316" y="410" width="24" height="70" />
            <path d="M348 480 V392 l12 -22 12 22 V480 Z" />
          </g>

          {/* Figure bridging the seam */}
          <g fill="#0a0a0a">
            <circle cx="200" cy="300" r="31" />
            <path d="M150 500 C150 396 168 346 200 346 C232 346 250 396 250 500 Z" />
          </g>

          {/* Seam light */}
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="500"
            stroke="#fafafa"
            strokeOpacity="0.4"
          />
        </g>
      </svg>

      <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-medium tracking-tight text-ink backdrop-blur">
        Accra → Europe
      </span>
    </div>
  );
}
