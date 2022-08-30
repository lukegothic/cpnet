import { within as withinFilter } from 'ol/format/filter';
import { GetFeature } from '../../functions/utils/spatial';
import { EXTERNAL_OGC_ENDPOINT, EXTERNAL_OGC_LAYER_PARCELASRUSTICAS, EXTERNAL_OGC_FEATUREPREFIX, EXTERNAL_OGC_LAYER_PARCELASRUSTICAS_FIELD_GEOM } from '../../constants';

const process = async (aoi, setParcelas) => {
    // peticion within
    const features = await GetFeature({
        featurePrefix: EXTERNAL_OGC_FEATUREPREFIX,
        featureType: EXTERNAL_OGC_LAYER_PARCELASRUSTICAS,
        filter: withinFilter(EXTERNAL_OGC_LAYER_PARCELASRUSTICAS_FIELD_GEOM, aoi.getGeometry())
    }, EXTERNAL_OGC_ENDPOINT);
    setParcelas(features);
}

const BotonRandom = ({ aoi, setParcelas }) => {
    return (
        <button onClick={() => process(aoi, setParcelas)}>BotonRandom</button>
    );
}

export default BotonRandom;