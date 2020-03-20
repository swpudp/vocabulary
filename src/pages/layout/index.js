import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Icon from '@ant-design/icons';
import { authRouters } from '../../routers/routeMap';
import { withRouter } from 'react-router-dom';
import { getItem } from '../../tools/storage';
import { RightOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
const routers = authRouters.filter(t => t.show);
const token = getItem("token");

class Index extends Component {
    isAuthorized() {
        if (token) {
            return true;
        }
        return false;
    }
    componentDidMount() {
        if (!this.isAuthorized()) {
            window.location.href = '/login';
        }
    }
    render() {
        const current = routers.filter(f => f.path === this.props.location.pathname)[0];
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {routers.map(r => {
                                return <Menu.Item key={r.path} onClick={p => this.props.history.push(p.key)}>
                                    <Icon component={r.icon}></Icon>{r.title}
                                </Menu.Item>
                            })}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 10px 10px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><RightOutlined /><span>{current.title}</span></Breadcrumb.Item>
                        </Breadcrumb>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Index)

