import { AnyAction, Reducer } from 'redux';

export interface IDemoState {
    msg: string;
}

export const DemoReducer: Reducer<IDemoState> = (state: IDemoState = {msg: 'Welcome to React'}, action: AnyAction) => {
    switch (action.type) {
        case 'GET_WELCOME_MSG':
            return Object.assign({}, state, { msg: 'Welcome to React+Redux' });
        default:
            return state;
    }
};