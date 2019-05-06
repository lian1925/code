const parser = require("parsemarkdown").default;

let inputDir = "./post/**/*.md";
let outputDir = "./src/public/generate";
parser(inputDir, outputDir);
// console.log("parser", parser);
