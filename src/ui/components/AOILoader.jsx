import DragAndDrop from 'ol/interaction/DragAndDrop';
import {GPX, GeoJSON, IGC, KML, TopoJSON} from 'ol/format';

const geometryName = "area_interes";

const AOILoader = ({ map, mapElement, setFeatures }) => {
    const dragAndDropInteraction = new DragAndDrop({
        formatConstructors: [
          GPX,
          GeoJSON,
          IGC,
          new KML({ extractStyles: false }),
          TopoJSON,
        ],
        target: mapElement
    });
    dragAndDropInteraction.on('addfeatures', (e) => {
        const features = [...e.features];
        features.forEach(f => f.setGeometryName(geometryName));
        setFeatures(features);
    });
    map.addInteraction(dragAndDropInteraction);
}

export default AOILoader;