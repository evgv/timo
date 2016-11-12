/**
 * timo v0.0.1
 * timo
 * https://github.com/evgv/timo
 *
 * Copyright 2016 Zubkov Eugene
 * Released under the MIT
 */


/**
 *
 * Create scope
 +
 * @param {object}    global      - window
 * @param {undefined} undefined   - undefined
 */
(function (global, undefined) {

    'use strict';

    /**
     * Factory method
     *
     * @throws {Error}  timo.js requires a `window` with a `document` object'
     * @param  {object} window
     */
    var factory = function (window) {

        /**
         * Check window object is exist
         */
        if (typeof window.document !== 'object') {
            throw new Error('timo.jquery.js requires a `window` with a `document` object');
        }

        /**
         * Check jQuery object is exist
         */
        if(!window.jQuery) {
            throw new Error('timo.jquery.js requires a `jQuery`, timo.js this plugin without jQuery');
        } else {
          $ = window.jQuery;
        }

        /**
         * Main instance
         */
        var timo = function() {}

                
        timo.fadeIn  = 400;
        timo.fadeOut = 400;

        // http://api.jquery.com/animate/
        timo.animate = {
            enabled    : false,
            properties : {},
            options    : {}
        };

        /**
         * Initialize object variables
         *
         * @param {object} options
         */
        timo.initialize = function(options) {

            if(typeof options !== 'object') {
                return;
            }

            for (var key in options){
                if (options.hasOwnProperty(key) && timo.hasOwnProperty(key)) {
                    timo.key = options[key];

                    if(this.debug) {

                        console.log('%c ' + key + ' = ' +  options[key], 'background: #000; color: #ffff00');
                    }
                }
            }

        };



        /**
         * Return main insance
         */
        return timo;

    };

    /**
     * Create timo instance
     */
    var timoExport = typeof global.document === 'object' ? factory(global, environment) : factory;



    /**
     * AMD support
     */
    if (typeof define === 'function' && define.amd) {

        define(function () {
            return timoExport;
        });

    /**
     * CommonJS / Node.js support
     */
    } else if (typeof exports === 'object') {

       /**
        * Support Node.js specific `module.exports` (which can be a function)
        */
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = timoExport;
        }

       /**
        * But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        */
        exports.timo = timoExport;

    /**
     * Native JS export
     */
    } else {

        global.timo = timoExport;
    }

})(typeof window === 'undefined' ? this : window);
