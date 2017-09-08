import types from './actionTypes';
import initalState from './state';
import action from './action';
export default function reducer(state = initalState, { type, data }) {
    let newState = state;
    switch (type) {
        //设置登录状态
        case types.SET_LOGIN_STATE:
            return state.setIn(["view", "isLogin"], data);
        case types.ADD_MESSAGE:
            return action[types.ADD_MESSAGE](state, data);
        case types.CANCEL_MESSAGE:
            return action[types.CANCEL_MESSAGE](state, data);

    }
    return newState;
}