/* ============================================================
   INSIGHTS CONTENT
   ------------------------------------------------------------
   Three levels of grouping, from coarse to fine:

   1. TOPIC      — exactly one per post. The "section" of the blog.
   2. COLLECTION — optional, one per post. A learning track that
                   spans topics.
   3. TAGS       — many per post. Free-form, cross-cutting.

   To add a post: push an object into POSTS. `body` is plain HTML;
   h2/h3 headings inside it auto-generate the table of contents.
   ponytail: bodies stay HTML strings rather than MDX — the .html
   files at repo root are the design source, so a one-to-one copy
   keeps them diffable. Move to MDX when a post needs components.
   ============================================================ */

export const TOPICS = {
  design: { label: 'Design', cls: 't-design' },
  research: { label: 'Research', cls: 't-research' },
  product: { label: 'Product', cls: 't-product' },
  craft: { label: 'Craft', cls: 't-craft' },
  notes: { label: 'Notes', cls: 't-notes' }
} as const;

export const COLLECTIONS = {
  'calm-tech': {
    title: 'Calm Technology',
    kicker: 'Attention-first design',
    desc: "Working through Amber Case's eight principles and turning them into habits for dashboards, nonprofit sites and research."
  },
  'design-ops': {
    title: 'How I work',
    kicker: 'Process & tooling',
    desc: 'The systems behind the work — how notes, critiques and AI-assisted builds fit together.'
  },
  'field-notes': {
    title: 'Field notes',
    kicker: 'From real projects',
    desc: 'Short observations from client and product work, written before I forget them.'
  }
} as const;

export const AUTHOR = { name: 'Abdan', ava: '/asset/abdan.jpg' };

export type Topic = keyof typeof TOPICS;
export type Collection = keyof typeof COLLECTIONS;

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  topic: Topic;
  collection?: Collection;
  tags: string[];
  readMins?: number;
  featured?: boolean;
  byline?: string;
  sources?: { t: string; u: string }[];
  srcCard?: { k: string; t: string; a: string; u: string };
  init?: 'calmCrit' | 'aiArticle';
  body: string;
};

