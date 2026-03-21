const axios = require("axios");

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  timeout: 5000,
});

module.exports = apiClient;