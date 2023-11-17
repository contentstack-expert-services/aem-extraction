require("dotenv").config();
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const sequence = require("when/sequence");
const config = require("./config.json");
const utils = require("./utils");

const exportPath = path.join(__dirname, "export", ...config.dir);

if (!fs.existsSync(exportPath)) mkdirp.sync(exportPath);

const createFile = async (route) => {
  await utils.sleep(1000);
  const res = await utils.makeApiCall({
    url: `${config.baseUrl}${config.dir
      .toString()
      .replace(/,/g, "/")}/${route}.infinity.json`,
    method: "GET",
    headers: utils.getAEMHeaders(),
  });
  const filePath = `${exportPath}/${route}.json`;
  utils.writeFile(filePath, res);
  console.info(`File created: ${filePath}`);
};

(async () => {
  await sequence(config.routes.map((route) => () => createFile(route)));
  console.info("Export activity is over now.");
})();
