import { intersects as intersectsFilter } from 'ol/format/filter';
import { GetBoundary, GetFeature, Union } from '../../../../functions/utils/spatial';
import Feature from 'ol/Feature';
import { EXTERNAL_OGC_ENDPOINT, EXTERNAL_OGC_LAYER_PARCELASRUSTICAS, EXTERNAL_OGC_FEATUREPREFIX, EXTERNAL_OGC_LAYER_PARCELASRUSTICAS_FIELD_GEOM, INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA_FIELD_GEOM } from '../../../../constants';

// TODO: a funcion global para poderlo utilizar desde el handler clic de parcelas
const process = async (aoi, setAOI, parcelas, setParcelas) => {
    // 1. union aoi con parcelas
    const unidos = await Union({ polygons: parcelas.concat(aoi) });
    const unidosfeature = new Feature({ geometry: unidos, name: "test" });
    unidosfeature.setGeometryName(INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA_FIELD_GEOM);
    setAOI(unidosfeature);
    setParcelas([]);
}

const UnionParcelasAOI = ({ aoi, setAOI, parcelas, setParcelas }) => {
    return (
        <button onClick={() => process(aoi, setAOI, parcelas, setParcelas)}>Unir parcelas con AOI</button>
    );
}

export default UnionParcelasAOI;
