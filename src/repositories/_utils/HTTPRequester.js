import axios from "axios";

/*
  options:
    url: ruta relativa desde el endpoint, string
    data: objeto JSON con datos a enviar
    headers: array de headers
*/

export class HTTPRequester {
  constructor({ url } = {}) {
    if (!url) {
      throw Error("DEV: Por favor especifica valor de endpoint al instanciar la clase HTTPRequester");
    }
    this.endpoint = url;
  }
  get = ({ url, data, headers }) =>
    url &&
    axios.get(`${this.endpoint}${url}${data ? "?" : ""}${new URLSearchParams(data).toString()}`, {
      headers
    });
  download = ({ url, data, headers }) =>
    url &&
    axios.get(`${this.endpoint}${url}${data ? "?" : ""}${new URLSearchParams(data).toString()}`, {
      responseType: "blob",
      headers
    });

  post = ({ url, data, headers }) =>
    url &&
    data &&
    axios.post(`${this.endpoint}${url}`, data, {
      headers
    });

  update = ({ url, data, headers }) =>
    url &&
    data &&
    axios.put(`${this.endpoint}${url}`, data, {
      headers
    });

  delete = ({ url, data, headers }) =>
    url &&
    axios.delete(`${this.endpoint}${url}`, {
      data,
      headers
    });

  postWithFiles = ({ url, data, headers }) =>
    url &&
    data &&
    axios.post(`${this.endpoint}${url}`, data, {
      headers
    });

  putWithFiles = ({ url, data, headers }) =>
    url &&
    data &&
    axios.put(`${this.endpoint}${url}`, data, {
      headers
    });
}
