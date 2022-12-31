import axios from "axios";
import { apiBaseUrl, token } from "../../constance/service";
const client = axios.create({
  baseURL: apiBaseUrl,
});

client.interceptors.request.use((config) => {
  const { params } = config;
  config.params = { ...params, api_key: token };
  return config;
});

export { client };
