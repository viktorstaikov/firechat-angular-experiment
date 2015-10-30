var app = angular.module("app", ["ui.router"]);
var chatRef = null;
var chat = null;
var tokenGenerator = null;

var host = {"Username":"viktor.st.staykov@Gmail.com","Email":"viktor.st.staykov@Gmail.com","DisplayName":"Viktor Staykov","IsVerified":false,"VerificationCode":"vZbRPGWb7SJ8GfGJgt3MXWw4DNgsBUaR","IdentityProvider":"Everlive","Role":"02ec5fb0-3e87-11e4-82ae-49129d3ae089","CreatedAt":"2015-09-16T07:09:49.454Z","ModifiedAt":"2015-10-01T19:39:35.151Z","CreatedBy":"00000000-0000-0000-0000-000000000000","ModifiedBy":"00000000-0000-0000-0000-000000000000","Owner":"eb4622e0-5c41-11e5-8f89-7bb00374429c","MaxLicensePlates":0,"Id":"eb4622e0-5c41-11e5-8f89-7bb00374429c"};
var guest = {"CreatedAt":"2015-02-03T22:15:07.670Z","CreatedBy":"00000000-0000-0000-0000-000000000000","DisplayName":"Христо Борисов","Email":"raxevsky@gmail.com","IdentityProvider":"Facebook","IsVerified":true,"ModifiedAt":"2015-10-05T20:41:10.146Z","ModifiedBy":"00000000-0000-0000-0000-000000000000","Owner":"1c826360-abf2-11e4-89a7-6dc231169f0f","Role":"02ec5fb0-3e87-11e4-82ae-49129d3ae089","Username":"raxevsky","MaxLicensePlates":null,"Id":"1c826360-abf2-11e4-89a7-6dc231169f0f"};
var user = null;

app.run(function(){
    chatRef = new Firebase('https://popping-heat-5403.firebaseio.com/chat');
    
    tokenGenerator = new FirebaseTokenGenerator("Kh19OHrj49Fk8hkvMNpva6SlFuFSIgqHZyr4YH8j");
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .state('rooms', {
            url: "/rooms/:user",
            templateUrl: 'views/rooms.html',
            controller: 'RoomsController'
        })
        .state('messages', {
            url: "/messages/:roomId",
            templateUrl: 'views/messages.html',
            controller: 'MessagesConroller'
        })
        .state('start-conversation', {
            url: "/start-conversation",
            templateUrl: 'views/startConversation.html',
            controller: 'ChatController'
        });
    
    $urlRouterProvider.otherwise("/home");

    //$locationProvider.html5Mode(true); // fix url to not contain '#'
});






//
//
//// Create a new Firebase reference, and a new instance of the Login client
//var room = "";
//
//
//
//chatRef.onAuth(function (authData) {
//    // Once authenticated, instantiate Firechat with our user id and user name
//    if (authData) {
//        initChat(authData);
//    }
//});
//
//function initChat(authData) {
//    chat = new FirechatUI(chatRef, document.getElementById('firechat-wrapper'));
//    chat.setUser(authData.uid, authData.auth.data.DisplayName);
//    chat._chat.createRoom(authData.auth.data.Email, "public", function(roomId){
//        room = roomId;
//        Firechat.prototype.enterRoom(roomId);    
//    });
//}
//
//function inviteUser2(){
//    chat._chat.inviteUser(user2, room);
//}
//
//
//
//
//
//
















