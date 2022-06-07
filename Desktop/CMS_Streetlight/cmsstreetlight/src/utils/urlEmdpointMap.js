const urlMap = (url, method) => {
  let resource;
  switch (url + " " + method) {
    case "master-users GET":
      resource = "master-users/admin";
      break;
    case "master-users DEL":
      resource = "master-users/deny";
      break;
    case "flats/admin PATCH":
      resource = "flats";
      break;

    default:
      resource = url;
      break;
  }
  return resource;
};

export default urlMap;
