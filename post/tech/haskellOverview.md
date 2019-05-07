---
title: Haskell 语言总览
createAt: 2019-05-07 21:08:00
updateAt: 2019-05-07 21:08:00
tags:
category:
author:
---

## Haskell 语言总览

命令式编程：a = 5 ; => a = 7;

函数式编程：  
例子: 阶乘，指从 1 到某个数的乘积。  
一个串列中数字的和，指把第一个数字和剩余的数字的和相加。

<!-- more -->

## 语法

```hs
<!-- 运算 -->
2 + 5
49 * 100
1892-1472
5/2

<!-- 优先级 -->
(50-100)*50

<!-- 布尔 -->
True
False
&&
||
not

<!-- 相等性 -->
5 == 5
'hello' /= 'hi'

<!-- 中缀函数 -->
1 + 2

<!-- 前缀函数 -->
succ 8
max 100 101

<!-- 函数调用拥有最高优先级 -->
succ 9 + max 5 4 + 1

<!-- 等效于 -->
(succ 9) + (max 5 4) + 1

<!-- 自定义函数 -->
1、新建文件，取名为baby.ts，填写代码：
doubleMe x = x + x

2、打开ghci，运行 :l baby.hs
输入 doubleMe 9

<!-- 组合 -->
doubleMe x = x + x
doubleUs x y = doubleMe x + doubleMe y
注意，doubleUs 和 doubleMe 不分顺序

<!-- 基本类型 list -->
let numbers = [4,8,15]
合并
[1,2] + [3,5] => [1,2,3,5]
获取元素:!!
[1,2,3] !! 1 => 2
嵌套
let b = [[1,2],[3,5]]
比较，从第一个元素开始，以此类推: >
[3,2,1] > [2,2,1]

获取首元素： head
head [1,3,5] => 1

获取除头部之后的部分 : tail
tail [5,4,3,2,1] => [4,3,2,1]

获取最后一个元素 : last
last [1,2,3] => 3

获取除最后一个元素之外的部分 : init
init [1,2,3] => [1,2]

返回长度: length
length [1,2] => 2

判断是否为空: null
null [1] => False

反转: reverse
reverse [1,2,3] => [3,2,1]

获取前几个元素: take
take 2 [1,2,3] => [1,2]

删除前几个元素: drop
drop 2 [1,2,3] => [3]

获取最大元素: maximum
maximum [1,2,3] => 3

获取最小元素: minimum
minimum [1,2,3] => 1

获取元素之和: sum
sum [1,2,3] => 6

获取元素之积: product
product [1,2,3] => 6

判断元素是否存在： elem
1 `elem` [1,2,3] => True

<!-- range -->
[1..5] => [1,2,3,4,5]
[1,3..9] => [1,3,5,7,9]

重复list: cycle
take 3 (cycle [1,2]) => [1,2,3]

重复单个元素： repeat
take 3 (repeat 5) => [5,5,5]

指定重复次数: replicate
replicate 3 10 => [10,10,10]

<!-- comprehension -->
[ x*2 | x <- [1..3]>] => [2,4,6]

条件
[ x | x <- [50..100], x `mod` 7 == 3] => [52,59,66,73,80,87,94]

<!-- Tuple -->
(8,'one')

返回序对的首项： fst
fst (8,10) => 8

返回序对的尾项： snd
snd (8,11) => 11

交叉配对： zip
zip [1,2] [3,3] => [(1,3),(2,3)]

<!-- 类型推导 -->
当你写下一个数字，Haskell能自己推断出它的类型

检查类型： :t
:t 'a' => Char

<!-- 类型声明 -->
编写函数时，给它一个明确的类型声明是个好习惯
removeNonUppercase :: [Char] -> [Char]
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]

常见类型
int 有界整数。对 32 位的机器而言，上限一般是 2147483647，下限是 -2147483648。

Integer,无界整数，效率不如Int高。
factorial :: Integer -> Integer
factorial n = product [1..n]

Float 表示单精度的浮点数。
circumference :: Float -> Float
circumference r = 2 * pi * r

Double 表示双精度的浮点数。
circumference' :: Double -> Double
circumference' r = 2 * pi * r

Bool 表示布尔值，它只有两种值：True 和 False。

Char 表示一个字符。一个字符由单引号括起，一组字符的 List 即为字符串。

Tuple 的类型取决于它的长度及其中项的类型。注意，空 Tuple 同样也是个类型，它只有一种值：()。


<!-- Typeclasses -->
描述类型

ghci> :t (==)
(==) :: (Eq a) => a -> a -> Bool
=> 符号。它左边的部分叫做类型约束。这段类型声明可以这样理解："相等函数取两个相同类型的值作为参数并回传一个布尔值，而这两个参数的类型同在 Eq 类之中(即类型约束)"

常见 Typeclass

判断相等的类型： Eq

比较大小的类型： Ord

可用字符串的类型： show
show 3.1 => '3.1'

将字符串转为Read的某成员类型： read
read "5" - 2   => 3

一个表达式后跟:: 的类型注释，以明确其类型
read "5" :: Int  => 5

连续类型： enum
每个值都有后继子 (successer) 和前置子 (predecesor)，分别可以通过 succ 函数和 pred 函数得到
[LT .. GT]  => [LT,EQ,GT]

获取边界： maxBound 与 minBound
minBound :: Int  => -2147483648
maxBound :: Char  => '\1114111'

数字类型： Num
:t 20  => 20 :: (Num t) => t

表示整数： Intergral

表示浮点类型： Floating

<!-- 模式匹配 -->
判断一个数字是否是7
lucky :: (Integral a) => a -> String
lucky 7 = "LUCKY NUMBER SEVEN!"
lucky x = "Sorry, you're out of luck, pal!"

实现阶乘
factorial :: (Integral a) => a -> a
factorial 0 = 1
factorial n = n * factorial (n - 1)

二位矢量相加
addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)

实现  head 函数
head' :: [a] -> a
head' [] = error "Can't call head on an empty list, dummy!"
head' (x:_) = x

实现 length 函数
length' :: (Num b) => [a] -> b
length' [] = 0
length' (_:xs) = 1 + length' xs

@模式,在按模式分割时，保留对其整体的引用
capital :: String -> String
capital "" = "Empty string, whoops!"
capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]

capital "Dracula"  => "The first letter of Dracula is D"

guard 跟在函数名及参数、竖线标志之后，通常他们都是靠右一个缩进排成一列。一个 guard 就是一个布尔表达式，如果为真，就使用其对应的函数体。如果为假，就送去见下一个 guard
检查体重
bmiTell :: (RealFloat a) => a -> String
bmiTell bmi
    | bmi <= 18.5 = "You're underweight, you emo, you!"
    | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"
    | otherwise   = "You're a whale, congratulations!"

实现 max 函数
max' :: (Ord a) => a -> a -> a
max' a b
    | a > b     = a
    | otherwise = b

where 关键字，定义名字
bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | weight / height ^ 2 <= 18.5 = "You're underweight, you emo, you!"
    | weight / height ^ 2 <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
    | weight / height ^ 2 <= 30.0 = "You're fat! Lose some weight, fatty!"
    | otherwise                   = "You're a whale, congratulations!"

    =>
bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | bmi <= 18.5 = "You're underweight, you emo, you!"
    | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"
    | otherwise   = "You're a whale, congratulations!"
    where bmi = weight / height ^ 2

=>

bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | bmi <= skinny = "You're underweight, you emo, you!"
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"
    | otherwise     = "You're a whale, congratulations!"
    where bmi = weight / height ^ 2
          skinny = 18.5
          normal = 25.0
          fat = 30.0

let 关键字，定义局部名字
求圆柱体表面积
cylinder :: (RealFloat a) => a -> a -> a
cylinder r h =
    let sideArea = 2 * pi * r * h
        topArea = pi * r ^2
    in  sideArea + 2 * topArea

case，前面提到的匹配模式其实是case的语法糖

head' :: [a] -> a
head' [] = error "No head for empty lists!"
head' (x:_) = x
=>
head' :: [a] -> a
head' xs = case xs of [] -> error "No head for empty lists!"
                      (x:_) -> x

<!-- 递归 -->
斐波那契数列

实现 取列表的最大元素
maximum' :: (Ord a) => [a] -> a
maximum' [] = error "maximum of empty list"
maximum' [x] = x
maximum' (x:xs)
    | x > maxTail = x
    | otherwise = maxTail
    where maxTail = maximum' xs

实现反转
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

实现 zip
zip' :: [a] -> [b] -> [(a,b)]
zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x,y):zip' xs ys

实现 elem
elem' :: (Eq a) => a -> [a] -> Bool
elem' a [] = False
elem' a (x:xs)
    | a == x    = True
    | otherwise = a `elem'` xs

