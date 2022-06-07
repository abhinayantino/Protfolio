/* eslint-disable import/no-anonymous-default-export */
// in dataProvider.js
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import Interceptor from "./interceptor/interceptor";
// import urlMap from "./utils/urlEmdpointMap";

const apiUrl = "http://127.0.0.1:6000/api/v1";
// let token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjRkMTg2LWI2ZGItNGU3ZC1hNTQ5LTVmMDU4MTExYjZiNCIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTY1Mjg1ODgzMCwiZXhwIjoxNjU1NDUwODMwfQ.Uw3tjZvjUAkS8Cb2jcHXHDX05tF-8f2ZvP42GZ5NU-k";

//master-token -eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzMzczNTY3LTJkMTUtNDg0NS1iOTdhLTAzMmY4MTQxYWE4YiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTY1Mjc2NjIzOSwiZXhwIjoxNjU1MzU4MjM5fQ.04lFdj6LombNT8-JdmvFBpd_iSxpivrvEYAiOTxg3SU
//user-token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkNGZhYWM5LTQ0ZjMtNDNhZS05ZTc0LTY3NzQ3NzU5ZTA0OSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjUwNTE1MDE5LCJleHAiOjE2NTMxMDcwMTl9.XKcDXryNfIq3jUeaxjlxowmoBfZac4srHc06-YuSzFM
//admin-token- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjRkMTg2LWI2ZGItNGU3ZC1hNTQ5LTVmMDU4MTExYjZiNCIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTY1Mjg1ODgzMCwiZXhwIjoxNjU1NDUwODMwfQ.Uw3tjZvjUAkS8Cb2jcHXHDX05tF-8f2ZvP42GZ5NU-k

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  // add your own headers here
  // const token = localStorage.getItem("token");
  // // options.headers.set("Authorization", `Bearer ${token}`);
  // // return fetchUtils.fetchJson(url, options);
  // options.headers.set("x-auth-token", token);
  // options.headers.set("Authorization", `Bearer ${token}`);
  // return fetchUtils.fetchJson(url, options);
};

export default {
  getList: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "GET",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  // getOne: (resource, params) => {
  //   return httpClient(`${apiUrl}/${urlMap(resource, "GET")}/${params.id}`).then(
  //     ({ json }) => {
  //       return {
  //         data: Interceptor.process(
  //           resource,
  //           "id",
  //           resource === "master-users"
  //             ? json.data
  //             : resource === "flats/admin"
  //             ? json.data.flat
  //             : json.data
  //         ),
  //       };
  //     }
  //   );
  // },
  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${resource}`, {
      method: "PATCH",
      body: JSON.stringify(
        resource === "master-users"
          ? { ...params.data, masterUserId: params.data.id }
          : params.data
      ),
      // headers: new Headers({ 'x-auth-token': localStorage.getItem('token') }),
    }).then(({ json }) => ({
      data: (params.data, "id", json.data),
    })),
  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),
};
