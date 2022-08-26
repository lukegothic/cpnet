import { range } from '../utils/utils';
class WPS {
    constructor(opt_options = {}) {
        this.url_ = opt_options.url || "http://hvwserver2019:8080/geoserver/ows?service=wps";
        this.version_ = opt_options.version || "1.0.0";
    }
    GetCapabilities() {

    }
    DescribeProcess() {

    }
    async Execute({ op, inputs, inputFormat = "application/json", output = "result", outputFormat = "application/json" }) {
        if (op && inputs) {
            if (!Array.isArray(inputs)) {
                inputs = [inputs];
            } 
            const r = await fetch(`${this.url_}&version=${this.version_}&request=Execute`, { method: "POST", headers: { "Content-Type": inputFormat }, body: 
            `<?xml version="1.0" encoding="UTF-8"?>
                <wps:Execute version="${this.version_}" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
                    <ows:Identifier>${op}</ows:Identifier>
                    <wps:DataInputs>
                        ${range(inputs.length).map(i => 
                            `<wps:Input>
                                <ows:Identifier>${inputs[i].identifier}</ows:Identifier>
                                <wps:Data>
                                    <wps:ComplexData mimeType="${inputFormat}">${inputs[i].geometry}</wps:ComplexData>
                                </wps:Data>
                            </wps:Input>`
                        )}
                    </wps:DataInputs>
                    <wps:ResponseForm>
                        <wps:RawDataOutput mimeType="${outputFormat}">
                        <ows:Identifier>${output}</ows:Identifier>
                        </wps:RawDataOutput>
                    </wps:ResponseForm>
                </wps:Execute>` });
            return await r.json();
                        // TODO: read geometry as feature
        } else {
            console.log("Invalid parameters");
        }
    }
    Dismiss() {
    }
}
export default WPS;