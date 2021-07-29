import ActivableList from './List';
import { ListItem, ActivableListItem } from './ListItem';

type InternalListType = typeof ActivableList;

interface IListType extends InternalListType {
    Item: typeof ListItem;
    ActivableItem: typeof ActivableListItem;
}

const List = ActivableList as IListType;

List.Item = ListItem;
List.ActivableItem = ActivableListItem;

export { List };