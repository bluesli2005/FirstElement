# v-model

```html
<template>
    <dl>
        <dt>{{message}}</dt>
        <dd>
            <input value="message" @input="e => message = e.target.value">
        </dd>
    </dl>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            message: this.value,
        }
    },
    watch: {
        value(val) {
            if (this.message !== val) {
                this.message = val
            }
        },
        message(val) {
            this.$emit('input', val)
        },
    },
}
</script>
```