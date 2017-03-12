//huong dan su dung
/*
 $('.field_controller_location').field_controller_location();
 field_controller_location=$('.field_controller_location').data('field_controller_location');
 console.log(field_controller_location);
 */
// jQuery Plugin for SprFlat admin field_controller_location
// Control options and basic function of field_controller_location
// version 1.0, 28.02.2013
// by SuggeElson www.suggeelson.com
(function ($) {
    // here we go!
    $.field_controller_location = function (element, options) {
        // plugin's default options
        var defaults = {
            //main color scheme for field_controller_location
            //be sure to be same as colors on main.css or custom-variables.less
            input_name: "",
            field: {},
        }
        // current instance of the object
        var plugin = this;
        // this will hold the merged default, and user-provided options
        plugin.settings = {}
        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element
        // the "constructor" method that gets called when the object is created
        plugin.update_data = function () {
            var $list_item=$element.find('.item');
            var list_item=[];
            for(var i=0;i<$list_item.length;i++) {
                var $item=$list_item.eq(i);
                var item={};
                item.gllpLatitude = $item.find('.gllpLatitude').val();
                item.gllpLongitude = $item.find('.gllpLongitude').val();
                item.gllpZoom = $item.find('.gllpZoom').val();
                item.address = $item.find('textarea.address').val();
                list_item.push(item);
            }
            var input_name=plugin.settings.input_name;
            list_item=cassandraMAP.stringify(list_item);
            console.log(list_item);
            $element.find('input[name="'+input_name+'"]').val(list_item);
        };
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            plugin.settings.html_item_template= $element.find(".item").getOuterHTML();
            $element.find(".gllpLatlonPicker").each(function () {
                var $obj = $(document).gMapsLatLonPicker();
                $obj.params.strings.markerText = "Drag this Marker (example edit)";
                $obj.params.displayError = function (message) {
                    console.log("MAPS ERROR: " + message); // instead of alert()
                };
                $(this).on( "location_changed", function() {
                    plugin.update_data();
                });
                $obj.init($(this));
            });
            $element.on('click', '.btn.add',function(){
                var $item=$(this).closest('.item');
                var $new_item= $(plugin.settings.html_item_template);
                $new_item.insertAfter($item);
                var $obj = $(document).gMapsLatLonPicker();
                $obj.params.strings.markerText = "Drag this Marker (example edit)";
                $obj.params.displayError = function (message) {
                    console.log("MAPS ERROR: " + message); // instead of alert()
                };
                var $gllpLatlonPicker=$new_item.find('.gllpLatlonPicker');
                $gllpLatlonPicker.on( "location_changed", function() {
                    plugin.update_data();
                });
                $obj.init($gllpLatlonPicker);
            });
            $element.on('click', '.btn.remove',function(){
                if($element.find('.item').length>1)
                {
                    var $item=$(this).closest('.item');
                    $item.remove();
                }
            });
            $element.on('change','input,textarea',function(){
                plugin.update_data();
            });
        }
        plugin.example_function = function () {
        }
        plugin.init();
    }
    // add the plugin to the jQuery.fn object
    $.fn.field_controller_location = function (options) {
        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function () {
            // if plugin has not already been attached to the element
            if (undefined == $(this).data('field_controller_location')) {
                var plugin = new $.field_controller_location(this, options);
                $(this).data('field_controller_location', plugin);
            }
        });
    }
})(jQuery);