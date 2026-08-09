/**
 * Projects longitude/latitude onto a flat equirectangular canvas.
 * width/height should match the SVG viewBox used to render the map.
 */
export function projectLonLat(
  longitude: number,
  latitude: number,
  width: number,
  height: number
) {
  const x = ((longitude + 180) / 360) * width;
  const y = ((90 - latitude) / 180) * height;
  return { x, y };
}
