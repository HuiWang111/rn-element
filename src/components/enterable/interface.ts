import { ViewProps } from 'react-native';

export interface IEnterableProps extends ViewProps {
    onEnter?: () => void;
    isEnterable?: boolean;
}