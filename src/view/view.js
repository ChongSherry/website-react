import React from 'react';
import { connect, Provider } from 'react-redux';
import { store } from '../redux/store';
import { 
  Layout,Breadcrumb,Icon
 } from 'antd';


import Nav from './nav.js';
//登录弹窗
import LoginModal from './loginModal.js';
import loginState from '../base/loginState';
import actionTypes from '../redux/actionTypes';


const { Header, Sider, Content } = Layout;

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


 class MainView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      collapsed: props.state.getIn(["view", "collapsed"]),
      isLogin: props.state.getIn(["view", "isLogin"])
    };
  }

  componentDidMount() {
    const token = loginState.get();
    if (token) {
      //成功
      this.props.dispatch(actionTypes.create(actionTypes.SET_LOGIN_STATE, true));
    } else {
      //失败
      this.props.dispatch(actionTypes.create(actionTypes.SET_LOGIN_STATE, false));
    }
  }

  componentDidUpdate() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      collapsed: nextProps.state.getIn(["view", "collapsed"]),
      isLogin: nextProps.state.getIn(["view", "isLogin"])
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        
        <Sider
            trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" >
              <span className='logo_title'>react项目</span>
          </div>
        
          {/*以上是导航标题部分*/}
          <Nav/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
              <Breadcrumb.Item>网站配置</Breadcrumb.Item>
              <Breadcrumb.Item>网站信息设置</Breadcrumb.Item>
            </Breadcrumb>
            {
                this.props.children
            }
          </Content>
          
        </Layout>
       
           <LoginModal show={!this.state.isLogin} /> 
      </Layout>
     
    );
  }
}
export default connect(state => {
  return { state };
})(MainView);
