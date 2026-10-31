/* ============================================================
   INTERACTIVE NOTES
   ------------------------------------------------------------
   ponytail: these stay imperative DOM code, ported as-is from the
   source .html files. They draw SVG from data and live inside post
   bodies that are injected as HTML — rewriting them as components
   would mean splitting every body into JSX for no visible gain.
   Each init takes the article root and returns a teardown.
   ============================================================ */

type Teardown = () => void;

const q = <T extends Element>(root: ParentNode, sel: string) => root.querySelector<T>(sel);
const qa = <T extends Element>(root: ParentNode, sel: string) => [...root.querySelectorAll<T>(sel)];

/* ============================================================
   Calm Tech crit scorecard — post: calm-tech-crit-checklist
   ============================================================ */

const CRIT_GROUPS = [
  {
    id: 'glance',
    label: 'Attention cost',
    color: '#5863E7',
    p: [1, 2],
    qs: [
      { t: 'A user can learn the single most important thing from this screen in about 2 seconds.', p: [1] },
      { t: 'There is a designed "nothing needs your attention" state — not a blank panel.', p: [2] },
      { t: 'Every interrupt (modal, toast, badge) has been checked: none could be a quieter signal.', p: [1, 2] }
    ]
  },
  {
    id: 'periphery',
    label: 'Periphery',
    color: '#1a7a78',
    p: [3],
    qs: [
      { t: 'Elements are deliberately placed at the center or the edge; nothing ambient sits at the center.', p: [3] },
      { t: 'When something becomes urgent it moves from edge to center — and back again afterwards.', p: [3, 2] },
      { t: 'The screen still gives value when left open in the background.', p: [3, 1] }
    ]
  },
  {
    id: 'signals',
    label: 'Signals',
    color: '#8a6410',
    p: [5],
    qs: [
      { t: 'A consistent visual vocabulary (colour, shape, position) carries meaning without words.', p: [5] },
      { t: 'A non-native speaker would still understand the status at a glance.', p: [5, 8] },
      { t: 'Motion confirms an action rather than decorating it.', p: [5, 1] }
    ]
  },
  {
    id: 'failure',
    label: 'Failure & durability',
    color: '#e2574c',
    p: [6],
    qs: [
      { t: 'Offline, slow-network, stale-data and missing-data states are designed, not accidental.', p: [6] },
      { t: 'Every number carries an "as of" time the user can trust.', p: [6, 2] },
      { t: 'The user can take the value with them (export, print, static link) if the tool goes away.', p: [6, 7] }
    ]
  },
  {
    id: 'minimum',
    label: 'Minimum tech & norms',
    color: '#128a43',
    p: [7, 8, 4],
    qs: [
      { t: 'The problem fits in one sentence, and this is close to the least sophisticated thing that solves it.', p: [7] },
      { t: 'No feature exists only because it was possible rather than needed.', p: [7] },
      { t: 'The design respects where it will actually be used — alone, projected, on a phone in the field.', p: [8] },
      { t: "It is visible who makes the human judgment, and the machine remembers so the human doesn't have to.", p: [4] }
    ]
  }
];

const PRINCIPLES = [
  'Smallest amount of attention',
  'Inform and create calm',
  'Make use of the periphery',
  'Amplify tech + humanity',
  'Communicate without speaking',
  'Still work when it fails',
  'Minimum tech for the problem',
  'Respect social norms'
];

const LADDER = [
  { k: 'Ambient colour / tint', d: 'A surface quietly changes hue. <b>Cost:</b> none — noticed only if you look. Use for "all is normal".' },
  { k: 'Peripheral indicator', d: 'A small dot, sparkline or border at the edge. <b>Cost:</b> a glance. Use for slow-changing state.' },
  { k: 'Inline status text', d: 'A label where the data lives ("as of 09:12"). <b>Cost:</b> a short read. Use for context the user may want.' },
  { k: 'Badge / count', d: 'A number on an icon. <b>Cost:</b> a nag that persists until cleared. Use only when a count is itself the information.' },
  { k: 'Toast / banner', d: 'Appears, then leaves. <b>Cost:</b> a context switch of a few seconds. Use for something the user did, confirmed.' },
  { k: 'Sound / vibration', d: 'Reaches the user even when not looking. <b>Cost:</b> an interruption of whatever they were doing. Use when timing matters.' },
  { k: 'Modal dialog', d: 'Blocks the current task until answered. <b>Cost:</b> full attention, forced decision. Use for irreversible actions only.' },
  { k: 'Blocking alert', d: 'Takes over the screen or device. <b>Cost:</b> everything. Use for safety and nothing else.' }
];

