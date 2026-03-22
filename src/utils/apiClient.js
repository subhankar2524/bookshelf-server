const axios = require("axios");

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  timeout: 5000,
  params: {
    key: process.env.BOOKS_API_KEY,
  },
});

module.exports = apiClient;