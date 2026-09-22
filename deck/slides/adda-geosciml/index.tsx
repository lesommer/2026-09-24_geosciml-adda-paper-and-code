import { Step, Steps, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useEffect, useRef } from 'react';
import geoscimlLogo from '@assets/geosciml-logo.png';
import figL63Sc4dvar from '@assets/L63_sc4dvar.png';
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
  padding: '96px 120px 96px',
  display: 'flex',
  flexDirection: 'column' as const,
};

const TopBar = ({ label }: { label: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 48,
      left: 120,
      right: 120,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
    }}
  >
    <img
      src={geoscimlLogo}
      alt="GeoSciML logo"
      style={{ width: 56, height: 'auto' }}
    />
    <div
      style={{
        fontSize: 30,
        fontWeight: 500,
        color: 'var(--osd-accent)',
        letterSpacing: '0.16em',
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
    <span style={{ fontSize: 30, fontWeight: 600 }}>{n}</span>
    <span
      style={{
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
      }}
    >
      {text}
    </span>
  </div>
);

const Heading = ({ children }: { children: string }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 68,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
      margin: '20px 0 0',
    }}
  >
    {children}
  </h2>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        right: 120,
        bottom: 44,
        display: 'flex',
        gap: 24,
        fontFamily: MONO,
        fontSize: 20,
        color: 'var(--osd-accent)',
        letterSpacing: '0.06em',
      }}
    >
      <span>GEOSCIML DISCUSSION GROUP · 24 SEP 2026</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li style={{ fontSize: 32, lineHeight: 1.5, marginBottom: 22, listStyle: 'none' }}>
    <span style={{ color: 'var(--osd-accent)', fontWeight: 600, marginRight: 20 }}>—</span>
    {children}
  </li>
);

const FigCaption = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 21, lineHeight: 1.45, color: MUTED, margin: '14px 0 0' }}>
    {children}
  </p>
);

const Code = ({ lines, title }: { lines: string[]; title?: string }) => (
  <div
    style={{
      background: INK_CODE,
      borderRadius: 8,
      padding: '14px 22px',
      fontFamily: MONO,
      fontSize: 19,
      lineHeight: 1.45,
      color: TEAL_CY,
    }}
  >
    {title ? (
      <div style={{ fontSize: 15, color: '#6a93a3', marginBottom: 8, letterSpacing: '0.08em' }}>
        {title}
      </div>
    ) : null}
    <pre style={{ margin: 0, whiteSpace: 'pre' }}>
      {lines.join('\n')}
    </pre>
  </div>
);

/* KaTeX typesetting via CDN (same engine as Slidev / sli.dev) */

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
}: {
  tex: string;
  tag?: string;
  annotation?: string;
}) => (
  <div style={{ position: 'relative' }}>
    <div
      style={{
        background: TEAL_SOFT,
        borderLeft: '5px solid var(--osd-accent)',
        padding: '18px 56px 18px 30px',
        fontSize: 30,
      }}
    >
      <Tex tex={tex} />
    </div>
    {tag ? (
      <span
        style={{
          position: 'absolute',
          right: 14,
          top: 14,
          fontFamily: MONO,
          fontSize: 18,
          color: 'var(--osd-accent)',
        }}
      >
        {tag}
      </span>
    ) : null}
    {annotation ? (
      <p style={{ fontSize: 22, color: MUTED, margin: '10px 2px 0', lineHeight: 1.4 }}>
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
      fontSize: 18,
      color: 'var(--osd-accent)',
      background: TEAL_SOFT,
      border: '1px solid var(--osd-accent)',
      borderRadius: 5,
      padding: '3px 10px',
      marginRight: 8,
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
        fontSize: 24,
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
        maxWidth: 1560,
      }}
    >
      ADDA
      <span style={{ fontSize: 44, color: MUTED, fontWeight: 400 }}> — </span>
      end-to-end differentiable
      <br />
      data assimilation
    </h1>
    <p style={{ fontSize: 34, color: MUTED, margin: '48px 0 0', maxWidth: 1300, lineHeight: 1.5 }}>
      Frion, Nguyen-Thanh, Bekar, Nimtz, Zinchenko &amp; Greenberg (Helmholtz-Zentrum Hereon)
    </p>
    <p style={{ fontSize: 26, color: MUTED, margin: '16px 0 0' }}>
      arXiv:2608.23297 · github.com/m-dml/adda
    </p>
    <div
      style={{
        position: 'absolute',
        left: 120,
        bottom: 64,
        fontSize: 30,
        color: 'var(--osd-text)',
      }}
    >
      24 September 2026
    </div>
    <Footer />
  </div>
);

