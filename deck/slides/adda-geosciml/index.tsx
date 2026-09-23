import { Step, Steps, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useEffect, useRef } from 'react';
import geoscimlLogo from '@assets/geosciml-logo.png';
import figL964dvar from '@assets/L96_4D-Var.png';
import figQG from '@assets/QG_figure.png';
import figEmulator from '@assets/Emulator.png';
import figLDA from '@assets/LDA.png';
import figExponaxKS from '@assets/ExponaxKS.png';

export const design: DesignSystem = {
  palette: { bg: '#ffffff', text: '#1a2b36', accent: '#1e7f9e' },
  fonts: {
    display: '"Helvetica Neue", Helvetica, system-ui, sans-serif',
    body: '"Helvetica Neue", Helvetica, system-ui, sans-serif',
  },
  typeScale: { hero: 120, body: 32 },
  radius: 0,
};

const MUTED = '#5f7280';
const TEAL_DARK = '#173d4d';
const TEAL_SOFT = '#eaf5f8';
const TEAL_CY = '#c2f0f8';
const LINE = '#dfe7eb';
const INK_CODE = '#0a1a22';
const MONO = '"SF Mono", SFMono-Regular, Menlo, Consolas, monospace';

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
} as const;

const page = {
  ...fill,
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  padding: '64px 120px 56px',
  display: 'flex',
  flexDirection: 'column' as const,
};

const TopBar = ({ label }: { label: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 44,
      left: 120,
      right: 120,
      display: 'flex',
      alignItems: 'center',
      gap: 36,
    }}
  >
    <img src={geoscimlLogo} alt="GeoSciML logo" style={{ width: 112, height: 'auto' }} />
    <div
      style={{
        fontSize: 40,
        fontWeight: 500,
        color: 'var(--osd-accent)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
  </div>
);

const SectionLabel = ({ n, text }: { n: string; text: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 24,
      color: 'var(--osd-accent)',
    }}
  >
    <span style={{ fontSize: 34, fontWeight: 600 }}>{n}</span>
    <span
      style={{
        fontSize: 34,
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}
    >
      {text}
    </span>
  </div>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 64,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
      margin: '10px 0 0',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </h2>
);

const RepoBadge = ({ light }: { light?: boolean }) => (
  <a
    href="https://github.com/m-dml/adda"
    target="_blank"
    rel="noreferrer"
    style={{
      position: 'absolute',
      top: 56,
      right: 120,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      textDecoration: 'none',
    }}
  >
    <svg width={68} height={68} viewBox="0 0 16 16" fill={light ? '#f2fbfd' : 'var(--osd-text)'}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 38,
        color: light ? '#f2fbfd' : 'var(--osd-text)',
      }}
    >
      m-dml/adda
    </span>
  </a>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        right: 120,
        bottom: 40,
        display: 'flex',
        gap: 24,
        fontFamily: MONO,
        fontSize: 22,
        color: 'var(--osd-accent)',
        letterSpacing: '0.06em',
      }}
    >
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li style={{ fontSize: 34, lineHeight: 1.5, marginBottom: 24, listStyle: 'none' }}>
    <span style={{ color: 'var(--osd-accent)', fontWeight: 600, marginRight: 20 }}>—</span>
    {children}
  </li>
);

const Col = ({ children }: { children: React.ReactNode }) => (
  <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>{children}</ul>
);

const Content = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

const FigCaption = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: 22,
      lineHeight: 1.4,
      color: MUTED,
      margin: '12px 0 0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textAlign: 'center',
      flexShrink: 0,
    }}
  >
    {children}
  </p>
);

const PageNumOnly = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <span
      style={{
        position: 'absolute',
        right: 120,
        bottom: 40,
        fontFamily: MONO,
        fontSize: 22,
        color: 'var(--osd-accent)',
        letterSpacing: '0.06em',
      }}
    >
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  );
};

/* Minimal syntax highlighting for code blocks (no extra dependencies). */

const HL_KEYWORD = '#7fd4ff';
const HL_STRING = '#b8e986';
const HL_COMMENT = '#5d8496';
const HL_NUMBER = '#f0b6d0';
const HL_DECOR = '#c2a8ff';
const HL_BASE = TEAL_CY;

const PY_KEYWORDS = new Set([
  'class', 'def', 'return', 'if', 'isinstance', 'import', 'from', 'as', 'in', 'for',
  'self', 'None', 'True', 'False', 'lambda', 'with', 'not', 'and', 'or', 'else', 'while',
]);

const highlightLine = (line: string) => {
  // whole-line comment
  const trimmed = line.trimStart();
  if (trimmed.startsWith('#')) {
    return <span style={{ color: HL_COMMENT }}>{line}</span>;
  }
  // split into tokens: strings, comments, words, numbers, everything else
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  const pushPlain = (txt: string) => {
    if (txt) out.push(<span key={key++}>{txt}</span>);
  };
  while (i < line.length) {
    const ch = line[i];
    // comment start mid-line
    if (ch === '#') {
      out.push(
        <span key={key++} style={{ color: HL_COMMENT }}>
          {line.slice(i)}
        </span>,
      );
      break;
    }
    // string literal
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < line.length && (line[j] !== ch || line[j - 1] === '\\')) j++;
      // triple-quoted docstring start
      if (line.slice(i, i + 3) === ch.repeat(3)) {
        j = line.indexOf(ch.repeat(3), i + 3);
        j = j === -1 ? line.length : j + 3;
      } else {
        j = j === line.length ? line.length : j + 1;
      }
      out.push(
        <span key={key++} style={{ color: HL_STRING }}>
          {line.slice(i, j)}
        </span>,
      );
      i = j;
      continue;
    }
    // word or number
    if (/[A-Za-z0-9_]/.test(ch)) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (PY_KEYWORDS.has(word)) {
        out.push(
          <span key={key++} style={{ color: HL_KEYWORD, fontWeight: 600 }}>
            {word}
          </span>,
        );
      } else if (/^[0-9]/.test(word) && /^[0-9][0-9a-zA-Z_.]*$/.test(word)) {
        out.push(
          <span key={key++} style={{ color: HL_NUMBER }}>
            {word}
          </span>,
        );
      } else if (word[0] >= 'A' && word[0] <= 'Z') {
        // class-like names
        out.push(
          <span key={key++} style={{ color: HL_DECOR }}>
            {word}
          </span>,
        );
      } else {
        pushPlain(word);
      }
      i = j;
      continue;
    }
    pushPlain(ch);
    i++;
  }
  return <span>{out}</span>;
};

