/* The coin of Janus: the coin-toss engine shared by Roman Games and Ancient Oracles (keep the two copies identical).
   The coin is the aes grave ("heavy bronze") as of the Roman Republic, cast c. 225-217 BC and weighing about 270 g:
   the two-faced head of Janus with the value mark I on one side ("capita", heads), a ship's prow with I and ROMA on
   the other ("navia", ships). The faces are drawn here in SVG; pictures saved as assets/pics/as-capita.webp and
   assets/pics/as-navia.webp take their place if they exist.
   Use: CoinToss.flip(layer, {x, y, size, side}, done): layer is a positioned element with perspective, x/y the landing
   point in its pixels, side "capita" or "navia" (decide it first), done() called when the coin has settled. */
(function () {
  "use strict";
  const disc = id => `<defs><radialGradient id="${id}" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#d9a066"/><stop offset=".55" stop-color="#9a6034"/><stop offset="1" stop-color="#553016"/></radialGradient></defs>
    <circle cx="50" cy="50" r="49" fill="url(#${id})" stroke="#40220c" stroke-width="2.5"/>
    <circle cx="50" cy="50" r="43" fill="none" stroke="#553016" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>`;
  const SVG = {
    capita: `<svg viewBox="0 0 100 100" aria-hidden="true">${disc("aesA")}
      <text x="50" y="23" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="13" fill="#40220c">I</text>
      <path d="M50 29C61 29 67 36 67 44L71 48 67 50 68 54 65 56 66 60C63 65 57 67 50 68 43 67 37 65 34 60L35 56 32 54 33 50 29 48 33 44C33 36 39 29 50 29Z" fill="#6a3c1c" stroke="#3a1e0a" stroke-width="1.5"/>
      <path d="M50 30V67" stroke="#3a1e0a" stroke-width="1.2"/>
      <path d="M38 34Q50 27 62 34" fill="none" stroke="#c98d55" stroke-width="2.5" stroke-dasharray="3 2"/>
      <rect x="43" y="66" width="14" height="12" rx="2" fill="#6a3c1c" stroke="#3a1e0a" stroke-width="1.5"/>
      <circle cx="62" cy="44" r="1.6" fill="#3a1e0a"/><circle cx="38" cy="44" r="1.6" fill="#3a1e0a"/></svg>`,
    navia: `<svg viewBox="0 0 100 100" aria-hidden="true">${disc("aesB")}
      <text x="50" y="25" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="13" fill="#40220c">I</text>
      <path d="M16 60C13 50 15 41 22 36" fill="none" stroke="#3a1e0a" stroke-width="3" stroke-linecap="round"/>
      <path d="M16 60L68 60C75 60 79 56 81 50L90 52 84 58 89 62 76 66C60 69 31 69 18 66Z" fill="#6a3c1c" stroke="#3a1e0a" stroke-width="1.5"/>
      <path d="M30 60V48H60L66 55V60" fill="#7a4624" stroke="#3a1e0a" stroke-width="1.5"/><path d="M36 48V42H52V48" fill="#7a4624" stroke="#3a1e0a" stroke-width="1.5"/>
      <text x="50" y="84" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="12" letter-spacing="2" fill="#40220c">ROMA</text></svg>`
  };
  const pics = {};
  for (const side of ["capita", "navia"]) { const im = new Image(); im.onload = () => { pics[side] = im.src; }; im.src = `./assets/pics/as-${side}.webp`; }
  const face = side => pics[side] ? `<img src="${pics[side]}" alt="">` : SVG[side];

  // the styles the coin needs, added once
  const css = `.coin3d{position:absolute;left:0;top:0;width:var(--cs);height:var(--cs);margin:calc(var(--cs) / -2) 0 0 calc(var(--cs) / -2);transform-style:preserve-3d;pointer-events:none}
.coin3d .cshadow{position:absolute;left:8%;right:8%;bottom:-14%;height:20%;border-radius:50%;background:radial-gradient(ellipse,rgba(0,0,0,.6),transparent 70%)}
.coin3d .spin{position:absolute;inset:0;transform-style:preserve-3d}
.coin3d .cf{position:absolute;inset:0;border-radius:50%;backface-visibility:hidden;overflow:hidden;box-shadow:0 0 0 1px rgba(40,20,5,.6)}
.coin3d .cf svg,.coin3d .cf img{width:100%;height:100%;display:block;object-fit:cover}
.coin3d .cf.back{transform:rotateX(180deg)}
.coinstill svg,.coinstill img{width:100%;height:100%;display:block;object-fit:cover}`;
  const st = document.createElement("style"); st.textContent = css; document.head.append(st);

  const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  // a heavy coin: tossed up from the hand rather than flicked off a thumb, a few slow turns, then it drops with a thud
  // and rocks once before settling
  function flip(layer, o, done) {
    layer.querySelectorAll(".coin3d").forEach(c => c.remove());
    const size = o.size || 84, side = o.side, up = o.up || 140;
    const c = document.createElement("div"); c.className = "coin3d"; c.style.setProperty("--cs", size + "px");
    c.innerHTML = `<div class="cshadow"></div><div class="spin"><div class="cf">${face("capita")}</div><div class="cf back">${face("navia")}</div></div>`;
    layer.append(c);
    const x = o.x, y = o.y, dur = calm() ? 250 : (o.dur || 1700), turns = 4 + Math.floor(Math.random() * 3), end = side === "capita" ? 0 : 180;
    const tilt = Math.round(Math.random() * 40 - 20);
    c.animate([{transform: `translate(${x}px,${y + 20}px) scale(.9)`}, {transform: `translate(${x}px,${y - up}px) scale(1.12)`, offset: 0.45, easing: "ease-in"},
      {transform: `translate(${x}px,${y}px) scale(1)`, offset: 0.82}, {transform: `translate(${x}px,${y - 6}px)`, offset: 0.89}, {transform: `translate(${x}px,${y}px)`}],
      {duration: dur, easing: "ease-out", fill: "both"});
    c.querySelector(".cshadow").animate([{opacity: .9, transform: "scale(1)"}, {opacity: .25, transform: "scale(.45)", offset: .45}, {opacity: .9, transform: "scale(1)", offset: .82}, {opacity: .9, transform: "scale(1)"}],
      {duration: dur, fill: "both"});
    c.querySelector(".spin").animate([{transform: "rotateX(0deg) rotateZ(0deg)"},
      {transform: `rotateX(${turns * 360 + end}deg) rotateZ(${tilt}deg)`, offset: .82},
      {transform: `rotateX(${turns * 360 + end + (end ? -8 : 8)}deg) rotateZ(0deg)`, offset: .9},
      {transform: `rotateX(${turns * 360 + end}deg) rotateZ(0deg)`}],
      {duration: dur, easing: "cubic-bezier(.25,.7,.4,1)", fill: "both"});
    if (o.onLand) setTimeout(o.onLand, dur * 0.82);
    setTimeout(done, dur + 100);
    return c;
  }
  // a still coin showing one side (for results and lists)
  function still(side, size) { return `<span class="coinstill" style="display:inline-block;width:${size}px;height:${size}px;border-radius:50%;overflow:hidden;vertical-align:middle">${face(side)}</span>`; }
  window.CoinToss = {flip, face, still, toss: () => Math.random() < 0.5 ? "capita" : "navia"};
})();
