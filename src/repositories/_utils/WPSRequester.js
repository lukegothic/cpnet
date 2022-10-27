import axios from "axios";
import { isPlainObject, range } from "lodash";
import { WPS_VERSION } from "conf/Spatial";

/*
  options:
  // TODO: documentar parametros
  // TODO: pasar de fetch a axios
*/
// TODO: ESTO ES MAS UNA CLASE UTILS QUE OTRA COSA
export class WPSRequester {
  constructor({ url, version = null } = {}) {
    if (!url) {
      throw new Error("url is mandatory");
    }
    this.url_ = url;
    this.version_ = version || WPS_VERSION;
    this.formatters_ = {
      gml: new GML(),
      geojson: new GeoJSON() // GEOSERVER ACTUALMENTE NO SE PORTA BIEN CON INPUT DE TIPO GEOJSON
    };
    this.endpoint_ = `${this.url_}?SERVICE=WPS&VERSION=${this.version_}`;
  }

  getCapabilities = async () => true;

  describeProcess = async () => true;

  execute = async ({
    op,
    inputs,
    inputFormat = "text/xml; subtype=gml/3.1.1",
    output = "result",
    outputFormat = "application/json"
  } = {}) => {
    if (op && inputs) {
      if (!Array.isArray(inputs)) {
        inputs = [inputs];
      }
      const r = await fetch(`${this.endpoint_}&request=Execute`, {
        method: "POST",
        headers: { "Content-Type": inputFormat },
        body: `<?xml version="1.0" encoding="UTF-8"?>
          <wps:Execute version="${
            this.version_
          }" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
              <ows:Identifier>${op}</ows:Identifier>
              <wps:DataInputs>
                  ${range(inputs.length).map(
                    i =>
                      `<wps:Input>
                          <ows:Identifier>${inputs[i].identifier}</ows:Identifier>
                          <wps:Data>
                              <wps:ComplexData mimeType="${inputFormat}">${this.formatters_.gml.writeGeometry(
                        inputs[i].geometry
                      )}</wps:ComplexData>
                          </wps:Data>
                      </wps:Input>`
                  )}
              </wps:DataInputs>
              <wps:ResponseForm>
                  <wps:RawDataOutput mimeType="${outputFormat}">
                  <ows:Identifier>${output}</ows:Identifier>
                  </wps:RawDataOutput>
              </wps:ResponseForm>
          </wps:Execute>`
      });
      const jsonr = await r.json();
      return this.formatters_.geojson.readGeometry(jsonr);
    } else {
      console.log("Invalid parameters");
    }
  };

  dismiss = ({ url, data, headers } = {}) => true;
}
