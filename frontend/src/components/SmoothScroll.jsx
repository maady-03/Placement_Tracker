import { useState } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

// True for vertically scrollable inner panels (calendar, modals, menus).
// Horizontal-only scrollers (tables, heatmap) don't match, so the page keeps scrolling over them.
const isInnerScroller = (node) => {
  const { overflowY } = getComputedStyle(node);

  return (
    /(auto|scroll)/.test(overflowY) &&
    node.scrollHeight > node.clientHeight + 1
  );
};

const OPTIONS = { anchors: true, prevent: isInnerScroller };

function SmoothScroll({ children }) {
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  if (reduceMotion) return children;

  // `anchors` keeps the landing page's #features style links smooth.
  return (
    <ReactLenis root options={OPTIONS}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;