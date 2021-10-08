import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import MainRouter from './MainRouter';
import Navbar from './layout/Navbar/Navbar';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Navbar />
        <Content style={{marginTop: 110}}>
          <MainRouter />
        </Content>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
