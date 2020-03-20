import React from 'react'
import { Input, Form, Button, Modal, Card, Table, Row, Col, message } from 'antd';
import { newId } from '../../tools/guid';
import AutoSearch from './autoSearch';
import NewMeaningModal from './newMeaningModal';
import { createWord, getParaphrases, editWord } from '../../services/wordService';
const submitId = newId();
const submitContinueId = newId();



class NewWordModel extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            parapharses: [],
            showMeaning: false,
            dataSource: [],
            loaded: false
        }
    }
    componentDidUpdate() {
        if (this.props.word.Id && !this.state.loaded) {
            getParaphrases(this.props.word.Id).then(res => {
                this.setState({ dataSource: res.Data, loaded: true });
            });
        }
    }
    dispatch = (type) => {
        const actions = { Create: createWord, Update: editWord };
        return actions[type];
    }
    onFinish = () => {
        this.submit(() => this.props.onCancel());
    };
    onFinishContinue = () => {
        this.submit();
    };
    submit = (callback) => {
        this.formRef.current.validateFields().then(values => {
            let model = {
                Word: Object.assign(this.props.word, values),
                Paraphrases: this.state.dataSource
            }
            const action = this.dispatch(this.props.actionType);
            action(model).then(res => {
                if (!res.IsSuccess) {
                    message.error(res.Message);
                    return;
                }
                this.formRef.current.resetFields();
                this.setState({ dataSource: [] });
                message.success(res.Message);
                callback && callback();
            });
        }).catch(err => {
            console.log(err);
        });
    }
    onCancel = () => {
        this.setState({ loaded: false, dataSource: [] });
        this.props.onCancel();
    }
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    render() {
        const columns = [
            {
                key: "Id",
                title: '序号',
                width: 100,
                render: (r, t, idx) => idx + 1
            }, {
                title: '词性',
                dataIndex: 'Part'
            }, {
                title: '释义',
                dataIndex: 'Meaning',
            }
        ];
        return (
            <Modal title='新建单词'
                visible={this.props.visible}
                onCancel={this.onCancel}
                destroyOnClose={true}
                width={"50%"}
                footer={[
                    <Button key={submitId} type='primary' onClick={this.onFinish}>提交</Button>,
                    <Button key={submitContinueId} type='primary' onClick={this.onFinishContinue}>提交并继续</Button>
                ]}>
                <Form name='create-word'
                    {...this.layout}
                    initialValues={this.props.word}
                    ref={this.formRef}>
                    <Row>
                        <Col span={12}>
                            <Form.Item label='单词' name='Value'
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: '请输入单词'
                                        },
                                        {
                                            pattern: /^[a-zA-Z-']*$/,
                                            message: "单词只能包含字母、-,'"
                                        }
                                    ]
                                }>
                                <Input placeholder='请输入单词'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='前缀' name='Prefix'
                                rules={
                                    [
                                        {
                                            pattern: /^[a-zA-Z-']*$/,
                                            message: "前缀只能包含字母、-"
                                        }
                                    ]
                                }>
                                <AutoSearch placeholder='请选择前缀'
                                    url='/api/Prefix/Key/List'
                                    onSelect={v => this.formRef.current.setFieldsValue({ Prefix: v })}></AutoSearch>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label='后缀' name='Suffix'
                                rules={
                                    [
                                        {
                                            pattern: /^[a-zA-Z-']*$/,
                                            message: "后缀只能包含字母、-"
                                        }
                                    ]
                                }>
                                <AutoSearch placeholder='请选择后缀'
                                    url='/api/Suffix/Key/List'
                                    onSelect={v => this.formRef.current.setFieldsValue({ Suffix: v })}></AutoSearch>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='词根' name='Stem'
                                rules={
                                    [
                                        {
                                            pattern: /^[a-zA-Z-']*$/,
                                            message: "词根只能包含字母、-"
                                        }
                                    ]
                                }>
                                <AutoSearch placeholder='请选择词根'
                                    url='/api/Stem/Key/List'
                                    onSelect={v => this.formRef.current.setFieldsValue({ Stem: v })}></AutoSearch>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} colSpan={2}>
                            <Card title='释义' size='small' extra={
                                <Button type='primary' size='small' onClick={() => this.setState({ showMeaning: true })}>新增</Button>}>
                                <Table
                                    rowKey={r => r.Id}
                                    bordered
                                    size='small'
                                    columns={columns}
                                    dataSource={this.state.dataSource}
                                    pagination={false}>
                                </Table>
                            </Card>
                            <NewMeaningModal
                                visible={this.state.showMeaning}
                                onCancel={() => this.setState({ showMeaning: false })}
                                onClick={() => this.setState({ showMeaning: true })}
                                onFinish={v => {
                                    let data = [];
                                    this.state.dataSource.map(f => data.push(f));
                                    data.push(v);
                                    this.setState({ dataSource: data, showMeaning: false });
                                }}>
                            </NewMeaningModal>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default NewWordModel;