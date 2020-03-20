import React from 'react'
import { Modal, Form, Input } from 'antd'
import { newId } from '../../tools/guid';
import SearchSelect from './searchSelect';

class NewMeaningModal extends React.Component {
    formRef = React.createRef();
    onFinish = () => {
        this.formRef.current.validateFields().then(values => {
            values.Id = newId();
            console.log(values);
            this.formRef.current.resetFields();
            this.props.onFinish(values);
        }).catch(e => {
            console.log(e);
        });
    };
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    render() {
        return (
            <Modal visible={this.props.visible}
                onOk={this.onFinish}
                onCancel={this.props.onCancel}
                estroyOnClose={true}
                okText='确定'
                cancelText='取消'
                title='新增单词释义'>
                <Form ref={this.formRef} name='create-meaning' {...this.layout}>
                    <Form.Item label='词性' name='Part'
                        rules={
                            [
                                {
                                    pattern: /^[a-zA-Z-']*$/,
                                    message: "词性只能包含字母、-"
                                }
                            ]
                        }>
                        <SearchSelect placeholder='请选择词性'
                            url='/api/Part/Key/List'
                            onSelect={v => this.formRef.current.setFieldsValue({ Part: v })}
                        >
                        </SearchSelect>
                    </Form.Item>
                    <Form.Item label='释义' name='Meaning'
                        rules={
                            [
                                {
                                    required: true,
                                    message: '请输入释义'
                                }
                            ]
                        }>
                        <Input placeholder='请输入释义'></Input>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
export default NewMeaningModal