(function() {var g=!0,i=null,m=!1,n=n||{},o=this;function p(a,c,b){a=a.split(".");b=b||o;!(a[0]in b)&&b.execScript&&b.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&void 0!==c?b[d]=c:b=b[d]?b[d]:b[d]={}}p("goog.LOCALE","en");p("goog.TRUSTED_SITE",g);p("goog.ENABLE_DEBUG_LOADER",g);
function r(a){var c=typeof a;if("object"==c)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return c;var b=Object.prototype.toString.call(a);if("[object Window]"==b)return"object";if("[object Array]"==b||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==b||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof a.call)return"object";return c}Math.random();var s={};p("goog.json.USE_NATIVE_JSON",m);var ba={}.$?o.JSON.stringify:function(a,c){var b=[];u(new aa(c),a,b);return b.join("")};function aa(a){this.i=a}
function u(a,c,b){switch(typeof c){case "string":v(c,b);break;case "number":b.push(isFinite(c)&&!isNaN(c)?c:"null");break;case "boolean":b.push(c);break;case "undefined":b.push("null");break;case "object":if(c==i){b.push("null");break}if("array"==r(c)){var d=c.length;b.push("[");for(var e="",f=0;f<d;f++)b.push(e),e=c[f],u(a,a.i?a.i.call(c,String(f),e):e,b),e=",";b.push("]");break}b.push("{");d="";for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&(e=c[f],"function"!=typeof e&&(b.push(d),v(f,b),
b.push(":"),u(a,a.i?a.i.call(c,f,e):e,b),d=","));b.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof c);}}var x={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},ca=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function v(a,c){c.push('"',a.replace(ca,function(a){if(a in x)return x[a];var c=a.charCodeAt(0),e="\\u";16>c?e+="000":256>c?e+="00":4096>c&&(e+="0");return x[a]=e+c.toString(16)}),'"')};function da(a){return"undefined"!==typeof JSON&&void 0!==JSON.stringify?JSON.stringify(a):ba(a)};var y=Math,z={},A=z.p={};function ea(){}
var B=A.z={extend:function(a){ea.prototype=this;var c=new ea;a&&c.U(a);c.q=this;return c},create:function(){var a=this.extend();a.h.apply(a,arguments);return a},h:function(){},U:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},c:function(){return this.q.extend(this)}},C=A.G=B.extend({h:function(a,c){a=this.b=a||[];this.a=void 0!=c?c:4*a.length},toString:function(a){return(a||fa).stringify(this)},concat:function(a){var c=this.b,
b=a.b,d=this.a,a=a.a;this.P();if(d%4)for(var e=0;e<a;e++)c[d+e>>>2]|=(b[e>>>2]>>>24-8*(e%4)&255)<<24-8*((d+e)%4);else if(65535<b.length)for(e=0;e<a;e+=4)c[d+e>>>2]=b[e>>>2];else c.push.apply(c,b);this.a+=a;return this},P:function(){var a=this.b,c=this.a;a[c>>>2]&=4294967295<<32-8*(c%4);a.length=y.ceil(c/4)},c:function(){var a=B.c.call(this);a.b=this.b.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*y.random()|0);return C.create(c,a)}}),D=z.S={},fa=D.X={stringify:function(a){for(var c=
a.b,a=a.a,b=[],d=0;d<a;d++){var e=c[d>>>2]>>>24-8*(d%4)&255;b.push((e>>>4).toString(16));b.push((e&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return C.create(b,c/2)}},ga=D.Y={stringify:function(a){for(var c=a.b,a=a.a,b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%
4);return C.create(b,c)}},ha=D.F={stringify:function(a){try{return decodeURIComponent(escape(ga.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return ga.parse(unescape(encodeURIComponent(a)))}},E=A.W=B.extend({reset:function(){this.f=C.create();this.k=0},l:function(a){"string"==typeof a&&(a=ha.parse(a));this.f.concat(a);this.k+=a.a},m:function(a){var c=this.f,b=c.b,d=c.a,e=this.o,f=d/(4*e),f=a?y.ceil(f):y.max((f|0)-this.N,0),a=f*e,d=y.min(4*a,d);if(a){for(var h=0;h<
a;h+=e)this.K(b,h);h=b.splice(0,a);c.a-=d}return C.create(h,d)},c:function(){var a=B.c.call(this);a.f=this.f.c();return a},N:0});A.B=E.extend({h:function(){this.reset()},reset:function(){E.reset.call(this);this.L()},update:function(a){this.l(a);this.m();return this},e:function(a){a&&this.l(a);this.J();return this.g},c:function(){var a=E.c.call(this);a.g=this.g.c();return a},o:16,H:function(a){return function(c,b){return a.create(b).e(c)}},I:function(a){return function(c,b){return ia.A.create(a,b).e(c)}}});
for(var ia=z.n={},F=Math,G=z.p,ja=G.G,G=G.B,H=z.n,ka=[],la=[],I=2,J=0;64>J;){var K;a:{for(var ma=I,na=F.sqrt(ma),L=2;L<=na;L++)if(!(ma%L)){K=m;break a}K=g}K&&(8>J&&(ka[J]=4294967296*(F.pow(I,0.5)-(F.pow(I,0.5)|0))|0),la[J]=4294967296*(F.pow(I,1/3)-(F.pow(I,1/3)|0))|0,J++);I++}
var M=[],H=H.D=G.extend({L:function(){this.g=ja.create(ka.slice(0))},K:function(a,c){for(var b=this.g.b,d=b[0],e=b[1],f=b[2],h=b[3],j=b[4],k=b[5],w=b[6],T=b[7],l=0;64>l;l++){if(16>l)M[l]=a[c+l]|0;else{var q=M[l-15],t=M[l-2];M[l]=((q<<25|q>>>7)^(q<<14|q>>>18)^q>>>3)+M[l-7]+((t<<15|t>>>17)^(t<<13|t>>>19)^t>>>10)+M[l-16]}q=T+((j<<26|j>>>6)^(j<<21|j>>>11)^(j<<7|j>>>25))+(j&k^~j&w)+la[l]+M[l];t=((d<<30|d>>>2)^(d<<19|d>>>13)^(d<<10|d>>>22))+(d&e^d&f^e&f);T=w;w=k;k=j;j=h+q|0;h=f;f=e;e=d;d=q+t|0}b[0]=b[0]+
d|0;b[1]=b[1]+e|0;b[2]=b[2]+f|0;b[3]=b[3]+h|0;b[4]=b[4]+j|0;b[5]=b[5]+k|0;b[6]=b[6]+w|0;b[7]=b[7]+T|0},J:function(){var a=this.f,c=a.b,b=8*this.k,d=8*a.a;c[d>>>5]|=128<<24-d%32;c[(d+64>>>9<<4)+15]=b;a.a=4*c.length;this.m()}});z.D=G.H(H);z.C=G.I(H);var oa=z.S.F;
z.n.A=z.p.z.extend({h:function(a,c){a=this.j=a.create();"string"==typeof c&&(c=oa.parse(c));var b=a.o,d=4*b;c.a>d&&(c=a.e(c));for(var e=this.O=c.c(),f=this.M=c.c(),h=e.b,j=f.b,k=0;k<b;k++)h[k]^=1549556828,j[k]^=909522486;e.a=f.a=d;this.reset()},reset:function(){var a=this.j;a.reset();a.update(this.M)},update:function(a){this.j.update(a);return this},e:function(a){var c=this.j,a=c.e(a);c.reset();return c.e(this.O.c().concat(a))}});function pa(a,c,b){var d;1>b?d="at least 1":b>c&&(d=0===c?"none":"no more than "+c);if(d)throw Error(a+" failed: Was called with "+b+(1===b?" argument.":" arguments.")+" Expects "+d+".");}function N(a,c,b){var d="";switch(c){case 1:d=b?"first":"First";break;case 2:d=b?"second":"Second";break;case 3:d=b?"third":"Third";break;case 4:d=b?"fourth":"Fourth";break;default:s.Q.V.aa.assert(m,"errorPrefix_ called with argumentNumber > 4.  Need to update it?")}return a+" failed: "+(d+" argument ")}
function O(a,c,b,d){if(typeof c!==b||"number"===b&&isNaN(c))throw Error('FirebaseTokenGenerator.createToken option "'+a+'" must be '+d+", instead got "+c);};Math.random();p("goog.asserts.ENABLE_ASSERTS",g);p("goog.NATIVE_ARRAY_PROTOTYPES",n.Z);p("goog.array.ASSUME_NATIVE_FUNCTIONS",m);var P={},Q,R,S,U;p("goog.userAgent.ASSUME_IE",m);p("goog.userAgent.ASSUME_GECKO",m);p("goog.userAgent.ASSUME_WEBKIT",m);p("goog.userAgent.ASSUME_MOBILE_WEBKIT",m);p("goog.userAgent.ASSUME_OPERA",m);p("goog.userAgent.ASSUME_ANY_VERSION",m);var V=P.s||P.r||P.t||P.w||P.u;function qa(){return o.navigator?o.navigator.userAgent:i}
if(!V){U=S=R=Q=m;var W;if(!V&&(W=qa())){var ra=o.navigator;Q=0==W.lastIndexOf("Opera",0);R=!Q&&(-1!=W.indexOf("MSIE")||-1!=W.indexOf("Trident"));S=!Q&&-1!=W.indexOf("WebKit");U=!Q&&!S&&!R&&"Gecko"==ra.product}}var sa=V?P.u:Q,ta=V?P.s:R,ua=V?P.r:U,va=V?P.w||P.t:S;p("goog.userAgent.ASSUME_MAC",m);p("goog.userAgent.ASSUME_WINDOWS",m);p("goog.userAgent.ASSUME_LINUX",m);p("goog.userAgent.ASSUME_X11",m);p("goog.userAgent.ASSUME_ANDROID",m);p("goog.userAgent.ASSUME_IPHONE",m);
p("goog.userAgent.ASSUME_IPAD",m);var X;if(sa&&o.opera){var wa=o.opera.version;"function"==typeof wa&&wa()}else ua?X=/rv\:([^\);]+)(\)|;)/:ta?X=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:va&&(X=/WebKit\/(\S+)/),X&&X.exec(qa());var Y=i,Z=i;
function xa(a){var c=r(a);if(!("array"==c||"object"==c&&"number"==typeof a.length))throw Error("encodeByteArray takes an array as a parameter");if(!Y){Y={};Z={};for(c=0;65>c;c++)Y[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c),Z[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(c)}for(var c=Z,b=[],d=0;d<a.length;d+=3){var e=a[d],f=d+1<a.length,h=f?a[d+1]:0,j=d+2<a.length,k=j?a[d+2]:0,w=e>>2,e=(e&3)<<4|h>>4,h=(h&15)<<2|k>>6,k=k&63;j||(k=
64,f||(h=64));b.push(c[w],c[e],c[h],c[k])}return b.join("")};function $(a){pa("new FirebaseTokenGenerator",1,arguments.length);if("string"!=typeof a)throw Error(N("new FirebaseTokenGenerator",1,m)+"must be a valid firebase namespace secret.");this.T=a}p("FirebaseTokenGenerator",$,void 0);
$.prototype.R=function(a,c){pa("FirebaseTokenGenerator.createToken",2,arguments.length);if(void 0!==c&&(c===i||"object"!==typeof c))throw Error(N("FirebaseTokenGenerator.createToken",2,g)+"must be a dictionary of token options.");var c=c||{},b=c.admin===g,d="object"===typeof a;if(a===i||!d){if(!d&&!b)throw Error(N("FirebaseTokenGenerator.createToken",1,m)+"must be a dictionary of token data.");}else if(a.uid===i||"string"!==typeof a.uid){if(!b||"undefined"!==typeof a.uid)throw Error(N("FirebaseTokenGenerator.createToken",
1,m)+'must contain a "uid" key that must be a string.');}else if(256<a.uid.length)throw Error(N("FirebaseTokenGenerator.createToken",1,m)+'must contain a "uid" key that must not be longer than 256 bytes.');if(b=ya(a))if(!(b=ya(c))){var e;a:{b=["admin","debug","simulate"];for(e in b)if(Object.prototype.hasOwnProperty.call(c,b[e])){e=g;break a}e=m}b=!e}if(b)throw Error("FirebaseTokenGenerator.createToken: data is empty and no options are set.  This token will have no effect on Firebase.");b=c;e={};
for(var f in b)switch(f){case "expires":case "notBefore":d="notBefore"===f?"nbf":"exp";b[f]instanceof Date?e[d]=Math.round(b[f].getTime()/1E3):(O(f,b[f],"number","a number"),e[d]=b[f]);break;case "admin":O(f,b[f],"boolean","a boolean");e.admin=b[f];break;case "debug":O(f,b[f],"boolean","a boolean");e.debug=b[f];break;case "simulate":O(f,b[f],"boolean","a boolean");e.simulate=b[f];break;case "iat":O(f,b[f],"number","a number");e.iat=b[f];break;default:throw Error('FirebaseTokenGenerator.createToken: unrecognized "'+
f+'" option');}e.v=0;e.d=a;e.iat||(e.iat=Math.floor((new Date).getTime()/1E3));f=za(da({typ:"JWT",alg:"HS256"}));e=za(da(e));for(var b=z.C(f+"."+e,this.T).toString(),d=[],h=0;h<b.length;h+=2)d.push(parseInt(b.substr(h,2),16));b=xa(d);b=Aa(b);f=f+"."+e+"."+b;if(1024<f.length)throw Error("Generated token must be less than 1024 bytes long");return f};$.prototype.createToken=$.prototype.R;
function za(a){for(var c=[],b=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,s.Q.V.assert(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?c[b++]=e:(2048>e?c[b++]=e>>6|192:(65536>e?c[b++]=e>>12|224:(c[b++]=e>>18|240,c[b++]=e>>12&63|128),c[b++]=e>>6&63|128),c[b++]=e&63|128)}a=xa(c);return Aa(a)}function Aa(a){var c=a.indexOf(".");return 0<=c?a.substring(0,c):a}
function ya(a){if("object"!==typeof a)return m;if(a===i)return g;for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c))return m;return g};})();