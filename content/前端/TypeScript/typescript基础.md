# TypeScript基础

## ts中的基础类型

```ts
/**
 * ts 类型:
 *  1. 内置类型 (DOM Promise 原始方法)
 *  2. 基础类型
 *  3. 高级类型
 *  4. 自定义类型
 */

/**
 * ts 中 变量: 类型 = 值
 */
let name: string = "alydia";
let age: number = 30;

// 元组 规定长度和存储的类型
let tuple1: [string, number, boolean] = ["a", 30, true];
// 添加只能添加元组中已经存在的类型
tuple1.push("abc"); // 为了安全, 因为不确定这个值是否存在
tuple1[0];

// 枚举类型,自带类型的对象
enum USER_ROLE {
  USER,
  ADMIN,
  MANAGER,
}

// null 和 undefined
// 任何类型的子类型

let str: string ;

// void 代表函数的返回值为空, 只在函数中使用

// never 类型
// 任何类型的子类型
function fn1(): never {
  throw new Error();
}

// 类型保护,保障程序的不缺失 完整性保护

// 针对不同的类型做不同处理
function validate(val: never) {}
function getResult(strOrNumORBool: string | number | boolean) {
  if (typeof strOrNumORBool === "string") {
    return strOrNumORBool.toUpperCase();
  }
  if (typeof strOrNumORBool === "number") {
    return strOrNumORBool.toFixed(2);
  }
  if (typeof strOrNumORBool === "boolean") {
    return strOrNumORBool ? "是的" : "不是";
  }
  validate(strOrNumORBool);
}

// object 对象类型
// object, {}, Object
// object 是一个更小的范围, {} 是最大的范围
let obj: {} = "123"; // 最大范围

// Symbol BigInt es6新增的
let s1: symbol = Symbol("s1");
let s2: symbol = Symbol("s2");


// string number boolean null undefined array tuple never object symbol bigint any void

export {};
```

## 联合类型断言

```ts
// 以赋予值得结果 来推导内容

// let name = "John";
// let age = 30;

// let const 区别
// const age = 30; 如果用常量 来自动推导类型就是字面类型

let name: string | number;
// 默认没有赋值得时候,联合类型可以调用公共得方法,为了安全所有只能访问公共得属性
name = "John"; // 字符串类型
name.toUpperCase();
name = 40;
name.toFixed(); // 赋值后会推断类型

// 字面量类型
type Direction = "up" | "down" | "left" | "right";

let direction: Direction;
direction = "up"; // 只能是这四个值之一

// type 中定义的是类型 不是js 中对象
type women = {
  wealthy: true;
  age: number;
  name: string;
};

// 断言 (非空断言, 这个值一定不为空, 绕过 ts 检查)
let ele = document.getElementById("app");
ele!.style.color = "red"; // 可能会报错,因为ele可能为null

// as 断言 可以强制把某个类型断言成已经存在的某个类型

let ele2: HTMLElement | null = document.getElementById("app") as HTMLElement;
ele2.style.color = "red"; // 可能会报错,因为ele可能为null

ele?.style.color; // 可选链,如果ele为null则不执行后面的代码

export {};
```

## 函数

