import WPS from "../OGC/WPS"
const WPSEndpoint = new WPS();
export const GetBoundary = async (polygon) => {             // returns MultiLineString
    return await WPSEndpoint.Execute({ op: "geo:boundary", inputs: { identifier: "geom", geometry: polygon }});
}
export const SplitPolygon = async (polygon, line) => {      // returns Polygon[]
    return await WPSEndpoint.Execute({ op: "geo:splitPolygon", inputs: [{ identifier: "polygon", geometry: polygon }, { identifier: "line", geometry: line }]});
}
export const Union = async (polygons) => {                  // returns MultiPolygon
    if (Array.isArray(polygons) && polygons.length >= 2) { 
        return await WPSEndpoint.Execute({ op: "geo:union", inputs: polygons.map(polygon => ({ identifier: "geom", geometry: polygon }))});
    } else {
        console.log("at least 2 polygons needed to perform union op");
    }
}