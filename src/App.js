import React, { useState, useEffect, useRef } from 'react';
import {Map, View} from 'ol';
import ImageWMS from 'ol/source/ImageWMS';
import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';

import {intersects} from 'ol/format/filter';


import 'ol/ol.css';
import AOILoader from './ui/components/AOILoader';
import VectorLayer from 'ol/layer/Vector';

const cp = 1;
const endpointOGCIDENA = "https://idena.navarra.es/ogc/ows";
const parcelaRusticaLayer = "IDENA:CATAST_Pol_ParcelaRusti";

const App = () => {
    const [ map, setMap ] = useState();
    const [ aoiLayer, setAOILayer ] = useState();
    const [ parcelasRusticasLayer, setParcelasRusticasLayer ] = useState();
    const [ features, setFeatures ] = useState();
    const [ aoi, setAOI ] = useState();

    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    useEffect(() => {
        // create and add vector source layer
        const initialAOILayer = new VectorLayer({
            source: new VectorSource()
        });

        // https://openlayers.org/en/latest/examples/vector-wfs-getfeature.html

        // create and add vector source layer
        const initialParcelasRusticasLayer = new VectorLayer({
            source: new VectorSource({
                format: new GeoJSON(),
                url: function (extent, resolution, proj) {
                    console.log(proj);
                    return (`${endpointOGCIDENA}?SERVICE=WFS&version=1.1.0&request=GetFeature&typename=${parcelaRusticaLayer}&outputFormat=application/json&srsname=${proj.code_}&bbox=${extent.join(',')},${proj.code_}`)
                    // "filter="
                },
                strategy: bboxStrategy,
            }),
            // style: 
        });

        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                new ImageLayer({
                    source: new ImageWMS({
                      url: 'https://idena.navarra.es/ogc/ows',
                      params: {'LAYERS': 'catastro'},
                      ratio: 1,
                      serverType: 'geoserver',
                    }),
                  }),
                  initialAOILayer,
                  initialParcelasRusticasLayer
            ],
            view: new View({
                projection: 'EPSG:4326',
                center: [-1.642456, 42.819581],
                zoom: 13,
            })
        });

        // IDENA:CATAST_Pol_ParcelaRusti

        setMap(initialMap);
        setAOILayer(initialAOILayer);
        setParcelasRusticasLayer(initialParcelasRusticasLayer);
    }, []);

    useEffect(() => {
        if (features) {
            // set features to map
            aoiLayer.setSource(
                new VectorSource({
                    features // make sure features is an array
                })
            );
            map.getView().fit(aoiLayer.getSource().getExtent(), {
                padding: [100,100,100,100]
            });

            console.log(intersects("x", aoiLayer.getSource().getExtent()))

            /*
                FILTER=<Filter xmlns="http://www.opengis.net/ogc"
                xmlns:gml="http://www.opengis.net/gml"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.opengis.net/ogc
                ../filter/1.1.0/filter.xsd
                http://www.opengis.net/gml
                ../gml/3.1.1/base/gml.xsd">
                <Within><PropertyName>InWaterA_1M/wkbGeom<PropertyName>
                <gml:Envelope><gml:lowerCorner>10 10</lowerCorner>
                <gml:upperCorner>20,20</gml:upperCorner></gml:Envelope>
                </Within></Filter> 
            */
        }
    }, [features]);

    return (
        <>
            <div style={{ height:'100vh',width:'100%' }} ref={mapElement} className="map-container" />
            { mapRef && mapRef.current && <AOILoader map={ mapRef.current } mapElement={ mapElement.current } setFeatures={setFeatures} /> }
        </>
    );
}
// split https://spatial-dev.guru/2021/09/05/split-a-polygon-by-line-in-openlayers/
// merge https://spatial-dev.guru/2021/09/05/merge-two-polygons-in-openlayers/
export default App;