//处理过程
import types from './actionTypes';
import immutable from 'immutable';
import sysMsg from '../base/message';
import { message } from 'antd';
let action = {};



//添加错误信息
action[types.ADD_MESSAGE] = (state, msg) => {

    switch (msg.type) {
        case sysMsg.types.success:
            message.success(msg.message);
            break;
        case sysMsg.types.warning:
            message.warning(msg.message);
            break;
        case sysMsg.types.error:
            message.error(msg.message);
            break;
    }


    return state.update("message_queue", (v) => {
        return v.push(immutable.fromJS(msg));
    });
}
// 取消错误信息状态
action[types.CANCEL_MESSAGE] = (state, index) => {
    return state.setIn(["message_queue", index], true);
}


export default action;