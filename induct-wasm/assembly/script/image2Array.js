import fs from "fs";
import { PNG } from "pngjs";
// const PNG = require("pngjs").PNG;
// const filename = process.argv[2] || "./sky.png";
const targetDir = "../assets/";
const sourceDir = "../images/";
console.log('cur', process.cwd());
// resolve()
// __dirname

const imagesDir = fs.readdirSync(sourceDir);
imagesDir.forEach((fileName) => {
  console.log(fileName);
  let name = fileName.slice(0, fileName.lastIndexOf("."));
  generateTsFile(name, sourceDir + fileName);
});

function generateTsFile(filename, filePath) {
  const file = fs.readFileSync(filePath);
  const png = PNG.sync.read(file);

  const data = png.data;
  console.log("png:", png);
  const width = png.width;
  const height = png.height;

  const colorArray = [];
  for (let i = 0, l = data.length; i < l; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    colorArray.push(`${r}, ${g}, ${b}, ${a}`);
  }
  let dataStr = `const image: u8[] = [${colorArray.join(
    ","
  )}];\nexport default image;`;
  fs.writeFileSync(`${targetDir}${filename}.ts`, dataStr);
}
// process.stdout.write("const image: u8[] = [");
// process.stdout.write(`${r}, ${g}, ${b}, ${a}, `);
// process.stdout.write("];\n");
// process.stdout.write("export default image;\n");
