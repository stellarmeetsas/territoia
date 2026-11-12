(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var typed = document.querySelector(".typed");
  if (!typed || reduce) return;
  var text = typed.getAttribute("data-type") || typed.textContent || "";
  var i = 0;
  typed.textContent = "";
  var tick = function () {
    i += 1;
    typed.textContent = text.slice(0, i);
    if (i < text.length) window.setTimeout(tick, 26);
  };
  window.setTimeout(tick, 280);
})();
