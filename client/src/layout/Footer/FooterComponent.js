import React, { memo } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: 'center'}}>
      ©2021 created by
      Ernst-21
    </Footer>
  );
};

export default memo(FooterComponent);
