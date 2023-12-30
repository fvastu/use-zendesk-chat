# React Zendesk Chat Hook

This React hook, `useZendeskChat`, simplifies the integration of the Zendesk Chat widget into your React application.

## How it Works

The hook dynamically inserts the Zendesk Chat script, initializes the chat widget, and provides methods to open and close the chat. It handles script insertion, initialization, and cleanup on component unmount.

### Dependencies
- React (>=16.8)
- Zendesk Chat account and API key

## Why it's Useful

Integrating Zendesk Chat into a React app can be complex. This hook streamlines the process, offering key benefits:

- **Simplicity**: Easily integrate Zendesk Chat functionality with minimal code.
- **Dynamic Loading**: Load the Zendesk script dynamically, optimizing initial load time.
- **Configurability**: Pass options like API key, defer loading, and callbacks for different chat events.

## How to Configure

1. **Install the hook**:

    ```bash
    npm install @fvastu/react-zendesk-chat-hook
    ```

    or

    ```bash
    yarn add @fvastu/react-zendesk-chat-hook
    ```

2. **Usage in your React component**:

    ```jsx
    import React from 'react';
    import { useZendeskChat } from '@fvastu/react-zendesk-chat-hook';

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

Your Zendesk Chat API key. Required for proper initialization.

#### `defer` (boolean, optional)

Set to `true` to defer loading the Zendesk script. Helps optimize initial load time. Default is `false`.

#### `onLoaded` (function, optional)

Triggered when the Zendesk script is successfully loaded. Use to perform additional actions or notify users when Chat is ready.

#### `onOpen` (function, optional)

Triggered when Zendesk Chat is opened. Handle any actions when the chat is initiated.

#### `onClose` (function, optional)

Triggered when Zendesk Chat is closed. Handle any actions when the chat is closed.

### Note

Ensure a valid Zendesk Chat account and API key. Replace 'YOUR_ZENDESK_API_KEY' with your actual API key.

Customize and extend the hook according to your app's specific requirements. Trigger callbacks and programmatically invoke the chat state using the provided methods.
