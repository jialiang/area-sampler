!function a(r,o,l){function i(t,e){if(!o[t]){if(!r[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=o[t]={exports:{}},r[t][0].call(n.exports,function(e){return i(r[t][1][e]||e)},n,n.exports,a,r,o,l)}return o[t].exports}for(var u="function"==typeof require&&require,e=0;e<l.length;e++)i(l[e]);return i}({1:[function(e,t,n){n.lab2rgb=function(e){var t=(e[0]+16)/116,n=e[1]/500+t,e=t-e[2]/200,a=-.9689*(n=.95047*(.008856<n*n*n?n*n*n:(n-16/116)/7.787))+1.8758*(t=.008856<t*t*t?t*t*t:(t-16/116)/7.787)+.0415*(e=1.08883*(.008856<e*e*e?e*e*e:(e-16/116)/7.787)),r=.0557*n+-.204*t+1.057*e,n=.0031308<(n=3.2406*n+-1.5372*t+-.4986*e)?1.055*Math.pow(n,1/2.4)-.055:12.92*n;return a=.0031308<a?1.055*Math.pow(a,1/2.4)-.055:12.92*a,r=.0031308<r?1.055*Math.pow(r,1/2.4)-.055:12.92*r,[255*Math.max(0,Math.min(1,n)),255*Math.max(0,Math.min(1,a)),255*Math.max(0,Math.min(1,r))]},n.rgb2lab=function(e){var t=e[0]/255,n=e[1]/255,e=e[2]/255,a=.2126*(t=.04045<t?Math.pow((.055+t)/1.055,2.4):t/12.92)+.7152*(n=.04045<n?Math.pow((.055+n)/1.055,2.4):n/12.92)+.0722*(e=.04045<e?Math.pow((.055+e)/1.055,2.4):e/12.92),r=(.0193*t+.1192*n+.9505*e)/1.08883,t=.008856<(t=(.4124*t+.3576*n+.1805*e)/.95047)?Math.pow(t,1/3):7.787*t+16/116;return[116*(a=.008856<a?Math.pow(a,1/3):7.787*a+16/116)-16,500*(t-a),200*(a-(.008856<r?Math.pow(r,1/3):7.787*r+16/116))]},n.deltaE=function(e,t){var n=e[0]-t[0],a=e[1]-t[1],r=e[2]-t[2],e=Math.sqrt(e[1]*e[1]+e[2]*e[2]),t=e-Math.sqrt(t[1]*t[1]+t[2]*t[2]),a=a*a+r*r-t*t,r=n,n=t/(1+.045*e),t=(a<0?0:Math.sqrt(a))/(1+.015*e),a=r*r+n*n+t*t;return a<0?0:Math.sqrt(a)}},{}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("rgb-lab"),u=e("./Util.ts");function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,o,l,i=[],u=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(a=o.call(n)).done)&&(i.push(a.value),i.length!==t);u=!0);}catch(e){c=!0,r=e}finally{try{if(!u&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(c)throw r}}return i}}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t,n){return(c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return;if(Reflect.construct.sham)return;if("function"==typeof Proxy)return 1;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),1}catch(e){}}()?Reflect.construct.bind():function(e,t,n){var a=[null],t=(a.push.apply(a,t),new(Function.bind.apply(e,a)));return n&&o(t,n.prototype),t}).apply(null,arguments)}function o(e,t){return(o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function s(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){var n;if(e)return"string"==typeof e?f(e,t):"Map"===(n="Object"===(n=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function m(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,h(a.key),a)}}function v(e,t,n){(t=h(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}function h(e){e=function(e,t){if("object"!==a(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"===a(e)?e:String(e)}e=g,(d=[{key:"rgb",get:function(){return[this.r,this.g,this.b]}},{key:"rgba",get:function(){return[this.r,this.g,this.b,this.a]}},{key:"toRgb",value:function(){var e=[this.r,this.g,this.b].map(function(e){return Math.round(e)});return"rgb(".concat(e.join(", "),")")}},{key:"toRgba",value:function(){var e=this.r,t=this.g,n=this.b,a=this.a,e=[e,t,n].map(function(e){return Math.round(e)});return e.push((0,u.round)(a/255,2)),"rgba(".concat(e.join(", "),")")}},{key:"toHex6",value:function(){var e=this.r,t=this.g,n=this.b,a=this.hex;return"#"+a(e)+a(t)+a(n)}},{key:"toHex8",value:function(){var e=this.r,t=this.g,n=this.b,a=this.a,r=this.hex;return"#"+r(e)+r(t)+r(n)+r(a)}},{key:"toHsl",value:function(){var e=r(this.getHsl(),3),t=e[0],n=e[1],e=e[2];return"hsl(".concat(t,", ").concat(n,"%, ").concat(e,"%)")}},{key:"toHsla",value:function(){var e=this.a,t=r(this.getHsl(),3),n=t[0],a=t[1],t=t[2],e=(0,u.round)(e/255,2);return"hsla(".concat(n,", ").concat(a,"%, ").concat(t,"%, ").concat(e,")")}}])&&m(e.prototype,d),p&&m(e,p),Object.defineProperty(e,"prototype",{writable:!1});var d,p,y=g;function g(e,t,n,a){var l=this,r=this,o=g;if(!(r instanceof o))throw new TypeError("Cannot call a class as a function");if(v(this,"r",0),v(this,"g",0),v(this,"b",0),v(this,"a",0),v(this,"getClosedNamedColor",function(){var e=l.r,t=l.g,n=l.b,a=(0,i.rgb2lab)([e,t,n]),r=101,o="";return g.namedColorsLab.forEach(function(e){var t=(0,i.deltaE)(a,e.value);t<r&&(r=t,o=e.name)}),o}),v(this,"hex",function(e){return("0"+Math.round(e).toString(16)).slice(-2)}),v(this,"getHsl",function(){var e=l.r/255,t=l.g/255,n=l.b/255,a=Math.max(e,t,n),r=Math.min(e,t,n),o=a-r,n=0==o?0:e===a?(t-n)/o%6:t===a?(n-e)/o+2:(e-t)/o+4;return(n=Math.round(60*n))<0&&(n+=360),e=(a+r)/2,t=0==o?0:o/(1-Math.abs(2*e-1)),e=(0,u.round)(100*e,1),[n,(0,u.round)(100*t,1),e]}),1===arguments.length){if(e instanceof g)return c(g,s(e.rgba));if("string"==typeof e&&"#"===e[0])return void(7!==(r=4===(r=e).length?"#"+r[1]+r[1]+r[2]+r[2]+r[3]+r[3]:r).length&&9!==r.length||(this.r=parseInt(r[1]+r[2],16),this.g=parseInt(r[3]+r[4],16),this.b=parseInt(r[5]+r[6],16),9===r.length?this.a=parseInt(r[7]+r[8],16):this.a=255))}3!==arguments.length&&4!==arguments.length||(o=null==a?255:a,"number"==typeof e&&"number"==typeof t&&"number"==typeof n&&(this.r=e,this.g=t,this.b=n),this.a=o)}v(n.default=y,"squaredValues",s(Array(256).keys()).map(function(e){return e*e})),v(y,"namedColorsLab",[{name:"aliceblue",value:[97.18,-1.34,-4.27]},{name:"antiquewhite",value:[93.73,1.84,11.52]},{name:"aqua",value:[91.12,-48.08,-14.14]},{name:"aquamarine",value:[92.04,-45.52,9.71]},{name:"azure",value:[98.93,-4.88,-1.7]},{name:"beige",value:[95.95,-4.19,12.04]},{name:"bisque",value:[92.01,4.43,19]},{name:"black",value:[0,0,0]},{name:"blanchedalmond",value:[93.92,2.13,17.02]},{name:"blue",value:[32.3,79.2,-107.86]},{name:"blueviolet",value:[42.19,69.86,-74.77]},{name:"brown",value:[37.52,49.7,30.54]},{name:"burlywood",value:[77.02,7.05,30.01]},{name:"cadetblue",value:[61.15,-19.68,-7.43]},{name:"chartreuse",value:[89.87,-68.07,85.78]},{name:"chocolate",value:[55.99,37.06,56.74]},{name:"coral",value:[67.29,45.36,47.49]},{name:"cornflowerblue",value:[61.93,9.34,-49.31]},{name:"cornsilk",value:[97.46,-2.21,14.28]},{name:"crimson",value:[47.03,70.94,33.59]},{name:"cyan",value:[91.12,-48.08,-14.14]},{name:"darkblue",value:[14.76,50.43,-68.68]},{name:"darkcyan",value:[52.21,-30.62,-9]},{name:"darkgoldenrod",value:[59.22,9.87,62.73]},{name:"darkgray",value:[69.24,0,-.01]},{name:"darkgreen",value:[36.2,-43.37,41.86]},{name:"darkgrey",value:[69.24,0,-.01]},{name:"darkkhaki",value:[73.38,-8.79,39.29]},{name:"darkmagenta",value:[32.6,62.56,-38.74]},{name:"darkolivegreen",value:[42.23,-18.83,30.6]},{name:"darkorange",value:[69.48,36.83,75.49]},{name:"darkorchid",value:[43.38,65.17,-60.11]},{name:"darkred",value:[28.08,51.01,41.29]},{name:"darksalmon",value:[69.85,28.18,27.7]},{name:"darkseagreen",value:[72.09,-23.82,18.03]},{name:"darkslateblue",value:[30.83,26.06,-42.09]},{name:"darkslategray",value:[31.26,-11.72,-3.73]},{name:"darkslategrey",value:[31.26,-11.72,-3.73]},{name:"darkturquoise",value:[75.29,-40.04,-13.52]},{name:"darkviolet",value:[39.58,76.34,-70.38]},{name:"deeppink",value:[55.95,84.56,-5.71]},{name:"deepskyblue",value:[72.55,-17.65,-42.55]},{name:"dimgray",value:[44.41,0,-.01]},{name:"dimgrey",value:[44.41,0,-.01]},{name:"dodgerblue",value:[59.38,9.97,-63.39]},{name:"firebrick",value:[39.11,55.93,37.65]},{name:"floralwhite",value:[98.4,-.03,5.37]},{name:"forestgreen",value:[50.59,-49.59,45.02]},{name:"fuchsia",value:[60.32,98.25,-60.84]},{name:"gainsboro",value:[87.76,0,-.01]},{name:"ghostwhite",value:[97.76,1.25,-3.36]},{name:"gold",value:[86.93,-1.92,87.14]},{name:"goldenrod",value:[70.82,8.52,68.76]},{name:"gray",value:[53.59,0,-.01]},{name:"green",value:[46.23,-51.7,49.9]},{name:"greenyellow",value:[91.96,-52.48,81.87]},{name:"grey",value:[53.59,0,-.01]},{name:"honeydew",value:[98.57,-7.56,5.47]},{name:"hotpink",value:[65.48,64.25,-10.66]},{name:"indianred",value:[53.39,44.84,22.11]},{name:"indigo",value:[20.47,51.69,-53.32]},{name:"ivory",value:[99.64,-2.55,7.15]},{name:"khaki",value:[90.33,-9.01,44.97]},{name:"lavender",value:[91.83,3.71,-9.67]},{name:"lavenderblush",value:[96.07,5.89,-.6]},{name:"lawngreen",value:[88.88,-67.86,84.95]},{name:"lemonchiffon",value:[97.65,-5.42,22.23]},{name:"lightblue",value:[83.81,-10.89,-11.49]},{name:"lightcoral",value:[66.15,42.82,19.55]},{name:"lightcyan",value:[97.87,-9.94,-3.38]},{name:"lightgoldenrodyellow",value:[97.37,-6.48,19.23]},{name:"lightgray",value:[84.56,0,-.01]},{name:"lightgreen",value:[86.55,-46.33,36.94]},{name:"lightgrey",value:[84.56,0,-.01]},{name:"lightpink",value:[81.05,27.97,5.03]},{name:"lightsalmon",value:[74.7,31.48,34.54]},{name:"lightseagreen",value:[65.79,-37.51,-6.34]},{name:"lightskyblue",value:[79.73,-10.82,-28.51]},{name:"lightslategray",value:[55.92,-2.24,-11.11]},{name:"lightslategrey",value:[55.92,-2.24,-11.11]},{name:"lightsteelblue",value:[78.45,-1.28,-15.22]},{name:"lightyellow",value:[99.28,-5.1,14.83]},{name:"lime",value:[87.74,-86.18,83.18]},{name:"limegreen",value:[72.61,-67.13,61.44]},{name:"linen",value:[95.31,1.68,6.01]},{name:"magenta",value:[60.32,98.25,-60.84]},{name:"maroon",value:[25.53,48.06,38.06]},{name:"mediumaquamarine",value:[75.69,-38.33,8.3]},{name:"mediumblue",value:[24.98,67.18,-91.5]},{name:"mediumorchid",value:[53.64,59.07,-47.41]},{name:"mediumpurple",value:[54.98,36.81,-50.1]},{name:"mediumseagreen",value:[65.27,-48.22,24.29]},{name:"mediumslateblue",value:[52.16,41.08,-65.41]},{name:"mediumspringgreen",value:[87.34,-70.68,32.46]},{name:"mediumturquoise",value:[76.88,-37.35,-8.36]},{name:"mediumvioletred",value:[44.76,71.01,-15.18]},{name:"midnightblue",value:[15.86,31.72,-49.58]},{name:"mintcream",value:[99.16,-4.16,1.24]},{name:"mistyrose",value:[92.66,8.75,4.83]},{name:"moccasin",value:[91.72,2.44,26.35]},{name:"navajowhite",value:[90.1,4.51,28.26]},{name:"navy",value:[12.98,47.51,-64.7]},{name:"oldlace",value:[96.78,.18,8.16]},{name:"olive",value:[51.87,-12.93,56.68]},{name:"olivedrab",value:[54.65,-28.22,49.69]},{name:"orange",value:[74.93,23.94,78.96]},{name:"orangered",value:[57.57,67.8,68.97]},{name:"orchid",value:[62.8,55.29,-34.42]},{name:"palegoldenrod",value:[91.14,-7.35,30.96]},{name:"palegreen",value:[90.75,-48.3,38.52]},{name:"paleturquoise",value:[90.06,-19.63,-6.41]},{name:"palevioletred",value:[60.56,45.53,.39]},{name:"papayawhip",value:[95.08,1.27,14.52]},{name:"peachpuff",value:[89.35,8.09,21.01]},{name:"peru",value:[61.75,21.4,47.92]},{name:"pink",value:[83.58,24.15,3.32]},{name:"plum",value:[73.37,32.54,-22]},{name:"powderblue",value:[86.13,-14.09,-8.02]},{name:"purple",value:[29.78,58.94,-36.5]},{name:"red",value:[53.23,80.11,67.22]},{name:"rosybrown",value:[63.61,17.02,6.6]},{name:"royalblue",value:[47.83,26.27,-65.27]},{name:"saddlebrown",value:[37.47,26.45,40.99]},{name:"salmon",value:[67.26,45.23,29.09]},{name:"sandybrown",value:[73.95,23.03,46.79]},{name:"seagreen",value:[51.54,-39.71,20.05]},{name:"seashell",value:[97.12,2.17,4.54]},{name:"sienna",value:[43.8,29.33,35.64]},{name:"silver",value:[77.7,0,-.01]},{name:"skyblue",value:[79.21,-14.83,-21.28]},{name:"slateblue",value:[45.34,36.05,-57.78]},{name:"slategray",value:[52.84,-2.14,-10.58]},{name:"slategrey",value:[52.84,-2.14,-10.58]},{name:"snow",value:[98.64,1.66,.58]},{name:"springgreen",value:[88.47,-76.9,47.03]},{name:"steelblue",value:[52.47,-4.07,-32.2]},{name:"tan",value:[74.97,5.02,24.42]},{name:"teal",value:[48.26,-28.84,-8.48]},{name:"thistle",value:[80.08,13.22,-9.24]},{name:"tomato",value:[62.2,57.86,46.42]},{name:"turquoise",value:[81.27,-44.08,-4.03]},{name:"violet",value:[69.69,56.37,-36.82]},{name:"wheat",value:[89.35,1.51,24]},{name:"white",value:[100,.01,-.01]},{name:"whitesmoke",value:[96.54,.01,-.01]},{name:"yellow",value:[97.14,-21.56,94.48]},{name:"yellowgreen",value:[76.54,-37.99,66.59]}]),v(y,"getMeanMedian",function(e,t){var n=t.averagingMethod,a=e.length,r=new y,o=new y;if(0!==a)for(var l=["r","g","b","a"],i=0;i<l.length;i++){for(var u=l[i],c=[],s=0;s<e.length;s++)c.push(e[s][u]);var f=c.sort();if("squared"===n){for(var m=0,v=0;v<c.length;v++)m+=y.squaredValues[c[v]];var h=Math.sqrt(m/a);r[u]=h}if("simple"===n){for(var d=0,p=0;p<c.length;p++)d+=c[p];r[u]=d/a}h=Math.floor(f.length/2);o[u]=f[h]}return[r,o]}),v(y,"getLightestDarkest",function(e){var t,n,a,r;return 0===e.length?[new y,new y]:(t=function(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)},r=e.map(function(e){e=.2126*t(e.r/255)+.7152*t(e.g/255)+.0722*t(e.b/255);return e<=216/24389?24389/27*e:116*Math.pow(e,1/3)-16}),a=Math.max.apply(Math,s(r)),n=Math.min.apply(Math,s(r)),a=r.indexOf(a),r=r.indexOf(n),[new y(e[a]),new y(e[r])])}),v(y,"blendColors",function(t,n){var a=n.a/255,r=1-a,e=["r","g","b"].map(function(e){return t[e]*r+n[e]*a});return c(y,s(e))})},{"./Util.ts":7,"rgb-lab":1}],3:[function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){return(o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function l(n){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=u(n),t=(e=a?(e=u(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments),this);if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return i(t)}}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t,n){(t=f(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,f(a.key),a)}}function s(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function f(e){e=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!==r(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"===r(e)?e:String(e)}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var v=s(function e(){return m(this,e),new Proxy(this,{get:function(e,t){var n=e.fieldHashmap[t.toString()];return n?n.value:e[t]}})}),h=function(){var e=a,t=v;if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&o(e,t);var n=l(a);function a(e,t){var l;return m(this,a),c(i(l=n.call(this)),"onBeforeChange",function(e,t){var n,a=i(l),r=a.fieldHashmap,o=a.fieldToBeforeChangeCallback,a=a.callback,r=r[e];r&&(n=o[e],a&&r.removeEventListener("change",a),n&&r.removeEventListener("change",n),r.addEventListener("change",t),a&&r.addEventListener("change",a),o[e]=t)}),c(i(l),"triggerAllBeforeChangeCallbacks",function(){var e=i(l),t=e.fieldArray,n=e.fieldToBeforeChangeCallback;t.forEach(function(e){e=n[e.name];e&&e()})}),c(i(l),"save",function(){var e=i(l).fieldArray.reduce(function(e,t){return"file"!==t.type&&(e[t.name]=t.value),e},{});localStorage.setItem("options",JSON.stringify(e))}),c(i(l),"restore",function(){var e=i(l).fieldArray,t=localStorage.getItem("options");if(t)try{var n=JSON.parse(t);e.forEach(function(e){n[e.name]&&(e.value=n[e.name])})}catch(e){localStorage.removeItem("options")}}),l.fieldArray=e,l.fieldHashmap={},l.fieldToBeforeChangeCallback={},e.forEach(function(e){l.fieldHashmap[e.name]=e}),t&&(l.onChange=t),l.restore(),l}return s(a,[{key:"onChange",set:function(t){var e=this.fieldArray,n=this.callback;e.forEach(function(e){n&&e.removeEventListener("change",n),e.addEventListener("change",t)}),this.callback=t}}]),a}();n.default=h},{}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var v=(i=e("./Color.ts"))&&i.__esModule?i:{default:i},h=e("./Util.ts");function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,l(a.key),a)}}function o(e,t,n){(t=l(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}function l(e){e=function(e,t){if("object"!==a(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"===a(e)?e:String(e)}i=function e(t,n){var m=this;if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");o(this,"handleReadUpload",function(){var e=m.uploader,t=m.image,n=new FileReader;if(n.addEventListener("load",function(e){if(!e.target||!e.target.result)throw"Failed to read uploaded file.";t.src=e.target.result.toString()}),!e.files)throw"Asked to read image file but found no file was uploaded.";n.readAsDataURL(e.files[0])}),o(this,"handleUpdateImage",function(){function e(e){for(var t=[],n=0;n<e.length;n+=4){var a=e[n+0],r=e[n+1],o=e[n+2],l=e[n+3];t.push(new v.default(a,r,o,l))}return t}var t=m.preview,n=m.context,a=m.image,r=m.opacity,o=m.backgroundColor,l=(l=a.width)||300,i=(i=a.height)||200,a=(t.width=l,t.height=i,n.clearRect(0,0,l,i),n.drawImage(a,0,0),n.getImageData(0,0,l,i)),u=a.data;if(null==r&&null==o)return m.colors=e(u),!0;if(null!=r){for(var c=0;c<u.length;c+=4){var s=u[c+3]*r,s=(0,h.clamp)(s,0,255);u[c+3]=s}if(n.putImageData(a,0,0),!o)return m.colors=e(u),!0}if(null!=o){var a=new OffscreenCanvas(l,i),f=a.getContext("2d");if(!f)throw"Failed to get 2D context of offscreen canvas.";f.fillStyle=o.toRgba(),f.fillRect(0,0,l,i),f.drawImage(t,0,0),n.drawImage(a,0,0),m.colors=e(n.getImageData(0,0,l,i).data)}}),o(this,"loadExampleImage",function(){m.image.src="./example.png"}),o(this,"getColorsAt",function(e,t,n,a){for(var r=m.preview,o=m.colors,l=[],i=t;i<t+a;i++)for(var u=e;u<e+n;u++){var c=i*r.width+u;c<0||c>o.length||l.push(o[c])}return l}),o(this,"setBackgroundColor",function(e){0===e.a?delete m.backgroundColor:m.backgroundColor=e,m.handleUpdateImage()}),o(this,"setOpacity",function(e){1===e?delete m.opacity:m.opacity=e,m.handleUpdateImage()});var a=new Image,n=(a.addEventListener("load",this.handleUpdateImage),n.addEventListener("change",this.handleReadUpload),this.preview=t,this.uploader=n,t.getContext("2d"));if(!n)throw"Failed to get 2D context from canvas element.";this.context=n,this.image=a,this.colors=[]},u&&r(i.prototype,u),c&&r(i,c),Object.defineProperty(i,"prototype",{writable:!1});var i,u,c,e=i;n.default=e},{"./Color.ts":2,"./Util.ts":7}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("./Util.ts");function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,l(a.key),a)}}function i(e,t,n){(t=l(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}function l(e){e=function(e,t){if("object"!==a(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"===a(e)?e:String(e)}e=function e(t){var l=this;if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");i(this,"setBackgroundColor",function(e){var t=l.resultElementArray,n=e.toRgba();t.forEach(function(e){e.backgroundElement.style.backgroundColor=n})}),i(this,"setResult",function(e,t,n){var a=l.resultElementHashmap,r=n.resultFormat,n=n.hideAlphaChannel,o=!1,n=("always"===n?o=!1:"never"!==n&&255===t.a||(o=!0),"");if("rgb"===r&&(n=o?t.toRgba():t.toRgb()),"hex"===r&&(n=o?t.toHex8():t.toHex6()),"hsl"===r&&(n=o?t.toHsla():t.toHsl()),!(n="svg"===r?t.getClosedNamedColor():n))throw"Invalid resultFormat option: ".concat(r.toString());a[e].textElement.value=n}),this.resultElementArray=[],this.resultElementHashmap={},t.forEach(function(e){var t=e.querySelector("input"),a=e.querySelector(".foreground"),n=e.querySelector(".background"),e=e.querySelector(".copy"),e=(e&&e.addEventListener("click",function(e){e.preventDefault(),navigator.clipboard.writeText(t.value),(0,o.toast)("Copied ".concat(t.value))}),new Proxy(t,{set:function(e,t,n){return"value"===t&&(a.style.backgroundColor=n),e[t]=n,!0}})),r=t.name.split("ResultText")[0],e={textElement:e,foregroundElement:a,backgroundElement:n};l.resultElementHashmap[r]=e,l.resultElementArray.push(e)})},c&&r(e.prototype,c),u&&r(e,u),Object.defineProperty(e,"prototype",{writable:!1});var u,c=e;n.default=c},{"./Util.ts":7}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("./Util.ts");function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,i(a.key),a)}}function l(e,t,n){(t=i(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}function i(e){e=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!==r(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"===r(e)?e:String(e)}e=s,(c=[{key:"onSelectionEnd",set:function(e){this.callback=(0,a.debounce)(e)}}])&&o(e.prototype,c),u&&o(e,u),Object.defineProperty(e,"prototype",{writable:!1});var u,c=s;function s(e,t,n){var c=this;if(!(this instanceof s))throw new TypeError("Cannot call a class as a function");l(this,"isInProgress",!1),l(this,"startPosition",{x:0,y:0}),l(this,"endPosition",{x:0,y:0}),l(this,"handleTouch",function(e){var t,n,a,r,o=e.targetTouches,l=e.changedTouches,i=e.type;2===o.length&&(e.preventDefault(),e=c.target,t=c.updateInfo,n=c.updateOutline,a=c.callback,i="touchend"===i?l:o,l=e.getBoundingClientRect(),o=Math.round(i[0].clientX-l.left),e=Math.round(i[0].clientY-l.top),r=Math.round(i[1].clientX-l.left),i=Math.round(i[1].clientY-l.top),c.startPosition={x:o,y:e},c.endPosition={x:r,y:i},t(),n(),a)&&a()}),l(this,"handleSelect",function(e){var t=e.type,n=e.button,a=e.clientX,e=e.clientY,r=c.target,o=c.isInProgress,l=c.updateInfo,i=c.updateOutline,u=c.callback;null!==n&&0!==n||(n=r.getBoundingClientRect(),r=Math.round(a-n.left),a=Math.round(e-n.top),"mousedown"===t?(c.startPosition={x:r,y:a},c.isInProgress=!0):o&&("mousemove"!==t&&"mouseup"!==t&&"mouseleave"!==t||(c.endPosition={x:r,y:a},l(),i(),u&&u()),"mouseup"!==t&&"mouseleave"!==t||(c.isInProgress=!1)))}),l(this,"updateInfo",function(){var e=c.startPosition,t=c.endPosition,n=c.target,a=Math.max(Math.min(e.y,t.y),0),r=Math.max(Math.min(e.x,t.x),0),o=Math.min(Math.max(e.y,t.y),n.height),e=Math.min(Math.max(e.x,t.x),n.width),t=Math.max(e-r,1),n=Math.max(o-a,1);c.info={top:a,left:r,bottom:o,right:e,width:t,height:n}}),l(this,"updateOutline",function(){var e,t,n,a=c.outline,r=c.info;r&&(n=r.top,e=r.left,t=r.width,r=r.height,n="top:".concat(n,"px; left:").concat(e,"px; width:").concat(t,"px; height:").concat(r,"px;"),a.style.cssText=n)}),l(this,"clear",function(){c.outline.style.cssText="",delete c.info}),t.onmousedown=this.handleSelect,t.onmouseup=this.handleSelect,t.onmousemove=this.handleSelect,t.onmouseleave=this.handleSelect,t.ontouchstart=this.handleTouch,t.ontouchend=this.handleTouch,t.ontouchmove=this.handleTouch,this.outline=e,this.target=t,n&&(this.onSelectionEnd=n)}n.default=c},{"./Util.ts":7}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.toast=n.round=n.debounce=n.clamp=void 0,n.debounce=function(a){var r,o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:150;return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];clearTimeout(r),r=window.setTimeout(function(){return a.apply(void 0,t)},o)}},n.round=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return+(Math.round(+(e+"e+".concat(t)))+"e-".concat(t))},n.clamp=function(e,t,n){return Math.max(Math.min(e,n),t)};n.toast=function(e){var t=document.createElement("div"),n=(t.textContent=e,t.className="toast",t.setAttribute("role","status"),document.querySelector(".toast-container"));n&&(n.appendChild(t),setTimeout(function(){n.removeChild(t)},1500))}},{}],8:[function(e,t,n){"use strict";var v=a(e("./classes/Color.ts")),h=a(e("./classes/Options.ts")),d=a(e("./classes/Preview.ts")),p=a(e("./classes/Selection.ts")),y=a(e("./classes/Results.ts")),g=e("./classes/Util.ts");function a(e){return e&&e.__esModule?e:{default:e}}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,o,l,i=[],u=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(a=o.call(n)).done)&&(i.push(a.value),i.length!==t);u=!0);}catch(e){c=!0,r=e}finally{try{if(!u&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(c)throw r}}return i}}(e,t)||function(e,t){{var n;if(e)return"string"==typeof e?r(e,t):"Map"===(n="Object"===(n=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function o(){function e(e){return Array.from(document.querySelectorAll(e))}function t(){var e=u.transparencyType,t=null;if("straight"===e&&(t=new v.default(0,0,0,0)),!(t="premultiplied"===e?new v.default(u.backgroundColor):t))throw"Invalid transparency type option: ".concat(e.toString());c.setBackgroundColor(t),s.setBackgroundColor(t),m()}var n=e(".options")[0],a=e(".results")[0],a=(n.reset(),a.reset(),n.addEventListener("submit",function(e){e.preventDefault(),m()}),e(".options :is(input, select)")),r=e(".results .field"),o=e(".preview")[0],l=e("input[name=imageUpload]")[0],i=e(".selector")[0],u=new h.default(a),c=new d.default(o,l),s=new y.default(r),f=new p.default(i,o),m=function(){var e,t,n,a;f.info&&(a=(t=f.info).top,n=t.left,e=t.width,t=t.height,n=c.getColorsAt(n,a,e,t),e=(a=b(v.default.getMeanMedian(n,u),2))[0],t=a[1],n=(a=b(v.default.getLightestDarkest(n),2))[0],a=a[1],s.setResult("mean",e,u),s.setResult("median",t,u),s.setResult("lightest",n,u),s.setResult("darkest",a,u))},a=(l.addEventListener("change",f.clear),e("#example-image-button")[0]),r=e("button[type=reset]")[0],i=e("button[name=save")[0];a.addEventListener("click",function(e){e.preventDefault(),f.clear(),c.loadExampleImage()}),r.addEventListener("click",function(e){e.preventDefault(),n.reset(),u.triggerAllBeforeChangeCallbacks(),m(),(0,g.toast)("Options reset!")}),i.addEventListener("click",function(e){e.preventDefault(),u.save(),(0,g.toast)("Options saved!")}),u.onBeforeChange("opacityPercentage",function(){var e=u.opacityPercentage;c.setOpacity(e/100)});u.onBeforeChange("backgroundColor",t),u.onBeforeChange("transparencyType",t),u.triggerAllBeforeChangeCallbacks(),f.onSelectionEnd=m,u.onChange=m}window.onload=function(){return requestAnimationFrame(o)}},{"./classes/Color.ts":2,"./classes/Options.ts":3,"./classes/Preview.ts":4,"./classes/Results.ts":5,"./classes/Selection.ts":6,"./classes/Util.ts":7}]},{},[8]);
//# sourceMappingURL=bundle.js.map