```ts
// 函数类型
// 函数 function 关键字来定义函数
// 表达式定义 (可以描述变量的类型)
// 函数有入参 和 返回值 (针对这个部分,掌握类型)
// 函数本身的类型

// type ISum = (x: number, y: number) => number;
// let sum2: ISum = (x, y) => {
//     return x + y;
// }
// sum2(10, 20);

// 1) 常见的类型推导的方式
let name = "1";
let age = 10;

// 2) 根据返回值来进行类型推导, 自动推导返回值类型
// function sum(x: number, y: number): number {
//     return x + y;
// }
type ISum = (x: number, y: number) => number;
let sum: ISum = (x, y) => {
  return x + y;
};

// 3) 会根据上下文来推导赋予值的类型
type ICallback = (x: number, y: number) => void;

// void 表示不关心返回的具体类型
function test(callback: ICallback) {}
test((x, y) => {
  console.log(x + y);
});

// 4) 函数中的可选参数
let sum3: (x: number, y?: number) => number = (x, y = 0) => {
  return x + y;
};

// 5) 函数中的剩余参数
let sum4: (x: number, ...args: number[]) => number = (x, ...args) => {
  return args.reduce((total, current) => total + current, x);
};

// 6) 可以采用 ts 中的 typeof 来获取变量的类型
let personalbar = {
  name: "个人工具栏",
  age: 10,
  getName() {
    return this.name;
  },
};
function getVal(this: typeof personalbar, key: keyof typeof personalbar) {
  return this[key];
}

let r = getVal.call(personalbar, "name"); // 个人工具栏

// 7) 函数的重载 ts 中的函数重载是伪重载(类型的重载 而不是逻辑的重载)
function toArray(value: number): number[];
function toArray(value: string): string[];
function toArray(value: number | string) {
  if (typeof value === "number") {
    return value.toString().split("").map(Number);
  } else {
    return value.split("");
  }
}

let arr = toArray(123); // [1, 2, 3]
let arr2 = toArray("123"); // ['1', '2', '3']
export {};
```

## 类中类型

```ts
// 类本身就可以是一个类型,可以描述实例

// ts 中要求所有的属性 必须先声明再使用
class Circle {
  public x!: number;
  public y!: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y || 100;
  }
  // ...
}
// public 公开属性
// private 私有属性,只能在类的内部访问
// protected 受保护属性,只能在类的内部和子类中访问
// readonly 只读属性,只能在类的内部访问,不能修改
// static 静态属性,可以通过类名直接访问,而不需要实例化
// #abc 私有属性,只能在类的内部访问
class Animal {
  #abc = 123; // 私有属性,只能在类的内部访问
  constructor(public name: string, public age: number) {}
}

class Cat extends Animal {
  constructor(name: string, age: number, public color: string) {
    super(name, age);
  }
}
const animal = new Animal("Dog", 5);
console.log(animal);

const cat = new Cat("Cat", 3, "Black");
console.log(cat);
```

## 接口的使用

```ts
/**
 * 1. 接口不能具有具体的实现, 可以用于描述 函数 混合类型 对象 类
 */

// type IFullname = {
//   firstName: string;
//   lastName: string;
// };
interface IFullname {
  firstName: string;
  lastName: string;
}
type IFn = { (obj: IFullname): string };
const fullname: IFn = ({ firstName, lastName }) => {
  return `${firstName} ${lastName}`;
};

/**
 * type 和 interface 的区别:
 * 1. type 可以定义基本类型, 联合类型, 元组类型等,
 * 2. interface 只能定义对象类型
 * 3. 如果只是用来描述结构用 interface
 * 4. 如果需要定义基本类型, 联合类型, 元组类型等用 type
 * 5. interface 可以被继承, type 不能被继承
 * 6. type 不能重名, interface 可以合并
 * 7. type 在后续的学习中可以使用循环和条件, interface 不行
 * 其他情况下可以呼唤 (函数类型一般用 type 来声明)
 */
fullname({
  firstName: "John",
  lastName: "Doe",
});

type Ifn = {
  (): number;
  count: number;
};
const click: Ifn = () => {
  return click.count++;
};
// 为了防止这个 click 函数被重新赋值, let 是可以被修改的, 如果用 const 就不一样了
click.count = 0;

/**
 * 1. 如果对象中的属性 多于接口可以直接采用断言的方式来赋值
 * 2. 可以基于接口的特性 扩展类型 写一个同名接口
 * 3. 产生一个新类型
 * 4. 类型兼容
 * 5. 交叉类型&
 * 6. 任意类型
 */
interface IVeg {
  color: string;
  size: number;
  [key: string]: any; // 允许有其他属性
}

const carrot: IVeg = {
  color: "orange",
  size: 5,
  a: 1,
}; // 断言, 只要有 color 和 size 就可以了
```

