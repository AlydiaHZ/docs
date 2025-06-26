# TypeScript

[源码](https://github.com/type-challenges/type-challenges/tree/main)

## 实现 Pick

不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

**从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

解答：

```ts
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}
```

答案和大部分人都是相同的，只是在这里和说明一下keyof 及 in 的概念及用法，避免刚接触的小伙伴查找。

**keyof: 取interface的键后保存为联合类型**

```ts
interface userInfo {
  name: string
  age: number
}
type keyofValue = keyof userInfo
// keyofValue = "name" | "age"
```

**in: 取联合类型的值，主要用于数组和对象的构建**

切记不要用于interface, 否则会报错

```ts
type name = 'firstname' | 'lastname'
type TName = {
  [key in name]: string
}
// TName = { firstname: string, lastname: string }
```

**用于实际开发，举个例子：**

```ts
function getValue(o:object, key: string){
  return o[key]
}
const obj1 = { name: '张三', age: 18 }
const values = getValue(obj1, 'name')
```

这样写丧失了ts的优势：

1. 无法确定返回值类型
2. 无法对key进行约束

```ts
function getValue<T extends Object,K extends keyof T>(o: T,key: K): T[K] {
  return o[key]
}
const obj1 = { name: '张三'， age: 18}
const values = getValue(obj1, 'name')
// 如果第二个参数不是obj1中的参数就会报错
```

## 对象属性只读

不要使用内置的 `Readonly<T>`，自己实现一个。

泛型 `Readonly<T>` 会接收一个 *泛型参数*，并返回一个完全一样的类型，只是所有属性都会是只读 (readonly) 的。

也就是不可以再对该对象的属性赋值。

例如：

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

解答：

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

## 元组转换为对象 

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

例如：

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

解答：

```ts
type TupleToObject<T extends readonly (string | symbol | number)[]> = {
	[P in T[number]]: P
}
```

## 第一个元素

实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
```

解答：

```ts
//answer1
type First<T extends any[]> = T extends [] ? never : T[0]

//answer2
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

//answer3
type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never
```

## 获取元组长度

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

例如：

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

解答：

```ts
type Length<T extends readonly any[]> = T extends { length: inter L } ? L : never
```

## 实现 Exclude

实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

> 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

例如：

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

解答：

```ts
type MyExclude<T, U> = T extends U ? never : T
```

## 简单的 Vue 类型

实现类似Vue的类型支持的简化版本。

通过提供一个函数`SimpleVue`（类似于`Vue.extend`或`defineComponent`），它应该正确地推断出 computed 和 methods 内部的`this`类型。

在此挑战中，我们假设`SimpleVue`接受只带有`data`，`computed`和`methods`字段的Object作为其唯一的参数，

- `data`是一个简单的函数，它返回一个提供上下文`this`的对象，但是你无法在`data`中获取其他的计算属性或方法。
- `computed`是将`this`作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。
- `methods`是函数的对象，其上下文也为`this`。函数中可以访问`data`，`computed`以及其他`methods`中的暴露的字段。 `computed`与`methods`的不同之处在于`methods`在上下文中按原样暴露为函数。

`SimpleVue`的返回值类型可以是任意的。

```ts
const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname
    }
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase())
    }
  }
})
```

解答：

```ts
type GetComputed<C> = C extends Record<string, (...args: any[]) => any> 
  ? { [S in keyof C]: ReturnType<C[S]> } 
  : never

declare function SimpleVue<D, C, M>(
  options: {
    data: () => D,
    computed: C,
    methods: M,
  } & ThisType<D & M & GetComputed<C>>
): any
```

```ts
type GetComputed<TComputed> = {
  [key in keyof TComputed]: TComputed[key] extends () => infer Result ? Result : never;
};

type Options<TData, TComputed, TMethods> = {
  data: (this: void) => TData;
  computed: TComputed & ThisType<TData>;
  methods: TMethods & ThisType<TData & GetComputed<TComputed> & TMethods>;
};

declare function SimpleVue<TData, TComputed, TMethods>(
  options: Options<TData, TComputed, TMethods>
): unknown;
```