const Code = ({ lines, title }: { lines: string[]; title?: string }) => (
  <div
    style={{
      background: INK_CODE,
      borderRadius: 8,
      padding: '18px 28px',
      fontFamily: MONO,
      fontSize: 24,
      lineHeight: 1.45,
      color: HL_BASE,
    }}
  >
    {title ? (
      <div style={{ fontSize: 18, color: '#6a93a3', marginBottom: 10, letterSpacing: '0.08em' }}>
        {title}
      </div>
    ) : null}
    <pre style={{ margin: 0, whiteSpace: 'pre' }}>
      {lines.map((l, i) => (
        <span key={i}>
          {highlightLine(l)}
          {i < lines.length - 1 ? '\n' : ''}
        </span>
      ))}
    </pre>
  </div>
);

let katexLoading: Promise<void> | null = null;

const loadKatex = () => {
  if (!katexLoading) {
    katexLoading = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css';
      document.head.appendChild(css);
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('katex failed to load'));
      document.head.appendChild(s);
    });
  }
  return katexLoading;
};

declare global {
  interface Window {
    katex?: {
      render: (
        tex: string,
        el: HTMLElement,
        opts?: { displayMode?: boolean; throwOnError?: boolean },
      ) => void;
    };
  }
}

const Tex = ({ tex, display = true }: { tex: string; display?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let cancelled = false;
    loadKatex()
      .then(() => {
        if (!cancelled && ref.current && window.katex) {
          ref.current.innerHTML = '';
          window.katex.render(tex, ref.current, { displayMode: display, throwOnError: false });
        }
      })
      .catch(() => {
        if (!cancelled && ref.current) ref.current.textContent = tex;
      });
    return () => {
      cancelled = true;
    };
  }, [tex, display]);
  return <span ref={ref} />;
};

const EqBox = ({
  tex,
  tag,
  annotation,
  size,
}: {
  tex: string;
  tag?: string;
  annotation?: string;
  size?: number;
}) => (
  <div style={{ position: 'relative' }}>
    <div
      style={{
        background: TEAL_SOFT,
        borderLeft: '5px solid var(--osd-accent)',
        padding: '20px 70px 20px 34px',
        fontSize: size ?? 34,
      }}
    >
      <Tex tex={tex} />
    </div>
    {tag ? (
      <span
        style={{
          position: 'absolute',
          right: 16,
          top: 16,
          fontFamily: MONO,
          fontSize: 20,
          color: 'var(--osd-accent)',
        }}
      >
        {tag}
      </span>
    ) : null}
    {annotation ? (
      <p style={{ fontSize: 24, color: MUTED, margin: '10px 2px 0', lineHeight: 1.4 }}>
        {annotation}
      </p>
    ) : null}
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: 'inline-block',
      fontFamily: MONO,
      fontSize: 24,
      color: 'var(--osd-accent)',
      background: TEAL_SOFT,
      border: '1px solid var(--osd-accent)',
      borderRadius: 5,
      padding: '4px 12px',
      marginRight: 10,
      verticalAlign: 'middle',
    }}
  >
    {children}
  </span>
);

/* ---------------------------------- PAGES ---------------------------------- */

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 120px',
    }}
  >
    <TopBar label="GeoSciML Discussion Group — Session" />
    <div
      style={{
        fontFamily: MONO,
        fontSize: 26,
        color: 'var(--osd-accent)',
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
      }}
    >
      PAPER + CODE · DATA ASSIMILATION
    </div>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 108,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        margin: '36px 0 0',
        maxWidth: 1620,
      }}
    >
      ADDA
      <span style={{ fontSize: 44, color: MUTED, fontWeight: 400 }}> — </span>
      end-to-end{' '}
      <span style={{ color: 'var(--osd-accent)' }}>differentiable</span>
      <br />
      data assimilation
    </h1>
    <p style={{ fontSize: 30, color: MUTED, margin: '48px 0 0', whiteSpace: 'nowrap' }}>
      Frion, Nguyen-Thanh, Bekar, Nimtz, Zinchenko &amp; Greenberg (Helmholtz-Zentrum Hereon)
    </p>
    <p style={{ fontSize: 28, color: MUTED, margin: '16px 0 0' }}>
      arXiv:2608.23297 · github.com/m-dml/adda
    </p>
    <div
      style={{
        position: 'absolute',
        left: 120,
        bottom: 64,
        fontSize: 40,
        color: 'var(--osd-text)',
      }}
    >
      24 September 2026
    </div>
    <Footer />
  </div>
);

const Why: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="01" text="Motivation" />
    <Heading>Data assimilation works — porting it doesn't</Heading>
    <Content>
    <div style={{ display: 'flex', gap: 56, marginTop: 48 }}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: TEAL_DARK,
            marginBottom: 28,
            textAlign: 'center',
          }}
        >
          DA = simulation ⊕ observations
        </div>
        <Bullet>Estimate states beyond what obs or model alone can give</Bullet>
        <Bullet>Tune simulation parameters; detect model–data conflicts</Bullet>
        <Bullet>A workhorse of operational geoscience — computationally heavy</Bullet>
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <div
              style={{
                background: TEAL_SOFT,
                padding: '36px 40px',
                borderLeft: '5px solid var(--osd-accent)',
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 20,
                  color: 'var(--osd-accent)',
                  letterSpacing: '0.14em',
                  marginBottom: 24,
                }}
              >
                WHY YET ANOTHER FRAMEWORK?
              </div>
              <Bullet>Simulation &amp; assimilation codes rarely interoperate</Bullet>
              <Bullet>Discretizations, staggering, obs sampling hard-wired</Bullet>
              <Bullet>Methods specialized to one model; comparisons costly</Bullet>
              <Bullet>Limited autodiff &amp; parallel support inside simulators</Bullet>
            </div>
          </Step>
        </Steps>
      </div>
    </div>
    </Content>
    <div
      style={{
        position: 'absolute',
        left: 120,
        bottom: 96,
        maxWidth: 820,
        background: TEAL_SOFT,
        borderLeft: '5px solid var(--osd-accent)',
        padding: '20px 28px',
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 26, fontWeight: 600, color: TEAL_DARK }}>
        ADDA
      </span>
      <span style={{ fontSize: 26, color: 'var(--osd-text)' }}>
        {' '}
        — a modular framework for simulating dynamical systems and evaluating DA methods
      </span>
    </div>
    <Footer />
  </div>
);

