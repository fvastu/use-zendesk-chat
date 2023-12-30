"use strict";
exports.__esModule = true;
exports.useZendeskChat = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
var react_1 = require("react");
// Warning message for when Zendesk is not initialized
var WARNING_MESSAGE = "Zendesk is not initialized yet";
// The main useZendeskChat hook
var useZendeskChat = function (_a) {
    var zendeskKey = _a.zendeskKey, fullUrl = _a.fullUrl, defer = _a.defer, _b = _a.onLoaded, onLoaded = _b === void 0 ? function () { } : _b, _c = _a.onOpen, onOpen = _c === void 0 ? function () { } : _c, _d = _a.onClose, onClose = _d === void 0 ? function () { } : _d;
    // Reference to the script element
    var scriptRef = (0, react_1.useRef)(null);
    // Callback when the Zendesk script is loaded
    var onScriptLoaded = function () {
        onLoaded();
        // Register status change callbacks after script is loaded
        registerStatusChangeCallback("open", onOpen);
        registerStatusChangeCallback("close", onClose);
    };
    // Function to insert the Zendesk script
    var insertScript = function () {
        scriptRef.current = document.createElement("script");
        if (defer) {
            scriptRef.current.defer = true;
        }
        else {
            scriptRef.current.async = true;
        }
        scriptRef.current.id = "ze-snippet";
        // Set script source based on provided fullUrl or zendeskKey
        scriptRef.current.src =
            fullUrl !== null && fullUrl !== void 0 ? fullUrl : "https://static.zdassets.com/ekr/snippet.js?key=".concat(zendeskKey);
        scriptRef.current.addEventListener("load", onScriptLoaded);
        document.body.appendChild(scriptRef.current);
    };
    // Function to clean up on component unmount
    var onUnmount = function () {
        if (window.zE) {
            delete window.zE;
            delete window.zESettings;
            scriptRef.current && document.body.removeChild(scriptRef.current);
        }
    };
    // Effect to run on mount and handle script insertion
    (0, react_1.useEffect)(function () {
        // Check if script should be inserted
        var shouldInsertScript = typeof window !== "undefined" && !window.zE && (fullUrl || zendeskKey);
        if (shouldInsertScript) {
            insertScript();
            // Set global Zendesk settings
            window.zESettings = { zendeskKey: zendeskKey, defer: defer, onLoaded: onLoaded };
        }
        // Cleanup function on unmount
        return onUnmount;
    }, [zendeskKey, defer, fullUrl, onLoaded, onOpen, onClose]);
    // Function to check if Zendesk chat is available
    var isChatAvailable = function () {
        return typeof window !== "undefined" && window.zE;
    };
    // Function to handle opening and closing of Zendesk chat
    var handleStatus = function (status) {
        if (!isChatAvailable()) {
            console.warn(WARNING_MESSAGE);
            return;
        }
        // Call Zendesk API to open or close the messenger
        window.zE("messenger", status);
    };
    // Function to register a callback for status change
    var registerStatusChangeCallback = function (status, callback) {
        if (!isChatAvailable()) {
            console.warn(WARNING_MESSAGE);
            return;
        }
        // Register callback for status change
        window.zE("messenger:on", status, callback);
    };
    // Exposed methods for opening and closing Zendesk chat
    var open = function () { return handleStatus("open"); };
    var close = function () { return handleStatus("close"); };
    // Return the exposed methods
    return { open: open, close: close };
};
exports.useZendeskChat = useZendeskChat;
//# sourceMappingURL=index.js.map