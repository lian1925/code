---
title: JavaScript正则表达字典
createAt: 2019-05-25 11:58:18
updateAt: 2019-05-25 11:58:18
tags:
category:
author:
---

# JavaScript 正则表达字典

### 测试正则表达式

- 使用.test()方法

```
let testString = "My test string";
let testRegex = /string/;
testRegex.test(testString);
```

<!-- more -->

- 测试多项匹配使用 OR 运算符(|)

```
let testString = "My test string";
const regex = /test|My|string/;
regex.test(testString);
```

- 使用(i)忽略大小写

```
let testString = "My test string";
const ignoreReg = /my/i;
ignoreReg.test(testString);
```

### 获取匹配到的内容

- 获取第一个匹配

```
const match = "My test string".match(/test/i);
```

- 获取所有匹配使用(g)

```
const match = "My test string,My regex will be better!".match(/my/ig);
```

- 使用通配符(.)作为任何字符的占位符

```
const regexWithWildcard = /.at/gi;
const testString = "cat BAT cupcake AT mat dog";
const allMatchingWords = testString.match(regexWithWildcard);
//["cat", "BAT", " AT", "mat"]
```

- 匹配具有多种可能性的单个字符，把它们放在([])中

```
const regexWithCharClass = /[cfm]at/g;
const testString = "cat fat bat mat";
const allMatchingWords = testString.match(regexWithCharClass);
//["cat", "fat", "mat"]
```

- 匹配字母使用字符集范围[a-z]

```
var regexWithCharRange = /[a-e]at/;
var catString = "cat";
var batString = "bat";
var fatString = "fat";
var cStr = catString.match(regexWithCharRange)
//["cat"]
var fStr = fatString.match(regexWithCharRange)
//null
```

- 匹配特定字符和字母

```
var str = "hello, i am meteor, i am 12years old";
var regex = /[0-9a-z]/ig;
var rStr = regex.test(str);
```

- 匹配单个未知字符，使用符号(^)

```
const regex = /[^aeiou]/gi;
var str = "how a beatuiful day it is!";
var match = str.match(regex);
//["h", "w", " ", " ", "b", "t", "f", "l", " ", "d", "y", " ", "t", " ", "s", "!"]
```

- 匹配连续出现 1 次或多次的字符，使用符号(+)

```
var regL = /l+/gi;
var regH = /h+/gi;
var str = "hello!how are you?";
var r1 = str.match(regL)    //["ll"]
var r2 = str.match(regH)    //["h", "h"]
```

- 匹配连续出现 0 次或多次的字符，使用符号(\*)

```
var regex = /hi*/gi;
var normalHi = "Hi";
var happyHi = "hiiiiii";
var twoHi = "hiihii";
var normalResult = normalHi.match(regex);   //["Hi"]
var happyResult = happyHi.match(regex);     //["hiiiiii"]
var twoResult = twoHi.match(regex);         //["hii", "hii"]
```

- 惰性匹配，使用符号(?)

```
var str = "catastrophe";
var regex = /c[a-z]*t/;
var regexLazy = /c[a-z]*?t/;
var result = str.match(regex)           //["catast"]
var resultLazy = str.match(regexLazy)   //["cat"]
```

- 匹配起始字符串，使用符号(^)

```
var str1 = "how are you";
var str2 = "you are welcome";
var regex = /^you/ig;
var r1 = str1.match(regex)      //null
var r2 = str2.match(regex)      //["you"]
```

- 匹配结束字符串，使用符号(\$)

```
var str1 = "how are you";
var str2 = "you are welcome";
var regex = /you$/ig;
var r1 = str1.match(regex)      //["you"]
var r2 = str2.match(regex)      //null
```

- 匹配所有字母和数字，使用符号 word(\w)

```
var shortHand = /\w+/
var numbers = "0123456789";
var str = "abcdefghijklmn";
var rS = numbers.match(shortHand);  //"0123456789"
var rN = str.match(shortHand);      //"abcdefghijklmn"
```

- 匹配除了字母和数字的所有内容,使用符号(\W)

```
var word = "123qwe";
var noWord = "!@#@#%#$";
var regex = /\W+/;
var rw = word.match(regex);         //null
var rwN = noWord.match(regex);      //["!@#@#%#$"]
```

- 匹配所有数字，使用符号 digest(\d)

```
var str = "i am 23 years old";
var regex = /\d+/;
var result = str.match(regex)       //["23"]
```

- 匹配所有非数字，使用符号(\D)

```
var str = "i am 23 years old";
var regex = /\D+/;
var result = str.match(regex)       //["i am "]
```

- 匹配空格，使用符号(\s)

```
var str = "How are you?";
var regex = /\s+/g;
var result = str.match(regex)       //[" ", " "]
```

- 匹配非空格，使用符号(\S)

```
var str = "How are you?";
var regex = /\S+/g;
var result = str.match(regex);      //["How", "are", "you?"]
```

- 匹配字符数，匹配字符串中特定的字符数，使用符号({}) {lowerBound, upperBound}

```
var regularHi = "hi";
var mediocreHi = "hiii";
var superExcitedHey = "heeeeyyyyy!!!";
var excitedRegex = /hi{1,4}/;
var resultRegular = regularHi.match(excitedRegex);      // ["hi"]
var resultMediocre = mediocreHi.match(excitedRegex);    // ["hiii"]
var resultSuper = superExcitedHey.match(excitedRegex);  // null
```

- 匹配至少字符数，使用({}) {lowerBound,}

```
var regularHi = "hi";
var mediocreHi = "hiii";
var superExcitedHey = "heeeeyyyyy!!!";
var excitedRegex = /hi{1,}/;

var resultRegular = regularHi.match(excitedRegex);      // ["hi"]
var resultMediocre = mediocreHi.match(excitedRegex);    // ["hiii"]
var resultSuper = superExcitedHey.match(excitedRegex);  // null
```

- 匹配确切字符数，使用({}) {requiredCount}

```
const regularHi = "hi";
const bestHi = "hii";
const mediocreHi = "hiii";
const excitedRegex = /hi{2}/;

excitedRegex.test(regularHi); // false
excitedRegex.test(bestHi); // true
excitedRegex.test(mediocreHi); //false
```
