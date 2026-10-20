export const LINKS = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Demo", "#demo"],
  ["Work", "#work"],
  ["Contact", "#contact"],
];

export function goTo(hash, { pathname, navigate }) {
  if (pathname !== "/") {
    navigate("/" + hash);
    return;
  }
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}