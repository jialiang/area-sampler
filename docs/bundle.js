!function n(l,r,o){function s(a,e){if(!r[a]){if(!l[a]){var t="function"==typeof require&&require;if(!e&&t)return t(a,!0);if(u)return u(a,!0);throw(e=new Error("Cannot find module '"+a+"'")).code="MODULE_NOT_FOUND",e}t=r[a]={exports:{}},l[a][0].call(t.exports,function(e){return s(l[a][1][e]||e)},t,t.exports,n,l,r,o)}return r[a].exports}for(var u="function"==typeof require&&require,e=0;e<o.length;e++)s(o[e]);return s}({1:[function(e,a,t){t.lab2rgb=function(e){var a=(e[0]+16)/116,t=e[1]/500+a,e=a-e[2]/200,n=-.9689*(t=.95047*(.008856<t*t*t?t*t*t:(t-16/116)/7.787))+1.8758*(a=.008856<a*a*a?a*a*a:(a-16/116)/7.787)+.0415*(e=1.08883*(.008856<e*e*e?e*e*e:(e-16/116)/7.787)),l=.0557*t+-.204*a+1.057*e,t=.0031308<(t=3.2406*t+-1.5372*a+-.4986*e)?1.055*Math.pow(t,1/2.4)-.055:12.92*t;return n=.0031308<n?1.055*Math.pow(n,1/2.4)-.055:12.92*n,l=.0031308<l?1.055*Math.pow(l,1/2.4)-.055:12.92*l,[255*Math.max(0,Math.min(1,t)),255*Math.max(0,Math.min(1,n)),255*Math.max(0,Math.min(1,l))]},t.rgb2lab=function(e){var a=e[0]/255,t=e[1]/255,e=e[2]/255,n=.2126*(a=.04045<a?Math.pow((.055+a)/1.055,2.4):a/12.92)+.7152*(t=.04045<t?Math.pow((.055+t)/1.055,2.4):t/12.92)+.0722*(e=.04045<e?Math.pow((.055+e)/1.055,2.4):e/12.92),l=(.0193*a+.1192*t+.9505*e)/1.08883,a=.008856<(a=(.4124*a+.3576*t+.1805*e)/.95047)?Math.pow(a,1/3):7.787*a+16/116;return[116*(n=.008856<n?Math.pow(n,1/3):7.787*n+16/116)-16,500*(a-n),200*(n-(.008856<l?Math.pow(l,1/3):7.787*l+16/116))]},t.deltaE=function(e,a){var t=e[0]-a[0],n=e[1]-a[1],l=e[2]-a[2],e=Math.sqrt(e[1]*e[1]+e[2]*e[2]),a=e-Math.sqrt(a[1]*a[1]+a[2]*a[2]),n=n*n+l*l-a*a,l=t,t=a/(1+.045*e),a=(n<0?0:Math.sqrt(n))/(1+.015*e),n=l*l+t*t+a*a;return n<0?0:Math.sqrt(n)}},{}],2:[function(e,a,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=e("rgb-lab"),i=e("./Util");class d{constructor(a,e,t,n){if(this.r=0,this.g=0,this.b=0,this.a=0,this.getClosedNamedColor=()=>{const{r:e,g:a,b:t}=this,n=(0,o.rgb2lab)([e,a,t]);let l=101,r="";return d.namedColorsLab.forEach(e=>{var a=(0,o.deltaE)(n,e.value);a<l&&(l=a,r=e.name)}),r},this.hex=e=>("0"+Math.round(e).toString(16)).slice(-2),this.getHsl=()=>{var{r:e,g:a,b:t}=this,e=e/255,a=a/255,t=t/255,n=Math.max(e,a,t),l=Math.min(e,a,t),r=n-l;let o,s,u;return o=0==r?0:e===n?(a-t)/r%6:a===n?(t-e)/r+2:(e-a)/r+4,(o=Math.round(60*o))<0&&(o+=360),s=(n+l)/2,u=0==r?0:r/(1-Math.abs(2*s-1)),s=(0,i.round)(100*s,1),[o,(0,i.round)(100*u,1),s]},1===arguments.length){if(a instanceof d)return new d(...a.rgba);if("string"==typeof a&&"#"===a[0]){let e=a;return void(7!==(e=4===e.length?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:e).length&&9!==e.length||(this.r=parseInt(e[1]+e[2],16),this.g=parseInt(e[3]+e[4],16),this.b=parseInt(e[5]+e[6],16),9===e.length?this.a=parseInt(e[7]+e[8],16):this.a=255))}}3!==arguments.length&&4!==arguments.length||(n=null==n?255:n,"number"==typeof a&&"number"==typeof e&&"number"==typeof t&&(this.r=a,this.g=e,this.b=t),this.a=n)}get rgb(){var{r:e,g:a,b:t}=this;return[e,a,t]}get rgba(){var{r:e,g:a,b:t,a:n}=this;return[e,a,t,n]}toRgb(){var{r:e,g:a,b:t}=this;return`rgb(${[e,a,t].map(e=>Math.round(e)).join(", ")})`}toRgba(){var{r:e,g:a,b:t,a:n}=this,e=[e,a,t].map(e=>Math.round(e));return e.push((0,i.round)(n/255,2)),`rgba(${e.join(", ")})`}toHex6(){var{r:e,g:a,b:t,hex:n}=this;return"#"+n(e)+n(a)+n(t)}toHex8(){var{r:e,g:a,b:t,a:n,hex:l}=this;return"#"+l(e)+l(a)+l(t)+l(n)}toHsl(){var[e,a,t]=this.getHsl();return`hsl(${e}, ${a}%, ${t}%)`}toHsla(){var e=this["a"],[a,t,n]=this.getHsl();return`hsla(${a}, ${t}%, ${n}%, ${(0,i.round)(e/255,2)})`}}d.squaredValues=[...Array(256).keys()].map(e=>e*e),d.namedColorsLab=[{name:"aliceblue",value:[97.18,-1.34,-4.27]},{name:"antiquewhite",value:[93.73,1.84,11.52]},{name:"aqua",value:[91.12,-48.08,-14.14]},{name:"aquamarine",value:[92.04,-45.52,9.71]},{name:"azure",value:[98.93,-4.88,-1.7]},{name:"beige",value:[95.95,-4.19,12.04]},{name:"bisque",value:[92.01,4.43,19]},{name:"black",value:[0,0,0]},{name:"blanchedalmond",value:[93.92,2.13,17.02]},{name:"blue",value:[32.3,79.2,-107.86]},{name:"blueviolet",value:[42.19,69.86,-74.77]},{name:"brown",value:[37.52,49.7,30.54]},{name:"burlywood",value:[77.02,7.05,30.01]},{name:"cadetblue",value:[61.15,-19.68,-7.43]},{name:"chartreuse",value:[89.87,-68.07,85.78]},{name:"chocolate",value:[55.99,37.06,56.74]},{name:"coral",value:[67.29,45.36,47.49]},{name:"cornflowerblue",value:[61.93,9.34,-49.31]},{name:"cornsilk",value:[97.46,-2.21,14.28]},{name:"crimson",value:[47.03,70.94,33.59]},{name:"cyan",value:[91.12,-48.08,-14.14]},{name:"darkblue",value:[14.76,50.43,-68.68]},{name:"darkcyan",value:[52.21,-30.62,-9]},{name:"darkgoldenrod",value:[59.22,9.87,62.73]},{name:"darkgray",value:[69.24,0,-.01]},{name:"darkgreen",value:[36.2,-43.37,41.86]},{name:"darkgrey",value:[69.24,0,-.01]},{name:"darkkhaki",value:[73.38,-8.79,39.29]},{name:"darkmagenta",value:[32.6,62.56,-38.74]},{name:"darkolivegreen",value:[42.23,-18.83,30.6]},{name:"darkorange",value:[69.48,36.83,75.49]},{name:"darkorchid",value:[43.38,65.17,-60.11]},{name:"darkred",value:[28.08,51.01,41.29]},{name:"darksalmon",value:[69.85,28.18,27.7]},{name:"darkseagreen",value:[72.09,-23.82,18.03]},{name:"darkslateblue",value:[30.83,26.06,-42.09]},{name:"darkslategray",value:[31.26,-11.72,-3.73]},{name:"darkslategrey",value:[31.26,-11.72,-3.73]},{name:"darkturquoise",value:[75.29,-40.04,-13.52]},{name:"darkviolet",value:[39.58,76.34,-70.38]},{name:"deeppink",value:[55.95,84.56,-5.71]},{name:"deepskyblue",value:[72.55,-17.65,-42.55]},{name:"dimgray",value:[44.41,0,-.01]},{name:"dimgrey",value:[44.41,0,-.01]},{name:"dodgerblue",value:[59.38,9.97,-63.39]},{name:"firebrick",value:[39.11,55.93,37.65]},{name:"floralwhite",value:[98.4,-.03,5.37]},{name:"forestgreen",value:[50.59,-49.59,45.02]},{name:"fuchsia",value:[60.32,98.25,-60.84]},{name:"gainsboro",value:[87.76,0,-.01]},{name:"ghostwhite",value:[97.76,1.25,-3.36]},{name:"gold",value:[86.93,-1.92,87.14]},{name:"goldenrod",value:[70.82,8.52,68.76]},{name:"gray",value:[53.59,0,-.01]},{name:"green",value:[46.23,-51.7,49.9]},{name:"greenyellow",value:[91.96,-52.48,81.87]},{name:"grey",value:[53.59,0,-.01]},{name:"honeydew",value:[98.57,-7.56,5.47]},{name:"hotpink",value:[65.48,64.25,-10.66]},{name:"indianred",value:[53.39,44.84,22.11]},{name:"indigo",value:[20.47,51.69,-53.32]},{name:"ivory",value:[99.64,-2.55,7.15]},{name:"khaki",value:[90.33,-9.01,44.97]},{name:"lavender",value:[91.83,3.71,-9.67]},{name:"lavenderblush",value:[96.07,5.89,-.6]},{name:"lawngreen",value:[88.88,-67.86,84.95]},{name:"lemonchiffon",value:[97.65,-5.42,22.23]},{name:"lightblue",value:[83.81,-10.89,-11.49]},{name:"lightcoral",value:[66.15,42.82,19.55]},{name:"lightcyan",value:[97.87,-9.94,-3.38]},{name:"lightgoldenrodyellow",value:[97.37,-6.48,19.23]},{name:"lightgray",value:[84.56,0,-.01]},{name:"lightgreen",value:[86.55,-46.33,36.94]},{name:"lightgrey",value:[84.56,0,-.01]},{name:"lightpink",value:[81.05,27.97,5.03]},{name:"lightsalmon",value:[74.7,31.48,34.54]},{name:"lightseagreen",value:[65.79,-37.51,-6.34]},{name:"lightskyblue",value:[79.73,-10.82,-28.51]},{name:"lightslategray",value:[55.92,-2.24,-11.11]},{name:"lightslategrey",value:[55.92,-2.24,-11.11]},{name:"lightsteelblue",value:[78.45,-1.28,-15.22]},{name:"lightyellow",value:[99.28,-5.1,14.83]},{name:"lime",value:[87.74,-86.18,83.18]},{name:"limegreen",value:[72.61,-67.13,61.44]},{name:"linen",value:[95.31,1.68,6.01]},{name:"magenta",value:[60.32,98.25,-60.84]},{name:"maroon",value:[25.53,48.06,38.06]},{name:"mediumaquamarine",value:[75.69,-38.33,8.3]},{name:"mediumblue",value:[24.98,67.18,-91.5]},{name:"mediumorchid",value:[53.64,59.07,-47.41]},{name:"mediumpurple",value:[54.98,36.81,-50.1]},{name:"mediumseagreen",value:[65.27,-48.22,24.29]},{name:"mediumslateblue",value:[52.16,41.08,-65.41]},{name:"mediumspringgreen",value:[87.34,-70.68,32.46]},{name:"mediumturquoise",value:[76.88,-37.35,-8.36]},{name:"mediumvioletred",value:[44.76,71.01,-15.18]},{name:"midnightblue",value:[15.86,31.72,-49.58]},{name:"mintcream",value:[99.16,-4.16,1.24]},{name:"mistyrose",value:[92.66,8.75,4.83]},{name:"moccasin",value:[91.72,2.44,26.35]},{name:"navajowhite",value:[90.1,4.51,28.26]},{name:"navy",value:[12.98,47.51,-64.7]},{name:"oldlace",value:[96.78,.18,8.16]},{name:"olive",value:[51.87,-12.93,56.68]},{name:"olivedrab",value:[54.65,-28.22,49.69]},{name:"orange",value:[74.93,23.94,78.96]},{name:"orangered",value:[57.57,67.8,68.97]},{name:"orchid",value:[62.8,55.29,-34.42]},{name:"palegoldenrod",value:[91.14,-7.35,30.96]},{name:"palegreen",value:[90.75,-48.3,38.52]},{name:"paleturquoise",value:[90.06,-19.63,-6.41]},{name:"palevioletred",value:[60.56,45.53,.39]},{name:"papayawhip",value:[95.08,1.27,14.52]},{name:"peachpuff",value:[89.35,8.09,21.01]},{name:"peru",value:[61.75,21.4,47.92]},{name:"pink",value:[83.58,24.15,3.32]},{name:"plum",value:[73.37,32.54,-22]},{name:"powderblue",value:[86.13,-14.09,-8.02]},{name:"purple",value:[29.78,58.94,-36.5]},{name:"red",value:[53.23,80.11,67.22]},{name:"rosybrown",value:[63.61,17.02,6.6]},{name:"royalblue",value:[47.83,26.27,-65.27]},{name:"saddlebrown",value:[37.47,26.45,40.99]},{name:"salmon",value:[67.26,45.23,29.09]},{name:"sandybrown",value:[73.95,23.03,46.79]},{name:"seagreen",value:[51.54,-39.71,20.05]},{name:"seashell",value:[97.12,2.17,4.54]},{name:"sienna",value:[43.8,29.33,35.64]},{name:"silver",value:[77.7,0,-.01]},{name:"skyblue",value:[79.21,-14.83,-21.28]},{name:"slateblue",value:[45.34,36.05,-57.78]},{name:"slategray",value:[52.84,-2.14,-10.58]},{name:"slategrey",value:[52.84,-2.14,-10.58]},{name:"snow",value:[98.64,1.66,.58]},{name:"springgreen",value:[88.47,-76.9,47.03]},{name:"steelblue",value:[52.47,-4.07,-32.2]},{name:"tan",value:[74.97,5.02,24.42]},{name:"teal",value:[48.26,-28.84,-8.48]},{name:"thistle",value:[80.08,13.22,-9.24]},{name:"tomato",value:[62.2,57.86,46.42]},{name:"turquoise",value:[81.27,-44.08,-4.03]},{name:"violet",value:[69.69,56.37,-36.82]},{name:"wheat",value:[89.35,1.51,24]},{name:"white",value:[100,.01,-.01]},{name:"whitesmoke",value:[96.54,.01,-.01]},{name:"yellow",value:[97.14,-21.56,94.48]},{name:"yellowgreen",value:[76.54,-37.99,66.59]}],d.getMeanMedian=(a,t)=>{const n=t.averagingMethod,l=a.length,r=new d,o=new d;if(0!==l){var s=["r","g","b","a"];for(let e=0;e<s.length;e++){var u=s[e],i=[];for(let e=0;e<a.length;e++)i.push(a[e][u]);var h=i.sort();if("squared"===n){let a=0;for(let e=0;e<i.length;e++)a+=d.squaredValues[i[e]];const t=a/l,n=Math.sqrt(t);r[u]=n}if("simple"===n){let a=0;for(let e=0;e<i.length;e++)a+=i[e];const t=a/l;r[u]=t}var m=Math.floor(h.length/2);o[u]=h[m]}}return[r,o]},d.getLightestDarkest=e=>{if(0===e.length)return[new d,new d];const a=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4),t=e.map(e=>{e=.2126*a(e.r/255)+.7152*a(e.g/255)+.0722*a(e.b/255);return e<=216/24389?24389/27*e:116*Math.pow(e,1/3)-16}),n=Math.max(...t),l=Math.min(...t),r=t.indexOf(n),o=t.indexOf(l);return[new d(e[r]),new d(e[o])]},d.blendColors=(a,t)=>{const n=t.a/255,l=1-n,e=["r","g","b"].map(e=>a[e]*l+t[e]*n);return new d(...e)},t.default=d},{"./Util":7,"rgb-lab":1}],3:[function(e,a,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class extends class{constructor(){return new Proxy(this,{get:(e,a)=>{var t=e.fieldHashmap[a.toString()];return t?t.value:e[a]}})}}{constructor(e,a){super(),this.onBeforeChange=(e,a)=>{var t,{fieldHashmap:n,fieldToBeforeChangeCallback:l,callback:r}=this,n=n[e];n&&(t=l[e],r&&n.removeEventListener("change",r),t&&n.removeEventListener("change",t),n.addEventListener("change",a),r&&n.addEventListener("change",r),l[e]=a)},this.triggerAllBeforeChangeCallbacks=()=>{const{fieldArray:e,fieldToBeforeChangeCallback:a}=this;e.forEach(e=>{e=a[e.name];e&&e()})},this.fieldArray=e,this.fieldHashmap={},this.fieldToBeforeChangeCallback={},e.forEach(e=>{this.fieldHashmap[e.name]=e}),a&&(this.onChange=a)}set onChange(a){const{fieldArray:e,callback:t}=this;e.forEach(e=>{t&&e.removeEventListener("change",t),e.addEventListener("change",a)}),this.callback=a}}},{}],4:[function(e,a,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const h=e("./Color"),m=e("./Util");t.default=class{constructor(e,a){this.handleReadUpload=()=>{const{uploader:e,image:a}=this,t=new FileReader;if(t.addEventListener("load",e=>{if(!e.target||!e.target.result)throw"Failed to read uploaded file.";a.src=e.target.result.toString()}),!e.files)throw"Asked to read image file but found no file was uploaded.";t.readAsDataURL(e.files[0])},this.handleUpdateImage=()=>{const{preview:e,context:a,image:t,opacity:n,backgroundColor:l}=this;let{width:r,height:o}=t;r=r||300,o=o||200;var s=a=>{var t=[];for(let e=0;e<a.length;e+=4){var n=a[e+0],l=a[e+1],r=a[e+2],o=a[e+3];t.push(new h.default(n,l,r,o))}return t},u=(e.width=r,e.height=o,a.clearRect(0,0,r,o),a.drawImage(t,0,0),a.getImageData(0,0,r,o)),i=u.data;if(null==n&&null==l)return this.colors=s(i),!0;if(null!=n){for(let e=0;e<i.length;e+=4){const a=i[e+3]*n,t=(0,m.clamp)(a,0,255);i[e+3]=t}if(a.putImageData(u,0,0),!l)return this.colors=s(i),!0}if(null!=l){const t=new OffscreenCanvas(r,o),n=t.getContext("2d");if(!n)throw"Failed to get 2D context of offscreen canvas.";n.fillStyle=l.toRgba(),n.fillRect(0,0,r,o),n.drawImage(e,0,0),a.drawImage(t,0,0),this.colors=s(a.getImageData(0,0,r,o).data)}},this.loadExampleImage=()=>{this.image.src="./example.png"},this.getColorsAt=(t,e,n,l)=>{var{preview:r,colors:o}=this,s=[];for(let a=e;a<e+l;a++)for(let e=t;e<t+n;e++){const t=a*r.width+e;t<0||t>o.length||s.push(o[t])}return s},this.setBackgroundColor=e=>{0===e.a?delete this.backgroundColor:this.backgroundColor=e,this.handleUpdateImage()},this.setOpacity=e=>{1===e?delete this.opacity:this.opacity=e,this.handleUpdateImage()};var t=new Image,a=(t.addEventListener("load",this.handleUpdateImage),a.addEventListener("change",this.handleReadUpload),this.preview=e,this.uploader=a,e.getContext("2d"));if(!a)throw"Failed to get 2D context from canvas element.";this.context=a,this.image=t,this.colors=[]}}},{"./Color":2,"./Util":7}],5:[function(e,a,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.setBackgroundColor=e=>{const a=this["resultElementArray"],t=e.toRgba();a.forEach(e=>{e.backgroundElement.style.backgroundColor=t})},this.setResult=(e,a,t)=>{var n=this["resultElementHashmap"],l=t.resultFormat,t=t.hideAlphaChannel;let r=!1,o=("always"===t?r=!1:"never"!==t&&255===a.a||(r=!0),"");if("rgb"===l&&(o=r?a.toRgba():a.toRgb()),"hex"===l&&(o=r?a.toHex8():a.toHex6()),"hsl"===l&&(o=r?a.toHsla():a.toHsl()),!(o="svg"===l?a.getClosedNamedColor():o))throw"Invalid resultFormat option: "+l.toString();n[e].textElement.value=o},this.resultElementArray=[],this.resultElementHashmap={},e.forEach(e=>{const a=e.querySelector("input[type=text]"),n=e.querySelector(".foreground"),t=e.querySelector(".background"),l=e.querySelector(".copy");l&&l.addEventListener("click",e=>{e.preventDefault(),navigator.clipboard.writeText(a.value)});var e=new Proxy(a,{set:(e,a,t)=>("value"===a&&(n.style.backgroundColor=t),e[a]=t,!0)}),r=a.name.split("ResultText")[0],e={textElement:e,foregroundElement:n,backgroundElement:t};this.resultElementHashmap[r]=e,this.resultElementArray.push(e)})}}},{}],6:[function(e,a,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=e("./Util");t.default=class{constructor(e,a,t){this.isInProgress=!1,this.startPosition={x:0,y:0},this.endPosition={x:0,y:0},this.handleTouch=e=>{var a,t,n,l,{targetTouches:r,changedTouches:o,type:s}=e;2===r.length&&(e.preventDefault(),{target:e,updateInfo:a,updateOutline:t,callback:n}=this,s="touchend"===s?o:r,o=e.getBoundingClientRect(),r=Math.round(s[0].clientX-o.left),e=Math.round(s[0].clientY-o.top),l=Math.round(s[1].clientX-o.left),s=Math.round(s[1].clientY-o.top),this.startPosition={x:r,y:e},this.endPosition={x:l,y:s},a(),t(),n)&&n()},this.handleSelect=e=>{var{type:e,button:a,clientX:t,clientY:n}=e,{target:l,isInProgress:r,updateInfo:o,updateOutline:s,callback:u}=this;null!==a&&0!==a||(a=l.getBoundingClientRect(),l=Math.round(t-a.left),t=Math.round(n-a.top),"mousedown"===e?(this.startPosition={x:l,y:t},this.isInProgress=!0):r&&("mousemove"!==e&&"mouseup"!==e&&"mouseleave"!==e||(this.endPosition={x:l,y:t},o(),s(),u&&u()),"mouseup"!==e&&"mouseleave"!==e||(this.isInProgress=!1)))},this.updateInfo=()=>{var{startPosition:e,endPosition:a,target:t}=this,n=Math.max(Math.min(e.y,a.y),0),l=Math.max(Math.min(e.x,a.x),0),r=Math.min(Math.max(e.y,a.y),t.height),e=Math.min(Math.max(e.x,a.x),t.width),a=Math.max(e-l,1),t=Math.max(r-n,1);this.info={top:n,left:l,bottom:r,right:e,width:a,height:t}},this.updateOutline=()=>{var e,a,t,{outline:n,info:l}=this;l&&({top:l,left:e,width:a,height:t}=l,n.style.cssText=`top:${l}px; left:${e}px; width:${a}px; height:${t}px;`)},this.clear=()=>{var e=this["outline"];e.style.cssText="",delete this.info},a.onmousedown=this.handleSelect,a.onmouseup=this.handleSelect,a.onmousemove=this.handleSelect,a.onmouseleave=this.handleSelect,a.ontouchstart=this.handleTouch,a.ontouchend=this.handleTouch,a.ontouchmove=this.handleTouch,this.outline=e,this.target=a,t&&(this.onSelectionEnd=t)}set onSelectionEnd(e){this.callback=(0,n.debounce)(e)}}},{"./Util":7}],7:[function(e,a,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.clamp=t.round=t.debounce=void 0;t.debounce=(a,t=150)=>{let n;return(...e)=>{clearTimeout(n),n=setTimeout(()=>a.apply(this,e),t)}},t.round=(e,a=0)=>+(Math.round(+(e+"e+"+a))+"e-"+a);t.clamp=(e,a,t)=>Math.max(Math.min(e,t),a)},{}],8:[function(e,a,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const g=e("./classes/Color"),p=e("./classes/Options"),f=e("./classes/Preview"),b=e("./classes/Selection"),y=e("./classes/Results");requestAnimationFrame(function(){const e=e=>Array.from(document.querySelectorAll(e)),a=e(".options")[0],t=e(".results")[0],n=(a.reset(),t.reset(),a.addEventListener("submit",e=>{e.preventDefault(),d()}),e(".options :is(input, select)")),l=e(".results .field"),r=e(".preview")[0],o=e("input[name=imageUpload]")[0],s=e(".selector")[0],u=new p.default(n),i=new f.default(r,o),h=new y.default(l),m=new b.default(s,r),d=()=>{var e,a,t,n;m.info&&({top:e,left:n,width:a,height:t}=m.info,n=i.getColorsAt(n,e,a,t),[e,a]=g.default.getMeanMedian(n,u),[t,n]=g.default.getLightestDarkest(n),h.setResult("mean",e,u),h.setResult("median",a,u),h.setResult("lightest",t,u),h.setResult("darkest",n,u))};o.addEventListener("change",m.clear);var v=e("#example-image-button")[0],c=e("button[type=reset]")[0],v=(v.addEventListener("click",()=>{m.clear(),i.loadExampleImage()}),c.addEventListener("click",()=>{a.reset(),u.triggerAllBeforeChangeCallbacks(),d()}),u.onBeforeChange("opacityPercentage",()=>{var e=u.opacityPercentage;i.setOpacity(e/100)}),()=>{var e=u.transparencyType;let a=null;if("straight"===e&&(a=new g.default(0,0,0,0)),!(a="premultiplied"===e?new g.default(u.backgroundColor):a))throw"Invalid transparency type option: "+e.toString();i.setBackgroundColor(a),h.setBackgroundColor(a),d()});u.onBeforeChange("backgroundColor",v),u.onBeforeChange("transparencyType",v),m.onSelectionEnd=d,u.onChange=d})},{"./classes/Color":2,"./classes/Options":3,"./classes/Preview":4,"./classes/Results":5,"./classes/Selection":6}]},{},[8]);
//# sourceMappingURL=bundle.js.map
