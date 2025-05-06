// dialog.jsx
import { h, render, reactive, ref, defineComponent } from 'vue'
import { ElDialog, ElButton } from 'element-plus'

let container = null
let show = $ref(false)


const depart_edit_dialog = defineComponent({
  props: { title: { type: String, default: '' }, that: { type: Object, default: () => ({}) } },
  setup(props, ctx) {
    ctx.expose(show)


    console.log('props:', props)
    return () => (
      <ElDialog v-model={show} title="111" width="30%">
        {/* <div>{props.content}</div> */}
        222222
      </ElDialog>
    )
  }
})


class AAA {
  constructor(show) {
    // this.show = show
    this.container = null
  }
  open(props) {
    if (!this.container) {
      this.container = document.createElement('div')
      document.body.appendChild(this.container)
      render(h(depart_edit_dialog, props), this.container)
    }
    // this.show = true
    show = true
  }
}

export default function open(props) {
  let aaa = new AAA(show)
  aaa.open(props)
}




// export default function open(props) {
//   if (!container) {
//     container = document.createElement('div')
//     document.body.appendChild(container)
//     render(h(depart_edit_dialog, props), container)
//   }
//   show = true
// }