const Why: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="01" text="Motivation" />
    <Heading>Data assimilation works — replaying it on new code doesn't</Heading>
    <div style={{ display: 'flex', gap: 56, marginTop: 56 }}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: TEAL_DARK,
            marginBottom: 24,
          }}
        >
          DA = simulation ⊕ observations
        </div>
        <Bullet>Estimate states beyond what obs or model alone can give</Bullet>
        <Bullet>Tune simulation parameters; detect model–data conflicts</Bullet>
        <Bullet>A workhorse of operational geoscience — computationally heavy</Bullet>
      </div>
      <div
        style={{
          flex: 1,
          background: TEAL_SOFT,
          padding: '36px 40px',
          borderLeft: '5px solid var(--osd-accent)',
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 18,
            color: 'var(--osd-accent)',
            letterSpacing: '0.14em',
            marginBottom: 22,
          }}
        >
          WHY YET ANOTHER FRAMEWORK?
        </div>
        <Bullet>Simulation &amp; assimilation codes rarely interoperate</Bullet>
        <Bullet>Discretizations, staggering, obs sampling hard-wired</Bullet>
        <Bullet>Methods specialized to one model; comparisons costly</Bullet>
        <Bullet>Limited autodiff &amp; parallel support inside simulators</Bullet>
      </div>
    </div>
    <Footer />
  </div>
);

