import React from 'react'
import ReactDOM from 'react-dom'
import SideDrawer from './drawer'

function renderTargetInSidedrawer(url: string, title: string) {
  let root = document.createElement('div')

  ReactDOM.render(React.createElement(SideDrawer, { title, url }), root)

  document.body.appendChild(root)
}

export {
  renderTargetInSidedrawer,
}