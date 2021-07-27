"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyEvents = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
function useKeyEvents(eventName, listener, deps) {
    if (deps === void 0) { deps = []; }
    react_1.useEffect(function () {
        var didMount = function () {
            react_native_1.DeviceEventEmitter.addListener(eventName, listener);
        };
        var willUnmount = function () {
            react_native_1.DeviceEventEmitter.removeListener(eventName, listener);
        };
        didMount();
        return willUnmount;
    }, deps);
}
exports.useKeyEvents = useKeyEvents;
