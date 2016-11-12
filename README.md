# timo

```js
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

```html


<a href="##" data-timoLIdent="general-ca" data-timoEvent="click" data-timoPrevent="true" data-timoSelector="#general-ca-modal">Login</a>
<a href="##" data-timoLIdent="general-ca" data-timoEvent="mouseenter" data-timoSelector="#general-ca-modal">Login</a>

<div class="modal-window" data-timoMIdent="general-ca">

    <div class="modal-window-wrapper">

        <div class="title"></div>
        <div class="subtitle"></div>

        <div class="content"></div>

    </div>

</div>

```

```css
<style>

    .modal-window {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        background: #ffffff;
        opacity: 0;
        width: 300px;
        height: 400px;
        margin-top: -200px;
        margin-left: -150px;
        z-index: 5;
        padding: 20px 10px;
    }



</style>
```
