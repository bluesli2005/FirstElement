# image-processor

## Properties

|Props|Type|Default|Description|
|:--|:--|:--|:--|
|accept|string|`image/*`|file mime types|
|cropper-title|string|`顔写真を編集`|dialog title|
|deletable|boolean|`true`||
|editable|boolean|`true`||
|height|string|`100px`|component height|
|icon|string|`''`|optional values: `'car', 'license-back', 'license-front', 'pdf'`|
|**options**|object|`{}`|Parameters required for image processing|
|readonly|boolean|`false`|when `true`, the operation button will not be displayed|
|url|string|`''`|image url|
|view-mode|string|`''`|see fg-image `view-mode`|
|validate|function|`undefined`|file check, parameter: `(file: File, next: Function)`|
|width|string|`150px`|component width|

### options

|Props|Type|Default|Description|
|:--|:--|:--|:--|
|enableDevicePixelRatio|boolean|`false`||
|height|number|`0`|The processed image height|
|isForce|boolean|`false`||
|mimeType|string|`image/jpeg`|The processed image type|
|perResize|number|`500`||
|quality|number|`0.8`|optional values range: `(0, 1]`|
|width|number|`0`|The processed image width|

## Events

|Name|Parameters|Description|
|:--|:--|:--|
|change|(res: object)|`{data: File/Blob, url: '', raw: {}, ...}`|

#### (res: object)

|Name|Type|Required|Description|
|:--|:--|:--|:--|
|base64|string|no|image only|
|data|File/Blob|yes||
|element|HTMLElement|no|img/canvas|
|height|number|no|image only|
|**raw**|object|yes||
|size|number|yes|file size|
|type|string|yes|file type|
|url|string|yes||
|width|number|no|image only|

#### raw

|Name|Type|Required|Description|
|:--|:--|:--|:--|
|file|File|yes|original file|

## Slots

|Name|Description|
|:--|:--|
|placeholder|-|