## 泛型

```ts
class Animal {
  constructor(public name: string, public age: number) {}
}

class Person {
  constructor(public name: string, public age: number) {}
}

function createInstance(target: typeof Animal, name: string, age: number) {
  return new target(name, age);
}

const dog = createInstance(Person, "Dog", 5);

// 泛型使用的时候传递类型,可以直接推导,但是内部调用的时候没有确定类型
type ICallback<T> = (name: T, age: number) => void;
type IforEach = <T>(arr: T[], callback: ICallback<T>) => void;
const forEach: IforEach = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
};

forEach([1, 2, "3"], (item, index) => {
  console.log(`Item: ${item}, Index: ${index}`);
});

// 写在前面 就是表示使用类型的时候传参,写后面 意味着调用函数的时候传递类型

// 泛型是有默认值的
// 使用一些联合类型的时候,会使用泛型

type Union<T = boolean> = T | number | string;
let union: Union<boolean> & {}= true; // 默认值为 boolean

// 泛型约束 
type IKeyValue<T extends string | number, U> = {
  key: T;
  value: U;
};

interface IWithLen {
  length: number;
}

// extends指只要泛型中有 length 属性即可
function handle2<T extends IWithLen>(arr: T) {
  return arr.length;
}
handle2({ a: 1, b: 2, length: 3 });

function getVal<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

getVal({ name: "Alice", age: 30 }, "name"); // 返回类型为 string

interface IResponse<T> {
  code: number;
  message?: string;
  data: T;
}

interface ILoginData {
  token: string;
  roles: number[];
}
function toLogin(): IResponse<ILoginData> {
  return {
    code: 200,
    data: {
      token: "abc123",
      roles: [1, 2, 3],
    },
  };
}

// 获取最大值

class MyArray<T> {
  private arr: T[] = [];
  set(value: T): void {
    this.arr.push(value);
  }
  getMax(): T | null {
    if (this.arr.length === 0) return null;
    return this.arr.reduce((max, current) => (current > max ? current : max));
  }
}
let myArr = new MyArray<number>();
myArr.set(100);
myArr.set(200);
myArr.set(300);
console.log(myArr.getMax()); // 输出 300

export {};
```

## 交叉类型

```ts
/**
 * & 交叉类型
 * | => ||
 * & => &&
 *
 * | 并集
 * & 交集 ts 中的
 */

interface Person1 {
  handsome: string;
}

interface Person2 {
  high: string;
}

interface Person3 {
  rich: string;
}

type Person = Person1 & Person2 & Person3;

let person: Person = {
  handsome: "yes",
  high: "yes",
  rich: "yes",
};
export {};
```

## unknow类型

```ts
// unknown 是 any 的安全类型, 泛型没有赋予值的时候 默认就是 unknown

let val: unknown = true;

// unknown 不能直接赋值给其他类型

// let val1: string = val; // error

function processInput(val: unknown) {
  if (typeof val === "number") {
    val.toFixed(2); // 可以调用 number 的方法
  } else if (typeof val === "string") {
    val.toUpperCase(); // 可以调用 string 的方法
  }
}
let val1: unknown = "hello";
(val1 as string).toUpperCase(); // ok, 通过类型断言将 unknown 转为 string


type IKey = keyof any
```

## 条件类型

