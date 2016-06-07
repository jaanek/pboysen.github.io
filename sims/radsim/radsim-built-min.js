!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function getData(){return{pressure:[1e3,990,980,970,960,950,940,930,920,910,900,890,880,870,860,850,840],altitude:[0,80.9705308,162.852307,245.694059,329.485335,414.246019,499.996631,586.758344,674.4897,763.115875,852.640464,942.952656,1034.00407,1125.84507,1218.44313,1311.81595,1405.99922],"sand-day":[285,284.2,283.4,282.5,281.7,280.9,280,279.2,278.3,277.4,276.5,275.5,274.8,274,273,272.2,271.3],"plowed-day":[283,282.2,281.4,280.5,279.7,278.9,278,277.2,277,276.8,276.5,275.5,274.8,274,273,272.2,271.3],"grass-day":[281,280.2,279.4,278.6,277.7,276.9,276.8,277.2,277,276.8,276.5,275.5,274.8,274,273,272.2,271.3],"snow-day":[273,273.2,273.4,273.7,274.6,275.9,276.8,277.2,277,276.8,276.5,275.5,274.8,274,273,272.2,271.3],"sand-night":[278.4,278.5,278.7,278.8,279.5,280.1,280,279.2,278.3,277.4,276.5,275.2,274.8,274,273,272.2,271.3],"plowed-night":[276.4,276.5,276.7,276.8,277.5,278.1,278,277.5,278.1,278,276.8,276.5,275.2,274.8,274,273,271.2,271.3],"grass-night":[274.4,274.5,274.7,274.9,275.5,276.1,276.8,277.2,277,276.8,276.5,275.2,274.8,274,273,272.2,271.3],"snow-night":[268,270,271.8,273.2,274.6,275.9,276.8,277.2,277,276.8,276.5,275.5,274.8,274,273,272.2,271.3]}}function toCentigrade(kelvin){return kelvin-273.15}var _get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_utils=require("../utils");createjs.MotionGuidePlugin.install(),createjs.Sound.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin,createjs.FlashAudioPlugin]),createjs.Ticker.framerate=10;var points=17,balloon_x=200,balloon_y=270,surface_times=["sand-day","plowed-day","grass-day","snow-day","sand-night","plowed-night","grass-night","snow-night"],Image=function(){function Image(prefix){_classCallCheck(this,Image),this.day=new createjs.Bitmap(prefix+".jpg"),this.day.x=-1e3,this.day.y=0,this.night=new createjs.Bitmap(prefix+"-night.jpg"),this.night.x=-1e3,this.night.y=0}return _createClass(Image,[{key:"show",value:function(time){"day"==time?this.day.x=0:this.night.x=0}},{key:"hide",value:function(){this.day.x=this.night.x=-1e3}}]),Image}(),Settings=function(){function Settings(){var _this=this;_classCallCheck(this,Settings),this.setValue(document.querySelector('input[name="choice"]:checked').value),this.listener=null;for(var radios=document.querySelectorAll('input[name="choice"]'),i=0;i<radios.length;i++)radios[i].addEventListener("change",function(e){_this.setValue(e.target.value),_this.listener&&_this.listener(_this.surface,_this.time)})}return _createClass(Settings,[{key:"setValue",value:function(value){this.value=value;var v=value.split("-");this.surface=v[0],this.time=v[1];for(var radios=document.querySelectorAll('input[name="choice"]'),i=0;i<radios.length;i++){var radio=radios[i];radio.value==value&&(radio.checked=!0)}}},{key:"getValue",value:function(){return this.value}},{key:"getSurface",value:function(){return this.surface}},{key:"getTime",value:function(){return this.time}},{key:"addListener",value:function(listener){this.listener=listener}}]),Settings}(),Buttons=function(){function Buttons(){_classCallCheck(this,Buttons),this.plot=document.getElementById("plot"),this.clearLast=document.getElementById("clearLast"),this.clearAll=document.getElementById("clearAll"),this.plot.disabled=!1,this.clearLast.disabled=!1,this.clearAll.disabled=!1}return _createClass(Buttons,[{key:"addListener",value:function(listener){this.plot.addEventListener("click",function(e){return listener(e)}),this.clearLast.addEventListener("click",function(e){return listener(e)}),this.clearAll.addEventListener("click",function(e){return listener(e)})}}]),Buttons}(),ATGraph=function(_Graph){function ATGraph(stage){return _classCallCheck(this,ATGraph),_possibleConstructorReturn(this,Object.getPrototypeOf(ATGraph).call(this,{stage:stage,w:300,h:300,xlabel:"Temperature(C)",ylabel:"Z(m)",xscale:"linear",yscale:"linear",minX:-8,maxX:12,minY:0,maxY:1500,majorX:2,minorX:1,majorY:100,minorY:50}))}return _inherits(ATGraph,_Graph),_createClass(ATGraph,[{key:"render",value:function(){_get(Object.getPrototypeOf(ATGraph.prototype),"render",this).call(this),this.color="#888",this.dotted=!1;for(var t=-8;14>t;t+=2){var x=this.xaxis.getLoc(t),y=this.yaxis.getLoc(0);this.drawLine(x,y,x,this.yaxis.getLoc(1500))}for(var z=0;1500>z;z+=100){var x=this.xaxis.getLoc(-8),y=this.yaxis.getLoc(z);this.drawLine(x,y,this.xaxis.getLoc(12),y)}}}]),ATGraph}(_utils.Graph),Rad=function(){function Rad(stage,settings,atgraph){var _this3=this;_classCallCheck(this,Rad),this.stage=stage,this.settings=settings,this.atgraph=atgraph,this.images=[new Image("assets/desert"),new Image("assets/plowed"),new Image("assets/grass"),new Image("assets/snow")],this.lastImage=this.images[0],this.surfaces=["sand","plowed","grass","snow"],this.colors={sand:"#8A4117",plowed:"#A52A2A",grass:"#667C26",snow:"#0000FF"},this.plotted={"sand-day":[],"sand-night":[],"plowed-day":[],"plowed-night":[],"grass-day":[],"grass-night":[],"snow-day":[],"snow-night":[]},this.clearProfiles(),this.profiles=[],this.balloon=new createjs.Bitmap("assets/balloon.png"),this.balloon.x=balloon_x,this.balloon.y=balloon_y,this.balloon.scaleX=.15,this.balloon.scaleY=.15,this.height=new createjs.Text("","12px Arial","#FFF"),this.data=getData(),this.sun=(new createjs.Shape).set({x:420,y:20}),this.sun.graphics.beginFill("#FFFF00").drawCircle(0,0,10),this.moon=(new createjs.Shape).set({x:420,y:20}),this.moon.graphics.beginFill("#FFFFFF").drawCircle(0,0,10),this.settings.addListener(function(s,t){return _this3.changeSetting(s,t)}),this.balloon.addEventListener("pressmove",function(e){e.nativeEvent.preventDefault(),e.stageY<balloon_y&&_this3.showBalloon(e.stageY)}),this.balloon.addEventListener("pressup",function(e){e.nativeEvent.preventDefault();var i=_this3.getAltIndex(),alt=_this3.data.altitude[i],y=_this3.atgraph.yaxis.getLoc(alt);_this3.showBalloon(y)}),this.changeSetting(this.settings.getSurface(),this.settings.getTime())}return _createClass(Rad,[{key:"render",value:function(){this.addChildren(),this.showBalloon(balloon_y)}},{key:"showBalloon",value:function(y){this.balloon.x=balloon_x,this.balloon.y=y,this.height.x=balloon_x+20,this.height.y=y+10,this.height.text=parseInt(this.atgraph.yaxis.getValue(y))}},{key:"addChildren",value:function(){var _this4=this;this.images.forEach(function(img){_this4.stage.addChild(img.day),_this4.stage.addChild(img.night)}),this.stage.addChild(this.balloon),this.stage.addChild(this.height),this.stage.addChild(this.sun),this.stage.addChild(this.moon)}},{key:"clearProfiles",value:function(){var _this5=this;surface_times.forEach(function(st){return _this5.clearProfile(st)}),this.profiles=[]}},{key:"clearProfile",value:function(st){this.plotted[st]=[];for(var i=0;points>i;i++)this.plotted[st].push(!1)}},{key:"hasPlots",value:function(st){for(var i=0;points>i;i++)if(this.plotted[st][i])return!0;return!1}},{key:"changeSetting",value:function(surface,time){this.lastImage.hide(),this.lastImage=this.images[this.surfaces.indexOf(surface)],this.lastImage.show(time),this.showTime(),this.atgraph.setColor(this.colors[surface]),this.atgraph.setDotted("night"==time),this.showBalloon(balloon_y),this.profiles.push(surface+"-"+time)}},{key:"showTime",value:function(){var path=[420,20,400,20,380,20];"day"==this.settings.getTime()?(this.moon.x=420,createjs.Tween.get(this.sun).to({guide:{path:path}},500).play()):(this.sun.x=420,createjs.Tween.get(this.moon).to({guide:{path:path}},500).play())}},{key:"getAltIndex",value:function(){for(var alt=1500*(balloon_y-this.balloon.y)/balloon_y,i=0;alt>this.data.altitude[i];)i++;return i}},{key:"plot",value:function(){this.plotted[this.settings.getValue()][this.getAltIndex()]=!0,this.plotProfiles()}},{key:"plotProfiles",value:function(){var _this6=this;this.atgraph.clear(),this.atgraph.render(),surface_times.forEach(function(st){var v=st.split("-");_this6.atgraph.setColor(_this6.colors[v[0]]),_this6.atgraph.setDotted("night"==v[1]);for(var alts=_this6.data.altitude,temps=_this6.data[st],i=0;points>i;i++)_this6.plotted[st][i]===!0&&_this6.atgraph.plot(toCentigrade(temps[i]),alts[i])})}},{key:"clear",value:function(){this.stage.removeAllChildren(),this.clearProfiles(),this.render()}},{key:"clearLast",value:function(){if(this.showBalloon(balloon_y),this.profiles.length){var st=this.profiles[this.profiles.length-1];this.hasPlots(st)||(this.profiles.pop(),st=this.profiles[this.profiles.length-1],this.settings.setValue(st),this.atgraph.setColor(this.settings.getSurface()),this.atgraph.setDotted("night"==this.settings.getTime())),this.clearProfile(st),this.plotProfiles()}}},{key:"clearAll",value:function(){this.showBalloon(balloon_y),this.clearProfiles(),this.plotProfiles()}}]),Rad}(),RadSim=function(){function RadSim(){var _this7=this;_classCallCheck(this,RadSim),this.mainstage=new createjs.Stage("maincanvas"),createjs.Touch.enable(this.mainstage),this.atstage=new createjs.Stage("atgraph"),this.buttons=new Buttons,this.settings=new Settings,this.atgraph=new ATGraph(this.atstage),this.rad=new Rad(this.mainstage,this.settings,this.atgraph),this.rad.render(),this.buttons.addListener(function(e){switch(e.target.id){case"plot":_this7.rad.plot();break;case"clearLast":_this7.rad.clearLast();break;case"clearAll":_this7.rad.clearAll()}})}return _createClass(RadSim,[{key:"render",value:function(){var _this8=this;this.atgraph.render(),this.rad.render(),createjs.Ticker.timingMode=createjs.Ticker.RAF_SYNCHED,createjs.Ticker.addEventListener("tick",function(e){_this8.atstage.update(),_this8.mainstage.update()})}}]),RadSim}();(new RadSim).render()},{"../utils":4}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var marginX=40,marginY=30,endMargin=5;exports.Axis=function(){function Axis(spec){_classCallCheck(this,Axis),this.stage=spec.stage,this.w=spec.dim.w||100,this.h=spec.dim.h||100,this.min=spec.dim.min||0,this.max=spec.dim.max||100,this.font=spec.font||"12px Arial",this.color=spec.color||"#000",this.label=spec.label||"label",this.major=spec.major||10,this.minor=spec.minor||5,this.precision=spec.precision||0,this.vertical=spec.orient&&"vertical"==spec.orient||!1,this.linear=spec.scale&&"linear"==spec.scale||!1,this.originX=marginX,this.originY=this.h-marginY,this.scale=this.vertical?(this.originY-endMargin)/(this.max-this.min):(this.w-this.originX-endMargin)/(this.max-this.min)}return _createClass(Axis,[{key:"drawLine",value:function(x1,y1,x2,y2){var line=new createjs.Shape;line.graphics.setStrokeStyle(1),line.graphics.beginStroke(this.color),line.graphics.moveTo(x1,y1),line.graphics.lineTo(x2,y2),line.graphics.endStroke(),this.stage.addChild(line)}},{key:"drawText",value:function(text,x,y){return text.x=x,text.y=y,this.vertical&&text.text==this.label&&(text.rotation=270),this.stage.addChild(text),text}},{key:"getText",value:function(s){return new createjs.Text(s,this.font,this.color)}},{key:"render",value:function(){var label=this.getText(this.label),label_bnds=label.getBounds();if(this.vertical){this.drawLine(this.originX,this.originY,this.originX,endMargin);var y=this.originY-(this.originY-label_bnds.width)/2;this.drawText(label,4,y);for(var val=this.min;val<=this.max;val+=this.major){var v=this.getLoc(val);this.drawLine(this.originX-4,v,this.originX+4,v);var text=this.getText(val.toFixed(this.precision)),bnds=text.getBounds();this.drawText(text,this.originX-5-bnds.width,v+bnds.height/2-10)}for(var val=this.min;val<=this.max;val+=this.minor){var v=this.getLoc(val);this.drawLine(this.originX-2,v,this.originX+2,v)}}else{this.drawLine(this.originX,this.originY,this.w-endMargin,this.originY);var x=(this.w-endMargin-label_bnds.width)/2;this.drawText(label,this.originX+x,this.originY+15);for(var val=this.min;val<=this.max;val+=this.major){var v=this.getLoc(val);this.drawLine(v,this.originY-4,v,this.originY+4);var text=this.getText(val.toFixed(this.precision)),bnds=text.getBounds();this.drawText(text,v-bnds.width/2,this.originY+4)}for(var val=this.min;val<=this.max;val+=this.minor){var v=this.getLoc(val);this.drawLine(v,this.originY-2,v,this.originY+2)}}}},{key:"getLoc",value:function(val){var ival=this.linear?Math.round(this.scale*(val-this.min)):Math.round(Math.log(this.scale*(val-this.min)));return this.vertical?this.originY-ival:this.originX+ival}},{key:"getValue",value:function(v){var factor=this.vertical?(this.originY-v)/this.originY:(v-this.originX)/(this.w-this.originX);return this.min+(this.max-this.min)*factor}},{key:"isInside",value:function(v){return this.vertical?v>=this.originY&&v<=this.originY+this.h:v>=this.originX&&v<=this.originY+this.w}}]),Axis}()},{}],3:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.Graph=void 0;var _axis=require("./axis");exports.Graph=function(){function Graph(spec){_classCallCheck(this,Graph),this.stage=spec.stage,this.xaxis=new _axis.Axis({stage:this.stage,label:spec.xlabel,dim:{w:spec.w,h:spec.h,min:spec.minX,max:spec.maxX},orient:"horizontal",scale:spec.xscale,major:spec.majorX,minor:spec.minorX,precision:spec.precisionX}),this.yaxis=new _axis.Axis({stage:this.stage,label:spec.ylabel,dim:{w:spec.w,h:spec.h,min:spec.minY,max:spec.maxY},orient:"vertical",scale:spec.yscale,major:spec.majorY,minor:spec.minorY,precision:spec.precisionY}),this.last=null,this.marker=null,this.color="#000000",this.dotted=!1}return _createClass(Graph,[{key:"setDotted",value:function(dotted){this.dotted=dotted}},{key:"setColor",value:function(color){this.color=color,this.endPlot(),this.marker=new createjs.Shape,this.marker.graphics.beginStroke(color).beginFill(color).drawRect(0,0,4,4),this.marker.x=-10,this.stage.addChild(this.marker)}},{key:"render",value:function(){this.xaxis.render(),this.yaxis.render()}},{key:"clear",value:function(){this.stage.removeAllChildren(),this.endPlot()}},{key:"moveMarker",value:function(x,y){this.marker&&(this.marker.x=x-2,this.marker.y=y-2)}},{key:"drawLine",value:function(x1,y1,x2,y2){var line=new createjs.Shape;this.dotted===!0?line.graphics.setStrokeDash([1,4]).setStrokeStyle(1).beginStroke(this.color).moveTo(x1,y1).lineTo(x2,y2).endStroke():line.graphics.setStrokeStyle(1).beginStroke(this.color).moveTo(x1,y1).lineTo(x2,y2).endStroke(),this.stage.addChild(line)}},{key:"plot",value:function(xv,yv){if(xv>=this.xaxis.min&&xv<=this.xaxis.max&&yv>=this.yaxis.min&&yv<=this.yaxis.max){var x=this.xaxis.getLoc(xv),y=this.yaxis.getLoc(yv);this.last&&(this.moveMarker(this.last.x,this.last.y),this.drawLine(this.last.x,this.last.y,x,y)),this.last=new createjs.Point(x,y),this.moveMarker(x,y)}}},{key:"endPlot",value:function(){this.last=null}}]),Graph}()},{"./axis":2}],4:[function(require,module,exports){"use strict";function getParams(){var params={};return location.search&&location.search.slice(1).split("&").forEach(function(part){var pair=part.split("=");pair[0]=decodeURIComponent(pair[0]),pair[1]=decodeURIComponent(pair[1]),params[pair[0]]="undefined"!==pair[1]?pair[1]:!0}),params}function getStore(){return store.enabled?store:void alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')}Object.defineProperty(exports,"__esModule",{value:!0});var _graph=require("./graph");Object.defineProperty(exports,"Graph",{enumerable:!0,get:function(){return _graph.Graph}}),exports.getParams=getParams,exports.getStore=getStore;var store=(require("./json2"),require("./store"))},{"./graph":3,"./json2":5,"./store":6}],5:[function(require,module,exports){"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj};"object"!==("undefined"==typeof JSON?"undefined":_typeof(JSON))&&(JSON={}),function(){function f(n){return 10>n?"0"+n:n}function this_value(){return this.valueOf()}function quote(string){return rx_escapable.lastIndex=0,rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return"string"==typeof c?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,partial,mind=gap,value=holder[key];switch(value&&"object"===("undefined"==typeof value?"undefined":_typeof(value))&&"function"==typeof value.toJSON&&(value=value.toJSON(key)),"function"==typeof rep&&(value=rep.call(holder,key,value)),"undefined"==typeof value?"undefined":_typeof(value)){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value)return"null";if(gap+=indent,partial=[],"[object Array]"===Object.prototype.toString.apply(value)){for(length=value.length,i=0;length>i;i+=1)partial[i]=str(i,value)||"null";return v=0===partial.length?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]",gap=mind,v}if(rep&&"object"===("undefined"==typeof rep?"undefined":_typeof(rep)))for(length=rep.length,i=0;length>i;i+=1)"string"==typeof rep[i]&&(k=rep[i],v=str(k,value),v&&partial.push(quote(k)+(gap?": ":":")+v));else for(k in value)Object.prototype.hasOwnProperty.call(value,k)&&(v=str(k,value),v&&partial.push(quote(k)+(gap?": ":":")+v));return v=0===partial.length?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}",gap=mind,v}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(value,replacer,space){var i;if(gap="",indent="","number"==typeof space)for(i=0;space>i;i+=1)indent+=" ";else"string"==typeof space&&(indent=space);if(rep=replacer,replacer&&"function"!=typeof replacer&&("object"!==("undefined"==typeof replacer?"undefined":_typeof(replacer))||"number"!=typeof replacer.length))throw new Error("JSON.stringify");return str("",{"":value})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(holder,key){var k,v,value=holder[key];if(value&&"object"===("undefined"==typeof value?"undefined":_typeof(value)))for(k in value)Object.prototype.hasOwnProperty.call(value,k)&&(v=walk(value,k),void 0!==v?value[k]=v:delete value[k]);return reviver.call(holder,key,value)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()},{}],6:[function(require,module,exports){(function(global){"use strict";module.exports=function(){function isLocalStorageNameSupported(){try{return localStorageName in win&&win[localStorageName]}catch(err){return!1}}var storage,store={},win="undefined"!=typeof window?window:global,doc=win.document,localStorageName="localStorage",scriptTag="script";if(store.disabled=!1,store.version="1.3.20",store.set=function(key,value){},store.get=function(key,defaultVal){},store.has=function(key){return void 0!==store.get(key)},store.remove=function(key){},store.clear=function(){},store.transact=function(key,defaultVal,transactionFn){null==transactionFn&&(transactionFn=defaultVal,defaultVal=null),null==defaultVal&&(defaultVal={});var val=store.get(key,defaultVal);transactionFn(val),store.set(key,val)},store.getAll=function(){var ret={};return store.forEach(function(key,val){ret[key]=val}),ret},store.forEach=function(){},store.serialize=function(value){return JSON.stringify(value)},store.deserialize=function(value){if("string"==typeof value)try{return JSON.parse(value)}catch(e){return value||void 0}},isLocalStorageNameSupported())storage=win[localStorageName],store.set=function(key,val){return void 0===val?store.remove(key):(storage.setItem(key,store.serialize(val)),val)},store.get=function(key,defaultVal){var val=store.deserialize(storage.getItem(key));return void 0===val?defaultVal:val},store.remove=function(key){storage.removeItem(key)},store.clear=function(){storage.clear()},store.forEach=function(callback){for(var i=0;i<storage.length;i++){var key=storage.key(i);callback(key,store.get(key))}};else if(doc&&doc.documentElement.addBehavior){var storageOwner,storageContainer;try{storageContainer=new ActiveXObject("htmlfile"),storageContainer.open(),storageContainer.write("<"+scriptTag+">document.w=window</"+scriptTag+'><iframe src="/favicon.ico"></iframe>'),storageContainer.close(),storageOwner=storageContainer.w.frames[0].document,storage=storageOwner.createElement("div")}catch(e){storage=doc.createElement("div"),storageOwner=doc.body}var withIEStorage=function(storeFunction){return function(){var args=Array.prototype.slice.call(arguments,0);args.unshift(storage),storageOwner.appendChild(storage),storage.addBehavior("#default#userData"),storage.load(localStorageName);var result=storeFunction.apply(store,args);return storageOwner.removeChild(storage),result}},forbiddenCharsRegex=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),ieKeyFix=function(key){return key.replace(/^d/,"___$&").replace(forbiddenCharsRegex,"___")};store.set=withIEStorage(function(storage,key,val){return key=ieKeyFix(key),void 0===val?store.remove(key):(storage.setAttribute(key,store.serialize(val)),storage.save(localStorageName),val)}),store.get=withIEStorage(function(storage,key,defaultVal){key=ieKeyFix(key);var val=store.deserialize(storage.getAttribute(key));return void 0===val?defaultVal:val}),store.remove=withIEStorage(function(storage,key){key=ieKeyFix(key),storage.removeAttribute(key),storage.save(localStorageName)}),store.clear=withIEStorage(function(storage){var attributes=storage.XMLDocument.documentElement.attributes;storage.load(localStorageName);for(var i=attributes.length-1;i>=0;i--)storage.removeAttribute(attributes[i].name);storage.save(localStorageName)}),store.forEach=withIEStorage(function(storage,callback){for(var attr,attributes=storage.XMLDocument.documentElement.attributes,i=0;attr=attributes[i];++i)callback(attr.name,store.deserialize(storage.getAttribute(attr.name)))})}try{var testKey="__storejs__";store.set(testKey,testKey),store.get(testKey)!=testKey&&(store.disabled=!0),store.remove(testKey)}catch(e){store.disabled=!0}return store.enabled=!store.disabled,store}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);