import axios from "axios";

const http = axios.create ({
  baseURL: "https://api.hgbrasil.com/weather?format=json-cors&key=65c54c91&city_name="
});

export default http;