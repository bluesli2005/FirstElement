# fg-date-picker

## Properties

|Props|Type|Default|Description|
|:--|:--|:--|:--|
|clearable|boolean|`false`|-|
|default-view|string|`''`|-|
|dash-offset|number|`undefined`|Set the horizontal offset of the dash, when show-before/after-dash is true |
|date-range|array|`[]`|-|
|disabled|boolean|`false`|-|
|error-message|string|`''`|-|
|error-message-nowrap|boolean|`false`|-|
|format|string|`yyyy/MM/dd hh:mm:ss`|view format, Example: `yyyy/MM/dd hh:mm` or `timestamp`|
|inline|boolean|`false`|-|
|is-error|boolean|`false`|-|
|placeholder|string|`選択してください`|-|
|popup-class|string|`''`|popup class name|
|popup-position|string|`''`|Optional values: `left/right`|
|select-mode|string|`single`|Optional values: `single/multiple/range`|
|show-before-dash|boolean|`false`|-|
|show-after-dash|boolean|`false`|-|
|size|string|`regular`|Optional values: `regular/medium/samll/mini`|
|type|string|`date`|Optional values: `date/month/year`|
|value-format|string|`''`|value format, Example: `yyyy/MM/dd` or `timestamp`|
|value-formatter|function|`undefined`|Parameters:(currentDate), return processed `currentDate`|
|v-model/value|String, Array, Number, Date|`''`|-|
|width|string, number|`''`|-|
|writable|boolean|`false`|-|

## Events

|Name|Parameters|Description|
|:--|:--|:--|
|change|(value: string, original: any)|selected date, or null|
|error|(err: Error)|-|

