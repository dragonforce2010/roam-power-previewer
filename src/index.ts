import React from 'react'
import ReactDOM from 'react-dom'
import SideDrawer from './drawer'
import '../types'
import { initCommand } from './command'
import { renderTargetInSidedrawer } from './utils'
import './index.css'
import { OnloadArgs } from '../types'

const onClick = (e: MouseEvent) => {
  // will not do the sidebar preview if user presses the ctrl key, meta key or shift key
  if (e.ctrlKey || e.metaKey || e.shiftKey) {
    return
  }


  const targetElement = e.target as HTMLElement

  if (!targetElement.classList.contains('rm-alias--external') && targetElement.tagName.toLowerCase() != 'a') {
    return
  }

  const url = (e.target as HTMLAnchorElement).href
  if (!url ||
    url.startsWith('https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com') ||
    url.startsWith('https://roamresearch.com')) {
    return
  }

  const title = (e.target as HTMLAnchorElement).textContent
  renderTargetInSidedrawer(url, title)

  e.preventDefault()
  e.stopPropagation()
}



function onload({ extensionAPI }: OnloadArgs) {
  initCommand(extensionAPI)
  document.querySelector('.roam-app').addEventListener('click', onClick, false)
}

function onunload() {
  document.querySelector('.roam-app').removeEventListener('click', onClick, false)
}

export default {
  onload: onload,
  onunload: onunload,
}