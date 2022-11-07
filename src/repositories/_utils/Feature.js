import { EPSG_NAME } from "conf/Spatial";

// permite realizar operaciones CRUD sobre una entidad con dato geografico a través de WFS
// el parametro url es opcional porque puede haber varios endpoint wfs
export class Feature {
  constructor({ wfs /* : WFSRequester */, namespace, prefix, type } = {}) {
    // TODO: ver cuales son parametros obligatorios de verdad... featureNS por ejemplo no lo veo necesario
    if (!url) {
      throw new Error("url is required");
    }
    if (!namespace) {
      throw new Error("featureNS is required");
    }
    if (!prefix) {
      throw new Error("featurePrefix is required");
    }
    if (!type) {
      throw new Error("featureType is required");
    }
    this.wfs = wfs;
    this.featureNS = namespace;
    this.featurePrefix = prefix;
    this.featureType = type;
  }

  // TODO: filter deberia ser tipo de filtro + dato geografico // alfanumerico
  // featureType
  get = async ({ filter = null, srsName = EPSG_NAME } = {}) => {
    return await this.wfs.getFeature({
      featureNS: this.featureNS,
      featurePrefix: this.featurePrefix,
      featureType: this.featureType,
      filter,
      srsName
    });
  };

  transaction = async ({
    inserts = null,
    updates = null,
    deletes = null,
    srsName = EPSG_NAME
  } = {}) => {
    if (!inserts && !updates && !deletes) {
      throw new Error("feature or features are required for transaction operation");
    }
    return await this.wfs.transaction({
      featureNS: this.featureNS,
      featurePrefix: this.featurePrefix,
      featureType: this.featureType,
      inserts,
      updates,
      deletes,
      srsName
    });
  };

  insert = async ({ features, srsName } = {}) =>
    await this.transaction({ inserts: features, srsName });

  update = async ({ features, srsName } = {}) =>
    await this.transaction({ updates: features, srsName });

  delete = async ({ features, srsName } = {}) =>
    await this.transaction({ deletes: features, srsName });
}
