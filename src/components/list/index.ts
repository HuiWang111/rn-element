import ActiveList from './List';
import { ListItem, ActivableListItem } from './ListItem';

type InternalListType = typeof ActiveList;

interface IListType extends InternalListType {
    Item: typeof ListItem;
    ActivableItem: typeof ActivableListItem;
}

const List = ActiveList as IListType;

List.Item = ListItem;
List.ActivableItem = ActivableListItem;

export { List };