const DAFormulation: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="02" text="The DA task" />
    <Heading>State-space model with Gaussian noise</Heading>
    <div style={{ display: 'flex', gap: 48, marginTop: 44 }}>
      <div style={{ flex: 1.35, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <EqBox
          tex="\mathbf{x}_{t+1} \;=\; \mathcal{M}(\mathbf{x}_t) + \boldsymbol{\epsilon}_t, \qquad \boldsymbol{\epsilon}_t \sim \mathcal{N}(0, \boldsymbol{\Sigma}_{\epsilon})"
          tag="state (1)"
        />
        <EqBox
          tex="\mathbf{y}_t \;=\; \mathcal{H}_t(\mathbf{x}_t) + \boldsymbol{\eta}_t, \qquad \boldsymbol{\eta}_t \sim \mathcal{N}(0, \boldsymbol{\Sigma}_{\boldsymbol{\eta}_t})"
          tag="obs (2)"
        />
        <EqBox
          tex="\mathbf{x}_0 \;\sim\; \mathcal{N}(\mathbf{x}^B, \boldsymbol{\Sigma}_B)"
          tag="prior (3)"
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
    <Footer />
  </div>
);

const Bayesian: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="03" text="Bayesian formulation" />
    <Heading>The full answer is a posterior over trajectories</Heading>
    <div style={{ display: 'flex', gap: 52, marginTop: 40, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <EqBox
          tex="p(\mathbf{x}_{0:T} \mid \mathbf{y}_{0:T}) \;=\; \frac{p(\mathbf{x}_{0:T})\, p(\mathbf{y}_{0:T} \mid \mathbf{x}_{0:T})}{p(\mathbf{y}_{0:T})}"
          tag="Bayes (4)"
        />
        <EqBox
          tex="p(\mathbf{x}_{0:T} \mid \mathbf{y}_{0:T}) \;\propto\; p(\mathbf{x}_0) \prod_{t=1}^{T} p(\mathbf{x}_t \mid \mathbf{x}_{t-1}) \prod_{t=0}^{T} p(\mathbf{y}_t \mid \mathbf{x}_t)"
          tag="Markov + local obs (7)"
        />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <p style={{ fontSize: 28, lineHeight: 1.5, color: MUTED, margin: '0 0 18px' }}>
              Markov dynamics + per-time observations make the posterior factorize — and make
              algorithms local in time.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 28, lineHeight: 1.5, color: MUTED, margin: '0 0 18px' }}>
              Plugging the Gaussians in, the log-posterior is a sum of three{' '}
              <b style={{ color: TEAL_DARK }}>weighted norms</b> — prior, model, observations:
            </p>
          </Step>
          <Step>
            <div
              style={{
                background: TEAL_SOFT,
                border: '1px solid #dfe7eb',
                borderLeft: '5px solid var(--osd-accent)',
                padding: '16px 24px',
                fontSize: 25,
              }}
            >
              <Tex tex="\log p(\mathbf{x}_{0:T} \mid \mathbf{y}_{0:T}) = -\tfrac{1}{2}\Big( \|\mathbf{x}_0 - \mathbf{x}^B\|^2_{\boldsymbol{\Sigma}_B^{-1}} + \sum_{t=1}^{T} \|\mathbf{x}_t - \mathcal{M}(\mathbf{x}_{t-1})\|^2_{\boldsymbol{\Sigma}_\epsilon^{-1}} + \sum_{t=0}^{T} \|\mathbf{y}_t - \mathcal{H}_t(\mathbf{x}_t)\|^2_{\boldsymbol{\Sigma}_{\boldsymbol{\eta}_t}^{-1}} \Big) + C" />
              <span style={{ fontFamily: MONO, fontSize: 17, color: 'var(--osd-accent)' }}>
                (8)
              </span>
            </div>
          </Step>
          <Step>
            <p style={{ fontSize: 26, lineHeight: 1.5, color: MUTED, margin: '14px 0 0' }}>
              Nonlinear <Tex tex="\mathcal{M}" display={false} /> ⇒ intractable, non-Gaussian.
              DA methods = structured approximations of (8).
            </p>
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const MapToVar: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="04" text="From Bayes to variational" />
    <Heading>4D-Var = MAP estimation of the posterior</Heading>
    <div style={{ display: 'flex', gap: 52, marginTop: 44, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.2 }}>
        <EqBox
          tex="\underset{\mathbf{x}_{0:T}}{\arg\min}\; J(\mathbf{x}_{0:T}) = \underset{\mathbf{x}_{0:T}}{\arg\min}\; \tfrac{1}{2}\Big( \|\mathbf{x}_0 - \mathbf{x}^B\|^2_{\boldsymbol{\Sigma}_B^{-1}} + \underbrace{\sum_{t=1}^{T} \|\mathbf{x}_t - \mathcal{M}(\mathbf{x}_{t-1})\|^2_{\boldsymbol{\Sigma}_\epsilon^{-1}}}_{\text{model error term — the weak constraint}} + \sum_{t=0}^{T} \|\mathbf{y}_t - \mathcal{H}_t(\mathbf{x}_t)\|^2_{\boldsymbol{\Sigma}_{\boldsymbol{\eta}_t}^{-1}} \Big)"
          tag="weak-constraint (9)"
        />
        <EqBox
          tex="\underset{\mathbf{x}_0}{\arg\min}\; J(\mathbf{x}_0) = \underset{\mathbf{x}_0}{\arg\min}\; \tfrac{1}{2}\Big( \|\mathbf{x}_0 - \mathbf{x}^B\|^2_{\boldsymbol{\Sigma}_B^{-1}} + \sum_{t=0}^{T} \|\mathbf{y}_t - \mathcal{H}_t\big(\mathcal{M}^{(t)}(\mathbf{x}_0)\big)\|^2_{\boldsymbol{\Sigma}_{\boldsymbol{\eta}_t}^{-1}} \Big)"
          tag="strong-constraint (10)"
        />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <Bullet>
              Minimize the negative log-posterior: same three terms, now a{' '}
              <b>cost function</b> J
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <b style={{ color: TEAL_DARK }}>Weak constraint</b>: every{' '}
              <Tex tex="\mathbf{x}_t" display={false} /> is a control variable; the model term needs
              only one-step predictions — parallel over time
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <b style={{ color: TEAL_DARK }}>Strong constraint</b>: perfect model, optimize{' '}
              <Tex tex="\mathbf{x}_0" display={false} /> only, roll out{' '}
              <Tex tex="\mathcal{M}^{(t)}" display={false} /> through the window
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <Tex tex="\mathcal{M}^{(t)}" display={false} /> = t-fold composition of{' '}
              <Tex tex="\mathcal{M}" display={false} />; <Tex tex="\boldsymbol{\epsilon}_t = 0" display={false} />
            </Bullet>
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const Adjoint: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="05" text="The adjoint bottleneck" />
    <Heading>Gradient descent needs dM/dx — historically by hand</Heading>
    <div style={{ display: 'flex', gap: 52, marginTop: 40, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.25 }}>
        <EqBox
          tex="\nabla_{\mathbf{x}_0} J = \boldsymbol{\Sigma}_B^{-1}(\mathbf{x}_0 - \mathbf{x}^B) - \sum_{t=0}^{T} (\mathbf{M}^{\intercal})^{t}\, \mathbf{H}_t^{\intercal}\, \boldsymbol{\Sigma}_{\boldsymbol{\eta}}^{-1} \big(\mathbf{y}_t - \mathcal{H}_t(\mathbf{x}_t)\big)"
          tag="adjoint gradient (11)"
        />
        <div
          style={{
            background: TEAL_SOFT,
            padding: '28px 34px',
            marginTop: 28,
            borderLeft: '5px solid var(--osd-accent)',
          }}
        >
          <p style={{ fontSize: 28, lineHeight: 1.55, margin: 0 }}>
            <Tex tex="\mathbf{M} = d\mathcal{M}/d\mathbf{x}" display={false} /> is the{' '}
            <b>adjoint model</b> — the transpose Jacobian propagated backward through the whole
            window.
          </p>
          <p style={{ fontSize: 28, lineHeight: 1.55, margin: '16px 0 0' }}>
            Deriving, coding and maintaining it by hand via the chain rule is the{' '}
            <b>main reason 4D-Var was considered impractical</b> outside operational centers — and
            why general-purpose DA packages favored ensemble methods.
          </p>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 18,
            color: 'var(--osd-accent)',
            letterSpacing: '0.14em',
            marginBottom: 20,
          }}
        >
          THE HISTORICAL TRADE-OFF
        </div>
        <Steps>
          <Step>
            <Bullet>
              <b>Variational</b>: global optimum of the window, but needs an adjoint
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <b>Ensemble</b>: gradient-free, but approximates covariances from few members
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Hand-written adjoints: one per model, years of effort, fragile to any model change
            </Bullet>
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const Autodiff: Page = () => (
  <div
    style={{
      ...page,
      justifyContent: 'center',
      background: TEAL_DARK,
      color: '#f2fbfd',
    }}
  >
    <div style={{ color: TEAL_CY }}>
      <SectionLabel n="06" text="The ADDA wager" />
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 72,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.12,
        margin: '20px 0 0',
        maxWidth: 1500,
      }}
    >
      Write <span style={{ fontFamily: MONO }}>ℳ</span> in an autodiff framework —
      <br />
      the adjoint comes for free
    </h2>
    <div style={{ display: 'flex', gap: 56, marginTop: 56 }}>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <p style={{ fontSize: 30, lineHeight: 1.55, color: '#bfe4ee', margin: '0 0 20px' }}>
              Backpropagation <i>through the simulator</i> is the adjoint: reverse-mode autodiff
              computes <Tex tex="\nabla_{\mathbf{x}_0} J" display={false} /> in one backward pass,
              at the cost of ~a few forward simulations.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 30, lineHeight: 1.55, color: '#bfe4ee', margin: '0 0 20px' }}>
              ADDA is built on this wager: implement{' '}
              <Tex tex="\mathcal{M}" display={false} /> and{' '}
              <Tex tex="\mathcal{H}_t" display={false} /> in PyTorch (or JAX via a bridge), and
              every variational method becomes a call to{' '}
              <span style={{ fontFamily: MONO, color: TEAL_CY }}>optimizer.step()</span>.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 30, lineHeight: 1.55, color: '#bfe4ee', margin: 0 }}>
              GPUs, batching and ensembles come with the framework — DA inherits them for free.
            </p>
          </Step>
        </Steps>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            border: '1px solid rgba(194, 240, 248, 0.35)',
            padding: '30px 34px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 17,
              color: TEAL_CY,
              letterSpacing: '0.14em',
              marginBottom: 22,
            }}
          >
            WHAT IF ℳ IS NOT DIFFERENTIABLE?
          </div>
          <p style={{ fontSize: 27, lineHeight: 1.55, margin: '0 0 16px', color: '#dbeff5' }}>
            <b style={{ color: '#fff' }}>Differentiable physics</b> — port the model to PyTorch /
            JAX; repeatedly proven feasible (a 10-system library ships with ADDA).
          </p>
          <p style={{ fontSize: 27, lineHeight: 1.55, margin: 0, color: '#dbeff5' }}>
            <b style={{ color: '#fff' }}>Neural emulator</b> — learn a differentiable surrogate,
            then run 4D-Var through it.
          </p>
        </div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 120, bottom: 44 }}>
      <FooterNoNum />
    </div>
    <Footer />
  </div>
);

