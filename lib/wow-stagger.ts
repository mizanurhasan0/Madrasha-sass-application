export function wowStaggerDelay(index: number): number {
  return [300, 500, 700][index % 3];
}
