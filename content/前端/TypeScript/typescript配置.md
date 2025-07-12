# TypeScript配置

本文将介绍 `ts.config.json`中的配置项

## compilerOptions

### Type Checking

| 配置项                                                       | 值      | 介绍                                      |
| ------------------------------------------------------------ | ------- | ----------------------------------------- |
| [strict](https://www.typescriptlang.org/tsconfig/#strict)    | boolean | 严格模式                                  |
| [noImplicitAny](https://www.typescriptlang.org/tsconfig/#noImplicitAny) | boolean | 是否校验没有赋予类型的变量, 默认启用 any  |
| [strictNullChecks](https://www.typescriptlang.org/tsconfig/#strictNullChecks) | boolean | 是否进行严格的 null 检测                  |
| [strictFunctionTypes](https://www.typescriptlang.org/tsconfig/#strictFunctionTypes) | boolean | 支持双向协变 (让参数可以进行协变操作)     |
| [strictBindCallApply](https://www.typescriptlang.org/tsconfig/#strictBindCallApply) | boolean | 保证调用函数的时候, 参数是统一的          |
| [strictPropertyInitialization](https://www.typescriptlang.org/tsconfig/#strictPropertyInitialization) | boolean | 类中的属性进行属性的初始化才能使用        |
| [noImplicitThis](https://www.typescriptlang.org/tsconfig/#noImplicitThis) | boolean | 需要避免this 是 any                       |
| [useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig/#useUnknownInCatchVariables) | boolean | catch 中的 error 类型是 unkown 不再是 any |
| [alwaysStrict](https://www.typescriptlang.org/tsconfig/#alwaysStrict) | boolean | 永远打包的结构是严格模式                  |
| [noUnusedLocals](https://www.typescriptlang.org/tsconfig/#noUnusedLocals) | boolean | 如果变量未被使用, 会发生警告              |
| [noUnusedParameters](https://www.typescriptlang.org/tsconfig/#noUnusedParameters) | boolean | 如果参数未被使用, 会发生警告              |
| [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes) | boolean | 类型中可选属性要传递 undefined            |
| [noImplicitReturns](https://www.typescriptlang.org/tsconfig/#noImplicitReturns) | boolean | 返回值是否每条路径都有                    |
| [noFallthroughCasesInSwitch](https://www.typescriptlang.org/tsconfig/#noFallthroughCasesInSwitch) | boolean | 防止 switch case 缺少 break 语句          |
| [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) | boolean | 通过索引访问必须添加一个 undefined 类型   |
| [noImplicitOverride](https://www.typescriptlang.org/tsconfig/#noImplicitOverride) | boolean | 重写前必须加 override                     |
| [noPropertyAccessFromIndexSignature](https://www.typescriptlang.org/tsconfig/#noPropertyAccessFromIndexSignature) | boolean | 只能通过 [] 访问属性                      |
| [allowUnusedLabels](https://www.typescriptlang.org/tsconfig/#allowUnusedLabels) | boolean | 循环的 label 未使用时警告                 |
| [allowUnreachableCode](https://www.typescriptlang.org/tsconfig/#allowUnreachableCode) | boolean | 代码未触达时警告                          |

### Completeness

| 配置项                                                       | 值      | 介绍               |
| ------------------------------------------------------------ | ------- | ------------------ |
| [skipDefaultLibCheck](https://www.typescriptlang.org/tsconfig/#skipDefaultLibCheck) | boolean | 是否检测 .d.ts文件 |
| [skipLibCheck](https://www.typescriptlang.org/tsconfig/#skipLibCheck) | boolean | 是否检测第三方库   |

### Projects

| 配置项                                                       | 值      | 介绍                                         |
| ------------------------------------------------------------ | ------- | -------------------------------------------- |
| [incremental](https://www.typescriptlang.org/tsconfig/#incremental) | boolean | 增量编译 (配置文件热更新)                    |
| [composite](https://www.typescriptlang.org/tsconfig/#composite) | boolean | 复合项目                                     |
| [tsBuildInfoFile](https://www.typescriptlang.org/tsconfig/#tsBuildInfoFile) | string  | 增量文件编译的路径                           |
| [disableSourceOfProjectReferenceRedirect](https://www.typescriptlang.org/tsconfig/#disableSourceOfProjectReferenceRedirect) | boolean | 复合项目时 引用选用的是源文件 而不是声明文件 |
| [disableSolutionSearching](https://www.typescriptlang.org/tsconfig/#disableSolutionSearching) | boolean | 引用其他项目时是否检测引用的项目             |
| [disableReferencedProjectLoad](https://www.typescriptlang.org/tsconfig/#disableReferencedProjectLoad) | boolean | 禁用引用项目的加载                           |

## Type Acquisition

| 配置项     | 值       | 介绍           |
| ---------- | -------- | -------------- |
| references | boolean  | 引用其他的项目 |
| include    | string[] | 目标文件       |
| exclude    | string[] | 排除文件       |

