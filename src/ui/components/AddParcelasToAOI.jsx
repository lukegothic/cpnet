import GML3 from 'ol/format/GML3';
import GeoJSON from 'ol/format/GeoJSON';
import { WFS as WFSFormat } from 'ol/format';
import { intersects as intersectsFilter } from 'ol/format/filter';
import { GetBoundary } from '../../functions/utils/spatial';

const endpointOGCIDENA = "https://idena.navarra.es/ogc/ows";
const parcelaRusticaLayer = "IDENA:CATAST_Pol_SubparRusti";
const wfsVersion = "1.1.0";

const process = async (aoi, setParcelas) => {
    const gml = new GML3();
    const geojson = new GeoJSON();
    // TODO: esto en la clase WPS
    //const data = gml.writeGeometry(aoi.getGeometry());
    const data = geojson.writeGeometry(aoi.getGeometry());
    // 1. contorno del aoi
    const contorno = await GetBoundary(data);
    //const mls = new MultiLineString(contorno);
    const mls = geojson.readFeature(contorno);
    // 2. match contorno con parcelas
     // generate a GetFeature request
     const wfsFormatter = new WFSFormat({ version: wfsVersion });

     const featureRequest = wfsFormatter.writeGetFeature({
         srsName: 'EPSG:4326',
         featureTypes: [parcelaRusticaLayer],
         outputFormat: 'application/json',
         filter: intersectsFilter("the_geom", mls.getGeometry())
     });

     const response = await fetch(`${endpointOGCIDENA}?SERVICE=WFS&version=${wfsVersion}`, {
         method: 'POST',
         body: new XMLSerializer().serializeToString(featureRequest),
     });
     const j = await response.json();
     console.log(j);
     const features = geojson.readFeatures(j);
     setParcelas(features);
    // 3. union aoi con parcelas

}

const AddParcelasToAOI = ({ aoi, setAOI, setParcelas }) => {
    console.log(aoi);
    return (
        <button onClick={() => process(aoi, setParcelas)}>AddParcelasToAOI</button>
    );
}

export default AddParcelasToAOI;