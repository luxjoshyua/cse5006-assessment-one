export type Density = "comfortable" | "compact"

export const DENSITY_KEY = "density"
export const DEFAULT_DENSITY: Density = "comfortable"

export function isDensity(value: unknown): value is Density {
  return value === "comfortable" || value === "compact"
}
