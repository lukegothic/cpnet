/* Utilidades para consumir un endpoint WPS */
import { WPSRequester } from "repositories/_utils/WPSRequester";

const WPS = new WPSRequester();

export const Execute = async ({ op, inputs } = {}) => await WPS.Execute({ op, inputs });

// returns LineString || MultiLineString
export const GetBoundary = async ({ polygon } = {}) =>
  await Execute({
    op: "geo:boundary",
    inputs: { identifier: "geom", geometry: polygon.getGeometry() }
  });

// returns Polygon[] || MultiPolygon[]
export const SplitPolygon = async ({ polygon, line } = {}) =>
  await Execute({
    op: "geo:splitPolygon",
    inputs: [
      { identifier: "polygon", geometry: polygon.getGeometry() },
      { identifier: "line", geometry: line.getGeometry() }
    ]
  });

// returns Polygon || MultiPolygon
export const Union = async ({ polygons } = {}) => {
  if (Array.isArray(polygons) && polygons.length >= 2) {
    return await Execute({
      op: "geo:union",
      inputs: polygons.map(polygon => ({ identifier: "geom", geometry: polygon.getGeometry() }))
    });
  } else {
    console.log("at least 2 polygons needed to perform union op");
  }
};
