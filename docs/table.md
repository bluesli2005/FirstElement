# fg-table

## Properties

| Props       | Type   | Default | Description                                              |
| :---------- | :----- | :------ | :------------------------------------------------------- |
| data        | Array  | `[]`    | `[{name: '', birthday: '', text: '', ...}, {}, {} ....]` |
| table-class | string | ``      | set table's class                                        |
| thead-class | string | ``      | set table thead's class                                  |
| tbody-class | string | ``      | set table tbody's class                                  |

## Events

| Name      | Parameters              | Description    |
| :-------- | :---------------------- | :------------- |
| row-click | (src: string, e: Event) | click this row |

# fg-table-column

## Properties

| Props           | Type     | Default | Description                           |
| :-------------- | :------- | :------ | :------------------------------------ |
| show            | string   | ``      | set th title                          |
| label           | string   | ``      | set label as data properties          |
| width           | string   | ``      | set th width `50px or 15%`            |
| tbody-class     | string   | ``      | set table tbody's class               |
| formatter       | function | ``      | format data in one colume             |
| hidden          | boolean  | `false` | set this column show or hidden        |
| cell-class      | string   | ``      | `left/center/right` or set `td` class |
| header-class    | string   | ``      | set `th` class                        |
| colspan         | string   | `1`     | set `td` colspan                      |
| colspan-display | boolean  | `true`  | set `td` display or not               |
