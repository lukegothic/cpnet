import { EPSG_NAME } from "conf/Spatial";
import { WFSRequester } from "./_utils/WFSRequester";
import { WPSRequester } from "./_utils/WPSRequester";

// TODO: esto es repo/util, repo o servicio?
// TODO: esto tiene que ser una clase 
// TODO: esto tiene que estar dividido en WPS y WFS --> WFS esta relacionado estrictamente con una entidad, WPS NO

const WFS = new WFSRequester();
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


// TODO: ESTO VA EN WFSREquester!!!!!!!!!!!!!!!!!!! YAY!
// filter deberia ser tipo de filtro + dato geografico // alfanumerico
// featureType
export const GetFeature = async ({
  featureNS = null,
  featurePrefix,
  featureType,
  filter = null,
  srsName = EPSG_NAME
} = {}) => {
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
  return await WFS.GetFeature({
    featureNS,
    featurePrefix,
    featureTypes: Array.isArray(featureType) ? featureType : [featureType],
    filter,
    srsName
  });
};

export const Transaction = async ({
  featureNS,
  featurePrefix,
  featureType,
  inserts = null,
  updates = null,
  deletes = null,
  srsName = EPSG_NAME
} = {}) => {
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
  return await WFS.Transaction({
    featureNS,
    featurePrefix,
    featureType,
    inserts,
    updates,
    deletes,
    srsName
  });
};

export const Insert = async ({
  featureNS,
  featurePrefix,
  featureType,
  features,
  srsName = EPSG_NAME
} = {}) => await Transaction({ featureNS, featurePrefix, featureType, inserts: features, srsName });

export const Update = async ({
  featureNS,
  featurePrefix,
  featureType,
  features,
  srsName = EPSG_NAME
} = {}) => await Transaction({ featureNS, featurePrefix, featureType, updates: features, srsName });

export const Delete = async ({
  featureNS,
  featurePrefix,
  featureType,
  features,
  srsName = EPSG_NAME
} = {}) => await Transaction({ featureNS, featurePrefix, featureType, deletes: features, srsName });
