//huong dan su dung
/*
 $('.view_productmarket_form').view_productmarket_form();

 view_productmarket_form=$('.view_productmarket_form').data('view_productmarket_form');
 console.log(view_productmarket_form);
 */

// jQuery Plugin for SprFlat admin view_productmarket_form
// Control options and basic function of view_productmarket_form
// version 1.0, 28.02.2013
// by SuggeElson www.suggeelson.com

(function ($) {

    // here we go!
    $.view_productmarket_form = function (element, options) {

        // plugin's default options
        var defaults = {
            show_help:true,
            enable_audio:true,
            user_dont_show_help:true,
            list_messenger:[]
            //main color scheme for view_productmarket_form
            //be sure to be same as colors on main.css or custom-variables.less

        }

        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.set_help = function () {
            list_messenger=plugin.settings.list_messenger;
            var i = 1;
            var $item_element = $element.find('.btn.cartlink');

            $item_element.attr('data-intro',list_messenger["HIKA_CART_CONNECT"]);

            var $item_element = $element.find('.btn.apply');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_APPLY"] );

            var $item_element = $element.find('.btn.save');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_SAVE"] );

            var $item_element = $element.find('.images-library');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_LIBRARY"] );

            var $item_element = $element.find('#hikamarket_product_image_uploadpopup');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_IMAGE_COMPUTER"] );

            var $item_element = $element.find('#hikamarket_product_image_addpopup');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_IMAGE_UPLOAD"] );

            var $item_element = $element.find('.hikamarket_product_main_image_thumb');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_ARRANGE_IMAGE"] );

            var $item_element = $element.find('input[name="data[product][product_name]"]');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_NAME_PRODUCT"] );

             var $item_element = $element.find('input[name="data[product][product_code]"]');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_CODE_PRODUCT"] );

             var $item_element = $element.find('input#data_product__product_quantity');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_NUMBER_PRODUCT"] );

             var $item_element = $element.find('div#data_product_categories');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_GROUP_PRODUCT"] );

             var $item_element = $element.find('dd.hikamarket_product_published');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_BLOCK_LIST"] );

             var $item_element = $element.find('dd.hikamarket_product_description');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_DEPICTION_NOTE"] );

             var $item_element = $element.find('dd.hikamarket_product_keywords');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_KEY_WORD"] );

             var $item_element = $element.find('dd.hikamarket_product_alias');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_ALIAS_NOTE"] );

             var $item_element = $element.find('dd.hikamarket_product_tags');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_TAGS"] );

             var $item_element = $element.find('dd.hikamarket_product_characteristics');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_CHARACTER"] );

             var $item_element = $element.find('dd.hikamarket_product_options');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_OPTION"] );

             var $item_element = $element.find('h4.hika_production_price');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_PRICE"] );

             var $item_element = $element.find('dd.hikamarket_product_tinh_trang_hang_hoa');

            $item_element.attr('data-intro',list_messenger["HIKA_NOTE_CONDITION_PRODUCT"] );

        };
        plugin.close_help_tour = function () {
            help_tour=plugin.settings.help_tour;
            key_dont_show_agian = plugin.settings.key_dont_show_agian;
            help_dont_show_again=help_tour._options.help_dont_show_again;
            console.log(help_tour);
            var option_click= {
                option:"com_hikamarket",
                ctrl:"product",
                task: "ajax_change_status_help_dont_show_again",
                format: 'json',
                help_dont_show_again: help_dont_show_again,
                key_dont_show_agian: key_dont_show_agian,
                tmpl: 'json',
                ignoreMessages: true
            };
            option_click= $.param(option_click);
            var data_submit={};
            var ajax_web_design=$.ajax({
                contentType: 'application/json',
                type: "POST",
                dataType: "json",
                url: root_ulr+'/index.php?'+option_click,
                data: JSON.stringify(data_submit),
                beforeSend: function () {
                    $('.div-loading').show();
                },
                success: function (response) {
                    $('.div-loading').hide();


                }
            });
        }
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            var show_help=plugin.settings.show_help;
            var user_dont_show_help=plugin.settings.user_dont_show_help;
            var enable_audio = plugin.settings.enable_audio;
            plugin.set_help();
            var help_tour = introJs();
            help_tour.setOption('tooltipPosition', 'auto');
            help_tour.setOption('teletype', false);
            help_tour.setOption('help_dont_show_again', user_dont_show_help);
            help_tour.setOption('auto_play', true);
            help_tour.setOption('enable_audio', enable_audio);
            help_tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
            help_tour.onexit(function () {
                plugin.close_help_tour();
            });
            help_tour.oncomplete(function () {
                plugin.close_help_tour();
            });
            plugin.settings.help_tour = help_tour;
            if(user_dont_show_help==0 && show_help) {
                help_tour.start();
            }
            $element.find('div.btn.help').click(function () {
                help_tour.start();

            });
        }

        plugin.example_function = function () {

        }
        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.view_productmarket_form = function (options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function () {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('view_productmarket_form')) {
                var plugin = new $.view_productmarket_form(this, options);

                $(this).data('view_productmarket_form', plugin);

            }

        });

    }

})(jQuery);