快速排序
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
  let smallerSorted = quicksort [a | a <- xs, a <= x]
      biggerSorted = quicksort [a | a <- xs, a > x]
  in smallerSorted ++ [x] ++ biggerSorted

<!-- 高端函数 -->
本质上，Haskell所有函数只有一个参数
ghci> max 4 5
5
ghci> (max 4) 5
5

实现 zipWith。 它取一个函数和两个 List 做参数，并把两个 List 交到一起(使相应的元素去调用该函数)。

zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys

zipWith' max [6,3,2,1] [7,3,1,5]  => [7,3,2,5]

实现 flip，取一个函数作参数并回传一个相似的函数，其中它们的参数颠倒了。
flip' :: (a -> b -> c) -> b -> a -> c
flip' f y x = f x y

ghci> flip' zip [1,2,3,4,5] "hello"
[('h',1),('e',2),('l',3),('l',4),('o',5)]

实现 map，取一个函数和 List 做参数，遍历该 List 的每个元素来调用该函数产生一个新的 List。

map :: (a -> b) -> [a] -> [b]
map _ [] = []
map f (x:xs) = f x : map f xs

实现filter，取一个限制条件和一个 List，回传该 List 中所有符合该条件的元素
filter :: (a -> Bool) -> [a] -> [a]
filter _ [] = []
filter p (x:xs)
    | p x       = x : filter p xs
    | otherwise = filter p xs

