# fg-input

## Properties

|Props|Type|Default|Description|
|:--|:--|:--|:--|
|clearable|boolean|`false`|-|
|custom-formatter|function|`-`|-|
|disabled|boolean|`false`|-|
|error-message|string|`''`|-|
|error-message-nowrap|boolean|`false`|-|
|inline|boolean|`false`|-|
|is-error|boolean|`false`|-|
|icon-color|string|`''`|clear Icon Color|
|length|number|`0`|Enter the content warning length|
|offset-left|number|`0`|-|
|offset-right|number|`0`|-|
|placeholder|string|`入力ください`|-|
|prefix-icon|string|`''`|-|
|prefix-icon-color|string|`''`|-|
|readonly|boolean|`false`|-|
|resizable|boolean|`false`|textarea use only|
|round|boolean|`false`|input use only|
|rows|number/string|`5`|textarea use only|
|size|string|`regular`|`regular/medium/small/mini`|
|suffix-icon|string|`''`|-|
|suffix-icon-color|string|`''`|-|
|type|string|`text`|input types: `text/textarea/...`|
|unit|string|`''`|The text content displayed outside the input box|
|v-model/value|string|`''`|-|
|width|string|`''`|-|
|cssProperty|Object|`{}`|The object of css property|
|* calendar-icon|string|`''`|-|

## Events

|Name|Parameters|Description|
|:--|:--|:--|
|change|(value: string)|-|
|clear|(e: Event)|-|
|click|(e: Event)|-|
|click:prefix-icon|(e: Event)|-|
|click:suffix-icon|(e: Event)|-|

## Slots

|Name|Description|
|:--|:--|
|prefix|-|
|suffix|-|