export function initCalmCrit(root: HTMLElement): Teardown {
  const ac = new AbortController();
  const { signal } = ac;

  /* ---- attention ladder ---- */
  const lad = q<HTMLElement>(root, '#ladder');
  if (!lad) return () => ac.abort();
  const svg = q<SVGElement>(lad, 'svg')!;
  const range = q<HTMLInputElement>(root, '#ladder-range')!;

  function drawLadder(v: number) {
    const n = LADDER.length,
      w = 760,
      bw = 72,
      gap = (w - 40 - bw * n) / (n - 1);
    let out = `<line x1="20" y1="178" x2="740" y2="178" stroke="rgba(30,33,48,.1)"/>`;
    LADDER.forEach((r, i) => {
      const x = 20 + i * (bw + gap),
        h = 30 + i * 17,
        y = 178 - h,
        on = i === v,
        past = i < v;
      const fill = on ? '#5863E7' : past ? '#BBBEF3' : '#EDEEF3';
      out +=
        `<g class="rung" style="opacity:${on ? 1 : past ? 0.9 : 0.6}"><rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="10" fill="${fill}"/>` +
        (on ? `<polygon points="${x + bw / 2 - 9},${y - 18} ${x + bw / 2 + 9},${y - 18} ${x + bw / 2},${y - 4}" fill="#5863E7"/>` : '') +
        `<text x="${x + bw / 2}" y="196" font-size="9.5" font-weight="600" fill="${on ? '#1E2130' : '#9aa0ad'}" text-anchor="middle">${r.k.split(' /')[0].split(' ')[0]}</text></g>`;
    });
    out += `<text x="20" y="18" font-size="10" fill="#9aa0ad" class="svg-body">quiet · cheap</text><text x="740" y="18" font-size="10" fill="#9aa0ad" text-anchor="end" class="svg-body">loud · expensive</text>`;
    svg.innerHTML = out;
    q(root, '#ladder-k')!.innerHTML = `<i></i>Rung ${v + 1} of ${n} — ${LADDER[v].k}`;
    q(root, '#ladder-d')!.innerHTML = LADDER[v].d;
  }
  range.addEventListener('input', (e) => drawLadder(+(e.target as HTMLInputElement).value), { signal });
  drawLadder(+range.value);

  /* ---- scorecard ---- */
  const KEY = 'webbify-calmcrit';
  let store: Record<string, Record<string, string>> = {};
  try {
    store = JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {}
  const screenIn = q<HTMLInputElement>(root, '#crit-screen')!;
  const slug = () => screenIn.value.trim().toLowerCase() || 'untitled';
  const answers = () => {
    const k = slug();
    store[k] = store[k] || {};
    return store[k];
  };
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {}
  };

  q(root, '#crit-groups')!.innerHTML = CRIT_GROUPS.map(
    (g) => `<div class="crit-group" id="cg-${g.id}">
    <div class="cg-head"><h3><i style="background:${g.color}"></i>${g.label}</h3><span class="cg-p">principles ${g.p.join(', ')}</span></div>
    ${g.qs
      .map(
        (question, i) => `<div class="q" data-q="${g.id}.${i}">
      <div class="q-t">${question.t}<span class="qp">${question.p.map((n) => `<b title="${PRINCIPLES[n - 1]}">${n}</b>`).join('')}</span></div>
      <div class="seg"><button data-v="2">Yes</button><button data-v="1">Partly</button><button data-v="0">No</button><button data-v="x">Skip</button></div>
    </div>`
      )
      .join('')}
  </div>`
  ).join('');

  q(root, '#crit-bars')!.innerHTML = CRIT_GROUPS.map(
    (g) =>
      `<div class="bar" data-g="${g.id}"><div class="bl"><i style="background:${g.color}"></i>${g.label}</div><div class="bt"><i style="background:${g.color}"></i></div><div class="bv na">–</div></div>`
  ).join('');

  function paint() {
    const a = answers();
    qa<HTMLElement>(root, '.q').forEach((el) => {
      const v = a[el.dataset.q!];
      el.className = 'q' + (v !== undefined ? ' v' + v : '');
      qa<HTMLButtonElement>(el, 'button').forEach((b) => b.classList.toggle('on', b.dataset.v === String(v)));
    });
    let tot = 0,
      max = 0;
    const weak: string[] = [];
    CRIT_GROUPS.forEach((g) => {
      let s = 0,
        m = 0;
      g.qs.forEach((question, i) => {
        const v = a[g.id + '.' + i];
        if (v === undefined || v === 'x') return;
        s += +v;
        m += 2;
        if (+v === 0) weak.push(question.t);
      });
      tot += s;
      max += m;
      const bar = q<HTMLElement>(root, `.bar[data-g="${g.id}"]`)!;
      const bv = q<HTMLElement>(bar, '.bv')!;
      const bi = q<HTMLElement>(bar, '.bt i')!;
      if (m === 0) {
        bi.style.width = '0';
        bv.textContent = '–';
        bv.classList.add('na');
      } else {
        const pct = Math.round((s / m) * 100);
        bi.style.width = pct + '%';
        bv.textContent = pct + '%';
        bv.classList.remove('na');
      }
    });
    const arc = q<SVGCircleElement>(root, '#ring-arc')!;
    const val = q<HTMLElement>(root, '#ring-val')!;
    if (max === 0) {
      arc.style.strokeDashoffset = '314';
      val.textContent = '–';
    } else {
      const pct = Math.round((tot / max) * 100);
      arc.style.strokeDashoffset = String(314 - (314 * pct) / 100);
      arc.style.stroke = pct >= 75 ? '#128a43' : pct >= 45 ? '#5863E7' : '#e2574c';
      val.textContent = String(pct);
    }
    const vd = q<HTMLElement>(root, '#crit-verdict')!;
    if (max === 0) {
      vd.className = 'crit-verdict empty';
      vd.innerHTML = 'Answer a few questions and a verdict will appear here.';
    } else {
      const pct = Math.round((tot / max) * 100);
      const head =
        pct >= 75
          ? 'Calm. This screen mostly gets out of the way.'
          : pct >= 45
            ? "Getting there. A few signals are borrowing attention they don't need."
            : 'Loud. This screen is asking for more attention than the task deserves.';
      vd.className = 'crit-verdict';
      vd.innerHTML =
        `<b>${head}</b>` +
        (weak.length
          ? `<div style="margin-top:6px">Start with the "No" answers:</div><ul>${weak.slice(0, 4).map((w) => `<li>${w}</li>`).join('')}</ul>`
          : '');
    }
  }

  q(root, '#crit')!.addEventListener(
    'click',
    (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.seg button');
      if (!b) return;
      const key = b.closest<HTMLElement>('.q')!.dataset.q!;
      const a = answers();
      if (a[key] === b.dataset.v) delete a[key];
      else a[key] = b.dataset.v!;
      save();
      paint();
    },
    { signal }
  );
  screenIn.addEventListener('input', paint, { signal });
  q(root, '#crit-reset')!.addEventListener(
    'click',
    () => {
      delete store[slug()];
      save();
      paint();
    },
    { signal }
  );
  q(root, '#crit-copy')!.addEventListener(
    'click',
    () => {
      const a = answers();
      const name = screenIn.value.trim() || 'Untitled screen';
      const lines = [`Calm Tech crit — ${name}`, `Score: ${q(root, '#ring-val')!.textContent}/100`, ''];
      CRIT_GROUPS.forEach((g) => {
        lines.push(g.label.toUpperCase());
        g.qs.forEach((question, i) => {
          const v = a[g.id + '.' + i];
          const m = v === '2' ? '✓' : v === '1' ? '~' : v === '0' ? '✗' : '·';
          lines.push(`  ${m} ${question.t}`);
        });
        lines.push('');
      });
      navigator.clipboard?.writeText(lines.join('\n')).then(() => {
        const b = q<HTMLElement>(root, '#crit-copy')!;
        b.textContent = 'Copied ✓';
        setTimeout(() => (b.textContent = 'Copy summary'), 1400);
      });
    },
    { signal }
  );

  // restore last screen name
  const last = Object.keys(store).find((k) => k !== 'untitled');
  if (last && !screenIn.value) screenIn.value = last;
  paint();

  /* ---- principle → question map ---- */
  const pm = q<HTMLElement>(root, '#pmap')!;
  const qs = CRIT_GROUPS.flatMap((g) => g.qs.map((question) => ({ ...question, g })));
  const H = qs.length * 26 + 20,
    L = 250,
    R = 520;
  let out = `<svg viewBox="0 0 760 ${H}" role="img" aria-label="Eight Calm Tech principles on the left connected by lines to the checklist questions they inform on the right.">`;
  const py = (i: number) => 20 + i * ((H - 40) / 7),
    qy = (i: number) => 14 + i * 26;
  qs.forEach((question, qi) =>
    question.p.forEach((pn) => {
      out += `<path class="ln" data-p="${pn}" data-q="${qi}" d="M${L} ${py(pn - 1)} C ${L + 120} ${py(pn - 1)}, ${R - 120} ${qy(qi)}, ${R - 14} ${qy(qi)}" fill="none"/>`;
    })
  );
  PRINCIPLES.forEach((p, i) => {
    out += `<g class="pn" data-p="${i + 1}"><rect x="10" y="${py(i) - 13}" width="${L - 10}" height="26" rx="13" fill="#fff" stroke="#BBBEF3"/><text x="24" y="${py(i) + 4}" font-size="11" font-weight="700" fill="#1E2130"><tspan class="pnum" fill="#5863E7">${i + 1}</tspan>  ${p}</text></g>`;
  });
  qs.forEach((question, i) => {
    const t = question.t.length > 42 ? question.t.slice(0, 42).replace(/\s\S*$/, '') + '…' : question.t;
    out += `<g class="qn" data-q="${i}"><circle class="qdot" cx="${R - 8}" cy="${qy(i)}" r="4"/><text x="${R + 4}" y="${qy(i) + 4}" font-size="10.5" fill="#3d4152" class="svg-body">${t}</text></g>`;
  });
  out += '</svg>';
  pm.innerHTML = out;

  const focusP = (pn: string | null) => {
    pm.classList.toggle('focus', pn != null);
    qa<HTMLElement>(pm, '.pn').forEach((n) => n.classList.toggle('on', n.dataset.p === String(pn)));
    const qset = new Set<string>();
    qa<HTMLElement>(pm, '.ln').forEach((l) => {
      const on = l.dataset.p === String(pn);
      l.classList.toggle('on', on);
      if (on) qset.add(l.dataset.q!);
    });
    qa<HTMLElement>(pm, '.qn').forEach((n) => n.classList.toggle('on', qset.has(n.dataset.q!)));
  };
  qa<HTMLElement>(pm, '.pn').forEach((n) => {
    n.addEventListener('mouseenter', () => focusP(n.dataset.p!), { signal });
    n.addEventListener('mouseleave', () => focusP(null), { signal });
    n.addEventListener('click', () => focusP(n.classList.contains('on') ? null : n.dataset.p!), { signal });
  });

  return () => ac.abort();
}

