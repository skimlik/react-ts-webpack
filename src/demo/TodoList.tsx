import * as React from 'react';
import { IState } from '../code/state';
import { Store } from 'react-redux';
import { DemoActions } from './demo-actions';
import { IDemoState } from './demo-reducer';
import { Todo } from './Todo';

export class TodoList extends React.Component<any, IDemoState> {
    static contextTypes = {
        store: React.PropTypes.object
    };

    private store: Store<IState>;

    constructor(props: any, context: any) {
        super(props, context);
        this.store = context.store;
        this.state = this.getTodoList().demo;
    }

    public render() {
        return (
            <div className="todo-items">
                {this.state.todoItems.map(item =>
                    <Todo
                        key={item.id}
                        title={item.name}
                        expires={item.expires}
                        deleted={!item.isActive}
                        onClick={ () => {
                            this.store.dispatch({
                                type: 'TOGGLE_TODO',
                                id: item.id
                            });
                            this.setState(this.store.getState().demo);
                        }}
                    />
                )}
            </div>
        );
    }

    private getTodoList(): IState {
        this.store.dispatch(DemoActions.GET_TODO_ITEMS);
        return this.store.getState();
    }
}