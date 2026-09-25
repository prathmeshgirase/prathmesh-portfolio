"use client";

export type OrnamentKind = "reg" | "arc" | "cross" | "square";
export type OrnamentSpin = "cw" | "ccw" | "none";

export interface OrnamentProps {
  kind: OrnamentKind;
  className?: string;
  spin?: OrnamentSpin;
}

export function Ornament({
  kind,
  className = "",
  spin = "none",
}: OrnamentProps) {
  const spinClass =
    spin === "cw" ? "orn-spin" : spin === "ccw" ? "orn-spin-rev" : "orn-float";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className={`${spinClass} block h-auto w-full`}
      >
        {kind === "reg" && (
          <>
            <circle
              cx="24"
              cy="24"
              r="14"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M24 2v12M24 34v12M2 24h12M34 24h12"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="24" cy="24" r="2.5" fill="currentColor" />
          </>
        )}
        {kind === "arc" && (
          <circle
            cx="24"
            cy="24"
            r="21"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="6 9"
            strokeLinecap="round"
          />
        )}
        {kind === "cross" && (
          <path
            d="M24 10v28M10 24h28"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        )}
        {kind === "square" && (
          <rect
            x="10"
            y="10"
            width="28"
            height="28"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        )}
      </svg>
    </span>
  );
}
