import axios from "axios";
import { isPlainObject } from "lodash";

/*
  options:
    url: ruta relativa desde el endpoint, string
    data: objeto JSON con datos a enviar
    headers: array de headers
*/

export class HTTPRequester {
  constructor({ url: baseURL, token = null, errorhandler = null } = {}) {
    if (!baseURL) {
      throw Error(
        "DEV: Por favor especifica valor de endpoint al instanciar la clase HTTPRequester"
      );
    }
    this.headers = {};
    this.token = token;
    this.axios = axios.create({ baseURL });
    errorhandler && this.axios.interceptors.response.use(response => response, errorhandler);
  }

  set token(value) {
    value && (this.headers = { ...this.headers, Authorization: `Bearer ${value}` });
  }

  get = async ({ url, data, headers } = {}) => {
    const resp = await this.axios.get(`${url}${data ? `?${new URLSearchParams(data).toString()}` : ""}`, {
      headers: { ...this.headers, headers }
    });
    console.log(resp);
    return resp && resp.data;
  };

  download = async ({ url, data, headers } = {}) =>
    url &&
    (!data || isPlainObject(data)) &&
    (await this.axios.get(`${url}${data ? `?${new URLSearchParams(data).toString()}` : ""}`, {
      responseType: "blob",
      headers: { ...this.headers, headers }
    }).data);

  post = async ({ url, data, headers } = {}) =>
    url &&
    isPlainObject(data) &&
    (await this.axios.post(`${url}`, data, {
      headers: { ...this.headers, headers }
    }).data);

  postWithFiles = async (params = {}) => this.post(params);

  update = async ({ url, data, headers } = {}) =>
    url &&
    isPlainObject(data) &&
    (await this.axios.put(`${url}`, data, {
      headers: { ...this.headers, headers }
    }).data);

  putWithFiles = async (params = {}) => await this.update(params);

  delete = async ({ url, data, headers } = {}) =>
    url &&
    (!data || isPlainObject(data)) &&
    (await this.axios.delete(`${url}`, {
      data,
      headers: { ...this.headers, headers }
    }).data);

  retry = async ({ request } = {}) => await this.axios.request(request);
}