const DAFormulation: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="02" text="The DA task" />
    <Heading>State-space model with Gaussian noise</Heading>
    <Content>
    <div style={{ display: 'flex', gap: 48, marginTop: 44 }}>
      <div style={{ flex: 1.3, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <EqBox
          tex="\mathbf{x}_{t+1} \;=\; \mathcal{M}(\mathbf{x}_t) + \boldsymbol{\epsilon}_t, \qquad \boldsymbol{\epsilon}_t \sim \mathcal{N}(0, \boldsymbol{\Sigma}_{\epsilon})"
          tag="state (1)"
          size={30}
        />
        <EqBox
          tex="\mathbf{y}_t \;=\; \mathcal{H}_t(\mathbf{x}_t) + \boldsymbol{\eta}_t, \qquad \boldsymbol{\eta}_t \sim \mathcal{N}(0, \boldsymbol{\Sigma}_{\boldsymbol{\eta}_t})"
          tag="obs (2)"
          size={30}
        />
        <EqBox
          tex="\mathbf{x}_0 \;\sim\; \mathcal{N}(\mathbf{x}^B, \boldsymbol{\Sigma}_B)"
          tag="prior (3)"
          size={30}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <Bullet>
              State <Tex tex="\mathbf{x}_t \in \mathbb{R}^s" display={false} />, dynamics{' '}
              <Tex tex="\mathcal{M}" display={false} />, observation operator{' '}
              <Tex tex="\mathcal{H}_t" display={false} /> — both possibly nonlinear
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <Tex tex="\mathcal{H}_t" display={false} /> maps to{' '}
              <Tex tex="\mathbb{R}^{o_t}" display={false} /> with{' '}
              <Tex tex="o_t < s" display={false} /> — observations are sparse, the inverse problem is
              underdetermined
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Task: estimate the whole trajectory{' '}
              <Tex tex="\mathbf{x}_{0:T}" display={false} /> from{' '}
              <Tex tex="\mathbf{y}_{0:T}" display={false} />
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <Tex tex="\mathcal{M}" display={false} /> known, plus noise covariances and the prior
              on <Tex tex="\mathbf{x}_0" display={false} />
            </Bullet>
          </Step>
        </Steps>
      </div>
    </div>
    </Content>
    <Footer />
  </div>
);

const Bayesian: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="03" text="Bayesian formulation" />
    <Heading>The answer is a posterior over trajectories</Heading>
    <Content>
    <Steps>
      <Step>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          <EqBox
            tex="p(\mathbf{x}_{0:T} \mid \mathbf{y}_{0:T}) \;=\; \frac{p(\mathbf{x}_{0:T})\, p(\mathbf{y}_{0:T} \mid \mathbf{x}_{0:T})}{p(\mathbf{y}_{0:T})}"
            tag="Bayes (4)"
            size={24}
          />
          <EqBox
            tex="p(\mathbf{x}_{0:T} \mid \mathbf{y}_{0:T}) \;\propto\; p(\mathbf{x}_0) \prod_{t=1}^{T} p(\mathbf{x}_t \mid \mathbf{x}_{t-1}) \prod_{t=0}^{T} p(\mathbf{y}_t \mid \mathbf{x}_t)"
            tag="Markov + local obs (7)"
            size={24}
          />
        </div>
      </Step>
      <Step>
        <div style={{ marginTop: 14 }}>
          <EqBox
            tex="\log p(\mathbf{x}_{0:T} \mid \mathbf{y}_{0:T}) = -\tfrac{1}{2}\Big( \|\mathbf{x}_0 - \mathbf{x}^B\|^2_{\boldsymbol{\Sigma}_B^{-1}} + \sum_{t=1}^{T} \|\mathbf{x}_t - \mathcal{M}(\mathbf{x}_{t-1})\|^2_{\boldsymbol{\Sigma}_\epsilon^{-1}} + \sum_{t=0}^{T} \|\mathbf{y}_t - \mathcal{H}_t(\mathbf{x}_t)\|^2_{\boldsymbol{\Sigma}_{\boldsymbol{\eta}_t}^{-1}} \Big) + C"
            tag="log-posterior (8)"
            size={21}
          />
        </div>
      </Step>
      <Step>
        <div style={{ display: 'flex', gap: 36, marginTop: 20 }}>
          <Col>
            <Bullet>
              <b>Markov + local obs</b> — the posterior factorizes, so algorithms can work locally
              in time.
            </Bullet>
          </Col>
          <Col>
            <Bullet>
              <b>Gaussians in</b> — the log-posterior is a sum of three <b>terms</b>: prior, model,
              obs.
            </Bullet>
          </Col>
          <Col>
            <Bullet>
              <b>Nonlinear <Tex tex="\mathcal{M}" display={false} /></b> — intractable posterior;
              DA methods are structured approximations of (8).
            </Bullet>
          </Col>
        </div>
      </Step>
    </Steps>
    </Content>
    <Footer />
  </div>
);

const MapToVar: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="04" text="From Bayes to variational" />
    <Heading>4D-Var = MAP estimation of the posterior</Heading>
    <Content>
    <Steps>
      <Step>
        <div style={{ marginTop: 40 }}>
          <EqBox
            tex="\underset{\mathbf{x}_{0:T}}{\arg\min}\; J(\mathbf{x}_{0:T}) = \underset{\mathbf{x}_{0:T}}{\arg\min}\; \tfrac{1}{2}\Big( \|\mathbf{x}_0 - \mathbf{x}^B\|^2_{\boldsymbol{\Sigma}_B^{-1}} + \underbrace{\sum_{t=1}^{T} \|\mathbf{x}_t - \mathcal{M}(\mathbf{x}_{t-1})\|^2_{\boldsymbol{\Sigma}_\epsilon^{-1}}}_{\text{model error — weak constraint}} + \sum_{t=0}^{T} \|\mathbf{y}_t - \mathcal{H}_t(\mathbf{x}_t)\|^2_{\boldsymbol{\Sigma}_{\boldsymbol{\eta}_t}^{-1}} \Big)"
            tag="weak-constraint (9)"
            size={18}
          />
        </div>
      </Step>
      <Step>
        <div style={{ marginTop: 22 }}>
          <EqBox
            tex="\underset{\mathbf{x}_0}{\arg\min}\; J(\mathbf{x}_0) = \underset{\mathbf{x}_0}{\arg\min}\; \tfrac{1}{2}\Big( \|\mathbf{x}_0 - \mathbf{x}^B\|^2_{\boldsymbol{\Sigma}_B^{-1}} + \sum_{t=0}^{T} \|\mathbf{y}_t - \mathcal{H}_t\big(\mathcal{M}^{(t)}(\mathbf{x}_0)\big)\|^2_{\boldsymbol{\Sigma}_{\boldsymbol{\eta}_t}^{-1}} \Big)"
            tag="strong-constraint (10)"
            size={28}
          />
        </div>
      </Step>
      <Step>
        <div style={{ display: 'flex', gap: 32, marginTop: 30 }}>
          <Col>
            <Bullet>
              <b>Same three terms</b> — now a <b>cost function</b> J to minimize.
            </Bullet>
          </Col>
          <Col>
            <Bullet>
              <b>Weak constraint</b> — every <Tex tex="\mathbf{x}_t" display={false} /> is a control
              variable; one-step predictions, parallel over time.
            </Bullet>
          </Col>
          <Col>
            <Bullet>
              <b>Strong constraint</b> — perfect model; optimize{' '}
              <Tex tex="\mathbf{x}_0" display={false} /> only, roll{' '}
              <Tex tex="\mathcal{M}" display={false} /> through the window.
            </Bullet>
          </Col>
          <Col>
            <Bullet>
              <Tex tex="\mathcal{M}^{(t)}" display={false} /> = t-fold composition of{' '}
              <Tex tex="\mathcal{M}" display={false} />;{' '}
              <Tex tex="\boldsymbol{\epsilon}_t = 0" display={false} />.
            </Bullet>
          </Col>
        </div>
      </Step>
    </Steps>
    </Content>
    <Footer />
  </div>
);

