import { Drawer } from '@blueprintjs/core'
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

interface MyDrawerProps {
  title: string;
  url: string;
  size?: string;
  height?: string;
  width?: string;
}
const SideDrawer: React.FC<MyDrawerProps> = ({
  title,
  url,
  size = "80%",
  height = "100%",
  width = "100%"
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [error, setError] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener("securitypolicyviolation", (e) => {
      console.log('securitypolicyviolation:', e.blockedURI);
      console.log('securitypolicyviolation:', e.violatedDirective);
      console.log('securitypolicyviolation:', e.originalPolicy);
      setError(true)
    });
  }, [])

  return <Drawer
    title={title}
    isCloseButtonShown={false}
    isOpen={isOpen}
    onClose={onClose}
    size={size}
  >
    <div style={{ height: "100%", width: "100%" }}>
      {error && <div>目标页面不支持iframe加载</div>}
      {!error && <iframe src={url} style={{ height: "100%", width: "100%", border: "none" }} onError={(err) => {
        setError(true)
        console.log('onerror:', err)
      }}></iframe>}
    </div>
  </Drawer>
}

export default SideDrawer