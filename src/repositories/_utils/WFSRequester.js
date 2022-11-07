import axios from "axios";
import { isPlainObject } from "lodash";
import { WFS_VERSION } from 'conf/Spatial';
import { WFS as WFSFormat, GeoJSON as GeoJSONFormat } from "ol/format";

/*
  options:
  // TODO: documentar parametros
*/

export class WFSRequester {
  constructor({ url, version = null } = {}) {
    if (!url) {
      throw new Error("DEV: Por favor especifica valor de endpoint al instanciar la clase WFSRequester");
    }
    this.url_ = url;
    this.version_ = version || WFS_VERSION;
    this.formatters_ = {
      WFS: new WFSFormat({ version: this.version_ }),
      GeoJSON: new GeoJSONFormat()
    };
    this.serializers_ = {
      XML: new XMLSerializer()
    };
    this.endpoint_ = `${this.url_}?SERVICE=WFS&VERSION=${this.version_}`;
  }

  getCapabilities = async () => true;

  // TODO: VALIDAR params
  getFeature = async ({
    featureNS = null,
    featurePrefix,
    featureTypes,
    filter = null,
    srsName,
    outputFormat = "application/json"
  } = {}) => {
    const readRequest = this.formatters_.WFS.writeGetFeature({
      featureNS,
      featurePrefix,
      featureTypes,
      filter,
      srsName,
      outputFormat
    });
    // TODO: usar axios.post
    const r = await fetch(this.endpoint_, {
      method: "POST",
      body: this.serializers_.XML.serializeToString(readRequest)
    });
    const rjson = await r.json();
    const features = this.formatters_.GeoJSON.readFeatures(rjson);
    return features;
  };

  transaction = async ({
    featureNS = null,
    featurePrefix,
    featureType,
    srsName,
    inserts = null,
    updates = null,
    deletes = null,
    outputFormat = "application/json"
  } = {}) => {
    const writeRequest = this.formatters_.WFS.writeTransaction(
      inserts && (Array.isArray(inserts) ? inserts : [inserts]),
      updates && (Array.isArray(updates) ? updates : [updates]),
      deletes && (Array.isArray(deletes) ? deletes : [deletes]),
      {
        featureNS,
        featurePrefix,
        featureType,
        srsName,
        outputFormat
      }
    );
    // TODO: usar axios.post
    const response = await fetch(this.endpoint_, {
      method: "POST",
      body: this.serializers_.XML.serializeToString(writeRequest)
    });
    return response;
  };
}
