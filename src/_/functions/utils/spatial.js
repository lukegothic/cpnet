import WPS from "../OGC/WPS";
import WFS from "../OGC/WFS";
import { INTERNAL_OGC_ENDPOINT, EPSG_NAME } from '../../constants';
const INTERNAL_WPS_ENDPOINT = new WPS({ url: INTERNAL_OGC_ENDPOINT });

const Execute = async ({ op, inputs }, url) => {
    const WPSEndpoint = url ? new WPS({ url }) : INTERNAL_WPS_ENDPOINT;
    return await WPSEndpoint.Execute({ op, inputs });
}

export const GetBoundary = async ({ polygon }, url = null) => {             // returns LineString || MultiLineString
    return await Execute({ op: "geo:boundary", inputs: { identifier: "geom", geometry: polygon.getGeometry() }}, url);
}

export const SplitPolygon = async ({ polygon, line }, url = null) => {      // returns Polygon[] || MultiPolygon[]
    return await Execute({ op: "geo:splitPolygon", inputs: [{ identifier: "polygon", geometry: polygon.getGeometry() }, { identifier: "line", geometry: line.getGeometry() }]}, url);
}

export const Union = async ({ polygons }, url = null) => {                  // returns Polygon || MultiPolygon
    if (Array.isArray(polygons) && polygons.length >= 2) {
        return await Execute({ op: "geo:union", inputs: polygons.map(polygon => ({ identifier: "geom", geometry: polygon.getGeometry() }))}, url);
    } else {
        console.log("at least 2 polygons needed to perform union op");
    }
}

const INTERNAL_WFS_ENDPOINT = new WFS({ url: INTERNAL_OGC_ENDPOINT });
// filter deberia ser tipo de filtro + dato geografico // alfanumerico
// featureType 
export const GetFeature = async({ featureNS = null, featurePrefix, featureType, filter = null, srsName = EPSG_NAME }, url = null) => {
    // TODO: hay que validar url si hay uno por defecto?
    if (!url) {
        throw new Error("url is required");
    }
    if (!featurePrefix) {
        throw new Error("featurePrefix is required");
    }
    if (!featureType) {
        throw new Error("featureType is required");
    }
    // TODO: validacion parameteros, composicion de filtros etc
    const WFSEndpoint = url ? new WFS({ url }) : INTERNAL_WFS_ENDPOINT;
    return await WFSEndpoint.GetFeature({ featureNS, featurePrefix, featureTypes: Array.isArray(featureType) ? featureType : [featureType], filter, srsName });
}

export const Transaction = async ({ featureNS, featurePrefix, featureType, inserts = null, updates = null, deletes = null, srsName = EPSG_NAME }, url = null) => {
    // TODO: hay que validar url si hay uno por defecto?
    if (!url) {
        throw new Error("url is required");
    }
    if (!featureNS) {
        throw new Error("featureNS is required");
    }
    if (!featurePrefix) {
        throw new Error("featurePrefix is required");
    }
    if (!featureType) {
        throw new Error("featureType is required");
    }
    if (!inserts && !updates && !deletes) {
        throw new Error("features is required");
    }
    const WFSEndpoint = url ? new WFS({ url }) : INTERNAL_WFS_ENDPOINT;
    return await WFSEndpoint.Transaction({ featureNS, featurePrefix, featureType, inserts, updates, deletes, srsName });
}

export const Insert = async({ featureNS, featurePrefix, featureType, features, srsName = EPSG_NAME }, url = null) => {
    return await Transaction({ featureNS, featurePrefix, featureType, inserts: features, srsName }, url);
}

export const Update = async({ featureNS, featurePrefix, featureType, features, srsName = EPSG_NAME }, url = null) => {
    return await Transaction({ featureNS, featurePrefix, featureType, updates: features, srsName }, url);
}

export const Delete = async({ featureNS, featurePrefix, featureType, features, srsName = EPSG_NAME }, url = null) => {
    return await Transaction({ featureNS, featurePrefix, featureType, deletes: features, srsName }, url);
}