export const POSTS: Post[] = [
  {
    slug: 'product-design-in-the-age-of-ai',
    title: 'Product design in the age of AI, without losing the plot',
    excerpt:
      "Illustrated reading notes on Gabi Duncombe's essay — curiosity over tools, the three lenses of product thinking, outcomes over artifacts, and finding your design fingerprint.",
    date: '2026-10-30',
    topic: 'product',
    collection: 'design-ops',
    tags: ['product-thinking', 'ai', 'portfolio', 'career', 'reading-notes'],
    readMins: 9,
    byline: 'Notes & illustrations · opinions mine',
    init: 'aiArticle',
    srcCard: {
      k: 'Source article',
      t: 'Becoming a Product Designer in the Age of AI (Without Losing the Plot)',
      a: 'Gabi Duncombe · Senior Design Manager, Premiere Pro + GenAI Video Innovation · Medium, Dec 2025',
      u: 'https://gabiduncombe.medium.com/becoming-a-product-designer-in-the-age-of-ai-without-losing-the-plot-c5f11d9f5b02'
    },
    sources: [
      {
        t: 'Becoming a Product Designer in the Age of AI (Without Losing the Plot) — Gabi Duncombe, Medium',
        u: 'https://gabiduncombe.medium.com/becoming-a-product-designer-in-the-age-of-ai-without-losing-the-plot-c5f11d9f5b02'
      }
    ],
    body: `
<p>I read this because I'm in exactly the situation it describes: I came into product design sideways, I now build with AI every day, and I want to be sure the fast part isn't eating the thinking part. Below is what I'm taking from it, in my own words, with a picture for each idea I want to remember.</p>

<blockquote>Tools change. Judgment doesn't.<cite>The whole essay in four words — my paraphrase of its thesis.</cite></blockquote>

<h2 id="curiosity"><span class="n">01</span>Curiosity over tools</h2>
<p>The wrong first question is "which tool should I learn?" The right one is "what problem do I actually understand?" Duncombe's point is that a designer's edge is asking sharper questions and turning messy human insight into something usable — the software is interchangeable.</p>

<figure class="viz">
  <div class="viz-title">The tool parade vs. the constant</div>
  <svg viewBox="0 0 760 230" role="img" aria-label="A timeline of design tools passing by — Photoshop, Sketch, Figma, AI tools, the next thing — while curiosity stays fixed underneath them all.">
    <defs>
      <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#1E2130" stop-opacity=".06"/><stop offset="1" stop-color="#1E2130" stop-opacity="0"/></linearGradient>
    </defs>
    <line x1="40" y1="92" x2="720" y2="92" stroke="#BBBEF3" stroke-width="2" stroke-dasharray="6 6"/>
    <polygon points="720,86 732,92 720,98" fill="#5863E7"/>
    <g font-size="12" font-weight="600" fill="#1E2130" text-anchor="middle">
      <g><rect x="48" y="58" width="104" height="68" rx="14" fill="#fff" stroke="#1E2130" stroke-opacity=".1" opacity=".55"/><text x="100" y="86" opacity=".55">Photoshop</text><text x="100" y="106" font-size="10" fill="#9aa0ad" font-weight="400" opacity=".7">2000s</text></g>
      <g><rect x="178" y="58" width="104" height="68" rx="14" fill="#fff" stroke="#1E2130" stroke-opacity=".1" opacity=".75"/><text x="230" y="86" opacity=".75">Sketch</text><text x="230" y="106" font-size="10" fill="#9aa0ad" font-weight="400">2010s</text></g>
      <g><rect x="308" y="52" width="110" height="80" rx="14" fill="#fff" stroke="#5863E7" stroke-width="1.5"/><text x="363" y="86" fill="#5863E7">Figma</text><text x="363" y="106" font-size="10" fill="#9aa0ad" font-weight="400">now-ish</text></g>
      <g><rect x="444" y="58" width="104" height="68" rx="14" fill="#fff" stroke="#1E2130" stroke-opacity=".1"/><text x="496" y="86">Cursor / AI</text><text x="496" y="106" font-size="10" fill="#9aa0ad" font-weight="400">arriving</text></g>
      <g><rect x="574" y="58" width="104" height="68" rx="14" fill="none" stroke="#1E2130" stroke-opacity=".25" stroke-dasharray="5 4"/><text x="626" y="86" fill="#9aa0ad">the next thing</text><text x="626" y="106" font-size="10" fill="#9aa0ad" font-weight="400">soon</text></g>
    </g>
    <rect x="40" y="160" width="692" height="46" rx="23" fill="#5863E7"/>
    <polygon points="372,146 388,146 380,160" fill="#5863E7"/>
    <text x="386" y="189" font-size="14" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="2">CURIOSITY · SHARP QUESTIONS · REAL HUMAN PROBLEMS</text>
    <text x="40" y="150" font-size="10.5" fill="#9aa0ad" class="svg-body">what passes by</text>
    <text x="40" y="222" font-size="10.5" fill="#9aa0ad" class="svg-body">what stays</text>
  </svg>
  <figcaption><b>The parade.</b> Every tool on the belt was once "the one to learn." The thing underneath hasn't changed since any of them — and it's the only thing that transfers to the next one.</figcaption>
</figure>

<p>The growth-mindset corollary: tie your identity to a tool and you'll feel perpetually behind. The useful habit is to pick up new workflows and play with them early enough to judge whether they fit, rather than waiting for a course.</p>

<h2 id="blur"><span class="n">02</span>The blurry edges</h2>
<p>Product, design and engineering are overlapping more. Designers can now describe a flow in plain language and prototype it in working code. Duncombe doesn't expect designers to become engineers or PMs — but as a hiring manager she does expect three things:</p>

<figure class="viz tint">
  <div class="viz-title">What a hiring manager now expects of a designer</div>
  <svg viewBox="0 0 760 170" role="img" aria-label="Three expectations: know where AI speeds design up, recognise where human judgment is still essential, and have a point of view on how AI changes the role.">
    <g font-size="12.5" fill="#1E2130">
      <g><rect x="20" y="20" width="226" height="130" rx="18" fill="#D5F7F6"/><polygon points="40,42 60,42 50,59" fill="#1a7a78"/><text x="40" y="86" font-weight="700" font-size="14">Know where AI</text><text x="40" y="104" font-weight="700" font-size="14">speeds design up.</text><text x="40" y="128" class="svg-body" fill="#1a7a78" font-size="11.5">exploration · variants · code</text></g>
      <g><rect x="267" y="20" width="226" height="130" rx="18" fill="#F7E8C9"/><polygon points="287,42 307,42 297,59" fill="#8a6410"/><text x="287" y="86" font-weight="700" font-size="14">Know where human</text><text x="287" y="104" font-weight="700" font-size="14">judgment still matters.</text><text x="287" y="128" class="svg-body" fill="#8a6410" font-size="11.5">taste · trade-offs · ethics</text></g>
      <g><rect x="514" y="20" width="226" height="130" rx="18" fill="#5863E7"/><polygon points="534,42 554,42 544,59" fill="#fff"/><text x="534" y="86" font-weight="700" font-size="14" fill="#fff">Have a point of view</text><text x="534" y="104" font-weight="700" font-size="14" fill="#fff">on how AI changes</text><text x="534" y="122" font-weight="700" font-size="14" fill="#fff">the designer's role.</text></g>
    </g>
  </svg>
  <figcaption><b>The bottleneck moved.</b> When exploration is cheap, the limit is no longer the tools — it's imagination and judgment about what's worth exploring.</figcaption>
</figure>

<h2 id="product-thinking"><span class="n">03</span>Product thinking: "how does this move the needle?"</h2>
<p>This is the section that made me want to write the whole note up. Great product designers don't only ask "does this look good?" — they ask what it changes. Product thinking is the habit of holding three lenses at once and designing in the overlap. Hover or tap each lens.</p>

<figure class="viz">
  <div class="viz-title">Product thinking — the three lenses</div>
  <div class="venn-wrap">
    <svg id="venn" viewBox="0 0 360 330" role="img" aria-label="Three overlapping circles — Desirability (user needs), Viability (business goals), Feasibility (technical constraints). Their intersection is the product.">
      <g style="mix-blend-mode:multiply">
        <circle data-l="d" cx="180" cy="118" r="98" fill="#8CE7E5" opacity=".62"/>
        <circle data-l="v" cx="124" cy="208" r="98" fill="#F2D8A5" opacity=".66"/>
        <circle data-l="f" cx="236" cy="208" r="98" fill="#7982EC" opacity=".58"/>
      </g>
      <g font-weight="800" font-size="14" fill="#1E2130" text-anchor="middle" pointer-events="none">
        <text x="180" y="58">DESIRABILITY</text><text x="180" y="76" font-size="11" font-weight="600" fill="#1a7a78">user needs</text>
        <text x="74" y="246">VIABILITY</text><text x="74" y="264" font-size="11" font-weight="600" fill="#8a6410">business goals</text>
        <text x="288" y="246">FEASIBILITY</text><text x="288" y="264" font-size="11" font-weight="600" fill="#3d47c7">tech constraints</text>
      </g>
      <g class="core" pointer-events="none">
        <polygon points="166,166 194,166 180,190" fill="#5863E7"/>
        <text x="180" y="212" font-size="10.5" font-weight="700" fill="#1E2130" text-anchor="middle" letter-spacing="1.5">THE PRODUCT</text>
      </g>
      <g font-size="9.5" fill="#1E2130" opacity=".65" text-anchor="middle" class="svg-body" pointer-events="none">
        <text x="128" y="150">wanted +</text><text x="128" y="161">worth it</text>
        <text x="232" y="150">wanted +</text><text x="232" y="161">buildable</text>
        <text x="180" y="276">worth it +</text><text x="180" y="287">buildable</text>
      </g>
    </svg>
    <div class="venn-info">
      <div class="lens" data-l="d"><h4><i style="background:#8CE7E5"></i>Desirability — user needs</h4><p>What problem are we solving, and for whom? Would they notice if it disappeared?</p></div>
      <div class="lens" data-l="v"><h4><i style="background:#F2D8A5"></i>Viability — business goals</h4><p>Why now, and why this instead of something else? What does it cost to keep alive?</p></div>
      <div class="lens" data-l="f"><h4><i style="background:#5863E7"></i>Feasibility — technical constraints</h4><p>Can we build and maintain it with the team and data we actually have?</p></div>
      <div class="lens" data-l="x" style="border-style:dashed"><h4><i style="background:#1E2130"></i>The overlap — and the test</h4><p>How will we know it's working? What does success look like, in numbers or in behaviour?</p></div>
    </div>
  </div>
  <figcaption><b>Why this fits Webbify.</b> Our mark is two triangles intersecting to make a third shape. Product thinking is the same move with three lenses: the product only exists where all of them overlap. A screen that's only desirable is a wish; only feasible is a tech demo; only viable is a spreadsheet.</figcaption>
</figure>

<div class="callout apply">
  <div class="cl-k">How I'm applying this</div>
  <p>Before every crit, I'll write the three lenses as one line each at the top of the Figma page — <em>who wants this, why it's worth it, what makes it hard to build</em> — and a fourth line for the success signal. If I can't fill a line, that's the real problem, not the layout.</p>
</div>

<h2 id="outcomes"><span class="n">04</span>Outcomes, not artifacts</h2>
<p>Busyness is easy to mistake for impact. Workshops, giant Figma files and persona decks are only worth anything if something changed because of them. Duncombe gives a simple structure for telling the story of a project, and three buckets for what "impact" can mean.</p>

<figure class="viz">
  <div class="viz-title">How to tell the story of any project</div>
  <svg viewBox="0 0 760 300" role="img" aria-label="Before, Process, After arrows, with impact landing in three buckets: Product, Process, People.">
    <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#5863E7"/></marker></defs>
    <g font-size="12.5" fill="#1E2130" text-anchor="middle">
      <rect x="20" y="24" width="200" height="86" rx="16" fill="#F7F7F7" stroke="#1E2130" stroke-opacity=".1"/>
      <text x="120" y="52" font-weight="700" font-size="14">BEFORE</text><text x="120" y="74" class="svg-body" fill="#666" font-size="12">what wasn't working?</text><text x="120" y="92" class="svg-body" fill="#9aa0ad" font-size="11">the problem, in the user's words</text>
      <rect x="280" y="24" width="200" height="86" rx="16" fill="#fff" stroke="#5863E7" stroke-width="1.5"/>
      <text x="380" y="52" font-weight="700" font-size="14" fill="#5863E7">PROCESS</text><text x="380" y="74" class="svg-body" fill="#666" font-size="12">what did you do?</text><text x="380" y="92" class="svg-body" fill="#9aa0ad" font-size="11">incl. the soft skills &amp; the messy middle</text>
      <rect x="540" y="24" width="200" height="86" rx="16" fill="#5863E7"/>
      <text x="640" y="52" font-weight="700" font-size="14" fill="#fff">AFTER</text><text x="640" y="74" class="svg-body" fill="#fff" fill-opacity=".85" font-size="12">what changed?</text><text x="640" y="92" class="svg-body" fill="#fff" fill-opacity=".6" font-size="11">for users, team, or business</text>
    </g>
    <line x1="222" y1="67" x2="276" y2="67" stroke="#5863E7" stroke-width="2" marker-end="url(#arr)"/>
    <line x1="482" y1="67" x2="536" y2="67" stroke="#5863E7" stroke-width="2" marker-end="url(#arr)"/>
    <path d="M640 112 C640 150, 130 130, 130 168" fill="none" stroke="#BBBEF3" stroke-width="1.5" stroke-dasharray="4 4"/>
    <path d="M640 112 L640 168" fill="none" stroke="#BBBEF3" stroke-width="1.5" stroke-dasharray="4 4"/>
    <path d="M640 112 C640 150, 385 130, 385 168" fill="none" stroke="#BBBEF3" stroke-width="1.5" stroke-dasharray="4 4"/>
    <rect x="282" y="138" width="196" height="18" rx="9" fill="#fff"/><text x="380" y="151" font-size="10.5" fill="#9aa0ad" text-anchor="middle" class="svg-body">impact can land in any of three buckets</text>
    <g font-size="12" fill="#1E2130" text-anchor="middle">
      <g><rect x="20" y="170" width="220" height="110" rx="16" fill="#D5F7F6"/><polygon points="40,192 58,192 49,207" fill="#1a7a78"/><text x="130" y="206" font-weight="800" font-size="14">PRODUCT</text><text x="130" y="228" class="svg-body" fill="#1a7a78" font-size="11.5">metrics or experience</text><text x="130" y="246" class="svg-body" fill="#666" font-size="11">activation ↑ · drop-off ↓</text><text x="130" y="262" class="svg-body" fill="#666" font-size="11">fewer support tickets</text></g>
      <g><rect x="270" y="170" width="220" height="110" rx="16" fill="#F7E8C9"/><polygon points="290,192 308,192 299,207" fill="#8a6410"/><text x="380" y="206" font-weight="800" font-size="14">PROCESS</text><text x="380" y="228" class="svg-body" fill="#8a6410" font-size="11.5">how the team works</text><text x="380" y="246" class="svg-body" fill="#666" font-size="11">clearer decisions</text><text x="380" y="262" class="svg-body" fill="#666" font-size="11">a workflow that got shorter</text></g>
      <g><rect x="520" y="170" width="220" height="110" rx="16" fill="#E4E6FB"/><polygon points="540,192 558,192 549,207" fill="#5863E7"/><text x="630" y="206" font-weight="800" font-size="14">PEOPLE</text><text x="630" y="228" class="svg-body" fill="#3d47c7" font-size="11.5">collaboration &amp; trust</text><text x="630" y="246" class="svg-body" fill="#666" font-size="11">aligned stakeholders</text><text x="630" y="262" class="svg-body" fill="#666" font-size="11">a healthier design culture</text></g>
    </g>
  </svg>
  <figcaption><b>The one question.</b> "What will be different for users, my team, or the business because of this work?" If the answer is "there's a new Figma file," it isn't an outcome yet.</figcaption>
</figure>

<h2 id="messy"><span class="n">05</span>Design is messy — your portfolio just hides it</h2>
<p>The tidy case study (research → define → explore → test → ship) is a fiction we write afterwards. Real work loops back, abandons good ideas, re-scopes when engineering says no, and changes direction after one stakeholder conversation. Duncombe calls the rest "the work around the work" — alignment, raising the bar without losing trust, turning strategy into concrete screens, deciding with incomplete information.</p>

<figure class="viz tint">
  <div class="viz-title">What the case study says vs. what actually happened</div>
  <svg viewBox="0 0 760 250" role="img" aria-label="A straight five-step path labelled 'the case study' above a tangled looping path labelled 'the actual project' that reaches the same destination.">
    <text x="20" y="30" font-size="11" font-weight="600" fill="#9aa0ad" letter-spacing="1.5">THE CASE STUDY</text>
    <line x1="30" y1="62" x2="730" y2="62" stroke="#BBBEF3" stroke-width="2"/>
    <g font-size="11.5" font-weight="600" fill="#1E2130" text-anchor="middle">
      <circle cx="60" cy="62" r="9" fill="#fff" stroke="#5863E7" stroke-width="2"/><text x="60" y="90">research</text>
      <circle cx="220" cy="62" r="9" fill="#fff" stroke="#5863E7" stroke-width="2"/><text x="220" y="90">define</text>
      <circle cx="380" cy="62" r="9" fill="#fff" stroke="#5863E7" stroke-width="2"/><text x="380" y="90">explore</text>
      <circle cx="540" cy="62" r="9" fill="#fff" stroke="#5863E7" stroke-width="2"/><text x="540" y="90">test</text>
      <polygon points="690,52 710,52 700,70" fill="#5863E7"/><text x="700" y="90">ship</text>
    </g>
    <text x="20" y="130" font-size="11" font-weight="600" fill="#9aa0ad" letter-spacing="1.5">THE ACTUAL PROJECT</text>
    <path d="M60 190 C 110 140, 150 240, 200 190 S 250 120, 180 150 S 330 230, 300 170 C 330 120, 400 130, 390 190 C 380 240, 450 230, 460 180 S 420 130, 470 150 C 520 170, 560 240, 600 190 C 620 160, 650 160, 700 160"
      fill="none" stroke="#5863E7" stroke-width="2.5" stroke-linecap="round"/>
    <g font-size="10.5" fill="#666" class="svg-body">
      <circle cx="180" cy="150" r="5" fill="#F2D8A5" stroke="#8a6410"/><text x="190" y="140">stakeholder said no</text>
      <circle cx="300" cy="170" r="5" fill="#8CE7E5" stroke="#1a7a78"/><text x="246" y="222">research surprised us</text>
      <circle cx="460" cy="180" r="5" fill="#F2D8A5" stroke="#8a6410"/><text x="470" y="222">eng constraint → re-scope</text>
      <circle cx="390" cy="190" r="5" fill="#fff" stroke="#9aa0ad"/><text x="356" y="238">cut a good idea</text>
    </g>
    <circle cx="60" cy="190" r="9" fill="#fff" stroke="#5863E7" stroke-width="2"/>
    <polygon points="690,150 710,150 700,168" fill="#5863E7"/>
    <text x="700" y="186" font-size="11.5" font-weight="600" fill="#1E2130" text-anchor="middle">ship</text>
  </svg>
  <figcaption><b>Same destination, different route.</b> Showing where you were wrong, what surprised you, and what you had to cut isn't a weakness in a portfolio — it's the signal of maturity reviewers are looking for.</figcaption>
</figure>

<p>The line I underlined: designers <strong>de-risk investment</strong>. We make the future visible — prototypes, frames, flows — so teams can decide on something concrete instead of an argument. That's a much better description of the job than "makes screens."</p>

<h2 id="portfolio"><span class="n">06</span>What a portfolio is actually being read for</h2>
<p>Three things, in this order of weight: the product and UX thinking (problem, audience, constraints, trade-offs, impact — qualitative is fine); the narrative (context, the messy middle, what you learned — a story, not a slide deck); and only then the visual presentation (clean layout, intentional type, hierarchy — it signals taste and care, but it isn't the point).</p>

<figure class="viz">
  <div class="viz-title">Three lenses a reviewer uses — weighted</div>
  <svg viewBox="0 0 760 140" role="img" aria-label="Three horizontal bars of decreasing width: the thinking, the narrative, the presentation.">
    <g font-size="13" font-weight="700" fill="#1E2130">
      <rect x="20" y="16" width="720" height="32" rx="16" fill="#5863E7"/><text x="36" y="37" fill="#fff">1 · The thinking — problem, constraints, trade-offs, impact</text>
      <rect x="20" y="58" width="560" height="32" rx="16" fill="#8CE7E5"/><text x="36" y="79">2 · The narrative — context, the messy middle, reflection</text>
      <rect x="20" y="100" width="380" height="32" rx="16" fill="#F2D8A5"/><text x="36" y="121">3 · The presentation — layout, type, hierarchy</text>
    </g>
  </svg>
  <figcaption><b>No real projects yet?</b> Build a speculative case study: pick a real company, research its strategic goals, find an opportunity that fits, design for it, and make the decisions — not the AI output — the hero of the story.</figcaption>
</figure>

<h2 id="paths"><span class="n">07</span>Non-traditional paths are a feature</h2>
<p>Duncombe studied film and worked as a director and editor before product design; she now builds creative tools for video people. That isn't a coincidence — it's the move. Domain expertise from a previous life is an asset when you point it at products for people like your former self. The prompts she suggests: what apps do I use daily, what frustrates me, what would I change, and who is building tools for people like me?</p>

<div class="callout note">
  <div class="cl-k">Note to self</div>
  <p>My "previous life" is four years inside an environmental data organisation. The products I understand from the inside are the ones conservation practitioners and institutional teams actually use. That's a fingerprint, not a detour — and it's the same logic behind Webbify going deep on schools and foundations first.</p>
</div>

<h2 id="fingerprint"><span class="n">08</span>Find your design fingerprint</h2>
<p>Designers are wired differently, and each has a core set of natural strengths. Duncombe sketches five archetypes. Nobody is one of them purely — the point is to know which two or three energise you, so you choose projects, tell your story and position yourself accordingly. Drag the sliders to sketch yours.</p>

<figure class="viz">
  <div class="viz-title">Design fingerprint — a quick self-sketch</div>
  <div class="radar-wrap">
    <svg id="radar" viewBox="-40 0 440 340" role="img" aria-label="A five-axis radar chart of design archetypes: Engineering collaborator, Product thinker, Visionary storyteller, Researcher, Inclusion and ethics advocate."></svg>
    <div>
      <div class="sliders" id="sliders"></div>
      <div class="fp-result" id="fpres"></div>
      <div class="radar-note">Prompts from the essay: what energises vs. drains you? When are you most in your element? How would a colleague describe you in one sentence?</div>
    </div>
  </div>
  <figcaption><b>Where it shows up.</b> In the projects you say yes to, the way you tell your case studies, and how you position yourself in interviews. The chart isn't a test — it's a mirror.</figcaption>
</figure>

<h2 id="start"><span class="n">09</span>So how do you actually start?</h2>
<p>You don't need permission, a title, or a degree. Start with the products you already use, the tools you can already access, and curiosity. A less conventional path can still be a distinctive one — that's the essay's closing note and the one I most needed to hear.</p>

<div class="callout key">
  <div class="cl-k">What I'm keeping</div>
  <ul class="checklist" style="margin-top:4px">
    <li>Write the three lenses + the success signal at the top of every design file before the first frame.</li>
    <li>When describing work, lead with Before → After, then process. Name which bucket the impact landed in.</li>
    <li>Keep one honest "what I got wrong / what I cut" paragraph in every case study.</li>
    <li>Treat each new AI tool as a two-hour play session, not a course to enrol in.</li>
    <li>Pick projects that use the previous-life expertise, on purpose.</li>
  </ul>
</div>

<p style="margin-top:2.5em;font-size:14px;color:#9aa0ad">These are reading notes and my own interpretation; the framing, archetypes and story structure belong to Gabi Duncombe — go read <a href="https://gabiduncombe.medium.com/becoming-a-product-designer-in-the-age-of-ai-without-losing-the-plot-c5f11d9f5b02" target="_blank" rel="noopener">the original</a>, it's worth the ten minutes.</p>
`
  },
  {
    slug: 'calm-tech-principles-for-product-designers',
    title: 'Calm Technology, applied: eight principles for product designers',
    excerpt:
      "Attention is the scarce resource, not screen space. Here's how I'm reading Amber Case's Calm Tech principles through the lens of dashboards, nonprofit sites and research.",
    date: '2026-10-30',
    topic: 'design',
    collection: 'calm-tech',
    tags: ['calm-tech', 'attention', 'dashboards', 'principles', 'ux'],
    featured: true,
    sources: [
      { t: 'Principles of Calm Technology — Calm Tech Institute', u: 'https://www.calmtech.institute/calm-tech-principles' },
      {
        t: 'Calm Technology: Principles and Patterns for Non-Intrusive Design (A. Case, 2015)',
        u: 'https://www.amazon.com/Calm-Technology-Principles-Patterns-Non-Intrusive/dp/1491925884'
      }
    ],
    body: `
<p>Most of my work is data-heavy screens for people who have better things to do than look at screens: conservation practitioners checking a decision tool, a school admin updating a page, a stakeholder glancing at a dashboard in a meeting. Calm Technology is the clearest framework I've found for that situation, so I'm writing it down the way I actually intend to use it.</p>

<p>The lineage is Mark Weiser and John Seely Brown at Xerox PARC in the mid-90s, who argued that the scarce resource in computing was no longer processing power but <strong>human attention</strong>. Amber Case turned that into eight principles and a certification. The one-sentence version:</p>

<blockquote>A good tool does its job and gets out of the way. The user should finish the task, not admire the interface.</blockquote>

<p>That reframes success metrics. Engagement, time-on-screen and feature count are often <em>anti</em>-signals here. The better question: how much attention did we have to borrow to deliver the value?</p>

<h2 id="principles">The eight principles</h2>

<div class="principle">
  <div class="pn">1</div>
  <div>
    <h3>Require the smallest possible amount of attention</h3>
    <p>Deliver information at the lowest attention cost that still works. Case uses a ladder: a kettle whistle, a dimmed LED, a vibration — each is a cheaper interrupt than a modal dialog.</p>
    <p><strong>For me:</strong> a dashboard should answer "do I need to act?" at a glance before it offers the full analysis. I audit screens by asking what a user learns in 2 seconds, 10 seconds and 2 minutes — and whether the 2-second layer even exists. Most data products skip it.</p>
  </div>
</div>
<div class="principle">
  <div class="pn">2</div>
  <div>
    <h3>Inform and create calm</h3>
    <p>A signal should leave the person more settled, not less. "Everything is fine" is a legitimate, valuable message. Alerts carry only what's needed to decide.</p>
    <p><strong>For me:</strong> empty states, status indicators and loading states are where this lives. "No alerts in your region" is calmer than a blank panel. A persistent <em>nothing needs you</em> state is a designed feature, not an absence.</p>
  </div>
</div>
<div class="principle">
  <div class="pn">3</div>
  <div>
    <h3>Make use of the periphery</h3>
    <p>Attention has a center and an edge. Good design moves information between them: ambient when things are normal, foregrounded only when action is needed, then back.</p>
    <p><strong>For me:</strong> glanceable, persistent context (a map thumbnail, a sparkline, a subtle coloured border) over dialogs and badges. The periphery of a dashboard is its sidebars, header strips and chart annotations. For every element: center or edge — and does it know how to move between them?</p>
  </div>
</div>
<div class="principle">
  <div class="pn">4</div>
  <div>
    <h3>Amplify the best of technology and the best of humanity</h3>
    <p>Machines are good at consistency, memory and computation; humans at judgment, context and care. Don't make people do machine work, and don't make machines fake human work.</p>
    <p><strong>For me:</strong> this is the design argument for AI-assisted products. Let the system pre-compute, pre-filter and remember; keep the interpretive call visibly in the practitioner's hands, with the reasoning exposed. It's also Webbify's "AI-powered, human-piloted" in one line.</p>
  </div>
</div>
<div class="principle">
  <div class="pn">5</div>
  <div>
    <h3>Communicate without speaking</h3>
    <p>Prefer non-verbal channels where they suffice: colour, shape, position, sound, motion. Language is expensive to parse; a tone or a light is not.</p>
    <p><strong>For me:</strong> bilingual products benefit most. Every icon, colour code or spatial convention that carries meaning is one less string to translate and one less thing that breaks across cultures. Build a small visual vocabulary and use it consistently so users learn it once.</p>
  </div>
</div>
<div class="principle">
  <div class="pn">6</div>
  <div>
    <h3>Still work when it fails</h3>
    <p>Graceful degradation. An escalator that stops is still stairs. A system needs a useful lowest state: offline, slow network, missing data, old browser.</p>
    <p><strong>For me:</strong> for field users on patchy connections this is a core requirement. Show cached data with an honest "as of" timestamp rather than a spinner. Make exports (PDF, static map) first-class so the tool's value survives without the tool. For websites: progressive enhancement, readable without JS.</p>
  </div>
</div>
<div class="principle">
  <div class="pn">7</div>
  <div>
    <h3>The minimum tech needed to solve the problem</h3>
    <p>Don't add sensors, screens, AI or features beyond what the problem requires. Every capability has an attention and maintenance cost.</p>
    <p><strong>For me:</strong> my strongest tool against scope creep. Write the problem in one sentence, then ask what the least sophisticated thing that solves it would be. A good table often beats a 3D map; a scheduled email beats a real-time feed. For schools and foundations, "minimum tech" is also a budget and maintenance argument they understand instantly.</p>
  </div>
</div>
<div class="principle">
  <div class="pn">8</div>
  <div>
    <h3>Respect social norms</h3>
    <p>Technology enters existing human contexts — meetings, homes, hierarchies. It should fit those norms and be introduced gradually so they can adapt.</p>
    <p><strong>For me:</strong> in research this means studying how decisions actually get made (who presents to whom, in what format, in what language) before designing anything. A dashboard projected in a stakeholder meeting has different norms from one used alone at a desk. In Indonesian institutional contexts, how information moves up a hierarchy and what a "report" looks like are design constraints, not details.</p>
  </div>
</div>

<h2 id="pillars">The four certification pillars</h2>
<p>Calm Tech Certified evaluates products on <strong>periphery engagement, tactility, material harmony</strong> and <strong>durability</strong>. Two sound hardware-only, but they translate:</p>
<ul>
  <li><strong>Periphery engagement</strong> → principle 3. Can the product be used ambiently?</li>
  <li><strong>Tactility</strong> → in software, the honesty of feedback. Does every interaction acknowledge input immediately and proportionately? Does motion confirm rather than decorate?</li>
  <li><strong>Material harmony</strong> → does the product fit its visual and cultural environment instead of imposing a brand onto it?</li>
  <li><strong>Durability</strong> → does it keep working for years? Low dependency count, stable URLs, exportable data, no forced upgrades. For nonprofit tools with thin maintenance budgets, this is a day-one design decision.</li>
</ul>

<h2 id="discipline">Making it a discipline, not a mood</h2>
<div class="callout apply">
  <div class="cl-k">How I'm applying this</div>
  <p><strong>Attention budget in specs.</strong> Next to the user story, write the maximum attention the feature may demand ("glanceable; one click to resolve"). Treat it like a performance budget.</p>
  <p><strong>Calm Tech heuristic review.</strong> Use the eight principles as a lens in critiques, the way you'd use Nielsen. Principles 1, 6 and 7 catch the most issues in data products.</p>
  <p><strong>Failure states as deliverables.</strong> Offline, stale, empty and error states are part of every component spec, not an afterthought.</p>
  <p><strong>Research questions that probe attention.</strong> Ask what people check first, what they ignore, what interrupts them, what they wish would just say "fine".</p>
  <p><strong>Say no with principle 7.</strong> It gives a shared, non-personal vocabulary for pushing back on feature requests.</p>
</div>

<p>I'll keep adding to this collection as I try these in real projects. The checklist version lives in a <a href="/insights/calm-tech-crit-checklist">separate note</a>.</p>
`
  },
  {
    slug: 'calm-tech-crit-checklist',
    title: 'A Calm Tech checklist for design critiques',
    excerpt:
      'The eight principles compressed into questions I can ask of any screen in under five minutes — now as a live scorecard you can run on a real screen.',
    date: '2026-10-30',
    topic: 'craft',
    collection: 'calm-tech',
    tags: ['calm-tech', 'critique', 'checklist', 'dashboards', 'interactive'],
    sources: [{ t: 'Principles of Calm Technology — Calm Tech Institute', u: 'https://www.calmtech.institute/calm-tech-principles' }],
    init: 'calmCrit',
    body: `
<p>A companion to <a href="/insights/calm-tech-principles-for-product-designers">the longer breakdown</a>. Use it in a crit, on a Figma frame, or on a live screen. Not every question applies to every screen — skip the ones that don't. Your answers are saved in this browser per screen name, so you can come back to the same screen after a revision and see what moved.</p>

<h2 id="attention-ladder">First, the attention ladder</h2>
<p>Every signal a screen sends has a cost. Calm Tech's first rule is to pick the <strong>lowest rung that still works</strong>. Drag the handle to see what each rung demands of the person on the other side.</p>

<figure class="viz">
  <div class="viz-title">The attention ladder — pick the lowest rung that works</div>
  <div class="ladder" id="ladder">
    <svg viewBox="0 0 760 210" role="img" aria-label="A ladder of signals from quiet to loud: ambient colour, peripheral indicator, inline status, badge, toast, sound or vibration, modal dialog, blocking alert. The selected rung is highlighted."></svg>
    <input type="range" min="0" max="7" value="2" id="ladder-range" aria-label="Attention level">
    <div class="ladder-info">
      <div class="ladder-k" id="ladder-k"></div>
      <div class="ladder-d" id="ladder-d"></div>
    </div>
  </div>
  <figcaption><b>The test.</b> Could this signal move one rung down and still get the job done? If yes, it's borrowing attention it doesn't need.</figcaption>
</figure>

<h2 id="scorecard">The scorecard</h2>
<p>Name the screen, then answer each question. <em>Yes</em> means the screen already does this well; <em>Partly</em> means it's there but weak; <em>No</em> means it isn't. Skip anything that doesn't apply — it won't count against you.</p>

<div class="crit" id="crit">
  <div class="crit-top">
    <label class="crit-name"><span>Screen being reviewed</span><input id="crit-screen" type="text" placeholder="e.g. NbS Tool — site overview" autocomplete="off"></label>
    <div class="crit-actions">
      <button class="pill" id="crit-copy">Copy summary</button>
      <button class="pill" id="crit-reset">Reset</button>
    </div>
  </div>

  <div class="crit-score">
    <div class="ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="rgba(30,33,48,.08)" stroke-width="10"/><circle id="ring-arc" cx="60" cy="60" r="50" fill="none" stroke="#5863E7" stroke-width="10" stroke-linecap="round" stroke-dasharray="314" stroke-dashoffset="314" transform="rotate(-90 60 60)"/></svg><div class="ring-n"><b id="ring-val">–</b><small>calm</small></div></div>
    <div class="bars" id="crit-bars"></div>
  </div>

  <div class="crit-groups" id="crit-groups"></div>

  <div class="crit-verdict" id="crit-verdict"></div>
</div>

<h2 id="principle-map">Which principle does each question serve?</h2>
<p>The checklist is the eight principles folded into five groups. Hover a principle to see which questions carry it — and notice that principles 1, 6 and 7 are spread across the most questions. That's not an accident; they're the ones that catch the most problems in data products.</p>

<figure class="viz tint">
  <div class="viz-title">Principle → question map</div>
  <div class="pmap" id="pmap"></div>
  <figcaption><b>How to read it.</b> A principle with many lines is doing a lot of work in this checklist. A question with many lines is a good one to ask first.</figcaption>
</figure>

<div class="callout note">
  <div class="cl-k">Note to self</div>
  <p>Run this once on the NbS Tool and once on a Webbify client site, then revise. A checklist that hasn't been used is just a wish list.</p>
</div>
`
  },
  {
    slug: 'how-this-notebook-is-organised',
    title: 'How this notebook is organised',
    excerpt:
      'Three levels of grouping — topics, collections, tags — so the page stays navigable as it grows past a handful of notes.',
    date: '2026-10-30',
    topic: 'notes',
    collection: 'design-ops',
    tags: ['meta', 'content-system', 'information-architecture'],
    body: `
<p>I want this page to work when it has three notes and when it has three hundred. Most personal blogs fail at the second case because they only have one axis: time. Here's the structure I'm starting with.</p>

<h2 id="levels">Three levels, coarse to fine</h2>
<ol>
  <li><strong>Topic</strong> — exactly one per note. The broad section: <code>design</code>, <code>research</code>, <code>product</code>, <code>craft</code>, <code>notes</code>. Topics are few and stable.</li>
  <li><strong>Collection</strong> — optional, one per note. A learning track that can cross topics. "Calm Technology" can hold a design note, a research note and a checklist. Collections are the thing I'm <em>currently</em> working through; they come and go.</li>
  <li><strong>Tags</strong> — many per note, free-form. Cross-cutting and cheap. They power related-note suggestions and the tag cloud.</li>
</ol>

<div class="callout key">
  <div class="cl-k">The rule</div>
  <p>If I'm not sure where something goes: topic is <em>what kind of thing is this</em>, collection is <em>what am I learning</em>, tag is <em>what does it touch</em>.</p>
</div>

<h2 id="why">Why not just categories?</h2>
<p>A single category tree forces every note into one box and breaks the moment something fits two. Topic + collection + tags gives three orthogonal views of the same notes without a hierarchy I'll regret later. It also maps cleanly to frontmatter if these notes ever move into MDX files.</p>

<h2 id="later">What's deliberately missing (for now)</h2>
<ul>
  <li>No comments. Conversation happens over email or in person.</li>
  <li>No reading-time gamification, no streaks. Calm, remember?</li>
  <li>No images until a note genuinely needs one. The covers are generated from the brand geometry.</li>
</ul>
`
  }
];

