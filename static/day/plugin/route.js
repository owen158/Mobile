function Xroute(){this.controller=[],this.status=!1}Xroute.prototype.get=function(t,r){"string"==typeof t?this.controller.push({name:t,callback:r}):this.controller.push({name:101,callback:t})},Xroute.prototype.all=function(t){this.controller.push({name:102,callback:t})},Xroute.prototype.hashchange=function(){function c(){var a=i;++i,r.length<i||(t.status&&101==r[a].name?c():("string"==typeof r[a].name&&(s.param=p(r[a].name)),r[a].callback(s,l,c)))}function p(t){for(var r={},a=t.split("/"),e=1;e<a.length;e++)if(/^:[A-z][\w\d]*$/.test(a[e])){var o=a[e].replace(/^:/,""),s=n[e];/^[0-9]+$/.test(s)&&(s=parseFloat(s)),r[o]=s}return r}function u(){for(var t={},r=o.split("&"),a=0;a<r.length;a++){var e=r[a].split("=");/^[A-z][\w\d]*$/.test(e[0])&&(t[e[0]]=t[1]||null)}return t}var t=this,r=[],a=window.location.hash.replace(/^#/,"").split("?"),e=a[0]?a[0]:"",n=e.split("/"),o=a[1]?a[1]:"",s={param:{},query:u(),pathname:e,search:o},l={},i=0;this.status=!1;for(var h=0;h<this.controller.length;h++)(101==this.controller[h].name||this.test(this.controller[h].name))&&r.push(this.controller[h]);c.call(this)},Xroute.prototype.test=function(t){var r=window.location.hash,a=t;""==r&&(r="#"),102==a&&(a=String(a).replace(/102/,".*?")),a="^#"+a.replace(/\/:\w[^\/]*/g,"/([^/]+)").replace(/\//g,"\\/")+"$";var e=new RegExp(a).test(r);return e&&102!=t&&(this.status=!0),e},Xroute.prototype.start=function(t){var r=this;window.addEventListener("hashchange",function(){r.hashchange()},!1),r.hashchange()};