const Adjoint: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="05" text="Why 4D-Var was hard" />
    <Heading>
      <Tex tex="\mathrm{d}\mathcal{M}/\mathrm{d}\mathbf{x}" display={false} /> was derived by
      hand — until now
    </Heading>
    <Content>
    <Steps>
      <Step>
        <div style={{ marginTop: 40 }}>
          <EqBox
            tex="\nabla_{\mathbf{x}_0} J = \boldsymbol{\Sigma}_B^{-1}(\mathbf{x}_0 - \mathbf{x}^B) - \sum_{t=0}^{T} (\mathbf{M}^{\intercal})^{t}\, \mathbf{H}_t^{\intercal}\, \boldsymbol{\Sigma}_{\boldsymbol{\eta}}^{-1} \big(\mathbf{y}_t - \mathcal{H}_t(\mathbf{x}_t)\big)"
            tag="adjoint gradient (11)"
            size={32}
          />
        </div>
      </Step>
      <Step>
        <div style={{ display: 'flex', gap: 48, marginTop: 30, alignItems: 'stretch' }}>
          <div
            style={{
              flex: 1.2,
              background: TEAL_SOFT,
              padding: '30px 36px',
              borderLeft: '5px solid var(--osd-accent)',
            }}
          >
            <p style={{ fontSize: 32, lineHeight: 1.55, margin: 0 }}>
              <Tex tex="\mathbf{M} = \mathrm{d}\mathcal{M}/\mathrm{d}\mathbf{x}" display={false} /> is
              the <b>adjoint model</b> — the transpose Jacobian propagated backward through the whole
              window.
            </p>
            <p style={{ fontSize: 32, lineHeight: 1.55, margin: '18px 0 0' }}>
              Deriving, coding and maintaining it <b>by hand</b> is the main reason 4D-Var was
              considered impractical — and why general-purpose DA packages favored ensemble methods.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 20,
                color: 'var(--osd-accent)',
                letterSpacing: '0.14em',
                marginBottom: 22,
              }}
            >
              THE HISTORICAL TRADE-OFF
            </div>
            <Bullet>
              <b>Variational</b>: global optimum of the window, but needs an adjoint
            </Bullet>
            <Bullet>
              <b>Ensemble</b>: gradient-free, but covariances from few members
            </Bullet>
            <Bullet>
              Hand-written adjoints: one per model, requires work, fragile to model changes
            </Bullet>
          </div>
        </div>
      </Step>
    </Steps>
    </Content>
    <Footer />
  </div>
);

const Autodiff: Page = () => (
  <div
    style={{
      ...page,
      background: TEAL_DARK,
      color: '#f2fbfd',
    }}
  >
    <RepoBadge light />
    <div style={{ color: TEAL_CY }}>
      <SectionLabel n="06" text="The ADDA idea" />
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 60,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.12,
        margin: '20px 0 0',
        whiteSpace: 'nowrap',
      }}
    >
      Write <Tex tex="\mathcal{M}" display={false} /> in an autodiff framework — the adjoint is free
    </h2>
    <Content>
    <div style={{ display: 'flex', gap: 56, marginTop: 52 }}>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <p style={{ fontSize: 32, lineHeight: 1.55, color: '#bfe4ee', margin: '0 0 24px' }}>
              Backpropagation <i>through the simulator</i> is the adjoint: reverse-mode autodiff
              computes <Tex tex="\nabla_{\mathbf{x}_0} J" display={false} /> in one backward pass, at
              the cost of a few forward simulations.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 32, lineHeight: 1.55, color: '#bfe4ee', margin: '0 0 24px' }}>
              ADDA is built on this idea: implement{' '}
              <Tex tex="\mathcal{M}" display={false} /> and{' '}
              <Tex tex="\mathcal{H}_t" display={false} /> in PyTorch (or JAX via a bridge), and every
              variational method becomes a call to{' '}
              <span style={{ fontFamily: MONO, color: TEAL_CY }}>optimizer.step()</span>.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 32, lineHeight: 1.55, color: '#bfe4ee', margin: 0 }}>
              GPUs, batching and ensembles come with the framework — DA inherits them for free.
            </p>
          </Step>
        </Steps>
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <div
              style={{
                border: '1px solid rgba(194, 240, 248, 0.35)',
                padding: '32px 36px',
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 20,
                  color: TEAL_CY,
                  letterSpacing: '0.14em',
                  marginBottom: 24,
                }}
              >
                WHAT IF <Tex tex="\mathcal{M}" display={false} /> IS NOT DIFFERENTIABLE?
              </div>
              <p style={{ fontSize: 29, lineHeight: 1.55, margin: '0 0 18px', color: '#dbeff5' }}>
                <b style={{ color: '#fff' }}>Differentiable physics</b> — port the model to PyTorch
                / JAX; repeatedly proven feasible (a 10-system library ships with ADDA).
              </p>
              <p style={{ fontSize: 29, lineHeight: 1.55, margin: 0, color: '#dbeff5' }}>
                <b style={{ color: '#fff' }}>Neural emulator</b> — learn a differentiable surrogate,
                then run 4D-Var through it.
              </p>
            </div>
          </Step>
        </Steps>
      </div>
    </div>
    </Content>
    <div style={{ position: 'absolute', left: 120, bottom: 40 }}>
      <span style={{ fontFamily: MONO, fontSize: 22, color: TEAL_CY, letterSpacing: '0.06em' }}>
        ADDA · AUTOMATIC DIFFERENTIATION FOR DATA ASSIMILATION
      </span>
    </div>
    <Footer />
  </div>
);

