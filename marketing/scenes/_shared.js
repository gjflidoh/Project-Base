// Shared scene runtime: reads ?format=square|vertical from the URL,
// and gives scenes a tiny deterministic timeline scheduler + a few
// reusable DOM helpers (captions, count-up numbers).

(function () {
  const params = new URLSearchParams(location.search);
  const format = params.get('format') === 'vertical' ? 'vertical' : 'square';
  document.body.classList.add(format);
  window.SCENE_FORMAT = format;
})();

// Schedule a list of [atMs, fn] pairs against a single clock that starts
// the instant this module runs (i.e. right after navigation) — every
// scene calls runTimeline(cues) exactly once.
function runTimeline(cues) {
  cues.forEach(([at, fn]) => setTimeout(fn, at));
}

// Show a caption string in the fixed lower-third bar between [inAt, outAt].
function caption(barEl, text, inAt, outAt) {
  setTimeout(() => {
    barEl.textContent = text;
    barEl.classList.add('show');
  }, inAt);
  setTimeout(() => {
    barEl.classList.remove('show');
  }, outAt);
}

// Animate a number from `from` to `to` over `durMs`, starting at `startAt`,
// formatting each frame with `fmt` (default: integer).
function countUp(el, from, to, startAt, durMs, fmt) {
  fmt = fmt || ((n) => String(Math.round(n)));
  setTimeout(() => {
    const t0 = performance.now();
    function tick() {
      const p = Math.min(1, (performance.now() - t0) / durMs);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, startAt);
}

function money(n) {
  return 'K' + Math.round(n).toLocaleString('en-US');
}
