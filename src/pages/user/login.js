import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './user.css';
import { login } from '../../services/userService';

class Login extends Component {
    onFinish(values) {
        login(values);
    }
    render() {
        return (
            <Row align='bottom'>
                <Col span={8}></Col>
                <Col span={8}>
                    <Card title='登录' type='inner'>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="Username"
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                                <a href="/login">注册</a>
                                <a className="login-form-forgot" href="baidu.com">忘记密码</a>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}></Col>
            </Row>

        )
    }
}
export default Login
