import { useEffect } from "react";

/**
 * Adds `.in-view` to all `.reveal` elements as they enter the viewport.
 * Runs once per page mount. MutationObserver picks up elements added
 * after async data loads (projects, testimonials, FAQ).
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const observe = (root: Document | Element = document) => {
      root.querySelectorAll<HTMLElement>(".reveal:not(.in-view)").forEach((el) => io.observe(el));
    };

    observe();

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) {
            // If the node itself has .reveal, observe it directly
            // (querySelectorAll only searches descendants, not the element itself)
            if (node.classList.contains("reveal") && !node.classList.contains("in-view")) {
              io.observe(node);
            }
            observe(node);
          }
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []); // runs once per page mount
}
