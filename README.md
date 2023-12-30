# React Zendesk Chat Hook

This React hook, `useZendeskChat`, provides an easy integration of the Zendesk Chat widget into your React application. It simplifies the process of initializing and controlling the Zendesk Chat widget with a few lines of code.

## How it Works

The hook dynamically inserts the Zendesk Chat script into your document's body, initializes the chat widget, and provides methods to open and close the chat. It takes care of script insertion, initialization, and cleanup when the component unmounts.

### Dependencies
- React (>=16.8)
- Zendesk Chat account and API key

## Why it's Useful

Integrating Zendesk Chat into a React application can be a complex task. This hook streamlines the process by encapsulating the necessary logic. Key benefits include:

- **Simplicity**: Easily integrate Zendesk Chat functionality with just a few lines of code.
- **Dynamic Loading**: Load the Zendesk script dynamically, optimizing your application's initial load time.
- **Configurability**: Pass configuration options like API key, defer loading, and callbacks for different chat events.

## How to Configure

1. **Install the hook**:

    ```bash
    npm install react-zendesk-chat-hook
    ```

    or

    ```bash
    yarn add react-zendesk-chat-hook
    ```

2. **Usage in your React component**:

    ```jsx
    import React from 'react';
    import useZendeskChat from 'react-zendesk-chat-hook';

    const MyComponent = () => {
        // Your Zendesk Chat API key
        const zendeskKey = 'YOUR_ZENDESK_API_KEY';

        // Other optional parameters: defer, onLoaded, onOpen, onClose
        const chatMethods = useZendeskChat({
            zendeskKey,
            defer: false, // Set to true for deferred loading
            onLoaded: () => {
                console.log('Zendesk script loaded!');
            },
            onOpen: () => {
                console.log('Zendesk Chat opened!');
            },
            onClose: () => {
                console.log('Zendesk Chat closed!');
            },
        });

        return (
            <div>
                {/* Your component content */}
                <button onClick={chatMethods.open}>Open Chat</button>
                <button onClick={chatMethods.close}>Close Chat</button>

                {/* Programmatically invoke the chat state */}
                <button onClick={chatMethods.open}>Open Chat Programmatically</button>
                <button onClick={chatMethods.close}>Close Chat Programmatically</button>
            </div>
        );
    };

    export default MyComponent;
    ```

3. **Configuration Options**:

    - `zendeskKey` (string, mandatory): Your Zendesk Chat API key.
    - `defer` (boolean, optional): Set to `true` for deferred loading (default: `false`).
    - `onLoaded` (function, optional): Callback function invoked when the Zendesk script is loaded.
    - `onOpen` (function, optional): Callback function invoked when the Zendesk Chat is opened.
    - `onClose` (function, optional): Callback function invoked when the Zendesk Chat is closed.

4. **Handling Chat Status**:

    - `open()`: Opens the Zendesk Chat widget.
    - `close()`: Closes the Zendesk Chat widget.

## API Details

### `useZendeskChat` Parameters

#### `zendeskKey` (string, mandatory)

Your Zendesk Chat API key. This key is required for the proper initialization of the Zendesk Chat widget.

#### `defer` (boolean, optional)

Set this parameter to `true` if you want to defer loading the Zendesk script. Deferring can help optimize your application's initial load time. Default is `false`.

#### `onLoaded` (function, optional)

This callback function is triggered when the Zendesk script is successfully loaded. Use this to perform additional actions or notify users when the Zendesk Chat functionality is ready.

#### `onOpen` (function, optional)

This callback function is triggered when the Zendesk Chat is opened. Use this to handle any actions you want to perform when the chat is initiated.

#### `onClose` (function, optional)

This callback function is triggered when the Zendesk Chat is closed. Use this to handle any actions you want to perform when the chat is closed.

### Note

Ensure that you have a valid Zendesk Chat account and API key. Make sure to replace 'YOUR_ZENDESK_API_KEY' with your actual API key.

Feel free to customize and extend the hook according to your application's specific requirements. You can also trigger callbacks and programmatically invoke the chat state using the provided methods.
