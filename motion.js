(function () {
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.querySelector(".nav");
  if (nav) {
    var stick = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 8);
    };
    stick();
    window.addEventListener("scroll", stick, { passive: true });
  }

  var nodes = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(function (node) { node.classList.add("is-in"); });
  } else {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        seen.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    nodes.forEach(function (node) { seen.observe(node); });
  }

  var typed = document.querySelector("[data-type]");
  if (!typed) return;
  var text = typed.getAttribute("data-type") || "";
  if (reduce) {
    typed.textContent = text;
    typed.classList.add("is-done");
    return;
  }
  var start = function () {
    var i = 0;
    var tick = function () {
      i += 1;
      typed.textContent = text.slice(0, i);
      if (i < text.length) {
        window.setTimeout(tick, 26);
      } else {
        typed.classList.add("is-done");
      }
    };
    tick();
  };
  if (!("IntersectionObserver" in window)) {
    start();
    return;
  }
  var once = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    once.disconnect();
    start();
  }, { threshold: 0.4 });
  once.observe(typed);
})();
