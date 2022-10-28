import { HTTPRequester } from "./HTTPRequester";
//const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2MTU5QzAwNjc2NkIyMTkzMzYzMTJCNkIxMEJERUU0IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L2RpczQvaWRlbnRpdHkiLCJuYmYiOjE2NjY5NDg0NjQsImlhdCI6MTY2Njk0ODQ2NCwiZXhwIjoxNjY2OTUyMDY0LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwicm9sZXMiXSwiYW1yIjpbInB3ZCJdLCJjbGllbnRfaWQiOiJjcG5ldF9jb3JlIiwic3ViIjoiYWJjZDliZTgtMGE2Ni00ODgzLTg2ZjQtMjI0NDJhNTg2MjFlIiwiYXV0aF90aW1lIjoxNjY2OTQ4NDY0LCJpZHAiOiJsb2NhbCJ9.IQmqWek56AU7n8xHFUr5HxH84jADciSXyc-5SUO6wxmGpEV4nscwfwpIwMGUR8EjwjBiVOhVroZUi4DIciqc-BzNSZo2-3-jMWWEPzN_JPCmY1cIjVk8SC4LEnpoaGRopvZ8FTMFxn6p1sYLry4QLUJrc79AwSCn-PLsAooUyfn7VyXDmg6rHosvKO9KavOap45VtPkGjDz-Z-MPn361cQMSqI5OqtJH4f4_BHzC-CAAKOXAk_XjfyN4YgcmGDWD6dehS0V7CSe34EN7qS06v2yf4F0H_I-YpoVNdn1JOjR4wbzo9v8eKnfJSNEfdqc9mW6faXyHe7VUkoIo8LiCuw";
export const PokeApiRequester = new HTTPRequester({ url: process.env.REACT_APP_POKEAPI, errorhandler: async error => {
  //console.error(error, PokeApiRequester);
  const request = { ...error.config, url: "https://pokeapi.co/api/v2/pokemon/ditto" }
  return {};//await PokeApiRequester.retry({ request });
}});

/*

Axios.interceptors.response.use(response => response, error => {
    const status = error.response ? error.response.status : null

    if (status === 401) {

        return refreshToken(store).then(_ => {
            error.config.headers['Authorization'] = 'Bearer ' + store.state.auth.token;
            error.config.baseURL = undefined;
            return Axios.request(error.config);
        });
    }

    return Promise.reject(error);
});

*/
