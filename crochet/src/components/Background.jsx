

const COLORS = ["#f4b6c2", "#a8d8c5", "#c3aef0", "#f7dc8a", "#a9cdf0", "#f9c6a5"];

function YarnBall() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <circle cx="46" cy="46" r="32" fill="currentColor" fillOpacity=".25" />
      <path d="M18 38 Q46 58 76 34" />
      <path d="M15 52 Q46 76 78 50" />
      <path d="M28 22 Q56 40 66 72" />
      <path d="M60 77 Q80 92 58 94 Q40 96 30 88" />
    </svg>
  );
}

function CrochetHook() {
  return (
    <svg viewBox="0 0 40 160" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 150 L20 26" />
      <path d="M20 26 C20 8 33 8 31 20" strokeWidth="4.5" />
      <ellipse cx="20" cy="84" rx="9" ry="6" fill="currentColor" fillOpacity=".3" strokeWidth="3" />
    </svg>
  );
}

function Needles() {
  return (
    <svg viewBox="0 0 100 160" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      <path d="M22 150 L68 24" />
      <path d="M78 150 L32 24" />
      <circle cx="71" cy="16" r="8" fill="currentColor" fillOpacity=".35" strokeWidth="3.5" />
      <circle cx="29" cy="16" r="8" fill="currentColor" fillOpacity=".35" strokeWidth="3.5" />
    </svg>
  );
}

// k = how much taller each shape should be relative to the base size
const SHAPES = [
  { Shape: YarnBall, k: 1 },
  { Shape: CrochetHook, k: 1.8 },
  { Shape: Needles, k: 1.5 },
];

const COUNT = 18;

function makeItems() {
  return Array.from({ length: COUNT }, (_, i) => {
    const { Shape, k } = SHAPES[i % SHAPES.length];
    return {
      id: i,
      Shape,
      left: Math.round(Math.random() * 92),
      top: Math.round(Math.random() * 90),
      height: Math.round((44 + Math.random() * 50) * k),
      rot: Math.round(Math.random() * 80 - 40),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: (9 + Math.random() * 8).toFixed(1),
      delay: (-Math.random() * 10).toFixed(1),
    };
  });
}
const Items=makeItems()
    export default function Background() {
    return (
        <div className="bg-decor" aria-hidden="true">
        {Items.map(({ id, Shape, left, top, height, rot, color, duration, delay }) => (
            <span
            key={id}
            className="bg-item"
            style={{
                left: `${left}%`,
                top: `${top}%`,
                height,
                color,
                "--rot": `${rot}deg`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
            }}
            >
            <Shape />
            </span>
        ))}
        </div>
    );
}