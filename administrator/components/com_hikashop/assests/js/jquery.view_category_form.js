//huong dan su dung
/*
 $('.view_category_form').view_category_form();

 view_category_form=$('.view_category_form').data('view_category_form');
 console.log(view_category_form);
 */

// jQuery Plugin for SprFlat admin view_category_form
// Control options and basic function of view_category_form
// version 1.0, 28.02.2013
// by SuggeElson www.suggeelson.com

(function($) {

    // here we go!
    $.view_category_form = function(element, options) {

        // plugin's default options
        var defaults = {
            //main color scheme for view_category_form
            //be sure to be same as colors on main.css or custom-variables.less

        }

        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.get_alias = function() {
            $element.find('button.auto-get-alias').click(function(){
                var element_name='data[category][category_alias]';
                var title=$element.find('input[name="data[category][category_name]"]').val();
                var option_click= {
                    option:"com_hikashop",
                    ctrl:"category",
                    task: "auto_get_alias",
                    format: 'json',
                    tmpl: 'json',
                    ignoreMessages: true
                };
                option_click= $.param(option_click);
                var data_submit={};
                data_submit.title=title;
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

                        $element.find('textarea[name="'+element_name+'"]').val(response.data);
                    }
                });
            });

        };
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.get_alias();

        }

        plugin.example_function = function() {

        }
        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.view_category_form = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('view_category_form')) {
                var plugin = new $.view_category_form(this, options);

                $(this).data('view_category_form', plugin);

            }

        });

    }

})(jQuery);
