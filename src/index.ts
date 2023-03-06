import React from 'react'
import ReactDOM from 'react-dom'
import SideDrawer from './drawer'
import '../types'
import { initCommand } from './command'
import { renderTargetInSidedrawer } from './utils'

const onClick = (e: MouseEvent) => {
  // will not do the sidebar preview if user presses the ctrl key, meta key or shift key
  if (e.ctrlKey || e.metaKey || e.shiftKey) {
    return
  }

  if (!(e.target as HTMLElement).classList.contains('rm-alias--external')) {
    return
  }


  const url = (e.target as HTMLAnchorElement).href
  const title = (e.target as HTMLAnchorElement).textContent
  renderTargetInSidedrawer(url, title)

  e.preventDefault()
  e.stopPropagation()
}



function onload() {
  initCommand()
  document.querySelector('.roam-article').addEventListener('click', onClick, false)
}

function onunload() {
  document.querySelector('.roam-article').removeEventListener('click', onClick, false)
}

export default {
  onload: onload,
  onunload: onunload,
}