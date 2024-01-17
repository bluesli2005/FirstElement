import { pick } from './utils.js'

export default class Column {
  constructor(columnComponent) {
    const properties = pick(columnComponent, [
      'show',
      'label',
      'width',
      'sortKey',
      'sortable',
      'hidden',
      'formatter',
      'cellClass',
      'headerClass',
      'colspan',
      'colspanDisplay',
    ])

    for (const property in properties) {
      this[property] = columnComponent[property]
    }

    this.template = columnComponent.$scopedSlots.default
  }

  isSortable() {
    return this.sortable
  }

  getSortPredicate(sortOrder) {
    const sortFieldName = this.getSortFieldName()

    return (row1, row2) => {
      const value1 = row1.getSortableValue(sortFieldName)
      const value2 = row2.getSortableValue(sortFieldName)

      if (sortOrder === 'desc') {
        return value2.localeCompare(value1)
      }

      return value1.localeCompare(value2)
    }
  }

  getSortFieldName() {
    return this.show
  }
}
