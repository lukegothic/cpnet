import React, { useState, useEffect, useRef } from 'react';
import {Map, View} from 'ol';
import ImageWMS from 'ol/source/ImageWMS';
import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';

import {intersects, equalTo as equalToFilter} from 'ol/format/filter';


import 'ol/ol.css';
import AOILoader from './ui/components/AOILoader';
import VectorLayer from 'ol/layer/Vector';
import { WFS } from 'ol/format';
import AddParcelasToAOI from './ui/components/AddParcelasToAOI';

const cpid = 2;
const endpointOGCIDENA = "https://idena.navarra.es/ogc/ows";
const parcelaRusticaLayer = "IDENA:CATAST_Pol_SubparRusti";
const wfsVersion = "1.1.0";

const endpointCPNET = "http://hvwserver2019:8080/geoserver/ows";
const cp_namespace = "cpnet";
const cp_layer = "concentracion_parcelaria";

const writeCPAOI = async (aoi, map, aoiLayer) => {
    // CASOS A REFLEJAR:
    // 1. carga inicial: solo zoom
    // 2. reemplazar cargando uno nuevo: zoom + guardar + update layer
    // 3. editar: guardar
    // 4. anadir parcelas colindantes: zoom + guardar + update layer

    // discriminar edits de carga inicial
    if (!aoi.getId()) {
        // preparar feature para subir
        aoi.setId(cpid);

        // generate a GetFeature request
        const wfsFormatter = new WFS({ version: wfsVersion, featureType: cp_layer, featureNS: cp_namespace });

        /*
        const featureRequest = new WFS().writeGetFeature({
            srsName: 'EPSG:4326',
            featurePrefix: 'topp',
            featureTypes: ['tasmania_water_bodies'],
            outputFormat: 'application/json',
            filter: equalToFilter('WATER_TYPE', 'Lake')
        });
        */

        const writeRequest = wfsFormatter.writeTransaction(
            null, // inserts
            [aoi], // updates
            null, // deletes
            {
                featureNS: "https://www.navarra.es/cpnet",
                featurePrefix: cp_namespace,
                featureType: cp_layer,
                //srsName: 'EPSG:4326',
                srsName: "CRS:84",  // que es esto? esto es una projección que flipea la xy, equivale a EPSG:4326
                outputFormat: 'application/json',
            }
        );
        const response = await fetch(`${endpointCPNET}?SERVICE=WFS&version=${wfsVersion}`, {
            method: 'POST',
            body: new XMLSerializer().serializeToString(writeRequest),
        });
        // TODO: check errors
        //const text = await response.text();
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

const App = () => {
    const [ map, setMap ] = useState();
    const [ aoiLayer, setAOILayer ] = useState();
    const [ parcelasRusticasLayer, setParcelasRusticasLayer ] = useState();
    const [ aoi, setAOI ] = useState();
    const [ parcelas, setParcelas ] = useState();

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
        const aoiSource =  new VectorSource({
            format: new GeoJSON(),
            url: (extent, resolution, proj) => 
                `${endpointCPNET}?SERVICE=WFS&version=1.1.0&request=GetFeature&typename=${cp_namespace}:${cp_layer}&outputFormat=application/json&srsname=${proj.code_}&bbox=${extent.join(',')},${proj.code_}`,
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
                zoom: 13,
            })
        });

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
        
    }, []);

    useEffect(() => {
        parcelas && aoiLayer.setSource(new VectorSource({ features: parcelas }));
    }, [parcelas]);

    useEffect(() => {
        aoi && writeCPAOI(aoi, map, aoiLayer);
    }, [aoi]);

    return (
        <>
            <div style={{ height:'100vh',width:'100%' }} ref={mapElement} className="map-container" />
            { mapRef && mapRef.current && <AOILoader map={ mapRef.current } mapElement={ mapElement.current } setAOI={setAOI} /> }
            { aoi && <AddParcelasToAOI aoi={aoi} setParcelas={setParcelas} /> }
        </>
    );
}
// split https://spatial-dev.guru/2021/09/05/split-a-polygon-by-line-in-openlayers/
// merge https://spatial-dev.guru/2021/09/05/merge-two-polygons-in-openlayers/
export default App;