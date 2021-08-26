import ActivableList from './List';
import { ListItem, ActivableListItem } from './ListItem';
declare type InternalListType = typeof ActivableList;
interface IListType extends InternalListType {
    Item: typeof ListItem;
    ActivableItem: typeof ActivableListItem;
}
declare const List: IListType;
export { List };
