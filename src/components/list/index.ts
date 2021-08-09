import ActivableList from './List';
import { ListItem, ActivableListItem } from './ListItem';
import Picker from './Picker';

type InternalListType = typeof ActivableList;

interface IListType extends InternalListType {
    Item: typeof ListItem;
    ActivableItem: typeof ActivableListItem;
    Picker: typeof Picker;
}

const List = ActivableList as IListType;

List.Item = ListItem;
List.ActivableItem = ActivableListItem;
List.Picker = Picker;

export { List };