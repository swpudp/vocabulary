import React, { Component } from 'react'
import { Card, Table, Button, Popconfirm, message, Row, Col } from 'antd';
import { getPaging, deleteWord } from '../../services/wordService';
import NewWordModel from './createModel';
import { Create, Update } from './actionType';

class WordIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                current: 1,
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: total => `共${total}条`
            },
            dataSource: [],
            isNew: false,
            word: {},
            actionType: null
        };
    }

    componentDidMount() {
        this.fetctPaging();
    }
    fetctPaging = () => {
        const pagination = { ...this.state.pagination }
        getPaging(pagination).then(res => {
            pagination.total = res.Total;
            this.setState({ dataSource: res.Data, pagination });
        });
    }
    onTableChange = (pagination, filters, sorter) => {
        this.setState({ pagination: pagination }, () => this.fetctPaging())
    }
    onConfirm = e => {
        deleteWord(e).then(res => {
            if (res.IsSuccess) {
                message.success(res.Message);
                this.fetctPaging();
                return;
            }
            message.error(res.Message);
        });
    }
    onCancel = e => {
        message.error("已取消删除");
    }
    createWord = () => {
        this.setState({ isNew: true, actionType: Create });
    }
    editWord = (v) => {
        this.setState({ word: v, isNew: true, actionType: Update });
    }
    closeWordModal = () => {
        this.setState({ isNew: false, word: {}, actionType: null });
    }
    render() {
        const columns = [
            {
                key: "Id",
                title: '序号',
                width: 100,
                render: (r, t, idx) => idx + 1
            }, {
                title: '内容',
                dataIndex: 'Value'
            }, {
                title: '前缀',
                dataIndex: 'Prefix'
            }, {
                title: '后缀',
                dataIndex: 'Suffix'
            }, {
                title: '词根',
                dataIndex: 'Stem'
            }, {
                title: '操作',
                width: 150,
                render: (v, r) => {
                    return <div>
                        <Button type='primary' size='small' onClick={() => this.editWord(r)}>修改</Button>
                        <Popconfirm
                            title="确定要删除此单词吗?"
                            onConfirm={() => this.onConfirm(r)}
                            onCancel={this.onCancel}
                            okText="是"
                            cancelText="否"
                        >
                            <Button type='danger' size='small' style={{ marginLeft: '1em' }} >删除</Button>
                        </Popconfirm>
                    </div>
                }
            }
        ]
        return (
            <Row>
                <Col span={24}>
                    <Card title="单词列表" extra={
                        <Button type='primary' size='small' onClick={this.createWord}>新增</Button>
                    }>
                        <Table rowKey={r => r.Id}
                            columns={columns}
                            bordered
                            size='middle'
                            dataSource={this.state.dataSource}
                            onChange={this.onTableChange}
                            pagination={this.state.pagination}
                        ></Table>
                    </Card>
                    <NewWordModel visible={this.state.isNew}
                        word={this.state.word}
                        actionType={this.state.actionType}
                        onCancel={this.closeWordModal}>
                    </NewWordModel>
                </Col>
            </Row>
        );
    }
}
export default WordIndex
