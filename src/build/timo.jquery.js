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
        var timo = function() {

            // Add private variables

            /**
             * Debug logs
             *
             * @param {integer} debug
             */
            this.debug = false;

            /**
             * TODO
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
             * Animate object
             *
             * Param enabled true|false by default false
             *
             * Object `show` and `hide` set or rewrite all params
             * from jQuery animate http://api.jquery.com/animate/ object
             *
             * Structure:
             *
             *  animate = {
             *      enabled: true|false,
             *      show: {
             *          properties: {
             *              duration : 400,
             *              easing   : swing,
             *              complete : function(){}
             *          },
             *          options: {
             *              duration: 400,
             *              easing: swing,
             *              queue: true,
             *              specialEasing: {
             *                  ...
             *              }
             *
             *              ...
             *          }
             *      }
             *      hide: {
             *          properties: {
             *              ...
             *          },
             *          options: {
             *              ...
             *          }
             *      }
             *  }
             *
             *  `show' used for fade in modal window
             *  `hide' used for fade out modal window
             *
             * @param {object} animate
             */
            this.animate = {
                enabled    : false,
                show: {
                  properties : {},
                  options    : {}
                },
                hide: {
                  properties : {},
                  options    : {}
                }
            };

            // Add private methods

            /**
             * Create and add to <body> new element '<div id="overlay"></div>'
             *
             * @returns {undefined}
             */
            this._overlay = function() {

                var self    = this,
                    body    = $('body');

                var overlay = $('<div id="overlay"></div>');
                    overlay.appendTo(body);
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

                    self._overlay();

                    if(self.animate.enabled) {
                        $('#overlay').fadeIn(
                            self.fadeIn,
                            function() {
                                modal
                                    .css('display', 'block')
                                    .animate(
                                        self.animate.show.options,
                                        self.animate.show.properties
                                    );
                            }
                        );
                    } else {
                        $('#overlay').fadeIn(self.fadeIn);

                        modal.show(self.fadeIn, function() {
                            modal.css('opacity', '1');
                        });
                    }
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

                body.on('click', '#modal_close, #overlay',function() {

                    try {
                        var modal = $('[data-timoMIdent]');

                        if(self.animate.enabled) {

                            $('#overlay').fadeOut(
                                self.fadeOut,
                                function() {
                                    modal
                                        .css('display', 'none')
                                        .animate(
                                            self.animate.hide.options,
                                            self.animate.hide.properties
                                        );
                                }
                            );

                        } else {
                            modal.hide(self.fadeOut, function() {
                                modal.css('opacity', '0');
                            });

                            $('#overlay').fadeOut(self.fadeOut, function() {
                                $('#overlay').remove();
                            });
                        }

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

            var self = this;

            if(typeof options !== 'object') {
                return;
            }

            self.debug = debug;

            for (var key in options){
                if (options.hasOwnProperty(key) && self.hasOwnProperty(key)) {
                    self[key] = options[key];

                    if(self.debug) {
                        console.info('timoJs initialized with following options');
                        console.info(options);
                    }
                }
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

            console.info('%c timoJs plugin is successful initialized! enjoy it;)', 'background: #000; color: #ffff00');

        };


        /**
         * Return main insance
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
