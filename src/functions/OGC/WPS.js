class WPS {
    constructor(opt_options = {}) {
        this.url_ = opt_options.url || "http://hvwserver2019:8080/geoserver/ows?service=wps";
        this.version_ = opt_options.version || "1.0.0";
    }
    GetCapabilities() {

    }
    DescribeProcess() {

    }
    async Execute({ op = "JTS:boundary", data = '<gml:Polygon xmlns:gml="http://www.opengis.net/gml" xmlns:sch="http://www.ascc.net/xml/schematron" xmlns:xlink="http://www.w3.org/1999/xlink"><gml:exterior><gml:LinearRing><gml:posList>10.0 0.0 0.0 -10.0 -10.0 0.0 0.0 10.0 10.0 0.0</gml:posList></gml:LinearRing></gml:exterior></gml:Polygon>'}) {
        const r = await fetch(`${this.url_}&version=${this.version_}&request=Execute`, { method: "POST", headers: { "Content-Type": "text/xml; subtype=gml/3.1.1" }, body: 
        `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
            <ows:Identifier>${op}</ows:Identifier>
            <wps:DataInputs>
                <wps:Input>
                <ows:Identifier>geom</ows:Identifier>
                <wps:Data>
                    <wps:ComplexData mimeType="text/xml; subtype=gml/3.1.1">
                        ${data}
                    </wps:ComplexData>
                </wps:Data>
                </wps:Input>
            </wps:DataInputs>
            <wps:ResponseForm>
                <wps:RawDataOutput mimeType="application/json">
                <ows:Identifier>result</ows:Identifier>
                </wps:RawDataOutput>
            </wps:ResponseForm>
        </wps:Execute>` });
        return await r.json();
    }
    Dismiss() {
    }
}
export default WPS;