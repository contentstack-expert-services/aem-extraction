const read = require("fs-readdir-recursive");
const helper = require("./helper");
const path = require("path");

function flattenObject(ob, delimiter = ".") {
  let result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (let i = 0; i < cur.length; i++) {
        recurse(cur[i], prop ? prop + delimiter + i : "" + i);
      }
      if (cur.length === 0) {
        result[prop] = [];
      }
    } else {
      let isEmpty = true;
      for (let p in cur) {
        if (cur.hasOwnProperty(p)) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + delimiter + p : p);
        }
      }
      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  }

  recurse(ob, "");
  return result;
}

const loc = path.resolve(process.cwd(),"export");
console.log(loc)

const datafiles = read(loc).filter((el) => el.includes(".backcountry.json"));

datafiles.forEach((el) => {
  const data = helper.readFile(path.join(loc, el));
  helper.writeFile(path.join(loc, el).replace(".json",""), JSON.stringify(flattenObject(data)));
});
