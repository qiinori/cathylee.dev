import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useInView } from 'framer-motion';

// ── Data ──────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Overview', active: true, icon: 'dashboard' },
  { label: 'Traffic', active: false, icon: 'barchart' },
  { label: 'Requests', active: false, icon: 'list' },
  { label: 'Anomalies', active: false, icon: 'alert' },
  { label: 'Safety', active: false, icon: 'shield' },
  { label: 'Settings', active: false, icon: 'settings' },
];

const TIME_PILLS = ['1h', '6h', '24h', '7d', '30d'];

// Per-range KPI data
const RANGE_KPI = {
  '1h': [
    { label: 'Total Requests', value: 42, change: '+8.2%', good: true, arrow: '\u25B2', format: 'int', sparkline: [3, 5, 4, 6, 5, 7, 6, 5, 7, 6, 8, 7] },
    { label: 'Avg Latency', value: 1.82, change: '-12.4%', good: true, arrow: '\u25BC', format: 'latency', sparkline: [2.1, 2.0, 1.9, 2.0, 1.8, 1.9, 1.8, 1.9, 1.8, 1.85, 1.8, 1.82] },
    { label: 'Error Rate', value: 2.38, change: '-0.8%', good: true, arrow: '\u25BC', format: 'pct', sparkline: [2.5, 2.4, 2.6, 2.3, 2.5, 2.4, 2.3, 2.4, 2.3, 2.4, 2.35, 2.38] },
    { label: 'Total Cost', value: 1.12, change: '+3.1%', good: false, arrow: '\u25B2', format: 'dollar', sparkline: [0.8, 0.85, 0.9, 0.88, 0.95, 0.98, 1.0, 1.02, 1.05, 1.08, 1.1, 1.12] },
    { label: 'Total Tokens', value: 58.2, change: '+9.5%', good: true, arrow: '\u25B2', format: 'tokens', sparkline: [42, 45, 48, 46, 50, 52, 54, 53, 55, 56, 57, 58] },
    { label: 'Active Anomalies', value: 1, change: '-1', good: true, arrow: '\u25BC', format: 'anomaly', sparkline: null },
  ],
  '6h': [
    { label: 'Total Requests', value: 156, change: '+10.5%', good: true, arrow: '\u25B2', format: 'int', sparkline: [8, 12, 15, 18, 14, 20, 22, 19, 25, 24, 28, 26] },
    { label: 'Avg Latency', value: 2.18, change: '-5.3%', good: true, arrow: '\u25BC', format: 'latency', sparkline: [2.8, 2.6, 2.5, 2.4, 2.3, 2.5, 2.2, 2.3, 2.1, 2.2, 2.15, 2.18] },
    { label: 'Error Rate', value: 3.24, change: '+0.4%', good: false, arrow: '\u25B2', format: 'pct', sparkline: [2.8, 3.0, 3.2, 2.9, 3.1, 3.3, 3.0, 3.2, 3.1, 3.3, 3.2, 3.24] },
    { label: 'Total Cost', value: 4.23, change: '+4.8%', good: false, arrow: '\u25B2', format: 'dollar', sparkline: [2.5, 2.8, 3.0, 3.2, 3.4, 3.5, 3.7, 3.8, 3.9, 4.0, 4.1, 4.23] },
    { label: 'Total Tokens', value: 215.6, change: '+14.1%', good: true, arrow: '\u25B2', format: 'tokens', sparkline: [120, 135, 150, 160, 170, 178, 185, 192, 198, 205, 210, 215] },
    { label: 'Active Anomalies', value: 2, change: '-1', good: true, arrow: '\u25BC', format: 'anomaly', sparkline: null },
  ],
  '24h': [
    { label: 'Total Requests', value: 268, change: '+12.3%', good: true, arrow: '\u25B2', format: 'int', sparkline: [12, 18, 15, 22, 19, 28, 24, 32, 27, 35, 30, 38] },
    { label: 'Avg Latency', value: 2.45, change: '-8.1%', good: true, arrow: '\u25BC', format: 'latency', sparkline: [3.2, 2.9, 3.1, 2.7, 2.8, 2.5, 2.6, 2.3, 2.5, 2.4, 2.3, 2.45] },
    { label: 'Error Rate', value: 4.10, change: '+1.2%', good: false, arrow: '\u25B2', format: 'pct', sparkline: [2.8, 3.1, 3.5, 3.2, 3.8, 3.4, 3.9, 4.0, 3.7, 4.1, 3.9, 4.1] },
    { label: 'Total Cost', value: 7.46, change: '+5.7%', good: false, arrow: '\u25B2', format: 'dollar', sparkline: [4.2, 4.8, 5.1, 5.5, 5.3, 5.9, 6.2, 6.0, 6.5, 6.8, 7.1, 7.46] },
    { label: 'Total Tokens', value: 398.4, change: '+18.2%', good: true, arrow: '\u25B2', format: 'tokens', sparkline: [180, 210, 230, 250, 270, 290, 310, 330, 350, 370, 385, 398] },
    { label: 'Active Anomalies', value: 2, change: '-3', good: true, arrow: '\u25BC', format: 'anomaly', sparkline: null },
  ],
  '7d': [
    { label: 'Total Requests', value: 1847, change: '+22.6%', good: true, arrow: '\u25B2', format: 'int', sparkline: [80, 120, 140, 160, 200, 240, 220, 260, 280, 300, 320, 340] },
    { label: 'Avg Latency', value: 2.91, change: '-3.2%', good: true, arrow: '\u25BC', format: 'latency', sparkline: [3.4, 3.2, 3.3, 3.0, 3.1, 2.9, 3.0, 2.8, 2.9, 2.85, 2.9, 2.91] },
    { label: 'Error Rate', value: 3.56, change: '-0.8%', good: true, arrow: '\u25BC', format: 'pct', sparkline: [4.2, 4.0, 3.8, 3.9, 3.7, 3.8, 3.6, 3.7, 3.5, 3.6, 3.55, 3.56] },
    { label: 'Total Cost', value: 48.32, change: '+15.4%', good: false, arrow: '\u25B2', format: 'dollar', sparkline: [25, 28, 30, 33, 35, 38, 40, 42, 44, 45, 47, 48] },
    { label: 'Total Tokens', value: 2.8, change: '+24.8%', good: true, arrow: '\u25B2', format: 'tokensM', sparkline: [1.2, 1.4, 1.6, 1.8, 1.9, 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8] },
    { label: 'Active Anomalies', value: 5, change: '+2', good: false, arrow: '\u25B2', format: 'anomaly', sparkline: null },
  ],
  '30d': [
    { label: 'Total Requests', value: 12847, change: '+34.1%', good: true, arrow: '\u25B2', format: 'int', sparkline: [400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500] },
    { label: 'Avg Latency', value: 3.12, change: '+2.4%', good: false, arrow: '\u25B2', format: 'latency', sparkline: [2.8, 2.9, 3.0, 2.9, 3.1, 3.0, 3.1, 3.2, 3.0, 3.1, 3.15, 3.12] },
    { label: 'Error Rate', value: 3.82, change: '+0.3%', good: false, arrow: '\u25B2', format: 'pct', sparkline: [3.5, 3.6, 3.7, 3.5, 3.8, 3.6, 3.9, 3.7, 3.8, 3.9, 3.8, 3.82] },
    { label: 'Total Cost', value: 186.54, change: '+28.9%', good: false, arrow: '\u25B2', format: 'dollar', sparkline: [80, 95, 105, 115, 125, 135, 145, 155, 165, 175, 180, 186] },
    { label: 'Total Tokens', value: 15.2, change: '+31.5%', good: true, arrow: '\u25B2', format: 'tokensM', sparkline: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14.5, 15.2] },
    { label: 'Active Anomalies', value: 12, change: '+4', good: false, arrow: '\u25B2', format: 'anomaly', sparkline: null },
  ],
};

