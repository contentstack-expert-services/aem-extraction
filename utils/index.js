const path = require("path");
const fs = require("fs");
const axios = require("axios");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const writeFile = (filePath, data) => {
  filePath = path.resolve(filePath);
  data = typeof data == "object" ? JSON.stringify(data) : data || "{}";
  fs.writeFileSync(filePath, data, "utf8");
};

const makeApiCall = async ({ url, method, headers }) => {
  try {
    const res = await axios({
      url,
      method,
      headers,
    });

    return res?.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getAEMHeaders = () => ({
  Accept: "application/json",
  "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  "Cache-Control": "no-cache",
  authority: process.env.AUTHORITY,
  Cookie: process.env.COOKIE,
});

module.exports = {
  sleep,
  writeFile,
  makeApiCall,
  getAEMHeaders,
};
