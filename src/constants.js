// fichero de configuracion
export const EPSG_NAME = 'EPSG:4326';
export const WFS_VERSION = "1.1.0";
export const WPS_VERSION = "1.0.0";

export const EXTERNAL_OGC_ENDPOINT = "https://idena.navarra.es/ogc/ows";
export const EXTERNAL_OGC_FEATUREPREFIX = "IDENA";
export const EXTERNAL_OGC_LAYER_PARCELASRUSTICAS = "CATAST_Pol_ParcelaRusti";
export const EXTERNAL_OGC_LAYER_PARCELASRUSTICAS_FIELD_GEOM = "the_geom";

export const INTERNAL_OGC_ENDPOINT = "http://hvwserver2019:8080/geoserver/ows";
export const INTERNAL_OGC_NAMESPACE = "https://www.navarra.es/cpnet";
export const INTERNAL_OGC_FEATUREPREFIX = "cpnet";
export const INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA = "concentracion_parcelaria";

export const GEOSERVER_EPSG_4326_YX = "CRS:84"; // que es esto? esto es una projección que flipea la xy, equivale a EPSG:4326