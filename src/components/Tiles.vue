<script>
import chunk from 'lodash/chunk'
import { h } from 'vue'

export default {
  name: 'Tiles',
  props: {
    maxPerRow: {
      type: Number,
      default: 5
    }
  },
  methods: {
    renderAncestor (elements) {
      return h(
        'div',
        { class: 'tile is-ancestor' },
        elements.map((element) => {
          return h('div', { class: 'tile is-parent' }, [
            element
          ])
        })
      )
    }
  },
  render () {
    if (this.$slots.default().length <= this.maxPerRow) {
      return this.renderAncestor(this.$slots.default())
    } else {
      return h(
        'div',
        chunk(this.$slots.default(), this.maxPerRow).map((group) => {
          return this.renderAncestor(group)
        })
      )
    }
  }
}
</script>
