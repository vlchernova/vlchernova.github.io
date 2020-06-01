! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).cssScrollSnapPolyfill = t()
}(this, function () {
    "use strict";
    ! function (e, t, n) {
        function r(e) {
            return e.replace(/^\s+|\s+$/g, "")
        }

        function o(e, t) {
            var n, r = 0;
            if (!e || !t) return !1;
            for (; n = t[r++];)
                if (e === n) return !0;
            return !1
        }

        function i(e) {
            var t, n = 0;
            for (this._rules = []; t = e[n++];) this._rules.push(new s(t))
        }

        function s(e) {
            this._rule = e
        }

        function a(e) {
            return this instanceof a ? (this._options = e, e.keywords || (this._options = {
                keywords: e
            }), this._promise = [], this._getStylesheets(), this._downloadStylesheets(), this._parseStylesheets(), this._filterCSSByKeywords(), this._buildMediaQueryMap(), this._reportInitialMatches(), void this._addMediaListeners()) : new a(e)
        }
        var l = RegExp("^" + String({}.valueOf).replace(/[.*+?\^${}()|\[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
            c = function () {
                var e = t.getElementsByTagName("base")[0],
                    n = /^([a-zA-Z:]*\/\/)/;
                return function (t) {
                    return !n.test(t) && !e || t.replace(RegExp.$1, "").split("/")[0] === location.host
                }
            }(),
            u = {
                matchMedia: e.matchMedia && e.matchMedia("only all").matches,
                nativeMatchMedia: function (e) {
                    return l.test(e)
                }(e.matchMedia)
            },
            f = function () {
                function t() {
                    var e;
                    0 !== c.readyState && 4 !== c.readyState || ((e = s[0]) && function (e) {
                        l++, c.open("GET", e, !0), c.onreadystatechange = function () {
                            4 != c.readyState || 200 != c.status && 304 != c.status || (i[e] = c.responseText, s.shift(), t())
                        }, c.send(null)
                    }(e), e || n())
                }

                function n() {
                    for (var e; e = a.shift();) r(e.urls, e.fn)
                }

                function r(e, t) {
                    for (var n, r = [], o = 0; n = e[o++];) r.push(i[n]);
                    t.call(null, r)
                }
                var i = {},
                    s = [],
                    a = [],
                    l = 0,
                    c = function () {
                        var t;
                        try {
                            t = new e.XMLHttpRequest
                        } catch (n) {
                            t = new e.ActiveXObject("Microsoft.XMLHTTP")
                        }
                        return t
                    }();
                return {
                    request: function (e, r) {
                        a.push({
                                urls: e,
                                fn: r
                            }),
                            function (e) {
                                for (var t, n = 0, r = 0; t = e[n++];) i[t] && r++;
                                return r === e.length
                            }(e) ? n() : (function (e) {
                                for (var t, n = 0; t = e[n++];) i[t] || o(t, s) || s.push(t)
                            }(e), t())
                    },
                    clearCache: function () {
                        i = {}
                    },
                    _getRequestCount: function () {
                        return l
                    }
                }
            }(),
            d = {
                _cache: {},
                clearCache: function () {
                    d._cache = {}
                },
                parse: function (e, t) {
                    function n() {
                        return s(/^\{\s*/)
                    }

                    function o() {
                        return s(/^\}\s*/)
                    }

                    function i() {
                        var t, n = [];
                        for (a(), l(n);
                            "}" != e.charAt(0) && (t = function () {
                                if (t = s(/^@([\-\w]+)?keyframes */)) {
                                    var e = t[1],
                                        t = s(/^([\-\w]+)\s*/);
                                    if (t) {
                                        var r = t[1];
                                        if (n()) {
                                            l();
                                            for (var i, a = []; i = h();) a.push(i), l();
                                            if (o()) {
                                                var c = {
                                                    name: r,
                                                    keyframes: a
                                                };
                                                return e && (c.vendor = e), c
                                            }
                                        }
                                    }
                                }
                            }() || function () {
                                var e = s(/^@media *([^{]+)/);
                                if (e) {
                                    var t = r(e[1]);
                                    if (n()) {
                                        l();
                                        var a = i();
                                        if (o()) return {
                                            media: t,
                                            rules: a
                                        }
                                    }
                                }
                            }() || function () {
                                var e = s(/^@supports *([^{]+)/);
                                if (e) {
                                    var t = r(e[1]);
                                    if (n()) {
                                        l();
                                        var a = i();
                                        if (o()) return {
                                            supports: t,
                                            rules: a
                                        }
                                    }
                                }
                            }() || m("import") || m("charset") || m("namespace") || function () {
                                if (s(/^@page */)) {
                                    var e = u() || [],
                                        t = [];
                                    if (n()) {
                                        l();
                                        for (var r; r = f() || p();) t.push(r), l();
                                        if (o()) return {
                                            type: "page",
                                            selectors: e,
                                            declarations: t
                                        }
                                    }
                                }
                            }() || y());) n.push(t), l(n);
                        return n
                    }

                    function s(t) {
                        var n = t.exec(e);
                        if (n) return e = e.slice(n[0].length), n
                    }

                    function a() {
                        s(/^\s*/)
                    }

                    function l(e) {
                        e = e || [];
                        for (var t; t = c();) e.push(t);
                        return e
                    }

                    function c() {
                        if ("/" == e[0] && "*" == e[1]) {
                            for (var t = 2;
                                "*" != e[t] || "/" != e[t + 1];) ++t;
                            t += 2;
                            var n = e.slice(2, t - 2);
                            return e = e.slice(t), a(), {
                                comment: n
                            }
                        }
                    }

                    function u() {
                        var e = s(/^([^{]+)/);
                        if (e) return r(e[0]).split(/\s*,\s*/)
                    }

                    function f() {
                        var e = s(/^(\*?[\-\w]+)\s*/);
                        if (e && (e = e[0], s(/^:\s*/))) {
                            var t = s(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)\s*/);
                            if (t) return t = r(t[0]), s(/^[;\s]*/), {
                                property: e,
                                value: t
                            }
                        }
                    }

                    function h() {
                        for (var e, t = []; e = s(/^(from|to|\d+%|\.\d+%|\d+\.\d+%)\s*/);) t.push(e[1]), s(/^,\s*/);
                        return t.length ? {
                            values: t,
                            declarations: v()
                        } : void 0
                    }

                    function p() {
                        var e = s(/^@([a-z\-]+) */);
                        if (e) return {
                            type: e[1],
                            declarations: v()
                        }
                    }

                    function m(e) {
                        var t = s(new RegExp("^@" + e + " *([^;\\n]+);\\s*"));
                        if (t) {
                            var n = {};
                            return n[e] = r(t[1]), n
                        }
                    }

                    function v() {
                        var e = [];
                        if (n()) {
                            l();
                            for (var t; t = f();) e.push(t), l();
                            if (o()) return e
                        }
                    }

                    function y() {
                        var e = u();
                        if (e) return l(), {
                            selectors: e,
                            declarations: v()
                        }
                    }
                    return t && d._cache[t] ? d._cache[t] : (e = e.replace(/\/\*[\s\S]*?\*\//g, ""), d._cache[t] = i())
                },
                filter: function (e, t) {
                    function n(e, t) {
                        return e || t ? e ? e.concat(t) : [t] : void 0
                    }

                    function o(e) {
                        null == e.media && delete e.media, null == e.supports && delete e.supports, l.push(e)
                    }

                    function i(e, t) {
                        for (var n, o, i, s, a = /\*/, l = 0; n = t[l++];)
                            if (o = n.split(":"), i = new RegExp("^" + r(o[0]).replace(a, ".*") + "$"), s = new RegExp("^" + r(o[1]).replace(a, ".*") + "$"), i.test(e.property) && s.test(e.value)) return !0
                    }

                    function s(e, n, r) {
                        return t.selectors && function (e, t) {
                            if (t)
                                for (var n = t.length; n--;)
                                    if (e.indexOf(t[n]) >= 0) return !0
                        }(e.selectors.join(","), t.selectors) ? (o({
                            media: n,
                            supports: r,
                            selectors: e.selectors,
                            declarations: e.declarations
                        }), !0) : void 0
                    }

                    function a(e, n, r) {
                        if (t.declarations)
                            for (var s, a = 0; s = e.declarations[a++];)
                                if (i(s, t.declarations)) return o({
                                    media: n,
                                    supports: r,
                                    selectors: e.selectors,
                                    declarations: e.declarations
                                }), !0
                    }
                    var l = [];
                    return function e(t, r, o) {
                        for (var i, l = 0; i = t[l++];) i.declarations ? s(i, r, o) || a(i, r, o) : i.rules && i.media ? e(i.rules, n(r, i.media), o) : i.rules && i.supports && e(i.rules, r, n(o, i.supports))
                    }(e), l
                }
            },
            h = function () {
                function n() {
                    if (o) return o;
                    var e = t.documentElement,
                        n = t.body,
                        r = e.style.fontSize,
                        i = n.style.fontSize,
                        s = t.createElement("div");
                    return e.style.fontSize = "1em", n.style.fontSize = "1em", n.appendChild(s), s.style.width = "1em", s.style.position = "absolute", o = s.offsetWidth, n.removeChild(s), n.style.fontSize = i, e.style.fontSize = r, o
                }

                function r(t) {
                    return e.matchMedia(t)
                }
                var o, i, s = /\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
                    a = /\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/;
                return {
                    matchMedia: function (e) {
                        return u.matchMedia ? r(e) : function (e) {
                            var r, o, l = !1;
                            return i = t.documentElement.clientWidth, s.test(e) && (r = "em" === RegExp.$2 ? parseFloat(RegExp.$1) * n() : parseFloat(RegExp.$1)), a.test(e) && (o = "em" === RegExp.$2 ? parseFloat(RegExp.$1) * n() : parseFloat(RegExp.$1)), r && o ? l = i >= r && o >= i : (r && i >= r && (l = !0), o && o >= i && (l = !0)), {
                                matches: l,
                                media: e
                            }
                        }(e)
                    },
                    clearCache: function () {
                        u.nativeMatchMedia || (i = null, {})
                    }
                }
            }(),
            p = function () {
                var t = function () {
                        var e = [];
                        return {
                            add: function (t, n, r) {
                                for (var o, i = 0; o = e[i++];)
                                    if (o.polyfill == t && o.mql === n && o.fn === r) return !1;
                                n.addListener(r), e.push({
                                    polyfill: t,
                                    mql: n,
                                    fn: r
                                })
                            },
                            remove: function (t) {
                                for (var n, r = 0; n = e[r++];) n.polyfill === t && (n.mql.removeListener(n.fn), e.splice(--r, 1))
                            }
                        }
                    }(),
                    n = function (t) {
                        function n() {
                            for (var e, n = 0; e = t[n++];) e.fn()
                        }
                        return {
                            add: function (r, o) {
                                t.length || (e.addEventListener ? e.addEventListener("resize", n, !1) : e.attachEvent("onresize", n)), t.push({
                                    polyfill: r,
                                    fn: o
                                })
                            },
                            remove: function (r) {
                                for (var o, i = 0; o = t[i++];) o.polyfill === r && t.splice(--i, 1);
                                t.length || (e.removeEventListener ? e.removeEventListener("resize", n, !1) : e.detachEvent && e.detachEvent("onresize", n))
                            }
                        }
                    }([]);
                return {
                    removeListeners: function (e) {
                        u.nativeMatchMedia ? t.remove(e) : n.remove(e)
                    },
                    addListeners: function (e, r) {
                        function o(e, t) {
                            var n, o = {};
                            for (n in h.clearCache(), t) t.hasOwnProperty(n) && (o[n] = h.matchMedia(n).matches, o[n] != s[n] && r.call(e, n, h.matchMedia(n).matches));
                            s = o
                        }
                        var i = e._mediaQueryMap,
                            s = {};
                        ! function () {
                            for (var e in i) i.hasOwnProperty(e) && (s[e] = h.matchMedia(e).matches)
                        }(),
                        function () {
                            if (u.nativeMatchMedia)
                                for (var s in i) i.hasOwnProperty(s) && function (n, o) {
                                    t.add(e, n, function () {
                                        r.call(e, o, n.matches)
                                    })
                                }(i[s], s);
                            else {
                                var a = function (e, t) {
                                    var n;
                                    return function () {
                                        clearTimeout(n), n = setTimeout(e, t)
                                    }
                                }(function (e, t) {
                                    return function () {
                                        o(e, t)
                                    }
                                }(e, i), e._options.debounceTimeout || 100);
                                n.add(e, a)
                            }
                        }()
                    }
                }
            }();
        i.prototype.each = function (e, t) {
            var n, r = 0;
            for (t || (t = this); n = this._rules[r++];) e.call(t, n)
        }, i.prototype.size = function () {
            return this._rules.length
        }, i.prototype.at = function (e) {
            return this._rules[e]
        }, s.prototype.getDeclaration = function () {
            for (var e, t = {}, n = 0, r = this._rule.declarations; e = r[n++];) t[e.property] = e.value;
            return t
        }, s.prototype.getSelectors = function () {
            return this._rule.selectors.join(", ")
        }, s.prototype.getMedia = function () {
            return this._rule.media.join(" and ")
        }, a.prototype.doMatched = function (e) {
            return this._doMatched = e, this._resolve(), this
        }, a.prototype.undoUnmatched = function (e) {
            return this._undoUnmatched = e, this._resolve(), this
        }, a.prototype.getCurrentMatches = function () {
            for (var e, t, n = 0, r = []; e = this._filteredRules[n++];)(!(t = e.media && e.media.join(" and ")) || h.matchMedia(t).matches) && r.push(e);
            return new i(r)
        }, a.prototype.destroy = function () {
            this._undoUnmatched && (this._undoUnmatched(this.getCurrentMatches()), p.removeListeners(this))
        }, a.prototype._defer = function (e, t) {
            e.call(this) ? t.call(this) : this._promise.push({
                condition: e,
                callback: t
            })
        }, a.prototype._resolve = function () {
            for (var e, t = 0; e = this._promise[t];) e.condition.call(this) ? (this._promise.splice(t, 1), e.callback.call(this)) : t++
        }, a.prototype._getStylesheets = function () {
            var e, n, r, i, s, a, l, u = 0,
                f = [];
            if (this._options.include) {
                for (n = this._options.include; e = n[u++];)
                    if (r = t.getElementById(e)) {
                        if ("STYLE" === r.nodeName) {
                            l = {
                                text: r.textContent
                            }, f.push(l);
                            continue
                        }
                        if (r.media && "print" == r.media) continue;
                        if (!c(r.href)) continue;
                        l = {
                            href: r.href
                        }, r.media && (l.media = r.media), f.push(l)
                    }
            } else {
                for (n = this._options.exclude, i = t.getElementsByTagName("link"); r = i[u++];) r.rel && "stylesheet" == r.rel && "print" != r.media && c(r.href) && !o(r.id, n) && (l = {
                    href: r.href
                }, r.media && (l.media = r.media), f.push(l));
                for (a = t.getElementsByTagName("style"), u = 0; s = a[u++];) l = {
                    text: s.textContent
                }, f.push(l)
            }
            return this._stylesheets = f
        }, a.prototype._downloadStylesheets = function () {
            for (var e, t = this, n = [], r = 0; e = this._stylesheets[r++];) n.push(e.href);
            f.request(n, function (e) {
                for (var n, r = 0; n = e[r];) t._stylesheets[r++].text = n;
                t._resolve()
            })
        }, a.prototype._parseStylesheets = function () {
            this._defer(function () {
                return this._stylesheets && this._stylesheets.length && this._stylesheets[0].text
            }, function () {
                for (var e, t = 0; e = this._stylesheets[t++];) e.rules = d.parse(e.text, e.url)
            })
        }, a.prototype._filterCSSByKeywords = function () {
            this._defer(function () {
                return this._stylesheets && this._stylesheets.length && this._stylesheets[0].rules
            }, function () {
                for (var e, t, n = [], r = 0; e = this._stylesheets[r++];)(t = e.media) && "all" != t && "screen" != t ? n.push({
                    rules: e.rules,
                    media: e.media
                }) : n = n.concat(e.rules);
                this._filteredRules = d.filter(n, this._options.keywords)
            })
        }, a.prototype._buildMediaQueryMap = function () {
            this._defer(function () {
                return this._filteredRules
            }, function () {
                var e, t, n = 0;
                for (this._mediaQueryMap = {}; t = this._filteredRules[n++];) t.media && (e = t.media.join(" and "), this._mediaQueryMap[e] = h.matchMedia(e))
            })
        }, a.prototype._reportInitialMatches = function () {
            this._defer(function () {
                return this._filteredRules && this._doMatched
            }, function () {
                this._doMatched(this.getCurrentMatches())
            })
        }, a.prototype._addMediaListeners = function () {
            this._defer(function () {
                return this._filteredRules && this._doMatched && this._undoUnmatched
            }, function () {
                p.addListeners(this, function (e, t) {
                    for (var n, r = 0, o = [], s = []; n = this._filteredRules[r++];) n.media && n.media.join(" and ") == e && (t ? o : s).push(n);
                    o.length && this._doMatched(new i(o)), s.length && this._undoUnmatched(new i(s))
                })
            })
        }, a.modules = {
            DownloadManager: f,
            StyleManager: d,
            MediaManager: h,
            EventManager: p
        }, a.constructors = {
            Ruleset: i,
            Rule: s
        }, e.Polyfill = a
    }(window, document);
    const e = "none",
        t = "start",
        n = "end",
        r = "center",
        o = /(\d+)(px|vh|vw|%)/g,
        i = .18,
        s = 350;

    function a(t) {
        t.each(t => {
            const n = document.querySelectorAll(t.getSelectors()),
                r = t.getDeclaration();
            [].forEach.call(n, t => {
                ! function (t, n) {
                    if (void 0 !== n["scroll-snap-align"]) return t.scrollSnapAlignment = function (t) {
                            const {
                                "scroll-snap-align": n
                            } = t;
                            let r = e,
                                o = e;
                            if (void 0 !== n) {
                                const e = n.split(" ");
                                r = e[0], o = e.length > 1 ? e[1] : r
                            }
                            return {
                                x: r,
                                y: o
                            }
                        }(n),
                        function (e) {
                            for (var t = e; e && e !== document; e = e.parentNode) void 0 !== e.snapElements && e.snapElements.push(t)
                        }(t);
                    const r = t.tagName;
                    "body" != r.toLowerCase() && "html" != r.toLowerCase() || (t = document);
                    t.addEventListener("scroll", p, !1), t.scrollPadding = function (e) {
                        const {
                            "scroll-padding": t,
                            "scroll-padding-top": n,
                            "scroll-padding-right": r,
                            "scroll-padding-bottom": o,
                            "scroll-padding-left": i
                        } = e;
                        let s = {
                                value: 0,
                                unit: "px"
                            },
                            a = {
                                value: 0,
                                unit: "px"
                            },
                            l = {
                                value: 0,
                                unit: "px"
                            },
                            u = {
                                value: 0,
                                unit: "px"
                            };
                        if (void 0 !== t) {
                            const e = t.split(" ");
                            e.forEach((e, t) => {
                                const n = c(e);
                                switch (t) {
                                    case 0:
                                        s = n, a = n, l = n, u = n;
                                        break;
                                    case 1:
                                        a = n, u = n;
                                        break;
                                    case 2:
                                        l = n;
                                        break;
                                    case 3:
                                        u = n
                                }
                            })
                        }
                        void 0 !== n && (s = c(n));
                        void 0 !== r && (a = c(r));
                        void 0 !== o && (l = c(o));
                        void 0 !== i && (u = c(i));
                        return {
                            top: s,
                            right: a,
                            bottom: l,
                            left: u
                        }
                    }(n), t.snapElements = []
                }(t, r)
            })
        })
    }

    function l(e) {
        e.each(e => {
            const t = document.querySelectorAll(e.getSelectors());
            [].forEach.call(t, e => {
                ! function (e) {
                    const t = e.tagName;
                    "body" != t.toLowerCase() && "html" != t.toLowerCase() || (e = document);
                    document.removeEventListener("scroll", p, !1), e.removeEventListener("scroll", p, !1), e.snapLengthUnit = null, e.snapElements = []
                }(e)
            })
        })
    }

    function c(e) {
        const t = o.exec(e);
        if (null === t) return {
            value: 0,
            unit: "px"
        };
        const [n, r, i] = t;
        return {
            value: parseInt(r, 10),
            unit: i
        }
    }
    let u, f, d = null,
        h = null,
        p = function (e) {
            u = e.target, f = function (e) {
                if (e == document || e == window) return document.documentElement.scrollTop > 0 || document.documentElement.scrollLeft > 0 ? document.documentElement : document.querySelector("body");
                return e
            }(u), N && (cancelAnimationFrame(N) || clearTimeout(N)), d ? clearTimeout(d) : h = {
                y: f.scrollTop,
                x: f.scrollLeft
            }, d = setTimeout(m, 45)
        },
        m = function () {
            if (h.y == f.scrollTop && h.x == f.scrollLeft) return;
            let e, t = {
                y: h.y - f.scrollTop > 0 ? -1 : 1,
                x: h.x - f.scrollLeft > 0 ? -1 : 1
            };
            void 0 !== f.snapElements && f.snapElements.length > 0 && (e = function (e, t, n) {
                var r = t.snapElements.length,
                    o = e.scrollTop,
                    s = e.scrollLeft,
                    a = Math.min(n.y, n.x),
                    l = {
                        y: 0,
                        x: 0
                    };
                const {
                    top: c,
                    right: u,
                    bottom: f,
                    left: d
                } = e.scrollPadding, h = _(n, g(c.value, c.unit, e)), p = (_(n, g(u.value, u.unit, e)), _(n, g(f.value, f.unit, e)), _(n, g(d.value, d.unit, e)));

                function m(e, t) {
                    return 0 === y || y === r - 1 ? e : e - t
                }
                if (s > 0 && s + C(e) === S(e) || o > 0 && o + L(e) === w(e)) {
                    y = r - 1;
                    const o = t.snapElements[y],
                        i = {
                            x: R(o) - R(e) + E(o, o.scrollSnapAlignment.x, n),
                            y: T(o) - T(e) + M(o, o.scrollSnapAlignment.y, n)
                        };
                    return o.snapCoords = i, {
                        y: x(0, w(e), i.y),
                        x: x(0, S(e), i.x)
                    }
                }
                const A = t.snapElements[y],
                    b = {
                        x: 0 === y ? 0 : R(A) - R(e) + E(A, A.scrollSnapAlignment.x, n) - E(e, A.scrollSnapAlignment.x, n),
                        y: 0 === y ? 0 : T(A) - T(e) + M(A, A.scrollSnapAlignment.y, n) - M(e, A.scrollSnapAlignment.y, n)
                    };
                A.snapCoords = b;
                const N = b.x + n.x * C(A) * i,
                    z = b.y + n.y * L(A) * i;
                for (var k = y + a; k < r && k >= 0 && (v = t.snapElements[k], l = {
                        y: 0 === k ? 0 : T(v) - T(e) + M(v, v.scrollSnapAlignment.y, n) - M(e, v.scrollSnapAlignment.y, n),
                        x: 0 === k ? 0 : R(v) - R(e) + E(v, v.scrollSnapAlignment.x, n) - E(e, v.scrollSnapAlignment.x, n)
                    }, v.snapCoords = l, !(1 === n.x ? s < N : s > N) || !(1 === n.y ? o < z : o > z)); k += a) {
                    const t = l.x + n.x * C(v) * i,
                        r = l.y + n.y * L(v) * i;
                    if (!(1 === n.x ? s > t : s < t) && !(1 === n.y ? o > r : o < r)) return y = k, {
                        y: x(0, w(e), m(l.y, h)),
                        x: x(0, S(e), m(l.x, p))
                    }
                }
                if (1 == a && k === r - 1) return y = r - 1, {
                    y: x(0, w(e), l.y),
                    x: x(0, S(e), l.x)
                };
                if (-1 == a && 0 === k) return y = 0, {
                    y: x(0, w(e), l.y),
                    x: x(0, S(e), l.x)
                };
                return {
                    y: x(0, w(e), m(t.snapElements[y].snapCoords.y, h)),
                    x: x(0, S(e), m(t.snapElements[y].snapCoords.x, p))
                }
            }(f, u, t)), u.removeEventListener("scroll", p, !1), z(f, e, function () {
                u.addEventListener("scroll", p, !1)
            }), isNaN(e.x) && isNaN(e.y) || (h = e)
        };
    var v = null,
        y = 0;

    function g(e, t, n) {
        return t && "vw" === t.toLowerCase() ? C(document.documentElement) * (e / 100) : t && "vh" === t.toLowerCase() ? L(document.documentElement) * (e / 100) : t && "%" === t ? C(n) * (e / 100) : e
    }

    function _(e, t) {
        return -1 === e ? Math.floor(t) : Math.ceil(t)
    }

    function x(e, t, n) {
        return Math.max(Math.min(n, t), e)
    }

    function M(e, o, i) {
        return o === t ? 0 : o === n ? L(e) : o === r ? _(i, L(e) / 2) : 0
    }

    function E(e, o, i) {
        return o === t ? 0 : o === n ? C(e) : o === r ? _(i, C(e) / 2) : 0
    }

    function w(e) {
        return e.scrollHeight
    }

    function S(e) {
        return e.scrollWidth
    }

    function L(e) {
        return e.offsetHeight
    }

    function C(e) {
        return e.offsetWidth
    }

    function R(e) {
        return e.offsetLeft + e.clientLeft
    }

    function T(e) {
        return e.offsetTop + e.clientTop
    }

    function A(e, t) {
        var n = Math.abs(e - t),
            r = 100 / Math.max(document.documentElement.clientHeight, window.innerHeight || 1) * n,
            o = 100 / s * r;
        return isNaN(o) ? 0 : Math.max(s / 1.5, Math.min(o, s))
    }
    var b = function (e, t, n, r) {
            return n > r ? t : e + (t - e) * ((o = n / r) * o * o);
            var o
        },
        N = null,
        z = function (e, t, n) {
            var r = {
                    y: e.scrollTop,
                    x: e.scrollLeft
                },
                o = Date.now(),
                i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (e) {
                    window.setTimeout(e, 15)
                },
                s = Math.max(A(r.y, t.y), A(r.x, t.x)),
                a = function () {
                    var l = Date.now() - o;
                    if (isNaN(t.y) || (e.scrollTop = b(r.y, t.y, l, s)), isNaN(t.x) || (e.scrollLeft = b(r.x, t.x, l, s)), l > s) return "function" == typeof n ? n(t) : void 0;
                    N = i(a)
                };
            a()
        };
    return () => {
        "scrollSnapAlign" in document.documentElement.style || "webkitScrollSnapAlign" in document.documentElement.style || "msScrollSnapAlign" in document.documentElement.style || Polyfill({
            declarations: ["scroll-snap-type:*", "scroll-snap-align:*", "scroll-snap-padding:*"]
        }).doMatched(a).undoUnmatched(l)
    }
});
cssScrollSnapPolyfill()
