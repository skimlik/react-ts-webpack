import * as React from 'react';
import { IState } from '../code/state';
import { AnyAction, Store } from 'redux';
import { DemoActions } from './demo-actions';
import { TodoList } from './TodoList';

export interface IDemoPropTypes {
    logo: string;
    msg?: string;
}

export class Demo extends React.Component<IDemoPropTypes, IState> {
    static contextTypes = {
        store: React.PropTypes.object
    };

    private store: Store<IState>;

    constructor(props: IDemoPropTypes, context: any) {
        super(props, context);
        this.store = context.store;
        this.state = this.getStateFromStore(DemoActions.GET_WELCOME_MSG);
    }

    public render() {
        return (
            <div id="demoApp">
                <div className="app">
                    <div className="app-header">
                        <img src={this.props.logo} className="app-logo" alt="logo"/>
                        <h2>{this.state.demo.msg}</h2>
                    </div>
                    <h4>To-do list</h4>
                    <TodoList />
                </div>
            </div>
        );
    }

    private getStateFromStore(action: AnyAction): IState {
        this.store.dispatch(action);
        return this.store.getState();
    }
}
