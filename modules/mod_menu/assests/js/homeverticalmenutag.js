//huong dan su dung/* $('.homeverticalmenutag').homeverticalmenutag(); homeverticalmenutag=$('.homeverticalmenutag').data('homeverticalmenutag'); console.log(homeverticalmenutag); */// jQuery Plugin for SprFlat admin homeverticalmenutag// Control options and basic function of homeverticalmenutag// version 1.0, 28.02.2013// by SuggeElson www.suggeelson.com(function ($) {    // here we go!    $.homeverticalmenutag = function (element, options) {        // plugin's default options        var defaults = {            //main color scheme for homeverticalmenutag            //be sure to be same as colors on main.css or custom-variables.less            module_id: 0,            second: 200,            key_cookie_sub_menu:'sub_content_menu_id_'        }        // current instance of the object        var plugin = this;        // this will hold the merged default, and user-provided options        plugin.settings = {}        var $element = $(element), // reference to the jQuery version of DOM element            element = element;    // reference to the actual DOM element        // the "constructor" method that gets called when the object is created        plugin.quick_search_sub_menu = function ($content_inner) {            var list_menu_item_text=[];            for(var i=0; i<$content_inner.find('a').length;i++){                var tag_a_text=$content_inner.find('a:eq('+i+')').text();                var item={};                item.key=i;                item.text=tag_a_text;                list_menu_item_text.push(item) ;            }            let test=1;/*            $content_inner.find('input.quick_search').flexdatalist({                data: list_menu_item_text,                searchIn: 'text',                searchByWord: true,                selectionRequired: true,                valueProperty: '*',                minLength: 1,                limitOfValues: 2,                change:function(){                }            }).on('before:flexdatalist.search', function(instance,keywords, data) {                keywords=keywords.toLowerCase();                if(keywords.trim()==''){                    $content_inner.find('a').show();                }else {                    for (var i = 0; i < $content_inner.find('a').length; i++) {                        var $tag_a = $content_inner.find('a:eq(' + i + ')');                        var tag_a_text = $tag_a.text();                        var $li = $tag_a.parent();                        if (tag_a_text.toLowerCase().indexOf(keywords) > -1) {                            $li.show();                        } else {                            $li.hide();                        }                    }                }            }).on('change:flexdatalist', function(instance,value,text, options) {                if(value!="") {                    text=text.toLowerCase();                    for (var i = 0; i < $content_inner.find('a').length; i++) {                        var $tag_a = $content_inner.find('a:eq(' + i + ')');                        var tag_a_text = $tag_a.text();                        var $li = $tag_a.parent();                        if (tag_a_text.toLowerCase().indexOf(text) > -1) {                            $li.show();                        } else {                            $li.hide();                        }                    }                }            });*/;        };        plugin.init = function () {            plugin.settings = $.extend({}, defaults, options);            var second = plugin.settings.second;            $element.hover(function () {                //$('body').addClass('header_bar_hover');                //$('#sp-top-wrapper.nav-container-fix').hide();            }, function () {                //$('body').removeClass('header_bar_hover');                //$('#sp-top-wrapper.nav-container-fix').show();            });            /*$element.find('.device-xs-to-lg .container-home-page .container-content').mCustomScrollbar({                axis: "y"            });*/            var hoverTimeout;            $element.find('ul.level-0 .menu-iem.level-1').hover(                function(){                    var $content_inner=$(this).find('.container-home-page .container-content');                    $(this).find('.container-home-page').show();                    var module_id=plugin.settings.module_id;                    var menu_id=$(this).data('menu_id');                    var color=$(this).data('color');                    $(this).css({                        background: color                    });                   /* var data_sub_menu=$.cookie(plugin.settings.key_cookie_sub_menu+menu_id);                    console.log(plugin.settings.key_cookie_sub_menu+menu_id);                    if(data_sub_menu!=undefined){                        $content_inner.html($.base64Decode(data_sub_menu));                        return true;                    }*/                    var ajax_completed=$content_inner.data('ajax_completed');                    if(ajax_completed)                    {                        return true;                    }else{                        $content_inner.bho88loading();                    }                    hoverTimeout = setTimeout(function(e){                        var option_click = {                            option: 'com_modules',                            format: 'json',                            tmpl: 'json',                            ignoreMessages: true,                            task: 'module.ajax_render_module'                        };                        option_click = $.param(option_click);                        var data_submit = {                            menu_id:menu_id,                            params: {                                layout: '_:submenu'                            }                        };                        data_submit.module_id = module_id;                        var ajax_web_design = $.ajax({                            contentType: 'application/json',                            type: "POST",                            dataType: "json",                            cache: true,                            url: root_ulr + 'index.php?' + option_click,                            data: JSON.stringify(data_submit),                            beforeSend: function () {                                $content_inner.bho88loading();                            },                            success: function (response) {                                if (response.success == true) {                                    //z-content-inner                                    var data = response.data;                                    $content_inner.bho88loading(false);                                    $content_inner.html(data);                                } else if (response.success == false) {                                    alert(response.message);                                }                                $content_inner.data('ajax_completed',true);                                //$.cookie(plugin.settings.key_cookie_sub_menu+menu_id, $.base64Encode(data));                                plugin.quick_search_sub_menu($content_inner);                            }                        });                    }, 500);                }, function(e){                    var $content_inner=$(this).find('.container-home-page .container-content');                    $content_inner.bho88loading(false);                    //$(this).find('.container-home-page').hide();                    $(this).css({                        background: "none"                    });                    clearTimeout(hoverTimeout);                }            );            /*             var timeout;             $element.find('ul.level-0 .menu-iem.level-1').hover(             function () {             console.log('hello123');             $(this).addClass('hover');             var menu_id=$(this).data('menu_id');             var color=$(this).data('color');             $(this).css({             background: color             });             $element.find('.container-home-page').show();             $element.find('.container-content').hide();             $element.find('#container-'+menu_id+'.container-content').show();             $('body').addClass('header_bar_hover');             var load_image_ok=$(this).data('load_image_ok');             if(load_image_ok!="done") {             $(this).data('load_image_ok', "done");             var y = $(window).scrollTop();  //your current y position on the page             $(window).scrollTop(y + 1);             }             clearTimeout(timeout);             },             function () {             $(this).removeClass('hover');             $(this).css({             background: "none"             });             timeout = setTimeout(function() {             $element.find('.container-home-page').hide();             $('body').removeClass('header_bar_hover');             }, second);             }             );             var timeout;             $element.find('.container-home-page').hover(             function () {             clearTimeout(timeout);             $(this).addClass('hover');             $('body').addClass('header_bar_hover');             var group_menu_item_id=$(this).find('.container-content:visible').data('group_menu_item_id');             var $li=$element.find('.level-0 .menu-iem.menu-iem-'+group_menu_item_id);             var color=$li.data('color');             $li.css({             background: color             });             },             function () {             $(this).removeClass('hover');             var group_menu_item_id=$(this).find('.container-content:visible').data('group_menu_item_id');             var $li=$element.find('.level-0 .menu-iem.menu-iem-'+group_menu_item_id);             $li.css({             background: "none"             });             timeout = setTimeout(function() {             $element.find('.container-home-page').hide();             $('body').removeClass('header_bar_hover');             }, second);             }             );             var timeout1;             var background_color='#7cb342';             $element.find('.list_menu_level_2_3 li').hover(             function () {             clearTimeout(timeout1);             $(this).addClass('hover');             var group_menu_id=$(this).data('group_menu_id');             var $element_group=$element.find('.list_menu_level_2_3 li[data-group_menu_id="'+group_menu_id+'"]');             $element_group.css({             background: background_color             });             },             function () {             $(this).removeClass('hover');             var group_menu_id=$(this).data('group_menu_id');             var $element_group=$element.find('.list_menu_level_2_3 li[data-group_menu_id="'+group_menu_id+'"]');             $element_group.css({             background: "none"             });             timeout1 = setTimeout(function() {             }, second);             }             );*/        }        plugin.example_function = function () {        }        plugin.init();    }    // add the plugin to the jQuery.fn object    $.fn.homeverticalmenutag = function (options) {        // iterate through the DOM elements we are attaching the plugin to        return this.each(function () {            // if plugin has not already been attached to the element            if (undefined == $(this).data('homeverticalmenutag')) {                var plugin = new $.homeverticalmenutag(this, options);                $(this).data('homeverticalmenutag', plugin);            }        });    }})(jQuery);