//huong dan su dung/* $('.mod_tab_products').mod_tab_products(); mod_tab_products=$('.mod_tab_products').data('mod_tab_products'); console.log(mod_tab_products); */// jQuery Plugin for SprFlat admin mod_tab_products// Control options and basic function of mod_tab_products// version 1.0, 28.02.2013// by SuggeElson www.suggeelson.com(function ($) {    // here we go!    $.mod_tab_products = function (element, options) {        // plugin's default options        var defaults = {            //main color scheme for mod_tab_products            //be sure to be same as colors on main.css or custom-variables.less            module_id: 0,            lazyload: false,            deconstruction: false,            style: "table",            showing: false,            params: {},            tab_active: 0,        }        // current instance of the object        var plugin = this;        // this will hold the merged default, and user-provided options        plugin.settings = {}        var $element = $(element), // reference to the jQuery version of DOM element            element = element;    // reference to the actual DOM element        // the "constructor" method that gets called when the object is created        plugin.build_module = function () {            plugin.rebuild_style();            plugin.build_tab();        };        plugin.rebuild_style = function () {            var style = plugin.settings.style;            if (style == 'slider') {                /* $element.find('.product_slide').slick({                 // normal options...                 infinite: true,                 fade: true,                 slidesToShow: 3,                 slidesToScroll: 3,                 // the magic                 });*/                $element.find('.product_slide').vtvslider({});            }            $element.find('.sub-category').click(function () {                var $wrapper_content = $(this).closest('.wrapper-content');                var option_click = {                    option: 'com_hikashop',                    ctrl: 'product',                    task: 'ajax_get_product_by_category_id_and_type'                };                option_click = $.param(option_click);                var data_submit = {};                data_submit.category_id = $(this).data('category_id');                data_submit.params = plugin.settings.params;                var ajax_web_design = $.ajax({                    contentType: 'application/json',                    type: "POST",                    dataType: "json",                    url: root_ulr + 'index.php?' + option_click,                    data: JSON.stringify(data_submit),                    beforeSend: function () {                        $wrapper_content.find('.list-product').bho88loading();                    },                    success: function (response) {                        $wrapper_content.find('.list-product').bho88loading(true);                        if (response.e == 0) {                            var list_product = response.r;                            var $product_slide = $wrapper_content.find('.product_slide').data('vtvslider');                            $product_slide.update_product(list_product);                        } else if (response.e == 1) {                            alert(response.m);                        }                    }                });            });        };        plugin.setup_vtvslider = function ($content_inner) {            $content_inner.find('.product_slide').vtvslider({});        };        plugin.sub_category_slider = function ($content_inner) {            var $sub_category = $content_inner.find('.list-sub-category');            var options = {                horizontal: 1,                itemNav: 'basic',                speed: 300,                mouseDragging: 1,                touchDragging: 1,                forward: $sub_category.find('.forward'),                backward: $sub_category.find('.backward'),            };            $sub_category.find('.slider.frame').sly(options);        };        plugin.flip_image = function ($content_inner) {            $content_inner.find('.flip-image').flip({                reverse: false,                trigger: "hover",                speed: 500,                forceHeight: true,                forceWidth: true,                autoSize: true            });        };        plugin.fix_link_product = function ($content_inner) {            $content_inner.find('.item .link-product').dotdotdot();        };        plugin.init_content_inner = function ($content_inner) {            //$content_inner.find("img").lazyLoadXT({visibleOnly: true, checkDuplicates: true});        };        plugin.build_tab = function () {            var module_id = plugin.settings.module_id;            var params = plugin.settings.params;/*            $element.find('#tab_product_' + module_id).zozoTabs({            });*/        };        plugin.set_event_tab_select=function(){            var module_id = plugin.settings.module_id;            var params = plugin.settings.params;            $element.find('#tab_product_' + module_id).zozoTabs({                theme: params.theme,                orientation: params.orientation,                position: params.position,                animation: {                    easing: "easeInOutExpo",                    duration: 400,                    effects: params.effects                },                modes: "menu",                event: params.event,                classes: params.classes,                defaultTab: "tab1",                multiline: (typeof params.multiline === "undefined") ? false : (params.multiline == "true" ? true : false),                rounded: (typeof params.zozo_rounded === "undefined") ? false : (params.zozo_rounded == "true" ? true : false),                mobileNav: (typeof params.mobileNav === "undefined") ? false : (params.mobileNav == "true" ? true : false),                multiline: (typeof params.multiline === "undefined") ? false : (params.multiline == "true" ? true : false),                rememberState: (typeof params.rememberState === "undefined") ? true : (params.rememberState == "true" ? true : false),                shadows: (typeof params.shadows === "undefined") ? true : (params.shadows == "true" ? true : false),                minWindowWidth: params.minWindowWidth | 200,                size: params.size | "xxlarge",                maxRows: params.maxRows || 200,                select: function (event, item) {                    var $content_inner=$(item.tab.context).find('.z-container .z-content.z-active .z-content-inner');                    var ajax_completed=$content_inner.data('ajax_completed');                    if(ajax_completed)                    {                        return false;                    }                    $content_inner.data('ajax_completed',true);                    var option_click = {                        option: 'com_modules',                        format: 'json',                        tmpl: 'json',                        ignoreMessages: true,                        task: 'module.ajax_render_module'                    };                    option_click = $.param(option_click);                    var category_id= item.tab.data('category_id');                    var data_submit = {                        category_id:category_id,                        params: {                            layout: '_:products'                        }                    };                    data_submit.module_id = module_id;                    var ajax_web_design = $.ajax({                        contentType: 'application/json',                        type: "POST",                        dataType: "json",                        cache: true,                        url: root_ulr + 'index.php?' + option_click,                        data: JSON.stringify(data_submit),                        data: JSON.stringify(data_submit),                        beforeSend: function () {                            $(item.tab.context).find('.z-container .z-content.z-active .z-content-inner').bho88loading();                        },                        success: function (response) {                            //$wrapper_content_tab.bho88loading(false);                            if (response.success == true) {                                //z-content-inner                                var data = response.data;                                $content_inner.html(data);                            } else if (response.success == false) {                                alert(response.message);                            }                            plugin.flip_image($content_inner);                            plugin.fix_link_product($content_inner);                            plugin.set_event_sub_tab($content_inner);                            plugin.setup_vtvslider($content_inner);                            plugin.sub_category_slider($content_inner);                            plugin.init_content_inner($content_inner);                        }                    });                }            });        }        plugin.set_event_sub_tab=function($content_inner){            $content_inner.find('.sub-category').click(function () {                var $wrapper_content = $content_inner.closest('.wrapper-content');                var option_click = {                    option: 'com_hikashop',                    ctrl: 'product',                    task: 'ajax_get_product_by_category_id_and_type'                };                option_click = $.param(option_click);                var data_submit = {};                data_submit.category_id = $(this).data('category_id');                data_submit.params = plugin.settings.params;                var ajax_web_design = $.ajax({                    contentType: 'application/json',                    type: "POST",                    dataType: "json",                    url: root_ulr + 'index.php?' + option_click,                    data: JSON.stringify(data_submit),                    beforeSend: function () {                        $wrapper_content.find('.list-product').bho88loading();                    },                    success: function (response) {                        $wrapper_content.find('.list-product').bho88loading(true);                        if (response.e == 0) {                            var list_product = response.r;                            var $product_slide = $content_inner.find('.product_slide').data('vtvslider');                            $product_slide.update_product(list_product);                        } else if (response.e == 1) {                            alert(response.m);                        }                    }                });            });        }        plugin.init = function () {            plugin.settings = $.extend({}, defaults, options);            $.set_height($element.find('.item .title'));            var style = plugin.settings.style;            var module_id = plugin.settings.module_id;            var lazyload = plugin.settings.lazyload;            if (lazyload) {                $element.appear(function () {                    console.log('25666666666');                });                $(document.body).on('appear', '#mod_tab_products_' + module_id, function (e, $affected) {                    // this code is executed for each appeared element                    if (!plugin.settings.showing) {                        plugin.settings.showing = true;                        setTimeout(function () {                            console.log('fsdsdsdsd');                            plugin.build_module();                        }, 4000);                    }                });            } else {                plugin.rebuild_style();                plugin.build_tab();                $element.appear();                $element.on('appear', function(event, $all_appeared_elements) {                    var event_tab_select=$all_appeared_elements.data('event_tab_select');                    if(event_tab_select==1){                    }else{                        plugin.set_event_tab_select();                        $all_appeared_elements.data('event_tab_select',1);                    }                });            }            var deconstruction = plugin.settings.deconstruction;            if (deconstruction) {                var params = plugin.settings.params;                $element.find('#tab_product_' + module_id).zozoTabs({                    theme: params.theme,                    orientation: params.orientation,                    position: params.position,                    size: "medium",                    animation: {                        easing: "easeInOutExpo",                        duration: 400,                        effects: params.effects                    },                    modes: "menu",                    select: function (event, item) {                        var y = $(window).scrollTop();  //your current y position on the page                        $(window).scrollTop(y + 1);                    },                    event: params.event,                    classes: params.classes,                    defaultTab: "tab1",                    multiline: (typeof params.multiline === "undefined") ? false : (params.multiline == "true" ? true : false),                    rounded: (typeof params.zozo_rounded === "undefined") ? false : (params.zozo_rounded == "true" ? true : false),                    mobileNav: (typeof params.mobileNav === "undefined") ? false : (params.mobileNav == "true" ? true : false),                    multiline: (typeof params.multiline === "undefined") ? false : (params.multiline == "true" ? true : false),                    rememberState: (typeof params.rememberState === "undefined") ? true : (params.rememberState == "true" ? true : false),                    shadows: (typeof params.shadows === "undefined") ? true : (params.shadows == "true" ? true : false),                    minWindowWidth: params.minWindowWidth | 200,                    size: params.size | "xxlarge",                    maxRows: params.maxRows || 200                });            }        }        plugin.example_function = function () {        }        plugin.init();    }    // add the plugin to the jQuery.fn object    $.fn.mod_tab_products = function (options) {        // iterate through the DOM elements we are attaching the plugin to        return this.each(function () {            // if plugin has not already been attached to the element            if (undefined == $(this).data('mod_tab_products')) {                var plugin = new $.mod_tab_products(this, options);                $(this).data('mod_tab_products', plugin);            }        });    }})(jQuery);