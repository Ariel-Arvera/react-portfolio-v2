import { useEffect } from "react";

const SELECTOR = [
  "section",
  "nav",
  "footer",
  ".glass-card",
  ".certificate-card",
  ".cert-ribbon",
  ".hero-glitch-container",
].join(",");

const GlobalReveal = () => {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "visible");
          } else {
            entry.target.setAttribute("data-reveal", "hidden");
          }
        });
      },
      { threshold: 0.15 }
    );

    const applyReveal = (nodeList: NodeListOf<Element>) => {
      nodeList.forEach((node) => {
        if (observed.has(node)) return;
        node.classList.add("reveal-target");
        observer.observe(node);
        observed.add(node);
      });
    };

    applyReveal(document.querySelectorAll(SELECTOR));

    const mutation = new MutationObserver(() => {
      applyReveal(document.querySelectorAll(SELECTOR));
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
};

export default GlobalReveal;
