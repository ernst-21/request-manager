import React, { useState, useEffect } from 'react';
import auth from './auth-helper';
import { Redirect } from 'react-router-dom';
import { signin } from './api-auth.js';
import { useHttpError } from '../../hooks/http-hook';
import { Form, Input, Button, Card } from 'antd';
import { useMutation } from 'react-query';


const Signin = (props) => {
  const [form] = Form.useForm();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { error, showErrorModal, httpError } = useHttpError();

  const { mutate: signInMutation, isError } = useMutation(
    (user) => signin(user).then((data) => data),
    {
      onSuccess: (data) => {
        if (data && !data.error) {
          auth.authenticate(data, () => {
            setRedirectToReferrer(true);
          });
        } else {
          showErrorModal(data.error);
        }
      }
    }
  );

  useEffect(() => {
    if (error) {
      httpError();
    }
    return () => showErrorModal(null);
  }, [error, httpError, showErrorModal]);

  const onFill = () => {
    form.setFieldsValue({
      email: 'agent@test.com',
      password: 'P4ssword*',
    });
  };

  const clickSubmit = (values) => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    };
    signInMutation(user);
  };

  const { from } = props.location.state || {
    from: {
      pathname: '/users'
    }
  };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  if (isError) {
    return <Redirect to="/info-network-error" />;
  }

  return (
    <div className="form-card-container">
      <Card
        className='form-card'
      >
        <h1>Request Manager</h1>
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true
          }}
          onFinish={clickSubmit}
        >
          <Form.Item
            labelCol={{ span: 24 }}
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]}
          >
            <Input placeholder='Username' size='large' />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password placeholder='Password' size='large'/>
          </Form.Item>
          <Form.Item>
            <Button size='large' className='signin-btn' type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <div className='fillValues-btn' onClick={onFill}><p>Use these credentials to login</p></div>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
