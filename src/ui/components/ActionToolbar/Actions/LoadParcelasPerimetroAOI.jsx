import { intersects as intersectsFilter } from 'ol/format/filter';
import { GetBoundary, GetFeature, Union } from '../../../../functions/utils/spatial';
import Feature from 'ol/Feature';
import { EXTERNAL_OGC_ENDPOINT, EXTERNAL_OGC_LAYER_PARCELASRUSTICAS, EXTERNAL_OGC_FEATUREPREFIX, EXTERNAL_OGC_LAYER_PARCELASRUSTICAS_FIELD_GEOM, INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA_FIELD_GEOM } from '../../../../constants';

const process = async (aoi, setAOI, setParcelas) => {
    // 1. contorno del aoi
    const contorno = await GetBoundary({ polygon: aoi });
    // 2. match contorno con parcelas
    const features = await GetFeature({
        featurePrefix: EXTERNAL_OGC_FEATUREPREFIX,
        featureType: EXTERNAL_OGC_LAYER_PARCELASRUSTICAS,
        filter: intersectsFilter(EXTERNAL_OGC_LAYER_PARCELASRUSTICAS_FIELD_GEOM, contorno)
    }, EXTERNAL_OGC_ENDPOINT);
    setParcelas(features);
    /*
    // 3. union aoi con parcelas
    const unidos = await Union({ polygons: features.concat(aoi) });
    // TODO: MOSTRAR EN X
    const unidosfeature = new Feature({ geometry: unidos, name: "test" });
    unidosfeature.setGeometryName(INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA_FIELD_GEOM);
    setAOI(unidosfeature);
    */
}

const AddParcelasToAOI = ({ aoi, setAOI, setParcelas }) => {
    return (
        <button onClick={() => process(aoi, setAOI, setParcelas)}>Parcelas colindantes con AOI</button>
    );
}

export default AddParcelasToAOI;
