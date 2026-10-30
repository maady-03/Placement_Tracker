import { useState } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

function SmoothScroll({ children }) {
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  if (reduceMotion) return children;

  // `anchors` keeps the landing page's #features style links smooth.
  return (
    <ReactLenis root options={{ anchors: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;