```ts
// 条件类型
// 和泛型约束通常一起使用, 类似三元运算符, 泛型约束是用来约束泛型的(也包含了判断), 条件是用来判断的

type ResStatusMessage<T extends number> = T extends 200 | 204 | 206
  ? "success"
  : "fail";

type R1 = ResStatusMessage<200>; // "success"
type R2 = ResStatusMessage<404>; // "fail"

type Conditional<T, U> = T extends U ? "yes" : "no";

type R3 = Conditional<"hello", string>; // "yes"
type R4 = Conditional<"hello", number>; // "no"

interface Bird {
  name: "鸟";
}

type FormatReturnVal<T extends string | number> = T extends string
  ? string
  : T extends number
  ? number
  : never;
function sum<T extends string | number>(a: T, b: T): FormatReturnVal<T> {
  // 泛型类型不能作 数学运算
  return a + (b as any);
}

let result = sum("hello", "world"); // "helloworld"
let result2 = sum(1, 2); // 3

```

## 类型兼容

```ts
type R1 = "abc" extends string ? true : false; // true
type R2 = 123 extends number ? true : false; // true
type R3 = true extends boolean ? true : false; // true

let r1: string = "abc";
let r2: number = 123;
let r3: boolean = true;

//  字面量类型可以赋予给基础类型

type R4 = "a" extends "a" | "b" | "c" ? true : false; // true
type R5 = 1 extends 1 | 2 | 3 ? true : false; // true
type R6 = true extends true | false ? true : false; // true

// 字面量类型可以赋予给字面量的联合类型
let r4: "a" | "b" | "c" = "a";


// 类型层面上的, 低类型可以赋予高类型
// 从结构上考虑的 交叉类型 可以赋予交叉前的类型
type R7 ={} extends object ? true : false; // true
type R8 ={} extends Object ? true : false; // true

type R9 = object extends {} ? true : false; // true
type R10 = Object extends {} ? true : false; // true

export {};

```

## 内置类型

