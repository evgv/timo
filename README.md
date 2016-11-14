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
- Few versions (jQuery, PrototypeJs, Pure javascript) just now only for jQuery

## Browser Compatibility
The following browsers have passed all of the automated Cookies.js tests:
- Chrome
- Firefox (test now)
- Safari (test now)
- Opera (test now)
- Internet Explorer (test now)

## Getting the Library
#### Direct downloads
[jQuery v0.0.1 Minified](https://raw.githubusercontent.com/evgv/timo/master/src/build/timo.jquery.min.js) (~ 2.28 KB)                          
[jQuery v0.0.1 Unminified](https://raw.githubusercontent.com/evgv/timo/master/src/build/timo.jquery.js) (~ 10.2 KB)


## How to use

First release contain only jQuery version, so you must add to your site or web application jQuery library before use it.

Download and add in head section or where you included javascript scripts into your site or web application `timo.jquery.js` (later will be added versions for PrototypeJs and pure javascript without any dependencies) by direct links or another comfortable ways for you.

**Options for links:**

| Option                | Description                                                                  |
| --------------------: | ---------------------------------------------------------------------------- |
| *data-timoLIdent*     | `required`, `unique` if you do not use *data-timoSelector*, and must be the same as a *data-timoMIdent* of depend modal window |
| *data-timoEvent*      | `required`, any of `jQuery` `.on()` event type `click`, `mouseenter` etc. |
| *data-timoPrevent*    | `optional`, prevent link action |
| *data-timoSelector*   | `optional`, substitute for *data-timoLIdent*, any `jQuery` valid query selector |

**Options for modal windows:**

| Option                | Description                                                                  |
| --------------------: | ---------------------------------------------------------------------------- |
| *data-timoMIdent*     | `required`, `unique` if you used *data-timoLIdentr* for depend link and must be the same as this param|


#### For example

##### Some CSS styles for modal windows

```css
			.modal-noscroll {
				position: fixed;
				overflow: hidden;
			}

			.modal-window {
		        display: none;
		        position: fixed;
		        top: 45%;
		        left: 50%;
		        background: #ffffff;
		        opacity: 0;
			    width: 500px;
			    height: 400px;
			    margin-top: -200px;
			    margin-left: -250px;
			    border: 1px solid #000;
		        z-index: 101;
		        padding: 25px 35px;
				-webkit-box-sizing: border-box;
			    -moz-box-sizing: border-box;
			    box-sizing: border-box;
		    }

			.modal-window .modal-close {
			    position: absolute;
			    top: 10px;
			    right: 10px;
			    width: 20px;
			    height: 20px;
			    cursor: pointer;
			    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cG9seWdvbiBmaWxsPSIjMDEwMTAxIiBwb2ludHM9Ijc3LjYsMjEuMSA0OS42LDQ5LjIgMjEuNSwyMS4xIDE5LjYsMjMgNDcuNiw1MS4xIDE5LjYsNzkuMiAyMS41LDgxLjEgNDkuNiw1MyA3Ny42LDgxLjEgNzkuNiw3OS4yICAgNTEuNSw1MS4xIDc5LjYsMjMgIi8+PC9zdmc+);
			}

		    .modal-window .modal-title {
	    	    position: relative;
			    margin-bottom: 40px;
			    padding-bottom: 15px;
			    font-family: "MillerBannerSemibold", "Arial", sans-serif;
			    font-size: 32px;
			    text-align: center;
			    letter-spacing: 1px;
			    color: #000000;
		    }

		    .modal-window .modal-subtitle {
	    	    margin-bottom: 30px;
			    font-family: "BrandonMed", "Arial", sans-serif;
			    font-size: 16px;
			    line-height: 16px;
			    text-align: center;
			    text-transform: uppercase;
			    color: #000000;
		    }

		    .modal-window .modal-content {
	    	    font-family: "Georgia", "Arial", sans-serif;
			    font-size: 14px;
			    line-height: 20px;
			    text-align: center;

		    }

		    #overlay {
				display: none;
			    position: fixed;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100%;
			    background-color: #fff;
			    filter: alpha(opacity=80);
			    -moz-opacity: 0.8;
			    opacity: 0.8;
			    cursor: pointer;
			    z-index: 100;
			}


```

##### Html markup

Two links with different params open one modal window

```html

		<a href="##" data-timoLIdent="general-ca-hover" data-timoEvent="mouseenter">Open by hover</a>

		<div class="modal-window" data-timoMIdent="general-ca-hover">
			<div class="modal-close"></div>
			<div class="modal-title">Lorem Ipsum title</div>
			<div class="modal-subtitle">Lorem Ipsum subtitle</div>
			<div class="modal-content">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
			</div>
		</div>

	
		<br>


		<a href="/" data-timoLIdent="general-ca-click" data-timoEvent="click" data-timoPrevent="true">Open by click</a>

		<div class="modal-window" data-timoMIdent="general-ca-click">
			<div class="modal-close"></div>
			<div class="modal-title">Lorem Ipsum title</div>
			<div class="modal-subtitle">Lorem Ipsum subtitle</div>
			<div class="modal-content">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
			</div>
		</div>

```

##### Js initialize

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
```

```js

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
