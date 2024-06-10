const path = require("path");
const fs = require("fs");
const axios = require("axios");
const fileFormat = ".infinity.json";

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

const getFiles = (routes, treePath = "") =>
  routes.map((route) => {
    let str = "";

    if (
      !(route?.folder && typeof route?.folder === "string") ||
      !(route?.files || route?.children)
    )
      return "";

    if (route?.files) {
      if (typeof route?.files !== "object" || !route?.files?.length) str += "";
      else
        str += route?.files
          ?.map((r) => `${treePath}${route?.folder}/${r}${fileFormat}`)
          .toString();
    }

    if (route?.children) {
      if (typeof route?.children !== "object" || !route?.children?.length)
        str += "";
      else {
        str += route?.files && route?.files?.length ? "," : "";
        str += getFiles(route?.children, `${treePath}${route?.folder}/`);
      }
    }

    return str;
  });


module.exports = {
  sleep,
  writeFile,
  makeApiCall,
  getAEMHeaders,
  getFiles,
};
