import { WFS_VERSION } from '../../constants';
import { WFS as WFSFormat, GeoJSON as GeoJSONFormat } from 'ol/format';

class WFS {
    constructor(opt_options = {}) {
        if (!opt_options.url) {
            throw new Error('url is mandatory');
        }
        this.url_ = opt_options.url;
        this.version_ = opt_options.version || WFS_VERSION;
        this.formatters_ = {
            WFS: new WFSFormat({ version: this.version_ }),
            GeoJSON: new GeoJSONFormat()
        };
        this.serializers_ = {
            XML: new XMLSerializer()
        };
        this.endpoint_ = `${this.url_}?SERVICE=WFS&VERSION=${this.version_}`
    }
    GetCapabilities() {

    }
    // atencion, sin filtro trae todas las features
    async GetFeature({ featureNS = null, featurePrefix, featureTypes, filter = null, srsName }) {
        const readRequest = this.formatters_.WFS.writeGetFeature({
            featureNS,
            featurePrefix,
            featureTypes,
            filter,
            srsName,
            outputFormat: 'application/json'
        });
        const r = await fetch(this.endpoint_, {
            method: 'POST',
            body: this.serializers_.XML.serializeToString(readRequest),
        });
        const rjson = await r.json();
        const features = this.formatters_.GeoJSON.readFeatures(rjson);
        return features;
    }
    async Transaction({ featureNS = null, featurePrefix, featureType, srsName, inserts = null, updates = null, deletes = null }) {
        const writeRequest = this.formatters_.WFS.writeTransaction(
            inserts && (Array.isArray(inserts) ? inserts : [inserts]),
            updates && (Array.isArray(updates) ? updates : [updates]),
            deletes && (Array.isArray(deletes) ? deletes : [deletes]),
            {
                featureNS,
                featurePrefix,
                featureType,
                srsName,
                outputFormat: 'application/json',
            }
        );
        const response = await fetch(this.endpoint_, {
            method: 'POST',
            body: this.serializers_.XML.serializeToString(writeRequest),
        });
        return response;
    }
}
export default WFS;