const FooterNoNum = () => (
  <span style={{ fontFamily: MONO, fontSize: 20, color: TEAL_CY, letterSpacing: '0.06em' }}>
    ADDA · AUTOMATIC DIFFERENTIATION FOR DATA ASSIMILATION
  </span>
);

const Sequential: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="07" text="The other family" />
    <Heading>Sequential methods: filter as you go</Heading>
    <p style={{ fontSize: 28, color: MUTED, margin: '28px 0 0', maxWidth: 1500, lineHeight: 1.5 }}>
      No window, no adjoint: alternate forecast and analysis one observation at a time, targeting
      the filtering distribution{' '}
      <Tex tex="p(\mathbf{x}_t \mid \mathbf{y}_{0:t})" display={false} /> — then optionally smooth
      with future data.
    </p>
    <div style={{ display: 'flex', gap: 44, marginTop: 44 }}>
      <div
        style={{
          flex: 1,
          background: TEAL_SOFT,
          padding: '30px 34px',
          borderLeft: '5px solid var(--osd-accent)',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600, color: TEAL_DARK }}>Kalman KF / RTS-KS</div>
        <p style={{ fontSize: 25, lineHeight: 1.5, color: MUTED, margin: '14px 0 0' }}>
          Exact Bayesian inference for <b>linear</b> {' '}
          <Tex tex="\mathcal{M}, \mathcal{H}_t" display={false} /> + Gaussian noise. Closed-form
          mean &amp; covariance updates. The reference case — and a unit test for the package.
        </p>
      </div>
      <div
        style={{
          flex: 1,
          background: TEAL_SOFT,
          padding: '30px 34px',
          borderLeft: '5px solid var(--osd-accent)',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600, color: TEAL_DARK }}>Ensemble EnKF / EnKS</div>
        <p style={{ fontSize: 25, lineHeight: 1.5, color: MUTED, margin: '14px 0 0' }}>
          Sample the prior with <Tex tex="N_e \ll s" display={false} /> members; empirical
          covariance carries the analysis. Nonlinear{' '}
          <Tex tex="\mathcal{M}, \mathcal{H}" display={false} /> OK. Watch out for spurious
          correlations → inflation &amp; localization.
        </p>
      </div>
    </div>
    <p style={{ fontSize: 25, color: MUTED, margin: '36px 0 0' }}>
      In ADDA: <Tag>EnKF</Tag> = <Tag>EnKS</Tag> with lag 1 — one code path, parallelized over the
      ensemble axis.
    </p>
    <Footer />
  </div>
);

