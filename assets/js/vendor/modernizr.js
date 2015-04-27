/*! Modernizr 3.0.0-beta (Custom Build) | MIT
 *  Build: http://modernizr.com/download/#-svgasimg
 */
(function(n,e){var t,o,Modernizr,s,i,a,f;function r(n,e){return typeof n===e}function l(){var n,e,o,i,a,f,l,u;for(u in t){if(n=[],e=t[u],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;e.options.aliases.length>o;o++)n.push(e.options.aliases[o].toLowerCase());for(i=r(e.fn,"function")?e.fn():e.fn,a=0;n.length>a;a++)f=n[a],l=f.split("."),1===l.length?Modernizr[l[0]]=i:2===l.length&&(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=i),s.push((i?"":"no-")+l.join("-"))}}function u(n){var e,t,o;e=a.className,t=Modernizr._config.classPrefix||"",o=RegExp("(^|\\s)"+t+"no-js(\\s|$)"),e=e.replace(o,"$1"+t+"js$2"),Modernizr._config.enableClasses&&(e+=" "+t+n.join(" "+t),a.className=e)}function c(n,e){var t,o,s;if("object"==typeof n)for(t in n)i(n,t)&&c(t,n[t]);else{if(n=n.toLowerCase(),o=n.split("."),s=Modernizr[o[0]],2==o.length&&(s=s[o[1]]),s!==undefined)return Modernizr;e="function"==typeof e?e():e,1==o.length?Modernizr[o[0]]=e:2==o.length&&(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=e),u([(e?"":"no-")+o.join("-")]),Modernizr._trigger(n,e)}return Modernizr}t=[],o={_version:"v3.0.0pre",_config:{classPrefix:"",enableClasses:!0,usePrefixes:!0},_q:[],on:function(n,e){setTimeout(function(){e(this[n])},0)},addTest:function(n,e,o){t.push({name:n,fn:e,options:o})},addAsyncTest:function(n){t.push({name:null,fn:n})}},Modernizr=function(){},Modernizr.prototype=o,Modernizr=new Modernizr,s=[],function(){var n={}.hasOwnProperty;i=r(n,"undefined")||r(n.call,"undefined")?function(n,e){return e in n&&r(n.constructor.prototype[e],"undefined")}:function(e,t){return n.call(e,t)}}(),a=e.documentElement,o._l={},o.on=function(n,e){this._l[n]||(this._l[n]=[]),this._l[n].push(e),Modernizr.hasOwnProperty(n)&&setTimeout(function(){Modernizr._trigger(n,Modernizr[n])},0)},o._trigger=function(n,e){if(this._l[n]){var t=this._l[n];setTimeout(function(){var n,o;for(n=0;t.length>n;n++)o=t[n],o(e)},0),delete this._l[n]}},Modernizr._q.push(function(){o.addTest=c}),Modernizr.addTest("svgasimg",e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")),l(),delete o.addTest,delete o.addAsyncTest;for(f=0;Modernizr._q.length>f;f++)Modernizr._q[f]();n.Modernizr=Modernizr})(this,document);