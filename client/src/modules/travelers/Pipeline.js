import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { list } from '../agent/api-agent';
import { List, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Pipeline = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className='pipeline-container'>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={item => (
          <Link to={'/users/' + item._id}>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size={55} src={item.pic} icon={<UserOutlined />} />}
              />
              <Title level={4}>{item.name}</Title>
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};

export default Pipeline;