```ts
// 正常判断类型的时候 可以通过 A extends B  A 是 B 的子类型

// 条件分发

// 1.A类型是通过泛型传入的
// 2.A类型如果是联合类型会进行分发
// 3.泛型参数A 必须是完全裸露的 才具备分发的能力

interface Bird {
  name: "鸟";
}
interface Sky {
  name: "天";
}
interface Fish {
  name: "鱼";
}
interface Water {
  name: "水";
}

type Conditional = Fish | Bird extends Fish ? Water : Sky;

type Conditional2<T> = T extends Fish ? Water : Sky;

type R1 = Conditional2<Bird | Fish>; // 将联合类型的每一项单独的进行比较

// 默认情况下 有些时候我们需要关闭这种分发能力, 会造成判断不准确
type Conditional3<T, U> = T extends U ? true : false;
type R2 = Conditional3<1 | 2, 1>;

// 禁用分发
type NoDistribute<T> = T & {};
type Conditional4<T, U> = NoDistribute<T> extends U ? true : false;
type R3 = Conditional4<1 | 2, 1>;

type Conditional5<T, U> = [T] extends [U] ? true : false;
type R4 = Conditional5<1 | 2, 1>;

// 条件判断还有一些注意项
type IsNever<T> = [T] extends [never] ? true : false;

// never在直接比较的时候无法返回正确的结果
type R5 = IsNever<never>; // never

// 内置1: Extract
// type MyExtract<T, U> = T extends U ? T : never;
type R6 = Extract<1 | 2 | 3, 1 | 2>; // 求交集

// type MyExclude<T, U> = T extends U ? never : T;
type R7 = Exclude<1 | 2 | 3 | 4 | 5, 2 | 4>; // 1 | 3 | 5

// type MyNonNullable<T> = T & {};
type R8 = NonNullable<1 | 2 | null | undefined>; // 1 | 2

// 可以求联合类型的交集和差集 Extract 和 Exclude 后续可以求对象的属性的交集和差集

// infer 类型判断
// infer 可以在条件类型中提取类型的某一个部分,
// 在使用的时候想获取什么类型就将他写在什么"地方"加一个变量可以自动的来推导
// 类型推导都是基于位置的

// 1.获取函数的返回值类型
function getObject(name: string, age: number, sex: string) {
  return { name, age };
}
// type ReturnType<T extends (...args: any[]) => any> = T extends (
//   ...args: any[]
// ) => infer R
//   ? R
//   : never;
// //泛型约束的目的是限制泛型传入的,后面的条件是逻辑
// type R9 = ReturnType<typeof getObject>; // 使用 infer 需要先创造一个条件才可以

type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
//泛型约束的目的是限制泛型传入的,后面的条件是逻辑
type R10 = Parameters<typeof getObject>; // 使用 infer 需要先创造一个条件才可以

class A {
  constructor(name: string) {}
}

type ConstructorParameters<T extends new (...args: any[]) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
type R11 = ConstructorParameters<typeof A>; // 取类本身的类型判断构造函数的参数

type InstanceType<T extends new (...args: any[]) => any> =
  T extends abstract new (...args: any[]) => infer P ? P : never;
type R12 = InstanceType<typeof A>; // 取类本身的类型判断构造函数的参数

function createInstance<T extends new (...args: any[]) => any>(
  target: T,
  ...args: ConstructorParameters<T>
) {
  return new target(...args);
}

class MyPerson {
  constructor(public name: string, public age: number) {}
}

createInstance(MyPerson, "zhangsan", 18);

// 2.操作
// swap

type Swap<T> = T extends [infer A1, infer A2] ? [A2, A1] : never;
type R13 = Swap<["zs", 30]>; // 30, 'zs'

type SwapHeadTail<T> = T extends [infer H, ...infer N, infer T]
  ? [T, ...N, H]
  : never;
type R14 = SwapHeadTail<[1, 2, 3, 4, 5, 6, 7]>;

// promise 如果返回的是一个promise 会不停的解析这个promise
function getVal(): Promise<100> {
  return new Promise((reslove) => {
    reslove(100);
  });
}

type PromiseReturnValue<T> = T extends Promise<infer P>
  ? PromiseReturnValue<P>
  : T;

type R15 = PromiseReturnValue<Promise<Promise<Promise<100>>>>;

// 通过 infer 来实现递归推导
// 将元组转化成联合类型 [number, boolean, string] => number | boolean | string
type ElementToUnion<T> = T extends Array<infer E> ? E : never;
type TupleToArray = ElementToUnion<[number, string, boolean]>;

// 3.重构类型的结构 T & K
// Partial
interface Person {
  name: string;
  age: number;
  adddress: { n: string };
}
type Partial<T> = { [K in keyof T]?: T[K] };
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type PartialPerson = Partial<Person>;
let person: PartialPerson = { name: "zs" };

// Required
type Required<T> = {
  [K in keyof T]-?: T[K];
};
let person2: Required<PartialPerson> = {
  name: "zs",
  age: 30,
  adddress: { n: "1" },
};

// ReadOnly & Mutate
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};
type Mutate<T> = {
  -readonly [K in keyof T]: T[K];
};
let person3: Mutate<ReadOnly<PartialPerson>> = {
  name: "zs",
  age: 30,
};

// Pick Omit 重构对象的结构 可以采用这两个类型
type Pick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};
type PickPerson = Pick<Person, "name" | "age">;

// 在很多属性中挑选需要的,在很多属性中排除不需要的
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type OmitPerson = Omit<Person, "name" | "age">;

// 实现 minxin

// 针对这种情况,应该将B 有的属性 在A中移除
function mixin<T, K>(a: T, b: K): Omit<T, keyof K> & K {
  return { ...a, ...b };
}
let x = mixin({ name: "zs", age: 18 }, { name: 123, age: "22", c: 2 });

type Computed<T> = {
  [K in keyof T]: T[K];
};

type nameType = Computed<typeof x>;

// keyof 取key
// typeof 取类型的
// 索引查询 []
// in 循环
// extends 条件

// Record
let person6: Record<string, any> = { 1: "abc" };

function map<T extends keyof any, K>(
  obj: Record<T, K>,
  callback: (value: K, key: T) => any
) {
  let r = {} as any;
  for (let key in obj) {
    r[key] = callback(obj[key], key);
  }
  return r;
}

let mapResult = map({ name: "zs", age: 30 }, (value, key) => {
  return "abc";
});
export {};
```

