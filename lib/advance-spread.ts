/** Theme advance-wrap spread curve (4-card reference from custom-gsap.js) */
const X_CURVE = [100, 30, -30, -60];
const ROTATE_CURVE = [-8, 4.13, -6.42, -12.15];

function sampleCurve(curve: number[], index: number, total: number): number {
  if (total <= 1) return 0;
  const pos = (index / (total - 1)) * (curve.length - 1);
  const lo = Math.floor(pos);
  const hi = Math.min(lo + 1, curve.length - 1);
  const frac = pos - lo;
  return curve[lo] + (curve[hi] - curve[lo]) * frac;
}

export function getAdvanceSpread(index: number, total: number) {
  return {
    xPercent: sampleCurve(X_CURVE, index, total),
    rotate: sampleCurve(ROTATE_CURVE, index, total),
  };
}