<!-- lambda -->
匿名函数， \ (因为它看起来像是希腊字母的 lambda)，后面是用空格分隔的参数，-> 后面就是函数体。

实现 flip
flip' :: (a -> b -> c) -> b -> a -> c
flip' f = \x y -> f y x

<!-- fold -->
实现 sum
sum' :: (Num a) => [a] -> a
sum' xs = foldl (\acc x -> acc + x) 0 xs

=>

sum' :: (Num a) => [a] -> a
sum' = foldl (+) 0

常用库函数
elem' :: (Eq a) => a -> [a] -> Bool
elem' y ys = foldl (\acc x -> if x == y then True else acc) False ys

map' :: (a -> b) -> [a] -> [b]
map' f xs = foldr (\x acc -> f x : acc) [] xs

maximum' :: (Ord a) => [a] -> a
maximum' = foldr1 (\x acc -> if x > acc then x else acc)

reverse' :: [a] -> [a]
reverse' = foldl (\acc x -> x : acc) []

product' :: (Num a) => [a] -> a
product' = foldr1 (*)

filter' :: (a -> Bool) -> [a] -> [a]
filter' p = foldr (\x acc -> if p x then x : acc else acc) []

head' :: [a] -> a
head' = foldr1 (\x _ -> x)

last' :: [a] -> a
last' = foldl1 (\_ x -> x)

<!-- $ 函数 -->
函数调用符，优先级最低

sum (map sqrt [1..130])。由于低优先级的 $，我们可以将其改为 sum $ map sqrt [1..130]，可以省敲不少键！

