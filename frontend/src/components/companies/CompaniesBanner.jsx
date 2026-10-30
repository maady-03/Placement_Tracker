import { useState } from "react";
import RubberSpheres from "../ui/RubberSpheres";

// Decorative only. The text block sits on the left over a fade, and the spheres fill the right.
function CompaniesBanner({ children }) {
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <section className="relative isolate h-56 overflow-hidden rounded-xl border border-line bg-surface sm:h-60">
      {!reduceMotion && (
        <div className="absolute inset-0" aria-hidden="true">
          <RubberSpheres
            background="#1a1a1a"
            lighting="Soft Studio"
            density={45}
            dotSize={100}
            field={{ spreadX: 260, spreadY: 40 }}
            motion={{
              gravityAnchor: "Center",
              bounciness: 100,
              mouseForce: 100,
              parallax: 0,
            }}
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent sm:via-surface/60" />

      <div className="pointer-events-none relative flex h-full flex-col justify-center p-6 sm:p-8">
        <div className="pointer-events-auto max-w-sm">{children}</div>
      </div>
    </section>
  );
}

export default CompaniesBanner;