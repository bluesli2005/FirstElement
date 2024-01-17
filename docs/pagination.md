# fg-pagination

## Properties

| Props          | Type     | Default     | Description                     |
| :------------- | :------- | :---------- | :------------------------------ |
| before-change  | function | `undefined` | -                               |
| hide-page-info | boolean  | `false`     | hide left info                  |
| page-size      | number   | `10`        | page size / sql limit           |
| show-number    | number   | `10`        | show page items                 |
| size           | string   | `medium`    | Optional values: `medium/small` |
| theme          | string   | `white`     | Optional values: `blue/white`   |
| total          | number   | `0`         | data total                      |
| show-page-size | boolean  | `false`     |                                 |
| v-model/value  | number   | `-`         | current page                    |

## Events

| Event Name       | Parameters         | Description |
| :--------------- | :----------------- | :---------- |
| change           | (newPage: number)  | on change   |
| page-size-change | (newLimit: number) | on change   |
