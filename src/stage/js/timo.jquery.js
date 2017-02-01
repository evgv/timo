/**
 * timo v0.0.2
 * timo
 * https://github.com/evgv/timo
 *
 * Copyright 2017 Zubkov Eugene
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
        var timo = function() {

            /**
             * Debug logs
             *
             * @param {integer} debug
             */
            this.debug = false;

            /**
             * @TODO
             *
             * Not realized yet
             * Add type of modal window
             */
            this.type = '';

            /**
             * jQuery fadeIn speed
             * By default: 400
             *
             * @param {number|string} fadeIn
             */
            this.fadeIn = 400;

            /**
             * jQuery fadeOut speed
             * By default: 400
             *
             * @param {number|string} fadeOut
             */
            this.fadeOut = 400;
            
            /**
             * timo.overaly object
             */
            this.overlay = {};
            
            
            /**
             * @TODO
             * 
             * No scroll for body if moadl window is active
             */
//            this.noscroll = false;

            /**
             * Create and add to <body> new element '<div id="timo-overlay"></div>' if not exist
             *
             * @returns {undefined}
             */
            this._overlay = function(modal) {
                
                var self    = this,
                    body    = $('body');

                body.find('#timo-overlay').remove();
                
                self.overlay = $('<div id="timo-overlay"></div>');
                
                if(typeof modal !== 'undefined') {
                    self.overlay.insertAfter(modal);
                } else {
                    self.overlay.appendTo(body);
                }
                
                self.overlay.fadeIn(self.fadeIn);
            };

            /**
             * Initilaze event for show(fade in) modal window by query selector or data identifier
             *
             * @returns {undefined}
             */
            this._show = function(ident, selector) {

                var self = this,
                    body = $('body');

                if(
                    typeof ident === 'undefined' &&
                    typeof selector === 'undefined'
                ) {
                    return;
                }

                if(ident) {
                    var modal = body.find('[data-timoMIdent="' + ident + '"]');
                } else if(selector) {
                    var modal = body.find(selector);
                }

                try {
                    modal.fadeIn(self.fadeIn);
                    self._overlay(modal); // with object add overlay after this object, without add into end of body
                    
                } catch (e) {
                    console.warn(e);
                }
            };


            /**
             * Initilaze event for hide(fade out) all modal windows on page
             *
             * @returns {undefined}
             */
            this._hide = function() {

                var self    = this,
                    body    = $('body');

                body.on('click', '.modal-close, #timo-overlay',function() {

                    try {
                        var modal = $('[data-timoMIdent]');

                        self.overlay.fadeOut(self.fadeOut, function() {
                            self.overlay.remove();
                        });
                        modal.fadeOut(self.fadeOut);

                    } catch (e) {
                        console.warn(e);
                    };
               });
             };
        };

        /**
         * Initialize object variables
         *
         * TODO
         * Add save to local or session storage initialized object for every page by url for speed up initialization
         *
         * @param {object} options
         */
        timo.initialize = function(options, debug) {

            var self = new timo();

            if(typeof options !== 'object') {
                return;
            }

            self.debug = debug;
            
            if(self.debug) {
                console.group('debug');
                console.time('Initialization time took');
            }

            for (var key in options){
                if (options.hasOwnProperty(key) && self.hasOwnProperty(key)) {
                    self[key] = options[key];
                }
            }
            
            if(self.debug) {
                console.info('%c timoJs initialized with following options', 'background: #000; color: #ffff00');
                console.info(options);
            }

            /**
             * TODO
             * Add new private method for bind events (code below)
             */

            /**
             * Bind events to all timo links
             *
             * @type object
             */
            var openModalLinks = $('[data-timoLIdent]');

            $.each(openModalLinks, function(i, item, openModalLinks) {

                var el       = $(this),
                    body     = $('body'),
                    event    = el.data('timoevent'),
                    ident    = el.data('timolident'),
                    prevent  = el.data('timoprevent'),
                    selector = el.data('timoselector');

                    body.on(event, '[data-timoLIdent="' + ident + '"]', function(e) {
                        if(prevent) {
                            e.preventDefault();
                        }

                        self._show(ident, selector);
                    });
            });

            self._hide();

            if(self.debug) {
                console.timeEnd('Initialization time took');
                console.info('%c timoJs plugin is successful initialized! enjoy it;)', 'background: #000; color: #ffff00');
                console.groupEnd();
            }
        };


        /**
         * Return main instance
         */
        return timo;

    };

    /**
     * Create timo instance
     */
    var timoExport = typeof global.document === 'object' ? factory(global) : factory;


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
