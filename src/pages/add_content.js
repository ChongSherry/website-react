import React from 'react';
import ajax from '../base/ajax';

import SubPanel from '../component/sub_view_panel';
import {
    Form, Input, DatePicker, Col, Spin, Button, Select, Radio,
    Upload, message, Icon
} from 'antd';
import UE from '../component/ueditor';
import moment from 'moment';
import token from '../base/loginState';

import { browserHistory, hashHistory } from 'react-router';

import { validate, validateState, validation, validationResult } from '../base/validate';


const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
    },
};

const timeFormat = "YYYY-MM-DD HH:mm:ss";
const ueditor = window.UE;
export default class extends React.Component {
    constructor(props) {
        super();
        this.state = this.getInitalState();

        this.vResult = new validationResult([
            "sort_id",
            "title",
            // "subTitle",
            // "titleImage",
            // "contentText",
            // "author",
            // "origin",
            // "keyword",
            // show,
            // draft,
            "beginTime",
            // isComment,
            // isTop
        ]);
    }

    getInitalState() {
        return {//组件着态
            editMod: false,
            loading: false,
            submiting: false,
            sort_list: [],
            //fromData
            content_id: "", //编辑时有效
            sort_id: "", //分类ID
            title: "", //标题
            subTitle: "", //副标题
            titleImage: "", //标题图片
            contentText: "",//内容
            // createTime: "", //生成时间
            author: "", //做者
            origin: "", //来源
            keyword: "",  //关键词
            show: true, //是否显示
            draft: false, //是否是草稿
            beginTime: new Date(Date.now()), //文章开始时羊（生效时间）
            //manager: { type: String }, //发布人
            isComment: false, //文章是否可评论
            isTop: false
        }
    }
    checkMode(props) {
        if (props.location.pathname == "/content_edit") {
            let content_id = props.location.state.content_id;
            this.setState({
                editMod: true,
                content_id
            });
        } else {
            if (this.state.editMod) {
                this.setState(this.getInitalState());
                this.handler_get_sort();
            }
        }
    }

    componentDidMount() {
        this.handler_get_sort();
        this.checkMode(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.checkMode(nextProps);
    }


    handler_get_sort() {
        this.setState({ loading: true });
        ajax.get(
            ajax.url(ajax.ports.content.content_sort.list)
        ).then((xhr) => {
            this.setState({ sort_list: xhr.response.list });
        }).catch((error) => {

        }).complete(() => {
            this.setState({ loading: false });
        })
    }

    handler_getContentText() {
        // this.setState({ contentText: ueditor.getEditor("content_text").getContent() });
        this.state.contentText = ueditor.getEditor("content_text").getContent() || ""
    }

    handler_submit() {
        this.handler_getContentText();
        if (this.vResult.isValid() && this.state.contentText.length > 0) {
            //取得data
            let formData = Object.assign({}, this.state);
            delete formData.loading;
            delete formData.submiting;
            delete formData.sort_list;

            //formData.contentText = ueditor.getEditor("content_text").getContent();

            this.setState({ submiting: true });
            ajax.post(
                ajax.url(ajax.ports.content.create),
                formData
            ).then((xhr) => {
                //跳转到内容列表
                hashHistory.push("/content_list")
            }).complete(() => {
                this.setState({ submiting: false });
            });
        } else {
            if(this.state.contentText.length == 0){
                message.error("文章必需输入内容");
            }else{
                message.error("表单中有未完成的项");
            }            
        }
    }

    render() {
        return (
            <SubPanel>
                <Spin spinning={this.state.loading}>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="所属分类"
                            hasFeedback
                            validateStatus={
                                validation(this.state.sort_id, validate.requre, true, this.vResult.sort_id)
                            }
                            help="必需选择标题"

                        >
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="输入分类"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                value={this.state.sort_id}
                                onChange={v => this.setState({ sort_id: v })}
                            >
                                {
                                    this.state.sort_list.map((v, k) => {
                                        return (
                                            <Option value={v._id}>{v.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="标题"
                            hasFeedback
                            validateStatus={
                                validation(this.state.title, validate.requre, true, this.vResult.title)
                            }
                            help="内容必需输入标题"
                        >
                            <Input placeholder="请输入标题"
                                value={this.state.title}
                                onChange={e => this.setState({ title: e.target.value })}
                                style={{ maxWidth: 500 }} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="子标题"
                            hasFeedback

                        >
                            <Input placeholder="请输入子标题"
                                value={this.state.subTitle}
                                onChange={e => this.setState({ subTitle: e.target.value })}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="关键字"
                            hasFeedback

                        >
                            <Input
                                value={this.state.keyword}
                                onChange={e => this.setState({ keyword: e.target.value })}
                                placeholder={'请输入网站关键字，并用","分割'} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="作者"
                            hasFeedback

                        >
                            <Input placeholder="请输入作者名字"
                                value={this.state.author}
                                onChange={e => this.setState({ author: e.target.value })}
                                style={{ maxWidth: 200 }} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="来源"
                            hasFeedback
                            validateStatus=""
                        >
                            <Input placeholder="输入来源"
                                value={this.state.origin}
                                onChange={e => this.setState({ origin: e.target.value })}
                                style={{ maxWidth: 200 }} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="生效时间"
                            hasFeedback
                            validateStatus={
                                validation(this.state.beginTime, validate.requre, true, this.vResult.beginTime)
                            }
                        >
                            <DatePicker
                                showTime
                                placeholder="请选择生效日期和时间"
                                defaultValue={moment(this.state.beginTime, timeFormat)}
                                format={timeFormat}
                                onChange={(d, str) => this.setState({ beginTime: str })}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="可以评论"
                            hasFeedback
                            validateStatus=""
                        >
                            <RadioGroup
                                value={this.state.isComment}
                            >
                                <Radio value={false}>否</Radio>
                                <Radio value={true}>是</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="封面图片"
                            hasFeedback
                            validateStatus=""
                        >
                            <Upload
                                name={"file"}
                                headers={
                                    { token: token.get() }
                                }
                                showUploadList={false}
                                action={ajax.url(ajax.ports.base.upload)}
                                onChange={
                                    (info) => {
                                        if (info.file.status !== 'uploading') {

                                        }
                                        if (info.file.status === 'done') {
                                            message.success(`${info.file.name}上传完成`);
                                            this.setState({ titleImage: info.file.response.fileName });
                                        } else if (info.file.status === 'error') {
                                            message.error(`${info.file.name} file upload failed.`);
                                        }
                                    }
                                }
                            >
                                {
                                    this.state.titleImage ?
                                        <img src={`${ajax.url("/uploadfile/")}${this.state.titleImage}`} alt="" className="uploadedOneFile" /> :
                                        <Icon type="plus" className="selectOneFile" />
                                }

                            </Upload>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="内容"
                            hasFeedback
                        >
                            <UE id="content_text" height={500} />
                        </FormItem>

                        <FormItem >
                            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 14, offset: 2 }}>
                                <Button type="primary" htmlType="submit" loading={this.state.submiting}
                                    onClick={this.handler_submit.bind(this)}
                                >保存</Button>
                                &emsp;
                            <Button type="dashed" htmlType="submit" loading={this.state.submiting}>保存为草稿</Button>
                                &emsp;
                            <Button type="danger" htmlType="submit" loading={this.state.submiting}>重置</Button>
                            </Col>
                        </FormItem>
                    </Form>
                </Spin>
            </SubPanel >
        );
    }
}