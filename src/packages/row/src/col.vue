<script>
const ATTRS = ['span', 'offset', 'pull', 'push']
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
export default {
  name: 'FgCol',
  props: {
    span: {
      type: [String, Number],
      default: 24,
    },
    tag: {
      type: String,
      default: 'div',
    },
    /* eslint-disable */
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
  },
  computed: {
    gutter() {
      let parent = this.$parent
      while (parent && parent.$options.name !== 'FgRow') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    },
  },
  render(h) {
    const classList = []
    const style = {}
    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }

    ATTRS.forEach((prop) => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `fg-col-${prop}-${this[prop]}`
            : `fg-col-${this[prop]}`
        )
      }
    })

    SIZES.forEach((size) => {
      if (typeof this[size] === 'number') {
        classList.push(`fg-col-${size}-${this[size]}`)
      } else if (typeof this[size] === 'object') {
        const props = this[size]
        Object.keys(props).forEach((prop) => {
          classList.push(
            prop !== 'span'
              ? `fg-col-${size}-${prop}-${props[prop]}`
              : `fg-col-${size}-${props[prop]}`
          )
        })
      }
    })

    return h(
      this.tag,
      {
        class: ['fg-col', classList],
        style,
      },
      this.$slots.default
    )
  },
}
</script>

<style lang="scss">
@mixin res($key, $map: $--breakpoints) {
  @if map-has-key($map, $key) {
    @media only screen and #{inspect(map-get($map, $key))} {
      @content;
    }
  } @else {
    @warn "Undefeined points: `#{$map}`";
  }
}

.fg-col {
}
[class*='fg-col-'] {
  float: left;
  box-sizing: border-box;
}

.fg-col-0 {
  display: none;
}

@for $i from 0 through 24 {
  .fg-col-#{$i} {
    width: (1 / 24 * $i * 100) * 1%;
  }

  .fg-col-offset-#{$i} {
    margin-left: (1 / 24 * $i * 100) * 1%;
  }

  .fg-col-pull-#{$i} {
    position: relative;
    right: (1 / 24 * $i * 100) * 1%;
  }

  .fg-col-push-#{$i} {
    position: relative;
    left: (1 / 24 * $i * 100) * 1%;
  }
}

@include res(xs) {
  .fg-col-xs-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fg-col-xs-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-xs-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-xs-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-xs-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}

@include res(sm) {
  .fg-col-sm-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fg-col-sm-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-sm-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-sm-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-sm-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}

@include res(md) {
  .fg-col-md-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fg-col-md-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-md-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-md-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-md-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}

@include res(lg) {
  .fg-col-lg-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fg-col-lg-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-lg-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-lg-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-lg-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}

@include res(xl) {
  .fg-col-xl-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fg-col-xl-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-xl-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-xl-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fg-col-xl-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
</style>
