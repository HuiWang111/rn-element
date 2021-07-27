import ActiveList from './List';
import { ListItem, ActivableListItem } from './ListItem';
declare type InternalListType = typeof ActiveList;
interface IListType extends InternalListType {
    Item: typeof ListItem;
    ActivableItem: typeof ActivableListItem;
}
declare const List: IListType;
export { List };
