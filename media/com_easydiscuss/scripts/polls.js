EasyDiscuss.module("polls",function(e){var t=this;EasyDiscuss.require().view("field.form.polls.answer").done(function(e){EasyDiscuss.Controller("Polls.Answers",{defaultOptions:{pollId:null,"{voteCount}":".voteCount","{votersAvatar}":".votersAvatar","{votePoll}":".votePoll","{unvotePoll}":".unvotePoll","{pollGraph}":".pollGraph"}},function(t){return{init:function(){t.options.pollId=t.element.data("id")},"{voteCount} click":function(){disjax.load("polls","getvoters",t.options.pollId+"")},"{votePoll} change":function(){EasyDiscuss.ajax("site.views.polls.vote",{id:t.options.pollId}).done(function(t){e(t).each(function(t,n){e(".pollAnswerItem-"+n.id).find(".pollPercentage").html(n.percentage),e(".pollAnswerItem-"+n.id).find(".pollGraph").css("width",n.percentage+"%"),e(".pollAnswerItem-"+n.id).find(".voteCount").html(n.votes),e(".pollAnswerItem-"+n.id).find(".votersList").html(n.voters)})})}}}),EasyDiscuss.Controller("Polls.Form",{defaultOptions:{"{pollAnswers}":".pollAnswers","{pollAnswersList}":".pollAnswersList","{insertPollAnswer}":".insertPollAnswer","{pollCheckbox}":".pollCheckbox","{pollForm}":".pollForm","{deletedPolls}":"#pollsremove",view:{answerItem:"field.form.polls.answer"}}},function(e){return{init:function(){e.pollAnswers().implement(EasyDiscuss.Controller.Polls.Form.Answer,{pollController:e}),e.pollAnswers().length==0&&e.insertNewPollAnswer()},resetPollForm:function(t){e.pollAnswers(":not(:first)").remove(),e.pollForm().hide(),e.pollCheckbox().attr("checked",!1)},insertNewPollAnswer:function(t){e.view.answerItem({showRemove:e.pollAnswers().length>0}).implement(EasyDiscuss.Controller.Polls.Form.Answer,{pollController:e,shiftFocus:t}).appendTo(e.pollAnswersList())},updateDeletedPoll:function(t){var n=e.deletedPolls().val();n!=""&&(n+=","),e.deletedPolls().val(n+t)},showPollForm:function(t){e.pollForm().show()},"{insertPollAnswer} click":function(){e.insertNewPollAnswer(!0)},"{pollCheckbox} change":function(){e.pollForm().toggle()}}}),EasyDiscuss.Controller("Polls.Form.Answer",{defaultOptions:{"{answerText}":".answerText","{removeItem}":".removeItem",pollController:null,shiftFocus:!1}},function(t){return{init:function(){t.options.shiftFocus&&t.answerText().focus()},"{removeItem} click":function(n){var r=e(n).data("pollid");r!=null&&t.options.pollController.updateDeletedPoll(r),t.element.remove()},"{answerText} keyup":function(n,r){r.keyCode==e.ui.keyCode.ENTER&&t.options.pollController.insertNewPollAnswer(!0)}}}),t.resolve()})});