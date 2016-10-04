(function(b){var a=function(e,d){var y=this;var v=e;var z=null;var k=null;var B=null;var p=null;var s=null;var q=[];var x={mimeType:"video/webm"};var l;var f=false;var h=null;var g=null;var o=null;var u=false;var A=false;var m=function(F){if(b(F).data("recording")){if(A){console.log("Already started recording session")}return false}var G=v.getLocalStream();z=new MediaRecorder(G,x);z.ondataavailable=w;if(A){z.onerror=function(H){console.log("An error has occurred: "+H.message)}}try{z.start();b(F).data("recording",true).toggleClass("jchat_stop_recording");b("#jchat_webrtc_pause, #jchat_webrtc_stop").data("active",true);b("#jchat_webrtc_view, #jchat_webrtc_download, #jchat_webrtc_upload").data("empty",true).removeClass("jchat_btn_enabled");if(A){console.log("Started recording");console.log("State:"+z.state)}}catch(E){if(A){console.log("Error starting recording: "+E.message)}}};var C=function(F){if(!b(F).data("active")){if(A){console.log("Still not started recording session to pause it")}return false}try{if(z.state==="recording"){if(!h){z.stop()}else{z.pause()}f=true;b("#jchat_webrtc_record").removeClass("jchat_stop_recording").addClass("jchat_recording_blink");if(A){console.log("Paused recording");console.log("State:"+z.state)}}else{if(z.state==="inactive"||(h&&z.state==="paused")){if(!h){z.start()}else{z.resume()}f=false;b("#jchat_webrtc_record").addClass("jchat_stop_recording").removeClass("jchat_recording_blink");if(A){console.log("Resumed recording");console.log("State:"+z.state)}}}b(F).toggleClass("jchat_enabled")}catch(E){if(A){console.log("Error pausing recording: "+E.message)}}};var r=function(F){if(!b(F).data("active")){if(A){console.log("Still not started recording session to stop it")}return false}z.onstop=t;b("#jchat_webrtc_record").data("recording",false).removeClass("jchat_stop_recording jchat_recording_blink");b("#jchat_webrtc_pause, #jchat_webrtc_stop").data("active",false);b("#jchat_webrtc_pause").removeClass("jchat_enabled");try{z.stop();if(A){console.log("Stopped recording");console.log("State:"+z.state)}}catch(E){if(f){t();if(A){console.log("Stopped recording from simulated pause");console.log("State:"+z.state)}}if(A){console.log("Error stopping recording: "+E.message)}}};var w=function(E){if(z.state==="recording"||h){q.push(E.data)}};var t=function(L){k=new Blob(q,{type:x.mimeType});var N="KB";var H=(k.size/1024).toFixed(2);if(parseInt(H/1024)>0){N="MB";H=(H/1024).toFixed(2)}p=H+N;var F=new Date();var M=F.getFullYear();var K=parseInt(F.getMonth())+1;K=K<10?"0"+K:K;var J=F.getDate();J=J<10?"0"+J:J;var I=F.getHours();I=I<10?"0"+I:I;var G=F.getMinutes();G=G<10?"0"+G:G;var E=F.getSeconds();E=E<10?"0"+E:E;s=M+"-"+K+"-"+J+" "+I+":"+G+":"+E;B=g+"_"+o+"_"+M+"_"+K+"_"+J+"_"+I+"_"+G+"_"+E+".webm";j(B);q=[]};var j=function(F){var E=new FileReader();E.onload=function(H){var G=H.target.result;b("#jchat_webrtc_view").attr("onclick",'window.open("'+G+'", "video","width=640,height=480");return false;').data("empty",false).addClass("jchat_btn_enabled");b("#jchat_webrtc_download").attr("href",G).attr("download",F).data("empty",false).addClass("jchat_btn_enabled");b("#jchat_webrtc_upload").data("empty",false).addClass("jchat_btn_enabled")};E.readAsDataURL(k)};var c=function(){if(!k||u){return}var E=new FormData();E.append("peer1",g);E.append("peer2",o);E.append("timerecord",s);E.append("filename",B);E.append("filesize",p);E.append("blob",k);E.append("task","recorder.saveEntity");b("#jchat_webrtc_upload_progress").show();b("#jchat_wrapper_localvideo_recorder > #jchat_webrtc_upload_progress").css("display","inline-block");u=true;b.ajax({url:jchat_livesite+"index.php?option=com_jchat&format=json",type:"POST",data:E,cache:false,dataType:"json",processData:false,contentType:false,xhr:function(){var F=b.ajaxSettings.xhr();F.upload.onprogress=function(G){var H=parseInt(G.loaded/G.total*100)+"%";b("#jchat_webrtc_upload_progress").css("background-image","linear-gradient(90deg, #468847 "+H+", #9E9E9E "+H+")").html("<span>"+H+"</span>")};return F},success:function(G,H,F){if(G.result){b("#jchat_webrtc_upload_progress").html("<span>"+jchat_upload_complete+"</span>")}else{D(G.exception_message);b("#jchat_webrtc_upload_progress").html("<span>"+jchat_upload_error+"</span>").css("background-image","linear-gradient(90deg, #F72B28 100%, #F72B28 100%)")}setTimeout(function(){b("#jchat_webrtc_upload_progress").html("").removeAttr("style").hide();u=false},2500)},error:function(F,H,G){D(H);b("#jchat_webrtc_upload_progress").html("<span>"+jchat_upload_error+"</span>").css("background-image","linear-gradient(90deg, #F72B28 100%, #F72B28 100%)");setTimeout(function(){b("#jchat_webrtc_upload_progress").html("").removeAttr("style").hide();u=false},2500)}})};var n=function(){b("#jchat_webrtc_record",l).on("click.jchatwebrtc",{scope:this},function(E){m(this)});b("#jchat_webrtc_pause",l).on("click.jchatwebrtc",{scope:this},function(E){C(this)});b("#jchat_webrtc_stop",l).on("click.jchatwebrtc",{scope:this},function(E){r(this)});b("#jchat_webrtc_view, #jchat_webrtc_download, #jchat_webrtc_upload").on("click.jchatwebrtc",{scope:this},function(E){if(b(this).data("empty")){return false}if(b(this).attr("id")=="jchat_webrtc_upload"){c()}})};var D=function(E){b("div#jchat_msg").remove();b("<div/>").attr("id","jchat_msg").prependTo("body").append('<div id="jchat_msgtext">'+E+"</div>").css("margin-top",0).hide().fadeIn(500).delay(2500).fadeOut(500,function(){b(this).remove()})};this.initializeVideo=function(F,E,G){l=F;F.append('<div id="jchat_webrtc_record" class="jchat_start_recording"></div>');F.append('<div id="jchat_webrtc_pause" class="jchat_pause_recording"></div>');F.append('<div id="jchat_webrtc_stop" class="jchat_stop_recording"></div>');b("#jchat_webrtc_pause, #jchat_webrtc_stop").data("active",false);F.append('<a id="jchat_webrtc_view" class="jchat_view_recording" href="javascript:void(0);" target="_blank"></a>');F.append('<a id="jchat_webrtc_download" class="jchat_download_recording" href="" download="blobfile.webm"></a>');if(d.permissions.allow_media_recorder_save){F.append('<div id="jchat_webrtc_upload" class="jchat_upload_recording"></div>')}b("#jchat_webrtc_view, #jchat_webrtc_download, #jchat_webrtc_upload").data("empty",true);F.append('<div id="jchat_webrtc_upload_progress"></div>');o=E;g=G;n.call(this)};(function i(){if(typeof(MediaRecorder)==="undefined"){return}A=d.debugEnabled;if(navigator.mozGetUserMedia){h=true}if(typeof(MediaRecorder.isTypeSupported)!=="undefined"){if(MediaRecorder.isTypeSupported("video/webm;codecs=vp9")){x={mimeType:"video/webm;codecs=vp9"}}else{if(MediaRecorder.isTypeSupported("video/webm;codecs=vp8")){x={mimeType:"video/webm;codecs=vp8"}}else{}}}}).call(this)};window.JChatRecorder=a})(jQuery);