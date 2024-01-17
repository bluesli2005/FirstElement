# fg-calendar

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
|format|string|``|view format, Example: `yyyy/MM/dd` or `timestamp`|
|inline|boolean|`false`|-|
|is-error|boolean|`false`|-|
|placeholder|string|`選択`|-|
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
|* is-time-picker|boolean|`false`|Only for `fg-date-picker` component|

## Events

|Name|Parameters|Description|
|:--|:--|:--|
|calendar|(calendar: VueComponent)|fg-calendar|
|change|(value: string)|selected date, or null|
|clear|(e: Event)|-|
|click|(src: string, e: Event)|if `clickable`  is `true`, triggers when left button is clicked|
|error|(err: Error)|-|

## Slots

|Name|Description|
|:--|:--|
|time-picker|-|
