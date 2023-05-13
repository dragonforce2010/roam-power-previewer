import React from 'react'
import ReactDOM from 'react-dom'
import SideDrawer from './drawer'
import '../types'
import { initCommand } from './command'
import { renderTargetInSidedrawer } from './utils'
import './index.css'

const onClick = (e: MouseEvent) => {
  // will not do the sidebar preview if user presses the ctrl key, meta key or shift key
  if (e.ctrlKey || e.metaKey || e.shiftKey) {
    return
  }

  console.log(e.target)

  const targetElement = e.target as HTMLElement

  if (!targetElement.classList.contains('rm-alias--external') && targetElement.tagName.toLowerCase() != 'a') {
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