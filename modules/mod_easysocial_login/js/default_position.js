//huong dan su dung
/*
 $('.default_position').default_position();

 default_position=$('.default_position').data('default_position');
 console.log(default_position);
 */

// jQuery Plugin for SprFlat admin default_position
// Control options and basic function of default_position
// version 1.0, 28.02.2013
// by SuggeElson www.suggeelson.com

(function($) {

    // here we go!
    $.default_position = function(element, options) {

        // plugin's default options
        var defaults = {
            //main color scheme for default_position
            //be sure to be same as colors on main.css or custom-variables.less
            module_id:0,
            style:"table",
            second:200,
            params:{}

        }

        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            var second=plugin.settings.second;
            var timeout;
            $element.find('>a.login').hover(

                function () {
                    clearTimeout(timeout);
                    $(this).addClass('hover');
                    $element.find('>.es.mod-es-login').show();




                },

                function () {

                    $(this).removeClass('hover');
                    timeout = setTimeout(function() {
                        $element.find('>.es.mod-es-login').hide();
                    }, second);






                }

            );
            $element.find('>.es.mod-es-login').hover(function() {
                clearTimeout(timeout);
                $element.find('>a.login').addClass('hover');
            }, function() {
                timeout = setTimeout(function() {
                    $element.find('>.es.mod-es-login').hide();
                    $element.find('>a.login').removeClass('hover');
                }, second);

            });
            $element.find('>a.profile-name').hover(

                function () {
                    clearTimeout(timeout);
                    $(this).addClass('hover');
                    $element.find('>.es.mod-es-login').show();




                },

                function () {

                    $(this).removeClass('hover');
                    timeout = setTimeout(function() {
                        $element.find('>.es.mod-es-login').hide();
                    }, second);






                }

            );
            $element.find('>.es.mod-es-login').hover(function() {
                clearTimeout(timeout);
                $element.find('>a.profile-name').addClass('hover');
            }, function() {
                timeout = setTimeout(function() {
                    $element.find('>.es.mod-es-login').hide();
                    $element.find('>a.profile-name').removeClass('hover');
                }, second);

            });


        }

        plugin.example_function = function() {

        }
        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.default_position = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('default_position')) {
                var plugin = new $.default_position(this, options);

                $(this).data('default_position', plugin);

            }

        });

    }

})(jQuery);