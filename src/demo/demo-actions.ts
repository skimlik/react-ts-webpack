import { AnyAction } from 'redux';

export class DemoActions {
    public static GET_WELCOME_MSG: AnyAction = {
        type: 'GET_WELCOME_MSG'
    };

    public static  GET_TODO_ITEMS: AnyAction = {
        type: 'GET_TODO_ITEMS'
    };
}
