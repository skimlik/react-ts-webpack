import { Store } from 'react-redux';
import { IState } from './state';

export interface IContextType {
    store: Store<IState>;
}