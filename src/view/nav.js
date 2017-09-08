import React from 'react';
import {
  Menu, Icon
} from 'antd';
import { Link } from 'react-router';

//引处路由组件
const SubMenu = Menu.SubMenu;


export default class Nav extends React.Component {
  render() {
    return (

      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Link to={"/P1"}>
            <Icon type="pie-chart" />
            <span>总览</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/add_content"}>
            <Icon type="desktop" />
            <span>发布内容</span>
          </Link>
        </Menu.Item>

        <SubMenu
          key="sub2"
          title={<span><Icon type="database" /><span>内容管理</span></span>}
        >
          <Menu.Item key="6">
            <Link to={"/content_list"}><Icon type="video-camera" />内容列表</Link>
            </Menu.Item>
          <Menu.Item key="8"><Link to={"/P2"}>
            <Icon type="bars" />专题管理
                </Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="10">
          <Link to={"/P1"}>
            <Icon type="solution" />
            <span>单页管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to={"/P2"}>
            <Icon type="video-camera" />
            <span>管理员设置</span>
          </Link>
        </Menu.Item>

        <SubMenu
          key="sub1"
          title={<span><Icon type="user" /><span>网站配置</span></span>}
        >
          <Menu.Item key="3">
            <Link to={"/Input"}>
              <Icon type="video-camera" />频道设置
                </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={"/content_sort"}>
              <Icon type="solution" />内容分类管理
                </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={"/Forms"}>
              <Icon type="tool" /> 网站信息设置
                </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}