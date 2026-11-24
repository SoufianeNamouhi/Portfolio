export function useReducedMotion() {
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  return { prefersReduced }
}