## 类型兼容性

```ts
// 鸭子类型检测 结构化类型检测
// 子类型可以赋予给父类型, 从结构角度触发. ts比较的不是类型的名称,而是这个结构上的属性和方法

// 1)基础类型的兼容性问题
// 将一个值赋予给另一个值可以产生兼容性
// 基础类型的兼容性问题
let obj: {
  toString(): string;
};
let str: string = "";
obj = str;
// 从安全角度出发,你要的属性我都满足,只能访问已经存在的属性,不存在的无法访问

// 2)接口的兼容性
interface IPerson {
  name: string;
  age: string;
}
interface IAnimal {
  name: string;
  age: string;
  address: string;
}
let person!: IPerson;
let animal!: IAnimal;
// person = animal; // success
// animal = person; // fail
// 在后台返回的数据中我们可以预先定义好接口类型. 多的属性也可以赋值给这个类型

// 3)函数的兼容性
let s1 = (a: string, b: string) => a + b;
let s2 = (a: string, b: string, c: string) => a + b + c; // ts 基于位置来推导的
// s1 = s2; // fail
s2 = s1; // success
// 参数个数只能少,不能多

function forEach<T>(
  arr: T[],
  callback: (item: T, index: number, array: T[]) => void
) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

forEach([1, 2, 3], (item, index, array) => {});

// 函数的逆变与协变 函数的参数是逆变 返回值是协变
class Parent {
  home() {}
}
class Child extends Parent {
  car() {}
}
class Grandson extends Child {
  money() {}
}
// 函数的参数是逆变的
// let t1: (instance: Child) => void = (instance: Parent) => ""; // success
// let t2: (instance: Child) => void = (instance: Grandson) => ""; // fail
// 函数的返回值是协变的
// let t3: (instance: Child) => void = (instance: Child) => new Grandson(); // success
// let t4: (instance: Child) => void = (instance: Child) => new Parent(); // success

// 传递的函数 (传父 (参数是逆变的) 返子 (返回值是协变的))
// 对于函数的兼容性而言, 参数个数更少, 传递的可以是父类, 返回值可以返回儿子

// 推导公式:
type Arg<T> = (arg: T) => void;
type Return<T> = (arg: any) => T;
type ArgType = Arg<Parent> extends Arg<Child> ? true : false; // 逆变
type ReturnType = Return<Grandson> extends Return<Child> ? true : false; // 协变

interface MyArray<T> {
  concat(...args: T[]): T[];
  //   concat: (...args: T[]) => T[]; // 这中方式会检测逆变
}

let arr1!: MyArray<Parent>; // [Parent]
let arr2!: MyArray<Child>; // [Child]
// arr1 -> (...args: Parent[]): Parent[];
// arr2 -> (...args: Child[]): Child[];

arr1 = arr2;

// 4) 泛型的兼容性
// ts 比较的是结构, 结构一致即可
interface TT<T> {}

let o1!: TT<string>;
let o2!: TT<number>;
o2 = o1;

// 5) 枚举不具备兼容性问题
enum E1 {}
enum E2 {}

let e1!: E1;
let e2!: E2;
// e2 = e1; // error

// 6) 类的兼容性
class A {
  public name!: string;
}
class B {
  public name!: string;
  age!: string;
}
let b: A = new B(); // 比较的是属性 不符合就不兼容, 如果类中存在私有属性或者收保护的属性, 则不能兼容

// ts 比较类型结构的时候比较的是属性和方法
// 如果属性和放到都满足则兼容, 有一些比较特殊

// 基础类型和对象类型的兼容, 接口的兼容, 泛型的兼容, 枚举的兼容, 类的兼容

// 在其他语言中存在标称类型 (根据名称开区分类型)
type Nominal<T, K extends string> = T & { __tag: K };
type BTC = Nominal<number, "btc">;
type USDT = Nominal<number, "usdt">;
let btc: BTC = 1000 as BTC;
let usdt: USDT = 1000 as USDT;

function getVal(val: BTC) {
  return val;
}
getVal(btc);

export {};
```

