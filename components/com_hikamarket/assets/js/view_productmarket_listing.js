//huong dan su dung/* $('.view_productmarket_listing').view_productmarket_listing(); view_productmarket_listing=$('.view_productmarket_listing').data('view_productmarket_listing'); console.log(view_productmarket_listing); */// jQuery Plugin for SprFlat admin view_productmarket_listing// Control options and basic function of view_productmarket_listing// version 1.0, 28.02.2013// by SuggeElson www.suggeelson.com(function ($) {    // here we go!    $.view_productmarket_listing = function (element, options) {        // plugin's default options        var defaults = {            show_help:true,            enable_audio:true,            user_dont_show_help:true,            list_messenger:[]            //main color scheme for view_productmarket_listing            //be sure to be same as colors on main.css or custom-variables.less        }        // current instance of the object        var plugin = this;        // this will hold the merged default, and user-provided options        plugin.settings = {}        var $element = $(element), // reference to the jQuery version of DOM element            element = element;    // reference to the actual DOM element        // the "constructor" method that gets called when the object is created        plugin.set_help = function () {            list_messenger=plugin.settings.list_messenger;            var i = 1;            var $item_element = $element.find('.btn.new-product');            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_BUTTON_ADD_NEW_PRODUCT"]);            var $item_element = $element.find('.search-product-area');            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_AREA_SEARCH_PRODUCT"]);            var $item_element = $element.find('td.categories');            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_FILLTER_BY_CATEGORY"]);        };        plugin.close_help_tour = function () {            help_tour=plugin.settings.help_tour;            key_dont_show_agian = plugin.settings.key_dont_show_agian;            help_dont_show_again=help_tour._options.help_dont_show_again;            console.log(help_tour);            var option_click= {                option:"com_hikamarket",                ctrl:"product",                task: "ajax_change_status_help_dont_show_again",                format: 'json',                help_dont_show_again: help_dont_show_again,                key_dont_show_agian: key_dont_show_agian,                tmpl: 'json',                ignoreMessages: true            };            option_click= $.param(option_click);            var data_submit={};            var ajax_web_design=$.ajax({                contentType: 'application/json',                type: "POST",                dataType: "json",                url: root_ulr+'/index.php?'+option_click,                data: JSON.stringify(data_submit),                beforeSend: function () {                    $('.div-loading').show();                },                success: function (response) {                    $('.div-loading').hide();                }            });        }        plugin.init = function () {            plugin.settings = $.extend({}, defaults, options);            var show_help=plugin.settings.show_help;            var user_dont_show_help=plugin.settings.user_dont_show_help;            var enable_audio = plugin.settings.enable_audio;            plugin.set_help();            var help_tour = introJs();            help_tour.setOption('tooltipPosition', 'auto');            help_tour.setOption('teletype', false);            help_tour.setOption('help_dont_show_again', user_dont_show_help);            help_tour.setOption('auto_play', true);            help_tour.setOption('enable_audio', enable_audio);            help_tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);            help_tour.onexit(function () {                plugin.close_help_tour();            });            help_tour.oncomplete(function () {                plugin.close_help_tour();            });            plugin.settings.help_tour = help_tour;            if(user_dont_show_help==0 && show_help) {                help_tour.start();            }            $element.find('div.btn.help').click(function () {                help_tour.start();            });        }        plugin.example_function = function () {        }        plugin.init();    }    // add the plugin to the jQuery.fn object    $.fn.view_productmarket_listing = function (options) {        // iterate through the DOM elements we are attaching the plugin to        return this.each(function () {            // if plugin has not already been attached to the element            if (undefined == $(this).data('view_productmarket_listing')) {                var plugin = new $.view_productmarket_listing(this, options);                $(this).data('view_productmarket_listing', plugin);            }        });    }})(jQuery);