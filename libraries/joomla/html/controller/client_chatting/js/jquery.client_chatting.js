//huong dan su dung/* $('.client_chatting').client_chatting(); client_chatting=$('.client_chatting').data('client_chatting'); console.log(client_chatting); */// jQuery Plugin for SprFlat admin client_chatting// Control options and basic function of client_chatting// version 1.0, 28.02.2013// by SuggeElson www.suggeelson.com(function ($) {    // here we go!    $.client_chatting = function (element, options) {        // plugin's default options        var defaults = {            //main color scheme for client_chatting            //be sure to be same as colors on main.css or custom-variables.less            name:"",            token:"",            user:{},            list_messenger: [],            listRoomExists: [],            option_alert:{                allow_dismiss:true,                timer:300,                z_index:99999            },            list_user_id_support:[],            send_messenger_now:0,            KEY_SOCKET_NAME:"socket_name",            KEY_SOCKET_ID:"socket_id",            templateItemName:{                default:0,                name:""            }        }        // current instance of the object        var plugin = this;        // this will hold the merged default, and user-provided options        plugin.settings = {}        var $element = $(element), // reference to the jQuery version of DOM element            element = element;    // reference to the actual DOM element        // the "constructor" method that gets called when the object is created        plugin.send_new_messenger = function () {            var option_alert = plugin.settings.option_alert;            var name=plugin.settings.name;            var list_messenger=plugin.settings.list_messenger;            var socket=plugin.settings.socket;            var $content= $element.find("input.content");            var $your_name= $element.find("input.your-name");            if($your_name.val().trim()==""){                $.alert_notify(list_messenger['PLEASE_INPUT_YOUR_NAME_NOTIFICATION'],'error',option_alert);                $your_name.focus();                plugin.settings.send_messenger_now=1;                return;            }            var content=$content.val().trim();            if(content==""){                $.alert_notify(list_messenger['PLEASE_INPUT_TEXT_MESSENGER_NOTIFICATION'],'error',option_alert);                $content.focus();                return;            }            $content.val("");            var data = {'room': "MainRoom", 'username': name, 'msg': content};            socket.emit('newMessage', data);        };        plugin.updateNickname = function (data) {            plugin.settings.user=data;            var $badges =$('<div id="#'+data.room+'"><div id="'+data.id+'"></div></div>');            console.log(data);            //$(badges).text(data.newUsername);        };        plugin.create_random_key = function (length) {            if(typeof length==="undefined"){                length=6;            }            var text = "";            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";            for (var i = 0; i < length; i++)                text += possible.charAt(Math.floor(Math.random() * possible.length));            return text;        };        plugin.setup_template = function () {            var $sub_wrapper_chat=$element.find('.sub-wrapper-chat');            var sub_wrapper_chat=$sub_wrapper_chat.getOuterHTML();            plugin.settings.sub_wrapper_chat=sub_wrapper_chat;            $sub_wrapper_chat.remove();            var $sub_wrapper_chat_video=$element.find('.sub-wrapper-chat-video');            var sub_wrapper_chat_video=$sub_wrapper_chat_video.getOuterHTML();            plugin.settings.sub_wrapper_chat_video=sub_wrapper_chat_video;            $sub_wrapper_chat_video.remove();            var room_template=$element.find('.room').getOuterHTML();            plugin.settings.room_template=room_template;            var $user_online_template=$element.find('.list-user-online ul li');            var user_online_template=$user_online_template.getOuterHTML();            plugin.settings.user_online_template=user_online_template;            $user_online_template.remove();        };        plugin.close_sub_wrapper_chat = function ($self) {            var $sub_wrapper_chat=$self.closest('.sub-wrapper-chat');            var room=$sub_wrapper_chat.attr('id');            var listRoomExists=plugin.settings.listRoomExists;            for(var i=0;i<listRoomExists.length;i++){                var itemRoom=listRoomExists[i];                if(itemRoom.roomName==room){                    listRoomExists.splice(i, 1);                    break;                }            }            plugin.settings.listRoomExists=listRoomExists;            $sub_wrapper_chat.remove();        };        plugin.hide_sub_wrapper_chat = function ($self) {            var $sub_wrapper_chat=$self.closest('.sub-wrapper-chat');            $sub_wrapper_chat.toggleClass("pin-sub-chat");        };        plugin.setup_call_video = function ($sub_wrapper_chat) {            $sub_wrapper_chat.find('a.call-video').click(function(){            });        };        plugin.create_room = function (room,name,clientUserName,client_socket_id) {            var socket=plugin.settings.socket;            var $sub_wrapper_chat= $('.sub-wrapper-chat#'+room);            if($sub_wrapper_chat.length>0){                if($sub_wrapper_chat.hasClass('pin-sub-chat'))                {                    $sub_wrapper_chat.find('h3.title a.minus').trigger('click');                }                return;            }            console.log(socket.room);            if(socket.room==room){                return;            }            var $parent_sub_wrapper_chat=$('body').find('.parent_sub_wrapper_chat');            if($parent_sub_wrapper_chat.length==0){                $parent_sub_wrapper_chat=$('<div class="parent_sub_wrapper_chat"></div>');                $parent_sub_wrapper_chat.appendTo('body');            }            var current_total_wrapper_sub_chat=$sub_wrapper_chat.length;            var total_window_enable=$parent_sub_wrapper_chat.width()/260;            console.log(total_window_enable);            var $sub_wrapper_chat=$(plugin.settings.sub_wrapper_chat);            $sub_wrapper_chat.attr('id',room);            $sub_wrapper_chat.find('.name').html(name);            $sub_wrapper_chat.find('.clientUserName').html(clientUserName);            $sub_wrapper_chat.find('a.close').click(function(){                plugin.close_sub_wrapper_chat($(this));            });            $sub_wrapper_chat.find('h3.title a.minus').click(function(e){                var $title =$(this).closest('h3.title');                plugin.hide_sub_wrapper_chat($title);            });            var $room_template=$(plugin.settings.room_template);            $room_template.appendTo($sub_wrapper_chat.find('.sub-wrapper-chat-content'));            $sub_wrapper_chat.appendTo($parent_sub_wrapper_chat);            console.log('now create room'+room);            $room_template.attr('id','room_messages_'+room);            $room_template.data('room',room);            $room_template.data('client_socket_id',client_socket_id);            var $your_name= $room_template.find("input.your-name");            var you_name= $element.find('input.your-name').val();            $your_name.val(you_name);            $your_name.change(function(e){                var name=$your_name.val().trim();                if(name==""){                    $your_name.val(plugin.settings.name);                    return;                }                $('.parent_sub_wrapper_chat .sub-wrapper-chat').find('input.your-name').val(name);                $element.find('input.your-name').val(name);                plugin.settings.name=name;                var user=plugin.settings.user;                if(typeof user.key !="undefined"){                    user.key=plugin.create_random_key(10);                }                plugin.settings.user=user;                var new_nick_name={                    'username':name,                    'key':user.key                };                console.log('my user change is');                var data={                    name:name                };                var templateItemName=plugin.settings.templateItemName;                templateItemName.name=name;                templateItemName.default=0;                $.cookie(plugin.settings.KEY_SOCKET_NAME,JSON.stringify(templateItemName));                socket.emit('setNickname', data);                plugin.setup_call_video($sub_wrapper_chat);            });            // sent event            $room_template.find('.content').change(function(){                plugin.send_sub_messenger($room_template);            });            $room_template.find('.btn-send').click(function(){                plugin.send_sub_messenger($room_template);            });        };        plugin.show_list_user_online = function () {            $element.find('.list-user-online').toggleClass("show");        };        plugin.makeRoomName = function (  mySocketToken, clientSocketToken) {            var listRoomExists=plugin.settings.listRoomExists;            var itemRoom={};            var roomName=mySocketToken+'_'+clientSocketToken;            itemRoom.roomName=roomName;            itemRoom.listToken=[];            itemRoom.listToken.push(mySocketToken);            itemRoom.listToken.push(clientSocketToken);            listRoomExists.push(itemRoom);            return roomName;        };        plugin.getRoomName = function (mySocketToken, clientSocketToken) {            var listRoomExists=plugin.settings.listRoomExists;            for(var i=0;i<listRoomExists.length;i++){                var itemRoom=listRoomExists[i];                if($.inArray(mySocketToken, itemRoom.listToken)!=-1 && $.inArray(clientSocketToken, itemRoom.listToken)!=-1 ){                    return itemRoom.roomName;                }            }            return null;        };        plugin.make_room_video_name = function (my_socket_id, client_socket_id) {            return "room-video-"+my_socket_id+'_'+client_socket_id;        };        plugin.update_list_user_online = function (data) {            var socket=plugin.settings.socket;            var currentUser=plugin.settings.user;            var userName=currentUser.username;                        var my_socket_id=socket.id;            var $ul_list_user_online=$element.find('.list-user-online ul');            $ul_list_user_online.empty();            for (var socket_id in data) {                if(my_socket_id!=socket_id){                    var user = data[socket_id];                    var $user_online_template=$(plugin.settings.user_online_template);                    $user_online_template.data('user',{                        socket_id:socket_id,                        username:user.userName                    } );                    $user_online_template.find('.name').html(user.name);                    $user_online_template.appendTo($ul_list_user_online);                }            }            $ul_list_user_online.find('.user').click(function(){                var socket=plugin.settings.socket;                var my_socket_id=socket.id;                var myToken=socket.token;                var user=$(this).data('user');                var clientToken=user.token;                var room_name=plugin.makeRoomName(myToken,clientToken);                var clientUserName=user.userName;                var name=plugin.settings.name;                socket.emit('subscribe', {                        'rooms':[room_name],                        'clientToken':clientToken,                        'clientUserName':clientUserName,                    }                );                // Get users connected to room                socket.emit('getUsersInRoom', {'room':clientUserName});            });            console.log('list-user-online: %s', JSON.stringify(data));        };        plugin.update_list_user_online_for_support = function (data) {            var socket=plugin.settings.socket;            var list_user_id_support=plugin.settings.list_user_id_support;            var my_socket_id=socket.id;            var $ul_list_user_support_online=$element.find('.list-group-support .list-user-support-online ul');            $ul_list_user_support_online.empty();            for (var socket_id in data) {                var user=data[socket_id];                if(my_socket_id!=socket_id && $.inArray(parseInt(user.system_user_id), list_user_id_support)!=-1){                    var $user_online_template=$(plugin.settings.user_online_template);                    $user_online_template.data('user',{                        socket_id:socket_id,                        username:user.userName,                        name:user.name,                    } );                    $user_online_template.find('.name').html(user.name);                    console.log($ul_list_user_support_online);                    $user_online_template.appendTo($ul_list_user_support_online);                }            }            $ul_list_user_support_online.find('.user').click(function(){                var socket=plugin.settings.socket;                var my_socket_id=socket.id;                var user=$(this).data('user');                var client_socket_id=user.socket_id;                var room_name=plugin.makeRoomName(my_socket_id,client_socket_id);                var clientUserName=user.userName;                var name=plugin.settings.name;                socket.emit('subscribe', {                        'rooms':[room_name],                        'client_socket_id':client_socket_id,                        'clientUserName':clientUserName,                    }                );                // Get users connected to room                socket.emit('getUsersInRoom', {'room':clientUserName});            });            console.log('list-user-online: %s', JSON.stringify(data));        };        plugin.create_random_interger = function (length) {            if(typeof length==="undefined"){                length=6;            }            var text = "";            var possible = "123456789";            for (var i = 0; i < length; i++)                text += possible.charAt(Math.floor(Math.random() * possible.length));            return text;        };        plugin.init = function () {            plugin.settings = $.extend({}, defaults, options);            var user=plugin.settings.user;            var token=plugin.settings.token;            plugin.setup_template();            $element.resizable();            var list_messenger=plugin.settings.list_messenger;            $element.find('.title-chatting').click(function(){                $(this).toggleClass("show hide");                $element.find('.wrapper-chat-js').toggleClass("hide show");                $('#select_device_select_device').toggleClass("show hide");                $('#alo_phone_alo_phone').toggleClass("show hide");            });            $element.find('.vtv-title-chatting').click(function(){                $element.find('.title-chatting').toggleClass("show hide");                $element.find('.wrapper-chat-js').toggleClass("hide show");                $('#select_device_select_device').toggleClass("show hide");                $('#alo_phone_alo_phone').toggleClass("show hide");            });            $element.find('a.users').click(function(){                $(this).find('i').toggleClass( "fa-users fa-times" );                plugin.show_list_user_online();            });            name="";            if(typeof user.id!="undefined" && user.id!=null && user.id!=0){                var templateItemName=plugin.settings.templateItemName;                templateItemName.name=user.name;                templateItemName.default=0;                $.cookie(plugin.settings.KEY_SOCKET_NAME, JSON.stringify(templateItemName));                name=user.name;                $element.find('.your-name').val(name);            }else{                var itemName=$.cookie(plugin.settings.KEY_SOCKET_NAME);                if(typeof itemName=="undefined"){                    name=list_messenger['NEW_CUSTOMER']+" "+plugin.create_random_interger(3);                    $element.find('.your-name').attr('placeholder',name);                    var templateItemName=plugin.settings.templateItemName;                    templateItemName.name=name;                    templateItemName.default=1;                    $.cookie(plugin.settings.KEY_SOCKET_NAME, JSON.stringify(templateItemName));                    $element.find('.your-name').attr('placeholder',name);                }else {                    var objectItemName=JSON.parse(itemName);                    var name=objectItemName.name;                    var defaultName=objectItemName.default;                    if(defaultName==1){                        $element.find('.your-name').attr('placeholder',name);                    }else{                        $element.find('.your-name').val(name);                    }                }            }            plugin.settings.name=name;            console.log(token);            var system_user_id=user.id;            var old_socket_id=$.cookie(plugin.settings.KEY_SOCKET_ID);            if(old_socket_id=="undefined"){                old_socket_id=0;            }            var url=plugin.settings.url;            var title=$(document).find('title').html();            var query=[                'name='+name,                'token='+token,                'userName='+(user.userName!=null && user.userName!=""?user.userName:token),                'system_user_id='+system_user_id,                'title='+title,                'url='+url,                'os=browser',                'old_socket_id='+old_socket_id            ];            query=query.join("&");            console.log(query);            var socket = io.connect( 'http://'+window.location.hostname+':8888',{query: query} );            plugin.settings.socket=socket;            var $content= $element.find("input.content");            $content.keyup(function(e){                if(e.keyCode == 13)                {                    plugin.send_new_messenger();                }            });            var $your_name= $element.find("input.your-name");            $your_name.change(function(e){                var name=$your_name.val().trim();                if(name==""){                    $your_name.val(plugin.settings.name);                    return;                }                $('.parent_sub_wrapper_chat .sub-wrapper-chat').find('input.your-name').val(name);                plugin.settings.name=name;                var user=plugin.settings.user;                if(typeof user.key !="undefined"){                    user.key=plugin.create_random_key(10);                }                plugin.settings.user=user;                var new_nick_name={                    'username':name,                    'key':user.key                };                console.log('my user change is');                var data={                    name:name,                };                var templateItemName=plugin.settings.templateItemName;                templateItemName.name=name;                templateItemName.default=0;                $.cookie(plugin.settings.KEY_SOCKET_NAME,JSON.stringify(templateItemName));                socket.emit('setNickname', data);            });            $your_name.keyup(function(e){                if(e.keyCode == 13)                {                    var send_messenger_now=plugin.settings.send_messenger_now;                    if(send_messenger_now==1) {                        plugin.settings.send_messenger_now=0;                        plugin.send_new_messenger();                    }                    $content.focus();                }            });            $element.find('button.btn-send').click(function(){                plugin.send_new_messenger();            });            //get room            socket.emit('getRooms', {});            // Message received            socket.on('newMessage', function (data) {                console.log("newMessage: %s", JSON.stringify(data));                plugin.addMessage(data);                // Scroll down room messages                var room_messages = '#room_messages_'+data.room;                $(room_messages).animate({                    scrollTop: $(room_messages).prop('scrollHeight')                }, 300);            });            // existsNickName            socket.on('existsNickName', function (data) {                var option_alert=plugin.settings.option_alert;                var list_messenger=plugin.settings.list_messenger;                $.alert_notify(list_messenger['NAME_EXISTS_IN_SYSTEM'],'error',option_alert);                var $your_name= $element.find("input.your-name");                $your_name.val("");            });            // User nickname updated            socket.on('userNicknameUpdated', function(data) {                var $your_name= $room.find("input.your-name");                /*                 console.log("my socket_id : %s", socket.id);                 console.log("userNicknameUpdated: %s", JSON.stringify(data));                 //plugin.updateNickname(data);                 msg = '----- ' + data.oldUsername + ' is now ' + data.newUsername + ' -----';                 var info = {'room':data.room, 'username':'ServerBot', 'msg':msg};                 //plugin.addMessage(info);                 */            });            // User nickname updated            socket.on('userNicknameUpdatedLable', function(data) {                var $your_name= $element.find("input.your-name");                $your_name.val(data.newName);                var $your_name= $('body').find(".parent_sub_wrapper_chat input.your-name");                $your_name.val(data.newName);                /*                 console.log("my socket_id : %s", socket.id);                 console.log("userNicknameUpdated: %s", JSON.stringify(data));                 //plugin.updateNickname(data);                 msg = '----- ' + data.oldUsername + ' is now ' + data.newUsername + ' -----';                 var info = {'room':data.room, 'username':'ServerBot', 'msg':msg};                 //plugin.addMessage(info);                 */            });            // Users in room received            socket.on('usersInRoom', function(data) {                console.log('usersInRoom: %s', JSON.stringify(data));                _.each(data.users, function(user) {                    plugin.addUser(user);                });            });            // Users in room received            socket.on('update-list-user-online', function(data) {                plugin.update_list_user_online(data);                plugin.update_list_user_online_for_support(data);            });            // Subscription to room confirmed            socket.on('subscriptionConfirmed', function(data) {                var room=data.room;                var client_socket_id=data.client_socket_id;                var socket=plugin.settings.socket;                var clientUserName=data.clientUserName;                var name=data.name;                var username=data.userName;                if(room!="MainRoom" && socket.id!=room){                    plugin.create_room(room,name,clientUserName,client_socket_id);                }            });            // User joins room            socket.on('userJoinsRoom', function(data) {                console.log("userJoinsRoom: %s", JSON.stringify(data));                // Log join in conversation                //plugin.addMessage(data);                // Add user to connected users list                plugin.addUser(data);            });            // User joins room            socket.on('sendDocumentPage', function(data) {                console.log("sendDocumentPage: %s", JSON.stringify(data));                // Log join in conversation                plugin.addMessage(data);            });            // getListMessenger            socket.on('getListMessenger', function(data) {                var listMessenger=data.listMessenger;                for(var i=0;i<listMessenger.length;i++){                    plugin.addMessage(listMessenger[i]);                }                // Log join in conversation                //plugin.addMessage(data);            });            // Disconnected from server            socket.on('disconnect', function (data) {                var name=$.cookie(plugin.settings.KEY_SOCKET_NAME);                var info = {'room':'MainRoom',username:data.userName, 'name':name, 'msg':'----- Lost connection to server -----'};                plugin.addMessage(info);            });            // connected from server            socket.on('connected', function (data) {            });            socket.emit('getSocketId', {});            // connected from server returnSocketId            socket.on('returnSocketId', function (data) {                $.cookie(plugin.settings.KEY_SOCKET_ID,data.socketId);            });            socket.emit('getMyRoom', {});            // connected from server returnSocketId            socket.on('responseRoom', function (data) {                var listMyRoom=data.listMyRoom;            });            //effect text            $element.find('.title-chatting .text').simplemarquee({                // scroll speed in px per second                speed: 30,                // scroll directions                // left, right, top and bottom                direction: 'left',                // number of cycles before pausing                cycles: 100,                // space in px between the duplicated contents                space: 40,                // delay between each cycle in ms                delayBetweenCycles: 2000,                // pause/restart on hover                handleHover: true,                // up<a href="http://www.jqueryscript.net/time-clock/">date</a> marquee on resize                handleResize: true,                // easing                easing: 'linear'            });        };        plugin.checkRoomExists = function () {            var existsRoom=false;            var listRoomExists=plugin.settings.listRoomExists;            for(var i=0;i<listRoomExists.length;i++){                var itemRoom=listRoomExists[i];                var listUserName=itemRoom.listUserName;                for (i = 0; i < arguments.length; i++) {                    var userName = arguments[i];                    var indexOfUserName = listUserName.indexOf(userName);                    if (indexOfUserName > -1) {                        listUserName.splice(indexOfUserName, 1);                    }                }                if(listUserName.length==0){                    existsRoom=true;                    break;                }            }            return existsRoom;        };        plugin.getRoomExitsRoom = function () {            var listRoomExists=plugin.settings.listRoomExists;            for(var i=0;i<listRoomExists.length;i++){                var itemRoom=listRoomExists[i];                var listUserName=itemRoom.listUserName;                for (i = 0; i < arguments.length; i++) {                    var userName = arguments[i];                    var indexOfUserName = listUserName.indexOf(userName);                    if (indexOfUserName > -1) {                        listUserName.splice(indexOfUserName, 1);                        break;                    }                }                if(listUserName.length==0){                    return itemRoom.roomName;                }            }            return null;        };        plugin.AddRoomToListRoomExists = function () {            var listRoomExists=plugin.settings.listRoomExists;            var itemRoom={                roomName:plugin.create_random_key(20),                listUserName:[]            };            for (i = 0; i < arguments.length; i++) {                var userName = arguments[i];                itemRoom.listUserName.push(userName);            }            listRoomExists.push(itemRoom);            return itemRoom;        };        plugin.create_private_room = function (room_info) {            var user=plugin.settings.user;            var socket=plugin.settings.socket;            var token=plugin.settings.token;            var my_socket_id=socket.id;            var client_socket_id=room_info.socketId;            var clientUserName=room_info.userName;            var client_token=room_info.token;            var client_name=room_info.name;            var subscribe_data={                'client_socket_id':client_socket_id,                'client_name':client_name,                'client_token':client_token,                'clientUserName':clientUserName,            };            if(plugin.checkRoomExists(room_info.userName,(user.userName!=null&&user.userName!=""?user.userName:token))){                var current_room=plugin.getRoomExitsRoom(room_info.userName,user.userName);                subscribe_data.rooms=[current_room];            }else{                var current_room=plugin.AddRoomToListRoomExists(room_info.userName,(user.userName!=null&&user.userName!=""?user.userName:token));                subscribe_data.rooms=[current_room.roomName];            }            socket.emit('subscribe', subscribe_data);            // Get users connected to room            socket.emit('getUsersInRoom', {'room':clientUserName});        };        plugin.create_private_room_video = function (room_info) {            var socket=plugin.settings.socket;            var my_socket_id=socket.id;            var client_socket_id=room_info.socket_id;            var clientUserName=room_info.userName;            var client_name=room_info.name;            var current_room=plugin.make_room_video_name(my_socket_id,client_socket_id);            socket.emit('subscribe', {                    'rooms':[current_room],                    'client_socket_id':client_socket_id,                    'client_name':client_name,                    'clientUserName':clientUserName,                }            );            // Get users connected to room            socket.emit('getUsersInRoom', {'room':clientUserName});        };        plugin.send_sub_messenger = function ($room) {            var room_name=$room.data('room');            var client_socket_id=$room.data('client_socket_id');            var option_alert=plugin.settings.option_alert;            var socket=plugin.settings.socket;            var list_messenger=plugin.settings.list_messenger;            var $content=$room.find('.content');            var content=$content.val().trim();            if(content==""){                $.alert_notify(list_messenger['PLEASE_INPUT_TEXT_MESSENGER_NOTIFICATION'],'error',option_alert);                $content.focus();                return;            }            var $your_name= $room.find("input.your-name");            if($your_name.val().trim()==""){                $.alert_notify(list_messenger['PLEASE_INPUT_YOUR_NAME_NOTIFICATION'],'error',option_alert);                $your_name.focus();                return;            }            $content.val("");            var data = {'room': room_name,'client_socket_id':client_socket_id, 'username': name, 'msg': content};            socket.emit('newMessage', data);        };        plugin.addSocketToRoom = function (room, mySocketId, socketId) {            var listRoomExists=plugin.settings.listRoomExists;            var itemRoom={};            itemRoom.roomName=room;            itemRoom.listSocketId=[];            itemRoom.listSocketId.push(mySocketId);            itemRoom.listSocketId.push(socketId);            listRoomExists.push(itemRoom);            plugin.settings.listRoomExists=listRoomExists;        };        plugin.addMessage = function(msg_item) {            var room= msg_item.room;            var url= msg_item.url;            var msg=msg_item.msg;            if(url!=null && url!=""){                var decode_url= $.base64Decode(url);                msg=msg.replace(url,decode_url);            }            var list_messenger=plugin.settings.list_messenger;            var user=plugin.settings.user;            var token=plugin.settings.token;            var socket=plugin.settings.socket;            if(msg_item.socketId!=socket){                var $doorbell = $element.find('audio.doorbell')[0];                $doorbell.play();            }            if(msg_item.room=='MainRoom'){                $sub_wrapper_chat=$('#room_messages_MainRoom');            }else{                var $sub_wrapper_chat= $('.sub-wrapper-chat#'+msg_item.room);            }            if($sub_wrapper_chat.length>0){                var $msg=$('<div class="messenger-item"><b>'+(token==msg_item.token?list_messenger['ME']:msg_item.name)+'</b>:'+msg+(token!=msg_item.token?'<a title="'+list_messenger['CREATE_ROOM_PRIVATE_CHATTING_WITH_THIS_USER']+'" href="javascript:void(0)"  class="create-room-private-chatting-with-this-user"><i class="icon ti-comment-alt"></i></a>':'')+'</div>');                $msg.find('a.create-room-private-chatting-with-this-user').data('msg-info',msg_item);                $msg.find('a.create-room-private-chatting-with-this-user').click(function(){                    var msg_info=$(this).data('msg-info');                    console.log(msg_info);                    var room_infor=msg_info;                    plugin.create_private_room(room_infor);                });                var $messengers=$sub_wrapper_chat.find('.messengers');                $msg.appendTo($messengers);                $messengers.scrollTo('.messenger-item:last-child', 80);            }else  if(socket.id!=msg_item.room){                plugin.addSocketToRoom(msg_item.room,socket.id,msg_item.socketId);                var client_socket_id=msg_item.client_socket_id;                var clientUserName=msg_item.clientUserName;                var name=plugin.settings.name;                var token=plugin.settings.token;                plugin.AddRoomToListRoomExists(clientUserName,(user.userName!=null&&user.userName!=""?user.userName:token));                plugin.create_room(room,name,clientUserName,client_socket_id);            }        };        // Add user to connected users list        plugin.addUser = function(user) {            //console.log('function add user online');        }        plugin.example_function = function () {        }        plugin.init();    }    // add the plugin to the jQuery.fn object    $.fn.client_chatting = function (options) {        // iterate through the DOM elements we are attaching the plugin to        return this.each(function () {            // if plugin has not already been attached to the element            if (undefined == $(this).data('client_chatting')) {                var plugin = new $.client_chatting(this, options);                $(this).data('client_chatting', plugin);            }        });    }})(jQuery);