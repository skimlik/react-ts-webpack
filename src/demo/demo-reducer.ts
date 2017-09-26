import { AnyAction, Reducer } from 'redux';
import { ITodoItem } from './todo-item';

export interface IDemoState {
    msg: string;
    todoItems: ITodoItem[];
}

const defaultState: IDemoState = {
    msg: 'Welcome to React',
    todoItems: []
};

export const DemoReducer: Reducer<IDemoState> = (state: IDemoState = defaultState, action: AnyAction) => {
    let expires = new Date();
    expires.setDate(expires.getDate() + 10);

    switch (action.type) {
        case 'GET_WELCOME_MSG':
            return Object.assign({}, state, { msg: 'Welcome to React+Redux' });
        case 'GET_TODO_ITEMS':
            let items = [
                <ITodoItem> { id: 1,  name: 'Go Soping', expires: expires, created: new Date(), isActive: true },
                <ITodoItem> { id: 2, name: 'River Fising', expires: expires, created: new Date(), isActive: true },
                <ITodoItem> { id: 3, name: 'Get some rest', expires: expires, created: new Date(), isActive: true },
                <ITodoItem> { id: 4, name: 'Watch TV', expires: expires, created: new Date(), isActive: true },
                <ITodoItem> { id: 5, name: 'Go sleep', expires: expires, created: new Date(), isActive: true },
            ];
            return Object.assign({}, state, {
                todoItems: items
            });
        case 'TOGGLE_TODO':
            state.todoItems = state.todoItems.map(m => {
                if (m.id !== action.id) {
                    return m;
                }
                return {
                    ...m,
                    isActive: !m.isActive
                };
            });
            return state;
        default:
            return state;
    }
};