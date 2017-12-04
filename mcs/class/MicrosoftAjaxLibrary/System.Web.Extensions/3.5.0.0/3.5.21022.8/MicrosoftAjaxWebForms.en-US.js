﻿//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjaxWebForms.js
Type.registerNamespace("Sys.WebForms");Sys.WebForms.BeginRequestEventArgs=function(b,a){Sys.WebForms.BeginRequestEventArgs.initializeBase(this);this._request=b;this._postBackElement=a};Sys.WebForms.BeginRequestEventArgs.prototype={get_postBackElement:function(){return this._postBackElement},get_request:function(){return this._request}};Sys.WebForms.BeginRequestEventArgs.registerClass("Sys.WebForms.BeginRequestEventArgs",Sys.EventArgs);Sys.WebForms.EndRequestEventArgs=function(c,a,b){Sys.WebForms.EndRequestEventArgs.initializeBase(this);this._errorHandled=false;this._error=c;this._dataItems=a||{};this._response=b};Sys.WebForms.EndRequestEventArgs.prototype={get_dataItems:function(){return this._dataItems},get_error:function(){return this._error},get_errorHandled:function(){return this._errorHandled},set_errorHandled:function(a){this._errorHandled=a},get_response:function(){return this._response}};Sys.WebForms.EndRequestEventArgs.registerClass("Sys.WebForms.EndRequestEventArgs",Sys.EventArgs);Sys.WebForms.InitializeRequestEventArgs=function(b,a){Sys.WebForms.InitializeRequestEventArgs.initializeBase(this);this._request=b;this._postBackElement=a};Sys.WebForms.InitializeRequestEventArgs.prototype={get_postBackElement:function(){return this._postBackElement},get_request:function(){return this._request}};Sys.WebForms.InitializeRequestEventArgs.registerClass("Sys.WebForms.InitializeRequestEventArgs",Sys.CancelEventArgs);Sys.WebForms.PageLoadedEventArgs=function(b,a,c){Sys.WebForms.PageLoadedEventArgs.initializeBase(this);this._panelsUpdated=b;this._panelsCreated=a;this._dataItems=c||{}};Sys.WebForms.PageLoadedEventArgs.prototype={get_dataItems:function(){return this._dataItems},get_panelsCreated:function(){return this._panelsCreated},get_panelsUpdated:function(){return this._panelsUpdated}};Sys.WebForms.PageLoadedEventArgs.registerClass("Sys.WebForms.PageLoadedEventArgs",Sys.EventArgs);Sys.WebForms.PageLoadingEventArgs=function(b,a,c){Sys.WebForms.PageLoadingEventArgs.initializeBase(this);this._panelsUpdating=b;this._panelsDeleting=a;this._dataItems=c||{}};Sys.WebForms.PageLoadingEventArgs.prototype={get_dataItems:function(){return this._dataItems},get_panelsDeleting:function(){return this._panelsDeleting},get_panelsUpdating:function(){return this._panelsUpdating}};Sys.WebForms.PageLoadingEventArgs.registerClass("Sys.WebForms.PageLoadingEventArgs",Sys.EventArgs);Sys.WebForms.PageRequestManager=function(){this._form=null;this._activeDefaultButton=null;this._activeDefaultButtonClicked=false;this._updatePanelIDs=null;this._updatePanelClientIDs=null;this._oldUpdatePanelIDs=null;this._childUpdatePanelIDs=null;this._panelsToRefreshIDs=null;this._updatePanelHasChildrenAsTriggers=null;this._asyncPostBackControlIDs=null;this._asyncPostBackControlClientIDs=null;this._postBackControlIDs=null;this._postBackControlClientIDs=null;this._scriptManagerID=null;this._pageLoadedHandler=null;this._additionalInput=null;this._onsubmit=null;this._onSubmitStatements=[];this._originalDoPostBack=null;this._originalDoPostBackWithOptions=null;this._originalFireDefaultButton=null;this._originalDoCallback=null;this._isCrossPost=false;this._postBackSettings=null;this._request=null;this._onFormSubmitHandler=null;this._onFormElementClickHandler=null;this._onWindowUnloadHandler=null;this._asyncPostBackTimeout=null;this._controlIDToFocus=null;this._scrollPosition=null;this._dataItems=null;this._updateContext=null;this._processingRequest=false;this._scriptDisposes={}};Sys.WebForms.PageRequestManager.prototype={_get_eventHandlerList:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_isInAsyncPostBack:function(){return this._request!==null},add_beginRequest:function(a){this._get_eventHandlerList().addHandler("beginRequest",a)},remove_beginRequest:function(a){this._get_eventHandlerList().removeHandler("beginRequest",a)},add_endRequest:function(a){this._get_eventHandlerList().addHandler("endRequest",a)},remove_endRequest:function(a){this._get_eventHandlerList().removeHandler("endRequest",a)},add_initializeRequest:function(a){this._get_eventHandlerList().addHandler("initializeRequest",a)},remove_initializeRequest:function(a){this._get_eventHandlerList().removeHandler("initializeRequest",a)},add_pageLoaded:function(a){this._get_eventHandlerList().addHandler("pageLoaded",a)},remove_pageLoaded:function(a){this._get_eventHandlerList().removeHandler("pageLoaded",a)},add_pageLoading:function(a){this._get_eventHandlerList().addHandler("pageLoading",a)},remove_pageLoading:function(a){this._get_eventHandlerList().removeHandler("pageLoading",a)},abortPostBack:function(){if(!this._processingRequest&&this._request){this._request.get_executor().abort();this._request=null}},_cancelPendingCallbacks:function(){for(var a=0,e=window.__pendingCallbacks.length;a<e;a++){var c=window.__pendingCallbacks[a];if(c){if(!c.async)window.__synchronousCallBackIndex=-1;window.__pendingCallbacks[a]=null;var d="__CALLBACKFRAME"+a,b=document.getElementById(d);if(b)b.parentNode.removeChild(b)}}},_createPageRequestManagerTimeoutError:function(){var b="Sys.WebForms.PageRequestManagerTimeoutException: "+Sys.WebForms.Res.PRM_TimeoutError,a=Error.create(b,{name:"Sys.WebForms.PageRequestManagerTimeoutException"});a.popStackFrame();return a},_createPageRequestManagerServerError:function(a,d){var c="Sys.WebForms.PageRequestManagerServerErrorException: "+(d||String.format(Sys.WebForms.Res.PRM_ServerError,a)),b=Error.create(c,{name:"Sys.WebForms.PageRequestManagerServerErrorException",httpStatusCode:a});b.popStackFrame();return b},_createPageRequestManagerParserError:function(b){var c="Sys.WebForms.PageRequestManagerParserErrorException: "+String.format(Sys.WebForms.Res.PRM_ParserError,b),a=Error.create(c,{name:"Sys.WebForms.PageRequestManagerParserErrorException"});a.popStackFrame();return a},_createPostBackSettings:function(c,b,a){return {async:c,panelID:b,sourceElement:a}},_convertToClientIDs:function(a,d,c){if(a)for(var b=0;b<a.length;b++){Array.add(d,a[b]);Array.add(c,this._uniqueIDToClientID(a[b]))}},_destroyTree:function(f){if(f.nodeType===1){var d=f.childNodes;for(var b=d.length-1;b>=0;b--){var a=d[b];if(a.nodeType===1){if(a.dispose&&typeof a.dispose==="function")a.dispose();else if(a.control&&typeof a.control.dispose==="function")a.control.dispose();var e=Sys.UI.Behavior.getBehaviors(a);for(var c=e.length-1;c>=0;c--)e[c].dispose();this._destroyTree(a)}}}},dispose:function(){if(this._form){Sys.UI.DomEvent.removeHandler(this._form,"submit",this._onFormSubmitHandler);Sys.UI.DomEvent.removeHandler(this._form,"click",this._onFormElementClickHandler);Sys.UI.DomEvent.removeHandler(window,"unload",this._onWindowUnloadHandler);Sys.UI.DomEvent.removeHandler(window,"load",this._pageLoadedHandler)}if(this._originalDoPostBack){window.__doPostBack=this._originalDoPostBack;this._originalDoPostBack=null}if(this._originalDoPostBackWithOptions){window.WebForm_DoPostBackWithOptions=this._originalDoPostBackWithOptions;this._originalDoPostBackWithOptions=null}if(this._originalFireDefaultButton){window.WebForm_FireDefaultButton=this._originalFireDefaultButton;this._originalFireDefaultButton=null}if(this._originalDoCallback){window.WebForm_DoCallback=this._originalDoCallback;this._originalDoCallback=null}this._form=null;this._updatePanelIDs=null;this._oldUpdatePanelIDs=null;this._childUpdatePanelIDs=null;this._updatePanelClientIDs=null;this._asyncPostBackControlIDs=null;this._asyncPostBackControlClientIDs=null;this._postBackControlIDs=null;this._postBackControlClientIDs=null;this._asyncPostBackTimeout=null;this._scrollPosition=null;this._dataItems=null},_doCallback:function(d,b,c,f,a,e){if(!this.get_isInAsyncPostBack())this._originalDoCallback(d,b,c,f,a,e)},_doPostBack:function(a,e){this._additionalInput=null;var b=this._form;if(a===null||typeof a==="undefined"||this._isCrossPost){this._postBackSettings=this._createPostBackSettings(false,null,null);this._isCrossPost=false}else{var f=this._uniqueIDToClientID(a),d=document.getElementById(f);if(!d)if(Array.contains(this._asyncPostBackControlIDs,a))this._postBackSettings=this._createPostBackSettings(true,this._scriptManagerID+"|"+a,null);else if(Array.contains(this._postBackControlIDs,a))this._postBackSettings=this._createPostBackSettings(false,null,null);else{var c=this._findNearestElement(a);if(c)this._postBackSettings=this._getPostBackSettings(c,a);else this._postBackSettings=this._createPostBackSettings(false,null,null)}else this._postBackSettings=this._getPostBackSettings(d,a)}if(!this._postBackSettings.async){b.onsubmit=this._onsubmit;this._originalDoPostBack(a,e);b.onsubmit=null;return}b.__EVENTTARGET.value=a;b.__EVENTARGUMENT.value=e;this._onFormSubmit()},_doPostBackWithOptions:function(a){this._isCrossPost=a&&a.actionUrl;this._originalDoPostBackWithOptions(a)},_elementContains:function(b,a){while(a){if(a===b)return true;a=a.parentNode}return false},_endPostBack:function(a,d){if(this._request===d.get_webRequest()){this._processingRequest=false;this._additionalInput=null;this._request=null}var e=this._get_eventHandlerList().getHandler("endRequest"),b=false;if(e){var c=new Sys.WebForms.EndRequestEventArgs(a,this._dataItems,d);e(this,c);b=c.get_errorHandled()}if(!this._processingRequest)this._dataItems=null;if(a&&!b)throw a},_findNearestElement:function(a){while(a.length>0){var d=this._uniqueIDToClientID(a),c=document.getElementById(d);if(c)return c;var b=a.lastIndexOf("$");if(b===-1)return null;a=a.substring(0,b)}return null},_findText:function(b,a){var c=Math.max(0,a-20),d=Math.min(b.length,a+20);return b.substring(c,d)},_fireDefaultButton:function(a,c){if(a.keyCode===13&&!(a.srcElement&&a.srcElement.tagName.toLowerCase()==="textarea")){var b=document.getElementById(c);if(b&&typeof b.click!=="undefined"){this._activeDefaultButton=b;this._activeDefaultButtonClicked=false;try{b.click()}finally{this._activeDefaultButton=null}a.cancelBubble=true;if(typeof a.stopPropagation==="function")a.stopPropagation();return false}}return true},_getPageLoadedEventArgs:function(f){var e=[],d=[],h=this._oldUpdatePanelIDs||[],b=this._updatePanelIDs,g=this._childUpdatePanelIDs||[],c=this._panelsToRefreshIDs||[];for(var a=0;a<c.length;a++)Array.add(e,document.getElementById(this._uniqueIDToClientID(c[a])));for(var a=0;a<b.length;a++)if(f||Array.indexOf(g,b[a])!==-1)Array.add(d,document.getElementById(this._uniqueIDToClientID(b[a])));return new Sys.WebForms.PageLoadedEventArgs(e,d,this._dataItems)},_getPageLoadingEventArgs:function(){var e=[],d=[],b=this._oldUpdatePanelIDs,g=this._updatePanelIDs,f=this._childUpdatePanelIDs,c=this._panelsToRefreshIDs;for(var a=0;a<c.length;a++)Array.add(e,document.getElementById(this._uniqueIDToClientID(c[a])));for(var a=0;a<b.length;a++)if(Array.indexOf(c,b[a])===-1&&(Array.indexOf(g,b[a])===-1||Array.indexOf(f,b[a])>-1))Array.add(d,document.getElementById(this._uniqueIDToClientID(b[a])));return new Sys.WebForms.PageLoadingEventArgs(e,d,this._dataItems)},_getPostBackSettings:function(a,c){var d=a,b=null;while(a){if(a.id){if(!b&&Array.contains(this._asyncPostBackControlClientIDs,a.id))b=this._createPostBackSettings(true,this._scriptManagerID+"|"+c,d);else if(!b&&Array.contains(this._postBackControlClientIDs,a.id))return this._createPostBackSettings(false,null,null);else{var e=Array.indexOf(this._updatePanelClientIDs,a.id);if(e!==-1)if(this._updatePanelHasChildrenAsTriggers[e])return this._createPostBackSettings(true,this._updatePanelIDs[e]+"|"+c,d);else return this._createPostBackSettings(true,this._scriptManagerID+"|"+c,d)}if(!b&&this._matchesParentIDInList(a.id,this._asyncPostBackControlClientIDs))b=this._createPostBackSettings(true,this._scriptManagerID+"|"+c,d);else if(!b&&this._matchesParentIDInList(a.id,this._postBackControlClientIDs))return this._createPostBackSettings(false,null,null)}a=a.parentNode}if(!b)return this._createPostBackSettings(false,null,null);else return b},_getScrollPosition:function(){var a=document.documentElement;if(a&&(this._validPosition(a.scrollLeft)||this._validPosition(a.scrollTop)))return {x:a.scrollLeft,y:a.scrollTop};else{a=document.body;if(a&&(this._validPosition(a.scrollLeft)||this._validPosition(a.scrollTop)))return {x:a.scrollLeft,y:a.scrollTop};else if(this._validPosition(window.pageXOffset)||this._validPosition(window.pageYOffset))return {x:window.pageXOffset,y:window.pageYOffset};else return {x:0,y:0}}},_initializeInternal:function(a,b){if(this._prmInitialized)throw Error.invalidOperation(Sys.WebForms.Res.PRM_CannotRegisterTwice);this._prmInitialized=true;this._scriptManagerID=a;this._form=b;this._onsubmit=this._form.onsubmit;this._form.onsubmit=null;this._onFormSubmitHandler=Function.createDelegate(this,this._onFormSubmit);this._onFormElementClickHandler=Function.createDelegate(this,this._onFormElementClick);this._onWindowUnloadHandler=Function.createDelegate(this,this._onWindowUnload);Sys.UI.DomEvent.addHandler(this._form,"submit",this._onFormSubmitHandler);Sys.UI.DomEvent.addHandler(this._form,"click",this._onFormElementClickHandler);Sys.UI.DomEvent.addHandler(window,"unload",this._onWindowUnloadHandler);this._originalDoPostBack=window.__doPostBack;if(this._originalDoPostBack)window.__doPostBack=Function.createDelegate(this,this._doPostBack);this._originalDoPostBackWithOptions=window.WebForm_DoPostBackWithOptions;if(this._originalDoPostBackWithOptions)window.WebForm_DoPostBackWithOptions=Function.createDelegate(this,this._doPostBackWithOptions);this._originalFireDefaultButton=window.WebForm_FireDefaultButton;if(this._originalFireDefaultButton)window.WebForm_FireDefaultButton=Function.createDelegate(this,this._fireDefaultButton);this._originalDoCallback=window.WebForm_DoCallback;if(this._originalDoCallback)window.WebForm_DoCallback=Function.createDelegate(this,this._doCallback);this._pageLoadedHandler=Function.createDelegate(this,this._pageLoadedInitialLoad);Sys.UI.DomEvent.addHandler(window,"load",this._pageLoadedHandler)},_matchesParentIDInList:function(c,b){for(var a=0;a<b.length;a++)if(c.startsWith(b[a]+"_"))return true;return false},_onFormElementActive:function(a,c,d){if(a.disabled)return;this._postBackSettings=this._getPostBackSettings(a,a.name);if(a.name)if(a.tagName==="INPUT"){var b=a.type;if(b==="submit")this._additionalInput=encodeURIComponent(a.name)+"="+encodeURIComponent(a.value);else if(b==="image")this._additionalInput=encodeURIComponent(a.name)+".x="+c+"&"+encodeURIComponent(a.name)+".y="+d}else if(a.tagName==="BUTTON"&&a.name.length!==0&&a.type==="submit")this._additionalInput=encodeURIComponent(a.name)+"="+encodeURIComponent(a.value)},_onFormElementClick:function(a){this._activeDefaultButtonClicked=a.target===this._activeDefaultButton;this._onFormElementActive(a.target,a.offsetX,a.offsetY)},_onFormSubmit:function(g){var e=true,r=this._isCrossPost;this._isCrossPost=false;if(this._onsubmit)e=this._onsubmit();if(e)for(var h=0;h<this._onSubmitStatements.length;h++)if(!this._onSubmitStatements[h]()){e=false;break}if(!e){if(g)g.preventDefault();return}var n=this._form;if(r)return;if(this._activeDefaultButton&&!this._activeDefaultButtonClicked)this._onFormElementActive(this._activeDefaultButton,0,0);if(!this._postBackSettings.async)return;var a=new Sys.StringBuilder;a.append(encodeURIComponent(this._scriptManagerID)+"="+encodeURIComponent(this._postBackSettings.panelID)+"&");var t=n.elements.length;for(var h=0;h<t;h++){var c=n.elements[h],f=c.name;if(typeof f==="undefined"||f===null||f.length===0)continue;var m=c.tagName;if(m==="INPUT"){var j=c.type;if(j==="text"||j==="password"||j==="hidden"||j==="color"||j==="date"||j==="datetime-local"||j==="email"||j==="month"||j==="number"||j==="range"||j==="search"||j==="tel"||j==="time"||j==="url"||j==="week"||(j==="checkbox"||j==="radio")&&c.checked){a.append(encodeURIComponent(f));a.append("=");a.append(encodeURIComponent(c.value));a.append("&")}}else if(m==="SELECT"){var s=c.options.length;for(var o=0;o<s;o++){var p=c.options[o];if(p.selected){a.append(encodeURIComponent(f));a.append("=");a.append(encodeURIComponent(p.value));a.append("&")}}}else if(m==="TEXTAREA"){a.append(encodeURIComponent(f));a.append("=");a.append(encodeURIComponent(c.value));a.append("&")}}if(this._additionalInput){a.append(this._additionalInput);this._additionalInput=null}var b=new Sys.Net.WebRequest,d=n.action;if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var k=d.indexOf("?");if(k!==-1){var q=d.substr(0,k);if(q.indexOf("%")===-1)d=encodeURI(q)+d.substr(k)}else if(d.indexOf("%")===-1)d=encodeURI(d)}b.set_url(d);b.get_headers()["X-MicrosoftAjax"]="Delta=true";b.get_headers()["Cache-Control"]="no-cache";b.set_timeout(this._asyncPostBackTimeout);b.add_completed(Function.createDelegate(this,this._onFormSubmitCompleted));b.set_body(a.toString());var i=this._get_eventHandlerList().getHandler("initializeRequest");if(i){var l=new Sys.WebForms.InitializeRequestEventArgs(b,this._postBackSettings.sourceElement);i(this,l);e=!l.get_cancel()}if(!e){if(g)g.preventDefault();return}this._scrollPosition=this._getScrollPosition();this.abortPostBack();i=this._get_eventHandlerList().getHandler("beginRequest");if(i){var l=new Sys.WebForms.BeginRequestEventArgs(b,this._postBackSettings.sourceElement);i(this,l)}if(this._originalDoCallback)this._cancelPendingCallbacks();this._request=b;b.invoke();if(g)g.preventDefault()},_onFormSubmitCompleted:function(e){this._processingRequest=true;var j="|";if(e.get_timedOut()){this._endPostBack(this._createPageRequestManagerTimeoutError(),e);return}if(e.get_aborted()){this._endPostBack(null,e);return}if(!this._request||e.get_webRequest()!==this._request)return;var Q,u=[];if(e.get_statusCode()!==200){this._endPostBack(this._createPageRequestManagerServerError(e.get_statusCode()),e);return}var c=e.get_responseData(),f,i,K,L,I,b=0,g=null;while(b<c.length){f=c.indexOf(j,b);if(f===-1){g=this._findText(c,b);break}i=parseInt(c.substring(b,f),10);if(i%1!==0){g=this._findText(c,b);break}b=f+1;f=c.indexOf(j,b);if(f===-1){g=this._findText(c,b);break}K=c.substring(b,f);b=f+1;f=c.indexOf(j,b);if(f===-1){g=this._findText(c,b);break}L=c.substring(b,f);b=f+1;if(b+i>=c.length){g=this._findText(c,c.length);break}I=c.substr(b,i);b+=i;if(c.charAt(b)!==j){g=this._findText(c,b);break}b++;Array.add(u,{type:K,id:L,content:I})}if(g){this._endPostBack(this._createPageRequestManagerParserError(String.format(Sys.WebForms.Res.PRM_ParserErrorDetails,g)),e);return}var B=[],A=[],w=[],r=[],y=[],G=[],C=[],t=[],q=[],x=[],k,n,p,l,m,o,s;for(var d=0;d<u.length;d++){var a=u[d];switch(a.type){case "updatePanel":Array.add(B,a);break;case "hiddenField":Array.add(A,a);break;case "arrayDeclaration":Array.add(w,a);break;case "scriptBlock":Array.add(r,a);break;case "scriptStartupBlock":Array.add(y,a);break;case "expando":Array.add(G,a);break;case "onSubmit":Array.add(C,a);break;case "asyncPostBackControlIDs":k=a;break;case "postBackControlIDs":n=a;break;case "updatePanelIDs":p=a;break;case "asyncPostBackTimeout":l=a;break;case "childUpdatePanelIDs":m=a;break;case "panelsToRefreshIDs":o=a;break;case "formAction":s=a;break;case "dataItem":Array.add(t,a);break;case "dataItemJson":Array.add(q,a);break;case "scriptDispose":Array.add(x,a);break;case "pageRedirect":if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var h=document.createElement("a");h.style.display="none";h.attachEvent("onclick",E);h.href=a.content;document.body.appendChild(h);h.click();h.detachEvent("onclick",E);document.body.removeChild(h);function E(a){a.cancelBubble=true}}else window.location.href=a.content;return;case "error":this._endPostBack(this._createPageRequestManagerServerError(Number.parseInvariant(a.id),a.content),e);return;case "pageTitle":document.title=a.content;break;case "focus":this._controlIDToFocus=a.content;break;default:this._endPostBack(this._createPageRequestManagerParserError(String.format(Sys.WebForms.Res.PRM_UnknownToken,a.type)),e);return}}var d;if(k&&n&&p&&o&&l&&m){this._oldUpdatePanelIDs=this._updatePanelIDs;var v=m.content;this._childUpdatePanelIDs=v.length?v.split(","):[];var M=this._splitNodeIntoArray(k),N=this._splitNodeIntoArray(n),P=this._splitNodeIntoArray(p);this._panelsToRefreshIDs=this._splitNodeIntoArray(o);for(d=0;d<this._panelsToRefreshIDs.length;d++){var D=this._uniqueIDToClientID(this._panelsToRefreshIDs[d]);if(!document.getElementById(D)){this._endPostBack(Error.invalidOperation(String.format(Sys.WebForms.Res.PRM_MissingPanel,D)),e);return}}var O=l.content;this._updateControls(P,M,N,O)}this._dataItems={};for(d=0;d<t.length;d++){var F=t[d];this._dataItems[F.id]=F.content}for(d=0;d<q.length;d++){var z=q[d];this._dataItems[z.id]=Sys.Serialization.JavaScriptSerializer.deserialize(z.content)}var J=this._get_eventHandlerList().getHandler("pageLoading");if(J)J(this,this._getPageLoadingEventArgs());if(s)this._form.action=s.content;Sys._ScriptLoader.readLoadedScripts();Sys.Application.beginCreateComponents();var H=Sys._ScriptLoader.getInstance();this._queueScripts(H,r,true,false);this._updateContext={response:e,updatePanelNodes:B,scriptBlockNodes:r,scriptDisposeNodes:x,hiddenFieldNodes:A,arrayDeclarationNodes:w,expandoNodes:G,scriptStartupNodes:y,onSubmitNodes:C};H.loadScripts(0,Function.createDelegate(this,this._scriptIncludesLoadComplete),Function.createDelegate(this,this._scriptIncludesLoadFailed),null)},_onWindowUnload:function(){this.dispose()},_pageLoaded:function(a){var b=this._get_eventHandlerList().getHandler("pageLoaded");if(b)b(this,this._getPageLoadedEventArgs(a));if(!a)Sys.Application.raiseLoad()},_pageLoadedInitialLoad:function(){this._pageLoaded(true)},_queueScripts:function(scriptLoader,scriptBlockNodes,queueIncludes,queueBlocks){for(i=0;i<scriptBlockNodes.length;i++){var scriptBlockType=scriptBlockNodes[i].id;switch(scriptBlockType){case "ScriptContentNoTags":if(!queueBlocks)continue;scriptLoader.queueScriptBlock(scriptBlockNodes[i].content);break;case "ScriptContentWithTags":var scriptTagAttributes;eval("scriptTagAttributes = "+scriptBlockNodes[i].content);if(scriptTagAttributes.src){if(!queueIncludes||Sys._ScriptLoader.isScriptLoaded(scriptTagAttributes.src))continue}else if(!queueBlocks)continue;scriptLoader.queueCustomScriptTag(scriptTagAttributes);break;case "ScriptPath":if(!queueIncludes||Sys._ScriptLoader.isScriptLoaded(scriptBlockNodes[i].content))continue;scriptLoader.queueScriptReference(scriptBlockNodes[i].content)}}},_registerDisposeScript:function(a,b){if(!this._scriptDisposes[a])this._scriptDisposes[a]=[b];else Array.add(this._scriptDisposes[a],b)},_scriptIncludesLoadComplete:function(){var b=this._updateContext;for(a=0;a<b.updatePanelNodes.length;a++){var l=b.updatePanelNodes[a],m=l.id,n=l.content,j=document.getElementById(m);if(!j){this._endPostBack(Error.invalidOperation(String.format(Sys.WebForms.Res.PRM_MissingPanel,m)),b.response);return}this._updatePanel(j,n)}for(a=0;a<b.scriptDisposeNodes.length;a++){var p=b.scriptDisposeNodes[a].id,q=b.scriptDisposeNodes[a].content;this._registerDisposeScript(p,q)}var k=false;for(a=0;a<b.hiddenFieldNodes.length;a++){var f=b.hiddenFieldNodes[a].id,s=b.hiddenFieldNodes[a].content;if(f==="__VIEWSTATEENCRYPTED")k=true;var c=document.getElementById(f);if(!c){c=document.createElement("input");c.id=f;c.name=f;c.type="hidden";this._form.appendChild(c)}c.value=s}if(!k){var g=document.getElementById("__VIEWSTATEENCRYPTED");if(g)g.parentNode.removeChild(g)}if(b.scriptsFailed)throw Sys._ScriptLoader._errorScriptLoadFailed(b.scriptsFailed.src,b.scriptsFailed.multipleCallbacks);var d=Sys._ScriptLoader.getInstance();this._queueScripts(d,b.scriptBlockNodes,false,true);var i="";for(a=0;a<b.arrayDeclarationNodes.length;a++)i+="Sys.WebForms.PageRequestManager._addArrayElement('"+b.arrayDeclarationNodes[a].id+"', "+b.arrayDeclarationNodes[a].content+");\r\n";var h="";for(a=0;a<b.expandoNodes.length;a++){var o=b.expandoNodes[a].id,r=b.expandoNodes[a].content;h+=o+" = "+r+"\r\n"}if(i.length)d.queueScriptBlock(i);if(h.length)d.queueScriptBlock(h);this._queueScripts(d,b.scriptStartupNodes,true,true);var e="";for(var a=0;a<b.onSubmitNodes.length;a++){if(a===0)e="Array.add(Sys.WebForms.PageRequestManager.getInstance()._onSubmitStatements, function() {\r\n";e+=b.onSubmitNodes[a].content+"\r\n"}if(e.length){e+="\r\nreturn true;\r\n});\r\n";d.queueScriptBlock(e)}d.loadScripts(0,Function.createDelegate(this,this._scriptsLoadComplete),null,null)},_scriptIncludesLoadFailed:function(c,b,a){this._updateContext.scriptsFailed={src:b.src,multipleCallbacks:a};this._scriptIncludesLoadComplete()},_scriptsLoadComplete:function(){var d=this._updateContext.response;this._updateContext=null;if(window.__theFormPostData)window.__theFormPostData="";if(window.__theFormPostCollection)window.__theFormPostCollection=[];if(window.WebForm_InitCallback)window.WebForm_InitCallback();if(this._scrollPosition){if(window.scrollTo)window.scrollTo(this._scrollPosition.x,this._scrollPosition.y);this._scrollPosition=null}Sys.Application.endCreateComponents();this._pageLoaded(false);this._endPostBack(null,d);if(this._controlIDToFocus){var a,c;if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var b=$get(this._controlIDToFocus);a=b;if(b&&!WebForm_CanFocus(b))a=WebForm_FindFirstFocusableChild(b);if(a&&typeof a.contentEditable!=="undefined"){c=a.contentEditable;a.contentEditable=false}else a=null}WebForm_AutoFocus(this._controlIDToFocus);if(a)a.contentEditable=c;this._controlIDToFocus=null}},_splitNodeIntoArray:function(b){var a=b.content,c=a.length?a.split(","):[];return c},_uniqueIDToClientID:function(a){return a.replace(/\$/g,"_")},_updateControls:function(a,d,g,e){if(a){this._updatePanelIDs=new Array(a.length);this._updatePanelClientIDs=new Array(a.length);this._updatePanelHasChildrenAsTriggers=new Array(a.length);for(var b=0;b<a.length;b++){var c=a[b].substr(1),f=a[b].charAt(0)==="t";this._updatePanelHasChildrenAsTriggers[b]=f;this._updatePanelIDs[b]=c;this._updatePanelClientIDs[b]=this._uniqueIDToClientID(c)}this._asyncPostBackTimeout=e*1000}else{this._updatePanelIDs=[];this._updatePanelClientIDs=[];this._updatePanelHasChildrenAsTriggers=[];this._asyncPostBackTimeout=0}this._asyncPostBackControlIDs=[];this._asyncPostBackControlClientIDs=[];this._convertToClientIDs(d,this._asyncPostBackControlIDs,this._asyncPostBackControlClientIDs);this._postBackControlIDs=[];this._postBackControlClientIDs=[];this._convertToClientIDs(g,this._postBackControlIDs,this._postBackControlClientIDs)},_updatePanel:function(updatePanelElement,rendering){for(var updatePanelID in this._scriptDisposes)if(this._elementContains(updatePanelElement,document.getElementById(updatePanelID))){var disposeScripts=this._scriptDisposes[updatePanelID];for(var i=0;i<disposeScripts.length;i++)eval(disposeScripts[i]);delete this._scriptDisposes[updatePanelID]}this._destroyTree(updatePanelElement);updatePanelElement.innerHTML=rendering},_validPosition:function(a){return typeof a!=="undefined"&&a!==null&&a!==0}};Sys.WebForms.PageRequestManager.getInstance=function(){var a=Sys.WebForms.PageRequestManager._instance;if(!a)a=Sys.WebForms.PageRequestManager._instance=new Sys.WebForms.PageRequestManager;return a};Sys.WebForms.PageRequestManager._addArrayElement=function(a){if(!window[a])window[a]=[];for(var b=1,c=arguments.length;b<c;b++)Array.add(window[a],arguments[b])};Sys.WebForms.PageRequestManager._initialize=function(a,b){Sys.WebForms.PageRequestManager.getInstance()._initializeInternal(a,b)};Sys.WebForms.PageRequestManager.registerClass("Sys.WebForms.PageRequestManager");Sys.UI._UpdateProgress=function(a){Sys.UI._UpdateProgress.initializeBase(this,[a]);this._displayAfter=500;this._dynamicLayout=true;this._associatedUpdatePanelId=null;this._beginRequestHandlerDelegate=null;this._startDelegate=null;this._endRequestHandlerDelegate=null;this._pageRequestManager=null;this._timerCookie=null};Sys.UI._UpdateProgress.prototype={get_displayAfter:function(){return this._displayAfter},set_displayAfter:function(a){this._displayAfter=a},get_dynamicLayout:function(){return this._dynamicLayout},set_dynamicLayout:function(a){this._dynamicLayout=a},get_associatedUpdatePanelId:function(){return this._associatedUpdatePanelId},set_associatedUpdatePanelId:function(a){this._associatedUpdatePanelId=a},_handleBeginRequest:function(d,c){var a=c.get_postBackElement(),b=!this._associatedUpdatePanelId;while(!b&&a){if(a.id&&this._associatedUpdatePanelId===a.id)b=true;a=a.parentNode}if(b)this._timerCookie=window.setTimeout(this._startDelegate,this._displayAfter)},_startRequest:function(){if(this._pageRequestManager.get_isInAsyncPostBack())if(this._dynamicLayout)this.get_element().style.display="block";else this.get_element().style.visibility="visible";this._timerCookie=null},_handleEndRequest:function(){if(this._dynamicLayout)this.get_element().style.display="none";else this.get_element().style.visibility="hidden";if(this._timerCookie){window.clearTimeout(this._timerCookie);this._timerCookie=null}},dispose:function(){if(this._pageRequestManager!==null){this._pageRequestManager.remove_beginRequest(this._beginRequestHandlerDelegate);this._pageRequestManager.remove_endRequest(this._endRequestHandlerDelegate)}Sys.UI._UpdateProgress.callBaseMethod(this,"dispose")},initialize:function(){Sys.UI._UpdateProgress.callBaseMethod(this,"initialize");this._beginRequestHandlerDelegate=Function.createDelegate(this,this._handleBeginRequest);this._endRequestHandlerDelegate=Function.createDelegate(this,this._handleEndRequest);this._startDelegate=Function.createDelegate(this,this._startRequest);if(Sys.WebForms&&Sys.WebForms.PageRequestManager)this._pageRequestManager=Sys.WebForms.PageRequestManager.getInstance();if(this._pageRequestManager!==null){this._pageRequestManager.add_beginRequest(this._beginRequestHandlerDelegate);this._pageRequestManager.add_endRequest(this._endRequestHandlerDelegate)}}};Sys.UI._UpdateProgress.registerClass("Sys.UI._UpdateProgress",Sys.UI.Control);
Type.registerNamespace('Sys.WebForms');Sys.WebForms.Res={'PRM_UnknownToken':'Unknown token: \'{0}\'.','PRM_MissingPanel':'Could not find UpdatePanel with ID \'{0}\'. If it is being updated dynamically then it must be inside another UpdatePanel.','PRM_ServerError':'An unknown error occurred while processing the request on the server. The status code returned from the server was: {0}','PRM_ParserError':'The message received from the server could not be parsed. Common causes for this error are when the response is modified by calls to Response.Write(), response filters, HttpModules, or server trace is enabled.\r\nDetails: {0}','PRM_TimeoutError':'The server request timed out.','PRM_ParserErrorDetails':'Error parsing near \'{0}\'.','PRM_CannotRegisterTwice':'The PageRequestManager cannot be initialized more than once.'};
if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();
