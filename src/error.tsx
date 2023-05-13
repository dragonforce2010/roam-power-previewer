import { Button, Result } from 'antd';
import React from 'react';

interface Props {
  onClickHander: (val: any) => void;
}

const App: React.FC<Props> = ({ onClickHander }) => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, you are not able to access the target website via iframe due the secuirty policy set by the target"
    extra={<Button type="primary" onClick={onClickHander}>Go Back</Button>}
  />
);

export default App;