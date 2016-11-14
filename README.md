# Tiny Modal Window Manager (BETA)

Small client-side javascript library that makes managing your modal windows easy.

[Features](#features)  
[Browser Compatibility](#browser-compatibility)  
[Getting the Library](#getting-the-library)  
[How to use](#how-to-use)

## Features
- [RFC6265](http://www.rfc-editor.org/rfc/rfc6265.txt) compliant
- Cross browser (test now)
- Lightweight
- Few versions (jQuery, PrototypeJs, Pure javascript) just noew only for jQuery

## Browser Compatibility
The following browsers have passed all of the automated Cookies.js tests:
- Chrome
- Firefox (test new)
- Safari (test new)
- Opera (test new)
- Internet Explorer (test new)

## Getting the Library
#### Direct downloads
[jQuery v0.0.1 Minified](https://raw.githubusercontent.com/evgv/timo/master/src/build/timo.jquery.min.js) (~ 2.28 KB)                          
[jQuery v0.0.1 Unminified](https://raw.githubusercontent.com/evgv/timo/master/src/build/timo.jquery.js) (~ 10.2 KB)


## How to use

First release contain only jQuery version, so you must add to your site or web application jQuery library before use it.

Download and add in head section or where you included javascript scripts into your site or web application `timo.jquery.js` (later will be added versions for PrototypeJs and pure javascript without any dependencies) by direct links or another comfortable ways for you.

#### For example

###### Some CSS styles for modal windows

```css

    .modal-window {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        background: #ffffff;
        opacity: 0; // Need for example with animation
        width: 300px;
        height: 400px;
        margin-top: -200px;
        margin-left: -150px;
        z-index: 5;
        padding: 20px 10px;
    }

```

###### Html markup

**Options for links:**

| Option                | Description                                                                  | Default      |
| --------------------: | ---------------------------------------------------------------------------- | ------------ |
| *data-timoLIdent*     | Required if you do not use *data-timoSelector*, and must be the same as a *data-timoMIdent* of depend modal window, must be unique |              |
| *data-timoEvent*      | Required, any of `jQuery` `.on()` event type `click`, `mouseenter` etc.        | `click`      |
| *data-timoPrevent*    | Optional, prevent link action                                                | `true` for `click` event type and `false` for others |
| *data-timoSelector*   | Optional, substitute for *data-timoLIdent*, any `jQuery` valid query selector                                   |      |
| *secure*              | A boolean value of whether or not the cookie should only be available over SSL  (deprecated)       | `false`     |

**Options for modal windows:**

| Option                | Description                                                                  | Default      |
| --------------------: | ---------------------------------------------------------------------------- | ------------ |
| *data-timoMIdent*     | Required if you do use *data-timoLIdentr* for depend link and must be the same as this param, must be unique |              |


Two links with different params open one modal window

```html

    <a href="##" data-timoLIdent="general-ca" data-timoEvent="click" data-timoPrevent="true" data-timoSelector="#general-ca-modal">Login</a>

    <a href="##" data-timoEvent="mouseenter" data-timoSelector="#general-ca">Login</a>


    <div id="general-ca" class="modal-window" data-timoMIdent="general-ca">

        <div class="modal-window-wrapper">

            <div class="title">Modal window title</div>
            <div class="subtitle">Modal window subtitle</div>

            <div class="content">
                <p>Some modal window content</p>
            </div>

        </div>

    </div>

    ```

```js

/**
 * Simple initialize without animation
 */
$(document).ready(function(){
    timo.initialize({
        fadeIn : 500,
        fadeOut: 300,
    });
});

/**
 * Initialize with animation
 * You can use empty show{} and hide{} options, jQuery set default values.
 *
 * Debug = false
 */
$(document).ready(function(){
    timo.initialize({
        fadeIn : 500,
        fadeOut: 300,
        animate: {
            enabled: true,
                show: {
                    properties : {duration: 200},
                    options    : {opacity: 1}
                },
                hide: {
                    properties : {duration: 200},
                    options    : {opacity: 0}
                }
        }
    }, false);
});


```
