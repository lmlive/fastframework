/*!
 * froala_editor v2.8.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function(e) {
    "function" == typeof define && define.amd ? define([ "jquery" ], e) : "object" == typeof module && module.exports ? module.exports = function(t, n) {
        return void 0 === n && (n = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), 
        e(n);
    } : e(window.jQuery);
}(function(e) {
    var t = function(n, r) {
        this.id = ++e.FE.ID, this.opts = e.extend(!0, {}, e.extend({}, t.DEFAULTS, "object" == typeof r && r));
        var i = JSON.stringify(this.opts);
        e.FE.OPTS_MAPPING[i] = e.FE.OPTS_MAPPING[i] || this.id, this.sid = e.FE.OPTS_MAPPING[i], 
        e.FE.SHARED[this.sid] = e.FE.SHARED[this.sid] || {}, this.shared = e.FE.SHARED[this.sid], 
        this.shared.count = (this.shared.count || 0) + 1, this.$oel = e(n), this.$oel.data("froala.editor", this), 
        this.o_doc = n.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow;
        var a = e(this.o_win).scrollTop();
        this.$oel.on("froala.doInit", e.proxy(function() {
            this.$oel.off("froala.doInit"), this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, 
            this.$doc = e(this.doc), this.$win = e(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(e.FE.PLUGINS)), 
            this.opts.initOnClick ? (this.load(e.FE.MODULES), this.$el.on("touchstart.init", function() {
                e(this).data("touched", !0);
            }), this.$el.on("touchmove.init", function() {
                e(this).removeData("touched");
            }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", e.proxy(function(t) {
                if ("touchend" == t.type && !this.$el.data("touched")) return !0;
                if (1 === t.which || !t.which) {
                    this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), 
                    this.load(e.FE.MODULES), this.load(e.FE.PLUGINS);
                    var n = t.originalEvent && t.originalEvent.originalTarget;
                    n && "IMG" == n.tagName && e(n).trigger("mousedown"), void 0 === this.ul && this.destroy(), 
                    "touchend" == t.type && this.image && t.originalEvent && t.originalEvent.target && e(t.originalEvent.target).is("img") && setTimeout(e.proxy(function() {
                        this.image.edit(e(t.originalEvent.target));
                    }, this), 100), this.ready = !0, this.events.trigger("initialized");
                }
            }, this)), this.events.trigger("initializationDelayed")) : (this.load(e.FE.MODULES), 
            this.load(e.FE.PLUGINS), e(this.o_win).scrollTop(a), void 0 === this.ul && this.destroy(), 
            this.ready = !0, this.events.trigger("initialized"));
        }, this)), this._init();
    };
    if (t.DEFAULTS = {
        initOnClick: !1,
        pluginsEnabled: null
    }, t.MODULES = {}, t.PLUGINS = {}, t.VERSION = "2.8.0", t.INSTANCES = [], t.OPTS_MAPPING = {}, 
    t.SHARED = {}, t.ID = 0, t.prototype._init = function() {
        var t = this.$oel.prop("tagName");
        1 <= this.$oel.closest("label").length && console.warn("Note! It is not recommended to initialize the Froala Editor within a label tag.");
        var n = e.proxy(function() {
            "TEXTAREA" != t && (this._original_html = this._original_html || this.$oel.html()), 
            this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = !0), 
            this.opts.iframe ? (this.$iframe = e('<iframe src="about:blank" frameBorder="0">'), 
            this.$wp = e("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), 
            this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), 
            this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), 
            this.$iframe.get(0).contentWindow.document.close(), this.$el = this.$iframe.contents().find("body"), 
            this.el = this.$el.get(0), this.$head = this.$iframe.contents().find("head"), this.$html = this.$iframe.contents().find("html"), 
            this.iframe_document = this.$iframe.get(0).contentWindow.document) : (this.$el = e("<div></div>"), 
            this.el = this.$el.get(0), this.$wp = e("<div></div>").append(this.$el), this.$box.html(this.$wp)), 
            this.$oel.trigger("froala.doInit");
        }, this), r = e.proxy(function() {
            this.$box = e("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val(), 
            this.$oel.parents("form").on("submit." + this.id, e.proxy(function() {
                this.events.trigger("form.submit");
            }, this)), this.$oel.parents("form").on("reset." + this.id, e.proxy(function() {
                this.events.trigger("form.reset");
            }, this)), n();
        }, this), i = e.proxy(function() {
            this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"), 
            this.opts.multiLine = !1, this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit");
        }, this), a = e.proxy(function() {
            this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit");
        }, this), o = e.proxy(function() {
            this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.on("click.popup", function(e) {
                e.preventDefault();
            }), this.$oel.trigger("froala.doInit");
        }, this);
        this.opts.editInPopup ? o() : "TEXTAREA" == t ? r() : "A" == t ? i() : "IMG" == t ? a() : "BUTTON" == t || "INPUT" == t ? (this.opts.editInPopup = !0, 
        this.opts.toolbarInline = !1, o()) : n();
    }, t.prototype.load = function(t) {
        for (var n in t) if (t.hasOwnProperty(n)) {
            if (this[n]) continue;
            if (e.FE.PLUGINS[n] && this.opts.pluginsEnabled.indexOf(n) < 0) continue;
            if (this[n] = new t[n](this), this[n]._init && (this[n]._init(), this.opts.initOnClick && "core" == n)) return !1;
        }
    }, t.prototype.destroy = function() {
        this.shared.count--, this.events.$off();
        var t = this.html.get();
        if (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), 
        this.events.trigger("destroy", [], !0), this.events.trigger("shared.destroy", void 0, !0), 
        0 === this.shared.count) {
            for (var n in this.shared) this.shared.hasOwnProperty(n) && (this.shared[n], e.FE.SHARED[this.sid][n] = null);
            delete e.FE.SHARED[this.sid];
        }
        this.$oel.parents("form").off("." + this.id), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), 
        this.$oel.off("froalaEditor"), this.core.destroy(t), e.FE.INSTANCES.splice(e.FE.INSTANCES.indexOf(this), 1);
    }, e.fn.froalaEditor = function(n) {
        for (var r = [], i = 0; i < arguments.length; i++) r.push(arguments[i]);
        if ("string" == typeof n) {
            var a = [];
            return this.each(function() {
                var t, i, o = e(this).data("froala.editor");
                if (!o) return console.warn("Editor should be initialized before calling the " + n + " method.");
                if (0 < n.indexOf(".") && o[n.split(".")[0]] ? (o[n.split(".")[0]] && (t = o[n.split(".")[0]]), 
                i = n.split(".")[1]) : (t = o, i = n.split(".")[0]), !t[i]) return e.error("Method " + n + " does not exist in Froala Editor.");
                var s = t[i].apply(o, r.slice(1));
                void 0 === s ? a.push(this) : 0 === a.length && a.push(s);
            }), 1 == a.length ? a[0] : a;
        }
        if ("object" == typeof n || !n) return this.each(function() {
            e(this).data("froala.editor") || new t(this, n);
        });
    }, e.fn.froalaEditor.Constructor = t, e.FroalaEditor = t, e.FE = t, e.FE.XS = 0, 
    e.FE.SM = 1, e.FE.MD = 2, e.FE.LG = 3, e.FE.LinkRegExCommon = "[a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_.]{1,}", 
    e.FE.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?\\|!^=%&amp;/~+#-\\'*-_{}]*)|())", 
    e.FE.LinkRegExTLD = "((" + e.FE.LinkRegExCommon + ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))", 
    e.FE.LinkRegExHTTP = "((ftp|http|https):\\/\\/" + e.FE.LinkRegExCommon + ")", e.FE.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@" + e.FE.LinkRegExCommon + ")", 
    e.FE.LinkRegExWWW = "(www\\." + e.FE.LinkRegExCommon + "\\.[a-z0-9-]{2,24})", e.FE.LinkRegEx = "(" + e.FE.LinkRegExTLD + "|" + e.FE.LinkRegExHTTP + "|" + e.FE.LinkRegExWWW + "|" + e.FE.LinkRegExAuth + ")" + e.FE.LinkRegExEnd, 
    e.FE.LinkProtocols = [ "mailto", "tel", "sms", "notes", "data" ], e.FE.MAIL_REGEX = /.+@.+\..+/i, 
    e.FE.MODULES.helpers = function(t) {
        function n() {
            var e, t, n = {}, r = (t = -1, "Microsoft Internet Explorer" == navigator.appName ? (e = navigator.userAgent, 
            null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))) : "Netscape" == navigator.appName && (e = navigator.userAgent, 
            null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))), 
            t);
            if (0 < r) n.msie = !0; else {
                var i = navigator.userAgent.toLowerCase(), a = /(edge)[ \/]([\w.]+)/.exec(i) || /(chrome)[ \/]([\w.]+)/.exec(i) || /(webkit)[ \/]([\w.]+)/.exec(i) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(i) || /(msie) ([\w.]+)/.exec(i) || i.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(i) || [], o = a[1] || "";
                a[1] && (n[o] = !0), n.chrome ? n.webkit = !0 : n.webkit && (n.safari = !0);
            }
            return n.msie && (n.version = r), n;
        }
        function r() {
            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !o();
        }
        function i() {
            return /(Android)/g.test(navigator.userAgent) && !o();
        }
        function a() {
            return /(Blackberry)/g.test(navigator.userAgent);
        }
        function o() {
            return /(Windows Phone)/gi.test(navigator.userAgent);
        }
        function s(e) {
            return parseInt(e, 10) || 0;
        }
        var l, d = null;
        return {
            _init: function() {
                t.browser = n(), function() {
                    function e(e, t) {
                        var i = e[t];
                        e[t] = function(e) {
                            var t, a = !1, o = !1;
                            if (e && e.match(r)) {
                                e = e.replace(r, ""), this.parentNode || (n.appendChild(this), o = !0);
                                var s = this.parentNode;
                                return this.id || (this.id = "rootedQuerySelector_id_" + new Date().getTime(), a = !0), 
                                t = i.call(s, "#" + this.id + " " + e), a && (this.id = ""), o && n.removeChild(this), 
                                t;
                            }
                            return i.call(this, e);
                        };
                    }
                    var n = t.o_doc.createElement("div");
                    try {
                        n.querySelectorAll(":scope *");
                    } catch (t) {
                        var r = /^\s*:scope/gi;
                        e(Element.prototype, "querySelector"), e(Element.prototype, "querySelectorAll"), 
                        e(HTMLElement.prototype, "querySelector"), e(HTMLElement.prototype, "querySelectorAll");
                    }
                }(), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), 
                Element.prototype.closest || (Element.prototype.closest = function(e) {
                    var t = this;
                    if (!t) return null;
                    if (!document.documentElement.contains(this)) return null;
                    do {
                        if (t.matches(e)) return t;
                        t = t.parentElement;
                    } while (null !== t);
                    return null;
                });
            },
            isIOS: r,
            isMac: function() {
                return null == d && (d = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), 
                d;
            },
            isAndroid: i,
            isBlackberry: a,
            isWindowsPhone: o,
            isMobile: function() {
                return i() || r() || a();
            },
            isEmail: function(t) {
                return !/^(https?:|ftps?:|)\/\//i.test(t) && e.FE.MAIL_REGEX.test(t);
            },
            requestAnimationFrame: function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
                    window.setTimeout(e, 1e3 / 60);
                };
            },
            getPX: s,
            screenSize: function() {
                var t = e('<div class="fr-visibility-helper"></div>').appendTo("body:first");
                try {
                    var n = s(t.css("margin-left"));
                    return t.remove(), n;
                } catch (t) {
                    return e.FE.LG;
                }
            },
            isTouch: function() {
                return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
            },
            sanitizeURL: function(t) {
                return /^(https?:|ftps?:|)\/\//i.test(t) ? t : /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(t) ? t : new RegExp("^(" + e.FE.LinkProtocols.join("|") + "):\\/\\/", "i").test(t) ? t : t = encodeURIComponent(t).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}");
            },
            isArray: function(e) {
                return e && !e.propertyIsEnumerable("length") && "object" == typeof e && "number" == typeof e.length;
            },
            RGBToHex: function(e) {
                function t(e) {
                    return ("0" + parseInt(e, 10).toString(16)).slice(-2);
                }
                try {
                    return e && "transparent" !== e ? /^#[0-9A-F]{6}$/i.test(e) ? e : ("#" + t((e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))[1]) + t(e[2]) + t(e[3])).toUpperCase() : "";
                } catch (e) {
                    return null;
                }
            },
            HEXtoRGB: function(e) {
                e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, n, r) {
                    return t + t + n + n + r + r;
                });
                var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                return t ? "rgb(" + parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) + ")" : "";
            },
            isURL: function(t) {
                return !!/^(https?:|ftps?:|)\/\//i.test(t) && (t = String(t).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), 
                new RegExp("^" + e.FE.LinkRegExHTTP + e.FE.LinkRegExEnd + "$", "gi").test(t));
            },
            getAlignment: function(n) {
                var r = (n.css("text-align") || "").replace(/-(.*)-/g, "");
                if ([ "left", "right", "justify", "center" ].indexOf(r) < 0) {
                    if (!l) {
                        var i = e('<div dir="' + ("rtl" == t.opts.direction ? "rtl" : "auto") + '" style="text-align: ' + t.$el.css("text-align") + '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');
                        e("body:first").append(i);
                        var a = i.find("#s1").get(0).getBoundingClientRect().left, o = i.find("#s2").get(0).getBoundingClientRect().left;
                        i.remove(), l = a < o ? "left" : "right";
                    }
                    r = l;
                }
                return r;
            },
            scrollTop: function() {
                return t.o_win.pageYOffset ? t.o_win.pageYOffset : t.o_doc.documentElement && t.o_doc.documentElement.scrollTop ? t.o_doc.documentElement.scrollTop : t.o_doc.body.scrollTop ? t.o_doc.body.scrollTop : 0;
            },
            scrollLeft: function() {
                return t.o_win.pageXOffset ? t.o_win.pageXOffset : t.o_doc.documentElement && t.o_doc.documentElement.scrollLeft ? t.o_doc.documentElement.scrollLeft : t.o_doc.body.scrollLeft ? t.o_doc.body.scrollLeft : 0;
            },
            isInViewPort: function(e) {
                var t = e.getBoundingClientRect();
                return 0 <= t.top && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) || t.top <= 0 && t.bottom >= (window.innerHeight || document.documentElement.clientHeight);
            }
        };
    }, e.FE.MODULES.events = function(t) {
        function n(e, t, n) {
            l(e, t, n);
        }
        function r(n) {
            if (void 0 === n && (n = !0), !t.$wp) return !1;
            if (t.helpers.isIOS() && t.$win.get(0).focus(), t.core.hasFocus()) return !1;
            if (!t.core.hasFocus() && n) {
                var r = t.$win.scrollTop();
                if (t.browser.msie && t.$box && t.$box.css("position", "fixed"), t.browser.msie && t.$wp && t.$wp.css("overflow", "visible"), 
                a(), t.$el.focus(), t.events.trigger("focus"), i(), t.browser.msie && t.$box && t.$box.css("position", ""), 
                t.browser.msie && t.$wp && t.$wp.css("overflow", "auto"), r != t.$win.scrollTop() && t.$win.scrollTop(r), 
                !t.selection.info(t.el).atStart) return !1;
            }
            if (!t.core.hasFocus() || 0 < t.$el.find(".fr-marker").length) return !1;
            if (t.selection.info(t.el).atStart && t.selection.isCollapsed() && null != t.html.defaultTag()) {
                var o = t.markers.insert();
                if (o && !t.node.blockParent(o)) {
                    e(o).remove();
                    var s = t.$el.find(t.html.blockTagsQuery()).get(0);
                    s && (e(s).prepend(e.FE.MARKERS), t.selection.restore());
                } else o && e(o).remove();
            }
        }
        function i() {
            u = !0;
        }
        function a() {
            u = !1;
        }
        function o() {
            return u;
        }
        function s(e, n, r) {
            var i, a = e.split(" ");
            if (1 < a.length) {
                for (var o = 0; o < a.length; o++) s(a[o], n, r);
                return !0;
            }
            void 0 === r && (r = !1), i = 0 !== e.indexOf("shared.") ? h[e] = h[e] || [] : t.shared._events[e] = t.shared._events[e] || [], 
            r ? i.unshift(n) : i.push(n);
        }
        function l(e, n, r, i, a) {
            "function" == typeof r && (a = i, i = r, r = !1);
            var o = a ? t.shared.$_events : m, s = a ? t.sid : t.id;
            r ? e.on(n.split(" ").join(".ed" + s + " ") + ".ed" + s, r, i) : e.on(n.split(" ").join(".ed" + s + " ") + ".ed" + s, i), 
            o.push([ e, n.split(" ").join(".ed" + s + " ") + ".ed" + s ]);
        }
        function d(e) {
            for (var t = 0; t < e.length; t++) e[t][0].off(e[t][1]);
        }
        function c(n, r, i) {
            if (!t.edit.isDisabled() || i) {
                var a, o;
                if (0 !== n.indexOf("shared.")) a = h[n]; else {
                    if (0 < t.shared.count) return !1;
                    a = t.shared._events[n];
                }
                if (a) for (var s = 0; s < a.length; s++) if (!1 === (o = a[s].apply(t, r))) return !1;
                return !1 !== (o = t.$oel.triggerHandler("froalaEditor." + n, e.merge([ t ], r || []))) && o;
            }
        }
        function f() {
            for (var e in h) h.hasOwnProperty(e) && delete h[e];
        }
        function p() {
            for (var e in t.shared._events) t.shared._events.hasOwnProperty(e) && delete t.shared._events[e];
        }
        var u, h = {}, g = !1, m = [];
        return {
            _init: function() {
                t.shared.$_events = t.shared.$_events || [], t.shared._events = {}, t.helpers.isMobile() ? (t._mousedown = "touchstart", 
                t._mouseup = "touchend", t._move = "touchmove", t._mousemove = "touchmove") : (t._mousedown = "mousedown", 
                t._mouseup = "mouseup", t._move = "", t._mousemove = "mousemove"), n(t.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function(e) {
                    c(e.type, [ e ]);
                }), s("mousedown", function() {
                    for (var n = 0; n < e.FE.INSTANCES.length; n++) e.FE.INSTANCES[n] != t && e.FE.INSTANCES[n].popups && e.FE.INSTANCES[n].popups.areVisible() && e.FE.INSTANCES[n].$el.find(".fr-marker").remove();
                }), n(t.$win, t._mousedown, function(e) {
                    c("window.mousedown", [ e ]), i();
                }), n(t.$win, t._mouseup, function(e) {
                    c("window.mouseup", [ e ]);
                }), n(t.$win, "cut copy keydown keyup touchmove touchend", function(e) {
                    c("window." + e.type, [ e ]);
                }), n(t.$doc, "dragend drop", function(e) {
                    c("document." + e.type, [ e ]);
                }), n(t.$el, "keydown keypress keyup input", function(e) {
                    c(e.type, [ e ]);
                }), n(t.$el, "focus", function(e) {
                    o() && (r(!1), !1 === g && c(e.type, [ e ]));
                }), n(t.$el, "blur", function(e) {
                    o() && !0 === g && (c(e.type, [ e ]), i());
                }), s("focus", function() {
                    g = !0;
                }), s("blur", function() {
                    g = !1;
                }), i(), n(t.$el, "cut copy paste beforepaste", function(e) {
                    c(e.type, [ e ]);
                }), s("destroy", f), s("shared.destroy", p);
            },
            on: s,
            trigger: c,
            bindClick: function(n, r, a) {
                l(n, t._mousedown, r, function(n) {
                    var r, i;
                    t.edit.isDisabled() || (i = e((r = n).currentTarget), t.edit.isDisabled() || t.node.hasClass(i.get(0), "fr-disabled") ? r.preventDefault() : "mousedown" === r.type && 1 !== r.which || (t.helpers.isMobile() || r.preventDefault(), 
                    (t.helpers.isAndroid() || t.helpers.isWindowsPhone()) && 0 === i.parents(".fr-dropdown-menu").length && (r.preventDefault(), 
                    r.stopPropagation()), i.addClass("fr-selected"), t.events.trigger("commands.mousedown", [ i ])));
                }, !0), l(n, t._mouseup + " " + t._move, r, function(n) {
                    t.edit.isDisabled() || function(n, r) {
                        var i = e(n.currentTarget);
                        if (t.edit.isDisabled() || t.node.hasClass(i.get(0), "fr-disabled")) return n.preventDefault();
                        if (("mouseup" !== n.type || 1 === n.which) && t.node.hasClass(i.get(0), "fr-selected")) if ("touchmove" != n.type) {
                            if (n.stopPropagation(), n.stopImmediatePropagation(), n.preventDefault(), !t.node.hasClass(i.get(0), "fr-selected")) return t.button.getButtons(".fr-selected", !0).removeClass("fr-selected");
                            if (t.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), i.data("dragging") || i.attr("disabled")) return i.removeData("dragging");
                            var a = i.data("timeout");
                            a && (clearTimeout(a), i.removeData("timeout")), r.apply(t, [ n ]);
                        } else i.data("timeout") || i.data("timeout", setTimeout(function() {
                            i.data("dragging", !0);
                        }, 100));
                    }(n, a);
                }, !0), l(n, "mousedown click mouseup", r, function(e) {
                    t.edit.isDisabled() || e.stopPropagation();
                }, !0), s("window.mouseup", function() {
                    t.edit.isDisabled() || (n.find(r).removeClass("fr-selected"), i());
                });
            },
            disableBlur: a,
            enableBlur: i,
            blurActive: o,
            focus: r,
            chainTrigger: function(n, r, i) {
                if (!t.edit.isDisabled() || i) {
                    var a, o;
                    if (0 !== n.indexOf("shared.")) a = h[n]; else {
                        if (0 < t.shared.count) return !1;
                        a = t.shared._events[n];
                    }
                    if (a) for (var s = 0; s < a.length; s++) void 0 !== (o = a[s].apply(t, [ r ])) && (r = o);
                    return void 0 !== (o = t.$oel.triggerHandler("froalaEditor." + n, e.merge([ t ], [ r ]))) && (r = o), 
                    r;
                }
            },
            $on: l,
            $off: function() {
                d(m), m = [], 0 === t.shared.count && (d(t.shared.$_events), t.shared.$_events = []);
            }
        };
    }, e.FE.MODULES.node = function(t) {
        function n(e) {
            return e && "IFRAME" != e.tagName ? Array.prototype.slice.call(e.childNodes || []) : [];
        }
        function r(t) {
            return !!t && t.nodeType == Node.ELEMENT_NODE && 0 <= e.FE.BLOCK_TAGS.indexOf(t.tagName.toLowerCase());
        }
        function i(e) {
            var t = {}, n = e.attributes;
            if (n) for (var r = 0; r < n.length; r++) {
                var i = n[r];
                t[i.nodeName] = i.value;
            }
            return t;
        }
        function a(e) {
            for (var t = "", n = i(e), r = Object.keys(n).sort(), a = 0; a < r.length; a++) {
                var o = r[a], s = n[o];
                s.indexOf("'") < 0 && 0 <= s.indexOf('"') ? t += " " + o + "='" + s + "'" : 0 <= s.indexOf('"') && 0 <= s.indexOf("'") ? t += " " + o + '="' + (s = s.replace(/"/g, "&quot;")) + '"' : t += " " + o + '="' + s + '"';
            }
            return t;
        }
        function o(e) {
            return e === t.el;
        }
        return {
            isBlock: r,
            isEmpty: function(i, a) {
                if (!i) return !0;
                if (i.querySelector("table")) return !1;
                var o = n(i);
                1 == o.length && r(o[0]) && (o = n(o[0]));
                for (var s = !1, l = 0; l < o.length; l++) {
                    var d = o[l];
                    if (!(a && t.node.hasClass(d, "fr-marker") || d.nodeType == Node.TEXT_NODE && 0 === d.textContent.length)) {
                        if ("BR" != d.tagName && 0 < (d.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) return !1;
                        if (s) return !1;
                        "BR" == d.tagName && (s = !0);
                    }
                }
                return !(i.querySelectorAll(e.FE.VOID_ELEMENTS.join(",")).length - i.querySelectorAll("br").length || i.querySelector(t.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || 1 < i.querySelectorAll(e.FE.BLOCK_TAGS.join(",")).length || i.querySelector(t.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)"));
            },
            blockParent: function(e) {
                for (;e && e.parentNode !== t.el && (!e.parentNode || !t.node.hasClass(e.parentNode, "fr-inner")); ) if (r(e = e.parentNode)) return e;
                return null;
            },
            deepestParent: function(n, i, a) {
                if (void 0 === i && (i = []), void 0 === a && (a = !0), i.push(t.el), 0 <= i.indexOf(n.parentNode) || n.parentNode && t.node.hasClass(n.parentNode, "fr-inner") || n.parentNode && 0 <= e.FE.SIMPLE_ENTER_TAGS.indexOf(n.parentNode.tagName) && a) return null;
                for (;i.indexOf(n.parentNode) < 0 && n.parentNode && !t.node.hasClass(n.parentNode, "fr-inner") && (e.FE.SIMPLE_ENTER_TAGS.indexOf(n.parentNode.tagName) < 0 || !a) && (!r(n) || !r(n.parentNode) || !a); ) n = n.parentNode;
                return n;
            },
            rawAttributes: i,
            attributes: a,
            clearAttributes: function(e) {
                for (var t = e.attributes, n = t.length - 1; 0 <= n; n--) {
                    var r = t[n];
                    e.removeAttribute(r.nodeName);
                }
            },
            openTagString: function(e) {
                return "<" + e.tagName.toLowerCase() + a(e) + ">";
            },
            closeTagString: function(e) {
                return "</" + e.tagName.toLowerCase() + ">";
            },
            isFirstSibling: function e(n, r) {
                void 0 === r && (r = !0);
                for (var i = n.previousSibling; i && r && t.node.hasClass(i, "fr-marker"); ) i = i.previousSibling;
                return !i || i.nodeType == Node.TEXT_NODE && "" === i.textContent && e(i);
            },
            isLastSibling: function e(n, r) {
                void 0 === r && (r = !0);
                for (var i = n.nextSibling; i && r && t.node.hasClass(i, "fr-marker"); ) i = i.nextSibling;
                return !i || i.nodeType == Node.TEXT_NODE && "" === i.textContent && e(i);
            },
            isList: function(e) {
                return !!e && 0 <= [ "UL", "OL" ].indexOf(e.tagName);
            },
            isLink: function(e) {
                return !!e && e.nodeType == Node.ELEMENT_NODE && "a" == e.tagName.toLowerCase();
            },
            isElement: o,
            contents: n,
            isVoid: function(t) {
                return t && t.nodeType == Node.ELEMENT_NODE && 0 <= e.FE.VOID_ELEMENTS.indexOf((t.tagName || "").toLowerCase());
            },
            hasFocus: function(e) {
                return e === t.doc.activeElement && (!t.doc.hasFocus || t.doc.hasFocus()) && !!(o(e) || e.type || e.href || ~e.tabIndex);
            },
            isEditable: function(e) {
                return (!e.getAttribute || "false" != e.getAttribute("contenteditable")) && [ "STYLE", "SCRIPT" ].indexOf(e.tagName) < 0;
            },
            isDeletable: function(e) {
                return e && e.nodeType == Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= (e.getAttribute("class") || "").indexOf("fr-deletable");
            },
            hasClass: function(t, n) {
                return t instanceof e && (t = t.get(0)), t && t.classList && t.classList.contains(n);
            },
            filter: function(e) {
                return t.browser.msie ? e : {
                    acceptNode: e
                };
            }
        };
    }, e.FE.INVISIBLE_SPACE = "&#8203;", e.FE.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">' + e.FE.INVISIBLE_SPACE + "</span>", 
    e.FE.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">' + e.FE.INVISIBLE_SPACE + "</span>", 
    e.FE.MARKERS = e.FE.START_MARKER + e.FE.END_MARKER, e.FE.MODULES.markers = function(t) {
        function n() {
            if (!t.$wp) return null;
            try {
                var n = t.selection.ranges(0), r = n.commonAncestorContainer;
                if (r != t.el && 0 === t.$el.find(r).length) return null;
                var i = n.cloneRange(), a = n.cloneRange();
                i.collapse(!0);
                var o = e('<span class="fr-marker" style="display: none; line-height: 0;">' + e.FE.INVISIBLE_SPACE + "</span>", t.doc)[0];
                if (i.insertNode(o), o = t.$el.find("span.fr-marker").get(0)) {
                    for (var s = o.nextSibling; s && s.nodeType === Node.TEXT_NODE && 0 === s.textContent.length; ) e(s).remove(), 
                    s = t.$el.find("span.fr-marker").get(0).nextSibling;
                    return t.selection.clear(), t.selection.get().addRange(a), o;
                }
                return null;
            } catch (e) {
                console.warn("MARKER", e);
            }
        }
        function r() {
            t.$el.find(".fr-marker").remove();
        }
        return {
            place: function(n, r, i) {
                var a, o, s;
                try {
                    var l = n.cloneRange();
                    if (l.collapse(r), l.insertNode(e('<span class="fr-marker" data-id="' + i + '" data-type="' + r + '" style="display: ' + (t.browser.safari ? "none" : "inline-block") + '; line-height: 0;">' + e.FE.INVISIBLE_SPACE + "</span>", t.doc)[0]), 
                    !0 === r) for (s = (a = t.$el.find('span.fr-marker[data-type="true"][data-id="' + i + '"]').get(0)).nextSibling; s && s.nodeType === Node.TEXT_NODE && 0 === s.textContent.length; ) e(s).remove(), 
                    s = a.nextSibling;
                    if (!0 === r && !n.collapsed) {
                        for (;!t.node.isElement(a.parentNode) && !s; ) e(a.parentNode).after(a), s = a.nextSibling;
                        if (s && s.nodeType === Node.ELEMENT_NODE && t.node.isBlock(s) && "HR" !== s.tagName) {
                            for (o = [ s ]; s = o[0], (o = t.node.contents(s))[0] && t.node.isBlock(o[0]); ) ;
                            e(s).prepend(e(a));
                        }
                    }
                    if (!1 === r && !n.collapsed) {
                        if ((s = (a = t.$el.find('span.fr-marker[data-type="false"][data-id="' + i + '"]').get(0)).previousSibling) && s.nodeType === Node.ELEMENT_NODE && t.node.isBlock(s) && "HR" !== s.tagName) {
                            for (o = [ s ]; s = o[o.length - 1], (o = t.node.contents(s))[o.length - 1] && t.node.isBlock(o[o.length - 1]); ) ;
                            e(s).append(e(a));
                        }
                        a.parentNode && 0 <= [ "TD", "TH" ].indexOf(a.parentNode.tagName) && a.parentNode.previousSibling && !a.previousSibling && e(a.parentNode.previousSibling).append(a);
                    }
                    var d = t.$el.find('span.fr-marker[data-type="' + r + '"][data-id="' + i + '"]').get(0);
                    return d && (d.style.display = "none"), d;
                } catch (e) {
                    return null;
                }
            },
            insert: n,
            split: function() {
                t.selection.isCollapsed() || t.selection.remove();
                var r = t.$el.find(".fr-marker").get(0);
                if (null == r && (r = n()), null == r) return null;
                var i = t.node.deepestParent(r);
                if (i || (i = t.node.blockParent(r)) && "LI" != i.tagName && (i = null), i) if (t.node.isBlock(i) && t.node.isEmpty(i)) "LI" != i.tagName || i.parentNode.firstElementChild != i || t.node.isEmpty(i.parentNode) ? e(i).replaceWith('<span class="fr-marker"></span>') : e(i).append('<span class="fr-marker"></span>'); else if (t.cursor.isAtStart(r, i)) e(i).before('<span class="fr-marker"></span>'), 
                e(r).remove(); else if (t.cursor.isAtEnd(r, i)) e(i).after('<span class="fr-marker"></span>'), 
                e(r).remove(); else {
                    for (var a = r, o = "", s = ""; a = a.parentNode, o += t.node.closeTagString(a), 
                    s = t.node.openTagString(a) + s, a != i; ) ;
                    e(r).replaceWith('<span id="fr-break"></span>');
                    var l = t.node.openTagString(i) + e(i).html() + t.node.closeTagString(i);
                    l = l.replace(/<span id="fr-break"><\/span>/g, o + '<span class="fr-marker"></span>' + s), 
                    e(i).replaceWith(l);
                }
                return t.$el.find(".fr-marker").get(0);
            },
            insertAtPoint: function(e) {
                var i, a = e.clientX, o = e.clientY;
                r();
                var s = null;
                if (void 0 !== t.doc.caretPositionFromPoint ? (i = t.doc.caretPositionFromPoint(a, o), 
                (s = t.doc.createRange()).setStart(i.offsetNode, i.offset), s.setEnd(i.offsetNode, i.offset)) : void 0 !== t.doc.caretRangeFromPoint && (i = t.doc.caretRangeFromPoint(a, o), 
                (s = t.doc.createRange()).setStart(i.startContainer, i.startOffset), s.setEnd(i.startContainer, i.startOffset)), 
                null !== s && void 0 !== t.win.getSelection) {
                    var l = t.win.getSelection();
                    l.removeAllRanges(), l.addRange(s);
                } else if (void 0 !== t.doc.body.createTextRange) try {
                    (s = t.doc.body.createTextRange()).moveToPoint(a, o);
                    var d = s.duplicate();
                    d.moveToPoint(a, o), s.setEndPoint("EndToEnd", d), s.select();
                } catch (e) {
                    return !1;
                }
                n();
            },
            remove: r
        };
    }, e.FE.MODULES.selection = function(t) {
        function n() {
            var e = "";
            return t.win.getSelection ? e = t.win.getSelection() : t.doc.getSelection ? e = t.doc.getSelection() : t.doc.selection && (e = t.doc.selection.createRange().text), 
            e.toString();
        }
        function r() {
            return t.win.getSelection ? t.win.getSelection() : t.doc.getSelection ? t.doc.getSelection() : t.doc.selection.createRange();
        }
        function i(e) {
            var n = r(), i = [];
            if (n && n.getRangeAt && n.rangeCount) {
                i = [];
                for (var a = 0; a < n.rangeCount; a++) i.push(n.getRangeAt(a));
            } else i = t.doc.createRange ? [ t.doc.createRange() ] : [];
            return void 0 !== e ? i[e] : i;
        }
        function a() {
            var e = r();
            try {
                e.removeAllRanges ? e.removeAllRanges() : e.empty ? e.empty() : e.clear && e.clear();
            } catch (e) {}
        }
        function o(e, t) {
            var n = e;
            return n.nodeType == Node.ELEMENT_NODE && 0 < n.childNodes.length && n.childNodes[t] && (n = n.childNodes[t]), 
            n.nodeType == Node.TEXT_NODE && (n = n.parentNode), n;
        }
        function s() {
            if (t.$wp) {
                t.markers.remove();
                var n, r, a = i(), o = [];
                for (r = 0; r < a.length; r++) if (a[r].startContainer !== t.doc || t.browser.msie) {
                    var s = (n = a[r]).collapsed, l = t.markers.place(n, !0, r), d = t.markers.place(n, !1, r);
                    void 0 !== l && l || !s || (e(".fr-marker").remove(), t.selection.setAtEnd(t.el)), 
                    t.el.normalize(), t.browser.safari && !s && ((n = t.doc.createRange()).setStartAfter(l), 
                    n.setEndBefore(d), o.push(n));
                }
                if (t.browser.safari && o.length) for (t.selection.clear(), r = 0; r < o.length; r++) t.selection.get().addRange(o[r]);
            }
        }
        function l() {
            var n, i = t.el.querySelectorAll('.fr-marker[data-type="true"]');
            if (!t.$wp) return t.markers.remove(), !1;
            if (0 === i.length) return !1;
            if (t.browser.msie || t.browser.edge) for (n = 0; n < i.length; n++) i[n].style.display = "inline-block";
            t.core.hasFocus() || t.browser.msie || t.browser.webkit || t.$el.focus(), a();
            var o = r();
            for (n = 0; n < i.length; n++) {
                var s = e(i[n]).data("id"), l = i[n], c = t.doc.createRange(), f = t.$el.find('.fr-marker[data-type="false"][data-id="' + s + '"]');
                (t.browser.msie || t.browser.edge) && f.css("display", "inline-block");
                var p = null;
                if (0 < f.length) {
                    f = f[0];
                    try {
                        for (var u, h = !1, g = l.nextSibling; g && g.nodeType == Node.TEXT_NODE && 0 === g.textContent.length; ) g = (u = g).nextSibling, 
                        e(u).remove();
                        for (var m, v, E = f.nextSibling; E && E.nodeType == Node.TEXT_NODE && 0 === E.textContent.length; ) E = (u = E).nextSibling, 
                        e(u).remove();
                        if (l.nextSibling == f || f.nextSibling == l) {
                            for (var b = l.nextSibling == f ? l : f, T = b == l ? f : l, A = b.previousSibling; A && A.nodeType == Node.TEXT_NODE && 0 === A.length; ) A = (u = A).previousSibling, 
                            e(u).remove();
                            if (A && A.nodeType == Node.TEXT_NODE) for (;A && A.previousSibling && A.previousSibling.nodeType == Node.TEXT_NODE; ) A.previousSibling.textContent = A.previousSibling.textContent + A.textContent, 
                            A = A.previousSibling, e(A.nextSibling).remove();
                            for (var S = T.nextSibling; S && S.nodeType == Node.TEXT_NODE && 0 === S.length; ) S = (u = S).nextSibling, 
                            e(u).remove();
                            if (S && S.nodeType == Node.TEXT_NODE) for (;S && S.nextSibling && S.nextSibling.nodeType == Node.TEXT_NODE; ) S.nextSibling.textContent = S.textContent + S.nextSibling.textContent, 
                            S = S.nextSibling, e(S.previousSibling).remove();
                            if (A && (t.node.isVoid(A) || t.node.isBlock(A)) && (A = null), S && (t.node.isVoid(S) || t.node.isBlock(S)) && (S = null), 
                            A && S && A.nodeType == Node.TEXT_NODE && S.nodeType == Node.TEXT_NODE) {
                                e(l).remove(), e(f).remove();
                                var R = A.textContent.length;
                                A.textContent = A.textContent + S.textContent, e(S).remove(), t.opts.htmlUntouched || t.spaces.normalize(A), 
                                c.setStart(A, R), c.setEnd(A, R), h = !0;
                            } else !A && S && S.nodeType == Node.TEXT_NODE ? (e(l).remove(), e(f).remove(), 
                            t.opts.htmlUntouched || t.spaces.normalize(S), p = e(t.doc.createTextNode("​")), 
                            e(S).before(p), c.setStart(S, 0), c.setEnd(S, 0), h = !0) : !S && A && A.nodeType == Node.TEXT_NODE && (e(l).remove(), 
                            e(f).remove(), t.opts.htmlUntouched || t.spaces.normalize(A), p = e(t.doc.createTextNode("​")), 
                            e(A).after(p), c.setStart(A, A.textContent.length), c.setEnd(A, A.textContent.length), 
                            h = !0);
                        }
                        h || ((t.browser.chrome || t.browser.edge) && l.nextSibling == f ? (m = d(f, c, !0) || c.setStartAfter(f), 
                        v = d(l, c, !1) || c.setEndBefore(l)) : (l.previousSibling == f && (f = (l = f).nextSibling), 
                        f.nextSibling && "BR" === f.nextSibling.tagName || !f.nextSibling && t.node.isBlock(l.previousSibling) || l.previousSibling && "BR" == l.previousSibling.tagName || (l.style.display = "inline", 
                        f.style.display = "inline", p = e(t.doc.createTextNode("​"))), m = d(l, c, !0) || e(l).before(p) && c.setStartBefore(l), 
                        v = d(f, c, !1) || e(f).after(p) && c.setEndAfter(f)), "function" == typeof m && m(), 
                        "function" == typeof v && v());
                    } catch (e) {
                        console.warn("RESTORE RANGE", e);
                    }
                }
                p && p.remove();
                try {
                    o.addRange(c);
                } catch (e) {
                    console.warn("ADD RANGE", e);
                }
            }
            t.markers.remove();
        }
        function d(n, r, i) {
            var a, o = n.previousSibling, s = n.nextSibling;
            return o && s && o.nodeType == Node.TEXT_NODE && s.nodeType == Node.TEXT_NODE ? (a = o.textContent.length, 
            i ? (s.textContent = o.textContent + s.textContent, e(o).remove(), e(n).remove(), 
            t.opts.htmlUntouched || t.spaces.normalize(s), function() {
                r.setStart(s, a);
            }) : (o.textContent = o.textContent + s.textContent, e(s).remove(), e(n).remove(), 
            t.opts.htmlUntouched || t.spaces.normalize(o), function() {
                r.setEnd(o, a);
            })) : o && !s && o.nodeType == Node.TEXT_NODE ? (a = o.textContent.length, i ? (t.opts.htmlUntouched || t.spaces.normalize(o), 
            function() {
                r.setStart(o, a);
            }) : (t.opts.htmlUntouched || t.spaces.normalize(o), function() {
                r.setEnd(o, a);
            })) : !(!s || o || s.nodeType != Node.TEXT_NODE) && (i ? (t.opts.htmlUntouched || t.spaces.normalize(s), 
            function() {
                r.setStart(s, 0);
            }) : (t.opts.htmlUntouched || t.spaces.normalize(s), function() {
                r.setEnd(s, 0);
            }));
        }
        function c() {
            for (var e = i(), t = 0; t < e.length; t++) if (!e[t].collapsed) return !1;
            return !0;
        }
        function f(e) {
            var n, r, i = !1, a = !1;
            if (t.win.getSelection) {
                var o = t.win.getSelection();
                o.rangeCount && ((r = (n = o.getRangeAt(0)).cloneRange()).selectNodeContents(e), 
                r.setEnd(n.startContainer, n.startOffset), i = "" === r.toString(), r.selectNodeContents(e), 
                r.setStart(n.endContainer, n.endOffset), a = "" === r.toString());
            } else t.doc.selection && "Control" != t.doc.selection.type && ((r = (n = t.doc.selection.createRange()).duplicate()).moveToElementText(e), 
            r.setEndPoint("EndToStart", n), i = "" === r.text, r.moveToElementText(e), r.setEndPoint("StartToEnd", n), 
            a = "" === r.text);
            return {
                atStart: i,
                atEnd: a
            };
        }
        function p(n, r) {
            void 0 === r && (r = !0);
            var i = e(n).html();
            i && i.replace(/\u200b/g, "").length != i.length && e(n).html(i.replace(/\u200b/g, ""));
            for (var a = t.node.contents(n), o = 0; o < a.length; o++) a[o].nodeType != Node.ELEMENT_NODE ? e(a[o]).remove() : (p(a[o], 0 === o), 
            0 === o && (r = !1));
            n.nodeType == Node.TEXT_NODE ? e(n).replaceWith('<span data-first="true" data-text="true"></span>') : r && e(n).attr("data-first", !0);
        }
        function u() {
            return 0 === e(this).find("fr-inner").length;
        }
        function h() {
            try {
                if (!t.$wp) return !1;
                for (var e = i(0).commonAncestorContainer; e && !t.node.isElement(e); ) e = e.parentNode;
                return !!t.node.isElement(e);
            } catch (e) {
                return !1;
            }
        }
        function g(n, r) {
            if (!n || 0 < n.getElementsByClassName("fr-marker").length) return !1;
            for (var i = n.firstChild; i && (t.node.isBlock(i) || r && !t.node.isVoid(i) && i.nodeType == Node.ELEMENT_NODE); ) i = (n = i).firstChild;
            n.innerHTML = e.FE.MARKERS + n.innerHTML;
        }
        function m(n, r) {
            if (!n || 0 < n.getElementsByClassName("fr-marker").length) return !1;
            for (var i = n.lastChild; i && (t.node.isBlock(i) || r && !t.node.isVoid(i) && i.nodeType == Node.ELEMENT_NODE); ) i = (n = i).lastChild;
            var a = t.doc.createElement("SPAN");
            a.setAttribute("id", "fr-sel-markers"), a.innerHTML = e.FE.MARKERS, n.appendChild(a);
            var o = n.querySelector("#fr-sel-markers");
            o.outerHTML = o.innerHTML;
        }
        return {
            text: n,
            get: r,
            ranges: i,
            clear: a,
            element: function() {
                var a = r();
                try {
                    if (a.rangeCount) {
                        var o, s = i(0), l = s.startContainer;
                        if (l.nodeType == Node.TEXT_NODE && s.startOffset == (l.textContent || "").length && l.nextSibling && (l = l.nextSibling), 
                        l.nodeType == Node.ELEMENT_NODE) {
                            var d = !1;
                            if (0 < l.childNodes.length && l.childNodes[s.startOffset]) {
                                for (o = l.childNodes[s.startOffset]; o && o.nodeType == Node.TEXT_NODE && 0 === o.textContent.length; ) o = o.nextSibling;
                                if (o && o.textContent.replace(/\u200B/g, "") === n().replace(/\u200B/g, "") && (l = o, 
                                d = !0), !d && 1 < l.childNodes.length && 0 < s.startOffset && l.childNodes[s.startOffset - 1]) {
                                    for (o = l.childNodes[s.startOffset - 1]; o && o.nodeType == Node.TEXT_NODE && 0 === o.textContent.length; ) o = o.nextSibling;
                                    o && o.textContent.replace(/\u200B/g, "") === n().replace(/\u200B/g, "") && (l = o, 
                                    d = !0);
                                }
                            } else !s.collapsed && l.nextSibling && l.nextSibling.nodeType == Node.ELEMENT_NODE && (o = l.nextSibling) && o.textContent.replace(/\u200B/g, "") === n().replace(/\u200B/g, "") && (l = o, 
                            d = !0);
                            !d && 0 < l.childNodes.length && e(l.childNodes[0]).text().replace(/\u200B/g, "") === n().replace(/\u200B/g, "") && [ "BR", "IMG", "HR" ].indexOf(l.childNodes[0].tagName) < 0 && (l = l.childNodes[0]);
                        }
                        for (;l.nodeType != Node.ELEMENT_NODE && l.parentNode; ) l = l.parentNode;
                        for (var c = l; c && "HTML" != c.tagName; ) {
                            if (c == t.el) return l;
                            c = e(c).parent()[0];
                        }
                    }
                } catch (e) {}
                return t.el;
            },
            endElement: function() {
                var a = r();
                try {
                    if (a.rangeCount) {
                        var o, s = i(0), l = s.endContainer;
                        if (l.nodeType == Node.ELEMENT_NODE) {
                            var d = !1;
                            0 < l.childNodes.length && l.childNodes[s.endOffset] && e(l.childNodes[s.endOffset]).text() === n() ? (l = l.childNodes[s.endOffset], 
                            d = !0) : !s.collapsed && l.previousSibling && l.previousSibling.nodeType == Node.ELEMENT_NODE ? (o = l.previousSibling) && o.textContent.replace(/\u200B/g, "") === n().replace(/\u200B/g, "") && (l = o, 
                            d = !0) : !s.collapsed && 0 < l.childNodes.length && l.childNodes[s.endOffset] && (o = l.childNodes[s.endOffset].previousSibling).nodeType == Node.ELEMENT_NODE && o && o.textContent.replace(/\u200B/g, "") === n().replace(/\u200B/g, "") && (l = o, 
                            d = !0), !d && 0 < l.childNodes.length && e(l.childNodes[l.childNodes.length - 1]).text() === n() && [ "BR", "IMG", "HR" ].indexOf(l.childNodes[l.childNodes.length - 1].tagName) < 0 && (l = l.childNodes[l.childNodes.length - 1]);
                        }
                        for (l.nodeType == Node.TEXT_NODE && 0 === s.endOffset && l.previousSibling && l.previousSibling.nodeType == Node.ELEMENT_NODE && (l = l.previousSibling); l.nodeType != Node.ELEMENT_NODE && l.parentNode; ) l = l.parentNode;
                        for (var c = l; c && "HTML" != c.tagName; ) {
                            if (c == t.el) return l;
                            c = e(c).parent()[0];
                        }
                    }
                } catch (e) {}
                return t.el;
            },
            save: s,
            restore: l,
            isCollapsed: c,
            isFull: function() {
                if (c()) return !1;
                t.selection.save();
                var n, r = t.el.querySelectorAll("td, th, img, br");
                for (n = 0; n < r.length; n++) r[n].nextSibling && (r[n].innerHTML = '<span class="fr-mk">' + e.FE.INVISIBLE_SPACE + "</span>" + r[n].innerHTML);
                var i = !1, a = f(t.el);
                for (a.atStart && a.atEnd && (i = !0), r = t.el.querySelectorAll(".fr-mk"), n = 0; n < r.length; n++) r[n].parentNode.removeChild(r[n]);
                return t.selection.restore(), i;
            },
            inEditor: h,
            remove: function() {
                if (c()) return !0;
                var n;
                s();
                var r = t.$el.find('.fr-marker[data-type="true"]');
                for (n = 0; n < r.length; n++) for (var i = r[n]; !(function(t) {
                    for (var n = t.previousSibling; n && n.nodeType == Node.TEXT_NODE && 0 === n.textContent.length; ) {
                        var r = n;
                        n = n.previousSibling, e(r).remove();
                    }
                    return n;
                }(i) || t.node.isBlock(i.parentNode) || t.$el.is(i.parentNode) || t.node.hasClass(i.parentNode, "fr-inner")); ) e(i.parentNode).before(i);
                var a = t.$el.find('.fr-marker[data-type="false"]');
                for (n = 0; n < a.length; n++) {
                    for (var o = a[n]; !(function(t) {
                        for (var n = t.nextSibling; n && n.nodeType == Node.TEXT_NODE && 0 === n.textContent.length; ) {
                            var r = n;
                            n = n.nextSibling, e(r).remove();
                        }
                        return n;
                    }(o) || t.node.isBlock(o.parentNode) || t.$el.is(o.parentNode) || t.node.hasClass(o.parentNode, "fr-inner")); ) e(o.parentNode).after(o);
                    o.parentNode && t.node.isBlock(o.parentNode) && t.node.isEmpty(o.parentNode) && !t.$el.is(o.parentNode) && !t.node.hasClass(o.parentNode, "fr-inner") && t.opts.keepFormatOnDelete && e(o.parentNode).after(o);
                }
                if (function() {
                    for (var n = t.$el.find(".fr-marker"), r = 0; r < n.length; r++) if (e(n[r]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) return !1;
                    return !0;
                }()) {
                    !function n(r, i) {
                        var a = t.node.contents(r.get(0));
                        0 <= [ "TD", "TH" ].indexOf(r.get(0).tagName) && 1 == r.find(".fr-marker").length && t.node.hasClass(a[0], "fr-marker") && r.attr("data-del-cell", !0);
                        for (var o = 0; o < a.length; o++) {
                            var s = a[o];
                            t.node.hasClass(s, "fr-marker") ? i = (i + 1) % 2 : i ? 0 < e(s).find(".fr-marker").length ? i = n(e(s), i) : [ "TD", "TH" ].indexOf(s.tagName) < 0 && !t.node.hasClass(s, "fr-inner") ? !t.opts.keepFormatOnDelete || 0 < t.$el.find("[data-first]").length || t.node.isVoid(s) ? e(s).remove() : p(s) : t.node.hasClass(s, "fr-inner") ? 0 === e(s).find(".fr-inner").length ? e(s).html("<br>") : e(s).find(".fr-inner").filter(u).html("<br>") : (e(s).empty(), 
                            e(s).attr("data-del-cell", !0)) : 0 < e(s).find(".fr-marker").length && (i = n(e(s), i));
                        }
                        return i;
                    }(t.$el, 0);
                    var d = t.$el.find('[data-first="true"]');
                    if (d.length) t.$el.find(".fr-marker").remove(), d.append(e.FE.INVISIBLE_SPACE + e.FE.MARKERS).removeAttr("data-first"), 
                    d.attr("data-text") && d.replaceWith(d.html()); else for (t.$el.find("table").filter(function() {
                        return 0 < e(this).find("[data-del-cell]").length && e(this).find("[data-del-cell]").length == e(this).find("td, th").length;
                    }).remove(), t.$el.find("[data-del-cell]").removeAttr("data-del-cell"), r = t.$el.find('.fr-marker[data-type="true"]'), 
                    n = 0; n < r.length; n++) {
                        var f = r[n], h = f.nextSibling, g = t.$el.find('.fr-marker[data-type="false"][data-id="' + e(f).data("id") + '"]').get(0);
                        if (g) {
                            if (f && (!h || h != g)) {
                                var m = t.node.blockParent(f), v = t.node.blockParent(g), E = !1, b = !1;
                                if (m && 0 <= [ "UL", "OL" ].indexOf(m.tagName) && (E = !(m = null)), v && 0 <= [ "UL", "OL" ].indexOf(v.tagName) && (b = !(v = null)), 
                                e(f).after(g), m != v) if (null != m || E) if (null != v || b || 0 !== e(m).parentsUntil(t.$el, "table").length) m && v && 0 === e(m).parentsUntil(t.$el, "table").length && 0 === e(v).parentsUntil(t.$el, "table").length && 0 === e(m).find(v).length && 0 === e(v).find(m).length && (e(m).append(e(v).html()), 
                                e(v).remove()); else {
                                    for (h = m; !h.nextSibling && h.parentNode != t.el; ) h = h.parentNode;
                                    for (h = h.nextSibling; h && "BR" != h.tagName; ) {
                                        var T = h.nextSibling;
                                        e(m).append(h), h = T;
                                    }
                                    h && "BR" == h.tagName && e(h).remove();
                                } else {
                                    var A = t.node.deepestParent(f);
                                    A ? (e(A).after(e(v).html()), e(v).remove()) : 0 === e(v).parentsUntil(t.$el, "table").length && (e(f).next().after(e(v).html()), 
                                    e(v).remove());
                                }
                            }
                        } else g = e(f).clone().attr("data-type", !1), e(f).after(g);
                    }
                }
                t.opts.keepFormatOnDelete || t.html.fillEmptyBlocks(), t.html.cleanEmptyTags(!0), 
                t.opts.htmlUntouched || (t.clean.lists(), t.spaces.normalize());
                var S = t.$el.find(".fr-marker:last").get(0), R = t.$el.find(".fr-marker:first").get(0);
                void 0 !== S && void 0 !== R && !S.nextSibling && R.previousSibling && "BR" == R.previousSibling.tagName && t.node.isElement(S.parentNode) && t.node.isElement(R.parentNode) && t.$el.append("<br>"), 
                l();
            },
            blocks: function() {
                var n, a = [], s = r();
                if (h() && s.rangeCount) {
                    var l = i();
                    for (n = 0; n < l.length; n++) {
                        var d, c = l[n], f = o(c.startContainer, c.startOffset), p = o(c.endContainer, c.endOffset);
                        (t.node.isBlock(f) || t.node.hasClass(f, "fr-inner")) && a.indexOf(f) < 0 && a.push(f), 
                        (d = t.node.blockParent(f)) && a.indexOf(d) < 0 && a.push(d);
                        for (var u = [], g = f; g !== p && g !== t.el; ) u.indexOf(g) < 0 && g.children && g.children.length ? (u.push(g), 
                        g = g.children[0]) : g.nextSibling ? g = g.nextSibling : g.parentNode && (g = g.parentNode, 
                        u.push(g)), t.node.isBlock(g) && u.indexOf(g) < 0 && a.indexOf(g) < 0 && (g !== p || 0 < c.endOffset) && a.push(g);
                        t.node.isBlock(p) && a.indexOf(p) < 0 && 0 < c.endOffset && a.push(p), (d = t.node.blockParent(p)) && a.indexOf(d) < 0 && a.push(d);
                    }
                }
                for (n = a.length - 1; 0 < n; n--) e(a[n]).find(a).length && a.splice(n, 1);
                return a;
            },
            info: f,
            setAtEnd: m,
            setAtStart: g,
            setBefore: function(n, r) {
                void 0 === r && (r = !0);
                for (var i = n.previousSibling; i && i.nodeType == Node.TEXT_NODE && 0 === i.textContent.length; ) i = i.previousSibling;
                return i ? (t.node.isBlock(i) ? m(i) : "BR" == i.tagName ? e(i).before(e.FE.MARKERS) : e(i).after(e.FE.MARKERS), 
                !0) : !!r && (t.node.isBlock(n) ? g(n) : e(n).before(e.FE.MARKERS), !0);
            },
            setAfter: function(n, r) {
                void 0 === r && (r = !0);
                for (var i = n.nextSibling; i && i.nodeType == Node.TEXT_NODE && 0 === i.textContent.length; ) i = i.nextSibling;
                return i ? (t.node.isBlock(i) ? g(i) : e(i).before(e.FE.MARKERS), !0) : !!r && (t.node.isBlock(n) ? m(n) : e(n).after(e.FE.MARKERS), 
                !0);
            },
            rangeElement: o
        };
    }, e.extend(e.FE.DEFAULTS, {
        htmlAllowedTags: [ "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr" ],
        htmlRemoveTags: [ "script", "style" ],
        htmlAllowedAttrs: [ "accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap" ],
        htmlAllowedStyleProps: [ ".*" ],
        htmlAllowComments: !0,
        htmlUntouched: !1,
        fullPage: !1
    }), e.FE.HTML5Map = {
        B: "STRONG",
        I: "EM",
        STRIKE: "S"
    }, e.FE.MODULES.clean = function(t) {
        function n(e) {
            if (e.nodeType == Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= e.getAttribute("class").indexOf("fr-marker")) return !1;
            var r, i = t.node.contents(e), a = [];
            for (r = 0; r < i.length; r++) i[r].nodeType != Node.ELEMENT_NODE || t.node.isVoid(i[r]) ? i[r].nodeType == Node.TEXT_NODE && (i[r].textContent = i[r].textContent.replace(/\u200b/g, "")) : i[r].textContent.replace(/\u200b/g, "").length != i[r].textContent.length && n(i[r]);
            if (e.nodeType == Node.ELEMENT_NODE && !t.node.isVoid(e) && (e.normalize(), i = t.node.contents(e), 
            a = e.querySelectorAll(".fr-marker"), i.length - a.length == 0)) {
                for (r = 0; r < i.length; r++) if (i[r].nodeType == Node.ELEMENT_NODE && (i[r].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;
                for (r = 0; r < a.length; r++) e.parentNode.insertBefore(a[r].cloneNode(!0), e);
                return e.parentNode.removeChild(e), !1;
            }
        }
        function r(e, n) {
            if (e.nodeType == Node.COMMENT_NODE) return "\x3c!--" + e.nodeValue + "--\x3e";
            if (e.nodeType == Node.TEXT_NODE) return n ? e.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");
            if (e.nodeType != Node.ELEMENT_NODE) return e.outerHTML;
            if (e.nodeType == Node.ELEMENT_NODE && 0 <= [ "STYLE", "SCRIPT", "NOSCRIPT" ].indexOf(e.tagName)) return e.outerHTML;
            if (e.nodeType == Node.ELEMENT_NODE && "svg" == e.tagName) {
                var i = document.createElement("div"), a = e.cloneNode(!0);
                return i.appendChild(a), i.innerHTML;
            }
            if ("IFRAME" == e.tagName) return e.outerHTML.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
            var o = e.childNodes;
            if (0 === o.length) return e.outerHTML;
            for (var s = "", l = 0; l < o.length; l++) "PRE" == e.tagName && (n = !0), s += r(o[l], n);
            return t.node.openTagString(e) + s + t.node.closeTagString(e);
        }
        function i(e) {
            var t = e.replace(/;;/gi, ";");
            return ";" != (t = t.replace(/^;/gi, "")).charAt(t.length) && (t += ";"), t;
        }
        function a(e) {
            var n;
            for (n in e) if (e.hasOwnProperty(n)) {
                var r = n.match(p), a = null;
                "style" == n && t.opts.htmlAllowedStyleProps.length && (a = e[n].match(u)), r && a ? e[n] = i(a.join(";")) : r && ("style" != n || a) || delete e[n];
            }
            for (var o = "", s = Object.keys(e).sort(), l = 0; l < s.length; l++) e[n = s[l]].indexOf('"') < 0 ? o += " " + n + '="' + e[n] + '"' : o += " " + n + "='" + e[n] + "'";
            return o;
        }
        function o(n, i) {
            var a, o = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV");
            e(o).append(n);
            var s = "";
            if (o) {
                var l = t.node.contents(o);
                for (a = 0; a < l.length; a++) i(l[a]);
                for (l = t.node.contents(o), a = 0; a < l.length; a++) s += r(l[a]);
            }
            return s;
        }
        function s(e, n, r) {
            h = [];
            var i = e = e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function(e) {
                return h.push(e), "[FROALA.EDITOR.SCRIPT " + (h.length - 1) + "]";
            }).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function(e) {
                return h.push(e), "[FROALA.EDITOR.NOSCRIPT " + (h.length - 1) + "]";
            }).replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="'), s = null;
            return t.opts.fullPage && (i = t.html.extractNode(e, "body") || (0 <= e.indexOf("<body") ? "" : e), 
            r && (s = t.html.extractNode(e, "head") || "")), i = o(i, n), s && (s = o(s, n)), 
            function(e, n, r) {
                if (t.opts.fullPage) {
                    var i = t.html.extractDoctype(r), o = a(t.html.extractNodeAttrs(r, "html"));
                    return n = null == n ? t.html.extractNode(r, "head") || "<title></title>" : n, i + "<html" + o + "><head" + a(t.html.extractNodeAttrs(r, "head")) + ">" + n + "</head><body" + a(t.html.extractNodeAttrs(r, "body")) + ">" + e + "</body></html>";
                }
                return e;
            }(i, s, e).replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function(e, n) {
                return 0 <= t.opts.htmlRemoveTags.indexOf("script") ? "" : h[parseInt(n, 10)];
            }).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function(e, n) {
                return 0 <= t.opts.htmlRemoveTags.indexOf("noscript") ? "" : h[parseInt(n, 10)].replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
            }).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="');
        }
        function l(e) {
            var n = t.doc.createElement("DIV");
            return n.innerText = e, n.textContent;
        }
        function d(n) {
            for (var r = t.node.contents(n), a = 0; a < r.length; a++) r[a].nodeType != Node.TEXT_NODE && d(r[a]);
            !function(n) {
                if (!("SPAN" == n.tagName && 0 <= (n.getAttribute("class") || "").indexOf("fr-marker"))) {
                    var r, a;
                    if ("PRE" == n.tagName && 0 <= (a = (r = n).innerHTML).indexOf("\n") && (r.innerHTML = a.replace(/\n/g, "<br>")), 
                    n.nodeType == Node.ELEMENT_NODE && (n.getAttribute("data-fr-src") && 0 !== n.getAttribute("data-fr-src").indexOf("blob:") && n.setAttribute("data-fr-src", t.helpers.sanitizeURL(l(n.getAttribute("data-fr-src")))), 
                    n.getAttribute("href") && n.setAttribute("href", t.helpers.sanitizeURL(l(n.getAttribute("href")))), 
                    n.getAttribute("src") && n.setAttribute("src", t.helpers.sanitizeURL(l(n.getAttribute("src")))), 
                    0 <= [ "TABLE", "TBODY", "TFOOT", "TR" ].indexOf(n.tagName) && (n.innerHTML = n.innerHTML.trim())), 
                    !t.opts.pasteAllowLocalImages && n.nodeType == Node.ELEMENT_NODE && "IMG" == n.tagName && n.getAttribute("data-fr-src") && 0 === n.getAttribute("data-fr-src").indexOf("file://")) return n.parentNode.removeChild(n);
                    if (n.nodeType == Node.ELEMENT_NODE && e.FE.HTML5Map[n.tagName] && "" === t.node.attributes(n)) {
                        var o = e.FE.HTML5Map[n.tagName], s = "<" + o + ">" + n.innerHTML + "</" + o + ">";
                        n.insertAdjacentHTML("beforebegin", s), (n = n.previousSibling).parentNode.removeChild(n.nextSibling);
                    }
                    if (t.opts.htmlAllowComments || n.nodeType != Node.COMMENT_NODE) if (n.tagName && n.tagName.match(f)) n.parentNode.removeChild(n); else if (n.tagName && !n.tagName.match(c)) "svg" === n.tagName ? n.parentNode.removeChild(n) : t.browser.safari && "path" == n.tagName && n.parentNode && "svg" == n.parentNode.tagName || (n.outerHTML = n.innerHTML); else {
                        var d = n.attributes;
                        if (d) for (var h = d.length - 1; 0 <= h; h--) {
                            var g = d[h], m = g.nodeName.match(p), v = null;
                            "style" == g.nodeName && t.opts.htmlAllowedStyleProps.length && (v = g.value.match(u)), 
                            m && v ? g.value = i(v.join(";")) : m && ("style" != g.nodeName || v) || n.removeAttribute(g.nodeName);
                        }
                    } else 0 !== n.data.indexOf("[FROALA.EDITOR") && n.parentNode.removeChild(n);
                }
            }(n);
        }
        var c, f, p, u, h = [];
        return {
            _init: function() {
                t.opts.fullPage && e.merge(t.opts.htmlAllowedTags, [ "head", "title", "style", "link", "base", "body", "html", "meta" ]);
            },
            html: function(n, r, i, a) {
                void 0 === r && (r = []), void 0 === i && (i = []), void 0 === a && (a = !1);
                var o, l = e.merge([], t.opts.htmlAllowedTags);
                for (o = 0; o < r.length; o++) 0 <= l.indexOf(r[o]) && l.splice(l.indexOf(r[o]), 1);
                var h = e.merge([], t.opts.htmlAllowedAttrs);
                for (o = 0; o < i.length; o++) 0 <= h.indexOf(i[o]) && h.splice(h.indexOf(i[o]), 1);
                return h.push("data-fr-.*"), h.push("fr-.*"), c = new RegExp("^" + l.join("$|^") + "$", "gi"), 
                p = new RegExp("^" + h.join("$|^") + "$", "gi"), f = new RegExp("^" + t.opts.htmlRemoveTags.join("$|^") + "$", "gi"), 
                u = t.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)" + t.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)") + ":.+?(?=(;)|$))", "gi") : null, 
                n = s(n, d, !0);
            },
            toHTML5: function() {
                var n = t.el.querySelectorAll(Object.keys(e.FE.HTML5Map).join(","));
                if (n.length) {
                    var r = !1;
                    t.el.querySelector(".fr-marker") || (t.selection.save(), r = !0);
                    for (var i = 0; i < n.length; i++) "" === t.node.attributes(n[i]) && e(n[i]).replaceWith("<" + e.FE.HTML5Map[n[i].tagName] + ">" + n[i].innerHTML + "</" + e.FE.HTML5Map[n[i].tagName] + ">");
                    r && t.selection.restore();
                }
            },
            tables: function() {
                !function() {
                    for (var e = t.el.querySelectorAll("tr"), n = 0; n < e.length; n++) {
                        for (var r = e[n].children, i = !0, a = 0; a < r.length; a++) if ("TH" != r[a].tagName) {
                            i = !1;
                            break;
                        }
                        if (!1 !== i && 0 !== r.length) {
                            for (var o = e[n]; o && "TABLE" != o.tagName && "THEAD" != o.tagName; ) o = o.parentNode;
                            var s = o;
                            "THEAD" != s.tagName && (s = t.doc.createElement("THEAD"), o.insertBefore(s, o.firstChild)), 
                            s.appendChild(e[n]);
                        }
                    }
                }();
            },
            lists: function() {
                !function() {
                    var e, n = [];
                    do {
                        if (n.length) {
                            var r = n[0], i = t.doc.createElement("ul");
                            r.parentNode.insertBefore(i, r);
                            do {
                                var a = r;
                                r = r.nextSibling, i.appendChild(a);
                            } while (r && "LI" == r.tagName);
                        }
                        n = [];
                        for (var o = t.el.querySelectorAll("li"), s = 0; s < o.length; s++) e = o[s], t.node.isList(e.parentNode) || n.push(o[s]);
                    } while (0 < n.length);
                }(), function() {
                    for (var e = t.el.querySelectorAll("ol + ol, ul + ul"), n = 0; n < e.length; n++) {
                        var r = e[n];
                        if (t.node.isList(r.previousSibling) && t.node.openTagString(r) == t.node.openTagString(r.previousSibling)) {
                            for (var i = t.node.contents(r), a = 0; a < i.length; a++) r.previousSibling.appendChild(i[a]);
                            r.parentNode.removeChild(r);
                        }
                    }
                }(), function() {
                    for (var n = t.el.querySelectorAll("ul, ol"), r = 0; r < n.length; r++) for (var i = t.node.contents(n[r]), a = null, o = i.length - 1; 0 <= o; o--) "LI" != i[o].tagName ? (a || (a = e("<li>")).insertBefore(i[o]), 
                    a.prepend(i[o])) : a = null;
                }(), function() {
                    var e, n, r;
                    do {
                        n = !1;
                        var i = t.el.querySelectorAll("li:empty");
                        for (e = 0; e < i.length; e++) i[e].parentNode.removeChild(i[e]);
                        var a = t.el.querySelectorAll("ul, ol");
                        for (e = 0; e < a.length; e++) (r = a[e]).querySelector("LI") || (n = !0, r.parentNode.removeChild(r));
                    } while (!0 === n);
                }(), function() {
                    for (var n = t.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), r = 0; r < n.length; r++) {
                        var i = n[r], a = i.previousSibling;
                        a && ("LI" == a.tagName ? a.appendChild(i) : e(i).wrap("<li></li>"));
                    }
                }(), function() {
                    for (var n = t.el.querySelectorAll("li > ul, li > ol"), r = 0; r < n.length; r++) {
                        var i = n[r];
                        if (i.nextSibling) {
                            var a = i.nextSibling, o = e("<li>");
                            e(i.parentNode).after(o);
                            do {
                                var s = a;
                                a = a.nextSibling, o.append(s);
                            } while (a);
                        }
                    }
                }(), function() {
                    for (var n = t.el.querySelectorAll("li > ul, li > ol"), r = 0; r < n.length; r++) {
                        var i = n[r];
                        if (t.node.isFirstSibling(i)) e(i).before("<br/>"); else if (i.previousSibling && "BR" == i.previousSibling.tagName) {
                            for (var a = i.previousSibling.previousSibling; a && t.node.hasClass(a, "fr-marker"); ) a = a.previousSibling;
                            a && "BR" != a.tagName && e(i.previousSibling).remove();
                        }
                    }
                }(), function() {
                    for (var n = t.el.querySelectorAll("li:empty"), r = 0; r < n.length; r++) e(n[r]).remove();
                }();
            },
            invisibleSpaces: function(e) {
                return e.replace(/\u200b/g, "").length == e.length ? e : t.clean.exec(e, n);
            },
            exec: s
        };
    }, e.FE.MODULES.spaces = function(t) {
        function n(n, r) {
            var i = n.previousSibling, a = n.nextSibling, o = n.textContent, s = n.parentNode;
            if (!t.html.isPreformatted(s)) {
                r && (o = o.replace(/[\f\n\r\t\v ]{2,}/g, " "), a && "BR" !== a.tagName && !t.node.isBlock(a) || !(t.node.isBlock(s) || t.node.isLink(s) && !s.nextSibling || t.node.isElement(s)) || (o = o.replace(/[\f\n\r\t\v ]{1,}$/g, "")), 
                i && "BR" !== i.tagName && !t.node.isBlock(i) || !(t.node.isBlock(s) || t.node.isLink(s) && !s.previousSibling || t.node.isElement(s)) || (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), 
                " " === o && (i && t.node.isVoid(i) || a && t.node.isVoid(a)) && (o = "")), (!i && t.node.isBlock(a) || !a && t.node.isBlock(i)) && t.node.isBlock(s) && (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), 
                r || (o = o.replace(new RegExp(e.FE.UNICODE_NBSP, "g"), " "));
                for (var l = "", d = 0; d < o.length; d++) 32 != o.charCodeAt(d) || 0 !== d && 32 != l.charCodeAt(d - 1) ? l += o[d] : l += e.FE.UNICODE_NBSP;
                (!a || a && t.node.isBlock(a) || a && a.nodeType == Node.ELEMENT_NODE && t.win.getComputedStyle(a) && "block" == t.win.getComputedStyle(a).display) && (l = l.replace(/ $/, e.FE.UNICODE_NBSP)), 
                !i || t.node.isVoid(i) || t.node.isBlock(i) || 1 !== (l = l.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== l.charCodeAt(0) || !a || t.node.isVoid(a) || t.node.isBlock(a) || (l = " "), 
                r || (l = l.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2")), n.textContent != l && (n.textContent = l);
            }
        }
        function r(e, r) {
            if (void 0 !== e && e || (e = t.el), void 0 === r && (r = !1), !e.getAttribute || "false" != e.getAttribute("contenteditable")) if (e.nodeType == Node.TEXT_NODE) n(e, r); else if (e.nodeType == Node.ELEMENT_NODE) for (var i = t.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, t.node.filter(function(e) {
                for (var n = e.parentNode; n && n !== t.el; ) {
                    if ("STYLE" == n.tagName || "IFRAME" == n.tagName) return !1;
                    if ("PRE" === n.tagName) return !1;
                    n = n.parentNode;
                }
                return null != e.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !t.node.hasClass(e.parentNode, "fr-marker");
            }), !1); i.nextNode(); ) n(i.currentNode, r);
        }
        return {
            normalize: r,
            normalizeAroundCursor: function() {
                for (var e = [], n = t.el.querySelectorAll(".fr-marker"), i = 0; i < n.length; i++) {
                    for (var a = null, o = t.node.blockParent(n[i]), s = (a = o || n[i]).nextSibling, l = a.previousSibling; s && "BR" == s.tagName; ) s = s.nextSibling;
                    for (;l && "BR" == l.tagName; ) l = l.previousSibling;
                    a && e.indexOf(a) < 0 && e.push(a), l && e.indexOf(l) < 0 && e.push(l), s && e.indexOf(s) < 0 && e.push(s);
                }
                for (var d = 0; d < e.length; d++) r(e[d]);
            }
        };
    }, e.FE.UNICODE_NBSP = String.fromCharCode(160), e.FE.VOID_ELEMENTS = [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ], 
    e.FE.BLOCK_TAGS = [ "address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video" ], 
    e.extend(e.FE.DEFAULTS, {
        htmlAllowedEmptyTags: [ "textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line" ],
        htmlDoNotWrapTags: [ "script", "style" ],
        htmlSimpleAmpersand: !1,
        htmlIgnoreCSSProperties: [],
        htmlExecuteScripts: !0
    }), e.FE.MODULES.html = function(t) {
        function n() {
            return t.opts.enter == e.FE.ENTER_P ? "p" : t.opts.enter == e.FE.ENTER_DIV ? "div" : t.opts.enter == e.FE.ENTER_BR ? null : void 0;
        }
        function r(e, n) {
            return !(!e || e === t.el) && (n ? -1 != [ "PRE", "SCRIPT", "STYLE" ].indexOf(e.tagName) || r(e.parentNode, n) : -1 != [ "PRE", "SCRIPT", "STYLE" ].indexOf(e.tagName));
        }
        function i(n) {
            var r, i = [], o = [];
            if (n) {
                var s = t.el.querySelectorAll(".fr-marker");
                for (r = 0; r < s.length; r++) {
                    var l = t.node.blockParent(s[r]) || s[r];
                    if (l) {
                        var d = l.nextSibling, c = l.previousSibling;
                        l && o.indexOf(l) < 0 && t.node.isBlock(l) && o.push(l), c && t.node.isBlock(c) && o.indexOf(c) < 0 && o.push(c), 
                        d && t.node.isBlock(d) && o.indexOf(d) < 0 && o.push(d);
                    }
                }
            } else o = t.el.querySelectorAll(a());
            var f = a();
            for (f += "," + e.FE.VOID_ELEMENTS.join(","), f += ", .fr-inner", f += "," + t.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)", 
            r = o.length - 1; 0 <= r; r--) if (!(o[r].textContent && 0 < o[r].textContent.replace(/\u200B|\n/g, "").length || 0 < o[r].querySelectorAll(f).length)) {
                for (var p = t.node.contents(o[r]), u = !1, h = 0; h < p.length; h++) if (p[h].nodeType != Node.COMMENT_NODE && p[h].textContent && 0 < p[h].textContent.replace(/\u200B|\n/g, "").length) {
                    u = !0;
                    break;
                }
                u || i.push(o[r]);
            }
            return i;
        }
        function a() {
            return e.FE.BLOCK_TAGS.join(", ");
        }
        function o(n) {
            var r, i, a = e.merge([], e.FE.VOID_ELEMENTS);
            a = e.merge(a, t.opts.htmlAllowedEmptyTags), a = void 0 === n ? e.merge(a, e.FE.BLOCK_TAGS) : e.merge(a, e.FE.NO_DELETE_TAGS), 
            r = t.el.querySelectorAll("*:empty:not(" + a.join("):not(") + "):not(.fr-marker)");
            do {
                i = !1;
                for (var o = 0; o < r.length; o++) 0 !== r[o].attributes.length && void 0 === r[o].getAttribute("href") || (r[o].parentNode.removeChild(r[o]), 
                i = !0);
                r = t.el.querySelectorAll("*:empty:not(" + a.join("):not(") + "):not(.fr-marker)");
            } while (r.length && i);
        }
        function s(e, r) {
            var i = n();
            if (r && (i = "div"), i) {
                for (var a = t.doc.createDocumentFragment(), o = null, s = !1, l = e.firstChild, d = !1; l; ) {
                    var c = l.nextSibling;
                    if (l.nodeType == Node.ELEMENT_NODE && (t.node.isBlock(l) || 0 <= t.opts.htmlDoNotWrapTags.indexOf(l.tagName.toLowerCase()) && !t.node.hasClass(l, "fr-marker"))) o = null, 
                    a.appendChild(l.cloneNode(!0)); else if (l.nodeType != Node.ELEMENT_NODE && l.nodeType != Node.TEXT_NODE) o = null, 
                    a.appendChild(l.cloneNode(!0)); else if ("BR" == l.tagName) null == o ? (o = t.doc.createElement(i), 
                    d = !0, r && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0)), 
                    o.appendChild(l.cloneNode(!0)), a.appendChild(o)) : !1 === s && (o.appendChild(t.doc.createElement("br")), 
                    r && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0))), 
                    o = null; else {
                        var f = l.textContent;
                        (l.nodeType !== Node.TEXT_NODE || 0 < f.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || f.length && f.indexOf("\n") < 0) && (null == o && (o = t.doc.createElement(i), 
                        d = !0, r && o.setAttribute("class", "fr-temp-div"), a.appendChild(o), s = !1), 
                        o.appendChild(l.cloneNode(!0)), s || t.node.hasClass(l, "fr-marker") || l.nodeType == Node.TEXT_NODE && 0 === f.replace(/ /g, "").length || (s = !0));
                    }
                    l = c;
                }
                d && (e.innerHTML = "", e.appendChild(a));
            }
        }
        function l(e, t) {
            for (var n = e.length - 1; 0 <= n; n--) s(e[n], t);
        }
        function d(e, n, r, i, a) {
            if (!t.$wp) return !1;
            void 0 === e && (e = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === i && (i = !1), 
            void 0 === a && (a = !1);
            var o = t.$wp.scrollTop();
            s(t.el, e), i && l(t.el.querySelectorAll(".fr-inner"), e), n && l(t.el.querySelectorAll("td, th"), e), 
            r && l(t.el.querySelectorAll("blockquote"), e), a && l(t.el.querySelectorAll("li"), e), 
            o != t.$wp.scrollTop() && t.$wp.scrollTop(o);
        }
        function c(e) {
            if (void 0 === e && (e = t.el), e && 0 <= [ "SCRIPT", "STYLE", "PRE" ].indexOf(e.tagName)) return !1;
            for (var n = t.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, t.node.filter(function(e) {
                return null != e.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g);
            }), !1); n.nextNode(); ) {
                var i = n.currentNode;
                if (!r(i.parentNode, !0)) {
                    var a = t.node.isBlock(i.parentNode) || t.node.isElement(i.parentNode), o = i.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");
                    if (a) {
                        var s = i.previousSibling, l = i.nextSibling;
                        s && l && " " == o ? o = t.node.isBlock(s) && t.node.isBlock(l) ? "" : " " : (s || (o = o.replace(/^ */, "")), 
                        l || (o = o.replace(/ *$/, "")));
                    }
                    i.textContent = o;
                }
            }
        }
        function f(e, t, n) {
            var r = new RegExp(t, "gi").exec(e);
            return r ? r[n] : null;
        }
        function p(e) {
            var t = e.doctype, n = "<!DOCTYPE html>";
            return t && (n = "<!DOCTYPE " + t.name + (t.publicId ? ' PUBLIC "' + t.publicId + '"' : "") + (!t.publicId && t.systemId ? " SYSTEM" : "") + (t.systemId ? ' "' + t.systemId + '"' : "") + ">"), 
            n;
        }
        function u(n) {
            var r = n.parentNode;
            if (r && (t.node.isBlock(r) || t.node.isElement(r)) && [ "TD", "TH" ].indexOf(r.tagName) < 0) {
                for (var i = n.previousSibling, a = n.nextSibling; i && (i.nodeType == Node.TEXT_NODE && 0 === i.textContent.replace(/\n|\r/g, "").length || t.node.hasClass(i, "fr-tmp")); ) i = i.previousSibling;
                if (a) return !1;
                i && r && "BR" != i.tagName && !t.node.isBlock(i) && !a && 0 < r.textContent.replace(/\u200B/g, "").length && 0 < i.textContent.length && !t.node.hasClass(i, "fr-marker") && (t.el == r && !a && t.opts.enter == e.FE.ENTER_BR && t.browser.msie || n.parentNode.removeChild(n));
            } else !r || t.node.isBlock(r) || t.node.isElement(r) || n.previousSibling || n.nextSibling || !t.node.isDeletable(n.parentNode) || u(n.parentNode);
        }
        function h() {
            t.opts.htmlUntouched || (o(), d(), c(), t.spaces.normalize(null, !0), t.html.fillEmptyBlocks(), 
            t.clean.lists(), t.clean.tables(), t.clean.toHTML5(), t.html.cleanBRs()), t.selection.restore(), 
            g(), t.placeholder.refresh();
        }
        function g() {
            t.node.isEmpty(t.el) && (null != n() ? t.el.querySelector(a()) || t.el.querySelector(t.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || (t.core.hasFocus() ? (t.$el.html("<" + n() + ">" + e.FE.MARKERS + "<br/></" + n() + ">"), 
            t.selection.restore()) : t.$el.html("<" + n() + "><br/></" + n() + ">")) : t.el.querySelector("*:not(.fr-marker):not(br)") || (t.core.hasFocus() ? (t.$el.html(e.FE.MARKERS + "<br/>"), 
            t.selection.restore()) : t.$el.html("<br/>")));
        }
        function m(e, t) {
            return f(e, "<" + t + "[^>]*?>([\\w\\W]*)</" + t + ">", 1);
        }
        function v(n, r) {
            var i = e("<div " + (f(n, "<" + r + "([^>]*?)>", 1) || "") + ">");
            return t.node.rawAttributes(i.get(0));
        }
        function E(e) {
            return (f(e, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ");
        }
        function b(e, n) {
            t.opts.htmlExecuteScripts ? e.html(n) : e.get(0).innerHTML = n;
        }
        function T(e) {
            var t;
            (t = /:not\(([^\)]*)\)/g).test(e) && (e = e.replace(t, "     $1 "));
            var n = 100 * (e.match(/(#[^\s\+>~\.\[:]+)/g) || []).length + 10 * (e.match(/(\[[^\]]+\])/g) || []).length + 10 * (e.match(/(\.[^\s\+>~\.\[:]+)/g) || []).length + 10 * (e.match(/(:[\w-]+\([^\)]*\))/gi) || []).length + 10 * (e.match(/(:[^\s\+>~\.\[:]+)/g) || []).length + (e.match(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length;
            return n += ((e = (e = e.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " ")).match(/([^\s\+>~\.\[:]+)/g) || []).length;
        }
        function A(e) {
            if (t.events.trigger("html.processGet", [ e ]), e && e.getAttribute && "" === e.getAttribute("class") && e.removeAttribute("class"), 
            e && e.getAttribute && "" === e.getAttribute("style") && e.removeAttribute("style"), 
            e && e.nodeType == Node.ELEMENT_NODE) {
                var n, r = e.querySelectorAll('[class=""],[style=""]');
                for (n = 0; n < r.length; n++) {
                    var i = r[n];
                    "" === i.getAttribute("class") && i.removeAttribute("class"), "" === i.getAttribute("style") && i.removeAttribute("style");
                }
                if ("BR" === e.tagName) u(e); else {
                    var a = e.querySelectorAll("br");
                    for (n = 0; n < a.length; n++) u(a[n]);
                }
            }
        }
        function S(e, t) {
            return e[3] - t[3];
        }
        function R(e) {
            var n = t.doc.createElement("div");
            return n.innerHTML = e, null !== n.querySelector(a());
        }
        function C(n) {
            var r = null;
            if (void 0 === n && (r = t.selection.element()), t.opts.keepFormatOnDelete) return !1;
            var i, a, o = r ? (r.textContent.match(/\u200B/g) || []).length - r.querySelectorAll(".fr-marker").length : 0;
            if ((t.el.textContent.match(/\u200B/g) || []).length - t.el.querySelectorAll(".fr-marker").length == o) return !1;
            do {
                a = !1, i = t.el.querySelectorAll("*:not(.fr-marker)");
                for (var s = 0; s < i.length; s++) {
                    var l = i[s];
                    if (r != l) {
                        var d = l.textContent;
                        0 === l.children.length && 1 === d.length && 8203 == d.charCodeAt(0) && "TD" !== l.tagName && (e(l).remove(), 
                        a = !0);
                    }
                }
            } while (a);
        }
        return {
            defaultTag: n,
            isPreformatted: r,
            emptyBlocks: i,
            emptyBlockTagsQuery: function() {
                return e.FE.BLOCK_TAGS.join(":empty, ") + ":empty";
            },
            blockTagsQuery: a,
            fillEmptyBlocks: function(n) {
                for (var r = i(n), a = 0; a < r.length; a++) {
                    var o = r[a];
                    "false" === o.getAttribute("contenteditable") || o.querySelector(t.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || t.node.isVoid(o) || "TABLE" != o.tagName && "TBODY" != o.tagName && "TR" != o.tagName && "UL" != o.tagName && "OL" != o.tagName && o.appendChild(t.doc.createElement("br"));
                }
                if (t.browser.msie && t.opts.enter == e.FE.ENTER_BR) {
                    var s = t.node.contents(t.el);
                    s.length && s[s.length - 1].nodeType == Node.TEXT_NODE && t.$el.append("<br>");
                }
            },
            cleanEmptyTags: o,
            cleanWhiteTags: C,
            cleanBlankSpaces: c,
            blocks: function() {
                return t.$el.get(0).querySelectorAll(a());
            },
            getDoctype: p,
            set: function(n) {
                var r, i, a, o = t.clean.html((n || "").trim(), [], [], t.opts.fullPage);
                if (t.opts.fullPage) {
                    var s = m(o, "body") || (0 <= o.indexOf("<body") ? "" : o), l = v(o, "body"), d = m(o, "head") || "<title></title>", c = v(o, "head"), f = e("<div>").append(d).contents().each(function() {
                        (this.nodeType == Node.COMMENT_NODE || 0 <= [ "BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE" ].indexOf(this.tagName)) && this.parentNode.removeChild(this);
                    }).end().html().trim();
                    d = e("<div>").append(d).contents().map(function() {
                        return this.nodeType == Node.COMMENT_NODE ? "\x3c!--" + this.nodeValue + "--\x3e" : 0 <= [ "BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE" ].indexOf(this.tagName) ? this.outerHTML : "";
                    }).toArray().join("");
                    var p = E(o), u = v(o, "html");
                    b(t.$el, f + "\n" + s), t.node.clearAttributes(t.el), t.$el.attr(l), t.$el.addClass("fr-view"), 
                    t.$el.attr("spellcheck", t.opts.spellcheck), t.$el.attr("dir", t.opts.direction), 
                    b(t.$head, d), t.node.clearAttributes(t.$head.get(0)), t.$head.attr(c), t.node.clearAttributes(t.$html.get(0)), 
                    t.$html.attr(u), t.iframe_document.doctype.parentNode.replaceChild((r = p, i = t.iframe_document, 
                    (a = r.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i)) ? i.implementation.createDocumentType(a[1], a[3], a[4]) : i.implementation.createDocumentType("html")), t.iframe_document.doctype);
                } else b(t.$el, o);
                var g = t.edit.isDisabled();
                t.edit.on(), t.core.injectStyle(t.opts.iframeDefaultStyle + t.opts.iframeStyle), 
                h(), t.opts.useClasses || (t.$el.find("[fr-original-class]").each(function() {
                    this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class");
                }), t.$el.find("[fr-original-style]").each(function() {
                    this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style");
                })), g && t.edit.off(), t.events.trigger("html.set");
            },
            get: function(e, n) {
                if (!t.$wp) return t.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
                var r = "";
                t.events.trigger("html.beforeGet");
                var i, a, o = [], s = {}, l = [], d = t.el.querySelectorAll("input, textarea");
                for (i = 0; i < d.length; i++) d[i].setAttribute("value", d[i].value);
                if (!t.opts.useClasses && !n) {
                    var c = new RegExp("^" + t.opts.htmlIgnoreCSSProperties.join("$|^") + "$", "gi");
                    for (i = 0; i < t.doc.styleSheets.length; i++) {
                        var f, u = 0;
                        try {
                            f = t.doc.styleSheets[i].cssRules, t.doc.styleSheets[i].ownerNode && "STYLE" == t.doc.styleSheets[i].ownerNode.nodeType && (u = 1);
                        } catch (e) {}
                        if (f) for (var h = 0, g = f.length; h < g; h++) if (f[h].selectorText && 0 < f[h].style.cssText.length) {
                            var m, v = f[h].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":");
                            try {
                                m = t.el.querySelectorAll(v);
                            } catch (e) {
                                m = [];
                            }
                            for (a = 0; a < m.length; a++) {
                                !m[a].getAttribute("fr-original-style") && m[a].getAttribute("style") ? (m[a].setAttribute("fr-original-style", m[a].getAttribute("style")), 
                                o.push(m[a])) : m[a].getAttribute("fr-original-style") || (m[a].setAttribute("fr-original-style", ""), 
                                o.push(m[a])), s[m[a]] || (s[m[a]] = {});
                                for (var E = 1e3 * u + T(f[h].selectorText), b = f[h].style.cssText.split(";"), R = 0; R < b.length; R++) {
                                    var C = b[R].trim().split(":")[0];
                                    if (C && !C.match(c) && (s[m[a]][C] || (s[m[a]][C] = 0) <= (m[a].getAttribute("fr-original-style") || "").indexOf(C + ":") && (s[m[a]][C] = 1e4), 
                                    E >= s[m[a]][C] && (s[m[a]][C] = E, b[R].trim().length))) {
                                        var y = b[R].trim().split(":");
                                        y.splice(0, 1), l.push([ m[a], C.trim(), y.join(":").trim(), E ]);
                                    }
                                }
                            }
                        }
                    }
                    for (l.sort(S), i = 0; i < l.length; i++) {
                        var _ = l[i];
                        _[0].style[_[1]] = _[2];
                    }
                    for (i = 0; i < o.length; i++) if (o[i].getAttribute("class") && (o[i].setAttribute("fr-original-class", o[i].getAttribute("class")), 
                    o[i].removeAttribute("class")), 0 < (o[i].getAttribute("fr-original-style") || "").trim().length) {
                        var L = o[i].getAttribute("fr-original-style").split(";");
                        for (a = 0; a < L.length; a++) if (0 < L[a].indexOf(":")) {
                            var x = L[a].split(":"), N = x[0];
                            x.splice(0, 1), o[i].style[N.trim()] = x.join(":").trim();
                        }
                    }
                }
                if (t.node.isEmpty(t.el)) t.opts.fullPage && (r = p(t.iframe_document), r += "<html" + t.node.attributes(t.$html.get(0)) + ">" + t.$html.find("head").get(0).outerHTML + "<body></body></html>"); else if (void 0 === e && (e = !1), 
                t.opts.fullPage) {
                    r = p(t.iframe_document), t.$el.removeClass("fr-view");
                    var w = t.opts.heightMin;
                    t.opts.heightMin = null, t.size.refresh(), r += "<html" + t.node.attributes(t.$html.get(0)) + ">" + t.$html.html() + "</html>", 
                    t.opts.heightMin = w, t.size.refresh(), t.$el.addClass("fr-view");
                } else r = t.$el.html();
                if (!t.opts.useClasses && !n) for (i = 0; i < o.length; i++) o[i].getAttribute("fr-original-class") && (o[i].setAttribute("class", o[i].getAttribute("fr-original-class")), 
                o[i].removeAttribute("fr-original-class")), null != o[i].getAttribute("fr-original-style") && void 0 !== o[i].getAttribute("fr-original-style") ? (0 !== o[i].getAttribute("fr-original-style").length ? o[i].setAttribute("style", o[i].getAttribute("fr-original-style")) : o[i].removeAttribute("style"), 
                o[i].removeAttribute("fr-original-style")) : o[i].removeAttribute("style");
                t.opts.fullPage && (r = (r = (r = (r = (r = (r = (r = (r = r.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), 
                t.opts.htmlSimpleAmpersand && (r = r.replace(/\&amp;/gi, "&")), t.events.trigger("html.afterGet"), 
                e || (r = r.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), 
                r = t.clean.invisibleSpaces(r), r = t.clean.exec(r, A);
                var O = t.events.chainTrigger("html.get", r);
                return "string" == typeof O && (r = O), r = r.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function(e) {
                    return e.replace(/<br>/g, "\n");
                });
            },
            getSelected: function() {
                var n, r, i = "";
                if (void 0 !== t.win.getSelection) {
                    t.browser.mozilla && (t.selection.save(), 1 < t.$el.find('.fr-marker[data-type="false"]').length && (t.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), 
                    t.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), t.$el.find(".fr-marker").not('[data-id="0"]').remove()), 
                    t.selection.restore());
                    for (var a = t.selection.ranges(), o = 0; o < a.length; o++) {
                        var s = document.createElement("div");
                        s.appendChild(a[o].cloneContents()), function(n, r) {
                            for (;r && (r.nodeType == Node.TEXT_NODE || !t.node.isBlock(r)) && !t.node.isElement(r) && !t.node.hasClass(r, "fr-inner"); ) r && r.nodeType != Node.TEXT_NODE && e(n).wrapInner(t.node.openTagString(r) + t.node.closeTagString(r)), 
                            r = r.parentNode;
                            r && n.innerHTML == r.innerHTML && (n.innerHTML = r.outerHTML);
                        }(s, (r = n = void 0, r = null, t.win.getSelection ? (n = t.win.getSelection()) && n.rangeCount && (r = n.getRangeAt(0).commonAncestorContainer).nodeType != Node.ELEMENT_NODE && (r = r.parentNode) : (n = t.doc.selection) && "Control" != n.type && (r = n.createRange().parentElement()), 
                        null != r && (0 <= e.inArray(t.el, e(r).parents()) || r == t.el) ? r : null)), 0 < e(s).find(".fr-element").length && (s = t.el), 
                        i += s.innerHTML;
                    }
                } else void 0 !== t.doc.selection && "Text" == t.doc.selection.type && (i = t.doc.selection.createRange().htmlText);
                return i;
            },
            insert: function(n, r, i) {
                var a, o, s;
                if (t.selection.isCollapsed() || t.selection.remove(), a = r ? n : t.clean.html(n), 
                n.indexOf('class="fr-marker"') < 0 && (o = a, (s = t.doc.createElement("div")).innerHTML = o, 
                t.selection.setAtEnd(s), a = s.innerHTML), t.node.isEmpty(t.el) && !t.opts.keepFormatOnDelete && R(a)) t.el.innerHTML = a; else {
                    var l = t.markers.insert();
                    if (l) {
                        t.node.isLastSibling(l) && e(l).parent().hasClass("fr-deletable") && e(l).insertAfter(e(l).parent());
                        var d = t.node.blockParent(l);
                        if ((R(a) || i) && (t.node.deepestParent(l) || d && "LI" == d.tagName)) {
                            if (d && "LI" == d.tagName && (a = function(n) {
                                if (!t.html.defaultTag()) return n;
                                var r = t.doc.createElement("div");
                                r.innerHTML = n;
                                for (var i = r.querySelectorAll(":scope > " + t.html.defaultTag()), a = i.length - 1; 0 <= a; a--) {
                                    var o = i[a];
                                    t.node.isBlock(o.previousSibling) || (o.previousSibling && !t.node.isEmpty(o) && e("<br>").insertAfter(o.previousSibling), 
                                    o.outerHTML = o.innerHTML);
                                }
                                return r.innerHTML;
                            }(a)), !(l = t.markers.split())) return !1;
                            l.outerHTML = a;
                        } else l.outerHTML = a;
                    } else t.el.innerHTML = t.el.innerHTML + a;
                }
                h(), t.keys.positionCaret(), t.events.trigger("html.inserted");
            },
            wrap: d,
            unwrap: function() {
                t.$el.find("div.fr-temp-div").each(function() {
                    this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE && e(this).before("<br>"), 
                    e(this).attr("data-empty") || !this.nextSibling || t.node.isBlock(this.nextSibling) && !e(this.nextSibling).hasClass("fr-temp-div") ? e(this).replaceWith(e(this).html()) : e(this).replaceWith(e(this).html() + "<br>");
                }), t.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function() {
                    return "" === e(this).attr("class");
                }).removeAttr("class");
            },
            escapeEntities: function(e) {
                return e.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;");
            },
            checkIfEmpty: g,
            extractNode: m,
            extractNodeAttrs: v,
            extractDoctype: E,
            cleanBRs: function() {
                for (var e = t.el.getElementsByTagName("br"), n = 0; n < e.length; n++) u(e[n]);
            },
            _init: function() {
                if (t.$wp) {
                    var e = function() {
                        C(), t.placeholder && setTimeout(t.placeholder.refresh, 0);
                    };
                    t.events.on("mouseup", e), t.events.on("keydown", e), t.events.on("contentChanged", g);
                }
            }
        };
    }, e.extend(e.FE.DEFAULTS, {
        height: null,
        heightMax: null,
        heightMin: null,
        width: null
    }), e.FE.MODULES.size = function(e) {
        function t() {
            n(), e.opts.height && e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom"))), 
            e.$iframe.height(e.$el.outerHeight(!0));
        }
        function n() {
            e.opts.heightMin ? e.$el.css("minHeight", e.opts.heightMin) : e.$el.css("minHeight", ""), 
            e.opts.heightMax ? (e.$wp.css("maxHeight", e.opts.heightMax), e.$wp.css("overflow", "auto")) : (e.$wp.css("maxHeight", ""), 
            e.$wp.css("overflow", "")), e.opts.height ? (e.$wp.height(e.opts.height), e.$wp.css("overflow", "auto"), 
            e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom")))) : (e.$wp.css("height", ""), 
            e.opts.heightMin || e.$el.css("minHeight", ""), e.opts.heightMax || e.$wp.css("overflow", "")), 
            e.opts.width && e.$box.width(e.opts.width);
        }
        return {
            _init: function() {
                if (!e.$wp) return !1;
                n(), e.$iframe && (e.events.on("keyup keydown", function() {
                    setTimeout(t, 0);
                }, !0), e.events.on("commands.after html.set init initialized paste.after", t));
            },
            syncIframe: t,
            refresh: n
        };
    }, e.extend(e.FE.DEFAULTS, {
        language: null
    }), e.FE.LANGUAGE = {}, e.FE.MODULES.language = function(t) {
        var n;
        return {
            _init: function() {
                e.FE.LANGUAGE && (n = e.FE.LANGUAGE[t.opts.language]), n && n.direction && (t.opts.direction = n.direction);
            },
            translate: function(e) {
                return n && n.translation[e] && n.translation[e].length ? n.translation[e] : e;
            }
        };
    }, e.extend(e.FE.DEFAULTS, {
        placeholderText: "Type something"
    }), e.FE.MODULES.placeholder = function(t) {
        function n() {
            t.$placeholder || (t.$placeholder = e('<span class="fr-placeholder"></span>'), t.$wp.append(t.$placeholder));
            var n = t.opts.iframe ? t.$iframe.prev().outerHeight(!0) : t.$el.prev().outerHeight(!0), r = 0, i = 0, a = 0, o = 0, s = 0, l = 0, d = t.node.contents(t.el), c = e(t.selection.element()).css("text-align");
            if (d.length && d[0].nodeType == Node.ELEMENT_NODE) {
                var f = e(d[0]);
                (!t.opts.toolbarInline || 0 < t.$el.prev().length) && t.ready && (r = t.helpers.getPX(f.css("margin-top")), 
                o = t.helpers.getPX(f.css("padding-top")), i = t.helpers.getPX(f.css("margin-left")), 
                a = t.helpers.getPX(f.css("margin-right")), s = t.helpers.getPX(f.css("padding-left")), 
                l = t.helpers.getPX(f.css("padding-right"))), t.$placeholder.css("font-size", f.css("font-size")), 
                t.$placeholder.css("line-height", f.css("line-height"));
            } else t.$placeholder.css("font-size", t.$el.css("font-size")), t.$placeholder.css("line-height", t.$el.css("line-height"));
            t.$wp.addClass("show-placeholder"), t.$placeholder.css({
                marginTop: Math.max(t.helpers.getPX(t.$el.css("margin-top")), r) + (n || 0),
                paddingTop: Math.max(t.helpers.getPX(t.$el.css("padding-top")), o),
                paddingLeft: Math.max(t.helpers.getPX(t.$el.css("padding-left")), s),
                marginLeft: Math.max(t.helpers.getPX(t.$el.css("margin-left")), i),
                paddingRight: Math.max(t.helpers.getPX(t.$el.css("padding-right")), l),
                marginRight: Math.max(t.helpers.getPX(t.$el.css("margin-right")), a),
                textAlign: c
            }).text(t.language.translate(t.opts.placeholderText || t.$oel.attr("placeholder") || "")), 
            t.$placeholder.html(t.$placeholder.text().replace(/\n/g, "<br>"));
        }
        function r() {
            t.$wp.removeClass("show-placeholder");
        }
        function i() {
            if (!t.$wp) return !1;
            t.core.isEmpty() ? n() : r();
        }
        return {
            _init: function() {
                if (!t.$wp) return !1;
                t.events.on("init input keydown keyup contentChanged initialized", i);
            },
            show: n,
            hide: r,
            refresh: i,
            isVisible: function() {
                return !t.$wp || t.node.hasClass(t.$wp.get(0), "show-placeholder");
            }
        };
    }, e.FE.MODULES.edit = function(e) {
        function t() {
            if (e.browser.mozilla) try {
                e.doc.execCommand("enableObjectResizing", !1, "false"), e.doc.execCommand("enableInlineTableEditing", !1, "false");
            } catch (e) {}
            if (e.browser.msie) try {
                e.doc.body.addEventListener("mscontrolselect", function(e) {
                    return e.preventDefault(), !1;
                });
            } catch (e) {}
        }
        function n() {
            return r;
        }
        var r = !1;
        return {
            _init: function() {
                e.events.on("focus", function() {
                    n() ? e.edit.off() : e.edit.on();
                });
            },
            on: function() {
                e.$wp ? (e.$el.attr("contenteditable", !0), e.$el.removeClass("fr-disabled").attr("aria-disabled", !1), 
                e.$tb && e.$tb.removeClass("fr-disabled").removeAttr("aria-disabled"), t()) : e.$el.is("a") && e.$el.attr("contenteditable", !0), 
                r = !1;
            },
            off: function() {
                e.events.disableBlur(), e.$wp ? (e.$el.attr("contenteditable", !1), e.$el.addClass("fr-disabled").attr("aria-disabled", !0), 
                e.$tb && e.$tb.addClass("fr-disabled").attr("aria-disabled", !0)) : e.$el.is("a") && e.$el.attr("contenteditable", !1), 
                e.events.enableBlur(), r = !0;
            },
            disableDesign: t,
            isDisabled: n
        };
    }, e.extend(e.FE.DEFAULTS, {
        editorClass: null,
        typingTimer: 500,
        iframe: !1,
        requestWithCORS: !0,
        requestWithCredentials: !1,
        requestHeaders: {},
        useClasses: !0,
        spellcheck: !0,
        iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}',
        iframeStyle: "",
        iframeStyleFiles: [],
        direction: "auto",
        zIndex: 1,
        tabIndex: null,
        disableRightClick: !1,
        scrollableContainer: "body",
        keepFormatOnDelete: !1,
        theme: null
    }), e.FE.MODULES.core = function(t) {
        function n() {
            if (t.$box.addClass("fr-box" + (t.opts.editorClass ? " " + t.opts.editorClass : "")), 
            t.$box.attr("role", "application"), t.$wp.addClass("fr-wrapper"), t.opts.iframe || t.$el.addClass("fr-element fr-view"), 
            t.opts.iframe) {
                t.$iframe.addClass("fr-iframe"), t.$el.addClass("fr-view");
                for (var e = 0; e < t.o_doc.styleSheets.length; e++) {
                    var n;
                    try {
                        n = t.o_doc.styleSheets[e].cssRules;
                    } catch (e) {}
                    if (n) for (var r = 0, i = n.length; r < i; r++) !n[r].selectorText || 0 !== n[r].selectorText.indexOf(".fr-view") && 0 !== n[r].selectorText.indexOf(".fr-element") || 0 < n[r].style.cssText.length && (0 === n[r].selectorText.indexOf(".fr-view") ? t.opts.iframeStyle += n[r].selectorText.replace(/\.fr-view/g, "body") + "{" + n[r].style.cssText + "}" : t.opts.iframeStyle += n[r].selectorText.replace(/\.fr-element/g, "body") + "{" + n[r].style.cssText + "}");
                }
            }
            "auto" != t.opts.direction && t.$box.removeClass("fr-ltr fr-rtl").addClass("fr-" + t.opts.direction), 
            t.$el.attr("dir", t.opts.direction), t.$wp.attr("dir", t.opts.direction), 1 < t.opts.zIndex && t.$box.css("z-index", t.opts.zIndex), 
            t.opts.theme && t.$box.addClass(t.opts.theme + "-theme"), t.opts.tabIndex = t.opts.tabIndex || t.$oel.attr("tabIndex"), 
            t.opts.tabIndex && t.$el.attr("tabIndex", t.opts.tabIndex);
        }
        return {
            _init: function() {
                if (e.FE.INSTANCES.push(t), t.drag_support = {
                    filereader: "undefined" != typeof FileReader,
                    formdata: !!t.win.FormData,
                    progress: "upload" in new XMLHttpRequest()
                }, t.$wp) {
                    n(), t.html.set(t._original_html), t.$el.attr("spellcheck", t.opts.spellcheck), 
                    t.helpers.isMobile() && (t.$el.attr("autocomplete", t.opts.spellcheck ? "on" : "off"), 
                    t.$el.attr("autocorrect", t.opts.spellcheck ? "on" : "off"), t.$el.attr("autocapitalize", t.opts.spellcheck ? "on" : "off")), 
                    t.opts.disableRightClick && t.events.$on(t.$el, "contextmenu", function(e) {
                        if (2 == e.button) return !1;
                    });
                    try {
                        t.doc.execCommand("styleWithCSS", !1, !1);
                    } catch (e) {}
                }
                "TEXTAREA" == t.$oel.get(0).tagName && (t.events.on("contentChanged", function() {
                    t.$oel.val(t.html.get());
                }), t.events.on("form.submit", function() {
                    t.$oel.val(t.html.get());
                }), t.events.on("form.reset", function() {
                    t.html.set(t._original_html);
                }), t.$oel.val(t.html.get())), t.helpers.isIOS() && t.events.$on(t.$doc, "selectionchange", function() {
                    t.$doc.get(0).hasFocus() || t.$win.get(0).focus();
                }), t.events.trigger("init"), t.opts.autofocus && !t.opts.initOnClick && t.$wp && t.events.on("initialized", function() {
                    t.events.focus(!0);
                });
            },
            destroy: function(e) {
                "TEXTAREA" == t.$oel.get(0).tagName && t.$oel.val(e), t.$box && t.$box.removeAttr("role"), 
                t.$wp && ("TEXTAREA" == t.$oel.get(0).tagName ? (t.$el.html(""), t.$wp.html(""), 
                t.$box.replaceWith(t.$oel), t.$oel.show()) : (t.$wp.replaceWith(e), t.$el.html(""), 
                t.$box.removeClass("fr-view fr-ltr fr-box " + (t.opts.editorClass || "")), t.opts.theme && t.$box.addClass(t.opts.theme + "-theme"))), 
                this.$wp = null, this.$el = null, this.el = null, this.$box = null;
            },
            isEmpty: function() {
                return t.node.isEmpty(t.el);
            },
            getXHR: function(e, n) {
                var r = new XMLHttpRequest();
                for (var i in r.open(n, e, !0), t.opts.requestWithCredentials && (r.withCredentials = !0), 
                t.opts.requestHeaders) t.opts.requestHeaders.hasOwnProperty(i) && r.setRequestHeader(i, t.opts.requestHeaders[i]);
                return r;
            },
            injectStyle: function(n) {
                if (t.opts.iframe) {
                    t.$head.find("style[data-fr-style], link[data-fr-style]").remove(), t.$head.append('<style data-fr-style="true">' + n + "</style>");
                    for (var r = 0; r < t.opts.iframeStyleFiles.length; r++) {
                        var i = e('<link data-fr-style="true" rel="stylesheet" href="' + t.opts.iframeStyleFiles[r] + '">');
                        i.get(0).addEventListener("load", t.size.syncIframe), t.$head.append(i);
                    }
                }
            },
            hasFocus: function() {
                return t.browser.mozilla && t.helpers.isMobile() ? t.selection.inEditor() : t.node.hasFocus(t.el) || 0 < t.$el.find("*:focus").length;
            },
            sameInstance: function(e) {
                if (!e) return !1;
                var n = e.data("instance");
                return !!n && n.id == t.id;
            }
        };
    }, e.FE.MODULES.cursorLists = function(t) {
        function n(e) {
            for (var t = e; "LI" != t.tagName; ) t = t.parentNode;
            return t;
        }
        function r(e) {
            for (var n = e; !t.node.isList(n); ) n = n.parentNode;
            return n;
        }
        return {
            _startEnter: function(i) {
                var a, o = n(i), s = o.nextSibling, l = o.previousSibling, d = t.html.defaultTag();
                if (t.node.isEmpty(o, !0) && s) {
                    for (var c = "", f = "", p = i.parentNode; !t.node.isList(p) && p.parentNode && "LI" !== p.parentNode.tagName; ) c = t.node.openTagString(p) + c, 
                    f += t.node.closeTagString(p), p = p.parentNode;
                    c = t.node.openTagString(p) + c, f += t.node.closeTagString(p);
                    var u = "";
                    for (u = p.parentNode && "LI" == p.parentNode.tagName ? f + "<li>" + e.FE.MARKERS + "<br>" + c : d ? f + "<" + d + ">" + e.FE.MARKERS + "<br></" + d + ">" + c : f + e.FE.MARKERS + "<br>" + c, 
                    e(o).html('<span id="fr-break"></span>'); [ "UL", "OL" ].indexOf(p.tagName) < 0 || p.parentNode && "LI" === p.parentNode.tagName; ) p = p.parentNode;
                    var h = t.node.openTagString(p) + e(p).html() + t.node.closeTagString(p);
                    h = h.replace(/<span id="fr-break"><\/span>/g, u), e(p).replaceWith(h), t.$el.find("li:empty").remove();
                } else if (l && s || !t.node.isEmpty(o, !0)) {
                    for (var g = "<br>", m = i.parentNode; m && "LI" != m.tagName; ) g = t.node.openTagString(m) + g + t.node.closeTagString(m), 
                    m = m.parentNode;
                    e(o).before("<li>" + g + "</li>"), e(i).remove();
                } else if (l) {
                    a = r(o);
                    for (var v = e.FE.MARKERS + "<br>", E = i.parentNode; E && "LI" != E.tagName; ) v = t.node.openTagString(E) + v + t.node.closeTagString(E), 
                    E = E.parentNode;
                    a.parentNode && "LI" == a.parentNode.tagName ? e(a.parentNode).after("<li>" + v + "</li>") : d ? e(a).after("<" + d + ">" + v + "</" + d + ">") : e(a).after(v), 
                    e(o).remove();
                } else (a = r(o)).parentNode && "LI" == a.parentNode.tagName ? s ? e(a.parentNode).before(t.node.openTagString(o) + e.FE.MARKERS + "<br></li>") : e(a.parentNode).after(t.node.openTagString(o) + e.FE.MARKERS + "<br></li>") : d ? e(a).before("<" + d + ">" + e.FE.MARKERS + "<br></" + d + ">") : e(a).before(e.FE.MARKERS + "<br>"), 
                e(o).remove();
            },
            _middleEnter: function(r) {
                for (var i = n(r), a = "", o = r, s = "", l = ""; o != i; ) {
                    var d = "A" == (o = o.parentNode).tagName && t.cursor.isAtEnd(r, o) ? "fr-to-remove" : "";
                    s = t.node.openTagString(e(o).clone().addClass(d).get(0)) + s, l = t.node.closeTagString(o) + l;
                }
                a = l + a + s + e.FE.MARKERS + e.FE.INVISIBLE_SPACE, e(r).replaceWith('<span id="fr-break"></span>');
                var c = t.node.openTagString(i) + e(i).html() + t.node.closeTagString(i);
                c = c.replace(/<span id="fr-break"><\/span>/g, a), e(i).replaceWith(c);
            },
            _endEnter: function(r) {
                for (var i = n(r), a = e.FE.MARKERS, o = "", s = r, l = !1; s != i; ) {
                    var d = "A" == (s = s.parentNode).tagName && t.cursor.isAtEnd(r, s) ? "fr-to-remove" : "";
                    l || s == i || t.node.isBlock(s) || (l = !0, o += e.FE.INVISIBLE_SPACE), o = t.node.openTagString(e(s).clone().addClass(d).get(0)) + o, 
                    a += t.node.closeTagString(s);
                }
                var c = o + a;
                e(r).remove(), e(i).after(c);
            },
            _backspace: function(i) {
                var a = n(i), o = a.previousSibling;
                if (o) {
                    o = e(o).find(t.html.blockTagsQuery()).get(-1) || o, e(i).replaceWith(e.FE.MARKERS);
                    var s = t.node.contents(o);
                    s.length && "BR" == s[s.length - 1].tagName && e(s[s.length - 1]).remove(), e(a).find(t.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                        this.parentNode == a && e(this).replaceWith(e(this).html() + (t.node.isEmpty(this) ? "" : "<br>"));
                    });
                    for (var l, d = t.node.contents(a)[0]; d && !t.node.isList(d); ) l = d.nextSibling, 
                    e(o).append(d), d = l;
                    for (o = a.previousSibling; d; ) l = d.nextSibling, e(o).append(d), d = l;
                    e(a).remove();
                } else {
                    var c = r(a);
                    if (e(i).replaceWith(e.FE.MARKERS), c.parentNode && "LI" == c.parentNode.tagName) {
                        var f = c.previousSibling;
                        t.node.isBlock(f) ? (e(a).find(t.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                            this.parentNode == a && e(this).replaceWith(e(this).html() + (t.node.isEmpty(this) ? "" : "<br>"));
                        }), e(f).append(e(a).html())) : e(c).before(e(a).html());
                    } else {
                        var p = t.html.defaultTag();
                        p && 0 === e(a).find(t.html.blockTagsQuery()).length ? e(c).before("<" + p + ">" + e(a).html() + "</" + p + ">") : e(c).before(e(a).html());
                    }
                    e(a).remove(), t.html.wrap(), 0 === e(c).find("li").length && e(c).remove();
                }
            },
            _del: function(r) {
                var i, a = n(r), o = a.nextSibling;
                if (o) {
                    (i = t.node.contents(o)).length && "BR" == i[0].tagName && e(i[0]).remove(), e(o).find(t.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                        this.parentNode == o && e(this).replaceWith(e(this).html() + (t.node.isEmpty(this) ? "" : "<br>"));
                    });
                    for (var s, l = r, d = t.node.contents(o)[0]; d && !t.node.isList(d); ) s = d.nextSibling, 
                    e(l).after(d), l = d, d = s;
                    for (;d; ) s = d.nextSibling, e(a).append(d), d = s;
                    e(r).replaceWith(e.FE.MARKERS), e(o).remove();
                } else {
                    for (var c = a; !c.nextSibling && c != t.el; ) c = c.parentNode;
                    if (c == t.el) return !1;
                    if (c = c.nextSibling, t.node.isBlock(c)) e.FE.NO_DELETE_TAGS.indexOf(c.tagName) < 0 && (e(r).replaceWith(e.FE.MARKERS), 
                    (i = t.node.contents(a)).length && "BR" == i[i.length - 1].tagName && e(i[i.length - 1]).remove(), 
                    e(a).append(e(c).html()), e(c).remove()); else for ((i = t.node.contents(a)).length && "BR" == i[i.length - 1].tagName && e(i[i.length - 1]).remove(), 
                    e(r).replaceWith(e.FE.MARKERS); c && !t.node.isBlock(c) && "BR" != c.tagName; ) e(a).append(e(c)), 
                    c = c.nextSibling;
                }
            }
        };
    }, e.FE.NO_DELETE_TAGS = [ "TH", "TD", "TR", "TABLE", "FORM" ], e.FE.SIMPLE_ENTER_TAGS = [ "TH", "TD", "LI", "DL", "DT", "FORM" ], 
    e.FE.MODULES.cursor = function(t) {
        function n(e) {
            return !!e && (!!t.node.isBlock(e) || (e.nextSibling && e.nextSibling.nodeType == Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? n(e.nextSibling) : !(e.nextSibling && (!e.previousSibling || "BR" != e.nextSibling.tagName || e.nextSibling.nextSibling)) && n(e.parentNode)));
        }
        function r(e) {
            return !!e && (!!t.node.isBlock(e) || (e.previousSibling && e.previousSibling.nodeType == Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? r(e.previousSibling) : !e.previousSibling && (!(e.previousSibling || !t.node.hasClass(e.parentNode, "fr-inner")) || r(e.parentNode))));
        }
        function i(e, n) {
            return !!e && e != t.$wp.get(0) && (e.previousSibling && e.previousSibling.nodeType == Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? i(e.previousSibling, n) : !e.previousSibling && (e.parentNode == n || i(e.parentNode, n)));
        }
        function a(e, n) {
            return !!e && e != t.$wp.get(0) && (e.nextSibling && e.nextSibling.nodeType == Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? a(e.nextSibling, n) : !(e.nextSibling && (!e.previousSibling || "BR" != e.nextSibling.tagName || e.nextSibling.nextSibling)) && (e.parentNode == n || a(e.parentNode, n)));
        }
        function o(n) {
            return 0 < e(n).parentsUntil(t.$el, "LI").length && 0 === e(n).parentsUntil("LI", "TABLE").length;
        }
        function s(e, t) {
            var n = new RegExp((t ? "^" : "") + "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})" + (t ? "" : "$"), "i"), r = e.match(n);
            return r ? r[0].length : 1;
        }
        function l(n) {
            for (var r, i = n; !i.previousSibling; ) if (i = i.parentNode, t.node.isElement(i)) return !1;
            if (i = i.previousSibling, !t.node.isBlock(i) && t.node.isEditable(i)) {
                for (r = t.node.contents(i); i.nodeType != Node.TEXT_NODE && !t.node.isDeletable(i) && r.length && t.node.isEditable(i); ) i = r[r.length - 1], 
                r = t.node.contents(i);
                if (i.nodeType == Node.TEXT_NODE) {
                    var a = i.textContent, o = a.length;
                    if (a.length && "\n" === a[a.length - 1]) return i.textContent = a.substring(0, o - 2), 
                    0 === i.textContent.length && i.parentNode.removeChild(i), l(n);
                    t.opts.tabSpaces && a.length >= t.opts.tabSpaces && 0 === a.substr(a.length - t.opts.tabSpaces, a.length - 1).replace(/ /g, "").replace(new RegExp(e.FE.UNICODE_NBSP, "g"), "").length && (o = a.length - t.opts.tabSpaces + 1), 
                    i.textContent = a.substring(0, o - s(a));
                    var d = a.length != i.textContent.length;
                    if (0 === i.textContent.length) if (d && t.opts.keepFormatOnDelete) e(i).after(e.FE.INVISIBLE_SPACE + e.FE.MARKERS); else if ((2 != i.parentNode.childNodes.length || i.parentNode != n.parentNode) && 1 != i.parentNode.childNodes.length || t.node.isBlock(i.parentNode) || t.node.isElement(i.parentNode) || !t.node.isDeletable(i.parentNode)) {
                        for (;!t.node.isElement(i.parentNode) && t.node.isEmpty(i.parentNode); ) {
                            var c = i;
                            i = i.parentNode, c.parentNode.removeChild(c);
                        }
                        e(i).after(e.FE.MARKERS), t.node.isElement(i.parentNode) && !n.nextSibling && i.previousSibling && "BR" == i.previousSibling.tagName && e(n).after("<br>"), 
                        i.parentNode.removeChild(i);
                    } else e(i.parentNode).after(e.FE.MARKERS), e(i.parentNode).remove(); else e(i).after(e.FE.MARKERS);
                } else t.node.isDeletable(i) ? (e(i).after(e.FE.MARKERS), e(i).remove()) : n.nextSibling && "BR" == n.nextSibling.tagName && t.node.isVoid(i) && "BR" != i.tagName ? (e(n.nextSibling).remove(), 
                e(n).replaceWith(e.FE.MARKERS)) : !1 !== t.events.trigger("node.remove", [ e(i) ]) && (e(i).after(e.FE.MARKERS), 
                e(i).remove());
            } else if (e.FE.NO_DELETE_TAGS.indexOf(i.tagName) < 0 && (t.node.isEditable(i) || t.node.isDeletable(i))) if (t.node.isDeletable(i)) e(n).replaceWith(e.FE.MARKERS), 
            e(i).remove(); else if (t.node.isEmpty(i) && !t.node.isList(i)) e(i).remove(), e(n).replaceWith(e.FE.MARKERS); else {
                for (t.node.isList(i) && (i = e(i).find("li:last").get(0)), (r = t.node.contents(i)) && "BR" == r[r.length - 1].tagName && e(r[r.length - 1]).remove(), 
                r = t.node.contents(i); r && t.node.isBlock(r[r.length - 1]); ) i = r[r.length - 1], 
                r = t.node.contents(i);
                e(i).append(e.FE.MARKERS);
                for (var f = n; !f.previousSibling; ) f = f.parentNode;
                for (;f && "BR" !== f.tagName && !t.node.isBlock(f); ) {
                    var p = f;
                    f = f.nextSibling, e(i).append(p);
                }
                f && "BR" == f.tagName && e(f).remove(), e(n).remove();
            } else n.nextSibling && "BR" == n.nextSibling.tagName && e(n.nextSibling).remove();
        }
        function d(n) {
            var r = 0 < e(n).parentsUntil(t.$el, "BLOCKQUOTE").length, i = t.node.deepestParent(n, [], !r);
            if (i && "BLOCKQUOTE" == i.tagName) {
                var a = t.node.deepestParent(n, [ e(n).parentsUntil(t.$el, "BLOCKQUOTE").get(0) ]);
                a && a.nextSibling && (i = a);
            }
            if (null !== i) {
                var o, s = i.nextSibling;
                if (t.node.isBlock(i) && (t.node.isEditable(i) || t.node.isDeletable(i)) && s && e.FE.NO_DELETE_TAGS.indexOf(s.tagName) < 0) if (t.node.isDeletable(s)) e(s).remove(), 
                e(n).replaceWith(e.FE.MARKERS); else if (t.node.isBlock(s) && t.node.isEditable(s)) if (t.node.isList(s)) if (t.node.isEmpty(i, !0)) e(i).remove(), 
                e(s).find("li:first").prepend(e.FE.MARKERS); else {
                    var l = e(s).find("li:first");
                    "BLOCKQUOTE" == i.tagName && (o = t.node.contents(i)).length && t.node.isBlock(o[o.length - 1]) && (i = o[o.length - 1]), 
                    0 === l.find("ul, ol").length && (e(n).replaceWith(e.FE.MARKERS), l.find(t.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                        this.parentNode == l.get(0) && e(this).replaceWith(e(this).html() + (t.node.isEmpty(this) ? "" : "<br>"));
                    }), e(i).append(t.node.contents(l.get(0))), l.remove(), 0 === e(s).find("li").length && e(s).remove());
                } else {
                    if ((o = t.node.contents(s)).length && "BR" == o[0].tagName && e(o[0]).remove(), 
                    "BLOCKQUOTE" != s.tagName && "BLOCKQUOTE" == i.tagName) for (o = t.node.contents(i); o.length && t.node.isBlock(o[o.length - 1]); ) i = o[o.length - 1], 
                    o = t.node.contents(i); else if ("BLOCKQUOTE" == s.tagName && "BLOCKQUOTE" != i.tagName) for (o = t.node.contents(s); o.length && t.node.isBlock(o[0]); ) s = o[0], 
                    o = t.node.contents(s);
                    e(n).replaceWith(e.FE.MARKERS), e(i).append(s.innerHTML), e(s).remove();
                } else {
                    for (e(n).replaceWith(e.FE.MARKERS); s && "BR" !== s.tagName && !t.node.isBlock(s) && t.node.isEditable(s); ) {
                        var d = s;
                        s = s.nextSibling, e(i).append(d);
                    }
                    s && "BR" == s.tagName && t.node.isEditable(s) && e(s).remove();
                }
            }
        }
        function c(r) {
            for (var i, a = r; !a.nextSibling; ) if (a = a.parentNode, t.node.isElement(a)) return !1;
            if ("BR" == (a = a.nextSibling).tagName && t.node.isEditable(a)) if (a.nextSibling) {
                if (t.node.isBlock(a.nextSibling) && t.node.isEditable(a.nextSibling)) {
                    if (!(e.FE.NO_DELETE_TAGS.indexOf(a.nextSibling.tagName) < 0)) return void e(a).remove();
                    a = a.nextSibling, e(a.previousSibling).remove();
                }
            } else if (n(a)) return void (o(r) ? t.cursorLists._del(r) : t.node.deepestParent(a) && ((!t.node.isEmpty(t.node.blockParent(a)) || (t.node.blockParent(a).nextSibling && e.FE.NO_DELETE_TAGS.indexOf(t.node.blockParent(a).nextSibling.tagName)) < 0) && e(a).remove(), 
            d(r)));
            if (!t.node.isBlock(a) && t.node.isEditable(a)) {
                for (i = t.node.contents(a); a.nodeType != Node.TEXT_NODE && i.length && !t.node.isDeletable(a) && t.node.isEditable(a); ) a = i[0], 
                i = t.node.contents(a);
                a.nodeType == Node.TEXT_NODE ? (e(a).before(e.FE.MARKERS), a.textContent.length && (a.textContent = a.textContent.substring(s(a.textContent, !0), a.textContent.length))) : t.node.isDeletable(a) ? (e(a).before(e.FE.MARKERS), 
                e(a).remove()) : !1 !== t.events.trigger("node.remove", [ e(a) ]) && (e(a).before(e.FE.MARKERS), 
                e(a).remove()), e(r).remove();
            } else if (e.FE.NO_DELETE_TAGS.indexOf(a.tagName) < 0 && (t.node.isEditable(a) || t.node.isDeletable(a))) if (t.node.isDeletable(a)) e(r).replaceWith(e.FE.MARKERS), 
            e(a).remove(); else if (t.node.isList(a)) r.previousSibling ? (e(a).find("li:first").prepend(r), 
            t.cursorLists._backspace(r)) : (e(a).find("li:first").prepend(e.FE.MARKERS), e(r).remove()); else if ((i = t.node.contents(a)) && "BR" == i[0].tagName && e(i[0]).remove(), 
            i && "BLOCKQUOTE" == a.tagName) {
                var l = i[0];
                for (e(r).before(e.FE.MARKERS); l && "BR" != l.tagName; ) {
                    var c = l;
                    l = l.nextSibling, e(r).before(c);
                }
                l && "BR" == l.tagName && e(l).remove();
            } else e(r).after(e(a).html()).after(e.FE.MARKERS), e(a).remove();
        }
        function f() {
            for (var e = t.el.querySelectorAll("blockquote:empty"), n = 0; n < e.length; n++) e[n].parentNode.removeChild(e[n]);
        }
        function p(n, r, i) {
            var o, s = t.node.deepestParent(n, [], !i);
            if (s && "BLOCKQUOTE" == s.tagName) return a(n, s) ? ((o = t.html.defaultTag()) ? e(s).after("<" + o + ">" + e.FE.MARKERS + "<br></" + o + ">") : e(s).after(e.FE.MARKERS + "<br>"), 
            e(n).remove()) : u(n, r, i), !1;
            if (null == s) (o = t.html.defaultTag()) && t.node.isElement(n.parentNode) ? e(n).replaceWith("<" + o + ">" + e.FE.MARKERS + "<br></" + o + ">") : !n.previousSibling || e(n.previousSibling).is("br") || n.nextSibling ? e(n).replaceWith("<br>" + e.FE.MARKERS) : e(n).replaceWith("<br>" + e.FE.MARKERS + "<br>"); else {
                var l = n, d = "";
                t.node.isBlock(s) && !r || (d = "<br/>");
                var c, f = "", p = "", h = "", g = "";
                (o = t.html.defaultTag()) && t.node.isBlock(s) && (h = "<" + o + ">", g = "</" + o + ">", 
                s.tagName == o.toUpperCase() && (h = t.node.openTagString(e(s).clone().removeAttr("id").get(0))));
                do {
                    if (l = l.parentNode, !r || l != s || r && !t.node.isBlock(s)) if (f += t.node.closeTagString(l), 
                    l == s && t.node.isBlock(s)) p = h + p; else {
                        var m = "A" == l.tagName && a(n, l) ? "fr-to-remove" : "";
                        p = t.node.openTagString(e(l).clone().addClass(m).get(0)) + p;
                    }
                } while (l != s);
                d = f + d + p + (n.parentNode == s && t.node.isBlock(s) ? "" : e.FE.INVISIBLE_SPACE) + e.FE.MARKERS, 
                t.node.isBlock(s) && !e(s).find("*:last").is("br") && e(s).append("<br/>"), e(n).after('<span id="fr-break"></span>'), 
                e(n).remove(), s.nextSibling && !t.node.isBlock(s.nextSibling) || t.node.isBlock(s) || e(s).after("<br>"), 
                c = (c = !r && t.node.isBlock(s) ? t.node.openTagString(s) + e(s).html() + g : t.node.openTagString(s) + e(s).html() + t.node.closeTagString(s)).replace(/<span id="fr-break"><\/span>/g, d), 
                e(s).replaceWith(c);
            }
        }
        function u(n, r, o) {
            var s = t.node.deepestParent(n, [], !o);
            if (null == s) t.html.defaultTag() && n.parentNode === t.el ? e(n).replaceWith("<" + t.html.defaultTag() + ">" + e.FE.MARKERS + "<br></" + t.html.defaultTag() + ">") : (n.nextSibling && !t.node.isBlock(n.nextSibling) || e(n).after("<br>"), 
            e(n).replaceWith("<br>" + e.FE.MARKERS)); else {
                var l = n, d = "";
                "PRE" == s.tagName && (r = !0), t.node.isBlock(s) && !r || (d = "<br>");
                var c = "", f = "";
                do {
                    var p = l;
                    if (l = l.parentNode, "BLOCKQUOTE" == s.tagName && t.node.isEmpty(p) && !t.node.hasClass(p, "fr-marker") && 0 < e(p).find(n).length && e(p).after(n), 
                    ("BLOCKQUOTE" != s.tagName || !a(n, l) && !i(n, l)) && (!r || l != s || r && !t.node.isBlock(s))) {
                        c += t.node.closeTagString(l);
                        var u = "A" == l.tagName && a(n, l) ? "fr-to-remove" : "";
                        f = t.node.openTagString(e(l).clone().addClass(u).removeAttr("id").get(0)) + f;
                    }
                } while (l != s);
                var h = s == n.parentNode && t.node.isBlock(s) || n.nextSibling;
                if ("BLOCKQUOTE" == s.tagName) {
                    n.previousSibling && t.node.isBlock(n.previousSibling) && n.nextSibling && "BR" == n.nextSibling.tagName && (e(n.nextSibling).after(n), 
                    n.nextSibling && "BR" == n.nextSibling.tagName && e(n.nextSibling).remove());
                    var g = t.html.defaultTag();
                    d = c + d + (g ? "<" + g + ">" : "") + e.FE.MARKERS + "<br>" + (g ? "</" + g + ">" : "") + f;
                } else d = c + d + f + (h ? "" : e.FE.INVISIBLE_SPACE) + e.FE.MARKERS;
                e(n).replaceWith('<span id="fr-break"></span>');
                var m = t.node.openTagString(s) + e(s).html() + t.node.closeTagString(s);
                m = m.replace(/<span id="fr-break"><\/span>/g, d), e(s).replaceWith(m);
            }
        }
        return {
            enter: function(s) {
                var l = t.markers.insert();
                if (!l) return !0;
                t.el.normalize();
                var d = !1;
                0 < e(l).parentsUntil(t.$el, "BLOCKQUOTE").length && (d = !(s = !1)), e(l).parentsUntil(t.$el, "TD, TH").length && (d = !1), 
                n(l) ? !o(l) || s || d ? p(l, s, d) : t.cursorLists._endEnter(l) : r(l) ? !o(l) || s || d ? function n(r, o, s) {
                    var l, d = t.node.deepestParent(r, [], !s);
                    if (d && "TABLE" == d.tagName) return e(d).find("td:first, th:first").prepend(r), 
                    n(r, o, s);
                    if (d && "BLOCKQUOTE" == d.tagName) {
                        if (i(r, d)) return (l = t.html.defaultTag()) ? e(d).before("<" + l + ">" + e.FE.MARKERS + "<br></" + l + ">") : e(d).before(e.FE.MARKERS + "<br>"), 
                        e(r).remove(), !1;
                        a(r, d) ? p(r, o, !0) : u(r, o, !0);
                    }
                    if (null == d) (l = t.html.defaultTag()) && t.node.isElement(r.parentNode) ? e(r).replaceWith("<" + l + ">" + e.FE.MARKERS + "<br></" + l + ">") : e(r).replaceWith("<br>" + e.FE.MARKERS); else {
                        if (t.node.isBlock(d)) if ("PRE" == d.tagName && (o = !0), o) e(r).remove(), e(d).prepend("<br>" + e.FE.MARKERS); else {
                            if (t.node.isEmpty(d, !0)) return p(r, o, s);
                            if (t.opts.keepFormatOnDelete) {
                                for (var c = r, f = e.FE.INVISIBLE_SPACE; c != d && !t.node.isElement(c); ) c = c.parentNode, 
                                f = t.node.openTagString(c) + f + t.node.closeTagString(c);
                                e(d).before(f);
                            } else e(d).before(t.node.openTagString(e(d).clone().removeAttr("id").get(0)) + "<br>" + t.node.closeTagString(d));
                        } else e(d).before("<br>");
                        e(r).remove();
                    }
                }(l, s, d) : t.cursorLists._startEnter(l) : !o(l) || s || d ? u(l, s, d) : t.cursorLists._middleEnter(l), 
                t.$el.find(".fr-to-remove").each(function() {
                    for (var n = t.node.contents(this), r = 0; r < n.length; r++) n[r].nodeType == Node.TEXT_NODE && (n[r].textContent = n[r].textContent.replace(/\u200B/g, ""));
                    e(this).replaceWith(this.innerHTML);
                }), t.html.fillEmptyBlocks(!0), t.opts.htmlUntouched || (t.html.cleanEmptyTags(), 
                t.clean.lists()), t.spaces.normalizeAroundCursor(), t.selection.restore();
            },
            backspace: function() {
                var a = !1, d = t.markers.insert();
                if (!d) return !0;
                for (var c = d.parentNode; c && !t.node.isElement(c); ) {
                    if ("false" === c.getAttribute("contenteditable")) return e(d).replaceWith(e.FE.MARKERS), 
                    t.selection.restore(), !1;
                    if ("true" === c.getAttribute("contenteditable")) break;
                    c = c.parentNode;
                }
                t.el.normalize();
                var p = d.previousSibling;
                if (p) {
                    var u = p.textContent;
                    u && u.length && 8203 == u.charCodeAt(u.length - 1) && (1 == u.length ? e(p).remove() : p.textContent = p.textContent.substr(0, u.length - s(u)));
                }
                return n(d) ? a = l(d) : r(d) ? o(d) && i(d, e(d).parents("li:first").get(0)) ? t.cursorLists._backspace(d) : function(n) {
                    for (var r = 0 < e(n).parentsUntil(t.$el, "BLOCKQUOTE").length, i = t.node.deepestParent(n, [], !r), a = i; i && !i.previousSibling && "BLOCKQUOTE" != i.tagName && i.parentElement != t.el && !t.node.hasClass(i.parentElement, "fr-inner") && e.FE.SIMPLE_ENTER_TAGS.indexOf(i.parentElement.tagName) < 0; ) i = i.parentElement;
                    if (i && "BLOCKQUOTE" == i.tagName) {
                        var o = t.node.deepestParent(n, [ e(n).parentsUntil(t.$el, "BLOCKQUOTE").get(0) ]);
                        o && o.previousSibling && (a = i = o);
                    }
                    if (null !== i) {
                        var s, l = i.previousSibling;
                        if (t.node.isBlock(i) && t.node.isEditable(i) && l && e.FE.NO_DELETE_TAGS.indexOf(l.tagName) < 0) if (t.node.isDeletable(l)) e(l).remove(), 
                        e(n).replaceWith(e.FE.MARKERS); else if (t.node.isEditable(l)) if (t.node.isBlock(l)) if (t.node.isEmpty(l) && !t.node.isList(l)) e(l).remove(), 
                        e(n).after(t.opts.keepFormatOnDelete ? e.FE.INVISIBLE_SPACE : ""); else {
                            if (t.node.isList(l) && (l = e(l).find("li:last").get(0)), (s = t.node.contents(l)).length && "BR" == s[s.length - 1].tagName && e(s[s.length - 1]).remove(), 
                            "BLOCKQUOTE" == l.tagName && "BLOCKQUOTE" != i.tagName) for (s = t.node.contents(l); s.length && t.node.isBlock(s[s.length - 1]); ) l = s[s.length - 1], 
                            s = t.node.contents(l); else if ("BLOCKQUOTE" != l.tagName && "BLOCKQUOTE" == i.tagName) for (s = t.node.contents(i); s.length && t.node.isBlock(s[0]); ) i = s[0], 
                            s = t.node.contents(i);
                            if (t.node.isEmpty(i)) e(n).remove(), t.selection.setAtEnd(l, !0); else {
                                e(n).replaceWith(e.FE.MARKERS);
                                var d = l.childNodes;
                                t.node.isBlock(d[d.length - 1]) ? e(d[d.length - 1]).append(a.innerHTML) : e(l).append(a.innerHTML);
                            }
                            e(a).remove(), t.node.isEmpty(i) && e(i).remove();
                        } else e(n).replaceWith(e.FE.MARKERS), "BLOCKQUOTE" == i.tagName && l.nodeType == Node.ELEMENT_NODE ? e(l).remove() : (e(l).after(t.node.isEmpty(i) ? "" : e(i).html()), 
                        e(i).remove(), "BR" == l.tagName && e(l).remove());
                    }
                }(d) : a = l(d), e(d).remove(), f(), t.html.fillEmptyBlocks(!0), t.opts.htmlUntouched || (t.html.cleanEmptyTags(), 
                t.clean.lists(), t.spaces.normalizeAroundCursor()), t.selection.restore(), a;
            },
            del: function() {
                var i = t.markers.insert();
                if (!i) return !1;
                if (t.el.normalize(), n(i)) if (o(i)) if (0 === e(i).parents("li:first").find("ul, ol").length) t.cursorLists._del(i); else {
                    var a = e(i).parents("li:first").find("ul:first, ol:first").find("li:first");
                    (a = a.find(t.html.blockTagsQuery()).get(-1) || a).prepend(i), t.cursorLists._backspace(i);
                } else d(i); else r(i), c(i);
                e(i).remove(), f(), t.html.fillEmptyBlocks(!0), t.opts.htmlUntouched || (t.html.cleanEmptyTags(), 
                t.clean.lists()), t.spaces.normalizeAroundCursor(), t.selection.restore();
            },
            isAtEnd: a,
            isAtStart: i
        };
    }, e.FE.ENTER_P = 0, e.FE.ENTER_DIV = 1, e.FE.ENTER_BR = 2, e.FE.KEYCODE = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        FF_SEMICOLON: 59,
        FF_EQUALS: 61,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        FF_HYPHEN: 173,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        HYPHEN: 189,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        TILDE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221,
        IME: 229
    }, e.extend(e.FE.DEFAULTS, {
        enter: e.FE.ENTER_P,
        multiLine: !0,
        tabSpaces: 0
    }), e.FE.MODULES.keys = function(t) {
        function n() {
            if (t.browser.mozilla && t.selection.isCollapsed() && !A) {
                var e = t.selection.ranges(0), n = e.startContainer, r = e.startOffset;
                n && n.nodeType == Node.TEXT_NODE && r <= n.textContent.length && 0 < r && 32 == n.textContent.charCodeAt(r - 1) && (t.selection.save(), 
                t.spaces.normalize(), t.selection.restore());
            }
        }
        function r() {
            t.selection.isFull() && setTimeout(function() {
                var n = t.html.defaultTag();
                n ? t.$el.html("<" + n + ">" + e.FE.MARKERS + "<br/></" + n + ">") : t.$el.html(e.FE.MARKERS + "<br/>"), 
                t.selection.restore(), t.placeholder.refresh(), t.button.bulkRefresh(), t.undo.saveStep();
            }, 0);
        }
        function i() {
            A = !1;
        }
        function a() {
            A = !1;
        }
        function o() {
            var n = t.html.defaultTag();
            n ? t.$el.html("<" + n + ">" + e.FE.MARKERS + "<br/></" + n + ">") : t.$el.html(e.FE.MARKERS + "<br/>"), 
            t.selection.restore();
        }
        function s(n) {
            var r = t.selection.element();
            if (r && 0 <= [ "INPUT", "TEXTAREA" ].indexOf(r.tagName)) return !0;
            t.events.disableBlur();
            var i = n.which;
            if (16 === i) return !0;
            if ((E = i) === e.FE.KEYCODE.IME) return A = !0;
            A = !1;
            var a, s, l, d = p(i) && !c(n) && !n.altKey, f = i == e.FE.KEYCODE.BACKSPACE || i == e.FE.KEYCODE.DELETE;
            if ((t.selection.isFull() && !t.opts.keepFormatOnDelete && !t.placeholder.isVisible() || f && t.placeholder.isVisible() && t.opts.keepFormatOnDelete) && (d || f) && (o(), 
            !p(i))) return n.preventDefault(), !0;
            i == e.FE.KEYCODE.ENTER ? n.shiftKey ? ((l = n).preventDefault(), l.stopPropagation(), 
            t.opts.multiLine && (t.selection.isCollapsed() || t.selection.remove(), t.cursor.enter(!0))) : (s = n, 
            t.opts.multiLine ? (t.helpers.isIOS() || (s.preventDefault(), s.stopPropagation()), 
            t.selection.isCollapsed() || t.selection.remove(), t.cursor.enter()) : (s.preventDefault(), 
            s.stopPropagation())) : i === e.FE.KEYCODE.BACKSPACE && (n.metaKey || n.ctrlKey) ? setTimeout(function() {
                t.events.disableBlur(), t.events.focus();
            }, 0) : i != e.FE.KEYCODE.BACKSPACE || c(n) || n.altKey ? i != e.FE.KEYCODE.DELETE || c(n) || n.altKey || n.shiftKey ? i == e.FE.KEYCODE.SPACE ? function(n) {
                var r = t.selection.element();
                if (!t.helpers.isMobile() && r && "A" == r.tagName) {
                    n.preventDefault(), n.stopPropagation(), t.selection.isCollapsed() || t.selection.remove();
                    var i = t.markers.insert();
                    if (i) {
                        var a = i.previousSibling;
                        !i.nextSibling && i.parentNode && "A" == i.parentNode.tagName ? (i.parentNode.insertAdjacentHTML("afterend", "&nbsp;" + e.FE.MARKERS), 
                        i.parentNode.removeChild(i)) : (a && a.nodeType == Node.TEXT_NODE && 1 == a.textContent.length && 160 == a.textContent.charCodeAt(0) ? a.textContent = a.textContent + " " : i.insertAdjacentHTML("beforebegin", "&nbsp;"), 
                        i.outerHTML = e.FE.MARKERS), t.selection.restore();
                    }
                }
            }(n) : i == e.FE.KEYCODE.TAB ? function(e) {
                if (0 < t.opts.tabSpaces) if (t.selection.isCollapsed()) {
                    t.undo.saveStep(), e.preventDefault(), e.stopPropagation();
                    for (var n = "", r = 0; r < t.opts.tabSpaces; r++) n += "&nbsp;";
                    t.html.insert(n), t.placeholder.refresh(), t.undo.saveStep();
                } else e.preventDefault(), e.stopPropagation(), e.shiftKey ? t.commands.outdent() : t.commands.indent();
            }(n) : c(n) || !p(n.which) || t.selection.isCollapsed() || n.ctrlKey || t.selection.remove() : t.placeholder.isVisible() ? (t.opts.keepFormatOnDelete || o(), 
            n.preventDefault(), n.stopPropagation()) : ((a = n).preventDefault(), a.stopPropagation(), 
            "" === t.selection.text() ? t.cursor.del() : t.selection.remove(), t.placeholder.refresh()) : t.placeholder.isVisible() ? (t.opts.keepFormatOnDelete || o(), 
            n.preventDefault(), n.stopPropagation()) : function(e) {
                if (t.selection.isCollapsed()) if (t.cursor.backspace(), t.helpers.isIOS()) {
                    var n = t.selection.ranges(0);
                    n.deleteContents(), n.insertNode(document.createTextNode("​")), t.selection.get().modify("move", "forward", "character");
                } else e.preventDefault(), e.stopPropagation(); else e.preventDefault(), e.stopPropagation(), 
                t.selection.remove(), t.html.fillEmptyBlocks();
                t.placeholder.refresh();
            }(n), t.events.enableBlur();
        }
        function l() {
            if (!t.$wp) return !0;
            var n;
            t.opts.height || t.opts.heightMax ? (n = t.position.getBoundingRect().top, (t.helpers.isIOS() || t.helpers.isAndroid()) && (n -= t.helpers.scrollTop()), 
            t.opts.iframe && (n += t.$iframe.offset().top), n > t.$wp.offset().top - t.helpers.scrollTop() + t.$wp.height() - 20 && t.$wp.scrollTop(n + t.$wp.scrollTop() - (t.$wp.height() + t.$wp.offset().top) + t.helpers.scrollTop() + 20)) : (n = t.position.getBoundingRect().top, 
            t.opts.toolbarBottom && (n += t.opts.toolbarStickyOffset), (t.helpers.isIOS() || t.helpers.isAndroid()) && (n -= t.helpers.scrollTop()), 
            t.opts.iframe && (n += t.$iframe.offset().top, n -= t.helpers.scrollTop()), (n += t.opts.toolbarStickyOffset) > t.o_win.innerHeight - 20 && e(t.o_win).scrollTop(n + t.helpers.scrollTop() - t.o_win.innerHeight + 20), 
            n = t.position.getBoundingRect().top, t.opts.toolbarBottom || (n -= t.opts.toolbarStickyOffset), 
            (t.helpers.isIOS() || t.helpers.isAndroid()) && (n -= t.helpers.scrollTop()), t.opts.iframe && (n += t.$iframe.offset().top, 
            n -= t.helpers.scrollTop()), n < t.$tb.height() + 20 && e(t.o_win).scrollTop(n + t.helpers.scrollTop() - t.$tb.height() - 20));
        }
        function d(n) {
            var r = t.selection.element();
            if (r && 0 <= [ "INPUT", "TEXTAREA" ].indexOf(r.tagName)) return !0;
            if (n && 0 === n.which && E && (n.which = E), t.helpers.isAndroid() && t.browser.mozilla) return !0;
            if (A) return !1;
            if (n && t.helpers.isIOS() && n.which == e.FE.KEYCODE.ENTER && t.doc.execCommand("delete"), 
            !t.selection.isCollapsed()) return !0;
            if (n && (n.which === e.FE.KEYCODE.META || n.which == e.FE.KEYCODE.CTRL)) return !0;
            if (n && f(n.which)) return !0;
            n && !t.helpers.isIOS() && (n.which == e.FE.KEYCODE.ENTER || n.which == e.FE.KEYCODE.BACKSPACE || 37 <= n.which && n.which <= 40 && !t.browser.msie) && l();
            var i, a = t.selection.element();
            !function(e) {
                if (!e) return !1;
                var t = e.innerHTML;
                return !!((t = t.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t) && 0 < t.replace(/\u200B/gi, "").length);
            }(a) || t.node.hasClass(a, "fr-marker") || "IFRAME" == a.tagName || (i = a, t.helpers.isIOS() && 0 !== ((i.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length) || (t.selection.save(), 
            function(e) {
                for (var n = t.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, t.node.filter(function(e) {
                    return /\u200B/gi.test(e.textContent);
                }), !1); n.nextNode(); ) {
                    var r = n.currentNode;
                    r.textContent = r.textContent.replace(/\u200B/gi, "");
                }
            }(a), t.selection.restore());
        }
        function c(e) {
            if (-1 != navigator.userAgent.indexOf("Mac OS X")) {
                if (e.metaKey && !e.altKey) return !0;
            } else if (e.ctrlKey && !e.altKey) return !0;
            return !1;
        }
        function f(t) {
            if (t >= e.FE.KEYCODE.ARROW_LEFT && t <= e.FE.KEYCODE.ARROW_DOWN) return !0;
        }
        function p(n) {
            if (n >= e.FE.KEYCODE.ZERO && n <= e.FE.KEYCODE.NINE) return !0;
            if (n >= e.FE.KEYCODE.NUM_ZERO && n <= e.FE.KEYCODE.NUM_MULTIPLY) return !0;
            if (n >= e.FE.KEYCODE.A && n <= e.FE.KEYCODE.Z) return !0;
            if (t.browser.webkit && 0 === n) return !0;
            switch (n) {
              case e.FE.KEYCODE.SPACE:
              case e.FE.KEYCODE.QUESTION_MARK:
              case e.FE.KEYCODE.NUM_PLUS:
              case e.FE.KEYCODE.NUM_MINUS:
              case e.FE.KEYCODE.NUM_PERIOD:
              case e.FE.KEYCODE.NUM_DIVISION:
              case e.FE.KEYCODE.SEMICOLON:
              case e.FE.KEYCODE.FF_SEMICOLON:
              case e.FE.KEYCODE.DASH:
              case e.FE.KEYCODE.EQUALS:
              case e.FE.KEYCODE.FF_EQUALS:
              case e.FE.KEYCODE.COMMA:
              case e.FE.KEYCODE.PERIOD:
              case e.FE.KEYCODE.SLASH:
              case e.FE.KEYCODE.APOSTROPHE:
              case e.FE.KEYCODE.SINGLE_QUOTE:
              case e.FE.KEYCODE.OPEN_SQUARE_BRACKET:
              case e.FE.KEYCODE.BACKSLASH:
              case e.FE.KEYCODE.CLOSE_SQUARE_BRACKET:
                return !0;

              default:
                return !1;
            }
        }
        function u(n) {
            var r = n.which;
            if (c(n) || 37 <= r && r <= 40 || !p(r) && r != e.FE.KEYCODE.DELETE && r != e.FE.KEYCODE.BACKSPACE && r != e.FE.KEYCODE.ENTER && r != e.FE.KEYCODE.IME) return !0;
            b || (T = t.snapshot.get(), t.undo.canDo() || t.undo.saveStep()), clearTimeout(b), 
            b = setTimeout(function() {
                b = null, t.undo.saveStep();
            }, Math.max(250, t.opts.typingTimer));
        }
        function h(e) {
            var n = e.which;
            if (c(e) || 37 <= n && n <= 40) return !0;
            T && b ? (t.undo.saveStep(T), T = null) : void 0 !== n && 0 !== n || T || b || t.undo.saveStep();
        }
        function g(e) {
            if (e && "BR" == e.tagName) return !1;
            try {
                return 0 === (e.textContent || "").length && e.querySelector && !e.querySelector(":scope > br") || e.childNodes && 1 == e.childNodes.length && e.childNodes[0].getAttribute && ("false" == e.childNodes[0].getAttribute("contenteditable") || t.node.hasClass(e.childNodes[0], "fr-img-caption"));
            } catch (e) {
                return !1;
            }
        }
        function m(n) {
            var r = t.el.childNodes, i = t.html.defaultTag();
            return !(!n.target || n.target === t.el) || 0 === r.length || void (t.$el.outerHeight() - n.offsetY <= 10 ? g(r[r.length - 1]) && (i ? t.$el.append("<" + i + ">" + e.FE.MARKERS + "<br></" + i + ">") : t.$el.append(e.FE.MARKERS + "<br>"), 
            t.selection.restore(), l()) : n.offsetY <= 10 && g(r[0]) && (i ? t.$el.prepend("<" + i + ">" + e.FE.MARKERS + "<br></" + i + ">") : t.$el.prepend(e.FE.MARKERS + "<br>"), 
            t.selection.restore(), l()));
        }
        function v() {
            b && clearTimeout(b);
        }
        var E, b, T, A = !1;
        return {
            _init: function() {
                t.events.on("keydown", u), t.events.on("input", n), t.events.on("mousedown", a), 
                t.events.on("keyup input", h), t.events.on("keypress", i), t.events.on("keydown", s), 
                t.events.on("keyup", d), t.events.on("destroy", v), t.events.on("html.inserted", d), 
                t.events.on("cut", r), t.events.on("click", m);
            },
            ctrlKey: c,
            isCharacter: p,
            isArrow: f,
            forceUndo: function() {
                b && (clearTimeout(b), t.undo.saveStep(), T = null);
            },
            isIME: function() {
                return A;
            },
            isBrowserAction: function(t) {
                var n = t.which;
                return c(t) || n == e.FE.KEYCODE.F5;
            },
            positionCaret: l
        };
    }, e.FE.MODULES.accessibility = function(t) {
        function n(e) {
            e && e.length && !t.$el.find('[contenteditable="true"]').is(":focus") && (e.data("blur-event-set") || e.parents(".fr-popup").length || (t.events.$on(e, "blur", function() {
                var n = e.parents(".fr-toolbar, .fr-popup").data("instance") || t;
                n.events.blurActive() && n.events.trigger("blur"), setTimeout(function() {
                    n.events.enableBlur();
                }, 100);
            }, !0), e.data("blur-event-set", !0)), (e.parents(".fr-toolbar, .fr-popup").data("instance") || t).events.disableBlur(), 
            e.focus(), t.shared.$f_el = e);
        }
        function r(e, t) {
            var r = t ? "last" : "first", i = e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible")[r]();
            if (i.length) return n(i), !0;
        }
        function i(e) {
            return e.is("input, textarea, select") && o(), t.events.disableBlur(), e.focus(), 
            !0;
        }
        function a(e, n) {
            var r = e.find("input, textarea, button, select").filter(":visible").not(":disabled").filter(n ? ":last" : ":first");
            if (r.length) return i(r);
            if (t.shared.with_kb) {
                var a = e.find(".fr-active-item:visible:first");
                if (a.length) return i(a);
                var o = e.find("[tabIndex]:visible:first");
                if (o.length) return i(o);
            }
        }
        function o() {
            0 === t.$el.find(".fr-marker").length && t.core.hasFocus() && t.selection.save();
        }
        function s() {
            var e = t.popups.areVisible();
            if (e) {
                var n = e.find(".fr-buttons");
                return n.find("button:focus, .fr-group span:focus").length ? !r(e.data("instance").$tb) : !r(n);
            }
            return !r(t.$tb);
        }
        function l() {
            var e = null;
            return t.shared.$f_el.is(".fr-dropdown.fr-active") ? e = t.shared.$f_el : t.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (e = t.shared.$f_el.closest(".fr-dropdown-menu").prev()), 
            e;
        }
        function d(i, o, s) {
            if (t.shared.$f_el) {
                var d = l();
                d && (t.button.click(d), t.shared.$f_el = d);
                var c = i.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible"), f = c.index(t.shared.$f_el);
                if (0 === f && !s || f == c.length - 1 && s) {
                    var p;
                    o && (i.parent().is(".fr-popup") && (p = !a(i.parent().children().not(".fr-buttons"), !s)), 
                    !1 === p && (t.shared.$f_el = null)), o && !1 === p || r(i, !s);
                } else n(e(c.get(f + (s ? 1 : -1))));
                return !1;
            }
        }
        function c(e, t) {
            return d(e, t, !0);
        }
        function f(e, t) {
            return d(e, t);
        }
        function p(e) {
            if (t.shared.$f_el) {
                var r;
                if (t.shared.$f_el.is(".fr-dropdown.fr-active")) return n(r = e ? t.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : t.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), 
                !1;
                if (t.shared.$f_el.is("a.fr-command")) return (r = e ? t.shared.$f_el.closest("li").nextAll(":visible:first").find(".fr-command:not(.fr-disabled)").first() : t.shared.$f_el.closest("li").prevAll(":visible:first").find(".fr-command:not(.fr-disabled)").first()).length || (r = e ? t.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : t.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), 
                n(r), !1;
            }
        }
        function u() {
            if (t.shared.$f_el) {
                if (t.shared.$f_el.hasClass("fr-dropdown")) t.button.click(t.shared.$f_el); else if (t.shared.$f_el.is("button.fr-back")) {
                    t.opts.toolbarInline && (t.events.disableBlur(), t.events.focus());
                    var e = t.popups.areVisible(t);
                    e && (t.shared.with_kb = !1), t.button.click(t.shared.$f_el), m(e);
                } else {
                    if (t.events.disableBlur(), t.button.click(t.shared.$f_el), t.shared.$f_el.attr("data-popup")) {
                        var n = t.popups.areVisible(t);
                        n && n.data("popup-button", t.shared.$f_el);
                    } else if (t.shared.$f_el.attr("data-modal")) {
                        var r = t.modals.areVisible(t);
                        r && r.data("modal-button", t.shared.$f_el);
                    }
                    t.shared.$f_el = null;
                }
                return !1;
            }
        }
        function h() {
            t.shared.$f_el && (t.events.disableBlur(), t.shared.$f_el.blur(), t.shared.$f_el = null), 
            !1 !== t.events.trigger("toolbar.focusEditor") && (t.events.disableBlur(), t.$el.focus(), 
            t.events.focus());
        }
        function g(n) {
            n && n.length && (t.events.$on(n, "keydown", function(r) {
                if (!e(r.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
                var i = n.parents(".fr-popup").data("instance") || n.data("instance") || t;
                t.shared.with_kb = !0;
                var a = i.accessibility.exec(r, n);
                return t.shared.with_kb = !1, a;
            }, !0), t.events.$on(n, "mouseenter", "[tabIndex]", function(r) {
                var i = n.parents(".fr-popup").data("instance") || n.data("instance") || t;
                if (!b) return r.stopPropagation(), void r.preventDefault();
                var a = e(r.currentTarget);
                i.shared.$f_el && i.shared.$f_el.not(a) && i.accessibility.focusEditor();
            }, !0));
        }
        function m(e) {
            var t = e.data("popup-button");
            t && setTimeout(function() {
                n(t), e.data("popup-button", null);
            }, 0);
        }
        function v(e) {
            var n = t.popups.areVisible(e);
            n && n.data("popup-button", null);
        }
        function E(n) {
            var r = -1 != navigator.userAgent.indexOf("Mac OS X") ? n.metaKey : n.ctrlKey;
            if (n.which == e.FE.KEYCODE.F10 && !r && !n.shiftKey && n.altKey) {
                t.shared.with_kb = !0;
                var i = t.popups.areVisible(t), o = !1;
                return i && (o = a(i.children().not(".fr-buttons"))), o || s(), t.shared.with_kb = !1, 
                n.preventDefault(), n.stopPropagation(), !1;
            }
            return !0;
        }
        var b = !0;
        return {
            _init: function() {
                t.$wp ? t.events.on("keydown", E, !0) : t.events.$on(t.$win, "keydown", E, !0), 
                t.events.on("mousedown", function(e) {
                    v(t), t.shared.$f_el && (t.accessibility.restoreSelection(), e.stopPropagation(), 
                    t.events.disableBlur(), t.shared.$f_el = null);
                }, !0), t.events.on("blur", function() {
                    t.shared.$f_el = null, v(t);
                }, !0);
            },
            registerPopup: function(n) {
                var i, o, s = t.popups.get(n), l = (i = n, o = t.popups.get(i), {
                    _tiKeydown: function(n) {
                        var s = o.data("instance") || t;
                        if (!1 === s.events.trigger("popup.tab", [ n ])) return !1;
                        var l = n.which, d = o.find(":focus:first");
                        if (e.FE.KEYCODE.TAB == l) {
                            n.preventDefault();
                            var c = o.children().not(".fr-buttons"), f = c.find("input, textarea, button, select").filter(":visible").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(), p = f.indexOf(this) + (n.shiftKey ? -1 : 1);
                            if (0 <= p && p < f.length) return s.events.disableBlur(), e(f[p]).focus(), n.stopPropagation(), 
                            !1;
                            var u = o.find(".fr-buttons");
                            if (u.length && r(u, !!n.shiftKey)) return n.stopPropagation(), !1;
                            if (a(c)) return n.stopPropagation(), !1;
                        } else {
                            if (e.FE.KEYCODE.ENTER != l || !n.target || "TEXTAREA" === n.target.tagName) return e.FE.KEYCODE.ESC == l ? (n.preventDefault(), 
                            n.stopPropagation(), s.accessibility.restoreSelection(), s.popups.isVisible(i) && o.find(".fr-back:visible").length ? (s.opts.toolbarInline && (s.events.disableBlur(), 
                            s.events.focus()), s.button.exec(o.find(".fr-back:visible:first")), m(o)) : s.popups.isVisible(i) && o.find(".fr-dismiss:visible").length ? s.button.exec(o.find(".fr-dismiss:visible:first")) : (s.popups.hide(i), 
                            s.opts.toolbarInline && s.toolbar.showInline(null, !0), m(o)), !1) : e.FE.KEYCODE.SPACE == l && (d.is(".fr-submit") || d.is(".fr-dismiss")) ? (n.preventDefault(), 
                            n.stopPropagation(), s.events.disableBlur(), s.button.exec(d), !0) : s.keys.isBrowserAction(n) ? void n.stopPropagation() : d.is("input[type=text], textarea") ? void n.stopPropagation() : e.FE.KEYCODE.SPACE == l && (d.is(".fr-link-attr") || d.is("input[type=file]")) ? void n.stopPropagation() : (n.stopPropagation(), 
                            n.preventDefault(), !1);
                            var h = null;
                            0 < o.find(".fr-submit:visible").length ? h = o.find(".fr-submit:visible:first") : o.find(".fr-dismiss:visible").length && (h = o.find(".fr-dismiss:visible:first")), 
                            h && (n.preventDefault(), n.stopPropagation(), s.events.disableBlur(), s.button.exec(h));
                        }
                    },
                    _tiMouseenter: function() {
                        v(o.data("instance") || t);
                    }
                });
                g(s.find(".fr-buttons")), t.events.$on(s, "mouseenter", "tabIndex", l._tiMouseenter, !0), 
                t.events.$on(s.children().not(".fr-buttons"), "keydown", "[tabIndex]", l._tiKeydown, !0), 
                t.popups.onHide(n, function() {
                    (s.data("instance") || t).accessibility.restoreSelection();
                }), t.popups.onShow(n, function() {
                    b = !1, setTimeout(function() {
                        b = !0;
                    }, 0);
                });
            },
            registerToolbar: g,
            focusToolbarElement: n,
            focusToolbar: r,
            focusContent: a,
            focusPopup: function(e) {
                var n = e.children().not(".fr-buttons");
                n.data("mouseenter-event-set") || (t.events.$on(n, "mouseenter", "[tabIndex]", function(r) {
                    var i = e.data("instance") || t;
                    if (!b) return r.stopPropagation(), void r.preventDefault();
                    var a = n.find(":focus:first");
                    a.length && !a.is("input, button, textarea, select") && (i.events.disableBlur(), 
                    a.blur(), i.events.disableBlur(), i.events.focus());
                }), n.data("mouseenter-event-set", !0)), !a(n) && t.shared.with_kb && r(e.find(".fr-buttons"));
            },
            focusModal: function(e) {
                t.core.hasFocus() || (t.events.disableBlur(), t.events.focus()), t.accessibility.saveSelection(), 
                t.events.disableBlur(), t.$el.blur(), t.selection.clear(), t.events.disableBlur(), 
                t.shared.with_kb ? e.find(".fr-command[tabIndex], [tabIndex]").first().focus() : e.find("[tabIndex]:first").focus();
            },
            focusEditor: h,
            focusPopupButton: m,
            focusModalButton: function(e) {
                var t = e.data("modal-button");
                t && setTimeout(function() {
                    n(t), e.data("modal-button", null);
                }, 0);
            },
            hasFocus: function() {
                return null != t.shared.$f_el;
            },
            exec: function(r, i) {
                var a = -1 != navigator.userAgent.indexOf("Mac OS X") ? r.metaKey : r.ctrlKey, o = r.which, d = !1;
                return o != e.FE.KEYCODE.TAB || a || r.shiftKey || r.altKey ? o != e.FE.KEYCODE.ARROW_RIGHT || a || r.shiftKey || r.altKey ? o != e.FE.KEYCODE.TAB || a || !r.shiftKey || r.altKey ? o != e.FE.KEYCODE.ARROW_LEFT || a || r.shiftKey || r.altKey ? o != e.FE.KEYCODE.ARROW_UP || a || r.shiftKey || r.altKey ? o != e.FE.KEYCODE.ARROW_DOWN || a || r.shiftKey || r.altKey ? o != e.FE.KEYCODE.ENTER && o != e.FE.KEYCODE.SPACE || a || r.shiftKey || r.altKey ? o != e.FE.KEYCODE.ESC || a || r.shiftKey || r.altKey ? o != e.FE.KEYCODE.F10 || a || r.shiftKey || !r.altKey || (d = s()) : d = function(e) {
                    if (t.shared.$f_el) {
                        var r = l();
                        return r ? (t.button.click(r), n(r)) : e.parent().find(".fr-back:visible").length ? (t.shared.with_kb = !1, 
                        t.opts.toolbarInline && (t.events.disableBlur(), t.events.focus()), t.button.exec(e.parent().find(".fr-back:visible:first")), 
                        m(e.parent())) : t.shared.$f_el.is("button, .fr-group span") && (e.parent().is(".fr-popup") ? (t.accessibility.restoreSelection(), 
                        t.shared.$f_el = null, !1 !== t.events.trigger("toolbar.esc") && (t.popups.hide(e.parent()), 
                        t.opts.toolbarInline && t.toolbar.showInline(null, !0), m(e.parent()))) : h()), 
                        !1;
                    }
                }(i) : d = u() : d = t.shared.$f_el && t.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? u() : p(!0) : d = p() : d = f(i) : d = f(i, !0) : d = c(i) : d = c(i, !0), 
                t.shared.$f_el || void 0 !== d || (d = !0), !d && t.keys.isBrowserAction(r) && (d = !0), 
                !!d || (r.preventDefault(), r.stopPropagation(), !1);
            },
            saveSelection: o,
            restoreSelection: function() {
                t.$el.find(".fr-marker").length && (t.events.disableBlur(), t.selection.restore(), 
                t.events.enableBlur());
            }
        };
    }, e.FE.MODULES.format = function(t) {
        function n(e, t) {
            var n = "<" + e;
            for (var r in t) t.hasOwnProperty(r) && (n += " " + r + '="' + t[r] + '"');
            return n += ">";
        }
        function r(e, t) {
            var n = e;
            for (var r in t) t.hasOwnProperty(r) && (n += "id" == r ? "#" + t[r] : "class" == r ? "." + t[r] : "[" + r + '="' + t[r] + '"]');
            return n;
        }
        function i(e, t) {
            return !(!e || e.nodeType != Node.ELEMENT_NODE) && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t);
        }
        function a(r, i, o) {
            if (r) {
                for (;r.nodeType === Node.COMMENT_NODE; ) r = r.nextSibling;
                if (r) {
                    if (t.node.isBlock(r) && "HR" !== r.tagName) return a(r.firstChild, i, o), !1;
                    for (var s = e(n(i, o)).insertBefore(r), l = r; l && !e(l).is(".fr-marker") && 0 === e(l).find(".fr-marker").length && "UL" != l.tagName && "OL" != l.tagName; ) {
                        var d = l;
                        l = l.nextSibling, s.append(d);
                    }
                    if (l) (e(l).find(".fr-marker").length || "UL" == l.tagName || "OL" == l.tagName) && a(l.firstChild, i, o); else {
                        for (var c = s.get(0).parentNode; c && !c.nextSibling && !t.node.isElement(c); ) c = c.parentNode;
                        if (c) {
                            var f = c.nextSibling;
                            f && (t.node.isBlock(f) ? "HR" === f.tagName ? a(f.nextSibling, i, o) : a(f.firstChild, i, o) : a(f, i, o));
                        }
                    }
                    s.is(":empty") && s.remove();
                }
            }
        }
        function o(o, s) {
            var l;
            if (void 0 === s && (s = {}), s.style && delete s.style, t.selection.isCollapsed()) t.markers.insert(), 
            t.$el.find(".fr-marker").replaceWith(n(o, s) + e.FE.INVISIBLE_SPACE + e.FE.MARKERS + "</" + o + ">"), 
            t.selection.restore(); else {
                var d;
                t.selection.save(), a(t.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, o, s);
                do {
                    for (d = t.$el.find(r(o, s) + " > " + r(o, s)), l = 0; l < d.length; l++) d[l].outerHTML = d[l].innerHTML;
                } while (d.length);
                t.el.normalize();
                var c = t.el.querySelectorAll(".fr-marker");
                for (l = 0; l < c.length; l++) {
                    var f = e(c[l]);
                    !0 === f.data("type") ? i(f.get(0).nextSibling, r(o, s)) && f.next().prepend(f) : i(f.get(0).previousSibling, r(o, s)) && f.prev().append(f);
                }
                t.selection.restore();
            }
        }
        function s(e, n, a, o) {
            if (!o) {
                var s = !1;
                if (!0 === e.data("type")) for (;t.node.isFirstSibling(e.get(0)) && !e.parent().is(t.$el) && !e.parent().is("ol") && !e.parent().is("ul"); ) e.parent().before(e), 
                s = !0; else if (!1 === e.data("type")) for (;t.node.isLastSibling(e.get(0)) && !e.parent().is(t.$el) && !e.parent().is("ol") && !e.parent().is("ul"); ) e.parent().after(e), 
                s = !0;
                if (s) return !0;
            }
            if (e.parents(n).length || void 0 === n) {
                var l = "", d = "", c = e.parent();
                if (c.is(t.$el) || t.node.isBlock(c.get(0))) return !1;
                for (;!t.node.isBlock(c.parent().get(0)) && (void 0 === n || void 0 !== n && !i(c.get(0), r(n, a))); ) l += t.node.closeTagString(c.get(0)), 
                d = t.node.openTagString(c.get(0)) + d, c = c.parent();
                var f = e.get(0).outerHTML;
                e.replaceWith('<span id="mark"></span>');
                var p = c.html().replace(/<span id="mark"><\/span>/, l + t.node.closeTagString(c.get(0)) + d + f + l + t.node.openTagString(c.get(0)) + d);
                return c.replaceWith(t.node.openTagString(c.get(0)) + p + t.node.closeTagString(c.get(0))), 
                !0;
            }
            return !1;
        }
        function l(n, a) {
            void 0 === a && (a = {}), a.style && delete a.style;
            var o = t.selection.isCollapsed();
            t.selection.save();
            for (var l = !0; l; ) {
                l = !1;
                for (var d = t.$el.find(".fr-marker"), c = 0; c < d.length; c++) {
                    var f = e(d[c]), p = null;
                    if (f.attr("data-cloned") || o || (p = f.clone().removeClass("fr-marker").addClass("fr-clone"), 
                    !0 === f.data("type") ? f.attr("data-cloned", !0).after(p) : f.attr("data-cloned", !0).before(p)), 
                    s(f, n, a, o)) {
                        l = !0;
                        break;
                    }
                }
            }
            !function n(a, o, s, l) {
                for (var d = t.node.contents(a.get(0)), c = 0; c < d.length; c++) {
                    var f = d[c];
                    if (t.node.hasClass(f, "fr-marker")) o = (o + 1) % 2; else if (o) if (0 < e(f).find(".fr-marker").length) o = n(e(f), o, s, l); else {
                        for (var p = e(f).find(s || "*:not(a):not(br)"), u = p.length - 1; 0 <= u; u--) {
                            var h = p[u];
                            t.node.isBlock(h) || t.node.isVoid(h) || void 0 !== s && !i(h, r(s, l)) ? t.node.isBlock(h) && void 0 === s && "TABLE" != f.tagName && t.node.clearAttributes(h) : t.node.hasClass(h, "fr-clone") || (h.outerHTML = h.innerHTML);
                        }
                        void 0 === s && f.nodeType == Node.ELEMENT_NODE && !t.node.isVoid(f) || i(f, r(s, l)) ? e(f).replaceWith(f.innerHTML) : void 0 === s && f.nodeType == Node.ELEMENT_NODE && t.node.isBlock(f) && "TABLE" != f.tagName && t.node.clearAttributes(f);
                    } else 0 < e(f).find(".fr-marker").length && (o = n(e(f), o, s, l));
                }
                return o;
            }(t.$el, 0, n, a), o || (t.$el.find(".fr-marker").remove(), t.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")), 
            o && t.$el.find(".fr-marker").before(e.FE.INVISIBLE_SPACE).after(e.FE.INVISIBLE_SPACE), 
            t.html.cleanEmptyTags(), t.el.normalize(), t.selection.restore();
        }
        function d(n, r) {
            var i, o, l, d, f, p = null;
            if (t.selection.isCollapsed()) {
                t.markers.insert();
                var u = (o = t.$el.find(".fr-marker")).parent();
                if (t.node.openTagString(u.get(0)) == '<span style="' + n + ": " + u.css(n) + ';">') {
                    if (t.node.isEmpty(u.get(0))) p = e('<span style="' + n + ": " + r + ';">' + e.FE.INVISIBLE_SPACE + e.FE.MARKERS + "</span>"), 
                    u.replaceWith(p); else {
                        var h = {};
                        h["style*"] = n + ":", s(o, "span", h, !0), o = t.$el.find(".fr-marker"), r ? (p = e('<span style="' + n + ": " + r + ';">' + e.FE.INVISIBLE_SPACE + e.FE.MARKERS + "</span>"), 
                        o.replaceWith(p)) : o.replaceWith(e.FE.INVISIBLE_SPACE + e.FE.MARKERS);
                    }
                    t.html.cleanEmptyTags();
                } else t.node.isEmpty(u.get(0)) && u.is("span") ? (o.replaceWith(e.FE.MARKERS), 
                u.css(n, r)) : (p = e('<span style="' + n + ": " + r + ';">' + e.FE.INVISIBLE_SPACE + e.FE.MARKERS + "</span>"), 
                o.replaceWith(p));
                p && c(p, n, r);
            } else {
                if (t.selection.save(), null == r || "color" == n && 0 < t.$el.find(".fr-marker").parents("u, a").length) {
                    var g = t.$el.find(".fr-marker");
                    for (i = 0; i < g.length; i++) if (!0 === (o = e(g[i])).data("type")) for (;t.node.isFirstSibling(o.get(0)) && !o.parent().is(t.$el) && !t.node.isElement(o.parent().get(0)) && !t.node.isBlock(o.parent().get(0)); ) o.parent().before(o); else for (;t.node.isLastSibling(o.get(0)) && !o.parent().is(t.$el) && !t.node.isElement(o.parent().get(0)) && !t.node.isBlock(o.parent().get(0)); ) o.parent().after(o);
                }
                var m = t.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, v = {
                    class: "fr-unprocessed"
                };
                for (r && (v.style = n + ": " + r + ";"), a(m, "span", v), t.$el.find(".fr-marker + .fr-unprocessed").each(function() {
                    e(this).prepend(e(this).prev());
                }), t.$el.find(".fr-unprocessed + .fr-marker").each(function() {
                    e(this).prev().append(this);
                }), (r || "").match(/\dem$/) && t.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); 0 < t.$el.find("span.fr-unprocessed").length; ) {
                    if ((p = t.$el.find("span.fr-unprocessed:first").removeClass("fr-unprocessed")).parent().get(0).normalize(), 
                    p.parent().is("span") && 1 == p.parent().get(0).childNodes.length) {
                        p.parent().css(n, r);
                        var E = p;
                        p = p.parent(), E.replaceWith(E.html());
                    }
                    var b = p.find("span");
                    for (i = b.length - 1; 0 <= i; i--) l = b[i], d = n, f = void 0, (f = e(l)).css(d, ""), 
                    "" === f.attr("style") && f.replaceWith(f.html());
                    c(p, n, r);
                }
            }
            !function() {
                for (var n; 0 < t.$el.find(".fr-split:empty").length; ) t.$el.find(".fr-split:empty").remove();
                t.$el.find(".fr-split").removeClass("fr-split"), t.$el.find('[style=""]').removeAttr("style"), 
                t.$el.find('[class=""]').removeAttr("class"), t.html.cleanEmptyTags(), e(t.$el.find("span").get().reverse()).each(function() {
                    this.attributes && 0 !== this.attributes.length || e(this).replaceWith(this.innerHTML);
                }), t.el.normalize();
                var r = t.$el.find("span[style] + span[style]");
                for (n = 0; n < r.length; n++) {
                    var i = e(r[n]), a = e(r[n]).prev();
                    i.get(0).previousSibling == a.get(0) && t.node.openTagString(i.get(0)) == t.node.openTagString(a.get(0)) && (i.prepend(a.html()), 
                    a.remove());
                }
                t.$el.find("span[style] span[style]").each(function() {
                    if (0 <= e(this).attr("style").indexOf("font-size")) {
                        var t = e(this).parents("span[style]");
                        0 <= t.attr("style").indexOf("background-color") && (e(this).attr("style", e(this).attr("style") + ";" + t.attr("style")), 
                        s(e(this), "span[style]", {}, !1));
                    }
                }), t.el.normalize(), t.selection.restore();
            }();
        }
        function c(n, r, i) {
            var a, o, s, l = n.parentsUntil(t.$el, "span[style]"), d = [];
            for (a = l.length - 1; 0 <= a; a--) o = l[a], s = r, 0 === e(o).attr("style").indexOf(s + ":") || 0 <= e(o).attr("style").indexOf(";" + s + ":") || 0 <= e(o).attr("style").indexOf("; " + s + ":") || d.push(l[a]);
            if ((l = l.not(d)).length) {
                for (var c = "", f = "", p = "", u = "", h = n.get(0); h = h.parentNode, e(h).addClass("fr-split"), 
                c += t.node.closeTagString(h), f = t.node.openTagString(e(h).clone().addClass("fr-split").get(0)) + f, 
                l.get(0) != h && (p += t.node.closeTagString(h), u = t.node.openTagString(e(h).clone().addClass("fr-split").get(0)) + u), 
                l.get(0) != h; ) ;
                var g = c + t.node.openTagString(e(l.get(0)).clone().css(r, i || "").get(0)) + u + n.css(r, "").get(0).outerHTML + p + "</span>" + f;
                n.replaceWith('<span id="fr-break"></span>');
                var m = l.get(0).outerHTML;
                e(l.get(0)).replaceWith(m.replace(/<span id="fr-break"><\/span>/g, g));
            }
        }
        function f(e, n) {
            void 0 === n && (n = {}), n.style && delete n.style;
            var a = t.selection.ranges(0), o = a.startContainer;
            if (o.nodeType == Node.ELEMENT_NODE && 0 < o.childNodes.length && o.childNodes[a.startOffset] && (o = o.childNodes[a.startOffset]), 
            !a.collapsed && o.nodeType == Node.TEXT_NODE && a.startOffset == (o.textContent || "").length) {
                for (;!t.node.isBlock(o.parentNode) && !o.nextSibling; ) o = o.parentNode;
                o.nextSibling && (o = o.nextSibling);
            }
            for (var s = o; s && s.nodeType == Node.ELEMENT_NODE && !i(s, r(e, n)); ) s = s.firstChild;
            if (s && s.nodeType == Node.ELEMENT_NODE && i(s, r(e, n))) return !0;
            var l = o;
            for (l && l.nodeType != Node.ELEMENT_NODE && (l = l.parentNode); l && l.nodeType == Node.ELEMENT_NODE && l != t.el && !i(l, r(e, n)); ) l = l.parentNode;
            return !(!l || l.nodeType != Node.ELEMENT_NODE || l == t.el || !i(l, r(e, n)));
        }
        return {
            is: f,
            toggle: function(e, t) {
                f(e, t) ? l(e, t) : o(e, t);
            },
            apply: o,
            remove: l,
            applyStyle: d,
            removeStyle: function(e) {
                d(e, null);
            }
        };
    }, e.extend(e.FE.DEFAULTS, {
        indentMargin: 20
    }), e.FE.COMMANDS = {
        bold: {
            title: "Bold",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("strong");
                e.toggleClass("fr-active", t).attr("aria-pressed", t);
            }
        },
        italic: {
            title: "Italic",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("em");
                e.toggleClass("fr-active", t).attr("aria-pressed", t);
            }
        },
        underline: {
            title: "Underline",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("u");
                e.toggleClass("fr-active", t).attr("aria-pressed", t);
            }
        },
        strikeThrough: {
            title: "Strikethrough",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("s");
                e.toggleClass("fr-active", t).attr("aria-pressed", t);
            }
        },
        subscript: {
            title: "Subscript",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("sub");
                e.toggleClass("fr-active", t).attr("aria-pressed", t);
            }
        },
        superscript: {
            title: "Superscript",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("sup");
                e.toggleClass("fr-active", t).attr("aria-pressed", t);
            }
        },
        outdent: {
            title: "Decrease Indent"
        },
        indent: {
            title: "Increase Indent"
        },
        undo: {
            title: "Undo",
            undo: !1,
            forcedRefresh: !0,
            disabled: !0
        },
        redo: {
            title: "Redo",
            undo: !1,
            forcedRefresh: !0,
            disabled: !0
        },
        insertHR: {
            title: "Insert Horizontal Line"
        },
        clearFormatting: {
            title: "Clear Formatting"
        },
        selectAll: {
            title: "Select All",
            undo: !1
        }
    }, e.FE.RegisterCommand = function(t, n) {
        e.FE.COMMANDS[t] = n;
    }, e.FE.MODULES.commands = function(t) {
        function n(e) {
            return t.html.defaultTag() && (e = "<" + t.html.defaultTag() + ">" + e + "</" + t.html.defaultTag() + ">"), 
            e;
        }
        function r(n, r) {
            if (!1 !== t.events.trigger("commands.before", e.merge([ n ], r || []))) {
                var i = e.FE.COMMANDS[n] && e.FE.COMMANDS[n].callback || o[n], a = !0, s = !1;
                e.FE.COMMANDS[n] && (void 0 !== e.FE.COMMANDS[n].focus && (a = e.FE.COMMANDS[n].focus), 
                void 0 !== e.FE.COMMANDS[n].accessibilityFocus && (s = e.FE.COMMANDS[n].accessibilityFocus)), 
                (!t.core.hasFocus() && a && !t.popups.areVisible() || !t.core.hasFocus() && s && t.accessibility.hasFocus()) && t.events.focus(!0), 
                e.FE.COMMANDS[n] && !1 !== e.FE.COMMANDS[n].undo && (t.$el.find(".fr-marker").length && (t.events.disableBlur(), 
                t.selection.restore()), t.undo.saveStep()), i && i.apply(t, e.merge([ n ], r || [])), 
                t.events.trigger("commands.after", e.merge([ n ], r || [])), e.FE.COMMANDS[n] && !1 !== e.FE.COMMANDS[n].undo && t.undo.saveStep();
            }
        }
        function i(e, n) {
            t.format.toggle(n);
        }
        function a(n) {
            t.selection.save(), t.html.wrap(!0, !0, !0, !0), t.selection.restore();
            for (var r = t.selection.blocks(), i = 0; i < r.length; i++) if ("LI" != r[i].tagName && "LI" != r[i].parentNode.tagName) {
                var a = e(r[i]), o = "rtl" == t.opts.direction || "rtl" == a.css("direction") ? "margin-right" : "margin-left", s = t.helpers.getPX(a.css(o));
                if (a.width() < 2 * t.opts.indentMargin && 0 < n) continue;
                a.css(o, Math.max(s + n * t.opts.indentMargin, 0) || ""), a.removeClass("fr-temp-div");
            }
            t.selection.save(), t.html.unwrap(), t.selection.restore();
        }
        var o = {
            bold: function() {
                i("bold", "strong");
            },
            subscript: function() {
                t.format.is("sup") && t.format.remove("sup"), i("subscript", "sub");
            },
            superscript: function() {
                t.format.is("sub") && t.format.remove("sub"), i("superscript", "sup");
            },
            italic: function() {
                i("italic", "em");
            },
            strikeThrough: function() {
                i("strikeThrough", "s");
            },
            underline: function() {
                i("underline", "u");
            },
            undo: function() {
                t.undo.run();
            },
            redo: function() {
                t.undo.redo();
            },
            indent: function() {
                a(1);
            },
            outdent: function() {
                a(-1);
            },
            show: function() {
                t.opts.toolbarInline && t.toolbar.showInline(null, !0);
            },
            insertHR: function() {
                t.selection.remove();
                var r = "";
                t.core.isEmpty() && (r = n(r = "<br>")), t.html.insert('<hr id="fr-just">' + r);
                var i, a = t.$el.find("hr#fr-just");
                if (a.removeAttr("id"), 0 === a.next().length) {
                    var o = t.html.defaultTag();
                    o ? a.after(e("<" + o + ">").append("<br>")) : a.after("<br>");
                }
                a.prev().is("hr") ? i = t.selection.setAfter(a.get(0), !1) : a.next().is("hr") ? i = t.selection.setBefore(a.get(0), !1) : t.selection.setAfter(a.get(0), !1) || t.selection.setBefore(a.get(0), !1), 
                i || void 0 === i || (r = n(r = e.FE.MARKERS + "<br>"), a.after(r)), t.selection.restore();
            },
            clearFormatting: function() {
                t.format.remove();
            },
            selectAll: function() {
                t.doc.execCommand("selectAll", !1, !1);
            }
        }, s = {};
        for (var l in o) o.hasOwnProperty(l) && (s[l] = function(e) {
            return function() {
                r(e);
            };
        }(l));
        return e.extend(s, {
            exec: r,
            _init: function() {
                t.events.on("keydown", function(e) {
                    var n = t.selection.element();
                    if (n && "HR" == n.tagName && !t.keys.isArrow(e.which)) return e.preventDefault(), 
                    !1;
                }), t.events.on("keyup", function(n) {
                    var r = t.selection.element();
                    if (r && "HR" == r.tagName) if (n.which == e.FE.KEYCODE.ARROW_LEFT || n.which == e.FE.KEYCODE.ARROW_UP) {
                        if (r.previousSibling) return t.node.isBlock(r.previousSibling) ? t.selection.setAtEnd(r.previousSibling) : e(r).before(e.FE.MARKERS), 
                        t.selection.restore(), !1;
                    } else if ((n.which == e.FE.KEYCODE.ARROW_RIGHT || n.which == e.FE.KEYCODE.ARROW_DOWN) && r.nextSibling) return t.node.isBlock(r.nextSibling) ? t.selection.setAtStart(r.nextSibling) : e(r).after(e.FE.MARKERS), 
                    t.selection.restore(), !1;
                }), t.events.on("mousedown", function(e) {
                    if (e.target && "HR" == e.target.tagName) return e.preventDefault(), e.stopPropagation(), 
                    !1;
                }), t.events.on("mouseup", function() {
                    var n = t.selection.element();
                    n == t.selection.endElement() && n && "HR" == n.tagName && (n.nextSibling && (t.node.isBlock(n.nextSibling) ? t.selection.setAtStart(n.nextSibling) : e(n).after(e.FE.MARKERS)), 
                    t.selection.restore());
                });
            }
        });
    }, e.FE.MODULES.data = function(t) {
        function n(e) {
            return e;
        }
        function r(e) {
            for (var t = e.toString(), n = 0, r = 0; r < t.length; r++) n += parseInt(t.charAt(r), 10);
            return 10 < n ? n % 9 + 1 : n;
        }
        function i(e, t, n) {
            for (var r = Math.abs(n); 0 < r--; ) e -= t;
            return n < 0 && (e += 123), e;
        }
        function a(e) {
            return !(!e || "block" === e.css("display") || (e.remove(), 0));
        }
        function o(e) {
            return e && 0 === t.$box.find(e).length;
        }
        function s() {
            if (10 < h && (t[n(u("0ppecjvc=="))](), setTimeout(function() {
                e.FE = null;
            }, 10)), !t.$box) return !1;
            t.$wp.prepend(u(n(u(f)))), d = t.$wp.find("> div:first"), c = d.find("> a"), "rtl" == t.opts.direction && d.css("left", "auto").css("right", 0).attr("direction", "rtl"), 
            h++;
        }
        function l(e) {
            for (var t = [ u("9qqG-7amjlwq=="), u("KA3B3C2A6D1D5H5H1A3=="), u("3B9B3B5F3C4G3E3=="), u("QzbzvxyB2yA-9m=="), u("ji1kacwmgG5bc=="), u("nmA-13aogi1A3c1jd==") ], n = 0; n < t.length; n++) if (e.endsWith(t[n])) return !0;
            return !1;
        }
        var d, c, f = "function i2(){return 1}", p = function() {
            for (var e = 0, t = document.domain, n = t.split("."), r = "_gd" + new Date().getTime(); e < n.length - 1 && -1 == document.cookie.indexOf(r + "=" + r); ) t = n.slice(-1 - ++e).join("."), 
            document.cookie = r + "=" + r + ";domain=" + t + ";";
            return document.cookie = r + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + t + ";", 
            (t || "").replace(/(^\.*)|(\.*$)/g, "");
        }(), u = n(function(e) {
            if (!e) return e;
            for (var t = "", a = n("charCodeAt"), o = n("fromCharCode"), s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(e[0]), l = 1; l < e.length - 2; l++) {
                for (var d = r(++s), c = e[a](l), f = ""; /[0-9-]/.test(e[l + 1]); ) f += e[++l];
                c = i(c, d, f = parseInt(f, 10) || 0), c ^= s - 1 & 31, t += String[o](c);
            }
            return t;
        }), h = 0;
        return {
            _init: function() {
                var e = t.o_win.FEK;
                try {
                    e = e || localStorage && localStorage.FEK;
                } catch (e) {}
                e = t.opts.key || e || [ "" ];
                var r = u(n("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
                console.info("t=" + r+" e="+e);
                "string" == typeof e && (e = [ e ]);
                for (var i, h, g, m = !(t.ul = !0), v = 0, E = 0; E < e.length; E++) {
                    var b = (h = e[E], 3 === (g = (u(h) || "").split("|")).length ? g : [ null, null, u(h) || "" ]), T = b[2];
                    if (console.log(T + "," + u(n(u("mcVRDoB1BGILD7YFe1BTXBA7B6==")))), T === u(n(u("mcVRDoB1BGILD7YFe1BTXBA7B6=="))) || 0 <= T.indexOf(p, T.length - p.length) || l(p)) {
                        if (console.log(b + "," + new Date(u("OB1F1A4D3I1A15A11D3E6B5=="))), i = b[1], !(new Date(i) < new Date(u("OB1F1A4D3I1A15A11D3E6B5==")) && null !== b[1])) {
                            t.ul = !1;
                            break;
                        }
                        m = !0, f = "", v = b[0];
                    } else null === b[0] && 0 < b[2].length && (m = !0, f = "", v = -1);
                }
                t.ul=false,
                var A = new Image(); 
                !0 === t.ul && (s(), A.src = m ? n(u(r)) + "e=" + v : n(u(r)) + "u"), 
                !0 === t.ul && t.events.on("contentChanged", function() {
                    console.log("contentchanged:"), console.log(d), console.log(c), console.log("------"), 
                    (a(d) || a(c) || o(d) || o(c)) && s();
                }), t.events.on("destroy", function() {
                    d && d.length && d.remove();
                }, !0);
            }
        };
    }, e.extend(e.FE.DEFAULTS, {
        pastePlain: !1,
        pasteDeniedTags: [ "colgroup", "col", "meta" ],
        pasteDeniedAttrs: [ "class", "id", "style" ],
        pasteAllowedStyleProps: [ ".*" ],
        pasteAllowLocalImages: !1
    }), e.FE.MODULES.paste = function(t) {
        function n(e, n) {
            try {
                t.win.localStorage.setItem("fr-copied-html", e), t.win.localStorage.setItem("fr-copied-text", n);
            } catch (e) {}
        }
        function r(r) {
            var i = t.html.getSelected();
            n(i, e("<div>").html(i).text()), "cut" == r.type && (t.undo.saveStep(), setTimeout(function() {
                t.selection.save(), t.html.wrap(), t.selection.restore(), t.events.focus(), t.undo.saveStep();
            }, 0));
        }
        function i(n) {
            if (m) return !1;
            if (n.originalEvent && (n = n.originalEvent), !1 === t.events.trigger("paste.before", [ n ])) return n.preventDefault(), 
            !1;
            if (t.$win.scrollTop(), n && n.clipboardData && n.clipboardData.getData) {
                var r = "", i = n.clipboardData.types;
                if (t.helpers.isArray(i)) for (var a = 0; a < i.length; a++) r += i[a] + ";"; else r = i;
                if (p = "", /text\/rtf/.test(r) && (u = n.clipboardData.getData("text/rtf")), /text\/html/.test(r) && !t.browser.safari ? p = n.clipboardData.getData("text/html") : /text\/rtf/.test(r) && t.browser.safari ? p = u : /public.rtf/.test(r) && t.browser.safari && (p = n.clipboardData.getData("text/rtf")), 
                "" !== p) return o(), n.preventDefault && (n.stopPropagation(), n.preventDefault()), 
                !1;
                p = null;
            }
            return function() {
                t.selection.save(), t.events.disableBlur(), p = null, h ? (h.html(""), t.browser.edge && t.opts.iframe && t.$el.append(h)) : (h = e('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>'), 
                t.browser.safari ? (h.css("top", t.$sc.scrollTop()), t.$el.after(h)) : t.browser.edge && t.opts.iframe ? t.$el.append(h) : t.$box.after(h), 
                t.events.on("destroy", function() {
                    h.remove();
                })), h.focus(), t.win.setTimeout(o, 1);
            }(), !1;
        }
        function a(n) {
            if (n.originalEvent && (n = n.originalEvent), n && n.dataTransfer && n.dataTransfer.getData) {
                var r = "", i = n.dataTransfer.types;
                if (t.helpers.isArray(i)) for (var a = 0; a < i.length; a++) r += i[a] + ";"; else r = i;
                if (p = "", /text\/rtf/.test(r) && (u = n.dataTransfer.getData("text/rtf")), /text\/html/.test(r) ? p = n.dataTransfer.getData("text/html") : /text\/rtf/.test(r) && t.browser.safari ? p = u : /text\/plain/.test(r) && !this.browser.mozilla && (p = t.html.escapeEntities(n.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")), 
                "" !== p) {
                    t.keys.forceUndo(), g = t.snapshot.get(), t.selection.save(), t.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper");
                    var s = t.markers.insertAtPoint(n);
                    if (t.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), 
                    t.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), 
                    t.selection.restore(), t.selection.remove(), t.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), 
                    !1 !== s) {
                        var l = t.el.querySelector(".fr-marker");
                        return e(l).replaceWith(e.FE.MARKERS), t.selection.restore(), o(), n.preventDefault && (n.stopPropagation(), 
                        n.preventDefault()), !1;
                    }
                } else p = null;
            }
        }
        function o() {
            t.browser.edge && t.opts.iframe && t.$box.after(h), g || (t.keys.forceUndo(), g = t.snapshot.get()), 
            p || (p = h.get(0).innerHTML, t.selection.restore(), t.events.enableBlur());
            var e = p.match(/(class=\"?Mso|class=\'?Mso|class="?Xl|class='?Xl|class=Xl|style=\"[^\"]*\bmso\-|style=\'[^\']*\bmso\-|w:WordDocument)/gi), n = t.events.chainTrigger("paste.beforeCleanup", p);
            n && "string" == typeof n && (p = n), (!e || e && !1 !== t.events.trigger("paste.wordPaste", [ p ])) && l(p, e);
        }
        function s(e) {
            for (var t = "", n = 0; n++ < e; ) t += "&nbsp;";
            return t;
        }
        function l(n, r, i) {
            var a, o = null, l = null;
            if (0 <= n.toLowerCase().indexOf("<body")) {
                var d = "";
                0 <= n.indexOf("<style") && (d = n.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1")), 
                n = (n = d + n.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1")).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2");
            }
            var f = !1;
            0 <= n.indexOf('id="docs-internal-guid') && (n = n.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"), 
            f = !0);
            var p = !1;
            if (!r && ((p = function(n) {
                var r = null;
                try {
                    r = t.win.localStorage.getItem("fr-copied-text");
                } catch (e) {}
                return !(!r || e("<div>").html(n).text().replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") != r.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, ""));
            }(n)) && (n = t.win.localStorage.getItem("fr-copied-html")), !p)) {
                var u = t.opts.htmlAllowedStyleProps;
                t.opts.htmlAllowedStyleProps = t.opts.pasteAllowedStyleProps, t.opts.htmlAllowComments = !1, 
                n = (n = (n = n.replace(/<span class="Apple-tab-span">\s*<\/span>/g, s(t.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function(e, n) {
                    return s(n.length * (t.opts.tabSpaces || 4));
                })).replace(/\t/g, s(t.opts.tabSpaces || 4)), n = t.clean.html(n, t.opts.pasteDeniedTags, t.opts.pasteDeniedAttrs), 
                t.opts.htmlAllowedStyleProps = u, t.opts.htmlAllowComments = !0, n = (n = (n = c(n)).replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "");
            }
            !r || t.wordPaste && i || (0 === (n = n.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>") && (n = "<table>" + n + "</table>"), 
            n = c(n = function(e) {
                var n;
                e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>")).replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>")).replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>")).replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span")).replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, "")).replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi, "")).replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " ")).replace(/<!--[\s\S]*?-->/gi, "")).replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
                var r, i = [ "style", "script", "applet", "embed", "noframes", "noscript" ];
                for (n = 0; n < i.length; n++) {
                    var a = new RegExp("<" + i[n] + ".*?" + i[n] + "(.*?)>", "gi");
                    e = e.replace(a, "");
                }
                for (e = (e = (e = e.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>"); (e = (r = e).replace(/<[^\/>][^>]*><\/[^>]+>/gi, "")) != r; ) ;
                e = (e = e.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>"), 
                e = (e = (e = t.clean.html(e, t.opts.pasteDeniedTags, t.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
                var o = t.o_doc.createElement("div");
                o.innerHTML = e;
                var s = o.querySelectorAll("li[data-indent]");
                for (n = 0; n < s.length; n++) {
                    var l = s[n], d = l.previousElementSibling;
                    if (d && "LI" == d.tagName) {
                        var c = d.querySelector(":scope > ul, :scope > ol");
                        c || (c = document.createElement("ul"), d.appendChild(c)), c.appendChild(l);
                    } else l.removeAttribute("data-indent");
                }
                return t.html.cleanBlankSpaces(o), e = o.innerHTML;
            }(n))), t.opts.pastePlain && !p && (n = function(e) {
                var n, r = null, i = t.doc.createElement("div");
                i.innerHTML = e;
                var a = i.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
                for (n = 0; n < a.length; n++) (r = a[n]).outerHTML = "<" + (t.html.defaultTag() || "DIV") + ">" + r.innerHTML + "</" + (t.html.defaultTag() || "DIV") + ">";
                for (n = (a = i.querySelectorAll("*:not(" + "p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not(") + ")")).length - 1; 0 <= n; n--) (r = a[n]).outerHTML = r.innerHTML;
                var o = function(e) {
                    for (var n = t.node.contents(e), r = 0; r < n.length; r++) n[r].nodeType != Node.TEXT_NODE && n[r].nodeType != Node.ELEMENT_NODE ? n[r].parentNode.removeChild(n[r]) : o(n[r]);
                };
                return o(i), i.innerHTML;
            }(n));
            var h = t.events.chainTrigger("paste.afterCleanup", n);
            if ("string" == typeof h && (n = h), "" !== n) {
                var m = t.o_doc.createElement("div");
                0 <= (m.innerHTML = n).indexOf("<body>") ? (t.html.cleanBlankSpaces(m), t.spaces.normalize(m, !0)) : t.spaces.normalize(m);
                var v = m.getElementsByTagName("span");
                for (a = v.length - 1; 0 <= a; a--) {
                    var E = v[a];
                    0 === E.attributes.length && (E.outerHTML = E.innerHTML);
                }
                var b = t.selection.element(), T = !1;
                if (b && e(b).parentsUntil(t.el, "ul, ol").length && (T = !0), T) {
                    var A = m.children;
                    1 == A.length && 0 <= [ "OL", "UL" ].indexOf(A[0].tagName) && (A[0].outerHTML = A[0].innerHTML);
                }
                if (!f) {
                    var S = m.getElementsByTagName("br");
                    for (a = S.length - 1; 0 <= a; a--) {
                        var R = S[a];
                        t.node.isBlock(R.previousSibling) && R.parentNode.removeChild(R);
                    }
                }
                if (t.opts.enter == e.FE.ENTER_BR) for (a = (o = m.querySelectorAll("p, div")).length - 1; 0 <= a; a--) 0 === (l = o[a]).attributes.length && (l.outerHTML = l.innerHTML + (l.nextSibling && !t.node.isEmpty(l) ? "<br>" : "")); else if (t.opts.enter == e.FE.ENTER_DIV) for (a = (o = m.getElementsByTagName("p")).length - 1; 0 <= a; a--) 0 === (l = o[a]).attributes.length && (l.outerHTML = "<div>" + l.innerHTML + "</div>"); else t.opts.enter == e.FE.ENTER_P && 1 == m.childNodes.length && "P" == m.childNodes[0].tagName && 0 === m.childNodes[0].attributes.length && (m.childNodes[0].outerHTML = m.childNodes[0].innerHTML);
                n = m.innerHTML, p && (n = function(n) {
                    var r, i = t.o_doc.createElement("div");
                    i.innerHTML = n;
                    for (var a = i.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(" + e.FE.VOID_ELEMENTS.join("):not(") + "):not(" + t.opts.htmlAllowedEmptyTags.join("):not(") + ")"); a.length; ) {
                        for (r = 0; r < a.length; r++) a[r].parentNode.removeChild(a[r]);
                        a = i.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(" + e.FE.VOID_ELEMENTS.join("):not(") + "):not(" + t.opts.htmlAllowedEmptyTags.join("):not(") + ")");
                    }
                    return i.innerHTML;
                }(n)), t.html.insert(n, !0);
            }
            t.events.trigger("paste.after"), t.undo.saveStep(g), g = null, t.undo.saveStep();
        }
        function d(e) {
            for (var t = e.length - 1; 0 <= t; t--) e[t].attributes && e[t].attributes.length && e.splice(t, 1);
            return e;
        }
        function c(e) {
            var n, r = t.o_doc.createElement("div");
            r.innerHTML = e;
            for (var i = d(Array.prototype.slice.call(r.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])"))); i.length; ) {
                var a = i[i.length - 1];
                if (t.html.defaultTag() && "div" != t.html.defaultTag()) a.querySelector(t.html.blockTagsQuery()) ? a.outerHTML = a.innerHTML : a.outerHTML = "<" + t.html.defaultTag() + ">" + a.innerHTML + "</" + t.html.defaultTag() + ">"; else {
                    var o = a.querySelectorAll("*");
                    !o.length || "BR" !== o[o.length - 1].tagName && 0 === a.innerText.length ? a.outerHTML = a.innerHTML + "<br>" : a.outerHTML = a.innerHTML;
                }
                i = d(Array.prototype.slice.call(r.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")));
            }
            for (i = d(Array.prototype.slice.call(r.querySelectorAll("div:not([style])"))); i.length; ) {
                for (n = 0; n < i.length; n++) {
                    var s = i[n], l = s.innerHTML.replace(/\u0009/gi, "").trim();
                    s.outerHTML = l;
                }
                i = d(Array.prototype.slice.call(r.querySelectorAll("div:not([style])")));
            }
            return r.innerHTML;
        }
        function f() {
            t.el.removeEventListener("copy", r), t.el.removeEventListener("cut", r), t.el.removeEventListener("paste", i);
        }
        var p, u, h, g, m = !1;
        return {
            _init: function() {
                t.el.addEventListener("copy", r), t.el.addEventListener("cut", r), t.el.addEventListener("paste", i, {
                    capture: !0
                }), t.events.on("drop", a), t.browser.msie && t.browser.version < 11 && (t.events.on("mouseup", function(e) {
                    2 == e.button && (setTimeout(function() {
                        m = !1;
                    }, 50), m = !0);
                }, !0), t.events.on("beforepaste", i)), t.events.on("destroy", f);
            },
            cleanEmptyTagsAndDivs: c,
            getRtfClipboard: function() {
                return u;
            },
            saveCopiedText: n,
            clean: l
        };
    }, e.extend(e.FE.DEFAULTS, {
        shortcutsEnabled: [],
        shortcutsHint: !0
    }), e.FE.SHORTCUTS_MAP = {}, e.FE.RegisterShortcut = function(t, n, r, i, a, o) {
        e.FE.SHORTCUTS_MAP[(a ? "^" : "") + (o ? "@" : "") + t] = {
            cmd: n,
            val: r,
            letter: i,
            shift: a,
            option: o
        }, e.FE.DEFAULTS.shortcutsEnabled.push(n);
    }, e.FE.RegisterShortcut(e.FE.KEYCODE.E, "show", null, "E", !1, !1), e.FE.RegisterShortcut(e.FE.KEYCODE.B, "bold", null, "B", !1, !1), 
    e.FE.RegisterShortcut(e.FE.KEYCODE.I, "italic", null, "I", !1, !1), e.FE.RegisterShortcut(e.FE.KEYCODE.U, "underline", null, "U", !1, !1), 
    e.FE.RegisterShortcut(e.FE.KEYCODE.S, "strikeThrough", null, "S", !1, !1), e.FE.RegisterShortcut(e.FE.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1), 
    e.FE.RegisterShortcut(e.FE.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1), 
    e.FE.RegisterShortcut(e.FE.KEYCODE.Z, "undo", null, "Z", !1, !1), e.FE.RegisterShortcut(e.FE.KEYCODE.Z, "redo", null, "Z", !0, !1), 
    e.FE.RegisterShortcut(e.FE.KEYCODE.Y, "redo", null, "Y", !1, !1), e.FE.MODULES.shortcuts = function(t) {
        function n(n) {
            if (!t.core.hasFocus()) return !0;
            var r = n.which, a = -1 != navigator.userAgent.indexOf("Mac OS X") ? n.metaKey : n.ctrlKey;
            if ("keyup" == n.type && i && r != e.FE.KEYCODE.META) return i = !1;
            "keydown" == n.type && (i = !1);
            var o = (n.shiftKey ? "^" : "") + (n.altKey ? "@" : "") + r;
            if (a && e.FE.SHORTCUTS_MAP[o]) {
                var s = e.FE.SHORTCUTS_MAP[o].cmd;
                if (s && 0 <= t.opts.shortcutsEnabled.indexOf(s)) {
                    var l, d = e.FE.SHORTCUTS_MAP[o].val;
                    if (s && !d ? l = t.$tb.find('.fr-command[data-cmd="' + s + '"]') : s && d && (l = t.$tb.find('.fr-command[data-cmd="' + s + '"][data-param1="' + d + '"]')), 
                    l.length) return n.preventDefault(), n.stopPropagation(), l.parents(".fr-toolbar").data("instance", t), 
                    "keydown" == n.type && (t.button.exec(l), i = !0), !1;
                    if (s && (t.commands[s] || e.FE.COMMANDS[s] && e.FE.COMMANDS[s].callback)) return n.preventDefault(), 
                    n.stopPropagation(), "keydown" == n.type && ((t.commands[s] || e.FE.COMMANDS[s].callback)(), 
                    i = !0), !1;
                }
            }
        }
        var r = null, i = !1;
        return {
            _init: function() {
                t.events.on("keydown", n, !0), t.events.on("keyup", n, !0);
            },
            get: function(n) {
                if (!t.opts.shortcutsHint) return null;
                if (!r) for (var i in r = {}, e.FE.SHORTCUTS_MAP) e.FE.SHORTCUTS_MAP.hasOwnProperty(i) && 0 <= t.opts.shortcutsEnabled.indexOf(e.FE.SHORTCUTS_MAP[i].cmd) && (r[e.FE.SHORTCUTS_MAP[i].cmd + "." + (e.FE.SHORTCUTS_MAP[i].val || "")] = {
                    shift: e.FE.SHORTCUTS_MAP[i].shift,
                    option: e.FE.SHORTCUTS_MAP[i].option,
                    letter: e.FE.SHORTCUTS_MAP[i].letter
                });
                var a = r[n];
                return a ? (t.helpers.isMac() ? String.fromCharCode(8984) : "Ctrl+") + (a.shift ? t.helpers.isMac() ? String.fromCharCode(8679) : "Shift+" : "") + (a.option ? t.helpers.isMac() ? String.fromCharCode(8997) : "Alt+" : "") + a.letter : null;
            }
        };
    }, e.FE.MODULES.snapshot = function(e) {
        function t(e) {
            for (var t = e.parentNode.childNodes, n = 0, r = null, i = 0; i < t.length; i++) {
                if (r) {
                    var a = t[i].nodeType === Node.TEXT_NODE && "" === t[i].textContent, o = r.nodeType === Node.TEXT_NODE && t[i].nodeType === Node.TEXT_NODE;
                    a || o || n++;
                }
                if (t[i] == e) return n;
                r = t[i];
            }
        }
        function n(n) {
            var r = [];
            if (!n.parentNode) return [];
            for (;!e.node.isElement(n); ) r.push(t(n)), n = n.parentNode;
            return r.reverse();
        }
        function r(e, t) {
            for (;e && e.nodeType === Node.TEXT_NODE; ) {
                var n = e.previousSibling;
                n && n.nodeType == Node.TEXT_NODE && (t += n.textContent.length), e = n;
            }
            return t;
        }
        function i(t) {
            for (var n = e.el, r = 0; r < t.length; r++) n = n.childNodes[t[r]];
            return n;
        }
        function a(t, n) {
            try {
                var r = i(n.scLoc), a = n.scOffset, o = i(n.ecLoc), s = n.ecOffset, l = e.doc.createRange();
                l.setStart(r, a), l.setEnd(o, s), t.addRange(l);
            } catch (e) {
                console.warn(e);
            }
        }
        return {
            get: function() {
                var t, i = {};
                if (e.events.trigger("snapshot.before"), i.html = (e.$wp ? e.$el.html() : e.$oel.get(0).outerHTML).replace(/ style=""/g, ""), 
                i.ranges = [], e.$wp && e.selection.inEditor() && e.core.hasFocus()) for (var a = e.selection.ranges(), o = 0; o < a.length; o++) i.ranges.push({
                    scLoc: n((t = a[o]).startContainer),
                    scOffset: r(t.startContainer, t.startOffset),
                    ecLoc: n(t.endContainer),
                    ecOffset: r(t.endContainer, t.endOffset)
                });
                return e.events.trigger("snapshot.after", [ i ]), i;
            },
            restore: function(t) {
                e.$el.html() != t.html && (e.opts.htmlExecuteScripts ? e.$el.html(t.html) : e.el.innerHTML = t.html);
                var n = e.selection.get();
                e.selection.clear(), e.events.focus(!0);
                for (var r = 0; r < t.ranges.length; r++) a(n, t.ranges[r]);
            },
            equal: function(t, n) {
                return t.html == n.html && (!e.core.hasFocus() || JSON.stringify(t.ranges) == JSON.stringify(n.ranges));
            }
        };
    }, e.FE.MODULES.undo = function(e) {
        function t(t) {
            var n = t.which;
            e.keys.ctrlKey(t) && (90 == n && t.shiftKey && t.preventDefault(), 90 == n && t.preventDefault());
        }
        function n() {
            if (!e.undo_stack || e.undoing) return !1;
            for (;e.undo_stack.length > e.undo_index; ) e.undo_stack.pop();
        }
        function r() {
            e.undo_index = 0, e.undo_stack = [];
        }
        function i() {
            e.undo_stack = [];
        }
        var a = null;
        return {
            _init: function() {
                r(), e.events.on("initialized", function() {
                    a = (e.$wp ? e.$el.html() : e.$oel.get(0).outerHTML).replace(/ style=""/g, "");
                }), e.events.on("blur", function() {
                    e.el.querySelector(".fr-dragging") || e.undo.saveStep();
                }), e.events.on("keydown", t), e.events.on("destroy", i);
            },
            run: function() {
                if (1 < e.undo_index) {
                    e.undoing = !0;
                    var t = e.undo_stack[--e.undo_index - 1];
                    clearTimeout(e._content_changed_timer), e.snapshot.restore(t), a = t.html, e.popups.hideAll(), 
                    e.toolbar.enable(), e.events.trigger("contentChanged"), e.events.trigger("commands.undo"), 
                    e.undoing = !1;
                }
            },
            redo: function() {
                if (e.undo_index < e.undo_stack.length) {
                    e.undoing = !0;
                    var t = e.undo_stack[e.undo_index++];
                    clearTimeout(e._content_changed_timer), e.snapshot.restore(t), a = t.html, e.popups.hideAll(), 
                    e.toolbar.enable(), e.events.trigger("contentChanged"), e.events.trigger("commands.redo"), 
                    e.undoing = !1;
                }
            },
            canDo: function() {
                return !(0 === e.undo_stack.length || e.undo_index <= 1);
            },
            canRedo: function() {
                return e.undo_index != e.undo_stack.length;
            },
            dropRedo: n,
            reset: r,
            saveStep: function(t) {
                if (!e.undo_stack || e.undoing || e.el.querySelector(".fr-marker")) return !1;
                void 0 === t ? (t = e.snapshot.get(), e.undo_stack[e.undo_index - 1] && e.snapshot.equal(e.undo_stack[e.undo_index - 1], t) || (n(), 
                e.undo_stack.push(t), e.undo_index++, t.html != a && (e.events.trigger("contentChanged"), 
                a = t.html))) : (n(), 0 < e.undo_index ? e.undo_stack[e.undo_index - 1] = t : (e.undo_stack.push(t), 
                e.undo_index++));
            }
        };
    }, e.FE.ICON_TEMPLATES = {
        font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>',
        font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>',
        text: '<span style="text-align: center;">[NAME]</span>',
        image: "<img src=[SRC] alt=[ALT] />",
        svg: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>'
    }, e.FE.ICONS = {
        bold: {
            NAME: "bold"
        },
        italic: {
            NAME: "italic"
        },
        underline: {
            NAME: "underline"
        },
        strikeThrough: {
            NAME: "strikethrough"
        },
        subscript: {
            NAME: "subscript"
        },
        superscript: {
            NAME: "superscript"
        },
        color: {
            NAME: "tint"
        },
        outdent: {
            NAME: "outdent"
        },
        indent: {
            NAME: "indent"
        },
        undo: {
            NAME: "rotate-left",
            FA5NAME: "undo"
        },
        redo: {
            NAME: "rotate-right",
            FA5NAME: "redo"
        },
        insertHR: {
            NAME: "minus"
        },
        clearFormatting: {
            NAME: "eraser"
        },
        selectAll: {
            NAME: "mouse-pointer"
        }
    }, e.FE.DefineIconTemplate = function(t, n) {
        e.FE.ICON_TEMPLATES[t] = n;
    }, e.FE.DefineIcon = function(t, n) {
        e.FE.ICONS[t] = n;
    }, e.extend(e.FE.DEFAULTS, {
        iconsTemplate: "font_awesome"
    }), e.FE.MODULES.icon = function(t) {
        return {
            create: function(n) {
                var r = null, i = e.FE.ICONS[n];
                if (void 0 !== i) {
                    var a = i.template || e.FE.ICON_DEFAULT_TEMPLATE || t.opts.iconsTemplate;
                    i.FA5NAME || (i.FA5NAME = i.NAME), a && (a = e.FE.ICON_TEMPLATES[a]) && (r = a.replace(/\[([a-zA-Z0-9]*)\]/g, function(e, t) {
                        return "NAME" == t ? i[t] || n : i[t];
                    }));
                }
                return r || n;
            },
            getTemplate: function(n) {
                var r = e.FE.ICONS[n], i = t.opts.iconsTemplate;
                return void 0 !== r ? i = r.template || e.FE.ICON_DEFAULT_TEMPLATE || t.opts.iconsTemplate : i;
            }
        };
    }, e.extend(e.FE.DEFAULTS, {
        tooltips: !0
    }), e.FE.MODULES.tooltip = function(t) {
        function n() {
            if (t.helpers.isMobile()) return !1;
            t.$tooltip && t.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed");
        }
        function r(n, r) {
            if (t.helpers.isMobile()) return !1;
            if (n.data("title") || n.data("title", n.attr("title")), !n.data("title")) return !1;
            t.$tooltip || t.opts.tooltips && !t.helpers.isMobile() && (t.shared.$tooltip ? t.$tooltip = t.shared.$tooltip : (t.shared.$tooltip = e('<div class="fr-tooltip"></div>'), 
            t.$tooltip = t.shared.$tooltip, t.opts.theme && t.$tooltip.addClass(t.opts.theme + "-theme"), 
            e(t.o_doc).find("body:first").append(t.$tooltip)), t.events.on("shared.destroy", function() {
                t.$tooltip.html("").removeData().remove(), t.$tooltip = null;
            }, !0)), n.removeAttr("title"), t.$tooltip.text(t.language.translate(n.data("title"))), 
            t.$tooltip.addClass("fr-visible");
            var i = n.offset().left + (n.outerWidth() - t.$tooltip.outerWidth()) / 2;
            i < 0 && (i = 0), i + t.$tooltip.outerWidth() > e(t.o_win).width() && (i = e(t.o_win).width() - t.$tooltip.outerWidth()), 
            void 0 === r && (r = t.opts.toolbarBottom);
            var a = r ? n.offset().top - t.$tooltip.height() : n.offset().top + n.outerHeight();
            t.$tooltip.css("position", ""), t.$tooltip.css("left", i), t.$tooltip.css("top", Math.ceil(a)), 
            "static" != e(t.o_doc).find("body:first").css("position") ? (t.$tooltip.css("margin-left", -e(t.o_doc).find("body:first").offset().left), 
            t.$tooltip.css("margin-top", -e(t.o_doc).find("body:first").offset().top)) : (t.$tooltip.css("margin-left", ""), 
            t.$tooltip.css("margin-top", ""));
        }
        return {
            hide: n,
            to: r,
            bind: function(i, a, o) {
                t.opts.tooltips && !t.helpers.isMobile() && (t.events.$on(i, "mouseenter", a, function(n) {
                    t.node.hasClass(n.currentTarget, "fr-disabled") || t.edit.isDisabled() || r(e(n.currentTarget), o);
                }, !0), t.events.$on(i, "mouseleave " + t._mousedown + " " + t._mouseup, a, function() {
                    n();
                }, !0));
            }
        };
    }, e.FE.MODULES.button = function(t) {
        function n(t, n, r) {
            for (var i = e(), a = 0; a < t.length; a++) {
                var o = e(t[a]);
                if (o.is(n) && (i = i.add(o)), r && o.is(".fr-dropdown")) {
                    var s = o.next().find(n);
                    i = i.add(s);
                }
            }
            return i;
        }
        function r(r, i) {
            var a, o = e();
            if (!r) return o;
            for (a in o = (o = o.add(n(g, r, i))).add(n(m, r, i)), t.shared.popups) if (t.shared.popups.hasOwnProperty(a)) {
                var s = t.shared.popups[a].children().find(r);
                o = o.add(s);
            }
            for (a in t.shared.modals) if (t.shared.modals.hasOwnProperty(a)) {
                var l = t.shared.modals[a].$modal.find(r);
                o = o.add(l);
            }
            return o;
        }
        function i(e) {
            e.addClass("fr-blink"), setTimeout(function() {
                e.removeClass("fr-blink");
            }, 500);
            for (var t = e.data("cmd"), n = []; void 0 !== e.data("param" + (n.length + 1)); ) n.push(e.data("param" + (n.length + 1)));
            var i = r(".fr-dropdown.fr-active");
            i.length && (i.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), 
            i.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), e.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(t, n);
        }
        function a(n) {
            var a = n.parents(".fr-popup, .fr-toolbar").data("instance");
            if (0 !== n.parents(".fr-popup").length || n.data("popup") || a.popups.hideAll(), 
            a.popups.areVisible() && !a.popups.areVisible(a)) {
                for (var o = 0; o < e.FE.INSTANCES.length; o++) e.FE.INSTANCES[o] != a && e.FE.INSTANCES[o].popups && e.FE.INSTANCES[o].popups.areVisible() && e.FE.INSTANCES[o].$el.find(".fr-marker").remove();
                a.popups.hideAll();
            }
            t.node.hasClass(n.get(0), "fr-dropdown") ? function(n) {
                var i = n.next(), a = t.node.hasClass(n.get(0), "fr-active"), o = r(".fr-dropdown.fr-active").not(n), s = n.parents(".fr-toolbar, .fr-popup").data("instance") || t;
                if (s.helpers.isIOS() && !s.el.querySelector(".fr-marker") && (s.selection.save(), 
                s.selection.clear(), s.selection.restore()), !a) {
                    var l = n.data("cmd");
                    i.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1), e.FE.COMMANDS[l] && e.FE.COMMANDS[l].refreshOnShow && e.FE.COMMANDS[l].refreshOnShow.apply(s, [ n, i ]), 
                    i.css("left", n.offset().left - n.parent().offset().left - ("rtl" == t.opts.direction ? i.width() - n.outerWidth() : 0)), 
                    i.addClass("test-height");
                    var d = i.outerHeight();
                    i.removeClass("test-height"), i.css("top", "").css("bottom", ""), !t.opts.toolbarBottom && i.offset().top + n.outerHeight() + d < e(t.o_doc).height() ? i.css("top", n.position().top + n.outerHeight()) : i.css("bottom", n.parents(".fr-popup, .fr-toolbar").first().height() - n.position().top);
                }
                n.addClass("fr-blink").toggleClass("fr-active"), n.hasClass("fr-active") ? (i.attr("aria-hidden", !1), 
                n.attr("aria-expanded", !0)) : (i.attr("aria-hidden", !0), n.attr("aria-expanded", !1)), 
                setTimeout(function() {
                    n.removeClass("fr-blink");
                }, 300), i.css("margin-left", ""), i.offset().left + i.outerWidth() > t.$sc.offset().left + t.$sc.width() && i.css("margin-left", -(i.offset().left + i.outerWidth() - t.$sc.offset().left - t.$sc.width())), 
                i.offset().left < t.$sc.offset().left && "rtl" == t.opts.direction && i.css("margin-left", t.$sc.offset().left), 
                o.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), 
                o.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 !== n.parents(".fr-popup").length || t.opts.toolbarInline || (t.node.hasClass(n.get(0), "fr-active") ? t.$tb.css("zIndex", (t.opts.zIndex || 1) + 4) : t.$tb.css("zIndex", ""));
                var c = i.find("a.fr-command.fr-active:first");
                t.helpers.isMobile() || (c.length ? t.accessibility.focusToolbarElement(c) : t.accessibility.focusToolbarElement(n));
            }(n) : (i(n), e.FE.COMMANDS[n.data("cmd")] && !1 !== e.FE.COMMANDS[n.data("cmd")].refreshAfterCallback && a.button.bulkRefresh());
        }
        function o(t) {
            a(e(t.currentTarget));
        }
        function s(e) {
            var t = e.find(".fr-dropdown.fr-active");
            t.length && (t.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), 
            t.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""));
        }
        function l(e) {
            e.preventDefault(), e.stopPropagation();
        }
        function d(e) {
            if (e.stopPropagation(), !t.helpers.isMobile()) return !1;
        }
        function c(e, n, r) {
            if (t.helpers.isMobile() && !1 === n.showOnMobile) return "";
            var i, a = n.displaySelection;
            if ("function" == typeof a && (a = a(t)), a) {
                var o = "function" == typeof n.defaultSelection ? n.defaultSelection(t) : n.defaultSelection;
                i = '<span style="width:' + (n.displaySelectionWidth || 100) + 'px">' + t.language.translate(o || n.title) + "</span>";
            } else i = t.icon.create(n.icon || e), i += '<span class="fr-sr-only">' + (t.language.translate(n.title) || "") + "</span>";
            var s = n.popup ? ' data-popup="true"' : "", l = n.modal ? ' data-modal="true"' : "", d = t.shortcuts.get(e + ".");
            d = d ? " (" + d + ")" : "";
            var c = e + "-" + t.id, f = "dropdown-menu-" + c, p = '<button id="' + c + '"type="button" tabIndex="-1" role="button"' + (n.toggle ? ' aria-pressed="false"' : "") + ("dropdown" == n.type ? ' aria-controls="' + f + '" aria-expanded="false" aria-haspopup="true"' : "") + (n.disabled ? ' aria-disabled="true"' : "") + ' title="' + (t.language.translate(n.title) || "") + d + '" class="fr-command fr-btn' + ("dropdown" == n.type ? " fr-dropdown" : "") + " fr-btn-" + t.icon.getTemplate(n.icon) + (n.displaySelection ? " fr-selection" : "") + (n.back ? " fr-back" : "") + (n.disabled ? " fr-disabled" : "") + (r ? "" : " fr-hidden") + '" data-cmd="' + e + '"' + s + l + ">" + i + "</button>";
            if ("dropdown" == n.type) {
                var u = '<div id="' + f + '" class="fr-dropdown-menu" role="listbox" aria-labelledby="' + c + '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">';
                u += function(e, n) {
                    var r = "";
                    if (n.html) "function" == typeof n.html ? r += n.html.call(t) : r += n.html; else {
                        var i = n.options;
                        for (var a in "function" == typeof i && (i = i()), r += '<ul class="fr-dropdown-list" role="presentation">', 
                        i) if (i.hasOwnProperty(a)) {
                            var o = t.shortcuts.get(e + "." + a);
                            o = o ? '<span class="fr-shortcut">' + o + "</span>" : "", r += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="' + e + '" data-param1="' + a + '" title="' + i[a] + '">' + t.language.translate(i[a]) + "</a></li>";
                        }
                        r += "</ul>";
                    }
                    return r;
                }(e, n), p += u += "</div></div></div>";
            }
            return p;
        }
        function f(n) {
            var r = t.$tb && t.$tb.data("instance") || t;
            if (!1 === t.events.trigger("buttons.refresh")) return !0;
            setTimeout(function() {
                for (var i = r.selection.inEditor() && r.core.hasFocus(), a = 0; a < n.length; a++) {
                    var o = e(n[a]), s = o.data("cmd");
                    0 === o.parents(".fr-popup").length ? i || e.FE.COMMANDS[s] && e.FE.COMMANDS[s].forcedRefresh ? r.button.refresh(o) : t.node.hasClass(o.get(0), "fr-dropdown") || (o.removeClass("fr-active"), 
                    o.attr("aria-pressed") && o.attr("aria-pressed", !1)) : o.parents(".fr-popup").is(":visible") && r.button.refresh(o);
                }
            }, 0);
        }
        function p() {
            f(g), f(m);
        }
        function u() {
            g = [], m = [];
        }
        function h() {
            clearTimeout(v), v = setTimeout(p, 50);
        }
        var g = [];
        (t.opts.toolbarInline || t.opts.toolbarContainer) && (t.shared.buttons || (t.shared.buttons = []), 
        g = t.shared.buttons);
        var m = [];
        t.shared.popup_buttons || (t.shared.popup_buttons = []), m = t.shared.popup_buttons;
        var v = null;
        return {
            _init: function() {
                t.opts.toolbarInline ? t.events.on("toolbar.show", p) : (t.events.on("mouseup", h), 
                t.events.on("keyup", h), t.events.on("blur", h), t.events.on("focus", h), t.events.on("contentChanged", h), 
                t.helpers.isMobile() && t.events.$on(t.$doc, "selectionchange", p)), t.events.on("shared.destroy", u);
            },
            buildList: function(n, r) {
                for (var i = "", a = 0; a < n.length; a++) {
                    var o = n[a], s = e.FE.COMMANDS[o];
                    s && void 0 !== s.plugin && t.opts.pluginsEnabled.indexOf(s.plugin) < 0 || (s ? i += c(o, s, void 0 === r || 0 <= r.indexOf(o)) : "|" == o ? i += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == o && (i += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>'));
                }
                return i;
            },
            bindCommands: function(n, r) {
                t.events.bindClick(n, ".fr-command:not(.fr-disabled)", o), t.events.$on(n, t._mousedown + " " + t._mouseup + " " + t._move, ".fr-dropdown-menu", l, !0), 
                t.events.$on(n, t._mousedown + " " + t._mouseup + " " + t._move, ".fr-dropdown-menu .fr-dropdown-wrapper", d, !0);
                var i = n.get(0).ownerDocument, a = "defaultView" in i ? i.defaultView : i.parentWindow, c = function(r) {
                    (!r || r.type == t._mouseup && r.target != e("html").get(0) || "keydown" == r.type && (t.keys.isCharacter(r.which) && !t.keys.ctrlKey(r) || r.which == e.FE.KEYCODE.ESC)) && s(n);
                };
                t.events.$on(e(a), t._mouseup + " resize keydown", c, !0), t.opts.iframe && t.events.$on(t.$win, t._mouseup, c, !0), 
                t.node.hasClass(n.get(0), "fr-popup") ? e.merge(m, n.find(".fr-btn").toArray()) : e.merge(g, n.find(".fr-btn").toArray()), 
                t.tooltip.bind(n, ".fr-btn, .fr-title", r);
            },
            refresh: function(n) {
                var r, i = n.parents(".fr-popup, .fr-toolbar").data("instance") || t, a = n.data("cmd");
                t.node.hasClass(n.get(0), "fr-dropdown") ? r = n.next() : (n.removeClass("fr-active"), 
                n.attr("aria-pressed") && n.attr("aria-pressed", !1)), e.FE.COMMANDS[a] && e.FE.COMMANDS[a].refresh ? e.FE.COMMANDS[a].refresh.apply(i, [ n, r ]) : t.refresh[a] && i.refresh[a](n, r);
            },
            bulkRefresh: p,
            exec: i,
            click: a,
            hideActiveDropdowns: s,
            getButtons: r
        };
    }, e.FE.MODULES.modals = function(t) {
        function n() {
            for (var e in o) {
                var t = o[e];
                t && t.$modal && t.$modal.removeData().remove();
            }
            a && a.removeData().remove(), o = {};
        }
        function r(n, r) {
            if (o[n]) {
                var i = o[n].$modal, s = i.data("instance") || t;
                s.events.enableBlur(), i.hide(), a.hide(), e(s.o_doc).find("body:first").removeClass("prevent-scroll fr-mobile"), 
                i.removeClass("fr-active"), r || (s.accessibility.restoreSelection(), s.events.trigger("modals.hide"));
            }
        }
        function i(e) {
            var n;
            if ("string" == typeof e) {
                if (!o[e]) return;
                n = o[e].$modal;
            } else n = e;
            return n && t.node.hasClass(n, "fr-active") && t.core.sameInstance(n) || !1;
        }
        t.shared.modals || (t.shared.modals = {});
        var a, o = t.shared.modals;
        return {
            _init: function() {
                t.events.on("shared.destroy", n, !0);
            },
            get: function(e) {
                return o[e];
            },
            create: function(n, i, s) {
                if (t.shared.$overlay || (t.shared.$overlay = e('<div class="fr-overlay">').appendTo("body:first")), 
                a = t.shared.$overlay, t.opts.theme && a.addClass(t.opts.theme + "-theme"), !o[n]) {
                    var l = (d = i, c = s, f = '<div tabIndex="-1" class="fr-modal' + (t.opts.theme ? " " + t.opts.theme + "-theme" : "") + '"><div class="fr-modal-wrapper">', 
                    f += '<div class="fr-modal-head">' + d + '<i title="' + t.language.translate("Cancel") + '" class="fa fa-times fr-modal-close"></i></div>', 
                    f += '<div tabIndex="-1" class="fr-modal-body">' + c + "</div>", e(f += "</div></div>"));
                    o[n] = {
                        $modal: l,
                        $head: l.find(".fr-modal-head"),
                        $body: l.find(".fr-modal-body")
                    }, t.helpers.isMobile() || l.addClass("fr-desktop"), l.appendTo("body:first"), t.events.$on(l, "click", ".fr-modal-close", function() {
                        r(n);
                    }, !0), o[n].$body.css("margin-top", o[n].$head.outerHeight()), t.events.$on(l, "keydown", function(i) {
                        var a = i.which;
                        return a == e.FE.KEYCODE.ESC ? (r(n), t.accessibility.focusModalButton(l), !1) : !(!e(i.currentTarget).is("input[type=text], textarea") && a != e.FE.KEYCODE.ARROW_UP && a != e.FE.KEYCODE.ARROW_DOWN && !t.keys.isBrowserAction(i) && (i.preventDefault(), 
                        i.stopPropagation(), 1));
                    }, !0), r(n, !0);
                }
                var d, c, f;
                return o[n];
            },
            show: function(n) {
                if (o[n]) {
                    var r = o[n].$modal;
                    r.data("instance", t), r.show(), a.show(), e(t.o_doc).find("body:first").addClass("prevent-scroll"), 
                    t.helpers.isMobile() && e(t.o_doc).find("body:first").addClass("fr-mobile"), r.addClass("fr-active"), 
                    t.accessibility.focusModal(r);
                }
            },
            hide: r,
            resize: function(n) {
                if (o[n]) {
                    var r = o[n], i = r.$modal, a = r.$body, s = e(t.o_win).height(), l = i.find(".fr-modal-wrapper"), d = s - l.outerHeight(!0) + (l.height() - (a.outerHeight(!0) - a.height())), c = "auto";
                    d < a.get(0).scrollHeight && (c = d), a.height(c);
                }
            },
            isVisible: i,
            areVisible: function(e) {
                for (var t in o) if (o.hasOwnProperty(t) && i(t) && (void 0 === e || o[t].$modal.data("instance") == e)) return o[t].$modal;
                return !1;
            }
        };
    }, e.FE.POPUP_TEMPLATES = {
        "text.edit": "[_EDIT_]"
    }, e.FE.RegisterTemplate = function(t, n) {
        e.FE.POPUP_TEMPLATES[t] = n;
    }, e.FE.MODULES.popups = function(t) {
        function n(e, n) {
            n.is(":visible") || (n = t.$sc), n.is(h[e].data("container")) || (h[e].data("container", n), 
            n.append(h[e]));
        }
        function r(e) {
            return h[e] && t.node.hasClass(h[e], "fr-active") && t.core.sameInstance(h[e]) || !1;
        }
        function i(e) {
            for (var t in h) if (h.hasOwnProperty(t) && r(t) && (void 0 === e || h[t].data("instance") == e)) return h[t];
            return !1;
        }
        function a(e) {
            var n = null;
            (n = "string" != typeof e ? e : h[e]) && t.node.hasClass(n, "fr-active") && (n.removeClass("fr-active fr-above"), 
            t.events.trigger("popups.hide." + e), t.$tb && (1 < t.opts.zIndex ? t.$tb.css("zIndex", t.opts.zIndex + 1) : t.$tb.css("zIndex", "")), 
            t.events.disableBlur(), n.find("input, textarea, button").filter(":focus").blur(), 
            n.find("input, textarea").attr("disabled", "disabled"));
        }
        function o(e) {
            for (var t in void 0 === e && (e = []), h) h.hasOwnProperty(t) && e.indexOf(t) < 0 && a(t);
        }
        function s() {
            t.shared.exit_flag = !0;
        }
        function l() {
            t.shared.exit_flag = !1;
        }
        function d() {
            return t.shared.exit_flag;
        }
        function c(n, r) {
            var i, a, o = function(n, r) {
                var i = e.FE.POPUP_TEMPLATES[n];
                if (!i) return null;
                for (var a in "function" == typeof i && (i = i.apply(t)), r) r.hasOwnProperty(a) && (i = i.replace("[_" + a.toUpperCase() + "_]", r[a]));
                return i;
            }(n, r);
            return o ? (i = e('<div class="fr-popup' + (t.helpers.isMobile() ? " fr-mobile" : " fr-desktop") + (t.opts.toolbarInline ? " fr-inline" : "") + '"><span class="fr-arrow"></span>' + o + "</div>"), 
            t.opts.theme && i.addClass(t.opts.theme + "-theme"), 1 < t.opts.zIndex && (t.opts.editInPopup ? i.css("z-index", t.opts.zIndex + 2) : t.$tb.css("z-index", t.opts.zIndex + 2)), 
            "auto" != t.opts.direction && i.removeClass("fr-ltr fr-rtl").addClass("fr-" + t.opts.direction), 
            i.find("input, textarea").attr("dir", t.opts.direction).attr("disabled", "disabled"), 
            (a = e("body:first")).append(i), i.data("container", a), h[n] = i, t.button.bindCommands(i, !1), 
            i) : (i = e('<div class="fr-popup fr-empty"></div>'), (a = e("body:first")).append(i), 
            i.data("container", a), h[n] = i);
        }
        function f(n) {
            var i = h[n];
            return {
                _windowResize: function() {
                    var e = i.data("instance") || t;
                    !e.helpers.isMobile() && i.is(":visible") && (e.events.disableBlur(), e.popups.hide(n), 
                    e.events.enableBlur());
                },
                _inputFocus: function(n) {
                    var r = i.data("instance") || t, a = e(n.currentTarget);
                    if (a.is("input:file") && a.closest(".fr-layer").addClass("fr-input-focus"), n.preventDefault(), 
                    n.stopPropagation(), setTimeout(function() {
                        r.events.enableBlur();
                    }, 100), r.helpers.isMobile()) {
                        var o = e(r.o_win).scrollTop();
                        setTimeout(function() {
                            e(r.o_win).scrollTop(o);
                        }, 0);
                    }
                },
                _inputBlur: function(n) {
                    var r = i.data("instance") || t, a = e(n.currentTarget);
                    a.is("input:file") && a.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement != this && e(this).is(":visible") && (r.events.blurActive() && r.events.trigger("blur"), 
                    r.events.enableBlur());
                },
                _editorKeydown: function(a) {
                    var o = i.data("instance") || t;
                    o.keys.ctrlKey(a) || a.which == e.FE.KEYCODE.ALT || a.which == e.FE.KEYCODE.ESC || (r(n) && i.find(".fr-back:visible").length ? o.button.exec(i.find(".fr-back:visible:first")) : a.which != e.FE.KEYCODE.ALT && o.popups.hide(n));
                },
                _preventFocus: function(n) {
                    var r = i.data("instance") || t, a = n.originalEvent ? n.originalEvent.target || n.originalEvent.originalTarget : null;
                    "mouseup" == n.type || e(a).is(":focus") || r.events.disableBlur(), "mouseup" != n.type || e(a).hasClass("fr-command") || 0 < e(a).parents(".fr-command").length || e(a).hasClass("fr-dropdown-content") || t.button.hideActiveDropdowns(i), 
                    (t.browser.safari || t.browser.mozilla) && "mousedown" == n.type && e(a).is("input[type=file]") && r.events.disableBlur();
                    var o = "input, textarea, button, select, label, .fr-command";
                    if (a && !e(a).is(o) && 0 === e(a).parents(o).length) return n.stopPropagation(), 
                    !1;
                    a && e(a).is(o) && n.stopPropagation(), l();
                },
                _editorMouseup: function() {
                    i.is(":visible") && d() && 0 < i.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length && t.events.disableBlur();
                },
                _windowMouseup: function(e) {
                    if (!t.core.sameInstance(i)) return !0;
                    var r = i.data("instance") || t;
                    i.is(":visible") && d() && (e.stopPropagation(), r.markers.remove(), r.popups.hide(n), 
                    l());
                },
                _windowKeydown: function(r) {
                    if (!t.core.sameInstance(i)) return !0;
                    var a = i.data("instance") || t, o = r.which;
                    if (e.FE.KEYCODE.ESC == o) {
                        if (a.popups.isVisible(n) && a.opts.toolbarInline) return r.stopPropagation(), a.popups.isVisible(n) && (i.find(".fr-back:visible").length ? (a.button.exec(i.find(".fr-back:visible:first")), 
                        a.accessibility.focusPopupButton(i)) : i.find(".fr-dismiss:visible").length ? a.button.exec(i.find(".fr-dismiss:visible:first")) : (a.popups.hide(n), 
                        a.toolbar.showInline(null, !0), a.accessibility.FocusPopupButton(i))), !1;
                        if (a.popups.isVisible(n)) return i.find(".fr-back:visible").length ? (a.button.exec(i.find(".fr-back:visible:first")), 
                        a.accessibility.focusPopupButton(i)) : i.find(".fr-dismiss:visible").length ? a.button.exec(i.find(".fr-dismiss:visible:first")) : (a.popups.hide(n), 
                        a.accessibility.focusPopupButton(i)), !1;
                    }
                },
                _doPlaceholder: function() {
                    0 === e(this).next().length && e(this).attr("placeholder") && e(this).after('<label for="' + e(this).attr("id") + '">' + e(this).attr("placeholder") + "</label>"), 
                    e(this).toggleClass("fr-not-empty", "" !== e(this).val());
                },
                _repositionPopup: function() {
                    if (!t.opts.height && !t.opts.heightMax || t.opts.toolbarInline) return !0;
                    if (t.$wp && r(n) && i.parent().get(0) == t.$sc.get(0)) {
                        var e = i.offset().top - t.$wp.offset().top, a = t.$wp.outerHeight();
                        t.node.hasClass(i.get(0), "fr-above") && (e += i.outerHeight()), a < e || e < 0 ? i.addClass("fr-hidden") : i.removeClass("fr-hidden");
                    }
                }
            };
        }
        function p(e, n) {
            t.events.on("mouseup", e._editorMouseup, !0), t.$wp && t.events.on("keydown", e._editorKeydown), 
            t.events.on("blur", function() {
                i() && t.markers.remove(), o();
            }), t.$wp && !t.helpers.isMobile() && t.events.$on(t.$wp, "scroll.popup" + n, e._repositionPopup), 
            t.events.on("window.mouseup", e._windowMouseup, !0), t.events.on("window.keydown", e._windowKeydown, !0), 
            h[n].data("inst" + t.id, !0), t.events.on("destroy", function() {
                t.core.sameInstance(h[n]) && h[n].removeClass("fr-active").appendTo("body:first");
            }, !0);
        }
        function u() {
            for (var e in h) if (h.hasOwnProperty(e)) {
                var t = h[e];
                t && (t.html("").removeData().remove(), h[e] = null);
            }
            h = [];
        }
        t.shared.popups || (t.shared.popups = {});
        var h = t.shared.popups;
        return t.shared.exit_flag = !1, {
            _init: function() {
                t.events.on("shared.destroy", u, !0), t.events.on("window.mousedown", s), t.events.on("window.touchmove", l), 
                t.events.$on(e(t.o_win), "scroll", l), t.events.on("mousedown", function(e) {
                    i() && (e.stopPropagation(), t.$el.find(".fr-marker").remove(), s(), t.events.disableBlur());
                });
            },
            create: function(n, r) {
                var i = c(n, r), a = f(n);
                return p(a, n), t.events.$on(i, "mousedown mouseup touchstart touchend touch", "*", a._preventFocus, !0), 
                t.events.$on(i, "focus", "input, textarea, button, select", a._inputFocus, !0), 
                t.events.$on(i, "blur", "input, textarea, button, select", a._inputBlur, !0), t.accessibility.registerPopup(n), 
                t.events.$on(i, "keydown keyup change input", "input, textarea", a._doPlaceholder, !0), 
                t.helpers.isIOS() && t.events.$on(i, "touchend", "label", function() {
                    e("#" + e(this).attr("for")).prop("checked", function(e, t) {
                        return !t;
                    });
                }, !0), t.events.$on(e(t.o_win), "resize", a._windowResize, !0), i;
            },
            get: function(e) {
                var n = h[e];
                return n && !n.data("inst" + t.id) && p(f(e), e), n;
            },
            show: function(e, a, s, d) {
                if (r(e) || (i() && 0 < t.$el.find(".fr-marker").length ? (t.events.disableBlur(), 
                t.selection.restore()) : i() || (t.events.disableBlur(), t.events.focus(), t.events.enableBlur())), 
                o([ e ]), !h[e]) return !1;
                var c = t.button.getButtons(".fr-dropdown.fr-active");
                c.removeClass("fr-active").attr("aria-expanded", !1).parent(".fr-toolbar").css("zIndex", ""), 
                c.next().attr("aria-hidden", !0), h[e].data("instance", t), t.$tb && t.$tb.data("instance", t);
                var p = h[e].outerWidth(), u = r(e);
                h[e].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
                var g, m, v = h[e].data("container");
                g = e, (m = v).is(":visible") || (m = t.$sc), 0 === m.find([ h[g] ]).length && m.append(h[g]), 
                t.opts.toolbarInline && v && t.$tb && v.get(0) == t.$tb.get(0) && (n(e, t.$sc), 
                s = t.$tb.offset().top - t.helpers.getPX(t.$tb.css("margin-top")), a = t.$tb.offset().left + t.$tb.outerWidth() / 2 + (parseFloat(t.$tb.find(".fr-arrow").css("margin-left")) || 0) + t.$tb.find(".fr-arrow").outerWidth() / 2, 
                t.node.hasClass(t.$tb.get(0), "fr-above") && s && (s += t.$tb.outerHeight()), d = 0), 
                v = h[e].data("container"), !t.opts.iframe || d || u || (a && (a -= t.$iframe.offset().left), 
                s && (s -= t.$iframe.offset().top)), v.is(t.$tb) ? t.$tb.css("zIndex", (t.opts.zIndex || 1) + 4) : h[e].css("zIndex", (t.opts.zIndex || 1) + 4), 
                a && (a -= p / 2), t.opts.toolbarBottom && v && t.$tb && v.get(0) == t.$tb.get(0) && (h[e].addClass("fr-above"), 
                s && (s -= h[e].outerHeight())), h[e].removeClass("fr-active"), t.position.at(a, s, h[e], d || 0), 
                h[e].addClass("fr-active"), u || t.accessibility.focusPopup(h[e]), t.opts.toolbarInline && t.toolbar.hide(), 
                t.events.trigger("popups.show." + e), f(e)._repositionPopup(), l();
            },
            hide: a,
            onHide: function(e, n) {
                t.events.on("popups.hide." + e, n);
            },
            hideAll: o,
            setContainer: n,
            refresh: function(n) {
                h[n].data("instance", t), t.events.trigger("popups.refresh." + n);
                for (var r = h[n].find(".fr-command"), i = 0; i < r.length; i++) {
                    var a = e(r[i]);
                    0 === a.parents(".fr-dropdown-menu").length && t.button.refresh(a);
                }
            },
            onRefresh: function(e, n) {
                t.events.on("popups.refresh." + e, n);
            },
            onShow: function(e, n) {
                t.events.on("popups.show." + e, n);
            },
            isVisible: r,
            areVisible: i
        };
    }, e.FE.MODULES.position = function(t) {
        function n() {
            var e = t.selection.ranges(0).getBoundingClientRect();
            if (0 === e.top && 0 === e.left && 0 === e.width || 0 === e.height) {
                var n = !1;
                0 === t.$el.find(".fr-marker").length && (t.selection.save(), n = !0);
                var r = t.$el.find(".fr-marker:first");
                r.css("display", "inline"), r.css("line-height", "");
                var i = r.offset(), a = r.outerHeight();
                r.css("display", "none"), r.css("line-height", 0), (e = {}).left = i.left, e.width = 0, 
                e.height = a, e.top = i.top - (t.helpers.isMobile() && !t.helpers.isIOS() || t.opts.iframe ? 0 : t.helpers.scrollTop()), 
                e.right = 1, e.bottom = 1, e.ok = !0, n && t.selection.restore();
            }
            return e;
        }
        function r(e, n, r, i) {
            var a = r.data("container");
            !a || "BODY" === a.get(0).tagName && "static" == a.css("position") || (e && (e -= a.offset().left), 
            n && (n -= a.offset().top), "BODY" != a.get(0).tagName ? (e && (e += a.get(0).scrollLeft), 
            n && (n += a.get(0).scrollTop)) : "absolute" == a.css("position") && (e && (e += a.position().left), 
            n && (n += a.position().top))), t.opts.iframe && a && t.$tb && a.get(0) != t.$tb.get(0) && (e && (e += t.$iframe.offset().left), 
            n && (n += t.$iframe.offset().top));
            var o, s, l = (o = e, s = r.outerWidth(!0), o + s > t.$sc.get(0).clientWidth - 10 && (o = t.$sc.get(0).clientWidth - s - 10), 
            o < 0 && (o = 10), o);
            if (e) {
                r.css("left", l);
                var d = r.data("fr-arrow");
                d || (d = r.find(".fr-arrow"), r.data("fr-arrow", d)), d.data("margin-left") || d.data("margin-left", t.helpers.getPX(d.css("margin-left"))), 
                d.css("margin-left", e - l + d.data("margin-left"));
            }
            n && r.css("top", function(e, n, r) {
                var i = e.outerHeight(!0);
                if (!t.helpers.isMobile() && t.$tb && e.parent().get(0) != t.$tb.get(0)) {
                    var a = e.parent().offset().top, o = n - i - (r || 0);
                    e.parent().get(0) == t.$sc.get(0) && (a -= e.parent().position().top);
                    var s = t.$sc.get(0).clientHeight;
                    a + n + i > t.$sc.offset().top + s && 0 < e.parent().offset().top + o && 0 < o ? o > t.$wp.scrollTop() && (n = o, 
                    e.addClass("fr-above")) : e.removeClass("fr-above");
                }
                return n;
            }(r, n, i));
        }
        function i(n) {
            var r = e(n), i = r.is(".fr-sticky-on"), a = r.data("sticky-top"), o = r.data("sticky-scheduled");
            if (void 0 === a) {
                r.data("sticky-top", 0);
                var s = e('<div class="fr-sticky-dummy" style="height: ' + r.outerHeight() + 'px;"></div>');
                t.$box.prepend(s);
            } else t.$box.find(".fr-sticky-dummy").css("height", r.outerHeight());
            if (t.core.hasFocus() || 0 < t.$tb.find("input:visible:focus").length) {
                var l = t.helpers.scrollTop(), d = Math.min(Math.max(l - t.$tb.parent().offset().top, 0), t.$tb.parent().outerHeight() - r.outerHeight());
                d != a && d != o && (clearTimeout(r.data("sticky-timeout")), r.data("sticky-scheduled", d), 
                r.outerHeight() < l - t.$tb.parent().offset().top && r.addClass("fr-opacity-0"), 
                r.data("sticky-timeout", setTimeout(function() {
                    var e = t.helpers.scrollTop(), n = Math.min(Math.max(e - t.$tb.parent().offset().top, 0), t.$tb.parent().outerHeight() - r.outerHeight());
                    0 < n && "BODY" == t.$tb.parent().get(0).tagName && (n += t.$tb.parent().position().top), 
                    n != a && (r.css("top", Math.max(n, 0)), r.data("sticky-top", n), r.data("sticky-scheduled", n)), 
                    r.removeClass("fr-opacity-0");
                }, 100))), i || (r.css("top", "0"), r.width(t.$tb.parent().width()), r.addClass("fr-sticky-on"), 
                t.$box.addClass("fr-sticky-box"));
            } else clearTimeout(e(n).css("sticky-timeout")), r.css("top", "0"), r.css("position", ""), 
            r.width(""), r.data("sticky-top", 0), r.removeClass("fr-sticky-on"), t.$box.removeClass("fr-sticky-box");
        }
        function a(n) {
            if (n.offsetWidth) {
                var r, i, a = e(n), o = a.outerHeight(), s = a.data("sticky-position"), l = e("body" == t.opts.scrollableContainer ? t.o_win : t.opts.scrollableContainer).outerHeight(), d = 0, c = 0;
                "body" !== t.opts.scrollableContainer && (d = t.$sc.offset().top, c = e(t.o_win).outerHeight() - d - l);
                var f = "body" == t.opts.scrollableContainer ? t.helpers.scrollTop() : d, p = a.is(".fr-sticky-on");
                a.data("sticky-parent") || a.data("sticky-parent", a.parent());
                var u = a.data("sticky-parent"), h = u.offset().top, g = u.outerHeight();
                if (a.data("sticky-offset") ? t.$box.find(".fr-sticky-dummy").css("height", o + "px") : (a.data("sticky-offset", !0), 
                a.after('<div class="fr-sticky-dummy" style="height: ' + o + 'px;"></div>')), !s) {
                    var m = "auto" !== a.css("top") || "auto" !== a.css("bottom");
                    m || a.css("position", "fixed"), s = {
                        top: t.node.hasClass(a.get(0), "fr-top"),
                        bottom: t.node.hasClass(a.get(0), "fr-bottom")
                    }, m || a.css("position", ""), a.data("sticky-position", s), a.data("top", t.node.hasClass(a.get(0), "fr-top") ? a.css("top") : "auto"), 
                    a.data("bottom", t.node.hasClass(a.get(0), "fr-bottom") ? a.css("bottom") : "auto");
                }
                r = t.helpers.getPX(a.data("top")), i = t.helpers.getPX(a.data("bottom"));
                var v = s.top && h < f + r && f + r <= h + g - o && (t.helpers.isInViewPort(t.$sc.get(0)) || "body" == t.opts.scrollableContainer), E = s.bottom && h + o < f + l - i && f + l - i < h + g;
                v || E ? (a.css("width", u.get(0).getBoundingClientRect().width + "px"), p || (a.addClass("fr-sticky-on"), 
                a.removeClass("fr-sticky-off"), a.css("top") && ("auto" != a.data("top") ? a.css("top", t.helpers.getPX(a.data("top")) + d) : a.data("top", "auto")), 
                a.css("bottom") && ("auto" != a.data("bottom") ? a.css("bottom", t.helpers.getPX(a.data("bottom")) + c) : a.css("bottom", "auto")))) : t.node.hasClass(a.get(0), "fr-sticky-off") || (a.width(""), 
                a.removeClass("fr-sticky-on"), a.addClass("fr-sticky-off"), a.css("top") && "auto" != a.data("top") && s.top && a.css("top", 0), 
                a.css("bottom") && "auto" != a.data("bottom") && s.bottom && a.css("bottom", 0));
            }
        }
        function o() {
            var e = document.createElement("test").style;
            return e.cssText = "position:" + [ "-webkit-", "-moz-", "-ms-", "-o-", "" ].join("sticky; position:") + " sticky;", 
            -1 !== e.position.indexOf("sticky") && !t.helpers.isIOS() && !t.helpers.isAndroid() && !t.browser.chrome;
        }
        function s() {
            if (t._stickyElements) for (var e = 0; e < t._stickyElements.length; e++) a(t._stickyElements[e]);
        }
        return {
            _init: function() {
                !function() {
                    if (!o()) if (t._stickyElements = [], t.helpers.isIOS()) {
                        var n = function() {
                            if (t.helpers.requestAnimationFrame()(n), !1 !== t.events.trigger("position.refresh")) for (var e = 0; e < t._stickyElements.length; e++) i(t._stickyElements[e]);
                        };
                        n(), t.events.$on(e(t.o_win), "scroll", function() {
                            if (t.core.hasFocus()) for (var n = 0; n < t._stickyElements.length; n++) {
                                var r = e(t._stickyElements[n]), i = r.parent(), a = t.helpers.scrollTop();
                                r.outerHeight() < a - i.offset().top && (r.addClass("fr-opacity-0"), r.data("sticky-top", -1), 
                                r.data("sticky-scheduled", -1));
                            }
                        }, !0);
                    } else "body" !== t.opts.scrollableContainer && t.events.$on(e(t.opts.scrollableContainer), "scroll", s, !0), 
                    t.events.$on(e(t.o_win), "scroll", s, !0), t.events.$on(e(t.o_win), "resize", s, !0), 
                    t.events.on("initialized", s), t.events.on("focus", s), t.events.$on(e(t.o_win), "resize", "textarea", s, !0);
                    t.events.on("destroy", function() {
                        t._stickyElements = [];
                    });
                }();
            },
            forSelection: function(e) {
                var i = n();
                e.css({
                    top: 0,
                    left: 0
                });
                var a = i.top + i.height, o = i.left + i.width / 2 - e.get(0).offsetWidth / 2 + t.helpers.scrollLeft();
                t.opts.iframe || (a += t.helpers.scrollTop()), r(o, a, e, i.height);
            },
            addSticky: function(e) {
                e.addClass("fr-sticky"), t.helpers.isIOS() && e.addClass("fr-sticky-ios"), o() || (e.removeClass("fr-sticky"), 
                t._stickyElements.push(e.get(0)));
            },
            refresh: s,
            at: r,
            getBoundingRect: n
        };
    }, e.FE.MODULES.refresh = function(t) {
        function n(e, t) {
            e.toggleClass("fr-disabled", t).attr("aria-disabled", t);
        }
        return {
            undo: function(e) {
                n(e, !t.undo.canDo());
            },
            redo: function(e) {
                n(e, !t.undo.canRedo());
            },
            outdent: function(r) {
                if (t.node.hasClass(r.get(0), "fr-no-refresh")) return !1;
                for (var i = t.selection.blocks(), a = 0; a < i.length; a++) {
                    var o = "rtl" == t.opts.direction || "rtl" == e(i[a]).css("direction") ? "margin-right" : "margin-left";
                    if ("LI" == i[a].tagName || "LI" == i[a].parentNode.tagName) return n(r, !1), !0;
                    if (0 < t.helpers.getPX(e(i[a]).css(o))) return n(r, !1), !0;
                }
                n(r, !0);
            },
            indent: function(e) {
                if (t.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                for (var r = t.selection.blocks(), i = 0; i < r.length; i++) {
                    for (var a = r[i].previousSibling; a && a.nodeType == Node.TEXT_NODE && 0 === a.textContent.length; ) a = a.previousSibling;
                    if ("LI" != r[i].tagName || a) return n(e, !1), !0;
                    n(e, !0);
                }
            }
        };
    }, e.extend(e.FE.DEFAULTS, {
        editInPopup: !1
    }), e.FE.MODULES.textEdit = function(e) {
        function t() {
            e.events.$on(e.$el, e._mouseup, function() {
                setTimeout(function() {
                    var t, n;
                    n = e.popups.get("text.edit"), t = "INPUT" === e.$el.prop("tagName") ? e.$el.attr("placeholder") : e.$el.text(), 
                    n.find("input").val(t).trigger("change"), e.popups.setContainer("text.edit", e.$sc), 
                    e.popups.show("text.edit", e.$el.offset().left + e.$el.outerWidth() / 2, e.$el.offset().top + e.$el.outerHeight(), e.$el.outerHeight());
                }, 10);
            });
        }
        return {
            _init: function() {
                var n;
                e.opts.editInPopup && (n = {
                    edit: '<div id="fr-text-edit-' + e.id + '" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="' + e.language.translate("Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">' + e.language.translate("Update") + "</button></div></div>"
                }, e.popups.create("text.edit", n), t());
            },
            update: function() {
                var t = e.popups.get("text.edit").find("input").val();
                0 === t.length && (t = e.opts.placeholderText), "INPUT" === e.$el.prop("tagName") ? e.$el.attr("placeholder", t) : e.$el.text(t), 
                e.events.trigger("contentChanged"), e.popups.hide("text.edit");
            }
        };
    }, e.FE.RegisterCommand("updateText", {
        focus: !1,
        undo: !1,
        callback: function() {
            this.textEdit.update();
        }
    }), e.extend(e.FE.DEFAULTS, {
        toolbarBottom: !1,
        toolbarButtons: null,
        toolbarButtonsXS: null,
        toolbarButtonsSM: null,
        toolbarButtonsMD: null,
        toolbarContainer: null,
        toolbarInline: !1,
        toolbarSticky: !0,
        toolbarStickyOffset: 0,
        toolbarVisibleWithoutSelection: !1
    }), e.FE.TOOLBAR_BUTTONS = [ "fullscreen", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "|", "fontFamily", "fontSize", "color", "inlineStyle", "paragraphStyle", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "-", "insertLink", "insertImage", "insertVideo", "embedly", "insertFile", "insertTable", "|", "emoticons", "specialCharacters", "insertHR", "selectAll", "clearFormatting", "|", "print", "spellChecker", "help", "html", "|", "undo", "redo" ], 
    e.FE.TOOLBAR_BUTTONS_MD = null, e.FE.TOOLBAR_BUTTONS_SM = [ "bold", "italic", "underline", "|", "fontFamily", "fontSize", "insertLink", "insertImage", "table", "|", "undo", "redo" ], 
    e.FE.TOOLBAR_BUTTONS_XS = [ "bold", "italic", "fontFamily", "fontSize", "|", "undo", "redo" ], 
    e.FE.MODULES.toolbar = function(t) {
        function n(e, t) {
            for (var n = 0; n < t.length; n++) "-" != t[n] && "|" != t[n] && e.indexOf(t[n]) < 0 && e.push(t[n]);
        }
        function r() {
            var e = t.helpers.screenSize();
            return p[e];
        }
        function i() {
            var e = r();
            t.$tb.find(".fr-separator").remove(), t.$tb.find("> .fr-command").addClass("fr-hidden");
            for (var n = 0; n < e.length; n++) if ("|" == e[n] || "-" == e[n]) t.$tb.append(t.button.buildList([ e[n] ])); else {
                var i = t.$tb.find('> .fr-command[data-cmd="' + e[n] + '"]'), a = null;
                t.node.hasClass(i.next().get(0), "fr-dropdown-menu") && (a = i.next()), i.removeClass("fr-hidden").appendTo(t.$tb), 
                a && a.appendTo(t.$tb);
            }
        }
        function a(n, r) {
            setTimeout(function() {
                if ((!n || n.which != e.FE.KEYCODE.ESC) && t.selection.inEditor() && t.core.hasFocus() && !t.popups.areVisible() && (t.opts.toolbarVisibleWithoutSelection || !t.selection.isCollapsed() && !t.keys.isIME() || r)) {
                    if (t.$tb.data("instance", t), !1 === t.events.trigger("toolbar.show", [ n ])) return !1;
                    t.$tb.show(), t.opts.toolbarContainer || t.position.forSelection(t.$tb), 1 < t.opts.zIndex ? t.$tb.css("z-index", t.opts.zIndex + 1) : t.$tb.css("z-index", null);
                }
            }, 0);
        }
        function o(e) {
            return (!e || "blur" !== e.type || document.activeElement !== t.el) && (!(!e || "keydown" !== e.type || !t.keys.ctrlKey(e)) || !!t.button.getButtons(".fr-dropdown.fr-active").next().find(t.o_doc.activeElement).length || void (!1 !== t.events.trigger("toolbar.hide") && t.$tb.hide()));
        }
        function s(n) {
            clearTimeout(u), n && n.which == e.FE.KEYCODE.ESC || (u = setTimeout(a, t.opts.typingTimer));
        }
        function l() {
            t.events.on("window.mousedown", o), t.events.on("keydown", o), t.events.on("blur", o), 
            t.helpers.isMobile() || t.events.on("window.mouseup", a), t.helpers.isMobile() ? t.helpers.isIOS() || (t.events.on("window.touchend", a), 
            t.browser.mozilla && setInterval(a, 200)) : t.events.on("window.keyup", s), t.events.on("keydown", function(t) {
                t && t.which == e.FE.KEYCODE.ESC && o();
            }), t.events.on("keydown", function(t) {
                if (t.which == e.FE.KEYCODE.ALT) return t.stopPropagation(), !1;
            }, !0), t.events.$on(t.$wp, "scroll.toolbar", a), t.events.on("commands.after", a), 
            t.helpers.isMobile() && (t.events.$on(t.$doc, "selectionchange", s), t.events.$on(t.$doc, "orientationchange", a));
        }
        function d() {
            t.$tb.html("").removeData().remove(), t.$tb = null;
        }
        function c() {
            t.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), t.$box.find(".fr-sticky-dummy").remove();
        }
        function f() {
            t.opts.theme && t.$tb.addClass(t.opts.theme + "-theme"), 1 < t.opts.zIndex && t.$tb.css("z-index", t.opts.zIndex + 1), 
            "auto" != t.opts.direction && t.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-" + t.opts.direction), 
            t.helpers.isMobile() ? t.$tb.addClass("fr-mobile") : t.$tb.addClass("fr-desktop"), 
            t.opts.toolbarContainer ? (t.opts.toolbarInline && (l(), o()), t.opts.toolbarBottom ? t.$tb.addClass("fr-bottom") : t.$tb.addClass("fr-top")) : t.opts.toolbarInline ? (t.$sc.append(t.$tb), 
            t.$tb.data("container", t.$sc), t.$tb.addClass("fr-inline"), t.$tb.prepend('<span class="fr-arrow"></span>'), 
            l(), t.opts.toolbarBottom = !1) : (t.opts.toolbarBottom && !t.helpers.isIOS() ? (t.$box.append(t.$tb), 
            t.$tb.addClass("fr-bottom"), t.$box.addClass("fr-bottom")) : (t.opts.toolbarBottom = !1, 
            t.$box.prepend(t.$tb), t.$tb.addClass("fr-top"), t.$box.addClass("fr-top")), t.$tb.addClass("fr-basic"), 
            t.opts.toolbarSticky && (t.opts.toolbarStickyOffset && (t.opts.toolbarBottom ? t.$tb.css("bottom", t.opts.toolbarStickyOffset) : t.$tb.css("top", t.opts.toolbarStickyOffset)), 
            t.position.addSticky(t.$tb))), function() {
                var i = e.merge([], r());
                n(i, p[e.FE.XS]), n(i, p[e.FE.SM]), n(i, p[e.FE.MD]), n(i, p[e.FE.LG]);
                for (var a = i.length - 1; 0 <= a; a--) "-" != i[a] && "|" != i[a] && i.indexOf(i[a]) < a && i.splice(a, 1);
                var o = t.button.buildList(i, r());
                t.$tb.append(o), t.button.bindCommands(t.$tb);
            }(), t.events.$on(e(t.o_win), "resize", i), t.events.$on(e(t.o_win), "orientationchange", i), 
            t.accessibility.registerToolbar(t.$tb), t.events.$on(t.$tb, t._mousedown + " " + t._mouseup, function(e) {
                var n = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                if (n && "INPUT" != n.tagName && !t.edit.isDisabled()) return e.stopPropagation(), 
                e.preventDefault(), !1;
            }, !0);
        }
        var p = [];
        p[e.FE.XS] = t.opts.toolbarButtonsXS || t.opts.toolbarButtons || e.FE.TOOLBAR_BUTTONS_XS || e.FE.TOOLBAR_BUTTONS || [], 
        p[e.FE.SM] = t.opts.toolbarButtonsSM || t.opts.toolbarButtons || e.FE.TOOLBAR_BUTTONS_SM || e.FE.TOOLBAR_BUTTONS || [], 
        p[e.FE.MD] = t.opts.toolbarButtonsMD || t.opts.toolbarButtons || e.FE.TOOLBAR_BUTTONS_MD || e.FE.TOOLBAR_BUTTONS || [], 
        p[e.FE.LG] = t.opts.toolbarButtons || e.FE.TOOLBAR_BUTTONS || [];
        var u = null, h = !1;
        return {
            _init: function() {
                if (t.$sc = e(t.opts.scrollableContainer).first(), !t.$wp) return !1;
                t.opts.toolbarContainer ? (t.shared.$tb ? (t.$tb = t.shared.$tb, t.opts.toolbarInline && l()) : (t.shared.$tb = e('<div class="fr-toolbar"></div>'), 
                t.$tb = t.shared.$tb, e(t.opts.toolbarContainer).append(t.$tb), f(), t.$tb.data("instance", t)), 
                t.opts.toolbarInline ? t.$box.addClass("fr-inline") : t.$box.addClass("fr-basic"), 
                t.events.on("focus", function() {
                    t.$tb.data("instance", t);
                }, !0), t.opts.toolbarInline = !1) : t.opts.toolbarInline ? (t.$box.addClass("fr-inline"), 
                t.shared.$tb ? (t.$tb = t.shared.$tb, l()) : (t.shared.$tb = e('<div class="fr-toolbar"></div>'), 
                t.$tb = t.shared.$tb, f())) : (t.$box.addClass("fr-basic"), t.$tb = e('<div class="fr-toolbar"></div>'), 
                f(), t.$tb.data("instance", t)), t.events.on("destroy", c, !0), t.events.on(t.opts.toolbarInline || t.opts.toolbarContainer ? "shared.destroy" : "destroy", d, !0);
            },
            hide: o,
            show: function() {
                if (!1 === t.events.trigger("toolbar.show")) return !1;
                t.$tb.show();
            },
            showInline: a,
            disable: function() {
                !h && t.$tb && (t.$tb.find("> .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0), 
                h = !0);
            },
            enable: function() {
                h && t.$tb && (t.$tb.find("> .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1), 
                h = !1), t.button.bulkRefresh();
            }
        };
    }, e.FE.PLUGINS.align = function(t) {
        return {
            apply: function(n) {
                var r = t.selection.element();
                if (e(r).parents(".fr-img-caption").length) e(r).css("text-align", n); else {
                    t.selection.save(), t.html.wrap(!0, !0, !0, !0), t.selection.restore();
                    for (var i = t.selection.blocks(), a = 0; a < i.length; a++) t.helpers.getAlignment(e(i[a].parentNode)) == n ? e(i[a]).css("text-align", "").removeClass("fr-temp-div") : e(i[a]).css("text-align", n).removeClass("fr-temp-div"), 
                    "" === e(i[a]).attr("class") && e(i[a]).removeAttr("class"), "" === e(i[a]).attr("style") && e(i[a]).removeAttr("style");
                    t.selection.save(), t.html.unwrap(), t.selection.restore();
                }
            },
            refresh: function(n) {
                var r = t.selection.blocks();
                if (r.length) {
                    var i = t.helpers.getAlignment(e(r[0]));
                    n.find("> *:first").replaceWith(t.icon.create("align-" + i));
                }
            },
            refreshOnShow: function(n, r) {
                var i = t.selection.blocks();
                if (i.length) {
                    var a = t.helpers.getAlignment(e(i[0]));
                    r.find('a.fr-command[data-param1="' + a + '"]').addClass("fr-active").attr("aria-selected", !0);
                }
            }
        };
    }, e.FE.DefineIcon("align", {
        NAME: "align-left"
    }), e.FE.DefineIcon("align-left", {
        NAME: "align-left"
    }), e.FE.DefineIcon("align-right", {
        NAME: "align-right"
    }), e.FE.DefineIcon("align-center", {
        NAME: "align-center"
    }), e.FE.DefineIcon("align-justify", {
        NAME: "align-justify"
    }), e.FE.RegisterCommand("align", {
        type: "dropdown",
        title: "Align",
        options: {
            left: "Align Left",
            center: "Align Center",
            right: "Align Right",
            justify: "Align Justify"
        },
        html: function() {
            var t = '<ul class="fr-dropdown-list" role="presentation">', n = e.FE.COMMANDS.align.options;
            for (var r in n) n.hasOwnProperty(r) && (t += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="' + r + '" title="' + this.language.translate(n[r]) + '">' + this.icon.create("align-" + r) + '<span class="fr-sr-only">' + this.language.translate(n[r]) + "</span></a></li>");
            return t += "</ul>";
        },
        callback: function(e, t) {
            this.align.apply(t);
        },
        refresh: function(e) {
            this.align.refresh(e);
        },
        refreshOnShow: function(e, t) {
            this.align.refreshOnShow(e, t);
        },
        plugin: "align"
    }), e.extend(e.FE.DEFAULTS, {
        charCounterMax: -1,
        charCounterCount: !0
    }), e.FE.PLUGINS.charCounter = function(t) {
        function n() {
            return (t.el.textContent || "").replace(/\u200B/g, "").length;
        }
        function r(r) {
            if (t.opts.charCounterMax < 0) return !0;
            if (n() < t.opts.charCounterMax) return !0;
            var i = r.which;
            return !(!t.keys.ctrlKey(r) && t.keys.isCharacter(i) || i === e.FE.KEYCODE.IME) || (r.preventDefault(), 
            r.stopPropagation(), t.events.trigger("charCounter.exceeded"), !1);
        }
        function i(r) {
            return t.opts.charCounterMax < 0 ? r : e("<div>").html(r).text().length + n() <= t.opts.charCounterMax ? r : (t.events.trigger("charCounter.exceeded"), 
            "");
        }
        function a() {
            if (t.opts.charCounterCount) {
                var e = n() + (0 < t.opts.charCounterMax ? "/" + t.opts.charCounterMax : "");
                o.text(e), t.opts.toolbarBottom && o.css("margin-bottom", t.$tb.outerHeight(!0));
                var r = t.$wp.get(0).offsetWidth - t.$wp.get(0).clientWidth;
                0 <= r && ("rtl" == t.opts.direction ? o.css("margin-left", r) : o.css("margin-right", r));
            }
        }
        var o;
        return {
            _init: function() {
                return !!t.$wp && !!t.opts.charCounterCount && ((o = e('<span class="fr-counter"></span>')).css("bottom", t.$wp.css("border-bottom-width")), 
                t.$box.append(o), t.events.on("keydown", r, !0), t.events.on("paste.afterCleanup", i), 
                t.events.on("keyup contentChanged input", function() {
                    t.events.trigger("charCounter.update");
                }), t.events.on("charCounter.update", a), t.events.trigger("charCounter.update"), 
                void t.events.on("destroy", function() {
                    e(t.o_win).off("resize.char" + t.id), o.removeData().remove(), o = null;
                }));
            },
            count: n
        };
    }, e.FE.PLUGINS.codeBeautifier = function() {
        function e(e, t) {
            function n() {
                return (m = e.charAt(++T)) || "";
            }
            function r(t) {
                var r, i = T;
                return t && a(), r = e.charAt(T + 1) || "", T = i - 1, n(), r;
            }
            function i(t) {
                for (var r = T; n(); ) if ("\\" === m) n(); else {
                    if (-1 !== t.indexOf(m)) break;
                    if ("\n" === m) break;
                }
                return e.substring(r, T + 1);
            }
            function a() {
                for (var e = ""; b.test(r()); ) n(), e += m;
                return e;
            }
            function o(t) {
                var i = T;
                for (t = "/" === r(), n(); n(); ) {
                    if (!t && "*" === m && "/" === r()) {
                        n();
                        break;
                    }
                    if (t && "\n" === m) return e.substring(i, T);
                }
                return e.substring(i, T) + m;
            }
            function s(t) {
                return e.substring(T - t.length, T).toLowerCase() === t;
            }
            var l = {
                "@page": !0,
                "@font-face": !0,
                "@keyframes": !0,
                "@media": !0,
                "@supports": !0,
                "@document": !0
            }, d = {
                "@media": !0,
                "@supports": !0,
                "@document": !0
            };
            t = t || {}, e = (e = e || "").replace(/\r\n|[\r\u2028\u2029]/g, "\n");
            var c = t.indent_size || 4, f = t.indent_char || " ", p = void 0 === t.selector_separator_newline || t.selector_separator_newline, u = void 0 !== t.end_with_newline && t.end_with_newline, h = void 0 === t.newline_between_rules || t.newline_between_rules, g = t.eol ? t.eol : "\n";
            "string" == typeof c && (c = parseInt(c, 10)), t.indent_with_tabs && (f = "\t", 
            c = 1), g = g.replace(/\\r/, "\r").replace(/\\n/, "\n");
            for (var m, v, E, b = /^\s+$/, T = -1, A = 0, S = e.match(/^[\t ]*/)[0], R = new Array(c + 1).join(f), C = 0, y = 0, _ = {
                "{": function(e) {
                    _.singleSpace(), L.push(e), _.newLine();
                },
                "}": function(e) {
                    _.newLine(), L.push(e), _.newLine();
                },
                _lastCharWhitespace: function() {
                    return b.test(L[L.length - 1]);
                },
                newLine: function(e) {
                    L.length && (e || "\n" === L[L.length - 1] || _.trim(), L.push("\n"), S && L.push(S));
                },
                singleSpace: function() {
                    L.length && !_._lastCharWhitespace() && L.push(" ");
                },
                preserveSingleSpace: function() {
                    D && _.singleSpace();
                },
                trim: function() {
                    for (;_._lastCharWhitespace(); ) L.pop();
                }
            }, L = [], x = !1, N = !1, w = !1, O = "", I = ""; ;) {
                var k = function() {
                    var e = "";
                    for (m && b.test(m) && (e = m); b.test(n()); ) e += m;
                    return e;
                }(), D = "" !== k, F = -1 !== k.indexOf("\n");
                if (I = O, !(O = m)) break;
                if ("/" === m && "*" === r()) {
                    var M = 0 === C;
                    (F || M) && _.newLine(), L.push(o()), _.newLine(), M && _.newLine(!0);
                } else if ("/" === m && "/" === r()) F || "{" === I || _.trim(), _.singleSpace(), 
                L.push(o()), _.newLine(); else if ("@" === m) {
                    _.preserveSingleSpace(), L.push(m);
                    var $ = (v = T, E = i(": ,;{}()[]/='\""), T = v - 1, n(), E);
                    $.match(/[ :]$/) && (n(), $ = i(": ").replace(/\s$/, ""), L.push($), _.singleSpace()), 
                    ($ = $.replace(/\s$/, "")) in l && (y += 1, $ in d && (w = !0));
                } else "#" === m && "{" === r() ? (_.preserveSingleSpace(), L.push(i("}"))) : "{" === m ? "}" === r(!0) ? (a(), 
                n(), _.singleSpace(), L.push("{}"), _.newLine(), h && 0 === C && _.newLine(!0)) : (C++, 
                S += R, _["{"](m), w ? (w = !1, x = y < C) : x = y <= C) : "}" === m ? (C--, S = S.slice(0, -c), 
                _["}"](m), N = x = !1, y && y--, h && 0 === C && _.newLine(!0)) : ":" === m ? (a(), 
                !x && !w || s("&") || function() {
                    for (var t = 0, n = T + 1; n < e.length; n++) {
                        var r = e.charAt(n);
                        if ("{" === r) return !0;
                        if ("(" === r) t += 1; else if (")" === r) {
                            if (0 == t) return !1;
                            t -= 1;
                        } else if (";" === r || "}" === r) return !1;
                    }
                    return !1;
                }() ? ":" === r() ? (n(), L.push("::")) : L.push(":") : (N = !0, L.push(":"), _.singleSpace())) : '"' === m || "'" === m ? (_.preserveSingleSpace(), 
                L.push(i(m))) : ";" === m ? (N = !1, L.push(m), _.newLine()) : "(" === m ? s("url") ? (L.push(m), 
                a(), n() && (")" !== m && '"' !== m && "'" !== m ? L.push(i(")")) : T--)) : (A++, 
                _.preserveSingleSpace(), L.push(m), a()) : ")" === m ? (L.push(m), A--) : "," === m ? (L.push(m), 
                a(), p && !N && A < 1 ? _.newLine() : _.singleSpace()) : ("]" === m || ("[" === m ? _.preserveSingleSpace() : "=" === m ? (a(), 
                m = "=") : _.preserveSingleSpace()), L.push(m));
            }
            var B = "";
            return S && (B += S), B += L.join("").replace(/[\r\n\t ]+$/, ""), u && (B += "\n"), 
            "\n" != g && (B = B.replace(/[\n]/g, g)), B;
        }
        function t(e, t) {
            for (var n = 0; n < t.length; n += 1) if (t[n] === e) return !0;
            return !1;
        }
        function n(e) {
            return e.replace(/^\s+|\s+$/g, "");
        }
        function r(e, r) {
            return new function(e, r) {
                function i(e, t) {
                    var n = 0;
                    return e && (n = e.indentation_level, !R.just_added_newline() && e.line_indent_level > n && (n = e.line_indent_level)), 
                    {
                        mode: t,
                        parent: e,
                        last_text: e ? e.last_text : "",
                        last_word: e ? e.last_word : "",
                        declaration_statement: !1,
                        declaration_assignment: !1,
                        multiline_frame: !1,
                        if_block: !1,
                        else_block: !1,
                        do_block: !1,
                        do_while: !1,
                        in_case_statement: !1,
                        in_case: !1,
                        case_body: !1,
                        indentation_level: n,
                        line_indent_level: e ? e.line_indent_level : n,
                        start_line_index: R.get_line_number(),
                        ternary_depth: 0
                    };
                }
                function a(e) {
                    var t = e.newlines;
                    if (F.keep_array_indentation && g(w.mode)) for (n = 0; n < t; n += 1) s(0 < n); else if (F.max_preserve_newlines && t > F.max_preserve_newlines && (t = F.max_preserve_newlines), 
                    F.preserve_newlines && 1 < e.newlines) {
                        s();
                        for (var n = 1; n < t; n += 1) s(!0);
                    }
                    D[(_ = e).type]();
                }
                function o(e) {
                    if (e = void 0 !== e && e, !R.just_added_newline()) if (F.preserve_newlines && _.wanted_newline || e) s(!1, !0); else if (F.wrap_line_length) {
                        var t = R.current_line.get_character_count() + _.text.length + (R.space_before_token ? 1 : 0);
                        t >= F.wrap_line_length && s(!1, !0);
                    }
                }
                function s(e, t) {
                    if (!t && ";" !== w.last_text && "," !== w.last_text && "=" !== w.last_text && "TK_OPERATOR" !== L) for (;w.mode === d.Statement && !w.if_block && !w.do_block; ) v();
                    R.add_new_line(e) && (w.multiline_frame = !0);
                }
                function f() {
                    R.just_added_newline() && (F.keep_array_indentation && g(w.mode) && _.wanted_newline ? (R.current_line.push(_.whitespace_before), 
                    R.space_before_token = !1) : R.set_indent(w.indentation_level) && (w.line_indent_level = w.indentation_level));
                }
                function p(e) {
                    R.raw ? R.add_raw_token(_) : (F.comma_first && "TK_COMMA" === L && R.just_added_newline() && "," === R.previous_line.last() && (R.previous_line.pop(), 
                    f(), R.add_token(","), R.space_before_token = !0), e = e || _.text, f(), R.add_token(e));
                }
                function u() {
                    w.indentation_level += 1;
                }
                function h(e) {
                    w ? (I.push(w), O = w) : O = i(null, e), w = i(O, e);
                }
                function g(e) {
                    return e === d.ArrayLiteral;
                }
                function m(e) {
                    return t(e, [ d.Expression, d.ForInitializer, d.Conditional ]);
                }
                function v() {
                    0 < I.length && (O = w, w = I.pop(), O.mode === d.Statement && R.remove_redundant_indentation(O));
                }
                function E() {
                    return w.parent.mode === d.ObjectLiteral && w.mode === d.Statement && (":" === w.last_text && 0 === w.ternary_depth || "TK_RESERVED" === L && t(w.last_text, [ "get", "set" ]));
                }
                function b() {
                    return !!("TK_RESERVED" === L && t(w.last_text, [ "var", "let", "const" ]) && "TK_WORD" === _.type || "TK_RESERVED" === L && "do" === w.last_text || "TK_RESERVED" === L && "return" === w.last_text && !_.wanted_newline || "TK_RESERVED" === L && "else" === w.last_text && ("TK_RESERVED" !== _.type || "if" !== _.text) || "TK_END_EXPR" === L && (O.mode === d.ForInitializer || O.mode === d.Conditional) || "TK_WORD" === L && w.mode === d.BlockStatement && !w.in_case && "--" !== _.text && "++" !== _.text && "function" !== x && "TK_WORD" !== _.type && "TK_RESERVED" !== _.type || w.mode === d.ObjectLiteral && (":" === w.last_text && 0 === w.ternary_depth || "TK_RESERVED" === L && t(w.last_text, [ "get", "set" ]))) && (h(d.Statement), 
                    u(), "TK_RESERVED" === L && t(w.last_text, [ "var", "let", "const" ]) && "TK_WORD" === _.type && (w.declaration_statement = !0), 
                    E() || o("TK_RESERVED" === _.type && t(_.text, [ "do", "for", "if", "while" ])), 
                    !0);
                }
                function T(e) {
                    return t(e, [ "case", "return", "do", "if", "throw", "else" ]);
                }
                function A(e) {
                    var t = C + (e || 0);
                    return t < 0 || t >= M.length ? null : M[t];
                }
                function S() {
                    if ("TK_RESERVED" === _.type && w.mode !== d.ObjectLiteral && t(_.text, [ "set", "get" ]) && (_.type = "TK_WORD"), 
                    "TK_RESERVED" === _.type && w.mode === d.ObjectLiteral) {
                        ":" == A(1).text && (_.type = "TK_WORD");
                    }
                    if (b() || !_.wanted_newline || m(w.mode) || "TK_OPERATOR" === L && "--" !== w.last_text && "++" !== w.last_text || "TK_EQUALS" === L || !F.preserve_newlines && "TK_RESERVED" === L && t(w.last_text, [ "var", "let", "const", "set", "get" ]) || s(), 
                    w.do_block && !w.do_while) {
                        if ("TK_RESERVED" === _.type && "while" === _.text) return R.space_before_token = !0, 
                        p(), R.space_before_token = !0, void (w.do_while = !0);
                        s(), w.do_block = !1;
                    }
                    if (w.if_block) if (w.else_block || "TK_RESERVED" !== _.type || "else" !== _.text) {
                        for (;w.mode === d.Statement; ) v();
                        w.if_block = !1, w.else_block = !1;
                    } else w.else_block = !0;
                    if ("TK_RESERVED" === _.type && ("case" === _.text || "default" === _.text && w.in_case_statement)) return s(), 
                    (w.case_body || F.jslint_happy) && (0 < w.indentation_level && (!w.parent || w.indentation_level > w.parent.indentation_level) && (w.indentation_level -= 1), 
                    w.case_body = !1), p(), w.in_case = !0, void (w.in_case_statement = !0);
                    if ("TK_RESERVED" === _.type && "function" === _.text && ((t(w.last_text, [ "}", ";" ]) || R.just_added_newline() && !t(w.last_text, [ "[", "{", ":", "=", "," ])) && (R.just_added_blankline() || _.comments_before.length || (s(), 
                    s(!0))), "TK_RESERVED" === L || "TK_WORD" === L ? "TK_RESERVED" === L && t(w.last_text, [ "get", "set", "new", "return", "export", "async" ]) ? R.space_before_token = !0 : "TK_RESERVED" === L && "default" === w.last_text && "export" === x ? R.space_before_token = !0 : s() : "TK_OPERATOR" === L || "=" === w.last_text ? R.space_before_token = !0 : (w.multiline_frame || !m(w.mode) && !g(w.mode)) && s()), 
                    "TK_COMMA" !== L && "TK_START_EXPR" !== L && "TK_EQUALS" !== L && "TK_OPERATOR" !== L || E() || o(), 
                    "TK_RESERVED" === _.type && t(_.text, [ "function", "get", "set" ])) return p(), 
                    void (w.last_word = _.text);
                    if (k = "NONE", "TK_END_BLOCK" === L ? "TK_RESERVED" === _.type && t(_.text, [ "else", "catch", "finally" ]) ? "expand" === F.brace_style || "end-expand" === F.brace_style || "none" === F.brace_style && _.wanted_newline ? k = "NEWLINE" : (k = "SPACE", 
                    R.space_before_token = !0) : k = "NEWLINE" : "TK_SEMICOLON" === L && w.mode === d.BlockStatement ? k = "NEWLINE" : "TK_SEMICOLON" === L && m(w.mode) ? k = "SPACE" : "TK_STRING" === L ? k = "NEWLINE" : "TK_RESERVED" === L || "TK_WORD" === L || "*" === w.last_text && "function" === x ? k = "SPACE" : "TK_START_BLOCK" === L ? k = "NEWLINE" : "TK_END_EXPR" === L && (R.space_before_token = !0, 
                    k = "NEWLINE"), "TK_RESERVED" === _.type && t(_.text, y.line_starters) && ")" !== w.last_text && (k = "else" === w.last_text || "export" === w.last_text ? "SPACE" : "NEWLINE"), 
                    "TK_RESERVED" === _.type && t(_.text, [ "else", "catch", "finally" ])) if ("TK_END_BLOCK" !== L || "expand" === F.brace_style || "end-expand" === F.brace_style || "none" === F.brace_style && _.wanted_newline) s(); else {
                        R.trim(!0);
                        var e = R.current_line;
                        "}" !== e.last() && s(), R.space_before_token = !0;
                    } else "NEWLINE" === k ? "TK_RESERVED" === L && T(w.last_text) ? R.space_before_token = !0 : "TK_END_EXPR" !== L ? "TK_START_EXPR" === L && "TK_RESERVED" === _.type && t(_.text, [ "var", "let", "const" ]) || ":" === w.last_text || ("TK_RESERVED" === _.type && "if" === _.text && "else" === w.last_text ? R.space_before_token = !0 : s()) : "TK_RESERVED" === _.type && t(_.text, y.line_starters) && ")" !== w.last_text && s() : w.multiline_frame && g(w.mode) && "," === w.last_text && "}" === x ? s() : "SPACE" === k && (R.space_before_token = !0);
                    p(), w.last_word = _.text, "TK_RESERVED" === _.type && "do" === _.text && (w.do_block = !0), 
                    "TK_RESERVED" === _.type && "if" === _.text && (w.if_block = !0);
                }
                var R, C, y, _, L, x, N, w, O, I, k, D, F, M = [], $ = "";
                for (D = {
                    TK_START_EXPR: function() {
                        b();
                        var e = d.Expression;
                        if ("[" === _.text) {
                            if ("TK_WORD" === L || ")" === w.last_text) return "TK_RESERVED" === L && t(w.last_text, y.line_starters) && (R.space_before_token = !0), 
                            h(e), p(), u(), void (F.space_in_paren && (R.space_before_token = !0));
                            e = d.ArrayLiteral, g(w.mode) && ("[" !== w.last_text && ("," !== w.last_text || "]" !== x && "}" !== x) || F.keep_array_indentation || s());
                        } else "TK_RESERVED" === L && "for" === w.last_text ? e = d.ForInitializer : "TK_RESERVED" === L && t(w.last_text, [ "if", "while" ]) && (e = d.Conditional);
                        ";" === w.last_text || "TK_START_BLOCK" === L ? s() : "TK_END_EXPR" === L || "TK_START_EXPR" === L || "TK_END_BLOCK" === L || "." === w.last_text ? o(_.wanted_newline) : "TK_RESERVED" === L && "(" === _.text || "TK_WORD" === L || "TK_OPERATOR" === L ? "TK_RESERVED" === L && ("function" === w.last_word || "typeof" === w.last_word) || "*" === w.last_text && "function" === x ? F.space_after_anon_function && (R.space_before_token = !0) : "TK_RESERVED" !== L || !t(w.last_text, y.line_starters) && "catch" !== w.last_text || F.space_before_conditional && (R.space_before_token = !0) : R.space_before_token = !0, 
                        "(" === _.text && "TK_RESERVED" === L && "await" === w.last_word && (R.space_before_token = !0), 
                        "(" === _.text && ("TK_EQUALS" !== L && "TK_OPERATOR" !== L || E() || o()), h(e), 
                        p(), F.space_in_paren && (R.space_before_token = !0), u();
                    },
                    TK_END_EXPR: function() {
                        for (;w.mode === d.Statement; ) v();
                        w.multiline_frame && o("]" === _.text && g(w.mode) && !F.keep_array_indentation), 
                        F.space_in_paren && ("TK_START_EXPR" !== L || F.space_in_empty_paren ? R.space_before_token = !0 : (R.trim(), 
                        R.space_before_token = !1)), "]" === _.text && F.keep_array_indentation ? (p(), 
                        v()) : (v(), p()), R.remove_redundant_indentation(O), w.do_while && O.mode === d.Conditional && (O.mode = d.Expression, 
                        w.do_block = !1, w.do_while = !1);
                    },
                    TK_START_BLOCK: function() {
                        var e = A(1), n = A(2);
                        h(n && (":" === n.text && t(e.type, [ "TK_STRING", "TK_WORD", "TK_RESERVED" ]) || t(e.text, [ "get", "set" ]) && t(n.type, [ "TK_WORD", "TK_RESERVED" ])) ? t(x, [ "class", "interface" ]) ? d.BlockStatement : d.ObjectLiteral : d.BlockStatement);
                        var r = !e.comments_before.length && "}" === e.text && "function" === w.last_word && "TK_END_EXPR" === L;
                        "expand" === F.brace_style || "none" === F.brace_style && _.wanted_newline ? "TK_OPERATOR" !== L && (r || "TK_EQUALS" === L || "TK_RESERVED" === L && T(w.last_text) && "else" !== w.last_text) ? R.space_before_token = !0 : s(!1, !0) : "TK_OPERATOR" !== L && "TK_START_EXPR" !== L ? "TK_START_BLOCK" === L ? s() : R.space_before_token = !0 : g(O.mode) && "," === w.last_text && ("}" === x ? R.space_before_token = !0 : s()), 
                        p(), u();
                    },
                    TK_END_BLOCK: function() {
                        for (;w.mode === d.Statement; ) v();
                        var e = "TK_START_BLOCK" === L;
                        "expand" === F.brace_style ? e || s() : e || (g(w.mode) && F.keep_array_indentation ? (F.keep_array_indentation = !1, 
                        s(), F.keep_array_indentation = !0) : s()), v(), p();
                    },
                    TK_WORD: S,
                    TK_RESERVED: S,
                    TK_SEMICOLON: function() {
                        for (b() && (R.space_before_token = !1); w.mode === d.Statement && !w.if_block && !w.do_block; ) v();
                        p();
                    },
                    TK_STRING: function() {
                        b() ? R.space_before_token = !0 : "TK_RESERVED" === L || "TK_WORD" === L ? R.space_before_token = !0 : "TK_COMMA" === L || "TK_START_EXPR" === L || "TK_EQUALS" === L || "TK_OPERATOR" === L ? E() || o() : s(), 
                        p();
                    },
                    TK_EQUALS: function() {
                        b(), w.declaration_statement && (w.declaration_assignment = !0), R.space_before_token = !0, 
                        p(), R.space_before_token = !0;
                    },
                    TK_OPERATOR: function() {
                        if (b(), "TK_RESERVED" === L && T(w.last_text)) return R.space_before_token = !0, 
                        void p();
                        if ("*" !== _.text || "TK_DOT" !== L) {
                            if (":" === _.text && w.in_case) return w.case_body = !0, u(), p(), s(), void (w.in_case = !1);
                            if ("::" !== _.text) {
                                "TK_OPERATOR" === L && o();
                                var e = !0, n = !0;
                                t(_.text, [ "--", "++", "!", "~" ]) || t(_.text, [ "-", "+" ]) && (t(L, [ "TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR" ]) || t(w.last_text, y.line_starters) || "," === w.last_text) ? (n = e = !1, 
                                !_.wanted_newline || "--" !== _.text && "++" !== _.text || s(!1, !0), ";" === w.last_text && m(w.mode) && (e = !0), 
                                "TK_RESERVED" === L ? e = !0 : "TK_END_EXPR" === L ? e = !("]" === w.last_text && ("--" === _.text || "++" === _.text)) : "TK_OPERATOR" === L && (e = t(_.text, [ "--", "-", "++", "+" ]) && t(w.last_text, [ "--", "-", "++", "+" ]), 
                                t(_.text, [ "+", "-" ]) && t(w.last_text, [ "--", "++" ]) && (n = !0)), w.mode !== d.BlockStatement && w.mode !== d.Statement || "{" !== w.last_text && ";" !== w.last_text || s()) : ":" === _.text ? 0 === w.ternary_depth ? e = !1 : w.ternary_depth -= 1 : "?" === _.text ? w.ternary_depth += 1 : "*" === _.text && "TK_RESERVED" === L && "function" === w.last_text && (n = e = !1), 
                                R.space_before_token = R.space_before_token || e, p(), R.space_before_token = n;
                            } else p();
                        } else p();
                    },
                    TK_COMMA: function() {
                        if (w.declaration_statement) return m(w.parent.mode) && (w.declaration_assignment = !1), 
                        p(), void (w.declaration_assignment ? s(w.declaration_assignment = !1, !0) : (R.space_before_token = !0, 
                        F.comma_first && o()));
                        p(), w.mode === d.ObjectLiteral || w.mode === d.Statement && w.parent.mode === d.ObjectLiteral ? (w.mode === d.Statement && v(), 
                        s()) : (R.space_before_token = !0, F.comma_first && o());
                    },
                    TK_BLOCK_COMMENT: function() {
                        if (R.raw) return R.add_raw_token(_), void (_.directives && "end" === _.directives.preserve && (F.test_output_raw || (R.raw = !1)));
                        if (_.directives) return s(!1, !0), p(), "start" === _.directives.preserve && (R.raw = !0), 
                        void s(!1, !0);
                        if (!l.newline.test(_.text) && !_.wanted_newline) return R.space_before_token = !0, 
                        p(), void (R.space_before_token = !0);
                        var e, t = function(e) {
                            e = e.replace(/\x0d/g, "");
                            for (var t = [], n = e.indexOf("\n"); -1 !== n; ) t.push(e.substring(0, n)), e = e.substring(n + 1), 
                            n = e.indexOf("\n");
                            return e.length && t.push(e), t;
                        }(_.text), r = !1, i = !1, a = _.whitespace_before, o = a.length;
                        for (s(!1, !0), 1 < t.length && (function(e, t) {
                            for (var r = 0; r < e.length; r++) {
                                if ("*" !== n(e[r]).charAt(0)) return !1;
                            }
                            return !0;
                        }(t.slice(1)) ? r = !0 : function(e, t) {
                            for (var n, r = 0, i = e.length; r < i; r++) if ((n = e[r]) && 0 !== n.indexOf(t)) return !1;
                            return !0;
                        }(t.slice(1), a) && (i = !0)), p(t[0]), e = 1; e < t.length; e++) s(!1, !0), r ? p(" " + t[e].replace(/^\s+/g, "")) : i && t[e].length > o ? p(t[e].substring(o)) : R.add_token(t[e]);
                        s(!1, !0);
                    },
                    TK_COMMENT: function() {
                        _.wanted_newline ? s(!1, !0) : R.trim(!0), R.space_before_token = !0, p(), s(!1, !0);
                    },
                    TK_DOT: function() {
                        b(), "TK_RESERVED" === L && T(w.last_text) ? R.space_before_token = !0 : o(")" === w.last_text && F.break_chained_methods), 
                        p();
                    },
                    TK_UNKNOWN: function() {
                        p(), "\n" === _.text[_.text.length - 1] && s();
                    },
                    TK_EOF: function() {
                        for (;w.mode === d.Statement; ) v();
                    }
                }, F = {}, void 0 !== (r = r || {}).braces_on_own_line && (F.brace_style = r.braces_on_own_line ? "expand" : "collapse"), 
                F.brace_style = r.brace_style ? r.brace_style : F.brace_style ? F.brace_style : "collapse", 
                "expand-strict" === F.brace_style && (F.brace_style = "expand"), F.indent_size = r.indent_size ? parseInt(r.indent_size, 10) : 4, 
                F.indent_char = r.indent_char ? r.indent_char : " ", F.eol = r.eol ? r.eol : "\n", 
                F.preserve_newlines = void 0 === r.preserve_newlines || r.preserve_newlines, F.break_chained_methods = void 0 !== r.break_chained_methods && r.break_chained_methods, 
                F.max_preserve_newlines = void 0 === r.max_preserve_newlines ? 0 : parseInt(r.max_preserve_newlines, 10), 
                F.space_in_paren = void 0 !== r.space_in_paren && r.space_in_paren, F.space_in_empty_paren = void 0 !== r.space_in_empty_paren && r.space_in_empty_paren, 
                F.jslint_happy = void 0 !== r.jslint_happy && r.jslint_happy, F.space_after_anon_function = void 0 !== r.space_after_anon_function && r.space_after_anon_function, 
                F.keep_array_indentation = void 0 !== r.keep_array_indentation && r.keep_array_indentation, 
                F.space_before_conditional = void 0 === r.space_before_conditional || r.space_before_conditional, 
                F.unescape_strings = void 0 !== r.unescape_strings && r.unescape_strings, F.wrap_line_length = void 0 === r.wrap_line_length ? 0 : parseInt(r.wrap_line_length, 10), 
                F.e4x = void 0 !== r.e4x && r.e4x, F.end_with_newline = void 0 !== r.end_with_newline && r.end_with_newline, 
                F.comma_first = void 0 !== r.comma_first && r.comma_first, F.test_output_raw = void 0 !== r.test_output_raw && r.test_output_raw, 
                F.jslint_happy && (F.space_after_anon_function = !0), r.indent_with_tabs && (F.indent_char = "\t", 
                F.indent_size = 1), F.eol = F.eol.replace(/\\r/, "\r").replace(/\\n/, "\n"), N = ""; 0 < F.indent_size; ) N += F.indent_char, 
                F.indent_size -= 1;
                var B = 0;
                if (e && e.length) {
                    for (;" " === e.charAt(B) || "\t" === e.charAt(B); ) $ += e.charAt(B), B += 1;
                    e = e.substring(B);
                }
                L = "TK_START_BLOCK", x = "", (R = new function(e, t) {
                    t = t || "", this.indent_cache = [ t ], this.baseIndentLength = t.length, this.indent_length = e.length, 
                    this.raw = !1;
                    var n = [];
                    this.baseIndentString = t, this.indent_string = e, this.previous_line = null, this.current_line = null, 
                    this.space_before_token = !1, this.add_outputline = function() {
                        this.previous_line = this.current_line, this.current_line = new function(e) {
                            var t = 0, n = -1, r = [], i = !0;
                            this.set_indent = function(r) {
                                t = e.baseIndentLength + r * e.indent_length, n = r;
                            }, this.get_character_count = function() {
                                return t;
                            }, this.is_empty = function() {
                                return i;
                            }, this.last = function() {
                                return this._empty ? null : r[r.length - 1];
                            }, this.push = function(e) {
                                r.push(e), t += e.length, i = !1;
                            }, this.pop = function() {
                                var e = null;
                                return i || (e = r.pop(), t -= e.length, i = 0 === r.length), e;
                            }, this.remove_indent = function() {
                                0 < n && (n -= 1, t -= e.indent_length);
                            }, this.trim = function() {
                                for (;" " === this.last(); ) r.pop(), t -= 1;
                                i = 0 === r.length;
                            }, this.toString = function() {
                                var t = "";
                                return this._empty || (0 <= n && (t = e.indent_cache[n]), t += r.join("")), t;
                            };
                        }(this), n.push(this.current_line);
                    }, this.add_outputline(), this.get_line_number = function() {
                        return n.length;
                    }, this.add_new_line = function(e) {
                        return !(1 === this.get_line_number() && this.just_added_newline() || !e && this.just_added_newline() || (this.raw || this.add_outputline(), 
                        0));
                    }, this.get_code = function() {
                        return n.join("\n").replace(/[\r\n\t ]+$/, "");
                    }, this.set_indent = function(e) {
                        if (1 < n.length) {
                            for (;e >= this.indent_cache.length; ) this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                            return this.current_line.set_indent(e), !0;
                        }
                        return this.current_line.set_indent(0), !1;
                    }, this.add_raw_token = function(e) {
                        for (var t = 0; t < e.newlines; t++) this.add_outputline();
                        this.current_line.push(e.whitespace_before), this.current_line.push(e.text), this.space_before_token = !1;
                    }, this.add_token = function(e) {
                        this.add_space_before_token(), this.current_line.push(e);
                    }, this.add_space_before_token = function() {
                        this.space_before_token && !this.just_added_newline() && this.current_line.push(" "), 
                        this.space_before_token = !1;
                    }, this.remove_redundant_indentation = function(e) {
                        if (!e.multiline_frame && e.mode !== d.ForInitializer && e.mode !== d.Conditional) for (var t = e.start_line_index, r = n.length; t < r; ) n[t].remove_indent(), 
                        t++;
                    }, this.trim = function(r) {
                        for (r = void 0 !== r && r, this.current_line.trim(e, t); r && 1 < n.length && this.current_line.is_empty(); ) n.pop(), 
                        this.current_line = n[n.length - 1], this.current_line.trim();
                        this.previous_line = 1 < n.length ? n[n.length - 2] : null;
                    }, this.just_added_newline = function() {
                        return this.current_line.is_empty();
                    }, this.just_added_blankline = function() {
                        if (this.just_added_newline()) {
                            if (1 === n.length) return !0;
                            return n[n.length - 2].is_empty();
                        }
                        return !1;
                    };
                }(N, $)).raw = F.test_output_raw, I = [], h(d.BlockStatement), this.beautify = function() {
                    var r, i;
                    for (y = new function(e, r, i) {
                        function a() {
                            var i, a, _ = [];
                            if (u = 0, h = "", E <= v) return [ "", "TK_EOF" ];
                            a = m.length ? m[m.length - 1] : new c("TK_START_BLOCK", "{");
                            var L = e.charAt(v);
                            for (v += 1; t(L, o); ) {
                                if (l.newline.test(L) ? "\n" === L && "\r" === e.charAt(v - 2) || (u += 1, _ = []) : _.push(L), 
                                E <= v) return [ "", "TK_EOF" ];
                                L = e.charAt(v), v += 1;
                            }
                            if (_.length && (h = _.join("")), s.test(L)) {
                                var x = !0, N = !0, w = s;
                                for ("0" === L && v < E && /[Xxo]/.test(e.charAt(v)) ? (N = x = !1, L += e.charAt(v), 
                                v += 1, w = /[o]/.test(e.charAt(v)) ? d : f) : (L = "", v -= 1); v < E && w.test(e.charAt(v)); ) L += e.charAt(v), 
                                v += 1, x && v < E && "." === e.charAt(v) && (L += e.charAt(v), v += 1, x = !1), 
                                N && v < E && /[Ee]/.test(e.charAt(v)) && (L += e.charAt(v), (v += 1) < E && /[+-]/.test(e.charAt(v)) && (L += e.charAt(v), 
                                v += 1), x = N = !1);
                                return [ L, "TK_WORD" ];
                            }
                            if (l.isIdentifierStart(e.charCodeAt(v - 1))) {
                                if (v < E) for (;l.isIdentifierChar(e.charCodeAt(v)) && (L += e.charAt(v), (v += 1) !== E); ) ;
                                return "TK_DOT" === a.type || "TK_RESERVED" === a.type && t(a.text, [ "set", "get" ]) || !t(L, b) ? [ L, "TK_WORD" ] : "in" === L ? [ L, "TK_OPERATOR" ] : [ L, "TK_RESERVED" ];
                            }
                            if ("(" === L || "[" === L) return [ L, "TK_START_EXPR" ];
                            if (")" === L || "]" === L) return [ L, "TK_END_EXPR" ];
                            if ("{" === L) return [ L, "TK_START_BLOCK" ];
                            if ("}" === L) return [ L, "TK_END_BLOCK" ];
                            if (";" === L) return [ L, "TK_SEMICOLON" ];
                            if ("/" === L) {
                                var O = "";
                                if ("*" === e.charAt(v)) {
                                    v += 1, T.lastIndex = v;
                                    var I = T.exec(e);
                                    O = "/*" + I[0], v += I[0].length;
                                    var k = function(e) {
                                        if (!e.match(S)) return null;
                                        var t = {};
                                        R.lastIndex = 0;
                                        for (var n = R.exec(e); n; ) t[n[1]] = n[2], n = R.exec(e);
                                        return t;
                                    }(O);
                                    return k && "start" === k.ignore && (C.lastIndex = v, I = C.exec(e), O += I[0], 
                                    v += I[0].length), [ O = O.replace(l.lineBreak, "\n"), "TK_BLOCK_COMMENT", k ];
                                }
                                if ("/" === e.charAt(v)) {
                                    v += 1, A.lastIndex = v;
                                    var I = A.exec(e);
                                    return O = "//" + I[0], v += I[0].length, [ O, "TK_COMMENT" ];
                                }
                            }
                            if ("`" === L || "'" === L || '"' === L || ("/" === L || r.e4x && "<" === L && e.slice(v - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/)) && ("TK_RESERVED" === a.type && t(a.text, [ "return", "case", "throw", "else", "do", "typeof", "yield" ]) || "TK_END_EXPR" === a.type && ")" === a.text && a.parent && "TK_RESERVED" === a.parent.type && t(a.parent.text, [ "if", "while", "for" ]) || t(a.type, [ "TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA" ]))) {
                                var D = L, F = !1, M = !1;
                                if (i = L, "/" === D) for (var $ = !1; v < E && (F || $ || e.charAt(v) !== D) && !l.newline.test(e.charAt(v)); ) i += e.charAt(v), 
                                F ? F = !1 : (F = "\\" === e.charAt(v), "[" === e.charAt(v) ? $ = !0 : "]" === e.charAt(v) && ($ = !1)), 
                                v += 1; else if (r.e4x && "<" === D) {
                                    var B = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g, P = e.slice(v - 1), K = B.exec(P);
                                    if (K && 0 === K.index) {
                                        for (var U = K[2], W = 0; K; ) {
                                            var H = !!K[1], Y = K[2], z = !!K[K.length - 1] || "![CDATA[" === Y.slice(0, 8);
                                            if (Y !== U || z || (H ? --W : ++W), W <= 0) break;
                                            K = B.exec(P);
                                        }
                                        var G = K ? K.index + K[0].length : P.length;
                                        return P = P.slice(0, G), v += G - 1, [ P = P.replace(l.lineBreak, "\n"), "TK_STRING" ];
                                    }
                                } else for (;v < E && (F || e.charAt(v) !== D && ("`" === D || !l.newline.test(e.charAt(v)))); ) (F || "`" === D) && l.newline.test(e.charAt(v)) ? ("\r" === e.charAt(v) && "\n" === e.charAt(v + 1) && (v += 1), 
                                i += "\n") : i += e.charAt(v), F ? ("x" !== e.charAt(v) && "u" !== e.charAt(v) || (M = !0), 
                                F = !1) : F = "\\" === e.charAt(v), v += 1;
                                if (M && r.unescape_strings && (i = function(e) {
                                    for (var t, n = !1, r = "", i = 0, a = "", o = 0; n || i < e.length; ) if (t = e.charAt(i), 
                                    i++, n) {
                                        if (n = !1, "x" === t) a = e.substr(i, 2), i += 2; else {
                                            if ("u" !== t) {
                                                r += "\\" + t;
                                                continue;
                                            }
                                            a = e.substr(i, 4), i += 4;
                                        }
                                        if (!a.match(/^[0123456789abcdefABCDEF]+$/)) return e;
                                        if (0 <= (o = parseInt(a, 16)) && o < 32) {
                                            r += "x" === t ? "\\x" + a : "\\u" + a;
                                            continue;
                                        }
                                        if (34 === o || 39 === o || 92 === o) r += "\\" + String.fromCharCode(o); else {
                                            if ("x" === t && 126 < o && o <= 255) return e;
                                            r += String.fromCharCode(o);
                                        }
                                    } else "\\" === t ? n = !0 : r += t;
                                    return r;
                                }(i)), v < E && e.charAt(v) === D && (i += D, v += 1, "/" === D)) for (;v < E && l.isIdentifierStart(e.charCodeAt(v)); ) i += e.charAt(v), 
                                v += 1;
                                return [ i, "TK_STRING" ];
                            }
                            if ("#" === L) {
                                if (0 === m.length && "!" === e.charAt(v)) {
                                    for (i = L; v < E && "\n" !== L; ) L = e.charAt(v), i += L, v += 1;
                                    return [ n(i) + "\n", "TK_UNKNOWN" ];
                                }
                                var V = "#";
                                if (v < E && s.test(e.charAt(v))) {
                                    for (;L = e.charAt(v), V += L, (v += 1) < E && "#" !== L && "=" !== L; ) ;
                                    return "#" === L || ("[" === e.charAt(v) && "]" === e.charAt(v + 1) ? (V += "[]", 
                                    v += 2) : "{" === e.charAt(v) && "}" === e.charAt(v + 1) && (V += "{}", v += 2)), 
                                    [ V, "TK_WORD" ];
                                }
                            }
                            if ("<" === L && ("?" === e.charAt(v) || "%" === e.charAt(v))) {
                                y.lastIndex = v - 1;
                                var X = y.exec(e);
                                if (X) return L = X[0], v += L.length - 1, [ L = L.replace(l.lineBreak, "\n"), "TK_STRING" ];
                            }
                            if ("<" === L && "\x3c!--" === e.substring(v - 1, v + 3)) {
                                for (v += 3, L = "\x3c!--"; !l.newline.test(e.charAt(v)) && v < E; ) L += e.charAt(v), 
                                v++;
                                return g = !0, [ L, "TK_COMMENT" ];
                            }
                            if ("-" === L && g && "--\x3e" === e.substring(v - 1, v + 2)) return g = !1, v += 2, 
                            [ "--\x3e", "TK_COMMENT" ];
                            if ("." === L) return [ L, "TK_DOT" ];
                            if (t(L, p)) {
                                for (;v < E && t(L + e.charAt(v), p) && (L += e.charAt(v), !(E <= (v += 1))); ) ;
                                return "," === L ? [ L, "TK_COMMA" ] : "=" === L ? [ L, "TK_EQUALS" ] : [ L, "TK_OPERATOR" ];
                            }
                            return [ L, "TK_UNKNOWN" ];
                        }
                        var o = "\n\r\t ".split(""), s = /[0-9]/, d = /[01234567]/, f = /[0123456789abcdefABCDEF]/, p = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");
                        this.line_starters = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
                        var u, h, g, m, v, E, b = this.line_starters.concat([ "do", "in", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await" ]), T = /([\s\S]*?)((?:\*\/)|$)/g, A = /([^\n\r\u2028\u2029]*)/g, S = /\/\* beautify( \w+[:]\w+)+ \*\//g, R = / (\w+)[:](\w+)/g, C = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g, y = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;
                        this.tokenize = function() {
                            var t, n, r;
                            E = e.length, v = 0, g = !1, m = [];
                            for (var i = null, o = [], s = []; !n || "TK_EOF" !== n.type; ) {
                                for (r = a(), t = new c(r[1], r[0], u, h); "TK_COMMENT" === t.type || "TK_BLOCK_COMMENT" === t.type || "TK_UNKNOWN" === t.type; ) "TK_BLOCK_COMMENT" === t.type && (t.directives = r[2]), 
                                s.push(t), r = a(), t = new c(r[1], r[0], u, h);
                                s.length && (t.comments_before = s, s = []), "TK_START_BLOCK" === t.type || "TK_START_EXPR" === t.type ? (t.parent = n, 
                                o.push(i), i = t) : ("TK_END_BLOCK" === t.type || "TK_END_EXPR" === t.type) && i && ("]" === t.text && "[" === i.text || ")" === t.text && "(" === i.text || "}" === t.text && "{" === i.text) && (t.parent = i.parent, 
                                i = o.pop()), m.push(t), n = t;
                            }
                            return m;
                        };
                    }(e, F, N), M = y.tokenize(), C = 0; r = A(); ) {
                        for (var o = 0; o < r.comments_before.length; o++) a(r.comments_before[o]);
                        a(r), x = w.last_text, L = r.type, w.last_text = r.text, C += 1;
                    }
                    return i = R.get_code(), F.end_with_newline && (i += "\n"), "\n" != F.eol && (i = i.replace(/[\n]/g, F.eol)), 
                    i;
                };
            }(e, r).beautify();
        }
        var i, a, o, s, l = {};
        i = l, a = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", 
        o = new RegExp("[" + a + "]"), s = new RegExp("[" + a + "̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿]"), 
        i.newline = /[\n\r\u2028\u2029]/, i.lineBreak = new RegExp("\r\n|" + i.newline.source), 
        i.allLineBreaks = new RegExp(i.lineBreak.source, "g"), i.isIdentifierStart = function(e) {
            return e < 65 ? 36 === e || 64 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || 170 <= e && o.test(String.fromCharCode(e)));
        }, i.isIdentifierChar = function(e) {
            return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || 170 <= e && s.test(String.fromCharCode(e))));
        };
        var d = {
            BlockStatement: "BlockStatement",
            Statement: "Statement",
            ObjectLiteral: "ObjectLiteral",
            ArrayLiteral: "ArrayLiteral",
            ForInitializer: "ForInitializer",
            Conditional: "Conditional",
            Expression: "Expression"
        }, c = function(e, t, n, r, i, a) {
            this.type = e, this.text = t, this.comments_before = [], this.newlines = n || 0, 
            this.wanted_newline = 0 < n, this.whitespace_before = r || "", this.parent = null, 
            this.directives = null;
        };
        return {
            run: function(t, n) {
                function i(e) {
                    return e.replace(/\s+$/g, "");
                }
                var a, o, s, l, d, c, f, p, u, h, g, m, v, E;
                for (void 0 !== (n = n || {}).wrap_line_length && 0 !== parseInt(n.wrap_line_length, 10) || void 0 === n.max_char || 0 === parseInt(n.max_char, 10) || (n.wrap_line_length = n.max_char), 
                o = void 0 !== n.indent_inner_html && n.indent_inner_html, s = void 0 === n.indent_size ? 4 : parseInt(n.indent_size, 10), 
                l = void 0 === n.indent_char ? " " : n.indent_char, c = void 0 === n.brace_style ? "collapse" : n.brace_style, 
                d = 0 === parseInt(n.wrap_line_length, 10) ? 32786 : parseInt(n.wrap_line_length || 250, 10), 
                f = n.unformatted || [ "a", "span", "img", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "address", "pre" ], 
                p = void 0 === n.preserve_newlines || n.preserve_newlines, u = p ? isNaN(parseInt(n.max_preserve_newlines, 10)) ? 32786 : parseInt(n.max_preserve_newlines, 10) : 0, 
                h = void 0 !== n.indent_handlebars && n.indent_handlebars, g = void 0 === n.wrap_attributes ? "auto" : n.wrap_attributes, 
                m = void 0 === n.wrap_attributes_indent_size ? s : parseInt(n.wrap_attributes_indent_size, 10) || s, 
                v = void 0 !== n.end_with_newline && n.end_with_newline, E = Array.isArray(n.extra_liners) ? n.extra_liners.concat() : "string" == typeof n.extra_liners ? n.extra_liners.split(",") : "head,body,/html".split(","), 
                n.indent_with_tabs && (l = "\t", s = 1), (a = new function() {
                    return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = {
                        parent: "parent1",
                        parentcount: 1,
                        parent1: ""
                    }, this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", 
                    this.newlines = 0, this.indent_content = o, this.Utils = {
                        whitespace: "\n\r\t ".split(""),
                        single_token: "br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),
                        extra_liners: E,
                        in_array: function(e, t) {
                            for (var n = 0; n < t.length; n++) if (e == t[n]) return !0;
                            return !1;
                        }
                    }, this.is_whitespace = function(e) {
                        for (;0 < e.length; e++) if (!this.Utils.in_array(e.charAt(0), this.Utils.whitespace)) return !1;
                        return !0;
                    }, this.traverse_whitespace = function() {
                        var e = "";
                        if (e = this.input.charAt(this.pos), this.Utils.in_array(e, this.Utils.whitespace)) {
                            for (this.newlines = 0; this.Utils.in_array(e, this.Utils.whitespace); ) p && "\n" == e && this.newlines <= u && (this.newlines += 1), 
                            this.pos++, e = this.input.charAt(this.pos);
                            return !0;
                        }
                        return !1;
                    }, this.space_or_wrap = function(e) {
                        this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, e), this.print_indentation(e)) : (this.line_char_count++, 
                        e.push(" "));
                    }, this.get_content = function() {
                        for (var e = "", t = []; "<" != this.input.charAt(this.pos); ) {
                            if (this.pos >= this.input.length) return t.length ? t.join("") : [ "", "TK_EOF" ];
                            if (this.traverse_whitespace()) this.space_or_wrap(t); else {
                                if (h) {
                                    var n = this.input.substr(this.pos, 3);
                                    if ("{{#" == n || "{{/" == n) break;
                                    if ("{{!" == n) return [ this.get_tag(), "TK_TAG_HANDLEBARS_COMMENT" ];
                                    if ("{{" == this.input.substr(this.pos, 2) && "{{else}}" == this.get_tag(!0)) break;
                                }
                                e = this.input.charAt(this.pos), this.pos++, this.line_char_count++, t.push(e);
                            }
                        }
                        return t.length ? t.join("") : "";
                    }, this.get_contents_to = function(e) {
                        if (this.pos == this.input.length) return [ "", "TK_EOF" ];
                        var t = "", n = new RegExp("</" + e + "\\s*>", "igm");
                        n.lastIndex = this.pos;
                        var r = n.exec(this.input), i = r ? r.index : this.input.length;
                        return this.pos < i && (t = this.input.substring(this.pos, i), this.pos = i), t;
                    }, this.record_tag = function(e) {
                        this.tags[e + "count"] ? this.tags[e + "count"]++ : this.tags[e + "count"] = 1, 
                        this.tags[e + this.tags[e + "count"]] = this.indent_level, this.tags[e + this.tags[e + "count"] + "parent"] = this.tags.parent, 
                        this.tags.parent = e + this.tags[e + "count"];
                    }, this.retrieve_tag = function(e) {
                        if (this.tags[e + "count"]) {
                            for (var t = this.tags.parent; t && e + this.tags[e + "count"] != t; ) t = this.tags[t + "parent"];
                            t && (this.indent_level = this.tags[e + this.tags[e + "count"]], this.tags.parent = this.tags[t + "parent"]), 
                            delete this.tags[e + this.tags[e + "count"] + "parent"], delete this.tags[e + this.tags[e + "count"]], 
                            1 == this.tags[e + "count"] ? delete this.tags[e + "count"] : this.tags[e + "count"]--;
                        }
                    }, this.indent_to_tag = function(e) {
                        if (this.tags[e + "count"]) {
                            for (var t = this.tags.parent; t && e + this.tags[e + "count"] != t; ) t = this.tags[t + "parent"];
                            t && (this.indent_level = this.tags[e + this.tags[e + "count"]]);
                        }
                    }, this.get_tag = function(e) {
                        var t, n, r = "", i = [], a = "", o = !1, s = !0, d = this.pos, c = this.line_char_count;
                        e = void 0 !== e && e;
                        do {
                            if (this.pos >= this.input.length) return e && (this.pos = d, this.line_char_count = c), 
                            i.length ? i.join("") : [ "", "TK_EOF" ];
                            if (r = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(r, this.Utils.whitespace)) o = !0; else {
                                if ("'" != r && '"' != r || (r += this.get_unformatted(r), o = !0), "=" == r && (o = !1), 
                                i.length && "=" != i[i.length - 1] && ">" != r && o) {
                                    if (this.space_or_wrap(i), o = !1, !s && "force" == g && "/" != r) {
                                        this.print_newline(!0, i), this.print_indentation(i);
                                        for (var p = 0; p < m; p++) i.push(l);
                                    }
                                    for (var u = 0; u < i.length; u++) if (" " == i[u]) {
                                        s = !1;
                                        break;
                                    }
                                }
                                if (h && "<" == n && r + this.input.charAt(this.pos) == "{{" && (r += this.get_unformatted("}}"), 
                                i.length && " " != i[i.length - 1] && "<" != i[i.length - 1] && (r = " " + r), o = !0), 
                                "<" != r || n || (t = this.pos - 1, n = "<"), h && !n && 2 <= i.length && "{" == i[i.length - 1] && "{" == i[i.length - 2] && (t = "#" == r || "/" == r || "!" == r ? this.pos - 3 : this.pos - 2, 
                                n = "{"), this.line_char_count++, i.push(r), i[1] && ("!" == i[1] || "?" == i[1] || "%" == i[1])) {
                                    i = [ this.get_comment(t) ];
                                    break;
                                }
                                if (h && i[1] && "{" == i[1] && i[2] && "!" == i[2]) {
                                    i = [ this.get_comment(t) ];
                                    break;
                                }
                                if (h && "{" == n && 2 < i.length && "}" == i[i.length - 2] && "}" == i[i.length - 1]) break;
                            }
                        } while (">" != r);
                        var v, E, b = i.join("");
                        v = -1 != b.indexOf(" ") ? b.indexOf(" ") : "{" == b[0] ? b.indexOf("}") : b.indexOf(">"), 
                        E = "<" != b[0] && h ? "#" == b[2] ? 3 : 2 : 1;
                        var T = b.substring(E, v).toLowerCase();
                        return "/" == b.charAt(b.length - 2) || this.Utils.in_array(T, this.Utils.single_token) ? e || (this.tag_type = "SINGLE") : h && "{" == b[0] && "else" == T ? e || (this.indent_to_tag("if"), 
                        this.tag_type = "HANDLEBARS_ELSE", this.indent_content = !0, this.traverse_whitespace()) : this.is_unformatted(T, f) ? (a = this.get_unformatted("</" + T + ">", b), 
                        i.push(a), this.pos, this.tag_type = "SINGLE") : "script" == T && (-1 == b.search("type") || -1 < b.search("type") && -1 < b.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)) ? e || (this.record_tag(T), 
                        this.tag_type = "SCRIPT") : "style" == T && (-1 == b.search("type") || -1 < b.search("type") && -1 < b.search("text/css")) ? e || (this.record_tag(T), 
                        this.tag_type = "STYLE") : "!" == T.charAt(0) ? e || (this.tag_type = "SINGLE", 
                        this.traverse_whitespace()) : e || ("/" == T.charAt(0) ? (this.retrieve_tag(T.substring(1)), 
                        this.tag_type = "END") : (this.record_tag(T), "html" != T.toLowerCase() && (this.indent_content = !0), 
                        this.tag_type = "START"), this.traverse_whitespace() && this.space_or_wrap(i), this.Utils.in_array(T, this.Utils.extra_liners) && (this.print_newline(!1, this.output), 
                        this.output.length && "\n" != this.output[this.output.length - 2] && this.print_newline(!0, this.output))), 
                        e && (this.pos = d, this.line_char_count = c), i.join("");
                    }, this.get_comment = function(e) {
                        var t = "", n = ">", r = !1;
                        this.pos = e;
                        var i = this.input.charAt(this.pos);
                        for (this.pos++; this.pos <= this.input.length && ((t += i)[t.length - 1] != n[n.length - 1] || -1 == t.indexOf(n)); ) !r && t.length < 10 && (0 === t.indexOf("<![if") ? (n = "<![endif]>", 
                        r = !0) : 0 === t.indexOf("<![cdata[") ? (n = "]]>", r = !0) : 0 === t.indexOf("<![") ? (n = "]>", 
                        r = !0) : 0 === t.indexOf("\x3c!--") ? (n = "--\x3e", r = !0) : 0 === t.indexOf("{{!") ? (n = "}}", 
                        r = !0) : 0 === t.indexOf("<?") ? (n = "?>", r = !0) : 0 === t.indexOf("<%") && (n = "%>", 
                        r = !0)), i = this.input.charAt(this.pos), this.pos++;
                        return t;
                    }, this.get_unformatted = function(e, t) {
                        if (t && -1 != t.toLowerCase().indexOf(e)) return "";
                        var n = "", r = "", i = 0, a = !0;
                        do {
                            if (this.pos >= this.input.length) return r;
                            if (n = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(n, this.Utils.whitespace)) {
                                if (!a) {
                                    this.line_char_count--;
                                    continue;
                                }
                                if ("\n" == n || "\r" == n) {
                                    r += "\n", this.line_char_count = 0;
                                    continue;
                                }
                            }
                            r += n, this.line_char_count++, a = !0, h && "{" == n && r.length && "{" == r[r.length - 2] && (i = (r += this.get_unformatted("}}")).length);
                        } while (-1 == r.toLowerCase().indexOf(e, i));
                        return r;
                    }, this.get_token = function() {
                        var e;
                        if ("TK_TAG_SCRIPT" == this.last_token || "TK_TAG_STYLE" == this.last_token) {
                            var t = this.last_token.substr(7);
                            return "string" != typeof (e = this.get_contents_to(t)) ? e : [ e, "TK_" + t ];
                        }
                        return "CONTENT" == this.current_mode ? "string" != typeof (e = this.get_content()) ? e : [ e, "TK_CONTENT" ] : "TAG" == this.current_mode ? "string" != typeof (e = this.get_tag()) ? e : [ e, "TK_TAG_" + this.tag_type ] : void 0;
                    }, this.get_full_indent = function(e) {
                        return (e = this.indent_level + e || 0) < 1 ? "" : new Array(e + 1).join(this.indent_string);
                    }, this.is_unformatted = function(e, t) {
                        if (!this.Utils.in_array(e, t)) return !1;
                        if ("a" != e.toLowerCase() || !this.Utils.in_array("a", t)) return !0;
                        var n = (this.get_tag(!0) || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                        return !(n && !this.Utils.in_array(n, t));
                    }, this.printer = function(e, t, n, r, a) {
                        this.input = e || "", this.output = [], this.indent_character = t, this.indent_string = "", 
                        this.indent_size = n, this.brace_style = a, this.indent_level = 0, this.wrap_line_length = r;
                        for (var o = this.line_char_count = 0; o < this.indent_size; o++) this.indent_string += this.indent_character;
                        this.print_newline = function(e, t) {
                            this.line_char_count = 0, t && t.length && (e || "\n" != t[t.length - 1]) && ("\n" != t[t.length - 1] && (t[t.length - 1] = i(t[t.length - 1])), 
                            t.push("\n"));
                        }, this.print_indentation = function(e) {
                            for (var t = 0; t < this.indent_level; t++) e.push(this.indent_string), this.line_char_count += this.indent_string.length;
                        }, this.print_token = function(e) {
                            this.is_whitespace(e) && !this.output.length || ((e || "" !== e) && this.output.length && "\n" == this.output[this.output.length - 1] && (this.print_indentation(this.output), 
                            e = e.replace(/^\s+/g, "")), this.print_token_raw(e));
                        }, this.print_token_raw = function(e) {
                            0 < this.newlines && (e = i(e)), e && "" !== e && (1 < e.length && "\n" == e[e.length - 1] ? (this.output.push(e.slice(0, -1)), 
                            this.print_newline(!1, this.output)) : this.output.push(e));
                            for (var t = 0; t < this.newlines; t++) this.print_newline(0 < t, this.output);
                            this.newlines = 0;
                        }, this.indent = function() {
                            this.indent_level++;
                        }, this.unindent = function() {
                            0 < this.indent_level && this.indent_level--;
                        };
                    }, this;
                }()).printer(t, l, s, d, c); ;) {
                    var b = a.get_token();
                    if (a.token_text = b[0], a.token_type = b[1], "TK_EOF" == a.token_type) break;
                    switch (a.token_type) {
                      case "TK_TAG_START":
                        a.print_newline(!1, a.output), a.print_token(a.token_text), a.indent_content && (a.indent(), 
                        a.indent_content = !1), a.current_mode = "CONTENT";
                        break;

                      case "TK_TAG_STYLE":
                      case "TK_TAG_SCRIPT":
                        a.print_newline(!1, a.output), a.print_token(a.token_text), a.current_mode = "CONTENT";
                        break;

                      case "TK_TAG_END":
                        if ("TK_CONTENT" == a.last_token && "" === a.last_text) {
                            var T = a.token_text.match(/\w+/)[0], A = null;
                            a.output.length && (A = a.output[a.output.length - 1].match(/(?:<|{{#)\s*(\w+)/)), 
                            (null == A || A[1] != T && !a.Utils.in_array(A[1], f)) && a.print_newline(!1, a.output);
                        }
                        a.print_token(a.token_text), a.current_mode = "CONTENT";
                        break;

                      case "TK_TAG_SINGLE":
                        var S = a.token_text.match(/^\s*<([a-z-]+)/i);
                        S && a.Utils.in_array(S[1], f) || a.print_newline(!1, a.output), a.print_token(a.token_text), 
                        a.current_mode = "CONTENT";
                        break;

                      case "TK_TAG_HANDLEBARS_ELSE":
                        a.print_token(a.token_text), a.indent_content && (a.indent(), a.indent_content = !1), 
                        a.current_mode = "CONTENT";
                        break;

                      case "TK_TAG_HANDLEBARS_COMMENT":
                      case "TK_CONTENT":
                        a.print_token(a.token_text), a.current_mode = "TAG";
                        break;

                      case "TK_STYLE":
                      case "TK_SCRIPT":
                        if ("" !== a.token_text) {
                            a.print_newline(!1, a.output);
                            var R, C = a.token_text, y = 1;
                            "TK_SCRIPT" == a.token_type ? R = r : "TK_STYLE" == a.token_type && (R = e), "keep" == n.indent_scripts ? y = 0 : "separate" == n.indent_scripts && (y = -a.indent_level);
                            var _ = a.get_full_indent(y);
                            if (R) C = R(C.replace(/^\s*/, _), n); else {
                                var L = C.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(a.indent_string).length - 1, x = a.get_full_indent(y - L);
                                C = C.replace(/^\s*/, _).replace(/\r\n|\r|\n/g, "\n" + x).replace(/\s+$/, "");
                            }
                            C && (a.print_token_raw(C), a.print_newline(!0, a.output));
                        }
                        a.current_mode = "TAG";
                        break;

                      default:
                        "" !== a.token_text && a.print_token(a.token_text);
                    }
                    a.last_token = a.token_type, a.last_text = a.token_text;
                }
                var N = a.output.join("").replace(/[\r\n\t ]+$/, "");
                return v && (N += "\n"), N;
            }
        };
    }, e.extend(e.FE.DEFAULTS, {
        codeMirror: window.CodeMirror,
        codeMirrorOptions: {
            lineNumbers: !0,
            tabMode: "indent",
            indentWithTabs: !0,
            lineWrapping: !0,
            mode: "text/html",
            tabSize: 2
        },
        codeBeautifierOptions: {
            end_with_newline: !0,
            indent_inner_html: !0,
            extra_liners: [ "p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl" ],
            brace_style: "expand",
            indent_char: "\t",
            indent_size: 1,
            wrap_line_length: 0
        },
        codeViewKeepActiveButtons: [ "fullscreen" ]
    }), e.FE.PLUGINS.codeView = function(t) {
        function n() {
            return t.$box.hasClass("fr-code-view");
        }
        function r() {
            return f ? f.getValue() : c.val();
        }
        function i() {
            n() && (f && f.setSize(null, t.opts.height ? t.opts.height : "auto"), t.opts.heightMin || t.opts.height ? t.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", t.opts.heightMin || t.opts.height) : t.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", ""));
        }
        function a() {
            n() && t.events.trigger("blur");
        }
        function o() {
            n() && u && t.events.trigger("focus");
        }
        function s(s) {
            c || (function() {
                c = e('<textarea class="fr-code" tabIndex="-1">'), t.$wp.append(c), c.attr("dir", t.opts.direction), 
                t.$box.hasClass("fr-basic") || (p = e('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch' + (t.helpers.isMobile() ? "" : " fr-desktop") + '" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>'), 
                t.$box.append(p), t.events.bindClick(t.$box, "a.html-switch", function() {
                    l(!1);
                }));
                var a = function() {
                    return !n();
                };
                t.events.on("buttons.refresh", a), t.events.on("copy", a, !0), t.events.on("cut", a, !0), 
                t.events.on("paste", a, !0), t.events.on("destroy", d, !0), t.events.on("html.set", function() {
                    n() && l(!0);
                }), t.events.on("codeView.update", i), t.events.on("form.submit", function() {
                    n() && (t.html.set(r()), t.events.trigger("contentChanged", [], !0));
                }, !0);
            }(), !f && t.opts.codeMirror ? ((f = t.opts.codeMirror.fromTextArea(c.get(0), t.opts.codeMirrorOptions)).on("blur", a), 
            f.on("focus", o)) : (t.events.$on(c, "keydown keyup change input", function() {
                t.opts.height ? this.removeAttribute("rows") : (this.rows = 1, 0 === this.value.length ? this.style.height = "auto" : this.style.height = this.scrollHeight + "px");
            }), t.events.$on(c, "blur", a), t.events.$on(c, "focus", o))), t.undo.saveStep(), 
            t.html.cleanEmptyTags(), t.html.cleanWhiteTags(!0), t.core.hasFocus() && (t.core.isEmpty() || (t.selection.save(), 
            t.$el.find('.fr-marker[data-type="true"]:first').replaceWith('<span class="fr-tmp fr-sm">F</span>'), 
            t.$el.find('.fr-marker[data-type="false"]:last').replaceWith('<span class="fr-tmp fr-em">F</span>')));
            var h = t.html.get(!1, !0);
            t.$el.find("span.fr-tmp").remove(), t.$box.toggleClass("fr-code-view", !0);
            var g, m, v = !1;
            if (t.core.hasFocus() && (v = !0, t.events.disableBlur(), t.$el.blur()), h = (h = h.replace(/<span class="fr-tmp fr-sm">F<\/span>/, "FROALA-SM")).replace(/<span class="fr-tmp fr-em">F<\/span>/, "FROALA-EM"), 
            t.codeBeautifier && (h = t.codeBeautifier.run(h, t.opts.codeBeautifierOptions)), 
            f) {
                g = h.indexOf("FROALA-SM"), (m = h.indexOf("FROALA-EM")) < g ? g = m : m -= 9;
                var E = (h = h.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).substring(0, g).length - h.substring(0, g).replace(/\n/g, "").length, b = h.substring(0, m).length - h.substring(0, m).replace(/\n/g, "").length;
                g = h.substring(0, g).length - h.substring(0, h.substring(0, g).lastIndexOf("\n") + 1).length, 
                m = h.substring(0, m).length - h.substring(0, h.substring(0, m).lastIndexOf("\n") + 1).length, 
                f.setSize(null, t.opts.height ? t.opts.height : "auto"), t.opts.heightMin && t.$box.find(".CodeMirror-scroll").css("min-height", t.opts.heightMin), 
                f.setValue(h), u = !v, f.focus(), u = !0, f.setSelection({
                    line: E,
                    ch: g
                }, {
                    line: b,
                    ch: m
                }), f.refresh(), f.clearHistory();
            } else {
                g = h.indexOf("FROALA-SM"), m = h.indexOf("FROALA-EM") - 9, t.opts.heightMin && c.css("min-height", t.opts.heightMin), 
                t.opts.height && c.css("height", t.opts.height), t.opts.heightMax && c.css("max-height", t.opts.height || t.opts.heightMax), 
                c.val(h.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).trigger("change");
                var T = e(t.o_doc).scrollTop();
                u = !v, c.focus(), u = !0, c.get(0).setSelectionRange(g, m), e(t.o_doc).scrollTop(T);
            }
            t.$tb.find(" > .fr-command").not(s).filter(function() {
                return t.opts.codeViewKeepActiveButtons.indexOf(e(this).data("cmd")) < 0;
            }).addClass("fr-disabled").attr("aria-disabled", !0), s.addClass("fr-active").attr("aria-pressed", !0), 
            !t.helpers.isMobile() && t.opts.toolbarInline && t.toolbar.hide();
        }
        function l(e) {
            void 0 === e && (e = !n());
            var i, a, o = t.$tb.find('.fr-command[data-cmd="html"]');
            e ? (t.popups.hideAll(), s(o)) : (t.$box.toggleClass("fr-code-view", !1), i = o, 
            a = r(), t.html.set(a), t.$el.blur(), t.$tb.find(" > .fr-command").not(i).removeClass("fr-disabled").attr("aria-disabled", !1), 
            i.removeClass("fr-active").attr("aria-pressed", !1), t.selection.setAtStart(t.el), 
            t.selection.restore(), t.placeholder.refresh(), t.undo.saveStep());
        }
        function d() {
            n() && l(!1), f && f.toTextArea(), c.val("").removeData().remove(), c = null, p && (p.remove(), 
            p = null);
        }
        var c, f, p, u = !1;
        return {
            _init: function() {
                if (!t.$wp) return !1;
            },
            toggle: l,
            isActive: n,
            get: r
        };
    }, e.FE.RegisterCommand("html", {
        title: "Code View",
        undo: !1,
        focus: !1,
        forcedRefresh: !0,
        toggle: !0,
        callback: function() {
            this.codeView.toggle();
        },
        plugin: "codeView"
    }), e.FE.DefineIcon("html", {
        NAME: "code"
    }), e.extend(e.FE.POPUP_TEMPLATES, {
        "colors.picker": "[_BUTTONS_][_TEXT_COLORS_][_BACKGROUND_COLORS_][_CUSTOM_COLOR_]"
    }), e.extend(e.FE.DEFAULTS, {
        colorsText: [ "#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE" ],
        colorsBackground: [ "#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE" ],
        colorsStep: 7,
        colorsHEXInput: !0,
        colorsDefaultTab: "text",
        colorsButtons: [ "colorsBack", "|", "-" ]
    }), e.FE.PLUGINS.colors = function(t) {
        function n() {
            t.popups.hide("colors.picker");
        }
        function r(e) {
            for (var n = "text" == e ? t.opts.colorsText : t.opts.colorsBackground, r = '<div class="fr-color-set fr-' + e + "-color" + (t.opts.colorsDefaultTab == e || "text" != t.opts.colorsDefaultTab && "background" != t.opts.colorsDefaultTab && "text" == e ? " fr-selected-set" : "") + '">', i = 0; i < n.length; i++) 0 !== i && i % t.opts.colorsStep == 0 && (r += "<br>"), 
            "REMOVE" != n[i] ? r += '<span class="fr-command fr-select-color" style="background: ' + n[i] + ';" tabIndex="-1" aria-selected="false" role="button" data-cmd="' + e + 'Color" data-param1="' + n[i] + '"><span class="fr-sr-only">' + t.language.translate("Color") + " " + n[i] + "&nbsp;&nbsp;&nbsp;</span></span>" : r += '<span class="fr-command fr-select-color" data-cmd="' + e + 'Color" tabIndex="-1" role="button" data-param1="REMOVE" title="' + t.language.translate("Clear Formatting") + '">' + t.icon.create("remove") + '<span class="fr-sr-only">' + t.language.translate("Clear Formatting") + "</span></span>";
            return r + "</div>";
        }
        function i(n) {
            var r, i = t.popups.get("colors.picker"), a = e(t.selection.element());
            r = "background" == n ? "background-color" : "color";
            var o = i.find(".fr-" + n + "-color .fr-select-color");
            for (o.find(".fr-selected-color").remove(), o.removeClass("fr-active-item"), o.not('[data-param1="REMOVE"]').attr("aria-selected", !1); a.get(0) != t.el; ) {
                if ("transparent" != a.css(r) && "rgba(0, 0, 0, 0)" != a.css(r)) {
                    var s = i.find(".fr-" + n + '-color .fr-select-color[data-param1="' + t.helpers.RGBToHex(a.css(r)) + '"]');
                    s.append('<span class="fr-selected-color" aria-hidden="true"></span>'), s.addClass("fr-active-item").attr("aria-selected", !0);
                    break;
                }
                a = a.parent();
            }
            var l = i.find(".fr-color-hex-layer input");
            l.length && l.val(t.helpers.RGBToHex(a.css(r))).trigger("change");
        }
        function a(e) {
            "REMOVE" != e ? t.format.applyStyle("background-color", t.helpers.HEXtoRGB(e)) : t.format.removeStyle("background-color"), 
            n();
        }
        function o(e) {
            "REMOVE" != e ? t.format.applyStyle("color", t.helpers.HEXtoRGB(e)) : t.format.removeStyle("color"), 
            n();
        }
        return {
            showColorsPopup: function() {
                var n = t.$tb.find('.fr-command[data-cmd="color"]'), a = t.popups.get("colors.picker");
                if (a || (a = function() {
                    var n, i = '<div class="fr-buttons fr-colors-buttons">';
                    t.opts.toolbarInline && 0 < t.opts.colorsButtons.length && (i += t.button.buildList(t.opts.colorsButtons)), 
                    i += (n = '<div class="fr-colors-tabs fr-group">', n += '<span class="fr-colors-tab ' + ("background" == t.opts.colorsDefaultTab ? "" : "fr-selected-tab ") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" != t.opts.colorsDefaultTab) + '" data-param1="text" data-cmd="colorChangeSet" title="' + t.language.translate("Text") + '">' + t.language.translate("Text") + "</span>", 
                    (n += '<span class="fr-colors-tab ' + ("background" == t.opts.colorsDefaultTab ? "fr-selected-tab " : "") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" == t.opts.colorsDefaultTab) + '" data-param1="background" data-cmd="colorChangeSet" title="' + t.language.translate("Background") + '">' + t.language.translate("Background") + "</span>") + "</div></div>");
                    var a = "";
                    t.opts.colorsHEXInput && (a = '<div class="fr-color-hex-layer fr-active fr-layer" id="fr-color-hex-layer-' + t.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-color-hex-layer-text-' + t.id + '" type="text" placeholder="' + t.language.translate("HEX Color") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="customColor" tabIndex="2" role="button">' + t.language.translate("OK") + "</button></div></div>");
                    var o, s = {
                        buttons: i,
                        text_colors: r("text"),
                        background_colors: r("background"),
                        custom_color: a
                    }, l = t.popups.create("colors.picker", s);
                    return o = l, t.events.on("popup.tab", function(n) {
                        var r = e(n.currentTarget);
                        if (!t.popups.isVisible("colors.picker") || !r.is("span")) return !0;
                        var i = n.which, a = !0;
                        if (e.FE.KEYCODE.TAB == i) {
                            var s = o.find(".fr-buttons");
                            a = !t.accessibility.focusToolbar(s, !!n.shiftKey);
                        } else if (e.FE.KEYCODE.ARROW_UP == i || e.FE.KEYCODE.ARROW_DOWN == i || e.FE.KEYCODE.ARROW_LEFT == i || e.FE.KEYCODE.ARROW_RIGHT == i) {
                            if (r.is("span.fr-select-color")) {
                                var l = r.parent().find("span.fr-select-color"), d = l.index(r), c = t.opts.colorsStep, f = Math.floor(l.length / c), p = d % c, u = Math.floor(d / c), h = u * c + p, g = f * c;
                                e.FE.KEYCODE.ARROW_UP == i ? h = ((h - c) % g + g) % g : e.FE.KEYCODE.ARROW_DOWN == i ? h = (h + c) % g : e.FE.KEYCODE.ARROW_LEFT == i ? h = ((h - 1) % g + g) % g : e.FE.KEYCODE.ARROW_RIGHT == i && (h = (h + 1) % g);
                                var m = e(l.get(h));
                                t.events.disableBlur(), m.focus(), a = !1;
                            }
                        } else e.FE.KEYCODE.ENTER == i && (t.button.exec(r), a = !1);
                        return !1 === a && (n.preventDefault(), n.stopPropagation()), a;
                    }, !0), l;
                }()), !a.hasClass("fr-active")) if (t.popups.setContainer("colors.picker", t.$tb), 
                i(a.find(".fr-selected-tab").attr("data-param1")), n.is(":visible")) {
                    var o = n.offset().left + n.outerWidth() / 2, s = n.offset().top + (t.opts.toolbarBottom ? 10 : n.outerHeight() - 10);
                    t.popups.show("colors.picker", o, s, n.outerHeight());
                } else t.position.forSelection(a), t.popups.show("colors.picker");
            },
            hideColorsPopup: n,
            changeSet: function(e, n) {
                e.hasClass("fr-selected-tab") || (e.siblings().removeClass("fr-selected-tab").attr("aria-pressed", !1), 
                e.addClass("fr-selected-tab").attr("aria-pressed", !0), e.parents(".fr-popup").find(".fr-color-set").removeClass("fr-selected-set"), 
                e.parents(".fr-popup").find(".fr-color-set.fr-" + n + "-color").addClass("fr-selected-set"), 
                i(n)), t.accessibility.focusPopup(e.parents(".fr-popup"));
            },
            background: a,
            customColor: function() {
                var e = t.popups.get("colors.picker"), n = e.find(".fr-color-hex-layer input");
                if (n.length) {
                    var r = n.val();
                    "background" == e.find(".fr-selected-tab").attr("data-param1") ? a(r) : o(r);
                }
            },
            text: o,
            back: function() {
                t.popups.hide("colors.picker"), t.toolbar.showInline();
            }
        };
    }, e.FE.DefineIcon("colors", {
        NAME: "tint"
    }), e.FE.RegisterCommand("color", {
        title: "Colors",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("colors.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), 
            this.selection.restore()), this.popups.hide("colors.picker")) : this.colors.showColorsPopup();
        },
        plugin: "colors"
    }), e.FE.RegisterCommand("textColor", {
        undo: !0,
        callback: function(e, t) {
            this.colors.text(t);
        }
    }), e.FE.RegisterCommand("backgroundColor", {
        undo: !0,
        callback: function(e, t) {
            this.colors.background(t);
        }
    }), e.FE.RegisterCommand("colorChangeSet", {
        undo: !1,
        focus: !1,
        callback: function(e, t) {
            var n = this.popups.get("colors.picker").find('.fr-command[data-cmd="' + e + '"][data-param1="' + t + '"]');
            this.colors.changeSet(n, t);
        }
    }), e.FE.DefineIcon("colorsBack", {
        NAME: "arrow-left"
    }), e.FE.RegisterCommand("colorsBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.colors.back();
        }
    }), e.FE.RegisterCommand("customColor", {
        title: "OK",
        undo: !0,
        callback: function() {
            this.colors.customColor();
        }
    }), e.FE.DefineIcon("remove", {
        NAME: "eraser"
    }), e.extend(e.FE.DEFAULTS, {
        dragInline: !0
    }), e.FE.PLUGINS.draggable = function(t) {
        function n(n) {
            return !(!n.originalEvent || !n.originalEvent.target || n.originalEvent.target.nodeType != Node.TEXT_NODE) || (n.target && "A" == n.target.tagName && 1 == n.target.childNodes.length && "IMG" == n.target.childNodes[0].tagName && (n.target = n.target.childNodes[0]), 
            e(n.target).hasClass("fr-draggable") ? (t.undo.canDo() || t.undo.saveStep(), t.opts.dragInline ? t.$el.attr("contenteditable", !0) : t.$el.attr("contenteditable", !1), 
            t.opts.toolbarInline && t.toolbar.hide(), e(n.target).addClass("fr-dragging"), t.browser.msie || t.browser.edge || t.selection.clear(), 
            void n.originalEvent.dataTransfer.setData("text", "Froala")) : (n.preventDefault(), 
            !1));
        }
        function r(e) {
            return !(e && ("HTML" == e.tagName || "BODY" == e.tagName || t.node.isElement(e)));
        }
        function i(e, n, r) {
            t.opts.iframe && (e += t.$iframe.offset().top, n += t.$iframe.offset().left), c.offset().top != e && c.css("top", e), 
            c.offset().left != n && c.css("left", n), c.width() != r && c.css("width", r);
        }
        function a(n) {
            n.originalEvent.dataTransfer.dropEffect = "move", t.opts.dragInline ? function() {
                for (var t = null, n = 0; n < e.FE.INSTANCES.length; n++) if ((t = e.FE.INSTANCES[n].$el.find(".fr-dragging")).length) return t.get(0);
            }() || !t.browser.msie && !t.browser.edge || n.preventDefault() : (n.preventDefault(), 
            function(n) {
                var a = t.doc.elementFromPoint(n.originalEvent.pageX - t.win.pageXOffset, n.originalEvent.pageY - t.win.pageYOffset);
                if (!r(a)) {
                    for (var o = 0, s = a; !r(s) && s == a && 0 < n.originalEvent.pageY - t.win.pageYOffset - o; ) o++, 
                    s = t.doc.elementFromPoint(n.originalEvent.pageX - t.win.pageXOffset, n.originalEvent.pageY - t.win.pageYOffset - o);
                    (!r(s) || c && 0 === t.$el.find(s).length && s != c.get(0)) && (s = null);
                    for (var l = 0, d = a; !r(d) && d == a && n.originalEvent.pageY - t.win.pageYOffset + l < e(t.doc).height(); ) l++, 
                    d = t.doc.elementFromPoint(n.originalEvent.pageX - t.win.pageXOffset, n.originalEvent.pageY - t.win.pageYOffset + l);
                    (!r(d) || c && 0 === t.$el.find(d).length && d != c.get(0)) && (d = null), a = null == d && s ? s : d && null == s ? d : d && s ? o < l ? s : d : null;
                }
                if (!e(a).hasClass("fr-drag-helper")) if (a && !t.node.isBlock(a) && (a = t.node.blockParent(a)), 
                a && 0 <= [ "TD", "TH", "TR", "THEAD", "TBODY" ].indexOf(a.tagName) && (a = e(a).parents("table").get(0)), 
                a && 0 <= [ "LI" ].indexOf(a.tagName) && (a = e(a).parents("UL, OL").get(0)), a && !e(a).hasClass("fr-drag-helper")) {
                    var f;
                    c || (e.FE.$draggable_helper || (e.FE.$draggable_helper = e('<div class="fr-drag-helper"></div>')), 
                    c = e.FE.$draggable_helper, t.events.on("shared.destroy", function() {
                        c.html("").removeData().remove(), c = null;
                    }, !0)), f = n.originalEvent.pageY < e(a).offset().top + e(a).outerHeight() / 2;
                    var p = e(a), u = 0;
                    f || 0 !== p.next().length ? (f || (p = p.next()), "before" == c.data("fr-position") && p.is(c.data("fr-tag")) || (0 < p.prev().length && (u = parseFloat(p.prev().css("margin-bottom")) || 0), 
                    u = Math.max(u, parseFloat(p.css("margin-top")) || 0), i(p.offset().top - u / 2 - t.$box.offset().top, p.offset().left - t.win.pageXOffset - t.$box.offset().left, p.width()), 
                    c.data("fr-position", "before"))) : "after" == c.data("fr-position") && p.is(c.data("fr-tag")) || (u = parseFloat(p.css("margin-bottom")) || 0, 
                    i(p.offset().top + e(a).height() + u / 2 - t.$box.offset().top, p.offset().left - t.win.pageXOffset - t.$box.offset().left, p.width()), 
                    c.data("fr-position", "after")), c.data("fr-tag", p), c.addClass("fr-visible"), 
                    c.appendTo(t.$box);
                } else c && 0 < t.$box.find(c).length && c.removeClass("fr-visible");
            }(n));
        }
        function o(e) {
            e.originalEvent.dataTransfer.dropEffect = "move", t.opts.dragInline || e.preventDefault();
        }
        function s(e) {
            t.$el.attr("contenteditable", !0);
            var n = t.$el.find(".fr-dragging");
            c && c.hasClass("fr-visible") && t.$box.find(c).length ? l(e) : n.length && (e.preventDefault(), 
            e.stopPropagation()), c && t.$box.find(c).length && c.removeClass("fr-visible"), 
            n.removeClass("fr-dragging");
        }
        function l(n) {
            for (var r, i, a = 0; a < e.FE.INSTANCES.length; a++) if ((r = e.FE.INSTANCES[a].$el.find(".fr-dragging")).length) {
                i = e.FE.INSTANCES[a];
                break;
            }
            if (r.length) {
                if (n.preventDefault(), n.stopPropagation(), c && c.hasClass("fr-visible") && t.$box.find(c).length) c.data("fr-tag")[c.data("fr-position")]('<span class="fr-marker"></span>'), 
                c.removeClass("fr-visible"); else if (!1 === t.markers.insertAtPoint(n.originalEvent)) return !1;
                if (r.removeClass("fr-dragging"), !1 === (r = t.events.chainTrigger("element.beforeDrop", r))) return !1;
                var o = r;
                if (r.parent().is("A") && 1 == r.parent().get(0).childNodes.length && (o = r.parent()), 
                t.core.isEmpty() ? t.events.focus() : (t.$el.find(".fr-marker").replaceWith(e.FE.MARKERS), 
                t.selection.restore()), i == t || t.undo.canDo() || t.undo.saveStep(), t.core.isEmpty()) t.$el.html(o); else {
                    var s = t.markers.insert();
                    0 === o.find(s).length ? e(s).replaceWith(o) : 0 === r.find(s).length && e(s).replaceWith(r), 
                    r.after(e.FE.MARKERS), t.selection.restore();
                }
                return t.popups.hideAll(), t.selection.save(), t.$el.find(t.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").not(t.opts.htmlAllowedEmptyTags.join(",")).remove(), 
                t.html.wrap(), t.html.fillEmptyBlocks(), t.selection.restore(), t.undo.saveStep(), 
                t.opts.iframe && t.size.syncIframe(), i != t && (i.popups.hideAll(), i.$el.find(i.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(), 
                i.html.wrap(), i.html.fillEmptyBlocks(), i.undo.saveStep(), i.events.trigger("element.dropped"), 
                i.opts.iframe && i.size.syncIframe()), t.events.trigger("element.dropped", [ o ]), 
                !1;
            }
            c && c.removeClass("fr-visible"), t.undo.canDo() || t.undo.saveStep(), setTimeout(function() {
                t.undo.saveStep();
            }, 0);
        }
        function d(e) {
            if (e && "DIV" == e.tagName && t.node.hasClass(e, "fr-drag-helper")) e.parentNode.removeChild(e); else if (e && e.nodeType == Node.ELEMENT_NODE) for (var n = e.querySelectorAll("div.fr-drag-helper"), r = 0; r < n.length; r++) n[r].parentNode.removeChild(n[r]);
        }
        var c;
        return {
            _init: function() {
                t.opts.enter == e.FE.ENTER_BR && (t.opts.dragInline = !0), t.events.on("dragstart", n, !0), 
                t.events.on("dragover", a, !0), t.events.on("dragenter", o, !0), t.events.on("document.dragend", s, !0), 
                t.events.on("document.drop", s, !0), t.events.on("drop", l, !0), t.events.on("html.processGet", d);
            }
        };
    }, e.extend(e.FE.POPUP_TEMPLATES, {
        emoticons: "[_BUTTONS_][_EMOTICONS_]"
    }), e.extend(e.FE.DEFAULTS, {
        emoticonsStep: 8,
        emoticonsSet: [ {
            code: "1f600",
            desc: "Grinning face"
        }, {
            code: "1f601",
            desc: "Grinning face with smiling eyes"
        }, {
            code: "1f602",
            desc: "Face with tears of joy"
        }, {
            code: "1f603",
            desc: "Smiling face with open mouth"
        }, {
            code: "1f604",
            desc: "Smiling face with open mouth and smiling eyes"
        }, {
            code: "1f605",
            desc: "Smiling face with open mouth and cold sweat"
        }, {
            code: "1f606",
            desc: "Smiling face with open mouth and tightly-closed eyes"
        }, {
            code: "1f607",
            desc: "Smiling face with halo"
        }, {
            code: "1f608",
            desc: "Smiling face with horns"
        }, {
            code: "1f609",
            desc: "Winking face"
        }, {
            code: "1f60a",
            desc: "Smiling face with smiling eyes"
        }, {
            code: "1f60b",
            desc: "Face savoring delicious food"
        }, {
            code: "1f60c",
            desc: "Relieved face"
        }, {
            code: "1f60d",
            desc: "Smiling face with heart-shaped eyes"
        }, {
            code: "1f60e",
            desc: "Smiling face with sunglasses"
        }, {
            code: "1f60f",
            desc: "Smirking face"
        }, {
            code: "1f610",
            desc: "Neutral face"
        }, {
            code: "1f611",
            desc: "Expressionless face"
        }, {
            code: "1f612",
            desc: "Unamused face"
        }, {
            code: "1f613",
            desc: "Face with cold sweat"
        }, {
            code: "1f614",
            desc: "Pensive face"
        }, {
            code: "1f615",
            desc: "Confused face"
        }, {
            code: "1f616",
            desc: "Confounded face"
        }, {
            code: "1f617",
            desc: "Kissing face"
        }, {
            code: "1f618",
            desc: "Face throwing a kiss"
        }, {
            code: "1f619",
            desc: "Kissing face with smiling eyes"
        }, {
            code: "1f61a",
            desc: "Kissing face with closed eyes"
        }, {
            code: "1f61b",
            desc: "Face with stuck out tongue"
        }, {
            code: "1f61c",
            desc: "Face with stuck out tongue and winking eye"
        }, {
            code: "1f61d",
            desc: "Face with stuck out tongue and tightly-closed eyes"
        }, {
            code: "1f61e",
            desc: "Disappointed face"
        }, {
            code: "1f61f",
            desc: "Worried face"
        }, {
            code: "1f620",
            desc: "Angry face"
        }, {
            code: "1f621",
            desc: "Pouting face"
        }, {
            code: "1f622",
            desc: "Crying face"
        }, {
            code: "1f623",
            desc: "Persevering face"
        }, {
            code: "1f624",
            desc: "Face with look of triumph"
        }, {
            code: "1f625",
            desc: "Disappointed but relieved face"
        }, {
            code: "1f626",
            desc: "Frowning face with open mouth"
        }, {
            code: "1f627",
            desc: "Anguished face"
        }, {
            code: "1f628",
            desc: "Fearful face"
        }, {
            code: "1f629",
            desc: "Weary face"
        }, {
            code: "1f62a",
            desc: "Sleepy face"
        }, {
            code: "1f62b",
            desc: "Tired face"
        }, {
            code: "1f62c",
            desc: "Grimacing face"
        }, {
            code: "1f62d",
            desc: "Loudly crying face"
        }, {
            code: "1f62e",
            desc: "Face with open mouth"
        }, {
            code: "1f62f",
            desc: "Hushed face"
        }, {
            code: "1f630",
            desc: "Face with open mouth and cold sweat"
        }, {
            code: "1f631",
            desc: "Face screaming in fear"
        }, {
            code: "1f632",
            desc: "Astonished face"
        }, {
            code: "1f633",
            desc: "Flushed face"
        }, {
            code: "1f634",
            desc: "Sleeping face"
        }, {
            code: "1f635",
            desc: "Dizzy face"
        }, {
            code: "1f636",
            desc: "Face without mouth"
        }, {
            code: "1f637",
            desc: "Face with medical mask"
        } ],
        emoticonsButtons: [ "emoticonsBack", "|" ],
        emoticonsUseImage: !0
    }), e.FE.PLUGINS.emoticons = function(t) {
        function n() {
            if (!t.selection.isCollapsed()) return !1;
            var e = t.selection.element(), n = t.selection.endElement();
            if (e && t.node.hasClass(e, "fr-emoticon")) return e;
            if (n && t.node.hasClass(n, "fr-emoticon")) return n;
            var r = t.selection.ranges(0), i = r.startContainer;
            if (i.nodeType == Node.ELEMENT_NODE && 0 < i.childNodes.length && 0 < r.startOffset) {
                var a = i.childNodes[r.startOffset - 1];
                if (t.node.hasClass(a, "fr-emoticon")) return a;
            }
            return !1;
        }
        return {
            _init: function() {
                var r = function() {
                    for (var e = t.el.querySelectorAll(".fr-emoticon:not(.fr-deletable)"), n = 0; n < e.length; n++) e[n].className += " fr-deletable";
                };
                r(), t.events.on("html.set", r), t.events.on("keydown", function(r) {
                    if (t.keys.isCharacter(r.which) && t.selection.inEditor()) {
                        var i = t.selection.ranges(0), a = n();
                        t.node.hasClass(a, "fr-emoticon-img") && a && (0 === i.startOffset && t.selection.element() === a ? e(a).before(e.FE.MARKERS + e.FE.INVISIBLE_SPACE) : e(a).after(e.FE.INVISIBLE_SPACE + e.FE.MARKERS), 
                        t.selection.restore());
                    }
                }), t.events.on("keyup", function(r) {
                    for (var i = t.el.querySelectorAll(".fr-emoticon"), a = 0; a < i.length; a++) void 0 !== i[a].textContent && 0 === i[a].textContent.replace(/\u200B/gi, "").length && e(i[a]).remove();
                    if (!(r.which >= e.FE.KEYCODE.ARROW_LEFT && r.which <= e.FE.KEYCODE.ARROW_DOWN)) {
                        var o = n();
                        t.node.hasClass(o, "fr-emoticon-img") && (e(o).append(e.FE.MARKERS), t.selection.restore());
                    }
                });
            },
            insert: function(r, i) {
                var a = n(), o = t.selection.ranges(0);
                a ? (0 === o.startOffset && t.selection.element() === a ? e(a).before(e.FE.MARKERS + e.FE.INVISIBLE_SPACE) : 0 < o.startOffset && t.selection.element() === a && o.commonAncestorContainer.parentNode.classList.contains("fr-emoticon") && e(a).after(e.FE.INVISIBLE_SPACE + e.FE.MARKERS), 
                t.selection.restore(), t.html.insert('<span class="fr-emoticon fr-deletable' + (i ? " fr-emoticon-img" : "") + '"' + (i ? ' style="background: url(' + i + ');"' : "") + ">" + (i ? "&nbsp;" : r) + "</span>&nbsp;" + e.FE.MARKERS, !0)) : t.html.insert('<span class="fr-emoticon fr-deletable' + (i ? " fr-emoticon-img" : "") + '"' + (i ? ' style="background: url(' + i + ');"' : "") + ">" + (i ? "&nbsp;" : r) + "</span>&nbsp;", !0);
            },
            showEmoticonsPopup: function() {
                var n = t.$tb.find('.fr-command[data-cmd="emoticons"]'), r = t.popups.get("emoticons");
                if (r || (r = function() {
                    var n = "";
                    t.opts.toolbarInline && 0 < t.opts.emoticonsButtons.length && (n = '<div class="fr-buttons fr-emoticons-buttons">' + t.button.buildList(t.opts.emoticonsButtons) + "</div>");
                    var r, i = {
                        buttons: n,
                        emoticons: function() {
                            for (var e = '<div style="text-align: center">', n = 0; n < t.opts.emoticonsSet.length; n++) 0 !== n && n % t.opts.emoticonsStep == 0 && (e += "<br>"), 
                            e += '<span class="fr-command fr-emoticon" tabIndex="-1" data-cmd="insertEmoticon" title="' + t.language.translate(t.opts.emoticonsSet[n].desc) + '" role="button" data-param1="' + t.opts.emoticonsSet[n].code + '">' + (t.opts.emoticonsUseImage ? '<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/' + t.opts.emoticonsSet[n].code + '.svg"/>' : "&#x" + t.opts.emoticonsSet[n].code + ";") + '<span class="fr-sr-only">' + t.language.translate(t.opts.emoticonsSet[n].desc) + "&nbsp;&nbsp;&nbsp;</span></span>";
                            return t.opts.emoticonsUseImage && (e += '<p style="font-size: 12px; text-align: center; padding: 0 5px;">Emoji free by <a class="fr-link" tabIndex="-1" href="http://emojione.com/" target="_blank" rel="nofollow" role="link" aria-label="Open Emoji One website.">Emoji One</a></p>'), 
                            e += "</div>";
                        }()
                    }, a = t.popups.create("emoticons", i);
                    return t.tooltip.bind(a, ".fr-emoticon"), r = a, t.events.on("popup.tab", function(n) {
                        var i = e(n.currentTarget);
                        if (!t.popups.isVisible("emoticons") || !i.is("span, a")) return !0;
                        var a, o, s, l = n.which;
                        if (e.FE.KEYCODE.TAB == l) {
                            if (i.is("span.fr-emoticon") && n.shiftKey || i.is("a") && !n.shiftKey) {
                                var d = r.find(".fr-buttons");
                                a = !t.accessibility.focusToolbar(d, !!n.shiftKey);
                            }
                            if (!1 !== a) {
                                var c = r.find("span.fr-emoticon:focus:first, span.fr-emoticon:visible:first, a");
                                i.is("span.fr-emoticon") && (c = c.not("span.fr-emoticon:not(:focus)")), o = c.index(i), 
                                o = n.shiftKey ? ((o - 1) % c.length + c.length) % c.length : (o + 1) % c.length, 
                                s = c.get(o), t.events.disableBlur(), s.focus(), a = !1;
                            }
                        } else if (e.FE.KEYCODE.ARROW_UP == l || e.FE.KEYCODE.ARROW_DOWN == l || e.FE.KEYCODE.ARROW_LEFT == l || e.FE.KEYCODE.ARROW_RIGHT == l) {
                            if (i.is("span.fr-emoticon")) {
                                var f = i.parent().find("span.fr-emoticon");
                                o = f.index(i);
                                var p = t.opts.emoticonsStep, u = Math.floor(f.length / p), h = o % p, g = Math.floor(o / p), m = g * p + h, v = u * p;
                                e.FE.KEYCODE.ARROW_UP == l ? m = ((m - p) % v + v) % v : e.FE.KEYCODE.ARROW_DOWN == l ? m = (m + p) % v : e.FE.KEYCODE.ARROW_LEFT == l ? m = ((m - 1) % v + v) % v : e.FE.KEYCODE.ARROW_RIGHT == l && (m = (m + 1) % v), 
                                s = e(f.get(m)), t.events.disableBlur(), s.focus(), a = !1;
                            }
                        } else e.FE.KEYCODE.ENTER == l && (i.is("a") ? i[0].click() : t.button.exec(i), 
                        a = !1);
                        return !1 === a && (n.preventDefault(), n.stopPropagation()), a;
                    }, !0), a;
                }()), !r.hasClass("fr-active")) {
                    t.popups.refresh("emoticons"), t.popups.setContainer("emoticons", t.$tb);
                    var i = n.offset().left + n.outerWidth() / 2, a = n.offset().top + (t.opts.toolbarBottom ? 10 : n.outerHeight() - 10);
                    t.popups.show("emoticons", i, a, n.outerHeight());
                }
            },
            hideEmoticonsPopup: function() {
                t.popups.hide("emoticons");
            },
            back: function() {
                t.popups.hide("emoticons"), t.toolbar.showInline();
            }
        };
    }, e.FE.DefineIcon("emoticons", {
        NAME: "smile-o",
        FA5NAME: "smile"
    }), e.FE.RegisterCommand("emoticons", {
        title: "Emoticons",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("emoticons") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), 
            this.selection.restore()), this.popups.hide("emoticons")) : this.emoticons.showEmoticonsPopup();
        },
        plugin: "emoticons"
    }), e.FE.RegisterCommand("insertEmoticon", {
        callback: function(e, t) {
            this.emoticons.insert("&#x" + t + ";", this.opts.emoticonsUseImage ? "https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/" + t + ".svg" : null), 
            this.emoticons.hideEmoticonsPopup();
        }
    }), e.FE.DefineIcon("emoticonsBack", {
        NAME: "arrow-left"
    }), e.FE.RegisterCommand("emoticonsBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.emoticons.back();
        }
    }), e.extend(e.FE.DEFAULTS, {
        entities: "&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;"
    }), e.FE.PLUGINS.entities = function(t) {
        function n(e) {
            var t = e.textContent;
            if (t.match(a)) {
                for (var n = "", r = 0; r < t.length; r++) o[t[r]] ? n += o[t[r]] : n += t[r];
                e.textContent = n;
            }
        }
        function r(e) {
            if (e && 0 <= [ "STYLE", "SCRIPT", "svg", "IFRAME" ].indexOf(e.tagName)) return !0;
            for (var i = t.node.contents(e), a = 0; a < i.length; a++) i[a].nodeType == Node.TEXT_NODE ? n(i[a]) : r(i[a]);
            e.nodeType == Node.TEXT_NODE && n(e);
        }
        function i(e) {
            return 0 === e.length ? "" : t.clean.exec(e, r).replace(/\&amp;/g, "&");
        }
        var a, o;
        return {
            _init: function() {
                t.opts.htmlSimpleAmpersand || (t.opts.entities = t.opts.entities + "&amp;");
                var n = e("<div>").html(t.opts.entities).text(), r = t.opts.entities.split(";");
                o = {}, a = "";
                for (var s = 0; s < n.length; s++) {
                    var l = n.charAt(s);
                    o[l] = r[s] + ";", a += "\\" + l + (s < n.length - 1 ? "|" : "");
                }
                a = new RegExp("(" + a + ")", "g"), t.events.on("html.get", i, !0);
            }
        };
    }, e.extend(e.FE.POPUP_TEMPLATES, {
        "file.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_PROGRESS_BAR_]"
    }), e.extend(e.FE.DEFAULTS, {
        fileUpload: !0,
        fileUploadURL: "https://i.froala.com/upload",
        fileUploadParam: "file",
        fileUploadParams: {},
        fileUploadToS3: !1,
        fileUploadMethod: "POST",
        fileMaxSize: 10485760,
        fileAllowedTypes: [ "*" ],
        fileInsertButtons: [ "fileBack", "|" ],
        fileUseSelectedText: !1
    }), e.FE.PLUGINS.file = function(t) {
        function n() {
            var e = t.popups.get("file.insert");
            e || (e = u()), e.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), 
            e.find(".fr-file-progress-bar-layer").addClass("fr-active"), e.find(".fr-buttons").hide(), 
            i(t.language.translate("Uploading"), 0);
        }
        function r(e) {
            var n = t.popups.get("file.insert");
            n && (n.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), 
            n.find(".fr-file-progress-bar-layer").removeClass("fr-active"), n.find(".fr-buttons").show(), 
            e && (t.events.focus(), t.popups.hide("file.insert")));
        }
        function i(e, n) {
            var r = t.popups.get("file.insert");
            if (r) {
                var i = r.find(".fr-file-progress-bar-layer");
                i.find("h3").text(e + (n ? " " + n + "%" : "")), i.removeClass("fr-error"), n ? (i.find("div").removeClass("fr-indeterminate"), 
                i.find("div > span").css("width", n + "%")) : i.find("div").addClass("fr-indeterminate");
            }
        }
        function a(e, n, r) {
            t.edit.on(), t.events.focus(!0), t.selection.restore(), t.opts.fileUseSelectedText && t.selection.text().length && (n = t.selection.text()), 
            t.html.insert('<a href="' + e + '" target="_blank" id="fr-inserted-file" class="fr-file">' + n + "</a>");
            var i = t.$el.find("#fr-inserted-file");
            i.removeAttr("id"), t.popups.hide("file.insert"), t.undo.saveStep(), m(), t.events.trigger("file.inserted", [ i, r ]);
        }
        function o(n) {
            var r = this.status, i = this.response, o = this.responseXML, s = this.responseText;
            try {
                if (t.opts.fileUploadToS3) if (201 == r) {
                    var l = function(n) {
                        try {
                            var r = e(n).find("Location").text(), i = e(n).find("Key").text();
                            return !1 === t.events.trigger("file.uploadedToS3", [ r, i, n ], !0) ? (t.edit.on(), 
                            !1) : r;
                        } catch (e) {
                            return d(T, n), !1;
                        }
                    }(o);
                    l && a(l, n, i || o);
                } else d(T, i || o); else if (200 <= r && r < 300) {
                    var c = function(e) {
                        try {
                            if (!1 === t.events.trigger("file.uploaded", [ e ], !0)) return t.edit.on(), !1;
                            var n = JSON.parse(e);
                            return n.link ? n : (d(E, e), !1);
                        } catch (t) {
                            return d(T, e), !1;
                        }
                    }(s);
                    c && a(c.link, n, i || s);
                } else d(b, i || s);
            } catch (e) {
                d(T, i || s);
            }
        }
        function s() {
            d(T, this.response || this.responseText || this.responseXML);
        }
        function l(e) {
            if (e.lengthComputable) {
                var n = e.loaded / e.total * 100 | 0;
                i(t.language.translate("Uploading"), n);
            }
        }
        function d(e, r) {
            t.edit.on(), function(e) {
                n();
                var r = t.popups.get("file.insert").find(".fr-file-progress-bar-layer");
                r.addClass("fr-error");
                var i = r.find("h3");
                i.text(e), t.events.disableBlur(), i.focus();
            }(t.language.translate("Something went wrong. Please try again.")), t.events.trigger("file.error", [ {
                code: e,
                message: R[e]
            }, r ]);
        }
        function c() {
            t.edit.on(), r(!0);
        }
        function f(e) {
            if (void 0 !== e && 0 < e.length) {
                if (!1 === t.events.trigger("file.beforeUpload", [ e ])) return !1;
                var r, i = e[0];
                if (i.size > t.opts.fileMaxSize) return d(A), !1;
                if (t.opts.fileAllowedTypes.indexOf("*") < 0 && t.opts.fileAllowedTypes.indexOf(i.type.replace(/file\//g, "")) < 0) return d(S), 
                !1;
                if (t.drag_support.formdata && (r = t.drag_support.formdata ? new FormData() : null), 
                r) {
                    var a;
                    if (!1 !== t.opts.fileUploadToS3) for (a in r.append("key", t.opts.fileUploadToS3.keyStart + new Date().getTime() + "-" + (i.name || "untitled")), 
                    r.append("success_action_status", "201"), r.append("X-Requested-With", "xhr"), r.append("Content-Type", i.type), 
                    t.opts.fileUploadToS3.params) t.opts.fileUploadToS3.params.hasOwnProperty(a) && r.append(a, t.opts.fileUploadToS3.params[a]);
                    for (a in t.opts.fileUploadParams) t.opts.fileUploadParams.hasOwnProperty(a) && r.append(a, t.opts.fileUploadParams[a]);
                    r.append(t.opts.fileUploadParam, i);
                    var f = t.opts.fileUploadURL;
                    t.opts.fileUploadToS3 && (f = t.opts.fileUploadToS3.uploadURL ? t.opts.fileUploadToS3.uploadURL : "https://" + t.opts.fileUploadToS3.region + ".amazonaws.com/" + t.opts.fileUploadToS3.bucket);
                    var p = t.core.getXHR(f, t.opts.fileUploadMethod);
                    p.onload = function() {
                        o.call(p, i.name);
                    }, p.onerror = s, p.upload.onprogress = l, p.onabort = c, n();
                    var u = t.popups.get("file.insert");
                    u && u.off("abortUpload").on("abortUpload", function() {
                        4 != p.readyState && p.abort();
                    }), p.send(r);
                }
            }
        }
        function p() {
            r();
        }
        function u(n) {
            if (n) return t.popups.onHide("file.insert", p), !0;
            var r;
            t.opts.fileUpload || t.opts.fileInsertButtons.splice(t.opts.fileInsertButtons.indexOf("fileUpload"), 1), 
            r = '<div class="fr-buttons">' + t.button.buildList(t.opts.fileInsertButtons) + "</div>";
            var i = "";
            t.opts.fileUpload && (i = '<div class="fr-file-upload-layer fr-layer fr-active" id="fr-file-upload-layer-' + t.id + '"><strong>' + t.language.translate("Drop file") + "</strong><br>(" + t.language.translate("or click") + ')<div class="fr-form"><input type="file" name="' + t.opts.fileUploadParam + '" accept="/*" tabIndex="-1" aria-labelledby="fr-file-upload-layer-' + t.id + '" role="button"></div></div>');
            var a, o = {
                buttons: r,
                upload_layer: i,
                progress_bar: '<div class="fr-file-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="fileDismissError" tabIndex="2" role="button">OK</button></div></div>'
            }, s = t.popups.create("file.insert", o);
            return a = s, t.events.$on(a, "dragover dragenter", ".fr-file-upload-layer", function() {
                return e(this).addClass("fr-drop"), !1;
            }, !0), t.events.$on(a, "dragleave dragend", ".fr-file-upload-layer", function() {
                return e(this).removeClass("fr-drop"), !1;
            }, !0), t.events.$on(a, "drop", ".fr-file-upload-layer", function(n) {
                n.preventDefault(), n.stopPropagation(), e(this).removeClass("fr-drop");
                var r = n.originalEvent.dataTransfer;
                r && r.files && (a.data("instance") || t).file.upload(r.files);
            }, !0), t.helpers.isIOS() && t.events.$on(a, "touchstart", '.fr-file-upload-layer input[type="file"]', function() {
                e(this).trigger("click");
            }), t.events.$on(a, "change", '.fr-file-upload-layer input[type="file"]', function() {
                this.files && (a.data("instance") || t).file.upload(this.files), e(this).val("");
            }, !0), s;
        }
        function h(e) {
            t.node.hasClass(e, "fr-file");
        }
        function g(r) {
            var i = r.originalEvent.dataTransfer;
            if (i && i.files && i.files.length) {
                var a = i.files[0];
                if (a && void 0 !== a.type) {
                    if (a.type.indexOf("image") < 0) {
                        if (!t.opts.fileUpload) return r.preventDefault(), r.stopPropagation(), !1;
                        t.markers.remove(), t.markers.insertAtPoint(r.originalEvent), t.$el.find(".fr-marker").replaceWith(e.FE.MARKERS), 
                        t.popups.hideAll();
                        var o = t.popups.get("file.insert");
                        return o || (o = u()), t.popups.setContainer("file.insert", t.$sc), t.popups.show("file.insert", r.originalEvent.pageX, r.originalEvent.pageY), 
                        n(), f(i.files), r.preventDefault(), r.stopPropagation(), !1;
                    }
                } else a.type.indexOf("image") < 0 && (r.preventDefault(), r.stopPropagation());
            }
        }
        function m() {
            var e, n = Array.prototype.slice.call(t.el.querySelectorAll("a.fr-file")), r = [];
            for (e = 0; e < n.length; e++) r.push(n[e].getAttribute("href"));
            if (v) for (e = 0; e < v.length; e++) r.indexOf(v[e].getAttribute("href")) < 0 && t.events.trigger("file.unlink", [ v[e] ]);
            v = n;
        }
        var v, E = 2, b = 3, T = 4, A = 5, S = 6, R = {};
        return R[1] = "File cannot be loaded from the passed link.", R[E] = "No link in upload response.", 
        R[b] = "Error during file upload.", R[T] = "Parsing response failed.", R[A] = "File is too large.", 
        R[S] = "File file type is invalid.", R[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", 
        {
            _init: function() {
                t.events.on("drop", g), t.events.$on(t.$win, "keydown", function(n) {
                    var r = n.which, i = t.popups.get("file.insert");
                    i && r == e.FE.KEYCODE.ESC && i.trigger("abortUpload");
                }), t.events.on("destroy", function() {
                    var e = t.popups.get("file.insert");
                    e && e.trigger("abortUpload");
                }), t.events.on("link.beforeRemove", h), t.$wp && (m(), t.events.on("contentChanged", m)), 
                u(!0);
            },
            showInsertPopup: function() {
                var e = t.$tb.find('.fr-command[data-cmd="insertFile"]'), n = t.popups.get("file.insert");
                if (n || (n = u()), r(), !n.hasClass("fr-active")) if (t.popups.refresh("file.insert"), 
                t.popups.setContainer("file.insert", t.$tb), e.is(":visible")) {
                    var i = e.offset().left + e.outerWidth() / 2, a = e.offset().top + (t.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                    t.popups.show("file.insert", i, a, e.outerHeight());
                } else t.position.forSelection(n), t.popups.show("file.insert");
            },
            upload: f,
            insert: a,
            back: function() {
                t.events.disableBlur(), t.selection.restore(), t.events.enableBlur(), t.popups.hide("file.insert"), 
                t.toolbar.showInline();
            },
            hideProgressBar: r
        };
    }, e.FE.DefineIcon("insertFile", {
        NAME: "file-o",
        FA5NAME: "file"
    }), e.FE.RegisterCommand("insertFile", {
        title: "Upload File",
        undo: !1,
        focus: !0,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("file.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), 
            this.selection.restore()), this.popups.hide("file.insert")) : this.file.showInsertPopup();
        },
        plugin: "file"
    }), e.FE.DefineIcon("fileBack", {
        NAME: "arrow-left"
    }), e.FE.RegisterCommand("fileBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.file.back();
        },
        refresh: function(e) {
            this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), 
            e.next(".fr-separator").addClass("fr-hidden"));
        }
    }), e.FE.RegisterCommand("fileDismissError", {
        title: "OK",
        callback: function() {
            this.file.hideProgressBar(!0);
        }
    }), e.extend(e.FE.DEFAULTS, {
        fontFamily: {
            "Arial,Helvetica,sans-serif": "Arial",
            "Georgia,serif": "Georgia",
            "Impact,Charcoal,sans-serif": "Impact",
            "Tahoma,Geneva,sans-serif": "Tahoma",
            "Times New Roman,Times,serif,-webkit-standard": "Times New Roman",
            "Verdana,Geneva,sans-serif": "Verdana"
        },
        fontFamilySelection: !1,
        fontFamilyDefaultSelection: "Font Family"
    }), e.FE.PLUGINS.fontFamily = function(t) {
        function n(t) {
            var n = t.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'| /g, "").split(",");
            return e.grep(n, function(e) {
                return 0 < e.length;
            });
        }
        function r(e, t) {
            for (var n = 0; n < e.length; n++) for (var r = 0; r < t.length; r++) if (e[n].toLowerCase() == t[r].toLowerCase()) return [ n, r ];
            return null;
        }
        function i() {
            var i = n(e(t.selection.element()).css("font-family")), a = [];
            for (var o in t.opts.fontFamily) if (t.opts.fontFamily.hasOwnProperty(o)) {
                var s = r(i, n(o));
                s && a.push([ o, s ]);
            }
            return 0 === a.length ? null : (a.sort(function(e, t) {
                var n = e[1][0] - t[1][0];
                return 0 === n ? e[1][1] - t[1][1] : n;
            }), a[0][0]);
        }
        return {
            apply: function(e) {
                t.format.applyStyle("font-family", e);
            },
            refreshOnShow: function(e, t) {
                t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), 
                t.find('.fr-command[data-param1="' + i() + '"]').addClass("fr-active").attr("aria-selected", !0);
                var n = t.find(".fr-dropdown-list"), r = t.find(".fr-active").parent();
                r.length ? n.parent().scrollTop(r.offset().top - n.offset().top - (n.parent().outerHeight() / 2 - r.outerHeight() / 2)) : n.parent().scrollTop(0);
            },
            refresh: function(n) {
                if (t.opts.fontFamilySelection) {
                    var r = e(t.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'|/g, "").split(",");
                    n.find("> span").text(t.opts.fontFamily[i()] || r[0] || t.language.translate(t.opts.fontFamilyDefaultSelection));
                }
            }
        };
    }, e.FE.RegisterCommand("fontFamily", {
        type: "dropdown",
        displaySelection: function(e) {
            return e.opts.fontFamilySelection;
        },
        defaultSelection: function(e) {
            return e.opts.fontFamilyDefaultSelection;
        },
        displaySelectionWidth: 120,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.fontFamily;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="' + n + '" style="font-family: ' + n + '" title="' + t[n] + '">' + t[n] + "</a></li>");
            return e += "</ul>";
        },
        title: "Font Family",
        callback: function(e, t) {
            this.fontFamily.apply(t);
        },
        refresh: function(e) {
            this.fontFamily.refresh(e);
        },
        refreshOnShow: function(e, t) {
            this.fontFamily.refreshOnShow(e, t);
        },
        plugin: "fontFamily"
    }), e.FE.DefineIcon("fontFamily", {
        NAME: "font"
    }), e.extend(e.FE.DEFAULTS, {
        fontSize: [ "8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96" ],
        fontSizeSelection: !1,
        fontSizeDefaultSelection: "12",
        fontSizeUnit: "px"
    }), e.FE.PLUGINS.fontSize = function(t) {
        return {
            apply: function(e) {
                t.format.applyStyle("font-size", e);
            },
            refreshOnShow: function(n, r) {
                var i = e(t.selection.element()).css("font-size");
                r.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), 
                r.find('.fr-command[data-param1="' + i + '"]').addClass("fr-active").attr("aria-selected", !0);
                var a = r.find(".fr-dropdown-list"), o = r.find(".fr-active").parent();
                o.length ? a.parent().scrollTop(o.offset().top - a.offset().top - (a.parent().outerHeight() / 2 - o.outerHeight() / 2)) : a.parent().scrollTop(0);
            },
            refresh: function(n) {
                if (t.opts.fontSizeSelection) {
                    var r = t.helpers.getPX(e(t.selection.element()).css("font-size"));
                    n.find("> span").text(r);
                }
            }
        };
    }, e.FE.RegisterCommand("fontSize", {
        type: "dropdown",
        title: "Font Size",
        displaySelection: function(e) {
            return e.opts.fontSizeSelection;
        },
        displaySelectionWidth: 30,
        defaultSelection: function(e) {
            return e.opts.fontSizeDefaultSelection;
        },
        html: function() {
            for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.fontSize, n = 0; n < t.length; n++) {
                var r = t[n];
                e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="' + r + this.opts.fontSizeUnit + '" title="' + r + '">' + r + "</a></li>";
            }
            return e += "</ul>";
        },
        callback: function(e, t) {
            this.fontSize.apply(t);
        },
        refresh: function(e) {
            this.fontSize.refresh(e);
        },
        refreshOnShow: function(e, t) {
            this.fontSize.refreshOnShow(e, t);
        },
        plugin: "fontSize"
    }), e.FE.DefineIcon("fontSize", {
        NAME: "text-height"
    }), e.extend(e.FE.POPUP_TEMPLATES, {
        "forms.edit": "[_BUTTONS_]",
        "forms.update": "[_BUTTONS_][_TEXT_LAYER_]"
    }), e.extend(e.FE.DEFAULTS, {
        formEditButtons: [ "inputStyle", "inputEdit" ],
        formStyles: {
            "fr-rounded": "Rounded",
            "fr-large": "Large"
        },
        formMultipleStyles: !0,
        formUpdateButtons: [ "inputBack", "|" ]
    }), e.FE.PLUGINS.forms = function(t) {
        function n(n) {
            n.preventDefault(), t.selection.clear(), e(this).data("mousedown", !0);
        }
        function r(t) {
            e(this).data("mousedown") && (t.stopPropagation(), e(this).removeData("mousedown"), 
            s(f = this)), t.preventDefault();
        }
        function i() {
            t.$el.find("input, textarea, button").removeData("mousedown");
        }
        function a() {
            e(this).removeData("mousedown");
        }
        function o() {
            return f || null;
        }
        function s(n) {
            var r = t.popups.get("forms.edit");
            r || (r = function() {
                var e = "";
                0 < t.opts.formEditButtons.length && (e = '<div class="fr-buttons">' + t.button.buildList(t.opts.formEditButtons) + "</div>");
                var n = {
                    buttons: e
                }, r = t.popups.create("forms.edit", n);
                return t.$wp && t.events.$on(t.$wp, "scroll.link-edit", function() {
                    o() && t.popups.isVisible("forms.edit") && s(o());
                }), r;
            }());
            var i = e(f = n);
            t.popups.refresh("forms.edit"), t.popups.setContainer("forms.edit", t.$sc);
            var a = i.offset().left + i.outerWidth() / 2, l = i.offset().top + i.outerHeight();
            t.popups.show("forms.edit", a, l, i.outerHeight());
        }
        function l() {
            var n = t.popups.get("forms.update"), r = o();
            if (r) {
                var i = e(r);
                i.is("button") ? n.find('input[type="text"][name="text"]').val(i.text()) : n.find('input[type="text"][name="text"]').val(i.attr("placeholder"));
            }
            n.find('input[type="text"][name="text"]').trigger("change");
        }
        function d() {
            f = null;
        }
        function c(e) {
            if (e) return t.popups.onRefresh("forms.update", l), t.popups.onHide("forms.update", d), 
            !0;
            var n = "";
            1 <= t.opts.formUpdateButtons.length && (n = '<div class="fr-buttons">' + t.button.buildList(t.opts.formUpdateButtons) + "</div>");
            var r = "", i = 0;
            r = '<div class="fr-forms-text-layer fr-layer fr-active">', r += '<div class="fr-input-line"><input name="text" type="text" placeholder="Text" tabIndex="' + ++i + '"></div>';
            var a = {
                buttons: n,
                text_layer: r += '<div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="updateInput" href="#" tabIndex="' + ++i + '" type="button">' + t.language.translate("Update") + "</button></div></div>"
            };
            return t.popups.create("forms.update", a);
        }
        var f;
        return {
            _init: function() {
                t.events.$on(t.$el, t._mousedown, "input, textarea, button", n), t.events.$on(t.$el, t._mouseup, "input, textarea, button", r), 
                t.events.$on(t.$el, "touchmove", "input, textarea, button", a), t.events.$on(t.$el, t._mouseup, i), 
                t.events.$on(t.$win, t._mouseup, i), c(!0), t.events.$on(t.$el, "submit", "form", function(e) {
                    return e.preventDefault(), !1;
                });
            },
            updateInput: function() {
                var n = t.popups.get("forms.update"), r = o();
                if (r) {
                    var i = e(r), a = n.find('input[type="text"][name="text"]').val() || "";
                    a.length && (i.is("button") ? i.text(a) : i.attr("placeholder", a)), t.popups.hide("forms.update"), 
                    s(r);
                }
            },
            getInput: o,
            applyStyle: function(n, r, i) {
                void 0 === r && (r = t.opts.formStyles), void 0 === i && (i = t.opts.formMultipleStyles);
                var a = o();
                if (!a) return !1;
                if (!i) {
                    var s = Object.keys(r);
                    s.splice(s.indexOf(n), 1), e(a).removeClass(s.join(" "));
                }
                e(a).toggleClass(n);
            },
            showUpdatePopup: function() {
                var n = o();
                if (n) {
                    var r = e(n), i = t.popups.get("forms.update");
                    i || (i = c()), t.popups.isVisible("forms.update") || t.popups.refresh("forms.update"), 
                    t.popups.setContainer("forms.update", t.$sc);
                    var a = r.offset().left + r.outerWidth() / 2, s = r.offset().top + r.outerHeight();
                    t.popups.show("forms.update", a, s, r.outerHeight());
                }
            },
            showEditPopup: s,
            back: function() {
                t.events.disableBlur(), t.selection.restore(), t.events.enableBlur();
                var e = o();
                e && t.$wp && ("BUTTON" == e.tagName && t.selection.restore(), s(e));
            }
        };
    }, e.FE.RegisterCommand("updateInput", {
        undo: !1,
        focus: !1,
        title: "Update",
        callback: function() {
            this.forms.updateInput();
        }
    }), e.FE.DefineIcon("inputStyle", {
        NAME: "magic"
    }), e.FE.RegisterCommand("inputStyle", {
        title: "Style",
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list">', t = this.opts.formStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li><a class="fr-command" tabIndex="-1" data-cmd="inputStyle" data-param1="' + n + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>";
        },
        callback: function(e, t) {
            var n = this.forms.getInput();
            n && (this.forms.applyStyle(t), this.forms.showEditPopup(n));
        },
        refreshOnShow: function(t, n) {
            var r = this.forms.getInput();
            if (r) {
                var i = e(r);
                n.find(".fr-command").each(function() {
                    var t = e(this).data("param1");
                    e(this).toggleClass("fr-active", i.hasClass(t));
                });
            }
        }
    }), e.FE.DefineIcon("inputEdit", {
        NAME: "edit"
    }), e.FE.RegisterCommand("inputEdit", {
        title: "Edit Button",
        undo: !1,
        refreshAfterCallback: !1,
        callback: function() {
            this.forms.showUpdatePopup();
        }
    }), e.FE.DefineIcon("inputBack", {
        NAME: "arrow-left"
    }), e.FE.RegisterCommand("inputBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.forms.back();
        }
    }), e.FE.RegisterCommand("updateInput", {
        undo: !1,
        focus: !1,
        title: "Update",
        callback: function() {
            this.forms.updateInput();
        }
    }), e.FE.PLUGINS.fullscreen = function(t) {
        function n() {
            return t.$box.hasClass("fr-fullscreen");
        }
        function r() {
            if (t.helpers.isIOS() && t.core.hasFocus()) return t.$el.blur(), setTimeout(a, 250), 
            !1;
            s = t.helpers.scrollTop(), t.$box.toggleClass("fr-fullscreen"), e("body:first").toggleClass("fr-fullscreen"), 
            t.helpers.isMobile() && (t.$tb.data("parent", t.$tb.parent()), t.$tb.prependTo(t.$box), 
            t.$tb.data("sticky-dummy") && t.$tb.after(t.$tb.data("sticky-dummy"))), l = t.opts.height, 
            d = t.opts.heightMax, c = t.opts.zIndex, t.position.refresh(), t.opts.height = t.o_win.innerHeight - (t.opts.toolbarInline ? 0 : t.$tb.outerHeight()), 
            t.opts.zIndex = 2147483641, t.opts.heightMax = null, t.size.refresh(), t.opts.toolbarInline && t.toolbar.showInline();
            for (var n = t.$box.parent(); !n.is("body:first"); ) n.data("z-index", n.css("z-index")).data("overflow", n.css("overflow")).css("z-index", "2147483640").css("overflow", "visible"), 
            n = n.parent();
            t.opts.toolbarContainer && t.$box.prepend(t.$tb), t.events.trigger("charCounter.update"), 
            t.events.trigger("codeView.update"), t.$win.trigger("scroll");
        }
        function i() {
            if (t.helpers.isIOS() && t.core.hasFocus()) return t.$el.blur(), setTimeout(a, 250), 
            !1;
            t.$box.toggleClass("fr-fullscreen"), e("body:first").toggleClass("fr-fullscreen"), 
            t.$tb.prependTo(t.$tb.data("parent")), t.$tb.data("sticky-dummy") && t.$tb.after(t.$tb.data("sticky-dummy")), 
            t.opts.height = l, t.opts.heightMax = d, t.opts.zIndex = c, t.size.refresh(), e(t.o_win).scrollTop(s), 
            t.opts.toolbarInline && t.toolbar.showInline(), t.events.trigger("charCounter.update"), 
            t.opts.toolbarSticky && t.opts.toolbarStickyOffset && (t.opts.toolbarBottom ? t.$tb.css("bottom", t.opts.toolbarStickyOffset).data("bottom", t.opts.toolbarStickyOffset) : t.$tb.css("top", t.opts.toolbarStickyOffset).data("top", t.opts.toolbarStickyOffset));
            for (var n = t.$box.parent(); !n.is("body:first"); ) n.data("z-index") && (n.css("z-index", ""), 
            n.css("z-index") != n.data("z-index") && n.css("z-index", n.data("z-index")), n.removeData("z-index")), 
            n.data("overflow") ? (n.css("overflow", ""), n.css("overflow") != n.data("overflow") && n.css("overflow", n.data("overflow"))) : n.css("overflow", ""), 
            n.removeData("overflow"), n = n.parent();
            t.opts.toolbarContainer && e(t.opts.toolbarContainer).append(t.$tb), e(t.o_win).trigger("scroll"), 
            t.events.trigger("codeView.update");
        }
        function a() {
            n() ? i() : r(), o(t.$tb.find('.fr-command[data-cmd="fullscreen"]'));
        }
        function o(e) {
            var r = n();
            e.toggleClass("fr-active", r).attr("aria-pressed", r), e.find("> *:not(.fr-sr-only)").replaceWith(r ? t.icon.create("fullscreenCompress") : t.icon.create("fullscreen"));
        }
        var s, l, d, c;
        return {
            _init: function() {
                if (!t.$wp) return !1;
                t.events.$on(e(t.o_win), "resize", function() {
                    n() && (i(), r());
                }), t.events.on("toolbar.hide", function() {
                    if (n() && t.helpers.isMobile()) return !1;
                }), t.events.on("position.refresh", function() {
                    if (t.helpers.isIOS()) return !n();
                }), t.events.on("destroy", function() {
                    n() && i();
                }, !0);
            },
            toggle: a,
            refresh: o,
            isActive: n
        };
    }, e.FE.RegisterCommand("fullscreen", {
        title: "Fullscreen",
        undo: !1,
        focus: !1,
        accessibilityFocus: !0,
        forcedRefresh: !0,
        toggle: !0,
        callback: function() {
            this.fullscreen.toggle();
        },
        refresh: function(e) {
            this.fullscreen.refresh(e);
        },
        plugin: "fullscreen"
    }), e.FE.DefineIcon("fullscreen", {
        NAME: "expand"
    }), e.FE.DefineIcon("fullscreenCompress", {
        NAME: "compress"
    }), e.extend(e.FE.DEFAULTS, {
        helpSets: [ {
            title: "Inline Editor",
            commands: [ {
                val: "OSkeyE",
                desc: "Show the editor"
            } ]
        }, {
            title: "Common actions",
            commands: [ {
                val: "OSkeyC",
                desc: "Copy"
            }, {
                val: "OSkeyX",
                desc: "Cut"
            }, {
                val: "OSkeyV",
                desc: "Paste"
            }, {
                val: "OSkeyZ",
                desc: "Undo"
            }, {
                val: "OSkeyShift+Z",
                desc: "Redo"
            }, {
                val: "OSkeyK",
                desc: "Insert Link"
            }, {
                val: "OSkeyP",
                desc: "Insert Image"
            } ]
        }, {
            title: "Basic Formatting",
            commands: [ {
                val: "OSkeyA",
                desc: "Select All"
            }, {
                val: "OSkeyB",
                desc: "Bold"
            }, {
                val: "OSkeyI",
                desc: "Italic"
            }, {
                val: "OSkeyU",
                desc: "Underline"
            }, {
                val: "OSkeyS",
                desc: "Strikethrough"
            }, {
                val: "OSkey]",
                desc: "Increase Indent"
            }, {
                val: "OSkey[",
                desc: "Decrease Indent"
            } ]
        }, {
            title: "Quote",
            commands: [ {
                val: "OSkey'",
                desc: "Increase quote level"
            }, {
                val: "OSkeyShift+'",
                desc: "Decrease quote level"
            } ]
        }, {
            title: "Image / Video",
            commands: [ {
                val: "OSkey+",
                desc: "Resize larger"
            }, {
                val: "OSkey-",
                desc: "Resize smaller"
            } ]
        }, {
            title: "Table",
            commands: [ {
                val: "Alt+Space",
                desc: "Select table cell"
            }, {
                val: "Shift+Left/Right arrow",
                desc: "Extend selection one cell"
            }, {
                val: "Shift+Up/Down arrow",
                desc: "Extend selection one row"
            } ]
        }, {
            title: "Navigation",
            commands: [ {
                val: "OSkey/",
                desc: "Shortcuts"
            }, {
                val: "Alt+F10",
                desc: "Focus popup / toolbar"
            }, {
                val: "Esc",
                desc: "Return focus to previous position"
            } ]
        } ]
    }), e.FE.PLUGINS.help = function(t) {
        var n, r = "help";
        return {
            _init: function() {},
            show: function() {
                if (!n) {
                    var i = "<h4>" + t.language.translate("Shortcuts") + "</h4>", a = function() {
                        for (var e = '<div class="fr-help-modal">', n = 0; n < t.opts.helpSets.length; n++) {
                            var r = t.opts.helpSets[n], i = "<table>";
                            i += "<thead><tr><th>" + t.language.translate(r.title) + "</th></tr></thead>", i += "<tbody>";
                            for (var a = 0; a < r.commands.length; a++) {
                                var o = r.commands[a];
                                i += "<tr>", i += "<td>" + t.language.translate(o.desc) + "</td>", i += "<td>" + o.val.replace("OSkey", t.helpers.isMac() ? "&#8984;" : "Ctrl+") + "</td>", 
                                i += "</tr>";
                            }
                            e += i += "</tbody></table>";
                        }
                        return e += "</div>";
                    }(), o = t.modals.create(r, i, a);
                    n = o.$modal, o.$head, o.$body, t.events.$on(e(t.o_win), "resize", function() {
                        t.modals.resize(r);
                    });
                }
                t.modals.show(r), t.modals.resize(r);
            },
            hide: function() {
                t.modals.hide(r);
            }
        };
    }, e.FroalaEditor.DefineIcon("help", {
        NAME: "question"
    }), e.FE.RegisterShortcut(e.FE.KEYCODE.SLASH, "help", null, "/"), e.FE.RegisterCommand("help", {
        title: "Help",
        icon: "help",
        undo: !1,
        focus: !1,
        modal: !0,
        callback: function() {
            this.help.show();
        },
        plugin: "help",
        showOnMobile: !1
    }), e.extend(e.FE.POPUP_TEMPLATES, {
        "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]",
        "image.edit": "[_BUTTONS_]",
        "image.alt": "[_BUTTONS_][_ALT_LAYER_]",
        "image.size": "[_BUTTONS_][_SIZE_LAYER_]"
    }), e.extend(e.FE.DEFAULTS, {
        imageInsertButtons: [ "imageBack", "|", "imageUpload", "imageByURL" ],
        imageEditButtons: [ "imageReplace", "imageAlign", "imageCaption", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize" ],
        imageAltButtons: [ "imageBack", "|" ],
        imageSizeButtons: [ "imageBack", "|" ],
        imageUpload: !0,
        imageUploadURL: "https://i.froala.com/upload",
        imageCORSProxy: "https://cors-anywhere.froala.com",
        imageUploadRemoteUrls: !0,
        imageUploadParam: "file",
        imageUploadParams: {},
        imageUploadToS3: !1,
        imageUploadMethod: "POST",
        imageMaxSize: 10485760,
        imageAllowedTypes: [ "jpeg", "jpg", "png", "gif" ],
        imageResize: !0,
        imageResizeWithPercent: !1,
        imageRoundPercent: !1,
        imageDefaultWidth: 300,
        imageDefaultAlign: "center",
        imageDefaultDisplay: "block",
        imageSplitHTML: !1,
        imageStyles: {
            "fr-rounded": "Rounded",
            "fr-bordered": "Bordered",
            "fr-shadow": "Shadow"
        },
        imageMove: !0,
        imageMultipleStyles: !0,
        imageTextNear: !0,
        imagePaste: !0,
        imagePasteProcess: !1,
        imageMinWidth: 16,
        imageOutputSize: !1,
        imageDefaultMargin: 5
    }), e.FE.PLUGINS.image = function(t) {
        function n() {
            var e = t.popups.get("image.insert").find(".fr-image-by-url-layer input");
            e.val(""), re && e.val(re.attr("src")), e.trigger("change");
        }
        function r() {
            var e = t.popups.get("image.edit");
            if (e || (e = h()), e) {
                var n = te();
                ne() && (n = n.find(".fr-img-wrap")), t.popups.setContainer("image.edit", t.$sc), 
                t.popups.refresh("image.edit");
                var r = n.offset().left + n.outerWidth() / 2, i = n.offset().top + n.outerHeight();
                t.popups.show("image.edit", r, i, n.outerHeight());
            }
        }
        function i() {
            m();
        }
        function a() {
            for (var n, r, i = "IMG" == t.el.tagName ? [ t.el ] : t.el.querySelectorAll("img"), a = 0; a < i.length; a++) {
                var o = e(i[a]);
                !t.opts.htmlUntouched && t.opts.useClasses ? ((t.opts.imageDefaultAlign || t.opts.imageDefaultDisplay) && (0 < (r = o).parents(".fr-img-caption").length && (r = r.parents(".fr-img-caption:first")), 
                r.hasClass("fr-dii") || r.hasClass("fr-dib") || (r.addClass("fr-fi" + j(r)[0]), 
                r.addClass("fr-di" + Q(r)[0]), r.css("margin", ""), r.css("float", ""), r.css("display", ""), 
                r.css("z-index", ""), r.css("position", ""), r.css("overflow", ""), r.css("vertical-align", ""))), 
                t.opts.imageTextNear || (0 < o.parents(".fr-img-caption").length ? o.parents(".fr-img-caption:first").removeClass("fr-dii").addClass("fr-dib") : o.removeClass("fr-dii").addClass("fr-dib"))) : t.opts.htmlUntouched || t.opts.useClasses || (t.opts.imageDefaultAlign || t.opts.imageDefaultDisplay) && (0 < (n = o).parents(".fr-img-caption").length && (n = n.parents(".fr-img-caption:first")), 
                q(n, n.hasClass("fr-dib") ? "block" : n.hasClass("fr-dii") ? "inline" : null, n.hasClass("fr-fil") ? "left" : n.hasClass("fr-fir") ? "right" : j(n)), 
                n.removeClass("fr-dib fr-dii fr-fir fr-fil")), t.opts.iframe && o.on("load", t.size.syncIframe);
            }
        }
        function o(n) {
            void 0 === n && (n = !0);
            var r, i = Array.prototype.slice.call(t.el.querySelectorAll("img")), a = [];
            for (r = 0; r < i.length; r++) if (a.push(i[r].getAttribute("src")), e(i[r]).toggleClass("fr-draggable", t.opts.imageMove), 
            "" === i[r].getAttribute("class") && i[r].removeAttribute("class"), "" === i[r].getAttribute("style") && i[r].removeAttribute("style"), 
            i[r].parentNode && i[r].parentNode.parentNode && t.node.hasClass(i[r].parentNode.parentNode, "fr-img-caption")) {
                var o = i[r].parentNode.parentNode;
                t.browser.mozilla || o.setAttribute("contenteditable", !1), o.setAttribute("draggable", !1), 
                o.classList.add("fr-draggable");
                var s = i[r].nextSibling;
                s && s.setAttribute("contenteditable", !0);
            }
            if (se) for (r = 0; r < se.length; r++) a.indexOf(se[r].getAttribute("src")) < 0 && t.events.trigger("image.removed", [ e(se[r]) ]);
            if (se && n) {
                var l = [];
                for (r = 0; r < se.length; r++) l.push(se[r].getAttribute("src"));
                for (r = 0; r < i.length; r++) l.indexOf(i[r].getAttribute("src")) < 0 && t.events.trigger("image.loaded", [ e(i[r]) ]);
            }
            se = i;
        }
        function s() {
            if (ie || function() {
                var n;
                if (t.shared.$image_resizer ? (ie = t.shared.$image_resizer, oe = t.shared.$img_overlay, 
                t.events.on("destroy", function() {
                    ie.removeClass("fr-active").appendTo(e("body:first"));
                }, !0)) : (t.shared.$image_resizer = e('<div class="fr-image-resizer"></div>'), 
                ie = t.shared.$image_resizer, t.events.$on(ie, "mousedown", function(e) {
                    e.stopPropagation();
                }, !0), t.opts.imageResize && (ie.append(l("nw") + l("ne") + l("sw") + l("se")), 
                t.shared.$img_overlay = e('<div class="fr-image-overlay"></div>'), oe = t.shared.$img_overlay, 
                n = ie.get(0).ownerDocument, e(n).find("body:first").append(oe))), t.events.on("shared.destroy", function() {
                    ie.html("").removeData().remove(), ie = null, t.opts.imageResize && (oe.remove(), 
                    oe = null);
                }, !0), t.helpers.isMobile() || t.events.$on(e(t.o_win), "resize", function() {
                    re && !re.hasClass("fr-uploading") ? G(!0) : re && (s(), Z(), g(!1));
                }), t.opts.imageResize) {
                    n = ie.get(0).ownerDocument, t.events.$on(ie, t._mousedown, ".fr-handler", c), t.events.$on(e(n), t._mousemove, f), 
                    t.events.$on(e(n.defaultView || n.parentWindow), t._mouseup, p), t.events.$on(oe, "mouseleave", p);
                    var r = 1, i = null, a = 0;
                    t.events.on("keydown", function(n) {
                        if (re) {
                            var o = -1 != navigator.userAgent.indexOf("Mac OS X") ? n.metaKey : n.ctrlKey, s = n.which;
                            (s !== i || 200 < n.timeStamp - a) && (r = 1), (s == e.FE.KEYCODE.EQUALS || t.browser.mozilla && s == e.FE.KEYCODE.FF_EQUALS) && o && !n.altKey ? r = M.call(this, n, 1, 1, r) : (s == e.FE.KEYCODE.HYPHEN || t.browser.mozilla && s == e.FE.KEYCODE.FF_HYPHEN) && o && !n.altKey ? r = M.call(this, n, 2, -1, r) : t.keys.ctrlKey(n) || s != e.FE.KEYCODE.ENTER || (re.before("<br>"), 
                            E(re)), i = s, a = n.timeStamp;
                        }
                    }, !0), t.events.on("keyup", function() {
                        r = 1;
                    });
                }
            }(), !re) return !1;
            var n = t.$wp || t.$sc;
            n.append(ie), ie.data("instance", t);
            var r = n.scrollTop() - ("static" != n.css("position") ? n.offset().top : 0), i = n.scrollLeft() - ("static" != n.css("position") ? n.offset().left : 0);
            i -= t.helpers.getPX(n.css("border-left-width")), r -= t.helpers.getPX(n.css("border-top-width")), 
            t.$el.is("img") && t.$sc.is("body") && (i = r = 0);
            var a = te();
            ne() && (a = a.find(".fr-img-wrap")), ie.css("top", (t.opts.iframe ? a.offset().top : a.offset().top + r) - 1).css("left", (t.opts.iframe ? a.offset().left : a.offset().left + i) - 1).css("width", a.get(0).getBoundingClientRect().width).css("height", a.get(0).getBoundingClientRect().height).addClass("fr-active");
        }
        function l(e) {
            return '<div class="fr-handler fr-h' + e + '"></div>';
        }
        function d(e) {
            ne() ? re.parents(".fr-img-caption").css("width", e) : re.css("width", e);
        }
        function c(n) {
            if (!t.core.sameInstance(ie)) return !0;
            if (n.preventDefault(), n.stopPropagation(), t.$el.find("img.fr-error").left) return !1;
            t.undo.canDo() || t.undo.saveStep();
            var r = n.pageX || n.originalEvent.touches[0].pageX;
            if ("mousedown" == n.type) {
                var i = t.$oel.get(0).ownerDocument, a = i.defaultView || i.parentWindow, o = !1;
                try {
                    o = a.location != a.parent.location && !(a.$ && a.$.FE);
                } catch (e) {}
                o && a.frameElement && (r += t.helpers.getPX(e(a.frameElement).offset().left) + a.frameElement.clientLeft);
            }
            (ae = e(this)).data("start-x", r), ae.data("start-width", re.width()), ae.data("start-height", re.height());
            var s = re.width();
            if (t.opts.imageResizeWithPercent) {
                var l = re.parentsUntil(t.$el, t.html.blockTagsQuery()).get(0) || t.el;
                s = (s / e(l).outerWidth() * 100).toFixed(2) + "%";
            }
            d(s), oe.show(), t.popups.hideAll(), X();
        }
        function f(n) {
            if (!t.core.sameInstance(ie)) return !0;
            var r;
            if (ae && re) {
                if (n.preventDefault(), t.$el.find("img.fr-error").left) return !1;
                var i = n.pageX || (n.originalEvent.touches ? n.originalEvent.touches[0].pageX : null);
                if (!i) return !1;
                var a = i - ae.data("start-x"), o = ae.data("start-width");
                if ((ae.hasClass("fr-hnw") || ae.hasClass("fr-hsw")) && (a = 0 - a), t.opts.imageResizeWithPercent) {
                    var l = re.parentsUntil(t.$el, t.html.blockTagsQuery()).get(0) || t.el;
                    o = ((o + a) / e(l).outerWidth() * 100).toFixed(2), t.opts.imageRoundPercent && (o = Math.round(o)), 
                    d(o + "%"), (r = ne() ? (t.helpers.getPX(re.parents(".fr-img-caption").css("width")) / e(l).outerWidth() * 100).toFixed(2) : (t.helpers.getPX(re.css("width")) / e(l).outerWidth() * 100).toFixed(2)) === o || t.opts.imageRoundPercent || d(r + "%"), 
                    re.css("height", "").removeAttr("height");
                } else o + a >= t.opts.imageMinWidth && (d(o + a), r = ne() ? t.helpers.getPX(re.parents(".fr-img-caption").css("width")) : t.helpers.getPX(re.css("width"))), 
                r !== o + a && d(r), ((re.attr("style") || "").match(/(^height:)|(; *height:)/) || re.attr("height")) && (re.css("height", ae.data("start-height") * re.width() / ae.data("start-width")), 
                re.removeAttr("height"));
                s(), t.events.trigger("image.resize", [ ee() ]);
            }
        }
        function p(e) {
            if (!t.core.sameInstance(ie)) return !0;
            if (ae && re) {
                if (e && e.stopPropagation(), t.$el.find("img.fr-error").left) return !1;
                ae = null, oe.hide(), s(), r(), t.undo.saveStep(), t.events.trigger("image.resizeEnd", [ ee() ]);
            }
        }
        function u(e, n, r) {
            t.edit.on(), re && re.addClass("fr-error"), function(e) {
                g();
                var n = t.popups.get("image.insert").find(".fr-image-progress-bar-layer");
                n.addClass("fr-error");
                var r = n.find("h3");
                r.text(e), t.events.disableBlur(), r.focus();
            }(t.language.translate("Something went wrong. Please try again.")), !re && r && $(r), 
            t.events.trigger("image.error", [ {
                code: e,
                message: ve[e]
            }, n, r ]);
        }
        function h(e) {
            if (e) return t.$wp && t.events.$on(t.$wp, "scroll", function() {
                re && t.popups.isVisible("image.edit") && (t.events.disableBlur(), E(re));
            }), !0;
            var n = "";
            if (0 < t.opts.imageEditButtons.length) {
                n += '<div class="fr-buttons">', n += t.button.buildList(t.opts.imageEditButtons);
                var r = {
                    buttons: n += "</div>"
                };
                return t.popups.create("image.edit", r);
            }
            return !1;
        }
        function g(e) {
            var n = t.popups.get("image.insert");
            if (n || (n = N()), n.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), 
            n.find(".fr-image-progress-bar-layer").addClass("fr-active"), n.find(".fr-buttons").hide(), 
            re) {
                var r = te();
                t.popups.setContainer("image.insert", t.$sc);
                var i = r.offset().left + r.width() / 2, a = r.offset().top + r.height();
                t.popups.show("image.insert", i, a, r.outerHeight());
            }
            void 0 === e && v(t.language.translate("Uploading"), 0);
        }
        function m(e) {
            var n = t.popups.get("image.insert");
            if (n && (n.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), 
            n.find(".fr-image-progress-bar-layer").removeClass("fr-active"), n.find(".fr-buttons").show(), 
            e || t.$el.find("img.fr-error").length)) {
                if (t.events.focus(), t.$el.find("img.fr-error").length && (t.$el.find("img.fr-error").remove(), 
                t.undo.saveStep(), t.undo.run(), t.undo.dropRedo()), !t.$wp && re) {
                    var r = re;
                    G(!0), t.selection.setAfter(r.get(0)), t.selection.restore();
                }
                t.popups.hide("image.insert");
            }
        }
        function v(e, n) {
            var r = t.popups.get("image.insert");
            if (r) {
                var i = r.find(".fr-image-progress-bar-layer");
                i.find("h3").text(e + (n ? " " + n + "%" : "")), i.removeClass("fr-error"), n ? (i.find("div").removeClass("fr-indeterminate"), 
                i.find("div > span").css("width", n + "%")) : i.find("div").addClass("fr-indeterminate");
            }
        }
        function E(e) {
            z.call(e.get(0));
        }
        function b() {
            var n = e(this);
            t.popups.hide("image.insert"), n.removeClass("fr-uploading"), n.next().is("br") && n.next().remove(), 
            E(n), t.events.trigger("image.loaded", [ n ]);
        }
        function T(e, n, r, i, a) {
            t.edit.off(), v(t.language.translate("Loading image")), n && (e = t.helpers.sanitizeURL(e));
            var s = new Image();
            s.onload = function() {
                var n, s;
                if (i) {
                    t.undo.canDo() || i.hasClass("fr-uploading") || t.undo.saveStep();
                    var l = i.data("fr-old-src");
                    i.data("fr-image-pasted") && (l = null), t.$wp ? ((n = i.clone().removeData("fr-old-src").removeClass("fr-uploading").removeAttr("data-fr-image-pasted")).off("load"), 
                    l && i.attr("src", l), i.replaceWith(n)) : n = i;
                    for (var d = n.get(0).attributes, c = 0; c < d.length; c++) {
                        var f = d[c];
                        0 === f.nodeName.indexOf("data-") && n.removeAttr(f.nodeName);
                    }
                    if (void 0 !== r) for (s in r) r.hasOwnProperty(s) && "link" != s && n.attr("data-" + s, r[s]);
                    n.on("load", b), n.attr("src", e), t.edit.on(), o(!1), t.undo.saveStep(), t.events.disableBlur(), 
                    t.$el.blur(), t.events.trigger(l ? "image.replaced" : "image.inserted", [ n, a ]);
                } else n = C(e, r, b), o(!1), t.undo.saveStep(), t.$el.blur(), t.events.trigger("image.inserted", [ n, a ]);
            }, s.onerror = function() {
                u(ce);
            }, g(t.language.translate("Loading image")), s.src = e;
        }
        function A(n) {
            v(t.language.translate("Loading image"));
            var r = this.status, i = this.response, a = this.responseXML, o = this.responseText;
            try {
                if (t.opts.imageUploadToS3) if (201 == r) {
                    var s = function(n) {
                        try {
                            var r = e(n).find("Location").text(), i = e(n).find("Key").text();
                            return !1 === t.events.trigger("image.uploadedToS3", [ r, i, n ], !0) ? (t.edit.on(), 
                            !1) : r;
                        } catch (e) {
                            return u(ue, n), !1;
                        }
                    }(a);
                    s && T(s, !1, [], n, i || a);
                } else u(ue, i || a, n); else if (200 <= r && r < 300) {
                    var l = function(e) {
                        try {
                            if (!1 === t.events.trigger("image.uploaded", [ e ], !0)) return t.edit.on(), !1;
                            var n = JSON.parse(e);
                            return n.link ? n : (u(fe, e), !1);
                        } catch (t) {
                            return u(ue, e), !1;
                        }
                    }(o);
                    l && T(l.link, !1, l, n, i || o);
                } else u(pe, i || o, n);
            } catch (e) {
                u(ue, i || o, n);
            }
        }
        function S() {
            u(ue, this.response || this.responseText || this.responseXML);
        }
        function R(e) {
            if (e.lengthComputable) {
                var n = e.loaded / e.total * 100 | 0;
                v(t.language.translate("Uploading"), n);
            }
        }
        function C(n, r, i) {
            var a, o = "";
            if (r && void 0 !== r) for (a in r) r.hasOwnProperty(a) && "link" != a && (o += " data-" + a + '="' + r[a] + '"');
            var s = t.opts.imageDefaultWidth;
            s && "auto" != s && (s += t.opts.imageResizeWithPercent ? "%" : "px");
            var l = e('<img src="' + n + '"' + o + (s ? ' style="width: ' + s + ';"' : "") + ">");
            q(l, t.opts.imageDefaultDisplay, t.opts.imageDefaultAlign), l.on("load", i), l.on("error", function() {
                e(this).addClass("fr-error"), u(me);
            }), t.edit.on(), t.events.focus(!0), t.selection.restore(), t.undo.saveStep(), t.opts.imageSplitHTML ? t.markers.split() : t.markers.insert(), 
            t.html.wrap();
            var d = t.$el.find(".fr-marker");
            return d.length ? (d.parent().is("hr") && d.parent().after(d), t.node.isLastSibling(d) && d.parent().hasClass("fr-deletable") && d.insertAfter(d.parent()), 
            d.replaceWith(l)) : t.$el.append(l), t.selection.clear(), l;
        }
        function y() {
            t.edit.on(), m(!0);
        }
        function _(n, r) {
            if (void 0 !== n && 0 < n.length) {
                if (!1 === t.events.trigger("image.beforeUpload", [ n, r ])) return !1;
                var i, a = n[0];
                if (a.name || (a.name = new Date().getTime() + "." + (a.type || "image/jpeg").replace(/image\//g, "")), 
                a.size > t.opts.imageMaxSize) return u(he), !1;
                if (t.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, "")) < 0) return u(ge), 
                !1;
                if (t.drag_support.formdata && (i = t.drag_support.formdata ? new FormData() : null), 
                i) {
                    var o;
                    if (!1 !== t.opts.imageUploadToS3) for (o in i.append("key", t.opts.imageUploadToS3.keyStart + new Date().getTime() + "-" + (a.name || "untitled")), 
                    i.append("success_action_status", "201"), i.append("X-Requested-With", "xhr"), i.append("Content-Type", a.type), 
                    t.opts.imageUploadToS3.params) t.opts.imageUploadToS3.params.hasOwnProperty(o) && i.append(o, t.opts.imageUploadToS3.params[o]);
                    for (o in t.opts.imageUploadParams) t.opts.imageUploadParams.hasOwnProperty(o) && i.append(o, t.opts.imageUploadParams[o]);
                    i.append(t.opts.imageUploadParam, a, a.name);
                    var l = t.opts.imageUploadURL;
                    t.opts.imageUploadToS3 && (l = t.opts.imageUploadToS3.uploadURL ? t.opts.imageUploadToS3.uploadURL : "https://" + t.opts.imageUploadToS3.region + ".amazonaws.com/" + t.opts.imageUploadToS3.bucket), 
                    function(n, r, i, a) {
                        function o() {
                            var i = e(this);
                            i.off("load"), i.addClass("fr-uploading"), i.next().is("br") && i.next().remove(), 
                            t.placeholder.refresh(), E(i), s(), g(), t.edit.off(), n.onload = function() {
                                A.call(n, i);
                            }, n.onerror = S, n.upload.onprogress = R, n.onabort = y, i.off("abortUpload").on("abortUpload", function() {
                                4 != n.readyState && n.abort();
                            }), n.send(r);
                        }
                        var l = new FileReader();
                        l.addEventListener("load", function() {
                            var e = l.result;
                            if (l.result.indexOf("svg+xml") < 0) {
                                for (var n = atob(l.result.split(",")[1]), r = [], i = 0; i < n.length; i++) r.push(n.charCodeAt(i));
                                e = window.URL.createObjectURL(new Blob([ new Uint8Array(r) ], {
                                    type: "image/jpeg"
                                }));
                            }
                            a ? (a.on("load", o), a.one("error", function() {
                                a.off("load"), a.attr("src", a.data("fr-old-src")), u(me);
                            }), t.edit.on(), t.undo.saveStep(), a.data("fr-old-src", a.attr("src")), a.attr("src", e)) : C(e, null, o);
                        }, !1), l.readAsDataURL(i);
                    }(t.core.getXHR(l, t.opts.imageUploadMethod), i, a, r || re);
                }
            }
        }
        function L(e) {
            if (e.is("img") && 0 < e.parents(".fr-img-caption").length) return e.parents(".fr-img-caption");
        }
        function x(n) {
            var r = n.originalEvent.dataTransfer;
            if (r && r.files && r.files.length) {
                var i = r.files[0];
                if (i && i.type && -1 !== i.type.indexOf("image") && 0 <= t.opts.imageAllowedTypes.indexOf(i.type.replace(/image\//g, ""))) {
                    if (!t.opts.imageUpload) return n.preventDefault(), n.stopPropagation(), !1;
                    t.markers.remove(), t.markers.insertAtPoint(n.originalEvent), t.$el.find(".fr-marker").replaceWith(e.FE.MARKERS), 
                    0 === t.$el.find(".fr-marker").length && t.selection.setAtEnd(t.el), t.popups.hideAll();
                    var a = t.popups.get("image.insert");
                    a || (a = N()), t.popups.setContainer("image.insert", t.$sc);
                    var o = n.originalEvent.pageX, s = n.originalEvent.pageY;
                    return t.opts.iframe && (s += t.$iframe.offset().top, o += t.$iframe.offset().left), 
                    t.popups.show("image.insert", o, s), g(), 0 <= t.opts.imageAllowedTypes.indexOf(i.type.replace(/image\//g, "")) ? (G(!0), 
                    _(r.files)) : u(ge), n.preventDefault(), n.stopPropagation(), !1;
                }
            }
        }
        function N(r) {
            if (r) return t.popups.onRefresh("image.insert", n), t.popups.onHide("image.insert", i), 
            !0;
            var a, o = "";
            t.opts.imageUpload || t.opts.imageInsertButtons.splice(t.opts.imageInsertButtons.indexOf("imageUpload"), 1), 
            1 < t.opts.imageInsertButtons.length && (o = '<div class="fr-buttons">' + t.button.buildList(t.opts.imageInsertButtons) + "</div>");
            var s = t.opts.imageInsertButtons.indexOf("imageUpload"), l = t.opts.imageInsertButtons.indexOf("imageByURL"), d = "";
            0 <= s && (a = " fr-active", 0 <= l && l < s && (a = ""), d = '<div class="fr-image-upload-layer' + a + ' fr-layer" id="fr-image-upload-layer-' + t.id + '"><strong>' + t.language.translate("Drop image") + "</strong><br>(" + t.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="image/' + t.opts.imageAllowedTypes.join(", image/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-' + t.id + '" role="button"></div></div>');
            var c = "";
            0 <= l && (a = " fr-active", 0 <= s && s < l && (a = ""), c = '<div class="fr-image-by-url-layer' + a + ' fr-layer" id="fr-image-by-url-layer-' + t.id + '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-' + t.id + '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">' + t.language.translate("Insert") + "</button></div></div>");
            var f, p = {
                buttons: o,
                upload_layer: d,
                by_url_layer: c,
                progress_bar: '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>'
            }, u = t.popups.create("image.insert", p);
            return t.$wp && t.events.$on(t.$wp, "scroll", function() {
                re && t.popups.isVisible("image.insert") && Z();
            }), f = u, t.events.$on(f, "dragover dragenter", ".fr-image-upload-layer", function() {
                return e(this).addClass("fr-drop"), !1;
            }, !0), t.events.$on(f, "dragleave dragend", ".fr-image-upload-layer", function() {
                return e(this).removeClass("fr-drop"), !1;
            }, !0), t.events.$on(f, "drop", ".fr-image-upload-layer", function(n) {
                n.preventDefault(), n.stopPropagation(), e(this).removeClass("fr-drop");
                var r = n.originalEvent.dataTransfer;
                if (r && r.files) {
                    var i = f.data("instance") || t;
                    i.events.disableBlur(), i.image.upload(r.files), i.events.enableBlur();
                }
            }, !0), t.helpers.isIOS() && t.events.$on(f, "touchstart", '.fr-image-upload-layer input[type="file"]', function() {
                e(this).trigger("click");
            }, !0), t.events.$on(f, "change", '.fr-image-upload-layer input[type="file"]', function() {
                if (this.files) {
                    var n = f.data("instance") || t;
                    n.events.disableBlur(), f.find("input:focus").blur(), n.events.enableBlur(), n.image.upload(this.files, re);
                }
                e(this).val("");
            }, !0), u;
        }
        function w() {
            re && t.popups.get("image.alt").find("input").val(re.attr("alt") || "").trigger("change");
        }
        function O() {
            var e = t.popups.get("image.alt");
            e || (e = I()), m(), t.popups.refresh("image.alt"), t.popups.setContainer("image.alt", t.$sc);
            var n = te();
            ne() && (n = n.find(".fr-img-wrap"));
            var r = n.offset().left + n.outerWidth() / 2, i = n.offset().top + n.outerHeight();
            t.popups.show("image.alt", r, i, n.outerHeight());
        }
        function I(e) {
            if (e) return t.popups.onRefresh("image.alt", w), !0;
            var n = {
                buttons: '<div class="fr-buttons">' + t.button.buildList(t.opts.imageAltButtons) + "</div>",
                alt_layer: '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-' + t.id + '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-' + t.id + '" type="text" placeholder="' + t.language.translate("Alternate Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">' + t.language.translate("Update") + "</button></div></div>"
            }, r = t.popups.create("image.alt", n);
            return t.$wp && t.events.$on(t.$wp, "scroll.image-alt", function() {
                re && t.popups.isVisible("image.alt") && O();
            }), r;
        }
        function k() {
            if (re) {
                var e = t.popups.get("image.size");
                e.find('input[name="width"]').val(re.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(re.get(0).style.height).trigger("change");
            }
        }
        function D() {
            var e = t.popups.get("image.size");
            e || (e = F()), m(), t.popups.refresh("image.size"), t.popups.setContainer("image.size", t.$sc);
            var n = te();
            ne() && (n = n.find(".fr-img-wrap"));
            var r = n.offset().left + n.outerWidth() / 2, i = n.offset().top + n.outerHeight();
            t.popups.show("image.size", r, i, n.outerHeight());
        }
        function F(e) {
            if (e) return t.popups.onRefresh("image.size", k), !0;
            var n = {
                buttons: '<div class="fr-buttons">' + t.button.buildList(t.opts.imageSizeButtons) + "</div>",
                size_layer: '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-' + t.id + '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-' + t.id + '" type="text" name="width" placeholder="' + t.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height' + t.id + '" type="text" name="height" placeholder="' + t.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">' + t.language.translate("Update") + "</button></div></div>"
            }, r = t.popups.create("image.size", n);
            return t.$wp && t.events.$on(t.$wp, "scroll.image-size", function() {
                re && t.popups.isVisible("image.size") && D();
            }), r;
        }
        function M(e, t, n, r) {
            return e.pageX = t, c.call(this, e), e.pageX = e.pageX + n * Math.floor(Math.pow(1.1, r)), 
            f.call(this, e), p.call(this, e), ++r;
        }
        function $(n) {
            (n = n || te()) && !1 !== t.events.trigger("image.beforeRemove", [ n ]) && (t.popups.hideAll(), 
            J(), G(!0), t.undo.canDo() || t.undo.saveStep(), n.get(0) == t.el ? n.removeAttr("src") : ("A" == n.get(0).parentNode.tagName ? (t.selection.setBefore(n.get(0).parentNode) || t.selection.setAfter(n.get(0).parentNode) || n.parent().after(e.FE.MARKERS), 
            e(n.get(0).parentNode).remove()) : (t.selection.setBefore(n.get(0)) || t.selection.setAfter(n.get(0)) || n.after(e.FE.MARKERS), 
            n.remove()), t.html.fillEmptyBlocks(), t.selection.restore()), t.undo.saveStep());
        }
        function B(n) {
            var r = n.which;
            if (re && (r == e.FE.KEYCODE.BACKSPACE || r == e.FE.KEYCODE.DELETE)) return n.preventDefault(), 
            n.stopPropagation(), $(), !1;
            if (re && r == e.FE.KEYCODE.ESC) {
                var i = re;
                return G(!0), t.selection.setAfter(i.get(0)), t.selection.restore(), n.preventDefault(), 
                !1;
            }
            if (re && (r == e.FE.KEYCODE.ARROW_LEFT || r == e.FE.KEYCODE.ARROW_RIGHT)) {
                var a = re.get(0);
                return G(!0), r == e.FE.KEYCODE.ARROW_LEFT ? t.selection.setBefore(a) : t.selection.setAfter(a), 
                t.selection.restore(), n.preventDefault(), !1;
            }
            return re && r != e.FE.KEYCODE.F10 && !t.keys.isBrowserAction(n) ? (n.preventDefault(), 
            n.stopPropagation(), !1) : void 0;
        }
        function P(e) {
            if (e && "IMG" == e.tagName) {
                if (t.node.hasClass(e, "fr-uploading") || t.node.hasClass(e, "fr-error") ? e.parentNode.removeChild(e) : t.node.hasClass(e, "fr-draggable") && e.classList.remove("fr-draggable"), 
                e.parentNode && e.parentNode.parentNode && t.node.hasClass(e.parentNode.parentNode, "fr-img-caption")) {
                    var n = e.parentNode.parentNode;
                    n.removeAttribute("contenteditable"), n.removeAttribute("draggable"), n.classList.remove("fr-draggable");
                    var r = e.nextSibling;
                    r && r.removeAttribute("contenteditable");
                }
            } else if (e && e.nodeType == Node.ELEMENT_NODE) for (var i = e.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"), a = 0; a < i.length; a++) P(i[a]);
        }
        function K(n) {
            if (!1 === t.events.trigger("image.beforePasteUpload", [ n ])) return !1;
            re = e(n), s(), r(), Z(), g();
            for (var i = atob(e(n).attr("src").split(",")[1]), a = [], o = 0; o < i.length; o++) a.push(i.charCodeAt(o));
            _([ new Blob([ new Uint8Array(a) ], {
                type: e(n).attr("src").split(",")[0].replace(/data\:/g, "").replace(/;base64/g, "")
            }) ], re);
        }
        function U() {
            t.opts.imagePaste ? t.$el.find("img[data-fr-image-pasted]").each(function(n, r) {
                if (t.opts.imagePasteProcess) {
                    var i = t.opts.imageDefaultWidth;
                    i && "auto" != i && (i += t.opts.imageResizeWithPercent ? "%" : "px"), e(r).css("width", i).removeClass("fr-dii fr-dib fr-fir fr-fil"), 
                    q(e(r), t.opts.imageDefaultDisplay, t.opts.imageDefaultAlign);
                }
                if (0 === r.src.indexOf("data:")) K(r); else if (0 === r.src.indexOf("blob:") || 0 === r.src.indexOf("http") && t.opts.imageUploadRemoteUrls && t.opts.imageCORSProxy) {
                    var a = new Image();
                    a.crossOrigin = "Anonymous", a.onload = function() {
                        var e = t.o_doc.createElement("CANVAS"), n = e.getContext("2d");
                        e.height = this.naturalHeight, e.width = this.naturalWidth, n.drawImage(this, 0, 0), 
                        r.src = e.toDataURL("image/png"), K(r);
                    }, a.src = (0 === r.src.indexOf("blob:") ? "" : t.opts.imageCORSProxy + "/") + r.src;
                } else 0 !== r.src.indexOf("http") || 0 === r.src.indexOf("https://mail.google.com/mail") ? (t.selection.save(), 
                e(r).remove(), t.selection.restore()) : e(r).removeAttr("data-fr-image-pasted");
            }) : t.$el.find("img[data-fr-image-pasted]").remove();
        }
        function W(e) {
            var n = e.target.result, r = t.opts.imageDefaultWidth;
            r && "auto" != r && (r += t.opts.imageResizeWithPercent ? "%" : "px"), t.undo.saveStep(), 
            t.html.insert('<img data-fr-image-pasted="true" src="' + n + '"' + (r ? ' style="width: ' + r + ';"' : "") + ">");
            var i = t.$el.find('img[data-fr-image-pasted="true"]');
            i && q(i, t.opts.imageDefaultDisplay, t.opts.imageDefaultAlign), t.events.trigger("paste.after");
        }
        function H(e) {
            if (e && e.clipboardData && e.clipboardData.items) {
                var t = null;
                if (e.clipboardData.getData("text/html") || e.clipboardData.getData("text/rtf")) t = e.clipboardData.items[0].getAsFile(); else for (var n = 0; n < e.clipboardData.items.length && !(t = e.clipboardData.items[n].getAsFile()); n++) ;
                if (t) return r = t, (i = new FileReader()).onload = W, i.readAsDataURL(r), !1;
            }
            var r, i;
        }
        function Y(e) {
            return e = e.replace(/<img /gi, '<img data-fr-image-pasted="true" ');
        }
        function z(n) {
            if ("false" == e(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
            if (n && "touchend" == n.type && le) return !0;
            if (n && t.edit.isDisabled()) return n.stopPropagation(), n.preventDefault(), !1;
            for (var i = 0; i < e.FE.INSTANCES.length; i++) e.FE.INSTANCES[i] != t && e.FE.INSTANCES[i].events.trigger("image.hideResizer");
            t.toolbar.disable(), n && (n.stopPropagation(), n.preventDefault()), t.helpers.isMobile() && (t.events.disableBlur(), 
            t.$el.blur(), t.events.enableBlur()), t.opts.iframe && t.size.syncIframe(), re = e(this), 
            J(), s(), r(), t.browser.msie || t.selection.clear(), t.helpers.isIOS() && (t.events.disableBlur(), 
            t.$el.blur()), t.button.bulkRefresh(), t.events.trigger("video.hideResizer");
        }
        function G(e) {
            re && (Ee || !0 === e) && (t.toolbar.enable(), ie.removeClass("fr-active"), t.popups.hide("image.edit"), 
            re = null, X(), ae = null, oe && oe.hide());
        }
        function V() {
            Ee = !0;
        }
        function X() {
            Ee = !1;
        }
        function q(e, n, r) {
            !t.opts.htmlUntouched && t.opts.useClasses ? (e.removeClass("fr-fil fr-fir fr-dib fr-dii"), 
            r && e.addClass("fr-fi" + r[0]), n && e.addClass("fr-di" + n[0])) : "inline" == n ? (e.css({
                display: "inline-block",
                verticalAlign: "bottom",
                margin: t.opts.imageDefaultMargin
            }), "center" == r ? e.css({
                float: "none",
                marginBottom: "",
                marginTop: "",
                maxWidth: "calc(100% - " + 2 * t.opts.imageDefaultMargin + "px)",
                textAlign: "center"
            }) : "left" == r ? e.css({
                float: "left",
                marginLeft: 0,
                maxWidth: "calc(100% - " + t.opts.imageDefaultMargin + "px)",
                textAlign: "left"
            }) : e.css({
                float: "right",
                marginRight: 0,
                maxWidth: "calc(100% - " + t.opts.imageDefaultMargin + "px)",
                textAlign: "right"
            })) : "block" == n && (e.css({
                display: "block",
                float: "none",
                verticalAlign: "top",
                margin: t.opts.imageDefaultMargin + "px auto",
                textAlign: "center"
            }), "left" == r ? e.css({
                marginLeft: 0,
                textAlign: "left"
            }) : "right" == r && e.css({
                marginRight: 0,
                textAlign: "right"
            }));
        }
        function j(e) {
            if (void 0 === e && (e = te()), e) {
                if (e.hasClass("fr-fil")) return "left";
                if (e.hasClass("fr-fir")) return "right";
                if (e.hasClass("fr-dib") || e.hasClass("fr-dii")) return "center";
                var t = e.css("float");
                if (e.css("float", "none"), "block" == e.css("display")) {
                    if (e.css("float", ""), e.css("float") != t && e.css("float", t), 0 === parseInt(e.css("margin-left"), 10)) return "left";
                    if (0 === parseInt(e.css("margin-right"), 10)) return "right";
                } else {
                    if (e.css("float", ""), e.css("float") != t && e.css("float", t), "left" == e.css("float")) return "left";
                    if ("right" == e.css("float")) return "right";
                }
            }
            return "center";
        }
        function Q(e) {
            void 0 === e && (e = te());
            var t = e.css("float");
            return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), 
            e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), 
            "inline");
        }
        function Z() {
            var e = t.popups.get("image.insert");
            e || (e = N()), t.popups.isVisible("image.insert") || (m(), t.popups.refresh("image.insert"), 
            t.popups.setContainer("image.insert", t.$sc));
            var n = te();
            ne() && (n = n.find(".fr-img-wrap"));
            var r = n.offset().left + n.outerWidth() / 2, i = n.offset().top + n.outerHeight();
            t.popups.show("image.insert", r, i, n.outerHeight(!0));
        }
        function J() {
            if (re) {
                t.events.disableBlur(), t.selection.clear();
                var e = t.doc.createRange();
                e.selectNode(re.get(0)), t.browser.msie && e.collapse(!0), t.selection.get().addRange(e), 
                t.events.enableBlur();
            }
        }
        function ee() {
            return re;
        }
        function te() {
            return ne() ? re.parents(".fr-img-caption:first") : re;
        }
        function ne() {
            return !!re && 0 < re.parents(".fr-img-caption").length;
        }
        var re, ie, ae, oe, se, le, de = !1, ce = 1, fe = 2, pe = 3, ue = 4, he = 5, ge = 6, me = 8, ve = {};
        ve[ce] = "Image cannot be loaded from the passed link.", ve[fe] = "No link in upload response.", 
        ve[pe] = "Error during file upload.", ve[ue] = "Parsing response failed.", ve[he] = "File is too large.", 
        ve[ge] = "Image file type is invalid.", ve[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
        var Ee = !(ve[me] = "Image file is corrupted.");
        return {
            _init: function() {
                var n;
                t.events.$on(t.$el, t._mousedown, "IMG" == t.el.tagName ? null : 'img:not([contenteditable="false"])', function(n) {
                    if ("false" == e(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                    t.helpers.isMobile() || t.selection.clear(), de = !0, t.popups.areVisible() && t.events.disableBlur(), 
                    t.browser.msie && (t.events.disableBlur(), t.$el.attr("contenteditable", !1)), t.draggable || "touchstart" == n.type || n.preventDefault(), 
                    n.stopPropagation();
                }), t.events.$on(t.$el, t._mouseup, "IMG" == t.el.tagName ? null : 'img:not([contenteditable="false"])', function(n) {
                    if ("false" == e(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                    de && (de = !1, n.stopPropagation(), t.browser.msie && (t.$el.attr("contenteditable", !0), 
                    t.events.enableBlur()));
                }), t.events.on("keyup", function(n) {
                    if (n.shiftKey && "" === t.selection.text().replace(/\n/g, "") && t.keys.isArrow(n.which)) {
                        var r = t.selection.element(), i = t.selection.endElement();
                        r && "IMG" == r.tagName ? E(e(r)) : i && "IMG" == i.tagName && E(e(i));
                    }
                }, !0), t.events.on("drop", x), t.events.on("element.beforeDrop", L), t.events.on("mousedown window.mousedown", V), 
                t.events.on("window.touchmove", X), t.events.on("mouseup window.mouseup", function() {
                    if (re) return G(), !1;
                    X();
                }), t.events.on("commands.mousedown", function(e) {
                    0 < e.parents(".fr-toolbar").length && G();
                }), t.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function() {
                    G(!(de = !1));
                }), t.events.on("modals.hide", function() {
                    re && (J(), t.selection.clear());
                }), "IMG" == t.el.tagName && t.$el.addClass("fr-view"), t.events.$on(t.$el, t.helpers.isMobile() && !t.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == t.el.tagName ? null : 'img:not([contenteditable="false"])', z), 
                t.helpers.isMobile() && (t.events.$on(t.$el, "touchstart", "IMG" == t.el.tagName ? null : 'img:not([contenteditable="false"])', function() {
                    le = !1;
                }), t.events.$on(t.$el, "touchmove", function() {
                    le = !0;
                })), t.$wp ? (t.events.on("window.keydown keydown", B, !0), t.events.on("keyup", function(t) {
                    if (re && t.which == e.FE.KEYCODE.ENTER) return !1;
                }, !0)) : t.events.$on(t.$win, "keydown", B), t.events.on("toolbar.esc", function() {
                    if (re) {
                        if (t.$wp) t.events.disableBlur(), t.events.focus(); else {
                            var e = re;
                            G(!0), t.selection.setAfter(e.get(0)), t.selection.restore();
                        }
                        return !1;
                    }
                }, !0), t.events.on("toolbar.focusEditor", function() {
                    if (re) return !1;
                }, !0), t.events.on("window.cut window.copy", function(n) {
                    if (re && t.popups.isVisible("image.edit") && !t.popups.get("image.edit").find(":focus").length) {
                        var r = te();
                        ne() ? (r.before(e.FE.START_MARKER), r.after(e.FE.END_MARKER), t.selection.restore(), 
                        t.paste.saveCopiedText(r.get(0).outerHTML, r.text())) : (J(), t.paste.saveCopiedText(re.get(0).outerHTML, re.attr("alt"))), 
                        "copy" == n.type ? setTimeout(function() {
                            E(re);
                        }) : (G(!0), t.undo.saveStep(), setTimeout(function() {
                            t.undo.saveStep();
                        }, 0));
                    }
                }, !0), t.browser.msie && t.events.on("keydown", function(n) {
                    if (!t.selection.isCollapsed() || !re) return !0;
                    var r = n.which;
                    r == e.FE.KEYCODE.C && t.keys.ctrlKey(n) ? t.events.trigger("window.copy") : r == e.FE.KEYCODE.X && t.keys.ctrlKey(n) && t.events.trigger("window.cut");
                }), t.events.$on(e(t.o_win), "keydown", function(t) {
                    var n = t.which;
                    if (re && n == e.FE.KEYCODE.BACKSPACE) return t.preventDefault(), !1;
                }), t.events.$on(t.$win, "keydown", function(t) {
                    var n = t.which;
                    re && re.hasClass("fr-uploading") && n == e.FE.KEYCODE.ESC && re.trigger("abortUpload");
                }), t.events.on("destroy", function() {
                    re && re.hasClass("fr-uploading") && re.trigger("abortUpload");
                }), t.events.on("paste.before", H), t.events.on("paste.beforeCleanup", Y), t.events.on("paste.after", U), 
                t.events.on("html.set", a), t.events.on("html.inserted", a), a(), t.events.on("destroy", function() {
                    se = [];
                }), t.events.on("html.processGet", P), t.opts.imageOutputSize && t.events.on("html.beforeGet", function() {
                    n = t.el.querySelectorAll("img");
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r].style.width || e(n[r]).width(), a = n[r].style.height || e(n[r]).height();
                        i && n[r].setAttribute("width", ("" + i).replace(/px/, "")), a && n[r].setAttribute("height", ("" + a).replace(/px/, ""));
                    }
                }), t.opts.iframe && t.events.on("image.loaded", t.size.syncIframe), t.$wp && (o(), 
                t.events.on("contentChanged", o)), t.events.$on(e(t.o_win), "orientationchange.image", function() {
                    setTimeout(function() {
                        re && E(re);
                    }, 100);
                }), h(!0), N(!0), F(!0), I(!0), t.events.on("node.remove", function(e) {
                    if ("IMG" == e.get(0).tagName) return $(e), !1;
                });
            },
            showInsertPopup: function() {
                var e = t.$tb.find('.fr-command[data-cmd="insertImage"]'), n = t.popups.get("image.insert");
                if (n || (n = N()), m(), !n.hasClass("fr-active")) if (t.popups.refresh("image.insert"), 
                t.popups.setContainer("image.insert", t.$tb), e.is(":visible")) {
                    var r = e.offset().left + e.outerWidth() / 2, i = e.offset().top + (t.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                    t.popups.show("image.insert", r, i, e.outerHeight());
                } else t.position.forSelection(n), t.popups.show("image.insert");
            },
            showLayer: function(e) {
                var n, r, i = t.popups.get("image.insert");
                if (re || t.opts.toolbarInline) {
                    if (re) {
                        var a = te();
                        ne() && (a = a.find(".fr-img-wrap")), r = a.offset().top + a.outerHeight(), n = a.offset().left + a.outerWidth() / 2;
                    }
                } else {
                    var o = t.$tb.find('.fr-command[data-cmd="insertImage"]');
                    n = o.offset().left + o.outerWidth() / 2, r = o.offset().top + (t.opts.toolbarBottom ? 10 : o.outerHeight() - 10);
                }
                !re && t.opts.toolbarInline && (r = i.offset().top - t.helpers.getPX(i.css("margin-top")), 
                i.hasClass("fr-above") && (r += i.outerHeight())), i.find(".fr-layer").removeClass("fr-active"), 
                i.find(".fr-" + e + "-layer").addClass("fr-active"), t.popups.show("image.insert", n, r, re ? re.outerHeight() : 0), 
                t.accessibility.focusPopup(i);
            },
            refreshUploadButton: function(e) {
                t.popups.get("image.insert").find(".fr-image-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
            },
            refreshByURLButton: function(e) {
                t.popups.get("image.insert").find(".fr-image-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
            },
            upload: _,
            insertByURL: function() {
                var e = t.popups.get("image.insert").find(".fr-image-by-url-layer input");
                if (0 < e.val().length) {
                    g(), v(t.language.translate("Loading image"));
                    var n = e.val();
                    if (t.opts.imageUploadRemoteUrls && t.opts.imageCORSProxy && t.opts.imageUpload) {
                        var r = new XMLHttpRequest();
                        r.onload = function() {
                            200 == this.status ? _([ new Blob([ this.response ], {
                                type: this.response.type || "image/png"
                            }) ], re) : u(ce);
                        }, r.onerror = function() {
                            T(n, !0, [], re);
                        }, r.open("GET", t.opts.imageCORSProxy + "/" + n, !0), r.responseType = "blob", 
                        r.send();
                    } else T(n, !0, [], re);
                    e.val(""), e.blur();
                }
            },
            align: function(e) {
                var n = te();
                n.removeClass("fr-fir fr-fil"), !t.opts.htmlUntouched && t.opts.useClasses ? "left" == e ? n.addClass("fr-fil") : "right" == e && n.addClass("fr-fir") : q(n, Q(), e), 
                J(), s(), r(), t.selection.clear();
            },
            refreshAlign: function(e) {
                re && e.find("> *:first").replaceWith(t.icon.create("image-align-" + j()));
            },
            refreshAlignOnShow: function(e, t) {
                re && t.find('.fr-command[data-param1="' + j() + '"]').addClass("fr-active").attr("aria-selected", !0);
            },
            display: function(e) {
                var n = te();
                n.removeClass("fr-dii fr-dib"), !t.opts.htmlUntouched && t.opts.useClasses ? "inline" == e ? n.addClass("fr-dii") : "block" == e && n.addClass("fr-dib") : q(n, e, j()), 
                J(), s(), r(), t.selection.clear();
            },
            refreshDisplayOnShow: function(e, t) {
                re && t.find('.fr-command[data-param1="' + Q() + '"]').addClass("fr-active").attr("aria-selected", !0);
            },
            replace: Z,
            back: function() {
                re ? (t.events.disableBlur(), e(".fr-popup input:focus").blur(), E(re)) : (t.events.disableBlur(), 
                t.selection.restore(), t.events.enableBlur(), t.popups.hide("image.insert"), t.toolbar.showInline());
            },
            get: ee,
            getEl: te,
            insert: T,
            showProgressBar: g,
            remove: $,
            hideProgressBar: m,
            applyStyle: function(e, n, r) {
                if (void 0 === n && (n = t.opts.imageStyles), void 0 === r && (r = t.opts.imageMultipleStyles), 
                !re) return !1;
                var i = te();
                if (!r) {
                    var a = Object.keys(n);
                    a.splice(a.indexOf(e), 1), i.removeClass(a.join(" "));
                }
                "object" == typeof n[e] ? (i.removeAttr("style"), i.css(n[e].style)) : i.toggleClass(e), 
                E(re);
            },
            showAltPopup: O,
            showSizePopup: D,
            setAlt: function(e) {
                if (re) {
                    var n = t.popups.get("image.alt");
                    re.attr("alt", e || n.find("input").val() || ""), n.find("input:focus").blur(), 
                    E(re);
                }
            },
            setSize: function(e, n) {
                if (re) {
                    var r = t.popups.get("image.size");
                    e = e || r.find('input[name="width"]').val() || "", n = n || r.find('input[name="height"]').val() || "";
                    var i = /^[\d]+((px)|%)*$/g;
                    re.removeAttr("width").removeAttr("height"), e.match(i) ? re.css("width", e) : re.css("width", ""), 
                    n.match(i) ? re.css("height", n) : re.css("height", ""), ne() && (re.parent().removeAttr("width").removeAttr("height"), 
                    e.match(i) ? re.parent().css("width", e) : re.parent().css("width", ""), n.match(i) ? re.parent().css("height", n) : re.parent().css("height", "")), 
                    r.find("input:focus").blur(), E(re);
                }
            },
            toggleCaption: function() {
                var n;
                re && !ne() ? ((n = re).parent().is("a") && (n = re.parent()), n.wrap("<span " + (t.browser.mozilla ? "" : 'contenteditable="false"') + 'class="fr-img-caption ' + re.attr("class") + '" style="' + (re.attr("style") ? re.attr("style") + " " : "") + "width: " + re.width() + 'px;" draggable="false"></span>'), 
                n.wrap('<span class="fr-img-wrap"></span>'), n.after('<span class="fr-inner" contenteditable="true">' + e.FE.START_MARKER + "Image caption" + e.FE.END_MARKER + "</span>"), 
                re.removeAttr("class").removeAttr("style").removeAttr("width"), G(!0), t.selection.restore()) : (n = te(), 
                re.insertAfter(n), re.attr("class", n.attr("class").replace("fr-img-caption", "")).attr("style", n.attr("style")), 
                n.remove(), E(re));
            },
            hasCaption: ne,
            exitEdit: G,
            edit: E
        };
    }, e.FE.DefineIcon("insertImage", {
        NAME: "image"
    }), e.FE.RegisterShortcut(e.FE.KEYCODE.P, "insertImage", null, "P"), e.FE.RegisterCommand("insertImage", {
        title: "Insert Image",
        undo: !1,
        focus: !0,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), 
            this.selection.restore()), this.popups.hide("image.insert")) : this.image.showInsertPopup();
        },
        plugin: "image"
    }), e.FE.DefineIcon("imageUpload", {
        NAME: "upload"
    }), e.FE.RegisterCommand("imageUpload", {
        title: "Upload Image",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.image.showLayer("image-upload");
        },
        refresh: function(e) {
            this.image.refreshUploadButton(e);
        }
    }), e.FE.DefineIcon("imageByURL", {
        NAME: "link"
    }), e.FE.RegisterCommand("imageByURL", {
        title: "By URL",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.image.showLayer("image-by-url");
        },
        refresh: function(e) {
            this.image.refreshByURLButton(e);
        }
    }), e.FE.RegisterCommand("imageInsertByURL", {
        title: "Insert Image",
        undo: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.image.insertByURL();
        },
        refresh: function(e) {
            this.image.get() ? e.text(this.language.translate("Replace")) : e.text(this.language.translate("Insert"));
        }
    }), e.FE.DefineIcon("imageDisplay", {
        NAME: "star"
    }), e.FE.RegisterCommand("imageDisplay", {
        title: "Display",
        type: "dropdown",
        options: {
            inline: "Inline",
            block: "Break Text"
        },
        callback: function(e, t) {
            this.image.display(t);
        },
        refresh: function(e) {
            this.opts.imageTextNear || e.addClass("fr-hidden");
        },
        refreshOnShow: function(e, t) {
            this.image.refreshDisplayOnShow(e, t);
        }
    }), e.FE.DefineIcon("image-align", {
        NAME: "align-left"
    }), e.FE.DefineIcon("image-align-left", {
        NAME: "align-left"
    }), e.FE.DefineIcon("image-align-right", {
        NAME: "align-right"
    }), e.FE.DefineIcon("image-align-center", {
        NAME: "align-justify"
    }), e.FE.DefineIcon("imageAlign", {
        NAME: "align-justify"
    }), e.FE.RegisterCommand("imageAlign", {
        type: "dropdown",
        title: "Align",
        options: {
            left: "Align Left",
            center: "None",
            right: "Align Right"
        },
        html: function() {
            var t = '<ul class="fr-dropdown-list" role="presentation">', n = e.FE.COMMANDS.imageAlign.options;
            for (var r in n) n.hasOwnProperty(r) && (t += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="' + r + '" title="' + this.language.translate(n[r]) + '">' + this.icon.create("image-align-" + r) + '<span class="fr-sr-only">' + this.language.translate(n[r]) + "</span></a></li>");
            return t += "</ul>";
        },
        callback: function(e, t) {
            this.image.align(t);
        },
        refresh: function(e) {
            this.image.refreshAlign(e);
        },
        refreshOnShow: function(e, t) {
            this.image.refreshAlignOnShow(e, t);
        }
    }), e.FE.DefineIcon("imageReplace", {
        NAME: "exchange",
        FA5NAME: "exchange-alt"
    }), e.FE.RegisterCommand("imageReplace", {
        title: "Replace",
        undo: !1,
        focus: !1,
        popup: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.image.replace();
        }
    }), e.FE.DefineIcon("imageRemove", {
        NAME: "trash"
    }), e.FE.RegisterCommand("imageRemove", {
        title: "Remove",
        callback: function() {
            this.image.remove();
        }
    }), e.FE.DefineIcon("imageBack", {
        NAME: "arrow-left"
    }), e.FE.RegisterCommand("imageBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.image.back();
        },
        refresh: function(e) {
            this.image.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), 
            e.next(".fr-separator").addClass("fr-hidden"));
        }
    }), e.FE.RegisterCommand("imageDismissError", {
        title: "OK",
        undo: !1,
        callback: function() {
            this.image.hideProgressBar(!0);
        }
    }), e.FE.DefineIcon("imageStyle", {
        NAME: "magic"
    }), e.FE.RegisterCommand("imageStyle", {
        title: "Style",
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.imageStyles;
            for (var n in t) if (t.hasOwnProperty(n)) {
                var r = t[n];
                "object" == typeof r && (r = r.title), e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="' + n + '">' + this.language.translate(r) + "</a></li>";
            }
            return e += "</ul>";
        },
        callback: function(e, t) {
            this.image.applyStyle(t);
        },
        refreshOnShow: function(t, n) {
            var r = this.image.getEl();
            r && n.find(".fr-command").each(function() {
                var t = e(this).data("param1"), n = r.hasClass(t);
                e(this).toggleClass("fr-active", n).attr("aria-selected", n);
            });
        }
    }), e.FE.DefineIcon("imageAlt", {
        NAME: "info"
    }), e.FE.RegisterCommand("imageAlt", {
        undo: !1,
        focus: !1,
        popup: !0,
        title: "Alternate Text",
        callback: function() {
            this.image.showAltPopup();
        }
    }), e.FE.RegisterCommand("imageSetAlt", {
        undo: !0,
        focus: !1,
        title: "Update",
        refreshAfterCallback: !1,
        callback: function() {
            this.image.setAlt();
        }
    }), e.FE.DefineIcon("imageSize", {
        NAME: "arrows-alt"
    }), e.FE.RegisterCommand("imageSize", {
        undo: !1,
        focus: !1,
        popup: !0,
        title: "Change Size",
        callback: function() {
            this.image.showSizePopup();
        }
    }), e.FE.RegisterCommand("imageSetSize", {
        undo: !0,
        focus: !1,
        title: "Update",
        refreshAfterCallback: !1,
        callback: function() {
            this.image.setSize();
        }
    }), e.FE.DefineIcon("imageCaption", {
        NAME: "commenting",
        FA5NAME: "comment-alt"
    }), e.FE.RegisterCommand("imageCaption", {
        undo: !0,
        focus: !1,
        title: "Image Caption",
        refreshAfterCallback: !0,
        callback: function() {
            this.image.toggleCaption();
        },
        refresh: function(e) {
            this.image.get() && e.toggleClass("fr-active", this.image.hasCaption());
        }
    }), e.extend(e.FE.DEFAULTS, {
        imageManagerLoadURL: "https://i.froala.com/load-files",
        imageManagerLoadMethod: "get",
        imageManagerLoadParams: {},
        imageManagerPreloader: null,
        imageManagerDeleteURL: "",
        imageManagerDeleteMethod: "post",
        imageManagerDeleteParams: {},
        imageManagerPageSize: 12,
        imageManagerScrollOffset: 20,
        imageManagerToggleTags: !0
    }), e.FE.PLUGINS.imageManager = function(t) {
        function n() {
            var t = e(window).outerWidth();
            return t < 768 ? 2 : t < 1200 ? 3 : 4;
        }
        function r() {
            S.empty();
            for (var e = 0; e < x; e++) S.append('<div class="fr-list-column"></div>');
        }
        function i() {
            if (_ < C.length && (S.outerHeight() <= T.outerHeight() + t.opts.imageManagerScrollOffset || T.scrollTop() + t.opts.imageManagerScrollOffset > S.outerHeight() - T.outerHeight())) {
                y++;
                for (var e = t.opts.imageManagerPageSize * (y - 1); e < Math.min(C.length, t.opts.imageManagerPageSize * y); e++) a(C[e]);
            }
        }
        function a(n) {
            var r = new Image(), a = e('<div class="fr-image-container fr-empty fr-image-' + L++ + '" data-loading="' + t.language.translate("Loading") + '.." data-deleting="' + t.language.translate("Deleting") + '..">');
            d(!1), r.onload = function() {
                a.height(Math.floor(a.width() / r.width * r.height));
                var o = e("<img/>");
                if (n.thumb) o.attr("src", n.thumb); else {
                    if (u(O, n), !n.url) return u(I, n), !1;
                    o.attr("src", n.url);
                }
                if (n.url && o.attr("data-url", n.url), n.tag) if (b.find(".fr-modal-more.fr-not-available").removeClass("fr-not-available"), 
                b.find(".fr-modal-tags").show(), 0 <= n.tag.indexOf(",")) {
                    for (var c = n.tag.split(","), f = 0; f < c.length; f++) c[f] = c[f].trim(), 0 === R.find('a[title="' + c[f] + '"]').length && R.append('<a role="button" title="' + c[f] + '">' + c[f] + "</a>");
                    o.attr("data-tag", c.join());
                } else 0 === R.find('a[title="' + n.tag.trim() + '"]').length && R.append('<a role="button" title="' + n.tag.trim() + '">' + n.tag.trim() + "</a>"), 
                o.attr("data-tag", n.tag.trim());
                for (var p in n.name && o.attr("alt", n.name), n) n.hasOwnProperty(p) && "thumb" != p && "url" != p && "tag" != p && o.attr("data-" + p, n[p]);
                a.append(o).append(e(t.icon.create("imageManagerDelete")).addClass("fr-delete-img").attr("title", t.language.translate("Delete"))).append(e(t.icon.create("imageManagerInsert")).addClass("fr-insert-img").attr("title", t.language.translate("Insert"))), 
                R.find(".fr-selected-tag").each(function(e, t) {
                    v(o, t.text) || a.hide();
                }), o.on("load", function() {
                    a.removeClass("fr-empty"), a.height("auto"), _++, l(s(parseInt(o.parent().attr("class").match(/fr-image-(\d+)/)[1], 10) + 1)), 
                    d(!1), _ % t.opts.imageManagerPageSize == 0 && i();
                }), t.events.trigger("imageManager.imageLoaded", [ o ]);
            }, r.onerror = function() {
                _++, a.remove(), l(s(parseInt(a.attr("class").match(/fr-image-(\d+)/)[1], 10) + 1)), 
                u(w, n), _ % t.opts.imageManagerPageSize == 0 && i();
            }, r.src = n.thumb || n.url, o().append(a);
        }
        function o() {
            var t, n;
            return S.find(".fr-list-column").each(function(r, i) {
                var a = e(i);
                0 === r ? (n = a.outerHeight(), t = a) : a.outerHeight() < n && (n = a.outerHeight(), 
                t = a);
            }), t;
        }
        function s(t) {
            void 0 === t && (t = 0);
            for (var n = [], r = L - 1; t <= r; r--) {
                var i = S.find(".fr-image-" + r);
                i.length && (n.push(i), e('<div id="fr-image-hidden-container">').append(i), S.find(".fr-image-" + r).remove());
            }
            return n;
        }
        function l(e) {
            for (var t = e.length - 1; 0 <= t; t--) o().append(e[t]);
        }
        function d(e) {
            if (void 0 === e && (e = !0), !E.is(":visible")) return !0;
            var a = n();
            if (a != x) {
                x = a;
                var o = s();
                r(), l(o);
            }
            t.modals.resize(N), e && i();
        }
        function c(e) {
            var t = {}, n = e.data();
            for (var r in n) n.hasOwnProperty(r) && "url" != r && "tag" != r && (t[r] = n[r]);
            return t;
        }
        function f(n) {
            var r = e(n.currentTarget).siblings("img"), i = E.data("instance") || t, a = E.data("current-image");
            if (t.modals.hide(N), i.image.showProgressBar(), a) a.data("fr-old-src", a.attr("src")), 
            a.trigger("click"); else {
                i.events.focus(!0), i.selection.restore();
                var o = i.position.getBoundingRect(), s = o.left + o.width / 2 + e(t.doc).scrollLeft(), l = o.top + o.height + e(t.doc).scrollTop();
                i.popups.setContainer("image.insert", t.$sc), i.popups.show("image.insert", s, l);
            }
            i.image.insert(r.data("url"), !1, c(r), a);
        }
        function p(n) {
            var r = e(n.currentTarget).siblings("img"), i = t.language.translate("Are you sure? Image will be deleted.");
            confirm(i) && (t.opts.imageManagerDeleteURL ? !1 !== t.events.trigger("imageManager.beforeDeleteImage", [ r ]) && (r.parent().addClass("fr-image-deleting"), 
            e.ajax({
                method: t.opts.imageManagerDeleteMethod,
                url: t.opts.imageManagerDeleteURL,
                data: e.extend(e.extend({
                    src: r.attr("src")
                }, c(r)), t.opts.imageManagerDeleteParams),
                crossDomain: t.opts.requestWithCORS,
                xhrFields: {
                    withCredentials: t.opts.requestWithCredentials
                },
                headers: t.opts.requestHeaders
            }).done(function(n) {
                t.events.trigger("imageManager.imageDeleted", [ n ]);
                var i = s(parseInt(r.parent().attr("class").match(/fr-image-(\d+)/)[1], 10) + 1);
                r.parent().remove(), l(i), E.find("#fr-modal-tags > a").each(function() {
                    0 === E.find('#fr-image-list [data-tag*="' + e(this).text() + '"]').length && e(this).removeClass("fr-selected-tag").hide();
                }), g(), d(!0);
            }).fail(function(e) {
                u(k, e.response || e.responseText);
            })) : u(D));
        }
        function u(n, r) {
            10 <= n && n < 20 ? A.hide() : 20 <= n && n < 30 && e(".fr-image-deleting").removeClass("fr-image-deleting"), 
            t.events.trigger("imageManager.error", [ {
                code: n,
                message: F[n]
            }, r ]);
        }
        function h() {
            var e = b.find(".fr-modal-head-line").outerHeight(), t = R.outerHeight();
            b.toggleClass("fr-show-tags"), b.hasClass("fr-show-tags") ? (b.css("height", e + t), 
            R.find("a").css("opacity", 1)) : (b.css("height", e), R.find("a").css("opacity", 0));
        }
        function g() {
            var t = R.find(".fr-selected-tag");
            0 < t.length ? (S.find("img").parent().show(), t.each(function(t, n) {
                S.find("img").each(function(t, r) {
                    var i = e(r);
                    v(i, n.text) || i.parent().hide();
                });
            })) : S.find("img").parent().show(), l(s()), i();
        }
        function m(n) {
            n.preventDefault();
            var r = e(n.currentTarget);
            r.toggleClass("fr-selected-tag"), t.opts.imageManagerToggleTags && r.siblings("a").removeClass("fr-selected-tag"), 
            g();
        }
        function v(e, t) {
            for (var n = (e.attr("data-tag") || "").split(","), r = 0; r < n.length; r++) if (n[r] == t) return !0;
            return !1;
        }
        var E, b, T, A, S, R, C, y, _, L, x, N = "image_manager", w = 10, O = 14, I = 15, k = 21, D = 22, F = {};
        return F[w] = "Image cannot be loaded from the passed link.", F[11] = "Error during load images request.", 
        F[12] = "Missing imageManagerLoadURL option.", F[13] = "Parsing load response failed.", 
        F[O] = "Missing image thumb.", F[I] = "Missing image URL.", F[k] = "Error during delete image request.", 
        F[D] = "Missing imageManagerDeleteURL option.", {
            require: [ "image" ],
            _init: function() {
                if (!t.$wp && "IMG" != t.el.tagName) return !1;
            },
            show: function() {
                if (!E) {
                    var a, o = '<div class="fr-modal-head-line"><i class="fa fa-bars fr-modal-more fr-not-available" id="fr-modal-more-' + t.sid + '" title="' + t.language.translate("Tags") + '"></i><h4 data-text="true">' + t.language.translate("Manage Images") + "</h4></div>";
                    o += '<div class="fr-modal-tags" id="fr-modal-tags"></div>', a = t.opts.imageManagerPreloader ? '<img class="fr-preloader" id="fr-preloader" alt="' + t.language.translate("Loading") + '.." src="' + t.opts.imageManagerPreloader + '" style="display: none;">' : '<span class="fr-preloader" id="fr-preloader" style="display: none;">' + t.language.translate("Loading") + "</span>", 
                    a += '<div class="fr-image-list" id="fr-image-list"></div>';
                    var s = t.modals.create(N, o, a);
                    E = s.$modal, b = s.$head, T = s.$body;
                }
                E.data("current-image", t.image.get()), t.modals.show(N), A || (A = E.find("#fr-preloader"), 
                S = E.find("#fr-image-list"), R = E.find("#fr-modal-tags"), x = n(), r(), b.css("height", b.find(".fr-modal-head-line").outerHeight()), 
                t.events.$on(e(t.o_win), "resize", function() {
                    d(!!C);
                }), t.helpers.isMobile() && (t.events.bindClick(S, "div.fr-image-container", function(t) {
                    E.find(".fr-mobile-selected").removeClass("fr-mobile-selected"), e(t.currentTarget).addClass("fr-mobile-selected");
                }), E.on(t._mousedown, function() {
                    E.find(".fr-mobile-selected").removeClass("fr-mobile-selected");
                })), t.events.bindClick(S, ".fr-insert-img", f), t.events.bindClick(S, ".fr-delete-img", p), 
                E.on(t._mousedown + " " + t._mouseup, function(e) {
                    e.stopPropagation();
                }), E.on(t._mousedown, "*", function() {
                    t.events.disableBlur();
                }), T.on("scroll", i), t.events.bindClick(E, "i#fr-modal-more-" + t.sid, h), t.events.bindClick(R, "a", m)), 
                A.show(), S.find(".fr-list-column").empty(), t.opts.imageManagerLoadURL ? e.ajax({
                    url: t.opts.imageManagerLoadURL,
                    method: t.opts.imageManagerLoadMethod,
                    data: t.opts.imageManagerLoadParams,
                    dataType: "json",
                    crossDomain: t.opts.requestWithCORS,
                    xhrFields: {
                        withCredentials: t.opts.requestWithCredentials
                    },
                    headers: t.opts.requestHeaders
                }).done(function(e, n, r) {
                    t.events.trigger("imageManager.imagesLoaded", [ e ]), function(e, t) {
                        try {
                            S.find(".fr-list-column").empty(), L = _ = y = 0, C = e, i();
                        } catch (e) {
                            u(13, t);
                        }
                    }(e, r.response), A.hide();
                }).fail(function() {
                    var e = this.xhr();
                    u(11, e.response || e.responseText);
                }) : u(12);
            },
            hide: function() {
                t.modals.hide(N);
            }
        };
    }, !e.FE.PLUGINS.image) throw new Error("Image manager plugin requires image plugin.");
    e.FE.DEFAULTS.imageInsertButtons.push("imageManager"), e.FE.RegisterCommand("imageManager", {
        title: "Browse",
        undo: !1,
        focus: !1,
        modal: !0,
        callback: function() {
            this.imageManager.show();
        },
        plugin: "imageManager"
    }), e.FE.DefineIcon("imageManager", {
        NAME: "folder"
    }), e.FE.DefineIcon("imageManagerInsert", {
        NAME: "plus"
    }), e.FE.DefineIcon("imageManagerDelete", {
        NAME: "trash"
    }), e.extend(e.FE.DEFAULTS, {
        inlineStyles: {
            "Big Red": "font-size: 20px; color: red;",
            "Small Blue": "font-size: 14px; color: blue;"
        }
    }), e.FE.PLUGINS.inlineStyle = function(t) {
        return {
            apply: function(n) {
                if ("" !== t.selection.text()) for (var r = n.split(";"), i = 0; i < r.length; i++) {
                    var a = r[i].split(":");
                    r[i].length && 2 == a.length && t.format.applyStyle(a[0].trim(), a[1].trim());
                } else t.html.insert('<span style="' + n + '">' + e.FE.INVISIBLE_SPACE + e.FE.MARKERS + "</span>");
            }
        };
    }, e.FE.RegisterCommand("inlineStyle", {
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.inlineStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><span style="' + t[n] + '" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineStyle" data-param1="' + t[n] + '" title="' + this.language.translate(n) + '">' + this.language.translate(n) + "</a></span></li>");
            return e += "</ul>";
        },
        title: "Inline Style",
        callback: function(e, t) {
            this.inlineStyle.apply(t);
        },
        plugin: "inlineStyle"
    }), e.FE.DefineIcon("inlineStyle", {
        NAME: "paint-brush"
    }), e.extend(e.FE.DEFAULTS, {
        lineBreakerTags: [ "table", "hr", "form", "dl", "span.fr-video", ".fr-embedly" ],
        lineBreakerOffset: 15,
        lineBreakerHorizontalOffset: 10
    }), e.FE.PLUGINS.lineBreaker = function(t) {
        function n(n, r) {
            var i, a, o, s, l, d, c, f;
            if (null == n) l = (s = r.parent()).offset().top, i = (c = r.offset().top) - Math.min((c - l) / 2, t.opts.lineBreakerOffset), 
            o = s.outerWidth(), a = s.offset().left; else if (null == r) (d = (s = n.parent()).offset().top + s.outerHeight()) < (f = n.offset().top + n.outerHeight()) && (d = (s = e(s).parent()).offset().top + s.outerHeight()), 
            i = f + Math.min(Math.abs(d - f) / 2, t.opts.lineBreakerOffset), o = s.outerWidth(), 
            a = s.offset().left; else {
                s = n.parent();
                var p = n.offset().top + n.height(), h = r.offset().top;
                if (h < p) return !1;
                i = (p + h) / 2, o = s.outerWidth(), a = s.offset().left;
            }
            t.opts.iframe && (a += t.$iframe.offset().left - t.helpers.scrollLeft(), i += t.$iframe.offset().top - t.helpers.scrollTop()), 
            t.$box.append(u), u.css("top", i - t.win.pageYOffset), u.css("left", a - t.win.pageXOffset), 
            u.css("width", o), u.data("tag1", n), u.data("tag2", r), u.addClass("fr-visible").data("instance", t);
        }
        function r(n) {
            if (n) {
                var r = e(n);
                if (0 === t.$el.find(r).length) return null;
                if (n.nodeType != Node.TEXT_NODE && r.is(t.opts.lineBreakerTags.join(","))) return r;
                if (0 < r.parents(t.opts.lineBreakerTags.join(",")).length) return n = r.parents(t.opts.lineBreakerTags.join(",")).get(0), 
                0 !== t.$el.find(n).length && e(n).is(t.opts.lineBreakerTags.join(",")) ? e(n) : null;
            }
            return null;
        }
        function i(n, r) {
            var i = t.doc.elementFromPoint(n, r);
            return i && !e(i).closest(".fr-line-breaker").length && !t.node.isElement(i) && i != t.$wp.get(0) && function(e) {
                if (void 0 !== e.inFroalaWrapper) return e.inFroalaWrapper;
                for (var n = e; e.parentNode && e.parentNode !== t.$wp.get(0); ) e = e.parentNode;
                return n.inFroalaWrapper = e.parentNode == t.$wp.get(0), n.inFroalaWrapper;
            }(i) ? i : null;
        }
        function a(e, n, r) {
            for (var a = r, o = null; a <= t.opts.lineBreakerOffset && !o; ) (o = i(e, n - a)) || (o = i(e, n + a)), 
            a += r;
            return o;
        }
        function o(e, n, r) {
            for (var o = null, s = 100; !o && e > t.$box.offset().left && e < t.$box.offset().left + t.$box.outerWidth() && 0 < s; ) (o = i(e, n)) || (o = a(e, n, 5)), 
            "left" == r ? e -= t.opts.lineBreakerHorizontalOffset : e += t.opts.lineBreakerHorizontalOffset, 
            s -= t.opts.lineBreakerHorizontalOffset;
            return o;
        }
        function s(e) {
            var i = g = null, s = null, l = t.doc.elementFromPoint(e.pageX - t.win.pageXOffset, e.pageY - t.win.pageYOffset);
            l && ("HTML" == l.tagName || "BODY" == l.tagName || t.node.isElement(l) || 0 <= (l.getAttribute("class") || "").indexOf("fr-line-breaker")) ? ((s = a(e.pageX - t.win.pageXOffset, e.pageY - t.win.pageYOffset, 1)) || (s = o(e.pageX - t.win.pageXOffset - t.opts.lineBreakerHorizontalOffset, e.pageY - t.win.pageYOffset, "left")), 
            s || (s = o(e.pageX - t.win.pageXOffset + t.opts.lineBreakerHorizontalOffset, e.pageY - t.win.pageYOffset, "right")), 
            i = r(s)) : i = r(l), i ? function(e, i) {
                var a, o, s = e.offset().top, l = e.offset().top + e.outerHeight();
                if (Math.abs(l - i) <= t.opts.lineBreakerOffset || Math.abs(i - s) <= t.opts.lineBreakerOffset) if (Math.abs(l - i) < Math.abs(i - s)) {
                    for (var d = (o = e.get(0)).nextSibling; d && d.nodeType == Node.TEXT_NODE && 0 === d.textContent.length; ) d = d.nextSibling;
                    if (!d) return n(e, null);
                    if (a = r(d)) return n(e, a);
                } else {
                    if (!(o = e.get(0)).previousSibling) return n(null, e);
                    if (a = r(o.previousSibling)) return n(a, e);
                }
                u.removeClass("fr-visible").removeData("instance");
            }(i, e.pageY) : t.core.sameInstance(u) && u.removeClass("fr-visible").removeData("instance");
        }
        function l(e) {
            return !(u.hasClass("fr-visible") && !t.core.sameInstance(u)) && (t.popups.areVisible() || t.el.querySelector(".fr-selected-cell") ? (u.removeClass("fr-visible"), 
            !0) : void (!1 !== h || t.edit.isDisabled() || (g && clearTimeout(g), g = setTimeout(s, 30, e))));
        }
        function d() {
            g && clearTimeout(g), u.hasClass("fr-visible") && u.removeClass("fr-visible").removeData("instance");
        }
        function c() {
            h = !0, d();
        }
        function f() {
            h = !1;
        }
        function p(n) {
            n.preventDefault();
            var r = u.data("instance") || t;
            u.removeClass("fr-visible").removeData("instance");
            var i = u.data("tag1"), a = u.data("tag2"), o = t.html.defaultTag();
            null == i ? o && "TD" != a.parent().get(0).tagName && 0 === a.parents(o).length ? a.before("<" + o + ">" + e.FE.MARKERS + "<br></" + o + ">") : a.before(e.FE.MARKERS + "<br>") : o && "TD" != i.parent().get(0).tagName && 0 === i.parents(o).length ? i.after("<" + o + ">" + e.FE.MARKERS + "<br></" + o + ">") : i.after(e.FE.MARKERS + "<br>"), 
            r.selection.restore();
        }
        var u, h, g;
        return {
            _init: function() {
                if (!t.$wp) return !1;
                t.shared.$line_breaker || (t.shared.$line_breaker = e('<div class="fr-line-breaker"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + t.language.translate("Break") + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="21" y="11" width="2" height="8"/><rect x="14" y="17" width="7" height="2"/><path d="M14.000,14.000 L14.000,22.013 L9.000,18.031 L14.000,14.000 Z"/></svg></a></div>')), 
                u = t.shared.$line_breaker, t.events.on("shared.destroy", function() {
                    u.html("").removeData().remove(), u = null;
                }, !0), t.events.on("destroy", function() {
                    u.removeData("instance").removeClass("fr-visible").appendTo("body:first"), clearTimeout(g);
                }, !0), t.events.$on(u, "mousemove", function(e) {
                    e.stopPropagation();
                }, !0), t.events.bindClick(u, "a", p), h = !1, t.events.$on(t.$win, "mousemove", l), 
                t.events.$on(e(t.win), "scroll", d), t.events.on("popups.show.table.edit", d), t.events.on("commands.after", d), 
                t.events.$on(e(t.win), "mousedown", c), t.events.$on(e(t.win), "mouseup", f);
            }
        };
    }, e.extend(e.FE.POPUP_TEMPLATES, {
        "link.edit": "[_BUTTONS_]",
        "link.insert": "[_BUTTONS_][_INPUT_LAYER_]"
    }), e.extend(e.FE.DEFAULTS, {
        linkEditButtons: [ "linkOpen", "linkStyle", "linkEdit", "linkRemove" ],
        linkInsertButtons: [ "linkBack", "|", "linkList" ],
        linkAttributes: {},
        linkAutoPrefix: "http://",
        linkStyles: {
            "fr-green": "Green",
            "fr-strong": "Thick"
        },
        linkMultipleStyles: !0,
        linkConvertEmailAddress: !0,
        linkAlwaysBlank: !1,
        linkAlwaysNoFollow: !1,
        linkNoOpener: !0,
        linkNoReferrer: !0,
        linkList: [ {
            text: "Froala",
            href: "https://froala.com",
            target: "_blank"
        }, {
            text: "Google",
            href: "https://google.com",
            target: "_blank"
        }, {
            displayText: "Facebook",
            href: "https://facebook.com"
        } ],
        linkText: !0
    }), e.FE.PLUGINS.link = function(t) {
        function n() {
            var n = t.image ? t.image.get() : null;
            if (!n && t.$wp) {
                var r = t.selection.ranges(0).commonAncestorContainer;
                try {
                    r && (r.contains && r.contains(t.el) || !t.el.contains(r) || t.el == r) && (r = null);
                } catch (e) {
                    r = null;
                }
                if (r && "A" === r.tagName) return r;
                var i = t.selection.element(), a = t.selection.endElement();
                "A" == i.tagName || t.node.isElement(i) || (i = e(i).parentsUntil(t.$el, "a:first").get(0)), 
                "A" == a.tagName || t.node.isElement(a) || (a = e(a).parentsUntil(t.$el, "a:first").get(0));
                try {
                    a && (a.contains && a.contains(t.el) || !t.el.contains(a) || t.el == a) && (a = null);
                } catch (e) {
                    a = null;
                }
                try {
                    i && (i.contains && i.contains(t.el) || !t.el.contains(i) || t.el == i) && (i = null);
                } catch (e) {
                    i = null;
                }
                return a && a == i && "A" == a.tagName ? (t.browser.msie || t.helpers.isMobile()) && (t.selection.info(i).atEnd || t.selection.info(i).atStart) ? null : i : null;
            }
            return "A" == t.el.tagName ? t.el : n && n.get(0).parentNode && "A" == n.get(0).parentNode.tagName ? n.get(0).parentNode : void 0;
        }
        function r() {
            var e, n, r, i, a = t.image ? t.image.get() : null, o = [];
            if (a) "A" == a.get(0).parentNode.tagName && o.push(a.get(0).parentNode); else if (t.win.getSelection) {
                var s = t.win.getSelection();
                if (s.getRangeAt && s.rangeCount) {
                    i = t.doc.createRange();
                    for (var l = 0; l < s.rangeCount; ++l) if ((n = (e = s.getRangeAt(l)).commonAncestorContainer) && 1 != n.nodeType && (n = n.parentNode), 
                    n && "a" == n.nodeName.toLowerCase()) o.push(n); else {
                        r = n.getElementsByTagName("a");
                        for (var d = 0; d < r.length; ++d) i.selectNodeContents(r[d]), i.compareBoundaryPoints(e.END_TO_START, e) < 1 && -1 < i.compareBoundaryPoints(e.START_TO_END, e) && o.push(r[d]);
                    }
                }
            } else if (t.doc.selection && "Control" != t.doc.selection.type) if ("a" == (n = (e = t.doc.selection.createRange()).parentElement()).nodeName.toLowerCase()) o.push(n); else {
                r = n.getElementsByTagName("a"), i = t.doc.body.createTextRange();
                for (var c = 0; c < r.length; ++c) i.moveToElementText(r[c]), -1 < i.compareEndPoints("StartToEnd", e) && i.compareEndPoints("EndToStart", e) < 1 && o.push(r[c]);
            }
            return o;
        }
        function i(r) {
            if (t.core.hasFocus()) {
                if (o(), r && "keyup" === r.type && (r.altKey || r.which == e.FE.KEYCODE.ALT)) return !0;
                setTimeout(function() {
                    if (!r || r && (1 == r.which || "mouseup" != r.type)) {
                        var i = n(), o = t.image ? t.image.get() : null;
                        if (i && !o) {
                            if (t.image) {
                                var s = t.node.contents(i);
                                if (1 == s.length && "IMG" == s[0].tagName) {
                                    var l = t.selection.ranges(0);
                                    return 0 === l.startOffset && 0 === l.endOffset ? e(i).before(e.FE.MARKERS) : e(i).after(e.FE.MARKERS), 
                                    t.selection.restore(), !1;
                                }
                            }
                            r && r.stopPropagation(), a(i);
                        }
                    }
                }, t.helpers.isIOS() ? 100 : 0);
            }
        }
        function a(r) {
            var i = t.popups.get("link.edit");
            i || (i = function() {
                var e = "";
                1 <= t.opts.linkEditButtons.length && ("A" == t.el.tagName && 0 <= t.opts.linkEditButtons.indexOf("linkRemove") && t.opts.linkEditButtons.splice(t.opts.linkEditButtons.indexOf("linkRemove"), 1), 
                e = '<div class="fr-buttons">' + t.button.buildList(t.opts.linkEditButtons) + "</div>");
                var r = {
                    buttons: e
                }, i = t.popups.create("link.edit", r);
                return t.$wp && t.events.$on(t.$wp, "scroll.link-edit", function() {
                    n() && t.popups.isVisible("link.edit") && a(n());
                }), i;
            }());
            var o = e(r);
            t.popups.isVisible("link.edit") || t.popups.refresh("link.edit"), t.popups.setContainer("link.edit", t.$sc);
            var s = o.offset().left + e(r).outerWidth() / 2, l = o.offset().top + o.outerHeight();
            t.popups.show("link.edit", s, l, o.outerHeight());
        }
        function o() {
            t.popups.hide("link.edit");
        }
        function s() {}
        function l() {
            var r = t.popups.get("link.insert"), i = n();
            if (i) {
                var a, o, s = e(i), l = r.find('input.fr-link-attr[type="text"]'), d = r.find('input.fr-link-attr[type="checkbox"]');
                for (a = 0; a < l.length; a++) (o = e(l[a])).val(s.attr(o.attr("name") || ""));
                for (d.prop("checked", !1), a = 0; a < d.length; a++) o = e(d[a]), s.attr(o.attr("name")) == o.data("checked") && o.prop("checked", !0);
                r.find('input.fr-link-attr[type="text"][name="text"]').val(s.text());
            } else r.find('input.fr-link-attr[type="text"]').val(""), r.find('input.fr-link-attr[type="checkbox"]').prop("checked", !1), 
            r.find('input.fr-link-attr[type="text"][name="text"]').val(t.selection.text());
            r.find("input.fr-link-attr").trigger("change"), (t.image ? t.image.get() : null) ? r.find('.fr-link-attr[name="text"]').parent().hide() : r.find('.fr-link-attr[name="text"]').parent().show();
        }
        function d(e) {
            if (e) return t.popups.onRefresh("link.insert", l), t.popups.onHide("link.insert", s), 
            !0;
            var n = "";
            1 <= t.opts.linkInsertButtons.length && (n = '<div class="fr-buttons">' + t.button.buildList(t.opts.linkInsertButtons) + "</div>");
            var r = "", i = 0;
            for (var a in r = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-' + t.id + '">', 
            r += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-' + t.id + '" name="href" type="text" class="fr-link-attr" placeholder="' + t.language.translate("URL") + '" tabIndex="' + ++i + '"></div>', 
            t.opts.linkText && (r += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-' + t.id + '" name="text" type="text" class="fr-link-attr" placeholder="' + t.language.translate("Text") + '" tabIndex="' + ++i + '"></div>'), 
            t.opts.linkAttributes) if (t.opts.linkAttributes.hasOwnProperty(a)) {
                var o = t.opts.linkAttributes[a];
                r += '<div class="fr-input-line"><input name="' + a + '" type="text" class="fr-link-attr" placeholder="' + t.language.translate(o) + '" tabIndex="' + ++i + '"></div>';
            }
            t.opts.linkAlwaysBlank || (r += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-' + t.id + '" tabIndex="' + ++i + '"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg></span></span><label for="fr-link-target-' + t.id + '">' + t.language.translate("Open in new tab") + "</label></div>");
            var d = {
                buttons: n,
                input_layer: r += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="' + ++i + '" type="button">' + t.language.translate("Insert") + "</button></div></div>"
            }, c = t.popups.create("link.insert", d);
            return t.$wp && t.events.$on(t.$wp, "scroll.link-insert", function() {
                (t.image ? t.image.get() : null) && t.popups.isVisible("link.insert") && p(), t.popups.isVisible("link.insert") && f();
            }), c;
        }
        function c(a, o, s) {
            if (void 0 === s && (s = {}), !1 === t.events.trigger("link.beforeInsert", [ a, o, s ])) return !1;
            var l = t.image ? t.image.get() : null;
            l || "A" == t.el.tagName ? "A" == t.el.tagName && t.$el.focus() : (t.selection.restore(), 
            t.popups.hide("link.insert"));
            var d = a;
            if (t.opts.linkConvertEmailAddress && t.helpers.isEmail(a) && !/^mailto:.*/i.test(a) && (a = "mailto:" + a), 
            "" === t.opts.linkAutoPrefix || new RegExp("^(" + e.FE.LinkProtocols.join("|") + "):.", "i").test(a) || /^data:image.*/i.test(a) || /^(https?:|ftps?:|file:|)\/\//i.test(a) || /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(a) || [ "/", "{", "[", "#", "(", "." ].indexOf((a || "")[0]) < 0 && (a = t.opts.linkAutoPrefix + t.helpers.sanitizeURL(a)), 
            a = t.helpers.sanitizeURL(a), t.opts.linkAlwaysBlank && (s.target = "_blank"), t.opts.linkAlwaysNoFollow && (s.rel = "nofollow"), 
            "_blank" == s.target ? (t.opts.linkNoOpener && (s.rel ? s.rel += " noopener" : s.rel = "noopener"), 
            t.opts.linkNoReferrer && (s.rel ? s.rel += " noreferrer" : s.rel = "noreferrer")) : null == s.target && (s.rel ? s.rel = s.rel.replace(/noopener/, "").replace(/noreferrer/, "") : s.rel = null), 
            o = o || "", a === t.opts.linkAutoPrefix) return t.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"), 
            t.events.trigger("link.bad", [ d ]), !1;
            var c, f = n();
            if (f) {
                if ((c = e(f)).attr("href", a), 0 < o.length && c.text() != o && !l) {
                    for (var p = c.get(0); 1 === p.childNodes.length && p.childNodes[0].nodeType == Node.ELEMENT_NODE; ) p = p.childNodes[0];
                    e(p).text(o);
                }
                l || c.prepend(e.FE.START_MARKER).append(e.FE.END_MARKER), c.attr(s), l || t.selection.restore();
            } else {
                l ? l.wrap('<a href="' + a + '"></a>') : (t.format.remove("a"), t.selection.isCollapsed() ? (o = 0 === o.length ? d : o, 
                t.html.insert('<a href="' + a + '">' + e.FE.START_MARKER + o.replace(/&/g, "&amp;") + e.FE.END_MARKER + "</a>"), 
                t.selection.restore()) : 0 < o.length && o != t.selection.text().replace(/\n/g, "") ? (t.selection.remove(), 
                t.html.insert('<a href="' + a + '">' + e.FE.START_MARKER + o.replace(/&/g, "&amp;") + e.FE.END_MARKER + "</a>"), 
                t.selection.restore()) : (function() {
                    if (!t.selection.isCollapsed()) {
                        t.selection.save();
                        for (var n = t.$el.find(".fr-marker").addClass("fr-unprocessed").toArray(); n.length; ) {
                            var r = e(n.pop());
                            r.removeClass("fr-unprocessed");
                            var i = t.node.deepestParent(r.get(0));
                            if (i) {
                                for (var a = r.get(0), o = "", s = ""; a = a.parentNode, t.node.isBlock(a) || (o += t.node.closeTagString(a), 
                                s = t.node.openTagString(a) + s), a != i; ) ;
                                var l = t.node.openTagString(r.get(0)) + r.html() + t.node.closeTagString(r.get(0));
                                r.replaceWith('<span id="fr-break"></span>');
                                var d = i.outerHTML;
                                d = d.replace(/<span id="fr-break"><\/span>/g, o + l + s), i.outerHTML = d;
                            }
                            n = t.$el.find(".fr-marker.fr-unprocessed").toArray();
                        }
                        t.html.cleanEmptyTags(), t.selection.restore();
                    }
                }(), t.format.apply("a", {
                    href: a
                })));
                for (var u = r(), h = 0; h < u.length; h++) (c = e(u[h])).attr(s), c.removeAttr("_moz_dirty");
                1 == u.length && t.$wp && !l && (e(u[0]).prepend(e.FE.START_MARKER).append(e.FE.END_MARKER), 
                t.selection.restore());
            }
            if (l) {
                var g = t.popups.get("link.insert");
                g && g.find("input:focus").blur(), t.image.edit(l);
            } else i();
        }
        function f() {
            o();
            var r = n();
            if (r) {
                var i = t.popups.get("link.insert");
                i || (i = d()), t.popups.isVisible("link.insert") || (t.popups.refresh("link.insert"), 
                t.selection.save(), t.helpers.isMobile() && (t.events.disableBlur(), t.$el.blur(), 
                t.events.enableBlur())), t.popups.setContainer("link.insert", t.$sc);
                var a = (t.image ? t.image.get() : null) || e(r), s = a.offset().left + a.outerWidth() / 2, l = a.offset().top + a.outerHeight();
                t.popups.show("link.insert", s, l, a.outerHeight());
            }
        }
        function p() {
            var e = t.image ? t.image.getEl() : null;
            if (e) {
                var n = t.popups.get("link.insert");
                t.image.hasCaption() && (e = e.find(".fr-img-wrap")), n || (n = d()), l(), t.popups.setContainer("link.insert", t.$sc);
                var r = e.offset().left + e.outerWidth() / 2, i = e.offset().top + e.outerHeight();
                t.popups.show("link.insert", r, i, e.outerHeight());
            }
        }
        return {
            _init: function() {
                t.events.on("keyup", function(t) {
                    t.which != e.FE.KEYCODE.ESC && i(t);
                }), t.events.on("window.mouseup", i), t.events.$on(t.$el, "click", "a", function(e) {
                    t.edit.isDisabled() && e.preventDefault();
                }), t.helpers.isMobile() && t.events.$on(t.$doc, "selectionchange", i), d(!0), "A" == t.el.tagName && t.$el.addClass("fr-view"), 
                t.events.on("toolbar.esc", function() {
                    if (t.popups.isVisible("link.edit")) return t.events.disableBlur(), t.events.focus(), 
                    !1;
                }, !0);
            },
            remove: function() {
                var r = n(), i = t.image ? t.image.get() : null;
                if (!1 === t.events.trigger("link.beforeRemove", [ r ])) return !1;
                i && r ? (i.unwrap(), t.image.edit(i)) : r && (t.selection.save(), e(r).replaceWith(e(r).html()), 
                t.selection.restore(), o());
            },
            showInsertPopup: function() {
                var e = t.$tb.find('.fr-command[data-cmd="insertLink"]'), n = t.popups.get("link.insert");
                if (n || (n = d()), !n.hasClass("fr-active")) if (t.popups.refresh("link.insert"), 
                t.popups.setContainer("link.insert", t.$tb || t.$sc), e.is(":visible")) {
                    var r = e.offset().left + e.outerWidth() / 2, i = e.offset().top + (t.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                    t.popups.show("link.insert", r, i, e.outerHeight());
                } else t.position.forSelection(n), t.popups.show("link.insert");
            },
            usePredefined: function(n) {
                var r, i, a = t.opts.linkList[n], o = t.popups.get("link.insert"), s = o.find('input.fr-link-attr[type="text"]'), l = o.find('input.fr-link-attr[type="checkbox"]');
                for (i = 0; i < s.length; i++) a[(r = e(s[i])).attr("name")] ? r.val(a[r.attr("name")]) : "text" != r.attr("name") && r.val("");
                for (i = 0; i < l.length; i++) (r = e(l[i])).prop("checked", r.data("checked") == a[r.attr("name")]);
                t.accessibility.focusPopup(o);
            },
            insertCallback: function() {
                var n, r, i = t.popups.get("link.insert"), a = i.find('input.fr-link-attr[type="text"]'), o = i.find('input.fr-link-attr[type="checkbox"]'), s = (a.filter('[name="href"]').val() || "").trim(), l = a.filter('[name="text"]').val(), d = {};
                for (r = 0; r < a.length; r++) n = e(a[r]), [ "href", "text" ].indexOf(n.attr("name")) < 0 && (d[n.attr("name")] = n.val());
                for (r = 0; r < o.length; r++) (n = e(o[r])).is(":checked") ? d[n.attr("name")] = n.data("checked") : d[n.attr("name")] = n.data("unchecked") || null;
                var f = t.helpers.scrollTop();
                c(s, l, d), e(t.o_win).scrollTop(f);
            },
            insert: c,
            update: f,
            get: n,
            allSelected: r,
            back: function() {
                t.image && t.image.get() ? t.image.back() : (t.events.disableBlur(), t.selection.restore(), 
                t.events.enableBlur(), n() && t.$wp ? (t.selection.restore(), o(), i()) : "A" == t.el.tagName ? (t.$el.focus(), 
                i()) : (t.popups.hide("link.insert"), t.toolbar.showInline()));
            },
            imageLink: p,
            applyStyle: function(r, a, o) {
                void 0 === o && (o = t.opts.linkMultipleStyles), void 0 === a && (a = t.opts.linkStyles);
                var s = n();
                if (!s) return !1;
                if (!o) {
                    var l = Object.keys(a);
                    l.splice(l.indexOf(r), 1), e(s).removeClass(l.join(" "));
                }
                e(s).toggleClass(r), i();
            }
        };
    }, e.FE.DefineIcon("insertLink", {
        NAME: "link"
    }), e.FE.RegisterShortcut(e.FE.KEYCODE.K, "insertLink", null, "K"), e.FE.RegisterCommand("insertLink", {
        title: "Insert Link",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), 
            this.selection.restore()), this.popups.hide("link.insert")) : this.link.showInsertPopup();
        },
        plugin: "link"
    }), e.FE.DefineIcon("linkOpen", {
        NAME: "external-link",
        FA5NAME: "external-link-alt"
    }), e.FE.RegisterCommand("linkOpen", {
        title: "Open Link",
        undo: !1,
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden");
        },
        callback: function() {
            var e = this.link.get();
            e && (this.o_win.open(e.href, "_blank", "noopener"), this.popups.hide("link.edit"));
        },
        plugin: "link"
    }), e.FE.DefineIcon("linkEdit", {
        NAME: "edit"
    }), e.FE.RegisterCommand("linkEdit", {
        title: "Edit Link",
        undo: !1,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.link.update();
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden");
        },
        plugin: "link"
    }), e.FE.DefineIcon("linkRemove", {
        NAME: "unlink"
    }), e.FE.RegisterCommand("linkRemove", {
        title: "Unlink",
        callback: function() {
            this.link.remove();
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden");
        },
        plugin: "link"
    }), e.FE.DefineIcon("linkBack", {
        NAME: "arrow-left"
    }), e.FE.RegisterCommand("linkBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.back();
        },
        refresh: function(e) {
            var t = this.link.get() && this.doc.hasFocus();
            (this.image ? this.image.get() : null) || t || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), 
            e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
        },
        plugin: "link"
    }), e.FE.DefineIcon("linkList", {
        NAME: "search"
    }), e.FE.RegisterCommand("linkList", {
        title: "Choose Link",
        type: "dropdown",
        focus: !1,
        undo: !1,
        refreshAfterCallback: !1,
        html: function() {
            for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.linkList, n = 0; n < t.length; n++) e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="' + n + '">' + (t[n].displayText || t[n].text) + "</a></li>";
            return e += "</ul>";
        },
        callback: function(e, t) {
            this.link.usePredefined(t);
        },
        plugin: "link"
    }), e.FE.RegisterCommand("linkInsert", {
        focus: !1,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.insertCallback();
        },
        refresh: function(e) {
            this.link.get() ? e.text(this.language.translate("Update")) : e.text(this.language.translate("Insert"));
        },
        plugin: "link"
    }), e.FE.DefineIcon("imageLink", {
        NAME: "link"
    }), e.FE.RegisterCommand("imageLink", {
        title: "Insert Link",
        undo: !1,
        focus: !1,
        popup: !0,
        callback: function() {
            this.link.imageLink();
        },
        refresh: function(e) {
            var t;
            this.link.get() ? ((t = e.prev()).hasClass("fr-separator") && t.removeClass("fr-hidden"), 
            e.addClass("fr-hidden")) : ((t = e.prev()).hasClass("fr-separator") && t.addClass("fr-hidden"), 
            e.removeClass("fr-hidden"));
        },
        plugin: "link"
    }), e.FE.DefineIcon("linkStyle", {
        NAME: "magic"
    }), e.FE.RegisterCommand("linkStyle", {
        title: "Style",
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.linkStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="' + n + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>";
        },
        callback: function(e, t) {
            this.link.applyStyle(t);
        },
        refreshOnShow: function(t, n) {
            var r = this.link.get();
            if (r) {
                var i = e(r);
                n.find(".fr-command").each(function() {
                    var t = e(this).data("param1"), n = i.hasClass(t);
                    e(this).toggleClass("fr-active", n).attr("aria-selected", n);
                });
            }
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden");
        },
        plugin: "link"
    }), e.FE.PLUGINS.lists = function(t) {
        function n(e) {
            return '<span class="fr-open-' + e.toLowerCase() + '"></span>';
        }
        function r(e) {
            return '<span class="fr-close-' + e.toLowerCase() + '"></span>';
        }
        function i(n, r) {
            !function(n, r) {
                for (var i = [], a = 0; a < n.length; a++) {
                    var o = n[a].parentNode;
                    "LI" == n[a].tagName && o.tagName != r && i.indexOf(o) < 0 && i.push(o);
                }
                for (a = i.length - 1; 0 <= a; a--) {
                    var s = e(i[a]);
                    s.replaceWith("<" + r.toLowerCase() + " " + t.node.attributes(s.get(0)) + ">" + s.html() + "</" + r.toLowerCase() + ">");
                }
            }(n, r);
            var i, a = t.html.defaultTag(), o = null;
            n.length && (i = "rtl" == t.opts.direction || "rtl" == e(n[0]).css("direction") ? "margin-right" : "margin-left");
            for (var s = 0; s < n.length; s++) if ("LI" != n[s].tagName) {
                var l = t.helpers.getPX(e(n[s]).css(i)) || 0;
                (n[s].style.marginLeft = null) === o && (o = l);
                var d = 0 < o ? "<" + r + ' style="' + i + ": " + o + 'px;">' : "<" + r + ">", c = "</" + r + ">";
                for (l -= o; 0 < l / t.opts.indentMargin; ) d += "<" + r + ">", c += c, l -= t.opts.indentMargin;
                a && n[s].tagName.toLowerCase() == a ? e(n[s]).replaceWith(d + "<li" + t.node.attributes(n[s]) + ">" + e(n[s]).html() + "</li>" + c) : e(n[s]).wrap(d + "<li></li>" + c);
            }
            t.clean.lists();
        }
        function a(i) {
            var a, o;
            for (a = i.length - 1; 0 <= a; a--) for (o = a - 1; 0 <= o; o--) if (e(i[o]).find(i[a]).length || i[o] == i[a]) {
                i.splice(a, 1);
                break;
            }
            var s = [];
            for (a = 0; a < i.length; a++) {
                var l = e(i[a]), d = i[a].parentNode, c = l.attr("class");
                if (l.before(r(d.tagName)), "LI" == d.parentNode.tagName) l.before(r("LI")), l.after(n("LI")); else {
                    var f = "";
                    c && (f += ' class="' + c + '"');
                    var p = "rtl" == t.opts.direction || "rtl" == l.css("direction") ? "margin-right" : "margin-left";
                    t.helpers.getPX(e(d).css(p)) && 0 <= (e(d).attr("style") || "").indexOf(p + ":") && (f += ' style="' + p + ":" + t.helpers.getPX(e(d).css(p)) + 'px;"'), 
                    t.html.defaultTag() && 0 === l.find(t.html.blockTagsQuery()).length && l.wrapInner("<" + t.html.defaultTag() + f + "></" + t.html.defaultTag() + ">"), 
                    t.node.isEmpty(l.get(0), !0) || 0 !== l.find(t.html.blockTagsQuery()).length || l.append("<br>"), 
                    l.append(n("LI")), l.prepend(r("LI"));
                }
                l.after(n(d.tagName)), "LI" == d.parentNode.tagName && (d = d.parentNode.parentNode), 
                s.indexOf(d) < 0 && s.push(d);
            }
            for (a = 0; a < s.length; a++) {
                var u = e(s[a]), h = u.html();
                h = (h = h.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>")).replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"), 
                u.replaceWith(t.node.openTagString(u.get(0)) + h + t.node.closeTagString(u.get(0)));
            }
            t.$el.find("li:empty").remove(), t.$el.find("ul:empty, ol:empty").remove(), t.clean.lists(), 
            t.html.wrap();
        }
        function o(n) {
            t.selection.save();
            for (var r = 0; r < n.length; r++) {
                var i = n[r].previousSibling;
                if (i) {
                    var a = e(n[r]).find("> ul, > ol").last().get(0);
                    if (a) {
                        for (var o = e("<li>").prependTo(e(a)), s = t.node.contents(n[r])[0]; s && !t.node.isList(s); ) {
                            var l = s.nextSibling;
                            o.append(s), s = l;
                        }
                        e(i).append(e(a)), e(n[r]).remove();
                    } else {
                        var d = e(i).find("> ul, > ol").last().get(0);
                        if (d) e(d).append(e(n[r])); else {
                            var c = e("<" + n[r].parentNode.tagName + ">");
                            e(i).append(c), c.append(e(n[r]));
                        }
                    }
                }
            }
            t.clean.lists(), t.selection.restore();
        }
        function s(e) {
            t.selection.save(), a(e), t.selection.restore();
        }
        function l(e) {
            if ("indent" == e || "outdent" == e) {
                for (var n = !1, r = t.selection.blocks(), i = [], a = 0; a < r.length; a++) "LI" == r[a].tagName ? (n = !0, 
                i.push(r[a])) : "LI" == r[a].parentNode.tagName && (n = !0, i.push(r[a].parentNode));
                n && ("indent" == e ? o(i) : s(i));
            }
        }
        return {
            _init: function() {
                t.events.on("commands.after", l), t.events.on("keydown", function(n) {
                    if (n.which == e.FE.KEYCODE.TAB) {
                        for (var r = t.selection.blocks(), i = [], a = 0; a < r.length; a++) "LI" == r[a].tagName ? i.push(r[a]) : "LI" == r[a].parentNode.tagName && i.push(r[a].parentNode);
                        if (1 < i.length || i.length && (t.selection.info(i[0]).atStart || t.node.isEmpty(i[0]))) return n.preventDefault(), 
                        n.stopPropagation(), n.shiftKey ? s(i) : o(i), !1;
                    }
                }, !0);
            },
            format: function(e) {
                t.selection.save(), t.html.wrap(!0, !0, !0, !0), t.selection.restore();
                for (var n = t.selection.blocks(), r = 0; r < n.length; r++) "LI" != n[r].tagName && "LI" == n[r].parentNode.tagName && (n[r] = n[r].parentNode);
                t.selection.save(), function(e, t) {
                    for (var n = !0, r = 0; r < e.length; r++) {
                        if ("LI" != e[r].tagName) return !1;
                        e[r].parentNode.tagName != t && (n = !1);
                    }
                    return n;
                }(n, e) ? a(n) : i(n, e), t.html.unwrap(), t.selection.restore();
            },
            refresh: function(n, r) {
                var i = e(t.selection.element());
                if (i.get(0) != t.el) {
                    var a = i.get(0);
                    (a = "LI" != a.tagName && a.firstElementChild && "LI" != a.firstElementChild.tagName ? i.parents("li").get(0) : "LI" == a.tagName || a.firstElementChild ? a.firstElementChild && "LI" == a.firstElementChild.tagName ? i.get(0).firstChild : i.get(0) : i.parents("li").get(0)) && a.parentNode.tagName == r && t.el.contains(a.parentNode) && n.addClass("fr-active");
                }
            }
        };
    }, e.FE.RegisterCommand("formatUL", {
        title: "Unordered List",
        refresh: function(e) {
            this.lists.refresh(e, "UL");
        },
        callback: function() {
            this.lists.format("UL");
        },
        plugin: "lists"
    }), e.FE.RegisterCommand("formatOL", {
        title: "Ordered List",
        refresh: function(e) {
            this.lists.refresh(e, "OL");
        },
        callback: function() {
            this.lists.format("OL");
        },
        plugin: "lists"
    }), e.FE.DefineIcon("formatUL", {
        NAME: "list-ul"
    }), e.FE.DefineIcon("formatOL", {
        NAME: "list-ol"
    }), e.extend(e.FE.DEFAULTS, {
        paragraphFormat: {
            N: "Normal",
            H1: "Heading 1",
            H2: "Heading 2",
            H3: "Heading 3",
            H4: "Heading 4",
            PRE: "Code"
        },
        paragraphFormatSelection: !1,
        paragraphDefaultSelection: "Paragraph Format"
    }), e.FE.PLUGINS.paragraphFormat = function(t) {
        function n(n, r) {
            var i = t.html.defaultTag();
            if (r && r.toLowerCase() != i) if (0 < n.find("ul, ol").length) {
                var a = e("<" + r + ">");
                n.prepend(a);
                for (var o = t.node.contents(n.get(0))[0]; o && [ "UL", "OL" ].indexOf(o.tagName) < 0; ) {
                    var s = o.nextSibling;
                    a.append(o), o = s;
                }
            } else n.html("<" + r + ">" + n.html() + "</" + r + ">");
        }
        return {
            apply: function(r) {
                "N" == r && (r = t.html.defaultTag()), t.selection.save(), t.html.wrap(!0, !0, !t.opts.paragraphFormat.BLOCKQUOTE, !0, !0), 
                t.selection.restore();
                var i, a, o, s, l, d, c, f, p = t.selection.blocks();
                t.selection.save(), t.$el.find("pre").attr("skip", !0);
                for (var u = 0; u < p.length; u++) if (p[u].tagName != r && !t.node.isList(p[u])) {
                    var h = e(p[u]);
                    "LI" == p[u].tagName ? n(h, r) : "LI" == p[u].parentNode.tagName && p[u] ? (d = h, 
                    c = r, f = t.html.defaultTag(), c && c.toLowerCase() != f || (c = 'div class="fr-temp-div"'), 
                    d.replaceWith(e("<" + c + ">").html(d.html()))) : 0 <= [ "TD", "TH" ].indexOf(p[u].parentNode.tagName) ? (o = h, 
                    s = r, l = t.html.defaultTag(), s || (s = 'div class="fr-temp-div"' + (t.node.isEmpty(o.get(0), !0) ? ' data-empty="true"' : "")), 
                    s.toLowerCase() == l ? (t.node.isEmpty(o.get(0), !0) || o.append("<br/>"), o.replaceWith(o.html())) : o.replaceWith(e("<" + s + ">").html(o.html()))) : (i = h, 
                    (a = r) || (a = 'div class="fr-temp-div"' + (t.node.isEmpty(i.get(0), !0) ? ' data-empty="true"' : "")), 
                    i.replaceWith(e("<" + a + " " + t.node.attributes(i.get(0)) + ">").html(i.html()).removeAttr("data-empty")));
                }
                t.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function() {
                    e(this).prev().append("<br>" + e(this).html()), e(this).remove();
                }), t.$el.find("pre").removeAttr("skip"), t.html.unwrap(), t.selection.restore();
            },
            refreshOnShow: function(e, n) {
                var r = t.selection.blocks();
                if (r.length) {
                    var i = r[0], a = "N", o = t.html.defaultTag();
                    i.tagName.toLowerCase() != o && i != t.el && (a = i.tagName), n.find('.fr-command[data-param1="' + a + '"]').addClass("fr-active").attr("aria-selected", !0);
                } else n.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected", !0);
            },
            refresh: function(e) {
                if (t.opts.paragraphFormatSelection) {
                    var n = t.selection.blocks();
                    if (n.length) {
                        var r = n[0], i = "N", a = t.html.defaultTag();
                        r.tagName.toLowerCase() != a && r != t.el && (i = r.tagName), 0 <= [ "LI", "TD", "TH" ].indexOf(i) && (i = "N"), 
                        e.find("> span").text(t.language.translate(t.opts.paragraphFormat[i]));
                    } else e.find("> span").text(t.language.translate(t.opts.paragraphFormat.N));
                }
            }
        };
    }, e.FE.RegisterCommand("paragraphFormat", {
        type: "dropdown",
        displaySelection: function(e) {
            return e.opts.paragraphFormatSelection;
        },
        defaultSelection: function(e) {
            return e.language.translate(e.opts.paragraphDefaultSelection);
        },
        displaySelectionWidth: 125,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.paragraphFormat;
            for (var n in t) if (t.hasOwnProperty(n)) {
                var r = this.shortcuts.get("paragraphFormat." + n);
                r = r ? '<span class="fr-shortcut">' + r + "</span>" : "", e += '<li role="presentation"><' + ("N" == n ? this.html.defaultTag() || "DIV" : n) + ' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></" + ("N" == n ? this.html.defaultTag() || "DIV" : n) + "></li>";
            }
            return e += "</ul>";
        },
        title: "Paragraph Format",
        callback: function(e, t) {
            this.paragraphFormat.apply(t);
        },
        refresh: function(e) {
            this.paragraphFormat.refresh(e);
        },
        refreshOnShow: function(e, t) {
            this.paragraphFormat.refreshOnShow(e, t);
        },
        plugin: "paragraphFormat"
    }), e.FE.DefineIcon("paragraphFormat", {
        NAME: "paragraph"
    }), e.extend(e.FE.DEFAULTS, {
        paragraphStyles: {
            "fr-text-gray": "Gray",
            "fr-text-bordered": "Bordered",
            "fr-text-spaced": "Spaced",
            "fr-text-uppercase": "Uppercase"
        },
        paragraphMultipleStyles: !0
    }), e.FE.PLUGINS.paragraphStyle = function(t) {
        return {
            _init: function() {},
            apply: function(n, r, i) {
                void 0 === r && (r = t.opts.paragraphStyles), void 0 === i && (i = t.opts.paragraphMultipleStyles);
                var a = "";
                i || ((a = Object.keys(r)).splice(a.indexOf(n), 1), a = a.join(" ")), t.selection.save(), 
                t.html.wrap(!0, !0, !0, !0), t.selection.restore();
                var o = t.selection.blocks();
                t.selection.save();
                for (var s = e(o[0]).hasClass(n), l = 0; l < o.length; l++) e(o[l]).removeClass(a).toggleClass(n, !s), 
                e(o[l]).hasClass("fr-temp-div") && e(o[l]).removeClass("fr-temp-div"), "" === e(o[l]).attr("class") && e(o[l]).removeAttr("class");
                t.html.unwrap(), t.selection.restore();
            },
            refreshOnShow: function(n, r) {
                var i = t.selection.blocks();
                if (i.length) {
                    var a = e(i[0]);
                    r.find(".fr-command").each(function() {
                        var t = e(this).data("param1"), n = a.hasClass(t);
                        e(this).toggleClass("fr-active", n).attr("aria-selected", n);
                    });
                }
            }
        };
    }, e.FE.RegisterCommand("paragraphStyle", {
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.paragraphStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command ' + n + '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>";
        },
        title: "Paragraph Style",
        callback: function(e, t) {
            this.paragraphStyle.apply(t);
        },
        refreshOnShow: function(e, t) {
            this.paragraphStyle.refreshOnShow(e, t);
        },
        plugin: "paragraphStyle"
    }), e.FE.DefineIcon("paragraphStyle", {
        NAME: "magic"
    }), e.FE.PLUGINS.print = function(e) {
        return {
            run: function() {
                var t = e.$el.html(), n = null;
                e.shared.print_iframe ? n = e.shared.print_iframe : ((n = document.createElement("iframe")).name = "fr-print", 
                n.style.position = "fixed", n.style.top = "0", n.style.left = "-9999px", n.style.height = "100%", 
                n.style.width = "0", n.style.overflow = "hidden", n.style["z-index"] = "2147483647", 
                n.style.tabIndex = "-1", document.body.appendChild(n), n.onload = function() {
                    setTimeout(function() {
                        e.events.disableBlur(), window.frames["fr-print"].focus(), window.frames["fr-print"].print(), 
                        e.$win.get(0).focus(), e.events.disableBlur(), e.events.focus();
                    }, 0);
                }, e.events.on("shared.destroy", function() {
                    n.remove();
                }), e.shared.print_iframe = n);
                var r = n.contentWindow;
                r.document.open(), r.document.write("<!DOCTYPE html><html><head><title>" + document.title + "</title>"), 
                Array.prototype.forEach.call(document.querySelectorAll("style"), function(e) {
                    e = e.cloneNode(!0), r.document.write(e.outerHTML);
                });
                var i = document.querySelectorAll("link[rel=stylesheet]");
                Array.prototype.forEach.call(i, function(e) {
                    var t = document.createElement("link");
                    t.rel = e.rel, t.href = e.href, t.media = "print", t.type = "text/css", t.media = "all", 
                    r.document.write(t.outerHTML);
                }), r.document.write('</head><body style="text-align: ' + ("rtl" == e.opts.direction ? "right" : "left") + "; direction: " + e.opts.direction + ';"><div class="fr-view">'), 
                r.document.write(t), r.document.write("</div></body></html>"), r.document.close();
            }
        };
    }, e.FE.DefineIcon("print", {
        NAME: "print"
    }), e.FE.RegisterCommand("print", {
        title: "Print",
        undo: !1,
        focus: !1,
        plugin: "print",
        callback: function() {
            this.print.run();
        }
    }), e.extend(e.FE.DEFAULTS, {
        quickInsertButtons: [ "image", "video", "embedly", "table", "ul", "ol", "hr" ],
        quickInsertTags: [ "p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote" ]
    }), e.FE.QUICK_INSERT_BUTTONS = {}, e.FE.DefineIcon("quickInsert", {
        PATH: '<path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/>',
        template: "svg"
    }), e.FE.RegisterQuickInsertButton = function(t, n) {
        e.FE.QUICK_INSERT_BUTTONS[t] = e.extend({
            undo: !0
        }, n);
    }, e.FE.RegisterQuickInsertButton("image", {
        icon: "insertImage",
        requiredPlugin: "image",
        title: "Insert Image",
        undo: !1,
        callback: function() {
            var t = this;
            t.shared.$qi_image_input || (t.shared.$qi_image_input = e('<input accept="image/*" name="quickInsertImage' + this.id + '" style="display: none;" type="file">'), 
            e("body:first").append(t.shared.$qi_image_input), t.events.$on(t.shared.$qi_image_input, "change", function() {
                var t = e(this).data("inst");
                this.files && (t.quickInsert.hide(), t.image.upload(this.files)), e(this).val("");
            }, !0)), t.$qi_image_input = t.shared.$qi_image_input, t.helpers.isMobile() && t.selection.save(), 
            t.events.disableBlur(), t.$qi_image_input.data("inst", t).trigger("click");
        }
    }), e.FE.RegisterQuickInsertButton("video", {
        icon: "insertVideo",
        requiredPlugin: "video",
        title: "Insert Video",
        undo: !1,
        callback: function() {
            var e = prompt(this.language.translate("Paste the URL of the video you want to insert."));
            e && this.video.insertByURL(e);
        }
    }), e.FE.RegisterQuickInsertButton("embedly", {
        icon: "embedly",
        requiredPlugin: "embedly",
        title: "Embed URL",
        undo: !1,
        callback: function() {
            var e = prompt(this.language.translate("Paste the URL of any web content you want to insert."));
            e && this.embedly.add(e);
        }
    }), e.FE.RegisterQuickInsertButton("table", {
        icon: "insertTable",
        requiredPlugin: "table",
        title: "Insert Table",
        callback: function() {
            this.table.insert(2, 2);
        }
    }), e.FE.RegisterQuickInsertButton("ol", {
        icon: "formatOL",
        requiredPlugin: "lists",
        title: "Ordered List",
        callback: function() {
            this.lists.format("OL");
        }
    }), e.FE.RegisterQuickInsertButton("ul", {
        icon: "formatUL",
        requiredPlugin: "lists",
        title: "Unordered List",
        callback: function() {
            this.lists.format("UL");
        }
    }), e.FE.RegisterQuickInsertButton("hr", {
        icon: "insertHR",
        title: "Insert Horizontal Line",
        callback: function() {
            this.commands.insertHR();
        }
    }), e.FE.PLUGINS.quickInsert = function(t) {
        function n(n) {
            var r, i, a;
            r = n.offset().top - t.$box.offset().top, i = 0 - l.outerWidth(), t.opts.enter != e.FE.ENTER_BR ? a = (l.outerHeight() - n.outerHeight()) / 2 : (e("<span>" + e.FE.INVISIBLE_SPACE + "</span>").insertAfter(n), 
            a = (l.outerHeight() - n.next().outerHeight()) / 2, n.next().remove()), t.opts.iframe && (r += t.$iframe.offset().top - t.helpers.scrollTop()), 
            l.hasClass("fr-on") && 0 <= r && d.css("top", r - a), 0 <= r && r - a <= t.$box.outerHeight() - n.outerHeight() ? (l.hasClass("fr-hidden") && (l.hasClass("fr-on") && o(), 
            l.removeClass("fr-hidden")), l.css("top", r - a)) : l.hasClass("fr-visible") && (l.addClass("fr-hidden"), 
            s()), l.css("left", i);
        }
        function r(r) {
            l || function() {
                t.shared.$quick_insert || (t.shared.$quick_insert = e('<div class="fr-quick-insert"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + t.language.translate("Quick Insert") + '">' + t.icon.create("quickInsert") + "</a></div>")), 
                l = t.shared.$quick_insert, t.tooltip.bind(t.$box, ".fr-quick-insert > a.fr-floating-btn"), 
                t.events.on("destroy", function() {
                    l.removeClass("fr-on").appendTo(e("body:first")).css("left", -9999).css("top", -9999), 
                    d && (s(), d.appendTo(e("body:first")));
                }, !0), t.events.on("shared.destroy", function() {
                    l.html("").removeData().remove(), l = null, d && (d.html("").removeData().remove(), 
                    d = null);
                }, !0), t.events.on("commands.before", a), t.events.on("commands.after", function() {
                    t.popups.areVisible() || i();
                }), t.events.bindClick(t.$box, ".fr-quick-insert > a", o), t.events.bindClick(t.$box, ".fr-qi-helper > a.fr-btn", function(n) {
                    var r = e(n.currentTarget).data("cmd");
                    if (!1 === t.events.trigger("quickInsert.commands.before", [ r ])) return !1;
                    e.FE.QUICK_INSERT_BUTTONS[r].callback.apply(t, [ n.currentTarget ]), e.FE.QUICK_INSERT_BUTTONS[r].undo && t.undo.saveStep(), 
                    t.events.trigger("quickInsert.commands.after", [ r ]), t.quickInsert.hide();
                }), t.events.$on(t.$wp, "scroll", function() {
                    l.hasClass("fr-visible") && n(l.data("tag"));
                });
            }(), l.hasClass("fr-on") && s(), t.$box.append(l), n(r), l.data("tag", r), l.addClass("fr-visible");
        }
        function i() {
            if (t.core.hasFocus()) {
                var n = t.selection.element();
                if (t.opts.enter == e.FE.ENTER_BR || t.node.isBlock(n) || (n = t.node.blockParent(n)), 
                t.opts.enter == e.FE.ENTER_BR && !t.node.isBlock(n)) {
                    var i = t.node.deepestParent(n);
                    i && (n = i);
                }
                n && (t.opts.enter != e.FE.ENTER_BR && t.node.isEmpty(n) && t.node.isElement(n.parentNode) && 0 <= t.opts.quickInsertTags.indexOf(n.tagName.toLowerCase()) || t.opts.enter == e.FE.ENTER_BR && ("BR" == n.tagName && (!n.previousSibling || "BR" == n.previousSibling.tagName || t.node.isBlock(n.previousSibling)) || t.node.isEmpty(n) && (!n.previousSibling || "BR" == n.previousSibling.tagName || t.node.isBlock(n.previousSibling)) && (!n.nextSibling || "BR" == n.nextSibling.tagName || t.node.isBlock(n.nextSibling)))) ? l && l.data("tag").is(e(n)) && l.hasClass("fr-on") ? s() : t.selection.isCollapsed() && r(e(n)) : a();
            }
        }
        function a() {
            l && (l.hasClass("fr-on") && s(), l.removeClass("fr-visible fr-on"), l.css("left", -9999).css("top", -9999));
        }
        function o(n) {
            if (n && n.preventDefault(), l.hasClass("fr-on") && !l.hasClass("fr-hidden")) s(); else {
                if (!t.shared.$qi_helper) {
                    for (var r = t.opts.quickInsertButtons, i = '<div class="fr-qi-helper">', a = 0, o = 0; o < r.length; o++) {
                        var c = e.FE.QUICK_INSERT_BUTTONS[r[o]];
                        c && (!c.requiredPlugin || e.FE.PLUGINS[c.requiredPlugin] && 0 <= t.opts.pluginsEnabled.indexOf(c.requiredPlugin)) && (i += '<a class="fr-btn fr-floating-btn" role="button" title="' + t.language.translate(c.title) + '" tabIndex="-1" data-cmd="' + r[o] + '" style="transition-delay: ' + .025 * a++ + 's;">' + t.icon.create(c.icon) + "</a>");
                    }
                    i += "</div>", t.shared.$qi_helper = e(i), t.tooltip.bind(t.shared.$qi_helper, "> a.fr-btn"), 
                    t.events.$on(t.shared.$qi_helper, "mousedown", function(e) {
                        e.preventDefault();
                    }, !0);
                }
                (d = t.shared.$qi_helper).appendTo(t.$box), setTimeout(function() {
                    d.css("top", parseFloat(l.css("top"))), d.css("left", parseFloat(l.css("left")) + l.outerWidth()), 
                    d.find("a").addClass("fr-size-1"), l.addClass("fr-on");
                }, 10);
            }
        }
        function s() {
            var e = t.$box.find(".fr-qi-helper");
            e.length && (e.find("a").removeClass("fr-size-1"), e.css("left", -9999), l.hasClass("fr-hidden") || l.removeClass("fr-on"));
        }
        var l, d;
        return {
            _init: function() {
                if (!t.$wp) return !1;
                t.opts.iframe && t.$el.parent("html").find("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">'), 
                t.popups.onShow("image.edit", a), t.events.on("mouseup", i), t.helpers.isMobile() && t.events.$on(e(t.o_doc), "selectionchange", i), 
                t.events.on("blur", a), t.events.on("keyup", i), t.events.on("keydown", function() {
                    setTimeout(function() {
                        i();
                    }, 0);
                });
            },
            hide: a
        };
    }, e.FE.PLUGINS.quote = function(t) {
        function n(e) {
            for (;e.parentNode && e.parentNode != t.el; ) e = e.parentNode;
            return e;
        }
        return {
            apply: function(r) {
                t.selection.save(), t.html.wrap(!0, !0, !0, !0), t.selection.restore(), "increase" == r ? function() {
                    var r, i = t.selection.blocks();
                    for (r = 0; r < i.length; r++) i[r] = n(i[r]);
                    t.selection.save();
                    var a = e("<blockquote>");
                    for (a.insertBefore(i[0]), r = 0; r < i.length; r++) a.append(i[r]);
                    t.html.unwrap(), t.selection.restore();
                }() : "decrease" == r && function() {
                    var n, r = t.selection.blocks();
                    for (n = 0; n < r.length; n++) "BLOCKQUOTE" != r[n].tagName && (r[n] = e(r[n]).parentsUntil(t.$el, "BLOCKQUOTE").get(0));
                    for (t.selection.save(), n = 0; n < r.length; n++) r[n] && e(r[n]).replaceWith(r[n].innerHTML);
                    t.html.unwrap(), t.selection.restore();
                }();
            }
        };
    }, e.FE.RegisterShortcut(e.FE.KEYCODE.SINGLE_QUOTE, "quote", "increase", "'"), e.FE.RegisterShortcut(e.FE.KEYCODE.SINGLE_QUOTE, "quote", "decrease", "'", !0), 
    e.FE.RegisterCommand("quote", {
        title: "Quote",
        type: "dropdown",
        options: {
            increase: "Increase",
            decrease: "Decrease"
        },
        callback: function(e, t) {
            this.quote.apply(t);
        },
        plugin: "quote"
    }), e.FE.DefineIcon("quote", {
        NAME: "quote-left"
    }), e.extend(e.FE.DEFAULTS, {
        saveInterval: 1e4,
        saveURL: null,
        saveParams: {},
        saveParam: "body",
        saveMethod: "POST"
    }), e.FE.PLUGINS.save = function(t) {
        function n(e, n) {
            t.events.trigger("save.error", [ {
                code: e,
                message: c[e]
            }, n ]);
        }
        function r(r) {
            void 0 === r && (r = t.html.get());
            var i = r, a = t.events.trigger("save.before", [ r ]);
            if (!1 === a) return !1;
            if ("string" == typeof a && (r = a), t.opts.saveURL) {
                var s = {};
                for (var c in t.opts.saveParams) if (t.opts.saveParams.hasOwnProperty(c)) {
                    var f = t.opts.saveParams[c];
                    s[c] = "function" == typeof f ? f.call(this) : f;
                }
                var p = {};
                p[t.opts.saveParam] = r, e.ajax({
                    type: t.opts.saveMethod,
                    url: t.opts.saveURL,
                    data: e.extend(p, s),
                    crossDomain: t.opts.requestWithCORS,
                    xhrFields: {
                        withCredentials: t.opts.requestWithCredentials
                    },
                    headers: t.opts.requestHeaders
                }).done(function(e) {
                    o = i, t.events.trigger("save.after", [ e ]);
                }).fail(function(e) {
                    n(d, e.response || e.responseText);
                });
            } else n(l);
        }
        function i() {
            clearTimeout(a), a = setTimeout(function() {
                var e = t.html.get();
                (o != e || s) && (s = !1, r(o = e));
            }, t.opts.saveInterval);
        }
        var a = null, o = null, s = !1, l = 1, d = 2, c = {};
        return c[l] = "Missing saveURL option.", c[d] = "Something went wrong during save.", 
        {
            _init: function() {
                t.opts.saveInterval && (o = t.html.get(), t.events.on("contentChanged", i), t.events.on("keydown destroy", function() {
                    clearTimeout(a);
                }));
            },
            save: r,
            reset: function() {
                i(), s = !1;
            },
            force: function() {
                s = !0;
            }
        };
    }, e.FE.DefineIcon("save", {
        NAME: "floppy-o"
    }), e.FE.RegisterCommand("save", {
        title: "Save",
        undo: !1,
        focus: !1,
        refreshAfterCallback: !1,
        callback: function() {
            this.save.save();
        },
        plugin: "save"
    }), e.extend(e.FE.DEFAULTS, {
        specialCharactersSets: [ {
            title: "Latin",
            list: [ {
                char: "&iexcl;",
                desc: "INVERTED EXCLAMATION MARK"
            }, {
                char: "&cent;",
                desc: "CENT SIGN"
            }, {
                char: "&pound;",
                desc: "POUND SIGN"
            }, {
                char: "&curren;",
                desc: "CURRENCY SIGN"
            }, {
                char: "&yen;",
                desc: "YEN SIGN"
            }, {
                char: "&brvbar;",
                desc: "BROKEN BAR"
            }, {
                char: "&sect;",
                desc: "SECTION SIGN"
            }, {
                char: "&uml;",
                desc: "DIAERESIS"
            }, {
                char: "&copy;",
                desc: "COPYRIGHT SIGN"
            }, {
                char: "&trade;",
                desc: "TRADEMARK SIGN"
            }, {
                char: "&ordf;",
                desc: "FEMININE ORDINAL INDICATOR"
            }, {
                char: "&laquo;",
                desc: "LEFT-POINTING DOUBLE ANGLE QUOTATION MARK"
            }, {
                char: "&not;",
                desc: "NOT SIGN"
            }, {
                char: "&reg;",
                desc: "REGISTERED SIGN"
            }, {
                char: "&macr;",
                desc: "MACRON"
            }, {
                char: "&deg;",
                desc: "DEGREE SIGN"
            }, {
                char: "&plusmn;",
                desc: "PLUS-MINUS SIGN"
            }, {
                char: "&sup2;",
                desc: "SUPERSCRIPT TWO"
            }, {
                char: "&sup3;",
                desc: "SUPERSCRIPT THREE"
            }, {
                char: "&acute;",
                desc: "ACUTE ACCENT"
            }, {
                char: "&micro;",
                desc: "MICRO SIGN"
            }, {
                char: "&para;",
                desc: "PILCROW SIGN"
            }, {
                char: "&middot;",
                desc: "MIDDLE DOT"
            }, {
                char: "&cedil;",
                desc: "CEDILLA"
            }, {
                char: "&sup1;",
                desc: "SUPERSCRIPT ONE"
            }, {
                char: "&ordm;",
                desc: "MASCULINE ORDINAL INDICATOR"
            }, {
                char: "&raquo;",
                desc: "RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK"
            }, {
                char: "&frac14;",
                desc: "VULGAR FRACTION ONE QUARTER"
            }, {
                char: "&frac12;",
                desc: "VULGAR FRACTION ONE HALF"
            }, {
                char: "&frac34;",
                desc: "VULGAR FRACTION THREE QUARTERS"
            }, {
                char: "&iquest;",
                desc: "INVERTED QUESTION MARK"
            }, {
                char: "&Agrave;",
                desc: "LATIN CAPITAL LETTER A WITH GRAVE"
            }, {
                char: "&Aacute;",
                desc: "LATIN CAPITAL LETTER A WITH ACUTE"
            }, {
                char: "&Acirc;",
                desc: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX"
            }, {
                char: "&Atilde;",
                desc: "LATIN CAPITAL LETTER A WITH TILDE"
            }, {
                char: "&Auml;",
                desc: "LATIN CAPITAL LETTER A WITH DIAERESIS "
            }, {
                char: "&Aring;",
                desc: "LATIN CAPITAL LETTER A WITH RING ABOVE"
            }, {
                char: "&AElig;",
                desc: "LATIN CAPITAL LETTER AE"
            }, {
                char: "&Ccedil;",
                desc: "LATIN CAPITAL LETTER C WITH CEDILLA"
            }, {
                char: "&Egrave;",
                desc: "LATIN CAPITAL LETTER E WITH GRAVE"
            }, {
                char: "&Eacute;",
                desc: "LATIN CAPITAL LETTER E WITH ACUTE"
            }, {
                char: "&Ecirc;",
                desc: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX"
            }, {
                char: "&Euml;",
                desc: "LATIN CAPITAL LETTER E WITH DIAERESIS"
            }, {
                char: "&Igrave;",
                desc: "LATIN CAPITAL LETTER I WITH GRAVE"
            }, {
                char: "&Iacute;",
                desc: "LATIN CAPITAL LETTER I WITH ACUTE"
            }, {
                char: "&Icirc;",
                desc: "LATIN CAPITAL LETTER I WITH CIRCUMFLEX"
            }, {
                char: "&Iuml;",
                desc: "LATIN CAPITAL LETTER I WITH DIAERESIS"
            }, {
                char: "&ETH;",
                desc: "LATIN CAPITAL LETTER ETH"
            }, {
                char: "&Ntilde;",
                desc: "LATIN CAPITAL LETTER N WITH TILDE"
            }, {
                char: "&Ograve;",
                desc: "LATIN CAPITAL LETTER O WITH GRAVE"
            }, {
                char: "&Oacute;",
                desc: "LATIN CAPITAL LETTER O WITH ACUTE"
            }, {
                char: "&Ocirc;",
                desc: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX"
            }, {
                char: "&Otilde;",
                desc: "LATIN CAPITAL LETTER O WITH TILDE"
            }, {
                char: "&Ouml;",
                desc: "LATIN CAPITAL LETTER O WITH DIAERESIS"
            }, {
                char: "&times;",
                desc: "MULTIPLICATION SIGN"
            }, {
                char: "&Oslash;",
                desc: "LATIN CAPITAL LETTER O WITH STROKE"
            }, {
                char: "&Ugrave;",
                desc: "LATIN CAPITAL LETTER U WITH GRAVE"
            }, {
                char: "&Uacute;",
                desc: "LATIN CAPITAL LETTER U WITH ACUTE"
            }, {
                char: "&Ucirc;",
                desc: "LATIN CAPITAL LETTER U WITH CIRCUMFLEX"
            }, {
                char: "&Uuml;",
                desc: "LATIN CAPITAL LETTER U WITH DIAERESIS"
            }, {
                char: "&Yacute;",
                desc: "LATIN CAPITAL LETTER Y WITH ACUTE"
            }, {
                char: "&THORN;",
                desc: "LATIN CAPITAL LETTER THORN"
            }, {
                char: "&szlig;",
                desc: "LATIN SMALL LETTER SHARP S"
            }, {
                char: "&agrave;",
                desc: "LATIN SMALL LETTER A WITH GRAVE"
            }, {
                char: "&aacute;",
                desc: "LATIN SMALL LETTER A WITH ACUTE "
            }, {
                char: "&acirc;",
                desc: "LATIN SMALL LETTER A WITH CIRCUMFLEX"
            }, {
                char: "&atilde;",
                desc: "LATIN SMALL LETTER A WITH TILDE"
            }, {
                char: "&auml;",
                desc: "LATIN SMALL LETTER A WITH DIAERESIS"
            }, {
                char: "&aring;",
                desc: "LATIN SMALL LETTER A WITH RING ABOVE"
            }, {
                char: "&aelig;",
                desc: "LATIN SMALL LETTER AE"
            }, {
                char: "&ccedil;",
                desc: "LATIN SMALL LETTER C WITH CEDILLA"
            }, {
                char: "&egrave;",
                desc: "LATIN SMALL LETTER E WITH GRAVE"
            }, {
                char: "&eacute;",
                desc: "LATIN SMALL LETTER E WITH ACUTE"
            }, {
                char: "&ecirc;",
                desc: "LATIN SMALL LETTER E WITH CIRCUMFLEX"
            }, {
                char: "&euml;",
                desc: "LATIN SMALL LETTER E WITH DIAERESIS"
            }, {
                char: "&igrave;",
                desc: "LATIN SMALL LETTER I WITH GRAVE"
            }, {
                char: "&iacute;",
                desc: "LATIN SMALL LETTER I WITH ACUTE"
            }, {
                char: "&icirc;",
                desc: "LATIN SMALL LETTER I WITH CIRCUMFLEX"
            }, {
                char: "&iuml;",
                desc: "LATIN SMALL LETTER I WITH DIAERESIS"
            }, {
                char: "&eth;",
                desc: "LATIN SMALL LETTER ETH"
            }, {
                char: "&ntilde;",
                desc: "LATIN SMALL LETTER N WITH TILDE"
            }, {
                char: "&ograve;",
                desc: "LATIN SMALL LETTER O WITH GRAVE"
            }, {
                char: "&oacute;",
                desc: "LATIN SMALL LETTER O WITH ACUTE"
            }, {
                char: "&ocirc;",
                desc: "LATIN SMALL LETTER O WITH CIRCUMFLEX"
            }, {
                char: "&otilde;",
                desc: "LATIN SMALL LETTER O WITH TILDE"
            }, {
                char: "&ouml;",
                desc: "LATIN SMALL LETTER O WITH DIAERESIS"
            }, {
                char: "&divide;",
                desc: "DIVISION SIGN"
            }, {
                char: "&oslash;",
                desc: "LATIN SMALL LETTER O WITH STROKE"
            }, {
                char: "&ugrave;",
                desc: "LATIN SMALL LETTER U WITH GRAVE"
            }, {
                char: "&uacute;",
                desc: "LATIN SMALL LETTER U WITH ACUTE"
            }, {
                char: "&ucirc;",
                desc: "LATIN SMALL LETTER U WITH CIRCUMFLEX"
            }, {
                char: "&uuml;",
                desc: "LATIN SMALL LETTER U WITH DIAERESIS"
            }, {
                char: "&yacute;",
                desc: "LATIN SMALL LETTER Y WITH ACUTE"
            }, {
                char: "&thorn;",
                desc: "LATIN SMALL LETTER THORN"
            }, {
                char: "&yuml;",
                desc: "LATIN SMALL LETTER Y WITH DIAERESIS"
            } ]
        }, {
            title: "Greek",
            list: [ {
                char: "&Alpha;",
                desc: "GREEK CAPITAL LETTER ALPHA"
            }, {
                char: "&Beta;",
                desc: "GREEK CAPITAL LETTER BETA"
            }, {
                char: "&Gamma;",
                desc: "GREEK CAPITAL LETTER GAMMA"
            }, {
                char: "&Delta;",
                desc: "GREEK CAPITAL LETTER DELTA"
            }, {
                char: "&Epsilon;",
                desc: "GREEK CAPITAL LETTER EPSILON"
            }, {
                char: "&Zeta;",
                desc: "GREEK CAPITAL LETTER ZETA"
            }, {
                char: "&Eta;",
                desc: "GREEK CAPITAL LETTER ETA"
            }, {
                char: "&Theta;",
                desc: "GREEK CAPITAL LETTER THETA"
            }, {
                char: "&Iota;",
                desc: "GREEK CAPITAL LETTER IOTA"
            }, {
                char: "&Kappa;",
                desc: "GREEK CAPITAL LETTER KAPPA"
            }, {
                char: "&Lambda;",
                desc: "GREEK CAPITAL LETTER LAMBDA"
            }, {
                char: "&Mu;",
                desc: "GREEK CAPITAL LETTER MU"
            }, {
                char: "&Nu;",
                desc: "GREEK CAPITAL LETTER NU"
            }, {
                char: "&Xi;",
                desc: "GREEK CAPITAL LETTER XI"
            }, {
                char: "&Omicron;",
                desc: "GREEK CAPITAL LETTER OMICRON"
            }, {
                char: "&Pi;",
                desc: "GREEK CAPITAL LETTER PI"
            }, {
                char: "&Rho;",
                desc: "GREEK CAPITAL LETTER RHO"
            }, {
                char: "&Sigma;",
                desc: "GREEK CAPITAL LETTER SIGMA"
            }, {
                char: "&Tau;",
                desc: "GREEK CAPITAL LETTER TAU"
            }, {
                char: "&Upsilon;",
                desc: "GREEK CAPITAL LETTER UPSILON"
            }, {
                char: "&Phi;",
                desc: "GREEK CAPITAL LETTER PHI"
            }, {
                char: "&Chi;",
                desc: "GREEK CAPITAL LETTER CHI"
            }, {
                char: "&Psi;",
                desc: "GREEK CAPITAL LETTER PSI"
            }, {
                char: "&Omega;",
                desc: "GREEK CAPITAL LETTER OMEGA"
            }, {
                char: "&alpha;",
                desc: "GREEK SMALL LETTER ALPHA"
            }, {
                char: "&beta;",
                desc: "GREEK SMALL LETTER BETA"
            }, {
                char: "&gamma;",
                desc: "GREEK SMALL LETTER GAMMA"
            }, {
                char: "&delta;",
                desc: "GREEK SMALL LETTER DELTA"
            }, {
                char: "&epsilon;",
                desc: "GREEK SMALL LETTER EPSILON"
            }, {
                char: "&zeta;",
                desc: "GREEK SMALL LETTER ZETA"
            }, {
                char: "&eta;",
                desc: "GREEK SMALL LETTER ETA"
            }, {
                char: "&theta;",
                desc: "GREEK SMALL LETTER THETA"
            }, {
                char: "&iota;",
                desc: "GREEK SMALL LETTER IOTA"
            }, {
                char: "&kappa;",
                desc: "GREEK SMALL LETTER KAPPA"
            }, {
                char: "&lambda;",
                desc: "GREEK SMALL LETTER LAMBDA"
            }, {
                char: "&mu;",
                desc: "GREEK SMALL LETTER MU"
            }, {
                char: "&nu;",
                desc: "GREEK SMALL LETTER NU"
            }, {
                char: "&xi;",
                desc: "GREEK SMALL LETTER XI"
            }, {
                char: "&omicron;",
                desc: "GREEK SMALL LETTER OMICRON"
            }, {
                char: "&pi;",
                desc: "GREEK SMALL LETTER PI"
            }, {
                char: "&rho;",
                desc: "GREEK SMALL LETTER RHO"
            }, {
                char: "&sigmaf;",
                desc: "GREEK SMALL LETTER FINAL SIGMA"
            }, {
                char: "&sigma;",
                desc: "GREEK SMALL LETTER SIGMA"
            }, {
                char: "&tau;",
                desc: "GREEK SMALL LETTER TAU"
            }, {
                char: "&upsilon;",
                desc: "GREEK SMALL LETTER UPSILON"
            }, {
                char: "&phi;",
                desc: "GREEK SMALL LETTER PHI"
            }, {
                char: "&chi;",
                desc: "GREEK SMALL LETTER CHI"
            }, {
                char: "&psi;",
                desc: "GREEK SMALL LETTER PSI"
            }, {
                char: "&omega;",
                desc: "GREEK SMALL LETTER OMEGA"
            }, {
                char: "&thetasym;",
                desc: "GREEK THETA SYMBOL"
            }, {
                char: "&upsih;",
                desc: "GREEK UPSILON WITH HOOK SYMBOL"
            }, {
                char: "&straightphi;",
                desc: "GREEK PHI SYMBOL"
            }, {
                char: "&piv;",
                desc: "GREEK PI SYMBOL"
            }, {
                char: "&Gammad;",
                desc: "GREEK LETTER DIGAMMA"
            }, {
                char: "&gammad;",
                desc: "GREEK SMALL LETTER DIGAMMA"
            }, {
                char: "&varkappa;",
                desc: "GREEK KAPPA SYMBOL"
            }, {
                char: "&varrho;",
                desc: "GREEK RHO SYMBOL"
            }, {
                char: "&straightepsilon;",
                desc: "GREEK LUNATE EPSILON SYMBOL"
            }, {
                char: "&backepsilon;",
                desc: "GREEK REVERSED LUNATE EPSILON SYMBOL"
            } ]
        }, {
            title: "Cyrillic",
            list: [ {
                char: "&#x400",
                desc: "CYRILLIC CAPITAL LETTER IE WITH GRAVE"
            }, {
                char: "&#x401",
                desc: "CYRILLIC CAPITAL LETTER IO"
            }, {
                char: "&#x402",
                desc: "CYRILLIC CAPITAL LETTER DJE"
            }, {
                char: "&#x403",
                desc: "CYRILLIC CAPITAL LETTER GJE"
            }, {
                char: "&#x404",
                desc: "CYRILLIC CAPITAL LETTER UKRAINIAN IE"
            }, {
                char: "&#x405",
                desc: "CYRILLIC CAPITAL LETTER DZE"
            }, {
                char: "&#x406",
                desc: "CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I"
            }, {
                char: "&#x407",
                desc: "CYRILLIC CAPITAL LETTER YI"
            }, {
                char: "&#x408",
                desc: "CYRILLIC CAPITAL LETTER JE"
            }, {
                char: "&#x409",
                desc: "CYRILLIC CAPITAL LETTER LJE"
            }, {
                char: "&#x40A",
                desc: "CYRILLIC CAPITAL LETTER NJE"
            }, {
                char: "&#x40B",
                desc: "CYRILLIC CAPITAL LETTER TSHE"
            }, {
                char: "&#x40C",
                desc: "CYRILLIC CAPITAL LETTER KJE"
            }, {
                char: "&#x40D",
                desc: "CYRILLIC CAPITAL LETTER I WITH GRAVE"
            }, {
                char: "&#x40E",
                desc: "CYRILLIC CAPITAL LETTER SHORT U"
            }, {
                char: "&#x40F",
                desc: "CYRILLIC CAPITAL LETTER DZHE"
            }, {
                char: "&#x410",
                desc: "CYRILLIC CAPITAL LETTER A"
            }, {
                char: "&#x411",
                desc: "CYRILLIC CAPITAL LETTER BE"
            }, {
                char: "&#x412",
                desc: "CYRILLIC CAPITAL LETTER VE"
            }, {
                char: "&#x413",
                desc: "CYRILLIC CAPITAL LETTER GHE"
            }, {
                char: "&#x414",
                desc: "CYRILLIC CAPITAL LETTER DE"
            }, {
                char: "&#x415",
                desc: "CYRILLIC CAPITAL LETTER IE"
            }, {
                char: "&#x416",
                desc: "CYRILLIC CAPITAL LETTER ZHE"
            }, {
                char: "&#x417",
                desc: "CYRILLIC CAPITAL LETTER ZE"
            }, {
                char: "&#x418",
                desc: "CYRILLIC CAPITAL LETTER I"
            }, {
                char: "&#x419",
                desc: "CYRILLIC CAPITAL LETTER SHORT I"
            }, {
                char: "&#x41A",
                desc: "CYRILLIC CAPITAL LETTER KA"
            }, {
                char: "&#x41B",
                desc: "CYRILLIC CAPITAL LETTER EL"
            }, {
                char: "&#x41C",
                desc: "CYRILLIC CAPITAL LETTER EM"
            }, {
                char: "&#x41D",
                desc: "CYRILLIC CAPITAL LETTER EN"
            }, {
                char: "&#x41E",
                desc: "CYRILLIC CAPITAL LETTER O"
            }, {
                char: "&#x41F",
                desc: "CYRILLIC CAPITAL LETTER PE"
            }, {
                char: "&#x420",
                desc: "CYRILLIC CAPITAL LETTER ER"
            }, {
                char: "&#x421",
                desc: "CYRILLIC CAPITAL LETTER ES"
            }, {
                char: "&#x422",
                desc: "CYRILLIC CAPITAL LETTER TE"
            }, {
                char: "&#x423",
                desc: "CYRILLIC CAPITAL LETTER U"
            }, {
                char: "&#x424",
                desc: "CYRILLIC CAPITAL LETTER EF"
            }, {
                char: "&#x425",
                desc: "CYRILLIC CAPITAL LETTER HA"
            }, {
                char: "&#x426",
                desc: "CYRILLIC CAPITAL LETTER TSE"
            }, {
                char: "&#x427",
                desc: "CYRILLIC CAPITAL LETTER CHE"
            }, {
                char: "&#x428",
                desc: "CYRILLIC CAPITAL LETTER SHA"
            }, {
                char: "&#x429",
                desc: "CYRILLIC CAPITAL LETTER SHCHA"
            }, {
                char: "&#x42A",
                desc: "CYRILLIC CAPITAL LETTER HARD SIGN"
            }, {
                char: "&#x42B",
                desc: "CYRILLIC CAPITAL LETTER YERU"
            }, {
                char: "&#x42C",
                desc: "CYRILLIC CAPITAL LETTER SOFT SIGN"
            }, {
                char: "&#x42D",
                desc: "CYRILLIC CAPITAL LETTER E"
            }, {
                char: "&#x42E",
                desc: "CYRILLIC CAPITAL LETTER YU"
            }, {
                char: "&#x42F",
                desc: "CYRILLIC CAPITAL LETTER YA"
            }, {
                char: "&#x430",
                desc: "CYRILLIC SMALL LETTER A"
            }, {
                char: "&#x431",
                desc: "CYRILLIC SMALL LETTER BE"
            }, {
                char: "&#x432",
                desc: "CYRILLIC SMALL LETTER VE"
            }, {
                char: "&#x433",
                desc: "CYRILLIC SMALL LETTER GHE"
            }, {
                char: "&#x434",
                desc: "CYRILLIC SMALL LETTER DE"
            }, {
                char: "&#x435",
                desc: "CYRILLIC SMALL LETTER IE"
            }, {
                char: "&#x436",
                desc: "CYRILLIC SMALL LETTER ZHE"
            }, {
                char: "&#x437",
                desc: "CYRILLIC SMALL LETTER ZE"
            }, {
                char: "&#x438",
                desc: "CYRILLIC SMALL LETTER I"
            }, {
                char: "&#x439",
                desc: "CYRILLIC SMALL LETTER SHORT I"
            }, {
                char: "&#x43A",
                desc: "CYRILLIC SMALL LETTER KA"
            }, {
                char: "&#x43B",
                desc: "CYRILLIC SMALL LETTER EL"
            }, {
                char: "&#x43C",
                desc: "CYRILLIC SMALL LETTER EM"
            }, {
                char: "&#x43D",
                desc: "CYRILLIC SMALL LETTER EN"
            }, {
                char: "&#x43E",
                desc: "CYRILLIC SMALL LETTER O"
            }, {
                char: "&#x43F",
                desc: "CYRILLIC SMALL LETTER PE"
            }, {
                char: "&#x440",
                desc: "CYRILLIC SMALL LETTER ER"
            }, {
                char: "&#x441",
                desc: "CYRILLIC SMALL LETTER ES"
            }, {
                char: "&#x442",
                desc: "CYRILLIC SMALL LETTER TE"
            }, {
                char: "&#x443",
                desc: "CYRILLIC SMALL LETTER U"
            }, {
                char: "&#x444",
                desc: "CYRILLIC SMALL LETTER EF"
            }, {
                char: "&#x445",
                desc: "CYRILLIC SMALL LETTER HA"
            }, {
                char: "&#x446",
                desc: "CYRILLIC SMALL LETTER TSE"
            }, {
                char: "&#x447",
                desc: "CYRILLIC SMALL LETTER CHE"
            }, {
                char: "&#x448",
                desc: "CYRILLIC SMALL LETTER SHA"
            }, {
                char: "&#x449",
                desc: "CYRILLIC SMALL LETTER SHCHA"
            }, {
                char: "&#x44A",
                desc: "CYRILLIC SMALL LETTER HARD SIGN"
            }, {
                char: "&#x44B",
                desc: "CYRILLIC SMALL LETTER YERU"
            }, {
                char: "&#x44C",
                desc: "CYRILLIC SMALL LETTER SOFT SIGN"
            }, {
                char: "&#x44D",
                desc: "CYRILLIC SMALL LETTER E"
            }, {
                char: "&#x44E",
                desc: "CYRILLIC SMALL LETTER YU"
            }, {
                char: "&#x44F",
                desc: "CYRILLIC SMALL LETTER YA"
            }, {
                char: "&#x450",
                desc: "CYRILLIC SMALL LETTER IE WITH GRAVE"
            }, {
                char: "&#x451",
                desc: "CYRILLIC SMALL LETTER IO"
            }, {
                char: "&#x452",
                desc: "CYRILLIC SMALL LETTER DJE"
            }, {
                char: "&#x453",
                desc: "CYRILLIC SMALL LETTER GJE"
            }, {
                char: "&#x454",
                desc: "CYRILLIC SMALL LETTER UKRAINIAN IE"
            }, {
                char: "&#x455",
                desc: "CYRILLIC SMALL LETTER DZE"
            }, {
                char: "&#x456",
                desc: "CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I"
            }, {
                char: "&#x457",
                desc: "CYRILLIC SMALL LETTER YI"
            }, {
                char: "&#x458",
                desc: "CYRILLIC SMALL LETTER JE"
            }, {
                char: "&#x459",
                desc: "CYRILLIC SMALL LETTER LJE"
            }, {
                char: "&#x45A",
                desc: "CYRILLIC SMALL LETTER NJE"
            }, {
                char: "&#x45B",
                desc: "CYRILLIC SMALL LETTER TSHE"
            }, {
                char: "&#x45C",
                desc: "CYRILLIC SMALL LETTER KJE"
            }, {
                char: "&#x45D",
                desc: "CYRILLIC SMALL LETTER I WITH GRAVE"
            }, {
                char: "&#x45E",
                desc: "CYRILLIC SMALL LETTER SHORT U"
            }, {
                char: "&#x45F",
                desc: "CYRILLIC SMALL LETTER DZHE"
            } ]
        }, {
            title: "Punctuation",
            list: [ {
                char: "&ndash;",
                desc: "EN DASH"
            }, {
                char: "&mdash;",
                desc: "EM DASH"
            }, {
                char: "&lsquo;",
                desc: "LEFT SINGLE QUOTATION MARK"
            }, {
                char: "&rsquo;",
                desc: "RIGHT SINGLE QUOTATION MARK"
            }, {
                char: "&sbquo;",
                desc: "SINGLE LOW-9 QUOTATION MARK"
            }, {
                char: "&ldquo;",
                desc: "LEFT DOUBLE QUOTATION MARK"
            }, {
                char: "&rdquo;",
                desc: "RIGHT DOUBLE QUOTATION MARK"
            }, {
                char: "&bdquo;",
                desc: "DOUBLE LOW-9 QUOTATION MARK"
            }, {
                char: "&dagger;",
                desc: "DAGGER"
            }, {
                char: "&Dagger;",
                desc: "DOUBLE DAGGER"
            }, {
                char: "&bull;",
                desc: "BULLET"
            }, {
                char: "&hellip;",
                desc: "HORIZONTAL ELLIPSIS"
            }, {
                char: "&permil;",
                desc: "PER MILLE SIGN"
            }, {
                char: "&prime;",
                desc: "PRIME"
            }, {
                char: "&Prime;",
                desc: "DOUBLE PRIME"
            }, {
                char: "&lsaquo;",
                desc: "SINGLE LEFT-POINTING ANGLE QUOTATION MARK"
            }, {
                char: "&rsaquo;",
                desc: "SINGLE RIGHT-POINTING ANGLE QUOTATION MARK"
            }, {
                char: "&oline;",
                desc: "OVERLINE"
            }, {
                char: "&frasl;",
                desc: "FRACTION SLASH"
            } ]
        }, {
            title: "Currency",
            list: [ {
                char: "&#x20A0",
                desc: "EURO-CURRENCY SIGN"
            }, {
                char: "&#x20A1",
                desc: "COLON SIGN"
            }, {
                char: "&#x20A2",
                desc: "CRUZEIRO SIGN"
            }, {
                char: "&#x20A3",
                desc: "FRENCH FRANC SIGN"
            }, {
                char: "&#x20A4",
                desc: "LIRA SIGN"
            }, {
                char: "&#x20A5",
                desc: "MILL SIGN"
            }, {
                char: "&#x20A6",
                desc: "NAIRA SIGN"
            }, {
                char: "&#x20A7",
                desc: "PESETA SIGN"
            }, {
                char: "&#x20A8",
                desc: "RUPEE SIGN"
            }, {
                char: "&#x20A9",
                desc: "WON SIGN"
            }, {
                char: "&#x20AA",
                desc: "NEW SHEQEL SIGN"
            }, {
                char: "&#x20AB",
                desc: "DONG SIGN"
            }, {
                char: "&#x20AC",
                desc: "EURO SIGN"
            }, {
                char: "&#x20AD",
                desc: "KIP SIGN"
            }, {
                char: "&#x20AE",
                desc: "TUGRIK SIGN"
            }, {
                char: "&#x20AF",
                desc: "DRACHMA SIGN"
            }, {
                char: "&#x20B0",
                desc: "GERMAN PENNY SYMBOL"
            }, {
                char: "&#x20B1",
                desc: "PESO SIGN"
            }, {
                char: "&#x20B2",
                desc: "GUARANI SIGN"
            }, {
                char: "&#x20B3",
                desc: "AUSTRAL SIGN"
            }, {
                char: "&#x20B4",
                desc: "HRYVNIA SIGN"
            }, {
                char: "&#x20B5",
                desc: "CEDI SIGN"
            }, {
                char: "&#x20B6",
                desc: "LIVRE TOURNOIS SIGN"
            }, {
                char: "&#x20B7",
                desc: "SPESMILO SIGN"
            }, {
                char: "&#x20B8",
                desc: "TENGE SIGN"
            }, {
                char: "&#x20B9",
                desc: "INDIAN RUPEE SIGN"
            } ]
        }, {
            title: "Arrows",
            list: [ {
                char: "&#x2190",
                desc: "LEFTWARDS ARROW"
            }, {
                char: "&#x2191",
                desc: "UPWARDS ARROW"
            }, {
                char: "&#x2192",
                desc: "RIGHTWARDS ARROW"
            }, {
                char: "&#x2193",
                desc: "DOWNWARDS ARROW"
            }, {
                char: "&#x2194",
                desc: "LEFT RIGHT ARROW"
            }, {
                char: "&#x2195",
                desc: "UP DOWN ARROW"
            }, {
                char: "&#x2196",
                desc: "NORTH WEST ARROW"
            }, {
                char: "&#x2197",
                desc: "NORTH EAST ARROW"
            }, {
                char: "&#x2198",
                desc: "SOUTH EAST ARROW"
            }, {
                char: "&#x2199",
                desc: "SOUTH WEST ARROW"
            }, {
                char: "&#x219A",
                desc: "LEFTWARDS ARROW WITH STROKE"
            }, {
                char: "&#x219B",
                desc: "RIGHTWARDS ARROW WITH STROKE"
            }, {
                char: "&#x219C",
                desc: "LEFTWARDS WAVE ARROW"
            }, {
                char: "&#x219D",
                desc: "RIGHTWARDS WAVE ARROW"
            }, {
                char: "&#x219E",
                desc: "LEFTWARDS TWO HEADED ARROW"
            }, {
                char: "&#x219F",
                desc: "UPWARDS TWO HEADED ARROW"
            }, {
                char: "&#x21A0",
                desc: "RIGHTWARDS TWO HEADED ARROW"
            }, {
                char: "&#x21A1",
                desc: "DOWNWARDS TWO HEADED ARROW"
            }, {
                char: "&#x21A2",
                desc: "LEFTWARDS ARROW WITH TAIL"
            }, {
                char: "&#x21A3",
                desc: "RIGHTWARDS ARROW WITH TAIL"
            }, {
                char: "&#x21A4",
                desc: "LEFTWARDS ARROW FROM BAR"
            }, {
                char: "&#x21A5",
                desc: "UPWARDS ARROW FROM BAR"
            }, {
                char: "&#x21A6",
                desc: "RIGHTWARDS ARROW FROM BAR"
            }, {
                char: "&#x21A7",
                desc: "DOWNWARDS ARROW FROM BAR"
            }, {
                char: "&#x21A8",
                desc: "UP DOWN ARROW WITH BASE"
            }, {
                char: "&#x21A9",
                desc: "LEFTWARDS ARROW WITH HOOK"
            }, {
                char: "&#x21AA",
                desc: "RIGHTWARDS ARROW WITH HOOK"
            }, {
                char: "&#x21AB",
                desc: "LEFTWARDS ARROW WITH LOOP"
            }, {
                char: "&#x21AC",
                desc: "RIGHTWARDS ARROW WITH LOOP"
            }, {
                char: "&#x21AD",
                desc: "LEFT RIGHT WAVE ARROW"
            }, {
                char: "&#x21AE",
                desc: "LEFT RIGHT ARROW WITH STROKE"
            }, {
                char: "&#x21AF",
                desc: "DOWNWARDS ZIGZAG ARROW"
            }, {
                char: "&#x21B0",
                desc: "UPWARDS ARROW WITH TIP LEFTWARDS"
            }, {
                char: "&#x21B1",
                desc: "UPWARDS ARROW WITH TIP RIGHTWARDS"
            }, {
                char: "&#x21B2",
                desc: "DOWNWARDS ARROW WITH TIP LEFTWARDS"
            }, {
                char: "&#x21B3",
                desc: "DOWNWARDS ARROW WITH TIP RIGHTWARDS"
            }, {
                char: "&#x21B4",
                desc: "RIGHTWARDS ARROW WITH CORNER DOWNWARDS"
            }, {
                char: "&#x21B5",
                desc: "DOWNWARDS ARROW WITH CORNER LEFTWARDS"
            }, {
                char: "&#x21B6",
                desc: "ANTICLOCKWISE TOP SEMICIRCLE ARROW"
            }, {
                char: "&#x21B7",
                desc: "CLOCKWISE TOP SEMICIRCLE ARROW"
            }, {
                char: "&#x21B8",
                desc: "NORTH WEST ARROW TO LONG BAR"
            }, {
                char: "&#x21B9",
                desc: "LEFTWARDS ARROW TO BAR OVER RIGHTWARDS ARROW TO BAR"
            }, {
                char: "&#x21BA",
                desc: "ANTICLOCKWISE OPEN CIRCLE ARROW"
            }, {
                char: "&#x21BB",
                desc: "CLOCKWISE OPEN CIRCLE ARROW"
            }, {
                char: "&#x21BC",
                desc: "LEFTWARDS HARPOON WITH BARB UPWARDS"
            }, {
                char: "&#x21BD",
                desc: "LEFTWARDS HARPOON WITH BARB DOWNWARDS"
            }, {
                char: "&#x21BE",
                desc: "UPWARDS HARPOON WITH BARB RIGHTWARDS"
            }, {
                char: "&#x21BF",
                desc: "UPWARDS HARPOON WITH BARB LEFTWARDS"
            }, {
                char: "&#x21C0",
                desc: "RIGHTWARDS HARPOON WITH BARB UPWARDS"
            }, {
                char: "&#x21C1",
                desc: "RIGHTWARDS HARPOON WITH BARB DOWNWARDS"
            }, {
                char: "&#x21C2",
                desc: "DOWNWARDS HARPOON WITH BARB RIGHTWARDS"
            }, {
                char: "&#x21C3",
                desc: "DOWNWARDS HARPOON WITH BARB LEFTWARDS"
            }, {
                char: "&#x21C4",
                desc: "RIGHTWARDS ARROW OVER LEFTWARDS ARROW"
            }, {
                char: "&#x21C5",
                desc: "UPWARDS ARROW LEFTWARDS OF DOWNWARDS ARROW"
            }, {
                char: "&#x21C6",
                desc: "LEFTWARDS ARROW OVER RIGHTWARDS ARROW"
            }, {
                char: "&#x21C7",
                desc: "LEFTWARDS PAIRED ARROWS"
            }, {
                char: "&#x21C8",
                desc: "UPWARDS PAIRED ARROWS"
            }, {
                char: "&#x21C9",
                desc: "RIGHTWARDS PAIRED ARROWS"
            }, {
                char: "&#x21CA",
                desc: "DOWNWARDS PAIRED ARROWS"
            }, {
                char: "&#x21CB",
                desc: "LEFTWARDS HARPOON OVER RIGHTWARDS HARPOON"
            }, {
                char: "&#x21CC",
                desc: "RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON"
            }, {
                char: "&#x21CD",
                desc: "LEFTWARDS DOUBLE ARROW WITH STROKE"
            }, {
                char: "&#x21CE",
                desc: "LEFT RIGHT DOUBLE ARROW WITH STROKE"
            }, {
                char: "&#x21CF",
                desc: "RIGHTWARDS DOUBLE ARROW WITH STROKE"
            }, {
                char: "&#x21D0",
                desc: "LEFTWARDS DOUBLE ARROW"
            }, {
                char: "&#x21D1",
                desc: "UPWARDS DOUBLE ARROW"
            }, {
                char: "&#x21D2",
                desc: "RIGHTWARDS DOUBLE ARROW"
            }, {
                char: "&#x21D3",
                desc: "DOWNWARDS DOUBLE ARROW"
            }, {
                char: "&#x21D4",
                desc: "LEFT RIGHT DOUBLE ARROW"
            }, {
                char: "&#x21D5",
                desc: "UP DOWN DOUBLE ARROW"
            }, {
                char: "&#x21D6",
                desc: "NORTH WEST DOUBLE ARROW"
            }, {
                char: "&#x21D7",
                desc: "NORTH EAST DOUBLE ARROW"
            }, {
                char: "&#x21D8",
                desc: "SOUTH EAST DOUBLE ARROW"
            }, {
                char: "&#x21D9",
                desc: "SOUTH WEST DOUBLE ARROW"
            }, {
                char: "&#x21DA",
                desc: "LEFTWARDS TRIPLE ARROW"
            }, {
                char: "&#x21DB",
                desc: "RIGHTWARDS TRIPLE ARROW"
            }, {
                char: "&#x21DC",
                desc: "LEFTWARDS SQUIGGLE ARROW"
            }, {
                char: "&#x21DD",
                desc: "RIGHTWARDS SQUIGGLE ARROW"
            }, {
                char: "&#x21DE",
                desc: "UPWARDS ARROW WITH DOUBLE STROKE"
            }, {
                char: "&#x21DF",
                desc: "DOWNWARDS ARROW WITH DOUBLE STROKE"
            }, {
                char: "&#x21E0",
                desc: "LEFTWARDS DASHED ARROW"
            }, {
                char: "&#x21E1",
                desc: "UPWARDS DASHED ARROW"
            }, {
                char: "&#x21E2",
                desc: "RIGHTWARDS DASHED ARROW"
            }, {
                char: "&#x21E3",
                desc: "DOWNWARDS DASHED ARROW"
            }, {
                char: "&#x21E4",
                desc: "LEFTWARDS ARROW TO BAR"
            }, {
                char: "&#x21E5",
                desc: "RIGHTWARDS ARROW TO BAR"
            }, {
                char: "&#x21E6",
                desc: "LEFTWARDS WHITE ARROW"
            }, {
                char: "&#x21E7",
                desc: "UPWARDS WHITE ARROW"
            }, {
                char: "&#x21E8",
                desc: "RIGHTWARDS WHITE ARROW"
            }, {
                char: "&#x21E9",
                desc: "DOWNWARDS WHITE ARROW"
            }, {
                char: "&#x21EA",
                desc: "UPWARDS WHITE ARROW FROM BAR"
            }, {
                char: "&#x21EB",
                desc: "UPWARDS WHITE ARROW ON PEDESTAL"
            }, {
                char: "&#x21EC",
                desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH HORIZONTAL BAR"
            }, {
                char: "&#x21ED",
                desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH VERTICAL BAR"
            }, {
                char: "&#x21EE",
                desc: "UPWARDS WHITE DOUBLE ARROW"
            }, {
                char: "&#x21EF",
                desc: "UPWARDS WHITE DOUBLE ARROW ON PEDESTAL"
            }, {
                char: "&#x21F0",
                desc: "RIGHTWARDS WHITE ARROW FROM WALL"
            }, {
                char: "&#x21F1",
                desc: "NORTH WEST ARROW TO CORNER"
            }, {
                char: "&#x21F2",
                desc: "SOUTH EAST ARROW TO CORNER"
            }, {
                char: "&#x21F3",
                desc: "UP DOWN WHITE ARROW"
            }, {
                char: "&#x21F4",
                desc: "RIGHT ARROW WITH SMALL CIRCLE"
            }, {
                char: "&#x21F5",
                desc: "DOWNWARDS ARROW LEFTWARDS OF UPWARDS ARROW"
            }, {
                char: "&#x21F6",
                desc: "THREE RIGHTWARDS ARROWS"
            }, {
                char: "&#x21F7",
                desc: "LEFTWARDS ARROW WITH VERTICAL STROKE"
            }, {
                char: "&#x21F8",
                desc: "RIGHTWARDS ARROW WITH VERTICAL STROKE"
            }, {
                char: "&#x21F9",
                desc: "LEFT RIGHT ARROW WITH VERTICAL STROKE"
            }, {
                char: "&#x21FA",
                desc: "LEFTWARDS ARROW WITH DOUBLE VERTICAL STROKE"
            }, {
                char: "&#x21FB",
                desc: "RIGHTWARDS ARROW WITH DOUBLE VERTICAL STROKE"
            }, {
                char: "&#x21FC",
                desc: "LEFT RIGHT ARROW WITH DOUBLE VERTICAL STROKE"
            }, {
                char: "&#x21FD",
                desc: "LEFTWARDS OPEN-HEADED ARROW"
            }, {
                char: "&#x21FE",
                desc: "RIGHTWARDS OPEN-HEADED ARROW"
            }, {
                char: "&#x21FF",
                desc: "LEFT RIGHT OPEN-HEADED ARROW"
            } ]
        }, {
            title: "Math",
            list: [ {
                char: "&forall;",
                desc: "FOR ALL"
            }, {
                char: "&part;",
                desc: "PARTIAL DIFFERENTIAL"
            }, {
                char: "&exist;",
                desc: "THERE EXISTS"
            }, {
                char: "&empty;",
                desc: "EMPTY SET"
            }, {
                char: "&nabla;",
                desc: "NABLA"
            }, {
                char: "&isin;",
                desc: "ELEMENT OF"
            }, {
                char: "&notin;",
                desc: "NOT AN ELEMENT OF"
            }, {
                char: "&ni;",
                desc: "CONTAINS AS MEMBER"
            }, {
                char: "&prod;",
                desc: "N-ARY PRODUCT"
            }, {
                char: "&sum;",
                desc: "N-ARY SUMMATION"
            }, {
                char: "&minus;",
                desc: "MINUS SIGN"
            }, {
                char: "&lowast;",
                desc: "ASTERISK OPERATOR"
            }, {
                char: "&radic;",
                desc: "SQUARE ROOT"
            }, {
                char: "&prop;",
                desc: "PROPORTIONAL TO"
            }, {
                char: "&infin;",
                desc: "INFINITY"
            }, {
                char: "&ang;",
                desc: "ANGLE"
            }, {
                char: "&and;",
                desc: "LOGICAL AND"
            }, {
                char: "&or;",
                desc: "LOGICAL OR"
            }, {
                char: "&cap;",
                desc: "INTERSECTION"
            }, {
                char: "&cup;",
                desc: "UNION"
            }, {
                char: "&int;",
                desc: "INTEGRAL"
            }, {
                char: "&there4;",
                desc: "THEREFORE"
            }, {
                char: "&sim;",
                desc: "TILDE OPERATOR"
            }, {
                char: "&cong;",
                desc: "APPROXIMATELY EQUAL TO"
            }, {
                char: "&asymp;",
                desc: "ALMOST EQUAL TO"
            }, {
                char: "&ne;",
                desc: "NOT EQUAL TO"
            }, {
                char: "&equiv;",
                desc: "IDENTICAL TO"
            }, {
                char: "&le;",
                desc: "LESS-THAN OR EQUAL TO"
            }, {
                char: "&ge;",
                desc: "GREATER-THAN OR EQUAL TO"
            }, {
                char: "&sub;",
                desc: "SUBSET OF"
            }, {
                char: "&sup;",
                desc: "SUPERSET OF"
            }, {
                char: "&nsub;",
                desc: "NOT A SUBSET OF"
            }, {
                char: "&sube;",
                desc: "SUBSET OF OR EQUAL TO"
            }, {
                char: "&supe;",
                desc: "SUPERSET OF OR EQUAL TO"
            }, {
                char: "&oplus;",
                desc: "CIRCLED PLUS"
            }, {
                char: "&otimes;",
                desc: "CIRCLED TIMES"
            }, {
                char: "&perp;",
                desc: "UP TACK"
            } ]
        }, {
            title: "Misc",
            list: [ {
                char: "&spades;",
                desc: "BLACK SPADE SUIT"
            }, {
                char: "&clubs;",
                desc: "BLACK CLUB SUIT"
            }, {
                char: "&hearts;",
                desc: "BLACK HEART SUIT"
            }, {
                char: "&diams;",
                desc: "BLACK DIAMOND SUIT"
            }, {
                char: "&#x2669",
                desc: "QUARTER NOTE"
            }, {
                char: "&#x266A",
                desc: "EIGHTH NOTE"
            }, {
                char: "&#x266B",
                desc: "BEAMED EIGHTH NOTES"
            }, {
                char: "&#x266C",
                desc: "BEAMED SIXTEENTH NOTES"
            }, {
                char: "&#x266D",
                desc: "MUSIC FLAT SIGN"
            }, {
                char: "&#x266E",
                desc: "MUSIC NATURAL SIGN"
            }, {
                char: "&#x2600",
                desc: "BLACK SUN WITH RAYS"
            }, {
                char: "&#x2601",
                desc: "CLOUD"
            }, {
                char: "&#x2602",
                desc: "UMBRELLA"
            }, {
                char: "&#x2603",
                desc: "SNOWMAN"
            }, {
                char: "&#x2615",
                desc: "HOT BEVERAGE"
            }, {
                char: "&#x2618",
                desc: "SHAMROCK"
            }, {
                char: "&#x262F",
                desc: "YIN YANG"
            }, {
                char: "&#x2714",
                desc: "HEAVY CHECK MARK"
            }, {
                char: "&#x2716",
                desc: "HEAVY MULTIPLICATION X"
            }, {
                char: "&#x2744",
                desc: "SNOWFLAKE"
            }, {
                char: "&#x275B",
                desc: "HEAVY SINGLE TURNED COMMA QUOTATION MARK ORNAMENT"
            }, {
                char: "&#x275C",
                desc: "HEAVY SINGLE COMMA QUOTATION MARK ORNAMENT"
            }, {
                char: "&#x275D",
                desc: "HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT"
            }, {
                char: "&#x275E",
                desc: "HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT"
            }, {
                char: "&#x2764",
                desc: "HEAVY BLACK HEART"
            } ]
        } ]
    }), e.FE.PLUGINS.specialCharacters = function(t) {
        function n(e, n) {
            t.events.disableBlur(), e.focus(), n.preventDefault(), n.stopPropagation();
        }
        var r, i, a = "special_characters";
        return {
            _init: function() {},
            show: function() {
                if (!r) {
                    var o = "<h4>" + t.language.translate("Special Characters") + "</h4>", s = function() {
                        for (var e = '<div class="fr-special-characters-modal">', n = 0; n < t.opts.specialCharactersSets.length; n++) {
                            for (var r = t.opts.specialCharactersSets[n], i = r.list, a = '<div class="fr-special-characters-list"><p class="fr-special-characters-title">' + t.language.translate(r.title) + "</p>", o = 0; o < i.length; o++) {
                                var s = i[o];
                                a += '<span class="fr-command fr-special-character" tabIndex="-1" role="button" value="' + s.char + '" title="' + s.desc + '">' + s.char + '<span class="fr-sr-only">' + t.language.translate(s.desc) + "&nbsp;&nbsp;&nbsp;</span></span>";
                            }
                            e += a + "</div>";
                        }
                        return e += "</div>";
                    }(), l = t.modals.create(a, o, s);
                    r = l.$modal, l.$head, i = l.$body, t.events.$on(e(t.o_win), "resize", function() {
                        (r.data("instance") || t).modals.resize(a);
                    }), t.events.bindClick(i, ".fr-special-character", function(n) {
                        var i = r.data("instance") || t, a = e(n.currentTarget);
                        i.specialCharacters.insert(a);
                    }), t.events.$on(i, "keydown", function(a) {
                        var o = a.which, s = i.find("span.fr-special-character:focus:first");
                        if (!(s.length || o != e.FE.KEYCODE.F10 || t.keys.ctrlKey(a) || a.shiftKey) && a.altKey) return n(i.find("span.fr-special-character:first"), a), 
                        !1;
                        if (o == e.FE.KEYCODE.TAB || o == e.FE.KEYCODE.ARROW_LEFT || o == e.FE.KEYCODE.ARROW_RIGHT) {
                            var l = null, d = null, c = !1;
                            return o == e.FE.KEYCODE.ARROW_LEFT || o == e.FE.KEYCODE.ARROW_RIGHT ? (d = o == e.FE.KEYCODE.ARROW_RIGHT, 
                            c = !0) : d = !a.shiftKey, s.length ? (c && (l = d ? s.nextAll("span.fr-special-character:first") : s.prevAll("span.fr-special-character:first")), 
                            l && l.length || (l = d ? s.parent().next().find("span.fr-special-character:first") : s.parent().prev().find("span.fr-special-character:" + (c ? "last" : "first"))).length || (l = i.find("span.fr-special-character:" + (d ? "first" : "last")))) : l = i.find("span.fr-special-character:" + (d ? "first" : "last")), 
                            n(l, a), !1;
                        }
                        if (o != e.FE.KEYCODE.ENTER || !s.length) return !0;
                        (r.data("instance") || t).specialCharacters.insert(s);
                    }, !0);
                }
                t.modals.show(a), t.modals.resize(a);
            },
            hide: function() {
                t.modals.hide(a);
            },
            insert: function(e) {
                t.specialCharacters.hide(), t.undo.saveStep(), t.html.insert(e.attr("value"), !0), 
                t.undo.saveStep();
            }
        };
    }, e.FroalaEditor.DefineIcon("specialCharacters", {
        template: "text",
        NAME: "&#937;"
    }), e.FE.RegisterCommand("specialCharacters", {
        title: "Special Characters",
        icon: "specialCharacters",
        undo: !1,
        focus: !1,
        modal: !0,
        callback: function() {
            this.specialCharacters.show();
        },
        plugin: "specialCharacters",
        showOnMobile: !1
    }), e.extend(e.FE.POPUP_TEMPLATES, {
        "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]",
        "table.edit": "[_BUTTONS_]",
        "table.colors": "[_BUTTONS_][_COLORS_][_CUSTOM_COLOR_]"
    }), e.extend(e.FE.DEFAULTS, {
        tableInsertMaxSize: 10,
        tableEditButtons: [ "tableHeader", "tableRemove", "|", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle" ],
        tableInsertButtons: [ "tableBack", "|" ],
        tableResizer: !0,
        tableDefaultWidth: "100%",
        tableResizerOffset: 5,
        tableResizingLimit: 30,
        tableColorsButtons: [ "tableBack", "|" ],
        tableColors: [ "#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE" ],
        tableColorsStep: 7,
        tableCellStyles: {
            "fr-highlighted": "Highlighted",
            "fr-thick": "Thick"
        },
        tableStyles: {
            "fr-dashed-borders": "Dashed Borders",
            "fr-alternate-rows": "Alternate Rows"
        },
        tableCellMultipleStyles: !0,
        tableMultipleStyles: !0,
        tableInsertHelper: !0,
        tableInsertHelperOffset: 15
    }), e.FE.PLUGINS.table = function(t) {
        function n() {
            var e = g();
            if (e) {
                var n = t.popups.get("table.edit");
                if (n || (n = s()), n) {
                    t.popups.setContainer("table.edit", t.$sc);
                    var r = S(e), i = (r.left + r.right) / 2, a = r.bottom;
                    t.popups.show("table.edit", i, a, r.bottom - r.top), t.edit.isDisabled() && (1 < z().length && t.toolbar.disable(), 
                    t.$el.removeClass("fr-no-selection"), t.edit.on(), t.button.bulkRefresh(), t.selection.setAtEnd(t.$el.find(".fr-selected-cell:last").get(0)), 
                    t.selection.restore());
                }
            }
        }
        function r() {
            var n, i, a, o, s = g();
            if (s) {
                var l = t.popups.get("table.colors");
                l || (l = function() {
                    var n = "";
                    0 < t.opts.tableColorsButtons.length && (n = '<div class="fr-buttons fr-table-colors-buttons">' + t.button.buildList(t.opts.tableColorsButtons) + "</div>");
                    var i = "";
                    t.opts.colorsHEXInput && (i = '<div class="fr-table-colors-hex-layer fr-active fr-layer" id="fr-table-colors-hex-layer-' + t.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-table-colors-hex-layer-text-' + t.id + '" type="text" placeholder="' + t.language.translate("HEX Color") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="tableCellBackgroundCustomColor" tabIndex="2" role="button">' + t.language.translate("OK") + "</button></div></div>");
                    var a = {
                        buttons: n,
                        colors: function() {
                            for (var e = '<div class="fr-table-colors">', n = 0; n < t.opts.tableColors.length; n++) 0 !== n && n % t.opts.tableColorsStep == 0 && (e += "<br>"), 
                            "REMOVE" != t.opts.tableColors[n] ? e += '<span class="fr-command" style="background: ' + t.opts.tableColors[n] + ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="' + t.opts.tableColors[n] + '"><span class="fr-sr-only">' + t.language.translate("Color") + " " + t.opts.tableColors[n] + "&nbsp;&nbsp;&nbsp;</span></span>" : e += '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="' + t.language.translate("Clear Formatting") + '">' + t.icon.create("tableColorRemove") + '<span class="fr-sr-only">' + t.language.translate("Clear Formatting") + "</span></span>";
                            return e += "</div>";
                        }(),
                        custom_color: i
                    }, o = t.popups.create("table.colors", a);
                    return t.events.$on(t.$wp, "scroll.table-colors", function() {
                        t.popups.isVisible("table.colors") && r();
                    }), s = o, t.events.on("popup.tab", function(n) {
                        var r = e(n.currentTarget);
                        if (!t.popups.isVisible("table.colors") || !r.is("span")) return !0;
                        var i = n.which, a = !0;
                        if (e.FE.KEYCODE.TAB == i) {
                            var o = s.find(".fr-buttons");
                            a = !t.accessibility.focusToolbar(o, !!n.shiftKey);
                        } else if (e.FE.KEYCODE.ARROW_UP == i || e.FE.KEYCODE.ARROW_DOWN == i || e.FE.KEYCODE.ARROW_LEFT == i || e.FE.KEYCODE.ARROW_RIGHT == i) {
                            var l = r.parent().find("span.fr-command"), d = l.index(r), c = t.opts.colorsStep, f = Math.floor(l.length / c), p = d % c, u = Math.floor(d / c), h = u * c + p, g = f * c;
                            e.FE.KEYCODE.ARROW_UP == i ? h = ((h - c) % g + g) % g : e.FE.KEYCODE.ARROW_DOWN == i ? h = (h + c) % g : e.FE.KEYCODE.ARROW_LEFT == i ? h = ((h - 1) % g + g) % g : e.FE.KEYCODE.ARROW_RIGHT == i && (h = (h + 1) % g);
                            var m = e(l.get(h));
                            t.events.disableBlur(), m.focus(), a = !1;
                        } else e.FE.KEYCODE.ENTER == i && (t.button.exec(r), a = !1);
                        return !1 === a && (n.preventDefault(), n.stopPropagation()), a;
                    }, !0), o;
                    var s;
                }()), t.popups.setContainer("table.colors", t.$sc);
                var d = S(s), c = (d.left + d.right) / 2, f = d.bottom;
                n = t.popups.get("table.colors"), i = t.$el.find(".fr-selected-cell:first"), a = t.helpers.RGBToHex(i.css("background-color")), 
                o = n.find(".fr-table-colors-hex-layer input"), n.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"), 
                n.find('span[data-param1="' + a + '"]').addClass("fr-selected-color fr-active-item"), 
                o.val(a).trigger("change"), t.popups.show("table.colors", c, f, d.bottom - d.top);
            }
        }
        function i() {
            0 === z().length && t.toolbar.enable();
        }
        function a(n) {
            if (n) return t.popups.onHide("table.insert", function() {
                t.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter");
            }), !0;
            var r = "";
            0 < t.opts.tableInsertButtons.length && (r = '<div class="fr-buttons">' + t.button.buildList(t.opts.tableInsertButtons) + "</div>");
            var i, a = {
                buttons: r,
                rows_columns: function() {
                    for (var e = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', n = 1; n <= t.opts.tableInsertMaxSize; n++) {
                        for (var r = 1; r <= t.opts.tableInsertMaxSize; r++) {
                            var i = "inline-block";
                            2 < n && !t.helpers.isMobile() && (i = "none");
                            var a = "fr-table-cell ";
                            1 == n && 1 == r && (a += " hover"), e += '<span class="fr-command ' + a + '" tabIndex="-1" data-cmd="tableInsert" data-row="' + n + '" data-col="' + r + '" data-param1="' + n + '" data-param2="' + r + '" style="display: ' + i + ';" role="button"><span></span><span class="fr-sr-only">' + n + " &times; " + r + "&nbsp;&nbsp;&nbsp;</span></span>";
                        }
                        e += '<div class="new-line"></div>';
                    }
                    return e += "</div></div>";
                }()
            }, s = t.popups.create("table.insert", a);
            return t.events.$on(s, "mouseenter", ".fr-table-size .fr-select-table-size .fr-table-cell", function(t) {
                o(e(t.currentTarget));
            }, !0), i = s, t.events.$on(i, "focus", "[tabIndex]", function(t) {
                o(e(t.currentTarget));
            }), t.events.on("popup.tab", function(n) {
                var r = e(n.currentTarget);
                if (!t.popups.isVisible("table.insert") || !r.is("span, a")) return !0;
                var i, a = n.which;
                if (e.FE.KEYCODE.ARROW_UP == a || e.FE.KEYCODE.ARROW_DOWN == a || e.FE.KEYCODE.ARROW_LEFT == a || e.FE.KEYCODE.ARROW_RIGHT == a) {
                    if (r.is("span.fr-table-cell")) {
                        var s = r.parent().find("span.fr-table-cell"), l = s.index(r), d = t.opts.tableInsertMaxSize, c = l % d, f = Math.floor(l / d);
                        e.FE.KEYCODE.ARROW_UP == a ? f = Math.max(0, f - 1) : e.FE.KEYCODE.ARROW_DOWN == a ? f = Math.min(t.opts.tableInsertMaxSize - 1, f + 1) : e.FE.KEYCODE.ARROW_LEFT == a ? c = Math.max(0, c - 1) : e.FE.KEYCODE.ARROW_RIGHT == a && (c = Math.min(t.opts.tableInsertMaxSize - 1, c + 1));
                        var p = f * d + c, u = e(s.get(p));
                        o(u), t.events.disableBlur(), u.focus(), i = !1;
                    }
                } else e.FE.KEYCODE.ENTER == a && (t.button.exec(r), i = !1);
                return !1 === i && (n.preventDefault(), n.stopPropagation()), i;
            }, !0), s;
        }
        function o(e) {
            var n = e.data("row"), r = e.data("col"), i = e.parent();
            i.siblings(".fr-table-size-info").html(n + " &times; " + r), i.find("> span").removeClass("hover fr-active-item");
            for (var a = 1; a <= t.opts.tableInsertMaxSize; a++) for (var o = 0; o <= t.opts.tableInsertMaxSize; o++) {
                var s = i.find('> span[data-row="' + a + '"][data-col="' + o + '"]');
                a <= n && o <= r ? s.addClass("hover") : a <= n + 1 || a <= 2 && !t.helpers.isMobile() ? s.css("display", "inline-block") : 2 < a && !t.helpers.isMobile() && s.css("display", "none");
            }
            e.addClass("fr-active-item");
        }
        function s(e) {
            if (e) return t.popups.onHide("table.edit", i), !0;
            if (0 < t.opts.tableEditButtons.length) {
                var r = {
                    buttons: '<div class="fr-buttons">' + t.button.buildList(t.opts.tableEditButtons) + "</div>"
                }, a = t.popups.create("table.edit", r);
                return t.events.$on(t.$wp, "scroll.table-edit", function() {
                    t.popups.isVisible("table.edit") && n();
                }), a;
            }
            return !1;
        }
        function l() {
            if (0 < z().length) {
                var e = G();
                t.selection.setBefore(e.get(0)) || t.selection.setAfter(e.get(0)), t.selection.restore(), 
                t.popups.hide("table.edit"), e.remove(), t.toolbar.enable();
            }
        }
        function d(r) {
            var i = G();
            if (0 < i.length) {
                if (0 < t.$el.find("th.fr-selected-cell").length && "above" == r) return;
                var a, o, s, l = g(), d = A(l);
                o = "above" == r ? d.min_i : d.max_i;
                var c = "<tr>";
                for (a = 0; a < l[o].length; a++) if ("below" == r && o < l.length - 1 && l[o][a] == l[o + 1][a] || "above" == r && 0 < o && l[o][a] == l[o - 1][a]) {
                    if (0 === a || 0 < a && l[o][a] != l[o][a - 1]) {
                        var f = e(l[o][a]);
                        f.attr("rowspan", parseInt(f.attr("rowspan"), 10) + 1);
                    }
                } else c += "<td><br></td>";
                c += "</tr>", s = e(0 < t.$el.find("th.fr-selected-cell").length && "below" == r ? i.find("tbody").not(i.find("table tbody")) : i.find("tr").not(i.find("table tr")).get(o)), 
                "below" == r ? "TBODY" == s.prop("tagName") ? s.prepend(c) : s.after(c) : "above" == r && (s.before(c), 
                t.popups.isVisible("table.edit") && n());
            }
        }
        function c(e, t, n) {
            var r, i, a, o, s, l = 0, d = g(n);
            if (e < (t = Math.min(t, d[0].length - 1))) for (i = e; i <= t; i++) if (!(e < i && d[0][i] == d[0][i - 1]) && 1 < (o = Math.min(parseInt(d[0][i].getAttribute("colspan"), 10) || 1, t - e + 1)) && d[0][i] == d[0][i + 1]) for (l = o - 1, 
            r = 1; r < d.length; r++) if (d[r][i] != d[r - 1][i]) {
                for (a = i; a < i + o; a++) if (1 < (s = parseInt(d[r][a].getAttribute("colspan"), 10) || 1) && d[r][a] == d[r][a + 1]) a += l = Math.min(l, s - 1); else if (!(l = Math.max(0, l - 1))) break;
                if (!l) break;
            }
            l && p(d, l, "colspan", 0, d.length - 1, e, t);
        }
        function f(e, t, n) {
            var r, i, a, o, s, l = 0, d = g(n);
            if (e < (t = Math.min(t, d.length - 1))) for (r = e; r <= t; r++) if (!(e < r && d[r][0] == d[r - 1][0]) && 1 < (o = Math.min(parseInt(d[r][0].getAttribute("rowspan"), 10) || 1, t - e + 1)) && d[r][0] == d[r + 1][0]) for (l = o - 1, 
            i = 1; i < d[0].length; i++) if (d[r][i] != d[r][i - 1]) {
                for (a = r; a < r + o; a++) if (1 < (s = parseInt(d[a][i].getAttribute("rowspan"), 10) || 1) && d[a][i] == d[a + 1][i]) a += l = Math.min(l, s - 1); else if (!(l = Math.max(0, l - 1))) break;
                if (!l) break;
            }
            l && p(d, l, "rowspan", e, t, 0, d[0].length - 1);
        }
        function p(e, t, n, r, i, a, o) {
            var s, l, d;
            for (s = r; s <= i; s++) for (l = a; l <= o; l++) r < s && e[s][l] == e[s - 1][l] || a < l && e[s][l] == e[s][l - 1] || 1 < (d = parseInt(e[s][l].getAttribute(n), 10) || 1) && (1 < d - t ? e[s][l].setAttribute(n, d - t) : e[s][l].removeAttribute(n));
        }
        function u(e, t, n, r, i) {
            f(e, t, i), c(n, r, i);
        }
        function h(e) {
            var r = t.$el.find(".fr-selected-cell");
            "REMOVE" != e ? r.css("background-color", t.helpers.HEXtoRGB(e)) : r.css("background-color", ""), 
            n();
        }
        function g(t) {
            var n = [];
            return null == (t = t || null) && 0 < z().length && (t = G()), t && t.find("tr").not(t.find("table tr")).each(function(t, r) {
                var i = e(r), a = 0;
                i.find("> th, > td").each(function(r, i) {
                    for (var o = e(i), s = parseInt(o.attr("colspan"), 10) || 1, l = parseInt(o.attr("rowspan"), 10) || 1, d = t; d < t + l; d++) for (var c = a; c < a + s; c++) n[d] || (n[d] = []), 
                    n[d][c] ? a++ : n[d][c] = i;
                    a += s;
                });
            }), n;
        }
        function m(e, t) {
            for (var n = 0; n < t.length; n++) for (var r = 0; r < t[n].length; r++) if (t[n][r] == e) return {
                row: n,
                col: r
            };
        }
        function v(e, t, n) {
            for (var r = e + 1, i = t + 1; r < n.length; ) {
                if (n[r][t] != n[e][t]) {
                    r--;
                    break;
                }
                r++;
            }
            for (r == n.length && r--; i < n[e].length; ) {
                if (n[e][i] != n[e][t]) {
                    i--;
                    break;
                }
                i++;
            }
            return i == n[e].length && i--, {
                row: r,
                col: i
            };
        }
        function E() {
            t.el.querySelector(".fr-cell-fixed") && t.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"), 
            t.el.querySelector(".fr-cell-handler") && t.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler");
        }
        function b() {
            var n = t.$el.find(".fr-selected-cell");
            0 < n.length && n.each(function() {
                var t = e(this);
                t.removeClass("fr-selected-cell"), "" === t.attr("class") && t.removeAttr("class");
            }), E();
        }
        function T() {
            t.events.disableBlur(), t.selection.clear(), t.$el.addClass("fr-no-selection"), 
            t.$el.blur(), t.events.enableBlur();
        }
        function A(e) {
            var n = t.$el.find(".fr-selected-cell");
            if (0 < n.length) {
                var r, i = e.length, a = 0, o = e[0].length, s = 0;
                for (r = 0; r < n.length; r++) {
                    var l = m(n[r], e), d = v(l.row, l.col, e);
                    i = Math.min(l.row, i), a = Math.max(d.row, a), o = Math.min(l.col, o), s = Math.max(d.col, s);
                }
                return {
                    min_i: i,
                    max_i: a,
                    min_j: o,
                    max_j: s
                };
            }
            return null;
        }
        function S(t) {
            var n = A(t), r = e(t[n.min_i][n.min_j]), i = e(t[n.min_i][n.max_j]), a = e(t[n.max_i][n.min_j]);
            return {
                left: r.offset().left,
                right: i.offset().left + i.outerWidth(),
                top: r.offset().top,
                bottom: a.offset().top + a.outerHeight()
            };
        }
        function R(n, r) {
            if (e(n).is(r)) b(), e(n).addClass("fr-selected-cell"); else {
                T(), t.edit.off();
                var i = g(), a = m(n, i), o = m(r, i), s = function t(n, r, i, a, o) {
                    var s, l, d, c, f = n, p = r, u = i, h = a;
                    for (s = f; s <= p; s++) (1 < (parseInt(e(o[s][u]).attr("rowspan"), 10) || 1) || 1 < (parseInt(e(o[s][u]).attr("colspan"), 10) || 1)) && (c = v((d = m(o[s][u], o)).row, d.col, o), 
                    f = Math.min(d.row, f), p = Math.max(c.row, p), u = Math.min(d.col, u), h = Math.max(c.col, h)), 
                    (1 < (parseInt(e(o[s][h]).attr("rowspan"), 10) || 1) || 1 < (parseInt(e(o[s][h]).attr("colspan"), 10) || 1)) && (c = v((d = m(o[s][h], o)).row, d.col, o), 
                    f = Math.min(d.row, f), p = Math.max(c.row, p), u = Math.min(d.col, u), h = Math.max(c.col, h));
                    for (l = u; l <= h; l++) (1 < (parseInt(e(o[f][l]).attr("rowspan"), 10) || 1) || 1 < (parseInt(e(o[f][l]).attr("colspan"), 10) || 1)) && (c = v((d = m(o[f][l], o)).row, d.col, o), 
                    f = Math.min(d.row, f), p = Math.max(c.row, p), u = Math.min(d.col, u), h = Math.max(c.col, h)), 
                    (1 < (parseInt(e(o[p][l]).attr("rowspan"), 10) || 1) || 1 < (parseInt(e(o[p][l]).attr("colspan"), 10) || 1)) && (c = v((d = m(o[p][l], o)).row, d.col, o), 
                    f = Math.min(d.row, f), p = Math.max(c.row, p), u = Math.min(d.col, u), h = Math.max(c.col, h));
                    return f == n && p == r && u == i && h == a ? {
                        min_i: n,
                        max_i: r,
                        min_j: i,
                        max_j: a
                    } : t(f, p, u, h, o);
                }(Math.min(a.row, o.row), Math.max(a.row, o.row), Math.min(a.col, o.col), Math.max(a.col, o.col), i);
                b(), n.classList.add("fr-cell-fixed"), r.classList.add("fr-cell-handler");
                for (var l = s.min_i; l <= s.max_i; l++) for (var d = s.min_j; d <= s.max_j; d++) e(i[l][d]).addClass("fr-selected-cell");
            }
        }
        function C(n) {
            var r = null, i = e(n.target);
            return "TD" == n.target.tagName || "TH" == n.target.tagName ? r = n.target : 0 < i.closest("td").length ? r = i.closest("td").get(0) : 0 < i.closest("th").length && (r = i.closest("th").get(0)), 
            0 === t.$el.find(r).length ? null : r;
        }
        function y() {
            b(), t.popups.hide("table.edit");
        }
        function _(n) {
            var r = C(n);
            if ("false" == e(r).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
            if (0 < z().length && !r && y(), !t.edit.isDisabled() || t.popups.isVisible("table.edit")) if (1 != n.which || 1 == n.which && t.helpers.isMac() && n.ctrlKey) (3 == n.which || 1 == n.which && t.helpers.isMac() && n.ctrlKey) && r && y(); else if (j = !0, 
            r) {
                0 < z().length && !n.shiftKey && y(), n.stopPropagation(), t.events.trigger("image.hideResizer"), 
                t.events.trigger("video.hideResizer"), q = !0;
                var i = r.tagName.toLowerCase();
                n.shiftKey && 0 < t.$el.find(i + ".fr-selected-cell").length ? e(t.$el.find(i + ".fr-selected-cell").closest("table")).is(e(r).closest("table")) ? R(Q, r) : T() : ((t.keys.ctrlKey(n) || n.shiftKey) && (1 < z().length || 0 === e(r).find(t.selection.element()).length && !e(r).is(t.selection.element())) && T(), 
                R(Q = r, Q));
            }
        }
        function L(r) {
            if (q || t.$tb.is(r.target) || t.$tb.is(e(r.target).closest(t.$tb.get(0))) || (0 < z().length && t.toolbar.enable(), 
            b()), !(1 != r.which || 1 == r.which && t.helpers.isMac() && r.ctrlKey) && (j = !1, 
            q && (q = !1, C(r) || 1 != z().length ? 0 < z().length && (t.selection.isCollapsed() ? n() : b()) : b()), 
            J)) {
                J = !1, V.removeClass("fr-moving"), t.$el.removeClass("fr-no-selection"), t.edit.on();
                var i = parseFloat(V.css("left")) + t.opts.tableResizerOffset + t.$wp.offset().left;
                t.opts.iframe && (i -= t.$iframe.offset().left), V.data("release-position", i), 
                V.removeData("max-left"), V.removeData("max-right"), function() {
                    var n = V.data("origin"), r = V.data("release-position");
                    if (n !== r) {
                        var i = V.data("first"), a = V.data("second"), o = V.data("table"), s = o.outerWidth();
                        if (t.undo.canDo() || t.undo.saveStep(), null !== i && null !== a) {
                            var l, d, c, f = g(o), p = [], u = [], h = [], m = [];
                            for (l = 0; l < f.length; l++) d = e(f[l][i]), c = e(f[l][a]), p[l] = d.outerWidth(), 
                            h[l] = c.outerWidth(), u[l] = p[l] / s * 100, m[l] = h[l] / s * 100;
                            for (l = 0; l < f.length; l++) {
                                d = e(f[l][i]), c = e(f[l][a]);
                                var v = (u[l] * (p[l] + r - n) / p[l]).toFixed(4);
                                d.css("width", v + "%"), c.css("width", (u[l] + m[l] - v).toFixed(4) + "%");
                            }
                        } else {
                            var E, b = o.parent(), T = s / b.width() * 100, A = (parseInt(o.css("margin-left"), 10) || 0) / b.width() * 100, S = (parseInt(o.css("margin-right"), 10) || 0) / b.width() * 100;
                            "rtl" == t.opts.direction && 0 === a || "rtl" != t.opts.direction && 0 !== a ? (E = (s + r - n) / s * T, 
                            o.css("margin-right", "calc(100% - " + Math.round(E).toFixed(4) + "% - " + Math.round(A).toFixed(4) + "%)")) : ("rtl" == t.opts.direction && 0 !== a || "rtl" != t.opts.direction && 0 === a) && (E = (s - r + n) / s * T, 
                            o.css("margin-left", "calc(100% - " + Math.round(E).toFixed(4) + "% - " + Math.round(S).toFixed(4) + "%)")), 
                            o.css("width", Math.round(E).toFixed(4) + "%");
                        }
                        t.selection.restore(), t.undo.saveStep();
                    }
                    V.removeData("origin"), V.removeData("release-position"), V.removeData("first"), 
                    V.removeData("second"), V.removeData("table");
                }(), I();
            }
        }
        function x(n) {
            if (!0 === q) {
                if (e(n.currentTarget).closest("table").is(G())) {
                    if ("TD" == n.currentTarget.tagName && 0 === t.$el.find("th.fr-selected-cell").length) return void R(Q, n.currentTarget);
                    if ("TH" == n.currentTarget.tagName && 0 === t.$el.find("td.fr-selected-cell").length) return void R(Q, n.currentTarget);
                }
                T();
            }
        }
        function N(n, r, i, a) {
            for (var o, s = r; s != t.el && "TD" != s.tagName && "TH" != s.tagName && ("up" == a ? o = s.previousElementSibling : "down" == a && (o = s.nextElementSibling), 
            !o); ) s = s.parentNode;
            "TD" == s.tagName || "TH" == s.tagName ? function(n, r) {
                for (var i = n; i && "TABLE" != i.tagName && i.parentNode != t.el; ) i = i.parentNode;
                if (i && "TABLE" == i.tagName) {
                    var a = g(e(i));
                    "up" == r ? w(m(n, a), i, a) : "down" == r && O(m(n, a), i, a);
                }
            }(s, a) : o && ("up" == a && t.selection.setAtEnd(o), "down" == a && t.selection.setAtStart(o));
        }
        function w(e, n, r) {
            0 < e.row ? t.selection.setAtEnd(r[e.row - 1][e.col]) : N(0, n, 0, "up");
        }
        function O(e, n, r) {
            var i = parseInt(r[e.row][e.col].getAttribute("rowspan"), 10) || 1;
            e.row < r.length - i ? t.selection.setAtStart(r[e.row + i][e.col]) : N(0, n, 0, "down");
        }
        function I() {
            V && (V.find("div").css("opacity", 0), V.css("top", 0), V.css("left", 0), V.css("height", 0), 
            V.find("div").css("height", 0), V.hide());
        }
        function k() {
            X && X.removeClass("fr-visible").css("left", "-9999px");
        }
        function D(n, r) {
            var i = e(r), a = i.closest("table"), o = a.parent();
            if (r && "TD" != r.tagName && "TH" != r.tagName && (0 < i.closest("td").length ? r = i.closest("td") : 0 < i.closest("th").length && (r = i.closest("th"))), 
            !r || "TD" != r.tagName && "TH" != r.tagName) V && i.get(0) != V.get(0) && i.parent().get(0) != V.get(0) && t.core.sameInstance(V) && I(); else {
                if (i = e(r), 0 === t.$el.find(i).length) return !1;
                var s = i.offset().left - 1, l = s + i.outerWidth();
                if (Math.abs(n.pageX - s) <= t.opts.tableResizerOffset || Math.abs(l - n.pageX) <= t.opts.tableResizerOffset) {
                    var d, c, f, p, u, h = g(a), E = m(r, h), b = v(E.row, E.col, h), A = a.offset().top, S = a.outerHeight() - 1;
                    "rtl" != t.opts.direction ? n.pageX - s <= t.opts.tableResizerOffset ? (f = s, 0 < E.col ? (p = s - P(E.col - 1, h) + t.opts.tableResizingLimit, 
                    u = s + P(E.col, h) - t.opts.tableResizingLimit, d = E.col - 1, c = E.col) : (d = null, 
                    c = 0, p = a.offset().left - 1 - parseInt(a.css("margin-left"), 10), u = a.offset().left - 1 + a.width() - h[0].length * t.opts.tableResizingLimit)) : l - n.pageX <= t.opts.tableResizerOffset && (f = l, 
                    b.col < h[b.row].length && h[b.row][b.col + 1] ? (p = l - P(b.col, h) + t.opts.tableResizingLimit, 
                    u = l + P(b.col + 1, h) - t.opts.tableResizingLimit, d = b.col, c = b.col + 1) : (d = b.col, 
                    c = null, p = a.offset().left - 1 + h[0].length * t.opts.tableResizingLimit, u = o.offset().left - 1 + o.width() + parseFloat(o.css("padding-left")))) : l - n.pageX <= t.opts.tableResizerOffset ? (f = l, 
                    0 < E.col ? (p = l - P(E.col, h) + t.opts.tableResizingLimit, u = l + P(E.col - 1, h) - t.opts.tableResizingLimit, 
                    d = E.col, c = E.col - 1) : (d = null, c = 0, p = a.offset().left + h[0].length * t.opts.tableResizingLimit, 
                    u = o.offset().left - 1 + o.width() + parseFloat(o.css("padding-left")))) : n.pageX - s <= t.opts.tableResizerOffset && (f = s, 
                    b.col < h[b.row].length && h[b.row][b.col + 1] ? (p = s - P(b.col + 1, h) + t.opts.tableResizingLimit, 
                    u = s + P(b.col, h) - t.opts.tableResizingLimit, d = b.col + 1, c = b.col) : (d = b.col, 
                    c = null, p = o.offset().left + parseFloat(o.css("padding-left")), u = a.offset().left - 1 + a.width() - h[0].length * t.opts.tableResizingLimit)), 
                    V || (t.shared.$table_resizer || (t.shared.$table_resizer = e('<div class="fr-table-resizer"><div></div></div>')), 
                    V = t.shared.$table_resizer, t.events.$on(V, "mousedown", function(e) {
                        return !t.core.sameInstance(V) || (0 < z().length && y(), 1 == e.which ? (t.selection.save(), 
                        J = !0, V.addClass("fr-moving"), T(), t.edit.off(), V.find("div").css("opacity", 1), 
                        !1) : void 0);
                    }), t.events.$on(V, "mousemove", function(e) {
                        if (!t.core.sameInstance(V)) return !0;
                        J && (t.opts.iframe && (e.pageX -= t.$iframe.offset().left), U(e));
                    }), t.events.on("shared.destroy", function() {
                        V.html("").removeData().remove(), V = null;
                    }, !0), t.events.on("destroy", function() {
                        t.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), V.hide().appendTo(e("body:first"));
                    }, !0)), V.data("table", a), V.data("first", d), V.data("second", c), V.data("instance", t), 
                    t.$wp.append(V);
                    var R = f - t.win.pageXOffset - t.opts.tableResizerOffset - t.$wp.offset().left, C = A - t.$wp.offset().top + t.$wp.scrollTop();
                    t.opts.iframe && (R += t.$iframe.offset().left, C += t.$iframe.offset().top, p += t.$iframe.offset().left, 
                    u += t.$iframe.offset().left), V.data("max-left", p), V.data("max-right", u), V.data("origin", f - t.win.pageXOffset), 
                    V.css("top", C), V.css("left", R), V.css("height", S), V.find("div").css("height", S), 
                    V.css("padding-left", t.opts.tableResizerOffset), V.css("padding-right", t.opts.tableResizerOffset), 
                    V.show();
                } else t.core.sameInstance(V) && I();
            }
        }
        function F(n, r) {
            if (t.$box.find(".fr-line-breaker").is(":visible")) return !1;
            X || H(), t.$box.append(X), X.data("instance", t);
            var i, a = e(r).find("tr:first"), o = n.pageX, s = 0, l = 0;
            t.opts.iframe && (s += t.$iframe.offset().left - t.helpers.scrollLeft(), l += t.$iframe.offset().top - t.helpers.scrollTop()), 
            a.find("th, td").each(function() {
                var n = e(this);
                return n.offset().left <= o && o < n.offset().left + n.outerWidth() / 2 ? (i = parseInt(X.find("a").css("width"), 10), 
                X.css("top", l + n.offset().top - t.$box.offset().top - t.win.pageYOffset - i - 5), 
                X.css("left", s + n.offset().left - t.$box.offset().left - t.win.pageXOffset - i / 2), 
                X.data("selected-cell", n), X.data("position", "before"), X.addClass("fr-visible"), 
                !1) : n.offset().left + n.outerWidth() / 2 <= o && o < n.offset().left + n.outerWidth() ? (i = parseInt(X.find("a").css("width"), 10), 
                X.css("top", l + n.offset().top - t.$box.offset().top - t.win.pageYOffset - i - 5), 
                X.css("left", s + n.offset().left - t.$box.offset().left + n.outerWidth() - t.win.pageXOffset - i / 2), 
                X.data("selected-cell", n), X.data("position", "after"), X.addClass("fr-visible"), 
                !1) : void 0;
            });
        }
        function M(n, r) {
            if (t.$box.find(".fr-line-breaker").is(":visible")) return !1;
            X || H(), t.$box.append(X), X.data("instance", t);
            var i, a = e(r), o = n.pageY, s = 0, l = 0;
            t.opts.iframe && (s += t.$iframe.offset().left - t.helpers.scrollLeft(), l += t.$iframe.offset().top - t.helpers.scrollTop()), 
            a.find("tr").each(function() {
                var n = e(this);
                return n.offset().top <= o && o < n.offset().top + n.outerHeight() / 2 ? (i = parseInt(X.find("a").css("width"), 10), 
                X.css("top", l + n.offset().top - t.$box.offset().top - t.win.pageYOffset - i / 2), 
                X.css("left", s + n.offset().left - t.$box.offset().left - t.win.pageXOffset - i - 5), 
                X.data("selected-cell", n.find("td:first")), X.data("position", "above"), X.addClass("fr-visible"), 
                !1) : n.offset().top + n.outerHeight() / 2 <= o && o < n.offset().top + n.outerHeight() ? (i = parseInt(X.find("a").css("width"), 10), 
                X.css("top", l + n.offset().top - t.$box.offset().top + n.outerHeight() - t.win.pageYOffset - i / 2), 
                X.css("left", s + n.offset().left - t.$box.offset().left - t.win.pageXOffset - i - 5), 
                X.data("selected-cell", n.find("td:first")), X.data("position", "below"), X.addClass("fr-visible"), 
                !1) : void 0;
            });
        }
        function $(n) {
            Z = null;
            var r = t.doc.elementFromPoint(n.pageX - t.win.pageXOffset, n.pageY - t.win.pageYOffset);
            t.opts.tableResizer && (!t.popups.areVisible() || t.popups.areVisible() && t.popups.isVisible("table.edit")) && D(n, r), 
            !t.opts.tableInsertHelper || t.popups.areVisible() || t.$tb.hasClass("fr-inline") && t.$tb.is(":visible") || function(n, r) {
                if (0 === z().length) {
                    var i, a, o;
                    if (r && ("HTML" == r.tagName || "BODY" == r.tagName || t.node.isElement(r))) for (i = 1; i <= t.opts.tableInsertHelperOffset; i++) {
                        if (a = t.doc.elementFromPoint(n.pageX - t.win.pageXOffset, n.pageY - t.win.pageYOffset + i), 
                        e(a).hasClass("fr-tooltip")) return;
                        if (a && ("TH" == a.tagName || "TD" == a.tagName || "TABLE" == a.tagName) && (e(a).parents(".fr-wrapper").length || t.opts.iframe)) return F(n, e(a).closest("table"));
                        if (o = t.doc.elementFromPoint(n.pageX - t.win.pageXOffset + i, n.pageY - t.win.pageYOffset), 
                        e(o).hasClass("fr-tooltip")) return;
                        if (o && ("TH" == o.tagName || "TD" == o.tagName || "TABLE" == o.tagName) && (e(o).parents(".fr-wrapper").length || t.opts.iframe)) return M(n, e(o).closest("table"));
                    }
                    t.core.sameInstance(X) && k();
                }
            }(n, r);
        }
        function B() {
            if (J) {
                var e = V.data("table").offset().top - t.win.pageYOffset;
                t.opts.iframe && (e += t.$iframe.offset().top - t.helpers.scrollTop()), V.css("top", e);
            }
        }
        function P(t, n) {
            var r, i = e(n[0][t]).outerWidth();
            for (r = 1; r < n.length; r++) i = Math.min(i, e(n[r][t]).outerWidth());
            return i;
        }
        function K(e, t, n) {
            var r, i = 0;
            for (r = e; r <= t; r++) i += P(r, n);
            return i;
        }
        function U(e) {
            if (1 < z().length && j && T(), !1 === j && !1 === q && !1 === J) Z && clearTimeout(Z), 
            t.edit.isDisabled() && !t.popups.isVisible("table.edit") || (Z = setTimeout($, 30, e)); else if (J) {
                var n = e.pageX - t.win.pageXOffset;
                t.opts.iframe && (n += t.$iframe.offset().left);
                var r = V.data("max-left"), i = V.data("max-right");
                r <= n && n <= i ? V.css("left", n - t.opts.tableResizerOffset - t.$wp.offset().left) : n < r && parseFloat(V.css("left"), 10) > r - t.opts.tableResizerOffset ? V.css("left", r - t.opts.tableResizerOffset - t.$wp.offset().left) : i < n && parseFloat(V.css("left"), 10) < i - t.opts.tableResizerOffset && V.css("left", i - t.opts.tableResizerOffset - t.$wp.offset().left);
            } else j && k();
        }
        function W(n) {
            t.node.isEmpty(n.get(0)) ? n.prepend(e.FE.MARKERS) : n.prepend(e.FE.START_MARKER).append(e.FE.END_MARKER);
        }
        function H() {
            t.shared.$ti_helper || (t.shared.$ti_helper = e('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + t.language.translate("Insert") + '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'), 
            t.events.bindClick(t.shared.$ti_helper, "a", function() {
                var e = X.data("selected-cell"), n = X.data("position"), r = X.data("instance") || t;
                "before" == n ? (t.undo.saveStep(), e.addClass("fr-selected-cell"), r.table.insertColumn(n), 
                e.removeClass("fr-selected-cell"), t.undo.saveStep()) : "after" == n ? (t.undo.saveStep(), 
                e.addClass("fr-selected-cell"), r.table.insertColumn(n), e.removeClass("fr-selected-cell"), 
                t.undo.saveStep()) : "above" == n ? (t.undo.saveStep(), e.addClass("fr-selected-cell"), 
                r.table.insertRow(n), e.removeClass("fr-selected-cell"), t.undo.saveStep()) : "below" == n && (t.undo.saveStep(), 
                e.addClass("fr-selected-cell"), r.table.insertRow(n), e.removeClass("fr-selected-cell"), 
                t.undo.saveStep()), k();
            }), t.events.on("shared.destroy", function() {
                t.shared.$ti_helper.html("").removeData().remove(), t.shared.$ti_helper = null;
            }, !0), t.events.$on(t.shared.$ti_helper, "mousemove", function(e) {
                e.stopPropagation();
            }, !0), t.events.$on(e(t.o_win), "scroll", function() {
                k();
            }, !0), t.events.$on(t.$wp, "scroll", function() {
                k();
            }, !0)), X = t.shared.$ti_helper, t.events.on("destroy", function() {
                X = null;
            }), t.tooltip.bind(t.$box, ".fr-insert-helper > a.fr-floating-btn");
        }
        function Y() {
            Q = null, clearTimeout(Z);
        }
        function z() {
            return t.el.querySelectorAll(".fr-selected-cell");
        }
        function G() {
            var n = z();
            if (n.length) {
                for (var r = n[0]; r && "TABLE" != r.tagName && r.parentNode != t.el; ) r = r.parentNode;
                return e(r && "TABLE" == r.tagName ? r : []);
            }
            return e([]);
        }
        var V, X, q, j, Q, Z, J;
        return {
            _init: function() {
                if (!t.$wp) return !1;
                if (!t.helpers.isMobile()) {
                    J = q = j = !1, t.events.$on(t.$el, "mousedown", _), t.popups.onShow("image.edit", function() {
                        b(), q = j = !1;
                    }), t.popups.onShow("link.edit", function() {
                        b(), q = j = !1;
                    }), t.events.on("commands.mousedown", function(e) {
                        0 < e.parents(".fr-toolbar").length && b();
                    }), t.events.$on(t.$el, "mouseenter", "th, td", x), t.events.$on(t.$win, "mouseup", L), 
                    t.opts.iframe && t.events.$on(e(t.o_win), "mouseup", L), t.events.$on(t.$win, "mousemove", U), 
                    t.events.$on(e(t.o_win), "scroll", B), t.events.on("contentChanged", function() {
                        0 < z().length && (n(), t.$el.find("img").on("load.selected-cells", function() {
                            e(this).off("load.selected-cells"), 0 < z().length && n();
                        }));
                    }), t.events.$on(e(t.o_win), "resize", function() {
                        b();
                    }), t.events.on("toolbar.esc", function() {
                        if (0 < z().length) return t.events.disableBlur(), t.events.focus(), !1;
                    }, !0), t.events.$on(e(t.o_win), "keydown", function() {
                        j && q && (q = j = !1, t.$el.removeClass("fr-no-selection"), t.edit.on(), t.selection.setAtEnd(t.$el.find(".fr-selected-cell:last").get(0)), 
                        t.selection.restore(), b());
                    }), t.events.$on(t.$el, "keydown", function(r) {
                        r.shiftKey ? !1 === function(n) {
                            var r = z();
                            if (0 < r.length) {
                                var i, a, o = g(), s = n.which;
                                1 == r.length ? a = i = r[0] : (i = t.el.querySelector(".fr-cell-fixed"), a = t.el.querySelector(".fr-cell-handler"));
                                var l = m(a, o);
                                if (e.FE.KEYCODE.ARROW_RIGHT == s) {
                                    if (l.col < o[0].length - 1) return R(i, o[l.row][l.col + 1]), !1;
                                } else if (e.FE.KEYCODE.ARROW_DOWN == s) {
                                    if (l.row < o.length - 1) return R(i, o[l.row + 1][l.col]), !1;
                                } else if (e.FE.KEYCODE.ARROW_LEFT == s) {
                                    if (0 < l.col) return R(i, o[l.row][l.col - 1]), !1;
                                } else if (e.FE.KEYCODE.ARROW_UP == s && 0 < l.row) return R(i, o[l.row - 1][l.col]), 
                                !1;
                            }
                        }(r) && setTimeout(function() {
                            n();
                        }, 0) : function(n) {
                            var r = n.which, i = t.selection.blocks();
                            if (i.length && ("TD" == (i = i[0]).tagName || "TH" == i.tagName)) {
                                for (var a = i; a && "TABLE" != a.tagName && a.parentNode != t.el; ) a = a.parentNode;
                                if (a && "TABLE" == a.tagName && (e.FE.KEYCODE.ARROW_LEFT == r || e.FE.KEYCODE.ARROW_UP == r || e.FE.KEYCODE.ARROW_RIGHT == r || e.FE.KEYCODE.ARROW_DOWN == r) && (0 < z().length && y(), 
                                t.browser.webkit && (e.FE.KEYCODE.ARROW_UP == r || e.FE.KEYCODE.ARROW_DOWN == r))) {
                                    var o = t.selection.ranges(0).startContainer;
                                    if (o.nodeType == Node.TEXT_NODE && (e.FE.KEYCODE.ARROW_UP == r && o.previousSibling || e.FE.KEYCODE.ARROW_DOWN == r && o.nextSibling)) return;
                                    n.preventDefault(), n.stopPropagation();
                                    var s = g(e(a)), l = m(i, s);
                                    e.FE.KEYCODE.ARROW_UP == r ? w(l, a, s) : e.FE.KEYCODE.ARROW_DOWN == r && O(l, a, s), 
                                    t.selection.restore();
                                }
                            }
                        }(r);
                    }), t.events.on("keydown", function(r) {
                        if (!1 === function(n) {
                            if (n.which == e.FE.KEYCODE.TAB) {
                                var r;
                                if (0 < z().length) r = t.$el.find(".fr-selected-cell:last"); else {
                                    var i = t.selection.element();
                                    "TD" == i.tagName || "TH" == i.tagName ? r = e(i) : i != t.el && (0 < e(i).parentsUntil(t.$el, "td").length ? r = e(i).parents("td:first") : 0 < e(i).parentsUntil(t.$el, "th").length && (r = e(i).parents("th:first")));
                                }
                                if (r) return n.preventDefault(), !!(0 < e(t.selection.element()).parentsUntil(t.$el, "ol, ul").length && (0 < e(t.selection.element()).parents("li").prev().length || e(t.selection.element()).is("li") && 0 < e(t.selection.element()).prev().length)) || (y(), 
                                n.shiftKey ? 0 < r.prev().length ? W(r.prev()) : 0 < r.closest("tr").length && 0 < r.closest("tr").prev().length ? W(r.closest("tr").prev().find("td:last")) : 0 < r.closest("tbody").length && 0 < r.closest("table").find("thead tr").length && W(r.closest("table").find("thead tr th:last")) : 0 < r.next().length ? W(r.next()) : 0 < r.closest("tr").length && 0 < r.closest("tr").next().length ? W(r.closest("tr").next().find("td:first")) : 0 < r.closest("thead").length && 0 < r.closest("table").find("tbody tr").length ? W(r.closest("table").find("tbody tr td:first")) : (r.addClass("fr-selected-cell"), 
                                d("below"), b(), W(r.closest("tr").next().find("td:first"))), t.selection.restore(), 
                                !1);
                            }
                        }(r)) return !1;
                        var i = z();
                        if (0 < i.length) {
                            if (0 < i.length && t.keys.ctrlKey(r) && r.which == e.FE.KEYCODE.A) return b(), 
                            t.popups.isVisible("table.edit") && t.popups.hide("table.edit"), i = [], !0;
                            if (r.which == e.FE.KEYCODE.ESC && t.popups.isVisible("table.edit")) return b(), 
                            t.popups.hide("table.edit"), r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation(), 
                            !(i = []);
                            if (1 < i.length && (r.which == e.FE.KEYCODE.BACKSPACE || r.which == e.FE.KEYCODE.DELETE)) {
                                t.undo.saveStep();
                                for (var a = 0; a < i.length; a++) e(i[a]).html("<br>"), a == i.length - 1 && e(i[a]).prepend(e.FE.MARKERS);
                                return t.selection.restore(), t.undo.saveStep(), !(i = []);
                            }
                            if (1 < i.length && r.which != e.FE.KEYCODE.F10 && !t.keys.isBrowserAction(r)) return r.preventDefault(), 
                            !(i = []);
                        } else if (!(i = []) === function(r) {
                            if (r.altKey && r.which == e.FE.KEYCODE.SPACE) {
                                var i, a = t.selection.element();
                                if ("TD" == a.tagName || "TH" == a.tagName ? i = a : 0 < e(a).closest("td").length ? i = e(a).closest("td").get(0) : 0 < e(a).closest("th").length && (i = e(a).closest("th").get(0)), 
                                i) return r.preventDefault(), R(i, i), n(), !1;
                            }
                        }(r)) return !1;
                    }, !0);
                    var r = [];
                    t.events.on("html.beforeGet", function() {
                        r = z();
                        for (var e = 0; e < r.length; e++) r[e].className = (r[e].className || "").replace(/fr-selected-cell/g, "");
                    }), t.events.on("html.afterGet", function() {
                        for (var e = 0; e < r.length; e++) r[e].className = (r[e].className ? r[e].className.trim() + " " : "") + "fr-selected-cell";
                        r = [];
                    }), a(!0), s(!0);
                }
                t.events.on("destroy", Y);
            },
            insert: function(n, r) {
                var i, a, o = "<table " + (t.opts.tableDefaultWidth ? 'style="width: ' + t.opts.tableDefaultWidth + ';" ' : "") + 'class="fr-inserted-table"><tbody>', s = 100 / r;
                for (i = 0; i < n; i++) {
                    for (o += "<tr>", a = 0; a < r; a++) o += "<td" + (t.opts.tableDefaultWidth ? ' style="width: ' + s.toFixed(4) + '%;"' : "") + ">", 
                    0 === i && 0 === a && (o += e.FE.MARKERS), o += "<br></td>";
                    o += "</tr>";
                }
                o += "</tbody></table>", t.html.insert(o), t.selection.restore();
                var l = t.$el.find(".fr-inserted-table");
                l.removeClass("fr-inserted-table"), t.events.trigger("table.inserted", [ l.get(0) ]);
            },
            remove: l,
            insertRow: d,
            deleteRow: function() {
                var n = G();
                if (0 < n.length) {
                    var r, i, a, o = g(), s = A(o);
                    if (0 === s.min_i && s.max_i == o.length - 1) l(); else {
                        for (r = s.max_i; r >= s.min_i; r--) {
                            for (a = e(n.find("tr").not(n.find("table tr")).get(r)), i = 0; i < o[r].length; i++) if (0 === i || o[r][i] != o[r][i - 1]) {
                                var d = e(o[r][i]);
                                if (1 < parseInt(d.attr("rowspan"), 10)) {
                                    var c = parseInt(d.attr("rowspan"), 10) - 1;
                                    1 == c ? d.removeAttr("rowspan") : d.attr("rowspan", c);
                                }
                                if (r < o.length - 1 && o[r][i] == o[r + 1][i] && (0 === r || o[r][i] != o[r - 1][i])) {
                                    for (var f = o[r][i], p = i; 0 < p && o[r][p] == o[r][p - 1]; ) p--;
                                    0 === p ? e(n.find("tr").not(n.find("table tr")).get(r + 1)).prepend(f) : e(o[r + 1][p - 1]).after(f);
                                }
                            }
                            var h = a.parent();
                            a.remove(), 0 === h.find("tr").length && h.remove(), o = g(n);
                        }
                        u(0, o.length - 1, 0, o[0].length - 1, n), 0 < s.min_i ? t.selection.setAtEnd(o[s.min_i - 1][0]) : t.selection.setAtEnd(o[0][0]), 
                        t.selection.restore(), t.popups.hide("table.edit");
                    }
                }
            },
            insertColumn: function(r) {
                var i = G();
                if (0 < i.length) {
                    var a, o = g(), s = A(o);
                    a = "before" == r ? s.min_j : s.max_j;
                    var l, d = 100 / o[0].length, c = 100 / (o[0].length + 1);
                    i.find("th, td").each(function() {
                        (l = e(this)).data("old-width", l.outerWidth() / i.outerWidth() * 100);
                    }), i.find("tr").not(i.find("table tr")).each(function(t) {
                        for (var n, i = e(this), s = 0, l = 0; s - 1 < a; ) {
                            if (!(n = i.find("> th, > td").get(l))) {
                                n = null;
                                break;
                            }
                            n == o[t][s] ? (s += parseInt(e(n).attr("colspan"), 10) || 1, l++) : (s += parseInt(e(o[t][s]).attr("colspan"), 10) || 1, 
                            "after" == r && (n = 0 === l ? -1 : i.find("> th, > td").get(l - 1)));
                        }
                        var f, p = e(n);
                        if ("after" == r && a < s - 1 || "before" == r && 0 < a && o[t][a] == o[t][a - 1]) {
                            if (0 === t || 0 < t && o[t][a] != o[t - 1][a]) {
                                var u = parseInt(p.attr("colspan"), 10) + 1;
                                p.attr("colspan", u), p.css("width", (p.data("old-width") * c / d + c).toFixed(4) + "%"), 
                                p.removeData("old-width");
                            }
                        } else f = 0 < i.find("th").length ? '<th style="width: ' + c.toFixed(4) + '%;"><br></th>' : '<td style="width: ' + c.toFixed(4) + '%;"><br></td>', 
                        -1 == n ? i.prepend(f) : null == n ? i.append(f) : "before" == r ? p.before(f) : "after" == r && p.after(f);
                    }), i.find("th, td").each(function() {
                        (l = e(this)).data("old-width") && (l.css("width", (l.data("old-width") * c / d).toFixed(4) + "%"), 
                        l.removeData("old-width"));
                    }), t.popups.isVisible("table.edit") && n();
                }
            },
            deleteColumn: function() {
                var n = G();
                if (0 < n.length) {
                    var r, i, a, o = g(), s = A(o);
                    if (0 === s.min_j && s.max_j == o[0].length - 1) l(); else {
                        var d = 0;
                        for (r = 0; r < o.length; r++) for (i = 0; i < o[0].length; i++) (a = e(o[r][i])).hasClass("fr-selected-cell") || (a.data("old-width", a.outerWidth() / n.outerWidth() * 100), 
                        (i < s.min_j || i > s.max_j) && (d += a.outerWidth() / n.outerWidth() * 100));
                        for (d /= o.length, i = s.max_j; i >= s.min_j; i--) for (r = 0; r < o.length; r++) if (0 === r || o[r][i] != o[r - 1][i]) if (a = e(o[r][i]), 
                        1 < (parseInt(a.attr("colspan"), 10) || 1)) {
                            var c = parseInt(a.attr("colspan"), 10) - 1;
                            1 == c ? a.removeAttr("colspan") : a.attr("colspan", c), a.css("width", (100 * (a.data("old-width") - P(i, o)) / d).toFixed(4) + "%"), 
                            a.removeData("old-width");
                        } else {
                            var f = e(a.parent().get(0));
                            a.remove(), 0 === f.find("> th, > td").length && (0 === f.prev().length || 0 === f.next().length || f.prev().find("> th[rowspan], > td[rowspan]").length < f.prev().find("> th, > td").length) && f.remove();
                        }
                        u(0, o.length - 1, 0, o[0].length - 1, n), 0 < s.min_j ? t.selection.setAtEnd(o[s.min_i][s.min_j - 1]) : t.selection.setAtEnd(o[s.min_i][0]), 
                        t.selection.restore(), t.popups.hide("table.edit"), n.find("th, td").each(function() {
                            (a = e(this)).data("old-width") && (a.css("width", (100 * a.data("old-width") / d).toFixed(4) + "%"), 
                            a.removeData("old-width"));
                        });
                    }
                }
            },
            mergeCells: function() {
                if (1 < z().length && (0 === t.$el.find("th.fr-selected-cell").length || 0 === t.$el.find("td.fr-selected-cell").length)) {
                    E();
                    var r, i, a = A(g()), o = t.$el.find(".fr-selected-cell"), s = e(o[0]), l = s.parent().find(".fr-selected-cell"), d = s.closest("table"), p = s.html(), u = 0;
                    for (r = 0; r < l.length; r++) u += e(l[r]).outerWidth();
                    for (s.css("width", (u / d.outerWidth() * 100).toFixed(4) + "%"), a.min_j < a.max_j && s.attr("colspan", a.max_j - a.min_j + 1), 
                    a.min_i < a.max_i && s.attr("rowspan", a.max_i - a.min_i + 1), r = 1; r < o.length; r++) "<br>" != (i = e(o[r])).html() && "" !== i.html() && (p += "<br>" + i.html()), 
                    i.remove();
                    s.html(p), t.selection.setAtEnd(s.get(0)), t.selection.restore(), t.toolbar.enable(), 
                    f(a.min_i, a.max_i, d);
                    var h = d.find("tr:empty");
                    for (r = h.length - 1; 0 <= r; r--) e(h[r]).remove();
                    c(a.min_j, a.max_j, d), n();
                }
            },
            splitCellVertically: function() {
                if (1 == z().length) {
                    var n = t.$el.find(".fr-selected-cell"), r = parseInt(n.attr("colspan"), 10) || 1, i = n.parent().outerWidth(), a = n.outerWidth(), o = n.clone().html("<br>"), s = g(), l = m(n.get(0), s);
                    if (1 < r) {
                        var d = Math.ceil(r / 2);
                        a = K(l.col, l.col + d - 1, s) / i * 100;
                        var c = K(l.col + d, l.col + r - 1, s) / i * 100;
                        1 < d ? n.attr("colspan", d) : n.removeAttr("colspan"), 1 < r - d ? o.attr("colspan", r - d) : o.removeAttr("colspan"), 
                        n.css("width", a.toFixed(4) + "%"), o.css("width", c.toFixed(4) + "%");
                    } else {
                        var f;
                        for (f = 0; f < s.length; f++) if (0 === f || s[f][l.col] != s[f - 1][l.col]) {
                            var p = e(s[f][l.col]);
                            if (!p.is(n)) {
                                var u = (parseInt(p.attr("colspan"), 10) || 1) + 1;
                                p.attr("colspan", u);
                            }
                        }
                        a = a / i * 100 / 2, n.css("width", a.toFixed(4) + "%"), o.css("width", a.toFixed(4) + "%");
                    }
                    n.after(o), b(), t.popups.hide("table.edit");
                }
            },
            splitCellHorizontally: function() {
                if (1 == z().length) {
                    var n = t.$el.find(".fr-selected-cell"), r = n.parent(), i = n.closest("table"), a = parseInt(n.attr("rowspan"), 10), o = g(), s = m(n.get(0), o), l = n.clone().html("<br>");
                    if (1 < a) {
                        var d = Math.ceil(a / 2);
                        1 < d ? n.attr("rowspan", d) : n.removeAttr("rowspan"), 1 < a - d ? l.attr("rowspan", a - d) : l.removeAttr("rowspan");
                        for (var c = s.row + d, f = 0 === s.col ? s.col : s.col - 1; 0 <= f && (o[c][f] == o[c][f - 1] || 0 < c && o[c][f] == o[c - 1][f]); ) f--;
                        -1 == f ? e(i.find("tr").not(i.find("table tr")).get(c)).prepend(l) : e(o[c][f]).after(l);
                    } else {
                        var p, u = e("<tr>").append(l);
                        for (p = 0; p < o[0].length; p++) if (0 === p || o[s.row][p] != o[s.row][p - 1]) {
                            var h = e(o[s.row][p]);
                            h.is(n) || h.attr("rowspan", (parseInt(h.attr("rowspan"), 10) || 1) + 1);
                        }
                        r.after(u);
                    }
                    b(), t.popups.hide("table.edit");
                }
            },
            addHeader: function() {
                var t = G();
                if (0 < t.length && 0 === t.find("th").length) {
                    var r, i = "<thead><tr>", a = 0;
                    for (t.find("tr:first > td").each(function() {
                        var t = e(this);
                        a += parseInt(t.attr("colspan"), 10) || 1;
                    }), r = 0; r < a; r++) i += "<th><br></th>";
                    i += "</tr></thead>", t.prepend(i), n();
                }
            },
            removeHeader: function() {
                var e = G(), r = e.find("thead");
                if (0 < r.length) if (0 === e.find("tbody tr").length) l(); else if (r.remove(), 
                0 < z().length) n(); else {
                    t.popups.hide("table.edit");
                    var i = e.find("tbody tr:first td:first").get(0);
                    i && (t.selection.setAtEnd(i), t.selection.restore());
                }
            },
            setBackground: h,
            showInsertPopup: function() {
                var e = t.$tb.find('.fr-command[data-cmd="insertTable"]'), n = t.popups.get("table.insert");
                if (n || (n = a()), !n.hasClass("fr-active")) {
                    t.popups.refresh("table.insert"), t.popups.setContainer("table.insert", t.$tb);
                    var r = e.offset().left + e.outerWidth() / 2, i = e.offset().top + (t.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                    t.popups.show("table.insert", r, i, e.outerHeight());
                }
            },
            showEditPopup: n,
            showColorsPopup: r,
            back: function() {
                0 < z().length ? n() : (t.popups.hide("table.insert"), t.toolbar.showInline());
            },
            verticalAlign: function(e) {
                t.$el.find(".fr-selected-cell").css("vertical-align", e);
            },
            horizontalAlign: function(e) {
                t.$el.find(".fr-selected-cell").css("text-align", e);
            },
            applyStyle: function(e, t, n, r) {
                if (0 < t.length) {
                    if (!n) {
                        var i = Object.keys(r);
                        i.splice(i.indexOf(e), 1), t.removeClass(i.join(" "));
                    }
                    t.toggleClass(e);
                }
            },
            selectedTable: G,
            selectedCells: z,
            customColor: function() {
                var e = t.popups.get("table.colors").find(".fr-table-colors-hex-layer input");
                e.length && h(e.val());
            }
        };
    }, e.FE.DefineIcon("insertTable", {
        NAME: "table"
    }), e.FE.RegisterCommand("insertTable", {
        title: "Insert Table",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), 
            this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup();
        },
        plugin: "table"
    }), e.FE.RegisterCommand("tableInsert", {
        callback: function(e, t, n) {
            this.table.insert(t, n), this.popups.hide("table.insert");
        }
    }), e.FE.DefineIcon("tableHeader", {
        NAME: "header",
        FA5NAME: "heading"
    }), e.FE.RegisterCommand("tableHeader", {
        title: "Table Header",
        focus: !1,
        toggle: !0,
        callback: function() {
            this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]').hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader();
        },
        refresh: function(e) {
            var t = this.table.selectedTable();
            0 < t.length && (0 === t.find("th").length ? e.removeClass("fr-active").attr("aria-pressed", !1) : e.addClass("fr-active").attr("aria-pressed", !0));
        }
    }), e.FE.DefineIcon("tableRows", {
        NAME: "bars"
    }), e.FE.RegisterCommand("tableRows", {
        type: "dropdown",
        focus: !1,
        title: "Row",
        options: {
            above: "Insert row above",
            below: "Insert row below",
            delete: "Delete row"
        },
        html: function() {
            var t = '<ul class="fr-dropdown-list" role="presentation">', n = e.FE.COMMANDS.tableRows.options;
            for (var r in n) n.hasOwnProperty(r) && (t += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + r + '" title="' + this.language.translate(n[r]) + '">' + this.language.translate(n[r]) + "</a></li>");
            return t += "</ul>";
        },
        callback: function(e, t) {
            "above" == t || "below" == t ? this.table.insertRow(t) : this.table.deleteRow();
        }
    }), e.FE.DefineIcon("tableColumns", {
        NAME: "bars fa-rotate-90"
    }), e.FE.RegisterCommand("tableColumns", {
        type: "dropdown",
        focus: !1,
        title: "Column",
        options: {
            before: "Insert column before",
            after: "Insert column after",
            delete: "Delete column"
        },
        html: function() {
            var t = '<ul class="fr-dropdown-list" role="presentation">', n = e.FE.COMMANDS.tableColumns.options;
            for (var r in n) n.hasOwnProperty(r) && (t += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="' + r + '" title="' + this.language.translate(n[r]) + '">' + this.language.translate(n[r]) + "</a></li>");
            return t += "</ul>";
        },
        callback: function(e, t) {
            "before" == t || "after" == t ? this.table.insertColumn(t) : this.table.deleteColumn();
        }
    }), e.FE.DefineIcon("tableCells", {
        NAME: "square-o",
        FA5NAME: "square"
    }), e.FE.RegisterCommand("tableCells", {
        type: "dropdown",
        focus: !1,
        title: "Cell",
        options: {
            merge: "Merge cells",
            "vertical-split": "Vertical split",
            "horizontal-split": "Horizontal split"
        },
        html: function() {
            var t = '<ul class="fr-dropdown-list" role="presentation">', n = e.FE.COMMANDS.tableCells.options;
            for (var r in n) n.hasOwnProperty(r) && (t += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="' + r + '" title="' + this.language.translate(n[r]) + '">' + this.language.translate(n[r]) + "</a></li>");
            return t += "</ul>";
        },
        callback: function(e, t) {
            "merge" == t ? this.table.mergeCells() : "vertical-split" == t ? this.table.splitCellVertically() : this.table.splitCellHorizontally();
        },
        refreshOnShow: function(e, t) {
            1 < this.$el.find(".fr-selected-cell").length ? (t.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0), 
            t.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0), 
            t.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (t.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0), 
            t.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1), 
            t.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1));
        }
    }), e.FE.DefineIcon("tableRemove", {
        NAME: "trash"
    }), e.FE.RegisterCommand("tableRemove", {
        title: "Remove Table",
        focus: !1,
        callback: function() {
            this.table.remove();
        }
    }), e.FE.DefineIcon("tableStyle", {
        NAME: "paint-brush"
    }), e.FE.RegisterCommand("tableStyle", {
        title: "Table Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.tableStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>";
        },
        callback: function(e, t) {
            this.table.applyStyle(t, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles);
        },
        refreshOnShow: function(t, n) {
            var r = this.$el.find(".fr-selected-cell").closest("table");
            r && n.find(".fr-command").each(function() {
                var t = e(this).data("param1"), n = r.hasClass(t);
                e(this).toggleClass("fr-active", n).attr("aria-selected", n);
            });
        }
    }), e.FE.DefineIcon("tableCellBackground", {
        NAME: "tint"
    }), e.FE.RegisterCommand("tableCellBackground", {
        title: "Cell Background",
        focus: !1,
        popup: !0,
        callback: function() {
            this.table.showColorsPopup();
        }
    }), e.FE.RegisterCommand("tableCellBackgroundColor", {
        undo: !0,
        focus: !1,
        callback: function(e, t) {
            this.table.setBackground(t);
        }
    }), e.FE.DefineIcon("tableBack", {
        NAME: "arrow-left"
    }), e.FE.RegisterCommand("tableBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.table.back();
        },
        refresh: function(e) {
            0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), 
            e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
        }
    }), e.FE.DefineIcon("tableCellVerticalAlign", {
        NAME: "arrows-v",
        FA5NAME: "arrows-alt-v"
    }), e.FE.RegisterCommand("tableCellVerticalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Vertical Align",
        options: {
            Top: "Align Top",
            Middle: "Align Middle",
            Bottom: "Align Bottom"
        },
        html: function() {
            var t = '<ul class="fr-dropdown-list" role="presentation">', n = e.FE.COMMANDS.tableCellVerticalAlign.options;
            for (var r in n) n.hasOwnProperty(r) && (t += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="' + r.toLowerCase() + '" title="' + this.language.translate(n[r]) + '">' + this.language.translate(r) + "</a></li>");
            return t += "</ul>";
        },
        callback: function(e, t) {
            this.table.verticalAlign(t);
        },
        refreshOnShow: function(e, t) {
            t.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0);
        }
    }), e.FE.DefineIcon("tableCellHorizontalAlign", {
        NAME: "align-left"
    }), e.FE.DefineIcon("align-left", {
        NAME: "align-left"
    }), e.FE.DefineIcon("align-right", {
        NAME: "align-right"
    }), e.FE.DefineIcon("align-center", {
        NAME: "align-center"
    }), e.FE.DefineIcon("align-justify", {
        NAME: "align-justify"
    }), e.FE.RegisterCommand("tableCellHorizontalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Horizontal Align",
        options: {
            left: "Align Left",
            center: "Align Center",
            right: "Align Right",
            justify: "Align Justify"
        },
        html: function() {
            var t = '<ul class="fr-dropdown-list" role="presentation">', n = e.FE.COMMANDS.tableCellHorizontalAlign.options;
            for (var r in n) n.hasOwnProperty(r) && (t += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="' + r + '" title="' + this.language.translate(n[r]) + '">' + this.icon.create("align-" + r) + '<span class="fr-sr-only">' + this.language.translate(n[r]) + "</span></a></li>");
            return t += "</ul>";
        },
        callback: function(e, t) {
            this.table.horizontalAlign(t);
        },
        refresh: function(t) {
            var n = this.table.selectedCells();
            n.length && t.find("> *:first").replaceWith(this.icon.create("align-" + this.helpers.getAlignment(e(n[0]))));
        },
        refreshOnShow: function(e, t) {
            t.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first")) + '"]').addClass("fr-active").attr("aria-selected", !0);
        }
    }), e.FE.DefineIcon("tableCellStyle", {
        NAME: "magic"
    }), e.FE.RegisterCommand("tableCellStyle", {
        title: "Cell Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.tableCellStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>";
        },
        callback: function(e, t) {
            this.table.applyStyle(t, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles);
        },
        refreshOnShow: function(t, n) {
            var r = this.$el.find(".fr-selected-cell:first");
            r && n.find(".fr-command").each(function() {
                var t = e(this).data("param1"), n = r.hasClass(t);
                e(this).toggleClass("fr-active", n).attr("aria-selected", n);
            });
        }
    }), e.FE.RegisterCommand("tableCellBackgroundCustomColor", {
        title: "OK",
        undo: !0,
        callback: function() {
            this.table.customColor();
        }
    }), e.FE.DefineIcon("tableColorRemove", {
        NAME: "eraser"
    }), e.FE.URLRegEx = "(^| |\\u00A0)(" + e.FE.LinkRegEx + "|([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}\\.[a-z0-9+-_]{1,}))$", 
    e.FE.PLUGINS.url = function(t) {
        function n(e, n, r) {
            for (var i = ""; r.length && "." == r[r.length - 1]; ) i += ".", r = r.substring(0, r.length - 1);
            var a = r;
            if (t.opts.linkConvertEmailAddress) t.helpers.isEmail(a) && !/^mailto:.*/i.test(a) && (a = "mailto:" + a); else if (t.helpers.isEmail(a)) return n + r;
            return /^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(a) || (a = "//" + a), 
            (n || "") + "<a" + (t.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (s ? ' rel="' + s + '"' : "") + ' data-fr-linked="true" href="' + a + '">' + r.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&amp;/g, "&").replace(/&/g, "&amp;") + "</a>" + i;
        }
        function r() {
            return new RegExp(e.FE.URLRegEx, "gi");
        }
        function i(e) {
            return t.opts.linkAlwaysNoFollow && (s = "nofollow"), t.opts.linkAlwaysBlank && (t.opts.linkNoOpener && (s ? s += " noopener" : s = "noopener"), 
            t.opts.linkNoReferrer && (s ? s += " noreferrer" : s = "noreferrer")), e.replace(r(), n);
        }
        function a(e) {
            var t = e.split(" ");
            return t[t.length - 1];
        }
        function o() {
            var n = t.selection.ranges(0).startContainer;
            if (!n || n.nodeType !== Node.TEXT_NODE) return !1;
            if (function e(n) {
                return !!n && ("A" === n.tagName || !(!n.parentNode || n.parentNode == t.el) && e(n.parentNode));
            }(n)) return !1;
            if (r().test(a(n.textContent))) {
                e(n).before(i(n.textContent));
                var o = e(n.parentNode).find("a[data-fr-linked]");
                o.removeAttr("data-fr-linked"), n.parentNode.removeChild(n), t.events.trigger("url.linked", [ o.get(0) ]);
            } else if (n.textContent.split(" ").length <= 2 && n.previousSibling && "A" === n.previousSibling.tagName) {
                var s = n.previousSibling.innerText + n.textContent;
                r().test(a(s)) && (e(n.previousSibling).replaceWith(i(s)), n.parentNode.removeChild(n));
            }
        }
        var s = null;
        return {
            _init: function() {
                t.events.on("keypress", function(e) {
                    !t.selection.isCollapsed() || "." != e.key && ")" != e.key && "(" != e.key || o();
                }, !0), t.events.on("keydown", function(n) {
                    var r = n.which;
                    !t.selection.isCollapsed() || r != e.FE.KEYCODE.ENTER && r != e.FE.KEYCODE.SPACE || o();
                }, !0), t.events.on("paste.beforeCleanup", function(e) {
                    if (t.helpers.isURL(e)) {
                        var n = null;
                        return t.opts.linkAlwaysBlank && (t.opts.linkNoOpener && (n ? n += " noopener" : n = "noopener"), 
                        t.opts.linkNoReferrer && (n ? n += " noreferrer" : n = "noreferrer")), "<a" + (t.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (n ? ' rel="' + n + '"' : "") + ' href="' + e + '" >' + e + "</a>";
                    }
                });
            }
        };
    }, e.extend(e.FE.POPUP_TEMPLATES, {
        "video.insert": "[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_][_UPLOAD_LAYER_][_PROGRESS_BAR_]",
        "video.edit": "[_BUTTONS_]",
        "video.size": "[_BUTTONS_][_SIZE_LAYER_]"
    }), e.extend(e.FE.DEFAULTS, {
        videoAllowedTypes: [ "mp4", "webm", "ogg" ],
        videoAllowedProviders: [ ".*" ],
        videoDefaultAlign: "center",
        videoDefaultDisplay: "block",
        videoDefaultWidth: 600,
        videoEditButtons: [ "videoReplace", "videoRemove", "|", "videoDisplay", "videoAlign", "videoSize" ],
        videoInsertButtons: [ "videoBack", "|", "videoByURL", "videoEmbed", "videoUpload" ],
        videoMaxSize: 52428800,
        videoMove: !0,
        videoResize: !0,
        videoSizeButtons: [ "videoBack", "|" ],
        videoSplitHTML: !1,
        videoTextNear: !0,
        videoUpload: !0,
        videoUploadMethod: "POST",
        videoUploadParam: "file",
        videoUploadParams: {},
        videoUploadToS3: !1,
        videoUploadURL: "https://i.froala.com/upload"
    }), e.FE.VIDEO_PROVIDERS = [ {
        test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g,
        url_text: "https://www.youtube.com/embed/$1",
        html: '<iframe width="640" height="360" src="{url}?wmode=opaque" frameborder="0" allowfullscreen></iframe>',
        provider: "youtube"
    }, {
        test_regex: /^.*(?:vimeo.com)\/(?:channels(\/\w+\/)?|groups\/*\/videos\/​\d+\/|video\/|)(\d+)(?:$|\/|\?)/,
        url_regex: /(?:https?:\/\/)?(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i,
        url_text: "https://player.vimeo.com/video/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
        provider: "vimeo"
    }, {
        test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g,
        url_text: "https://www.dailymotion.com/embed/video/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
        provider: "dailymotion"
    }, {
        test_regex: /^.+(screen.yahoo.com)\/[^_&]+/,
        url_regex: "",
        url_text: "",
        html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',
        provider: "yahoo"
    }, {
        test_regex: /^.+(rutube.ru)\/[^_&]+/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,
        url_text: "https://rutube.ru/play/embed/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',
        provider: "rutube"
    }, {
        test_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&\/]+)\/?(?:[^_.&]+)?/,
        url_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&\/]+)\/?(?:[^_.&]+)?/g,
        url_text: "https://play.vidyard.com/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
        provider: "vidyard"
    } ], e.FE.VIDEO_EMBED_REGEX = /^\W*((<iframe.*><\/iframe>)|(<embed.*>))\W*$/i, e.FE.PLUGINS.video = function(t) {
        function n() {
            var e = t.popups.get("video.insert");
            e.find(".fr-video-by-url-layer input").val("").trigger("change");
            var n = e.find(".fr-video-embed-layer textarea");
            n.val("").trigger("change"), (n = e.find(".fr-video-upload-layer input")).val("").trigger("change");
        }
        function r() {
            var e = t.popups.get("video.edit");
            if (e || (e = function() {
                var e = "";
                if (0 < t.opts.videoEditButtons.length) {
                    e += '<div class="fr-buttons">', e += t.button.buildList(t.opts.videoEditButtons);
                    var n = {
                        buttons: e += "</div>"
                    }, r = t.popups.create("video.edit", n);
                    return t.events.$on(t.$wp, "scroll.video-edit", function() {
                        W && t.popups.isVisible("video.edit") && (t.events.disableBlur(), f(W));
                    }), r;
                }
                return !1;
            }()), e) {
                t.popups.setContainer("video.edit", t.$sc), t.popups.refresh("video.edit");
                var n = W.find("iframe, embed, video"), r = n.offset().left + n.outerWidth() / 2, i = n.offset().top + n.outerHeight();
                t.popups.show("video.edit", r, i, n.outerHeight());
            }
        }
        function i(r) {
            if (r) return t.popups.onRefresh("video.insert", n), t.popups.onHide("image.insert", F), 
            !0;
            var i = "";
            t.opts.videoUpload || t.opts.videoInsertButtons.splice(t.opts.videoInsertButtons.indexOf("videoUpload"), 1), 
            1 < t.opts.videoInsertButtons.length && (i = '<div class="fr-buttons">' + t.button.buildList(t.opts.videoInsertButtons) + "</div>");
            var a, o = "", s = t.opts.videoInsertButtons.indexOf("videoUpload"), l = t.opts.videoInsertButtons.indexOf("videoByURL"), d = t.opts.videoInsertButtons.indexOf("videoEmbed");
            0 <= l && (a = " fr-active", (s < l && 0 <= s || d < l && 0 <= d) && (a = ""), o = '<div class="fr-video-by-url-layer fr-layer' + a + '" id="fr-video-by-url-layer-' + t.id + '"><div class="fr-input-line"><input id="fr-video-by-url-layer-text-' + t.id + '" type="text" placeholder="' + t.language.translate("Paste in a video URL") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2" role="button">' + t.language.translate("Insert") + "</button></div></div>");
            var c = "";
            0 <= d && (a = " fr-active", (s < d && 0 <= s || l < d && 0 <= l) && (a = ""), c = '<div class="fr-video-embed-layer fr-layer' + a + '" id="fr-video-embed-layer-' + t.id + '"><div class="fr-input-line"><textarea id="fr-video-embed-layer-text' + t.id + '" type="text" placeholder="' + t.language.translate("Embedded Code") + '" tabIndex="1" aria-required="true" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2" role="button">' + t.language.translate("Insert") + "</button></div></div>");
            var f = "";
            0 <= s && (a = " fr-active", (d < s && 0 <= d || l < s && 0 <= l) && (a = ""), f = '<div class="fr-video-upload-layer fr-layer' + a + '" id="fr-video-upload-layer-' + t.id + '"><strong>' + t.language.translate("Drop video") + "</strong><br>(" + t.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="video/' + t.opts.videoAllowedTypes.join(", video/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-video-upload-layer-' + t.id + '" role="button"></div></div>');
            var p = {
                buttons: i,
                by_url_layer: o,
                embed_layer: c,
                upload_layer: f,
                progress_bar: '<div class="fr-video-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="videoDismissError" tabIndex="2" role="button">OK</button></div></div>'
            }, u = t.popups.create("video.insert", p);
            return function(n) {
                t.events.$on(n, "dragover dragenter", ".fr-video-upload-layer", function() {
                    return e(this).addClass("fr-drop"), !1;
                }, !0), t.events.$on(n, "dragleave dragend", ".fr-video-upload-layer", function() {
                    return e(this).removeClass("fr-drop"), !1;
                }, !0), t.events.$on(n, "drop", ".fr-video-upload-layer", function(r) {
                    r.preventDefault(), r.stopPropagation(), e(this).removeClass("fr-drop");
                    var i = r.originalEvent.dataTransfer;
                    if (i && i.files) {
                        var a = n.data("instance") || t;
                        a.events.disableBlur(), a.video.upload(i.files), a.events.enableBlur();
                    }
                }, !0), t.helpers.isIOS() && t.events.$on(n, "touchstart", '.fr-video-upload-layer input[type="file"]', function() {
                    e(this).trigger("click");
                }, !0), t.events.$on(n, "change", '.fr-video-upload-layer input[type="file"]', function() {
                    if (this.files) {
                        var r = n.data("instance") || t;
                        r.events.disableBlur(), n.find("input:focus").blur(), r.events.enableBlur(), r.video.upload(this.files);
                    }
                    e(this).val("");
                }, !0);
            }(u), u;
        }
        function a(e) {
            t.events.focus(!0), t.selection.restore();
            var n = !1;
            W && (D(), n = !0), t.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video">' + e + "</span>", !1, t.opts.videoSplitHTML), 
            t.popups.hide("video.insert");
            var r = t.$el.find(".fr-jiv");
            r.removeClass("fr-jiv"), M(r, t.opts.videoDefaultDisplay, t.opts.videoDefaultAlign), 
            r.toggleClass("fr-draggable", t.opts.videoMove), t.events.trigger(n ? "video.replaced" : "video.inserted", [ r ]);
        }
        function o() {
            var n = e(this);
            t.popups.hide("video.insert"), n.removeClass("fr-uploading"), n.parent().next().is("br") && n.parent().next().remove(), 
            f(n.parent()), t.events.trigger("video.loaded", [ n.parent() ]);
        }
        function s(n, r, i, a, s) {
            t.edit.off(), c("Loading video"), r && (n = t.helpers.sanitizeURL(n)), l("Loading video"), 
            function() {
                var r, l;
                if (a) {
                    t.undo.canDo() || a.find("video").hasClass("fr-uploading") || t.undo.saveStep();
                    var d = a.find("video").data("fr-old-src"), c = a.data("fr-replaced");
                    a.data("fr-replaced", !1), t.$wp ? ((r = a.clone()).find("video").removeData("fr-old-src").removeClass("fr-uploading"), 
                    r.find("video").off("canplay"), d && a.find("video").attr("src", d), a.replaceWith(r)) : r = a;
                    for (var f = r.find("video").get(0).attributes, p = 0; p < f.length; p++) {
                        var u = f[p];
                        0 === u.nodeName.indexOf("data-") && r.find("video").removeAttr(u.nodeName);
                    }
                    if (void 0 !== i) for (l in i) i.hasOwnProperty(l) && "link" != l && r.find("video").attr("data-" + l, i[l]);
                    r.find("video").on("canplay", o), r.find("video").attr("src", n), t.edit.on(), A(), 
                    t.undo.saveStep(), t.$el.blur(), t.events.trigger(c ? "video.replaced" : "video.inserted", [ r, s ]);
                } else r = function(n, r, i) {
                    var a, o = "";
                    if (r && void 0 !== r) for (a in r) r.hasOwnProperty(a) && "link" != a && (o += " data-" + a + '="' + r[a] + '"');
                    var s = t.opts.videoDefaultWidth;
                    s && "auto" != s && (s += "px");
                    var l = e('<span contenteditable="false" draggable="true" class="fr-video fr-dv' + t.opts.videoDefaultDisplay[0] + ("center" != t.opts.videoDefaultAlign ? " fr-fv" + t.opts.videoDefaultAlign[0] : "") + '"><video src="' + n + '" ' + o + (s ? ' style="width: ' + s + ';" ' : "") + " controls>" + t.language.translate("Your browser does not support HTML5 video.") + "</video></span>");
                    l.toggleClass("fr-draggable", t.opts.videoMove), t.edit.on(), t.events.focus(!0), 
                    t.selection.restore(), t.undo.saveStep(), t.opts.videoSplitHTML ? t.markers.split() : t.markers.insert(), 
                    t.html.wrap();
                    var d = t.$el.find(".fr-marker");
                    return t.node.isLastSibling(d) && d.parent().hasClass("fr-deletable") && d.insertAfter(d.parent()), 
                    d.replaceWith(l), t.selection.clear(), l.find("video").get(0).readyState > l.find("video").get(0).HAVE_FUTURE_DATA || t.helpers.isIOS() ? i.call(l.find("video").get(0)) : l.find("video").on("canplaythrough load", i), 
                    l;
                }(n, i, o), A(), t.undo.saveStep(), t.events.trigger("video.inserted", [ r, s ]);
            }();
        }
        function l(e) {
            var n = t.popups.get("video.insert");
            if (n || (n = i()), n.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), 
            n.find(".fr-video-progress-bar-layer").addClass("fr-active"), n.find(".fr-buttons").hide(), 
            W) {
                var r = W.find("video");
                t.popups.setContainer("video.insert", t.$sc);
                var a = r.offset().left + r.width() / 2, o = r.offset().top + r.height();
                t.popups.show("video.insert", a, o, r.outerHeight());
            }
            void 0 === e && c(t.language.translate("Uploading"), 0);
        }
        function d(e) {
            var n = t.popups.get("video.insert");
            if (n && (n.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), 
            n.find(".fr-video-progress-bar-layer").removeClass("fr-active"), n.find(".fr-buttons").show(), 
            e || t.$el.find("video.fr-error").length)) {
                if (t.events.focus(), t.$el.find("video.fr-error").length && (t.$el.find("video.fr-error").parent().remove(), 
                t.undo.saveStep(), t.undo.run(), t.undo.dropRedo()), !t.$wp && W) {
                    var r = W;
                    C(!0), t.selection.setAfter(r.find("video").get(0)), t.selection.restore();
                }
                t.popups.hide("video.insert");
            }
        }
        function c(e, n) {
            var r = t.popups.get("video.insert");
            if (r) {
                var i = r.find(".fr-video-progress-bar-layer");
                i.find("h3").text(e + (n ? " " + n + "%" : "")), i.removeClass("fr-error"), n ? (i.find("div").removeClass("fr-indeterminate"), 
                i.find("div > span").css("width", n + "%")) : i.find("div").addClass("fr-indeterminate");
            }
        }
        function f(e) {
            R.call(e.get(0));
        }
        function p(n) {
            c("Loading video");
            var r = this.status, i = this.response, a = this.responseXML, o = this.responseText;
            try {
                if (t.opts.videoUploadToS3) if (201 == r) {
                    var l = function(n) {
                        try {
                            var r = e(n).find("Location").text(), i = e(n).find("Key").text();
                            return !1 === t.events.trigger("video.uploadedToS3", [ r, i, n ], !0) ? (t.edit.on(), 
                            !1) : r;
                        } catch (e) {
                            return N(V, n), !1;
                        }
                    }(a);
                    l && s(l, !1, [], n, i || a);
                } else N(V, i || a); else if (200 <= r && r < 300) {
                    var d = function(e) {
                        try {
                            if (!1 === t.events.trigger("video.uploaded", [ e ], !0)) return t.edit.on(), !1;
                            var n = JSON.parse(e);
                            return n.link ? n : (N(z, e), !1);
                        } catch (t) {
                            return N(V, e), !1;
                        }
                    }(o);
                    d && s(d.link, !1, d, n, i || o);
                } else N(G, i || o);
            } catch (e) {
                N(V, i || o);
            }
        }
        function u() {
            N(V, this.response || this.responseText || this.responseXML);
        }
        function h(e) {
            if (e.lengthComputable) {
                var n = e.loaded / e.total * 100 | 0;
                c(t.language.translate("Uploading"), n);
            }
        }
        function g() {
            t.edit.on(), d(!0);
        }
        function m(n) {
            if (!t.core.sameInstance(U)) return !0;
            n.preventDefault(), n.stopPropagation();
            var r = n.pageX || (n.originalEvent.touches ? n.originalEvent.touches[0].pageX : null), i = n.pageY || (n.originalEvent.touches ? n.originalEvent.touches[0].pageY : null);
            if (!r || !i) return !1;
            if ("mousedown" == n.type) {
                var a = t.$oel.get(0).ownerDocument, o = a.defaultView || a.parentWindow, s = !1;
                try {
                    s = o.location != o.parent.location && !(o.$ && o.$.FE);
                } catch (e) {}
                s && o.frameElement && (r += t.helpers.getPX(e(o.frameElement).offset().left) + o.frameElement.clientLeft, 
                i = n.clientY + t.helpers.getPX(e(o.frameElement).offset().top) + o.frameElement.clientTop);
            }
            t.undo.canDo() || t.undo.saveStep(), (K = e(this)).data("start-x", r), K.data("start-y", i), 
            P.show(), t.popups.hideAll(), _();
        }
        function v(e) {
            if (!t.core.sameInstance(U)) return !0;
            if (K) {
                e.preventDefault();
                var n = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null), r = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
                if (!n || !r) return !1;
                var i = K.data("start-x"), a = K.data("start-y");
                K.data("start-x", n), K.data("start-y", r);
                var o = n - i, s = r - a, l = W.find("iframe, embed, video"), d = l.width(), c = l.height();
                (K.hasClass("fr-hnw") || K.hasClass("fr-hsw")) && (o = 0 - o), (K.hasClass("fr-hnw") || K.hasClass("fr-hne")) && (s = 0 - s), 
                l.css("width", d + o), l.css("height", c + s), l.removeAttr("width"), l.removeAttr("height"), 
                S();
            }
        }
        function E(e) {
            if (!t.core.sameInstance(U)) return !0;
            K && W && (e && e.stopPropagation(), K = null, P.hide(), S(), r(), t.undo.saveStep());
        }
        function b(e) {
            return '<div class="fr-handler fr-h' + e + '"></div>';
        }
        function T(e, t, n, r) {
            return e.pageX = t, e.pageY = t, m.call(this, e), e.pageX = e.pageX + n * Math.floor(Math.pow(1.1, r)), 
            e.pageY = e.pageY + n * Math.floor(Math.pow(1.1, r)), v.call(this, e), E.call(this, e), 
            ++r;
        }
        function A() {
            var n, r = Array.prototype.slice.call(t.el.querySelectorAll("video, .fr-video > *")), i = [];
            for (n = 0; n < r.length; n++) i.push(r[n].getAttribute("src")), e(r[n]).toggleClass("fr-draggable", t.opts.videoMove), 
            "" === r[n].getAttribute("class") && r[n].removeAttribute("class"), "" === r[n].getAttribute("style") && r[n].removeAttribute("style");
            if (H) for (n = 0; n < H.length; n++) i.indexOf(H[n].getAttribute("src")) < 0 && t.events.trigger("video.removed", [ e(H[n]) ]);
            H = r;
        }
        function S() {
            U || function() {
                var n;
                if (t.shared.$video_resizer ? (U = t.shared.$video_resizer, P = t.shared.$vid_overlay, 
                t.events.on("destroy", function() {
                    U.removeClass("fr-active").appendTo(e("body:first"));
                }, !0)) : (t.shared.$video_resizer = e('<div class="fr-video-resizer"></div>'), 
                U = t.shared.$video_resizer, t.events.$on(U, "mousedown", function(e) {
                    e.stopPropagation();
                }, !0), t.opts.videoResize && (U.append(b("nw") + b("ne") + b("sw") + b("se")), 
                t.shared.$vid_overlay = e('<div class="fr-video-overlay"></div>'), P = t.shared.$vid_overlay, 
                n = U.get(0).ownerDocument, e(n).find("body:first").append(P))), t.events.on("shared.destroy", function() {
                    U.html("").removeData().remove(), U = null, t.opts.videoResize && (P.remove(), P = null);
                }, !0), t.helpers.isMobile() || t.events.$on(e(t.o_win), "resize.video", function() {
                    C(!0);
                }), t.opts.videoResize) {
                    n = U.get(0).ownerDocument, t.events.$on(U, t._mousedown, ".fr-handler", m), t.events.$on(e(n), t._mousemove, v), 
                    t.events.$on(e(n.defaultView || n.parentWindow), t._mouseup, E), t.events.$on(P, "mouseleave", E);
                    var r = 1, i = null, a = 0;
                    t.events.on("keydown", function(n) {
                        if (W) {
                            var o = -1 != navigator.userAgent.indexOf("Mac OS X") ? n.metaKey : n.ctrlKey, s = n.which;
                            (s !== i || 200 < n.timeStamp - a) && (r = 1), (s == e.FE.KEYCODE.EQUALS || t.browser.mozilla && s == e.FE.KEYCODE.FF_EQUALS) && o && !n.altKey ? r = T.call(this, n, 1, 1, r) : (s == e.FE.KEYCODE.HYPHEN || t.browser.mozilla && s == e.FE.KEYCODE.FF_HYPHEN) && o && !n.altKey && (r = T.call(this, n, 2, -1, r)), 
                            i = s, a = n.timeStamp;
                        }
                    }), t.events.on("keyup", function() {
                        r = 1;
                    });
                }
            }(), (t.$wp || t.$sc).append(U), U.data("instance", t);
            var n = W.find("iframe, embed, video");
            U.css("top", (t.opts.iframe ? n.offset().top - 1 : n.offset().top - t.$wp.offset().top - 1) + t.$wp.scrollTop()).css("left", (t.opts.iframe ? n.offset().left - 1 : n.offset().left - t.$wp.offset().left - 1) + t.$wp.scrollLeft()).css("width", n.get(0).getBoundingClientRect().width).css("height", n.get(0).getBoundingClientRect().height).addClass("fr-active");
        }
        function R(n) {
            if (n && "touchend" == n.type && Y) return !0;
            if (n && t.edit.isDisabled()) return n.stopPropagation(), n.preventDefault(), !1;
            if (t.edit.isDisabled()) return !1;
            for (var i = 0; i < e.FE.INSTANCES.length; i++) e.FE.INSTANCES[i] != t && e.FE.INSTANCES[i].events.trigger("video.hideResizer");
            t.toolbar.disable(), t.helpers.isMobile() && (t.events.disableBlur(), t.$el.blur(), 
            t.events.enableBlur()), t.$el.find(".fr-video.fr-active").removeClass("fr-active"), 
            (W = e(this)).addClass("fr-active"), t.opts.iframe && t.size.syncIframe(), B(), 
            S(), r(), t.selection.clear(), t.button.bulkRefresh(), t.events.trigger("image.hideResizer");
        }
        function C(e) {
            W && (t.shared.vid_exit_flag || !0 === e) && (U.removeClass("fr-active"), t.toolbar.enable(), 
            W.removeClass("fr-active"), W = null, _());
        }
        function y() {
            t.shared.vid_exit_flag = !0;
        }
        function _() {
            t.shared.vid_exit_flag = !1;
        }
        function L(n) {
            var r = n.originalEvent.dataTransfer;
            if (r && r.files && r.files.length) {
                var a = r.files[0];
                if (a && a.type && -1 !== a.type.indexOf("video")) {
                    if (!t.opts.videoUpload) return n.preventDefault(), n.stopPropagation(), !1;
                    t.markers.remove(), t.markers.insertAtPoint(n.originalEvent), t.$el.find(".fr-marker").replaceWith(e.FE.MARKERS), 
                    t.popups.hideAll();
                    var o = t.popups.get("video.insert");
                    return o || (o = i()), t.popups.setContainer("video.insert", t.$sc), t.popups.show("video.insert", n.originalEvent.pageX, n.originalEvent.pageY), 
                    l(), 0 <= t.opts.videoAllowedTypes.indexOf(a.type.replace(/video\//g, "")) ? x(r.files) : N(q), 
                    n.preventDefault(), n.stopPropagation(), !1;
                }
            }
        }
        function x(e) {
            if (void 0 !== e && 0 < e.length) {
                if (!1 === t.events.trigger("video.beforeUpload", [ e ])) return !1;
                var n, r = e[0];
                if (r.size > t.opts.videoMaxSize) return N(X), !1;
                if (t.opts.videoAllowedTypes.indexOf(r.type.replace(/video\//g, "")) < 0) return N(q), 
                !1;
                if (t.drag_support.formdata && (n = t.drag_support.formdata ? new FormData() : null), 
                n) {
                    var i;
                    if (!1 !== t.opts.videoUploadToS3) for (i in n.append("key", t.opts.videoUploadToS3.keyStart + new Date().getTime() + "-" + (r.name || "untitled")), 
                    n.append("success_action_status", "201"), n.append("X-Requested-With", "xhr"), n.append("Content-Type", r.type), 
                    t.opts.videoUploadToS3.params) t.opts.videoUploadToS3.params.hasOwnProperty(i) && n.append(i, t.opts.videoUploadToS3.params[i]);
                    for (i in t.opts.videoUploadParams) t.opts.videoUploadParams.hasOwnProperty(i) && n.append(i, t.opts.videoUploadParams[i]);
                    n.append(t.opts.videoUploadParam, r);
                    var a = t.opts.videoUploadURL;
                    t.opts.videoUploadToS3 && (a = t.opts.videoUploadToS3.uploadURL ? t.opts.videoUploadToS3.uploadURL : "https://" + t.opts.videoUploadToS3.region + ".amazonaws.com/" + t.opts.videoUploadToS3.bucket);
                    var o = t.core.getXHR(a, t.opts.videoUploadMethod);
                    o.onload = function() {
                        p.call(o, W);
                    }, o.onerror = u, o.upload.onprogress = h, o.onabort = g, l(), t.events.disableBlur(), 
                    t.edit.off(), t.events.enableBlur();
                    var s = t.popups.get("video.insert");
                    s && s.off("abortUpload").on("abortUpload", function() {
                        4 != o.readyState && o.abort();
                    }), o.send(n);
                }
            }
        }
        function N(e, n) {
            t.edit.on(), W && W.find("video").addClass("fr-error"), function(e) {
                l();
                var n = t.popups.get("video.insert").find(".fr-video-progress-bar-layer");
                n.addClass("fr-error");
                var r = n.find("h3");
                r.text(e), t.events.disableBlur(), r.focus();
            }(t.language.translate("Something went wrong. Please try again.")), t.events.trigger("video.error", [ {
                code: e,
                message: j[e]
            }, n ]);
        }
        function w() {
            if (W) {
                var e = t.popups.get("video.size"), n = W.find("iframe, embed, video");
                e.find('input[name="width"]').val(n.get(0).style.width || n.attr("width")).trigger("change"), 
                e.find('input[name="height"]').val(n.get(0).style.height || n.attr("height")).trigger("change");
            }
        }
        function O(e) {
            if (e) return t.popups.onRefresh("video.size", w), !0;
            var n = {
                buttons: '<div class="fr-buttons">' + t.button.buildList(t.opts.videoSizeButtons) + "</div>",
                size_layer: '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-' + t.id + '"><div class="fr-video-group"><div class="fr-input-line"><input id="fr-video-size-layer-width-' + t.id + '" type="text" name="width" placeholder="' + t.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-video-size-layer-height-' + t.id + '" type="text" name="height" placeholder="' + t.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2" role="button">' + t.language.translate("Update") + "</button></div></div>"
            }, r = t.popups.create("video.size", n);
            return t.events.$on(t.$wp, "scroll", function() {
                W && t.popups.isVisible("video.size") && (t.events.disableBlur(), f(W));
            }), r;
        }
        function I(e) {
            if (void 0 === e && (e = W), e) {
                if (e.hasClass("fr-fvl")) return "left";
                if (e.hasClass("fr-fvr")) return "right";
                if (e.hasClass("fr-dvb") || e.hasClass("fr-dvi")) return "center";
                if ("block" == e.css("display")) {
                    if ("left" == e.css("text-algin")) return "left";
                    if ("right" == e.css("text-align")) return "right";
                } else {
                    if ("left" == e.css("float")) return "left";
                    if ("right" == e.css("float")) return "right";
                }
            }
            return "center";
        }
        function k(e) {
            void 0 === e && (e = W);
            var t = e.css("float");
            return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), 
            e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), 
            "inline");
        }
        function D() {
            if (W && !1 !== t.events.trigger("video.beforeRemove", [ W ])) {
                var e = W;
                t.popups.hideAll(), C(!0), t.selection.setBefore(e.get(0)) || t.selection.setAfter(e.get(0)), 
                e.remove(), t.selection.restore(), t.html.fillEmptyBlocks(), t.events.trigger("video.removed", [ e ]);
            }
        }
        function F() {
            d();
        }
        function M(e, n, r) {
            !t.opts.htmlUntouched && t.opts.useClasses ? (e.removeClass("fr-fvl fr-fvr fr-dvb fr-dvi"), 
            e.addClass("fr-fv" + r[0] + " fr-dv" + n[0])) : "inline" == n ? (e.css({
                display: "inline-block"
            }), "center" == r ? e.css({
                float: "none"
            }) : "left" == r ? e.css({
                float: "left"
            }) : e.css({
                float: "right"
            })) : (e.css({
                display: "block",
                clear: "both"
            }), "left" == r ? e.css({
                textAlign: "left"
            }) : "right" == r ? e.css({
                textAlign: "right"
            }) : e.css({
                textAlign: "center"
            }));
        }
        function $() {
            t.$el.find("video").filter(function() {
                return 0 === e(this).parents("span.fr-video").length;
            }).wrap('<span class="fr-video" contenteditable="false"></span>'), t.$el.find("embed, iframe").filter(function() {
                if (t.browser.safari && this.getAttribute("src") && this.setAttribute("src", this.src), 
                0 < e(this).parents("span.fr-video").length) return !1;
                for (var n = e(this).attr("src"), r = 0; r < e.FE.VIDEO_PROVIDERS.length; r++) {
                    var i = e.FE.VIDEO_PROVIDERS[r];
                    if (i.test_regex.test(n) && new RegExp(t.opts.videoAllowedProviders.join("|")).test(i.provider)) return !0;
                }
                return !1;
            }).map(function() {
                return 0 === e(this).parents("object").length ? this : e(this).parents("object").get(0);
            }).wrap('<span class="fr-video" contenteditable="false"></span>');
            for (var n, r, i = t.$el.find("span.fr-video, video"), a = 0; a < i.length; a++) {
                var o = e(i[a]);
                !t.opts.htmlUntouched && t.opts.useClasses ? ((r = o).hasClass("fr-dvi") || r.hasClass("fr-dvb") || (r.addClass("fr-fv" + I(r)[0]), 
                r.addClass("fr-dv" + k(r)[0])), t.opts.videoTextNear || o.removeClass("fr-dvi").addClass("fr-dvb")) : t.opts.htmlUntouched || t.opts.useClasses || (M(n = o, n.hasClass("fr-dvb") ? "block" : n.hasClass("fr-dvi") ? "inline" : null, n.hasClass("fr-fvl") ? "left" : n.hasClass("fr-fvr") ? "right" : I(n)), 
                n.removeClass("fr-dvb fr-dvi fr-fvr fr-fvl"));
            }
            i.toggleClass("fr-draggable", t.opts.videoMove);
        }
        function B() {
            if (W) {
                t.selection.clear();
                var e = t.doc.createRange();
                e.selectNode(W.get(0)), t.selection.get().addRange(e);
            }
        }
        var P, K, U, W, H, Y, z = 2, G = 3, V = 4, X = 5, q = 6, j = {};
        return j[1] = "Video cannot be loaded from the passed link.", j[z] = "No link in upload response.", 
        j[G] = "Error during file upload.", j[V] = "Parsing response failed.", j[X] = "File is too large.", 
        j[q] = "Video file type is invalid.", j[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", 
        t.shared.vid_exit_flag = !1, {
            _init: function() {
                t.events.on("drop", L, !0), t.events.on("mousedown window.mousedown", y), t.events.on("window.touchmove", _), 
                t.events.on("mouseup window.mouseup", C), t.events.on("commands.mousedown", function(e) {
                    0 < e.parents(".fr-toolbar").length && C();
                }), t.events.on("video.hideResizer commands.undo commands.redo element.dropped", function() {
                    C(!0);
                }), t.helpers.isMobile() && (t.events.$on(t.$el, "touchstart", "span.fr-video", function() {
                    Y = !1;
                }), t.events.$on(t.$el, "touchmove", function() {
                    Y = !0;
                })), t.events.on("html.set", $), $(), t.events.$on(t.$el, "mousedown", "span.fr-video", function(e) {
                    e.stopPropagation();
                }), t.events.$on(t.$el, "click touchend", "span.fr-video", function(t) {
                    if ("false" == e(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                    R.call(this, t);
                }), t.events.on("keydown", function(n) {
                    var r = n.which;
                    return !W || r != e.FE.KEYCODE.BACKSPACE && r != e.FE.KEYCODE.DELETE ? W && r == e.FE.KEYCODE.ESC ? (C(!0), 
                    n.preventDefault(), !1) : W && r != e.FE.KEYCODE.F10 && !t.keys.isBrowserAction(n) ? (n.preventDefault(), 
                    !1) : void 0 : (n.preventDefault(), D(), t.undo.saveStep(), !1);
                }, !0), t.events.on("toolbar.esc", function() {
                    if (W) return t.events.disableBlur(), t.events.focus(), !1;
                }, !0), t.events.on("toolbar.focusEditor", function() {
                    if (W) return !1;
                }, !0), t.events.on("keydown", function() {
                    t.$el.find("span.fr-video:empty").remove();
                }), t.$wp && (A(), t.events.on("contentChanged", A)), i(!0), O(!0);
            },
            showInsertPopup: function() {
                var e = t.$tb.find('.fr-command[data-cmd="insertVideo"]'), n = t.popups.get("video.insert");
                if (n || (n = i()), d(), !n.hasClass("fr-active")) if (t.popups.refresh("video.insert"), 
                t.popups.setContainer("video.insert", t.$tb), e.is(":visible")) {
                    var r = e.offset().left + e.outerWidth() / 2, a = e.offset().top + (t.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                    t.popups.show("video.insert", r, a, e.outerHeight());
                } else t.position.forSelection(n), t.popups.show("video.insert");
            },
            showLayer: function(e) {
                var n, r, i = t.popups.get("video.insert");
                if (!W && !t.opts.toolbarInline) {
                    var a = t.$tb.find('.fr-command[data-cmd="insertVideo"]');
                    n = a.offset().left + a.outerWidth() / 2, r = a.offset().top + (t.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                }
                t.opts.toolbarInline && (r = i.offset().top - t.helpers.getPX(i.css("margin-top")), 
                i.hasClass("fr-above") && (r += i.outerHeight())), i.find(".fr-layer").removeClass("fr-active"), 
                i.find(".fr-" + e + "-layer").addClass("fr-active"), t.popups.show("video.insert", n, r, 0), 
                t.accessibility.focusPopup(i);
            },
            refreshByURLButton: function(e) {
                t.popups.get("video.insert").find(".fr-video-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
            },
            refreshEmbedButton: function(e) {
                t.popups.get("video.insert").find(".fr-video-embed-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
            },
            refreshUploadButton: function(e) {
                t.popups.get("video.insert").find(".fr-video-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
            },
            upload: x,
            insertByURL: function(n) {
                void 0 === n && (n = (t.popups.get("video.insert").find('.fr-video-by-url-layer input[type="text"]').val() || "").trim());
                var r = null;
                if (/^http/.test(n) || (n = "https://" + n), t.helpers.isURL(n)) for (var i = 0; i < e.FE.VIDEO_PROVIDERS.length; i++) {
                    var o = e.FE.VIDEO_PROVIDERS[i];
                    if (o.test_regex.test(n) && new RegExp(t.opts.videoAllowedProviders.join("|")).test(o.provider)) {
                        r = n.replace(o.url_regex, o.url_text), r = o.html.replace(/\{url\}/, r);
                        break;
                    }
                }
                r ? a(r) : t.events.trigger("video.linkError", [ n ]);
            },
            insertEmbed: function(n) {
                void 0 === n && (n = t.popups.get("video.insert").find(".fr-video-embed-layer textarea").val() || ""), 
                0 !== n.length && e.FE.VIDEO_EMBED_REGEX.test(n) ? a(n) : t.events.trigger("video.codeError", [ n ]);
            },
            insert: a,
            align: function(e) {
                W.removeClass("fr-fvr fr-fvl"), !t.opts.htmlUntouched && t.opts.useClasses ? "left" == e ? W.addClass("fr-fvl") : "right" == e && W.addClass("fr-fvr") : M(W, k(), e), 
                B(), S(), r(), t.selection.clear();
            },
            refreshAlign: function(e) {
                if (!W) return !1;
                e.find("> *:first").replaceWith(t.icon.create("video-align-" + I()));
            },
            refreshAlignOnShow: function(e, t) {
                W && t.find('.fr-command[data-param1="' + I() + '"]').addClass("fr-active").attr("aria-selected", !0);
            },
            display: function(e) {
                W.removeClass("fr-dvi fr-dvb"), !t.opts.htmlUntouched && t.opts.useClasses ? "inline" == e ? W.addClass("fr-dvi") : "block" == e && W.addClass("fr-dvb") : M(W, e, I()), 
                B(), S(), r(), t.selection.clear();
            },
            refreshDisplayOnShow: function(e, t) {
                W && t.find('.fr-command[data-param1="' + k() + '"]').addClass("fr-active").attr("aria-selected", !0);
            },
            remove: D,
            hideProgressBar: d,
            showSizePopup: function() {
                var e = t.popups.get("video.size");
                e || (e = O()), d(), t.popups.refresh("video.size"), t.popups.setContainer("video.size", t.$sc);
                var n = W.find("iframe, embed, video"), r = n.offset().left + n.width() / 2, i = n.offset().top + n.height();
                t.popups.show("video.size", r, i, n.height());
            },
            replace: function() {
                var e = t.popups.get("video.insert");
                e || (e = i()), t.popups.isVisible("video.insert") || (d(), t.popups.refresh("video.insert"), 
                t.popups.setContainer("video.insert", t.$sc));
                var n = W.offset().left + W.width() / 2, r = W.offset().top + W.height();
                t.popups.show("video.insert", n, r, W.outerHeight());
            },
            back: function() {
                W ? (t.events.disableBlur(), W.trigger("click")) : (t.events.disableBlur(), t.selection.restore(), 
                t.events.enableBlur(), t.popups.hide("video.insert"), t.toolbar.showInline());
            },
            setSize: function(e, n) {
                if (W) {
                    var r = t.popups.get("video.size"), i = W.find("iframe, embed, video");
                    i.css("width", e || r.find('input[name="width"]').val()), i.css("height", n || r.find('input[name="height"]').val()), 
                    i.get(0).style.width && i.removeAttr("width"), i.get(0).style.height && i.removeAttr("height"), 
                    r.find("input:focus").blur(), setTimeout(function() {
                        W.trigger("click");
                    }, t.helpers.isAndroid() ? 50 : 0);
                }
            },
            get: function() {
                return W;
            }
        };
    }, e.FE.RegisterCommand("insertVideo", {
        title: "Insert Video",
        undo: !1,
        focus: !0,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("video.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), 
            this.selection.restore()), this.popups.hide("video.insert")) : this.video.showInsertPopup();
        },
        plugin: "video"
    }), e.FE.DefineIcon("insertVideo", {
        NAME: "video-camera",
        FA5NAME: "camera"
    }), e.FE.DefineIcon("videoByURL", {
        NAME: "link"
    }), e.FE.RegisterCommand("videoByURL", {
        title: "By URL",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.video.showLayer("video-by-url");
        },
        refresh: function(e) {
            this.video.refreshByURLButton(e);
        }
    }), e.FE.DefineIcon("videoEmbed", {
        NAME: "code"
    }), e.FE.RegisterCommand("videoEmbed", {
        title: "Embedded Code",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.video.showLayer("video-embed");
        },
        refresh: function(e) {
            this.video.refreshEmbedButton(e);
        }
    }), e.FE.DefineIcon("videoUpload", {
        NAME: "upload"
    }), e.FE.RegisterCommand("videoUpload", {
        title: "Upload Video",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.video.showLayer("video-upload");
        },
        refresh: function(e) {
            this.video.refreshUploadButton(e);
        }
    }), e.FE.RegisterCommand("videoInsertByURL", {
        undo: !0,
        focus: !0,
        callback: function() {
            this.video.insertByURL();
        }
    }), e.FE.RegisterCommand("videoInsertEmbed", {
        undo: !0,
        focus: !0,
        callback: function() {
            this.video.insertEmbed();
        }
    }), e.FE.DefineIcon("videoDisplay", {
        NAME: "star"
    }), e.FE.RegisterCommand("videoDisplay", {
        title: "Display",
        type: "dropdown",
        options: {
            inline: "Inline",
            block: "Break Text"
        },
        callback: function(e, t) {
            this.video.display(t);
        },
        refresh: function(e) {
            this.opts.videoTextNear || e.addClass("fr-hidden");
        },
        refreshOnShow: function(e, t) {
            this.video.refreshDisplayOnShow(e, t);
        }
    }), e.FE.DefineIcon("video-align", {
        NAME: "align-left"
    }), e.FE.DefineIcon("video-align-left", {
        NAME: "align-left"
    }), e.FE.DefineIcon("video-align-right", {
        NAME: "align-right"
    }), e.FE.DefineIcon("video-align-center", {
        NAME: "align-justify"
    }), e.FE.DefineIcon("videoAlign", {
        NAME: "align-center"
    }), e.FE.RegisterCommand("videoAlign", {
        type: "dropdown",
        title: "Align",
        options: {
            left: "Align Left",
            center: "None",
            right: "Align Right"
        },
        html: function() {
            var t = '<ul class="fr-dropdown-list" role="presentation">', n = e.FE.COMMANDS.videoAlign.options;
            for (var r in n) n.hasOwnProperty(r) && (t += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="videoAlign" data-param1="' + r + '" title="' + this.language.translate(n[r]) + '">' + this.icon.create("video-align-" + r) + '<span class="fr-sr-only">' + this.language.translate(n[r]) + "</span></a></li>");
            return t += "</ul>";
        },
        callback: function(e, t) {
            this.video.align(t);
        },
        refresh: function(e) {
            this.video.refreshAlign(e);
        },
        refreshOnShow: function(e, t) {
            this.video.refreshAlignOnShow(e, t);
        }
    }), e.FE.DefineIcon("videoReplace", {
        NAME: "exchange"
    }), e.FE.RegisterCommand("videoReplace", {
        title: "Replace",
        undo: !1,
        focus: !1,
        popup: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.video.replace();
        }
    }), e.FE.DefineIcon("videoRemove", {
        NAME: "trash"
    }), e.FE.RegisterCommand("videoRemove", {
        title: "Remove",
        callback: function() {
            this.video.remove();
        }
    }), e.FE.DefineIcon("videoSize", {
        NAME: "arrows-alt"
    }), e.FE.RegisterCommand("videoSize", {
        undo: !1,
        focus: !1,
        popup: !0,
        title: "Change Size",
        callback: function() {
            this.video.showSizePopup();
        }
    }), e.FE.DefineIcon("videoBack", {
        NAME: "arrow-left"
    }), e.FE.RegisterCommand("videoBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.video.back();
        },
        refresh: function(e) {
            this.video.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), 
            e.next(".fr-separator").addClass("fr-hidden"));
        }
    }), e.FE.RegisterCommand("videoDismissError", {
        title: "OK",
        undo: !1,
        callback: function() {
            this.video.hideProgressBar(!0);
        }
    }), e.FE.RegisterCommand("videoSetSize", {
        undo: !0,
        focus: !1,
        title: "Update",
        refreshAfterCallback: !1,
        callback: function() {
            this.video.setSize();
        }
    }), e.extend(e.FE.DEFAULTS, {
        wordDeniedTags: [],
        wordDeniedAttrs: [],
        wordAllowedStyleProps: [ "font-family", "font-size", "background", "color", "width", "text-align", "vertical-align", "background-color", "padding", "margin", "height", "margin-top", "margin-left", "margin-right", "margin-bottom", "text-decoration", "font-weight", "font-style", "text-indent" ],
        wordPasteModal: !0
    }), e.FE.PLUGINS.wordPaste = function(t) {
        function n(n) {
            var l = t.opts.wordAllowedStyleProps;
            n || (t.opts.wordAllowedStyleProps = []), 0 === g.indexOf("<colgroup>") && (g = "<table>" + g + "</table>"), 
            g = function(n, l) {
                !function(e) {
                    for (var t = e.split("v:shape"), n = 1; n < t.length; n++) {
                        var r = t[n], i = r.split(' id="')[1];
                        if (i && 1 < i.length) {
                            i = i.split('"')[0];
                            var a = r.split(' o:spid="')[1];
                            a && 1 < a.length && (a = a.split('"')[0], E[i] = a);
                        }
                    }
                }(n = n.replace(/[.\s\S\w\W<>]*(<html[^>]*>[.\s\S\w\W<>]*<\/html>)[.\s\S\w\W<>]*/i, "$1"));
                var d = new DOMParser().parseFromString(n, "text/html"), f = d.head, h = d.body, g = function(e) {
                    var t = {}, n = e.getElementsByTagName("style");
                    if (n.length) {
                        var r = n[0], i = r.innerHTML.match(/[\S ]+\s+{[\s\S]+?}/gi);
                        if (i) for (var a = 0; a < i.length; a++) {
                            var o = i[a], s = o.replace(/([\S ]+\s+){[\s\S]+?}/gi, "$1"), l = o.replace(/[\S ]+\s+{([\s\S]+?)}/gi, "$1");
                            s = s.replace(/^[\s]|[\s]$/gm, ""), l = l.replace(/^[\s]|[\s]$/gm, ""), s = s.replace(/\n|\r|\n\r/g, ""), 
                            l = l.replace(/\n|\r|\n\r/g, "");
                            for (var d = s.split(", "), c = 0; c < d.length; c++) t[d[c]] = l;
                        }
                    }
                    return t;
                }(f);
                i(h, function(t) {
                    if (t.nodeType == Node.TEXT_NODE && /\n|\u00a0|\r/.test(t.data)) {
                        if (!/\S| /.test(t.data)) return t.data == e.FE.UNICODE_NBSP ? (t.data = "​", !0) : 1 == t.data.length && 10 == t.data.charCodeAt(0) ? (t.data = " ", 
                        !0) : (r(t), !1);
                        t.data = t.data.replace(/\n|\r/gi, " ");
                    }
                    return !0;
                }), i(h, function(n) {
                    return n.nodeType != Node.ELEMENT_NODE || "V:IMAGEDATA" != n.tagName && "IMG" != n.tagName || function(n, r) {
                        if (r) {
                            var i;
                            if ("IMG" == n.tagName) {
                                var a = n.getAttribute("src");
                                if (!a || -1 == a.indexOf("file://")) return;
                                if (0 === a.indexOf("file://") && t.helpers.isURL(n.getAttribute("alt"))) return n.setAttribute("src", n.getAttribute("alt"));
                                (i = E[n.getAttribute("v:shapes")]) || (i = n.getAttribute("v:shapes"));
                            } else i = n.parentNode.getAttribute("o:spid");
                            if (n.removeAttribute("height"), i) {
                                o = r, v = {}, p(o, "i", "\\shppict"), p(o, "s", "\\shp{");
                                var o, s = v[i.substring(7)];
                                if (s) {
                                    var l = function(e) {
                                        for (var t = e.match(/[0-9a-f]{2}/gi), n = [], r = 0; r < t.length; r++) n.push(String.fromCharCode(parseInt(t[r], 16)));
                                        var i = n.join("");
                                        return btoa(i);
                                    }(s.image_hex), d = "data:" + s.image_type + ";base64," + l;
                                    "IMG" === n.tagName ? (n.src = d, n.setAttribute("data-fr-image-pasted", !0)) : e(n.parentNode).before('<img data-fr-image-pasted="true" src="' + d + '" style="' + n.parentNode.getAttribute("style") + '">').remove();
                                }
                            }
                        }
                    }(n, l), !0;
                });
                for (var m = h.querySelectorAll("ul > ul, ul > ol, ol > ul, ol > ol"), b = m.length - 1; 0 <= b; b--) m[b].previousElementSibling && "LI" === m[b].previousElementSibling.tagName && m[b].previousElementSibling.appendChild(m[b]);
                i(h, function(e) {
                    if (e.nodeType == Node.TEXT_NODE) return e.data = e.data.replace(/<br>(\n|\r)/gi, "<br>"), 
                    !1;
                    if (e.nodeType == Node.ELEMENT_NODE) {
                        if (a(e)) {
                            var t = e.parentNode, n = e.previousSibling, i = function e(t, n) {
                                var i = /[0-9a-zA-Z]./gi, l = !1;
                                t.firstElementChild && t.firstElementChild.firstElementChild && t.firstElementChild.firstElementChild.firstChild && !(l = l || i.test(t.firstElementChild.firstElementChild.firstChild.data || "")) && t.firstElementChild.firstElementChild.firstElementChild && t.firstElementChild.firstElementChild.firstElementChild.firstChild && (l = l || i.test(t.firstElementChild.firstElementChild.firstElementChild.firstChild.data || ""));
                                var d = l ? "ol" : "ul", c = o(t), f = "<" + d + "><li>" + s(t, n), p = t.nextElementSibling, u = t.parentNode;
                                for (r(t), t = null; p && a(p); ) {
                                    var h = p.previousElementSibling, g = o(p);
                                    if (c < g) f += e(p, n).outerHTML; else {
                                        if (g < c) break;
                                        f += "</li><li>" + s(p, n);
                                    }
                                    if (c = g, p.previousElementSibling || p.nextElementSibling || p.parentNode) {
                                        var m = p;
                                        p = p.nextElementSibling, r(m), m = null;
                                    } else p = h ? h.nextElementSibling : u.firstElementChild;
                                }
                                f += "</li></" + d + ">";
                                var v = document.createElement("div");
                                return v.innerHTML = f, v.firstElementChild;
                            }(e, g), l = null;
                            return (l = n ? n.nextSibling : t.firstChild) ? t.insertBefore(i, l) : t.appendChild(i), 
                            !1;
                        }
                        return u(e, g);
                    }
                    return e.nodeType != Node.COMMENT_NODE || (r(e), !1);
                }), i(h, function(e) {
                    if (e.nodeType == Node.ELEMENT_NODE) {
                        var t = e.tagName;
                        if (!e.innerHTML && -1 == [ "BR", "IMG" ].indexOf(t)) {
                            for (var n = e.parentNode; n && (r(e), !(e = n).innerHTML); ) n = e.parentNode;
                            return !1;
                        }
                        !function(e) {
                            var t = e.getAttribute("style");
                            if (t) {
                                (t = c(t)) && ";" != t.slice(-1) && (t += ";");
                                var n = t.match(/(^|\S+?):.+?;{1,1}/gi);
                                if (n) {
                                    for (var r = {}, i = 0; i < n.length; i++) {
                                        var a = n[i], o = a.split(":");
                                        2 == o.length && ("text-align" == o[0] && "SPAN" == e.tagName || (r[o[0]] = o[1]));
                                    }
                                    var s = "";
                                    for (var l in r) if (r.hasOwnProperty(l)) {
                                        if ("font-size" == l && "pt;" == r[l].slice(-3)) {
                                            var d = null;
                                            try {
                                                d = parseFloat(r[l].slice(0, -3), 10);
                                            } catch (e) {}
                                            d && (d = Math.round(1.33 * d), r[l] = d + "px;");
                                        }
                                        s += l + ":" + r[l];
                                    }
                                    s && e.setAttribute("style", s);
                                }
                            }
                        }(e);
                    }
                    return !0;
                });
                var T = h.outerHTML, A = t.opts.htmlAllowedStyleProps;
                return t.opts.htmlAllowedStyleProps = t.opts.wordAllowedStyleProps, T = t.clean.html(T, t.opts.wordDeniedTags, t.opts.wordDeniedAttrs, !1), 
                t.opts.htmlAllowedStyleProps = A, T;
            }(g = g.replace(/<span[\n\r ]*style='mso-spacerun:yes'>([\r\n\u00a0 ]*)<\/span>/g, function(e, t) {
                for (var n = "", r = 0; r++ < t.length; ) n += "&nbsp;";
                return n;
            }), t.paste.getRtfClipboard());
            var d = t.doc.createElement("DIV");
            d.innerHTML = g, t.html.cleanBlankSpaces(d), g = d.innerHTML, g = (g = t.paste.cleanEmptyTagsAndDivs(g)).replace(/\u200b/g, ""), 
            t.modals.hide(m), t.paste.clean(g, !0, !0), t.opts.wordAllowedStyleProps = l;
        }
        function r(e) {
            e.parentNode && e.parentNode.removeChild(e);
        }
        function i(e, t) {
            if (t(e)) for (var n = e.firstChild; n; ) {
                var r = n, a = n.previousSibling;
                n = n.nextSibling, i(r, t), r.previousSibling || r.nextSibling || r.parentNode || !n || a == n.previousSibling || !n.parentNode ? r.previousSibling || r.nextSibling || r.parentNode || !n || n.previousSibling || n.nextSibling || n.parentNode || (a ? n = a.nextSibling ? a.nextSibling.nextSibling : null : e.firstChild && (n = e.firstChild.nextSibling)) : n = a ? a.nextSibling : e.firstChild;
            }
        }
        function a(e) {
            if (!e.getAttribute("style") || !/mso-list:[\s]*l/gi.test(e.getAttribute("style").replace(/\n/gi, ""))) return !1;
            try {
                if (!e.querySelector('[style="mso-list:Ignore"]')) return !1;
            } catch (e) {
                return !1;
            }
            return !0;
        }
        function o(e) {
            return e.getAttribute("style").replace(/\n/gi, "").replace(/.*level([0-9]+?).*/gi, "$1");
        }
        function s(e, t) {
            var n = e.cloneNode(!0);
            if (-1 != [ "H1", "H2", "H3", "H4", "H5", "H6" ].indexOf(e.tagName)) {
                var r = document.createElement(e.tagName.toLowerCase());
                r.setAttribute("style", e.getAttribute("style")), r.innerHTML = n.innerHTML, n.innerHTML = r.outerHTML;
            }
            i(n, function(e) {
                return e.nodeType == Node.ELEMENT_NODE && ("mso-list:Ignore" == e.getAttribute("style") && e.parentNode.removeChild(e), 
                u(e, t)), !0;
            });
            var a = n.innerHTML;
            return a = a.replace(/<!--[\s\S]*?-->/gi, "");
        }
        function l(e, t) {
            for (var n = document.createElement(t), r = 0; r < e.attributes.length; r++) {
                var i = e.attributes[r].name;
                n.setAttribute(i, e.getAttribute(i));
            }
            return n.innerHTML = e.innerHTML, e.parentNode.replaceChild(n, e), n;
        }
        function d(e) {
            var t = e.parentNode, n = e.getAttribute("align");
            n && (t && "TD" == t.tagName ? t.setAttribute("style", t.getAttribute("style") + "text-align:" + n + ";") : e.style["text-align"] = n, 
            e.removeAttribute("align"));
        }
        function c(e) {
            return e.replace(/\n|\r|\n\r|&quot;/g, "");
        }
        function f(e, t, n) {
            if (t) {
                var r = e.getAttribute("style");
                r && ";" != r.slice(-1) && (r += ";"), t && ";" != t.slice(-1) && (t += ";"), t = t.replace(/\n/gi, "");
                var i = null;
                i = n ? (r || "") + t : t + (r || ""), e.setAttribute("style", i);
            }
        }
        function p(e, t, n) {
            for (var r = e.split(n), i = 1; i < r.length; i++) {
                var a = r[i];
                if (1 < (a = a.split("shplid")).length) {
                    a = a[1];
                    for (var o = "", s = 0; s < a.length && "\\" != a[s] && "{" != a[s] && " " != a[s] && "\r" != a[s] && "\n" != a[s]; ) o += a[s], 
                    s++;
                    var l = a.split("bliptag");
                    if (l && l.length < 2) continue;
                    var d = null;
                    if (-1 != l[0].indexOf("pngblip") ? d = "image/png" : -1 != l[0].indexOf("jpegblip") && (d = "image/jpeg"), 
                    !d) continue;
                    var c, f = l[1].split("}");
                    if (f && f.length < 2) continue;
                    if (2 < f.length && -1 != f[0].indexOf("blipuid")) c = f[1].split(" "); else {
                        if ((c = f[0].split(" ")) && c.length < 2) continue;
                        c.shift();
                    }
                    var p = c.join("");
                    v[t + o] = {
                        image_hex: p,
                        image_type: d
                    };
                }
            }
        }
        function u(n, i) {
            var o = n.tagName, s = o.toLowerCase();
            if (n.firstElementChild && ("I" == n.firstElementChild.tagName ? l(n.firstElementChild, "em") : "B" == n.firstElementChild.tagName && l(n.firstElementChild, "strong")), 
            -1 != [ "SCRIPT", "APPLET", "EMBED", "NOFRAMES", "NOSCRIPT" ].indexOf(o)) return r(n), 
            !1;
            var p = -1, u = [ "META", "LINK", "XML", "ST1:", "O:", "W:", "FONT" ];
            for (p = 0; p < u.length; p++) if (-1 != o.indexOf(u[p])) return n.innerHTML && (n.outerHTML = n.innerHTML), 
            r(n), !1;
            if ("TD" != o) {
                var h = n.getAttribute("class");
                if (i && h) {
                    var g = (h = c(h)).split(" ");
                    for (p = 0; p < g.length; p++) {
                        var m = [], v = "." + g[p];
                        m.push(v), v = s + v, m.push(v);
                        for (var E = 0; E < m.length; E++) i[m[E]] && f(n, i[m[E]]);
                    }
                    n.removeAttribute("class");
                }
                i && i[s] && f(n, i[s]);
            }
            if (-1 != [ "P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE" ].indexOf(o)) {
                var b = n.getAttribute("class");
                if (b && (i && i[o.toLowerCase() + "." + b] && f(n, i[o.toLowerCase() + "." + b]), 
                -1 != b.toLowerCase().indexOf("mso"))) {
                    var T = c(b);
                    (T = T.replace(/[0-9a-z-_]*mso[0-9a-z-_]*/gi, "")) ? n.setAttribute("class", T) : n.removeAttribute("class");
                }
                var A = n.getAttribute("style");
                if (A) {
                    var S = A.match(/text-align:.+?[; "]{1,1}/gi);
                    S && S[S.length - 1].replace(/(text-align:.+?[; "]{1,1})/gi, "$1");
                }
                d(n);
            }
            if ("TR" == o && function(n, i) {
                t.node.clearAttributes(n);
                for (var o = n.firstElementChild, s = 0, l = !1, p = null; o; ) {
                    o.firstElementChild && -1 != o.firstElementChild.tagName.indexOf("W:") && (o.innerHTML = o.firstElementChild.innerHTML), 
                    (p = o.getAttribute("width")) || l || (l = !0), s += parseInt(p, 10), (!o.firstChild || o.firstChild && o.firstChild.data == e.FE.UNICODE_NBSP) && (o.firstChild && r(o.firstChild), 
                    o.innerHTML = "<br>");
                    for (var u = o.firstElementChild, h = 1 == o.children.length; u; ) "P" != u.tagName || a(u) || h && d(u), 
                    u = u.nextElementSibling;
                    if (i) {
                        var g = o.getAttribute("class");
                        if (g) {
                            var m = (g = c(g)).match(/xl[0-9]+/gi);
                            if (m) {
                                var v = "." + m[0];
                                i[v] && f(o, i[v]);
                            }
                        }
                        i.td && f(o, i.td);
                    }
                    var E = o.getAttribute("style");
                    E && (E = c(E)) && ";" != E.slice(-1) && (E += ";");
                    var b = o.getAttribute("valign");
                    if (!b && E) {
                        var T = E.match(/vertical-align:.+?[; "]{1,1}/gi);
                        T && (b = T[T.length - 1].replace(/vertical-align:(.+?)[; "]{1,1}/gi, "$1"));
                    }
                    var A = null;
                    if (E) {
                        var S = E.match(/text-align:.+?[; "]{1,1}/gi);
                        S && (A = S[S.length - 1].replace(/text-align:(.+?)[; "]{1,1}/gi, "$1")), "general" == A && (A = null);
                    }
                    var R = null;
                    if (E) {
                        var C = E.match(/background:.+?[; "]{1,1}/gi);
                        C && (R = C[C.length - 1].replace(/background:(.+?)[; "]{1,1}/gi, "$1"));
                    }
                    var y = o.getAttribute("colspan"), _ = o.getAttribute("rowspan");
                    y && o.setAttribute("colspan", y), _ && o.setAttribute("rowspan", _), b && (o.style["vertical-align"] = b), 
                    A && (o.style["text-align"] = A), R && (o.style["background-color"] = R), p && o.setAttribute("width", p), 
                    o = o.nextElementSibling;
                }
                for (o = n.firstElementChild; o; ) p = o.getAttribute("width"), l ? o.removeAttribute("width") : o.setAttribute("width", 100 * parseInt(p, 10) / s + "%"), 
                o = o.nextElementSibling;
            }(n, i), "A" != o || n.attributes.getNamedItem("href") || n.attributes.getNamedItem("name") || !n.innerHTML || (n.outerHTML = n.innerHTML), 
            "TD" != o && "TH" != o || n.innerHTML || (n.innerHTML = "<br>"), "TABLE" == o && (n.style.width = "100%"), 
            n.getAttribute("lang") && n.removeAttribute("lang"), n.getAttribute("style") && -1 != n.getAttribute("style").toLowerCase().indexOf("mso")) {
                var R = c(n.getAttribute("style"));
                (R = R.replace(/[0-9a-z-_]*mso[0-9a-z-_]*:.+?(;{1,1}|$)/gi, "")) ? n.setAttribute("style", R) : n.removeAttribute("style");
            }
            return !0;
        }
        var h, g, m = "word_paste", v = null, E = {};
        return {
            _init: function() {
                t.events.on("paste.wordPaste", function(r) {
                    return g = r, t.opts.wordPasteModal ? function() {
                        if (!h) {
                            var n = '<h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.95 73.23" style="height: 25px; vertical-align: text-bottom; margin-right: 5px; display: inline-block"><defs><style>.a{fill:#2a5699;}.b{fill:#fff;}</style></defs><path class="a" d="M615.15,827.22h5.09V834c9.11.05,18.21-.09,27.32.05a2.93,2.93,0,0,1,3.29,3.25c.14,16.77,0,33.56.09,50.33-.09,1.72.17,3.63-.83,5.15-1.24.89-2.85.78-4.3.84-8.52,0-17,0-25.56,0v6.81h-5.32c-13-2.37-26-4.54-38.94-6.81q0-29.8,0-59.59c13.05-2.28,26.11-4.5,39.17-6.83Z" transform="translate(-575.97 -827.22)"/><path class="b" d="M620.24,836.59h28.1v54.49h-28.1v-6.81h22.14v-3.41H620.24v-4.26h22.14V873.2H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24V846h22.14v-3.41H620.24Zm-26.67,15c1.62-.09,3.24-.16,4.85-.25,1.13,5.75,2.29,11.49,3.52,17.21,1-5.91,2-11.8,3.06-17.7,1.7-.06,3.41-.15,5.1-.26-1.92,8.25-3.61,16.57-5.71,24.77-1.42.74-3.55,0-5.24.09-1.13-5.64-2.45-11.24-3.47-16.9-1,5.5-2.29,10.95-3.43,16.42q-2.45-.13-4.92-.3c-1.41-7.49-3.07-14.93-4.39-22.44l4.38-.18c.88,5.42,1.87,10.82,2.64,16.25,1.2-5.57,2.43-11.14,3.62-16.71Z" transform="translate(-575.97 -827.22)"/></svg> ' + t.language.translate("Word Paste Detected") + "</h4>", r = (o = '<div class="fr-word-paste-modal" style="padding: 20px 20px 10px 20px;">', 
                            o += '<p style="text-align: left;">' + t.language.translate("The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?") + "</p>", 
                            o += '<div style="text-align: right; margin-top: 50px;"><button class="fr-remove-word fr-command">' + t.language.translate("Clean") + '</button> <button class="fr-keep-word fr-command">' + t.language.translate("Keep") + "</button></div>", 
                            o += "</div>"), i = t.modals.create(m, n, r), a = i.$body;
                            h = i.$modal, i.$modal.addClass("fr-middle"), t.events.bindClick(a, "button.fr-remove-word", function() {
                                (h.data("instance") || t).wordPaste.clean();
                            }), t.events.bindClick(a, "button.fr-keep-word", function() {
                                (h.data("instance") || t).wordPaste.clean(!0);
                            }), t.events.$on(e(t.o_win), "resize", function() {
                                t.modals.resize(m);
                            });
                        }
                        var o;
                        t.modals.show(m), t.modals.resize(m);
                    }() : n(!0), !1;
                });
            },
            clean: n
        };
    };
});
