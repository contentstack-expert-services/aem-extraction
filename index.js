require("dotenv").config();
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const sequence = require("when/sequence");
const config = require("./config.json");
const utils = require("./utils");
const routes = require("./config.json").routes;

const createFile = async (file) => {
  await utils.sleep(1000);
  const res = await utils.makeApiCall({
    url: `${config.baseUrl}${file}`,
    method: "GET",
    headers: utils.getAEMHeaders(),
  });

  const pathDir = file.split("/");
  const fileName = pathDir.pop();
  const exportPath = path.join(__dirname, "export", ...pathDir);
  if (!fs.existsSync(exportPath)) mkdirp.sync(exportPath);
  const filePath = `${exportPath}/${fileName}`;
  utils.writeFile(filePath, res);
  console.info(`File created: ${filePath}`);
};

(async () => {
  await sequence(
    utils
      .getFiles(routes)
      .toString()
      .split(",")
      .map((route) => () => createFile(route))
  );
  console.info("Export activity is over now.");
})();
