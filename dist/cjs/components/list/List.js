"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var prop_types_1 = require("prop-types");
var hooks_1 = require("../../hooks");
var constants_1 = require("../../constants");
var react_2 = require("react");
var ListItem_1 = require("./ListItem");
var utils_1 = require("../../utils");
var isActivableListItem = function (c) {
    return [ListItem_1.ActivableListItem, ListItem_1.ListItem].includes(c.type);
};
var ActivableList = function (_a) {
    var activeIndex = _a.activeIndex, _b = _a.loop, loop = _b === void 0 ? true : _b, children = _a.children, _c = _a.keyboard, keyboard = _c === void 0 ? true : _c, onChange = _a.onChange, onEnter = _a.onEnter, style = _a.style, activeItemStyle = _a.activeItemStyle, itemStyle = _a.itemStyle;
    var isActivableList = react_1.Children.toArray(children).map(function (child) {
        var typeofChild = typeof child;
        if (!child ||
            typeofChild === 'number' || typeofChild === 'string' || typeofChild === 'boolean' ||
            !child.type ||
            !isActivableListItem(child)) {
            throw new Error('[ActiveList] children must be List.ActivableListItem or List.Item');
        }
        return child.type === ListItem_1.ActivableListItem;
    });
    var _d = __read(react_2.useMemo(function () {
        return [isActivableList.indexOf(true), isActivableList.lastIndexOf(true)];
    }, [isActivableList]), 2), firstActivableIndex = _d[0], lastActivableIndex = _d[1];
    hooks_1.useKeyEvents('keyup', function (event) {
        if (!keyboard)
            return;
        if (event.which === constants_1.KeyCode.Up) {
            if (!onChange)
                return;
            if (activeIndex > firstActivableIndex) {
                onChange(isActivableList.lastIndexOf(true, activeIndex - 1));
            }
            else if (loop) {
                onChange(lastActivableIndex);
            }
        }
        else if (event.which === constants_1.KeyCode.Down) {
            if (!onChange)
                return;
            if (activeIndex < lastActivableIndex) {
                onChange(isActivableList.indexOf(true, activeIndex + 1));
            }
            else if (loop) {
                onChange(firstActivableIndex);
            }
        }
        else if (event.which === constants_1.KeyCode.Enter) {
            if (!onEnter)
                return;
            onEnter();
        }
    }, [activeIndex, keyboard]);
    return (react_1.default.createElement(react_native_1.View, { style: style }, react_1.Children.map(children, function (child, index) {
        var c = child;
        var childItemStyle = c.props.style;
        var childActiveItemStyle = c.props.activeStyle;
        return react_1.cloneElement(c, {
            isActive: activeIndex === index,
            style: utils_1.mergeStyle(itemStyle, childItemStyle),
            activeStyle: utils_1.mergeStyle(activeItemStyle, childActiveItemStyle)
        });
    })));
};
ActivableList.propTypes = {
    activeIndex: prop_types_1.default.number.isRequired,
    loop: prop_types_1.default.bool,
    onChange: prop_types_1.default.func
};
ActivableList.displayName = 'ActivableList';
exports.default = ActivableList;