/* ============================================================
   Venn + fingerprint radar — post: product-design-in-the-age-of-ai
   ============================================================ */

export function initAiArticle(root: HTMLElement): Teardown {
  const ac = new AbortController();
  const { signal } = ac;

  /* ---- Venn interaction ---- */
  const venn = q<SVGElement>(root, '#venn');
  if (venn) {
    const focusLens = (l: string | null) => {
      qa<SVGElement>(venn, 'circle').forEach((c) => c.classList.toggle('on', c.dataset.l === l));
      venn.classList.toggle('focus', !!l && l !== 'x');
      qa<HTMLElement>(root, '.lens').forEach((x) => x.classList.toggle('on', x.dataset.l === l));
    };
    qa<HTMLElement>(root, '.lens').forEach((x) => {
      x.addEventListener('mouseenter', () => focusLens(x.dataset.l!), { signal });
      x.addEventListener('mouseleave', () => focusLens(null), { signal });
      x.addEventListener('click', () => focusLens(x.classList.contains('on') ? null : x.dataset.l!), { signal });
    });
    qa<SVGElement>(venn, 'circle').forEach((c) => {
      c.addEventListener('mouseenter', () => focusLens(c.dataset.l!), { signal });
      c.addEventListener('mouseleave', () => focusLens(null), { signal });
    });
  }

  /* ---- Fingerprint radar ---- */
  const R = q<SVGElement>(root, '#radar');
  const sliders = q<HTMLElement>(root, '#sliders');
  if (!R || !sliders) return () => ac.abort();

  const AX = [
    { k: 'Engineering collaborator', s: 'specs, implementation, edge cases', v: 3 },
    { k: 'Product thinker', s: 'strategy, trade-offs, roadmaps', v: 4 },
    { k: 'Visionary storyteller', s: 'painting futures, rallying teams', v: 3 },
    { k: 'Researcher', s: 'interviews, synthesis, field studies', v: 3 },
    { k: 'Inclusion & ethics advocate', s: 'who is left out? what could go wrong?', v: 3 }
  ];
  const cx = 180,
    cy = 165,
    rad = 120;
  const pt = (i: number, r: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / AX.length;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  function drawRadar() {
    let s = '';
    for (let ring = 1; ring <= 5; ring++) {
      s += `<polygon points="${AX.map((_, i) => pt(i, (rad * ring) / 5).join(',')).join(' ')}" fill="none" stroke="#1E2130" stroke-opacity="${ring === 5 ? 0.18 : 0.08}" stroke-width="1"/>`;
    }
    AX.forEach((_, i) => {
      const [x, y] = pt(i, rad);
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#1E2130" stroke-opacity=".08"/>`;
    });
    const poly = AX.map((a, i) => pt(i, (rad * a.v) / 5).join(',')).join(' ');
    s += `<polygon points="${poly}" fill="#5863E7" fill-opacity=".22" stroke="#5863E7" stroke-width="2.5" stroke-linejoin="round"/>`;
    AX.forEach((a, i) => {
      const [x, y] = pt(i, (rad * a.v) / 5);
      s += `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#5863E7" stroke-width="2.5"/>`;
    });
    const labels = [
      ['Engineering', 'collaborator'],
      ['Product', 'thinker'],
      ['Visionary', 'storyteller'],
      ['Researcher', ''],
      ['Inclusion &', 'ethics']
    ];
    AX.forEach((_, i) => {
      const [x, y] = pt(i, rad + 30);
      const anchor = Math.abs(x - cx) < 10 ? 'middle' : x > cx ? 'start' : 'end';
      s += `<text x="${x}" y="${y}" font-size="11.5" font-weight="700" fill="#1E2130" text-anchor="${anchor}">${labels[i][0]}</text><text x="${x}" y="${y + 14}" font-size="11.5" font-weight="700" fill="#1E2130" text-anchor="${anchor}">${labels[i][1]}</text>`;
    });
    R!.innerHTML = s;
    const top = [...AX].sort((a, b) => b.v - a.v).slice(0, 2).map((a) => a.k);
    q(root, '#fpres')!.innerHTML = `Your sketch leans <span>${top[0]}</span> + <span>${top[1]}</span>.`;
  }

  sliders.innerHTML = AX.map(
    (a, i) =>
      `<div class="sl"><div><label for="s${i}">${a.k}</label><small>${a.s}</small><input id="s${i}" type="range" min="1" max="5" value="${a.v}" data-i="${i}"></div><output>${a.v}</output></div>`
  ).join('');

  qa<HTMLInputElement>(sliders, 'input').forEach((r) =>
    r.addEventListener(
      'input',
      (e) => {
        const el = e.target as HTMLInputElement;
        AX[+el.dataset.i!].v = +el.value;
        q<HTMLOutputElement>(el.closest('.sl')!, 'output')!.textContent = el.value;
        drawRadar();
      },
      { signal }
    )
  );
  drawRadar();

  return () => ac.abort();
}

export const WIDGETS = { calmCrit: initCalmCrit, aiArticle: initAiArticle };
