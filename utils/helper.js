/**
 * External module Dependencies.
 */
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

/**
 * Internal module Dependencies.
 */

// for checking XML file
exports.readXMLFile = function (filePath) {
  var data;
  if (fs.existsSync(filePath)) data = fs.readFileSync(filePath, "utf-8");

  return data;
};

exports.readFile = function (filePath, parse) {
  parse = typeof parse == "undefined" ? true : parse;
  filePath = path.resolve(filePath);
  var data;
  if (fs.existsSync(filePath))
    data = parse ? JSON.parse(fs.readFileSync(filePath, "utf-8")) : data;
  return data;
};

exports.writeFile = function (filePath, data) {
  filePath = path.resolve(filePath);
  data = typeof data == "object" ? JSON.stringify(data) : data || "{}";
  fs.writeFileSync(`${filePath}.json`, data, "utf-8");
};

exports.appendFile = function (filePath, data) {
  filePath = path.resolve(filePath);
  fs.appendFileSync(filePath, data);
};

exports.makeDirectory = function () {
  for (var key in arguments) {
    var dirname = path.resolve(arguments[key]);
    if (!fs.existsSync(dirname)) mkdirp.sync(dirname);
  }
};

exports.flattenJSON = function (ob, delimiter = '.') {
    let result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (let i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop ? prop + delimiter + i : "" + i);
            if (l == 0)
                result[prop] = [];
        } else {
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + delimiter + p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }

    recurse(ob, "");
    return result;
}