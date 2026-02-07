/*! jQuery Migrate v3.3.2 | (c) OpenJS Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], function(e) {
            return t(e, window);
        }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), window) : t(jQuery, window);
    }(function(s, n) {
        "use strict";

        function e(e) {
            return 0 <= function(e, t) {
                for (var r = /^(\d+)\.(\d+)\.(\d+)/, n = r.exec(e) || [], o = r.exec(t) || [], i = 1; i <= 3; i++) {
                    if (+o[i] < +n[i]) return 1;
                    if (+n[i] < +o[i]) return -1;
                }
                return 0;
            }(s.fn.jquery, e);
        }
        s.migrateVersion = "3.3.2", n.console && n.console.log && (s && e("3.0.0") || n.console.log("JQMIGRATE: jQuery 3.0.0+ REQUIRED"), s.migrateWarnings && n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"), n.console.log("JQMIGRATE: Migrate is installed" + (s.migrateMute ? "" : " with logging active") + ", version " + s.migrateVersion));
        var r = {};

        function u(e) {
            var t = n.console;
            s.migrateDeduplicateWarnings && r[e] || (r[e] = !0, s.migrateWarnings.push(e), t && t.warn && !s.migrateMute && (t.warn("JQMIGRATE: " + e), s.migrateTrace && t.trace && t.trace()));
        }

        function t(e, t, r, n) {
            Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return u(n), r;
                },
                set: function(e) {
                    u(n), r = e;
                }
            });
        }

        function o(e, t, r, n) {
            e[t] = function() {
                return u(n), r.apply(this, arguments);
            };
        }
        s.migrateDeduplicateWarnings = !0, s.migrateWarnings = [], void 0 === s.migrateTrace && (s.migrateTrace = !0), s.migrateReset = function() {
            r = {}, s.migrateWarnings.length = 0;
        }, "BackCompat" === n.document.compatMode && u("jQuery is not compatible with Quirks Mode");
        var i, a, c, d = {},
            l = s.fn.init,
            p = s.find,
            f = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
            y = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
            m = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        for (i in s.fn.init = function(e) {
                var t = Array.prototype.slice.call(arguments);
                return "string" == typeof e && "#" === e && (u("jQuery( '#' ) is not a valid selector"), t[0] = []), l.apply(this, t);
            }, s.fn.init.prototype = s.fn, s.find = function(t) {
                var r = Array.prototype.slice.call(arguments);
                if ("string" == typeof t && f.test(t)) try {
                    n.document.querySelector(t);
                } catch (e) {
                    t = t.replace(y, function(e, t, r, n) {
                        return "[" + t + r + '"' + n + '"]';
                    });
                    try {
                        n.document.querySelector(t), u("Attribute selector with '#' must be quoted: " + r[0]), r[0] = t;
                    } catch (e) {
                        u("Attribute selector with '#' was not fixed: " + r[0]);
                    }
                }
                return p.apply(this, r);
            }, p) Object.prototype.hasOwnProperty.call(p, i) && (s.find[i] = p[i]);
        o(s.fn, "size", function() {
            return this.length;
        }, "jQuery.fn.size() is deprecated and removed; use the .length property"), o(s, "parseJSON", function() {
            return JSON.parse.apply(null, arguments);
        }, "jQuery.parseJSON is deprecated; use JSON.parse"), o(s, "holdReady", s.holdReady, "jQuery.holdReady is deprecated"), o(s, "unique", s.uniqueSort, "jQuery.unique is deprecated; use jQuery.uniqueSort"), t(s.expr, "filters", s.expr.pseudos, "jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"), t(s.expr, ":", s.expr.pseudos, "jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"), e("3.1.1") && o(s, "trim", function(e) {
            return null == e ? "" : (e + "").replace(m, "");
        }, "jQuery.trim is deprecated; use String.prototype.trim"), e("3.2.0") && (o(s, "nodeName", function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        }, "jQuery.nodeName is deprecated"), o(s, "isArray", Array.isArray, "jQuery.isArray is deprecated; use Array.isArray")), e("3.3.0") && (o(s, "isNumeric", function(e) {
            var t = typeof e;
            return ("number" == t || "string" == t) && !isNaN(e - parseFloat(e));
        }, "jQuery.isNumeric() is deprecated"), s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            d["[object " + t + "]"] = t.toLowerCase();
        }), o(s, "type", function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[Object.prototype.toString.call(e)] || "object" : typeof e;
        }, "jQuery.type is deprecated"), o(s, "isFunction", function(e) {
            return "function" == typeof e;
        }, "jQuery.isFunction() is deprecated"), o(s, "isWindow", function(e) {
            return null != e && e === e.window;
        }, "jQuery.isWindow() is deprecated")), s.ajax && (a = s.ajax, c = /(=)\?(?=&|$)|\?\?/, s.ajax = function() {
            var e = a.apply(this, arguments);
            return e.promise && (o(e, "success", e.done, "jQXHR.success is deprecated and removed"), o(e, "error", e.fail, "jQXHR.error is deprecated and removed"), o(e, "complete", e.always, "jQXHR.complete is deprecated and removed")), e;
        }, e("4.0.0") || s.ajaxPrefilter("+json", function(e) {
            !1 !== e.jsonp && (c.test(e.url) || "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && c.test(e.data)) && u("JSON-to-JSONP auto-promotion is deprecated");
        }));
        var g = s.fn.removeAttr,
            h = s.fn.toggleClass,
            v = /\S+/g;

        function j(e) {
            return e.replace(/-([a-z])/g, function(e, t) {
                return t.toUpperCase();
            });
        }
        s.fn.removeAttr = function(e) {
            var r = this;
            return s.each(e.match(v), function(e, t) {
                s.expr.match.bool.test(t) && (u("jQuery.fn.removeAttr no longer sets boolean properties: " + t), r.prop(t, !1));
            }), g.apply(this, arguments);
        };
        var Q, b = !(s.fn.toggleClass = function(t) {
                return void 0 !== t && "boolean" != typeof t ? h.apply(this, arguments) : (u("jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function() {
                    var e = this.getAttribute && this.getAttribute("class") || "";
                    e && s.data(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== t && s.data(this, "__className__") || "");
                }));
            }),
            w = /^[a-z]/,
            x = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
        s.swap && s.each(["height", "width", "reliableMarginRight"], function(e, t) {
            var r = s.cssHooks[t] && s.cssHooks[t].get;
            r && (s.cssHooks[t].get = function() {
                var e;
                return b = !0, e = r.apply(this, arguments), b = !1, e;
            });
        }), s.swap = function(e, t, r, n) {
            var o, i, a = {};
            for (i in b || u("jQuery.swap() is undocumented and deprecated"), t) a[i] = e.style[i], e.style[i] = t[i];
            for (i in o = r.apply(e, n || []), t) e.style[i] = a[i];
            return o;
        }, e("3.4.0") && "undefined" != typeof Proxy && (s.cssProps = new Proxy(s.cssProps || {}, {
            set: function() {
                return u("JQMIGRATE: jQuery.cssProps is deprecated"), Reflect.set.apply(this, arguments);
            }
        })), s.cssNumber || (s.cssNumber = {}), Q = s.fn.css, s.fn.css = function(e, t) {
            var r, n, o = this;
            return e && "object" == typeof e && !Array.isArray(e) ? (s.each(e, function(e, t) {
                s.fn.css.call(o, e, t);
            }), this) : ("number" == typeof t && (r = j(e), n = r, w.test(n) && x.test(n[0].toUpperCase() + n.slice(1)) || s.cssNumber[r] || u('Number-typed values are deprecated for jQuery.fn.css( "' + e + '", value )')), Q.apply(this, arguments));
        };
        var A, k, S, M, N = s.data;
        s.data = function(e, t, r) {
            var n, o, i;
            if (t && "object" == typeof t && 2 === arguments.length) {
                for (i in n = s.hasData(e) && N.call(this, e), o = {}, t) i !== j(i) ? (u("jQuery.data() always sets/gets camelCased names: " + i), n[i] = t[i]) : o[i] = t[i];
                return N.call(this, e, o), t;
            }
            return t && "string" == typeof t && t !== j(t) && (n = s.hasData(e) && N.call(this, e)) && t in n ? (u("jQuery.data() always sets/gets camelCased names: " + t), 2 < arguments.length && (n[t] = r), n[t]) : N.apply(this, arguments);
        }, s.fx && (S = s.Tween.prototype.run, M = function(e) {
            return e;
        }, s.Tween.prototype.run = function() {
            1 < s.easing[this.easing].length && (u("'jQuery.easing." + this.easing.toString() + "' should use only one argument"), s.easing[this.easing] = M), S.apply(this, arguments);
        }, A = s.fx.interval || 13, k = "jQuery.fx.interval is deprecated", n.requestAnimationFrame && Object.defineProperty(s.fx, "interval", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return n.document.hidden || u(k), A;
            },
            set: function(e) {
                u(k), A = e;
            }
        }));
        var R = s.fn.load,
            H = s.event.add,
            C = s.event.fix;
        s.event.props = [], s.event.fixHooks = {}, t(s.event.props, "concat", s.event.props.concat, "jQuery.event.props.concat() is deprecated and removed"), s.event.fix = function(e) {
            var t, r = e.type,
                n = this.fixHooks[r],
                o = s.event.props;
            if (o.length) {
                u("jQuery.event.props are deprecated and removed: " + o.join());
                while (o.length) s.event.addProp(o.pop());
            }
            if (n && !n._migrated_ && (n._migrated_ = !0, u("jQuery.event.fixHooks are deprecated and removed: " + r), (o = n.props) && o.length))
                while (o.length) s.event.addProp(o.pop());
            return t = C.call(this, e), n && n.filter ? n.filter(t, e) : t;
        }, s.event.add = function(e, t) {
            return e === n && "load" === t && "complete" === n.document.readyState && u("jQuery(window).on('load'...) called after load event occurred"), H.apply(this, arguments);
        }, s.each(["load", "unload", "error"], function(e, t) {
            s.fn[t] = function() {
                var e = Array.prototype.slice.call(arguments, 0);
                return "load" === t && "string" == typeof e[0] ? R.apply(this, e) : (u("jQuery.fn." + t + "() is deprecated"), e.splice(0, 0, t), arguments.length ? this.on.apply(this, e) : (this.triggerHandler.apply(this, e), this));
            };
        }), s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, r) {
            s.fn[r] = function(e, t) {
                return u("jQuery.fn." + r + "() event shorthand is deprecated"), 0 < arguments.length ? this.on(r, null, e, t) : this.trigger(r);
            };
        }), s(function() {
            s(n.document).triggerHandler("ready");
        }), s.event.special.ready = {
            setup: function() {
                this === n.document && u("'ready' event is deprecated");
            }
        }, s.fn.extend({
            bind: function(e, t, r) {
                return u("jQuery.fn.bind() is deprecated"), this.on(e, null, t, r);
            },
            unbind: function(e, t) {
                return u("jQuery.fn.unbind() is deprecated"), this.off(e, null, t);
            },
            delegate: function(e, t, r, n) {
                return u("jQuery.fn.delegate() is deprecated"), this.on(t, e, r, n);
            },
            undelegate: function(e, t, r) {
                return u("jQuery.fn.undelegate() is deprecated"), 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", r);
            },
            hover: function(e, t) {
                return u("jQuery.fn.hover() is deprecated"), this.on("mouseenter", e).on("mouseleave", t || e);
            }
        });

        function T(e) {
            var t = n.document.implementation.createHTMLDocument("");
            return t.body.innerHTML = e, t.body && t.body.innerHTML;
        }

        function P(e) {
            var t = e.replace(O, "<$1></$2>");
            t !== e && T(e) !== T(t) && u("HTML tags must be properly nested and closed: " + e);
        }
        var O = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            q = s.htmlPrefilter;
        s.UNSAFE_restoreLegacyHtmlPrefilter = function() {
            s.htmlPrefilter = function(e) {
                return P(e), e.replace(O, "<$1></$2>");
            };
        }, s.htmlPrefilter = function(e) {
            return P(e), q(e);
        };
        var D, _ = s.fn.offset;
        s.fn.offset = function() {
            var e = this[0];
            return !e || e.nodeType && e.getBoundingClientRect ? _.apply(this, arguments) : (u("jQuery.fn.offset() requires a valid DOM element"), arguments.length ? this : void 0);
        }, s.ajax && (D = s.param, s.param = function(e, t) {
            var r = s.ajaxSettings && s.ajaxSettings.traditional;
            return void 0 === t && r && (u("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), t = r), D.call(this, e, t);
        });
        var E, F, J = s.fn.andSelf || s.fn.addBack;
        return s.fn.andSelf = function() {
            return u("jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"), J.apply(this, arguments);
        }, s.Deferred && (E = s.Deferred, F = [
            ["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), "resolved"],
            ["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), "rejected"],
            ["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory")]
        ], s.Deferred = function(e) {
            var i = E(),
                a = i.promise();
            return i.pipe = a.pipe = function() {
                var o = arguments;
                return u("deferred.pipe() is deprecated"), s.Deferred(function(n) {
                    s.each(F, function(e, t) {
                        var r = "function" == typeof o[e] && o[e];
                        i[t[1]](function() {
                            var e = r && r.apply(this, arguments);
                            e && "function" == typeof e.promise ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[t[0] + "With"](this === a ? n.promise() : this, r ? [e] : arguments);
                        });
                    }), o = null;
                }).promise();
            }, e && e.call(i, i), i;
        }, s.Deferred.exceptionHook = E.exceptionHook), s;
    });

/* modernizr.min */
window.Modernizr = function(e, t, n) {
    function r(e) {
        b.cssText = e;
    }

    function o(e, t) {
        return r(S.join(e + ";") + (t || ""));
    }

    function a(e, t) {
        return typeof e === t;
    }

    function i(e, t) {
        return !!~("" + e).indexOf(t);
    }

    function c(e, t) {
        for (var r in e) {
            var o = e[r];
            if (!i(o, "-") && b[o] !== n) return "pfx" == t ? o : !0;
        }
        return !1;
    }

    function s(e, t, r) {
        for (var o in e) {
            var i = t[e[o]];
            if (i !== n) return r === !1 ? e[o] : a(i, "function") ? i.bind(r || t) : i;
        }
        return !1;
    }

    function u(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1),
            o = (e + " " + k.join(r + " ") + r).split(" ");
        return a(t, "string") || a(t, "undefined") ? c(o, t) : (o = (e + " " + T.join(r + " ") + r).split(" "), s(o, t, n));
    }

    function l() {
        p.input = function(n) {
            for (var r = 0, o = n.length; o > r; r++) j[n[r]] = !!(n[r] in E);
            return j.list && (j.list = !(!t.createElement("datalist") || !e.HTMLDataListElement)), j;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), p.inputtypes = function(e) {
            for (var r, o, a, i = 0, c = e.length; c > i; i++) E.setAttribute("type", o = e[i]), r = "text" !== E.type, r && (E.value = x, E.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(o) && E.style.WebkitAppearance !== n ? (g.appendChild(E), a = t.defaultView, r = a.getComputedStyle && "textfield" !== a.getComputedStyle(E, null).WebkitAppearance && 0 !== E.offsetHeight, g.removeChild(E)) : /^(search|tel)$/.test(o) || (r = /^(url|email)$/.test(o) ? E.checkValidity && E.checkValidity() === !1 : E.value != x)), P[e[i]] = !!r;
            return P;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var d, f, m = "2.8.3",
        p = {},
        h = !0,
        g = t.documentElement,
        v = "modernizr",
        y = t.createElement(v),
        b = y.style,
        E = t.createElement("input"),
        x = ":)",
        w = {}.toString,
        S = " -webkit- -moz- -o- -ms- ".split(" "),
        C = "Webkit Moz O ms",
        k = C.split(" "),
        T = C.toLowerCase().split(" "),
        N = {
            svg: "http://www.w3.org/2000/svg"
        },
        M = {},
        P = {},
        j = {},
        $ = [],
        D = $.slice,
        F = function(e, n, r, o) {
            var a, i, c, s, u = t.createElement("div"),
                l = t.body,
                d = l || t.createElement("body");
            if (parseInt(r, 10))
                for (; r--;) c = t.createElement("div"), c.id = o ? o[r] : v + (r + 1), u.appendChild(c);
            return a = ["&#173;", '<style id="s', v, '">', e, "</style>"].join(""), u.id = v, (l ? u : d).innerHTML += a, d.appendChild(u), l || (d.style.background = "", d.style.overflow = "hidden", s = g.style.overflow, g.style.overflow = "hidden", g.appendChild(d)), i = n(u, e), l ? u.parentNode.removeChild(u) : (d.parentNode.removeChild(d), g.style.overflow = s), !!i;
        },
        z = function(t) {
            var n = e.matchMedia || e.msMatchMedia;
            if (n) return n(t) && n(t).matches || !1;
            var r;
            return F("@media " + t + " { #" + v + " { position: absolute; } }", function(t) {
                r = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position;
            }), r;
        },
        A = function() {
            function e(e, o) {
                o = o || t.createElement(r[e] || "div"), e = "on" + e;
                var i = (e in o);
                return i || (o.setAttribute || (o = t.createElement("div")), o.setAttribute && o.removeAttribute && (o.setAttribute(e, ""), i = a(o[e], "function"), a(o[e], "undefined") || (o[e] = n), o.removeAttribute(e))), o = null, i;
            }
            var r = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return e;
        }(),
        L = {}.hasOwnProperty;
    f = a(L, "undefined") || a(L.call, "undefined") ? function(e, t) {
        return t in e && a(e.constructor.prototype[t], "undefined");
    } : function(e, t) {
        return L.call(e, t);
    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError();
        var n = D.call(arguments, 1),
            r = function() {
                if (this instanceof r) {
                    var o = function() {};
                    o.prototype = t.prototype;
                    var a = new o(),
                        i = t.apply(a, n.concat(D.call(arguments)));
                    return Object(i) === i ? i : a;
                }
                return t.apply(e, n.concat(D.call(arguments)));
            };
        return r;
    }), M.flexbox = function() {
        return u("flexWrap");
    }, M.flexboxlegacy = function() {
        return u("boxDirection");
    }, M.canvas = function() {
        var e = t.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"));
    }, M.canvastext = function() {
        return !(!p.canvas || !a(t.createElement("canvas").getContext("2d").fillText, "function"));
    }, M.webgl = function() {
        return !!e.WebGLRenderingContext;
    }, M.touch = function() {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : F(["@media (", S.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
            n = 9 === e.offsetTop;
        }), n;
    }, M.geolocation = function() {
        return "geolocation" in navigator;
    }, M.postmessage = function() {
        return !!e.postMessage;
    }, M.websqldatabase = function() {
        return !!e.openDatabase;
    }, M.indexedDB = function() {
        return !!u("indexedDB", e);
    }, M.hashchange = function() {
        return A("hashchange", e) && (t.documentMode === n || t.documentMode > 7);
    }, M.history = function() {
        return !(!e.history || !history.pushState);
    }, M.draganddrop = function() {
        var e = t.createElement("div");
        return "draggable" in e || "ondragstart" in e && "ondrop" in e;
    }, M.websockets = function() {
        return "WebSocket" in e || "MozWebSocket" in e;
    }, M.rgba = function() {
        return r("background-color:rgba(150,255,150,.5)"), i(b.backgroundColor, "rgba");
    }, M.hsla = function() {
        return r("background-color:hsla(120,40%,100%,.5)"), i(b.backgroundColor, "rgba") || i(b.backgroundColor, "hsla");
    }, M.multiplebgs = function() {
        return r("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(b.background);
    }, M.backgroundsize = function() {
        return u("backgroundSize");
    }, M.borderimage = function() {
        return u("borderImage");
    }, M.borderradius = function() {
        return u("borderRadius");
    }, M.boxshadow = function() {
        return u("boxShadow");
    }, M.textshadow = function() {
        return "" === t.createElement("div").style.textShadow;
    }, M.opacity = function() {
        return o("opacity:.55"), /^0.55$/.test(b.opacity);
    }, M.cssanimations = function() {
        return u("animationName");
    }, M.csscolumns = function() {
        return u("columnCount");
    }, M.cssgradients = function() {
        var e = "background-image:",
            t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            n = "linear-gradient(left top,#9f9, white);";
        return r((e + "-webkit- ".split(" ").join(t + e) + S.join(n + e)).slice(0, -e.length)), i(b.backgroundImage, "gradient");
    }, M.cssreflections = function() {
        return u("boxReflect");
    }, M.csstransforms = function() {
        return !!u("transform");
    }, M.csstransforms3d = function() {
        var e = !!u("perspective");
        return e && "webkitPerspective" in g.style && F("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t) {
            e = 9 === t.offsetLeft && 3 === t.offsetHeight;
        }), e;
    }, M.csstransitions = function() {
        return u("transition");
    }, M.fontface = function() {
        var e;
        return F('@font-face {font-family:"font";src:url("https://")}', function(n, r) {
            var o = t.getElementById("smodernizr"),
                a = o.sheet || o.styleSheet,
                i = a ? a.cssRules && a.cssRules[0] ? a.cssRules[0].cssText : a.cssText || "" : "";
            e = /src/i.test(i) && 0 === i.indexOf(r.split(" ")[0]);
        }), e;
    }, M.generatedcontent = function() {
        var e;
        return F(["#", v, "{font:0/0 a}#", v, ':after{content:"', x, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
            e = t.offsetHeight >= 3;
        }), e;
    }, M.video = function() {
        var e = t.createElement("video"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
        } catch (r) {}
        return n;
    }, M.audio = function() {
        var e = t.createElement("audio"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (r) {}
        return n;
    }, M.localstorage = function() {
        try {
            return localStorage.setItem(v, v), localStorage.removeItem(v), !0;
        } catch (e) {
            return !1;
        }
    }, M.sessionstorage = function() {
        try {
            return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), !0;
        } catch (e) {
            return !1;
        }
    }, M.webworkers = function() {
        return !!e.Worker;
    }, M.applicationcache = function() {
        return !!e.applicationCache;
    }, M.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(N.svg, "svg").createSVGRect;
    }, M.inlinesvg = function() {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == N.svg;
    }, M.smil = function() {
        return !!t.createElementNS && /SVGAnimate/.test(w.call(t.createElementNS(N.svg, "animate")));
    }, M.svgclippaths = function() {
        return !!t.createElementNS && /SVGClipPath/.test(w.call(t.createElementNS(N.svg, "clipPath")));
    };
    for (var H in M) f(M, H) && (d = H.toLowerCase(), p[d] = M[H](), $.push((p[d] ? "" : "no-") + d));
    return p.input || l(), p.addTest = function(e, t) {
            if ("object" == typeof e)
                for (var r in e) f(e, r) && p.addTest(r, e[r]);
            else {
                if (e = e.toLowerCase(), p[e] !== n) return p;
                t = "function" == typeof t ? t() : t, "undefined" != typeof h && h && (g.className += " " + (t ? "" : "no-") + e), p[e] = t;
            }
            return p;
        }, r(""), y = E = null,
        function(e, t) {
            function n(e, t) {
                var n = e.createElement("p"),
                    r = e.getElementsByTagName("head")[0] || e.documentElement;
                return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild);
            }

            function r() {
                var e = y.elements;
                return "string" == typeof e ? e.split(" ") : e;
            }

            function o(e) {
                var t = v[e[h]];
                return t || (t = {}, g++, e[h] = g, v[g] = t), t;
            }

            function a(e, n, r) {
                if (n || (n = t), l) return n.createElement(e);
                r || (r = o(n));
                var a;
                return a = r.cache[e] ? r.cache[e].cloneNode() : p.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !a.canHaveChildren || m.test(e) || a.tagUrn ? a : r.frag.appendChild(a);
            }

            function i(e, n) {
                if (e || (e = t), l) return e.createDocumentFragment();
                n = n || o(e);
                for (var a = n.frag.cloneNode(), i = 0, c = r(), s = c.length; s > i; i++) a.createElement(c[i]);
                return a;
            }

            function c(e, t) {
                t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                    return y.shivMethods ? a(n, e, t) : t.createElem(n);
                }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-]+/g, function(e) {
                    return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")';
                }) + ");return n}")(y, t.frag);
            }

            function s(e) {
                e || (e = t);
                var r = o(e);
                return !y.shivCSS || u || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), l || c(e, r), e;
            }
            var u, l, d = "3.7.0",
                f = e.html5 || {},
                m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                h = "_html5shiv",
                g = 0,
                v = {};
            ! function() {
                try {
                    var e = t.createElement("a");
                    e.innerHTML = "<xyz></xyz>", u = "hidden" in e, l = 1 == e.childNodes.length || function() {
                        t.createElement("a");
                        var e = t.createDocumentFragment();
                        return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement;
                    }();
                } catch (n) {
                    u = !0, l = !0;
                }
            }();
            var y = {
                elements: f.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                version: d,
                shivCSS: f.shivCSS !== !1,
                supportsUnknownElements: l,
                shivMethods: f.shivMethods !== !1,
                type: "default",
                shivDocument: s,
                createElement: a,
                createDocumentFragment: i
            };
            e.html5 = y, s(t);
        }(this, t), p._version = m, p._prefixes = S, p._domPrefixes = T, p._cssomPrefixes = k, p.mq = z, p.hasEvent = A, p.testProp = function(e) {
            return c([e]);
        }, p.testAllProps = u, p.testStyles = F, p.prefixed = function(e, t, n) {
            return t ? u(e, t, n) : u(e, "pfx");
        }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + $.join(" ") : ""), p;
}(this, this.document);

/*! Popper v1.14.7 */
/*
 Copyright (C) Federico Zivolo 2019
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t();
})(this, function() {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e);
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = e.ownerDocument.defaultView,
            n = o.getComputedStyle(e, null);
        return t ? n[t] : n;
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host;
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case 'HTML':
            case 'BODY':
                return e.ownerDocument.body;
            case '#document':
                return e.body;
        }
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e));
    }

    function r(e) {
        return 11 === e ? pe : 10 === e ? se : pe || se;
    }

    function p(e) {
        if (!e) return document.documentElement;
        for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement;
    }

    function s(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e);
    }

    function d(e) {
        return null === e.parentNode ? e : d(e.parentNode);
    }

    function a(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = o ? e : t,
            i = o ? t : e,
            r = document.createRange();
        r.setStart(n, 0), r.setEnd(i, 0);
        var l = r.commonAncestorContainer;
        if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l);
        var f = d(e);
        return f.host ? a(f.host, t) : a(e, d(t).host);
    }

    function l(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) {
            var i = e.ownerDocument.documentElement,
                r = e.ownerDocument.scrollingElement || i;
            return r[o];
        }
        return e[o];
    }

    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            n = l(t, 'top'),
            i = l(t, 'left'),
            r = o ? -1 : 1;
        return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e;
    }

    function m(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            n = 'Left' == o ? 'Right' : 'Bottom';
        return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10);
    }

    function h(e, t, o, n) {
        return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0);
    }

    function c(e) {
        var t = e.body,
            o = e.documentElement,
            n = r(10) && getComputedStyle(o);
        return {
            height: h('Height', t, o, n),
            width: h('Width', t, o, n)
        };
    }

    function g(e) {
        return fe({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        });
    }

    function u(e) {
        var o = {};
        try {
            if (r(10)) {
                o = e.getBoundingClientRect();
                var n = l(e, 'top'),
                    i = l(e, 'left');
                o.top += n, o.left += i, o.bottom += n, o.right += i;
            } else o = e.getBoundingClientRect();
        } catch (t) {}
        var p = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top
            },
            s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {},
            d = s.width || e.clientWidth || p.right - p.left,
            a = s.height || e.clientHeight || p.bottom - p.top,
            f = e.offsetWidth - d,
            h = e.offsetHeight - a;
        if (f || h) {
            var u = t(e);
            f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h;
        }
        return g(p);
    }

    function b(e, o) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            p = r(10),
            s = 'HTML' === o.nodeName,
            d = u(e),
            a = u(o),
            l = n(e),
            m = t(o),
            h = parseFloat(m.borderTopWidth, 10),
            c = parseFloat(m.borderLeftWidth, 10);
        i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0));
        var b = g({
            top: d.top - a.top - h,
            left: d.left - a.left - c,
            width: d.width,
            height: d.height
        });
        if (b.marginTop = 0, b.marginLeft = 0, !p && s) {
            var w = parseFloat(m.marginTop, 10),
                y = parseFloat(m.marginLeft, 10);
            b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y;
        }
        return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b;
    }

    function w(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = e.ownerDocument.documentElement,
            n = b(e, o),
            i = ee(o.clientWidth, window.innerWidth || 0),
            r = ee(o.clientHeight, window.innerHeight || 0),
            p = t ? 0 : l(o),
            s = t ? 0 : l(o, 'left'),
            d = {
                top: p - n.top + n.marginTop,
                left: s - n.left + n.marginLeft,
                width: i,
                height: r
            };
        return g(d);
    }

    function y(e) {
        var n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) return !1;
        if ('fixed' === t(e, 'position')) return !0;
        var i = o(e);
        return !!i && y(i);
    }

    function E(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var o = e.parentElement; o && 'none' === t(o, 'transform');) o = o.parentElement;
        return o || document.documentElement;
    }

    function v(e, t, i, r) {
        var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            s = {
                top: 0,
                left: 0
            },
            d = p ? E(e) : a(e, t);
        if ('viewport' === r) s = w(d, p);
        else {
            var l;
            'scrollParent' === r ? (l = n(o(t)), 'BODY' === l.nodeName && (l = e.ownerDocument.documentElement)) : 'window' === r ? l = e.ownerDocument.documentElement : l = r;
            var f = b(l, d, p);
            if ('HTML' === l.nodeName && !y(d)) {
                var m = c(e.ownerDocument),
                    h = m.height,
                    g = m.width;
                s.top += f.top - f.marginTop, s.bottom = h + f.top, s.left += f.left - f.marginLeft, s.right = g + f.left;
            } else s = f;
        }
        i = i || 0;
        var u = 'number' == typeof i;
        return s.left += u ? i : i.left || 0, s.top += u ? i : i.top || 0, s.right -= u ? i : i.right || 0, s.bottom -= u ? i : i.bottom || 0, s;
    }

    function x(e) {
        var t = e.width,
            o = e.height;
        return t * o;
    }

    function O(e, t, o, n, i) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = v(o, n, r, i),
            s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            },
            d = Object.keys(s).map(function(e) {
                return fe({
                    key: e
                }, s[e], {
                    area: x(s[e])
                });
            }).sort(function(e, t) {
                return t.area - e.area;
            }),
            a = d.filter(function(e) {
                var t = e.width,
                    n = e.height;
                return t >= o.clientWidth && n >= o.clientHeight;
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split('-')[1];
        return l + (f ? '-' + f : '');
    }

    function L(e, t, o) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            i = n ? E(t) : a(t, o);
        return b(o, i, n);
    }

    function S(e) {
        var t = e.ownerDocument.defaultView,
            o = t.getComputedStyle(e),
            n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
            i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
            r = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + n
            };
        return r;
    }

    function T(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e];
        });
    }

    function D(e, t, o) {
        o = o.split('-')[0];
        var n = S(e),
            i = {
                width: n.width,
                height: n.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            d = r ? 'height' : 'width',
            a = r ? 'width' : 'height';
        return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i;
    }

    function C(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }

    function N(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === o;
        });
        var n = C(e, function(e) {
            return e[t] === o;
        });
        return e.indexOf(n);
    }

    function P(t, o, n) {
        var i = void 0 === n ? t : t.slice(0, N(t, 'name', n));
        return i.forEach(function(t) {
            t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var n = t['function'] || t.fn;
            t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t));
        }), o;
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = D(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
        }
    }

    function W(e, t) {
        return e.some(function(e) {
            var o = e.name,
                n = e.enabled;
            return n && o === t;
        });
    }

    function H(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof document.body.style[r]) return r;
        }
        return null;
    }

    function B() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[H('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
    }

    function A(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window;
    }

    function M(e, t, o, i) {
        var r = 'BODY' === e.nodeName,
            p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || M(n(p.parentNode), t, o, i), i.push(p);
    }

    function F(e, t, o, i) {
        o.updateBound = i, A(e).addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o;
    }

    function I() {
        this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate));
    }

    function R(e, t) {
        return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener('scroll', t.updateBound);
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
    }

    function U() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state));
    }

    function Y(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }

    function j(e, t) {
        Object.keys(t).forEach(function(o) {
            var n = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n;
        });
    }

    function V(e, t) {
        Object.keys(t).forEach(function(o) {
            var n = t[o];
            !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
        });
    }

    function q(e, t) {
        var o = e.offsets,
            n = o.popper,
            i = o.reference,
            r = $,
            p = function(e) {
                return e;
            },
            s = r(i.width),
            d = r(n.width),
            a = -1 !== ['left', 'right'].indexOf(e.placement),
            l = -1 !== e.placement.indexOf('-'),
            f = t ? a || l || s % 2 == d % 2 ? r : Z : p,
            m = t ? r : p;
        return {
            left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
            top: m(n.top),
            bottom: m(n.bottom),
            right: f(n.right)
        };
    }

    function K(e, t, o) {
        var n = C(e, function(e) {
                var o = e.name;
                return o === t;
            }),
            i = !!n && e.some(function(e) {
                return e.name === o && e.enabled && e.order < n.order;
            });
        if (!i) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!');
        }
        return i;
    }

    function z(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e;
    }

    function G(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = ce.indexOf(e),
            n = ce.slice(o + 1).concat(ce.slice(0, o));
        return t ? n.reverse() : n;
    }

    function _(e, t, o, n) {
        var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +i[1],
            p = i[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = n;
            }
            var d = g(s);
            return d[t] / 100 * r;
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r;
        }
        return r;
    }

    function X(e, t, o, n) {
        var i = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(n),
            p = e.split(/(\+|\-)/).map(function(e) {
                return e.trim();
            }),
            s = p.indexOf(C(p, function(e) {
                return -1 !== e.search(/,|\s/);
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function(e, n) {
            var i = (1 === n ? !r : r) ? 'height' : 'width',
                p = !1;
            return e.reduce(function(e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
            }, []).map(function(e) {
                return _(e, i, t, o);
            });
        }), a.forEach(function(e, t) {
            e.forEach(function(o, n) {
                Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1));
            });
        }), i;
    }

    function J(e, t) {
        var o, n = t.offset,
            i = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = i.split('-')[0];
        return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e;
    }
    for (var Q = Math.min, Z = Math.floor, $ = Math.round, ee = Math.max, te = 'undefined' != typeof window && 'undefined' != typeof document, oe = ['Edge', 'Trident', 'Firefox'], ne = 0, ie = 0; ie < oe.length; ie += 1)
        if (te && 0 <= navigator.userAgent.indexOf(oe[ie])) {
            ne = 1;
            break;
        } var i = te && window.Promise,
        re = i ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e();
                }));
            };
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e();
                }, ne));
            };
        },
        pe = te && !!(window.MSInputMethodContext && document.documentMode),
        se = te && /MSIE 10/.test(navigator.userAgent),
        de = function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        },
        ae = function() {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
            }
            return function(t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t;
            };
        }(),
        le = function(e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e;
        },
        fe = Object.assign || function(e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
        },
        me = te && /Firefox/i.test(navigator.userAgent),
        he = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        ce = he.slice(3),
        ge = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        ue = function() {
            function t(o, n) {
                var i = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                de(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update);
                }, this.update = re(this.update.bind(this)), this.options = fe({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(fe({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                    i.options.modifiers[e] = fe({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return fe({
                        name: e
                    }, i.options.modifiers[e]);
                }).sort(function(e, t) {
                    return e.order - t.order;
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p;
            }
            return ae(t, [{
                key: 'update',
                value: function() {
                    return k.call(this);
                }
            }, {
                key: 'destroy',
                value: function() {
                    return B.call(this);
                }
            }, {
                key: 'enableEventListeners',
                value: function() {
                    return I.call(this);
                }
            }, {
                key: 'disableEventListeners',
                value: function() {
                    return U.call(this);
                }
            }]), t;
        }();
    return ue.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ue.placements = he, ue.Defaults = {
        placement: 'bottom',
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = t.split('-')[1];
                    if (n) {
                        var i = e.offsets,
                            r = i.reference,
                            p = i.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top',
                            a = s ? 'width' : 'height',
                            l = {
                                start: le({}, d, r[d]),
                                end: le({}, d, r[d] + r[a] - p[a])
                            };
                        e.offsets.popper = fe({}, p, l[n]);
                    }
                    return e;
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: J,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.boundariesElement || p(e.instance.popper);
                    e.instance.reference === o && (o = p(o));
                    var n = H('transform'),
                        i = e.instance.popper.style,
                        r = i.top,
                        s = i.left,
                        d = i[n];
                    i.top = '', i.left = '', i[n] = '';
                    var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
                    i.top = r, i.left = s, i[n] = d, t.boundaries = a;
                    var l = t.priority,
                        f = e.offsets.popper,
                        m = {
                            primary: function(e) {
                                var o = f[e];
                                return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), le({}, e, o);
                            },
                            secondary: function(e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = f[o];
                                return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), le({}, o, n);
                            }
                        };
                    return l.forEach(function(e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        f = fe({}, f, m[t](e));
                    }), e.offsets.popper = f, e;
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        o = t.popper,
                        n = t.reference,
                        i = e.placement.split('-')[0],
                        r = Z,
                        p = -1 !== ['top', 'bottom'].indexOf(i),
                        s = p ? 'right' : 'bottom',
                        d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e;
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, o) {
                    var n;
                    if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = o.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var r = e.placement.split('-')[0],
                        p = e.offsets,
                        s = p.popper,
                        d = p.reference,
                        a = -1 !== ['left', 'right'].indexOf(r),
                        l = a ? 'height' : 'width',
                        f = a ? 'Top' : 'Left',
                        m = f.toLowerCase(),
                        h = a ? 'left' : 'top',
                        c = a ? 'bottom' : 'right',
                        u = S(i)[l];
                    d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper);
                    var b = d[m] + d[l] / 2 - u / 2,
                        w = t(e.instance.popper),
                        y = parseFloat(w['margin' + f], 10),
                        E = parseFloat(w['border' + f + 'Width'], 10),
                        v = b - e.offsets.popper[m] - y - E;
                    return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, le(n, m, $(v)), le(n, h, ''), n), e;
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split('-')[0],
                        i = T(n),
                        r = e.placement.split('-')[1] || '',
                        p = [];
                    switch (t.behavior) {
                        case ge.FLIP:
                            p = [n, i];
                            break;
                        case ge.CLOCKWISE:
                            p = G(n);
                            break;
                        case ge.COUNTERCLOCKWISE:
                            p = G(n, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function(s, d) {
                        if (n !== s || p.length === d + 1) return e;
                        n = e.placement.split('-')[0], i = T(n);
                        var a = e.offsets.popper,
                            l = e.offsets.reference,
                            f = Z,
                            m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
                            h = f(a.left) < f(o.left),
                            c = f(a.right) > f(o.right),
                            g = f(a.top) < f(o.top),
                            u = f(a.bottom) > f(o.bottom),
                            b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
                            w = -1 !== ['top', 'bottom'].indexOf(n),
                            y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u);
                        (m || b || y) && (e.flipped = !0, (m || b) && (n = p[d + 1]), y && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = fe({}, e.offsets.popper, D(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip'));
                    }), e;
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = e.offsets,
                        i = n.popper,
                        r = n.reference,
                        p = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e;
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = C(e.instance.modifiers, function(e) {
                            return 'preventOverflow' === e.name;
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
                    }
                    return e;
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.x,
                        n = t.y,
                        i = e.offsets.popper,
                        r = C(e.instance.modifiers, function(e) {
                            return 'applyStyle' === e.name;
                        }).gpuAcceleration;
                    void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === r ? t.gpuAcceleration : r,
                        l = p(e.instance.popper),
                        f = u(l),
                        m = {
                            position: i.position
                        },
                        h = q(e, 2 > window.devicePixelRatio || !me),
                        c = 'bottom' === o ? 'top' : 'bottom',
                        g = 'right' === n ? 'left' : 'right',
                        b = H('transform');
                    if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform';
                    else {
                        var w = 'bottom' == c ? -1 : 1,
                            y = 'right' == g ? -1 : 1;
                        m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g;
                    }
                    var E = {
                        "x-placement": e.placement
                    };
                    return e.attributes = fe({}, E, e.attributes), e.styles = fe({}, m, e.styles), e.arrowStyles = fe({}, e.offsets.arrow, e.arrowStyles), e;
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return j(e.instance.popper, e.styles), V(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && j(e.arrowElement, e.arrowStyles), e;
                },
                onLoad: function(e, t, o, n, i) {
                    var r = L(i, t, e, o.positionFixed),
                        p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), j(t, {
                        position: o.positionFixed ? 'fixed' : 'absolute'
                    }), o;
                },
                gpuAcceleration: void 0
            }
        }
    }, ue;
});

/*!
 * Bootstrap v4.3.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper);
}(this, function(t, g, u) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t;
    }

    function l(o) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {},
                e = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(r).filter(function(t) {
                return Object.getOwnPropertyDescriptor(r, t).enumerable;
            }))), e.forEach(function(t) {
                var e, n, i;
                e = o, i = r[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i;
            });
        }
        return o;
    }
    g = g && g.hasOwnProperty("default") ? g.default : g, u = u && u.hasOwnProperty("default") ? u.default : u;
    var e = "transitionend";

    function n(t) {
        var e = this,
            n = !1;
        return g(this).one(_.TRANSITION_END, function() {
            n = !0;
        }), setTimeout(function() {
            n || _.triggerTransitionEnd(e);
        }, t), this;
    }
    var _ = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
            return t;
        },
        getSelectorFromElement: function(t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : "";
            }
            try {
                return document.querySelector(e) ? e : null;
            } catch (t) {
                return null;
            }
        },
        getTransitionDurationFromElement: function(t) {
            if (!t) return 0;
            var e = g(t).css("transition-duration"),
                n = g(t).css("transition-delay"),
                i = parseFloat(e),
                o = parseFloat(n);
            return i || o ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0;
        },
        reflow: function(t) {
            return t.offsetHeight;
        },
        triggerTransitionEnd: function(t) {
            g(t).trigger(e);
        },
        supportsTransitionEnd: function() {
            return Boolean(e);
        },
        isElement: function(t) {
            return (t[0] || t).nodeType;
        },
        typeCheckConfig: function(t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i],
                        r = e[i],
                        s = r && _.isElement(r) ? "element" : (a = r, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".');
                } var a;
        },
        findShadowRoot: function(t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? _.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null;
        }
    };
    g.fn.emulateTransitionEnd = n, g.event.special[_.TRANSITION_END] = {
        bindType: e,
        delegateType: e,
        handle: function(t) {
            if (g(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
        }
    };
    var o = "alert",
        r = "bs.alert",
        a = "." + r,
        c = g.fn[o],
        h = {
            CLOSE: "close" + a,
            CLOSED: "closed" + a,
            CLICK_DATA_API: "click" + a + ".data-api"
        },
        f = "alert",
        d = "fade",
        m = "show",
        p = function() {
            function i(t) {
                this._element = t;
            }
            var t = i.prototype;
            return t.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
            }, t.dispose = function() {
                g.removeData(this._element, r), this._element = null;
            }, t._getRootElement = function(t) {
                var e = _.getSelectorFromElement(t),
                    n = !1;
                return e && (n = document.querySelector(e)), n || (n = g(t).closest("." + f)[0]), n;
            }, t._triggerCloseEvent = function(t) {
                var e = g.Event(h.CLOSE);
                return g(t).trigger(e), e;
            }, t._removeElement = function(e) {
                var n = this;
                if (g(e).removeClass(m), g(e).hasClass(d)) {
                    var t = _.getTransitionDurationFromElement(e);
                    g(e).one(_.TRANSITION_END, function(t) {
                        return n._destroyElement(e, t);
                    }).emulateTransitionEnd(t);
                } else this._destroyElement(e);
            }, t._destroyElement = function(t) {
                g(t).detach().trigger(h.CLOSED).remove();
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(r);
                    e || (e = new i(this), t.data(r, e)), "close" === n && e[n](this);
                });
            }, i._handleDismiss = function(e) {
                return function(t) {
                    t && t.preventDefault(), e.close(this);
                };
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }]), i;
        }();
    g(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p())), g.fn[o] = p._jQueryInterface, g.fn[o].Constructor = p, g.fn[o].noConflict = function() {
        return g.fn[o] = c, p._jQueryInterface;
    };
    var v = "button",
        y = "bs.button",
        E = "." + y,
        C = ".data-api",
        T = g.fn[v],
        S = "active",
        b = "btn",
        I = "focus",
        D = '[data-toggle^="button"]',
        w = '[data-toggle="buttons"]',
        A = 'input:not([type="hidden"])',
        N = ".active",
        O = ".btn",
        k = {
            CLICK_DATA_API: "click" + E + C,
            FOCUS_BLUR_DATA_API: "focus" + E + C + " blur" + E + C
        },
        P = function() {
            function n(t) {
                this._element = t;
            }
            var t = n.prototype;
            return t.toggle = function() {
                var t = !0,
                    e = !0,
                    n = g(this._element).closest(w)[0];
                if (n) {
                    var i = this._element.querySelector(A);
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains(S)) t = !1;
                            else {
                                var o = n.querySelector(N);
                                o && g(o).removeClass(S);
                            } if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !this._element.classList.contains(S), g(i).trigger("change");
                        }
                        i.focus(), e = !1;
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(S)), t && g(this._element).toggleClass(S);
            }, t.dispose = function() {
                g.removeData(this._element, y), this._element = null;
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(y);
                    t || (t = new n(this), g(this).data(y, t)), "toggle" === e && t[e]();
                });
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }]), n;
        }();
    g(document).on(k.CLICK_DATA_API, D, function(t) {
        t.preventDefault();
        var e = t.target;
        g(e).hasClass(b) || (e = g(e).closest(O)), P._jQueryInterface.call(g(e), "toggle");
    }).on(k.FOCUS_BLUR_DATA_API, D, function(t) {
        var e = g(t.target).closest(O)[0];
        g(e).toggleClass(I, /^focus(in)?$/.test(t.type));
    }), g.fn[v] = P._jQueryInterface, g.fn[v].Constructor = P, g.fn[v].noConflict = function() {
        return g.fn[v] = T, P._jQueryInterface;
    };
    var L = "carousel",
        j = "bs.carousel",
        H = "." + j,
        R = ".data-api",
        x = g.fn[L],
        F = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        U = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        W = "next",
        q = "prev",
        M = "left",
        K = "right",
        Q = {
            SLIDE: "slide" + H,
            SLID: "slid" + H,
            KEYDOWN: "keydown" + H,
            MOUSEENTER: "mouseenter" + H,
            MOUSELEAVE: "mouseleave" + H,
            TOUCHSTART: "touchstart" + H,
            TOUCHMOVE: "touchmove" + H,
            TOUCHEND: "touchend" + H,
            POINTERDOWN: "pointerdown" + H,
            POINTERUP: "pointerup" + H,
            DRAG_START: "dragstart" + H,
            LOAD_DATA_API: "load" + H + R,
            CLICK_DATA_API: "click" + H + R
        },
        B = "carousel",
        V = "active",
        Y = "slide",
        z = "carousel-item-right",
        X = "carousel-item-left",
        $ = "carousel-item-next",
        G = "carousel-item-prev",
        J = "pointer-event",
        Z = ".active",
        tt = ".active.carousel-item",
        et = ".carousel-item",
        nt = ".carousel-item img",
        it = ".carousel-item-next, .carousel-item-prev",
        ot = ".carousel-indicators",
        rt = "[data-slide], [data-slide-to]",
        st = '[data-ride="carousel"]',
        at = {
            TOUCH: "touch",
            PEN: "pen"
        },
        lt = function() {
            function r(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(ot), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners();
            }
            var t = r.prototype;
            return t.next = function() {
                this._isSliding || this._slide(W);
            }, t.nextWhenVisible = function() {
                !document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next();
            }, t.prev = function() {
                this._isSliding || this._slide(q);
            }, t.pause = function(t) {
                t || (this._isPaused = !0), this._element.querySelector(it) && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
            }, t.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
            }, t.to = function(t) {
                var e = this;
                this._activeElement = this._element.querySelector(tt);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) g(this._element).one(Q.SLID, function() {
                        return e.to(t);
                    });
                    else {
                        if (n === t) return this.pause(), void this.cycle();
                        var i = n < t ? W : q;
                        this._slide(i, this._items[t]);
                    }
            }, t.dispose = function() {
                g(this._element).off(H), g.removeData(this._element, j), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
            }, t._getConfig = function(t) {
                return t = l({}, F, t), _.typeCheckConfig(L, t, U), t;
            }, t._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    0 < e && this.prev(), e < 0 && this.next();
                }
            }, t._addEventListeners = function() {
                var e = this;
                this._config.keyboard && g(this._element).on(Q.KEYDOWN, function(t) {
                    return e._keydown(t);
                }), "hover" === this._config.pause && g(this._element).on(Q.MOUSEENTER, function(t) {
                    return e.pause(t);
                }).on(Q.MOUSELEAVE, function(t) {
                    return e.cycle(t);
                }), this._config.touch && this._addTouchEventListeners();
            }, t._addTouchEventListeners = function() {
                var n = this;
                if (this._touchSupported) {
                    var e = function(t) {
                            n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX);
                        },
                        i = function(t) {
                            n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function(t) {
                                return n.cycle(t);
                            }, 500 + n._config.interval));
                        };
                    g(this._element.querySelectorAll(nt)).on(Q.DRAG_START, function(t) {
                        return t.preventDefault();
                    }), this._pointerEvent ? (g(this._element).on(Q.POINTERDOWN, function(t) {
                        return e(t);
                    }), g(this._element).on(Q.POINTERUP, function(t) {
                        return i(t);
                    }), this._element.classList.add(J)) : (g(this._element).on(Q.TOUCHSTART, function(t) {
                        return e(t);
                    }), g(this._element).on(Q.TOUCHMOVE, function(t) {
                        var e;
                        (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX;
                    }), g(this._element).on(Q.TOUCHEND, function(t) {
                        return i(t);
                    }));
                }
            }, t._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next();
                }
            }, t._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(et)) : [], this._items.indexOf(t);
            }, t._getItemByDirection = function(t, e) {
                var n = t === W,
                    i = t === q,
                    o = this._getItemIndex(e),
                    r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
                var s = (o + (t === q ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s];
            }, t._triggerSlideEvent = function(t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(this._element.querySelector(tt)),
                    o = g.Event(Q.SLIDE, {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n
                    });
                return g(this._element).trigger(o), o;
            }, t._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    var e = [].slice.call(this._indicatorsElement.querySelectorAll(Z));
                    g(e).removeClass(V);
                    var n = this._indicatorsElement.children[this._getItemIndex(t)];
                    n && g(n).addClass(V);
                }
            }, t._slide = function(t, e) {
                var n, i, o, r = this,
                    s = this._element.querySelector(tt),
                    a = this._getItemIndex(s),
                    l = e || s && this._getItemByDirection(t, s),
                    c = this._getItemIndex(l),
                    h = Boolean(this._interval);
                if (o = t === W ? (n = X, i = $, M) : (n = z, i = G, K), l && g(l).hasClass(V)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
                    var u = g.Event(Q.SLID, {
                        relatedTarget: l,
                        direction: o,
                        from: a,
                        to: c
                    });
                    if (g(this._element).hasClass(Y)) {
                        g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
                        var f = parseInt(l.getAttribute("data-interval"), 10);
                        this._config.interval = f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, f) : this._config.defaultInterval || this._config.interval;
                        var d = _.getTransitionDurationFromElement(s);
                        g(s).one(_.TRANSITION_END, function() {
                            g(l).removeClass(n + " " + i).addClass(V), g(s).removeClass(V + " " + i + " " + n), r._isSliding = !1, setTimeout(function() {
                                return g(r._element).trigger(u);
                            }, 0);
                        }).emulateTransitionEnd(d);
                    } else g(s).removeClass(V), g(l).addClass(V), this._isSliding = !1, g(this._element).trigger(u);
                    h && this.cycle();
                }
            }, r._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = g(this).data(j),
                        e = l({}, F, g(this).data());
                    "object" == typeof i && (e = l({}, e, i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new r(this, e), g(this).data(j, t)), "number" == typeof i) t.to(i);
                    else if ("string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]();
                    } else e.interval && e.ride && (t.pause(), t.cycle());
                });
            }, r._dataApiClickHandler = function(t) {
                var e = _.getSelectorFromElement(this);
                if (e) {
                    var n = g(e)[0];
                    if (n && g(n).hasClass(B)) {
                        var i = l({}, g(n).data(), g(this).data()),
                            o = this.getAttribute("data-slide-to");
                        o && (i.interval = !1), r._jQueryInterface.call(g(n), i), o && g(n).data(j).to(o), t.preventDefault();
                    }
                }
            }, s(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }, {
                key: "Default",
                get: function() {
                    return F;
                }
            }]), r;
        }();
    g(document).on(Q.CLICK_DATA_API, rt, lt._dataApiClickHandler), g(window).on(Q.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll(st)), e = 0, n = t.length; e < n; e++) {
            var i = g(t[e]);
            lt._jQueryInterface.call(i, i.data());
        }
    }), g.fn[L] = lt._jQueryInterface, g.fn[L].Constructor = lt, g.fn[L].noConflict = function() {
        return g.fn[L] = x, lt._jQueryInterface;
    };
    var ct = "collapse",
        ht = "bs.collapse",
        ut = "." + ht,
        ft = g.fn[ct],
        dt = {
            toggle: !0,
            parent: ""
        },
        gt = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        _t = {
            SHOW: "show" + ut,
            SHOWN: "shown" + ut,
            HIDE: "hide" + ut,
            HIDDEN: "hidden" + ut,
            CLICK_DATA_API: "click" + ut + ".data-api"
        },
        mt = "show",
        pt = "collapse",
        vt = "collapsing",
        yt = "collapsed",
        Et = "width",
        Ct = "height",
        Tt = ".show, .collapsing",
        St = '[data-toggle="collapse"]',
        bt = function() {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(St)), i = 0, o = n.length; i < o; i++) {
                    var r = n[i],
                        s = _.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function(t) {
                            return t === e;
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r));
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
            }
            var t = a.prototype;
            return t.toggle = function() {
                g(this._element).hasClass(mt) ? this.hide() : this.show();
            }, t.show = function() {
                var t, e, n = this;
                if (!this._isTransitioning && !g(this._element).hasClass(mt) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(Tt)).filter(function(t) {
                        return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(pt);
                    })).length && (t = null), !(t && (e = g(t).not(this._selector).data(ht)) && e._isTransitioning))) {
                    var i = g.Event(_t.SHOW);
                    if (g(this._element).trigger(i), !i.isDefaultPrevented()) {
                        t && (a._jQueryInterface.call(g(t).not(this._selector), "hide"), e || g(t).data(ht, null));
                        var o = this._getDimension();
                        g(this._element).removeClass(pt).addClass(vt), this._element.style[o] = 0, this._triggerArray.length && g(this._triggerArray).removeClass(yt).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                            s = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function() {
                            g(n._element).removeClass(vt).addClass(pt).addClass(mt), n._element.style[o] = "", n.setTransitioning(!1), g(n._element).trigger(_t.SHOWN);
                        }).emulateTransitionEnd(s), this._element.style[o] = this._element[r] + "px";
                    }
                }
            }, t.hide = function() {
                var t = this;
                if (!this._isTransitioning && g(this._element).hasClass(mt)) {
                    var e = g.Event(_t.HIDE);
                    if (g(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", _.reflow(this._element), g(this._element).addClass(vt).removeClass(pt).removeClass(mt);
                        var i = this._triggerArray.length;
                        if (0 < i)
                            for (var o = 0; o < i; o++) {
                                var r = this._triggerArray[o],
                                    s = _.getSelectorFromElement(r);
                                if (null !== s) g([].slice.call(document.querySelectorAll(s))).hasClass(mt) || g(r).addClass(yt).attr("aria-expanded", !1);
                            }
                        this.setTransitioning(!0);
                        this._element.style[n] = "";
                        var a = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function() {
                            t.setTransitioning(!1), g(t._element).removeClass(vt).addClass(pt).trigger(_t.HIDDEN);
                        }).emulateTransitionEnd(a);
                    }
                }
            }, t.setTransitioning = function(t) {
                this._isTransitioning = t;
            }, t.dispose = function() {
                g.removeData(this._element, ht), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
            }, t._getConfig = function(t) {
                return (t = l({}, dt, t)).toggle = Boolean(t.toggle), _.typeCheckConfig(ct, t, gt), t;
            }, t._getDimension = function() {
                return g(this._element).hasClass(Et) ? Et : Ct;
            }, t._getParent = function() {
                var t, n = this;
                _.isElement(this._config.parent) ? (t = this._config.parent, "undefined" != typeof this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    i = [].slice.call(t.querySelectorAll(e));
                return g(i).each(function(t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e]);
                }), t;
            }, t._addAriaAndCollapsedClass = function(t, e) {
                var n = g(t).hasClass(mt);
                e.length && g(e).toggleClass(yt, !n).attr("aria-expanded", n);
            }, a._getTargetFromElement = function(t) {
                var e = _.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null;
            }, a._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(ht),
                        n = l({}, dt, t.data(), "object" == typeof i && i ? i : {});
                    if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(ht, e)), "string" == typeof i) {
                        if ("undefined" == typeof e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]();
                    }
                });
            }, s(a, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }, {
                key: "Default",
                get: function() {
                    return dt;
                }
            }]), a;
        }();
    g(document).on(_t.CLICK_DATA_API, St, function(t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = g(this),
            e = _.getSelectorFromElement(this),
            i = [].slice.call(document.querySelectorAll(e));
        g(i).each(function() {
            var t = g(this),
                e = t.data(ht) ? "toggle" : n.data();
            bt._jQueryInterface.call(t, e);
        });
    }), g.fn[ct] = bt._jQueryInterface, g.fn[ct].Constructor = bt, g.fn[ct].noConflict = function() {
        return g.fn[ct] = ft, bt._jQueryInterface;
    };
    var It = "dropdown",
        Dt = "bs.dropdown",
        wt = "." + Dt,
        At = ".data-api",
        Nt = g.fn[It],
        Ot = new RegExp("38|40|27"),
        kt = {
            HIDE: "hide" + wt,
            HIDDEN: "hidden" + wt,
            SHOW: "show" + wt,
            SHOWN: "shown" + wt,
            CLICK: "click" + wt,
            CLICK_DATA_API: "click" + wt + At,
            KEYDOWN_DATA_API: "keydown" + wt + At,
            KEYUP_DATA_API: "keyup" + wt + At
        },
        Pt = "disabled",
        Lt = "show",
        jt = "dropup",
        Ht = "dropright",
        Rt = "dropleft",
        xt = "dropdown-menu-right",
        Ft = "position-static",
        Ut = '[data-toggle="dropdown"]',
        Wt = ".dropdown form",
        qt = ".dropdown-menu",
        Mt = ".navbar-nav",
        Kt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        Qt = "top-start",
        Bt = "top-end",
        Vt = "bottom-start",
        Yt = "bottom-end",
        zt = "right-start",
        Xt = "left-start",
        $t = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        Gt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        Jt = function() {
            function c(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
            }
            var t = c.prototype;
            return t.toggle = function() {
                if (!this._element.disabled && !g(this._element).hasClass(Pt)) {
                    var t = c._getParentFromElement(this._element),
                        e = g(this._menu).hasClass(Lt);
                    if (c._clearMenus(), !e) {
                        var n = {
                                relatedTarget: this._element
                            },
                            i = g.Event(kt.SHOW, n);
                        if (g(t).trigger(i), !i.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if ("undefined" == typeof u) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var o = this._element;
                                "parent" === this._config.reference ? o = t : _.isElement(this._config.reference) && (o = this._config.reference, "undefined" != typeof this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && g(t).addClass(Ft), this._popper = new u(o, this._menu, this._getPopperConfig());
                            }
                            "ontouchstart" in document.documentElement && 0 === g(t).closest(Mt).length && g(document.body).children().on("mouseover", null, g.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), g(this._menu).toggleClass(Lt), g(t).toggleClass(Lt).trigger(g.Event(kt.SHOWN, n));
                        }
                    }
                }
            }, t.show = function() {
                if (!(this._element.disabled || g(this._element).hasClass(Pt) || g(this._menu).hasClass(Lt))) {
                    var t = {
                            relatedTarget: this._element
                        },
                        e = g.Event(kt.SHOW, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt), g(n).toggleClass(Lt).trigger(g.Event(kt.SHOWN, t)));
                }
            }, t.hide = function() {
                if (!this._element.disabled && !g(this._element).hasClass(Pt) && g(this._menu).hasClass(Lt)) {
                    var t = {
                            relatedTarget: this._element
                        },
                        e = g.Event(kt.HIDE, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt), g(n).toggleClass(Lt).trigger(g.Event(kt.HIDDEN, t)));
                }
            }, t.dispose = function() {
                g.removeData(this._element, Dt), g(this._element).off(wt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null);
            }, t.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
            }, t._addEventListeners = function() {
                var e = this;
                g(this._element).on(kt.CLICK, function(t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle();
                });
            }, t._getConfig = function(t) {
                return t = l({}, this.constructor.Default, g(this._element).data(), t), _.typeCheckConfig(It, t, this.constructor.DefaultType), t;
            }, t._getMenuElement = function() {
                if (!this._menu) {
                    var t = c._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(qt));
                }
                return this._menu;
            }, t._getPlacement = function() {
                var t = g(this._element.parentNode),
                    e = Vt;
                return t.hasClass(jt) ? (e = Qt, g(this._menu).hasClass(xt) && (e = Bt)) : t.hasClass(Ht) ? e = zt : t.hasClass(Rt) ? e = Xt : g(this._menu).hasClass(xt) && (e = Yt), e;
            }, t._detectNavbar = function() {
                return 0 < g(this._element).closest(".navbar").length;
            }, t._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this._config.offset ? t.fn = function(t) {
                    return t.offsets = l({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t;
                } : t.offset = this._config.offset, t;
            }, t._getPopperConfig = function() {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), t;
            }, c._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(Dt);
                    if (t || (t = new c(this, "object" == typeof e ? e : null), g(this).data(Dt, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]();
                    }
                });
            }, c._clearMenus = function(t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var e = [].slice.call(document.querySelectorAll(Ut)), n = 0, i = e.length; n < i; n++) {
                        var o = c._getParentFromElement(e[n]),
                            r = g(e[n]).data(Dt),
                            s = {
                                relatedTarget: e[n]
                            };
                        if (t && "click" === t.type && (s.clickEvent = t), r) {
                            var a = r._menu;
                            if (g(o).hasClass(Lt) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && g.contains(o, t.target))) {
                                var l = g.Event(kt.HIDE, s);
                                g(o).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), e[n].setAttribute("aria-expanded", "false"), g(a).removeClass(Lt), g(o).removeClass(Lt).trigger(g.Event(kt.HIDDEN, s)));
                            }
                        }
                    }
            }, c._getParentFromElement = function(t) {
                var e, n = _.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode;
            }, c._dataApiKeydownHandler = function(t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || g(t.target).closest(qt).length)) : Ot.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !g(this).hasClass(Pt))) {
                    var e = c._getParentFromElement(this),
                        n = g(e).hasClass(Lt);
                    if (n && (!n || 27 !== t.which && 32 !== t.which)) {
                        var i = [].slice.call(e.querySelectorAll(Kt));
                        if (0 !== i.length) {
                            var o = i.indexOf(t.target);
                            38 === t.which && 0 < o && o--, 40 === t.which && o < i.length - 1 && o++, o < 0 && (o = 0), i[o].focus();
                        }
                    } else {
                        if (27 === t.which) {
                            var r = e.querySelector(Ut);
                            g(r).trigger("focus");
                        }
                        g(this).trigger("click");
                    }
                }
            }, s(c, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }, {
                key: "Default",
                get: function() {
                    return $t;
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Gt;
                }
            }]), c;
        }();
    g(document).on(kt.KEYDOWN_DATA_API, Ut, Jt._dataApiKeydownHandler).on(kt.KEYDOWN_DATA_API, qt, Jt._dataApiKeydownHandler).on(kt.CLICK_DATA_API + " " + kt.KEYUP_DATA_API, Jt._clearMenus).on(kt.CLICK_DATA_API, Ut, function(t) {
        t.preventDefault(), t.stopPropagation(), Jt._jQueryInterface.call(g(this), "toggle");
    }).on(kt.CLICK_DATA_API, Wt, function(t) {
        t.stopPropagation();
    }), g.fn[It] = Jt._jQueryInterface, g.fn[It].Constructor = Jt, g.fn[It].noConflict = function() {
        return g.fn[It] = Nt, Jt._jQueryInterface;
    };
    var Zt = "modal",
        te = "bs.modal",
        ee = "." + te,
        ne = g.fn[Zt],
        ie = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        oe = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        re = {
            HIDE: "hide" + ee,
            HIDDEN: "hidden" + ee,
            SHOW: "show" + ee,
            SHOWN: "shown" + ee,
            FOCUSIN: "focusin" + ee,
            RESIZE: "resize" + ee,
            CLICK_DISMISS: "click.dismiss" + ee,
            KEYDOWN_DISMISS: "keydown.dismiss" + ee,
            MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
            CLICK_DATA_API: "click" + ee + ".data-api"
        },
        se = "modal-dialog-scrollable",
        ae = "modal-scrollbar-measure",
        le = "modal-backdrop",
        ce = "modal-open",
        he = "fade",
        ue = "show",
        fe = ".modal-dialog",
        de = ".modal-body",
        ge = '[data-toggle="modal"]',
        _e = '[data-dismiss="modal"]',
        me = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        pe = ".sticky-top",
        ve = function() {
            function o(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(fe), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0;
            }
            var t = o.prototype;
            return t.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t);
            }, t.show = function(t) {
                var e = this;
                if (!this._isShown && !this._isTransitioning) {
                    g(this._element).hasClass(he) && (this._isTransitioning = !0);
                    var n = g.Event(re.SHOW, {
                        relatedTarget: t
                    });
                    g(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), g(this._element).on(re.CLICK_DISMISS, _e, function(t) {
                        return e.hide(t);
                    }), g(this._dialog).on(re.MOUSEDOWN_DISMISS, function() {
                        g(e._element).one(re.MOUSEUP_DISMISS, function(t) {
                            g(t.target).is(e._element) && (e._ignoreBackdropClick = !0);
                        });
                    }), this._showBackdrop(function() {
                        return e._showElement(t);
                    }));
                }
            }, t.hide = function(t) {
                var e = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var n = g.Event(re.HIDE);
                    if (g(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var i = g(this._element).hasClass(he);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), g(document).off(re.FOCUSIN), g(this._element).removeClass(ue), g(this._element).off(re.CLICK_DISMISS), g(this._dialog).off(re.MOUSEDOWN_DISMISS), i) {
                            var o = _.getTransitionDurationFromElement(this._element);
                            g(this._element).one(_.TRANSITION_END, function(t) {
                                return e._hideModal(t);
                            }).emulateTransitionEnd(o);
                        } else this._hideModal();
                    }
                }
            }, t.dispose = function() {
                [window, this._element, this._dialog].forEach(function(t) {
                    return g(t).off(ee);
                }), g(document).off(re.FOCUSIN), g.removeData(this._element, te), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
            }, t.handleUpdate = function() {
                this._adjustDialog();
            }, t._getConfig = function(t) {
                return t = l({}, ie, t), _.typeCheckConfig(Zt, t, oe), t;
            }, t._showElement = function(t) {
                var e = this,
                    n = g(this._element).hasClass(he);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), g(this._dialog).hasClass(se) ? this._dialog.querySelector(de).scrollTop = 0 : this._element.scrollTop = 0, n && _.reflow(this._element), g(this._element).addClass(ue), this._config.focus && this._enforceFocus();
                var i = g.Event(re.SHOWN, {
                        relatedTarget: t
                    }),
                    o = function() {
                        e._config.focus && e._element.focus(), e._isTransitioning = !1, g(e._element).trigger(i);
                    };
                if (n) {
                    var r = _.getTransitionDurationFromElement(this._dialog);
                    g(this._dialog).one(_.TRANSITION_END, o).emulateTransitionEnd(r);
                } else o();
            }, t._enforceFocus = function() {
                var e = this;
                g(document).off(re.FOCUSIN).on(re.FOCUSIN, function(t) {
                    document !== t.target && e._element !== t.target && 0 === g(e._element).has(t.target).length && e._element.focus();
                });
            }, t._setEscapeEvent = function() {
                var e = this;
                this._isShown && this._config.keyboard ? g(this._element).on(re.KEYDOWN_DISMISS, function(t) {
                    27 === t.which && (t.preventDefault(), e.hide());
                }) : this._isShown || g(this._element).off(re.KEYDOWN_DISMISS);
            }, t._setResizeEvent = function() {
                var e = this;
                this._isShown ? g(window).on(re.RESIZE, function(t) {
                    return e.handleUpdate(t);
                }) : g(window).off(re.RESIZE);
            }, t._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
                    g(document.body).removeClass(ce), t._resetAdjustments(), t._resetScrollbar(), g(t._element).trigger(re.HIDDEN);
                });
            }, t._removeBackdrop = function() {
                this._backdrop && (g(this._backdrop).remove(), this._backdrop = null);
            }, t._showBackdrop = function(t) {
                var e = this,
                    n = g(this._element).hasClass(he) ? he : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = le, n && this._backdrop.classList.add(n), g(this._backdrop).appendTo(document.body), g(this._element).on(re.CLICK_DISMISS, function(t) {
                            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide());
                        }), n && _.reflow(this._backdrop), g(this._backdrop).addClass(ue), !t) return;
                    if (!n) return void t();
                    var i = _.getTransitionDurationFromElement(this._backdrop);
                    g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i);
                } else if (!this._isShown && this._backdrop) {
                    g(this._backdrop).removeClass(ue);
                    var o = function() {
                        e._removeBackdrop(), t && t();
                    };
                    if (g(this._element).hasClass(he)) {
                        var r = _.getTransitionDurationFromElement(this._backdrop);
                        g(this._backdrop).one(_.TRANSITION_END, o).emulateTransitionEnd(r);
                    } else o();
                } else t && t();
            }, t._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
            }, t._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
            }, t._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
            }, t._setScrollbar = function() {
                var o = this;
                if (this._isBodyOverflowing) {
                    var t = [].slice.call(document.querySelectorAll(me)),
                        e = [].slice.call(document.querySelectorAll(pe));
                    g(t).each(function(t, e) {
                        var n = e.style.paddingRight,
                            i = g(e).css("padding-right");
                        g(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px");
                    }), g(e).each(function(t, e) {
                        var n = e.style.marginRight,
                            i = g(e).css("margin-right");
                        g(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px");
                    });
                    var n = document.body.style.paddingRight,
                        i = g(document.body).css("padding-right");
                    g(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px");
                }
                g(document.body).addClass(ce);
            }, t._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(me));
                g(t).each(function(t, e) {
                    var n = g(e).data("padding-right");
                    g(e).removeData("padding-right"), e.style.paddingRight = n || "";
                });
                var e = [].slice.call(document.querySelectorAll("" + pe));
                g(e).each(function(t, e) {
                    var n = g(e).data("margin-right");
                    "undefined" != typeof n && g(e).css("margin-right", n).removeData("margin-right");
                });
                var n = g(document.body).data("padding-right");
                g(document.body).removeData("padding-right"), document.body.style.paddingRight = n || "";
            }, t._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = ae, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e;
            }, o._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var t = g(this).data(te),
                        e = l({}, ie, g(this).data(), "object" == typeof n && n ? n : {});
                    if (t || (t = new o(this, e), g(this).data(te, t)), "string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](i);
                    } else e.show && t.show(i);
                });
            }, s(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }, {
                key: "Default",
                get: function() {
                    return ie;
                }
            }]), o;
        }();
    g(document).on(re.CLICK_DATA_API, ge, function(t) {
        var e, n = this,
            i = _.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var o = g(e).data(te) ? "toggle" : l({}, g(e).data(), g(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var r = g(e).one(re.SHOW, function(t) {
            t.isDefaultPrevented() || r.one(re.HIDDEN, function() {
                g(n).is(":visible") && n.focus();
            });
        });
        ve._jQueryInterface.call(g(e), o, this);
    }), g.fn[Zt] = ve._jQueryInterface, g.fn[Zt].Constructor = ve, g.fn[Zt].noConflict = function() {
        return g.fn[Zt] = ne, ve._jQueryInterface;
    };
    var ye = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Ee = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        Ce = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Te = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function Se(t, s, e) {
        if (0 === t.length) return t;
        if (e && "function" == typeof e) return e(t);
        for (var n = new window.DOMParser().parseFromString(t, "text/html"), a = Object.keys(s), l = [].slice.call(n.body.querySelectorAll("*")), i = function(t, e) {
                var n = l[t],
                    i = n.nodeName.toLowerCase();
                if (-1 === a.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
                var o = [].slice.call(n.attributes),
                    r = [].concat(s["*"] || [], s[i] || []);
                o.forEach(function(t) {
                    (function(t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n)) return -1 === ye.indexOf(n) || Boolean(t.nodeValue.match(Ce) || t.nodeValue.match(Te));
                        for (var i = e.filter(function(t) {
                                return t instanceof RegExp;
                            }), o = 0, r = i.length; o < r; o++)
                            if (n.match(i[o])) return !0;
                        return !1;
                    })(t, r) || n.removeAttribute(t.nodeName);
                });
            }, o = 0, r = l.length; o < r; o++) i(o);
        return n.body.innerHTML;
    }
    var be = "tooltip",
        Ie = "bs.tooltip",
        De = "." + Ie,
        we = g.fn[be],
        Ae = "bs-tooltip",
        Ne = new RegExp("(^|\\s)" + Ae + "\\S+", "g"),
        Oe = ["sanitize", "whiteList", "sanitizeFn"],
        ke = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        Pe = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Le = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Ee
        },
        je = "show",
        He = "out",
        Re = {
            HIDE: "hide" + De,
            HIDDEN: "hidden" + De,
            SHOW: "show" + De,
            SHOWN: "shown" + De,
            INSERTED: "inserted" + De,
            CLICK: "click" + De,
            FOCUSIN: "focusin" + De,
            FOCUSOUT: "focusout" + De,
            MOUSEENTER: "mouseenter" + De,
            MOUSELEAVE: "mouseleave" + De
        },
        xe = "fade",
        Fe = "show",
        Ue = ".tooltip-inner",
        We = ".arrow",
        qe = "hover",
        Me = "focus",
        Ke = "click",
        Qe = "manual",
        Be = function() {
            function i(t, e) {
                if ("undefined" == typeof u) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners();
            }
            var t = i.prototype;
            return t.enable = function() {
                this._isEnabled = !0;
            }, t.disable = function() {
                this._isEnabled = !1;
            }, t.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled;
            }, t.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = g(t.currentTarget).data(e);
                        n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
                    } else {
                        if (g(this.getTipElement()).hasClass(Fe)) return void this._leave(null, this);
                        this._enter(null, this);
                    }
            }, t.dispose = function() {
                clearTimeout(this._timeout), g.removeData(this.element, this.constructor.DATA_KEY), g(this.element).off(this.constructor.EVENT_KEY), g(this.element).closest(".modal").off("hide.bs.modal"), this.tip && g(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
            }, t.show = function() {
                var e = this;
                if ("none" === g(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = g.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    g(this.element).trigger(t);
                    var n = _.findShadowRoot(this.element),
                        i = g.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !i) return;
                    var o = this.getTipElement(),
                        r = _.getUID(this.constructor.NAME);
                    o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && g(o).addClass(xe);
                    var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                        a = this._getAttachment(s);
                    this.addAttachmentClass(a);
                    var l = this._getContainer();
                    g(o).data(this.constructor.DATA_KEY, this), g.contains(this.element.ownerDocument.documentElement, this.tip) || g(o).appendTo(l), g(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new u(this.element, o, {
                        placement: a,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: We
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
                        },
                        onUpdate: function(t) {
                            return e._handlePopperPlacementChange(t);
                        }
                    }), g(o).addClass(Fe), "ontouchstart" in document.documentElement && g(document.body).children().on("mouseover", null, g.noop);
                    var c = function() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, g(e.element).trigger(e.constructor.Event.SHOWN), t === He && e._leave(null, e);
                    };
                    if (g(this.tip).hasClass(xe)) {
                        var h = _.getTransitionDurationFromElement(this.tip);
                        g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h);
                    } else c();
                }
            }, t.hide = function(t) {
                var e = this,
                    n = this.getTipElement(),
                    i = g.Event(this.constructor.Event.HIDE),
                    o = function() {
                        e._hoverState !== je && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), g(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t();
                    };
                if (g(this.element).trigger(i), !i.isDefaultPrevented()) {
                    if (g(n).removeClass(Fe), "ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), this._activeTrigger[Ke] = !1, this._activeTrigger[Me] = !1, this._activeTrigger[qe] = !1, g(this.tip).hasClass(xe)) {
                        var r = _.getTransitionDurationFromElement(n);
                        g(n).one(_.TRANSITION_END, o).emulateTransitionEnd(r);
                    } else o();
                    this._hoverState = "";
                }
            }, t.update = function() {
                null !== this._popper && this._popper.scheduleUpdate();
            }, t.isWithContent = function() {
                return Boolean(this.getTitle());
            }, t.addAttachmentClass = function(t) {
                g(this.getTipElement()).addClass(Ae + "-" + t);
            }, t.getTipElement = function() {
                return this.tip = this.tip || g(this.config.template)[0], this.tip;
            }, t.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(g(t.querySelectorAll(Ue)), this.getTitle()), g(t).removeClass(xe + " " + Fe);
            }, t.setElementContent = function(t, e) {
                "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = Se(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? g(e).parent().is(t) || t.empty().append(e) : t.text(g(e).text());
            }, t.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
            }, t._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this.config.offset ? t.fn = function(t) {
                    return t.offsets = l({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t;
                } : t.offset = this.config.offset, t;
            }, t._getContainer = function() {
                return !1 === this.config.container ? document.body : _.isElement(this.config.container) ? g(this.config.container) : g(document).find(this.config.container);
            }, t._getAttachment = function(t) {
                return Pe[t.toUpperCase()];
            }, t._setListeners = function() {
                var i = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    if ("click" === t) g(i.element).on(i.constructor.Event.CLICK, i.config.selector, function(t) {
                        return i.toggle(t);
                    });
                    else if (t !== Qe) {
                        var e = t === qe ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                            n = t === qe ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                        g(i.element).on(e, i.config.selector, function(t) {
                            return i._enter(t);
                        }).on(n, i.config.selector, function(t) {
                            return i._leave(t);
                        });
                    }
                }), g(this.element).closest(".modal").on("hide.bs.modal", function() {
                    i.element && i.hide();
                }), this.config.selector ? this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle();
            }, t._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
            }, t._enter = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Me : qe] = !0), g(e.getTipElement()).hasClass(Fe) || e._hoverState === je ? e._hoverState = je : (clearTimeout(e._timeout), e._hoverState = je, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                    e._hoverState === je && e.show();
                }, e.config.delay.show) : e.show());
            }, t._leave = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Me : qe] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = He, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                    e._hoverState === He && e.hide();
                }, e.config.delay.hide) : e.hide());
            }, t._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1;
            }, t._getConfig = function(t) {
                var e = g(this.element).data();
                return Object.keys(e).forEach(function(t) {
                    -1 !== Oe.indexOf(t) && delete e[t];
                }), "number" == typeof(t = l({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), _.typeCheckConfig(be, t, this.constructor.DefaultType), t.sanitize && (t.template = Se(t.template, t.whiteList, t.sanitizeFn)), t;
            }, t._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t;
            }, t._cleanTipClass = function() {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(Ne);
                null !== e && e.length && t.removeClass(e.join(""));
            }, t._handlePopperPlacementChange = function(t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
            }, t._fixTransition = function() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (g(t).removeClass(xe), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e);
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this).data(Ie),
                        e = "object" == typeof n && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(Ie, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]();
                    }
                });
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }, {
                key: "Default",
                get: function() {
                    return Le;
                }
            }, {
                key: "NAME",
                get: function() {
                    return be;
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Ie;
                }
            }, {
                key: "Event",
                get: function() {
                    return Re;
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return De;
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return ke;
                }
            }]), i;
        }();
    g.fn[be] = Be._jQueryInterface, g.fn[be].Constructor = Be, g.fn[be].noConflict = function() {
        return g.fn[be] = we, Be._jQueryInterface;
    };
    var Ve = "popover",
        Ye = "bs.popover",
        ze = "." + Ye,
        Xe = g.fn[Ve],
        $e = "bs-popover",
        Ge = new RegExp("(^|\\s)" + $e + "\\S+", "g"),
        Je = l({}, Be.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        Ze = l({}, Be.DefaultType, {
            content: "(string|element|function)"
        }),
        tn = "fade",
        en = "show",
        nn = ".popover-header",
        on = ".popover-body",
        rn = {
            HIDE: "hide" + ze,
            HIDDEN: "hidden" + ze,
            SHOW: "show" + ze,
            SHOWN: "shown" + ze,
            INSERTED: "inserted" + ze,
            CLICK: "click" + ze,
            FOCUSIN: "focusin" + ze,
            FOCUSOUT: "focusout" + ze,
            MOUSEENTER: "mouseenter" + ze,
            MOUSELEAVE: "mouseleave" + ze
        },
        sn = function(t) {
            var e, n;

            function i() {
                return t.apply(this, arguments) || this;
            }
            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var o = i.prototype;
            return o.isWithContent = function() {
                return this.getTitle() || this._getContent();
            }, o.addAttachmentClass = function(t) {
                g(this.getTipElement()).addClass($e + "-" + t);
            }, o.getTipElement = function() {
                return this.tip = this.tip || g(this.config.template)[0], this.tip;
            }, o.setContent = function() {
                var t = g(this.getTipElement());
                this.setElementContent(t.find(nn), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(on), e), t.removeClass(tn + " " + en);
            }, o._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content;
            }, o._cleanTipClass = function() {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(Ge);
                null !== e && 0 < e.length && t.removeClass(e.join(""));
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this).data(Ye),
                        e = "object" == typeof n ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(Ye, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]();
                    }
                });
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }, {
                key: "Default",
                get: function() {
                    return Je;
                }
            }, {
                key: "NAME",
                get: function() {
                    return Ve;
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Ye;
                }
            }, {
                key: "Event",
                get: function() {
                    return rn;
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return ze;
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Ze;
                }
            }]), i;
        }(Be);
    g.fn[Ve] = sn._jQueryInterface, g.fn[Ve].Constructor = sn, g.fn[Ve].noConflict = function() {
        return g.fn[Ve] = Xe, sn._jQueryInterface;
    };
    var an = "scrollspy",
        ln = "bs.scrollspy",
        cn = "." + ln,
        hn = g.fn[an],
        un = {
            offset: 10,
            method: "auto",
            target: ""
        },
        fn = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        dn = {
            ACTIVATE: "activate" + cn,
            SCROLL: "scroll" + cn,
            LOAD_DATA_API: "load" + cn + ".data-api"
        },
        gn = "dropdown-item",
        _n = "active",
        mn = '[data-spy="scroll"]',
        pn = ".nav, .list-group",
        vn = ".nav-link",
        yn = ".nav-item",
        En = ".list-group-item",
        Cn = ".dropdown",
        Tn = ".dropdown-item",
        Sn = ".dropdown-toggle",
        bn = "offset",
        In = "position",
        Dn = function() {
            function n(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + vn + "," + this._config.target + " " + En + "," + this._config.target + " " + Tn, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, g(this._scrollElement).on(dn.SCROLL, function(t) {
                    return n._process(t);
                }), this.refresh(), this._process();
            }
            var t = n.prototype;
            return t.refresh = function() {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? bn : In,
                    o = "auto" === this._config.method ? t : this._config.method,
                    r = o === In ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                    var e, n = _.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height) return [g(e)[o]().top + r, n];
                    }
                    return null;
                }).filter(function(t) {
                    return t;
                }).sort(function(t, e) {
                    return t[0] - e[0];
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1]);
                });
            }, t.dispose = function() {
                g.removeData(this._element, ln), g(this._scrollElement).off(cn), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
            }, t._getConfig = function(t) {
                if ("string" != typeof(t = l({}, un, "object" == typeof t && t ? t : {})).target) {
                    var e = g(t.target).attr("id");
                    e || (e = _.getUID(an), g(t.target).attr("id", e)), t.target = "#" + e;
                }
                return _.typeCheckConfig(an, t, fn), t;
            }, t._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
            }, t._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            }, t._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
            }, t._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i);
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
                    }
                }
            }, t._activate = function(e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",").map(function(t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
                    }),
                    n = g([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass(gn) ? (n.closest(Cn).find(Sn).addClass(_n), n.addClass(_n)) : (n.addClass(_n), n.parents(pn).prev(vn + ", " + En).addClass(_n), n.parents(pn).prev(yn).children(vn).addClass(_n)), g(this._scrollElement).trigger(dn.ACTIVATE, {
                    relatedTarget: e
                });
            }, t._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(t) {
                    return t.classList.contains(_n);
                }).forEach(function(t) {
                    return t.classList.remove(_n);
                });
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(ln);
                    if (t || (t = new n(this, "object" == typeof e && e), g(this).data(ln, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]();
                    }
                });
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }, {
                key: "Default",
                get: function() {
                    return un;
                }
            }]), n;
        }();
    g(window).on(dn.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll(mn)), e = t.length; e--;) {
            var n = g(t[e]);
            Dn._jQueryInterface.call(n, n.data());
        }
    }), g.fn[an] = Dn._jQueryInterface, g.fn[an].Constructor = Dn, g.fn[an].noConflict = function() {
        return g.fn[an] = hn, Dn._jQueryInterface;
    };
    var wn = "bs.tab",
        An = "." + wn,
        Nn = g.fn.tab,
        On = {
            HIDE: "hide" + An,
            HIDDEN: "hidden" + An,
            SHOW: "show" + An,
            SHOWN: "shown" + An,
            CLICK_DATA_API: "click" + An + ".data-api"
        },
        kn = "dropdown-menu",
        Pn = "active",
        Ln = "disabled",
        jn = "fade",
        Hn = "show",
        Rn = ".dropdown",
        xn = ".nav, .list-group",
        Fn = ".active",
        Un = "> li > .active",
        Wn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        qn = ".dropdown-toggle",
        Mn = "> .dropdown-menu .active",
        Kn = function() {
            function i(t) {
                this._element = t;
            }
            var t = i.prototype;
            return t.show = function() {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && g(this._element).hasClass(Pn) || g(this._element).hasClass(Ln))) {
                    var t, i, e = g(this._element).closest(xn)[0],
                        o = _.getSelectorFromElement(this._element);
                    if (e) {
                        var r = "UL" === e.nodeName || "OL" === e.nodeName ? Un : Fn;
                        i = (i = g.makeArray(g(e).find(r)))[i.length - 1];
                    }
                    var s = g.Event(On.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = g.Event(On.SHOW, {
                            relatedTarget: i
                        });
                    if (i && g(i).trigger(s), g(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        o && (t = document.querySelector(o)), this._activate(this._element, e);
                        var l = function() {
                            var t = g.Event(On.HIDDEN, {
                                    relatedTarget: n._element
                                }),
                                e = g.Event(On.SHOWN, {
                                    relatedTarget: i
                                });
                            g(i).trigger(t), g(n._element).trigger(e);
                        };
                        t ? this._activate(t, t.parentNode, l) : l();
                    }
                }
            }, t.dispose = function() {
                g.removeData(this._element, wn), this._element = null;
            }, t._activate = function(t, e, n) {
                var i = this,
                    o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? g(e).children(Fn) : g(e).find(Un))[0],
                    r = n && o && g(o).hasClass(jn),
                    s = function() {
                        return i._transitionComplete(t, o, n);
                    };
                if (o && r) {
                    var a = _.getTransitionDurationFromElement(o);
                    g(o).removeClass(Hn).one(_.TRANSITION_END, s).emulateTransitionEnd(a);
                } else s();
            }, t._transitionComplete = function(t, e, n) {
                if (e) {
                    g(e).removeClass(Pn);
                    var i = g(e.parentNode).find(Mn)[0];
                    i && g(i).removeClass(Pn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1);
                }
                if (g(t).addClass(Pn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), _.reflow(t), t.classList.contains(jn) && t.classList.add(Hn), t.parentNode && g(t.parentNode).hasClass(kn)) {
                    var o = g(t).closest(Rn)[0];
                    if (o) {
                        var r = [].slice.call(o.querySelectorAll(qn));
                        g(r).addClass(Pn);
                    }
                    t.setAttribute("aria-expanded", !0);
                }
                n && n();
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(wn);
                    if (e || (e = new i(this), t.data(wn, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]();
                    }
                });
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }]), i;
        }();
    g(document).on(On.CLICK_DATA_API, Wn, function(t) {
        t.preventDefault(), Kn._jQueryInterface.call(g(this), "show");
    }), g.fn.tab = Kn._jQueryInterface, g.fn.tab.Constructor = Kn, g.fn.tab.noConflict = function() {
        return g.fn.tab = Nn, Kn._jQueryInterface;
    };
    var Qn = "toast",
        Bn = "bs.toast",
        Vn = "." + Bn,
        Yn = g.fn[Qn],
        zn = {
            CLICK_DISMISS: "click.dismiss" + Vn,
            HIDE: "hide" + Vn,
            HIDDEN: "hidden" + Vn,
            SHOW: "show" + Vn,
            SHOWN: "shown" + Vn
        },
        Xn = "fade",
        $n = "hide",
        Gn = "show",
        Jn = "showing",
        Zn = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        ti = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        ei = '[data-dismiss="toast"]',
        ni = function() {
            function i(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners();
            }
            var t = i.prototype;
            return t.show = function() {
                var t = this;
                g(this._element).trigger(zn.SHOW), this._config.animation && this._element.classList.add(Xn);
                var e = function() {
                    t._element.classList.remove(Jn), t._element.classList.add(Gn), g(t._element).trigger(zn.SHOWN), t._config.autohide && t.hide();
                };
                if (this._element.classList.remove($n), this._element.classList.add(Jn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n);
                } else e();
            }, t.hide = function(t) {
                var e = this;
                this._element.classList.contains(Gn) && (g(this._element).trigger(zn.HIDE), t ? this._close() : this._timeout = setTimeout(function() {
                    e._close();
                }, this._config.delay));
            }, t.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Gn) && this._element.classList.remove(Gn), g(this._element).off(zn.CLICK_DISMISS), g.removeData(this._element, Bn), this._element = null, this._config = null;
            }, t._getConfig = function(t) {
                return t = l({}, ti, g(this._element).data(), "object" == typeof t && t ? t : {}), _.typeCheckConfig(Qn, t, this.constructor.DefaultType), t;
            }, t._setListeners = function() {
                var t = this;
                g(this._element).on(zn.CLICK_DISMISS, ei, function() {
                    return t.hide(!0);
                });
            }, t._close = function() {
                var t = this,
                    e = function() {
                        t._element.classList.add($n), g(t._element).trigger(zn.HIDDEN);
                    };
                if (this._element.classList.remove(Gn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n);
                } else e();
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(Bn);
                    if (e || (e = new i(this, "object" == typeof n && n), t.data(Bn, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n](this);
                    }
                });
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1";
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Zn;
                }
            }, {
                key: "Default",
                get: function() {
                    return ti;
                }
            }]), i;
        }();
    g.fn[Qn] = ni._jQueryInterface, g.fn[Qn].Constructor = ni, g.fn[Qn].noConflict = function() {
            return g.fn[Qn] = Yn, ni._jQueryInterface;
        },
        function() {
            if ("undefined" == typeof g) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = g.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
        }(), t.Util = _, t.Alert = p, t.Button = P, t.Carousel = lt, t.Collapse = bt, t.Dropdown = Jt, t.Modal = ve, t.Popover = sn, t.Scrollspy = Dn, t.Tab = Kn, t.Toast = ni, t.Tooltip = Be, Object.defineProperty(t, "__esModule", {
            value: !0
        });
});

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery);
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q;
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r;
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top;
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h);
        }
    }

    function c() {
        f = null;
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
        },
        getPageHeight: function(b) {
            return a(b).height();
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a);
        }
    });
});

/* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ */
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e);
    },
    easeInQuad: function(a, b, c, d, e) {
        return d * (b /= e) * b + c;
    },
    easeOutQuad: function(a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c;
    },
    easeInOutQuad: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c;
    },
    easeInCubic: function(a, b, c, d, e) {
        return d * (b /= e) * b * b + c;
    },
    easeOutCubic: function(a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c;
    },
    easeInOutCubic: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c;
    },
    easeInQuart: function(a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c;
    },
    easeOutQuart: function(a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c;
    },
    easeInOutQuart: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c;
    },
    easeInQuint: function(a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c;
    },
    easeOutQuint: function(a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c;
    },
    easeInOutQuint: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c;
    },
    easeInSine: function(a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c;
    },
    easeOutSine: function(a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c;
    },
    easeInOutSine: function(a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c;
    },
    easeInExpo: function(a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c;
    },
    easeOutExpo: function(a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c;
    },
    easeInOutExpo: function(a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c;
    },
    easeInCirc: function(a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c;
    },
    easeOutCirc: function(a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c;
    },
    easeInOutCirc: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c;
    },
    easeInElastic: function(a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4;
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c;
    },
    easeOutElastic: function(a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4;
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * (2 * Math.PI) / g) + d + c;
    },
    easeInOutElastic: function(a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (2 == (b /= e / 2)) return c + d;
        if (g || (g = e * (.3 * 1.5)), h < Math.abs(d)) {
            h = d;
            var f = g / 4;
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return b < 1 ? -.5 * (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g) * .5 + d + c;
    },
    easeInBack: function(a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c;
    },
    easeOutBack: function(a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c;
    },
    easeInOutBack: function(a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * (b * b * (((f *= 1.525) + 1) * b - f)) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c;
    },
    easeInBounce: function(a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c;
    },
    easeOutBounce: function(a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? d * (7.5625 * b * b) + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c;
    },
    easeInOutBounce: function(a, b, c, d, e) {
        return b < e / 2 ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c;
    }
});

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

*/
/* global window, document, define, jQuery, setInterval, clearInterval */
! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery);
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0);
        };
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        });
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e);
        }), s.$slidesCache = s.$slides, s.reinit();
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed);
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o));
            },
            complete: function() {
                t && t.call();
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call();
        }, s.options.speed));
    }, e.prototype.getNavTarget = function() {
        var e = this.options.asNavFor;
        return e && null !== e && (e = i(e).not(this.$slider)), e;
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0);
        });
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
    }, e.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e));
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }));
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "");
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable");
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 0) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c));
                    }
                    d.appendChild(a);
                }
                o.appendChild(d);
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            });
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            for (o in s = null, r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n = this,
            r = i(e.currentTarget);
        switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), o = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? n.options.slidesToScroll : n.options.slidesToShow - o, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? n.options.slidesToScroll : o, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + s, !1, t);
                break;
            case "index":
                var l = 0 === e.data.index ? 0 : e.data.index || r.index() * n.options.slidesToScroll;
                n.slideHandler(n.checkNavigable(l), !1, t), r.children().trigger("focus");
                break;
            default:
                return;
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (t = 0, i > (e = this.getNavigableIndexes())[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break;
                }
                t = e[o];
            }
        return i;
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 0 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i));
    }, e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"));
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]);
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call();
        }, t.options.speed));
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }));
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay());
            }, 0);
        });
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide;
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite) {
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        } else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1;
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e;
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i];
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s;
    }, e.prototype.getSlick = function() {
        return this;
    }, e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1;
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e);
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay());
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount;
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            if (i(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + e.instanceUid + t,
                    tabindex: -1
                }), -1 !== s) {
                var n = "slick-slide-control" + e.instanceUid + s;
                i("#" + n).length && i(this).attr({
                    "aria-describedby": n
                });
            }
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            });
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.options.focusOnChange ? e.$slides.eq(s).attr({
            tabindex: "0"
        }) : e.$slides.eq(s).removeAttr("tabindex");
        e.activateADA();
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition);
    }, e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }));
    }, e.prototype.lazyLoad = function() {
        var e, t, o, s = this;

        function n(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    n = i(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), n && e.attr("sizes", n)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                        }), s.$slider.trigger("lazyLoaded", [s, e, t]);
                    });
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, t]);
                }, r.src = t;
            });
        }
        if (!0 === s.options.centerMode ? !0 === s.options.infinite ? o = (t = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (t = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), o = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (t = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, o = Math.ceil(t + s.options.slidesToShow), !0 === s.options.fade && (t > 0 && t--, o <= s.slideCount && o++)), e = s.$slider.find(".slick-slide").slice(t, o), "anticipated" === s.options.lazyLoad)
            for (var r = t - 1, l = o, d = s.$slider.find(".slick-slide"), a = 0; a < s.options.slidesToScroll; a++) r < 0 && (r = s.slideCount - 1), e = (e = e.add(d.eq(r))).add(d.eq(l)), r--, l++;
        n(e), s.slideCount <= s.options.slidesToShow ? n(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? n(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && n(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow));
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        });
    }, e.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition();
    }, e.prototype.pause = e.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0;
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1;
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        });
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault();
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad();
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1);
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]);
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1);
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            for (e in s.respondTo = s.options.respondTo || "window", n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings;
                } s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i;
            });
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]);
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
        }, 50));
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)));
    }, e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            });
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        });
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e);
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e;
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t]);
                } l && (r.unload(), r.reinit());
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType;
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center");
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad();
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "");
            });
        }
    }, e.prototype.interrupt = function(i) {
        i || this.autoPlay(), this.interrupted = i;
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d, a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, l = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
                a.postSlide(o);
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
            a.postSlide(o);
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (d = (d = a.getNavTarget()).slick("getSlick")).slideCount <= d.options.slidesToShow && d.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                a.postSlide(s);
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(l, function() {
                a.postSlide(s);
            }) : a.postSlide(s);
        }
    }, e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading");
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical";
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1;
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]));
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {});
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i);
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))));
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0;
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy();
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1);
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o;
    };
});

/* fancyBox - jQuery Plugin * version: 2.1.5 (Fri, 14 Jun 2013) */
! function(a, b, c, d) {
    "use strict";
    var e = c("html"),
        f = c(a),
        g = c(b),
        h = c.fancybox = function() {
            h.open.apply(this, arguments);
        },
        i = navigator.userAgent.match(/msie/i),
        j = null,
        k = b.createTouch !== d,
        l = function(a) {
            return a && a.hasOwnProperty && a instanceof c;
        },
        m = function(a) {
            return a && "string" === c.type(a);
        },
        n = function(a) {
            return m(a) && a.indexOf("%") > 0;
        },
        o = function(a) {
            return a && !(a.style.overflow && "hidden" === a.style.overflow) && (a.clientWidth && a.scrollWidth > a.clientWidth || a.clientHeight && a.scrollHeight > a.clientHeight);
        },
        p = function(a, b) {
            var c = parseInt(a, 10) || 0;
            return b && n(a) && (c = h.getViewport()[b] / 100 * c), Math.ceil(c);
        },
        q = function(a, b) {
            return p(a, b) + "px";
        };
    c.extend(h, {
        version: "2.1.5",
        defaults: {
            padding: 0,
            margin: 35,
            width: 1420,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !k,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (i ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: c.noop,
            beforeLoad: c.noop,
            afterLoad: c.noop,
            beforeShow: c.noop,
            afterShow: c.noop,
            beforeChange: c.noop,
            beforeClose: c.noop,
            afterClose: c.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(a, b) {
            if (a && (c.isPlainObject(b) || (b = {}), !1 !== h.close(!0))) return c.isArray(a) || (a = l(a) ? c(a).get() : [a]), c.each(a, function(e, f) {
                var i, j, k, n, o, p, q, g = {};
                "object" === c.type(f) && (f.nodeType && (f = c(f)), l(f) ? (g = {
                    href: f.data("fancybox-href") || f.attr("href"),
                    title: f.data("fancybox-title") || f.attr("title"),
                    isDom: !0,
                    element: f
                }, c.metadata && c.extend(!0, g, f.metadata())) : g = f), i = b.href || g.href || (m(f) ? f : null), j = b.title !== d ? b.title : g.title || "", k = b.content || g.content, n = k ? "html" : b.type || g.type, !n && g.isDom && (n = f.data("fancybox-type"), n || (o = f.prop("class").match(/fancybox\.(\w+)/), n = o ? o[1] : null)), m(i) && (n || (h.isImage(i) ? n = "image" : h.isSWF(i) ? n = "swf" : "#" === i.charAt(0) ? n = "inline" : m(f) && (n = "html", k = f)), "ajax" === n && (p = i.split(/\s+/, 2), i = p.shift(), q = p.shift())), k || ("inline" === n ? i ? k = c(m(i) ? i.replace(/.*(?=#[^\s]+$)/, "") : i) : g.isDom && (k = f) : "html" === n ? k = i : n || i || !g.isDom || (n = "inline", k = f)), c.extend(g, {
                    href: i,
                    type: n,
                    content: k,
                    title: j,
                    selector: q
                }), a[e] = g;
            }), h.opts = c.extend(!0, {}, h.defaults, b), b.keys !== d && (h.opts.keys = !!b.keys && c.extend({}, h.defaults.keys, b.keys)), h.group = a, h._start(h.opts.index);
        },
        cancel: function() {
            var a = h.coming;
            a && !1 !== h.trigger("onCancel") && (h.hideLoading(), h.ajaxLoad && h.ajaxLoad.abort(), h.ajaxLoad = null, h.imgPreload && (h.imgPreload.onload = h.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), h.coming = null, h.current || h._afterZoomOut(a));
        },
        close: function(a) {
            h.cancel(), !1 !== h.trigger("beforeClose") && (h.unbindEvents(), h.isActive && (h.isOpen && a !== !0 ? (h.isOpen = h.isOpened = !1, h.isClosing = !0, c(".fancybox-item, .fancybox-nav").remove(), h.wrap.stop(!0, !0).removeClass("fancybox-opened"), h.transitions[h.current.closeMethod]()) : (c(".fancybox-wrap").stop(!0).trigger("onReset").remove(), h._afterZoomOut())));
        },
        play: function(a) {
            var b = function() {
                    clearTimeout(h.player.timer);
                },
                c = function() {
                    b(), h.current && h.player.isActive && (h.player.timer = setTimeout(h.next, h.current.playSpeed));
                },
                d = function() {
                    b(), g.unbind(".player"), h.player.isActive = !1, h.trigger("onPlayEnd");
                },
                e = function() {
                    h.current && (h.current.loop || h.current.index < h.group.length - 1) && (h.player.isActive = !0, g.bind({
                        "onCancel.player beforeClose.player": d,
                        "onUpdate.player": c,
                        "beforeLoad.player": b
                    }), c(), h.trigger("onPlayStart"));
                };
            a === !0 || !h.player.isActive && a !== !1 ? e() : d();
        },
        next: function(a) {
            var b = h.current;
            b && (m(a) || (a = b.direction.next), h.jumpto(b.index + 1, a, "next"));
        },
        prev: function(a) {
            var b = h.current;
            b && (m(a) || (a = b.direction.prev), h.jumpto(b.index - 1, a, "prev"));
        },
        jumpto: function(a, b, c) {
            var e = h.current;
            e && (a = p(a), h.direction = b || e.direction[a >= e.index ? "next" : "prev"], h.router = c || "jumpto", e.loop && (a < 0 && (a = e.group.length + a % e.group.length), a %= e.group.length), e.group[a] !== d && (h.cancel(), h._start(a)));
        },
        reposition: function(a, b) {
            var f, d = h.current,
                e = d ? d.wrap : null;
            e && (f = h._getPosition(b), a && "scroll" === a.type ? (delete f.position, e.stop(!0, !0).animate(f, 200)) : (e.css(f), d.pos = c.extend({}, d.dim, f)));
        },
        update: function(a) {
            var b = a && a.type,
                c = !b || "orientationchange" === b;
            c && (clearTimeout(j), j = null), h.isOpen && !j && (j = setTimeout(function() {
                var d = h.current;
                d && !h.isClosing && (h.wrap.removeClass("fancybox-tmp"), (c || "load" === b || "resize" === b && d.autoResize) && h._setDimension(), "scroll" === b && d.canShrink || h.reposition(a), h.trigger("onUpdate"), j = null);
            }, c && !k ? 0 : 300));
        },
        toggle: function(a) {
            h.isOpen && (h.current.fitToView = "boolean" === c.type(a) ? a : !h.current.fitToView, k && (h.wrap.removeAttr("style").addClass("fancybox-tmp"), h.trigger("onUpdate")), h.update());
        },
        hideLoading: function() {
            g.unbind(".loading"), c("#fancybox-loading").remove();
        },
        showLoading: function() {
            var a, b;
            h.hideLoading(), a = c('<div id="fancybox-loading"><div></div></div>').click(h.cancel).appendTo("body"), g.bind("keydown.loading", function(a) {
                27 === (a.which || a.keyCode) && (a.preventDefault(), h.cancel());
            }), h.defaults.fixed || (b = h.getViewport(), a.css({
                position: "absolute",
                top: .5 * b.h + b.y,
                left: .5 * b.w + b.x
            }));
        },
        getViewport: function() {
            var b = h.current && h.current.locked || !1,
                c = {
                    x: f.scrollLeft(),
                    y: f.scrollTop()
                };
            return b ? (c.w = b[0].clientWidth, c.h = b[0].clientHeight) : (c.w = k && a.innerWidth ? a.innerWidth : f.width(), c.h = k && a.innerHeight ? a.innerHeight : f.height()), c;
        },
        unbindEvents: function() {
            h.wrap && l(h.wrap) && h.wrap.unbind(".fb"), g.unbind(".fb"), f.unbind(".fb");
        },
        bindEvents: function() {
            var b, a = h.current;
            a && (f.bind("orientationchange.fb" + (k ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), h.update), b = a.keys, b && g.bind("keydown.fb", function(e) {
                var f = e.which || e.keyCode,
                    g = e.target || e.srcElement;
                return (27 !== f || !h.coming) && void(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || g && (g.type || c(g).is("[contenteditable]")) || c.each(b, function(b, g) {
                    return a.group.length > 1 && g[f] !== d ? (h[b](g[f]), e.preventDefault(), !1) : c.inArray(f, g) > -1 ? (h[b](), e.preventDefault(), !1) : void 0;
                }));
            }), c.fn.mousewheel && a.mouseWheel && h.wrap.bind("mousewheel.fb", function(b, d, e, f) {
                for (var g = b.target || null, i = c(g), j = !1; i.length && !(j || i.is(".fancybox-skin") || i.is(".fancybox-wrap"));) j = o(i[0]), i = c(i).parent();
                0 === d || j || h.group.length > 1 && !a.canShrink && (f > 0 || e > 0 ? h.prev(f > 0 ? "down" : "left") : (f < 0 || e < 0) && h.next(f < 0 ? "up" : "right"), b.preventDefault());
            }));
        },
        trigger: function(a, b) {
            var d, e = b || h.coming || h.current;
            if (e) {
                if (c.isFunction(e[a]) && (d = e[a].apply(e, Array.prototype.slice.call(arguments, 1))), d === !1) return !1;
                e.helpers && c.each(e.helpers, function(b, d) {
                    d && h.helpers[b] && c.isFunction(h.helpers[b][a]) && h.helpers[b][a](c.extend(!0, {}, h.helpers[b].defaults, d), e);
                }), g.trigger(a);
            }
        },
        isImage: function(a) {
            return m(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
        },
        isSWF: function(a) {
            return m(a) && a.match(/\.(swf)((\?|#).*)?$/i);
        },
        _start: function(a) {
            var d, e, f, g, i, b = {};
            if (a = p(a), d = h.group[a] || null, !d) return !1;
            if (b = c.extend(!0, {}, h.opts, d), g = b.margin, i = b.padding, "number" === c.type(g) && (b.margin = [g, g, g, g]), "number" === c.type(i) && (b.padding = [i, i, i, i]), b.modal && c.extend(!0, b, {
                    closeBtn: !1,
                    closeClick: !1,
                    nextClick: !1,
                    arrows: !1,
                    mouseWheel: !1,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: !1
                        }
                    }
                }), b.autoSize && (b.autoWidth = b.autoHeight = !0), "auto" === b.width && (b.autoWidth = !0), "auto" === b.height && (b.autoHeight = !0), b.group = h.group, b.index = a, h.coming = b, !1 === h.trigger("beforeLoad")) return void(h.coming = null);
            if (f = b.type, e = b.href, !f) return h.coming = null, !(!h.current || !h.router || "jumpto" === h.router) && (h.current.index = a, h[h.router](h.direction));
            if (h.isActive = !0, "image" !== f && "swf" !== f || (b.autoHeight = b.autoWidth = !1, b.scrolling = "visible"), "image" === f && (b.aspectRatio = !0), "iframe" === f && k && (b.scrolling = "scroll"), b.wrap = c(b.tpl.wrap).addClass("fancybox-" + (k ? "mobile" : "desktop") + " fancybox-type-" + f + " fancybox-tmp " + b.wrapCSS).appendTo(b.parent || "body"), c.extend(b, {
                    skin: c(".fancybox-skin", b.wrap),
                    outer: c(".fancybox-outer", b.wrap),
                    inner: c(".fancybox-inner", b.wrap)
                }), c.each(["Top", "Right", "Bottom", "Left"], function(a, c) {
                    b.skin.css("padding" + c, q(b.padding[a]));
                }), h.trigger("onReady"), "inline" === f || "html" === f) {
                if (!b.content || !b.content.length) return h._error("content");
            } else if (!e) return h._error("href");
            "image" === f ? h._loadImage() : "ajax" === f ? h._loadAjax() : "iframe" === f ? h._loadIframe() : h._afterLoad();
        },
        _error: function(a) {
            c.extend(h.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: h.coming.tpl.error
            }), h._afterLoad();
        },
        _loadImage: function() {
            var a = h.imgPreload = new Image();
            a.onload = function() {
                this.onload = this.onerror = null, h.coming.width = this.width / h.opts.pixelRatio, h.coming.height = this.height / h.opts.pixelRatio, h._afterLoad();
            }, a.onerror = function() {
                this.onload = this.onerror = null, h._error("image");
            }, a.src = h.coming.href, a.complete !== !0 && h.showLoading();
        },
        _loadAjax: function() {
            var a = h.coming;
            h.showLoading(), h.ajaxLoad = c.ajax(c.extend({}, a.ajax, {
                url: a.href,
                error: function(a, b) {
                    h.coming && "abort" !== b ? h._error("ajax", a) : h.hideLoading();
                },
                success: function(b, c) {
                    "success" === c && (a.content = b, h._afterLoad());
                }
            }));
        },
        _loadIframe: function() {
            var a = h.coming,
                b = c(a.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr("scrolling", k ? "auto" : a.iframe.scrolling).attr("src", a.href);
            c(a.wrap).bind("onReset", function() {
                try {
                    c(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
                } catch (a) {}
            }), a.iframe.preload && (h.showLoading(), b.one("load", function() {
                c(this).data("ready", 1), k || c(this).bind("load.fb", h.update), c(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), h._afterLoad();
            })), a.content = b.appendTo(a.inner), a.iframe.preload || h._afterLoad();
        },
        _preloadImages: function() {
            var e, f, a = h.group,
                b = h.current,
                c = a.length,
                d = b.preload ? Math.min(b.preload, c - 1) : 0;
            for (f = 1; f <= d; f += 1) e = a[(b.index + f) % c], "image" === e.type && e.href && (new Image().src = e.href);
        },
        _afterLoad: function() {
            var e, f, g, i, j, k, a = h.coming,
                b = h.current,
                d = "fancybox-placeholder";
            if (h.hideLoading(), a && h.isActive !== !1) {
                if (!1 === h.trigger("afterLoad", a, b)) return a.wrap.stop(!0).trigger("onReset").remove(), void(h.coming = null);
                switch (b && (h.trigger("beforeChange", b), b.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), h.unbindEvents(), e = a, f = a.content, g = a.type, i = a.scrolling, c.extend(h, {
                        wrap: e.wrap,
                        skin: e.skin,
                        outer: e.outer,
                        inner: e.inner,
                        current: e,
                        previous: b
                    }), j = e.href, g) {
                    case "inline":
                    case "ajax":
                    case "html":
                        e.selector ? f = c("<div>").html(f).find(e.selector) : l(f) && (f.data(d) || f.data(d, c('<div class="' + d + '"></div>').insertAfter(f).hide()), f = f.show().detach(), e.wrap.bind("onReset", function() {
                            c(this).find(f).length && f.hide().replaceAll(f.data(d)).data(d, !1);
                        }));
                        break;
                    case "image":
                        f = e.tpl.image.replace("{href}", j);
                        break;
                    case "swf":
                        f = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + j + '"></param>', k = "", c.each(e.swf, function(a, b) {
                            f += '<param name="' + a + '" value="' + b + '"></param>', k += " " + a + '="' + b + '"';
                        }), f += '<embed src="' + j + '" type="application/x-shockwave-flash" width="100%" height="100%"' + k + "></embed></object>";
                }
                l(f) && f.parent().is(e.inner) || e.inner.append(f), h.trigger("beforeShow"), e.inner.css("overflow", "yes" === i ? "scroll" : "no" === i ? "hidden" : i), h._setDimension(), h.reposition(), h.isOpen = !1, h.coming = null, h.bindEvents(), h.isOpened ? b.prevMethod && h.transitions[b.prevMethod]() : c(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), h.transitions[h.isOpened ? e.nextMethod : e.openMethod](), h._preloadImages();
            }
        },
        _setDimension: function() {
            var y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, a = h.getViewport(),
                b = 0,
                d = !1,
                e = !1,
                f = h.wrap,
                g = h.skin,
                i = h.inner,
                j = h.current,
                k = j.width,
                l = j.height,
                m = j.minWidth,
                o = j.minHeight,
                r = j.maxWidth,
                s = j.maxHeight,
                t = j.scrolling,
                u = j.scrollOutside ? j.scrollbarWidth : 0,
                v = j.margin,
                w = p(v[1] + v[3]),
                x = p(v[0] + v[2]);
            if (f.add(g).add(i).width("auto").height("auto").removeClass("fancybox-tmp"), y = p(g.outerWidth(!0) - g.width()), z = p(g.outerHeight(!0) - g.height()), A = w + y, B = x + z, C = n(k) ? (a.w - A) * p(k) / 100 : k, D = n(l) ? (a.h - B) * p(l) / 100 : l, "iframe" === j.type) {
                if (L = j.content, j.autoHeight && 1 === L.data("ready")) try {
                    L[0].contentWindow.document.location && (i.width(C).height(9999), M = L.contents().find("body"), u && M.css("overflow-x", "hidden"), D = M.outerHeight(!0));
                } catch (a) {}
            } else(j.autoWidth || j.autoHeight) && (i.addClass("fancybox-tmp"), j.autoWidth || i.width(C), j.autoHeight || i.height(D), j.autoWidth && (C = i.width()), j.autoHeight && (D = i.height()), i.removeClass("fancybox-tmp"));
            if (k = p(C), l = p(D), G = C / D, m = p(n(m) ? p(m, "w") - A : m), r = p(n(r) ? p(r, "w") - A : r), o = p(n(o) ? p(o, "h") - B : o), s = p(n(s) ? p(s, "h") - B : s), E = r, F = s, j.fitToView && (r = Math.min(a.w - A, r), s = Math.min(a.h - B, s)), J = a.w - w, K = a.h - x, j.aspectRatio ? (k > r && (k = r, l = p(k / G)), l > s && (l = s, k = p(l * G)), k < m && (k = m, l = p(k / G)), l < o && (l = o, k = p(l * G))) : (k = Math.max(m, Math.min(k, r)), j.autoHeight && "iframe" !== j.type && (i.width(k), l = i.height()), l = Math.max(o, Math.min(l, s))), j.fitToView)
                if (i.width(k).height(l), f.width(k + y), H = f.width(), I = f.height(), j.aspectRatio)
                    for (;
                        (H > J || I > K) && k > m && l > o && !(b++ > 19);) l = Math.max(o, Math.min(s, l - 10)), k = p(l * G), k < m && (k = m, l = p(k / G)), k > r && (k = r, l = p(k / G)), i.width(k).height(l), f.width(k + y), H = f.width(), I = f.height();
                else k = Math.max(m, Math.min(k, k - (H - J))), l = Math.max(o, Math.min(l, l - (I - K)));
            u && "auto" === t && l < D && k + y + u < J && (k += u), i.width(k).height(l), f.width(k + y), H = f.width(), I = f.height(), d = (H > J || I > K) && k > m && l > o, e = j.aspectRatio ? k < E && l < F && k < C && l < D : (k < E || l < F) && (k < C || l < D), c.extend(j, {
                dim: {
                    width: q(H),
                    height: q(I)
                },
                origWidth: C,
                origHeight: D,
                canShrink: d,
                canExpand: e,
                wPadding: y,
                hPadding: z,
                wrapSpace: I - g.outerHeight(!0),
                skinSpace: g.height() - l
            }), !L && j.autoHeight && l > o && l < s && !e && i.height("auto");
        },
        _getPosition: function(a) {
            var b = h.current,
                c = h.getViewport(),
                d = b.margin,
                e = h.wrap.width() + d[1] + d[3],
                f = h.wrap.height() + d[0] + d[2],
                g = {
                    position: "absolute",
                    top: d[0],
                    left: d[3]
                };
            return b.autoCenter && b.fixed && !a && f <= c.h && e <= c.w ? g.position = "fixed" : b.locked || (g.top += c.y, g.left += c.x), g.top = q(Math.max(g.top, g.top + (c.h - f) * b.topRatio)), g.left = q(Math.max(g.left, g.left + (c.w - e) * b.leftRatio)), g;
        },
        _afterZoomIn: function() {
            var a = h.current;
            a && (h.isOpen = h.isOpened = !0, h.wrap.css("overflow", "visible").addClass("fancybox-opened"), h.update(), (a.closeClick || a.nextClick && h.group.length > 1) && h.inner.css("cursor", "pointer").bind("click.fb", function(b) {
                c(b.target).is("a") || c(b.target).parent().is("a") || (b.preventDefault(), h[a.closeClick ? "close" : "next"]());
            }), a.closeBtn && c(a.tpl.closeBtn).appendTo(h.skin).bind("click.fb", function(a) {
                a.preventDefault(), h.close();
            }), a.arrows && h.group.length > 1 && ((a.loop || a.index > 0) && c(a.tpl.prev).appendTo(h.outer).bind("click.fb", h.prev), (a.loop || a.index < h.group.length - 1) && c(a.tpl.next).appendTo(h.outer).bind("click.fb", h.next)), h.trigger("afterShow"), a.loop || a.index !== a.group.length - 1 ? h.opts.autoPlay && !h.player.isActive && (h.opts.autoPlay = !1, h.play()) : h.play(!1));
        },
        _afterZoomOut: function(a) {
            a = a || h.current, c(".fancybox-wrap").trigger("onReset").remove(), c.extend(h, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), h.trigger("afterClose", a);
        }
    }), h.transitions = {
        getOrigPosition: function() {
            var a = h.current,
                b = a.element,
                c = a.orig,
                d = {},
                e = 50,
                f = 50,
                g = a.hPadding,
                i = a.wPadding,
                j = h.getViewport();
            return !c && a.isDom && b.is(":visible") && (c = b.find("img:first"), c.length || (c = b)), l(c) ? (d = c.offset(), c.is("img") && (e = c.outerWidth(), f = c.outerHeight())) : (d.top = j.y + (j.h - f) * a.topRatio, d.left = j.x + (j.w - e) * a.leftRatio), ("fixed" === h.wrap.css("position") || a.locked) && (d.top -= j.y, d.left -= j.x), d = {
                top: q(d.top - g * a.topRatio),
                left: q(d.left - i * a.leftRatio),
                width: q(e + i),
                height: q(f + g)
            };
        },
        step: function(a, b) {
            var c, d, e, f = b.prop,
                g = h.current,
                i = g.wrapSpace,
                j = g.skinSpace;
            "width" !== f && "height" !== f || (c = b.end === b.start ? 1 : (a - b.start) / (b.end - b.start), h.isClosing && (c = 1 - c), d = "width" === f ? g.wPadding : g.hPadding, e = a - d, h.skin[f](p("width" === f ? e : e - i * c)), h.inner[f](p("width" === f ? e : e - i * c - j * c)));
        },
        zoomIn: function() {
            var a = h.current,
                b = a.pos,
                d = a.openEffect,
                e = "elastic" === d,
                f = c.extend({
                    opacity: 1
                }, b);
            delete f.position, e ? (b = this.getOrigPosition(), a.openOpacity && (b.opacity = .1)) : "fade" === d && (b.opacity = .1), h.wrap.css(b).animate(f, {
                duration: "none" === d ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: e ? this.step : null,
                complete: h._afterZoomIn
            });
        },
        zoomOut: function() {
            var a = h.current,
                b = a.closeEffect,
                c = "elastic" === b,
                d = {
                    opacity: .1
                };
            c && (d = this.getOrigPosition(), a.closeOpacity && (d.opacity = .1)), h.wrap.animate(d, {
                duration: "none" === b ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: c ? this.step : null,
                complete: h._afterZoomOut
            });
        },
        changeIn: function() {
            var g, a = h.current,
                b = a.nextEffect,
                c = a.pos,
                d = {
                    opacity: 1
                },
                e = h.direction,
                f = 200;
            c.opacity = .1, "elastic" === b && (g = "down" === e || "up" === e ? "top" : "left", "down" === e || "right" === e ? (c[g] = q(p(c[g]) - f), d[g] = "+=" + f + "px") : (c[g] = q(p(c[g]) + f), d[g] = "-=" + f + "px")), "none" === b ? h._afterZoomIn() : h.wrap.css(c).animate(d, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: h._afterZoomIn
            });
        },
        changeOut: function() {
            var a = h.previous,
                b = a.prevEffect,
                d = {
                    opacity: .1
                },
                e = h.direction,
                f = 200;
            "elastic" === b && (d["down" === e || "up" === e ? "top" : "left"] = ("up" === e || "left" === e ? "-" : "+") + "=" + f + "px"), a.wrap.animate(d, {
                duration: "none" === b ? 0 : a.prevSpeed,
                easing: a.prevEasing,
                complete: function() {
                    c(this).trigger("onReset").remove();
                }
            });
        }
    }, h.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !k,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: c("html"),
        create: function(a) {
            a = c.extend({}, this.defaults, a), this.overlay && this.close(), this.overlay = c('<div class="fancybox-overlay"></div>').appendTo(h.coming ? h.coming.parent : a.parent), this.fixed = !1, a.fixed && h.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0);
        },
        open: function(a) {
            var b = this;
            a = c.extend({}, this.defaults, a), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a), this.fixed || (f.bind("resize.overlay", c.proxy(this.update, this)), this.update()), a.closeClick && this.overlay.bind("click.overlay", function(a) {
                if (c(a.target).hasClass("fancybox-overlay")) return h.isActive ? h.close() : b.close(), !1;
            }), this.overlay.css(a.css).show();
        },
        close: function() {
            var a, b;
            f.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (c(".fancybox-margin").removeClass("fancybox-margin"), a = f.scrollTop(), b = f.scrollLeft(), this.el.removeClass("fancybox-lock"), f.scrollTop(a).scrollLeft(b)), c(".fancybox-overlay").remove().hide(), c.extend(this, {
                overlay: null,
                fixed: !1
            });
        },
        update: function() {
            var c, a = "100%";
            this.overlay.width(a).height("100%"), i ? (c = Math.max(b.documentElement.offsetWidth, b.body.offsetWidth), g.width() > c && (a = g.width())) : g.width() > f.width() && (a = g.width()), this.overlay.width(a).height(g.height());
        },
        onReady: function(a, b) {
            var d = this.overlay;
            c(".fancybox-overlay").stop(!0, !0), d || this.create(a), a.locked && this.fixed && b.fixed && (d || (this.margin = g.height() > f.height() && c("html").css("margin-right").replace("px", "")), b.locked = this.overlay.append(b.wrap), b.fixed = !1), a.showEarly === !0 && this.beforeShow.apply(this, arguments);
        },
        beforeShow: function(a, b) {
            var d, e;
            b.locked && (this.margin !== !1 && (c("*").filter(function() {
                return "fixed" === c(this).css("position") && !c(this).hasClass("fancybox-overlay") && !c(this).hasClass("fancybox-wrap");
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), d = f.scrollTop(), e = f.scrollLeft(), this.el.addClass("fancybox-lock"), f.scrollTop(d).scrollLeft(e)), this.open(a);
        },
        onUpdate: function() {
            this.fixed || this.update();
        },
        afterClose: function(a) {
            this.overlay && !h.coming && this.overlay.fadeOut(a.speedOut, c.proxy(this.close, this));
        }
    }, h.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(a) {
            var f, g, b = h.current,
                d = b.title,
                e = a.type;
            if (c.isFunction(d) && (d = d.call(b.element, b)), m(d) && "" !== c.trim(d)) {
                switch (f = c('<div class="fancybox-title fancybox-title-' + e + '-wrap">' + d + "</div>"), e) {
                    case "inside":
                        g = h.skin;
                        break;
                    case "outside":
                        g = h.wrap;
                        break;
                    case "over":
                        g = h.inner;
                        break;
                    default:
                        g = h.skin, f.appendTo("body"), i && f.width(f.width()), f.wrapInner('<span class="child"></span>'), h.current.margin[2] += Math.abs(p(f.css("margin-bottom")));
                }
                f["top" === a.position ? "prependTo" : "appendTo"](g);
            }
        }
    }, c.fn.fancybox = function(a) {
        var b, d = c(this),
            e = this.selector || "",
            f = function(f) {
                var j, k, g = c(this).blur(),
                    i = b;
                f.ctrlKey || f.altKey || f.shiftKey || f.metaKey || g.is(".fancybox-wrap") || (j = a.groupAttr || "data-fancybox-group", k = g.attr(j), k || (j = "rel", k = g.get(0)[j]), k && "" !== k && "nofollow" !== k && (g = e.length ? c(e) : d, g = g.filter("[" + j + '="' + k + '"]'), i = g.index(this)), a.index = i, h.open(g, a) !== !1 && f.preventDefault());
            };
        return a = a || {}, b = a.index || 0, e && a.live !== !1 ? g.undelegate(e, "click.fb-start").delegate(e + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", f) : d.unbind("click.fb-start").bind("click.fb-start", f), this.filter("[data-fancybox-start=1]").trigger("click"), this;
    }, g.ready(function() {
        var b, f;
        c.scrollbarWidth === d && (c.scrollbarWidth = function() {
            var a = c('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                b = a.children(),
                d = b.innerWidth() - b.height(99).innerWidth();
            return a.remove(), d;
        }), c.support.fixedPosition === d && (c.support.fixedPosition = function() {
            var a = c('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
            return a.remove(), b;
        }()), c.extend(h.defaults, {
            scrollbarWidth: c.scrollbarWidth(),
            fixed: c.support.fixedPosition,
            parent: c("body")
        }), b = c(a).width(), e.addClass("fancybox-lock-test"), f = c(a).width(), e.removeClass("fancybox-lock-test"), c("<style type='text/css'>.fancybox-margin{margin-right:" + (f - b) + "px;}</style>").appendTo("head");
    });
}(window, document, jQuery);

/* helper fancybox */
(function($) {
    var F = $.fancybox;
    F.helpers.buttons = {
        defaults: {
            skipSingle: false,
            position: 'top',
            tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
        },
        list: null,
        buttons: null,
        beforeLoad: function(opts, obj) {
            if (opts.skipSingle && obj.group.length < 2) {
                obj.helpers.buttons = false;
                obj.closeBtn = true;
                return;
            }
            obj.margin[opts.position === 'bottom' ? 2 : 0] += 30;
        },
        onPlayStart: function() {
            if (this.buttons) {
                this.buttons.play.attr('title', 'Pause slideshow').addClass('btnPlayOn');
            }
        },
        onPlayEnd: function() {
            if (this.buttons) {
                this.buttons.play.attr('title', 'Start slideshow').removeClass('btnPlayOn');
            }
        },
        afterShow: function(opts, obj) {
            var buttons = this.buttons;
            if (!buttons) {
                this.list = $(opts.tpl).addClass(opts.position).appendTo('body');
                buttons = {
                    prev: this.list.find('.btnPrev').click(F.prev),
                    next: this.list.find('.btnNext').click(F.next),
                    play: this.list.find('.btnPlay').click(F.play),
                    toggle: this.list.find('.btnToggle').click(F.toggle),
                    close: this.list.find('.btnClose').click(F.close)
                };
            }
            if (obj.index > 0 || obj.loop) {
                buttons.prev.removeClass('btnDisabled');
            } else {
                buttons.prev.addClass('btnDisabled');
            }
            if (obj.loop || obj.index < obj.group.length - 1) {
                buttons.next.removeClass('btnDisabled');
                buttons.play.removeClass('btnDisabled');
            } else {
                buttons.next.addClass('btnDisabled');
                buttons.play.addClass('btnDisabled');
            }
            this.buttons = buttons;
            this.onUpdate(opts, obj);
        },
        onUpdate: function(opts, obj) {
            var toggle;
            if (!this.buttons) {
                return;
            }
            toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');
            if (obj.canShrink) {
                toggle.addClass('btnToggleOn');
            } else if (!obj.canExpand) {
                toggle.addClass('btnDisabled');
            }
        },
        beforeClose: function() {
            if (this.list) {
                this.list.remove();
            }
            this.list = null;
            this.buttons = null;
        }
    };
})(jQuery);

(function($) {
    var F = $.fancybox;
    F.helpers.thumbs = {
        defaults: {
            width: 50,
            height: 50,
            position: 'bottom',
            source: function(item) {
                var href;
                if (item.element) {
                    href = $(item.element).find('img').attr('src');
                }
                if (!href && item.type === 'image' && item.href) {
                    href = item.href;
                }
                return href;
            }
        },
        wrap: null,
        list: null,
        width: 0,
        init: function(opts, obj) {
            var that = this,
                list, thumbWidth = opts.width,
                thumbHeight = opts.height,
                thumbSource = opts.source;
            list = '';
            for (var n = 0; n < obj.group.length; n++) {
                list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
            }
            this.wrap = $('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo('body');
            this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap);
            $.each(obj.group, function(i) {
                var href = thumbSource(obj.group[i]);
                if (!href) {
                    return;
                }
                $("<img />").load(function() {
                    var width = this.width,
                        height = this.height,
                        widthRatio, heightRatio, parent;
                    if (!that.list || !width || !height) {
                        return;
                    }
                    widthRatio = width / thumbWidth;
                    heightRatio = height / thumbHeight;
                    parent = that.list.children().eq(i).find('a');
                    if (widthRatio >= 1 && heightRatio >= 1) {
                        if (widthRatio > heightRatio) {
                            width = Math.floor(width / heightRatio);
                            height = thumbHeight;
                        } else {
                            width = thumbWidth;
                            height = Math.floor(height / widthRatio);
                        }
                    }
                    $(this).css({
                        width: width,
                        height: height,
                        top: Math.floor(thumbHeight / 2 - height / 2),
                        left: Math.floor(thumbWidth / 2 - width / 2)
                    });
                    parent.width(thumbWidth).height(thumbHeight);
                    $(this).hide().appendTo(parent).fadeIn(300);
                }).attr('src', href);
            });
            this.width = this.list.children().eq(0).outerWidth(true);
            this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));
        },
        beforeLoad: function(opts, obj) {
            if (obj.group.length < 2) {
                obj.helpers.thumbs = false;
                return;
            }
            obj.margin[opts.position === 'top' ? 0 : 2] += opts.height + 15;
        },
        afterShow: function(opts, obj) {
            if (this.list) {
                this.onUpdate(opts, obj);
            } else {
                this.init(opts, obj);
            }
            this.list.children().removeClass('active').eq(obj.index).addClass('active');
        },
        onUpdate: function(opts, obj) {
            if (this.list) {
                this.list.stop(true).animate({
                    'left': Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5))
                }, 150);
            }
        },
        beforeClose: function() {
            if (this.wrap) {
                this.wrap.remove();
            }
            this.wrap = null;
            this.list = null;
            this.width = 0;
        }
    };
})(jQuery);

(function($) {
    "use strict";
    var F = $.fancybox,
        format = function(url, rez, params) {
            params = params || '';
            if ($.type(params) === "object") {
                params = $.param(params, true);
            }
            $.each(rez, function(key, value) {
                url = url.replace('$' + key, value || '');
            });
            if (params.length) {
                url += (url.indexOf('?') > 0 ? '&' : '?') + params;
            }
            return url;
        };
    F.helpers.media = {
        defaults: {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: 'opaque',
                    enablejsapi: 1
                },
                type: 'iframe',
                url: '//www.youtube.com/embed/$3'
            },
            vimeo: {
                matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                type: 'iframe',
                url: '//player.vimeo.com/video/$1'
            },
            metacafe: {
                matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                params: {
                    autoPlay: 'yes'
                },
                type: 'swf',
                url: function(rez, params, obj) {
                    obj.swf.flashVars = 'playerVars=' + $.param(params, true);
                    return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
                }
            },
            dailymotion: {
                matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                params: {
                    additionalInfos: 0,
                    autoStart: 1
                },
                type: 'swf',
                url: '//www.dailymotion.com/swf/video/$1'
            },
            twitvid: {
                matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                params: {
                    autoplay: 0
                },
                type: 'iframe',
                url: '//www.twitvid.com/embed.php?guid=$1'
            },
            twitpic: {
                matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                type: 'image',
                url: '//twitpic.com/show/full/$1/'
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: 'image',
                url: '//$1/p/$2/media/?size=l'
            },
            google_maps: {
                matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                type: 'iframe',
                url: function(rez) {
                    return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
                }
            }
        },
        beforeLoad: function(opts, obj) {
            var url = obj.href || '',
                type = false,
                what, item, rez, params;
            for (what in opts) {
                if (opts.hasOwnProperty(what)) {
                    item = opts[what];
                    rez = url.match(item.matcher);
                    if (rez) {
                        type = item.type;
                        params = $.extend(true, {}, item.params, obj[what] || ($.isPlainObject(opts[what]) ? opts[what].params : null));
                        url = $.type(item.url) === "function" ? item.url.call(this, rez, params, obj) : format(item.url, rez, params);
                        break;
                    }
                }
            }
            if (type) {
                obj.href = url;
                obj.type = type;
                obj.autoHeight = false;
            }
        }
    };
})(jQuery);

/* jQuery meanMenu v2.0.8 */
! function(a) {
    "use strict";
    a.fn.meanmenu = function(b) {
        var c = {
            meanMenuTarget: jQuery(this),
            meanMenuContainer: ".nav-container",
            meanMenuClose: "X",
            meanMenuCloseSize: "18px",
            meanMenuOpen: "<span></span><span></span><span></span>",
            meanRevealPosition: "right",
            meanRevealPositionDistance: "0",
            meanRevealColour: "",
            meanScreenWidth: "992",
            meanNavPush: "",
            meanShowChildren: !0,
            meanExpandableChildren: !0,
            meanExpand: "+",
            meanContract: "-",
            meanRemoveAttrs: !1,
            onePage: !1,
            meanDisplay: "block",
            removeElements: ""
        };
        b = a.extend(c, b);
        var d = window.innerWidth || document.documentElement.clientWidth;
        return this.each(function() {
            var a = b.meanMenuTarget,
                c = b.meanMenuContainer,
                e = b.meanMenuClose,
                f = b.meanMenuCloseSize,
                g = b.meanMenuOpen,
                h = b.meanRevealPosition,
                i = b.meanRevealPositionDistance,
                j = b.meanRevealColour,
                k = b.meanScreenWidth,
                l = b.meanNavPush,
                m = ".meanmenu-reveal",
                n = b.meanShowChildren,
                o = b.meanExpandableChildren,
                p = b.meanExpand,
                q = b.meanContract,
                r = b.meanRemoveAttrs,
                s = b.onePage,
                t = b.meanDisplay,
                u = b.removeElements,
                v = !1;
            (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/Windows Phone/i)) && (v = !0), (navigator.userAgent.match(/MSIE 8/i) || navigator.userAgent.match(/MSIE 7/i)) && jQuery("html").css("overflow-y", "scroll");
            var w = "",
                x = function() {
                    if ("center" === h) {
                        var a = window.innerWidth || document.documentElement.clientWidth,
                            b = a / 2 - 22 + "px";
                        w = "left:" + b + ";right:auto;", v ? jQuery(".meanmenu-reveal").animate({
                            left: b
                        }) : jQuery(".meanmenu-reveal").css("left", b);
                    }
                },
                y = !1,
                z = !1;
            "right" === h && (w = "right:" + i + ";left:auto;"), "left" === h && (w = "left:" + i + ";right:auto;"), x();
            var A = "",
                B = function() {
                    jQuery(A).is(".meanmenu-reveal.meanclose") ? A.html(e) : A.html(g);
                },
                C = function() {
                    jQuery(".mean-bar,.mean-push").remove(), jQuery(c).removeClass("mean-container"), jQuery(a).css("display", t), y = !1, z = !1, jQuery(u).removeClass("mean-remove");
                },
                D = function() {
                    var b = "background:" + j + ";color:" + j + ";" + w;
                    if (d <= k) {
                        jQuery(u).addClass("mean-remove"), z = !0, jQuery(c).addClass("mean-container"), jQuery(".mean-container").prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="' + b + '">Show Navigation</a><nav class="mean-nav"></nav></div>');
                        var e = jQuery(a).html();
                        jQuery(".mean-nav").html(e), r && jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function() {
                            jQuery(this).is(".mean-remove") ? jQuery(this).attr("class", "mean-remove") : jQuery(this).removeAttr("class"), jQuery(this).removeAttr("id");
                        }), jQuery(a).before('<div class="mean-push" />'), jQuery(".mean-push").css("margin-top", l), jQuery(a).hide(), jQuery(".meanmenu-reveal").show(), jQuery(m).html(g), A = jQuery(m), jQuery(".mean-nav ul").hide(), n ? o ? (jQuery(".mean-nav ul ul").each(function() {
                            jQuery(this).children().length && jQuery(this, "li:first").parent().append('<a class="mean-expand" href="#" style="font-size: ' + f + '">' + p + "</a>");
                        }), jQuery(".mean-expand").on("click", function(a) {
                            a.preventDefault(), jQuery(this).hasClass("mean-clicked") ? (jQuery(this).text(p), jQuery(this).prev("ul").slideUp(300, function() {})) : (jQuery(this).text(q), jQuery(this).prev("ul").slideDown(300, function() {})), jQuery(this).toggleClass("mean-clicked");
                        })) : jQuery(".mean-nav ul ul").show() : jQuery(".mean-nav ul ul").hide(), jQuery(".mean-nav ul li").last().addClass("mean-last"), A.removeClass("meanclose"), jQuery(A).click(function(a) {
                            a.preventDefault(), y === !1 ? (A.css("text-align", "center"), A.css("text-indent", "0"), A.css("font-size", f), jQuery(".mean-nav ul:first").slideDown(), y = !0) : (jQuery(".mean-nav ul:first").slideUp(), y = !1), A.toggleClass("meanclose"), B(), jQuery(u).addClass("mean-remove");
                        }), s && jQuery(".mean-nav ul > li > a:first-child").on("click", function() {
                            jQuery(".mean-nav ul:first").slideUp(), y = !1, jQuery(A).toggleClass("meanclose").html(g);
                        });
                    } else C();
                };
            v || jQuery(window).resize(function() {
                d = window.innerWidth || document.documentElement.clientWidth, d > k, C(), d <= k ? (D(), x()) : C();
            }), jQuery(window).resize(function() {
                d = window.innerWidth || document.documentElement.clientWidth, v ? (x(), d <= k ? z === !1 && D() : C()) : (C(), d <= k && (D(), x()));
            }), D();
        });
    };
}(jQuery);

/*
 slick-animation.js
 Version: 0.3.3 Beta
 Author: Marvin Hübner
 Docs: https://github.com/marvinhuebner/slick-animation
 Repo: https://github.com/marvinhuebner/slick-animation
 */
! function(a) {
    a.fn.slickAnimation = function() {
        function n(a, n, t, i, e) {
            e = void 0 !== e && e, o(a, "delay"), o(a, "duration"), 1 == n.opacity ? (a.addClass(t), a.addClass(i)) : (a.removeClass(t), a.removeClass(i)), e && a.css(n);
        }

        function t(a, n) {
            return a ? 1e3 * a + 1e3 : n ? 1e3 * n : a || n ? 1e3 * a + 1e3 * n : 1e3;
        }

        function i(a, n, t) {
            var i = {};
            ["animation-" + n, "-webkit-animation-" + n, "-moz-animation-" + n, "-o-animation-" + n, "-ms-animation-" + n].forEach(function(a) {
                i[a] = t + "s";
            }), a.css(i);
        }

        function o(a, n) {
            var t = {};
            ["animation-" + n, "-webkit-animation-" + n, "-moz-animation-" + n, "-o-animation-" + n, "-ms-animation-" + n].forEach(function(a) {
                t[a] = "";
            }), a.css(t);
        }
        var e = a(this),
            d = e.find(".slick-list .slick-track > div"),
            s = e.find('[data-slick-index="0"]'),
            r = {
                opacity: "1"
            },
            u = {
                opacity: "0"
            };
        return d.each(function() {
            var d = a(this);
            d.find("[data-animation-in]").each(function() {
                var c = a(this);
                c.css(u);
                var m = c.attr("data-animation-in"),
                    l = c.attr("data-animation-out"),
                    f = c.attr("data-delay-in"),
                    h = c.attr("data-duration-in"),
                    y = c.attr("data-delay-out"),
                    C = c.attr("data-duration-out");
                l ? (s.length > 0 && d.hasClass("slick-current") && (n(c, r, m, "animated", !0), f && i(c, "delay", f), h && i(c, "duration", h), setTimeout(function() {
                    n(c, u, m, "animated"), n(c, r, l, "animated"), y && i(c, "delay", y), C && i(c, "duration", C), setTimeout(function() {
                        o(c, "delay"), o(c, "duration");
                    }, t(y, C));
                }, t(f, h))), e.on("afterChange", function(a, e, s) {
                    d.hasClass("slick-current") && (n(c, r, m, "animated", !0), f && i(c, "delay", f), h && i(c, "duration", h), setTimeout(function() {
                        n(c, u, m, "animated"), n(c, r, l, "animated"), y && i(c, "delay", y), C && i(c, "duration", C), setTimeout(function() {
                            o(c, "delay"), o(c, "duration");
                        }, t(y, C));
                    }, t(f, h)));
                }), e.on("beforeChange", function(a, t, i) {
                    n(c, u, l, "animated", !0);
                })) : (s.length > 0 && d.hasClass("slick-current") && (n(c, r, m, "animated", !0), f && i(c, "delay", f), h && i(c, "duration", h)), e.on("afterChange", function(a, t, o) {
                    d.hasClass("slick-current") && (n(c, r, m, "animated", !0), f && i(c, "delay", f), h && i(c, "duration", h));
                }), e.on("beforeChange", function(a, t, i) {
                    n(c, u, m, "animated", !0);
                }));
            });
        }), this;
    };
}(jQuery);

/* Sticky Plugin v1.0.0 for jQuery */
! function(a) {
    var b = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: !1,
            getWidthFrom: ""
        },
        c = a(window),
        d = a(document),
        e = [],
        f = c.height(),
        g = function() {
            for (var b = c.scrollTop(), g = d.height(), h = g - f, i = b > h ? h - b : 0, j = 0; j < e.length; j++) {
                var k = e[j],
                    l = k.stickyWrapper.offset().top,
                    m = l - k.topSpacing - i;
                if (b <= m) null !== k.currentTop && (k.stickyElement.css("position", "").css("top", ""), k.stickyElement.parent().removeClass(k.className), k.currentTop = null);
                else {
                    var n = g - k.stickyElement.outerHeight() - k.topSpacing - k.bottomSpacing - b - i;
                    n < 0 ? n += k.topSpacing : n = k.topSpacing, k.currentTop != n && (k.stickyElement.css("position", "fixed").css("top", n), "undefined" != typeof k.getWidthFrom && k.stickyElement.css("width", a(k.getWidthFrom).width()), k.stickyElement.parent().addClass(k.className), k.currentTop = n);
                }
            }
        },
        h = function() {
            f = c.height();
        },
        i = {
            init: function(c) {
                var d = a.extend(b, c);
                return this.each(function() {
                    var b = a(this),
                        c = b.attr("id"),
                        f = a("<div></div>").attr("id", c + "-sticky-wrapper").addClass(d.wrapperClassName);
                    b.wrapAll(f), d.center && b.parent().css({
                        width: b.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    }), "right" == b.css("float") && b.css({
                        float: "none"
                    }).parent().css({
                        float: "right"
                    });
                    var g = b.parent();
                    g.css("height", b.outerHeight()), e.push({
                        topSpacing: d.topSpacing,
                        bottomSpacing: d.bottomSpacing,
                        stickyElement: b,
                        currentTop: null,
                        stickyWrapper: g,
                        className: d.className,
                        getWidthFrom: d.getWidthFrom
                    });
                });
            },
            update: g
        };
    window.addEventListener ? (window.addEventListener("scroll", g, !1), window.addEventListener("resize", h, !1)) : window.attachEvent && (window.attachEvent("onscroll", g), window.attachEvent("onresize", h)), a.fn.sticky = function(b) {
        return i[b] ? i[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.sticky") : i.init.apply(this, arguments);
    }, a(function() {
        setTimeout(g, 0);
    });
}(jQuery);

/*!
 * Bootstrap-select v1.13.1 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2018 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a);
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery);
}(this, function(a) {
    ! function(a) {
        "use strict";

        function b(a, b) {
            return a.length === b.length && a.every(function(a, c) {
                return a === b[c];
            });
        }

        function c(a) {
            var b, c = [],
                d = a && a.options;
            if (a.multiple)
                for (var e = 0, f = d.length; e < f; e++) b = d[e], b.selected && c.push(b.value || b.text);
            else c = a.value;
            return c;
        }

        function d(a, b, c, d) {
            for (var e = ["content", "subtext", "tokens"], g = !1, h = 0; h < e.length; h++) {
                var i = e[h],
                    j = a[i];
                if (j && (j = j.toString(), "content" === i && (j = j.replace(/<[^>]+>/g, "")), d && (j = f(j)), j = j.toUpperCase(), g = "contains" === c ? j.indexOf(b) >= 0 : j.startsWith(b))) break;
            }
            return g;
        }

        function e(a) {
            return parseInt(a, 10) || 0;
        }

        function f(b) {
            var c = [{
                re: /[\xC0-\xC6]/g,
                ch: "A"
            }, {
                re: /[\xE0-\xE6]/g,
                ch: "a"
            }, {
                re: /[\xC8-\xCB]/g,
                ch: "E"
            }, {
                re: /[\xE8-\xEB]/g,
                ch: "e"
            }, {
                re: /[\xCC-\xCF]/g,
                ch: "I"
            }, {
                re: /[\xEC-\xEF]/g,
                ch: "i"
            }, {
                re: /[\xD2-\xD6]/g,
                ch: "O"
            }, {
                re: /[\xF2-\xF6]/g,
                ch: "o"
            }, {
                re: /[\xD9-\xDC]/g,
                ch: "U"
            }, {
                re: /[\xF9-\xFC]/g,
                ch: "u"
            }, {
                re: /[\xC7-\xE7]/g,
                ch: "c"
            }, {
                re: /[\xD1]/g,
                ch: "N"
            }, {
                re: /[\xF1]/g,
                ch: "n"
            }];
            return a.each(c, function() {
                b = b ? b.replace(this.re, this.ch) : "";
            }), b;
        }

        function g(b) {
            var c = arguments,
                d = b;
            [].shift.apply(c);
            var e, f = this.each(function() {
                var b = a(this);
                if (b.is("select")) {
                    var f = b.data("selectpicker"),
                        g = "object" == typeof d && d;
                    if (f) {
                        if (g)
                            for (var h in g) g.hasOwnProperty(h) && (f.options[h] = g[h]);
                    } else {
                        var i = a.extend({}, x.DEFAULTS, a.fn.selectpicker.defaults || {}, b.data(), g);
                        i.template = a.extend({}, x.DEFAULTS.template, a.fn.selectpicker.defaults ? a.fn.selectpicker.defaults.template : {}, b.data().template, g.template), b.data("selectpicker", f = new x(this, i));
                    }
                    "string" == typeof d && (e = f[d] instanceof Function ? f[d].apply(f, c) : f.options[d]);
                }
            });
            return void 0 !== e ? e : f;
        }
        var h = document.createElement("_");
        if (h.classList.toggle("c3", !1), h.classList.contains("c3")) {
            var i = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(a, b) {
                return 1 in arguments && !this.contains(a) == !b ? b : i.call(this, a);
            };
        }
        String.prototype.startsWith || function() {
            var a = function() {
                    try {
                        var a = {},
                            b = Object.defineProperty,
                            c = b(a, a, a) && b;
                    } catch (a) {}
                    return c;
                }(),
                b = {}.toString,
                c = function(a) {
                    if (null == this) throw new TypeError();
                    var c = String(this);
                    if (a && "[object RegExp]" == b.call(a)) throw new TypeError();
                    var d = c.length,
                        e = String(a),
                        f = e.length,
                        g = arguments.length > 1 ? arguments[1] : void 0,
                        h = g ? Number(g) : 0;
                    h != h && (h = 0);
                    var i = Math.min(Math.max(h, 0), d);
                    if (f + i > d) return !1;
                    for (var j = -1; ++j < f;)
                        if (c.charCodeAt(i + j) != e.charCodeAt(j)) return !1;
                    return !0;
                };
            a ? a(String.prototype, "startsWith", {
                value: c,
                configurable: !0,
                writable: !0
            }) : String.prototype.startsWith = c;
        }(), Object.keys || (Object.keys = function(a, b, c) {
            c = [];
            for (b in a) c.hasOwnProperty.call(a, b) && c.push(b);
            return c;
        });
        var j = {
            useDefault: !1,
            _set: a.valHooks.select.set
        };
        a.valHooks.select.set = function(b, c) {
            return c && !j.useDefault && a(b).data("selected", !0), j._set.apply(this, arguments);
        };
        var k = null,
            l = function() {
                try {
                    return new Event("change"), !0;
                } catch (a) {
                    return !1;
                }
            }();
        a.fn.triggerNative = function(a) {
            var b, c = this[0];
            c.dispatchEvent ? (l ? b = new Event(a, {
                bubbles: !0
            }) : (b = document.createEvent("Event"), b.initEvent(a, !0, !1)), c.dispatchEvent(b)) : c.fireEvent ? (b = document.createEventObject(), b.eventType = a, c.fireEvent("on" + a, b)) : this.trigger(a);
        };
        var m = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            n = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&#x27;": "'",
                "&#x60;": "`"
            },
            o = function(a) {
                var b = function(b) {
                        return a[b];
                    },
                    c = "(?:" + Object.keys(a).join("|") + ")",
                    d = RegExp(c),
                    e = RegExp(c, "g");
                return function(a) {
                    return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, b) : a;
                };
            },
            p = o(m),
            q = o(n),
            r = {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "A",
                66: "B",
                67: "C",
                68: "D",
                69: "E",
                70: "F",
                71: "G",
                72: "H",
                73: "I",
                74: "J",
                75: "K",
                76: "L",
                77: "M",
                78: "N",
                79: "O",
                80: "P",
                81: "Q",
                82: "R",
                83: "S",
                84: "T",
                85: "U",
                86: "V",
                87: "W",
                88: "X",
                89: "Y",
                90: "Z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9"
            },
            s = {
                ESCAPE: 27,
                ENTER: 13,
                SPACE: 32,
                TAB: 9,
                ARROW_UP: 38,
                ARROW_DOWN: 40
            },
            t = {};
        try {
            t.full = (a.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split("."), t.major = t.full[0];
        } catch (a) {
            console.error("There was an issue retrieving Bootstrap's version. Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision.", a), t.major = "3";
        }
        var u = {
                DISABLED: "disabled",
                DIVIDER: "4" === t.major ? "dropdown-divider" : "divider",
                SHOW: "4" === t.major ? "show" : "open",
                DROPUP: "dropup",
                MENURIGHT: "dropdown-menu-right",
                MENULEFT: "dropdown-menu-left",
                BUTTONCLASS: "4" === t.major ? "btn-light" : "btn-default",
                POPOVERHEADER: "4" === t.major ? "popover-header" : "popover-title"
            },
            v = new RegExp(s.ARROW_UP + "|" + s.ARROW_DOWN),
            w = new RegExp("^" + s.TAB + "$|" + s.ESCAPE),
            x = (new RegExp(s.ENTER + "|" + s.SPACE), function(b, c) {
                var d = this;
                j.useDefault || (a.valHooks.select.set = j._set, j.useDefault = !0), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.options = c, this.selectpicker = {
                    main: {
                        map: {
                            newIndex: {},
                            originalIndex: {}
                        }
                    },
                    current: {
                        map: {}
                    },
                    search: {
                        map: {}
                    },
                    view: {},
                    keydown: {
                        keyHistory: "",
                        resetKeyHistory: {
                            start: function() {
                                return setTimeout(function() {
                                    d.selectpicker.keydown.keyHistory = "";
                                }, 800);
                            }
                        }
                    }
                }, null === this.options.title && (this.options.title = this.$element.attr("title"));
                var e = this.options.windowPadding;
                "number" == typeof e && (this.options.windowPadding = [e, e, e, e]), this.val = x.prototype.val, this.render = x.prototype.render, this.refresh = x.prototype.refresh, this.setStyle = x.prototype.setStyle, this.selectAll = x.prototype.selectAll, this.deselectAll = x.prototype.deselectAll, this.destroy = x.prototype.destroy, this.remove = x.prototype.remove, this.show = x.prototype.show, this.hide = x.prototype.hide, this.init();
            });
        x.VERSION = "1.13.1", x.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function(a, b) {
                return 1 == a ? "{0} item selected" : "{0} items selected";
            },
            maxOptionsText: function(a, b) {
                return [1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"];
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: !1,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: "btn-default",
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: !1,
            container: !1,
            hideDisabled: !1,
            showSubtext: !1,
            showIcon: !0,
            showContent: !0,
            dropupAuto: !0,
            header: !1,
            liveSearch: !1,
            liveSearchPlaceholder: null,
            liveSearchNormalize: !1,
            liveSearchStyle: "contains",
            actionsBox: !1,
            iconBase: "glyphicon",
            tickIcon: "glyphicon-ok",
            showTick: !1,
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: !1,
            mobile: !1,
            selectOnTab: !1,
            dropdownAlignRight: !1,
            windowPadding: 0,
            virtualScroll: 600
        }, "4" === t.major && (x.DEFAULTS.style = "btn-light", x.DEFAULTS.iconBase = "", x.DEFAULTS.tickIcon = "bs-ok-default"), x.prototype = {
            constructor: x,
            init: function() {
                var a = this,
                    b = this.$element.attr("id");
                this.$element.addClass("bs-select-hidden"), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createDropdown(), this.createLi(), this.$element.after(this.$newElement).prependTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.$element.removeClass("bs-select-hidden"), !0 === this.options.dropdownAlignRight && this.$menu.addClass(u.MENURIGHT), void 0 !== b && this.$button.attr("data-id", b), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container ? this.selectPosition() : this.$element.on("hide.bs.select", function() {
                    if (a.isVirtual()) {
                        var b = a.$menuInner[0],
                            c = b.firstChild.cloneNode(!1);
                        b.replaceChild(c, b.firstChild), b.scrollTop = 0;
                    }
                }), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
                    "hide.bs.dropdown": function(b) {
                        a.$menuInner.attr("aria-expanded", !1), a.$element.trigger("hide.bs.select", b);
                    },
                    "hidden.bs.dropdown": function(b) {
                        a.$element.trigger("hidden.bs.select", b);
                    },
                    "show.bs.dropdown": function(b) {
                        a.$menuInner.attr("aria-expanded", !0), a.$element.trigger("show.bs.select", b);
                    },
                    "shown.bs.dropdown": function(b) {
                        a.$element.trigger("shown.bs.select", b);
                    }
                }), a.$element[0].hasAttribute("required") && this.$element.on("invalid", function() {
                    a.$button.addClass("bs-invalid"), a.$element.on({
                        "shown.bs.select": function() {
                            a.$element.val(a.$element.val()).off("shown.bs.select");
                        },
                        "rendered.bs.select": function() {
                            this.validity.valid && a.$button.removeClass("bs-invalid"), a.$element.off("rendered.bs.select");
                        }
                    }), a.$button.on("blur.bs.select", function() {
                        a.$element.focus().blur(), a.$button.off("blur.bs.select");
                    });
                }), setTimeout(function() {
                    a.$element.trigger("loaded.bs.select");
                });
            },
            createDropdown: function() {
                var b = this.multiple || this.options.showTick ? " show-tick" : "",
                    c = this.autofocus ? " autofocus" : "",
                    d = this.options.header ? '<div class="' + u.POPOVERHEADER + '"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                    e = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + p(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search"></div>' : "",
                    f = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn ' + u.BUTTONCLASS + '">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn ' + u.BUTTONCLASS + '">' + this.options.deselectAllText + "</button></div></div>" : "",
                    g = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm ' + u.BUTTONCLASS + '">' + this.options.doneButtonText + "</button></div></div>" : "",
                    h = '<div class="dropdown bootstrap-select' + b + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + c + ' role="button"><div class="filter-option"><div class="filter-option-inner"><div class="filter-option-inner-inner"></div></div> </div>' + ("4" === t.major ? "" : '<span class="bs-caret">' + this.options.template.caret + "</span>") + '</button><div class="dropdown-menu ' + ("4" === t.major ? "" : u.SHOW) + '" role="combobox">' + d + e + f + '<div class="inner ' + u.SHOW + '" role="listbox" aria-expanded="false" tabindex="-1"><ul class="dropdown-menu inner ' + ("4" === t.major ? u.SHOW : "") + '"></ul></div>' + g + "</div></div>";
                return a(h);
            },
            setPositionData: function() {
                this.selectpicker.view.canHighlight = [];
                for (var a = 0; a < this.selectpicker.current.data.length; a++) {
                    var b = this.selectpicker.current.data[a],
                        c = !0;
                    "divider" === b.type ? (c = !1, b.height = this.sizeInfo.dividerHeight) : "optgroup-label" === b.type ? (c = !1, b.height = this.sizeInfo.dropdownHeaderHeight) : b.height = this.sizeInfo.liHeight, b.disabled && (c = !1), this.selectpicker.view.canHighlight.push(c), b.position = (0 === a ? 0 : this.selectpicker.current.data[a - 1].position) + b.height;
                }
            },
            isVirtual: function() {
                return !1 !== this.options.virtualScroll && this.selectpicker.main.elements.length >= this.options.virtualScroll || !0 === this.options.virtualScroll;
            },
            createView: function(c, d) {
                function e(a, d) {
                    var e, j, k, l, m, n, o, p = f.selectpicker.current.elements.length,
                        q = [],
                        r = void 0,
                        s = !0,
                        t = f.isVirtual();
                    f.selectpicker.view.scrollTop = a, !0 === t && f.sizeInfo.hasScrollBar && f.$menu[0].offsetWidth > f.sizeInfo.totalMenuWidth && (f.sizeInfo.menuWidth = f.$menu[0].offsetWidth, f.sizeInfo.totalMenuWidth = f.sizeInfo.menuWidth + f.sizeInfo.scrollBarWidth, f.$menu.css("min-width", f.sizeInfo.menuWidth)), e = Math.ceil(f.sizeInfo.menuInnerHeight / f.sizeInfo.liHeight * 1.5), j = Math.round(p / e) || 1;
                    for (var u = 0; u < j; u++) {
                        var v = (u + 1) * e;
                        if (u === j - 1 && (v = p), q[u] = [u * e + (u ? 1 : 0), v], !p) break;
                        void 0 === r && a <= f.selectpicker.current.data[v - 1].position - f.sizeInfo.menuInnerHeight && (r = u);
                    }
                    if (void 0 === r && (r = 0), m = [f.selectpicker.view.position0, f.selectpicker.view.position1], k = Math.max(0, r - 1), l = Math.min(j - 1, r + 1), f.selectpicker.view.position0 = Math.max(0, q[k][0]) || 0, f.selectpicker.view.position1 = Math.min(p, q[l][1]) || 0, n = m[0] !== f.selectpicker.view.position0 || m[1] !== f.selectpicker.view.position1, void 0 !== f.activeIndex && (h = f.selectpicker.current.elements[f.selectpicker.current.map.newIndex[f.prevActiveIndex]], i = f.selectpicker.current.elements[f.selectpicker.current.map.newIndex[f.activeIndex]], g = f.selectpicker.current.elements[f.selectpicker.current.map.newIndex[f.selectedIndex]], d && (f.activeIndex !== f.selectedIndex && (i.classList.remove("active"), i.firstChild && i.firstChild.classList.remove("active")), f.activeIndex = void 0), f.activeIndex && f.activeIndex !== f.selectedIndex && g && g.length && (g.classList.remove("active"), g.firstChild && g.firstChild.classList.remove("active"))), void 0 !== f.prevActiveIndex && f.prevActiveIndex !== f.activeIndex && f.prevActiveIndex !== f.selectedIndex && h && h.length && (h.classList.remove("active"), h.firstChild && h.firstChild.classList.remove("active")), (d || n) && (o = f.selectpicker.view.visibleElements ? f.selectpicker.view.visibleElements.slice() : [], f.selectpicker.view.visibleElements = f.selectpicker.current.elements.slice(f.selectpicker.view.position0, f.selectpicker.view.position1), f.setOptionStatus(), (c || !1 === t && d) && (s = !b(o, f.selectpicker.view.visibleElements)), (d || !0 === t) && s)) {
                        var w, x, y = f.$menuInner[0],
                            z = document.createDocumentFragment(),
                            A = y.firstChild.cloneNode(!1),
                            B = !0 === t ? f.selectpicker.view.visibleElements : f.selectpicker.current.elements;
                        y.replaceChild(A, y.firstChild);
                        for (var u = 0, C = B.length; u < C; u++) z.appendChild(B[u]);
                        !0 === t && (w = 0 === f.selectpicker.view.position0 ? 0 : f.selectpicker.current.data[f.selectpicker.view.position0 - 1].position, x = f.selectpicker.view.position1 > p - 1 ? 0 : f.selectpicker.current.data[p - 1].position - f.selectpicker.current.data[f.selectpicker.view.position1 - 1].position, y.firstChild.style.marginTop = w + "px", y.firstChild.style.marginBottom = x + "px"), y.firstChild.appendChild(z);
                    }
                    if (f.prevActiveIndex = f.activeIndex, f.options.liveSearch) {
                        if (c && d) {
                            var D, E = 0;
                            f.selectpicker.view.canHighlight[E] || (E = 1 + f.selectpicker.view.canHighlight.slice(1).indexOf(!0)), D = f.selectpicker.view.visibleElements[E], f.selectpicker.view.currentActive && (f.selectpicker.view.currentActive.classList.remove("active"), f.selectpicker.view.currentActive.firstChild && f.selectpicker.view.currentActive.firstChild.classList.remove("active")), D && (D.classList.add("active"), D.firstChild && D.firstChild.classList.add("active")), f.activeIndex = f.selectpicker.current.map.originalIndex[E];
                        }
                    } else f.$menuInner.focus();
                }
                d = d || 0;
                var f = this;
                this.selectpicker.current = c ? this.selectpicker.search : this.selectpicker.main;
                var g, h, i = [];
                this.setPositionData(), e(d, !0), this.$menuInner.off("scroll.createView").on("scroll.createView", function(a, b) {
                    f.noScroll || e(this.scrollTop, b), f.noScroll = !1;
                }), a(window).off("resize.createView").on("resize.createView", function() {
                    e(f.$menuInner[0].scrollTop);
                });
            },
            createLi: function() {
                var b, c = this,
                    d = [],
                    e = 0,
                    f = 0,
                    g = [],
                    h = 0,
                    i = 0,
                    j = -1;
                this.selectpicker.view.titleOption || (this.selectpicker.view.titleOption = document.createElement("option"));
                var k = {
                        span: document.createElement("span"),
                        subtext: document.createElement("small"),
                        a: document.createElement("a"),
                        li: document.createElement("li"),
                        whitespace: document.createTextNode(" ")
                    },
                    l = k.span.cloneNode(!1),
                    m = document.createDocumentFragment();
                l.className = c.options.iconBase + " " + c.options.tickIcon + " check-mark", k.a.appendChild(l), k.a.setAttribute("role", "option"), k.subtext.className = "text-muted", k.text = k.span.cloneNode(!1), k.text.className = "text";
                var n = function(a, b, c, d) {
                        var e = k.li.cloneNode(!1);
                        return a && (1 === a.nodeType || 11 === a.nodeType ? e.appendChild(a) : e.innerHTML = a), void 0 !== c && "" !== c && (e.className = c), void 0 !== d && null !== d && e.classList.add("optgroup-" + d), e;
                    },
                    o = function(a, b, c) {
                        var d = k.a.cloneNode(!0);
                        return a && (11 === a.nodeType ? d.appendChild(a) : d.insertAdjacentHTML("beforeend", a)), void 0 !== b & "" !== b && (d.className = b), "4" === t.major && d.classList.add("dropdown-item"), c && d.setAttribute("style", c), d;
                    },
                    q = function(a) {
                        var b, d, e = k.text.cloneNode(!1);
                        if (a.optionContent) e.innerHTML = a.optionContent;
                        else {
                            if (e.textContent = a.text, a.optionIcon) {
                                var f = k.whitespace.cloneNode(!1);
                                d = k.span.cloneNode(!1), d.className = c.options.iconBase + " " + a.optionIcon, m.appendChild(d), m.appendChild(f);
                            }
                            a.optionSubtext && (b = k.subtext.cloneNode(!1), b.innerHTML = a.optionSubtext, e.appendChild(b));
                        }
                        return m.appendChild(e), m;
                    },
                    r = function(a) {
                        var b, d, e = k.text.cloneNode(!1);
                        if (e.textContent = a.labelEscaped, a.labelIcon) {
                            var f = k.whitespace.cloneNode(!1);
                            d = k.span.cloneNode(!1), d.className = c.options.iconBase + " " + a.labelIcon, m.appendChild(d), m.appendChild(f);
                        }
                        return a.labelSubtext && (b = k.subtext.cloneNode(!1), b.textContent = a.labelSubtext, e.appendChild(b)), m.appendChild(e), m;
                    };
                if (this.options.title && !this.multiple) {
                    j--;
                    var s = this.$element[0],
                        v = !1,
                        w = !this.selectpicker.view.titleOption.parentNode;
                    if (w) {
                        this.selectpicker.view.titleOption.className = "bs-title-option", this.selectpicker.view.titleOption.value = "";
                        v = void 0 === a(s.options[s.selectedIndex]).attr("selected") && void 0 === this.$element.data("selected");
                    }(w || 0 !== this.selectpicker.view.titleOption.index) && s.insertBefore(this.selectpicker.view.titleOption, s.firstChild), v && (s.selectedIndex = 0);
                }
                var x = this.$element.find("option");
                x.each(function(k) {
                    var l = a(this);
                    if (j++, !l.hasClass("bs-title-option")) {
                        var m, s, t = l.data(),
                            v = this.className || "",
                            w = p(this.style.cssText),
                            y = t.content,
                            z = this.textContent,
                            A = t.tokens,
                            B = t.subtext,
                            C = t.icon,
                            D = l.parent(),
                            E = D[0],
                            F = "OPTGROUP" === E.tagName,
                            G = F && E.disabled,
                            H = this.disabled || G,
                            I = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName,
                            J = D.data();
                        if (!0 === t.hidden || c.options.hideDisabled && (H && !F || G)) {
                            if (m = t.prevHiddenIndex, l.next().data("prevHiddenIndex", void 0 !== m ? m : k), j--, !I && void 0 !== m) {
                                var K = x[m].previousElementSibling;
                                K && "OPTGROUP" === K.tagName && !K.disabled && (I = !0);
                            }
                            return void(I && "divider" !== g[g.length - 1].type && (j++, d.push(n(!1, 0, u.DIVIDER, h + "div")), g.push({
                                type: "divider",
                                optID: h,
                                originalIndex: k
                            })));
                        }
                        if (F && !0 !== t.divider) {
                            if (c.options.hideDisabled && H) {
                                if (void 0 === J.allOptionsDisabled) {
                                    var L = D.children();
                                    D.data("allOptionsDisabled", L.filter(":disabled").length === L.length);
                                }
                                if (D.data("allOptionsDisabled")) return void j--;
                            }
                            var M = " " + E.className || "";
                            if (!this.previousElementSibling) {
                                h += 1;
                                var N = E.label,
                                    O = p(N),
                                    P = J.subtext,
                                    Q = J.icon;
                                0 !== k && d.length > 0 && (j++, d.push(n(!1, 0, u.DIVIDER, h + "div")), g.push({
                                    type: "divider",
                                    optID: h,
                                    originalIndex: k
                                })), j++;
                                var R = r({
                                    labelEscaped: O,
                                    labelSubtext: P,
                                    labelIcon: Q
                                });
                                d.push(n(R, 0, "dropdown-header" + M, h)), g.push({
                                    content: O,
                                    subtext: P,
                                    type: "optgroup-label",
                                    optID: h,
                                    originalIndex: k
                                }), i = j - 1;
                            }
                            if (c.options.hideDisabled && H || !0 === t.hidden) return void j--;
                            s = q({
                                text: z,
                                optionContent: y,
                                optionSubtext: B,
                                optionIcon: C
                            }), d.push(n(o(s, "opt " + v + M, w), 0, "", h)), g.push({
                                content: y || z,
                                subtext: B,
                                tokens: A,
                                type: "option",
                                optID: h,
                                headerIndex: i,
                                lastIndex: i + E.childElementCount,
                                originalIndex: k,
                                data: t
                            }), e++;
                        } else if (!0 === t.divider) d.push(n(!1, 0, "divider")), g.push({
                            type: "divider",
                            originalIndex: k
                        });
                        else {
                            if (!I && c.options.hideDisabled && void 0 !== (m = t.prevHiddenIndex)) {
                                var K = x[m].previousElementSibling;
                                K && "OPTGROUP" === K.tagName && !K.disabled && (I = !0);
                            }
                            I && "divider" !== g[g.length - 1].type && (j++, d.push(n(!1, 0, u.DIVIDER, h + "div")), g.push({
                                type: "divider",
                                optID: h,
                                originalIndex: k
                            })), s = q({
                                text: z,
                                optionContent: y,
                                optionSubtext: B,
                                optionIcon: C
                            }), d.push(n(o(s, v, w))), g.push({
                                content: y || z,
                                subtext: B,
                                tokens: A,
                                type: "option",
                                originalIndex: k,
                                data: t
                            }), e++;
                        }
                        c.selectpicker.main.map.newIndex[k] = j, c.selectpicker.main.map.originalIndex[j] = k;
                        var S = g[g.length - 1];
                        S.disabled = H;
                        var T = 0;
                        S.content && (T += S.content.length), S.subtext && (T += S.subtext.length), C && (T += 1), T > f && (f = T, b = d[d.length - 1]);
                    }
                }), this.selectpicker.main.elements = d, this.selectpicker.main.data = g, this.selectpicker.current = this.selectpicker.main, this.selectpicker.view.widestOption = b, this.selectpicker.view.availableOptionsCount = e;
            },
            findLis: function() {
                return this.$menuInner.find(".inner > li");
            },
            render: function() {
                var a = this,
                    b = this.$element.find("option"),
                    c = [],
                    d = [];
                this.togglePlaceholder(), this.tabIndex();
                for (var e = 0, f = this.selectpicker.main.elements.length; e < f; e++) {
                    var g = this.selectpicker.main.map.originalIndex[e],
                        h = b[g];
                    if (h && h.selected && (c.push(h), d.length < 100 && "count" !== a.options.selectedTextFormat || 1 === c.length)) {
                        if (a.options.hideDisabled && (h.disabled || "OPTGROUP" === h.parentNode.tagName && h.parentNode.disabled)) return;
                        var i, j, k = this.selectpicker.main.data[e].data,
                            l = k.icon && a.options.showIcon ? '<i class="' + a.options.iconBase + " " + k.icon + '"></i> ' : "";
                        i = a.options.showSubtext && k.subtext && !a.multiple ? ' <small class="text-muted">' + k.subtext + "</small>" : "", j = h.title ? h.title : k.content && a.options.showContent ? k.content.toString() : l + h.innerHTML.trim() + i, d.push(j);
                    }
                }
                var m = this.multiple ? d.join(this.options.multipleSeparator) : d[0];
                if (c.length > 50 && (m += "..."), this.multiple && -1 !== this.options.selectedTextFormat.indexOf("count")) {
                    var n = this.options.selectedTextFormat.split(">");
                    if (n.length > 1 && c.length > n[1] || 1 === n.length && c.length >= 2) {
                        var o = this.selectpicker.view.availableOptionsCount;
                        m = ("function" == typeof this.options.countSelectedText ? this.options.countSelectedText(c.length, o) : this.options.countSelectedText).replace("{0}", c.length.toString()).replace("{1}", o.toString());
                    }
                }
                void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (m = this.options.title), m || (m = void 0 !== this.options.title ? this.options.title : this.options.noneSelectedText), this.$button[0].title = q(m.replace(/<[^>]*>?/g, "").trim()), this.$button.find(".filter-option-inner-inner")[0].innerHTML = m, this.$element.trigger("rendered.bs.select");
            },
            setStyle: function(a, b) {
                this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                var c = a || this.options.style;
                "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c));
            },
            liHeight: function(b) {
                if (b || !1 !== this.options.size && !this.sizeInfo) {
                    this.sizeInfo || (this.sizeInfo = {});
                    var c = document.createElement("div"),
                        d = document.createElement("div"),
                        f = document.createElement("div"),
                        g = document.createElement("ul"),
                        h = document.createElement("li"),
                        i = document.createElement("li"),
                        j = document.createElement("li"),
                        k = document.createElement("a"),
                        l = document.createElement("span"),
                        m = this.options.header && this.$menu.find("." + u.POPOVERHEADER).length > 0 ? this.$menu.find("." + u.POPOVERHEADER)[0].cloneNode(!0) : null,
                        n = this.options.liveSearch ? document.createElement("div") : null,
                        o = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        p = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                    if (this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth, l.className = "text", k.className = "dropdown-item", c.className = this.$menu[0].parentNode.className + " " + u.SHOW, c.style.width = this.sizeInfo.selectWidth + "px", d.className = "dropdown-menu " + u.SHOW, f.className = "inner " + u.SHOW, g.className = "dropdown-menu inner " + ("4" === t.major ? u.SHOW : ""), h.className = u.DIVIDER, i.className = "dropdown-header", l.appendChild(document.createTextNode("Inner text")), k.appendChild(l), j.appendChild(k), i.appendChild(l.cloneNode(!0)), this.selectpicker.view.widestOption && g.appendChild(this.selectpicker.view.widestOption.cloneNode(!0)), g.appendChild(j), g.appendChild(h), g.appendChild(i), m && d.appendChild(m), n) {
                        var q = document.createElement("input");
                        n.className = "bs-searchbox", q.className = "form-control", n.appendChild(q), d.appendChild(n);
                    }
                    o && d.appendChild(o), f.appendChild(g), d.appendChild(f), p && d.appendChild(p), c.appendChild(d), document.body.appendChild(c);
                    var r, s = k.offsetHeight,
                        v = i ? i.offsetHeight : 0,
                        w = m ? m.offsetHeight : 0,
                        x = n ? n.offsetHeight : 0,
                        y = o ? o.offsetHeight : 0,
                        z = p ? p.offsetHeight : 0,
                        A = a(h).outerHeight(!0),
                        B = !!window.getComputedStyle && window.getComputedStyle(d),
                        C = d.offsetWidth,
                        D = B ? null : a(d),
                        E = {
                            vert: e(B ? B.paddingTop : D.css("paddingTop")) + e(B ? B.paddingBottom : D.css("paddingBottom")) + e(B ? B.borderTopWidth : D.css("borderTopWidth")) + e(B ? B.borderBottomWidth : D.css("borderBottomWidth")),
                            horiz: e(B ? B.paddingLeft : D.css("paddingLeft")) + e(B ? B.paddingRight : D.css("paddingRight")) + e(B ? B.borderLeftWidth : D.css("borderLeftWidth")) + e(B ? B.borderRightWidth : D.css("borderRightWidth"))
                        },
                        F = {
                            vert: E.vert + e(B ? B.marginTop : D.css("marginTop")) + e(B ? B.marginBottom : D.css("marginBottom")) + 2,
                            horiz: E.horiz + e(B ? B.marginLeft : D.css("marginLeft")) + e(B ? B.marginRight : D.css("marginRight")) + 2
                        };
                    f.style.overflowY = "scroll", r = d.offsetWidth - C, document.body.removeChild(c), this.sizeInfo.liHeight = s, this.sizeInfo.dropdownHeaderHeight = v, this.sizeInfo.headerHeight = w, this.sizeInfo.searchHeight = x, this.sizeInfo.actionsHeight = y, this.sizeInfo.doneButtonHeight = z, this.sizeInfo.dividerHeight = A, this.sizeInfo.menuPadding = E, this.sizeInfo.menuExtras = F, this.sizeInfo.menuWidth = C, this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth, this.sizeInfo.scrollBarWidth = r, this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight, this.setPositionData();
                }
            },
            getSelectPosition: function() {
                var b, c = this,
                    d = a(window),
                    e = c.$newElement.offset(),
                    f = a(c.options.container);
                c.options.container && !f.is("body") ? (b = f.offset(), b.top += parseInt(f.css("borderTopWidth")), b.left += parseInt(f.css("borderLeftWidth"))) : b = {
                    top: 0,
                    left: 0
                };
                var g = c.options.windowPadding;
                this.sizeInfo.selectOffsetTop = e.top - b.top - d.scrollTop(), this.sizeInfo.selectOffsetBot = d.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight - b.top - g[2], this.sizeInfo.selectOffsetLeft = e.left - b.left - d.scrollLeft(), this.sizeInfo.selectOffsetRight = d.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth - b.left - g[1], this.sizeInfo.selectOffsetTop -= g[0], this.sizeInfo.selectOffsetLeft -= g[3];
            },
            setMenuSize: function(a) {
                this.getSelectPosition();
                var b, c, d, e, f, g, h, i = this.sizeInfo.selectWidth,
                    j = this.sizeInfo.liHeight,
                    k = this.sizeInfo.headerHeight,
                    l = this.sizeInfo.searchHeight,
                    m = this.sizeInfo.actionsHeight,
                    n = this.sizeInfo.doneButtonHeight,
                    o = this.sizeInfo.dividerHeight,
                    p = this.sizeInfo.menuPadding,
                    q = 0;
                if (this.options.dropupAuto && (h = j * this.selectpicker.current.elements.length + p.vert, this.$newElement.toggleClass(u.DROPUP, this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && h + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot)), "auto" === this.options.size) e = this.selectpicker.current.elements.length > 3 ? 3 * this.sizeInfo.liHeight + this.sizeInfo.menuExtras.vert - 2 : 0, c = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert, d = e + k + l + m + n, g = Math.max(e - p.vert, 0), this.$newElement.hasClass(u.DROPUP) && (c = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert), f = c, b = c - k - l - m - n - p.vert;
                else if (this.options.size && "auto" != this.options.size && this.selectpicker.current.elements.length > this.options.size) {
                    for (var r = 0; r < this.options.size; r++) "divider" === this.selectpicker.current.data[r].type && q++;
                    c = j * this.options.size + q * o + p.vert, b = c - p.vert, f = c + k + l + m + n, d = g = "";
                }
                "auto" === this.options.dropdownAlignRight && this.$menu.toggleClass(u.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < this.$menu[0].offsetWidth - i), this.$menu.css({
                    "max-height": f + "px",
                    overflow: "hidden",
                    "min-height": d + "px"
                }), this.$menuInner.css({
                    "max-height": b + "px",
                    "overflow-y": "auto",
                    "min-height": g + "px"
                }), this.sizeInfo.menuInnerHeight = b, this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight && (this.sizeInfo.hasScrollBar = !0, this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth, this.$menu.css("min-width", this.sizeInfo.totalMenuWidth)), this.dropdown && this.dropdown._popper && this.dropdown._popper.update();
            },
            setSize: function(b) {
                if (this.liHeight(b), this.options.header && this.$menu.css("padding-top", 0), !1 !== this.options.size) {
                    var c, d = this,
                        e = a(window),
                        f = 0;
                    this.setMenuSize(), "auto" === this.options.size ? (this.$searchbox.off("input.setMenuSize propertychange.setMenuSize").on("input.setMenuSize propertychange.setMenuSize", function() {
                        return d.setMenuSize();
                    }), e.off("resize.setMenuSize scroll.setMenuSize").on("resize.setMenuSize scroll.setMenuSize", function() {
                        return d.setMenuSize();
                    })) : this.options.size && "auto" != this.options.size && this.selectpicker.current.elements.length > this.options.size && (this.$searchbox.off("input.setMenuSize propertychange.setMenuSize"), e.off("resize.setMenuSize scroll.setMenuSize")), b ? f = this.$menuInner[0].scrollTop : d.multiple || "number" == typeof(c = d.selectpicker.main.map.newIndex[d.$element[0].selectedIndex]) && !1 !== d.options.size && (f = d.sizeInfo.liHeight * c, f = f - d.sizeInfo.menuInnerHeight / 2 + d.sizeInfo.liHeight / 2), d.createView(!1, f);
                }
            },
            setWidth: function() {
                var a = this;
                "auto" === this.options.width ? requestAnimationFrame(function() {
                    a.$menu.css("min-width", "0"), a.liHeight(), a.setMenuSize();
                    var b = a.$newElement.clone().appendTo("body"),
                        c = b.css("width", "auto").children("button").outerWidth();
                    b.remove(), a.sizeInfo.selectWidth = Math.max(a.sizeInfo.totalMenuWidth, c), a.$newElement.css("width", a.sizeInfo.selectWidth + "px");
                }) : "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", "")), this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width");
            },
            selectPosition: function() {
                this.$bsContainer = a('<div class="bs-container" />');
                var b, c, d, e = this,
                    f = a(this.options.container),
                    g = function(a) {
                        var g = {};
                        e.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass(u.DROPUP, a.hasClass(u.DROPUP)), b = a.offset(), f.is("body") ? c = {
                            top: 0,
                            left: 0
                        } : (c = f.offset(), c.top += parseInt(f.css("borderTopWidth")) - f.scrollTop(), c.left += parseInt(f.css("borderLeftWidth")) - f.scrollLeft()), d = a.hasClass(u.DROPUP) ? 0 : a[0].offsetHeight, t.major < 4 && (g.top = b.top - c.top + d, g.left = b.left - c.left), g.width = a[0].offsetWidth, e.$bsContainer.css(g);
                    };
                this.$button.on("click.bs.dropdown.data-api", function() {
                    e.isDisabled() || (g(e.$newElement), e.$bsContainer.appendTo(e.options.container).toggleClass(u.SHOW, !e.$button.hasClass(u.SHOW)).append(e.$menu));
                }), a(window).on("resize scroll", function() {
                    g(e.$newElement);
                }), this.$element.on("hide.bs.select", function() {
                    e.$menu.data("height", e.$menu.height()), e.$bsContainer.detach();
                });
            },
            setOptionStatus: function() {
                var a = this,
                    b = this.$element.find("option");
                if (a.noScroll = !1, a.selectpicker.view.visibleElements && a.selectpicker.view.visibleElements.length)
                    for (var c = 0; c < a.selectpicker.view.visibleElements.length; c++) {
                        var d = a.selectpicker.current.map.originalIndex[c + a.selectpicker.view.position0],
                            e = b[d];
                        if (e) {
                            var f = this.selectpicker.main.map.newIndex[d],
                                g = this.selectpicker.main.elements[f];
                            a.setDisabled(d, e.disabled || "OPTGROUP" === e.parentNode.tagName && e.parentNode.disabled, f, g), a.setSelected(d, e.selected, f, g);
                        }
                    }
            },
            setSelected: function(a, b, c, d) {
                var e, f, g, h = void 0 !== this.activeIndex,
                    i = this.activeIndex === a,
                    j = i || b && !this.multiple && !h;
                c || (c = this.selectpicker.main.map.newIndex[a]), d || (d = this.selectpicker.main.elements[c]), g = d.firstChild, b && (this.selectedIndex = a), d.classList.toggle("selected", b), d.classList.toggle("active", j), j && (this.selectpicker.view.currentActive = d, this.activeIndex = a), g && (g.classList.toggle("selected", b), g.classList.toggle("active", j), g.setAttribute("aria-selected", b)), j || !h && b && void 0 !== this.prevActiveIndex && (e = this.selectpicker.main.map.newIndex[this.prevActiveIndex], f = this.selectpicker.main.elements[e], f.classList.remove("selected"), f.classList.remove("active"), f.firstChild && (f.firstChild.classList.remove("selected"), f.firstChild.classList.remove("active")));
            },
            setDisabled: function(a, b, c, d) {
                var e;
                c || (c = this.selectpicker.main.map.newIndex[a]), d || (d = this.selectpicker.main.elements[c]), e = d.firstChild, d.classList.toggle(u.DISABLED, b), e && ("4" === t.major && e.classList.toggle(u.DISABLED, b), e.setAttribute("aria-disabled", b), b ? e.setAttribute("tabindex", -1) : e.setAttribute("tabindex", 0));
            },
            isDisabled: function() {
                return this.$element[0].disabled;
            },
            checkDisabled: function() {
                var a = this;
                this.isDisabled() ? (this.$newElement.addClass(u.DISABLED), this.$button.addClass(u.DISABLED).attr("tabindex", -1).attr("aria-disabled", !0)) : (this.$button.hasClass(u.DISABLED) && (this.$newElement.removeClass(u.DISABLED), this.$button.removeClass(u.DISABLED).attr("aria-disabled", !1)), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() {
                    return !a.isDisabled();
                });
            },
            togglePlaceholder: function() {
                var a = this.$element[0],
                    b = a.selectedIndex,
                    c = -1 === b;
                c || a.options[b].value || (c = !0), this.$button.toggleClass("bs-placeholder", c);
            },
            tabIndex: function() {
                this.$element.data("tabindex") !== this.$element.attr("tabindex") && -98 !== this.$element.attr("tabindex") && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98);
            },
            clickListener: function() {
                var b = this,
                    d = a(document);
                d.data("spaceSelect", !1), this.$button.on("keyup", function(a) {
                    /(32)/.test(a.keyCode.toString(10)) && d.data("spaceSelect") && (a.preventDefault(), d.data("spaceSelect", !1));
                }), this.$newElement.on("show.bs.dropdown", function() {
                    t.major > 3 && !b.dropdown && (b.dropdown = b.$button.data("bs.dropdown"), b.dropdown._menu = b.$menu[0]);
                }), this.$button.on("click.bs.dropdown.data-api", function() {
                    b.$newElement.hasClass(u.SHOW) || b.setSize();
                }), this.$element.on("shown.bs.select", function() {
                    b.$menuInner[0].scrollTop !== b.selectpicker.view.scrollTop && (b.$menuInner[0].scrollTop = b.selectpicker.view.scrollTop), b.options.liveSearch ? b.$searchbox.focus() : b.$menuInner.focus();
                }), this.$menuInner.on("click", "li a", function(d, e) {
                    var f = a(this),
                        g = b.isVirtual() ? b.selectpicker.view.position0 : 0,
                        h = b.selectpicker.current.map.originalIndex[f.parent().index() + g],
                        i = c(b.$element[0]),
                        j = b.$element.prop("selectedIndex"),
                        l = !0;
                    if (b.multiple && 1 !== b.options.maxOptions && d.stopPropagation(), d.preventDefault(), !b.isDisabled() && !f.parent().hasClass(u.DISABLED)) {
                        var m = b.$element.find("option"),
                            n = m.eq(h),
                            o = n.prop("selected"),
                            p = n.parent("optgroup"),
                            q = b.options.maxOptions,
                            r = p.data("maxOptions") || !1;
                        if (h === b.activeIndex && (e = !0), e || (b.prevActiveIndex = b.activeIndex, b.activeIndex = void 0), b.multiple) {
                            if (n.prop("selected", !o), b.setSelected(h, !o), f.blur(), !1 !== q || !1 !== r) {
                                var s = q < m.filter(":selected").length,
                                    t = r < p.find("option:selected").length;
                                if (q && s || r && t)
                                    if (q && 1 == q) m.prop("selected", !1), n.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(h, !0);
                                    else if (r && 1 == r) {
                                    p.find("option:selected").prop("selected", !1), n.prop("selected", !0);
                                    var v = b.selectpicker.current.data[f.parent().index() + b.selectpicker.view.position0].optID;
                                    b.$menuInner.find(".optgroup-" + v).removeClass("selected"), b.setSelected(h, !0);
                                } else {
                                    var w = "string" == typeof b.options.maxOptionsText ? [b.options.maxOptionsText, b.options.maxOptionsText] : b.options.maxOptionsText,
                                        x = "function" == typeof w ? w(q, r) : w,
                                        y = x[0].replace("{n}", q),
                                        z = x[1].replace("{n}", r),
                                        A = a('<div class="notify"></div>');
                                    x[2] && (y = y.replace("{var}", x[2][q > 1 ? 0 : 1]), z = z.replace("{var}", x[2][r > 1 ? 0 : 1])), n.prop("selected", !1), b.$menu.append(A), q && s && (A.append(a("<div>" + y + "</div>")), l = !1, b.$element.trigger("maxReached.bs.select")), r && t && (A.append(a("<div>" + z + "</div>")), l = !1, b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                        b.setSelected(h, !1);
                                    }, 10), A.delay(750).fadeOut(300, function() {
                                        a(this).remove();
                                    });
                                }
                            }
                        } else m.prop("selected", !1), n.prop("selected", !0), b.setSelected(h, !0);
                        !b.multiple || b.multiple && 1 === b.options.maxOptions ? b.$button.focus() : b.options.liveSearch && b.$searchbox.focus(), l && (i != c(b.$element[0]) && b.multiple || j != b.$element.prop("selectedIndex") && !b.multiple) && (k = [h, n.prop("selected"), i], b.$element.triggerNative("change"));
                    }
                }), this.$menu.on("click", "li." + u.DISABLED + " a, ." + u.POPOVERHEADER + ", ." + u.POPOVERHEADER + " :not(.close)", function(c) {
                    c.currentTarget == this && (c.preventDefault(), c.stopPropagation(), b.options.liveSearch && !a(c.target).hasClass("close") ? b.$searchbox.focus() : b.$button.focus());
                }), this.$menuInner.on("click", ".divider, .dropdown-header", function(a) {
                    a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus();
                }), this.$menu.on("click", "." + u.POPOVERHEADER + " .close", function() {
                    b.$button.click();
                }), this.$searchbox.on("click", function(a) {
                    a.stopPropagation();
                }), this.$menu.on("click", ".actions-btn", function(c) {
                    b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).hasClass("bs-select-all") ? b.selectAll() : b.deselectAll();
                }), this.$element.on({
                    change: function() {
                        b.render(), b.$element.trigger("changed.bs.select", k), k = null;
                    },
                    focus: function() {
                        b.$button.focus();
                    }
                });
            },
            liveSearchListener: function() {
                var a = this,
                    b = document.createElement("li");
                this.$button.on("click.bs.dropdown.data-api", function() {
                    a.$searchbox.val() && a.$searchbox.val("");
                }), this.$searchbox.on("click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api", function(a) {
                    a.stopPropagation();
                }), this.$searchbox.on("input propertychange", function() {
                    var c = a.$searchbox.val();
                    if (a.selectpicker.search.map.newIndex = {}, a.selectpicker.search.map.originalIndex = {}, a.selectpicker.search.elements = [], a.selectpicker.search.data = [], c) {
                        var e, f = [],
                            g = c.toUpperCase(),
                            h = {},
                            i = [],
                            j = a._searchStyle(),
                            k = a.options.liveSearchNormalize;
                        a._$lisSelected = a.$menuInner.find(".selected");
                        for (var e = 0; e < a.selectpicker.main.data.length; e++) {
                            var l = a.selectpicker.main.data[e];
                            h[e] || (h[e] = d(l, g, j, k)), h[e] && void 0 !== l.headerIndex && -1 === i.indexOf(l.headerIndex) && (l.headerIndex > 0 && (h[l.headerIndex - 1] = !0, i.push(l.headerIndex - 1)), h[l.headerIndex] = !0, i.push(l.headerIndex), h[l.lastIndex + 1] = !0), h[e] && "optgroup-label" !== l.type && i.push(e);
                        }
                        for (var e = 0, m = i.length; e < m; e++) {
                            var n = i[e],
                                o = i[e - 1],
                                l = a.selectpicker.main.data[n],
                                q = a.selectpicker.main.data[o];
                            ("divider" !== l.type || "divider" === l.type && q && "divider" !== q.type && m - 1 !== e) && (a.selectpicker.search.data.push(l), f.push(a.selectpicker.main.elements[n]), a.selectpicker.search.map.newIndex[l.originalIndex] = f.length - 1, a.selectpicker.search.map.originalIndex[f.length - 1] = l.originalIndex);
                        }
                        a.activeIndex = void 0, a.noScroll = !0, a.$menuInner.scrollTop(0), a.selectpicker.search.elements = f, a.createView(!0), f.length || (b.className = "no-results", b.innerHTML = a.options.noneResultsText.replace("{0}", '"' + p(c) + '"'), a.$menuInner[0].firstChild.appendChild(b));
                    } else a.$menuInner.scrollTop(0), a.createView(!1);
                });
            },
            _searchStyle: function() {
                return this.options.liveSearchStyle || "contains";
            },
            val: function(a) {
                return void 0 !== a ? (this.$element.val(a).triggerNative("change"), this.$element) : this.$element.val();
            },
            changeAll: function(a) {
                if (this.multiple) {
                    void 0 === a && (a = !0);
                    var b = this.$element.find("option"),
                        d = 0,
                        e = 0,
                        f = c(this.$element[0]);
                    this.$element.addClass("bs-select-hidden");
                    for (var g = 0; g < this.selectpicker.current.elements.length; g++) {
                        var h = this.selectpicker.current.map.originalIndex[g],
                            i = b[h];
                        i && (i.selected && d++, i.selected = a, i.selected && e++);
                    }
                    this.$element.removeClass("bs-select-hidden"), d !== e && (this.setOptionStatus(), this.togglePlaceholder(), k = [null, null, f], this.$element.triggerNative("change"));
                }
            },
            selectAll: function() {
                return this.changeAll(!0);
            },
            deselectAll: function() {
                return this.changeAll(!1);
            },
            toggle: function(a) {
                a = a || window.event, a && a.stopPropagation(), this.$button.trigger("click.bs.dropdown.data-api");
            },
            keydown: function(b) {
                var c, e, f, g, h, i = a(this),
                    j = i.is("input") ? i.parent().parent() : i.parent(),
                    k = j.data("this"),
                    l = k.findLis(),
                    m = !1,
                    n = b.which === s.TAB && !i.hasClass("dropdown-toggle") && !k.options.selectOnTab,
                    o = v.test(b.which) || n,
                    p = k.$menuInner[0].scrollTop,
                    q = k.isVirtual(),
                    t = !0 === q ? k.selectpicker.view.position0 : 0;
                if (e = k.$newElement.hasClass(u.SHOW), !e && (o || b.which >= 48 && b.which <= 57 || b.which >= 96 && b.which <= 105 || b.which >= 65 && b.which <= 90) && k.$button.trigger("click.bs.dropdown.data-api"), b.which === s.ESCAPE && e && (b.preventDefault(), k.$button.trigger("click.bs.dropdown.data-api").focus()), o) {
                    if (!l.length) return;
                    c = !0 === q ? l.index(l.filter(".active")) : k.selectpicker.current.map.newIndex[k.activeIndex], void 0 === c && (c = -1), -1 !== c && (f = k.selectpicker.current.elements[c + t], f.classList.remove("active"), f.firstChild && f.firstChild.classList.remove("active")), b.which === s.ARROW_UP ? (-1 !== c && c--, c + t < 0 && (c += l.length), k.selectpicker.view.canHighlight[c + t] || -1 === (c = k.selectpicker.view.canHighlight.slice(0, c + t).lastIndexOf(!0) - t) && (c = l.length - 1)) : (b.which === s.ARROW_DOWN || n) && (c++, c + t >= k.selectpicker.view.canHighlight.length && (c = 0), k.selectpicker.view.canHighlight[c + t] || (c = c + 1 + k.selectpicker.view.canHighlight.slice(c + t + 1).indexOf(!0))), b.preventDefault();
                    var x = t + c;
                    b.which === s.ARROW_UP ? 0 === t && c === l.length - 1 ? (k.$menuInner[0].scrollTop = k.$menuInner[0].scrollHeight, x = k.selectpicker.current.elements.length - 1) : (g = k.selectpicker.current.data[x], h = g.position - g.height, m = h < p) : (b.which === s.ARROW_DOWN || n) && (0 !== t && 0 === c ? (k.$menuInner[0].scrollTop = 0, x = 0) : (g = k.selectpicker.current.data[x], h = g.position - k.sizeInfo.menuInnerHeight, m = h > p)), f = k.selectpicker.current.elements[x], f.classList.add("active"), f.firstChild && f.firstChild.classList.add("active"), k.activeIndex = k.selectpicker.current.map.originalIndex[x], k.selectpicker.view.currentActive = f, m && (k.$menuInner[0].scrollTop = h), k.options.liveSearch ? k.$searchbox.focus() : i.focus();
                } else if (!i.is("input") && !w.test(b.which) || b.which === s.SPACE && k.selectpicker.keydown.keyHistory) {
                    var y, z, A = [];
                    b.preventDefault(), k.selectpicker.keydown.keyHistory += r[b.which], k.selectpicker.keydown.resetKeyHistory.cancel && clearTimeout(k.selectpicker.keydown.resetKeyHistory.cancel), k.selectpicker.keydown.resetKeyHistory.cancel = k.selectpicker.keydown.resetKeyHistory.start(), z = k.selectpicker.keydown.keyHistory, /^(.)\1+$/.test(z) && (z = z.charAt(0));
                    for (var B = 0; B < k.selectpicker.current.data.length; B++) {
                        var C, D = k.selectpicker.current.data[B];
                        C = d(D, z, "startsWith", !0), C && k.selectpicker.view.canHighlight[B] && (D.index = B, A.push(D.originalIndex));
                    }
                    if (A.length) {
                        var E = 0;
                        l.removeClass("active").find("a").removeClass("active"), 1 === z.length && (E = A.indexOf(k.activeIndex), -1 === E || E === A.length - 1 ? E = 0 : E++), y = k.selectpicker.current.map.newIndex[A[E]], g = k.selectpicker.current.data[y], p - g.position > 0 ? (h = g.position - g.height, m = !0) : (h = g.position - k.sizeInfo.menuInnerHeight, m = g.position > p + k.sizeInfo.menuInnerHeight), f = k.selectpicker.current.elements[y], f.classList.add("active"), f.firstChild && f.firstChild.classList.add("active"), k.activeIndex = A[E], f.firstChild.focus(), m && (k.$menuInner[0].scrollTop = h), i.focus();
                    }
                }
                e && (b.which === s.SPACE && !k.selectpicker.keydown.keyHistory || b.which === s.ENTER || b.which === s.TAB && k.options.selectOnTab) && (b.which !== s.SPACE && b.preventDefault(), k.options.liveSearch && b.which === s.SPACE || (k.$menuInner.find(".active a").trigger("click", !0), i.focus(), k.options.liveSearch || (b.preventDefault(), a(document).data("spaceSelect", !0))));
            },
            mobile: function() {
                this.$element.addClass("mobile-device");
            },
            refresh: function() {
                var b = a.extend({}, this.options, this.$element.data());
                this.options = b, this.selectpicker.main.map.newIndex = {}, this.selectpicker.main.map.originalIndex = {}, this.createLi(), this.checkDisabled(), this.render(), this.setStyle(), this.setWidth(), this.setSize(!0), this.$element.trigger("refreshed.bs.select");
            },
            hide: function() {
                this.$newElement.hide();
            },
            show: function() {
                this.$newElement.show();
            },
            remove: function() {
                this.$newElement.remove(), this.$element.remove();
            },
            destroy: function() {
                this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker");
            }
        };
        var y = a.fn.selectpicker;
        a.fn.selectpicker = g, a.fn.selectpicker.Constructor = x, a.fn.selectpicker.noConflict = function() {
            return a.fn.selectpicker = y, this;
        }, a(document).off("keydown.bs.dropdown.data-api").on("keydown.bs.select", '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bs-searchbox input', x.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bs-searchbox input', function(a) {
            a.stopPropagation();
        }), a(window).on("load.bs.select.data-api", function() {
            a(".selectpicker").each(function() {
                var b = a(this);
                g.call(b, b.data());
            });
        });
    }(a);
});

/* UItoTop jQuery Plugin 1.2 by Matt Varone */
! function(a) {
    a.fn.UItoTop = function(b) {
        var c = {
                text: "To Top",
                min: 200,
                inDelay: 600,
                outDelay: 400,
                containerID: "toTop",
                containerHoverID: "toTopHover",
                scrollSpeed: 750,
                easingType: "linear"
            },
            d = a.extend(c, b),
            e = "#" + d.containerID,
            f = "#" + d.containerHoverID;
        a("body").append('<a href="#" id="' + d.containerID + '">' + d.text + "</a>"), a(e).hide().on("click.UItoTop", function() {
            return a("html, body").animate({
                scrollTop: 0
            }, d.scrollSpeed, d.easingType), a("#" + d.containerHoverID, this).stop().animate({
                opacity: 0
            }, d.inDelay, d.easingType), !1;
        }).prepend('<span id="' + d.containerHoverID + '"></span>').hover(function() {
            a(f, this).stop().animate({
                opacity: 1
            }, 600, "linear");
        }, function() {
            a(f, this).stop().animate({
                opacity: 0
            }, 700, "linear");
        }), a(window).scroll(function() {
            var b = a(window).scrollTop();
            "undefined" == typeof document.body.style.maxHeight && a(e).css({
                position: "absolute",
                top: b + a(window).height() - 50
            }), b > d.min ? a(e).fadeIn(d.inDelay) : a(e).fadeOut(d.Outdelay);
        });
    };
}(jQuery);

/*
 * jquery-match-height 0.7.2 by @liabru
 * http://brm.io/jquery-match-height/
 * License MIT
 */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function(t) {
    var e = -1,
        o = -1,
        n = function(t) {
            return parseFloat(t) || 0;
        },
        a = function(e) {
            var o = 1,
                a = t(e),
                i = null,
                r = [];
            return a.each(function() {
                var e = t(this),
                    a = e.offset().top - n(e.css("margin-top")),
                    s = r.length > 0 ? r[r.length - 1] : null;
                null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a;
            }), r;
        },
        i = function(e) {
            var o = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o);
        },
        r = t.fn.matchHeight = function(e) {
            var o = i(e);
            if (o.remove) {
                var n = this;
                return this.css(o.property, ""), t.each(r._groups, function(t, e) {
                    e.elements = e.elements.not(n);
                }), this;
            }
            return this.length <= 1 && !o.target ? this : (r._groups.push({
                elements: this,
                options: o
            }), r._apply(this, o), this);
        };
    r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null,
        r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function(e, o) {
            var s = i(o),
                h = t(e),
                l = [h],
                c = t(window).scrollTop(),
                p = t("html").outerHeight(!0),
                u = h.parents().filter(":hidden");
            return u.each(function() {
                    var e = t(this);
                    e.data("style-cache", e.attr("style"));
                }), u.css("display", "block"), s.byRow && !s.target && (h.each(function() {
                    var e = t(this),
                        o = e.css("display");
                    "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
                        display: o,
                        "padding-top": "0",
                        "padding-bottom": "0",
                        "margin-top": "0",
                        "margin-bottom": "0",
                        "border-top-width": "0",
                        "border-bottom-width": "0",
                        height: "100px",
                        overflow: "hidden"
                    });
                }), l = a(h), h.each(function() {
                    var e = t(this);
                    e.attr("style", e.data("style-cache") || "");
                })), t.each(l, function(e, o) {
                    var a = t(o),
                        i = 0;
                    if (s.target) i = s.target.outerHeight(!1);
                    else {
                        if (s.byRow && a.length <= 1) return void a.css(s.property, "");
                        a.each(function() {
                            var e = t(this),
                                o = e.attr("style"),
                                n = e.css("display");
                            "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                            var a = {
                                display: n
                            };
                            a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "");
                        });
                    }
                    a.each(function() {
                        var e = t(this),
                            o = 0;
                        s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px"));
                    });
                }), u.each(function() {
                    var e = t(this);
                    e.attr("style", e.data("style-cache") || null);
                }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
                this;
        }, r._applyDataApi = function() {
            var e = {};
            t("[data-match-height], [data-mh]").each(function() {
                var o = t(this),
                    n = o.attr("data-mh") || o.attr("data-match-height");
                n in e ? e[n] = e[n].add(o) : e[n] = o;
            }), t.each(e, function() {
                this.matchHeight(!0);
            });
        };
    var s = function(e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function() {
            r._apply(this.elements, this.options);
        }), r._afterUpdate && r._afterUpdate(e, r._groups);
    };
    r._update = function(n, a) {
        if (a && "resize" === a.type) {
            var i = t(window).width();
            if (i === e) return;
            e = i;
        }
        n ? o === -1 && (o = setTimeout(function() {
            s(a), o = -1;
        }, r._throttle)) : s(a);
    }, t(r._applyDataApi);
    var h = t.fn.on ? "on" : "bind";
    t(window)[h]("load", function(t) {
        r._update(!1, t);
    }), t(window)[h]("resize orientationchange", function(t) {
        r._update(!0, t);
    });
});

/***********************************
Nav Accordion Plugin v1.1.2
************************************/
(function($) {
    $.fn.navAccordion = function(options, callback) {
        this.each(function() {
            var settings = $.extend({
                expandButtonText: "+",
                collapseButtonText: "-",
                selectedExpand: "true",
                selectedClass: "selected",
                multipleLevels: "true",
                buttonWidth: "55px",
                buttonPosition: "right",
                slideSpeed: "fast",
                parentElement: "li",
                childElement: "ul",
                headersOnly: false,
                headersOnlyCheck: false,
                delayLink: false,
                delayAmount: null
            }, options);
            var container = this,
                multi = settings.multipleLevels ? '' : ' > ' + settings.childElement + ' > ';
            $(container).addClass('accordion-nav');
            $(multi + settings.parentElement, container).each(function() {
                if ($(this).contents(settings.childElement).length > 0 && settings.headersOnlyCheck == false || !$('> a', this).attr('href') && settings.headersOnlyCheck == true) {
                    $(this).addClass('has-subnav').css('position', 'relative').find('>a').css('padding-' + settings.buttonPosition, settings.buttonWidth);
                    $(' > ' + settings.childElement, this).before('<span class="accordion-btn-wrap"><span class="accordion-btn accordion-collapsed">' + settings.expandButtonText + '</span><span class="accordion-btn accordion-expanded">' + settings.collapseButtonText + '</span></span>');
                    $('.accordion-btn-wrap', this).css({
                        'width': settings.buttonWidth,
                        'position': 'absolute',
                        'top': 0,
                        'text-align': 'center',
                        'cursor': 'pointer',
                        'display': 'inline-block'
                    }).css(settings.buttonPosition, 0);
                    $('.accordion-btn ', this).css({
                        'display': 'inline-block',
                        'width': '100%'
                    });
                    $('.accordion-expanded', this).css('display', 'none');
                }
                if (!$('> a', this).attr('href') || settings.headersOnly) {
                    $(this).addClass('accordion-header-only').find('.accordion-btn-wrap').css({
                        'width': '100%',
                        'text-align': settings.buttonPosition
                    }).find('.accordion-btn ').css({
                        'width': settings.buttonWidth,
                        'text-align': 'center'
                    });
                }
                if (settings.delayLink && !settings.headersOnly) {
                    var currentThis = this,
                        speed = settings.delayAmount != null ? settings.delayAmount : settings.slideSpeed;
                    if (speed == "fast") {
                        speed = 200;
                    } else if (speed == "slow") {
                        speed = 600;
                    }
                    $('> a', currentThis).on('click', function(e) {
                        if (!$('> .accordion-btn-wrap', currentThis).hasClass("accordion-active")) {
                            e.preventDefault();
                            var href = $(this).attr('href');
                            clickToggle($('> .accordion-btn-wrap', currentThis));
                            setTimeout(function() {
                                window.location = href;
                            }, speed);
                        }
                    });
                }
            });
            var selectedNavAccordion = $(settings.parentElement + '.' + settings.selectedClass + ' > .accordion-btn-wrap', container);
            var buttonheightResize = debounce(function() {
                buttonheight();
                expandSelected();
            }, 250);
            $(window).on('resize', buttonheightResize);
            buttonheight();
            expandSelected();
            $(container).on('click', '.accordion-btn-wrap', function(e) {
                e.preventDefault();
                clickToggle(this);
            });
            if (typeof callback == "function") {
                callback();
            }

            function clickToggle(element) {
                var nextChild = $(element).next(settings.childElement),
                    currentExpandBtn = $('.accordion-expanded', element),
                    currentCollapseBtn = $('.accordion-collapsed', element),
                    parentObj = $(element).closest(settings.parentElement);
                if (nextChild.is(':visible')) {
                    nextChild.slideUp(settings.slideSpeed);
                    $(element).removeClass('accordion-active');
                    currentExpandBtn.css('display', 'none');
                    currentCollapseBtn.css('display', 'inline-block');
                    parentObj.add(parentObj.siblings('.active')).add(parentObj.find('.active')).removeClass('active');
                } else {
                    $(element).closest(settings.childElement).find('.accordion-active').removeClass('accordion-active').next(settings.childElement).slideUp(settings.slideSpeed).prev().find('.accordion-expanded').css('display', 'none').parent().find('.accordion-collapsed').css('display', 'inline-block');
                    parentObj.add(parentObj.siblings('.active')).add(parentObj.find('.active')).removeClass('active');
                    $(element).addClass('accordion-active');
                    nextChild.slideToggle(settings.slideSpeed);
                    currentExpandBtn.css('display', 'inline-block');
                    currentCollapseBtn.css('display', 'none');
                    parentObj.addClass('active');
                }
            }

            function expandSelected() {
                if (settings.selectedExpand) {
                    if (!settings.headersOnlyCheck) {
                        selectedNavAccordion.find('.accordion-expanded').css('display', 'inline-block');
                        selectedNavAccordion.find('.accordion-collapsed').css('display', 'none');
                        selectedNavAccordion.addClass('accordion-active').next(settings.childElement).css('display', 'block');
                        selectedNavAccordion.closest(settings.parentElement).addClass('active');
                    } else {
                        $(settings.parentElement + '.' + settings.selectedClass + ' > ' + settings.childElement, container).css('display', 'block');
                        $(settings.parentElement + '.' + settings.selectedClass).addClass('active');
                    }
                }
            }

            function buttonheight() {
                $('.accordion-btn', container).each(function() {
                    $(settings.parentElement + '.has-subnav > ' + settings.childElement, container).css('display', 'block');
                    var parentItem = $(this).closest(settings.parentElement),
                        lineheight = $('> a', parentItem).innerHeight();
                    $(this).css({
                        'line-height': lineheight + 'px',
                        'height': lineheight
                    });
                    $(settings.parentElement + (settings.headersOnlyCheck ? ' ' : '.has-subnav > ') + settings.childElement, container).css('display', 'none');
                    $('.accordion-expanded').css('display', 'none');
                    $('.accordion-collapsed').css('display', 'inline-block');
                });
            }

            function debounce(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this,
                        args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            };
        });
    };
})(jQuery);

/* Load More Plugin */
! function(t, i, n, s) {
    "use strict";
    var o = "loadMore";

    function a(i, n) {
        this.self = this, this.elem = i, this.$elem = t(i), this.metadata = this.$elem.data("options"), this.options = t.extend({}, t.fn[o].default, this.metadata, n), this.lists = t(i).children(this.options.selector);
    }
    t.extend(a.prototype, {
        inIt: function() {
            this.lists.length <= this.options.limit ? this.Out() : this.More(), this.firstLoad = [], this.firstLoad.push(this.lists.splice(0, this.options.limit)), this.show(this.firstLoad[0]);
        },
        More: function() {
            var i = this,
                n = 0;
            t(i.options.loadBtn).on("click", function() {
                n += 1, i.lists.length && (i.firstLoad.push(i.lists.splice(0, i.options.load)), i.show(i.firstLoad[n])), 0 == i.lists.length && i.Out();
            });
        },
        show: function(i) {
            t(i).fadeIn(), this.options.animate && this.animateCss(this.options.animateIn, i);
        },
        Out: function() {
            t(this.options.loadBtn).hide();
        },
        animateCss: function(i, n) {
            t(n).addClass("animated " + i).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                t(n).removeClass("animated " + i);
            });
        }
    }), t.fn[o] = function(t) {
        return this.each(function() {
            new a(this, t).inIt();
        });
    }, t.fn[o].default = {
        selector: "",
        limit: 3,
        load: 3,
        loadBtn: "",
        animate: !0,
        animateIn: "fadeInUp"
    };
}(jQuery, window, document);

/*! jQuery UI - v1.13.0 - 2021-10-07
 * http://jqueryui.com
 * Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-patch.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
}(function(V) {
    "use strict";
    V.ui = V.ui || {};
    V.ui.version = "1.13.0";
    var n, i = 0,
        a = Array.prototype.hasOwnProperty,
        r = Array.prototype.slice;
    V.cleanData = (n = V.cleanData, function(t) {
        for (var e, i, s = 0; null != (i = t[s]); s++)(e = V._data(i, "events")) && e.remove && V(i).triggerHandler("remove");
        n(t);
    }), V.widget = function(t, i, e) {
        var s, n, o, a = {},
            r = t.split(".")[0],
            l = r + "-" + (t = t.split(".")[1]);
        return e || (e = i, i = V.Widget), Array.isArray(e) && (e = V.extend.apply(null, [{}].concat(e))), V.expr.pseudos[l.toLowerCase()] = function(t) {
            return !!V.data(t, l);
        }, V[r] = V[r] || {}, s = V[r][t], n = V[r][t] = function(t, e) {
            if (!this._createWidget) return new n(t, e);
            arguments.length && this._createWidget(t, e);
        }, V.extend(n, s, {
            version: e.version,
            _proto: V.extend({}, e),
            _childConstructors: []
        }), (o = new i()).options = V.widget.extend({}, o.options), V.each(e, function(e, s) {
            function n() {
                return i.prototype[e].apply(this, arguments);
            }

            function o(t) {
                return i.prototype[e].apply(this, t);
            }
            a[e] = "function" == typeof s ? function() {
                var t, e = this._super,
                    i = this._superApply;
                return this._super = n, this._superApply = o, t = s.apply(this, arguments), this._super = e, this._superApply = i, t;
            } : s;
        }), n.prototype = V.widget.extend(o, {
            widgetEventPrefix: s && o.widgetEventPrefix || t
        }, a, {
            constructor: n,
            namespace: r,
            widgetName: t,
            widgetFullName: l
        }), s ? (V.each(s._childConstructors, function(t, e) {
            var i = e.prototype;
            V.widget(i.namespace + "." + i.widgetName, n, e._proto);
        }), delete s._childConstructors) : i._childConstructors.push(n), V.widget.bridge(t, n), n;
    }, V.widget.extend = function(t) {
        for (var e, i, s = r.call(arguments, 1), n = 0, o = s.length; n < o; n++)
            for (e in s[n]) i = s[n][e], a.call(s[n], e) && void 0 !== i && (V.isPlainObject(i) ? t[e] = V.isPlainObject(t[e]) ? V.widget.extend({}, t[e], i) : V.widget.extend({}, i) : t[e] = i);
        return t;
    }, V.widget.bridge = function(o, e) {
        var a = e.prototype.widgetFullName || o;
        V.fn[o] = function(i) {
            var t = "string" == typeof i,
                s = r.call(arguments, 1),
                n = this;
            return t ? this.length || "instance" !== i ? this.each(function() {
                var t, e = V.data(this, a);
                return "instance" === i ? (n = e, !1) : e ? "function" != typeof e[i] || "_" === i.charAt(0) ? V.error("no such method '" + i + "' for " + o + " widget instance") : (t = e[i].apply(e, s)) !== e && void 0 !== t ? (n = t && t.jquery ? n.pushStack(t.get()) : t, !1) : void 0 : V.error("cannot call methods on " + o + " prior to initialization; attempted to call method '" + i + "'");
            }) : n = void 0 : (s.length && (i = V.widget.extend.apply(null, [i].concat(s))), this.each(function() {
                var t = V.data(this, a);
                t ? (t.option(i || {}), t._init && t._init()) : V.data(this, a, new e(i, this));
            })), n;
        };
    }, V.Widget = function() {}, V.Widget._childConstructors = [], V.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(t, e) {
            e = V(e || this.defaultElement || this)[0], this.element = V(e), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = V(), this.hoverable = V(), this.focusable = V(), this.classesElementLookup = {}, e !== this && (V.data(e, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(t) {
                    t.target === e && this.destroy();
                }
            }), this.document = V(e.style ? e.ownerDocument : e.document || e), this.window = V(this.document[0].defaultView || this.document[0].parentWindow)), this.options = V.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: function() {
            return {};
        },
        _getCreateEventData: V.noop,
        _create: V.noop,
        _init: V.noop,
        destroy: function() {
            var i = this;
            this._destroy(), V.each(this.classesElementLookup, function(t, e) {
                i._removeClass(e, t);
            }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace);
        },
        _destroy: V.noop,
        widget: function() {
            return this.element;
        },
        option: function(t, e) {
            var i, s, n, o = t;
            if (0 === arguments.length) return V.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (o = {}, t = (i = t.split(".")).shift(), i.length) {
                    for (s = o[t] = V.widget.extend({}, this.options[t]), n = 0; n < i.length - 1; n++) s[i[n]] = s[i[n]] || {}, s = s[i[n]];
                    if (t = i.pop(), 1 === arguments.length) return void 0 === s[t] ? null : s[t];
                    s[t] = e;
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = e;
                } return this._setOptions(o), this;
        },
        _setOptions: function(t) {
            for (var e in t) this._setOption(e, t[e]);
            return this;
        },
        _setOption: function(t, e) {
            return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this;
        },
        _setOptionClasses: function(t) {
            var e, i, s;
            for (e in t) s = this.classesElementLookup[e], t[e] !== this.options.classes[e] && s && s.length && (i = V(s.get()), this._removeClass(s, e), i.addClass(this._classes({
                element: i,
                keys: e,
                classes: t,
                add: !0
            })));
        },
        _setOptionDisabled: function(t) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            });
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            });
        },
        _classes: function(n) {
            var o = [],
                a = this;

            function t(t, e) {
                for (var i, s = 0; s < t.length; s++) i = a.classesElementLookup[t[s]] || V(), i = n.add ? (n.element.each(function(t, e) {
                    V.map(a.classesElementLookup, function(t) {
                        return t;
                    }).some(function(t) {
                        return t.is(e);
                    }) || a._on(V(e), {
                        remove: "_untrackClassesElement"
                    });
                }), V(V.uniqueSort(i.get().concat(n.element.get())))) : V(i.not(n.element).get()), a.classesElementLookup[t[s]] = i, o.push(t[s]), e && n.classes[t[s]] && o.push(n.classes[t[s]]);
            }
            return (n = V.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, n)).keys && t(n.keys.match(/\S+/g) || [], !0), n.extra && t(n.extra.match(/\S+/g) || []), o.join(" ");
        },
        _untrackClassesElement: function(i) {
            var s = this;
            V.each(s.classesElementLookup, function(t, e) {
                -1 !== V.inArray(i.target, e) && (s.classesElementLookup[t] = V(e.not(i.target).get()));
            }), this._off(V(i.target));
        },
        _removeClass: function(t, e, i) {
            return this._toggleClass(t, e, i, !1);
        },
        _addClass: function(t, e, i) {
            return this._toggleClass(t, e, i, !0);
        },
        _toggleClass: function(t, e, i, s) {
            s = "boolean" == typeof s ? s : i;
            var n = "string" == typeof t || null === t,
                t = {
                    extra: n ? e : i,
                    keys: n ? t : e,
                    element: n ? this.element : t,
                    add: s
                };
            return t.element.toggleClass(this._classes(t), s), this;
        },
        _on: function(n, o, t) {
            var a, r = this;
            "boolean" != typeof n && (t = o, o = n, n = !1), t ? (o = a = V(o), this.bindings = this.bindings.add(o)) : (t = o, o = this.element, a = this.widget()), V.each(t, function(t, e) {
                function i() {
                    if (n || !0 !== r.options.disabled && !V(this).hasClass("ui-state-disabled")) return ("string" == typeof e ? r[e] : e).apply(r, arguments);
                }
                "string" != typeof e && (i.guid = e.guid = e.guid || i.guid || V.guid++);
                var s = t.match(/^([\w:-]*)\s*(.*)$/),
                    t = s[1] + r.eventNamespace,
                    s = s[2];
                s ? a.on(t, s, i) : o.on(t, i);
            });
        },
        _off: function(t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.off(e), this.bindings = V(this.bindings.not(t).get()), this.focusable = V(this.focusable.not(t).get()), this.hoverable = V(this.hoverable.not(t).get());
        },
        _delay: function(t, e) {
            var i = this;
            return setTimeout(function() {
                return ("string" == typeof t ? i[t] : t).apply(i, arguments);
            }, e || 0);
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    this._addClass(V(t.currentTarget), null, "ui-state-hover");
                },
                mouseleave: function(t) {
                    this._removeClass(V(t.currentTarget), null, "ui-state-hover");
                }
            });
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    this._addClass(V(t.currentTarget), null, "ui-state-focus");
                },
                focusout: function(t) {
                    this._removeClass(V(t.currentTarget), null, "ui-state-focus");
                }
            });
        },
        _trigger: function(t, e, i) {
            var s, n, o = this.options[t];
            if (i = i || {}, (e = V.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), e.target = this.element[0], n = e.originalEvent)
                for (s in n) s in e || (e[s] = n[s]);
            return this.element.trigger(e, i), !("function" == typeof o && !1 === o.apply(this.element[0], [e].concat(i)) || e.isDefaultPrevented());
        }
    }, V.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(o, a) {
        V.Widget.prototype["_" + o] = function(e, t, i) {
            var s;
            "string" == typeof t && (t = {
                effect: t
            });
            var n = t ? !0 !== t && "number" != typeof t && t.effect || a : o;
            "number" == typeof(t = t || {}) ? t = {
                duration: t
            }: !0 === t && (t = {}), s = !V.isEmptyObject(t), t.complete = i, t.delay && e.delay(t.delay), s && V.effects && V.effects.effect[n] ? e[o](t) : n !== o && e[n] ? e[n](t.duration, t.easing, i) : e.queue(function(t) {
                V(this)[o](), i && i.call(e[0]), t();
            });
        };
    });
    var s, x, k, o, l, h, c, u, C;
    V.widget;

    function D(t, e, i) {
        return [parseFloat(t[0]) * (u.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (u.test(t[1]) ? i / 100 : 1)];
    }

    function I(t, e) {
        return parseInt(V.css(t, e), 10) || 0;
    }

    function T(t) {
        return null != t && t === t.window;
    }
    x = Math.max, k = Math.abs, o = /left|center|right/, l = /top|center|bottom/, h = /[\+\-]\d+(\.[\d]+)?%?/, c = /^\w+/, u = /%$/, C = V.fn.position, V.position = {
        scrollbarWidth: function() {
            if (void 0 !== s) return s;
            var t, e = V("<div style='display:block;position:absolute;width:200px;height:200px;overflow:hidden;'><div style='height:300px;width:auto;'></div></div>"),
                i = e.children()[0];
            return V("body").append(e), t = i.offsetWidth, e.css("overflow", "scroll"), t === (i = i.offsetWidth) && (i = e[0].clientWidth), e.remove(), s = t - i;
        },
        getScrollInfo: function(t) {
            var e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                e = "scroll" === e || "auto" === e && t.width < t.element[0].scrollWidth;
            return {
                width: "scroll" === i || "auto" === i && t.height < t.element[0].scrollHeight ? V.position.scrollbarWidth() : 0,
                height: e ? V.position.scrollbarWidth() : 0
            };
        },
        getWithinInfo: function(t) {
            var e = V(t || window),
                i = T(e[0]),
                s = !!e[0] && 9 === e[0].nodeType;
            return {
                element: e,
                isWindow: i,
                isDocument: s,
                offset: !i && !s ? V(t).offset() : {
                    left: 0,
                    top: 0
                },
                scrollLeft: e.scrollLeft(),
                scrollTop: e.scrollTop(),
                width: e.outerWidth(),
                height: e.outerHeight()
            };
        }
    }, V.fn.position = function(u) {
        if (!u || !u.of) return C.apply(this, arguments);
        var d, p, f, g, m, t, _ = "string" == typeof(u = V.extend({}, u)).of ? V(document).find(u.of) : V(u.of),
            v = V.position.getWithinInfo(u.within),
            b = V.position.getScrollInfo(v),
            y = (u.collision || "flip").split(" "),
            w = {},
            e = 9 === (t = (e = _)[0]).nodeType ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : T(t) ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: e.scrollTop(),
                    left: e.scrollLeft()
                }
            } : t.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: t.pageY,
                    left: t.pageX
                }
            } : {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            };
        return _[0].preventDefault && (u.at = "left top"), p = e.width, f = e.height, g = e.offset, m = V.extend({}, g), V.each(["my", "at"], function() {
            var t, e, i = (u[this] || "").split(" ");
            1 === i.length && (i = o.test(i[0]) ? i.concat(["center"]) : l.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = o.test(i[0]) ? i[0] : "center", i[1] = l.test(i[1]) ? i[1] : "center", t = h.exec(i[0]), e = h.exec(i[1]), w[this] = [t ? t[0] : 0, e ? e[0] : 0], u[this] = [c.exec(i[0])[0], c.exec(i[1])[0]];
        }), 1 === y.length && (y[1] = y[0]), "right" === u.at[0] ? m.left += p : "center" === u.at[0] && (m.left += p / 2), "bottom" === u.at[1] ? m.top += f : "center" === u.at[1] && (m.top += f / 2), d = D(w.at, p, f), m.left += d[0], m.top += d[1], this.each(function() {
            var i, t, a = V(this),
                r = a.outerWidth(),
                l = a.outerHeight(),
                e = I(this, "marginLeft"),
                s = I(this, "marginTop"),
                n = r + e + I(this, "marginRight") + b.width,
                o = l + s + I(this, "marginBottom") + b.height,
                h = V.extend({}, m),
                c = D(w.my, a.outerWidth(), a.outerHeight());
            "right" === u.my[0] ? h.left -= r : "center" === u.my[0] && (h.left -= r / 2), "bottom" === u.my[1] ? h.top -= l : "center" === u.my[1] && (h.top -= l / 2), h.left += c[0], h.top += c[1], i = {
                marginLeft: e,
                marginTop: s
            }, V.each(["left", "top"], function(t, e) {
                V.ui.position[y[t]] && V.ui.position[y[t]][e](h, {
                    targetWidth: p,
                    targetHeight: f,
                    elemWidth: r,
                    elemHeight: l,
                    collisionPosition: i,
                    collisionWidth: n,
                    collisionHeight: o,
                    offset: [d[0] + c[0], d[1] + c[1]],
                    my: u.my,
                    at: u.at,
                    within: v,
                    elem: a
                });
            }), u.using && (t = function(t) {
                var e = g.left - h.left,
                    i = e + p - r,
                    s = g.top - h.top,
                    n = s + f - l,
                    o = {
                        target: {
                            element: _,
                            left: g.left,
                            top: g.top,
                            width: p,
                            height: f
                        },
                        element: {
                            element: a,
                            left: h.left,
                            top: h.top,
                            width: r,
                            height: l
                        },
                        horizontal: i < 0 ? "left" : 0 < e ? "right" : "center",
                        vertical: n < 0 ? "top" : 0 < s ? "bottom" : "middle"
                    };
                p < r && k(e + i) < p && (o.horizontal = "center"), f < l && k(s + n) < f && (o.vertical = "middle"), x(k(e), k(i)) > x(k(s), k(n)) ? o.important = "horizontal" : o.important = "vertical", u.using.call(this, t, o);
            }), a.offset(V.extend(h, {
                using: t
            }));
        });
    }, V.ui.position = {
        fit: {
            left: function(t, e) {
                var i = e.within,
                    s = i.isWindow ? i.scrollLeft : i.offset.left,
                    n = i.width,
                    o = t.left - e.collisionPosition.marginLeft,
                    a = s - o,
                    r = o + e.collisionWidth - n - s;
                e.collisionWidth > n ? 0 < a && r <= 0 ? (i = t.left + a + e.collisionWidth - n - s, t.left += a - i) : t.left = !(0 < r && a <= 0) && r < a ? s + n - e.collisionWidth : s : 0 < a ? t.left += a : 0 < r ? t.left -= r : t.left = x(t.left - o, t.left);
            },
            top: function(t, e) {
                var i = e.within,
                    s = i.isWindow ? i.scrollTop : i.offset.top,
                    n = e.within.height,
                    o = t.top - e.collisionPosition.marginTop,
                    a = s - o,
                    r = o + e.collisionHeight - n - s;
                e.collisionHeight > n ? 0 < a && r <= 0 ? (i = t.top + a + e.collisionHeight - n - s, t.top += a - i) : t.top = !(0 < r && a <= 0) && r < a ? s + n - e.collisionHeight : s : 0 < a ? t.top += a : 0 < r ? t.top -= r : t.top = x(t.top - o, t.top);
            }
        },
        flip: {
            left: function(t, e) {
                var i = e.within,
                    s = i.offset.left + i.scrollLeft,
                    n = i.width,
                    o = i.isWindow ? i.scrollLeft : i.offset.left,
                    a = t.left - e.collisionPosition.marginLeft,
                    r = a - o,
                    l = a + e.collisionWidth - n - o,
                    h = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                    i = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                    a = -2 * e.offset[0];
                r < 0 ? ((s = t.left + h + i + a + e.collisionWidth - n - s) < 0 || s < k(r)) && (t.left += h + i + a) : 0 < l && (0 < (o = t.left - e.collisionPosition.marginLeft + h + i + a - o) || k(o) < l) && (t.left += h + i + a);
            },
            top: function(t, e) {
                var i = e.within,
                    s = i.offset.top + i.scrollTop,
                    n = i.height,
                    o = i.isWindow ? i.scrollTop : i.offset.top,
                    a = t.top - e.collisionPosition.marginTop,
                    r = a - o,
                    l = a + e.collisionHeight - n - o,
                    h = "top" === e.my[1] ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                    i = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                    a = -2 * e.offset[1];
                r < 0 ? ((s = t.top + h + i + a + e.collisionHeight - n - s) < 0 || s < k(r)) && (t.top += h + i + a) : 0 < l && (0 < (o = t.top - e.collisionPosition.marginTop + h + i + a - o) || k(o) < l) && (t.top += h + i + a);
            }
        },
        flipfit: {
            left: function() {
                V.ui.position.flip.left.apply(this, arguments), V.ui.position.fit.left.apply(this, arguments);
            },
            top: function() {
                V.ui.position.flip.top.apply(this, arguments), V.ui.position.fit.top.apply(this, arguments);
            }
        }
    };
    V.ui.position, V.extend(V.expr.pseudos, {
        data: V.expr.createPseudo ? V.expr.createPseudo(function(e) {
            return function(t) {
                return !!V.data(t, e);
            };
        }) : function(t, e, i) {
            return !!V.data(t, i[3]);
        }
    }), V.fn.extend({
        disableSelection: (t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown", function() {
            return this.on(t + ".ui-disableSelection", function(t) {
                t.preventDefault();
            });
        }),
        enableSelection: function() {
            return this.off(".ui-disableSelection");
        }
    });
    var t, d, p = V,
        f = {},
        e = f.toString,
        g = /^([\-+])=\s*(\d+\.?\d*)/,
        m = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(t) {
                return [t[1], t[2], t[3], t[4]];
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/,
            parse: function(t) {
                return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16), t[4] ? (parseInt(t[4], 16) / 255).toFixed(2) : 1];
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?/,
            parse: function(t) {
                return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16), t[4] ? (parseInt(t[4] + t[4], 16) / 255).toFixed(2) : 1];
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(t) {
                return [t[1], t[2] / 100, t[3] / 100, t[4]];
            }
        }],
        _ = p.Color = function(t, e, i, s) {
            return new p.Color.fn.parse(t, e, i, s);
        },
        v = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        },
        b = {
            byte: {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        },
        y = _.support = {},
        w = p("<p>")[0],
        P = p.each;

    function M(t) {
        return null == t ? t + "" : "object" == typeof t ? f[e.call(t)] || "object" : typeof t;
    }

    function S(t, e, i) {
        var s = b[e.type] || {};
        return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : Math.min(s.max, Math.max(0, t)));
    }

    function H(s) {
        var n = _(),
            o = n._rgba = [];
        return s = s.toLowerCase(), P(m, function(t, e) {
            var i = e.re.exec(s),
                i = i && e.parse(i),
                e = e.space || "rgba";
            if (i) return i = n[e](i), n[v[e].cache] = i[v[e].cache], o = n._rgba = i._rgba, !1;
        }), o.length ? ("0,0,0,0" === o.join() && p.extend(o, d.transparent), n) : d[s];
    }

    function z(t, e, i) {
        return 6 * (i = (i + 1) % 1) < 1 ? t + (e - t) * i * 6 : 2 * i < 1 ? e : 3 * i < 2 ? t + (e - t) * (2 / 3 - i) * 6 : t;
    }
    w.style.cssText = "background-color:rgba(1,1,1,.5)", y.rgba = -1 < w.style.backgroundColor.indexOf("rgba"), P(v, function(t, e) {
        e.cache = "_" + t, e.props.alpha = {
            idx: 3,
            type: "percent",
            def: 1
        };
    }), p.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
        f["[object " + e + "]"] = e.toLowerCase();
    }), _.fn = p.extend(_.prototype, {
        parse: function(n, t, e, i) {
            if (void 0 === n) return this._rgba = [null, null, null, null], this;
            (n.jquery || n.nodeType) && (n = p(n).css(t), t = void 0);
            var o = this,
                s = M(n),
                a = this._rgba = [];
            return void 0 !== t && (n = [n, t, e, i], s = "array"), "string" === s ? this.parse(H(n) || d._default) : "array" === s ? (P(v.rgba.props, function(t, e) {
                a[e.idx] = S(n[e.idx], e);
            }), this) : "object" === s ? (P(v, n instanceof _ ? function(t, e) {
                n[e.cache] && (o[e.cache] = n[e.cache].slice());
            } : function(t, i) {
                var s = i.cache;
                P(i.props, function(t, e) {
                    if (!o[s] && i.to) {
                        if ("alpha" === t || null == n[t]) return;
                        o[s] = i.to(o._rgba);
                    }
                    o[s][e.idx] = S(n[t], e, !0);
                }), o[s] && p.inArray(null, o[s].slice(0, 3)) < 0 && (null == o[s][3] && (o[s][3] = 1), i.from && (o._rgba = i.from(o[s])));
            }), this) : void 0;
        },
        is: function(t) {
            var n = _(t),
                o = !0,
                a = this;
            return P(v, function(t, e) {
                var i, s = n[e.cache];
                return s && (i = a[e.cache] || e.to && e.to(a._rgba) || [], P(e.props, function(t, e) {
                    if (null != s[e.idx]) return o = s[e.idx] === i[e.idx];
                })), o;
            }), o;
        },
        _space: function() {
            var i = [],
                s = this;
            return P(v, function(t, e) {
                s[e.cache] && i.push(t);
            }), i.pop();
        },
        transition: function(t, a) {
            var e = (h = _(t))._space(),
                i = v[e],
                t = 0 === this.alpha() ? _("transparent") : this,
                r = t[i.cache] || i.to(t._rgba),
                l = r.slice(),
                h = h[i.cache];
            return P(i.props, function(t, e) {
                var i = e.idx,
                    s = r[i],
                    n = h[i],
                    o = b[e.type] || {};
                null !== n && (null === s ? l[i] = n : (o.mod && (o.mod / 2 < n - s ? s += o.mod : o.mod / 2 < s - n && (s -= o.mod)), l[i] = S((n - s) * a + s, e)));
            }), this[e](l);
        },
        blend: function(t) {
            if (1 === this._rgba[3]) return this;
            var e = this._rgba.slice(),
                i = e.pop(),
                s = _(t)._rgba;
            return _(p.map(e, function(t, e) {
                return (1 - i) * s[e] + i * t;
            }));
        },
        toRgbaString: function() {
            var t = "rgba(",
                e = p.map(this._rgba, function(t, e) {
                    return null != t ? t : 2 < e ? 1 : 0;
                });
            return 1 === e[3] && (e.pop(), t = "rgb("), t + e.join() + ")";
        },
        toHslaString: function() {
            var t = "hsla(",
                e = p.map(this.hsla(), function(t, e) {
                    return null == t && (t = 2 < e ? 1 : 0), e && e < 3 && (t = Math.round(100 * t) + "%"), t;
                });
            return 1 === e[3] && (e.pop(), t = "hsl("), t + e.join() + ")";
        },
        toHexString: function(t) {
            var e = this._rgba.slice(),
                i = e.pop();
            return t && e.push(~~(255 * i)), "#" + p.map(e, function(t) {
                return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t;
            }).join("");
        },
        toString: function() {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
        }
    }), _.fn.parse.prototype = _.fn, v.hsla.to = function(t) {
        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
        var e = t[0] / 255,
            i = t[1] / 255,
            s = t[2] / 255,
            n = t[3],
            o = Math.max(e, i, s),
            a = Math.min(e, i, s),
            r = o - a,
            l = o + a,
            t = .5 * l,
            i = a === o ? 0 : e === o ? 60 * (i - s) / r + 360 : i === o ? 60 * (s - e) / r + 120 : 60 * (e - i) / r + 240,
            l = 0 == r ? 0 : t <= .5 ? r / l : r / (2 - l);
        return [Math.round(i) % 360, l, t, null == n ? 1 : n];
    }, v.hsla.from = function(t) {
        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
        var e = t[0] / 360,
            i = t[1],
            s = t[2],
            t = t[3],
            i = s <= .5 ? s * (1 + i) : s + i - s * i,
            s = 2 * s - i;
        return [Math.round(255 * z(s, i, e + 1 / 3)), Math.round(255 * z(s, i, e)), Math.round(255 * z(s, i, e - 1 / 3)), t];
    }, P(v, function(l, t) {
        var e = t.props,
            o = t.cache,
            a = t.to,
            r = t.from;
        _.fn[l] = function(t) {
            if (a && !this[o] && (this[o] = a(this._rgba)), void 0 === t) return this[o].slice();
            var i = M(t),
                s = "array" === i || "object" === i ? t : arguments,
                n = this[o].slice();
            return P(e, function(t, e) {
                t = s["object" === i ? t : e.idx];
                null == t && (t = n[e.idx]), n[e.idx] = S(t, e);
            }), r ? ((t = _(r(n)))[o] = n, t) : _(n);
        }, P(e, function(a, r) {
            _.fn[a] || (_.fn[a] = function(t) {
                var e, i = M(t),
                    s = "alpha" === a ? this._hsla ? "hsla" : "rgba" : l,
                    n = this[s](),
                    o = n[r.idx];
                return "undefined" === i ? o : ("function" === i && (i = M(t = t.call(this, o))), null == t && r.empty ? this : ("string" === i && (e = g.exec(t)) && (t = o + parseFloat(e[2]) * ("+" === e[1] ? 1 : -1)), n[r.idx] = t, this[s](n)));
            });
        });
    }), _.hook = function(t) {
        t = t.split(" ");
        P(t, function(t, o) {
            p.cssHooks[o] = {
                set: function(t, e) {
                    var i, s, n = "";
                    if ("transparent" !== e && ("string" !== M(e) || (i = H(e)))) {
                        if (e = _(i || e), !y.rgba && 1 !== e._rgba[3]) {
                            for (s = "backgroundColor" === o ? t.parentNode : t;
                                ("" === n || "transparent" === n) && s && s.style;) try {
                                n = p.css(s, "backgroundColor"), s = s.parentNode;
                            } catch (t) {}
                            e = e.blend(n && "transparent" !== n ? n : "_default");
                        }
                        e = e.toRgbaString();
                    }
                    try {
                        t.style[o] = e;
                    } catch (t) {}
                }
            }, p.fx.step[o] = function(t) {
                t.colorInit || (t.start = _(t.elem, o), t.end = _(t.end), t.colorInit = !0), p.cssHooks[o].set(t.elem, t.start.transition(t.end, t.pos));
            };
        });
    }, _.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"), p.cssHooks.borderColor = {
        expand: function(i) {
            var s = {};
            return P(["Top", "Right", "Bottom", "Left"], function(t, e) {
                s["border" + e + "Color"] = i;
            }), s;
        }
    }, d = p.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
    };
    var A, O, N, E, W, F, L, R, Y, B, j = "ui-effects-",
        q = "ui-effects-style",
        K = "ui-effects-animated";

    function U(t) {
        var e, i, s = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
            n = {};
        if (s && s.length && s[0] && s[s[0]])
            for (i = s.length; i--;) "string" == typeof s[e = s[i]] && (n[e.replace(/-([\da-z])/gi, function(t, e) {
                return e.toUpperCase();
            })] = s[e]);
        else
            for (e in s) "string" == typeof s[e] && (n[e] = s[e]);
        return n;
    }

    function X(t, e, i, s) {
        return V.isPlainObject(t) && (t = (e = t).effect), t = {
            effect: t
        }, null == e && (e = {}), "function" == typeof e && (s = e, i = null, e = {}), "number" != typeof e && !V.fx.speeds[e] || (s = i, i = e, e = {}), "function" == typeof i && (s = i, i = null), e && V.extend(t, e), i = i || e.duration, t.duration = V.fx.off ? 0 : "number" == typeof i ? i : i in V.fx.speeds ? V.fx.speeds[i] : V.fx.speeds._default, t.complete = s || e.complete, t;
    }

    function $(t) {
        return !t || "number" == typeof t || V.fx.speeds[t] || "string" == typeof t && !V.effects.effect[t] || "function" == typeof t || "object" == typeof t && !t.effect;
    }

    function G(t, e) {
        var i = e.outerWidth(),
            e = e.outerHeight(),
            t = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(t) || ["", 0, i, e, 0];
        return {
            top: parseFloat(t[1]) || 0,
            right: "auto" === t[2] ? i : parseFloat(t[2]),
            bottom: "auto" === t[3] ? e : parseFloat(t[3]),
            left: parseFloat(t[4]) || 0
        };
    }
    V.effects = {
        effect: {}
    }, E = ["add", "remove", "toggle"], W = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    }, V.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, e) {
        V.fx.step[e] = function(t) {
            ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (p.style(t.elem, e, t.end), t.setAttr = !0);
        };
    }), V.fn.addBack || (V.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    }), V.effects.animateClass = function(n, t, e, i) {
        var o = V.speed(t, e, i);
        return this.queue(function() {
            var i = V(this),
                t = i.attr("class") || "",
                e = (e = o.children ? i.find("*").addBack() : i).map(function() {
                    return {
                        el: V(this),
                        start: U(this)
                    };
                }),
                s = function() {
                    V.each(E, function(t, e) {
                        n[e] && i[e + "Class"](n[e]);
                    });
                };
            s(), e = e.map(function() {
                return this.end = U(this.el[0]), this.diff = function(t, e) {
                    var i, s, n = {};
                    for (i in e) s = e[i], t[i] !== s && (W[i] || !V.fx.step[i] && isNaN(parseFloat(s)) || (n[i] = s));
                    return n;
                }(this.start, this.end), this;
            }), i.attr("class", t), e = e.map(function() {
                var t = this,
                    e = V.Deferred(),
                    i = V.extend({}, o, {
                        queue: !1,
                        complete: function() {
                            e.resolve(t);
                        }
                    });
                return this.el.animate(this.diff, i), e.promise();
            }), V.when.apply(V, e.get()).done(function() {
                s(), V.each(arguments, function() {
                    var e = this.el;
                    V.each(this.diff, function(t) {
                        e.css(t, "");
                    });
                }), o.complete.call(i[0]);
            });
        });
    }, V.fn.extend({
        addClass: (N = V.fn.addClass, function(t, e, i, s) {
            return e ? V.effects.animateClass.call(this, {
                add: t
            }, e, i, s) : N.apply(this, arguments);
        }),
        removeClass: (O = V.fn.removeClass, function(t, e, i, s) {
            return 1 < arguments.length ? V.effects.animateClass.call(this, {
                remove: t
            }, e, i, s) : O.apply(this, arguments);
        }),
        toggleClass: (A = V.fn.toggleClass, function(t, e, i, s, n) {
            return "boolean" == typeof e || void 0 === e ? i ? V.effects.animateClass.call(this, e ? {
                add: t
            } : {
                remove: t
            }, i, s, n) : A.apply(this, arguments) : V.effects.animateClass.call(this, {
                toggle: t
            }, e, i, s);
        }),
        switchClass: function(t, e, i, s, n) {
            return V.effects.animateClass.call(this, {
                add: e,
                remove: t
            }, i, s, n);
        }
    }), V.expr && V.expr.pseudos && V.expr.pseudos.animated && (V.expr.pseudos.animated = (F = V.expr.pseudos.animated, function(t) {
        return !!V(t).data(K) || F(t);
    })), !1 !== V.uiBackCompat && V.extend(V.effects, {
        save: function(t, e) {
            for (var i = 0, s = e.length; i < s; i++) null !== e[i] && t.data(j + e[i], t[0].style[e[i]]);
        },
        restore: function(t, e) {
            for (var i, s = 0, n = e.length; s < n; s++) null !== e[s] && (i = t.data(j + e[s]), t.css(e[s], i));
        },
        setMode: function(t, e) {
            return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
        },
        createWrapper: function(i) {
            if (i.parent().is(".ui-effects-wrapper")) return i.parent();
            var s = {
                    width: i.outerWidth(!0),
                    height: i.outerHeight(!0),
                    float: i.css("float")
                },
                t = V("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                e = {
                    width: i.width(),
                    height: i.height()
                },
                n = document.activeElement;
            try {
                n.id;
            } catch (t) {
                n = document.body;
            }
            return i.wrap(t), i[0] !== n && !V.contains(i[0], n) || V(n).trigger("focus"), t = i.parent(), "static" === i.css("position") ? (t.css({
                position: "relative"
            }), i.css({
                position: "relative"
            })) : (V.extend(s, {
                position: i.css("position"),
                zIndex: i.css("z-index")
            }), V.each(["top", "left", "bottom", "right"], function(t, e) {
                s[e] = i.css(e), isNaN(parseInt(s[e], 10)) && (s[e] = "auto");
            }), i.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            })), i.css(e), t.css(s).show();
        },
        removeWrapper: function(t) {
            var e = document.activeElement;
            return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), t[0] !== e && !V.contains(t[0], e) || V(e).trigger("focus")), t;
        }
    }), V.extend(V.effects, {
        version: "1.13.0",
        define: function(t, e, i) {
            return i || (i = e, e = "effect"), V.effects.effect[t] = i, V.effects.effect[t].mode = e, i;
        },
        scaledDimensions: function(t, e, i) {
            if (0 === e) return {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
            var s = "horizontal" !== i ? (e || 100) / 100 : 1,
                e = "vertical" !== i ? (e || 100) / 100 : 1;
            return {
                height: t.height() * e,
                width: t.width() * s,
                outerHeight: t.outerHeight() * e,
                outerWidth: t.outerWidth() * s
            };
        },
        clipToBox: function(t) {
            return {
                width: t.clip.right - t.clip.left,
                height: t.clip.bottom - t.clip.top,
                left: t.clip.left,
                top: t.clip.top
            };
        },
        unshift: function(t, e, i) {
            var s = t.queue();
            1 < e && s.splice.apply(s, [1, 0].concat(s.splice(e, i))), t.dequeue();
        },
        saveStyle: function(t) {
            t.data(q, t[0].style.cssText);
        },
        restoreStyle: function(t) {
            t[0].style.cssText = t.data(q) || "", t.removeData(q);
        },
        mode: function(t, e) {
            t = t.is(":hidden");
            return "toggle" === e && (e = t ? "show" : "hide"), (t ? "hide" === e : "show" === e) && (e = "none"), e;
        },
        getBaseline: function(t, e) {
            var i, s;
            switch (t[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = .5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = t[0] / e.height;
            }
            switch (t[1]) {
                case "left":
                    s = 0;
                    break;
                case "center":
                    s = .5;
                    break;
                case "right":
                    s = 1;
                    break;
                default:
                    s = t[1] / e.width;
            }
            return {
                x: s,
                y: i
            };
        },
        createPlaceholder: function(t) {
            var e, i = t.css("position"),
                s = t.position();
            return t.css({
                marginTop: t.css("marginTop"),
                marginBottom: t.css("marginBottom"),
                marginLeft: t.css("marginLeft"),
                marginRight: t.css("marginRight")
            }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()), /^(static|relative)/.test(i) && (i = "absolute", e = V("<" + t[0].nodeName + ">").insertAfter(t).css({
                display: /^(inline|ruby)/.test(t.css("display")) ? "inline-block" : "block",
                visibility: "hidden",
                marginTop: t.css("marginTop"),
                marginBottom: t.css("marginBottom"),
                marginLeft: t.css("marginLeft"),
                marginRight: t.css("marginRight"),
                float: t.css("float")
            }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"), t.data(j + "placeholder", e)), t.css({
                position: i,
                left: s.left,
                top: s.top
            }), e;
        },
        removePlaceholder: function(t) {
            var e = j + "placeholder",
                i = t.data(e);
            i && (i.remove(), t.removeData(e));
        },
        cleanUp: function(t) {
            V.effects.restoreStyle(t), V.effects.removePlaceholder(t);
        },
        setTransition: function(s, t, n, o) {
            return o = o || {}, V.each(t, function(t, e) {
                var i = s.cssUnit(e);
                0 < i[0] && (o[e] = i[0] * n + i[1]);
            }), o;
        }
    }), V.fn.extend({
        effect: function() {
            function t(t) {
                var e = V(this),
                    i = V.effects.mode(e, r) || o;
                e.data(K, !0), l.push(i), o && ("show" === i || i === o && "hide" === i) && e.show(), o && "none" === i || V.effects.saveStyle(e), "function" == typeof t && t();
            }
            var s = X.apply(this, arguments),
                n = V.effects.effect[s.effect],
                o = n.mode,
                e = s.queue,
                i = e || "fx",
                a = s.complete,
                r = s.mode,
                l = [];
            return V.fx.off || !n ? r ? this[r](s.duration, a) : this.each(function() {
                a && a.call(this);
            }) : !1 === e ? this.each(t).each(h) : this.queue(i, t).queue(i, h);

            function h(t) {
                var e = V(this);

                function i() {
                    "function" == typeof a && a.call(e[0]), "function" == typeof t && t();
                }
                s.mode = l.shift(), !1 === V.uiBackCompat || o ? "none" === s.mode ? (e[r](), i()) : n.call(e[0], s, function() {
                    e.removeData(K), V.effects.cleanUp(e), "hide" === s.mode && e.hide(), i();
                }) : (e.is(":hidden") ? "hide" === r : "show" === r) ? (e[r](), i()) : n.call(e[0], s, i);
            }
        },
        show: (Y = V.fn.show, function(t) {
            if ($(t)) return Y.apply(this, arguments);
            t = X.apply(this, arguments);
            return t.mode = "show", this.effect.call(this, t);
        }),
        hide: (R = V.fn.hide, function(t) {
            if ($(t)) return R.apply(this, arguments);
            t = X.apply(this, arguments);
            return t.mode = "hide", this.effect.call(this, t);
        }),
        toggle: (L = V.fn.toggle, function(t) {
            if ($(t) || "boolean" == typeof t) return L.apply(this, arguments);
            t = X.apply(this, arguments);
            return t.mode = "toggle", this.effect.call(this, t);
        }),
        cssUnit: function(t) {
            var i = this.css(t),
                s = [];
            return V.each(["em", "px", "%", "pt"], function(t, e) {
                0 < i.indexOf(e) && (s = [parseFloat(i), e]);
            }), s;
        },
        cssClip: function(t) {
            return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : G(this.css("clip"), this);
        },
        transfer: function(t, e) {
            var i = V(this),
                s = V(t.to),
                n = "fixed" === s.css("position"),
                o = V("body"),
                a = n ? o.scrollTop() : 0,
                r = n ? o.scrollLeft() : 0,
                o = s.offset(),
                o = {
                    top: o.top - a,
                    left: o.left - r,
                    height: s.innerHeight(),
                    width: s.innerWidth()
                },
                s = i.offset(),
                l = V("<div class='ui-effects-transfer'></div>");
            l.appendTo("body").addClass(t.className).css({
                top: s.top - a,
                left: s.left - r,
                height: i.innerHeight(),
                width: i.innerWidth(),
                position: n ? "fixed" : "absolute"
            }).animate(o, t.duration, t.easing, function() {
                l.remove(), "function" == typeof e && e();
            });
        }
    }), V.fx.step.clip = function(t) {
        t.clipInit || (t.start = V(t.elem).cssClip(), "string" == typeof t.end && (t.end = G(t.end, t.elem)), t.clipInit = !0), V(t.elem).cssClip({
            top: t.pos * (t.end.top - t.start.top) + t.start.top,
            right: t.pos * (t.end.right - t.start.right) + t.start.right,
            bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
            left: t.pos * (t.end.left - t.start.left) + t.start.left
        });
    }, B = {}, V.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, t) {
        B[t] = function(t) {
            return Math.pow(t, e + 2);
        };
    }), V.extend(B, {
        Sine: function(t) {
            return 1 - Math.cos(t * Math.PI / 2);
        },
        Circ: function(t) {
            return 1 - Math.sqrt(1 - t * t);
        },
        Elastic: function(t) {
            return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15);
        },
        Back: function(t) {
            return t * t * (3 * t - 2);
        },
        Bounce: function(t) {
            for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
            return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2);
        }
    }), V.each(B, function(t, e) {
        V.easing["easeIn" + t] = e, V.easing["easeOut" + t] = function(t) {
            return 1 - e(1 - t);
        }, V.easing["easeInOut" + t] = function(t) {
            return t < .5 ? e(2 * t) / 2 : 1 - e(-2 * t + 2) / 2;
        };
    });
    w = V.effects, V.effects.define("blind", "hide", function(t, e) {
        var i = {
                up: ["bottom", "top"],
                vertical: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                horizontal: ["right", "left"],
                right: ["left", "right"]
            },
            s = V(this),
            n = t.direction || "up",
            o = s.cssClip(),
            a = {
                clip: V.extend({}, o)
            },
            r = V.effects.createPlaceholder(s);
        a.clip[i[n][0]] = a.clip[i[n][1]], "show" === t.mode && (s.cssClip(a.clip), r && r.css(V.effects.clipToBox(a)), a.clip = o), r && r.animate(V.effects.clipToBox(a), t.duration, t.easing), s.animate(a, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        });
    }), V.effects.define("bounce", function(t, e) {
        var i, s, n = V(this),
            o = t.mode,
            a = "hide" === o,
            r = "show" === o,
            l = t.direction || "up",
            h = t.distance,
            c = t.times || 5,
            o = 2 * c + (r || a ? 1 : 0),
            u = t.duration / o,
            d = t.easing,
            p = "up" === l || "down" === l ? "top" : "left",
            f = "up" === l || "left" === l,
            g = 0,
            t = n.queue().length;
        for (V.effects.createPlaceholder(n), l = n.css(p), h = h || n["top" == p ? "outerHeight" : "outerWidth"]() / 3, r && ((s = {
                opacity: 1
            })[p] = l, n.css("opacity", 0).css(p, f ? 2 * -h : 2 * h).animate(s, u, d)), a && (h /= Math.pow(2, c - 1)), (s = {})[p] = l; g < c; g++)(i = {})[p] = (f ? "-=" : "+=") + h, n.animate(i, u, d).animate(s, u, d), h = a ? 2 * h : h / 2;
        a && ((i = {
            opacity: 0
        })[p] = (f ? "-=" : "+=") + h, n.animate(i, u, d)), n.queue(e), V.effects.unshift(n, t, 1 + o);
    }), V.effects.define("clip", "hide", function(t, e) {
        var i = {},
            s = V(this),
            n = t.direction || "vertical",
            o = "both" === n,
            a = o || "horizontal" === n,
            o = o || "vertical" === n,
            n = s.cssClip();
        i.clip = {
            top: o ? (n.bottom - n.top) / 2 : n.top,
            right: a ? (n.right - n.left) / 2 : n.right,
            bottom: o ? (n.bottom - n.top) / 2 : n.bottom,
            left: a ? (n.right - n.left) / 2 : n.left
        }, V.effects.createPlaceholder(s), "show" === t.mode && (s.cssClip(i.clip), i.clip = n), s.animate(i, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        });
    }), V.effects.define("drop", "hide", function(t, e) {
        var i = V(this),
            s = "show" === t.mode,
            n = t.direction || "left",
            o = "up" === n || "down" === n ? "top" : "left",
            a = "up" === n || "left" === n ? "-=" : "+=",
            r = "+=" == a ? "-=" : "+=",
            l = {
                opacity: 0
            };
        V.effects.createPlaceholder(i), n = t.distance || i["top" == o ? "outerHeight" : "outerWidth"](!0) / 2, l[o] = a + n, s && (i.css(l), l[o] = r + n, l.opacity = 1), i.animate(l, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        });
    }), V.effects.define("explode", "hide", function(t, e) {
        var i, s, n, o, a, r, l = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
            h = l,
            c = V(this),
            u = "show" === t.mode,
            d = c.show().css("visibility", "hidden").offset(),
            p = Math.ceil(c.outerWidth() / h),
            f = Math.ceil(c.outerHeight() / l),
            g = [];

        function m() {
            g.push(this), g.length === l * h && (c.css({
                visibility: "visible"
            }), V(g).remove(), e());
        }
        for (i = 0; i < l; i++)
            for (o = d.top + i * f, r = i - (l - 1) / 2, s = 0; s < h; s++) n = d.left + s * p, a = s - (h - 1) / 2, c.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -s * p,
                top: -i * f
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: p,
                height: f,
                left: n + (u ? a * p : 0),
                top: o + (u ? r * f : 0),
                opacity: u ? 0 : 1
            }).animate({
                left: n + (u ? 0 : a * p),
                top: o + (u ? 0 : r * f),
                opacity: u ? 1 : 0
            }, t.duration || 500, t.easing, m);
    }), V.effects.define("fade", "toggle", function(t, e) {
        var i = "show" === t.mode;
        V(this).css("opacity", i ? 0 : 1).animate({
            opacity: i ? 1 : 0
        }, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        });
    }), V.effects.define("fold", "hide", function(e, t) {
        var i = V(this),
            s = e.mode,
            n = "show" === s,
            o = "hide" === s,
            a = e.size || 15,
            r = /([0-9]+)%/.exec(a),
            l = !!e.horizFirst ? ["right", "bottom"] : ["bottom", "right"],
            h = e.duration / 2,
            c = V.effects.createPlaceholder(i),
            u = i.cssClip(),
            d = {
                clip: V.extend({}, u)
            },
            p = {
                clip: V.extend({}, u)
            },
            f = [u[l[0]], u[l[1]]],
            s = i.queue().length;
        r && (a = parseInt(r[1], 10) / 100 * f[o ? 0 : 1]), d.clip[l[0]] = a, p.clip[l[0]] = a, p.clip[l[1]] = 0, n && (i.cssClip(p.clip), c && c.css(V.effects.clipToBox(p)), p.clip = u), i.queue(function(t) {
            c && c.animate(V.effects.clipToBox(d), h, e.easing).animate(V.effects.clipToBox(p), h, e.easing), t();
        }).animate(d, h, e.easing).animate(p, h, e.easing).queue(t), V.effects.unshift(i, s, 4);
    }), V.effects.define("highlight", "show", function(t, e) {
        var i = V(this),
            s = {
                backgroundColor: i.css("backgroundColor")
            };
        "hide" === t.mode && (s.opacity = 0), V.effects.saveStyle(i), i.css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99"
        }).animate(s, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        });
    }), V.effects.define("size", function(s, e) {
        var n, i = V(this),
            t = ["fontSize"],
            o = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            a = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            r = s.mode,
            l = "effect" !== r,
            h = s.scale || "both",
            c = s.origin || ["middle", "center"],
            u = i.css("position"),
            d = i.position(),
            p = V.effects.scaledDimensions(i),
            f = s.from || p,
            g = s.to || V.effects.scaledDimensions(i, 0);
        V.effects.createPlaceholder(i), "show" === r && (r = f, f = g, g = r), n = {
            from: {
                y: f.height / p.height,
                x: f.width / p.width
            },
            to: {
                y: g.height / p.height,
                x: g.width / p.width
            }
        }, "box" !== h && "both" !== h || (n.from.y !== n.to.y && (f = V.effects.setTransition(i, o, n.from.y, f), g = V.effects.setTransition(i, o, n.to.y, g)), n.from.x !== n.to.x && (f = V.effects.setTransition(i, a, n.from.x, f), g = V.effects.setTransition(i, a, n.to.x, g))), "content" !== h && "both" !== h || n.from.y !== n.to.y && (f = V.effects.setTransition(i, t, n.from.y, f), g = V.effects.setTransition(i, t, n.to.y, g)), c && (c = V.effects.getBaseline(c, p), f.top = (p.outerHeight - f.outerHeight) * c.y + d.top, f.left = (p.outerWidth - f.outerWidth) * c.x + d.left, g.top = (p.outerHeight - g.outerHeight) * c.y + d.top, g.left = (p.outerWidth - g.outerWidth) * c.x + d.left), delete f.outerHeight, delete f.outerWidth, i.css(f), "content" !== h && "both" !== h || (o = o.concat(["marginTop", "marginBottom"]).concat(t), a = a.concat(["marginLeft", "marginRight"]), i.find("*[width]").each(function() {
            var t = V(this),
                e = V.effects.scaledDimensions(t),
                i = {
                    height: e.height * n.from.y,
                    width: e.width * n.from.x,
                    outerHeight: e.outerHeight * n.from.y,
                    outerWidth: e.outerWidth * n.from.x
                },
                e = {
                    height: e.height * n.to.y,
                    width: e.width * n.to.x,
                    outerHeight: e.height * n.to.y,
                    outerWidth: e.width * n.to.x
                };
            n.from.y !== n.to.y && (i = V.effects.setTransition(t, o, n.from.y, i), e = V.effects.setTransition(t, o, n.to.y, e)), n.from.x !== n.to.x && (i = V.effects.setTransition(t, a, n.from.x, i), e = V.effects.setTransition(t, a, n.to.x, e)), l && V.effects.saveStyle(t), t.css(i), t.animate(e, s.duration, s.easing, function() {
                l && V.effects.restoreStyle(t);
            });
        })), i.animate(g, {
            queue: !1,
            duration: s.duration,
            easing: s.easing,
            complete: function() {
                var t = i.offset();
                0 === g.opacity && i.css("opacity", f.opacity), l || (i.css("position", "static" === u ? "relative" : u).offset(t), V.effects.saveStyle(i)), e();
            }
        });
    }), V.effects.define("scale", function(t, e) {
        var i = V(this),
            s = t.mode,
            s = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) || "effect" !== s ? 0 : 100),
            s = V.extend(!0, {
                from: V.effects.scaledDimensions(i),
                to: V.effects.scaledDimensions(i, s, t.direction || "both"),
                origin: t.origin || ["middle", "center"]
            }, t);
        t.fade && (s.from.opacity = 1, s.to.opacity = 0), V.effects.effect.size.call(this, s, e);
    }), V.effects.define("puff", "hide", function(t, e) {
        t = V.extend(!0, {}, t, {
            fade: !0,
            percent: parseInt(t.percent, 10) || 150
        });
        V.effects.effect.scale.call(this, t, e);
    }), V.effects.define("pulsate", "show", function(t, e) {
        var i = V(this),
            s = t.mode,
            n = "show" === s,
            s = n || "hide" === s,
            o = 2 * (t.times || 5) + (s ? 1 : 0),
            a = t.duration / o,
            r = 0,
            l = 1,
            s = i.queue().length;
        for (!n && i.is(":visible") || (i.css("opacity", 0).show(), r = 1); l < o; l++) i.animate({
            opacity: r
        }, a, t.easing), r = 1 - r;
        i.animate({
            opacity: r
        }, a, t.easing), i.queue(e), V.effects.unshift(i, s, 1 + o);
    }), V.effects.define("shake", function(t, e) {
        var i = 1,
            s = V(this),
            n = t.direction || "left",
            o = t.distance || 20,
            a = t.times || 3,
            r = 2 * a + 1,
            l = Math.round(t.duration / r),
            h = "up" === n || "down" === n ? "top" : "left",
            c = "up" === n || "left" === n,
            u = {},
            d = {},
            p = {},
            n = s.queue().length;
        for (V.effects.createPlaceholder(s), u[h] = (c ? "-=" : "+=") + o, d[h] = (c ? "+=" : "-=") + 2 * o, p[h] = (c ? "-=" : "+=") + 2 * o, s.animate(u, l, t.easing); i < a; i++) s.animate(d, l, t.easing).animate(p, l, t.easing);
        s.animate(d, l, t.easing).animate(u, l / 2, t.easing).queue(e), V.effects.unshift(s, n, 1 + r);
    }), V.effects.define("slide", "show", function(t, e) {
        var i, s, n = V(this),
            o = {
                up: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                right: ["left", "right"]
            },
            a = t.mode,
            r = t.direction || "left",
            l = "up" === r || "down" === r ? "top" : "left",
            h = "up" === r || "left" === r,
            c = t.distance || n["top" == l ? "outerHeight" : "outerWidth"](!0),
            u = {};
        V.effects.createPlaceholder(n), i = n.cssClip(), s = n.position()[l], u[l] = (h ? -1 : 1) * c + s, u.clip = n.cssClip(), u.clip[o[r][1]] = u.clip[o[r][0]], "show" === a && (n.cssClip(u.clip), n.css(l, u[l]), u.clip = i, u[l] = s), n.animate(u, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        });
    });
    !1 !== V.uiBackCompat && (w = V.effects.define("transfer", function(t, e) {
        V(this).transfer(t, e);
    }));
    V.ui.focusable = function(t, e) {
        var i, s, n, o, a = t.nodeName.toLowerCase();
        return "area" === a ? (s = (i = t.parentNode).name, !(!t.href || !s || "map" !== i.nodeName.toLowerCase()) && 0 < (s = V("img[usemap='#" + s + "']")).length && s.is(":visible")) : (/^(input|select|textarea|button|object)$/.test(a) ? (n = !t.disabled) && (o = V(t).closest("fieldset")[0]) && (n = !o.disabled) : n = "a" === a && t.href || e, n && V(t).is(":visible") && function(t) {
            var e = t.css("visibility");
            for (;
                "inherit" === e;) t = t.parent(), e = t.css("visibility");
            return "visible" === e;
        }(V(t)));
    }, V.extend(V.expr.pseudos, {
        focusable: function(t) {
            return V.ui.focusable(t, null != V.attr(t, "tabindex"));
        }
    });
    var Q, J;
    V.ui.focusable, V.fn._form = function() {
        return "string" == typeof this[0].form ? this.closest("form") : V(this[0].form);
    }, V.ui.formResetMixin = {
        _formResetHandler: function() {
            var e = V(this);
            setTimeout(function() {
                var t = e.data("ui-form-reset-instances");
                V.each(t, function() {
                    this.refresh();
                });
            });
        },
        _bindFormResetHandler: function() {
            var t;
            this.form = this.element._form(), this.form.length && ((t = this.form.data("ui-form-reset-instances") || []).length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t));
        },
        _unbindFormResetHandler: function() {
            var t;
            this.form.length && ((t = this.form.data("ui-form-reset-instances")).splice(V.inArray(this, t), 1), t.length ? this.form.data("ui-form-reset-instances", t) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"));
        }
    };
    V.expr.pseudos || (V.expr.pseudos = V.expr[":"]), V.uniqueSort || (V.uniqueSort = V.unique), V.escapeSelector || (Q = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, J = function(t, e) {
        return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t;
    }, V.escapeSelector = function(t) {
        return (t + "").replace(Q, J);
    }), V.fn.even && V.fn.odd || V.fn.extend({
        even: function() {
            return this.filter(function(t) {
                return t % 2 == 0;
            });
        },
        odd: function() {
            return this.filter(function(t) {
                return t % 2 == 1;
            });
        }
    });
    var Z;
    V.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }, V.fn.labels = function() {
        var t, e, i;
        return this.length ? this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (e = this.eq(0).parents("label"), (t = this.attr("id")) && (i = (i = this.eq(0).parents().last()).add((i.length ? i : this).siblings()), t = "label[for='" + V.escapeSelector(t) + "']", e = e.add(i.find(t).addBack(t))), this.pushStack(e)) : this.pushStack([]);
    }, V.fn.scrollParent = function(t) {
        var e = this.css("position"),
            i = "absolute" === e,
            s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            t = this.parents().filter(function() {
                var t = V(this);
                return (!i || "static" !== t.css("position")) && s.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"));
            }).eq(0);
        return "fixed" !== e && t.length ? t : V(this[0].ownerDocument || document);
    }, V.extend(V.expr.pseudos, {
        tabbable: function(t) {
            var e = V.attr(t, "tabindex"),
                i = null != e;
            return (!i || 0 <= e) && V.ui.focusable(t, i);
        }
    }), V.fn.extend({
        uniqueId: (Z = 0, function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++Z);
            });
        }),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && V(this).removeAttr("id");
            });
        }
    }), V.widget("ui.accordion", {
        version: "1.13.0",
        options: {
            active: 0,
            animate: {},
            classes: {
                "ui-accordion-header": "ui-corner-top",
                "ui-accordion-header-collapsed": "ui-corner-all",
                "ui-accordion-content": "ui-corner-bottom"
            },
            collapsible: !1,
            event: "click",
            header: function(t) {
                return t.find("> li > :first-child").add(t.find("> :not(li)").even());
            },
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide"
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show"
        },
        _create: function() {
            var t = this.options;
            this.prevShow = this.prevHide = V(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"), this.element.attr("role", "tablist"), t.collapsible || !1 !== t.active && null != t.active || (t.active = 0), this._processPanels(), t.active < 0 && (t.active += this.headers.length), this._refresh();
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : V()
            };
        },
        _createIcons: function() {
            var t, e = this.options.icons;
            e && (t = V("<span>"), this._addClass(t, "ui-accordion-header-icon", "ui-icon " + e.header), t.prependTo(this.headers), t = this.active.children(".ui-accordion-header-icon"), this._removeClass(t, e.header)._addClass(t, null, e.activeHeader)._addClass(this.headers, "ui-accordion-icons"));
        },
        _destroyIcons: function() {
            this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove();
        },
        _destroy: function() {
            var t;
            this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "");
        },
        _setOption: function(t, e) {
            "active" !== t ? ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || !1 !== this.options.active || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons())) : this._activate(e);
        },
        _setOptionDisabled: function(t) {
            this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!t);
        },
        _keydown: function(t) {
            if (!t.altKey && !t.ctrlKey) {
                var e = V.ui.keyCode,
                    i = this.headers.length,
                    s = this.headers.index(t.target),
                    n = !1;
                switch (t.keyCode) {
                    case e.RIGHT:
                    case e.DOWN:
                        n = this.headers[(s + 1) % i];
                        break;
                    case e.LEFT:
                    case e.UP:
                        n = this.headers[(s - 1 + i) % i];
                        break;
                    case e.SPACE:
                    case e.ENTER:
                        this._eventHandler(t);
                        break;
                    case e.HOME:
                        n = this.headers[0];
                        break;
                    case e.END:
                        n = this.headers[i - 1];
                }
                n && (V(t.target).attr("tabIndex", -1), V(n).attr("tabIndex", 0), V(n).trigger("focus"), t.preventDefault());
            }
        },
        _panelKeyDown: function(t) {
            t.keyCode === V.ui.keyCode.UP && t.ctrlKey && V(t.currentTarget).prev().trigger("focus");
        },
        refresh: function() {
            var t = this.options;
            this._processPanels(), !1 === t.active && !0 === t.collapsible || !this.headers.length ? (t.active = !1, this.active = V()) : !1 === t.active ? this._activate(0) : this.active.length && !V.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = V()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active), this._destroyIcons(), this._refresh();
        },
        _processPanels: function() {
            var t = this.headers,
                e = this.panels;
            "function" == typeof this.options.header ? this.headers = this.options.header(this.element) : this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"), this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(), this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)));
        },
        _refresh: function() {
            var i, t = this.options,
                e = t.heightStyle,
                s = this.element.parent();
            this.active = this._findActive(t.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"), this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(), this.headers.attr("role", "tab").each(function() {
                var t = V(this),
                    e = t.uniqueId().attr("id"),
                    i = t.next(),
                    s = i.uniqueId().attr("id");
                t.attr("aria-controls", s), i.attr("aria-labelledby", e);
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(t.event), "fill" === e ? (i = s.height(), this.element.siblings(":visible").each(function() {
                var t = V(this),
                    e = t.css("position");
                "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0));
            }), this.headers.each(function() {
                i -= V(this).outerHeight(!0);
            }), this.headers.next().each(function() {
                V(this).height(Math.max(0, i - V(this).innerHeight() + V(this).height()));
            }).css("overflow", "auto")) : "auto" === e && (i = 0, this.headers.next().each(function() {
                var t = V(this).is(":visible");
                t || V(this).show(), i = Math.max(i, V(this).css("height", "").height()), t || V(this).hide();
            }).height(i));
        },
        _activate: function(t) {
            t = this._findActive(t)[0];
            t !== this.active[0] && (t = t || this.active[0], this._eventHandler({
                target: t,
                currentTarget: t,
                preventDefault: V.noop
            }));
        },
        _findActive: function(t) {
            return "number" == typeof t ? this.headers.eq(t) : V();
        },
        _setupEvents: function(t) {
            var i = {
                keydown: "_keydown"
            };
            t && V.each(t.split(" "), function(t, e) {
                i[e] = "_eventHandler";
            }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }), this._hoverable(this.headers), this._focusable(this.headers);
        },
        _eventHandler: function(t) {
            var e = this.options,
                i = this.active,
                s = V(t.currentTarget),
                n = s[0] === i[0],
                o = n && e.collapsible,
                a = o ? V() : s.next(),
                r = i.next(),
                a = {
                    oldHeader: i,
                    oldPanel: r,
                    newHeader: o ? V() : s,
                    newPanel: a
                };
            t.preventDefault(), n && !e.collapsible || !1 === this._trigger("beforeActivate", t, a) || (e.active = !o && this.headers.index(s), this.active = n ? V() : s, this._toggle(a), this._removeClass(i, "ui-accordion-header-active", "ui-state-active"), e.icons && (i = i.children(".ui-accordion-header-icon"), this._removeClass(i, null, e.icons.activeHeader)._addClass(i, null, e.icons.header)), n || (this._removeClass(s, "ui-accordion-header-collapsed")._addClass(s, "ui-accordion-header-active", "ui-state-active"), e.icons && (n = s.children(".ui-accordion-header-icon"), this._removeClass(n, null, e.icons.header)._addClass(n, null, e.icons.activeHeader)), this._addClass(s.next(), "ui-accordion-content-active")));
        },
        _toggle: function(t) {
            var e = t.newPanel,
                i = this.prevShow.length ? this.prevShow : t.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = e, this.prevHide = i, this.options.animate ? this._animate(e, i, t) : (i.hide(), e.show(), this._toggleComplete(t)), i.attr({
                "aria-hidden": "true"
            }), i.prev().attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), e.length && i.length ? i.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : e.length && this.headers.filter(function() {
                return 0 === parseInt(V(this).attr("tabIndex"), 10);
            }).attr("tabIndex", -1), e.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            });
        },
        _animate: function(t, i, e) {
            var s, n, o, a = this,
                r = 0,
                l = t.css("box-sizing"),
                h = t.length && (!i.length || t.index() < i.index()),
                c = this.options.animate || {},
                u = h && c.down || c,
                h = function() {
                    a._toggleComplete(e);
                };
            return "number" == typeof u && (o = u), "string" == typeof u && (n = u), n = n || u.easing || c.easing, o = o || u.duration || c.duration, i.length ? t.length ? (s = t.show().outerHeight(), i.animate(this.hideProps, {
                duration: o,
                easing: n,
                step: function(t, e) {
                    e.now = Math.round(t);
                }
            }), void t.hide().animate(this.showProps, {
                duration: o,
                easing: n,
                complete: h,
                step: function(t, e) {
                    e.now = Math.round(t), "height" !== e.prop ? "content-box" === l && (r += e.now) : "content" !== a.options.heightStyle && (e.now = Math.round(s - i.outerHeight() - r), r = 0);
                }
            })) : i.animate(this.hideProps, o, n, h) : t.animate(this.showProps, o, n, h);
        },
        _toggleComplete: function(t) {
            var e = t.oldPanel,
                i = e.prev();
            this._removeClass(e, "ui-accordion-content-active"), this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t);
        }
    }), V.ui.safeActiveElement = function(e) {
        var i;
        try {
            i = e.activeElement;
        } catch (t) {
            i = e.body;
        }
        return (i = i || e.body).nodeName || (i = e.body), i;
    }, V.widget("ui.menu", {
        version: "1.13.0",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-caret-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element, this.mouseHandled = !1, this.lastMousePosition = {
                x: null,
                y: null
            }, this.element.uniqueId().attr({
                role: this.options.role,
                tabIndex: 0
            }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({
                "mousedown .ui-menu-item": function(t) {
                    t.preventDefault(), this._activateItem(t);
                },
                "click .ui-menu-item": function(t) {
                    var e = V(t.target),
                        i = V(V.ui.safeActiveElement(this.document[0]));
                    !this.mouseHandled && e.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), e.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && i.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                },
                "mouseenter .ui-menu-item": "_activateItem",
                "mousemove .ui-menu-item": "_activateItem",
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(t, e) {
                    var i = this.active || this._menuItems().first();
                    e || this.focus(t, i);
                },
                blur: function(t) {
                    this._delay(function() {
                        V.contains(this.element[0], V.ui.safeActiveElement(this.document[0])) || this.collapseAll(t);
                    });
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function(t) {
                    this._closeOnDocumentClick(t) && this.collapseAll(t, !0), this.mouseHandled = !1;
                }
            });
        },
        _activateItem: function(t) {
            var e, i;
            this.previousFilter || t.clientX === this.lastMousePosition.x && t.clientY === this.lastMousePosition.y || (this.lastMousePosition = {
                x: t.clientX,
                y: t.clientY
            }, e = V(t.target).closest(".ui-menu-item"), i = V(t.currentTarget), e[0] === i[0] && (i.is(".ui-state-active") || (this._removeClass(i.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(t, i))));
        },
        _destroy: function() {
            var t = this.element.find(".ui-menu-item").removeAttr("role aria-disabled").children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), t.children().each(function() {
                var t = V(this);
                t.data("ui-menu-submenu-caret") && t.remove();
            });
        },
        _keydown: function(t) {
            var e, i, s, n = !0;
            switch (t.keyCode) {
                case V.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case V.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case V.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case V.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case V.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case V.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case V.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case V.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case V.ui.keyCode.ENTER:
                case V.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case V.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    n = !1, e = this.previousFilter || "", s = !1, i = 96 <= t.keyCode && t.keyCode <= 105 ? (t.keyCode - 96).toString() : String.fromCharCode(t.keyCode), clearTimeout(this.filterTimer), i === e ? s = !0 : i = e + i, e = this._filterMenuItems(i), (e = s && -1 !== e.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : e).length || (i = String.fromCharCode(t.keyCode), e = this._filterMenuItems(i)), e.length ? (this.focus(t, e), this.previousFilter = i, this.filterTimer = this._delay(function() {
                        delete this.previousFilter;
                    }, 1e3)) : delete this.previousFilter;
            }
            n && t.preventDefault();
        },
        _activate: function(t) {
            this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t));
        },
        refresh: function() {
            var t, e, s = this,
                n = this.options.icons.submenu,
                i = this.element.find(this.options.menus);
            this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), e = i.filter(":not(.ui-menu)").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = V(this),
                    e = t.prev(),
                    i = V("<span>").data("ui-menu-submenu-caret", !0);
                s._addClass(i, "ui-menu-icon", "ui-icon " + n), e.attr("aria-haspopup", "true").prepend(i), t.attr("aria-labelledby", e.attr("id"));
            }), this._addClass(e, "ui-menu", "ui-widget ui-widget-content ui-front"), (t = i.add(this.element).find(this.options.items)).not(".ui-menu-item").each(function() {
                var t = V(this);
                s._isDivider(t) && s._addClass(t, "ui-menu-divider", "ui-widget-content");
            }), i = (e = t.not(".ui-menu-item, .ui-menu-divider")).children().not(".ui-menu").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            }), this._addClass(e, "ui-menu-item")._addClass(i, "ui-menu-item-wrapper"), t.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !V.contains(this.element[0], this.active[0]) && this.blur();
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            } [this.options.role];
        },
        _setOption: function(t, e) {
            var i;
            "icons" === t && (i = this.element.find(".ui-menu-icon"), this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu)), this._super(t, e);
        },
        _setOptionDisabled: function(t) {
            this._super(t), this.element.attr("aria-disabled", String(t)), this._toggleClass(null, "ui-state-disabled", !!t);
        },
        focus: function(t, e) {
            var i;
            this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), i = this.active.children(".ui-menu-item-wrapper"), this._addClass(i, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", i.attr("id")), i = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(i, null, "ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                this._close();
            }, this.delay), (i = e.children(".ui-menu")).length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
                item: e
            });
        },
        _scrollIntoView: function(t) {
            var e, i, s;
            this._hasScroll() && (i = parseFloat(V.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(V.css(this.activeMenu[0], "paddingTop")) || 0, e = t.offset().top - this.activeMenu.offset().top - i - s, i = this.activeMenu.scrollTop(), s = this.activeMenu.height(), t = t.outerHeight(), e < 0 ? this.activeMenu.scrollTop(i + e) : s < e + t && this.activeMenu.scrollTop(i + e - s + t));
        },
        blur: function(t, e) {
            e || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", t, {
                item: this.active
            }), this.active = null);
        },
        _startOpening: function(t) {
            clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(), this._open(t);
            }, this.delay));
        },
        _open: function(t) {
            var e = V.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(e);
        },
        collapseAll: function(e, i) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var t = i ? this.element : V(e && e.target).closest(this.element.find(".ui-menu"));
                t.length || (t = this.element), this._close(t), this.blur(e), this._removeClass(t.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = t;
            }, i ? 0 : this.delay);
        },
        _close: function(t) {
            (t = t || (this.active ? this.active.parent() : this.element)).find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false");
        },
        _closeOnDocumentClick: function(t) {
            return !V(t.target).closest(".ui-menu").length;
        },
        _isDivider: function(t) {
            return !/[^\-\u2014\u2013\s]/.test(t.text());
        },
        collapse: function(t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(), this.focus(t, e));
        },
        expand: function(t) {
            var e = this.active && this._menuItems(this.active.children(".ui-menu")).first();
            e && e.length && (this._open(e.parent()), this._delay(function() {
                this.focus(t, e);
            }));
        },
        next: function(t) {
            this._move("next", "first", t);
        },
        previous: function(t) {
            this._move("prev", "last", t);
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _menuItems: function(t) {
            return (t || this.element).find(this.options.items).filter(".ui-menu-item");
        },
        _move: function(t, e, i) {
            var s;
            this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").last() : this.active[t + "All"](".ui-menu-item").first()), s && s.length && this.active || (s = this._menuItems(this.activeMenu)[e]()), this.focus(i, s);
        },
        nextPage: function(t) {
            var e, i, s;
            this.active ? this.isLastItem() || (this._hasScroll() ? (i = this.active.offset().top, s = this.element.innerHeight(), 0 === V.fn.jquery.indexOf("3.2.") && (s += this.element[0].offsetHeight - this.element.outerHeight()), this.active.nextAll(".ui-menu-item").each(function() {
                return (e = V(this)).offset().top - i - s < 0;
            }), this.focus(t, e)) : this.focus(t, this._menuItems(this.activeMenu)[this.active ? "last" : "first"]())) : this.next(t);
        },
        previousPage: function(t) {
            var e, i, s;
            this.active ? this.isFirstItem() || (this._hasScroll() ? (i = this.active.offset().top, s = this.element.innerHeight(), 0 === V.fn.jquery.indexOf("3.2.") && (s += this.element[0].offsetHeight - this.element.outerHeight()), this.active.prevAll(".ui-menu-item").each(function() {
                return 0 < (e = V(this)).offset().top - i + s;
            }), this.focus(t, e)) : this.focus(t, this._menuItems(this.activeMenu).first())) : this.next(t);
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function(t) {
            this.active = this.active || V(t.target).closest(".ui-menu-item");
            var e = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, e);
        },
        _filterMenuItems: function(t) {
            var t = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                e = new RegExp("^" + t, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                return e.test(String.prototype.trim.call(V(this).children(".ui-menu-item-wrapper").text()));
            });
        }
    });
    V.widget("ui.autocomplete", {
        version: "1.13.0",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var i, s, n, t = this.element[0].nodeName.toLowerCase(),
                e = "textarea" === t,
                t = "input" === t;
            this.isMultiLine = e || !t && this._isContentEditable(this.element), this.valueMethod = this.element[e || t ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, {
                keydown: function(t) {
                    if (this.element.prop("readOnly")) s = n = i = !0;
                    else {
                        s = n = i = !1;
                        var e = V.ui.keyCode;
                        switch (t.keyCode) {
                            case e.PAGE_UP:
                                i = !0, this._move("previousPage", t);
                                break;
                            case e.PAGE_DOWN:
                                i = !0, this._move("nextPage", t);
                                break;
                            case e.UP:
                                i = !0, this._keyEvent("previous", t);
                                break;
                            case e.DOWN:
                                i = !0, this._keyEvent("next", t);
                                break;
                            case e.ENTER:
                                this.menu.active && (i = !0, t.preventDefault(), this.menu.select(t));
                                break;
                            case e.TAB:
                                this.menu.active && this.menu.select(t);
                                break;
                            case e.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(t), t.preventDefault());
                                break;
                            default:
                                s = !0, this._searchTimeout(t);
                        }
                    }
                },
                keypress: function(t) {
                    if (i) return i = !1, void(this.isMultiLine && !this.menu.element.is(":visible") || t.preventDefault());
                    if (!s) {
                        var e = V.ui.keyCode;
                        switch (t.keyCode) {
                            case e.PAGE_UP:
                                this._move("previousPage", t);
                                break;
                            case e.PAGE_DOWN:
                                this._move("nextPage", t);
                                break;
                            case e.UP:
                                this._keyEvent("previous", t);
                                break;
                            case e.DOWN:
                                this._keyEvent("next", t);
                        }
                    }
                },
                input: function(t) {
                    if (n) return n = !1, void t.preventDefault();
                    this._searchTimeout(t);
                },
                focus: function() {
                    this.selectedItem = null, this.previous = this._value();
                },
                blur: function(t) {
                    clearTimeout(this.searching), this.close(t), this._change(t);
                }
            }), this._initSource(), this.menu = V("<ul>").appendTo(this._appendTo()).menu({
                role: null
            }).hide().attr({
                unselectable: "on"
            }).menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault();
                },
                menufocus: function(t, e) {
                    var i;
                    if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(), void this.document.one("mousemove", function() {
                        V(t.target).trigger(t.originalEvent);
                    });
                    i = e.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {
                        item: i
                    }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(i.value), (i = e.item.attr("aria-label") || i.value) && String.prototype.trim.call(i).length && (this.liveRegion.children().hide(), V("<div>").text(i).appendTo(this.liveRegion));
                },
                menuselect: function(t, e) {
                    var i = e.item.data("ui-autocomplete-item"),
                        s = this.previous;
                    this.element[0] !== V.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = s, this._delay(function() {
                        this.previous = s, this.selectedItem = i;
                    })), !1 !== this._trigger("select", t, {
                        item: i
                    }) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i;
                }
            }), this.liveRegion = V("<div>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _destroy: function() {
            clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();
        },
        _setOption: function(t, e) {
            this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort();
        },
        _isEventTargetInWidget: function(t) {
            var e = this.menu.element[0];
            return t.target === this.element[0] || t.target === e || V.contains(e, t.target);
        },
        _closeOnClickOutside: function(t) {
            this._isEventTargetInWidget(t) || this.close();
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return (t = t && (t.jquery || t.nodeType ? V(t) : this.document.find(t).eq(0))) && t[0] || (t = this.element.closest(".ui-front, dialog")), t.length || (t = this.document[0].body), t;
        },
        _initSource: function() {
            var i, s, n = this;
            Array.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, e) {
                e(V.ui.autocomplete.filter(i, t.term));
            }) : "string" == typeof this.options.source ? (s = this.options.source, this.source = function(t, e) {
                n.xhr && n.xhr.abort(), n.xhr = V.ajax({
                    url: s,
                    data: t,
                    dataType: "json",
                    success: function(t) {
                        e(t);
                    },
                    error: function() {
                        e([]);
                    }
                });
            }) : this.source = this.options.source;
        },
        _searchTimeout: function(s) {
            clearTimeout(this.searching), this.searching = this._delay(function() {
                var t = this.term === this._value(),
                    e = this.menu.element.is(":visible"),
                    i = s.altKey || s.ctrlKey || s.metaKey || s.shiftKey;
                t && (!t || e || i) || (this.selectedItem = null, this.search(null, s));
            }, this.options.delay);
        },
        search: function(t, e) {
            return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : !1 !== this._trigger("search", e) ? this._search(t) : void 0;
        },
        _search: function(t) {
            this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: t
            }, this._response());
        },
        _response: function() {
            var e = ++this.requestIndex;
            return function(t) {
                e === this.requestIndex && this.__response(t), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading");
            }.bind(this);
        },
        __response: function(t) {
            t = t && this._normalize(t), this._trigger("response", null, {
                content: t
            }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close();
        },
        close: function(t) {
            this.cancelSearch = !0, this._close(t);
        },
        _close: function(t) {
            this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t));
        },
        _change: function(t) {
            this.previous !== this._value() && this._trigger("change", t, {
                item: this.selectedItem
            });
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : V.map(t, function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : V.extend({}, t, {
                    label: t.label || t.value,
                    value: t.value || t.label
                });
            });
        },
        _suggest: function(t) {
            var e = this.menu.element.empty();
            this._renderMenu(e, t), this.isNewMenu = !0, this.menu.refresh(), e.show(), this._resizeMenu(), e.position(V.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, {
                mousedown: "_closeOnClickOutside"
            });
        },
        _resizeMenu: function() {
            var t = this.menu.element;
            t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()));
        },
        _renderMenu: function(i, t) {
            var s = this;
            V.each(t, function(t, e) {
                s._renderItemData(i, e);
            });
        },
        _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-autocomplete-item", e);
        },
        _renderItem: function(t, e) {
            return V("<li>").append(V("<div>").text(e.label)).appendTo(t);
        },
        _move: function(t, e) {
            if (this.menu.element.is(":visible")) return this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[t](e);
            this.search(null, e);
        },
        widget: function() {
            return this.menu.element;
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function(t, e) {
            this.isMultiLine && !this.menu.element.is(":visible") || (this._move(t, e), e.preventDefault());
        },
        _isContentEditable: function(t) {
            if (!t.length) return !1;
            var e = t.prop("contentEditable");
            return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e;
        }
    }), V.extend(V.ui.autocomplete, {
        escapeRegex: function(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function(t, e) {
            var i = new RegExp(V.ui.autocomplete.escapeRegex(e), "i");
            return V.grep(t, function(t) {
                return i.test(t.label || t.value || t);
            });
        }
    }), V.widget("ui.autocomplete", V.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(t) {
                    return t + (1 < t ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                }
            }
        },
        __response: function(t) {
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (t = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), V("<div>").text(t).appendTo(this.liveRegion));
        }
    });
    V.ui.autocomplete;
    var tt = /ui-corner-([a-z]){2,6}/g;
    V.widget("ui.controlgroup", {
        version: "1.13.0",
        defaultElement: "<div>",
        options: {
            direction: "horizontal",
            disabled: null,
            onlyVisible: !0,
            items: {
                button: "input[type=button], input[type=submit], input[type=reset], button, a",
                controlgroupLabel: ".ui-controlgroup-label",
                checkboxradio: "input[type='checkbox'], input[type='radio']",
                selectmenu: "select",
                spinner: ".ui-spinner-input"
            }
        },
        _create: function() {
            this._enhance();
        },
        _enhance: function() {
            this.element.attr("role", "toolbar"), this.refresh();
        },
        _destroy: function() {
            this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap();
        },
        _initWidgets: function() {
            var o = this,
                a = [];
            V.each(this.options.items, function(s, t) {
                var e, n = {};
                if (t) return "controlgroupLabel" === s ? ((e = o.element.find(t)).each(function() {
                    var t = V(this);
                    t.children(".ui-controlgroup-label-contents").length || t.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>");
                }), o._addClass(e, null, "ui-widget ui-widget-content ui-state-default"), void(a = a.concat(e.get()))) : void(V.fn[s] && (n = o["_" + s + "Options"] ? o["_" + s + "Options"]("middle") : {
                    classes: {}
                }, o.element.find(t).each(function() {
                    var t = V(this),
                        e = t[s]("instance"),
                        i = V.widget.extend({}, n);
                    "button" === s && t.parent(".ui-spinner").length || ((e = e || t[s]()[s]("instance")) && (i.classes = o._resolveClassesValues(i.classes, e)), t[s](i), i = t[s]("widget"), V.data(i[0], "ui-controlgroup-data", e || t[s]("instance")), a.push(i[0]));
                })));
            }), this.childWidgets = V(V.uniqueSort(a)), this._addClass(this.childWidgets, "ui-controlgroup-item");
        },
        _callChildMethod: function(e) {
            this.childWidgets.each(function() {
                var t = V(this).data("ui-controlgroup-data");
                t && t[e] && t[e]();
            });
        },
        _updateCornerClass: function(t, e) {
            e = this._buildSimpleOptions(e, "label").classes.label;
            this._removeClass(t, null, "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"), this._addClass(t, null, e);
        },
        _buildSimpleOptions: function(t, e) {
            var i = "vertical" === this.options.direction,
                s = {
                    classes: {}
                };
            return s.classes[e] = {
                middle: "",
                first: "ui-corner-" + (i ? "top" : "left"),
                last: "ui-corner-" + (i ? "bottom" : "right"),
                only: "ui-corner-all"
            } [t], s;
        },
        _spinnerOptions: function(t) {
            t = this._buildSimpleOptions(t, "ui-spinner");
            return t.classes["ui-spinner-up"] = "", t.classes["ui-spinner-down"] = "", t;
        },
        _buttonOptions: function(t) {
            return this._buildSimpleOptions(t, "ui-button");
        },
        _checkboxradioOptions: function(t) {
            return this._buildSimpleOptions(t, "ui-checkboxradio-label");
        },
        _selectmenuOptions: function(t) {
            var e = "vertical" === this.options.direction;
            return {
                width: e && "auto",
                classes: {
                    middle: {
                        "ui-selectmenu-button-open": "",
                        "ui-selectmenu-button-closed": ""
                    },
                    first: {
                        "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
                        "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left")
                    },
                    last: {
                        "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
                        "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right")
                    },
                    only: {
                        "ui-selectmenu-button-open": "ui-corner-top",
                        "ui-selectmenu-button-closed": "ui-corner-all"
                    }
                } [t]
            };
        },
        _resolveClassesValues: function(i, s) {
            var n = {};
            return V.each(i, function(t) {
                var e = s.options.classes[t] || "",
                    e = String.prototype.trim.call(e.replace(tt, ""));
                n[t] = (e + " " + i[t]).replace(/\s+/g, " ");
            }), n;
        },
        _setOption: function(t, e) {
            "direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(t, e), "disabled" !== t ? this.refresh() : this._callChildMethod(e ? "disable" : "enable");
        },
        refresh: function() {
            var n, o = this;
            this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), n = this.childWidgets, this.options.onlyVisible && (n = n.filter(":visible")), n.length && (V.each(["first", "last"], function(t, e) {
                var i, s = n[e]().data("ui-controlgroup-data");
                s && o["_" + s.widgetName + "Options"] ? ((i = o["_" + s.widgetName + "Options"](1 === n.length ? "only" : e)).classes = o._resolveClassesValues(i.classes, s), s.element[s.widgetName](i)) : o._updateCornerClass(n[e](), e);
            }), this._callChildMethod("refresh"));
        }
    });
    V.widget("ui.checkboxradio", [V.ui.formResetMixin, {
        version: "1.13.0",
        options: {
            disabled: null,
            label: null,
            icon: !0,
            classes: {
                "ui-checkboxradio-label": "ui-corner-all",
                "ui-checkboxradio-icon": "ui-corner-all"
            }
        },
        _getCreateOptions: function() {
            var t, e = this,
                i = this._super() || {};
            return this._readType(), t = this.element.labels(), this.label = V(t[t.length - 1]), this.label.length || V.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function() {
                e.originalLabel += 3 === this.nodeType ? V(this).text() : this.outerHTML;
            }), this.originalLabel && (i.label = this.originalLabel), null != (t = this.element[0].disabled) && (i.disabled = t), i;
        },
        _create: function() {
            var t = this.element[0].checked;
            this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), t && this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this._on({
                change: "_toggleClasses",
                focus: function() {
                    this._addClass(this.label, null, "ui-state-focus ui-visual-focus");
                },
                blur: function() {
                    this._removeClass(this.label, null, "ui-state-focus ui-visual-focus");
                }
            });
        },
        _readType: function() {
            var t = this.element[0].nodeName.toLowerCase();
            this.type = this.element[0].type, "input" === t && /radio|checkbox/.test(this.type) || V.error("Can't create checkboxradio on element.nodeName=" + t + " and element.type=" + this.type);
        },
        _enhance: function() {
            this._updateIcon(this.element[0].checked);
        },
        widget: function() {
            return this.label;
        },
        _getRadioGroup: function() {
            var t = this.element[0].name,
                e = "input[name='" + V.escapeSelector(t) + "']";
            return t ? (this.form.length ? V(this.form[0].elements).filter(e) : V(e).filter(function() {
                return 0 === V(this)._form().length;
            })).not(this.element) : V([]);
        },
        _toggleClasses: function() {
            var t = this.element[0].checked;
            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", t)._toggleClass(this.icon, null, "ui-icon-blank", !t), "radio" === this.type && this._getRadioGroup().each(function() {
                var t = V(this).checkboxradio("instance");
                t && t._removeClass(t.label, "ui-checkboxradio-checked", "ui-state-active");
            });
        },
        _destroy: function() {
            this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove());
        },
        _setOption: function(t, e) {
            if ("label" !== t || e) {
                if (this._super(t, e), "disabled" === t) return this._toggleClass(this.label, null, "ui-state-disabled", e), void(this.element[0].disabled = e);
                this.refresh();
            }
        },
        _updateIcon: function(t) {
            var e = "ui-icon ui-icon-background ";
            this.options.icon ? (this.icon || (this.icon = V("<span>"), this.iconSpace = V("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (e += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, t ? "ui-icon-blank" : "ui-icon-check")) : e += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", e), t || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
        },
        _updateLabel: function() {
            var t = this.label.contents().not(this.element[0]);
            this.icon && (t = t.not(this.icon[0])), this.iconSpace && (t = t.not(this.iconSpace[0])), t.remove(), this.label.append(this.options.label);
        },
        refresh: function() {
            var t = this.element[0].checked,
                e = this.element[0].disabled;
            this._updateIcon(t), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), null !== this.options.label && this._updateLabel(), e !== this.options.disabled && this._setOptions({
                disabled: e
            });
        }
    }]);
    var et;
    V.ui.checkboxradio;
    V.widget("ui.button", {
        version: "1.13.0",
        defaultElement: "<button>",
        options: {
            classes: {
                "ui-button": "ui-corner-all"
            },
            disabled: null,
            icon: null,
            iconPosition: "beginning",
            label: null,
            showLabel: !0
        },
        _getCreateOptions: function() {
            var t, e = this._super() || {};
            return this.isInput = this.element.is("input"), null != (t = this.element[0].disabled) && (e.disabled = t), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (e.label = this.originalLabel), e;
        },
        _create: function() {
            !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({
                keyup: function(t) {
                    t.keyCode === V.ui.keyCode.SPACE && (t.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"));
                }
            });
        },
        _enhance: function() {
            this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip());
        },
        _updateTooltip: function() {
            this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label);
        },
        _updateIcon: function(t, e) {
            var i = "iconPosition" !== t,
                s = i ? this.options.iconPosition : e,
                t = "top" === s || "bottom" === s;
            this.icon ? i && this._removeClass(this.icon, null, this.options.icon) : (this.icon = V("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), i && this._addClass(this.icon, null, e), this._attachIcon(s), t ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = V("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(s));
        },
        _destroy: function() {
            this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title");
        },
        _attachIconSpace: function(t) {
            this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace);
        },
        _attachIcon: function(t) {
            this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon);
        },
        _setOptions: function(t) {
            var e = (void 0 === t.showLabel ? this.options : t).showLabel,
                i = (void 0 === t.icon ? this.options : t).icon;
            e || i || (t.showLabel = !0), this._super(t);
        },
        _setOption: function(t, e) {
            "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === t && this._updateIcon(t, e), "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e), this._updateTooltip()), "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(t, e), "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e), (this.element[0].disabled = e) && this.element.trigger("blur"));
        },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOptions({
                disabled: t
            }), this._updateTooltip();
        }
    }), !1 !== V.uiBackCompat && (V.widget("ui.button", V.ui.button, {
        options: {
            text: !0,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super();
        },
        _setOption: function(t, e) {
            "text" !== t ? ("showLabel" === t && (this.options.text = e), "icon" === t && (this.options.icons.primary = e), "icons" === t && (e.primary ? (this._super("icon", e.primary), this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary), this._super("iconPosition", "end"))), this._superApply(arguments)) : this._super("showLabel", e);
        }
    }), V.fn.button = (et = V.fn.button, function(i) {
        var t = "string" == typeof i,
            s = Array.prototype.slice.call(arguments, 1),
            n = this;
        return t ? this.length || "instance" !== i ? this.each(function() {
            var t = V(this).attr("type"),
                e = "checkbox" !== t && "radio" !== t ? "button" : "checkboxradio",
                t = V.data(this, "ui-" + e);
            return "instance" === i ? (n = t, !1) : t ? "function" != typeof t[i] || "_" === i.charAt(0) ? V.error("no such method '" + i + "' for button widget instance") : (e = t[i].apply(t, s)) !== t && void 0 !== e ? (n = e && e.jquery ? n.pushStack(e.get()) : e, !1) : void 0 : V.error("cannot call methods on button prior to initialization; attempted to call method '" + i + "'");
        }) : n = void 0 : (s.length && (i = V.widget.extend.apply(null, [i].concat(s))), this.each(function() {
            var t = V(this).attr("type"),
                e = "checkbox" !== t && "radio" !== t ? "button" : "checkboxradio",
                t = V.data(this, "ui-" + e);
            t ? (t.option(i || {}), t._init && t._init()) : "button" != e ? V(this).checkboxradio(V.extend({
                icon: !1
            }, i)) : et.call(V(this), i);
        })), n;
    }), V.fn.buttonset = function() {
        return V.ui.controlgroup || V.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
            button: arguments[0].items
        }), this.controlgroup.apply(this, arguments));
    });
    var it;
    V.ui.button;

    function st() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekHeader: "Week",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: "",
            selectMonthLabel: "Select month",
            selectYearLabel: "Select year"
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            onUpdateDatepicker: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, V.extend(this._defaults, this.regional[""]), this.regional.en = V.extend(!0, {}, this.regional[""]), this.regional["en-US"] = V.extend(!0, {}, this.regional.en), this.dpDiv = nt(V("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
    }

    function nt(t) {
        var e = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.on("mouseout", e, function() {
            V(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && V(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && V(this).removeClass("ui-datepicker-next-hover");
        }).on("mouseover", e, ot);
    }

    function ot() {
        V.datepicker._isDisabledDatepicker((it.inline ? it.dpDiv.parent() : it.input)[0]) || (V(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), V(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && V(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && V(this).addClass("ui-datepicker-next-hover"));
    }

    function at(t, e) {
        for (var i in V.extend(t, e), e) null == e[i] && (t[i] = e[i]);
        return t;
    }
    V.extend(V.ui, {
        datepicker: {
            version: "1.13.0"
        }
    }), V.extend(st.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv;
        },
        setDefaults: function(t) {
            return at(this._defaults, t || {}), this;
        },
        _attachDatepicker: function(t, e) {
            var i, s = t.nodeName.toLowerCase(),
                n = "div" === s || "span" === s;
            t.id || (this.uuid += 1, t.id = "dp" + this.uuid), (i = this._newInst(V(t), n)).settings = V.extend({}, e || {}), "input" === s ? this._connectDatepicker(t, i) : n && this._inlineDatepicker(t, i);
        },
        _newInst: function(t, e) {
            return {
                id: t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: e,
                dpDiv: e ? nt(V("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            };
        },
        _connectDatepicker: function(t, e) {
            var i = V(t);
            e.append = V([]), e.trigger = V([]), i.hasClass(this.markerClassName) || (this._attachments(i, e), i.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(e), V.data(t, "datepicker", e), e.settings.disabled && this._disableDatepicker(t));
        },
        _attachments: function(t, e) {
            var i, s = this._get(e, "appendText"),
                n = this._get(e, "isRTL");
            e.append && e.append.remove(), s && (e.append = V("<span>").addClass(this._appendClass).text(s), t[n ? "before" : "after"](e.append)), t.off("focus", this._showDatepicker), e.trigger && e.trigger.remove(), "focus" !== (i = this._get(e, "showOn")) && "both" !== i || t.on("focus", this._showDatepicker), "button" !== i && "both" !== i || (s = this._get(e, "buttonText"), i = this._get(e, "buttonImage"), this._get(e, "buttonImageOnly") ? e.trigger = V("<img>").addClass(this._triggerClass).attr({
                src: i,
                alt: s,
                title: s
            }) : (e.trigger = V("<button type='button'>").addClass(this._triggerClass), i ? e.trigger.html(V("<img>").attr({
                src: i,
                alt: s,
                title: s
            })) : e.trigger.text(s)), t[n ? "before" : "after"](e.trigger), e.trigger.on("click", function() {
                return V.datepicker._datepickerShowing && V.datepicker._lastInput === t[0] ? V.datepicker._hideDatepicker() : (V.datepicker._datepickerShowing && V.datepicker._lastInput !== t[0] && V.datepicker._hideDatepicker(), V.datepicker._showDatepicker(t[0])), !1;
            }));
        },
        _autoSize: function(t) {
            var e, i, s, n, o, a;
            this._get(t, "autoSize") && !t.inline && (o = new Date(2009, 11, 20), (a = this._get(t, "dateFormat")).match(/[DM]/) && (e = function(t) {
                for (n = s = i = 0; n < t.length; n++) t[n].length > i && (i = t[n].length, s = n);
                return s;
            }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length));
        },
        _inlineDatepicker: function(t, e) {
            var i = V(t);
            i.hasClass(this.markerClassName) || (i.addClass(this.markerClassName).append(e.dpDiv), V.data(t, "datepicker", e), this._setDate(e, this._getDefaultDate(e), !0), this._updateDatepicker(e), this._updateAlternate(e), e.settings.disabled && this._disableDatepicker(t), e.dpDiv.css("display", "block"));
        },
        _dialogDatepicker: function(t, e, i, s, n) {
            var o, a = this._dialogInst;
            return a || (this.uuid += 1, o = "dp" + this.uuid, this._dialogInput = V("<input type='text' id='" + o + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), V("body").append(this._dialogInput), (a = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}, V.data(this._dialogInput[0], "datepicker", a)), at(a.settings, s || {}), e = e && e.constructor === Date ? this._formatDate(a, e) : e, this._dialogInput.val(e), this._pos = n ? n.length ? n : [n.pageX, n.pageY] : null, this._pos || (o = document.documentElement.clientWidth, s = document.documentElement.clientHeight, e = document.documentElement.scrollLeft || document.body.scrollLeft, n = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [o / 2 - 100 + e, s / 2 - 150 + n]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), a.settings.onSelect = i, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), V.blockUI && V.blockUI(this.dpDiv), V.data(this._dialogInput[0], "datepicker", a), this;
        },
        _destroyDatepicker: function(t) {
            var e, i = V(t),
                s = V.data(t, "datepicker");
            i.hasClass(this.markerClassName) && (e = t.nodeName.toLowerCase(), V.removeData(t, "datepicker"), "input" === e ? (s.append.remove(), s.trigger.remove(), i.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== e && "span" !== e || i.removeClass(this.markerClassName).empty(), it === s && (it = null, this._curInst = null));
        },
        _enableDatepicker: function(e) {
            var t, i = V(e),
                s = V.data(e, "datepicker");
            i.hasClass(this.markerClassName) && ("input" === (t = e.nodeName.toLowerCase()) ? (e.disabled = !1, s.trigger.filter("button").each(function() {
                this.disabled = !1;
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== t && "span" !== t || ((i = i.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = V.map(this._disabledInputs, function(t) {
                return t === e ? null : t;
            }));
        },
        _disableDatepicker: function(e) {
            var t, i = V(e),
                s = V.data(e, "datepicker");
            i.hasClass(this.markerClassName) && ("input" === (t = e.nodeName.toLowerCase()) ? (e.disabled = !0, s.trigger.filter("button").each(function() {
                this.disabled = !0;
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== t && "span" !== t || ((i = i.children("." + this._inlineClass)).children().addClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = V.map(this._disabledInputs, function(t) {
                return t === e ? null : t;
            }), this._disabledInputs[this._disabledInputs.length] = e);
        },
        _isDisabledDatepicker: function(t) {
            if (!t) return !1;
            for (var e = 0; e < this._disabledInputs.length; e++)
                if (this._disabledInputs[e] === t) return !0;
            return !1;
        },
        _getInst: function(t) {
            try {
                return V.data(t, "datepicker");
            } catch (t) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(t, e, i) {
            var s, n, o = this._getInst(t);
            if (2 === arguments.length && "string" == typeof e) return "defaults" === e ? V.extend({}, V.datepicker._defaults) : o ? "all" === e ? V.extend({}, o.settings) : this._get(o, e) : null;
            s = e || {}, "string" == typeof e && ((s = {})[e] = i), o && (this._curInst === o && this._hideDatepicker(), n = this._getDateDatepicker(t, !0), e = this._getMinMaxDate(o, "min"), i = this._getMinMaxDate(o, "max"), at(o.settings, s), null !== e && void 0 !== s.dateFormat && void 0 === s.minDate && (o.settings.minDate = this._formatDate(o, e)), null !== i && void 0 !== s.dateFormat && void 0 === s.maxDate && (o.settings.maxDate = this._formatDate(o, i)), "disabled" in s && (s.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(V(t), o), this._autoSize(o), this._setDate(o, n), this._updateAlternate(o), this._updateDatepicker(o));
        },
        _changeDatepicker: function(t, e, i) {
            this._optionDatepicker(t, e, i);
        },
        _refreshDatepicker: function(t) {
            t = this._getInst(t);
            t && this._updateDatepicker(t);
        },
        _setDateDatepicker: function(t, e) {
            t = this._getInst(t);
            t && (this._setDate(t, e), this._updateDatepicker(t), this._updateAlternate(t));
        },
        _getDateDatepicker: function(t, e) {
            t = this._getInst(t);
            return t && !t.inline && this._setDateFromField(t, e), t ? this._getDate(t) : null;
        },
        _doKeyDown: function(t) {
            var e, i, s = V.datepicker._getInst(t.target),
                n = !0,
                o = s.dpDiv.is(".ui-datepicker-rtl");
            if (s._keyEvent = !0, V.datepicker._datepickerShowing) switch (t.keyCode) {
                case 9:
                    V.datepicker._hideDatepicker(), n = !1;
                    break;
                case 13:
                    return (i = V("td." + V.datepicker._dayOverClass + ":not(." + V.datepicker._currentClass + ")", s.dpDiv))[0] && V.datepicker._selectDay(t.target, s.selectedMonth, s.selectedYear, i[0]), (e = V.datepicker._get(s, "onSelect")) ? (i = V.datepicker._formatDate(s), e.apply(s.input ? s.input[0] : null, [i, s])) : V.datepicker._hideDatepicker(), !1;
                case 27:
                    V.datepicker._hideDatepicker();
                    break;
                case 33:
                    V.datepicker._adjustDate(t.target, t.ctrlKey ? -V.datepicker._get(s, "stepBigMonths") : -V.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 34:
                    V.datepicker._adjustDate(t.target, t.ctrlKey ? +V.datepicker._get(s, "stepBigMonths") : +V.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && V.datepicker._clearDate(t.target), n = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && V.datepicker._gotoToday(t.target), n = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && V.datepicker._adjustDate(t.target, o ? 1 : -1, "D"), n = t.ctrlKey || t.metaKey, t.originalEvent.altKey && V.datepicker._adjustDate(t.target, t.ctrlKey ? -V.datepicker._get(s, "stepBigMonths") : -V.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && V.datepicker._adjustDate(t.target, -7, "D"), n = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && V.datepicker._adjustDate(t.target, o ? -1 : 1, "D"), n = t.ctrlKey || t.metaKey, t.originalEvent.altKey && V.datepicker._adjustDate(t.target, t.ctrlKey ? +V.datepicker._get(s, "stepBigMonths") : +V.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && V.datepicker._adjustDate(t.target, 7, "D"), n = t.ctrlKey || t.metaKey;
                    break;
                default:
                    n = !1;
            } else 36 === t.keyCode && t.ctrlKey ? V.datepicker._showDatepicker(this) : n = !1;
            n && (t.preventDefault(), t.stopPropagation());
        },
        _doKeyPress: function(t) {
            var e, i = V.datepicker._getInst(t.target);
            if (V.datepicker._get(i, "constrainInput")) return e = V.datepicker._possibleChars(V.datepicker._get(i, "dateFormat")), i = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || i < " " || !e || -1 < e.indexOf(i);
        },
        _doKeyUp: function(t) {
            var e = V.datepicker._getInst(t.target);
            if (e.input.val() !== e.lastVal) try {
                V.datepicker.parseDate(V.datepicker._get(e, "dateFormat"), e.input ? e.input.val() : null, V.datepicker._getFormatConfig(e)) && (V.datepicker._setDateFromField(e), V.datepicker._updateAlternate(e), V.datepicker._updateDatepicker(e));
            } catch (t) {}
            return !0;
        },
        _showDatepicker: function(t) {
            var e, i, s, n;
            "input" !== (t = t.target || t).nodeName.toLowerCase() && (t = V("input", t.parentNode)[0]), V.datepicker._isDisabledDatepicker(t) || V.datepicker._lastInput === t || (n = V.datepicker._getInst(t), V.datepicker._curInst && V.datepicker._curInst !== n && (V.datepicker._curInst.dpDiv.stop(!0, !0), n && V.datepicker._datepickerShowing && V.datepicker._hideDatepicker(V.datepicker._curInst.input[0])), !1 !== (i = (s = V.datepicker._get(n, "beforeShow")) ? s.apply(t, [t, n]) : {}) && (at(n.settings, i), n.lastVal = null, V.datepicker._lastInput = t, V.datepicker._setDateFromField(n), V.datepicker._inDialog && (t.value = ""), V.datepicker._pos || (V.datepicker._pos = V.datepicker._findPos(t), V.datepicker._pos[1] += t.offsetHeight), e = !1, V(t).parents().each(function() {
                return !(e |= "fixed" === V(this).css("position"));
            }), s = {
                left: V.datepicker._pos[0],
                top: V.datepicker._pos[1]
            }, V.datepicker._pos = null, n.dpDiv.empty(), n.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            }), V.datepicker._updateDatepicker(n), s = V.datepicker._checkOffset(n, s, e), n.dpDiv.css({
                position: V.datepicker._inDialog && V.blockUI ? "static" : e ? "fixed" : "absolute",
                display: "none",
                left: s.left + "px",
                top: s.top + "px"
            }), n.inline || (i = V.datepicker._get(n, "showAnim"), s = V.datepicker._get(n, "duration"), n.dpDiv.css("z-index", function(t) {
                for (var e, i; t.length && t[0] !== document;) {
                    if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
                    t = t.parent();
                }
                return 0;
            }(V(t)) + 1), V.datepicker._datepickerShowing = !0, V.effects && V.effects.effect[i] ? n.dpDiv.show(i, V.datepicker._get(n, "showOptions"), s) : n.dpDiv[i || "show"](i ? s : null), V.datepicker._shouldFocusInput(n) && n.input.trigger("focus"), V.datepicker._curInst = n)));
        },
        _updateDatepicker: function(t) {
            this.maxRows = 4, (it = t).dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
            var e, i = this._getNumberOfMonths(t),
                s = i[1],
                n = t.dpDiv.find("." + this._dayOverClass + " a"),
                o = V.datepicker._get(t, "onUpdateDatepicker");
            0 < n.length && ot.apply(n.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 1 < s && t.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", 17 * s + "em"), t.dpDiv[(1 !== i[0] || 1 !== i[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === V.datepicker._curInst && V.datepicker._datepickerShowing && V.datepicker._shouldFocusInput(t) && t.input.trigger("focus"), t.yearshtml && (e = t.yearshtml, setTimeout(function() {
                e === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year").first().replaceWith(t.yearshtml), e = t.yearshtml = null;
            }, 0)), o && o.apply(t.input ? t.input[0] : null, [t]);
        },
        _shouldFocusInput: function(t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus");
        },
        _checkOffset: function(t, e, i) {
            var s = t.dpDiv.outerWidth(),
                n = t.dpDiv.outerHeight(),
                o = t.input ? t.input.outerWidth() : 0,
                a = t.input ? t.input.outerHeight() : 0,
                r = document.documentElement.clientWidth + (i ? 0 : V(document).scrollLeft()),
                l = document.documentElement.clientHeight + (i ? 0 : V(document).scrollTop());
            return e.left -= this._get(t, "isRTL") ? s - o : 0, e.left -= i && e.left === t.input.offset().left ? V(document).scrollLeft() : 0, e.top -= i && e.top === t.input.offset().top + a ? V(document).scrollTop() : 0, e.left -= Math.min(e.left, e.left + s > r && s < r ? Math.abs(e.left + s - r) : 0), e.top -= Math.min(e.top, e.top + n > l && n < l ? Math.abs(n + a) : 0), e;
        },
        _findPos: function(t) {
            for (var e = this._getInst(t), i = this._get(e, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || V.expr.pseudos.hidden(t));) t = t[i ? "previousSibling" : "nextSibling"];
            return [(e = V(t).offset()).left, e.top];
        },
        _hideDatepicker: function(t) {
            var e, i, s = this._curInst;
            !s || t && s !== V.data(t, "datepicker") || this._datepickerShowing && (e = this._get(s, "showAnim"), i = this._get(s, "duration"), t = function() {
                V.datepicker._tidyDialog(s);
            }, V.effects && (V.effects.effect[e] || V.effects[e]) ? s.dpDiv.hide(e, V.datepicker._get(s, "showOptions"), i, t) : s.dpDiv["slideDown" === e ? "slideUp" : "fadeIn" === e ? "fadeOut" : "hide"](e ? i : null, t), e || t(), this._datepickerShowing = !1, (t = this._get(s, "onClose")) && t.apply(s.input ? s.input[0] : null, [s.input ? s.input.val() : "", s]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), V.blockUI && (V.unblockUI(), V("body").append(this.dpDiv))), this._inDialog = !1);
        },
        _tidyDialog: function(t) {
            t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
        },
        _checkExternalClick: function(t) {
            var e;
            V.datepicker._curInst && (e = V(t.target), t = V.datepicker._getInst(e[0]), (e[0].id === V.datepicker._mainDivId || 0 !== e.parents("#" + V.datepicker._mainDivId).length || e.hasClass(V.datepicker.markerClassName) || e.closest("." + V.datepicker._triggerClass).length || !V.datepicker._datepickerShowing || V.datepicker._inDialog && V.blockUI) && (!e.hasClass(V.datepicker.markerClassName) || V.datepicker._curInst === t) || V.datepicker._hideDatepicker());
        },
        _adjustDate: function(t, e, i) {
            var s = V(t),
                t = this._getInst(s[0]);
            this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(t, e, i), this._updateDatepicker(t));
        },
        _gotoToday: function(t) {
            var e = V(t),
                i = this._getInst(e[0]);
            this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (t = new Date(), i.selectedDay = t.getDate(), i.drawMonth = i.selectedMonth = t.getMonth(), i.drawYear = i.selectedYear = t.getFullYear()), this._notifyChange(i), this._adjustDate(e);
        },
        _selectMonthYear: function(t, e, i) {
            var s = V(t),
                t = this._getInst(s[0]);
            t["selected" + ("M" === i ? "Month" : "Year")] = t["draw" + ("M" === i ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10), this._notifyChange(t), this._adjustDate(s);
        },
        _selectDay: function(t, e, i, s) {
            var n = V(t);
            V(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(n[0]) || ((n = this._getInst(n[0])).selectedDay = n.currentDay = parseInt(V("a", s).attr("data-date")), n.selectedMonth = n.currentMonth = e, n.selectedYear = n.currentYear = i, this._selectDate(t, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)));
        },
        _clearDate: function(t) {
            t = V(t);
            this._selectDate(t, "");
        },
        _selectDate: function(t, e) {
            var i = V(t),
                t = this._getInst(i[0]);
            e = null != e ? e : this._formatDate(t), t.input && t.input.val(e), this._updateAlternate(t), (i = this._get(t, "onSelect")) ? i.apply(t.input ? t.input[0] : null, [e, t]) : t.input && t.input.trigger("change"), t.inline ? this._updateDatepicker(t) : (this._hideDatepicker(), this._lastInput = t.input[0], "object" != typeof t.input[0] && t.input.trigger("focus"), this._lastInput = null);
        },
        _updateAlternate: function(t) {
            var e, i, s = this._get(t, "altField");
            s && (e = this._get(t, "altFormat") || this._get(t, "dateFormat"), i = this._getDate(t), t = this.formatDate(e, i, this._getFormatConfig(t)), V(document).find(s).val(t));
        },
        noWeekends: function(t) {
            t = t.getDay();
            return [0 < t && t < 6, ""];
        },
        iso8601Week: function(t) {
            var e = new Date(t.getTime());
            return e.setDate(e.getDate() + 4 - (e.getDay() || 7)), t = e.getTime(), e.setMonth(0), e.setDate(1), Math.floor(Math.round((t - e) / 864e5) / 7) + 1;
        },
        parseDate: function(e, n, t) {
            if (null == e || null == n) throw "Invalid arguments";
            if ("" === (n = "object" == typeof n ? n.toString() : n + "")) return null;
            for (var i, s, o, a = 0, r = (t ? t.shortYearCutoff : null) || this._defaults.shortYearCutoff, r = "string" != typeof r ? r : new Date().getFullYear() % 100 + parseInt(r, 10), l = (t ? t.dayNamesShort : null) || this._defaults.dayNamesShort, h = (t ? t.dayNames : null) || this._defaults.dayNames, c = (t ? t.monthNamesShort : null) || this._defaults.monthNamesShort, u = (t ? t.monthNames : null) || this._defaults.monthNames, d = -1, p = -1, f = -1, g = -1, m = !1, _ = function(t) {
                    t = w + 1 < e.length && e.charAt(w + 1) === t;
                    return t && w++, t;
                }, v = function(t) {
                    var e = _(t),
                        e = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                        e = new RegExp("^\\d{" + ("y" === t ? e : 1) + "," + e + "}"),
                        e = n.substring(a).match(e);
                    if (!e) throw "Missing number at position " + a;
                    return a += e[0].length, parseInt(e[0], 10);
                }, b = function(t, e, i) {
                    var s = -1,
                        e = V.map(_(t) ? i : e, function(t, e) {
                            return [
                                [e, t]
                            ];
                        }).sort(function(t, e) {
                            return -(t[1].length - e[1].length);
                        });
                    if (V.each(e, function(t, e) {
                            var i = e[1];
                            if (n.substr(a, i.length).toLowerCase() === i.toLowerCase()) return s = e[0], a += i.length, !1;
                        }), -1 !== s) return s + 1;
                    throw "Unknown name at position " + a;
                }, y = function() {
                    if (n.charAt(a) !== e.charAt(w)) throw "Unexpected literal at position " + a;
                    a++;
                }, w = 0; w < e.length; w++)
                if (m) "'" !== e.charAt(w) || _("'") ? y() : m = !1;
                else switch (e.charAt(w)) {
                    case "d":
                        f = v("d");
                        break;
                    case "D":
                        b("D", l, h);
                        break;
                    case "o":
                        g = v("o");
                        break;
                    case "m":
                        p = v("m");
                        break;
                    case "M":
                        p = b("M", c, u);
                        break;
                    case "y":
                        d = v("y");
                        break;
                    case "@":
                        d = (o = new Date(v("@"))).getFullYear(), p = o.getMonth() + 1, f = o.getDate();
                        break;
                    case "!":
                        d = (o = new Date((v("!") - this._ticksTo1970) / 1e4)).getFullYear(), p = o.getMonth() + 1, f = o.getDate();
                        break;
                    case "'":
                        _("'") ? y() : m = !0;
                        break;
                    default:
                        y();
                }
            if (a < n.length && (s = n.substr(a), !/^\s+/.test(s))) throw "Extra/unparsed characters found in date: " + s;
            if (-1 === d ? d = new Date().getFullYear() : d < 100 && (d += new Date().getFullYear() - new Date().getFullYear() % 100 + (d <= r ? 0 : -100)), -1 < g)
                for (p = 1, f = g;;) {
                    if (f <= (i = this._getDaysInMonth(d, p - 1))) break;
                    p++, f -= i;
                }
            if ((o = this._daylightSavingAdjust(new Date(d, p - 1, f))).getFullYear() !== d || o.getMonth() + 1 !== p || o.getDate() !== f) throw "Invalid date";
            return o;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(e, t, i) {
            if (!t) return "";

            function n(t) {
                return (t = a + 1 < e.length && e.charAt(a + 1) === t) && a++, t;
            }

            function s(t, e, i) {
                var s = "" + e;
                if (n(t))
                    for (; s.length < i;) s = "0" + s;
                return s;
            }

            function o(t, e, i, s) {
                return (n(t) ? s : i)[e];
            }
            var a, r = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                l = (i ? i.dayNames : null) || this._defaults.dayNames,
                h = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                c = (i ? i.monthNames : null) || this._defaults.monthNames,
                u = "",
                d = !1;
            if (t)
                for (a = 0; a < e.length; a++)
                    if (d) "'" !== e.charAt(a) || n("'") ? u += e.charAt(a) : d = !1;
                    else switch (e.charAt(a)) {
                        case "d":
                            u += s("d", t.getDate(), 2);
                            break;
                        case "D":
                            u += o("D", t.getDay(), r, l);
                            break;
                        case "o":
                            u += s("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            u += s("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            u += o("M", t.getMonth(), h, c);
                            break;
                        case "y":
                            u += n("y") ? t.getFullYear() : (t.getFullYear() % 100 < 10 ? "0" : "") + t.getFullYear() % 100;
                            break;
                        case "@":
                            u += t.getTime();
                            break;
                        case "!":
                            u += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            n("'") ? u += "'" : d = !0;
                            break;
                        default:
                            u += e.charAt(a);
                    }
            return u;
        },
        _possibleChars: function(e) {
            for (var t = "", i = !1, s = function(t) {
                    t = n + 1 < e.length && e.charAt(n + 1) === t;
                    return t && n++, t;
                }, n = 0; n < e.length; n++)
                if (i) "'" !== e.charAt(n) || s("'") ? t += e.charAt(n) : i = !1;
                else switch (e.charAt(n)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        t += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        s("'") ? t += "'" : i = !0;
                        break;
                    default:
                        t += e.charAt(n);
                }
            return t;
        },
        _get: function(t, e) {
            return (void 0 !== t.settings[e] ? t.settings : this._defaults)[e];
        },
        _setDateFromField: function(t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"),
                    s = t.lastVal = t.input ? t.input.val() : null,
                    n = this._getDefaultDate(t),
                    o = n,
                    a = this._getFormatConfig(t);
                try {
                    o = this.parseDate(i, s, a) || n;
                } catch (t) {
                    s = e ? "" : s;
                }
                t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t);
            }
        },
        _getDefaultDate: function(t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date()));
        },
        _determineDate: function(r, t, e) {
            var i, s, t = null == t || "" === t ? e : "string" == typeof t ? function(t) {
                try {
                    return V.datepicker.parseDate(V.datepicker._get(r, "dateFormat"), t, V.datepicker._getFormatConfig(r));
                } catch (t) {}
                for (var e = (t.toLowerCase().match(/^c/) ? V.datepicker._getDate(r) : null) || new Date(), i = e.getFullYear(), s = e.getMonth(), n = e.getDate(), o = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, a = o.exec(t); a;) {
                    switch (a[2] || "d") {
                        case "d":
                        case "D":
                            n += parseInt(a[1], 10);
                            break;
                        case "w":
                        case "W":
                            n += 7 * parseInt(a[1], 10);
                            break;
                        case "m":
                        case "M":
                            s += parseInt(a[1], 10), n = Math.min(n, V.datepicker._getDaysInMonth(i, s));
                            break;
                        case "y":
                        case "Y":
                            i += parseInt(a[1], 10), n = Math.min(n, V.datepicker._getDaysInMonth(i, s));
                    }
                    a = o.exec(t);
                }
                return new Date(i, s, n);
            }(t) : "number" == typeof t ? isNaN(t) ? e : (i = t, (s = new Date()).setDate(s.getDate() + i), s) : new Date(t.getTime());
            return (t = t && "Invalid Date" === t.toString() ? e : t) && (t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0)), this._daylightSavingAdjust(t);
        },
        _daylightSavingAdjust: function(t) {
            return t ? (t.setHours(12 < t.getHours() ? t.getHours() + 2 : 0), t) : null;
        },
        _setDate: function(t, e, i) {
            var s = !e,
                n = t.selectedMonth,
                o = t.selectedYear,
                e = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
            t.selectedDay = t.currentDay = e.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = e.getMonth(), t.drawYear = t.selectedYear = t.currentYear = e.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t));
        },
        _getDate: function(t) {
            return !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
        },
        _attachHandlers: function(t) {
            var e = this._get(t, "stepMonths"),
                i = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = {
                    prev: function() {
                        V.datepicker._adjustDate(i, -e, "M");
                    },
                    next: function() {
                        V.datepicker._adjustDate(i, +e, "M");
                    },
                    hide: function() {
                        V.datepicker._hideDatepicker();
                    },
                    today: function() {
                        V.datepicker._gotoToday(i);
                    },
                    selectDay: function() {
                        return V.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
                    },
                    selectMonth: function() {
                        return V.datepicker._selectMonthYear(i, this, "M"), !1;
                    },
                    selectYear: function() {
                        return V.datepicker._selectMonthYear(i, this, "Y"), !1;
                    }
                };
                V(this).on(this.getAttribute("data-event"), t[this.getAttribute("data-handler")]);
            });
        },
        _generateHTML: function(t) {
            var e, i, s, n, o, a, r, l, h, c, u, d, p, f, g, m, _, v, b, y, w, x, k, C, D, I, T, P, M, S, H, z, A = new Date(),
                O = this._daylightSavingAdjust(new Date(A.getFullYear(), A.getMonth(), A.getDate())),
                N = this._get(t, "isRTL"),
                E = this._get(t, "showButtonPanel"),
                W = this._get(t, "hideIfNoPrevNext"),
                F = this._get(t, "navigationAsDateFormat"),
                L = this._getNumberOfMonths(t),
                R = this._get(t, "showCurrentAtPos"),
                A = this._get(t, "stepMonths"),
                Y = 1 !== L[0] || 1 !== L[1],
                B = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                j = this._getMinMaxDate(t, "min"),
                q = this._getMinMaxDate(t, "max"),
                K = t.drawMonth - R,
                U = t.drawYear;
            if (K < 0 && (K += 12, U--), q)
                for (e = this._daylightSavingAdjust(new Date(q.getFullYear(), q.getMonth() - L[0] * L[1] + 1, q.getDate())), e = j && e < j ? j : e; this._daylightSavingAdjust(new Date(U, K, 1)) > e;) --K < 0 && (K = 11, U--);
            for (t.drawMonth = K, t.drawYear = U, R = this._get(t, "prevText"), R = F ? this.formatDate(R, this._daylightSavingAdjust(new Date(U, K - A, 1)), this._getFormatConfig(t)) : R, i = this._canAdjustMonth(t, -1, U, K) ? V("<a>").attr({
                    class: "ui-datepicker-prev ui-corner-all",
                    "data-handler": "prev",
                    "data-event": "click",
                    title: R
                }).append(V("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (N ? "e" : "w")).text(R))[0].outerHTML : W ? "" : V("<a>").attr({
                    class: "ui-datepicker-prev ui-corner-all ui-state-disabled",
                    title: R
                }).append(V("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (N ? "e" : "w")).text(R))[0].outerHTML, R = this._get(t, "nextText"), R = F ? this.formatDate(R, this._daylightSavingAdjust(new Date(U, K + A, 1)), this._getFormatConfig(t)) : R, s = this._canAdjustMonth(t, 1, U, K) ? V("<a>").attr({
                    class: "ui-datepicker-next ui-corner-all",
                    "data-handler": "next",
                    "data-event": "click",
                    title: R
                }).append(V("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (N ? "w" : "e")).text(R))[0].outerHTML : W ? "" : V("<a>").attr({
                    class: "ui-datepicker-next ui-corner-all ui-state-disabled",
                    title: R
                }).append(V("<span>").attr("class", "ui-icon ui-icon-circle-triangle-" + (N ? "w" : "e")).text(R))[0].outerHTML, A = this._get(t, "currentText"), W = this._get(t, "gotoCurrent") && t.currentDay ? B : O, A = F ? this.formatDate(A, W, this._getFormatConfig(t)) : A, R = "", t.inline || (R = V("<button>").attr({
                    type: "button",
                    class: "ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all",
                    "data-handler": "hide",
                    "data-event": "click"
                }).text(this._get(t, "closeText"))[0].outerHTML), F = "", E && (F = V("<div class='ui-datepicker-buttonpane ui-widget-content'>").append(N ? R : "").append(this._isInRange(t, W) ? V("<button>").attr({
                    type: "button",
                    class: "ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all",
                    "data-handler": "today",
                    "data-event": "click"
                }).text(A) : "").append(N ? "" : R)[0].outerHTML), n = parseInt(this._get(t, "firstDay"), 10), n = isNaN(n) ? 0 : n, o = this._get(t, "showWeek"), a = this._get(t, "dayNames"), r = this._get(t, "dayNamesMin"), l = this._get(t, "monthNames"), h = this._get(t, "monthNamesShort"), c = this._get(t, "beforeShowDay"), u = this._get(t, "showOtherMonths"), d = this._get(t, "selectOtherMonths"), p = this._getDefaultDate(t), f = "", m = 0; m < L[0]; m++) {
                for (_ = "", this.maxRows = 4, v = 0; v < L[1]; v++) {
                    if (b = this._daylightSavingAdjust(new Date(U, K, t.selectedDay)), y = " ui-corner-all", w = "", Y) {
                        if (w += "<div class='ui-datepicker-group", 1 < L[1]) switch (v) {
                            case 0:
                                w += " ui-datepicker-group-first", y = " ui-corner-" + (N ? "right" : "left");
                                break;
                            case L[1] - 1:
                                w += " ui-datepicker-group-last", y = " ui-corner-" + (N ? "left" : "right");
                                break;
                            default:
                                w += " ui-datepicker-group-middle", y = "";
                        }
                        w += "'>";
                    }
                    for (w += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + y + "'>" + (/all|left/.test(y) && 0 === m ? N ? s : i : "") + (/all|right/.test(y) && 0 === m ? N ? i : s : "") + this._generateMonthYearHeader(t, K, U, j, q, 0 < m || 0 < v, l, h) + "</div><table class='ui-datepicker-calendar'><thead><tr>", x = o ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", g = 0; g < 7; g++) x += "<th scope='col'" + (5 <= (g + n + 6) % 7 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + a[k = (g + n) % 7] + "'>" + r[k] + "</span></th>";
                    for (w += x + "</tr></thead><tbody>", D = this._getDaysInMonth(U, K), U === t.selectedYear && K === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, D)), C = (this._getFirstDayOfMonth(U, K) - n + 7) % 7, D = Math.ceil((C + D) / 7), I = Y && this.maxRows > D ? this.maxRows : D, this.maxRows = I, T = this._daylightSavingAdjust(new Date(U, K, 1 - C)), P = 0; P < I; P++) {
                        for (w += "<tr>", M = o ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(T) + "</td>" : "", g = 0; g < 7; g++) S = c ? c.apply(t.input ? t.input[0] : null, [T]) : [!0, ""], z = (H = T.getMonth() !== K) && !d || !S[0] || j && T < j || q && q < T, M += "<td class='" + (5 <= (g + n + 6) % 7 ? " ui-datepicker-week-end" : "") + (H ? " ui-datepicker-other-month" : "") + (T.getTime() === b.getTime() && K === t.selectedMonth && t._keyEvent || p.getTime() === T.getTime() && p.getTime() === b.getTime() ? " " + this._dayOverClass : "") + (z ? " " + this._unselectableClass + " ui-state-disabled" : "") + (H && !u ? "" : " " + S[1] + (T.getTime() === B.getTime() ? " " + this._currentClass : "") + (T.getTime() === O.getTime() ? " ui-datepicker-today" : "")) + "'" + (H && !u || !S[2] ? "" : " title='" + S[2].replace(/'/g, "&#39;") + "'") + (z ? "" : " data-handler='selectDay' data-event='click' data-month='" + T.getMonth() + "' data-year='" + T.getFullYear() + "'") + ">" + (H && !u ? "&#xa0;" : z ? "<span class='ui-state-default'>" + T.getDate() + "</span>" : "<a class='ui-state-default" + (T.getTime() === O.getTime() ? " ui-state-highlight" : "") + (T.getTime() === B.getTime() ? " ui-state-active" : "") + (H ? " ui-priority-secondary" : "") + "' href='#' aria-current='" + (T.getTime() === B.getTime() ? "true" : "false") + "' data-date='" + T.getDate() + "'>" + T.getDate() + "</a>") + "</td>", T.setDate(T.getDate() + 1), T = this._daylightSavingAdjust(T);
                        w += M + "</tr>";
                    }
                    11 < ++K && (K = 0, U++), _ += w += "</tbody></table>" + (Y ? "</div>" + (0 < L[0] && v === L[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                }
                f += _;
            }
            return f += F, t._keyEvent = !1, f;
        },
        _generateMonthYearHeader: function(t, e, i, s, n, o, a, r) {
            var l, h, c, u, d, p, f = this._get(t, "changeMonth"),
                g = this._get(t, "changeYear"),
                m = this._get(t, "showMonthAfterYear"),
                _ = this._get(t, "selectMonthLabel"),
                v = this._get(t, "selectYearLabel"),
                b = "<div class='ui-datepicker-title'>",
                y = "";
            if (o || !f) y += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
            else {
                for (l = s && s.getFullYear() === i, h = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' aria-label='" + _ + "' data-handler='selectMonth' data-event='change'>", c = 0; c < 12; c++)(!l || c >= s.getMonth()) && (!h || c <= n.getMonth()) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                y += "</select>";
            }
            if (m || (b += y + (!o && f && g ? "" : "&#xa0;")), !t.yearshtml)
                if (t.yearshtml = "", o || !g) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (a = this._get(t, "yearRange").split(":"), u = new Date().getFullYear(), d = (_ = function(t) {
                            t = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? u + parseInt(t, 10) : parseInt(t, 10);
                            return isNaN(t) ? u : t;
                        })(a[0]), p = Math.max(d, _(a[1] || "")), d = s ? Math.max(d, s.getFullYear()) : d, p = n ? Math.min(p, n.getFullYear()) : p, t.yearshtml += "<select class='ui-datepicker-year' aria-label='" + v + "' data-handler='selectYear' data-event='change'>"; d <= p; d++) t.yearshtml += "<option value='" + d + "'" + (d === i ? " selected='selected'" : "") + ">" + d + "</option>";
                    t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null;
                } return b += this._get(t, "yearSuffix"), m && (b += (!o && f && g ? "" : "&#xa0;") + y), b += "</div>";
        },
        _adjustInstDate: function(t, e, i) {
            var s = t.selectedYear + ("Y" === i ? e : 0),
                n = t.selectedMonth + ("M" === i ? e : 0),
                e = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
                e = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, e)));
            t.selectedDay = e.getDate(), t.drawMonth = t.selectedMonth = e.getMonth(), t.drawYear = t.selectedYear = e.getFullYear(), "M" !== i && "Y" !== i || this._notifyChange(t);
        },
        _restrictMinMax: function(t, e) {
            var i = this._getMinMaxDate(t, "min"),
                t = this._getMinMaxDate(t, "max"),
                e = i && e < i ? i : e;
            return t && t < e ? t : e;
        },
        _notifyChange: function(t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]);
        },
        _getNumberOfMonths: function(t) {
            t = this._get(t, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t;
        },
        _getMinMaxDate: function(t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null);
        },
        _getDaysInMonth: function(t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
        },
        _getFirstDayOfMonth: function(t, e) {
            return new Date(t, e, 1).getDay();
        },
        _canAdjustMonth: function(t, e, i, s) {
            var n = this._getNumberOfMonths(t),
                n = this._daylightSavingAdjust(new Date(i, s + (e < 0 ? e : n[0] * n[1]), 1));
            return e < 0 && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth())), this._isInRange(t, n);
        },
        _isInRange: function(t, e) {
            var i = this._getMinMaxDate(t, "min"),
                s = this._getMinMaxDate(t, "max"),
                n = null,
                o = null,
                a = this._get(t, "yearRange");
            return a && (t = a.split(":"), a = new Date().getFullYear(), n = parseInt(t[0], 10), o = parseInt(t[1], 10), t[0].match(/[+\-].*/) && (n += a), t[1].match(/[+\-].*/) && (o += a)), (!i || e.getTime() >= i.getTime()) && (!s || e.getTime() <= s.getTime()) && (!n || e.getFullYear() >= n) && (!o || e.getFullYear() <= o);
        },
        _getFormatConfig: function(t) {
            var e = this._get(t, "shortYearCutoff");
            return {
                shortYearCutoff: e = "string" != typeof e ? e : new Date().getFullYear() % 100 + parseInt(e, 10),
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            };
        },
        _formatDate: function(t, e, i, s) {
            e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
            e = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), e, this._getFormatConfig(t));
        }
    }), V.fn.datepicker = function(t) {
        if (!this.length) return this;
        V.datepicker.initialized || (V(document).on("mousedown", V.datepicker._checkExternalClick), V.datepicker.initialized = !0), 0 === V("#" + V.datepicker._mainDivId).length && V("body").append(V.datepicker.dpDiv);
        var e = Array.prototype.slice.call(arguments, 1);
        return "string" == typeof t && ("isDisabled" === t || "getDate" === t || "widget" === t) || "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? V.datepicker["_" + t + "Datepicker"].apply(V.datepicker, [this[0]].concat(e)) : this.each(function() {
            "string" == typeof t ? V.datepicker["_" + t + "Datepicker"].apply(V.datepicker, [this].concat(e)) : V.datepicker._attachDatepicker(this, t);
        });
    }, V.datepicker = new st(), V.datepicker.initialized = !1, V.datepicker.uuid = new Date().getTime(), V.datepicker.version = "1.13.0";
    V.datepicker, V.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var rt = !1;
    V(document).on("mouseup", function() {
        rt = !1;
    });
    V.widget("ui.mouse", {
        version: "1.13.0",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.on("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t);
            }).on("click." + this.widgetName, function(t) {
                if (!0 === V.data(t.target, e.widgetName + ".preventClickEvent")) return V.removeData(t.target, e.widgetName + ".preventClickEvent"), t.stopImmediatePropagation(), !1;
            }), this.started = !1;
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function(t) {
            if (!rt) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var e = this,
                    i = 1 === t.which,
                    s = !("string" != typeof this.options.cancel || !t.target.nodeName) && V(t.target).closest(this.options.cancel).length;
                return i && !s && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = !0;
                }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t), !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === V.data(t.target, this.widgetName + ".preventClickEvent") && V.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                    return e._mouseMove(t);
                }, this._mouseUpDelegate = function(t) {
                    return e._mouseUp(t);
                }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), rt = !0)) : !0;
            }
        },
        _mouseMove: function(t) {
            if (this._mouseMoved) {
                if (V.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button) return this._mouseUp(t);
                if (!t.which)
                    if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich) return this._mouseUp(t);
            }
            return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted);
        },
        _mouseUp: function(t) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && V.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, rt = !1, t.preventDefault();
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0;
        }
    }), V.ui.plugin = {
        add: function(t, e, i) {
            var s, n = V.ui[t].prototype;
            for (s in i) n.plugins[s] = n.plugins[s] || [], n.plugins[s].push([e, i[s]]);
        },
        call: function(t, e, i, s) {
            var n, o = t.plugins[e];
            if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                for (n = 0; n < o.length; n++) t.options[o[n][0]] && o[n][1].apply(t.element, i);
        }
    }, V.ui.safeBlur = function(t) {
        t && "body" !== t.nodeName.toLowerCase() && V(t).trigger("blur");
    };
    V.widget("ui.draggable", V.ui.mouse, {
        version: "1.13.0",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit();
        },
        _setOption: function(t, e) {
            this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName());
        },
        _destroy: function() {
            (this.helper || this.element).is(".ui-draggable-dragging") ? this.destroyOnClear = !0 : (this._removeHandleClassName(), this._mouseDestroy());
        },
        _mouseCapture: function(t) {
            var e = this.options;
            return !(this.helper || e.disabled || 0 < V(t.target).closest(".ui-resizable-handle").length) && (this.handle = this._getHandle(t), !!this.handle && (this._blurActiveElement(t), this._blockFrames(!0 === e.iframeFix ? "iframe" : e.iframeFix), !0));
        },
        _blockFrames: function(t) {
            this.iframeBlocks = this.document.find(t).map(function() {
                var t = V(this);
                return V("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0];
            });
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _blurActiveElement: function(t) {
            var e = V.ui.safeActiveElement(this.document[0]);
            V(t.target).closest(e).length || V.ui.safeBlur(e);
        },
        _mouseStart: function(t) {
            var e = this.options;
            return this.helper = this._createHelper(t), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), V.ui.ddmanager && (V.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = 0 < this.helper.parents().filter(function() {
                return "fixed" === V(this).css("position");
            }).length, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this._setContainment(), !1 === this._trigger("start", t) ? (this._clear(), !1) : (this._cacheHelperProportions(), V.ui.ddmanager && !e.dropBehaviour && V.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), V.ui.ddmanager && V.ui.ddmanager.dragStart(this, t), !0);
        },
        _refreshOffsets: function(t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }, this.offset.click = {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top
            };
        },
        _mouseDrag: function(t, e) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !e) {
                e = this._uiHash();
                if (!1 === this._trigger("drag", t, e)) return this._mouseUp(new V.Event("mouseup", t)), !1;
                this.position = e.position;
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", V.ui.ddmanager && V.ui.ddmanager.drag(this, t), !1;
        },
        _mouseStop: function(t) {
            var e = this,
                i = !1;
            return V.ui.ddmanager && !this.options.dropBehaviour && (i = V.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !i || "valid" === this.options.revert && i || !0 === this.options.revert || "function" == typeof this.options.revert && this.options.revert.call(this.element, i) ? V(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !== e._trigger("stop", t) && e._clear();
            }) : !1 !== this._trigger("stop", t) && this._clear(), !1;
        },
        _mouseUp: function(t) {
            return this._unblockFrames(), V.ui.ddmanager && V.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.trigger("focus"), V.ui.mouse.prototype._mouseUp.call(this, t);
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new V.Event("mouseup", {
                target: this.element[0]
            })) : this._clear(), this;
        },
        _getHandle: function(t) {
            return !this.options.handle || !!V(t.target).closest(this.element.find(this.options.handle)).length;
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle");
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle");
        },
        _createHelper: function(t) {
            var e = this.options,
                i = "function" == typeof e.helper,
                t = i ? V(e.helper.apply(this.element[0], [t])) : "clone" === e.helper ? this.element.clone().removeAttr("id") : this.element;
            return t.parents("body").length || t.appendTo("parent" === e.appendTo ? this.element[0].parentNode : e.appendTo), i && t[0] === this.element[0] && this._setPositionRelative(), t[0] === this.element[0] || /(fixed|absolute)/.test(t.css("position")) || t.css("position", "absolute"), t;
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")), Array.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
        },
        _isRootNode: function(t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0];
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset(),
                e = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== e && V.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return {
                top: 0,
                left: 0
            };
            var t = this.element.position(),
                e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var t, e, i, s = this.options,
                n = this.document[0];
            this.relativeContainer = null, s.containment ? "window" !== s.containment ? "document" !== s.containment ? s.containment.constructor !== Array ? ("parent" === s.containment && (s.containment = this.helper[0].parentNode), (i = (e = V(s.containment))[0]) && (t = /(scroll|auto)/.test(e.css("overflow")), this.containment = [(parseInt(e.css("borderLeftWidth"), 10) || 0) + (parseInt(e.css("paddingLeft"), 10) || 0), (parseInt(e.css("borderTopWidth"), 10) || 0) + (parseInt(e.css("paddingTop"), 10) || 0), (t ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(e.css("borderRightWidth"), 10) || 0) - (parseInt(e.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(e.css("borderBottomWidth"), 10) || 0) - (parseInt(e.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = e)) : this.containment = s.containment : this.containment = [0, 0, V(n).width() - this.helperProportions.width - this.margins.left, (V(n).height() || n.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = [V(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, V(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, V(window).scrollLeft() + V(window).width() - this.helperProportions.width - this.margins.left, V(window).scrollTop() + (V(window).height() || n.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = null;
        },
        _convertPositionTo: function(t, e) {
            e = e || this.position;
            var i = "absolute" === t ? 1 : -1,
                t = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : t ? 0 : this.offset.scroll.top) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : t ? 0 : this.offset.scroll.left) * i
            };
        },
        _generatePosition: function(t, e) {
            var i, s = this.options,
                n = this._isRootNode(this.scrollParent[0]),
                o = t.pageX,
                a = t.pageY;
            return n && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }), e && (this.containment && (i = this.relativeContainer ? (i = this.relativeContainer.offset(), [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]) : this.containment, t.pageX - this.offset.click.left < i[0] && (o = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (a = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (o = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (a = i[3] + this.offset.click.top)), s.grid && (t = s.grid[1] ? this.originalPageY + Math.round((a - this.originalPageY) / s.grid[1]) * s.grid[1] : this.originalPageY, a = !i || t - this.offset.click.top >= i[1] || t - this.offset.click.top > i[3] ? t : t - this.offset.click.top >= i[1] ? t - s.grid[1] : t + s.grid[1], t = s.grid[0] ? this.originalPageX + Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0] : this.originalPageX, o = !i || t - this.offset.click.left >= i[0] || t - this.offset.click.left > i[2] ? t : t - this.offset.click.left >= i[0] ? t - s.grid[0] : t + s.grid[0]), "y" === s.axis && (o = this.originalPageX), "x" === s.axis && (a = this.originalPageY)), {
                top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left)
            };
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
        },
        _trigger: function(t, e, i) {
            return i = i || this._uiHash(), V.ui.plugin.call(this, t, [e, i, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), i.offset = this.positionAbs), V.Widget.prototype._trigger.call(this, t, e, i);
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            };
        }
    }), V.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, t, i) {
            var s = V.extend({}, t, {
                item: i.element
            });
            i.sortables = [], V(i.options.connectToSortable).each(function() {
                var t = V(this).sortable("instance");
                t && !t.options.disabled && (i.sortables.push(t), t.refreshPositions(), t._trigger("activate", e, s));
            });
        },
        stop: function(e, t, i) {
            var s = V.extend({}, t, {
                item: i.element
            });
            i.cancelHelperRemoval = !1, V.each(i.sortables, function() {
                var t = this;
                t.isOver ? (t.isOver = 0, i.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, s));
            });
        },
        drag: function(i, s, n) {
            V.each(n.sortables, function() {
                var t = !1,
                    e = this;
                e.positionAbs = n.positionAbs, e.helperProportions = n.helperProportions, e.offset.click = n.offset.click, e._intersectsWith(e.containerCache) && (t = !0, V.each(n.sortables, function() {
                    return this.positionAbs = n.positionAbs, this.helperProportions = n.helperProportions, this.offset.click = n.offset.click, this !== e && this._intersectsWith(this.containerCache) && V.contains(e.element[0], this.element[0]) && (t = !1), t;
                })), t ? (e.isOver || (e.isOver = 1, n._parent = s.helper.parent(), e.currentItem = s.helper.appendTo(e.element).data("ui-sortable-item", !0), e.options._helper = e.options.helper, e.options.helper = function() {
                    return s.helper[0];
                }, i.target = e.currentItem[0], e._mouseCapture(i, !0), e._mouseStart(i, !0, !0), e.offset.click.top = n.offset.click.top, e.offset.click.left = n.offset.click.left, e.offset.parent.left -= n.offset.parent.left - e.offset.parent.left, e.offset.parent.top -= n.offset.parent.top - e.offset.parent.top, n._trigger("toSortable", i), n.dropped = e.element, V.each(n.sortables, function() {
                    this.refreshPositions();
                }), n.currentItem = n.element, e.fromOutside = n), e.currentItem && (e._mouseDrag(i), s.position = e.position)) : e.isOver && (e.isOver = 0, e.cancelHelperRemoval = !0, e.options._revert = e.options.revert, e.options.revert = !1, e._trigger("out", i, e._uiHash(e)), e._mouseStop(i, !0), e.options.revert = e.options._revert, e.options.helper = e.options._helper, e.placeholder && e.placeholder.remove(), s.helper.appendTo(n._parent), n._refreshOffsets(i), s.position = n._generatePosition(i, !0), n._trigger("fromSortable", i), n.dropped = !1, V.each(n.sortables, function() {
                    this.refreshPositions();
                }));
            });
        }
    }), V.ui.plugin.add("draggable", "cursor", {
        start: function(t, e, i) {
            var s = V("body"),
                i = i.options;
            s.css("cursor") && (i._cursor = s.css("cursor")), s.css("cursor", i.cursor);
        },
        stop: function(t, e, i) {
            i = i.options;
            i._cursor && V("body").css("cursor", i._cursor);
        }
    }), V.ui.plugin.add("draggable", "opacity", {
        start: function(t, e, i) {
            e = V(e.helper), i = i.options;
            e.css("opacity") && (i._opacity = e.css("opacity")), e.css("opacity", i.opacity);
        },
        stop: function(t, e, i) {
            i = i.options;
            i._opacity && V(e.helper).css("opacity", i._opacity);
        }
    }), V.ui.plugin.add("draggable", "scroll", {
        start: function(t, e, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
        },
        drag: function(t, e, i) {
            var s = i.options,
                n = !1,
                o = i.scrollParentNotHidden[0],
                a = i.document[0];
            o !== a && "HTML" !== o.tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + o.offsetHeight - t.pageY < s.scrollSensitivity ? o.scrollTop = n = o.scrollTop + s.scrollSpeed : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (o.scrollTop = n = o.scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + o.offsetWidth - t.pageX < s.scrollSensitivity ? o.scrollLeft = n = o.scrollLeft + s.scrollSpeed : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (o.scrollLeft = n = o.scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (t.pageY - V(a).scrollTop() < s.scrollSensitivity ? n = V(a).scrollTop(V(a).scrollTop() - s.scrollSpeed) : V(window).height() - (t.pageY - V(a).scrollTop()) < s.scrollSensitivity && (n = V(a).scrollTop(V(a).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (t.pageX - V(a).scrollLeft() < s.scrollSensitivity ? n = V(a).scrollLeft(V(a).scrollLeft() - s.scrollSpeed) : V(window).width() - (t.pageX - V(a).scrollLeft()) < s.scrollSensitivity && (n = V(a).scrollLeft(V(a).scrollLeft() + s.scrollSpeed)))), !1 !== n && V.ui.ddmanager && !s.dropBehaviour && V.ui.ddmanager.prepareOffsets(i, t);
        }
    }), V.ui.plugin.add("draggable", "snap", {
        start: function(t, e, i) {
            var s = i.options;
            i.snapElements = [], V(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each(function() {
                var t = V(this),
                    e = t.offset();
                this !== i.element[0] && i.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: e.top,
                    left: e.left
                });
            });
        },
        drag: function(t, e, i) {
            for (var s, n, o, a, r, l, h, c, u, d = i.options, p = d.snapTolerance, f = e.offset.left, g = f + i.helperProportions.width, m = e.offset.top, _ = m + i.helperProportions.height, v = i.snapElements.length - 1; 0 <= v; v--) l = (r = i.snapElements[v].left - i.margins.left) + i.snapElements[v].width, c = (h = i.snapElements[v].top - i.margins.top) + i.snapElements[v].height, g < r - p || l + p < f || _ < h - p || c + p < m || !V.contains(i.snapElements[v].item.ownerDocument, i.snapElements[v].item) ? (i.snapElements[v].snapping && i.options.snap.release && i.options.snap.release.call(i.element, t, V.extend(i._uiHash(), {
                snapItem: i.snapElements[v].item
            })), i.snapElements[v].snapping = !1) : ("inner" !== d.snapMode && (s = Math.abs(h - _) <= p, n = Math.abs(c - m) <= p, o = Math.abs(r - g) <= p, a = Math.abs(l - f) <= p, s && (e.position.top = i._convertPositionTo("relative", {
                top: h - i.helperProportions.height,
                left: 0
            }).top), n && (e.position.top = i._convertPositionTo("relative", {
                top: c,
                left: 0
            }).top), o && (e.position.left = i._convertPositionTo("relative", {
                top: 0,
                left: r - i.helperProportions.width
            }).left), a && (e.position.left = i._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left)), u = s || n || o || a, "outer" !== d.snapMode && (s = Math.abs(h - m) <= p, n = Math.abs(c - _) <= p, o = Math.abs(r - f) <= p, a = Math.abs(l - g) <= p, s && (e.position.top = i._convertPositionTo("relative", {
                top: h,
                left: 0
            }).top), n && (e.position.top = i._convertPositionTo("relative", {
                top: c - i.helperProportions.height,
                left: 0
            }).top), o && (e.position.left = i._convertPositionTo("relative", {
                top: 0,
                left: r
            }).left), a && (e.position.left = i._convertPositionTo("relative", {
                top: 0,
                left: l - i.helperProportions.width
            }).left)), !i.snapElements[v].snapping && (s || n || o || a || u) && i.options.snap.snap && i.options.snap.snap.call(i.element, t, V.extend(i._uiHash(), {
                snapItem: i.snapElements[v].item
            })), i.snapElements[v].snapping = s || n || o || a || u);
        }
    }), V.ui.plugin.add("draggable", "stack", {
        start: function(t, e, i) {
            var s, i = i.options,
                i = V.makeArray(V(i.stack)).sort(function(t, e) {
                    return (parseInt(V(t).css("zIndex"), 10) || 0) - (parseInt(V(e).css("zIndex"), 10) || 0);
                });
            i.length && (s = parseInt(V(i[0]).css("zIndex"), 10) || 0, V(i).each(function(t) {
                V(this).css("zIndex", s + t);
            }), this.css("zIndex", s + i.length));
        }
    }), V.ui.plugin.add("draggable", "zIndex", {
        start: function(t, e, i) {
            e = V(e.helper), i = i.options;
            e.css("zIndex") && (i._zIndex = e.css("zIndex")), e.css("zIndex", i.zIndex);
        },
        stop: function(t, e, i) {
            i = i.options;
            i._zIndex && V(e.helper).css("zIndex", i._zIndex);
        }
    });
    V.ui.draggable;
    V.widget("ui.resizable", V.ui.mouse, {
        version: "1.13.0",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(t) {
            return parseFloat(t) || 0;
        },
        _isNumber: function(t) {
            return !isNaN(parseFloat(t));
        },
        _hasScroll: function(t, e) {
            if ("hidden" === V(t).css("overflow")) return !1;
            var i = e && "left" === e ? "scrollLeft" : "scrollTop",
                s = !1;
            if (0 < t[i]) return !0;
            try {
                t[i] = 1, s = 0 < t[i], t[i] = 0;
            } catch (t) {}
            return s;
        },
        _create: function() {
            var t, e = this.options,
                i = this;
            this._addClass("ui-resizable"), V.extend(this, {
                _aspectRatio: !!e.aspectRatio,
                aspectRatio: e.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: e.helper || e.ghost || e.animate ? e.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(V("<div class='ui-wrapper'></div>").css({
                overflow: "hidden",
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, t = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            }, this.element.css(t), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css(t), this._proportionallyResize()), this._setupHandles(), e.autoHide && V(this.element).on("mouseenter", function() {
                e.disabled || (i._removeClass("ui-resizable-autohide"), i._handles.show());
            }).on("mouseleave", function() {
                e.disabled || i.resizing || (i._addClass("ui-resizable-autohide"), i._handles.hide());
            }), this._mouseInit();
        },
        _destroy: function() {
            this._mouseDestroy(), this._addedHandles.remove();

            function t(t) {
                V(t).removeData("resizable").removeData("ui-resizable").off(".resizable");
            }
            var e;
            return this.elementIsWrapper && (t(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), t(this.originalElement), this;
        },
        _setOption: function(t, e) {
            switch (this._super(t, e), t) {
                case "handles":
                    this._removeHandles(), this._setupHandles();
                    break;
                case "aspectRatio":
                    this._aspectRatio = !!e;
            }
        },
        _setupHandles: function() {
            var t, e, i, s, n, o = this.options,
                a = this;
            if (this.handles = o.handles || (V(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this._handles = V(), this._addedHandles = V(), this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), i = this.handles.split(","), this.handles = {}, e = 0; e < i.length; e++) s = "ui-resizable-" + (t = String.prototype.trim.call(i[e])), n = V("<div>"), this._addClass(n, "ui-resizable-handle " + s), n.css({
                    zIndex: o.zIndex
                }), this.handles[t] = ".ui-resizable-" + t, this.element.children(this.handles[t]).length || (this.element.append(n), this._addedHandles = this._addedHandles.add(n));
            this._renderAxis = function(t) {
                var e, i, s;
                for (e in t = t || this.element, this.handles) this.handles[e].constructor === String ? this.handles[e] = this.element.children(this.handles[e]).first().show() : (this.handles[e].jquery || this.handles[e].nodeType) && (this.handles[e] = V(this.handles[e]), this._on(this.handles[e], {
                    mousedown: a._mouseDown
                })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (i = V(this.handles[e], this.element), s = /sw|ne|nw|se|n|s/.test(e) ? i.outerHeight() : i.outerWidth(), i = ["padding", /ne|nw|n/.test(e) ? "Top" : /se|sw|s/.test(e) ? "Bottom" : /^e$/.test(e) ? "Right" : "Left"].join(""), t.css(i, s), this._proportionallyResize()), this._handles = this._handles.add(this.handles[e]);
            }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function() {
                a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = n && n[1] ? n[1] : "se");
            }), o.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"));
        },
        _removeHandles: function() {
            this._addedHandles.remove();
        },
        _mouseCapture: function(t) {
            var e, i, s = !1;
            for (e in this.handles)(i = V(this.handles[e])[0]) !== t.target && !V.contains(i, t.target) || (s = !0);
            return !this.options.disabled && s;
        },
        _mouseStart: function(t) {
            var e, i, s = this.options,
                n = this.element;
            return this.resizing = !0, this._renderProxy(), e = this._num(this.helper.css("left")), i = this._num(this.helper.css("top")), s.containment && (e += V(s.containment).scrollLeft() || 0, i += V(s.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: e,
                top: i
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: n.width(),
                height: n.height()
            }, this.originalSize = this._helper ? {
                width: n.outerWidth(),
                height: n.outerHeight()
            } : {
                width: n.width(),
                height: n.height()
            }, this.sizeDiff = {
                width: n.outerWidth() - n.width(),
                height: n.outerHeight() - n.height()
            }, this.originalPosition = {
                left: e,
                top: i
            }, this.originalMousePosition = {
                left: t.pageX,
                top: t.pageY
            }, this.aspectRatio = "number" == typeof s.aspectRatio ? s.aspectRatio : this.originalSize.width / this.originalSize.height || 1, s = V(".ui-resizable-" + this.axis).css("cursor"), V("body").css("cursor", "auto" === s ? this.axis + "-resize" : s), this._addClass("ui-resizable-resizing"), this._propagate("start", t), !0;
        },
        _mouseDrag: function(t) {
            var e = this.originalMousePosition,
                i = this.axis,
                s = t.pageX - e.left || 0,
                e = t.pageY - e.top || 0,
                i = this._change[i];
            return this._updatePrevProperties(), i && (e = i.apply(this, [t, s, e]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (e = this._updateRatio(e, t)), e = this._respectSize(e, t), this._updateCache(e), this._propagate("resize", t), e = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), V.isEmptyObject(e) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges())), !1;
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var e, i, s, n = this.options,
                o = this;
            return this._helper && (s = (e = (i = this._proportionallyResizeElements).length && /textarea/i.test(i[0].nodeName)) && this._hasScroll(i[0], "left") ? 0 : o.sizeDiff.height, i = e ? 0 : o.sizeDiff.width, e = {
                width: o.helper.width() - i,
                height: o.helper.height() - s
            }, i = parseFloat(o.element.css("left")) + (o.position.left - o.originalPosition.left) || null, s = parseFloat(o.element.css("top")) + (o.position.top - o.originalPosition.top) || null, n.animate || this.element.css(V.extend(e, {
                top: s,
                left: i
            })), o.helper.height(o.size.height), o.helper.width(o.size.width), this._helper && !n.animate && this._proportionallyResize()), V("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1;
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            }, this.prevSize = {
                width: this.size.width,
                height: this.size.height
            };
        },
        _applyChanges: function() {
            var t = {};
            return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t;
        },
        _updateVirtualBoundaries: function(t) {
            var e, i, s = this.options,
                n = {
                    minWidth: this._isNumber(s.minWidth) ? s.minWidth : 0,
                    maxWidth: this._isNumber(s.maxWidth) ? s.maxWidth : 1 / 0,
                    minHeight: this._isNumber(s.minHeight) ? s.minHeight : 0,
                    maxHeight: this._isNumber(s.maxHeight) ? s.maxHeight : 1 / 0
                };
            (this._aspectRatio || t) && (e = n.minHeight * this.aspectRatio, i = n.minWidth / this.aspectRatio, s = n.maxHeight * this.aspectRatio, t = n.maxWidth / this.aspectRatio, e > n.minWidth && (n.minWidth = e), i > n.minHeight && (n.minHeight = i), s < n.maxWidth && (n.maxWidth = s), t < n.maxHeight && (n.maxHeight = t)), this._vBoundaries = n;
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width);
        },
        _updateRatio: function(t) {
            var e = this.position,
                i = this.size,
                s = this.axis;
            return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t;
        },
        _respectSize: function(t) {
            var e = this._vBoundaries,
                i = this.axis,
                s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                r = this.originalPosition.left + this.originalSize.width,
                l = this.originalPosition.top + this.originalSize.height,
                h = /sw|nw|w/.test(i),
                i = /nw|ne|n/.test(i);
            return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), n && (t.height = e.maxHeight), o && h && (t.left = r - e.minWidth), s && h && (t.left = r - e.maxWidth), a && i && (t.top = l - e.minHeight), n && i && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t;
        },
        _getPaddingPlusBorderDimensions: function(t) {
            for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; e < 4; e++) i[e] = parseFloat(s[e]) || 0, i[e] += parseFloat(n[e]) || 0;
            return {
                height: i[0] + i[2],
                width: i[1] + i[3]
            };
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var t, e = 0, i = this.helper || this.element; e < this._proportionallyResizeElements.length; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                    height: i.height() - this.outerDimensions.height || 0,
                    width: i.width() - this.outerDimensions.width || 0
                });
        },
        _renderProxy: function() {
            var t = this.element,
                e = this.options;
            this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || V("<div></div>").css({
                overflow: "hidden"
            }), this._addClass(this.helper, this._helper), this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++e.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
        },
        _change: {
            e: function(t, e) {
                return {
                    width: this.originalSize.width + e
                };
            },
            w: function(t, e) {
                var i = this.originalSize;
                return {
                    left: this.originalPosition.left + e,
                    width: i.width - e
                };
            },
            n: function(t, e, i) {
                var s = this.originalSize;
                return {
                    top: this.originalPosition.top + i,
                    height: s.height - i
                };
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                };
            },
            se: function(t, e, i) {
                return V.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, e, i]));
            },
            sw: function(t, e, i) {
                return V.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, e, i]));
            },
            ne: function(t, e, i) {
                return V.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, e, i]));
            },
            nw: function(t, e, i) {
                return V.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, e, i]));
            }
        },
        _propagate: function(t, e) {
            V.ui.plugin.call(this, t, [e, this.ui()]), "resize" !== t && this._trigger(t, e, this.ui());
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            };
        }
    }), V.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var i = V(this).resizable("instance"),
                t = i.options,
                s = i._proportionallyResizeElements,
                n = s.length && /textarea/i.test(s[0].nodeName),
                o = n && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                a = n ? 0 : i.sizeDiff.width,
                n = {
                    width: i.size.width - a,
                    height: i.size.height - o
                },
                a = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                o = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(V.extend(n, o && a ? {
                top: o,
                left: a
            } : {}), {
                duration: t.animateDuration,
                easing: t.animateEasing,
                step: function() {
                    var t = {
                        width: parseFloat(i.element.css("width")),
                        height: parseFloat(i.element.css("height")),
                        top: parseFloat(i.element.css("top")),
                        left: parseFloat(i.element.css("left"))
                    };
                    s && s.length && V(s[0]).css({
                        width: t.width,
                        height: t.height
                    }), i._updateCache(t), i._propagate("resize", e);
                }
            });
        }
    }), V.ui.plugin.add("resizable", "containment", {
        start: function() {
            var i, s, n = V(this).resizable("instance"),
                t = n.options,
                e = n.element,
                o = t.containment,
                a = o instanceof V ? o.get(0) : /parent/.test(o) ? e.parent().get(0) : o;
            a && (n.containerElement = V(a), /document/.test(o) || o === document ? (n.containerOffset = {
                left: 0,
                top: 0
            }, n.containerPosition = {
                left: 0,
                top: 0
            }, n.parentData = {
                element: V(document),
                left: 0,
                top: 0,
                width: V(document).width(),
                height: V(document).height() || document.body.parentNode.scrollHeight
            }) : (i = V(a), s = [], V(["Top", "Right", "Left", "Bottom"]).each(function(t, e) {
                s[t] = n._num(i.css("padding" + e));
            }), n.containerOffset = i.offset(), n.containerPosition = i.position(), n.containerSize = {
                height: i.innerHeight() - s[3],
                width: i.innerWidth() - s[1]
            }, t = n.containerOffset, e = n.containerSize.height, o = n.containerSize.width, o = n._hasScroll(a, "left") ? a.scrollWidth : o, e = n._hasScroll(a) ? a.scrollHeight : e, n.parentData = {
                element: a,
                left: t.left,
                top: t.top,
                width: o,
                height: e
            }));
        },
        resize: function(t) {
            var e = V(this).resizable("instance"),
                i = e.options,
                s = e.containerOffset,
                n = e.position,
                o = e._aspectRatio || t.shiftKey,
                a = {
                    top: 0,
                    left: 0
                },
                r = e.containerElement,
                t = !0;
            r[0] !== document && /static/.test(r.css("position")) && (a = s), n.left < (e._helper ? s.left : 0) && (e.size.width = e.size.width + (e._helper ? e.position.left - s.left : e.position.left - a.left), o && (e.size.height = e.size.width / e.aspectRatio, t = !1), e.position.left = i.helper ? s.left : 0), n.top < (e._helper ? s.top : 0) && (e.size.height = e.size.height + (e._helper ? e.position.top - s.top : e.position.top), o && (e.size.width = e.size.height * e.aspectRatio, t = !1), e.position.top = e._helper ? s.top : 0), i = e.containerElement.get(0) === e.element.parent().get(0), n = /relative|absolute/.test(e.containerElement.css("position")), i && n ? (e.offset.left = e.parentData.left + e.position.left, e.offset.top = e.parentData.top + e.position.top) : (e.offset.left = e.element.offset().left, e.offset.top = e.element.offset().top), n = Math.abs(e.sizeDiff.width + (e._helper ? e.offset.left - a.left : e.offset.left - s.left)), s = Math.abs(e.sizeDiff.height + (e._helper ? e.offset.top - a.top : e.offset.top - s.top)), n + e.size.width >= e.parentData.width && (e.size.width = e.parentData.width - n, o && (e.size.height = e.size.width / e.aspectRatio, t = !1)), s + e.size.height >= e.parentData.height && (e.size.height = e.parentData.height - s, o && (e.size.width = e.size.height * e.aspectRatio, t = !1)), t || (e.position.left = e.prevPosition.left, e.position.top = e.prevPosition.top, e.size.width = e.prevSize.width, e.size.height = e.prevSize.height);
        },
        stop: function() {
            var t = V(this).resizable("instance"),
                e = t.options,
                i = t.containerOffset,
                s = t.containerPosition,
                n = t.containerElement,
                o = V(t.helper),
                a = o.offset(),
                r = o.outerWidth() - t.sizeDiff.width,
                o = o.outerHeight() - t.sizeDiff.height;
            t._helper && !e.animate && /relative/.test(n.css("position")) && V(this).css({
                left: a.left - s.left - i.left,
                width: r,
                height: o
            }), t._helper && !e.animate && /static/.test(n.css("position")) && V(this).css({
                left: a.left - s.left - i.left,
                width: r,
                height: o
            });
        }
    }), V.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = V(this).resizable("instance").options;
            V(t.alsoResize).each(function() {
                var t = V(this);
                t.data("ui-resizable-alsoresize", {
                    width: parseFloat(t.width()),
                    height: parseFloat(t.height()),
                    left: parseFloat(t.css("left")),
                    top: parseFloat(t.css("top"))
                });
            });
        },
        resize: function(t, i) {
            var e = V(this).resizable("instance"),
                s = e.options,
                n = e.originalSize,
                o = e.originalPosition,
                a = {
                    height: e.size.height - n.height || 0,
                    width: e.size.width - n.width || 0,
                    top: e.position.top - o.top || 0,
                    left: e.position.left - o.left || 0
                };
            V(s.alsoResize).each(function() {
                var t = V(this),
                    s = V(this).data("ui-resizable-alsoresize"),
                    n = {},
                    e = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                V.each(e, function(t, e) {
                    var i = (s[e] || 0) + (a[e] || 0);
                    i && 0 <= i && (n[e] = i || null);
                }), t.css(n);
            });
        },
        stop: function() {
            V(this).removeData("ui-resizable-alsoresize");
        }
    }), V.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = V(this).resizable("instance"),
                e = t.size;
            t.ghost = t.originalElement.clone(), t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: e.height,
                width: e.width,
                margin: 0,
                left: 0,
                top: 0
            }), t._addClass(t.ghost, "ui-resizable-ghost"), !1 !== V.uiBackCompat && "string" == typeof t.options.ghost && t.ghost.addClass(this.options.ghost), t.ghost.appendTo(t.helper);
        },
        resize: function() {
            var t = V(this).resizable("instance");
            t.ghost && t.ghost.css({
                position: "relative",
                height: t.size.height,
                width: t.size.width
            });
        },
        stop: function() {
            var t = V(this).resizable("instance");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));
        }
    }), V.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var t, e = V(this).resizable("instance"),
                i = e.options,
                s = e.size,
                n = e.originalSize,
                o = e.originalPosition,
                a = e.axis,
                r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                l = r[0] || 1,
                h = r[1] || 1,
                c = Math.round((s.width - n.width) / l) * l,
                u = Math.round((s.height - n.height) / h) * h,
                d = n.width + c,
                p = n.height + u,
                f = i.maxWidth && i.maxWidth < d,
                g = i.maxHeight && i.maxHeight < p,
                m = i.minWidth && i.minWidth > d,
                s = i.minHeight && i.minHeight > p;
            i.grid = r, m && (d += l), s && (p += h), f && (d -= l), g && (p -= h), /^(se|s|e)$/.test(a) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(a) ? (e.size.width = d, e.size.height = p, e.position.top = o.top - u) : /^(sw)$/.test(a) ? (e.size.width = d, e.size.height = p, e.position.left = o.left - c) : ((p - h <= 0 || d - l <= 0) && (t = e._getPaddingPlusBorderDimensions(this)), 0 < p - h ? (e.size.height = p, e.position.top = o.top - u) : (p = h - t.height, e.size.height = p, e.position.top = o.top + n.height - p), 0 < d - l ? (e.size.width = d, e.position.left = o.left - c) : (d = l - t.width, e.size.width = d, e.position.left = o.left + n.width - d));
        }
    });
    V.ui.resizable;
    V.widget("ui.dialog", {
        version: "1.13.0",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            classes: {
                "ui-dialog": "ui-corner-all",
                "ui-dialog-titlebar": "ui-corner-all"
            },
            closeOnEscape: !0,
            closeText: "Close",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(t) {
                    var e = V(this).css(t).offset().top;
                    e < 0 && V(this).css("top", t.top - e);
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && V.fn.draggable && this._makeDraggable(), this.options.resizable && V.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus();
        },
        _init: function() {
            this.options.autoOpen && this.open();
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ? V(t) : this.document.find(t || "body").eq(0);
        },
        _destroy: function() {
            var t, e = this.originalPosition;
            this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), (t = e.parent.children().eq(e.index)).length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element);
        },
        widget: function() {
            return this.uiDialog;
        },
        disable: V.noop,
        enable: V.noop,
        close: function(t) {
            var e = this;
            this._isOpen && !1 !== this._trigger("beforeClose", t) && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || V.ui.safeBlur(V.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function() {
                e._trigger("close", t);
            }));
        },
        isOpen: function() {
            return this._isOpen;
        },
        moveToTop: function() {
            this._moveToTop();
        },
        _moveToTop: function(t, e) {
            var i = !1,
                s = this.uiDialog.siblings(".ui-front:visible").map(function() {
                    return +V(this).css("z-index");
                }).get(),
                s = Math.max.apply(null, s);
            return s >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", s + 1), i = !0), i && !e && this._trigger("focus", t), i;
        },
        open: function() {
            var t = this;
            this._isOpen ? this._moveToTop() && this._focusTabbable() : (this._isOpen = !0, this.opener = V(V.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
                t._focusTabbable(), t._trigger("focus");
            }), this._makeFocusTarget(), this._trigger("open"));
        },
        _focusTabbable: function() {
            var t = this._focusedElement;
            (t = t || this.element.find("[autofocus]")).length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).trigger("focus");
        },
        _restoreTabbableFocus: function() {
            var t = V.ui.safeActiveElement(this.document[0]);
            this.uiDialog[0] === t || V.contains(this.uiDialog[0], t) || this._focusTabbable();
        },
        _keepFocus: function(t) {
            t.preventDefault(), this._restoreTabbableFocus(), this._delay(this._restoreTabbableFocus);
        },
        _createWrapper: function() {
            this.uiDialog = V("<div>").hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === V.ui.keyCode.ESCAPE) return t.preventDefault(), void this.close(t);
                    var e, i, s;
                    t.keyCode !== V.ui.keyCode.TAB || t.isDefaultPrevented() || (e = this.uiDialog.find(":tabbable"), i = e.first(), s = e.last(), t.target !== s[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== i[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function() {
                        s.trigger("focus");
                    }), t.preventDefault()) : (this._delay(function() {
                        i.trigger("focus");
                    }), t.preventDefault()));
                },
                mousedown: function(t) {
                    this._moveToTop(t) && this._focusTabbable();
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            });
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = V("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    V(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus");
                }
            }), this.uiDialogTitlebarClose = V("<button type='button'></button>").button({
                label: V("<a>").text(this.options.closeText).html(),
                icon: "ui-icon-closethick",
                showLabel: !1
            }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, {
                click: function(t) {
                    t.preventDefault(), this.close(t);
                }
            }), t = V("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(t, "ui-dialog-title"), this._title(t), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            });
        },
        _title: function(t) {
            this.options.title ? t.text(this.options.title) : t.html("&#160;");
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = V("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = V("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons();
        },
        _createButtons: function() {
            var s = this,
                t = this.options.buttons;
            this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), V.isEmptyObject(t) || Array.isArray(t) && !t.length ? this._removeClass(this.uiDialog, "ui-dialog-buttons") : (V.each(t, function(t, e) {
                var i;
                e = "function" == typeof e ? {
                    click: e,
                    text: t
                } : e, e = V.extend({
                    type: "button"
                }, e), i = e.click, t = {
                    icon: e.icon,
                    iconPosition: e.iconPosition,
                    showLabel: e.showLabel,
                    icons: e.icons,
                    text: e.text
                }, delete e.click, delete e.icon, delete e.iconPosition, delete e.showLabel, delete e.icons, "boolean" == typeof e.text && delete e.text, V("<button></button>", e).button(t).appendTo(s.uiButtonSet).on("click", function() {
                    i.apply(s.element[0], arguments);
                });
            }), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog));
        },
        _makeDraggable: function() {
            var n = this,
                o = this.options;

            function a(t) {
                return {
                    position: t.position,
                    offset: t.offset
                };
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(t, e) {
                    n._addClass(V(this), "ui-dialog-dragging"), n._blockFrames(), n._trigger("dragStart", t, a(e));
                },
                drag: function(t, e) {
                    n._trigger("drag", t, a(e));
                },
                stop: function(t, e) {
                    var i = e.offset.left - n.document.scrollLeft(),
                        s = e.offset.top - n.document.scrollTop();
                    o.position = {
                        my: "left top",
                        at: "left" + (0 <= i ? "+" : "") + i + " top" + (0 <= s ? "+" : "") + s,
                        of: n.window
                    }, n._removeClass(V(this), "ui-dialog-dragging"), n._unblockFrames(), n._trigger("dragStop", t, a(e));
                }
            });
        },
        _makeResizable: function() {
            var n = this,
                o = this.options,
                t = o.resizable,
                e = this.uiDialog.css("position"),
                t = "string" == typeof t ? t : "n,e,s,w,se,sw,ne,nw";

            function a(t) {
                return {
                    originalPosition: t.originalPosition,
                    originalSize: t.originalSize,
                    position: t.position,
                    size: t.size
                };
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: o.maxWidth,
                maxHeight: o.maxHeight,
                minWidth: o.minWidth,
                minHeight: this._minHeight(),
                handles: t,
                start: function(t, e) {
                    n._addClass(V(this), "ui-dialog-resizing"), n._blockFrames(), n._trigger("resizeStart", t, a(e));
                },
                resize: function(t, e) {
                    n._trigger("resize", t, a(e));
                },
                stop: function(t, e) {
                    var i = n.uiDialog.offset(),
                        s = i.left - n.document.scrollLeft(),
                        i = i.top - n.document.scrollTop();
                    o.height = n.uiDialog.height(), o.width = n.uiDialog.width(), o.position = {
                        my: "left top",
                        at: "left" + (0 <= s ? "+" : "") + s + " top" + (0 <= i ? "+" : "") + i,
                        of: n.window
                    }, n._removeClass(V(this), "ui-dialog-resizing"), n._unblockFrames(), n._trigger("resizeStop", t, a(e));
                }
            }).css("position", e);
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(t) {
                    this._makeFocusTarget(), this._focusedElement = V(t.target);
                }
            });
        },
        _makeFocusTarget: function() {
            this._untrackInstance(), this._trackingInstances().unshift(this);
        },
        _untrackInstance: function() {
            var t = this._trackingInstances(),
                e = V.inArray(this, t); - 1 !== e && t.splice(e, 1);
        },
        _trackingInstances: function() {
            var t = this.document.data("ui-dialog-instances");
            return t || (t = [], this.document.data("ui-dialog-instances", t)), t;
        },
        _minHeight: function() {
            var t = this.options;
            return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height);
        },
        _position: function() {
            var t = this.uiDialog.is(":visible");
            t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide();
        },
        _setOptions: function(t) {
            var i = this,
                s = !1,
                n = {};
            V.each(t, function(t, e) {
                i._setOption(t, e), t in i.sizeRelatedOptions && (s = !0), t in i.resizableRelatedOptions && (n[t] = e);
            }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n);
        },
        _setOption: function(t, e) {
            var i, s = this.uiDialog;
            "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                label: V("<a>").text("" + this.options.closeText).html()
            }), "draggable" === t && ((i = s.is(":data(ui-draggable)")) && !e && s.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && ((i = s.is(":data(ui-resizable)")) && !e && s.resizable("destroy"), i && "string" == typeof e && s.resizable("option", "handles", e), i || !1 === e || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
        },
        _size: function() {
            var t, e, i, s = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({
                height: "auto",
                width: s.width
            }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({
                minHeight: e,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = V(this);
                return V("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0];
            });
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _allowInteraction: function(t) {
            return !!V(t.target).closest(".ui-dialog").length || !!V(t.target).closest(".ui-datepicker").length;
        },
        _createOverlay: function() {
            var i, s;
            this.options.modal && (i = V.fn.jquery.substring(0, 4), s = !0, this._delay(function() {
                s = !1;
            }), this.document.data("ui-dialog-overlays") || this.document.on("focusin.ui-dialog", function(t) {
                var e;
                s || (e = this._trackingInstances()[0])._allowInteraction(t) || (t.preventDefault(), e._focusTabbable(), "3.4." !== i && "3.5." !== i || e._delay(e._restoreTabbableFocus));
            }.bind(this)), this.overlay = V("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, {
                mousedown: "_keepFocus"
            }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1));
        },
        _destroyOverlay: function() {
            var t;
            this.options.modal && this.overlay && ((t = this.document.data("ui-dialog-overlays") - 1) ? this.document.data("ui-dialog-overlays", t) : (this.document.off("focusin.ui-dialog"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null);
        }
    }), !1 !== V.uiBackCompat && V.widget("ui.dialog", V.ui.dialog, {
        options: {
            dialogClass: ""
        },
        _createWrapper: function() {
            this._super(), this.uiDialog.addClass(this.options.dialogClass);
        },
        _setOption: function(t, e) {
            "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e), this._superApply(arguments);
        }
    });
    V.ui.dialog;

    function lt(t, e, i) {
        return e <= t && t < e + i;
    }
    V.widget("ui.droppable", {
        version: "1.13.0",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var t, e = this.options,
                i = e.accept;
            this.isover = !1, this.isout = !0, this.accept = "function" == typeof i ? i : function(t) {
                return t.is(i);
            }, this.proportions = function() {
                if (!arguments.length) return t = t || {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                };
                t = arguments[0];
            }, this._addToManager(e.scope), e.addClasses && this._addClass("ui-droppable");
        },
        _addToManager: function(t) {
            V.ui.ddmanager.droppables[t] = V.ui.ddmanager.droppables[t] || [], V.ui.ddmanager.droppables[t].push(this);
        },
        _splice: function(t) {
            for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1);
        },
        _destroy: function() {
            var t = V.ui.ddmanager.droppables[this.options.scope];
            this._splice(t);
        },
        _setOption: function(t, e) {
            var i;
            "accept" === t ? this.accept = "function" == typeof e ? e : function(t) {
                return t.is(e);
            } : "scope" === t && (i = V.ui.ddmanager.droppables[this.options.scope], this._splice(i), this._addToManager(e)), this._super(t, e);
        },
        _activate: function(t) {
            var e = V.ui.ddmanager.current;
            this._addActiveClass(), e && this._trigger("activate", t, this.ui(e));
        },
        _deactivate: function(t) {
            var e = V.ui.ddmanager.current;
            this._removeActiveClass(), e && this._trigger("deactivate", t, this.ui(e));
        },
        _over: function(t) {
            var e = V.ui.ddmanager.current;
            e && (e.currentItem || e.element)[0] !== this.element[0] && this.accept.call(this.element[0], e.currentItem || e.element) && (this._addHoverClass(), this._trigger("over", t, this.ui(e)));
        },
        _out: function(t) {
            var e = V.ui.ddmanager.current;
            e && (e.currentItem || e.element)[0] !== this.element[0] && this.accept.call(this.element[0], e.currentItem || e.element) && (this._removeHoverClass(), this._trigger("out", t, this.ui(e)));
        },
        _drop: function(e, t) {
            var i = t || V.ui.ddmanager.current,
                s = !1;
            return !(!i || (i.currentItem || i.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var t = V(this).droppable("instance");
                if (t.options.greedy && !t.options.disabled && t.options.scope === i.options.scope && t.accept.call(t.element[0], i.currentItem || i.element) && V.ui.intersect(i, V.extend(t, {
                        offset: t.element.offset()
                    }), t.options.tolerance, e)) return !(s = !0);
            }), !s && !!this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(i)), this.element));
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            };
        },
        _addHoverClass: function() {
            this._addClass("ui-droppable-hover");
        },
        _removeHoverClass: function() {
            this._removeClass("ui-droppable-hover");
        },
        _addActiveClass: function() {
            this._addClass("ui-droppable-active");
        },
        _removeActiveClass: function() {
            this._removeClass("ui-droppable-active");
        }
    }), V.ui.intersect = function(t, e, i, s) {
        if (!e.offset) return !1;
        var n = (t.positionAbs || t.position.absolute).left + t.margins.left,
            o = (t.positionAbs || t.position.absolute).top + t.margins.top,
            a = n + t.helperProportions.width,
            r = o + t.helperProportions.height,
            l = e.offset.left,
            h = e.offset.top,
            c = l + e.proportions().width,
            u = h + e.proportions().height;
        switch (i) {
            case "fit":
                return l <= n && a <= c && h <= o && r <= u;
            case "intersect":
                return l < n + t.helperProportions.width / 2 && a - t.helperProportions.width / 2 < c && h < o + t.helperProportions.height / 2 && r - t.helperProportions.height / 2 < u;
            case "pointer":
                return lt(s.pageY, h, e.proportions().height) && lt(s.pageX, l, e.proportions().width);
            case "touch":
                return (h <= o && o <= u || h <= r && r <= u || o < h && u < r) && (l <= n && n <= c || l <= a && a <= c || n < l && c < a);
            default:
                return !1;
        }
    }, !(V.ui.ddmanager = {
        current: null,
        droppables: {
            default: []
        },
        prepareOffsets: function(t, e) {
            var i, s, n = V.ui.ddmanager.droppables[t.options.scope] || [],
                o = e ? e.type : null,
                a = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            t: for (i = 0; i < n.length; i++)
                if (!(n[i].options.disabled || t && !n[i].accept.call(n[i].element[0], t.currentItem || t.element))) {
                    for (s = 0; s < a.length; s++)
                        if (a[s] === n[i].element[0]) {
                            n[i].proportions().height = 0;
                            continue t;
                        } n[i].visible = "none" !== n[i].element.css("display"), n[i].visible && ("mousedown" === o && n[i]._activate.call(n[i], e), n[i].offset = n[i].element.offset(), n[i].proportions({
                        width: n[i].element[0].offsetWidth,
                        height: n[i].element[0].offsetHeight
                    }));
                }
        },
        drop: function(t, e) {
            var i = !1;
            return V.each((V.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && V.ui.intersect(t, this, this.options.tolerance, e) && (i = this._drop.call(this, e) || i), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, e)));
            }), i;
        },
        dragStart: function(t, e) {
            t.element.parentsUntil("body").on("scroll.droppable", function() {
                t.options.refreshPositions || V.ui.ddmanager.prepareOffsets(t, e);
            });
        },
        drag: function(n, o) {
            n.options.refreshPositions && V.ui.ddmanager.prepareOffsets(n, o), V.each(V.ui.ddmanager.droppables[n.options.scope] || [], function() {
                var t, e, i, s;
                this.options.disabled || this.greedyChild || !this.visible || (s = !(i = V.ui.intersect(n, this, this.options.tolerance, o)) && this.isover ? "isout" : i && !this.isover ? "isover" : null) && (this.options.greedy && (e = this.options.scope, (i = this.element.parents(":data(ui-droppable)").filter(function() {
                    return V(this).droppable("instance").options.scope === e;
                })).length && ((t = V(i[0]).droppable("instance")).greedyChild = "isover" === s)), t && "isover" === s && (t.isover = !1, t.isout = !0, t._out.call(t, o)), this[s] = !0, this["isout" === s ? "isover" : "isout"] = !1, this["isover" === s ? "_over" : "_out"].call(this, o), t && "isout" === s && (t.isout = !1, t.isover = !0, t._over.call(t, o)));
            });
        },
        dragStop: function(t, e) {
            t.element.parentsUntil("body").off("scroll.droppable"), t.options.refreshPositions || V.ui.ddmanager.prepareOffsets(t, e);
        }
    }) !== V.uiBackCompat && V.widget("ui.droppable", V.ui.droppable, {
        options: {
            hoverClass: !1,
            activeClass: !1
        },
        _addActiveClass: function() {
            this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass);
        },
        _removeActiveClass: function() {
            this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass);
        },
        _addHoverClass: function() {
            this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass);
        },
        _removeHoverClass: function() {
            this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
        }
    });
    V.ui.droppable, V.widget("ui.progressbar", {
        version: "1.13.0",
        options: {
            classes: {
                "ui-progressbar": "ui-corner-all",
                "ui-progressbar-value": "ui-corner-left",
                "ui-progressbar-complete": "ui-corner-right"
            },
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = V("<div>").appendTo(this.element), this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue();
        },
        _destroy: function() {
            this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove();
        },
        value: function(t) {
            if (void 0 === t) return this.options.value;
            this.options.value = this._constrainedValue(t), this._refreshValue();
        },
        _constrainedValue: function(t) {
            return void 0 === t && (t = this.options.value), this.indeterminate = !1 === t, "number" != typeof t && (t = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, t));
        },
        _setOptions: function(t) {
            var e = t.value;
            delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue();
        },
        _setOption: function(t, e) {
            "max" === t && (e = Math.max(this.min, e)), this._super(t, e);
        },
        _setOptionDisabled: function(t) {
            this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t);
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
        },
        _refreshValue: function() {
            var t = this.options.value,
                e = this._percentage();
            this.valueDiv.toggle(this.indeterminate || t > this.min).width(e.toFixed(0) + "%"), this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, t === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = V("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": t
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== t && (this.oldValue = t, this._trigger("change")), t === this.options.max && this._trigger("complete");
        }
    }), V.widget("ui.selectable", V.ui.mouse, {
        version: "1.13.0",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var i = this;
            this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                i.elementPos = V(i.element[0]).offset(), i.selectees = V(i.options.filter, i.element[0]), i._addClass(i.selectees, "ui-selectee"), i.selectees.each(function() {
                    var t = V(this),
                        e = t.offset(),
                        e = {
                            left: e.left - i.elementPos.left,
                            top: e.top - i.elementPos.top
                        };
                    V.data(this, "selectable-item", {
                        element: this,
                        $element: t,
                        left: e.left,
                        top: e.top,
                        right: e.left + t.outerWidth(),
                        bottom: e.top + t.outerHeight(),
                        startselected: !1,
                        selected: t.hasClass("ui-selected"),
                        selecting: t.hasClass("ui-selecting"),
                        unselecting: t.hasClass("ui-unselecting")
                    });
                });
            }, this.refresh(), this._mouseInit(), this.helper = V("<div>"), this._addClass(this.helper, "ui-selectable-helper");
        },
        _destroy: function() {
            this.selectees.removeData("selectable-item"), this._mouseDestroy();
        },
        _mouseStart: function(i) {
            var s = this,
                t = this.options;
            this.opos = [i.pageX, i.pageY], this.elementPos = V(this.element[0]).offset(), this.options.disabled || (this.selectees = V(t.filter, this.element[0]), this._trigger("start", i), V(t.appendTo).append(this.helper), this.helper.css({
                left: i.pageX,
                top: i.pageY,
                width: 0,
                height: 0
            }), t.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var t = V.data(this, "selectable-item");
                t.startselected = !0, i.metaKey || i.ctrlKey || (s._removeClass(t.$element, "ui-selected"), t.selected = !1, s._addClass(t.$element, "ui-unselecting"), t.unselecting = !0, s._trigger("unselecting", i, {
                    unselecting: t.element
                }));
            }), V(i.target).parents().addBack().each(function() {
                var t, e = V.data(this, "selectable-item");
                if (e) return t = !i.metaKey && !i.ctrlKey || !e.$element.hasClass("ui-selected"), s._removeClass(e.$element, t ? "ui-unselecting" : "ui-selected")._addClass(e.$element, t ? "ui-selecting" : "ui-unselecting"), e.unselecting = !t, e.selecting = t, (e.selected = t) ? s._trigger("selecting", i, {
                    selecting: e.element
                }) : s._trigger("unselecting", i, {
                    unselecting: e.element
                }), !1;
            }));
        },
        _mouseDrag: function(s) {
            if (this.dragged = !0, !this.options.disabled) {
                var t, n = this,
                    o = this.options,
                    a = this.opos[0],
                    r = this.opos[1],
                    l = s.pageX,
                    h = s.pageY;
                return l < a && (t = l, l = a, a = t), h < r && (t = h, h = r, r = t), this.helper.css({
                    left: a,
                    top: r,
                    width: l - a,
                    height: h - r
                }), this.selectees.each(function() {
                    var t = V.data(this, "selectable-item"),
                        e = !1,
                        i = {};
                    t && t.element !== n.element[0] && (i.left = t.left + n.elementPos.left, i.right = t.right + n.elementPos.left, i.top = t.top + n.elementPos.top, i.bottom = t.bottom + n.elementPos.top, "touch" === o.tolerance ? e = !(i.left > l || i.right < a || i.top > h || i.bottom < r) : "fit" === o.tolerance && (e = i.left > a && i.right < l && i.top > r && i.bottom < h), e ? (t.selected && (n._removeClass(t.$element, "ui-selected"), t.selected = !1), t.unselecting && (n._removeClass(t.$element, "ui-unselecting"), t.unselecting = !1), t.selecting || (n._addClass(t.$element, "ui-selecting"), t.selecting = !0, n._trigger("selecting", s, {
                        selecting: t.element
                    }))) : (t.selecting && ((s.metaKey || s.ctrlKey) && t.startselected ? (n._removeClass(t.$element, "ui-selecting"), t.selecting = !1, n._addClass(t.$element, "ui-selected"), t.selected = !0) : (n._removeClass(t.$element, "ui-selecting"), t.selecting = !1, t.startselected && (n._addClass(t.$element, "ui-unselecting"), t.unselecting = !0), n._trigger("unselecting", s, {
                        unselecting: t.element
                    }))), t.selected && (s.metaKey || s.ctrlKey || t.startselected || (n._removeClass(t.$element, "ui-selected"), t.selected = !1, n._addClass(t.$element, "ui-unselecting"), t.unselecting = !0, n._trigger("unselecting", s, {
                        unselecting: t.element
                    })))));
                }), !1;
            }
        },
        _mouseStop: function(e) {
            var i = this;
            return this.dragged = !1, V(".ui-unselecting", this.element[0]).each(function() {
                var t = V.data(this, "selectable-item");
                i._removeClass(t.$element, "ui-unselecting"), t.unselecting = !1, t.startselected = !1, i._trigger("unselected", e, {
                    unselected: t.element
                });
            }), V(".ui-selecting", this.element[0]).each(function() {
                var t = V.data(this, "selectable-item");
                i._removeClass(t.$element, "ui-selecting")._addClass(t.$element, "ui-selected"), t.selecting = !1, t.selected = !0, t.startselected = !0, i._trigger("selected", e, {
                    selected: t.element
                });
            }), this._trigger("stop", e), this.helper.remove(), !1;
        }
    }), V.widget("ui.selectmenu", [V.ui.formResetMixin, {
        version: "1.13.0",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            classes: {
                "ui-selectmenu-button-open": "ui-corner-top",
                "ui-selectmenu-button-closed": "ui-corner-all"
            },
            disabled: null,
            icons: {
                button: "ui-icon-triangle-1-s"
            },
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            width: !1,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function() {
            var t = this.element.uniqueId().attr("id");
            this.ids = {
                element: t,
                button: t + "-button",
                menu: t + "-menu"
            }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = V();
        },
        _drawButton: function() {
            var t, e = this,
                i = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
            this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, {
                click: function(t) {
                    this.button.trigger("focus"), t.preventDefault();
                }
            }), this.element.hide(), this.button = V("<span>", {
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true",
                title: this.element.attr("title")
            }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), t = V("<span>").appendTo(this.button), this._addClass(t, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(i).appendTo(this.button), !1 !== this.options.width && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
                e._rendered || e._refreshMenu();
            });
        },
        _drawMenu: function() {
            var i = this;
            this.menu = V("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            }), this.menuWrap = V("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                classes: {
                    "ui-menu": "ui-corner-bottom"
                },
                role: "listbox",
                select: function(t, e) {
                    t.preventDefault(), i._setSelection(), i._select(e.item.data("ui-selectmenu-item"), t);
                },
                focus: function(t, e) {
                    e = e.item.data("ui-selectmenu-item");
                    null != i.focusIndex && e.index !== i.focusIndex && (i._trigger("focus", t, {
                        item: e
                    }), i.isOpen || i._select(e, t)), i.focusIndex = e.index, i.button.attr("aria-activedescendant", i.menuItems.eq(e.index).attr("id"));
                }
            }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
                return !1;
            }, this.menuInstance._isDivider = function() {
                return !1;
            };
        },
        refresh: function() {
            this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton();
        },
        _refreshMenu: function() {
            var t = this.element.find("option");
            this.menu.empty(), this._parseOptions(t), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, t.length && (t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")));
        },
        open: function(t) {
            this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t)));
        },
        _position: function() {
            this.menuWrap.position(V.extend({
                of: this.button
            }, this.options.position));
        },
        close: function(t) {
            this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t));
        },
        widget: function() {
            return this.button;
        },
        menuWidget: function() {
            return this.menu;
        },
        _renderButtonItem: function(t) {
            var e = V("<span>");
            return this._setText(e, t.label), this._addClass(e, "ui-selectmenu-text"), e;
        },
        _renderMenu: function(s, t) {
            var n = this,
                o = "";
            V.each(t, function(t, e) {
                var i;
                e.optgroup !== o && (i = V("<li>", {
                    text: e.optgroup
                }), n._addClass(i, "ui-selectmenu-optgroup", "ui-menu-divider" + (e.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), i.appendTo(s), o = e.optgroup), n._renderItemData(s, e);
            });
        },
        _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-selectmenu-item", e);
        },
        _renderItem: function(t, e) {
            var i = V("<li>"),
                s = V("<div>", {
                    title: e.element.attr("title")
                });
            return e.disabled && this._addClass(i, null, "ui-state-disabled"), this._setText(s, e.label), i.append(s).appendTo(t);
        },
        _setText: function(t, e) {
            e ? t.text(e) : t.html("&#160;");
        },
        _move: function(t, e) {
            var i, s = ".ui-menu-item";
            this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), s += ":not(.ui-state-disabled)"), (s = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](s).eq(-1) : i[t + "All"](s).eq(0)).length && this.menuInstance.focus(e, s);
        },
        _getSelectedItem: function() {
            return this.menuItems.eq(this.element[0].selectedIndex).parent("li");
        },
        _toggle: function(t) {
            this[this.isOpen ? "close" : "open"](t);
        },
        _setSelection: function() {
            var t;
            this.range && (window.getSelection ? ((t = window.getSelection()).removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus());
        },
        _documentClick: {
            mousedown: function(t) {
                this.isOpen && (V(t.target).closest(".ui-selectmenu-menu, #" + V.escapeSelector(this.ids.button)).length || this.close(t));
            }
        },
        _buttonEvents: {
            mousedown: function() {
                var t;
                window.getSelection ? (t = window.getSelection()).rangeCount && (this.range = t.getRangeAt(0)) : this.range = document.selection.createRange();
            },
            click: function(t) {
                this._setSelection(), this._toggle(t);
            },
            keydown: function(t) {
                var e = !0;
                switch (t.keyCode) {
                    case V.ui.keyCode.TAB:
                    case V.ui.keyCode.ESCAPE:
                        this.close(t), e = !1;
                        break;
                    case V.ui.keyCode.ENTER:
                        this.isOpen && this._selectFocusedItem(t);
                        break;
                    case V.ui.keyCode.UP:
                        t.altKey ? this._toggle(t) : this._move("prev", t);
                        break;
                    case V.ui.keyCode.DOWN:
                        t.altKey ? this._toggle(t) : this._move("next", t);
                        break;
                    case V.ui.keyCode.SPACE:
                        this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
                        break;
                    case V.ui.keyCode.LEFT:
                        this._move("prev", t);
                        break;
                    case V.ui.keyCode.RIGHT:
                        this._move("next", t);
                        break;
                    case V.ui.keyCode.HOME:
                    case V.ui.keyCode.PAGE_UP:
                        this._move("first", t);
                        break;
                    case V.ui.keyCode.END:
                    case V.ui.keyCode.PAGE_DOWN:
                        this._move("last", t);
                        break;
                    default:
                        this.menu.trigger(t), e = !1;
                }
                e && t.preventDefault();
            }
        },
        _selectFocusedItem: function(t) {
            var e = this.menuItems.eq(this.focusIndex).parent("li");
            e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t);
        },
        _select: function(t, e) {
            var i = this.element[0].selectedIndex;
            this.element[0].selectedIndex = t.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(t)), this._setAria(t), this._trigger("select", e, {
                item: t
            }), t.index !== i && this._trigger("change", e, {
                item: t
            }), this.close(e);
        },
        _setAria: function(t) {
            t = this.menuItems.eq(t.index).attr("id");
            this.button.attr({
                "aria-labelledby": t,
                "aria-activedescendant": t
            }), this.menu.attr("aria-activedescendant", t);
        },
        _setOption: function(t, e) {
            var i;
            "icons" === t && (i = this.button.find("span.ui-icon"), this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button)), this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "width" === t && this._resizeButton();
        },
        _setOptionDisabled: function(t) {
            this._super(t), this.menuInstance.option("disabled", t), this.button.attr("aria-disabled", t), this._toggleClass(this.button, null, "ui-state-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0);
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return (t = t && (t.jquery || t.nodeType ? V(t) : this.document.find(t).eq(0))) && t[0] || (t = this.element.closest(".ui-front, dialog")), t.length || (t = this.document[0].body), t;
        },
        _toggleAttr: function() {
            this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen);
        },
        _resizeButton: function() {
            var t = this.options.width;
            !1 !== t ? (null === t && (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t)) : this.button.css("width", "");
        },
        _resizeMenu: function() {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1));
        },
        _getCreateOptions: function() {
            var t = this._super();
            return t.disabled = this.element.prop("disabled"), t;
        },
        _parseOptions: function(t) {
            var i = this,
                s = [];
            t.each(function(t, e) {
                e.hidden || s.push(i._parseOption(V(e), t));
            }), this.items = s;
        },
        _parseOption: function(t, e) {
            var i = t.parent("optgroup");
            return {
                element: t,
                index: e,
                value: t.val(),
                label: t.text(),
                optgroup: i.attr("label") || "",
                disabled: i.prop("disabled") || t.prop("disabled")
            };
        },
        _destroy: function() {
            this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element);
        }
    }]), V.widget("ui.slider", V.ui.mouse, {
        version: "1.13.0",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1;
        },
        _refresh: function() {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
        },
        _createHandles: function() {
            var t, e = this.options,
                i = this.element.find(".ui-slider-handle"),
                s = [],
                n = e.values && e.values.length || 1;
            for (i.length > n && (i.slice(n).remove(), i = i.slice(0, n)), t = i.length; t < n; t++) s.push("<span tabindex='0'></span>");
            this.handles = i.add(V(s.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function(t) {
                V(this).data("ui-slider-handle-index", t).attr("tabIndex", 0);
            });
        },
        _createRange: function() {
            var t = this.options;
            t.range ? (!0 === t.range && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : Array.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
                left: "",
                bottom: ""
            })) : (this.range = V("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), "min" !== t.range && "max" !== t.range || this._addClass(this.range, "ui-slider-range-" + t.range)) : (this.range && this.range.remove(), this.range = null);
        },
        _setupEvents: function() {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);
        },
        _destroy: function() {
            this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy();
        },
        _mouseCapture: function(t) {
            var i, s, n, o, e, a, r = this,
                l = this.options;
            return !l.disabled && (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), a = {
                x: t.pageX,
                y: t.pageY
            }, i = this._normValueFromMouse(a), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                var e = Math.abs(i - r.values(t));
                (e < s || s === e && (t === r._lastChangedValue || r.values(t) === l.min)) && (s = e, n = V(this), o = t);
            }), !1 !== this._start(t, o) && (this._mouseSliding = !0, this._handleIndex = o, this._addClass(n, null, "ui-state-active"), n.trigger("focus"), e = n.offset(), a = !V(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = a ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - e.left - n.width() / 2,
                top: t.pageY - e.top - n.height() / 2 - (parseInt(n.css("borderTopWidth"), 10) || 0) - (parseInt(n.css("borderBottomWidth"), 10) || 0) + (parseInt(n.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, i), this._animateOff = !0));
        },
        _mouseStart: function() {
            return !0;
        },
        _mouseDrag: function(t) {
            var e = {
                    x: t.pageX,
                    y: t.pageY
                },
                e = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, e), !1;
        },
        _mouseStop: function(t) {
            return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1;
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function(t) {
            var e, t = "horizontal" === this.orientation ? (e = this.elementSize.width, t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
                t = t / e;
            return 1 < t && (t = 1), t < 0 && (t = 0), "vertical" === this.orientation && (t = 1 - t), e = this._valueMax() - this._valueMin(), e = this._valueMin() + t * e, this._trimAlignValue(e);
        },
        _uiHash: function(t, e, i) {
            var s = {
                handle: this.handles[t],
                handleIndex: t,
                value: void 0 !== e ? e : this.value()
            };
            return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t), s.values = i || this.values()), s;
        },
        _hasMultipleValues: function() {
            return this.options.values && this.options.values.length;
        },
        _start: function(t, e) {
            return this._trigger("start", t, this._uiHash(e));
        },
        _slide: function(t, e, i) {
            var s, n = this.value(),
                o = this.values();
            this._hasMultipleValues() && (s = this.values(e ? 0 : 1), n = this.values(e), 2 === this.options.values.length && !0 === this.options.range && (i = 0 === e ? Math.min(s, i) : Math.max(s, i)), o[e] = i), i !== n && !1 !== this._trigger("slide", t, this._uiHash(e, i, o)) && (this._hasMultipleValues() ? this.values(e, i) : this.value(i));
        },
        _stop: function(t, e) {
            this._trigger("stop", t, this._uiHash(e));
        },
        _change: function(t, e) {
            this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e)));
        },
        value: function(t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value();
        },
        values: function(t, e) {
            var i, s, n;
            if (1 < arguments.length) return this.options.values[t] = this._trimAlignValue(e), this._refreshValue(), void this._change(null, t);
            if (!arguments.length) return this._values();
            if (!Array.isArray(t)) return this._hasMultipleValues() ? this._values(t) : this.value();
            for (i = this.options.values, s = t, n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(s[n]), this._change(null, n);
            this._refreshValue();
        },
        _setOption: function(t, e) {
            var i, s = 0;
            switch ("range" === t && !0 === this.options.range && ("min" === e ? (this.options.value = this._values(0), this.options.values = null) : "max" === e && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), Array.isArray(this.options.values) && (s = this.options.values.length), this._super(t, e), t) {
                case "orientation":
                    this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(e), this.handles.css("horizontal" === e ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), i = s - 1; 0 <= i; i--) this._change(null, i);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1;
            }
        },
        _setOptionDisabled: function(t) {
            this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
        },
        _value: function() {
            var t = this.options.value;
            return t = this._trimAlignValue(t);
        },
        _values: function(t) {
            var e, i;
            if (arguments.length) return t = this.options.values[t], t = this._trimAlignValue(t);
            if (this._hasMultipleValues()) {
                for (e = this.options.values.slice(), i = 0; i < e.length; i += 1) e[i] = this._trimAlignValue(e[i]);
                return e;
            }
            return [];
        },
        _trimAlignValue: function(t) {
            if (t <= this._valueMin()) return this._valueMin();
            if (t >= this._valueMax()) return this._valueMax();
            var e = 0 < this.options.step ? this.options.step : 1,
                i = (t - this._valueMin()) % e,
                t = t - i;
            return 2 * Math.abs(i) >= e && (t += 0 < i ? e : -e), parseFloat(t.toFixed(5));
        },
        _calculateNewMax: function() {
            var t = this.options.max,
                e = this._valueMin(),
                i = this.options.step;
            (t = Math.round((t - e) / i) * i + e) > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision()));
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
        },
        _precisionOf: function(t) {
            var e = t.toString(),
                t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1;
        },
        _valueMin: function() {
            return this.options.min;
        },
        _valueMax: function() {
            return this.max;
        },
        _refreshRange: function(t) {
            "vertical" === t && this.range.css({
                width: "",
                left: ""
            }), "horizontal" === t && this.range.css({
                height: "",
                bottom: ""
            });
        },
        _refreshValue: function() {
            var e, i, t, s, n, o = this.options.range,
                a = this.options,
                r = this,
                l = !this._animateOff && a.animate,
                h = {};
            this._hasMultipleValues() ? this.handles.each(function(t) {
                i = (r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100, h["horizontal" === r.orientation ? "left" : "bottom"] = i + "%", V(this).stop(1, 1)[l ? "animate" : "css"](h, a.animate), !0 === r.options.range && ("horizontal" === r.orientation ? (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({
                    left: i + "%"
                }, a.animate), 1 === t && r.range[l ? "animate" : "css"]({
                    width: i - e + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                })) : (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({
                    bottom: i + "%"
                }, a.animate), 1 === t && r.range[l ? "animate" : "css"]({
                    height: i - e + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                }))), e = i;
            }) : (t = this.value(), s = this._valueMin(), n = this._valueMax(), i = n !== s ? (t - s) / (n - s) * 100 : 0, h["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](h, a.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                width: i + "%"
            }, a.animate), "max" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                width: 100 - i + "%"
            }, a.animate), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                height: i + "%"
            }, a.animate), "max" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                height: 100 - i + "%"
            }, a.animate));
        },
        _handleEvents: {
            keydown: function(t) {
                var e, i, s, n = V(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                    case V.ui.keyCode.HOME:
                    case V.ui.keyCode.END:
                    case V.ui.keyCode.PAGE_UP:
                    case V.ui.keyCode.PAGE_DOWN:
                    case V.ui.keyCode.UP:
                    case V.ui.keyCode.RIGHT:
                    case V.ui.keyCode.DOWN:
                    case V.ui.keyCode.LEFT:
                        if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(V(t.target), null, "ui-state-active"), !1 === this._start(t, n))) return;
                }
                switch (s = this.options.step, e = i = this._hasMultipleValues() ? this.values(n) : this.value(), t.keyCode) {
                    case V.ui.keyCode.HOME:
                        i = this._valueMin();
                        break;
                    case V.ui.keyCode.END:
                        i = this._valueMax();
                        break;
                    case V.ui.keyCode.PAGE_UP:
                        i = this._trimAlignValue(e + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case V.ui.keyCode.PAGE_DOWN:
                        i = this._trimAlignValue(e - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case V.ui.keyCode.UP:
                    case V.ui.keyCode.RIGHT:
                        if (e === this._valueMax()) return;
                        i = this._trimAlignValue(e + s);
                        break;
                    case V.ui.keyCode.DOWN:
                    case V.ui.keyCode.LEFT:
                        if (e === this._valueMin()) return;
                        i = this._trimAlignValue(e - s);
                }
                this._slide(t, n, i);
            },
            keyup: function(t) {
                var e = V(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, e), this._change(t, e), this._removeClass(V(t.target), null, "ui-state-active"));
            }
        }
    }), V.widget("ui.sortable", V.ui.mouse, {
        version: "1.13.0",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(t, e, i) {
            return e <= t && t < e + i;
        },
        _isFloating: function(t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"));
        },
        _create: function() {
            this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0;
        },
        _setOption: function(t, e) {
            this._super(t, e), "handle" === t && this._setHandleClassName();
        },
        _setHandleClassName: function() {
            var t = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), V.each(this.items, function() {
                t._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
            });
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var t = this.items.length - 1; 0 <= t; t--) this.items[t].item.removeData(this.widgetName + "-item");
            return this;
        },
        _mouseCapture: function(t, e) {
            var i = null,
                s = !1,
                n = this;
            return !this.reverting && !this.options.disabled && "static" !== this.options.type && (this._refreshItems(t), V(t.target).parents().each(function() {
                if (V.data(this, n.widgetName + "-item") === n) return i = V(this), !1;
            }), V.data(t.target, n.widgetName + "-item") === n && (i = V(t.target)), !!i && !(this.options.handle && !e && (V(this.options.handle, i).find("*").addBack().each(function() {
                this === t.target && (s = !0);
            }), !s)) && (this.currentItem = i, this._removeCurrentsFromItems(), !0));
        },
        _mouseStart: function(t, e, i) {
            var s, n, o = this.options;
            if ((this.currentContainer = this).refreshPositions(), this.appendTo = V("parent" !== o.appendTo ? o.appendTo : this.currentItem.parent()), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, V.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), this.scrollParent = this.placeholder.scrollParent(), V.extend(this.offset, {
                    parent: this._getParentOffset()
                }), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (n = this.document.find("body"), this.storedCursor = n.css("cursor"), n.css("cursor", o.cursor), this.storedStylesheet = V("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(n)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !i)
                for (s = this.containers.length - 1; 0 <= s; s--) this.containers[s]._trigger("activate", t, this._uiHash(this));
            return V.ui.ddmanager && (V.ui.ddmanager.current = this), V.ui.ddmanager && !o.dropBehaviour && V.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this.helper.parent().is(this.appendTo) || (this.helper.detach().appendTo(this.appendTo), this.offset.parent = this._getParentOffset()), this.position = this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, this.lastPositionAbs = this.positionAbs = this._convertPositionTo("absolute"), this._mouseDrag(t), !0;
        },
        _scroll: function(t) {
            var e = this.options,
                i = !1;
            return this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < e.scrollSensitivity ? this.scrollParent[0].scrollTop = i = this.scrollParent[0].scrollTop + e.scrollSpeed : t.pageY - this.overflowOffset.top < e.scrollSensitivity && (this.scrollParent[0].scrollTop = i = this.scrollParent[0].scrollTop - e.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < e.scrollSensitivity ? this.scrollParent[0].scrollLeft = i = this.scrollParent[0].scrollLeft + e.scrollSpeed : t.pageX - this.overflowOffset.left < e.scrollSensitivity && (this.scrollParent[0].scrollLeft = i = this.scrollParent[0].scrollLeft - e.scrollSpeed)) : (t.pageY - this.document.scrollTop() < e.scrollSensitivity ? i = this.document.scrollTop(this.document.scrollTop() - e.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < e.scrollSensitivity && (i = this.document.scrollTop(this.document.scrollTop() + e.scrollSpeed)), t.pageX - this.document.scrollLeft() < e.scrollSensitivity ? i = this.document.scrollLeft(this.document.scrollLeft() - e.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < e.scrollSensitivity && (i = this.document.scrollLeft(this.document.scrollLeft() + e.scrollSpeed))), i;
        },
        _mouseDrag: function(t) {
            var e, i, s, n, o = this.options;
            if (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), this._contactContainers(t), null !== this.innermostContainer)
                for (o.scroll && !1 !== this._scroll(t) && (this._refreshItemPositions(!0), V.ui.ddmanager && !o.dropBehaviour && V.ui.ddmanager.prepareOffsets(this, t)), this.dragDirection = {
                        vertical: this._getDragVerticalDirection(),
                        horizontal: this._getDragHorizontalDirection()
                    }, e = this.items.length - 1; 0 <= e; e--)
                    if (i = this.items[e], s = i.item[0], n = this._intersectsWithPointer(i), n && i.instance === this.currentContainer && !(s === this.currentItem[0] || this.placeholder[1 === n ? "next" : "prev"]()[0] === s || V.contains(this.placeholder[0], s) || "semi-dynamic" === this.options.type && V.contains(this.element[0], s))) {
                        if (this.direction = 1 === n ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(i)) break;
                        this._rearrange(t, i), this._trigger("change", t, this._uiHash());
                        break;
                    } return V.ui.ddmanager && V.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1;
        },
        _mouseStop: function(t, e) {
            var i, s, n, o;
            if (t) return V.ui.ddmanager && !this.options.dropBehaviour && V.ui.ddmanager.drop(this, t), this.options.revert ? (s = (i = this).placeholder.offset(), o = {}, (n = this.options.axis) && "x" !== n || (o.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), n && "y" !== n || (o.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, V(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function() {
                i._clear(t);
            })) : this._clear(t, e), !1;
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp(new V.Event("mouseup", {
                    target: null
                })), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var t = this.containers.length - 1; 0 <= t; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0);
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), V.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? V(this.domPosition.prev).after(this.currentItem) : V(this.domPosition.parent).prepend(this.currentItem)), this;
        },
        serialize: function(e) {
            var t = this._getItemsAsjQuery(e && e.connected),
                i = [];
            return e = e || {}, V(t).each(function() {
                var t = (V(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                t && i.push((e.key || t[1] + "[]") + "=" + (e.key && e.expression ? t[1] : t[2]));
            }), !i.length && e.key && i.push(e.key + "="), i.join("&");
        },
        toArray: function(t) {
            var e = this._getItemsAsjQuery(t && t.connected),
                i = [];
            return t = t || {}, e.each(function() {
                i.push(V(t.item || this).attr(t.attribute || "id") || "");
            }), i;
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left,
                i = e + this.helperProportions.width,
                s = this.positionAbs.top,
                n = s + this.helperProportions.height,
                o = t.left,
                a = o + t.width,
                r = t.top,
                l = r + t.height,
                h = this.offset.click.top,
                c = this.offset.click.left,
                h = "x" === this.options.axis || r < s + h && s + h < l,
                c = "y" === this.options.axis || o < e + c && e + c < a,
                c = h && c;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? c : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < a && r < s + this.helperProportions.height / 2 && n - this.helperProportions.height / 2 < l;
        },
        _intersectsWithPointer: function(t) {
            var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                t = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width);
            return !(!e || !t) && (e = this.dragDirection.vertical, t = this.dragDirection.horizontal, this.floating ? "right" === t || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1));
        },
        _intersectsWithSides: function(t) {
            var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                s = this.dragDirection.vertical,
                t = this.dragDirection.horizontal;
            return this.floating && t ? "right" === t && i || "left" === t && !i : s && ("down" === s && e || "up" === s && !e);
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 != t && (0 < t ? "down" : "up");
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 != t && (0 < t ? "right" : "left");
        },
        refresh: function(t) {
            return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this;
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith;
        },
        _getItemsAsjQuery: function(t) {
            var e, i, s, n, o = [],
                a = [],
                r = this._connectWith();
            if (r && t)
                for (e = r.length - 1; 0 <= e; e--)
                    for (i = (s = V(r[e], this.document[0])).length - 1; 0 <= i; i--)(n = V.data(s[i], this.widgetFullName)) && n !== this && !n.options.disabled && a.push(["function" == typeof n.options.items ? n.options.items.call(n.element) : V(n.options.items, n.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), n]);

            function l() {
                o.push(this);
            }
            for (a.push(["function" == typeof this.options.items ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : V(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), e = a.length - 1; 0 <= e; e--) a[e][0].each(l);
            return V(o);
        },
        _removeCurrentsFromItems: function() {
            var i = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = V.grep(this.items, function(t) {
                for (var e = 0; e < i.length; e++)
                    if (i[e] === t.item[0]) return !1;
                return !0;
            });
        },
        _refreshItems: function(t) {
            this.items = [], this.containers = [this];
            var e, i, s, n, o, a, r, l, h = this.items,
                c = [
                    ["function" == typeof this.options.items ? this.options.items.call(this.element[0], t, {
                        item: this.currentItem
                    }) : V(this.options.items, this.element), this]
                ],
                u = this._connectWith();
            if (u && this.ready)
                for (e = u.length - 1; 0 <= e; e--)
                    for (i = (s = V(u[e], this.document[0])).length - 1; 0 <= i; i--)(n = V.data(s[i], this.widgetFullName)) && n !== this && !n.options.disabled && (c.push(["function" == typeof n.options.items ? n.options.items.call(n.element[0], t, {
                        item: this.currentItem
                    }) : V(n.options.items, n.element), n]), this.containers.push(n));
            for (e = c.length - 1; 0 <= e; e--)
                for (o = c[e][1], i = 0, l = (a = c[e][0]).length; i < l; i++)(r = V(a[i])).data(this.widgetName + "-item", o), h.push({
                    item: r,
                    instance: o,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                });
        },
        _refreshItemPositions: function(t) {
            for (var e, i, s = this.items.length - 1; 0 <= s; s--) e = this.items[s], this.currentContainer && e.instance !== this.currentContainer && e.item[0] !== this.currentItem[0] || (i = this.options.toleranceElement ? V(this.options.toleranceElement, e.item) : e.item, t || (e.width = i.outerWidth(), e.height = i.outerHeight()), i = i.offset(), e.left = i.left, e.top = i.top);
        },
        refreshPositions: function(t) {
            var e, i;
            if (this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)), null !== this.innermostContainer && this._refreshItemPositions(t), this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (e = this.containers.length - 1; 0 <= e; e--) i = this.containers[e].element.offset(), this.containers[e].containerCache.left = i.left, this.containers[e].containerCache.top = i.top, this.containers[e].containerCache.width = this.containers[e].element.outerWidth(), this.containers[e].containerCache.height = this.containers[e].element.outerHeight();
            return this;
        },
        _createPlaceholder: function(i) {
            var s, n, o = (i = i || this).options;
            o.placeholder && o.placeholder.constructor !== String || (s = o.placeholder, n = i.currentItem[0].nodeName.toLowerCase(), o.placeholder = {
                element: function() {
                    var t = V("<" + n + ">", i.document[0]);
                    return i._addClass(t, "ui-sortable-placeholder", s || i.currentItem[0].className)._removeClass(t, "ui-sortable-helper"), "tbody" === n ? i._createTrPlaceholder(i.currentItem.find("tr").eq(0), V("<tr>", i.document[0]).appendTo(t)) : "tr" === n ? i._createTrPlaceholder(i.currentItem, t) : "img" === n && t.attr("src", i.currentItem.attr("src")), s || t.css("visibility", "hidden"), t;
                },
                update: function(t, e) {
                    s && !o.forcePlaceholderSize || (e.height() && (!o.forcePlaceholderSize || "tbody" !== n && "tr" !== n) || e.height(i.currentItem.innerHeight() - parseInt(i.currentItem.css("paddingTop") || 0, 10) - parseInt(i.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(i.currentItem.innerWidth() - parseInt(i.currentItem.css("paddingLeft") || 0, 10) - parseInt(i.currentItem.css("paddingRight") || 0, 10)));
                }
            }), i.placeholder = V(o.placeholder.element.call(i.element, i.currentItem)), i.currentItem.after(i.placeholder), o.placeholder.update(i, i.placeholder);
        },
        _createTrPlaceholder: function(t, e) {
            var i = this;
            t.children().each(function() {
                V("<td>&#160;</td>", i.document[0]).attr("colspan", V(this).attr("colspan") || 1).appendTo(e);
            });
        },
        _contactContainers: function(t) {
            for (var e, i, s, n, o, a, r, l, h, c = null, u = null, d = this.containers.length - 1; 0 <= d; d--) V.contains(this.currentItem[0], this.containers[d].element[0]) || (this._intersectsWith(this.containers[d].containerCache) ? c && V.contains(this.containers[d].element[0], c.element[0]) || (c = this.containers[d], u = d) : this.containers[d].containerCache.over && (this.containers[d]._trigger("out", t, this._uiHash(this)), this.containers[d].containerCache.over = 0));
            if (this.innermostContainer = c)
                if (1 === this.containers.length) this.containers[u].containerCache.over || (this.containers[u]._trigger("over", t, this._uiHash(this)), this.containers[u].containerCache.over = 1);
                else {
                    for (i = 1e4, s = null, n = (l = c.floating || this._isFloating(this.currentItem)) ? "left" : "top", o = l ? "width" : "height", h = l ? "pageX" : "pageY", e = this.items.length - 1; 0 <= e; e--) V.contains(this.containers[u].element[0], this.items[e].item[0]) && this.items[e].item[0] !== this.currentItem[0] && (a = this.items[e].item.offset()[n], r = !1, t[h] - a > this.items[e][o] / 2 && (r = !0), Math.abs(t[h] - a) < i && (i = Math.abs(t[h] - a), s = this.items[e], this.direction = r ? "up" : "down"));
                    (s || this.options.dropOnEmpty) && (this.currentContainer !== this.containers[u] ? (s ? this._rearrange(t, s, null, !0) : this._rearrange(t, null, this.containers[u].element, !0), this._trigger("change", t, this._uiHash()), this.containers[u]._trigger("change", t, this._uiHash(this)), this.currentContainer = this.containers[u], this.options.placeholder.update(this.currentContainer, this.placeholder), this.scrollParent = this.placeholder.scrollParent(), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this.containers[u]._trigger("over", t, this._uiHash(this)), this.containers[u].containerCache.over = 1) : this.currentContainer.containerCache.over || (this.containers[u]._trigger("over", t, this._uiHash()), this.currentContainer.containerCache.over = 1));
                }
        },
        _createHelper: function(t) {
            var e = this.options,
                t = "function" == typeof e.helper ? V(e.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === e.helper ? this.currentItem.clone() : this.currentItem;
            return t.parents("body").length || this.appendTo[0].appendChild(t[0]), t[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), t[0].style.width && !e.forceHelperSize || t.width(this.currentItem.width()), t[0].style.height && !e.forceHelperSize || t.height(this.currentItem.height()), t;
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")), Array.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && V.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && V.ui.ie) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return {
                top: 0,
                left: 0
            };
            var t = this.currentItem.position();
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var t, e, i = this.options;
            "parent" === i.containment && (i.containment = this.helper[0].parentNode), "document" !== i.containment && "window" !== i.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === i.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === i.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(i.containment) || (t = V(i.containment)[0], e = V(i.containment).offset(), i = "hidden" !== V(t).css("overflow"), this.containment = [e.left + (parseInt(V(t).css("borderLeftWidth"), 10) || 0) + (parseInt(V(t).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(V(t).css("borderTopWidth"), 10) || 0) + (parseInt(V(t).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (i ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(V(t).css("borderLeftWidth"), 10) || 0) - (parseInt(V(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (i ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(V(t).css("borderTopWidth"), 10) || 0) - (parseInt(V(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]);
        },
        _convertPositionTo: function(t, e) {
            e = e || this.position;
            var i = "absolute" === t ? 1 : -1,
                s = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && V.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                t = /(html|body)/i.test(s[0].tagName);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : t ? 0 : s.scrollTop()) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : t ? 0 : s.scrollLeft()) * i
            };
        },
        _generatePosition: function(t) {
            var e = this.options,
                i = t.pageX,
                s = t.pageY,
                n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && V.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                o = /(html|body)/i.test(n[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (i = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (s = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (i = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (s = this.containment[3] + this.offset.click.top)), e.grid && (t = this.originalPageY + Math.round((s - this.originalPageY) / e.grid[1]) * e.grid[1], s = !this.containment || t - this.offset.click.top >= this.containment[1] && t - this.offset.click.top <= this.containment[3] ? t : t - this.offset.click.top >= this.containment[1] ? t - e.grid[1] : t + e.grid[1], t = this.originalPageX + Math.round((i - this.originalPageX) / e.grid[0]) * e.grid[0], i = !this.containment || t - this.offset.click.left >= this.containment[0] && t - this.offset.click.left <= this.containment[2] ? t : t - this.offset.click.left >= this.containment[0] ? t - e.grid[0] : t + e.grid[0])), {
                top: s - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()),
                left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft())
            };
        },
        _rearrange: function(t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var n = this.counter;
            this._delay(function() {
                n === this.counter && this.refreshPositions(!s);
            });
        },
        _clear: function(t, e) {
            this.reverting = !1;
            var i, s = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS) "auto" !== this._storedCSS[i] && "static" !== this._storedCSS[i] || (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper");
            } else this.currentItem.show();

            function n(e, i, s) {
                return function(t) {
                    s._trigger(e, t, i._uiHash(i));
                };
            }
            for (this.fromOutside && !e && s.push(function(t) {
                    this._trigger("receive", t, this._uiHash(this.fromOutside));
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                    this._trigger("update", t, this._uiHash());
                }), this !== this.currentContainer && (e || (s.push(function(t) {
                    this._trigger("remove", t, this._uiHash());
                }), s.push(function(e) {
                    return function(t) {
                        e._trigger("receive", t, this._uiHash(this));
                    };
                }.call(this, this.currentContainer)), s.push(function(e) {
                    return function(t) {
                        e._trigger("update", t, this._uiHash(this));
                    };
                }.call(this, this.currentContainer)))), i = this.containers.length - 1; 0 <= i; i--) e || s.push(n("deactivate", this, this.containers[i])), this.containers[i].containerCache.over && (s.push(n("out", this, this.containers[i])), this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                for (i = 0; i < s.length; i++) s[i].call(this, t);
                this._trigger("stop", t, this._uiHash());
            }
            return this.fromOutside = !1, !this.cancelHelperRemoval;
        },
        _trigger: function() {
            !1 === V.Widget.prototype._trigger.apply(this, arguments) && this.cancel();
        },
        _uiHash: function(t) {
            var e = t || this;
            return {
                helper: e.helper,
                placeholder: e.placeholder || V([]),
                position: e.position,
                originalPosition: e.originalPosition,
                offset: e.positionAbs,
                item: e.currentItem,
                sender: t ? t.element : null
            };
        }
    });

    function ht(e) {
        return function() {
            var t = this.element.val();
            e.apply(this, arguments), this._refresh(), t !== this.element.val() && this._trigger("change");
        };
    }
    V.widget("ui.spinner", {
        version: "1.13.0",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            classes: {
                "ui-spinner": "ui-corner-all",
                "ui-spinner-down": "ui-corner-br",
                "ui-spinner-up": "ui-corner-tr"
            },
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _getCreateOptions: function() {
            var s = this._super(),
                n = this.element;
            return V.each(["min", "max", "step"], function(t, e) {
                var i = n.attr(e);
                null != i && i.length && (s[e] = i);
            }), s;
        },
        _events: {
            keydown: function(t) {
                this._start(t) && this._keydown(t) && t.preventDefault();
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val();
            },
            blur: function(t) {
                this.cancelBlur ? delete this.cancelBlur : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t));
            },
            mousewheel: function(t, e) {
                var i = V.ui.safeActiveElement(this.document[0]);
                if (this.element[0] === i && e) {
                    if (!this.spinning && !this._start(t)) return !1;
                    this._spin((0 < e ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(t);
                    }, 100), t.preventDefault();
                }
            },
            "mousedown .ui-spinner-button": function(t) {
                var e;

                function i() {
                    this.element[0] === V.ui.safeActiveElement(this.document[0]) || (this.element.trigger("focus"), this.previous = e, this._delay(function() {
                        this.previous = e;
                    }));
                }
                e = this.element[0] === V.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(), t.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                    delete this.cancelBlur, i.call(this);
                }), !1 !== this._start(t) && this._repeat(null, V(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t);
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(t) {
                if (V(t.currentTarget).hasClass("ui-state-active")) return !1 !== this._start(t) && void this._repeat(null, V(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t);
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _enhance: function() {
            this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>");
        },
        _draw: function() {
            this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"), this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
                classes: {
                    "ui-button": ""
                }
            }), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"), this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({
                icon: this.options.icons.up,
                showLabel: !1
            }), this.buttons.last().button({
                icon: this.options.icons.down,
                showLabel: !1
            }), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && 0 < this.uiSpinner.height() && this.uiSpinner.height(this.uiSpinner.height());
        },
        _keydown: function(t) {
            var e = this.options,
                i = V.ui.keyCode;
            switch (t.keyCode) {
                case i.UP:
                    return this._repeat(null, 1, t), !0;
                case i.DOWN:
                    return this._repeat(null, -1, t), !0;
                case i.PAGE_UP:
                    return this._repeat(null, e.page, t), !0;
                case i.PAGE_DOWN:
                    return this._repeat(null, -e.page, t), !0;
            }
            return !1;
        },
        _start: function(t) {
            return !(!this.spinning && !1 === this._trigger("start", t)) && (this.counter || (this.counter = 1), this.spinning = !0);
        },
        _repeat: function(t, e, i) {
            t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                this._repeat(40, e, i);
            }, t), this._spin(e * this.options.step, i);
        },
        _spin: function(t, e) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && !1 === this._trigger("spin", e, {
                value: i
            }) || (this._value(i), this.counter++);
        },
        _increment: function(t) {
            var e = this.options.incremental;
            return e ? "function" == typeof e ? e(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1;
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
        },
        _precisionOf: function(t) {
            var e = t.toString(),
                t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1;
        },
        _adjustValue: function(t) {
            var e = this.options,
                i = null !== e.min ? e.min : 0,
                s = t - i;
            return t = i + Math.round(s / e.step) * e.step, t = parseFloat(t.toFixed(this._precision())), null !== e.max && t > e.max ? e.max : null !== e.min && t < e.min ? e.min : t;
        },
        _stop: function(t) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t));
        },
        _setOption: function(t, e) {
            var i;
            if ("culture" === t || "numberFormat" === t) return i = this._parse(this.element.val()), this.options[t] = e, void this.element.val(this._format(i));
            "max" !== t && "min" !== t && "step" !== t || "string" == typeof e && (e = this._parse(e)), "icons" === t && (i = this.buttons.first().find(".ui-icon"), this._removeClass(i, null, this.options.icons.up), this._addClass(i, null, e.up), i = this.buttons.last().find(".ui-icon"), this._removeClass(i, null, this.options.icons.down), this._addClass(i, null, e.down)), this._super(t, e);
        },
        _setOptionDisabled: function(t) {
            this._super(t), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable");
        },
        _setOptions: ht(function(t) {
            this._super(t);
        }),
        _parse: function(t) {
            return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t;
        },
        _format: function(t) {
            return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t;
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            });
        },
        isValid: function() {
            var t = this.value();
            return null !== t && t === this._adjustValue(t);
        },
        _value: function(t, e) {
            var i;
            "" !== t && null !== (i = this._parse(t)) && (e || (i = this._adjustValue(i)), t = this._format(i)), this.element.val(t), this._refresh();
        },
        _destroy: function() {
            this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element);
        },
        stepUp: ht(function(t) {
            this._stepUp(t);
        }),
        _stepUp: function(t) {
            this._start() && (this._spin((t || 1) * this.options.step), this._stop());
        },
        stepDown: ht(function(t) {
            this._stepDown(t);
        }),
        _stepDown: function(t) {
            this._start() && (this._spin((t || 1) * -this.options.step), this._stop());
        },
        pageUp: ht(function(t) {
            this._stepUp((t || 1) * this.options.page);
        }),
        pageDown: ht(function(t) {
            this._stepDown((t || 1) * this.options.page);
        }),
        value: function(t) {
            if (!arguments.length) return this._parse(this.element.val());
            ht(this._value).call(this, t);
        },
        widget: function() {
            return this.uiSpinner;
        }
    }), !1 !== V.uiBackCompat && V.widget("ui.spinner", V.ui.spinner, {
        _enhance: function() {
            this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
        },
        _uiSpinnerHtml: function() {
            return "<span>";
        },
        _buttonHtml: function() {
            return "<a></a><a></a>";
        }
    });
    var ct;
    V.ui.spinner;
    V.widget("ui.tabs", {
        version: "1.13.0",
        delay: 300,
        options: {
            active: null,
            classes: {
                "ui-tabs": "ui-corner-all",
                "ui-tabs-nav": "ui-corner-all",
                "ui-tabs-panel": "ui-corner-bottom",
                "ui-tabs-tab": "ui-corner-top"
            },
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: (ct = /#.*$/, function(t) {
            var e = t.href.replace(ct, ""),
                i = location.href.replace(ct, "");
            try {
                e = decodeURIComponent(e);
            } catch (t) {}
            try {
                i = decodeURIComponent(i);
            } catch (t) {}
            return 1 < t.hash.length && e === i;
        }),
        _create: function() {
            var e = this,
                t = this.options;
            this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, t.collapsible), this._processTabs(), t.active = this._initialActive(), Array.isArray(t.disabled) && (t.disabled = V.uniqueSort(t.disabled.concat(V.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                return e.tabs.index(t);
            }))).sort()), !1 !== this.options.active && this.anchors.length ? this.active = this._findActive(t.active) : this.active = V(), this._refresh(), this.active.length && this.load(t.active);
        },
        _initialActive: function() {
            var i = this.options.active,
                t = this.options.collapsible,
                s = location.hash.substring(1);
            return null === i && (s && this.tabs.each(function(t, e) {
                if (V(e).attr("aria-controls") === s) return i = t, !1;
            }), null === i && (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== i && -1 !== i || (i = !!this.tabs.length && 0)), !1 !== i && -1 === (i = this.tabs.index(this.tabs.eq(i))) && (i = !t && 0), !t && !1 === i && this.anchors.length && (i = 0), i;
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : V()
            };
        },
        _tabKeydown: function(t) {
            var e = V(V.ui.safeActiveElement(this.document[0])).closest("li"),
                i = this.tabs.index(e),
                s = !0;
            if (!this._handlePageNav(t)) {
                switch (t.keyCode) {
                    case V.ui.keyCode.RIGHT:
                    case V.ui.keyCode.DOWN:
                        i++;
                        break;
                    case V.ui.keyCode.UP:
                    case V.ui.keyCode.LEFT:
                        s = !1, i--;
                        break;
                    case V.ui.keyCode.END:
                        i = this.anchors.length - 1;
                        break;
                    case V.ui.keyCode.HOME:
                        i = 0;
                        break;
                    case V.ui.keyCode.SPACE:
                        return t.preventDefault(), clearTimeout(this.activating), void this._activate(i);
                    case V.ui.keyCode.ENTER:
                        return t.preventDefault(), clearTimeout(this.activating), void this._activate(i !== this.options.active && i);
                    default:
                        return;
                }
                t.preventDefault(), clearTimeout(this.activating), i = this._focusNextTab(i, s), t.ctrlKey || t.metaKey || (e.attr("aria-selected", "false"), this.tabs.eq(i).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", i);
                }, this.delay));
            }
        },
        _panelKeydown: function(t) {
            this._handlePageNav(t) || t.ctrlKey && t.keyCode === V.ui.keyCode.UP && (t.preventDefault(), this.active.trigger("focus"));
        },
        _handlePageNav: function(t) {
            return t.altKey && t.keyCode === V.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === V.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0;
        },
        _findNextTab: function(t, e) {
            var i = this.tabs.length - 1;
            for (; - 1 !== V.inArray((i < t && (t = 0), t < 0 && (t = i), t), this.options.disabled);) t = e ? t + 1 : t - 1;
            return t;
        },
        _focusNextTab: function(t, e) {
            return t = this._findNextTab(t, e), this.tabs.eq(t).trigger("focus"), t;
        },
        _setOption: function(t, e) {
            "active" !== t ? (this._super(t, e), "collapsible" === t && (this._toggleClass("ui-tabs-collapsible", null, e), e || !1 !== this.options.active || this._activate(0)), "event" === t && this._setupEvents(e), "heightStyle" === t && this._setupHeightStyle(e)) : this._activate(e);
        },
        _sanitizeSelector: function(t) {
            return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
        },
        refresh: function() {
            var t = this.options,
                e = this.tablist.children(":has(a[href])");
            t.disabled = V.map(e.filter(".ui-state-disabled"), function(t) {
                return e.index(t);
            }), this._processTabs(), !1 !== t.active && this.anchors.length ? this.active.length && !V.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = V()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = V()), this._refresh();
        },
        _refresh: function() {
            this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            }), this.active.length ? (this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0);
        },
        _processTabs: function() {
            var l = this,
                t = this.tabs,
                e = this.anchors,
                i = this.panels;
            this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function(t) {
                V(this).is(".ui-state-disabled") && t.preventDefault();
            }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                V(this).closest("li").is(".ui-state-disabled") && this.blur();
            }), this.tabs = this.tablist.find("> li:has(a[href])").attr({
                role: "tab",
                tabIndex: -1
            }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function() {
                return V("a", this)[0];
            }).attr({
                tabIndex: -1
            }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = V(), this.anchors.each(function(t, e) {
                var i, s, n, o = V(e).uniqueId().attr("id"),
                    a = V(e).closest("li"),
                    r = a.attr("aria-controls");
                l._isLocal(e) ? (n = (i = e.hash).substring(1), s = l.element.find(l._sanitizeSelector(i))) : (i = "#" + (n = a.attr("aria-controls") || V({}).uniqueId()[0].id), (s = l.element.find(i)).length || (s = l._createPanel(n)).insertAfter(l.panels[t - 1] || l.tablist), s.attr("aria-live", "polite")), s.length && (l.panels = l.panels.add(s)), r && a.data("ui-tabs-aria-controls", r), a.attr({
                    "aria-controls": n,
                    "aria-labelledby": o
                }), s.attr("aria-labelledby", o);
            }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), t && (this._off(t.not(this.tabs)), this._off(e.not(this.anchors)), this._off(i.not(this.panels)));
        },
        _getList: function() {
            return this.tablist || this.element.find("ol, ul").eq(0);
        },
        _createPanel: function(t) {
            return V("<div>").attr("id", t).data("ui-tabs-destroy", !0);
        },
        _setOptionDisabled: function(t) {
            var e, i;
            for (Array.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1), i = 0; e = this.tabs[i]; i++) e = V(e), !0 === t || -1 !== V.inArray(i, t) ? (e.attr("aria-disabled", "true"), this._addClass(e, null, "ui-state-disabled")) : (e.removeAttr("aria-disabled"), this._removeClass(e, null, "ui-state-disabled"));
            this.options.disabled = t, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !0 === t);
        },
        _setupEvents: function(t) {
            var i = {};
            t && V.each(t.split(" "), function(t, e) {
                i[e] = "_eventHandler";
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                click: function(t) {
                    t.preventDefault();
                }
            }), this._on(this.anchors, i), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs);
        },
        _setupHeightStyle: function(t) {
            var i, e = this.element.parent();
            "fill" === t ? (i = e.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var t = V(this),
                    e = t.css("position");
                "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0));
            }), this.element.children().not(this.panels).each(function() {
                i -= V(this).outerHeight(!0);
            }), this.panels.each(function() {
                V(this).height(Math.max(0, i - V(this).innerHeight() + V(this).height()));
            }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function() {
                i = Math.max(i, V(this).height("").height());
            }).height(i));
        },
        _eventHandler: function(t) {
            var e = this.options,
                i = this.active,
                s = V(t.currentTarget).closest("li"),
                n = s[0] === i[0],
                o = n && e.collapsible,
                a = o ? V() : this._getPanelForTab(s),
                r = i.length ? this._getPanelForTab(i) : V(),
                i = {
                    oldTab: i,
                    oldPanel: r,
                    newTab: o ? V() : s,
                    newPanel: a
                };
            t.preventDefault(), s.hasClass("ui-state-disabled") || s.hasClass("ui-tabs-loading") || this.running || n && !e.collapsible || !1 === this._trigger("beforeActivate", t, i) || (e.active = !o && this.tabs.index(s), this.active = n ? V() : s, this.xhr && this.xhr.abort(), r.length || a.length || V.error("jQuery UI Tabs: Mismatching fragment identifier."), a.length && this.load(this.tabs.index(s), t), this._toggle(t, i));
        },
        _toggle: function(t, e) {
            var i = this,
                s = e.newPanel,
                n = e.oldPanel;

            function o() {
                i.running = !1, i._trigger("activate", t, e);
            }

            function a() {
                i._addClass(e.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), s.length && i.options.show ? i._show(s, i.options.show, o) : (s.show(), o());
            }
            this.running = !0, n.length && this.options.hide ? this._hide(n, this.options.hide, function() {
                i._removeClass(e.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), a();
            }) : (this._removeClass(e.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), n.hide(), a()), n.attr("aria-hidden", "true"), e.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), s.length && n.length ? e.oldTab.attr("tabIndex", -1) : s.length && this.tabs.filter(function() {
                return 0 === V(this).attr("tabIndex");
            }).attr("tabIndex", -1), s.attr("aria-hidden", "false"), e.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            });
        },
        _activate: function(t) {
            var t = this._findActive(t);
            t[0] !== this.active[0] && (t.length || (t = this.active), t = t.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: t,
                currentTarget: t,
                preventDefault: V.noop
            }));
        },
        _findActive: function(t) {
            return !1 === t ? V() : this.tabs.eq(t);
        },
        _getIndex: function(t) {
            return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + V.escapeSelector(t) + "']"))), t;
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                V.data(this, "ui-tabs-destroy") ? V(this).remove() : V(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded");
            }), this.tabs.each(function() {
                var t = V(this),
                    e = t.data("ui-tabs-aria-controls");
                e ? t.attr("aria-controls", e).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls");
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");
        },
        enable: function(i) {
            var t = this.options.disabled;
            !1 !== t && (t = void 0 !== i && (i = this._getIndex(i), Array.isArray(t) ? V.map(t, function(t) {
                return t !== i ? t : null;
            }) : V.map(this.tabs, function(t, e) {
                return e !== i ? e : null;
            })), this._setOptionDisabled(t));
        },
        disable: function(t) {
            var e = this.options.disabled;
            if (!0 !== e) {
                if (void 0 === t) e = !0;
                else {
                    if (t = this._getIndex(t), -1 !== V.inArray(t, e)) return;
                    e = Array.isArray(e) ? V.merge([t], e).sort() : [t];
                }
                this._setOptionDisabled(e);
            }
        },
        load: function(t, s) {
            t = this._getIndex(t);

            function n(t, e) {
                "abort" === e && o.panels.stop(!1, !0), o._removeClass(i, "ui-tabs-loading"), a.removeAttr("aria-busy"), t === o.xhr && delete o.xhr;
            }
            var o = this,
                i = this.tabs.eq(t),
                t = i.find(".ui-tabs-anchor"),
                a = this._getPanelForTab(i),
                r = {
                    tab: i,
                    panel: a
                };
            this._isLocal(t[0]) || (this.xhr = V.ajax(this._ajaxSettings(t, s, r)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(i, "ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.done(function(t, e, i) {
                setTimeout(function() {
                    a.html(t), o._trigger("load", s, r), n(i, e);
                }, 1);
            }).fail(function(t, e) {
                setTimeout(function() {
                    n(t, e);
                }, 1);
            })));
        },
        _ajaxSettings: function(t, i, s) {
            var n = this;
            return {
                url: t.attr("href").replace(/#.*$/, ""),
                beforeSend: function(t, e) {
                    return n._trigger("beforeLoad", i, V.extend({
                        jqXHR: t,
                        ajaxSettings: e
                    }, s));
                }
            };
        },
        _getPanelForTab: function(t) {
            t = V(t).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + t));
        }
    }), !1 !== V.uiBackCompat && V.widget("ui.tabs", V.ui.tabs, {
        _processTabs: function() {
            this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
        }
    });
    V.ui.tabs;
    V.widget("ui.tooltip", {
        version: "1.13.0",
        options: {
            classes: {
                "ui-tooltip": "ui-corner-all ui-widget-shadow"
            },
            content: function() {
                var t = V(this).attr("title");
                return V("<a>").text(t).html();
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            track: !1,
            close: null,
            open: null
        },
        _addDescribedBy: function(t, e) {
            var i = (t.attr("aria-describedby") || "").split(/\s+/);
            i.push(e), t.data("ui-tooltip-id", e).attr("aria-describedby", String.prototype.trim.call(i.join(" ")));
        },
        _removeDescribedBy: function(t) {
            var e = t.data("ui-tooltip-id"),
                i = (t.attr("aria-describedby") || "").split(/\s+/),
                e = V.inArray(e, i); - 1 !== e && i.splice(e, 1), t.removeData("ui-tooltip-id"), (i = String.prototype.trim.call(i.join(" "))) ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby");
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.liveRegion = V("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = V([]);
        },
        _setOption: function(t, e) {
            var i = this;
            this._super(t, e), "content" === t && V.each(this.tooltips, function(t, e) {
                i._updateContent(e.element);
            });
        },
        _setOptionDisabled: function(t) {
            this[t ? "_disable" : "_enable"]();
        },
        _disable: function() {
            var s = this;
            V.each(this.tooltips, function(t, e) {
                var i = V.Event("blur");
                i.target = i.currentTarget = e.element[0], s.close(i, !0);
            }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
                var t = V(this);
                if (t.is("[title]")) return t.data("ui-tooltip-title", t.attr("title")).removeAttr("title");
            }));
        },
        _enable: function() {
            this.disabledTitles.each(function() {
                var t = V(this);
                t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"));
            }), this.disabledTitles = V([]);
        },
        open: function(t) {
            var i = this,
                e = V(t ? t.target : this.element).closest(this.options.items);
            e.length && !e.data("ui-tooltip-id") && (e.attr("title") && e.data("ui-tooltip-title", e.attr("title")), e.data("ui-tooltip-open", !0), t && "mouseover" === t.type && e.parents().each(function() {
                var t, e = V(this);
                e.data("ui-tooltip-open") && ((t = V.Event("blur")).target = t.currentTarget = this, i.close(t, !0)), e.attr("title") && (e.uniqueId(), i.parents[this.id] = {
                    element: this,
                    title: e.attr("title")
                }, e.attr("title", ""));
            }), this._registerCloseHandlers(t, e), this._updateContent(e, t));
        },
        _updateContent: function(e, i) {
            var t = this.options.content,
                s = this,
                n = i ? i.type : null;
            if ("string" == typeof t || t.nodeType || t.jquery) return this._open(i, e, t);
            (t = t.call(e[0], function(t) {
                s._delay(function() {
                    e.data("ui-tooltip-open") && (i && (i.type = n), this._open(i, e, t));
                });
            })) && this._open(i, e, t);
        },
        _open: function(t, e, i) {
            var s, n, o, a = V.extend({}, this.options.position);

            function r(t) {
                a.of = t, n.is(":hidden") || n.position(a);
            }
            i && ((s = this._find(e)) ? s.tooltip.find(".ui-tooltip-content").html(i) : (e.is("[title]") && (t && "mouseover" === t.type ? e.attr("title", "") : e.removeAttr("title")), s = this._tooltip(e), n = s.tooltip, this._addDescribedBy(e, n.attr("id")), n.find(".ui-tooltip-content").html(i), this.liveRegion.children().hide(), (i = V("<div>").html(n.find(".ui-tooltip-content").html())).removeAttr("name").find("[name]").removeAttr("name"), i.removeAttr("id").find("[id]").removeAttr("id"), i.appendTo(this.liveRegion), this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
                mousemove: r
            }), r(t)) : n.position(V.extend({
                of: e
            }, this.options.position)), n.hide(), this._show(n, this.options.show), this.options.track && this.options.show && this.options.show.delay && (o = this.delayedShow = setInterval(function() {
                n.is(":visible") && (r(a.of), clearInterval(o));
            }, 13)), this._trigger("open", t, {
                tooltip: n
            })));
        },
        _registerCloseHandlers: function(t, e) {
            var i = {
                keyup: function(t) {
                    t.keyCode === V.ui.keyCode.ESCAPE && ((t = V.Event(t)).currentTarget = e[0], this.close(t, !0));
                }
            };
            e[0] !== this.element[0] && (i.remove = function() {
                this._removeTooltip(this._find(e).tooltip);
            }), t && "mouseover" !== t.type || (i.mouseleave = "close"), t && "focusin" !== t.type || (i.focusout = "close"), this._on(!0, e, i);
        },
        close: function(t) {
            var e, i = this,
                s = V(t ? t.currentTarget : this.element),
                n = this._find(s);
            n ? (e = n.tooltip, n.closing || (clearInterval(this.delayedShow), s.data("ui-tooltip-title") && !s.attr("title") && s.attr("title", s.data("ui-tooltip-title")), this._removeDescribedBy(s), n.hiding = !0, e.stop(!0), this._hide(e, this.options.hide, function() {
                i._removeTooltip(V(this));
            }), s.removeData("ui-tooltip-open"), this._off(s, "mouseleave focusout keyup"), s[0] !== this.element[0] && this._off(s, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && V.each(this.parents, function(t, e) {
                V(e.element).attr("title", e.title), delete i.parents[t];
            }), n.closing = !0, this._trigger("close", t, {
                tooltip: e
            }), n.hiding || (n.closing = !1))) : s.removeData("ui-tooltip-open");
        },
        _tooltip: function(t) {
            var e = V("<div>").attr("role", "tooltip"),
                i = V("<div>").appendTo(e),
                s = e.uniqueId().attr("id");
            return this._addClass(i, "ui-tooltip-content"), this._addClass(e, "ui-tooltip", "ui-widget ui-widget-content"), e.appendTo(this._appendTo(t)), this.tooltips[s] = {
                element: t,
                tooltip: e
            };
        },
        _find: function(t) {
            t = t.data("ui-tooltip-id");
            return t ? this.tooltips[t] : null;
        },
        _removeTooltip: function(t) {
            clearInterval(this.delayedShow), t.remove(), delete this.tooltips[t.attr("id")];
        },
        _appendTo: function(t) {
            t = t.closest(".ui-front, dialog");
            return t.length || (t = this.document[0].body), t;
        },
        _destroy: function() {
            var s = this;
            V.each(this.tooltips, function(t, e) {
                var i = V.Event("blur"),
                    e = e.element;
                i.target = i.currentTarget = e[0], s.close(i, !0), V("#" + t).remove(), e.data("ui-tooltip-title") && (e.attr("title") || e.attr("title", e.data("ui-tooltip-title")), e.removeData("ui-tooltip-title"));
            }), this.liveRegion.remove();
        }
    }), !1 !== V.uiBackCompat && V.widget("ui.tooltip", V.ui.tooltip, {
        options: {
            tooltipClass: null
        },
        _tooltip: function() {
            var t = this._superApply(arguments);
            return this.options.tooltipClass && t.tooltip.addClass(this.options.tooltipClass), t;
        }
    });
    V.ui.tooltip;
});