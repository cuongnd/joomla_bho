(function ($) {    // here we go!    $.mod_search = function (element, options) {        // plugin's default options        var defaults = {            //main color scheme for mod_search            //be sure to be same as colors on main.css or custom-variables.less            module_id: 0,            style: "table",            key: "product",            params: {}        }        // current instance of the object        var plugin = this;        // this will hold the merged default, and user-provided options        plugin.settings = {}        var $element = $(element), // reference to the jQuery version of DOM element            element = element;    // reference to the actual DOM element        // the "constructor" method that gets called when the object is created        plugin.init = function () {            plugin.settings = $.extend({}, defaults, options);            var params = plugin.settings.params;            var key = plugin.settings.key;            $element.find('a.key').click(function(){                var key=$(this).data('key');                var text=$(this).data('text');                var page_show_result=$(this).data('page_show_result');                var placeholder=$(this).data('placeholder');                $element.find('span.text').text(text);                $element.find('input[name="keyword"]').attr('placeholder',placeholder);                $element.find('#relative-flexdatalist').attr('placeholder',placeholder);                $element.find('input[name="Itemid"]').val(page_show_result);                $element.find('input[name="key"]').val(key);                var $input= $element.find('input[name="keyword"]');                if(key=='product'){                    $input.flexdatalist('searchIn',["product_id","product_name"]);                    $input.flexdatalist('textProperty','{product_name}');                    $input.flexdatalist('visibleProperties',["product_id","product_name"]);                    $input.flexdatalist('valueProperty',['product_id','product_name']);                }else if(key=="category"){                    $input.flexdatalist('searchIn',["category_id","category_name"]);                    $input.flexdatalist('visibleProperties',["category_id","category_name"]);                    $input.flexdatalist('textProperty','{category_name}');                    $input.flexdatalist('valueProperty',['category_id','category_name']);                }else{                    $input.flexdatalist('searchIn',["product_id","product_name"]);                    $input.flexdatalist('visibleProperties',["product_id","product_name"]);                    $input.flexdatalist('textProperty','{product_name}');                    $input.flexdatalist('valueProperty',['product_id','product_name']);                }                $input.flexdatalist('url','/index.php?option=com_hikashop&ctrl=product&task=ajax_search_by_keyword&key='+key);            });            $element.find('input[name="keyword"]').flexdatalist({                relatives: '#relative',                url: '/index.php?option=com_hikashop&ctrl=product&task=ajax_search_by_keyword&key='+key,                searchIn: ["product_id","product_name"],                visibleProperties: ["product_id","product_name"],                textProperty: '{product_name}',                minLength: 1,                requestType: 'post',                valueProperty: ['product_id','product_name'],                searchContain: true            });            var $form = $element.find('form[name="search"]');            $form.submit(function () {                var list_language=plugin.settings.list_language;                var keyword=$form.find('input[name="keyword"]').val();                if(keyword.trim()==""){                    $.notify($.Jtext_('MOD_SEARCH_PLACE_INPUT_KEY_WORD',list_language));                    $form.find('input[id="relative-flexdatalist"]').focus();                    return false;                }                return true;            });        }        plugin.example_function = function () {        }        plugin.init();    }    // add the plugin to the jQuery.fn object    $.fn.mod_search = function (options) {        // iterate through the DOM elements we are attaching the plugin to        return this.each(function () {            // if plugin has not already been attached to the element            if (undefined == $(this).data('mod_search')) {                var plugin = new $.mod_search(this, options);                $(this).data('mod_search', plugin);            }        });    }})(jQuery);