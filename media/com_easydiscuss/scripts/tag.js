EasyDiscuss.module("tag",function(e){var t=this;EasyDiscuss.Controller("Tag.Form",{defaultOptions:{tags:[],tagSelections:[],tagSelectionLimit:25,"{tagList}":".discuss-tag-list.creation","{tagItems}":".discuss-tag-list.creation .tag-item","{tagItemRemoveButton}":".remove-tag","{tagSelection}":".discuss-tag-list.selection","{tagSelectionItems}":".discuss-tag-list.selection .tag-item","{tagSelectionMoreButton}":".discuss-tag-list.selection .more-tags","{totalTags}":".total-tags","{tagCreate}":".new-tag-item","{tagInput}":".tag-input","{tagCreateButton}":".tag-create",view:{tagItem:"tags.item"}}},function(t){return{init:function(){t.generateTagSelections(t.options.tagSelections),e.each(t.options.tags,function(e,n){t.tagMap[n.title]=n,t.createTag(n.title)})},tagItem:{},tagMap:{},tagSelectionMap:{},sanitizeTitle:function(t){return e.trim(t).replace(/[,\'\"\#\<\>]/gi,"")},getTagItem:function(n){return t.tagItems(function(){return e(this).data("title")==n})},createTag:function(n){if(!t.checkTagLimit())return;var n=t.sanitizeTitle(n),r;Object.prototype.hasOwnProperty.call(t.tagMap,n)&&(r=t.tagMap[n]),r=r||{title:n};var i=e(t.getTagItem(n)[0]||t.view("tagItem",r));i.data({title:r.title,title_filter:r.title.toUpperCase()}).css({opacity:0});if(t.tagItems().length>0){var s=t.tagItems(":last");s[0]!=i[0]&&s.after(i)}else t.tagList().prepend(i);return i.animate({opacity:1}),t.useTagSelection(r.title),t.checkTagLimit(),i},removeTag:function(e){var n=t.getTagItem(e);n.remove(),t.tagMap[e]&&t.createTagSelection(e),t.discardTagSelection(e),t.checkTagLimit()},checkTagLimit:function(){var e=t.tagItems().length;t.totalTags().text(e);if(t.options.tagLimit!=0)return e>t.options.tagLimit?!1:e==t.options.tagLimit?(t.tagCreate().hide(),!1):(t.tagCreate().show(),!0)},generateTagSelections:function(n){var r=t.options.tagSelectionLimit;n.length<=r&&t.tagSelectionMoreButton().remove();if(n.length<1){t.element.addClass("no-selection");return}t.options.tagSelections.reverse();var i=t.options.tagSelections.length;e.each(t.options.tagSelections,function(e,n){t.tagSelectionMap[n.title]=n;var s=t.createTagSelection(n.title);e==r+1&&t.tagSelectionMoreButton().show(),i-e>r&&s.addClass("extras")})},"{tagSelectionMoreButton} click":function(e){e.remove(),t.tagSelectionItems(".extras").css({opacity:0}).removeClass("extras").animate({opacity:1})},getTagSelectionItem:function(e){if(Object.prototype.hasOwnProperty.call(t.tagItem,e))return t.tagItem[e]},createTagSelection:function(n){var r=t.getTagSelectionItem(n);if(r)return r.show(),r;var r=e("<li>").addClass("tag-item").data({title:n,title_filter:n.toUpperCase()}).html(n);return t.tagItem[n]=r,t.tagSelection().prepend(r),r},useTagSelection:function(e){var n=t.getTagSelectionItem(e);n&&n.addClass("used").hide()},discardTagSelection:function(e){var n=t.getTagSelectionItem(e);n&&t.getTagSelectionItem(e).removeClass("used").show()},createTagFromInput:function(){var e=t.sanitizeTitle(t.tagInput().val());e!=""&&(t.createTag(e),t.tagInput().val("")),t.filterTagSelectionItems("")},filterTagSelectionItems:function(n){n=t.sanitizeTitle(n).toUpperCase();if(n=="")t.tagSelectionItems(":not(.used)").show(),t.element.removeClass("no-selection"),t.tagSelectionMoreButton().show();else{t.tagSelectionMoreButton().hide();var r=t.tagSelectionItems().filter(function(t,r){var r=e(this);return r.hasClass(".used")?(r.hide(),!1):r.data("title_filter").indexOf(n)<0?(r.hide(),!1):(r.show(),!0)});r.length<1&&t.element.addClass("no-selection")}},"{tagInput} keydown":function(e,n){n.stopPropagation(),t.realEnterKey=n.keyCode==13},"{tagInput} keypress":function(e,n){n.stopPropagation(),t.realEnterKey=t.realEnterKey&&n.keyCode==13},"{tagInput} keyup":function(e,n){n.stopPropagation();switch(n.keyCode){case 27:e.val("");break;case 13:t.realEnterKey&&t.createTagFromInput()}t.filterTagSelectionItems(e.val())},"{tagCreateButton} click":function(){t.createTagFromInput()},"{tagItemRemoveButton} click":function(e){var n=e.parents(".tag-item").data("title");t.removeTag(n)},"{tagSelectionItems} click":function(e){t.createTag(e.data("title"))}}}),t.resolve()});