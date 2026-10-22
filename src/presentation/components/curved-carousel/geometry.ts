/**
 * Geometry for a row of tiles streaming around the inside of a cylinder.
 * The centre faces the viewer flat and the ends curl towards the camera.
 * Pure functions only, so the math is unit-tested apart from React.
 */

/** Camera distance from the screen, as a multiple of the cylinder radius. */
export const CAMERA = 1.6;

/** A tile is never wider than this share (%) of the frame width. */
export const MAX_TILE_WIDTH = 55;

/** Upper bound of mounted tiles, so a sliver-sized frame stays cheap. */
const MAX_COLUMNS = 60;

export interface CarouselLayout {
  /** How many tiles are mounted along the loop. */
  readonly columns: number;
  /** Degrees from the centre to each end of the loop. */
  readonly sweep: number;
  /** Degrees of arc spanned by one tile height. */
  readonly unit: number;
  /** Degrees from the centre after which a tile is entirely off-screen. */
  readonly limit: number;
}

export interface MeasureInput {
  readonly width: number;
  readonly height: number;
  /** Tile height as % of the frame height. */
  readonly tileHeight: number;
  /** Tile width divided by tile height. */
  readonly aspectRatio: number;
  /** Gap between tiles as % of the tile height. */
  readonly gap: number;
  /** Radians around the arc at which the frame edge sits. */
  readonly bend: number;
}

const toDegrees = (radians: number) => (radians * 180) / Math.PI;
const round = (value: number) => +value.toFixed(4);

export const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/**
 * Cylinder radius, as a share of the frame width, that puts the frame edge
 * `bend` radians around the arc when seen through the camera. Solves
 * r·sinθ · CAMERA / (CAMERA − 1 + cosθ) = width / 2 for r.
 */
export function radiusShare(bend: number): number {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

/**
 * Lays the loop on the cylinder. The loop reaches past `limit`, so a tile only
 * wraps while out of sight, and holds a whole number of tiles so the gap never
 * stretches.
 */
export function measure({
  width,
  height,
  tileHeight,
  aspectRatio,
  gap,
  bend,
}: MeasureInput): CarouselLayout {
  const tilePx = Math.min(
    (tileHeight / 100) * height,
    ((MAX_TILE_WIDTH / 100) * width) / aspectRatio,
  );
  const radius = width * radiusShare(bend);

  if (!(tilePx > 0) || !(radius > 0)) {
    return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  }

  const unit = toDegrees(tilePx / radius);
  const pitch = (aspectRatio + gap / 100) * unit;
  const limit = toDegrees(bend) + (aspectRatio * unit) / 2;
  const columns = Math.min(MAX_COLUMNS, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const sweep = round((columns * pitch) / 2);

  return { columns, sweep, unit: round(unit), limit: round(Math.min(sweep, limit)) };
}

/**
 * Percentage of the loop at each end during which a tile is hidden, because
 * it is past `limit` (off-screen or behind the camera).
 */
export function hiddenShare({ sweep, limit }: CarouselLayout): number {
  return +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
}
