// dialog.jsx
import { h, render, reactive, ref, defineComponent, createVNode } from 'vue'
import { ElDialog, ElButton } from 'element-plus'

let container = null
const depart_edit_dialog = defineComponent({
  props: { title: { type: String, default: '' }, that: { type: Object, default: () => ({}) } },
  setup(props, ctx) {
    let show = $ref(false)
    ctx.expose({ open: () => { show = true } })
    // ctx.expose({ show: show })


    console.log('props:', props)
    return () => (
      <ElDialog v-model={show} title="111" width="30%">

        222222
      </ElDialog>
    )
  }
})




export default function open(props) {
  document.querySelector(`.aaa`) ? document.querySelector(`.aaa`).remove() : 0
  let container = document.createElement('div')
  container.className = 'aaa'
  document.body.appendChild(container)
  const v_node = createVNode(depart_edit_dialog, props)
  render(v_node, container)
  v_node.component.exposed.open()
  // v_node.component.exposed.show=true
}


