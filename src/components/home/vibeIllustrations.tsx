// Hand-drawn-style line illustrations for the "Find your vibe" tiles that don't
// have a real brand illustration (Beer, Wine, Functional). Spirits, Cocktails
// and Aperitifs use the real cropped brand artwork (PNG) instead.
//
// stroke = currentColor so the tile can color them (gold). A subtle turbulence
// "roughen" filter gives them a hand-sketched wobble to match the brand line art.

interface IllustrationProps {
  className?: string;
}

const svgBase = {
  viewBox: "0 0 80 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Rough = ({ id }: { id: string }) => (
  <filter id={id}>
    <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves={2} seed={7} result="n" />
    <feDisplacementMap in="SourceGraphic" in2="n" scale={2.2} />
  </filter>
);

export const BeerIllustration = ({ className = "" }: IllustrationProps) => (
  <svg className={className} {...svgBase}>
    <defs><Rough id="rgh-beer" /></defs>
    <g filter="url(#rgh-beer)">
      <path d="M27 32 L30 88 Q30 90 33 90 L47 90 Q50 90 50 88 L53 32" />
      <path d="M27 32 Q40 37 53 32" />
      <path d="M23 32 Q26 20 31 27 Q35 16 40 25 Q45 17 49 26 Q53 19 57 32" />
      <path d="M27 36 Q40 40 53 36" />
      <circle cx="33" cy="28" r="1.3" /><circle cx="42" cy="26" r="1.1" /><circle cx="47" cy="30" r="1" />
      <circle cx="36" cy="50" r="1.5" /><circle cx="43" cy="58" r="1.4" /><circle cx="38" cy="66" r="1.2" /><circle cx="45" cy="72" r="1.1" /><circle cx="34" cy="78" r="1" />
      <path d="M31 46 L31 60 M33 50 L33 66 M30 70 L30 82" />
    </g>
  </svg>
);

export const WineIllustration = ({ className = "" }: IllustrationProps) => (
  <svg className={className} {...svgBase}>
    <defs><Rough id="rgh-wine" /></defs>
    <g filter="url(#rgh-wine)">
      <path d="M24 14 Q40 21 56 14" />
      <path d="M24 14 C22 44 58 44 56 14" />
      <path d="M28 30 Q40 35 52 30" />
      <path d="M30 33 Q32 38 31 42 M35 34 Q37 39 36 43 M40 34 Q42 39 41 43 M45 33 Q46 38 45 42" />
      <path d="M40 44 L40 82" />
      <path d="M27 86 Q40 79 53 86" /><path d="M27 86 L53 86" />
    </g>
  </svg>
);

export const FunctionalIllustration = ({ className = "" }: IllustrationProps) => (
  <svg className={className} {...svgBase}>
    <defs><Rough id="rgh-fn" /></defs>
    <g filter="url(#rgh-fn)">
      <path d="M29 30 L31 88 Q31 90 33 90 L47 90 Q49 90 49 88 L51 30" />
      <path d="M29 30 Q40 34 51 30" />
      <path d="M33 52 L41 50 L42 58 L34 60 Z" /><path d="M33 52 L34 60 M37 51 L38 59" />
      <path d="M38 64 L45 62 L46 69 L39 71 Z" />
      <path d="M44 30 Q50 14 60 6" />
      <path d="M48 22 L52 19 M50 18 L54 15 M52 14 L56 11 M54 11 L59 8 M47 25 L51 23" />
      <circle cx="34" cy="42" r="1.2" /><circle cx="45" cy="44" r="1.1" /><circle cx="39" cy="46" r="1" />
    </g>
  </svg>
);

// Canned / RTD — a sketched seltzer can with a pull-tab and fizz.
export const CannedIllustration = ({ className = "" }: IllustrationProps) => (
  <svg className={className} {...svgBase}>
    <defs><Rough id="rgh-can" /></defs>
    <g filter="url(#rgh-can)">
      <path d="M31 34 L31 86 Q31 90 35 90 L45 90 Q49 90 49 86 L49 34" />
      <path d="M31 34 Q40 30 49 34" />
      <path d="M31 34 Q40 38 49 34" />
      <path d="M38 33 q2 -3 4 -1" /><circle cx="40" cy="33" r="0.9" />
      <path d="M31 50 Q40 53 49 50" />
      <path d="M31 74 Q40 77 49 74" />
      <circle cx="56" cy="40" r="1.3" /><circle cx="59" cy="48" r="1" /><circle cx="54" cy="53" r="0.9" />
    </g>
  </svg>
);

// Shop All — a sketched tote bag with a bottle peeking out (browse everything).
export const ShopAllIllustration = ({ className = "" }: IllustrationProps) => (
  <svg className={className} {...svgBase}>
    <defs><Rough id="rgh-all" /></defs>
    <g filter="url(#rgh-all)">
      <path d="M27 48 L24 85 Q24 88 27 88 L53 88 Q56 88 56 85 L53 48 Z" />
      <path d="M27 48 L53 48" />
      <path d="M34 48 Q34 35 40 35 Q46 35 46 48" />
      <path d="M43 48 L43 40 Q43 37 45 37 L47 37 Q49 37 49 40 L49 48" />
      <path d="M44 37 L44 34 L48 34 L48 37" />
    </g>
  </svg>
);
