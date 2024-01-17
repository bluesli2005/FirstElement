# fg-message

```javascript
export default {
  mounted() {
    this.$[method]('message content').then(() => {}).catch(() => {})
  }
}
```

## Methods

|Name|Parameters|Description|
|:--|:--|:--|
|alert|(message: string/string[], options?: object)|-|
|confirm|(message: string/string[], options?: object)|-|
|success|(message: string/string[], options?: object)|-|
|error|(message: string/string[], options?: object)|-|
## Options

|Props|Type|Default|Description|
|:--|:--|:--|:--|
|boxShadow|string|`''`|-|
|**buttons**|object|`{}`|-|
|maskColor|string|`''`|mask background color|
|maskOpacity|string|`''`|mask opacity|
|type|string|`warning`|Optional values: `warning/success`|

#### buttons

|Props|Type|Default|Description|
|:--|:--|:--|:--|
|ok|object|`{text: 'ok',type: 'primary',}`|-|
|cancel|object|`{text: 'キャンセル',type: 'primary',}`|-|
