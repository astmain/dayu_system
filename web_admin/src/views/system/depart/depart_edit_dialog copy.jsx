// dialog.jsx
import { h, render, reactive, ref, defineComponent } from 'vue'
import { ElDialog, ElButton } from 'element-plus'

let container = null
let show = $ref(false)
const options = reactive({
  title: '',
  content: '',
  confirmText: '确定',
  cancelText: '取消'
})


const depart_edit_dialog = defineComponent(() => {

  return () => (
    <ElDialog v-model={show} title={options.title} width="30%">
      111111111111
    </ElDialog>
  )
})

export default function open(opts) {
  if (!container) {
    container = document.createElement('div')
    document.body.appendChild(container)
    render(h(depart_edit_dialog), container)
  }

  Object.assign(options, opts)
  show = true
}
