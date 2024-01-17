# fg-avatar

## Properties

| Props                      | Type    | Default | Description                                      |
| :------------------------- | :------ | :------ | :----------------------------------------------- |
| background                 | boolean | `false` | -                                                |
| clickable                  | boolean | `false` | -                                                |
| circle                     | boolean | `true`  | Whether to display as a circle                   |
| data                       | object  | `{}`    | `{url: '', name: '', summary: '', ...}`          |
| fillet                     | boolean | `false` | -                                                |
| name-font-weight-normal    | boolean | `false` | -                                                |
| size                       | string  | `37`    | set avatar size                                  |
| src                        | string  | `''`    | Avatar image file URL                            |
| text-flex-direction-column | boolean | `false` | -                                                |
| text-summary-no-offset     | boolean | `false` | -                                                |
| text-width                 | string  | `''`    | set max width of text wrapper                    |
| activeFlg                  | string  | `''`    | set active icon color(color code)                |
| showType                   | string  | `name`  | show kana name when mouserover the customer name |

### data

| Props     | Type   | Required | Description                        |
| :-------- | :----- | :------- | :--------------------------------- |
| url       | string | yes      | Avatar image file URL              |
| name      | string | no       | username or `lastName + firstName` |
| firstName | string | no       |                                    |
| lastName  | string | no       |                                    |
| summary   | string | no       |                                    |
| subName   | string | no       |                                    |

## Events

| Name  | Parameters              | Description                                                    |
| :---- | :---------------------- | :------------------------------------------------------------- |
| click | (src: string, e: Event) | if `clickable` is `true`, triggers when left button is clicked |
