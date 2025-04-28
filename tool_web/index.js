// electron专用
// require("./webview_start")


require("./sleep.js")

require("./fs_base64_compress.js")
require("./fs_read_file_to_base64.js")
require("./fs_img_url_to_base64.js")
require("./msg_error.js")
require("./msg_success.js")
require("./pinyin_zh.js")
require("./cookie_arr_to_str.js")
require("./Form_check")
require("./url_decode")
require("./url_parse")


require("./config_axios_api")
require("./config_vue_pinia")
require("./config_vue_pinia_BUS")
require("./config_vue_pinia_share")
require("./config_vue_globalProperties")




// require("./ICON/ICON.js")

globalThis.dayjs = require("dayjs")
globalThis.jq = require("jquery")
globalThis._ = require("lodash")







console.log(`
经常用函数 ==================================
jq,lodash,sleep,msg_error,msg_success,axios_create

不常用函数 ==================================
s_base64_compress,fs_read_file_to_base64,fs_img_url_to_base64,pinyin_zh


在线json格式工具 ============================
https://www.bejson.com/#google_vignette



图表库 ======================================
https://icons.getbootstrap.com/?q=sear#usage

`)