## 装饰器

```ts
/**
 * 装饰器就是一个函数, 只能在类中使用 (类本身, 类成员使用)
 * 装饰器的分类
 * 1. 类的装饰器
 * 2. 方法装饰器
 * 3. 属性装饰器
 * 4. 访问装饰器
 * 5. 参数装饰器
 * ts.config.json "experimentalDecorators": true,
 */

// 1) 类的装饰器 给类来进行扩展的. 也可以返回一个子类去返回一个父类
const classDecorator = <T extends new (...args: any[]) => any>(target: T) => {
  (target as any).type = "动物";
  (target as any).getType = function () {
    return this.type;
  };
  Object.assign(target.prototype, {
    eat() {},
    drink() {},
  });
};

function OverrideAnimal(target: any) {
  return class extends target {
    eat() {
      super.eat();
      console.log("new eat");
    }
  };
}

// 2) 方法装饰器
function Enum(isEnum: boolean): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    // desriptor.enumable // 是否可枚举
    // desriptor.writable // 是否能被重写
    // desriptor.configurable // 是否属性能被删除
    // desriptor.value // 当前函数的值
    descriptor.enumerable = isEnum;

    let original = descriptor.value as any;
    descriptor.value = function () {
      console.log("prev eat");
      return original(...arguments);
    } as typeof descriptor.value;
  };
}

// 3) 属性装饰器
function ToUpper(isUpper: boolean): PropertyDecorator {
  return function (target, propertyKey) {
    let val = "";
    Object.defineProperty(target, propertyKey, {
      get() {
        return val.toUpperCase();
      },
      set(newVal) {
        val = newVal;
      },
    });
  };
}

// 可以描述属性装饰器 get 和 set
function valToUpper(target: any, key: string, desciptor: any) {
  let originalSet = desciptor.set; 

  desciptor.set = function (newVal: string) {
    return originalSet.call(this, newVal.toUpperCase());
  };
}

class Animal {
  @ToUpper(true)
  public name: string = "animal";

  @Enum(true) // 最终装饰器必须返回一个函数
  eat() {
    console.log("动物 original");
  }

  private _val!: string;
  @valToUpper
  get val() {
    return this._val;
  }
  set val(newVal) {
    this._val = newVal;
  }
}

const animal = new Animal();
animal.val = "abc";
console.log(animal.val); // "ABC"

export {};
```

## 装饰器执行顺序

```ts
function Echo(val: string) {
  return function (target: object, key?: string, desciptor?: any) {
    console.log(val, target, key, desciptor);
  };
}

@Echo("装饰器2")
@Echo("装饰器1")
class Flow {
  constructor(@Echo("构造函数的参数装饰器") str: any) {}

  @Echo("原型方法")
  handler(@Echo("原型方法的参数") str: any) {}

  @Echo("静态属性")
  static type = "xxx";

  @Echo("静态方法")
  static getType() {
    return this.type;
  }

  @Echo("实例属性")
  name!: string;

  @Echo("属性访问器")
  get value() {
    return "aaa";
  }
}
/**
 * 执行顺序
 * 1. [实例属性 方法 属性访问]
 * 2. [静态属性 静态方法]
 * 3. [类的装饰器]
 * 一个函数 对原来的内容不停地包裹 (洋葱模型)
 */
// 装饰器一般会搭配反射来使用
// 元数据? 描述数据的数据
export {};
```