const Sequential: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="07" text="The other family" />
    <Heading>Sequential methods: filter as you go</Heading>
    <Content>
    <p style={{ fontSize: 32, color: MUTED, margin: '30px 0 0', maxWidth: 1600, lineHeight: 1.5 }}>
      No window, no adjoint: alternate forecast and analysis one observation at a time, targeting
      the filtering distribution{' '}
      <Tex tex="p(\mathbf{x}_t \mid \mathbf{y}_{0:t})" display={false} /> — then optionally smooth
      with future data.
    </p>
    <div style={{ display: 'flex', gap: 44, marginTop: 40 }}>
      <div
        style={{
          flex: 1,
          background: TEAL_SOFT,
          padding: '32px 36px',
          borderLeft: '5px solid var(--osd-accent)',
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 600, color: TEAL_DARK }}>Kalman KF / RTS-KS</div>
        <p style={{ fontSize: 28, lineHeight: 1.5, color: MUTED, margin: '16px 0 0' }}>
          Exact Bayesian inference for <b>linear</b>{' '}
          <Tex tex="\mathcal{M}, \mathcal{H}_t" display={false} /> + Gaussian noise. Closed-form
          mean &amp; covariance updates. The reference case — and a unit test for the package.
        </p>
      </div>
      <div
        style={{
          flex: 1,
          background: TEAL_SOFT,
          padding: '32px 36px',
          borderLeft: '5px solid var(--osd-accent)',
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 600, color: TEAL_DARK }}>Ensemble EnKF / EnKS</div>
        <p style={{ fontSize: 28, lineHeight: 1.5, color: MUTED, margin: '16px 0 0' }}>
          Sample the prior with <Tex tex="N_e \ll s" display={false} /> members; empirical covariance
          carries the analysis. Nonlinear <Tex tex="\mathcal{M}, \mathcal{H}" display={false} /> OK.
          Watch out for spurious correlations → inflation &amp; localization.
        </p>
      </div>
    </div>
    <p style={{ fontSize: 28, color: MUTED, margin: '36px 0 0' }}>
      In ADDA: <Tag>EnKF</Tag> = <Tag>EnKS</Tag> with lag 1 — one code path, parallelized over the
      ensemble axis.
    </p>
    </Content>
    <Footer />
  </div>
);

const Parameters: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="08" text="Beyond state estimation" />
    <Heading>Parameters are just extra control variables</Heading>
    <p style={{ fontSize: 32, color: MUTED, margin: '26px 0 0', maxWidth: 1600, lineHeight: 1.5 }}>
      The Bayesian recipe is unchanged — only the control vector grows. Put a prior on parameters{' '}
      <Tex tex="\boldsymbol{\theta}" display={false} /> and minimize jointly with the state.
    </p>
    <Content>
    <Steps>
      <Step>
        <div style={{ marginTop: 34 }}>
          <EqBox
            tex="\underset{\mathbf{x}_0,\, \boldsymbol{\theta}}{\arg\min}\; \tfrac{1}{2}\Big( \|\mathbf{x}_0 - \mathbf{x}^B\|^2_{\boldsymbol{\Sigma}_B^{-1}} + \|\boldsymbol{\theta} - \boldsymbol{\theta}^B\|^2_{\boldsymbol{\Sigma}_{\theta}^{-1}} + \sum_{t=0}^{T} \|\mathbf{y}_t - \mathcal{H}_t(\mathcal{M}^{(t)}_{\boldsymbol{\theta}}(\mathbf{x}_0))\|^2_{\boldsymbol{\Sigma}_{\boldsymbol{\eta}_t}^{-1}} \Big)"
            tag="state + parameter (not in paper)"
            size={29}
          />
        </div>
      </Step>
      <Step>
        <div style={{ display: 'flex', gap: 36, marginTop: 30 }}>
          <Col>
            <Bullet>
              <b>Static inputs <Tex tex="F^s" display={false} /></b> — time-invariant parameters in
              the dynamics signature, broadcast to every step.
            </Bullet>
          </Col>
          <Col>
            <Bullet>
              <b>One backward pass</b> — autodiff differentiates J w.r.t.{' '}
              <Tex tex="\boldsymbol{\theta}" display={false} /> exactly like w.r.t.{' '}
              <Tex tex="\mathbf{x}_0" display={false} />.
            </Bullet>
          </Col>
          <Col>
            <Bullet>
              <b>A natural extension</b> — the paper's own phrase; demos so far use forcing fields (
              <Tex tex="F^d" display={false} />), not <Tex tex="F^s" display={false} />.
            </Bullet>
          </Col>
        </div>
      </Step>
    </Steps>
    </Content>
    <Footer />
  </div>
);

const Architecture: Page = () => {
  const Module = ({ name, desc }: { name: string; desc: string }) => (
    <div
      style={{
        background: TEAL_SOFT,
        borderLeft: '5px solid var(--osd-accent)',
        padding: '26px 32px',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 30, color: TEAL_DARK, fontWeight: 600 }}>{name}</div>
      <p style={{ fontSize: 26, lineHeight: 1.4, color: MUTED, margin: '10px 0 0' }}>{desc}</p>
    </div>
  );
  return (
    <div style={{ ...page }}>
      <RepoBadge />
      <SectionLabel n="09" text="Part II · The toolbox" />
      <Heading>One package, five composable parts</Heading>
      <Content>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 26,
          marginTop: 40,
        }}
      >
        <Module
          name="adda.system"
          desc="State — TensorDict of named fields on a (batch, time) grid; dynamics callables with forcing inputs"
        />
        <Module
          name="adda.observation"
          desc="Observation operators: noise, masking, linear maps, time interpolation — log_prob is autodiff-able"
        />
        <Module
          name="adda.variational"
          desc="sc/wc-4D-Var, single & sliding windows, any PyTorch optimizer (L-BFGS default)"
        />
        <Module
          name="adda.ensemble / kalman"
          desc="EnKF, EnKS (fixed-lag), exact Kalman filter & RTS smoother"
        />
        <Module
          name="adda.probability"
          desc="Prior & error distributions with log_prob + sample (Gaussian today, pluggable)"
        />
        <Module
          name="adda.convert"
          desc="JAX ↔ PyTorch bridge: dlpack zero-copy + jax.vjp for gradients"
        />
      </div>
      <p style={{ fontSize: 26, color: MUTED, margin: '28px 0 0' }}>
        Plus <b>10 differentiable dynamical systems</b> (L63, L96 ×2, KdV, KS ×2, Kolmogorov flow,
        QG, tracer, GOTM column) and 15 runnable notebooks.
      </p>
      </Content>
      <Footer />
    </div>
  );
};

