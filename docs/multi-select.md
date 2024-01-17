# fg-multi-select

## Properties

| Props                | Type          | Default            | Description                                       |
| :------------------- | :------------ | :----------------- | :------------------------------------------------ |
| clearable            | boolean       | `false`            | -                                                 |
| custom-formatter     | function      | `undefined`        | -                                                 |
| disabled             | boolean       | `false`            | -                                                 |
| error-message        | string        | `''`               | -                                                 |
| error-message-nowrap | boolean       | `false`            | -                                                 |
| filterable           | boolean       | `false`            | -                                                 |
| inline               | boolean       | `false`            | -                                                 |
| is-error             | boolean       | `false`            | -                                                 |
| items                | array         | `[]`               | -                                                 |
| item-prefix          | string        | `''`               | item prefix text                                  |
| offset-left          | number        | `0`                | -                                                 |
| offset-right         | number        | `0`                | -                                                 |
| placeholder          | string        | `選択してください` | -                                                 |
| popup-class          | string        | `''`               | -                                                 |
| popup-offset         | number/string | `undefined`        | -                                                 |
| popup-position       | string        | `''`               | Optional values: `left/right`                     |
| size                 | string        | `regular`          | `regular/medium/small/mini`                       |
| theme                | string        | `default`          | Optional values: `default/light-blue/transparent` |
| text-size            | string        | `''`               |                                                   |
| unit                 | string        | `''`               | The text content displayed outside the input box  |
| v-model/value        | string/number | `''`               | -                                                 |
| width                | string/number | `''`               | -                                                 |
| is-show-all-label    | boolean       | `true`             | `「全て」ラベルを表示する`                        |

## Events

| Name        | Parameters           | Description |
| :---------- | :------------------- | :---------- |
| change      | (value: object/null) | -           |
| click       | (e: Event)           | -           |
| pop-visible | (value: boolean)     | -           |

## Slots

| Name    | Description        |
| :------ | :----------------- |
| default | custom view box    |
| options | custom option list |
| prefix  | -                  |
