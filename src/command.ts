import { renderTargetInSidedrawer } from './utils'

const command_label_prefix = 'preview: '
const command_label_preview_bing = command_label_prefix + 'bing'
const command_label_preview_douyin = command_label_prefix + 'douyin'
const command_label_prefix_tiktok = command_label_prefix + 'tiktok'
const command_label_prefix_toutiao = command_label_prefix + 'toutiao'
const command_label_prefix_quora = command_label_prefix + 'https://www.quora.com/'
const command_label_prefix_amazon = command_label_prefix + 'amazon'
const command_label_prefix_youtube = command_label_prefix + 'youtube'
const command_label_prefix_reddit = command_label_prefix + 'reddit'

const command_list = [{
  name: command_label_preview_bing,
  url: 'https://www.bing.com',
  title: 'Bing'
}]


const initCommand = () => {
  for (let command of command_list) {
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      "label": command.name,
      "callback": () => {
        console.log(command.name)
        renderTargetInSidedrawer(command.url, command.title)
        configIframe()
      }
    })
  }
}

// Prevent the link from opening in a new window
function configIframe() {
  var links = document.querySelectorAll('iframe a')
  // Loop through the links
  links.forEach(function (link) {
    link.setAttribute('target', '_self')
  })
}

export { initCommand }