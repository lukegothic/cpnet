import React, { useState, useEffect, useRef } from 'react';
import {Map, View} from 'ol';
import ImageWMS from 'ol/source/ImageWMS';
import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import { GEOSERVER_EPSG_4326_YX, INTERNAL_OGC_ENDPOINT, INTERNAL_OGC_FEATUREPREFIX, INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA, INTERNAL_OGC_NAMESPACE, WFS_VERSION } from './constants';

import 'ol/ol.css';
import AOILoader from './ui/components/AOILoader';
import VectorLayer from 'ol/layer/Vector';
import { Update } from './functions/utils/spatial';
import ActionToolbar from './ui/components/ActionToolbar/ActionToolbar';
import { UserPreferences } from './services/UserPreferences';

const cpid = 2;

const writeCPAOI = async (aoi, map, aoiLayer) => {
    // CASOS A REFLEJAR:
    // se podria usar getId o revisions... probar
    // 1. carga inicial: solo zoom
    // 2. reemplazar cargando uno nuevo: zoom + guardar + update layer
    // 3. editar: guardar
    // 4. anadir parcelas colindantes: zoom + guardar + update layer
    if (!aoi.getId()) {
        // preparar feature para subir
        aoi.setId(cpid);
        
        const r = await Update({
            featureNS: INTERNAL_OGC_NAMESPACE,
            featurePrefix: INTERNAL_OGC_FEATUREPREFIX,
            featureType: INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA,
            features: aoi,
            srsName: GEOSERVER_EPSG_4326_YX
        }, INTERNAL_OGC_ENDPOINT);

        // TODO: check errors
        aoiLayer.getSource().clear();
        aoiLayer.getSource().refresh();
        /*
        map.getView().fit(aoiLayer.getSource().getExtent(), {
            padding: [100,100,100,100]
        });
        */
        // set features to map
        /*
        aoiLayer.setSource(
            new VectorSource({
                features // make sure features is an array
            })
        );

        map.getView().fit(aoiLayer.getSource().getExtent(), {
            padding: [100,100,100,100]
        });

        console.log(intersects("x", aoiLayer.getSource().getExtent()))
        */
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
    } else {
        
        /*
        map.getView().fit(aoi.getExtent(), {
            padding: [100, 100, 100, 100]
        });
        */
    }  
}

// puede ser provisional o definitivo
// se puede guardar a la vez que la zona de actuacion en una sola operaciokn
const EstablecerEstadoZonaActuacion = ({ status }) => {
    // TODO: guardar estado CP
}

// el guardado de la geometria como tal
const GuardarZonaActuacion = () => {

}

// recarga de la zona de actuacion del servidor
const CargaZonaActuacion = () => {

}

// zoom a la zona de actiacion
const Zoom = () => {

}

const App = () => {
    const [ map, setMap ] = useState();
    const [ aoiLayer, setAOILayer ] = useState();
    const [ parcelasRusticasLayer, setParcelasRusticasLayer ] = useState();
    const [ aoi, setAOI ] = useState();
    const [ parcelas, setParcelas ] = useState([]);

    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    useEffect(() => {
        // create and add vector source layer
        /*
        const initialAOILayer = new VectorLayer({
            source: new VectorSource()
        });
        */
       // TODO: esto esta dando mas problemas que otra cosa... cambiar a consulta AOI
        const aoiSource =  new VectorSource({
            format: new GeoJSON(),
            url: (extent, resolution, proj) => 
                `${INTERNAL_OGC_ENDPOINT}?SERVICE=WFS&version=1.1.0&request=GetFeature&typename=${INTERNAL_OGC_FEATUREPREFIX}:${INTERNAL_OGC_LAYER_CONCENTRACIONPARCELARIA}&outputFormat=application/json&srsname=${proj.code_}&bbox=${extent.join(',')},${proj.code_}`,
            strategy: bboxStrategy,
        });
        const initialAOILayer = new VectorLayer({
            source: aoiSource
        });

        // https://openlayers.org/en/latest/examples/vector-wfs-getfeature.html

        // create and add vector source layer
        // pruebas para intentar cargar por WFS las parcelas rusticas en funcion del contorno, sale mas a cuento cargarlas a mano
        // const eqFilter = equalToFilter('REFCAT', '101140206A');
        // console.log(eqFilter);
        // const initialParcelasRusticasLayer = new VectorLayer({
        //     source: new VectorSource({
        //         format: new GeoJSON(),
        //         url: (extent, resolution, proj) => 
        //             `${endpointOGCIDENA}?SERVICE=WFS&version=${wfsVersion}&request=GetFeature&typename=${parcelaRusticaLayer}&outputFormat=application/json&srsname=${proj.code_}&filter=${null}`,
        //         strategy: bboxStrategy,
        //     }),
        //     // &bbox=${extent.join(',')},${proj.code_}
        //     // style: 
        // });

        const initialParcelasRusticasLayer = new VectorLayer({
            source: new VectorSource()
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
                zoom: 10,
            })
        });

        initialMap.on("click", (e) => console.log(e));
        // esta seccion pretende hacer zoom al AOI, hay dos maneras de hacerlo:
        // VectorSource: evento "featuresloadend" => la primera carga OK, la segunda carga no funciona
        // VectorLayer: evento "change" => la primera carga OK, la segunda carga no funciona
        // Cuando funcionan, ambos mueven el mapa y generan peticiones extra a los servicios conectados, tanto WFS como WMS
        // Hay que solucionarlo porque también se utilizará para computar las parcelas colindantes
        /*
        aoiSource.on("featuresloadend", (e) => {
            console.log(e);
            e.features && e.features.length > 0 && initialMap.getView().fit(e.target.getExtent(), {
                padding: [100, 100, 100, 100]
            });
        });*/
        // al cargar si hay feature hacer zoom
        initialAOILayer.once("change", (e) => {
            const f = e.target.getSource().getFeatures();
            if (f.length > 0) {
                // TODO: Tambien hay que establecer el AOI para que funcione el boton de obtener las parcelas colindantes
                setAOI(f[0]); 
                // TODO: pensar donde va el zoom a la capa, si en el setter o aqui 
                initialMap.getView().fit(e.target.getSource().getExtent(), {
                    padding: [100, 100, 100, 100]
                });
            }
        });
        
        setMap(initialMap);
        setAOILayer(initialAOILayer);
        setParcelasRusticasLayer(initialParcelasRusticasLayer);
        
        // carga idioma
        const up = UserPreferences.read();
        console.log(up);
    }, []);

    useEffect(() => {
        parcelas && parcelasRusticasLayer && parcelasRusticasLayer.setSource(new VectorSource({ features: parcelas }));
        //parcelas && parcelasRusticasLayer.getSource().addFeature(parcelas);
    }, [parcelas]);

    useEffect(() => {
        aoi && writeCPAOI(aoi, map, aoiLayer);
    }, [aoi]);

    return (
        <>
            <div style={{ height:'100vh',width:'100%' }} ref={mapElement} className="map-container" />
            { mapRef && mapRef.current && <AOILoader map={ mapRef.current } mapElement={ mapElement.current } setAOI={setAOI} /> }
            { aoi && <ActionToolbar aoi={aoi} setAOI={setAOI} parcelas={parcelas} setParcelas={setParcelas} />}
        </>
    );
}
// split https://spatial-dev.guru/2021/09/05/split-a-polygon-by-line-in-openlayers/
// merge https://spatial-dev.guru/2021/09/05/merge-two-polygons-in-openlayers/
export default App;