const StateSlide: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="10" text="The core data structure" />
    <Heading>
      <span style={{ fontFamily: MONO }}>State</span>: named fields, two axes
    </Heading>
    <Content>
    <div style={{ display: 'flex', gap: 52, marginTop: 36 }}>
      <div style={{ flex: 1.25, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Code
          title="adda/system/state.py — mixed-dimensionality state"
          lines={[
            'class State(ABC):',
            '    """Fields: a TensorDict with two shared axes:',
            '       (batch, time) — plus a time_axis."""',
            '    def __init__(self, x, time_axis=None):',
            '        if isinstance(x, Tensor):',
            '            x = TensorDict(x=x, batch_size=x.shape[:2])',
            '        self.fields = x',
          ]}
        />
        <Code
          title="two-timescale Lorenz-96 — a 1-D slow field + a 2-D fast field"
          lines={[
            'initial_state = State(TensorDict(',
            '    x = f*(0.5 + torch.randn(1, 1, K))      / max(J, 50),',
            '    y = f*(0.5 + torch.randn(1, 1, K, J))   / max(J, 50),',
            '))',
          ]}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <Bullet>
              Every field carries its own spatial structure — vectors, staggered grids, unstructured
              meshes, Lagrangian variables
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <b>batch</b> axis = ensembles; <b>time</b> axis = trajectory — both parallelized on
              GPU
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Mixed-dimensionality states (surface + atmosphere, slow + fast) are just… several
              keys of the TensorDict
            </Bullet>
          </Step>
        </Steps>
      </div>
    </div>
    </Content>
    <Footer />
  </div>
);

const ObsAndDynamics: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="11" text="Plugging the problem in" />
    <Heading>Observation operators &amp; dynamics contracts</Heading>
    <Content>
    <div style={{ display: 'flex', gap: 48, marginTop: 36 }}>
      <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Code
          title="obs operator = density on (x, y) — autodiff-able log_prob"
          lines={[
            'class MaskedIidGaussianObsOp(ObservationOperator):',
            '    """Boolean mask + per-field Gaussian noise."""',
            '    def log_prob(self, x, y):      # likelihood of obs given state',
            '    def sample(self, x):           # synthetic observations',
            '    def linearize(self, idx_time)  # matrix H_t for EnKF/EnKS',
          ]}
        />
        <Code
          title="dynamics = a plain callable with a fixed signature"
          lines={[
            'def next_step_function(x: State, dt: float,',
            '                       dynamic_inputs: State,   # F^d_t: forcing, BCs',
            '                       static_inputs: State):   # F^s  : parameters',
            '    ...',
            '    return State(new_fields, time_axis=x.time_axis + dt)',
          ]}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <Bullet>
              One class covers sparse/noisy obs: <b>boolean masks</b> per field, location and time;
              noise can vary in space and time
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Variational methods only need <span style={{ fontFamily: MONO }}>log_prob</span>;
              Kalman-family needs <span style={{ fontFamily: MONO }}>linearize</span> — implement
              either or both
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Dynamics stay <b>your code</b>: ADDA never sees the interior of{' '}
              <Tex tex="\mathcal{M}" display={false} />, it only calls it — with{' '}
              <Tex tex="\Delta t" display={false} /> (irregular obs OK) and forcing slots{' '}
              <Tex tex="F^d_t, F^s" display={false} />
            </Bullet>
          </Step>
        </Steps>
      </div>
    </div>
    </Content>
    <Footer />
  </div>
);

const EndToEnd: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="12" text="The whole workflow" />
    <Heading>4D-Var on Lorenz-63 in five moves</Heading>
    <Content>
    <div style={{ display: 'flex', gap: 52, marginTop: 36 }}>
      <div style={{ flex: 1.3 }}>
        <Code
          title="notebooks/Lorenz63_4D-Var.ipynb (abridged)"
          lines={[
            "# 1. dynamics: any differentiable time-stepping callable",
            "def next_step_function(x, dt, dynamic_inputs, static_inputs): ...",
            "",
            "# 2. ground truth + sparse noisy observations",
            "true_ts  = State(groundtruth.reshape(1, -1, 3), time_axis=steps)",
            "true_ts, obs_op, obs = random_sparse_noisy_obs(",
            "    true_ts, obs_noise_sd=1, p_obs=1)               # obs operator built in",
            "",
            "# 3. first guess: interpolate from the observations",
            "x_init = naive_initialization(obs)",
            "",
            "# 4-5. strong-constraint 4D-Var: L-BFGS on the cost J",
            "x0 = sc4dvar_single_window(next_step_function, obs, obs_op,",
            "                           x_init, optimizer_pars={'lr': 1e-1},",
            "                           n_steps=5)",
          ]}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <p style={{ fontSize: 30, lineHeight: 1.55, color: MUTED, margin: '0 0 24px' }}>
              No adjoint anywhere in this listing — reverse-mode autodiff through{' '}
              <span style={{ fontFamily: MONO }}>next_step_function</span> builds it on demand.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 30, lineHeight: 1.55, color: MUTED, margin: '0 0 24px' }}>
              Weak-constraint on the same objects: add per-step{' '}
              <span style={{ fontFamily: MONO }}>model_error_distribs</span> and call{' '}
              <span style={{ fontFamily: MONO }}>wc4dvar_single_window</span> — now every{' '}
              <Tex tex="\mathbf{x}_t" display={false} /> is optimized.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 30, lineHeight: 1.55, color: MUTED, margin: 0 }}>
              Background prior, optimizer, scheduler: any PyTorch class — swap L-BFGS for Adam
              without touching the physics.
            </p>
          </Step>
        </Steps>
      </div>
    </div>
    </Content>
    <Footer />
  </div>
);

const VariationalZoo: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="13" text="Scaling &amp; interop" />
    <Heading>Long windows, sliding windows, a JAX bridge</Heading>
    <Content>
    <div style={{ display: 'flex', gap: 48, marginTop: 36 }}>
      <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Code
          title="sliding-window 4D-Var — each window's analysis seeds the next background"
          lines={[
            'x = sc4dvar_sliding_window(m_dyn, obs, obs_op,',
            '                           window_duration=500,   # steps',
            '                           window_shift=0.25,    # 25% overlap',
            '                           covariance_factor=0.5,',
            '                           optimizer_class=torch.optim.Adam, ...)',
          ]}
        />
        <Code
          title="adda/convert/jax.py — gradients cross frameworks via jax.vjp + dlpack"
          lines={[
            'class _JaxFunction(torch.autograd.Function):',
            '    def forward(ctx, jax_fn, *torch_args):',
            '        out = _forward(jax_fn, *(t2j(a) for a in torch_args))',
            '        return j2t(out)                    # zero-copy dlpack',
            '    def backward(ctx, *grad_outputs):',
            '        _, vjp_fn = jax.vjp(ctx.jax_fn, *ctx.jax_args)',
            '        return (None, *(j2t(g) for g in vjp_fn(t2j(grad_outputs[0]))))',
          ]}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <Bullet>
              Sliding windows bound memory and gradient explosion on chaotic long runs — the QG
              flagship runs 21 days this way
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <span style={{ fontFamily: MONO }}>covariance_factor</span> re-tightens the background
              after each window: the analysis becomes the prior
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              The bridge wraps <b>any jitted JAX rollout</b> as a PyTorch op: bring Exponax, stay in
              4D-Var
            </Bullet>
          </Step>
        </Steps>
      </div>
    </div>
    </Content>
    <Footer />
  </div>
);