// Per-range chart data
const RANGE_CHARTS = {
  '1h': {
    chart1: [[0, 55], [20, 50], [40, 58], [60, 45], [80, 52], [100, 42], [120, 48], [140, 38], [160, 44], [180, 35], [200, 40], [220, 32], [240, 28]],
    chart2: [[0, 40], [20, 48], [40, 35], [60, 52], [80, 30], [100, 45], [120, 28], [140, 42], [160, 32], [180, 38], [200, 25], [220, 35], [240, 30]],
    xLabels: [':00', ':15', ':30', ':45', ':59'],
  },
  '6h': {
    chart1: [[0, 70], [20, 62], [40, 68], [60, 52], [80, 58], [100, 45], [120, 50], [140, 38], [160, 42], [180, 30], [200, 35], [220, 25], [240, 20]],
    chart2: [[0, 50], [20, 58], [40, 42], [60, 55], [80, 35], [100, 48], [120, 30], [140, 52], [160, 25], [180, 45], [200, 28], [220, 40], [240, 32]],
    xLabels: ['18:00', '19:30', '21:00', '22:30', '23:59'],
  },
  '24h': {
    chart1: [[0, 75], [10, 68], [20, 72], [35, 55], [50, 60], [65, 45], [80, 50], [100, 35], [120, 40], [140, 28], [160, 32], [180, 22], [200, 25], [220, 18], [240, 12]],
    chart2: [[0, 45], [12, 55], [25, 38], [40, 62], [55, 30], [70, 52], [85, 25], [100, 48], [115, 20], [130, 42], [150, 28], [170, 50], [190, 22], [210, 38], [240, 30]],
    xLabels: ['00:00', '06:00', '12:00', '18:00', '23:59'],
  },
  '7d': {
    chart1: [[0, 85], [20, 78], [40, 72], [60, 65], [80, 58], [100, 52], [120, 48], [140, 42], [160, 38], [180, 32], [200, 28], [220, 22], [240, 15]],
    chart2: [[0, 55], [20, 48], [40, 58], [60, 42], [80, 52], [100, 38], [120, 48], [140, 32], [160, 42], [180, 28], [200, 38], [220, 25], [240, 30]],
    xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Sun'],
  },
  '30d': {
    chart1: [[0, 90], [15, 85], [30, 78], [50, 72], [70, 65], [90, 58], [110, 52], [130, 45], [150, 40], [170, 35], [190, 28], [210, 22], [230, 18], [240, 12]],
    chart2: [[0, 42], [20, 50], [40, 38], [60, 55], [80, 32], [100, 48], [120, 28], [140, 52], [160, 22], [180, 45], [200, 30], [220, 40], [240, 35]],
    xLabels: ['Feb 18', 'Feb 25', 'Mar 4', 'Mar 11', 'Mar 19'],
  },
};

