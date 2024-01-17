// import moment from 'moment'
import { get } from './utils.js'

export default class Row {
  constructor(data, columns) {
    this.data = data
    this.columns = columns
  }

  getValue(columnName) {
    return get(this.data, columnName)
  }

  getColumn(columnName) {
    return this.columns.find((column) => column.show === columnName)
  }

  getSortableValue(columnName) {
    const value = this.getValue(columnName)

    if (value === undefined || value === null) {
      return ''
    }

    return value
  }
}
