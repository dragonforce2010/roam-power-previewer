import React from 'react'
import { Spinner } from '@blueprintjs/core';


const Loading: React.FC = () => {
  return <>
    <div className='cover'>
      <Spinner className='loading'
        style={{ marginTop: 200 }}
        intent={'success'}
        size={120}
        speed={20} />
    </div>
  </>
}

export default Loading