/* ---------- helpers ---------- */

export const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const readTime = (html: string) =>
  Math.max(1, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 220));

export const mins = (p: Post) => p.readMins || readTime(p.body);

export const bySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

/** Table of contents from the body's h2 headings — they all carry an id. */
export const toc = (p: Post) =>
  [...p.body.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map(([, id, inner]) => ({
    id,
    label: inner
      .replace(/<[^>]+>/g, ' ')
      .replace(/^\s*\d+\s*/, '')
      .replace(/\s+/g, ' ')
      .trim()
  }));

export const byDate = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export const COVER_BG: Record<Topic, string> = {
  design: '#EEF0FD',
  research: '#E9F9F8',
  product: '#FAF1E2',
  craft: '#EAF9F0',
  notes: '#F1F2F6'
};

/** Deterministic brand-geometry cover per post — no image assets needed. */
export function coverSvg(post: Post) {
  let h = 0;
  for (const c of post.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = (n: number) => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return (h / 4294967296) * n;
  };
  const palettes: Record<Topic, string[]> = {
    design: ['#5863E7', '#7982EC', '#BBBEF3'],
    research: ['#8CE7E5', '#A3ECEA', '#D5F7F6'],
    product: ['#F2D8A5', '#F3DCB0', '#F7E8C9'],
    craft: ['#25D366', '#7CE5A4', '#C9F3D9'],
    notes: ['#1E2130', '#5863E7', '#BBBEF3']
  };
  const p = palettes[post.topic];
  let tris = '';
  for (let i = 0; i < 7; i++) {
    const x = r(400),
      y = r(240),
      s = 40 + r(120),
      rot = r(360),
      col = p[i % 3],
      op = (0.35 + r(0.5)).toFixed(2);
    tris += `<polygon points="${x},${y} ${x + s},${y} ${x + s / 2},${y + s * 0.87}" fill="${col}" opacity="${op}" transform="rotate(${rot.toFixed(0)} ${x + s / 2} ${y + s / 2})"/>`;
  }
  return `<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">${tris}</svg>`;
}
