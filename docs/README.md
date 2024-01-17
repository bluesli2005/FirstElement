# first group ui

## Properties

| Name    | Description                             |
| :------ | :-------------------------------------- |
| project | project name: manager/dashboard/console |
| isDev   | Whether the development environment     |

## Methods

```javascript
this.$ui.isNumber(2323123) // return true
```

| Name               | Parameters                                                                   | Description                                                                                       |
| :----------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| allTypeToNull      | (obj: string/nunber/undefined/object, props?: string/number/undefined): void | Example: `'0'/''/undefined/0` -> `null`                                                           |
| booleanToNumber    | (obj: boolean/object, props?: string/string[]): void                         | Example: `false` -> `0`                                                                           |
| clearCache         | (key: string): void                                                          | clear all cache data the domain localStorage.<br>該当ドメインの localStorage 全部データを削除する |
| createUrlQuery     | (params: object, fields?: string[]): string                                  |                                                                                                   |
| createRandomStr    | (prefix: string): string                                                     | create a random string                                                                            |
| error              | (...args: any): void                                                         | console.error                                                                                     |
| formatDate         | (date: date/string, format: string): string                                  | this.\$ui.formatDate(new Date(), 'yyyy-MM-dd') -> `2020-09-17`                                    |
| getCache           | (key: string): any                                                           |                                                                                                   |
| getFileType        | (url: string, isMimeType?: boolean): string                                  |                                                                                                   |
| getMaxZIndex       | (): number                                                                   |                                                                                                   |
| getParentComponent | (fgParentName: string): Component                                            |                                                                                                   |
| getStyleValue      | (el: HTMLElement, attr: string, isInt?: boolean): string/number              |                                                                                                   |
| getScrollBarWidth  | (): number                                                                   |                                                                                                   |
| getScrollParents   | (el: HTMLElement): HTMLElement[]                                             |                                                                                                   |
| hasOwn             | (o: object, attr: string): boolean                                           | Object.hasOwnProperty                                                                             |
| init               | (projectName: string): void                                                  | initial                                                                                           |
| log                | (...args: any): void                                                         | console.log                                                                                       |
| logStr             | (...args: any): void                                                         | console.log                                                                                       |
| merge              | (target: object, ...args: object): object                                    |                                                                                                   |
| isBoolean          | (b: any): boolean                                                            |                                                                                                   |
| isElement          | (el: any): boolean                                                           |                                                                                                   |
| isFunction         | (fn: any): boolean                                                           |                                                                                                   |
| isNumber           | (n: any): boolean                                                            |                                                                                                   |
| isNumberLike       | (n: any): boolean                                                            |                                                                                                   |
| isObject           | (o: any): boolean                                                            |                                                                                                   |
| isString           | (s: any): boolean                                                            |                                                                                                   |
| isUndefined        | (a: any): boolean                                                            |                                                                                                   |
| removeCache        | (key: string): void                                                          |                                                                                                   |
| resetZIndex        | (el: HTMLElement): void                                                      |                                                                                                   |
| setCache           | (key: string, value: any): void                                              |                                                                                                   |
| slice              | (o: ArrayLike, index: number): any[]                                         |                                                                                                   |
| toCommaNumber      | (value: string, keepDecimalPlaces?: boolean): string                         | Example: `123456` -> `123,456`                                                                    |
| toDate             | (d: any): date/null                                                          |                                                                                                   |
| toNumber           | (a: any): number                                                             |                                                                                                   |
| toTwoDigits        | (a: any): string                                                             | Example: `3` -> `03`                                                                              |
| toHumpStr          | (attr: string, spacer?: string)                                              | Example: `font-size` -> `fontSize`                                                                |
| warn               | (...args: any): void                                                         | console.warn                                                                                      |
| windowDispatcher   | (eventName: string)                                                          |                                                                                                   |

### Extend Methods

業務に関するメソッド

| Name              | Parameters                                          | Description                                             |
| :---------------- | :-------------------------------------------------- | :------------------------------------------------------ |
| clearBasicData    | (): void                                            | clear basic data from localStorage                      |  |
| fmtSort           | (sortData: object): array                           | format sort data to array                               |
| formSyncValidator | (rules: object, form: object): object               |                                                         |
| getBasicData      | (key: string, isNeedObject?: boolean): array/object | get basic data, key: `prefectures/transaction_type/...` |

- getBasicData

```javascript
export default {
  created() {
    // example: sex
    // get array data
    const sexArray = this.$ui.getBasicData('sex')
    console.log(sexArray)
    // [{ value: '1', text: '男性' },{ value: '2', text: '女性' },{ value: '3', text: 'その他' }]

    // get object data
    const sexObject = this.$ui.getBasicData('sex', true)
    console.log(sexObject)
    // { 1: '男性' },{ 2: '女性' },{ 3: 'その他' }
  },
}
```

## Colors

```javascript
this.$colors.primaryPlaceholder
// please check assets/scss/theme-*.scss for details.
```

| Name                       | Value(assets/scss/theme-\*.scss)            |
| :------------------------- | :------------------------------------------ |
| primary                    | '#1E5199'                                   |
| primaryActive              | '#0786BD'                                   |
| primaryHover               | '#2DA2D5'                                   |
| primaryPlaceholder         | '#748EB7'                                   |
| primaryGradient            | 'linear-gradient(135deg, #1295CE, #0786BD)' |
| success                    | '#12AACE'                                   |
| successActive              | '#0DBEA9'                                   |
| successHover               | '#1DDB99'                                   |
| successGraph               | '#2993D9'                                   |
| warning                    | '#DB3394'                                   |
| warningActive              | '#DB3394'                                   |
| warningHover               | '#DB3394'                                   |
| border                     | '#DFE6F0'                                   |
| background                 | '#F2F6FA'                                   |
| backgroundHover: '#E5EDF6' |
| white                      | '#FFF'                                      |
| black                      | '#000'                                      |
| tableSortDefault           | '#C6D1E2'                                   |
| shadowPrimary              | 'rgba(7, 134, 189, 0.31)'                   |
| shadowGray                 | 'rgba(44, 44, 44, 0.1)'                     |
| disabledOpacity            | '0.5'                                       |
| radioChecked               | '#1E5199'                                   |