const ANOMALIES = [
  { severity: 'critical', title: 'Latency spike detected', type: 'Latency Outlier', time: '3 min ago' },
  { severity: 'critical', title: 'High-risk content surge', type: 'Safety Surge', time: '6h ago' },
  { severity: 'warning', title: 'Token usage spike detected', type: 'Token Spike', time: '4h ago' },
];

// ── SVG Chart paths ──────────────────────────────────

function buildSmoothPath(points) {
  if (points.length < 2) return '';
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev[0] + (curr[0] - prev[0]) * 0.4;
    const cpx2 = prev[0] + (curr[0] - prev[0]) * 0.6;
    d += ` C${cpx1},${prev[1]} ${cpx2},${curr[1]} ${curr[0]},${curr[1]}`;
  }
  return d;
}

// ── Icons (inline SVG) ──────────────────────────────

const NavIcon = ({ type }) => {
  const common = {
    width: '1.6em',
    height: '1.6em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'dashboard':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case 'barchart':
      return (
        <svg {...common}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'list':
      return (
        <svg {...common}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      );
    case 'alert':
      return (
        <svg {...common}>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );
    default:
      return null;
  }
};

// ── Sparkline ────────────────────────────────────────

const Sparkline = ({ data, gradientId }) => {
  const height = 48;
  const width = 200;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    let y;
    if (min === max) {
      y = height / 2;
    } else {
      y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
    }
    return { x, y };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="sentinel-sparkline"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--s-chart-primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--s-chart-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradientId})`} />
      <path
        d={pathD}
        fill="none"
        stroke="var(--s-chart-primary)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

// ── Animated value (rAF count-up on mount + transition on change) ──

function useAnimatedValue(ref, target, formatter, enabled) {
  const prevTarget = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const el = ref.current;
    const from = prevTarget.current ?? 0;
    prevTarget.current = target;

    const duration = 400;
    const startTime = performance.now();
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    if (rafId.current) cancelAnimationFrame(rafId.current);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = from + (target - from) * eased;
      el.textContent = formatter(current);
      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        el.textContent = formatter(target);
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, [target, enabled, formatter]);
}

// ── Formatters ───────────────────────────────────────

const formatters = {
  int: (n) => Math.round(n).toLocaleString('en-US'),
  latency: (n) => `${n.toFixed(2)}s`,
  pct: (n) => `${n.toFixed(2)}%`,
  dollar: (n) => `$${n.toFixed(2)}`,
  tokens: (n) => `${n.toFixed(1)}K`,
  tokensM: (n) => `${n.toFixed(1)}M`,
  anomaly: (n) => Math.round(n).toString(),
};

// ── Area Chart ───────────────────────────────────────

const AreaChart = ({ linePath, areaPath, title, gradientId, color, xLabels, animate }) => {
  const lineRef = useRef(null);
  const [lineLength, setLineLength] = useState(0);

  useEffect(() => {
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
      setLineLength(length);
    }
  }, [linePath]);

  return (
    <div className="sentinel-chart-card">
      <span className="sentinel-chart-title">{title}</span>
      <div className="sentinel-chart-svg-wrap">
        <svg viewBox="0 0 240 100" className="sentinel-chart-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={areaPath}
            fill={`url(#${gradientId})`}
            style={{
              opacity: animate ? 1 : 0,
              transition: 'opacity 0.5s ease 0.2s, d 0.4s ease',
            }}
          />
          <path
            ref={lineRef}
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={
              lineLength
                ? {
                    strokeDasharray: lineLength,
                    strokeDashoffset: animate ? 0 : lineLength,
                    transition: 'stroke-dashoffset 1s ease-out, d 0.4s ease',
                  }
                : undefined
            }
          />
        </svg>
        <div className="sentinel-chart-x-labels">
          {xLabels.map((label, i) => (
            <span key={`${label}-${i}`} className="sentinel-chart-x-label">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── KPI Card ─────────────────────────────────────────

const KPICard = ({ data, index, startCounting, animateIn }) => {
  const valueRef = useRef(null);
  const formatter = formatters[data.format] || formatters.int;

  useAnimatedValue(valueRef, data.value, formatter, startCounting);

  const delay = index * 60;
  const gradientId = `sentinel-spark-${index}`;

  return (
    <div
      className="sentinel-kpi-card"
      style={{
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? 'translateY(0)' : 'translateY(0.8em)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      }}
    >
      <span className="sentinel-kpi-label">{data.label}</span>
      <span className="sentinel-kpi-value" ref={valueRef}>
        0
      </span>
      <span className={`sentinel-kpi-change ${data.good ? 'good' : 'bad'}`}>
        {data.arrow} {data.change}
      </span>
      {data.sparkline && <Sparkline data={data.sparkline} gradientId={gradientId} />}
    </div>
  );
};

// ── Main Component ───────────────────────────────────

const SentinelMockup = () => {
  const rootRef = useRef(null);
  const isInView = useInView(rootRef, { once: true, amount: 0.25 });

  // Interactive state
  const [activePill, setActivePill] = useState('24h');

  // Animation phase states
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showAnomalies, setShowAnomalies] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timers = [
      setTimeout(() => setShowSidebar(true), 0),
      setTimeout(() => setShowHeader(true), 100),
      setTimeout(() => setShowCards(true), 200),
      setTimeout(() => setStartCounting(true), 600),
      setTimeout(() => setShowCharts(true), 800),
      setTimeout(() => setShowAnomalies(true), 1200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  // Derived data from active pill
  const kpiData = RANGE_KPI[activePill];
  const chartData = RANGE_CHARTS[activePill];

  const chart1Line = useMemo(() => buildSmoothPath(chartData.chart1), [chartData]);
  const chart1Area = useMemo(() => chart1Line + ' L240,100 L0,100 Z', [chart1Line]);
  const chart2Line = useMemo(() => buildSmoothPath(chartData.chart2), [chartData]);
  const chart2Area = useMemo(() => chart2Line + ' L240,100 L0,100 Z', [chart2Line]);

  return (
    <div className="sentinel-root" ref={rootRef} style={{ fontSize: '10px' }}>
      {/* Sidebar */}
      <nav
        className="sentinel-sidebar"
        style={{
          opacity: showSidebar ? 1 : 0,
          transform: showSidebar ? 'translateX(0)' : 'translateX(-1em)',
          transition: 'opacity 0.4s ease, transform 0.4s ease, width 0.2s ease',
        }}
      >
        {/* Logo */}
        <div className="sentinel-logo-area">
          <div className="sentinel-logo-box">LS</div>
          <span className="sentinel-logo-text">LLM Sentinel</span>
        </div>

        {/* Navigation */}
        <div className="sentinel-nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`sentinel-nav-item ${item.active ? 'active' : ''}`}
              title={item.label}
            >
              <span className="sentinel-nav-icon">
                <NavIcon type={item.icon} />
              </span>
              <span className="sentinel-sidebar-label">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <div className="sentinel-main">
        {/* Header */}
        <div
          className="sentinel-header"
          style={{
            opacity: showHeader ? 1 : 0,
            transform: showHeader ? 'translateY(0)' : 'translateY(-0.8em)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <span className="sentinel-title">Overview</span>
          <div className="sentinel-header-right">
            <div className="sentinel-time-range">
              {TIME_PILLS.map((pill) => (
                <span
                  key={pill}
                  className={`sentinel-pill ${pill === activePill ? 'active' : ''}`}
                  onClick={() => setActivePill(pill)}
                >
                  {pill}
                </span>
              ))}
            </div>
            <div className="sentinel-live-indicator">
              <span className="sentinel-live-dot" />
              <span className="sentinel-live-text">Live</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="sentinel-body">
          {/* KPI Grid */}
          <div className="sentinel-kpi-grid">
            {kpiData.map((kpi, i) => (
              <KPICard
                key={kpi.label}
                data={kpi}
                index={i}
                startCounting={startCounting}
                animateIn={showCards}
              />
            ))}
          </div>

          {/* Charts */}
          <div className="sentinel-charts">
            <AreaChart
              title="Request Volume"
              linePath={chart1Line}
              areaPath={chart1Area}
              gradientId="sentinel-grad-1"
              color="#818CF8"
              xLabels={chartData.xLabels}
              animate={showCharts}
            />
            <AreaChart
              title="Average Latency"
              linePath={chart2Line}
              areaPath={chart2Area}
              gradientId="sentinel-grad-2"
              color="#A78BFA"
              xLabels={chartData.xLabels}
              animate={showCharts}
            />
          </div>

          {/* Anomaly Summary */}
          <div
            className="sentinel-anomaly-card"
            style={{
              opacity: showAnomalies ? 1 : 0,
              transform: showAnomalies ? 'translateY(0)' : 'translateY(0.6em)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <div className="sentinel-anomaly-header">
              <div className="sentinel-anomaly-header-left">
                <span className="sentinel-anomaly-header-label">Active Anomalies</span>
                <span className="sentinel-anomaly-count-badge">{kpiData[5].value}</span>
              </div>
              <span className="sentinel-anomaly-view-all">View all &rarr;</span>
            </div>
            <div className="sentinel-anomaly-rows">
              {ANOMALIES.map((anomaly, i) => (
                <div
                  key={anomaly.title}
                  className="sentinel-anomaly-row"
                  style={{
                    opacity: showAnomalies ? 1 : 0,
                    transform: showAnomalies ? 'translateY(0)' : 'translateY(0.4em)',
                    transition: `opacity 0.3s ease ${i * 80}ms, transform 0.3s ease ${i * 80}ms`,
                  }}
                >
                  <span className={`sentinel-severity-dot ${anomaly.severity}`} />
                  <span className="sentinel-anomaly-title">{anomaly.title}</span>
                  <span className="sentinel-anomaly-type">{anomaly.type}</span>
                  <span className="sentinel-anomaly-time">{anomaly.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentinelMockup;
