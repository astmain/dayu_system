function callback(props, ctx) {
  ctx.expose({
    open: async ({ data, that }) => {
      console.log('data:', data)
      console.log('that:', that)
      show = true
    },
  })


  let show = $ref(false)

  console.log('show:', show)
  return () => {
    return <div>
      <ElDialog v-model={show} title="详情-角色" width="600px" draggable>111111111</ElDialog>
    </div>
  }

}




export default function menu_add_parent_dialog({ data, that }) {
  vue_open('role_add_dialog', { data, that, callback: callback })
}