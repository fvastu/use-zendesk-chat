/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef } from "react";

// Warning message for when Zendesk is not initialized
const WARNING_MESSAGE = "Zendesk is not initialized yet";

// Type for callback functions
type ZendeskCallbackFn = () => void;

// Props for the useZendeskChat hook
type ZendeskChatProps = {
  zendeskKey?: string;
  fullUrl?: string;
  defer?: boolean;
  onLoaded?: ZendeskCallbackFn;
  onOpen?: ZendeskCallbackFn;
  onClose?: ZendeskCallbackFn;
};

// Methods exposed by the useZendeskChat hook
type ZendeskChatMethods = {
  open: ZendeskCallbackFn;
  close: ZendeskCallbackFn;
};

// Augmenting the Window interface to include Zendesk properties
declare global {
  interface Window {
    zE?: any;
    zESettings?: any;
  }
}

// The main useZendeskChat hook
const useZendeskChat = ({
  zendeskKey,
  fullUrl,
  defer,
  onLoaded = () => {},
  onOpen = () => {},
  onClose = () => {},
}: ZendeskChatProps): ZendeskChatMethods => {
  // Reference to the script element
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Callback when the Zendesk script is loaded
  const onScriptLoaded = () => {
    onLoaded();
    // Register status change callbacks after script is loaded
    registerStatusChangeCallback("open", onOpen);
    registerStatusChangeCallback("close", onClose);
  };

  // Function to insert the Zendesk script
  const insertScript = () => {
    scriptRef.current = document.createElement("script");
    if (defer) {
      scriptRef.current.defer = true;
    } else {
      scriptRef.current.async = true;
    }
    scriptRef.current.id = "ze-snippet";
    // Set script source based on provided fullUrl or zendeskKey
    scriptRef.current.src =
      fullUrl ?? `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
    scriptRef.current.addEventListener("load", onScriptLoaded);
    document.body.appendChild(scriptRef.current);
  };

  // Function to clean up on component unmount
  const onUnmount = () => {
    if (window.zE) {
      delete window.zE;
      delete window.zESettings;
      scriptRef.current && document.body.removeChild(scriptRef.current);
    }
  };

  // Effect to run on mount and handle script insertion
  useEffect(() => {
    // Check if script should be inserted
    const shouldInsertScript =
      typeof window !== "undefined" && !window.zE && (fullUrl || zendeskKey);

    if (shouldInsertScript) {
      insertScript();
      // Set global Zendesk settings
      window.zESettings = { zendeskKey, defer, onLoaded };
    }

    // Cleanup function on unmount
    return onUnmount;
  }, [zendeskKey, defer, fullUrl, onLoaded, onOpen, onClose]);

  // Function to check if Zendesk chat is available
  const isChatAvailable = () => {
    return typeof window !== "undefined" && window.zE;
  };

  // Function to handle opening and closing of Zendesk chat
  const handleStatus = (status: "open" | "close") => {
    if (!isChatAvailable()) {
      console.warn(WARNING_MESSAGE);
      return;
    }
    // Call Zendesk API to open or close the messenger
    window.zE("messenger", status);
  };

  // Function to register a callback for status change
  const registerStatusChangeCallback = (
    status: "open" | "close",
    callback: ZendeskCallbackFn
  ) => {
    if (!isChatAvailable()) {
      console.warn(WARNING_MESSAGE);
      return;
    }
    // Register callback for status change
    window.zE("messenger:on", status, callback);
  };

  // Exposed methods for opening and closing Zendesk chat
  const open = () => handleStatus("open");
  const close = () => handleStatus("close");

  // Return the exposed methods
  return { open, close };
};

export { ZendeskChatMethods, ZendeskChatProps, useZendeskChat };
