import DragAndDrop from 'ol/interaction/DragAndDrop';
import {GPX, GeoJSON, IGC, KML, TopoJSON} from 'ol/format';
import {Vector as VectorLayer} from 'ol/layer';
import { View } from 'ol';

const AOILoader = ({ map, mapElement, setFeatures }) => {
    const extractStyles = true;
    //console.log(map);
    //return <div></div>;
    const dragAndDropInteraction = new DragAndDrop({
        formatConstructors: [
          GPX,
          GeoJSON,
          IGC,
          new KML({ extractStyles }),
          TopoJSON,
        ],
        target: mapElement
    });
    dragAndDropInteraction.on("change", (e) => {
        console.log(e);
    }); 
    dragAndDropInteraction.on("error", (e) => {
        console.log(e);
    }); 
    dragAndDropInteraction.on("propertychange", (e) => {
        console.log(e);
    }); 
    dragAndDropInteraction.on('addfeatures', (e) => {
        setFeatures(e.features);
    });
    map.addInteraction(dragAndDropInteraction);
}

export default AOILoader;