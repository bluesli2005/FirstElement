<script>
export default {
  functional: true,

  props: {
    column: {
      type: Object,
      default: () => {
        return {}
      },
    },
    row: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },

  render(createElement, { props }) {
    const data = {}

    if (props.column.cellClass) {
      data.class = props.column.cellClass
      data.attrs = { colspan: props.column.colspan }
    }
    if (props.column.colspanDisplay) {
      if (props.column.template) {
        return createElement('td', data, props.column.template(props.row.data))
      }
    } else {
      return null
    }

    data.domProps = {}
    data.attrs = { colspan: props.column.colspan }
    data.domProps.innerHTML = props.column.formatter(
      props.row.getValue(props.column.show),
      props.row.data
    )
    if (props.column.colspanDisplay) {
      return createElement('td', data)
    } else {
      return null
    }
  },
}
</script>