const Parameters: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="08" text="Beyond state estimation" />
    <Heading>Parameters are just extra control variables</Heading>
    <p style={{ fontSize: 28, color: MUTED, margin: '28px 0 0', maxWidth: 1520, lineHeight: 1.5 }}>
      The Bayesian recipe is unchanged — only the control vector grows. Put a prior on parameters{' '}
      <Tex tex="\boldsymbol{\theta}" display={false} /> and minimize jointly with the state.
    </p>
    <div style={{ display: 'flex', gap: 52, marginTop: 40, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.15 }}>
        <EqBox
          tex="\underset{\mathbf{x}_0,\, \boldsymbol{\theta}}{\arg\min}\; \tfrac{1}{2}\Big( \|\mathbf{x}_0 - \mathbf{x}^B\|^2_{\boldsymbol{\Sigma}_B^{-1}} + \|\boldsymbol{\theta} - \boldsymbol{\theta}^B\|^2_{\boldsymbol{\Sigma}_{\theta}^{-1}} + \sum_{t=0}^{T} \|\mathbf{y}_t - \mathcal{H}_t(\mathcal{M}^{(t)}_{\boldsymbol{\theta}}(\mathbf{x}_0))\|^2_{\boldsymbol{\Sigma}_{\boldsymbol{\eta}_t}^{-1}} \Big)"
          tag="state + parameter (not in paper)"
        />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <Bullet>
              Dynamics signature:{' '}
              <Tex tex="\mathcal{M}(\mathbf{x}_t, \Delta t, F^d_t, F^s)" display={false} /> —{' '}
              <b>static inputs</b> <Tex tex="F^s" display={false} /> = time-invariant parameters,
              broadcast to every step
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              End-to-end autodiff differentiates J w.r.t.{' '}
              <Tex tex="\boldsymbol{\theta}" display={false} /> exactly like w.r.t.{' '}
              <Tex tex="\mathbf{x}_0" display={false} /> — the paper calls joint state–parameter
              estimation a <i>natural extension</i>
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Today's demos stay with <Tex tex="F^d" display={false} /> (forcing fields) and{' '}
              <Tex tex="F^s" display={false} /> slots — a concrete playground for the group
            </Bullet>
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const Architecture: Page = () => {
  const Module = ({ name, desc }: { name: string; desc: string }) => (
    <div
      style={{
        background: TEAL_SOFT,
        borderLeft: '5px solid var(--osd-accent)',
        padding: '16px 24px',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 23, color: TEAL_DARK, fontWeight: 600 }}>{name}</div>
      <p style={{ fontSize: 21, lineHeight: 1.35, color: MUTED, margin: '6px 0 0' }}>{desc}</p>
    </div>
  );
  return (
    <div style={{ ...page, justifyContent: 'center', paddingTop: 72, paddingBottom: 48 }}>
      <SectionLabel n="09" text="Part II · The toolbox" />
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 52,
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          margin: '12px 0 0',
        }}
      >
        One package, five composable concerns
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginTop: 22,
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
      <p style={{ fontSize: 20, color: MUTED, margin: '16px 0 0' }}>
        Plus <b>10 differentiable dynamical systems</b> (L63, L96 ×2, KdV, KS ×2, Kolmogorov flow,
        QG, tracer, GOTM column) and 15 runnable notebooks.
      </p>
      <Footer />
    </div>
  );
};

