import React from 'react';
import {
   Form, Input,Button
   } from 'antd';
const FormItem = Form.Item;

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export default class Forms extends React.Component {
  render(){
      return(
          <Form>
    <FormItem
      {...formItemLayout}
      label="网站名称"
      
    >
      <Input placeholder="请输入网站名称" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="域名"
      
    >
      <Input placeholder="请输入完整域名" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="关键字"
      
    >
      <Input placeholder="请输入网站关键字，并用“/”分割" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="网站简介"
      hasFeedback
      validateStatus="success"
    >
      
    <TextArea placeholder="请输入网站简短说明" autosize={{ minRows: 2, maxRows: 6 }} />
 

    </FormItem>
    <FormItem
      {...formItemLayout}
      label="版权声明"
      hasFeedback
      validateStatus="success"
    >
      <Input placeholder="版权声明" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="备案号"
      hasFeedback
      validateStatus="success"
    >
      <Input placeholder="备案号"  />
    </FormItem>

      <FormItem>
      <div>
    <Button type="primary"  style={{  display:'block',left:'450px' }}>保存</Button>
    
  </div>
    </FormItem>

   
  </Form>
      )
  }
}