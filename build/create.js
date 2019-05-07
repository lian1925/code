// 引入库文件
const { createMardownFile } = require("parsemarkdown");

// 获取命令行参数
let argv = process.argv.slice(2);
let [title, dir] = argv;

// 创建文件
createMardownFile(title, dir);
