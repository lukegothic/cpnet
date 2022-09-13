import DragAndDrop from 'ol/interaction/DragAndDrop';
import {GML, GPX, GeoJSON, KML, TopoJSON} from 'ol/format';
import MultiPolygon from 'ol/geom/MultiPolygon';
import { INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA_FIELD_GEOM } from '../../constants';

const AOILoader = ({ map, mapElement, setAOI }) => {
    const dragAndDropInteraction = new DragAndDrop({
        formatConstructors: [
          GML,
          GPX,
          GeoJSON,
          new KML({ extractStyles: false }),
          TopoJSON,
        ],
        target: mapElement
    });
    dragAndDropInteraction.on('addfeatures', (e) => {
        // TODO: validar tipo de geometria correcta (solo polygon o multipolygon)        
        if (e.features.length > 0) {
            const features = [...e.features];
            features.forEach(f => {
                f.setId(null);
                f.setGeometryName(INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA_FIELD_GEOM);
                let geometry = f.getProperties().geometry;
                if (geometry.getType() === "Polygon") {
                    geometry = new MultiPolygon([geometry]);
                }
                f.getKeys().forEach(k => f.unset(k));
                f.setGeometry(geometry);
            });
            // TODO: check if multiple features, show feature selector etc.
            if (features.length > 1) {
                // showFeatureSelector
            } else {
                setAOI(features[0]);
            }
        } else {
            console.log("no hay features");
        }
    });
    map.addInteraction(dragAndDropInteraction);
}

export default AOILoader;