const Notebooks: Page = () => {
  const Group = ({ title, items }: { title: string; items: string[] }) => (
    <div
      style={{
        background: TEAL_SOFT,
        padding: '22px 28px',
        borderLeft: '5px solid var(--osd-accent)',
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 600, color: TEAL_DARK, marginBottom: 10 }}>
        {title}
      </div>
      {items.map((it) => (
        <div key={it} style={{ fontFamily: MONO, fontSize: 22, color: MUTED, lineHeight: 1.55 }}>
          {it}
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ ...page }}>
      <RepoBadge />
      <SectionLabel n="14" text="Try it yourself" />
      <Heading>15 runnable notebooks, five families</Heading>
      <Content>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 22,
          marginTop: 36,
        }}
      >
        <Group
          title="Tutorial ODEs"
          items={['linear_Kalman', 'Lorenz63_4D-Var', 'Lorenz96_single_window_4D-Var', 'Lorenz96_EnKF_EnKS', 'Lorenz96_irregular_time', 'two_level_L96']}
        />
        <Group
          title="1-D PDEs"
          items={['KdV_4D-Var', 'KS_4D-Var', 'Exponax_4D-Var-1D-KdV (JAX)']}
        />
        <Group
          title="Geophysical flows"
          items={['lowres_quasi-geostrophic', 'highres_quasi-geostrophic', 'gotm_single_window (forcing)']}
        />
        <Group
          title="Learning-based DA"
          items={['KF_Emulator (FNO, Kolmogorov)', 'Latent_4D-Var (β-VAE, KS)']}
        />
        <Group
          title="Cross-framework"
          items={['Exponax_4D-Var-2D-KS (JAX bridge)']}
        />
        <div
          style={{
            border: '1px solid var(--osd-accent)',
            padding: '22px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontSize: 26, lineHeight: 1.5, margin: 0, color: 'var(--osd-text)' }}>
            <b>git clone m-dml/adda</b>
            <br />
            <span style={{ fontFamily: MONO, fontSize: 22, color: MUTED }}>
              pip install -e . &amp; jupyter
            </span>
          </p>
          <p style={{ fontSize: 22, lineHeight: 1.4, color: MUTED, margin: '12px 0 0' }}>
            Every notebook runs end-to-end on a laptop GPU; each maps to a paper experiment.
          </p>
        </div>
      </div>
      </Content>
      <Footer />
    </div>
  );
};

const ExperimentL96: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="15" text="Paper experiment" />
    <Heading>Wrong model? The weak constraint wins</Heading>
    <Content>
    <div style={{ marginTop: 16 }}>
      <img
        src={figL964dvar}
        alt="L96 strong vs weak constraint 4D-Var"
        style={{ width: '100%', maxHeight: 535, objectFit: 'contain', display: 'block', margin: '0 auto' }}
      />
      <FigCaption>
        L96 (n=40, F=8), 10/40 variables observed per step, noise sd 1 · Figure: Frion et al., CC
        BY 4.0
      </FigCaption>
    </div>
    <div style={{ display: 'flex', gap: 44, marginTop: 16 }}>
      <Col>
        <Bullet>
          <b>Strong constraint</b>: sharp analysis, then forecast error blows up past the obs
        </Bullet>
      </Col>
      <Col>
        <Bullet>
          <b>Weak constraint</b>: model-error term absorbs the mismatch; error stays low
        </Bullet>
      </Col>
      <Col>
        <Bullet>
          One-step form keeps the cost <b>parallel over time</b>
        </Bullet>
      </Col>
    </div>
    </Content>
    <Footer />
  </div>
);

/* One figure per page — the experiment suite, split for readability. */

const FigPage = ({
  n,
  img,
  title,
  caption,
  bullets,
}: {
  n: string;
  img: string;
  title: string;
  caption: string;
  bullets: React.ReactNode[];
}) => (
  <div style={{ ...page }}>
    <SectionLabel n={n} text="Paper experiments" />
    <Heading>{title}</Heading>
    <Content>
      <img
        src={img}
        alt={title}
        style={{
          width: '100%',
          maxHeight: 535,
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
        }}
      />
      <FigCaption>{caption}</FigCaption>
      <div style={{ display: 'flex', gap: 44, marginTop: 14, flexShrink: 0 }}>
        {bullets.map((b, i) => (
          <Col key={i}>{b}</Col>
        ))}
      </div>
    </Content>
    <Footer />
  </div>
);

const ExperimentQG: Page = () => (
  <FigPage
    n="16"
    img={figQG}
    title="3-layer quasi-geostrophic ocean"
    caption="769×961 grid, 5 km resolution · 0.5% of variables observed over ~21 days · sliding-window sc-4D-Var, Adam + cyclic LR, one A100 · Figure: Frion et al., CC BY 4.0"
    bullets={[
      <Bullet key="a">
        The <b>operational-scale</b> flagship: 2.2M state variables per layer
      </Bullet>,
      <Bullet key="b">
        Analysis errors 1–2 orders below the state; RMSE stays under obs noise for &gt;20 000
        forecast steps
      </Bullet>,
      <Bullet key="c">
        Sub-window handoffs visible every 500 steps — each analysis seeds the next background
      </Bullet>,
    ]}
  />
);

const ExperimentEmulator: Page = () => (
  <FigPage
    n="17"
    img={figEmulator}
    title="4D-Var through a neural emulator"
    caption="Kolmogorov flow: a Fourier Neural Operator replaces the simulator · sliding-window sc-4D-Var, 5% observed, noise sd 1 · Figure: Frion et al., CC BY 4.0"
    bullets={[
      <Bullet key="a">
        <b>Emulators unlock variational DA</b> when simulators lack gradients
      </Bullet>,
      <Bullet key="b">
        Trained on coarsened DNS states — differentiable <i>by design</i>
      </Bullet>,
      <Bullet key="c">
        Assimilated trajectory tracks groundtruth; the raw initialization decorrelates entirely
      </Bullet>,
    ]}
  />
);

const ExperimentLDA: Page = () => (
  <FigPage
    n="18"
    img={figLDA}
    title="Latent data assimilation"
    caption="1-D Kuramoto-Sivashinsky: optimize the latent initial state z of a β-VAE via c_proj · background prior N(0, I) in latent space · Figure: Frion et al., CC BY 4.0"
    bullets={[
      <Bullet key="a">
        <b>Latent DA</b>: lower dimension, cheaper storage, softer prior
      </Bullet>,
      <Bullet key="b">
        The decoder acts as a <b>prior toward the data manifold</b>
      </Bullet>,
      <Bullet key="c">
        LDA + prior &gt; LDA without &gt; encode-decode rollout &gt; naive rollout — all diverge
        after ~400 chaotic steps
      </Bullet>,
    ]}
  />
);

const ExperimentJAX: Page = () => (
  <FigPage
    n="19"
    img={figExponaxKS}
    title="Across frameworks: JAX dynamics, PyTorch 4D-Var"
    caption="2-D Kuramoto-Sivashinsky solved with Exponax (JAX spectral solver) · bridge: jax.vjp + dlpack zero-copy · 25% observed, 16 steps, noise sd 1 · Figure: Frion et al., CC BY 4.0"
    bullets={[
      <Bullet key="a">
        <b>Bring your own JAX solver</b> — wrapped as a PyTorch autograd op
      </Bullet>,
      <Bullet key="b">Small overhead vs native PyTorch; zero re-implementation</Bullet>,
      <Bullet key="c">
        Also in the paper: EnKF vs EnKS, irregular obs times, two-timescale L96, GOTM tracer
      </Bullet>,
    ]}
  />
);

