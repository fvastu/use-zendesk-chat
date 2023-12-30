type ZendeskCallbackFn = () => void;
type ZendeskChatProps = {
    zendeskKey?: string;
    fullUrl?: string;
    defer?: boolean;
    onLoaded?: ZendeskCallbackFn;
    onOpen?: ZendeskCallbackFn;
    onClose?: ZendeskCallbackFn;
};
type ZendeskChatMethods = {
    open: ZendeskCallbackFn;
    close: ZendeskCallbackFn;
};
declare global {
    interface Window {
        zE?: any;
        zESettings?: any;
    }
}
declare const useZendeskChat: ({ zendeskKey, fullUrl, defer, onLoaded, onOpen, onClose, }: ZendeskChatProps) => ZendeskChatMethods;
export { ZendeskChatMethods, ZendeskChatProps, useZendeskChat };
