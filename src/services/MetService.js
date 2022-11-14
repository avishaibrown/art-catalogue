import axios from "axios";

const https = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1/",
  timeout: 5000,
});

const get = (objectID) => {
  return https.get(`/objects/${objectID}`);
};

const findByTerm = (term) => {
  return https.get(`/search?q=${term}&hasImages=true`);
};

const MetService = {
  get,
  findByTerm,
};

export default MetService;
