
import yaml from "js-yaml";
import { readFileSync } from "fs";
import path from "path";
let config = {};
const __dirname = path.resolve(path.dirname(''));
try {
    let configLoad = readFileSync(path.join(__dirname, 'server/config/config.yml'));
    config = yaml.load(configLoad);
}
catch (execption) {
    console.log(execption.message)
}

export { __dirname, config }