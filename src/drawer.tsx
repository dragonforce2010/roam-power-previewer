import { Spinner } from '@blueprintjs/core'
import { Button, Drawer, Space, notification } from 'antd';
import React, { useState, useEffect } from 'react'
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import ReactDom from 'react-dom'
import ErrorPage from './error';
import src from '.';
import Loading from './loading';
import { ArrowsAltOutlined, CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, LinkOutlined, ShrinkOutlined } from '@ant-design/icons';

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
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [error, setError] = useState(false)
  const iframeRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [width, setWidth] = useState("80%")
  const [drawerTitle, setDrawerTitle] = useState(title)
  // const [showLinkCopiedAlert, setShowLinkCopiedAlert] = useState(false)
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Link copied!',
      className: 'custom-class',
      duration: 2,
      type: 'success',
      style: {
        width: 300,
      },
    });
  };

  const onClose = () => {
    setIsOpen(false)
  }


  function handleError(error: any) {
    console.log('iframe error', error)
    setError(true)
  }

  const handleLoaded = () => {
    setLoading(false)
  }

  useEffect(() => {
    const checkIfSupportIframe = async (url: string) => {
      const response = await fetch('https://roam.12320.com/staging/powerlink/xframe-options', {
        method: 'post',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          url: url
        })
      })

      console.log(response)

      if (response.status !== 200) {
        setError(false)
        return
      }

      const data: any = await response.json()
      console.log('data', data)

      const xFrameOption = data?.xFrameOption || '';
      const contentSecurityPolicy = data?.contentSecurityPolicy || '';
      const websiteTitle = data?.websiteTitle || '';
      if (websiteTitle) setDrawerTitle(websiteTitle)

      console.log('xFrameOptions', xFrameOption, 'contentSecurityPolicy', contentSecurityPolicy)
      console.log(`xFrameOption?.toLowerCase() === 'DENY'.toLowerCase() || xFrameOption?.toLowerCase() === 'SAMEORIGIN'.toLowerCase()`, xFrameOption?.toLowerCase() === 'DENY'.toLowerCase() || xFrameOption?.toLowerCase() === 'SAMEORIGIN'.toLowerCase())
      if (xFrameOption?.toLowerCase() === 'DENY'.toLowerCase() || xFrameOption?.toLowerCase() === 'SAMEORIGIN'.toLowerCase()) {
        console.log('iframe is not allowed by target website');
        setError(true)
        setLoading(false)
      } else if (contentSecurityPolicy && !contentSecurityPolicy.toLowerCase().includes('frame-ancestors')) {
        console.log('iframe is not allowed by target website');
        setError(true)
        setLoading(false)
      } else {
        setError(false)
        setLoading(false)
      }
    }
    checkIfSupportIframe(url)
  })

  const copyToClipboard = (contentTobeCopied: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = contentTobeCopied;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    // setShowLinkCopiedAlert(true)
    openNotification()
  }

  return <>
    {contextHolder}
    <Drawer
      title={drawerTitle.length > 50 ? drawerTitle.substring(0, 50) + '...' : drawerTitle}
      open={isOpen}
      onClose={onClose}
      width={width}
      extra={
        <Space>
          <LinkOutlined onClick={() => copyToClipboard(url)} />
          {width == "100%" ?
            <FullscreenExitOutlined onClick={() => setWidth("50%")} /> :
            <FullscreenOutlined onClick={() => setWidth("100%")} />}
          {width === "50%" ?
            <ArrowsAltOutlined onClick={() => setWidth("80%")} /> :
            <ShrinkOutlined onClick={() => setWidth("50%")} />}
          <CloseOutlined onClick={onClose} />
          {/* <Button type="primary" onClick={onClose}>
          Close
        </Button> */}
        </Space>
      }

    >
      {loading && <Loading></Loading>}

      <div style={{ height: "100%", width: "100%" }}>
        {error ? (<ErrorPage onClickHander={() => setIsOpen(false)} />) : (<iframe
          id='iframe'
          ref={iframeRef}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          src={url}
          style={{ height: "100%", width: "100%", border: "none" }}
          onLoad={handleLoaded}
          onError={handleError}
        ></iframe>)}
      </div>
    </Drawer>
  </>

}

export default SideDrawer