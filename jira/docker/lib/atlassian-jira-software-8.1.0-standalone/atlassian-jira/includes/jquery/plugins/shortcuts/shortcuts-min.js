!function(t){function n(t){h&&r(),h=16!==t.which}function e(n){if(t(n.target).is(":input:not(button[type=button])"))return void r();a.push(n.key),clearTimeout(c),c=setTimeout(r,2e3),a.length>d&&a.shift();for(var e=a.join(""),o=0;o<e.length;o++){var i=e.slice(o);if(i in u){n.preventDefault(),n=new t.Event("shortcut"),n.data=i,u[i].call(document,n),a.length=0;break}}h=!1}function o(){h&&r()}function r(){a.length=0}function i(t,n){var e=t.length,o=n.length;if(e===o)return t===n;var r,i;return e<o?(r=n.indexOf(t),i=o-e):(r=t.indexOf(n),i=e-o),r>=0&&r<i}var u={},a=[],d=0,c=0,h=!1,s=t(document);t.event.special.shortcut={setup:function(){s.bind("keydown",n),s.bind("aui:keypress",e),s.bind("keyup",o)},teardown:function(){s.unbind("keydown",n),s.unbind("aui:keypress",e),s.unbind("keyup",o)},add:function(t){if(this!==document)throw new TypeError('"shortcut" event handlers must be bound at the document');if(void 0===t.data)throw new Error('No data argument supplied in call to jQuery.fn.bind("shortcut", '+(t.handler.name||"function")+")");if("string"!=typeof t.data)throw new TypeError("Object "+t.data+" is not a string");if(0===t.data.length)throw new Error("Shortcut sequence must not be empty");for(var n in u)if(i(n,t.data))return void console.log('Cannot bind new shortcut "'+t.data+'" due to conflict with existing shortcut "'+n+'"');t.data.length>d&&(d=t.data.length),u[t.data]=t.handler},remove:function(t){if(this!==document)throw new TypeError('"shortcut" event handlers must be bound at the document');delete u[t.data]}}}(jQuery);