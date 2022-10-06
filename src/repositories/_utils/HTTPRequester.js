import axios from "axios";

/*
  options:
    url: ruta relativa desde el endpoint, string
    data: objeto JSON con datos a enviar
    headers: array de headers
*/
const REACT_APP_BACKEND = "http://pmpwvdesgis01/CPNet_Alpha01/api/";

// TODO: validador de parametros/options
export const HTTPRequester = (() => {
  const HTTPRequesterAPI = {
    get: ({ url, data, headers }) =>
      axios.get(`${REACT_APP_BACKEND}${url}?${new URLSearchParams(data).toString()}`, {
        headers
      }),

    download: ({ url, data, headers }) =>
      axios.get(`${REACT_APP_BACKEND}${url}?${new URLSearchParams(data).toString()}`, {
        responseType: "blob",
        headers
      }),

    post: ({ url, data, headers }) =>
      axios.post(`${REACT_APP_BACKEND}${url}`, data, {
        headers
      }),

    update: ({ url, data, headers }) =>
      axios.put(`${REACT_APP_BACKEND}${url}`, data, {
        headers
      }),

    delete: ({ url, data, headers }) =>
      axios.delete(`${REACT_APP_BACKEND}${url}`, {
        data,
        headers
      }),

    postWithFiles: ({ url, data, headers }) =>
      axios.post(`${REACT_APP_BACKEND}${url}`, data, {
        headers
      }),

    putWithFiles: ({ url, data, headers }) =>
      axios.put(`${REACT_APP_BACKEND}${url}`, data, {
        headers
      })
  };

  return HTTPRequesterAPI;
})();