const StateSlide: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="10" text="The core data structure" />
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 54,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        margin: '16px 0 0',
      }}
    >
      <span style={{ fontFamily: MONO }}>State</span> — named fields, two shared axes
    </h2>
    <div style={{ display: 'flex', gap: 52, marginTop: 18, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.2 }}>
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
    <Footer />
  </div>
);

const ObsAndDynamics: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="11" text="Plugging the problem in" />
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 52,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        margin: '14px 0 0',
      }}
    >
      Observation operators &amp; the dynamics contract
    </h2>
    <div style={{ display: 'flex', gap: 48, marginTop: 16, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Code
          title="obs operator = density on (x, y) — autodiff-able log_prob"
          lines={[
            'class MaskedIidGaussianObsOp(ObservationOperator):',
            '    """Boolean mask + per-field Gaussian noise."""',
            '    def log_prob(self, x, y):      # -> likelihood of obs given state',
            '    def sample(self, x):            # -> synthetic observations',
            '    def linearize(self, idx_time)   # -> matrix H_t for EnKF/EnKS',
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
    <Footer />
  </div>
);

const EndToEnd: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="12" text="The whole workflow" />
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 52,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        margin: '14px 0 0',
      }}
    >
      4D-Var on Lorenz-63 in five moves
    </h2>
    <div style={{ display: 'flex', gap: 52, marginTop: 12, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.25 }}>
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
            "# 3. first guess: interpolate from the observations",
            "x_init = naive_initialization(obs)",
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
            <p style={{ fontSize: 27, lineHeight: 1.55, color: MUTED, margin: '0 0 20px' }}>
              No adjoint anywhere in this listing — reverse-mode autodiff through{' '}
              <span style={{ fontFamily: MONO }}>next_step_function</span> builds it on demand.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 27, lineHeight: 1.55, color: MUTED, margin: '0 0 20px' }}>
              Weak-constraint on the same objects: add per-step{' '}
              <span style={{ fontFamily: MONO }}>model_error_distribs</span> and call{' '}
              <span style={{ fontFamily: MONO }}>wc4dvar_single_window</span> — now every{' '}
              <Tex tex="\mathbf{x}_t" display={false} /> is optimized.
            </p>
          </Step>
          <Step>
            <p style={{ fontSize: 27, lineHeight: 1.55, color: MUTED, margin: 0 }}>
              Background prior, optimizer, scheduler: any PyTorch class — swap L-BFGS for Adam
              without touching the physics.
            </p>
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const VariationalZoo: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="13" text="Scaling &amp; interop" />
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 50,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        margin: '14px 0 0',
      }}
    >
      Long windows, sliding windows, and a JAX bridge
    </h2>
    <div style={{ display: 'flex', gap: 48, marginTop: 12, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', gap: 24 }}>
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
    <Footer />
  </div>
);

const Notebooks: Page = () => {
  const Group = ({ title, items }: { title: string; items: string[] }) => (
    <div
      style={{
        background: TEAL_SOFT,
        padding: '18px 24px',
        borderLeft: '5px solid var(--osd-accent)',
      }}
    >
      <div style={{ fontSize: 25, fontWeight: 600, color: TEAL_DARK, marginBottom: 8 }}>
        {title}
      </div>
      {items.map((it) => (
        <div key={it} style={{ fontFamily: MONO, fontSize: 19, color: MUTED, lineHeight: 1.5 }}>
          {it}
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ ...page, justifyContent: 'center' }}>
      <SectionLabel n="14" text="Try it yourself" />
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 52,
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          margin: '14px 0 0',
        }}
      >
        15 runnable notebooks, five families
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 16,
          marginTop: 18,
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
            padding: '18px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontSize: 22, lineHeight: 1.5, margin: 0, color: 'var(--osd-text)' }}>
            <b>git clone m-dml/adda</b>
            <br />
            <span style={{ fontFamily: MONO, fontSize: 19, color: MUTED }}>
              pip install -e . &amp; jupyter
            </span>
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.4, color: MUTED, margin: '10px 0 0' }}>
            Every notebook runs end-to-end on a laptop GPU; each maps to a paper experiment.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ExperimentL96: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="15" text="Paper experiment" />
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 58,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        margin: '16px 0 0',
      }}
    >
      When the model is wrong, the weak constraint wins
    </h2>
      <div style={{ display: 'flex', gap: 48, marginTop: 24, alignItems: 'flex-start' }}>
      <div style={{ flex: 1.5 }}>
        <img
          src={figL964dvar}
          alt="L96 strong vs weak constraint 4D-Var"
          style={{ width: '100%', height: 'auto', border: '1px solid #dfe7eb' }}
        />
        <FigCaption>
          Lorenz-96 (n=40, F=8): 10 of 40 variables observed per step, noise sd 1. Vertical line =
          end of observations assimilated by sc-4D-Var. Figure: Frion et al., CC BY 4.0.
        </FigCaption>
      </div>
      <div style={{ flex: 1, paddingRight: 40 }}>
        <Steps>
          <Step>
            <Bullet>
              <b>Strong-constraint</b>, 100-step window: sharp analysis, then forecast error grows
              exponentially past the obs — chaotic sensitivity
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              <b>Weak-constraint</b>, 800-step window: model-error term absorbs the mismatch; error
              stays low across the whole trajectory
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              The one-step formulation <Tex tex="\|\mathbf{x}_t - \mathcal{M}(\mathbf{x}_{t-1})\|" display={false} />{' '}
              keeps the cost parallel over time — no full rollout inside J
            </Bullet>
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const ExperimentSuite: Page = () => {
  const Panel = ({
    img,
    caption,
    aspect,
  }: {
    img: string;
    caption: string;
    aspect: number;
  }) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          width: '100%',
          aspectRatio: `${aspect}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #dfe7eb',
          overflow: 'hidden',
        }}
      >
        <img
          src={img}
          alt={caption}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>
      <p style={{ fontSize: 19, lineHeight: 1.35, color: MUTED, margin: '10px 0 0' }}>{caption}</p>
    </div>
  );
  return (
    <div style={{ ...page, justifyContent: 'center' }}>
      <SectionLabel n="16" text="Paper experiments" />
      <Heading>From operational-scale flows to learned models</Heading>
      <div style={{ display: 'flex', gap: 40, marginTop: 32, alignItems: 'stretch' }}>
        <Panel
          img={figQG}
          caption="3-layer QG, 769×961 grid: sliding-window sc-4D-Var assimilates 0.5% of variables over ~21 days (Adam + cyclic LR, one A100)."
          aspect={1273 / 500}
        />
        <Panel
          img={figEmulator}
          caption="Kolmogorov flow: a Fourier Neural Operator replaces the simulator; 4D-Var runs through the emulator."
          aspect={4590 / 1330}
        />
        <Panel
          img={figLDA}
          caption="Latent DA on 1-D KS: optimize in the β-VAE latent space (c_proj); the background prior lives in latent coordinates."
          aspect={4550 / 1620}
        />
        <Panel
          img={figExponaxKS}
          caption="2-D KS solved in JAX (Exponax): the bridge feeds gradients back to PyTorch — 4D-Var across frameworks."
          aspect={3908 / 830}
        />
      </div>
      <p style={{ fontSize: 23, color: MUTED, margin: '26px 0 0' }}>
        Also in the paper: EnKF vs EnKS on L96, irregular observation times, two-timescale L96 with
        joint inference of unobserved fast variables, GOTM tracer with real forcing fields. Figures:
        Frion et al., CC BY 4.0.
      </p>
      <Footer />
    </div>
  );
};

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
        gridTemplateColumns: '2.1fr 1.15fr 1.25fr 1.25fr 3.1fr',
        alignItems: 'center',
        padding: '16px 20px',
        background: highlight ? TEAL_SOFT : 'transparent',
        borderLeft: highlight ? '5px solid var(--osd-accent)' : '5px solid transparent',
        gap: 16,
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 24, fontWeight: 600, color: TEAL_DARK }}>
        {name}
      </span>
      <span style={{ fontSize: 20, color: MUTED }}>{scope}</span>
      <span
        style={{
          fontSize: 21,
          color: variational === '✓' ? 'var(--osd-accent)' : '#b6c3ca',
          fontWeight: 600,
        }}
      >
        {variational}
      </span>
      <span
        style={{
          fontSize: 21,
          color: ensemble === '✓' ? 'var(--osd-accent)' : '#b6c3ca',
          fontWeight: 600,
        }}
      >
        {ensemble}
      </span>
      <span style={{ fontSize: 20, color: MUTED, lineHeight: 1.35 }}>{note}</span>
    </div>
  );
  return (
    <div style={{ ...page, justifyContent: 'center' }}>
      <SectionLabel n="17" text="Ecosystem" />
      <Heading>General-purpose DA packages — what's missing</Heading>
      <div style={{ marginTop: 36 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2.1fr 1.15fr 1.25fr 1.25fr 3.1fr',
            padding: '0 20px 12px',
            gap: 16,
            fontFamily: MONO,
            fontSize: 17,
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
      <p style={{ fontSize: 24, color: MUTED, margin: '30px 0 0' }}>
        ADDA is explicitly <b>not a benchmark</b> — it is the substrate a fair community benchmark
        still needs.
      </p>
      <Footer />
    </div>
  );
};

const Takeaways: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <SectionLabel n="18" text="Takeaways" />
    <Heading>What I'd like you to remember</Heading>
    <div style={{ display: 'flex', gap: 64, marginTop: 48 }}>
      <div style={{ flex: 1.2 }}>
        <Steps>
          <Step>
            <Bullet>
              DA = <b>Bayes on trajectories</b>; variational and ensemble methods are two structured
              approximations of the same posterior
            </Bullet>
          </Step>
          <Step>
            <Bullet>
              Autodiff collapses the historical cost of 4D-Var — the adjoint is now a{' '}
              <span style={{ fontFamily: MONO }}>backward pass</span>, not a research project
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
      <div
        style={{
          flex: 1,
          background: TEAL_SOFT,
          borderLeft: '5px solid var(--osd-accent)',
          padding: '34px 38px',
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 18,
            color: 'var(--osd-accent)',
            letterSpacing: '0.14em',
            marginBottom: 22,
          }}
        >
          FOR THE DISCUSSION
        </div>
        <p style={{ fontSize: 26, lineHeight: 1.55, margin: '0 0 18px' }}>
          Which of our group's models could be ported to differentiable physics — and which need an
          emulator?
        </p>
        <p style={{ fontSize: 26, lineHeight: 1.55, margin: '0 0 18px' }}>
          What's our most-wanted joint state–parameter problem for <Tex tex="F^s" display={false} />?
        </p>
        <p style={{ fontSize: 26, lineHeight: 1.55, margin: 0 }}>
          Could ADDA host a GeoSciML benchmark of DA methods?
        </p>
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 120,
        bottom: 44,
        fontFamily: MONO,
        fontSize: 20,
        color: MUTED,
      }}
    >
      arXiv:2608.23297 · GITHUB.COM/M-DML/ADDA · M-DML.ORG/ADDA
    </div>
    <Footer />
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
  ExperimentSuite,
  Landscape,
  Takeaways,
] satisfies Page[];
