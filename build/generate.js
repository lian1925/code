// 引入库文件
const { parser } = require("parsemarkdown");

// 定义输入与输出目录
let inputDir = "./post/**/*.md";
let outputDir = "./src/public/generate";

// 执行解析
parser(inputDir, outputDir);
