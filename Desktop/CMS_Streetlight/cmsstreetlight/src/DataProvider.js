/* eslint-disable import/no-anonymous-default-export */
// in dataProvider.js
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import Interceptor from "./interceptor/interceptor";
import { JavascriptOutlined } from "@mui/icons-material";
// import urlMap from "./utils/urlEmdpointMap";

const apiUrl = "http://streetlight-backend.msdrms.in/api/v1/streetlight";

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
  return fetchUtils.fetchJson(url, options);
};

export default {
  getList: (resource, params) => {
    console.log(resource);
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { search } = params.filter;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      limit: JSON.stringify(perPage),
      page,
      search,
      // offset: JSON.stringify((page - 1) * perPage),
      // filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => {
      for (let i = 0; i < json.data.streetlight.length; i++) {
        json.data.streetlight[i]["id"] = json.data.streetlight[i]._id;
      }
      console.log(json);
      return {
        data:
          resource === "get-streetlight"
            ? Interceptor.process(resource, "list", json?.data?.streetlight)
            : Interceptor.process(resource, "list", json?.data?.rows),
        total: json?.data?.totalStreetLight,
      };
    });
  },
  // httpClient(`${apiUrl}/${resource}`, {
  //   method: "GET",
  //   body: JSON.stringify(params.data),
  // }).then(({ json }) => ({
  //   data: { ...params.data, id: json.id },
  // })),

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
          ? { ...params.data, masterUserId: params.data._id }
          : params.data
      ),
      // headers: new Headers({ 'x-auth-token': localStorage.getItem('token') }),
    }).then(({ json }) => ({
      data: (params.data, "_id", json.data),
    })),
  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, _id: json._id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params._id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),
};
