(function(){
// module factory: start
var moduleFactory = function($) {
// module body: start
var module = this;
$.require() 
 .script("mvc/controller","mvc/lang.openajax") 
 .done(function() { 
var exports = function() { 

	/**
	 * @function jQuery.Controller.static.processors.subscribe
	 * @parent jQuery.Controller.static.processors
	 * @plugin jquery/controller/subscribe
	 * Adds OpenAjax.Hub subscribing to controllers.
	 *
	 *     $.Controller("Subscriber",{
	 *       "recipe.updated subscribe" : function(called, recipe){
	 *
	 *       },
	 *       "todo.* subscribe" : function(called, todo){
	 *
	 *       }
	 *     })
	 *
	 * You should typically be listening to jQuery triggered events when communicating between
	 * controllers.  Subscribe should be used for listening to model changes.
	 *
	 * ### API
	 *
	 * This is the call signiture for the processor, not the controller subscription callbacks.
	 *
	 * @param {HTMLElement} el the element being bound.  This isn't used.
	 * @param {String} event the event type (subscribe).
	 * @param {String} selector the subscription name
	 * @param {String} cb the callback function's name
	 */
	$.Controller.processors.subscribe = function( el, event, selector, cb, controller ) {
		var subscription = OpenAjax.hub.subscribe(selector, function(){
			return controller[cb].apply(controller, arguments)
		});
		return function() {
			OpenAjax.hub.unsubscribe(subscription);
		};
	};
	/**
	 * @add jQuery.Controller.prototype
	 */
	//breaker
	/**
	 * @function publish
	 * @hide
	 * Publishes a message to OpenAjax.hub.
	 * @param {String} message Message name, ex: "Something.Happened".
	 * @param {Object} data The data sent.
	 */
	$.Controller.prototype.publish = function() {
		OpenAjax.hub.publish.apply(OpenAjax.hub, arguments);
	};
};
exports();
module.resolveWith(exports); 
});
// module body: end
};
// module factory: end
dispatch("mvc/controller.subscribe")
.containing(moduleFactory)
.to("Foundry/2.1 Modules");
}());
