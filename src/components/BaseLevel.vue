<script>
import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLevel',
  props: {
    mobile: Boolean,
    type: {
      type: String,
      default: 'justify-between',
    },
  },
  render() {
    const parentClass = [this.type, 'items-center']

    const parentMobileClass = ['flex']

    const parentBaseClass = ['block', 'md:flex']

    const childBaseClass = ['flex', 'items-center', 'justify-center']

    return h(
      'div',
      {
        class: parentClass.concat(this.mobile ? parentMobileClass : parentBaseClass),
      },
      this.$slots.default().map((element, index) => {
        const childClass =
          !this.mobile && this.$slots.default().length > index + 1
            ? childBaseClass.concat(['mb-6', 'md:mb-0'])
            : childBaseClass

        return h('div', { class: childClass }, [element])
      }),
    )
  },
})
</script>
