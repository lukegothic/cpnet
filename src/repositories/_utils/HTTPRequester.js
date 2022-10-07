import axios from "axios";

/*
  options:
    url: ruta relativa desde el endpoint, string
    data: objeto JSON con datos a enviar
    headers: array de headers
*/

// TODO: validador de parametros/options
export const HTTPRequester = (() => {
  console.log(process.env.REACT_APP_MAINENDPOINT);
  const HTTPRequesterAPI = {
    get: ({ url, data, headers }) =>
      axios.get(`${process.env.REACT_APP_MAINENDPOINT}${url}?${new URLSearchParams(data).toString()}`, {
        headers
      }),

    download: ({ url, data, headers }) =>
      axios.get(`${process.env.REACT_APP_MAINENDPOINT}${url}?${new URLSearchParams(data).toString()}`, {
        responseType: "blob",
        headers
      }),

    post: ({ url, data, headers }) =>
      axios.post(`${process.env.REACT_APP_MAINENDPOINT}${url}`, data, {
        headers
      }),

    update: ({ url, data, headers }) =>
      axios.put(`${process.env.REACT_APP_MAINENDPOINT}${url}`, data, {
        headers
      }),

    delete: ({ url, data, headers }) =>
      axios.delete(`${process.env.REACT_APP_MAINENDPOINT}${url}`, {
        data,
        headers
      }),

    postWithFiles: ({ url, data, headers }) =>
      axios.post(`${process.env.REACT_APP_MAINENDPOINT}${url}`, data, {
        headers
      }),

    putWithFiles: ({ url, data, headers }) =>
      axios.put(`${process.env.REACT_APP_MAINENDPOINT}${url}`, data, {
        headers
      })
  };

  return HTTPRequesterAPI;
})();