const Landscape: Page = () => {
  const Row = ({
    name,
    scope,
    variational,
    ensemble,
    note,
    highlight,
  }: {
    name: string;
    scope: string;
    variational: string;
    ensemble: string;
    note: string;
    highlight?: boolean;
  }) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2.1fr 1.15fr 1.35fr 1.25fr 3.4fr',
        alignItems: 'center',
        padding: '15px 20px',
        background: highlight ? TEAL_SOFT : 'transparent',
        borderLeft: highlight ? '5px solid var(--osd-accent)' : '5px solid transparent',
        gap: 16,
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 28, fontWeight: 600, color: TEAL_DARK }}>
        {name}
      </span>
      <span style={{ fontSize: 25, color: MUTED }}>{scope}</span>
      <span
        style={{
          fontSize: 26,
          color: variational === '✓' ? 'var(--osd-accent)' : '#b6c3ca',
          fontWeight: 600,
        }}
      >
        {variational}
      </span>
      <span
        style={{
          fontSize: 26,
          color: ensemble === '✓' ? 'var(--osd-accent)' : '#b6c3ca',
          fontWeight: 600,
        }}
      >
        {ensemble}
      </span>
      <span style={{ fontSize: 24, color: MUTED, lineHeight: 1.3 }}>{note}</span>
    </div>
  );
  return (
    <div style={{ ...page }}>
      <SectionLabel n="20" text="Ecosystem" />
      <Heading>General-purpose DA packages: what's missing</Heading>
      <Content>
      <div style={{ marginTop: 36 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2.1fr 1.15fr 1.35fr 1.25fr 3.4fr',
            padding: '0 20px 12px',
            gap: 16,
            fontFamily: MONO,
            fontSize: 21,
            color: 'var(--osd-accent)',
            letterSpacing: '0.1em',
          }}
        >
          <span>FRAMEWORK</span>
          <span>SCALE</span>
          <span>4D-VAR</span>
          <span>ENS. KF</span>
          <span>CAVEAT</span>
        </div>
        <Row name="DART" scope="large" variational="—" ensemble="✓" note="Fortran; ensemble-only, no variational methods" />
        <Row name="PDAF" scope="large" variational="—" ensemble="✓" note="strong parallelization; no 4D-Var" />
        <Row name="NEDAS" scope="large" variational="—" ensemble="✓" note="Python; no autodiff, complex workflows" />
        <Row name="PyDA" scope="teaching" variational="manual" ensemble="✓" note="adjoints derived and coded by hand" />
        <Row name="DAPPER" scope="&lt; 60k DOF" variational="manual" ensemble="✓" note="user-specified forward adjoints; restricted grids &amp; stepping" />
        <Row name="TorchDA" scope="emulators" variational="✓" ensemble="✓" note="autodiff, but few methods &amp; examples" />
        <Row name="ADDA" scope="any" variational="✓ autodiff" ensemble="✓" note="sc/wc 4D-Var out of the box; JAX bridge; 10 systems" highlight />
      </div>
      <p style={{ fontSize: 28, color: MUTED, margin: '30px 0 0' }}>
        ADDA is explicitly <b>not a benchmark</b> — it is the substrate a fair community benchmark
        still needs.
      </p>
      </Content>
      <Footer />
    </div>
  );
};

const Takeaways: Page = () => (
  <div style={{ ...page }}>
    <SectionLabel n="21" text="Takeaways" />
    <Heading>What I'd like you to remember</Heading>
    <Content>
    <div style={{ display: 'flex', gap: 56, marginTop: 48 }}>
      <div style={{ flex: 1.2 }}>
        <Steps>
          <Step>
            <Bullet>
              DA = <b>Bayes on trajectories</b> — variational and ensemble methods approximate the
              same posterior
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Autodiff removes the historical pain of 4D-Var — the adjoint{' '}
              <b>doesn't need hand-derivation</b>, just a{' '}
              <span style={{ fontFamily: MONO }}>backward pass</span>
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              ADDA makes this <b>routine</b>: your dynamics + your obs operator + one function call
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Parameters slot in through <Tex tex="F^s" display={false} /> and joint MAP — a natural
              extension waiting for use cases
            </Bullet>
          </Step>
        </Steps>
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <div
              style={{
                background: TEAL_SOFT,
                borderLeft: '5px solid var(--osd-accent)',
                padding: '34px 38px',
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 21,
                  color: 'var(--osd-accent)',
                  letterSpacing: '0.14em',
                  marginBottom: 24,
                }}
              >
                FOR THE DISCUSSION
              </div>
              <p style={{ fontSize: 29, lineHeight: 1.55, margin: '0 0 20px' }}>
                How could we contribute to this package?
              </p>
              <p style={{ fontSize: 29, lineHeight: 1.55, margin: '0 0 20px' }}>
                Calibrating ocean vertical physics?
              </p>
              <p style={{ fontSize: 29, lineHeight: 1.55, margin: '0 0 20px' }}>
                What's our most-wanted joint state–parameter problem for{' '}
                <Tex tex="F^s" display={false} />?
              </p>
              <p style={{ fontSize: 29, lineHeight: 1.55, margin: '0 0 20px' }}>
                Are there problems we are working on that could be deployed through ADDA?
              </p>
              <p style={{ fontSize: 29, lineHeight: 1.55, margin: 0 }}>
                Could we use <span style={{ fontFamily: MONO }}>juliacall</span> and{' '}
                <span style={{ fontFamily: MONO }}>DLPack.jl</span> inside a custom{' '}
                <span style={{ fontFamily: MONO }}>torch.autograd.Function</span> and extend ADDA to
                Julia solvers?
              </p>
            </div>
          </Step>
        </Steps>
      </div>
    </div>
    </Content>
    <div
      style={{
        position: 'absolute',
        left: 120,
        bottom: 40,
        fontFamily: MONO,
        fontSize: 22,
        color: MUTED,
      }}
    >
      arXiv:2608.23297 · GITHUB.COM/M-DML/ADDA · M-DML.ORG/ADDA
    </div>
    <PageNumOnly />
  </div>
);

export const meta: SlideMeta = {
  title: 'ADDA — end-to-end differentiable data assimilation',
  createdAt: '2026-09-22T20:48:48.768Z',
};

export default [
  Cover,
  Why,
  DAFormulation,
  Bayesian,
  MapToVar,
  Adjoint,
  Autodiff,
  Sequential,
  Parameters,
  Architecture,
  StateSlide,
  ObsAndDynamics,
  EndToEnd,
  VariationalZoo,
  Notebooks,
  ExperimentL96,
  ExperimentQG,
  ExperimentEmulator,
  ExperimentLDA,
  ExperimentJAX,
  Landscape,
  Takeaways,
] satisfies Page[];
