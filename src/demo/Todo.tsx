import * as React from 'react';
import './Todo.scss';

export interface ITodoPropTypes {
    title: string;
    expires: Date;
    deleted: boolean;
    onClick: () => void;
}

export class Todo extends React.Component<ITodoPropTypes> {
    constructor(props: ITodoPropTypes, context: any) {
        super(props, context);
    }

    public render() {
        return (
            <div className="todo-item" onClick={this.props.onClick}>
                <div
                    className="todo-name"
                    style={{
                        textDecoration: this.props.deleted ? 'line-through' : 'none'
                    }}
                >
                    {this.props.title}
                </div>
                <div className="todo-expires">{this.formatDate(this.props.expires)}</div>
            </div>
        );
    }

    private formatDate(date: Date): string {
        return date.toLocaleString();
    }
}