import axios from "axios";

/*
  options:
    url: ruta relativa desde el endpoint, string
    data: objeto JSON con datos a enviar
    headers: array de headers
*/

// TODO: validador de parametros/options
export class HTTPRequester {
  constructor({ url }) {
    this.endpoint = url;
  }
  get = ({ url, data, headers }) =>
    axios.get(`${this.endpoint}${url}?${new URLSearchParams(data).toString()}`, {
      headers
    });
  download = ({ url, data, headers }) =>
    axios.get(`${this.endpoint}${url}?${new URLSearchParams(data).toString()}`, {
      responseType: "blob",
      headers
    });

  post = ({ url, data, headers }) =>
    axios.post(`${this.endpoint}${url}`, data, {
      headers
    });

  update = ({ url, data, headers }) =>
    axios.put(`${this.endpoint}${url}`, data, {
      headers
    });

  delete = ({ url, data, headers }) =>
    axios.delete(`${this.endpoint}${url}`, {
      data,
      headers
    });

  postWithFiles = ({ url, data, headers }) =>
    axios.post(`${this.endpoint}${url}`, data, {
      headers
    });

  putWithFiles = ({ url, data, headers }) =>
    axios.put(`${this.endpoint}${url}`, data, {
      headers
    });
}
