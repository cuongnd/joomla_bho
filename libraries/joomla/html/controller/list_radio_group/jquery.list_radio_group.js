//huong dan su dung/* $('.list_radio_group').list_radio_group(); list_radio_group=$('.list_radio_group').data('list_radio_group'); console.log(list_radio_group); */// jQuery Plugin for SprFlat admin list_radio_group// Control options and basic function of list_radio_group// version 1.0, 28.02.2013// by SuggeElson www.suggeelson.com(function ($) {    // here we go!    $.list_radio_group = function (element, options) {        // plugin's default options        var defaults = {            //main color scheme for list_radio_group            //be sure to be same as colors on main.css or custom-variables.less        }        // current instance of the object        var plugin = this;        // this will hold the merged default, and user-provided options        plugin.settings = {}        var $element = $(element), // reference to the jQuery version of DOM element            element = element;    // reference to the actual DOM element        // the "constructor" method that gets called when the object is created        plugin.init = function () {            plugin.settings = $.extend({}, defaults, options);            $element.find('label.radio-group').click(function(){                $(this).addClass('btn-info').siblings().removeClass('btn-info');            });        }        plugin.example_function = function () {        }        plugin.init();    }    // add the plugin to the jQuery.fn object    $.fn.list_radio_group = function (options) {        // iterate through the DOM elements we are attaching the plugin to        return this.each(function () {            // if plugin has not already been attached to the element            if (undefined == $(this).data('list_radio_group')) {                var plugin = new $.list_radio_group(this, options);                $(this).data('list_radio_group', plugin);            }        });    }})(jQuery);