<!-- 函数组合 -->
将多个函数组合，即 . 函数
定义：
(.) :: (b -> c) -> (a -> b) -> a -> c
f . g = \x -> f (g x)

示例
ghci> map (\x -> negate (abs x)) [5,-3,-6,7,-3,2,-19,24]
[-5,-3,-6,-7,-3,-2,-19,-24]

=>
ghci> map (negate . abs) [5,-3,-6,7,-3,2,-19,24]
[-5,-3,-6,-7,-3,-2,-19,-24]

<!-- 模块 -->
Haskell 中的模块是含有一组相关的函数，类型和类型类的组合。而 Haskell 进程的本质便是从主模块中引用其它模块并调用其中的函数来运行操作。

加载所有函数
import Data.List

numUniques :: (Eq a) => [a] -> Int
numUniques = length . nub

仅加载所需函数
import Data.List (nub，sort)

明确不需加载函数
import Data.List hiding (nub)

起别名
import qualified Data.Map as M

自定义模块
module Geometry
( sphereVolume
，sphereArea
，cubeVolume
，cubeArea
，cuboidArea
，cuboidVolume
) where

sphereVolume :: Float -> Float
sphereVolume radius = (4.0 / 3.0) * pi * (radius ^ 3)

sphereArea :: Float -> Float
sphereArea radius = 4 * pi * (radius ^ 2)

cubeVolume :: Float -> Float
cubeVolume side = cuboidVolume side side side

cubeArea :: Float -> Float
cubeArea side = cuboidArea side side side

cuboidVolume :: Float -> Float -> Float -> Float
cuboidVolume a b c = rectangleArea a b * c

cuboidArea :: Float -> Float -> Float -> Float
cuboidArea a b c = rectangleArea a b * 2 + rectangleArea a c * 2 + rectangleArea c b * 2

rectangleArea :: Float -> Float -> Float
rectangleArea a b = a * b

<!-- 定义类型 -->
data Shape = Circle Float Float Float | Rectangle Float Float Float Float

ghci> :t Circle
Circle :: Float -> Float -> Float -> Shape
ghci> :t Rectangle
Rectangle :: Float -> Float -> Float -> Float -> Shape

surface :: Shape -> Float
surface (Circle _ _ r) = pi * r ^ 2
surface (Rectangle x1 y1 x2 y2) = (abs $ x2 - x1) * (abs $ y2 - y1)

<!-- Record Syntax -->
 一个数据类型来描述一个人，得包含他的姓、名、年龄、身高、电话号码以及最爱的冰淇淋

data Person = Person String String Int Float String String deriving (Show)
data Person = Person { firstName :: String
                     , lastName :: String
                     , age :: Int
                     , height :: Float
                     , phoneNumber :: String
                     , flavor :: String
                     } deriving (Show)

在 data 声明的后面加上 deriving (Show)，那 Haskell 就会自动将该类型至于 Show 类型类之中。


<!-- IO -->
<- 是用来运算 I/O actions 并将他的结果绑定到名称。
main = putStrLn "hello,world"

main = do
    foo <- putStrLn "Hello, what's your name?"
    name <- getLine
    putStrLn ("Hey " ++ name ++ ", you rock!")



```

## 典型例子

函数式编程的一般思路：先取一个初始集合，添加过滤条件，最终取得正确结果。

如何取得三边长度皆为整数且小于等于 10，周长为 24 的直角三角形？

1、列出三边小于等于 10 的三角形

```
let triangles = [(a,b,c) | c <- [1..10],b <- [1..10], a<-[1..10] ]
```

2、加入直角三角形的限制条件，同时满足 b 小于斜边，a 小于 b

```
ghci> let rightTriangles = [ (a,b,c) | c <- [1..10], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2]
```

2、加入周长为 24

```
ghci> let rightTriangles' = [ (a,b,c) | c <- [1..10], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2, a+b+c == 24]
```
