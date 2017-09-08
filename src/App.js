import React, { Component } from 'react';
import { store } from './redux/store';
import { connect, Provider } from 'react-redux';


import './App.css';
//引入组件
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import View from './view/view';
//引入功能模块
import P1 from './pages/one';
import P2 from './pages/two';
import Input from './view/input';
import Forms from './view/form';
import Content_sort from './pages/content_sort';
import Add_content from './pages/add_content';
import Content_list from './pages/content_list';

class App extends Component {
  render() {
    return (
   <Provider store={store}>    
      <Router history={hashHistory} >
        {/*引入容器组件*/}
        <Route path="/" component={View}>
          <IndexRoute component={P1} />
          <Router path="/p2" component={P2} />
          <Router path="/p1" component={P1} />
          <Router path="/Input" component={Input} />
          <Router path="/Forms" component={Forms} />
          <Router path="/content_sort" component={Content_sort} />
          <Router path="/add_content" component={Add_content} />
          <Router path="/content_list" component={Content_list} />
        </Route>
      </Router>
        </Provider>
    );
  }
}

export default App;
