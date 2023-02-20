import React from 'react'
import ReactDOM from 'react-dom'
import SideDrawer from './drawer'

const onClick = (e: MouseEvent) => {
  if (!(e.target as HTMLElement).classList.contains('rm-alias--external')) {
    return
  }

  let root = document.createElement('div')
  const url = (e.target as HTMLAnchorElement).href
  const title = (e.target as HTMLAnchorElement).textContent

  ReactDOM.render(React.createElement(SideDrawer, { title, url }), root)

  document.body.appendChild(root)

  e.preventDefault()
  e.stopPropagation()
}

function onload() {
  document.querySelector('.roam-article').addEventListener('click', onClick, false)
}

function onunload() {
  document.querySelector('.roam-article').removeEventListener('click', onClick, false)
}

export default {
  onload: onload,
  onunload: onunload,
}