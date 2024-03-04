var me = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: !0,
  timelineOffset: 0
}, G = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
}, je = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], W = {
  CSS: {},
  springs: {}
};
function k(e, r, n) {
  return Math.min(Math.max(e, r), n);
}
function H(e, r) {
  return e.indexOf(r) > -1;
}
function _(e, r) {
  return e.apply(null, r);
}
var f = {
  arr: function(e) {
    return Array.isArray(e);
  },
  obj: function(e) {
    return H(Object.prototype.toString.call(e), "Object");
  },
  pth: function(e) {
    return f.obj(e) && e.hasOwnProperty("totalLength");
  },
  svg: function(e) {
    return e instanceof SVGElement;
  },
  inp: function(e) {
    return e instanceof HTMLInputElement;
  },
  dom: function(e) {
    return e.nodeType || f.svg(e);
  },
  str: function(e) {
    return typeof e == "string";
  },
  fnc: function(e) {
    return typeof e == "function";
  },
  und: function(e) {
    return typeof e > "u";
  },
  nil: function(e) {
    return f.und(e) || e === null;
  },
  hex: function(e) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
  },
  rgb: function(e) {
    return /^rgb/.test(e);
  },
  hsl: function(e) {
    return /^hsl/.test(e);
  },
  col: function(e) {
    return f.hex(e) || f.rgb(e) || f.hsl(e);
  },
  key: function(e) {
    return !me.hasOwnProperty(e) && !G.hasOwnProperty(e) && e !== "targets" && e !== "keyframes";
  }
};
function ye(e) {
  var r = /\(([^)]+)\)/.exec(e);
  return r ? r[1].split(",").map(function(n) {
    return parseFloat(n);
  }) : [];
}
function xe(e, r) {
  var n = ye(e), t = k(f.und(n[0]) ? 1 : n[0], 0.1, 100), i = k(f.und(n[1]) ? 100 : n[1], 0.1, 100), o = k(f.und(n[2]) ? 10 : n[2], 0.1, 100), u = k(f.und(n[3]) ? 0 : n[3], 0.1, 100), s = Math.sqrt(i / t), a = o / (2 * Math.sqrt(i * t)), p = a < 1 ? s * Math.sqrt(1 - a * a) : 0, c = 1, l = a < 1 ? (a * s + -u) / p : -u + s;
  function h(m) {
    var v = r ? r * m / 1e3 : m;
    return a < 1 ? v = Math.exp(-v * a * s) * (c * Math.cos(p * v) + l * Math.sin(p * v)) : v = (c + l * v) * Math.exp(-v * s), m === 0 || m === 1 ? m : 1 - v;
  }
  function C() {
    var m = W.springs[e];
    if (m)
      return m;
    for (var v = 1 / 6, x = 0, b = 0; ; )
      if (x += v, h(x) === 1) {
        if (b++, b >= 16)
          break;
      } else
        b = 0;
    var g = x * v * 1e3;
    return W.springs[e] = g, g;
  }
  return r ? h : C;
}
function Ve(e) {
  return e === void 0 && (e = 10), function(r) {
    return Math.ceil(k(r, 1e-6, 1) * e) * (1 / e);
  };
}
var ze = function() {
  var e = 11, r = 1 / (e - 1);
  function n(c, l) {
    return 1 - 3 * l + 3 * c;
  }
  function t(c, l) {
    return 3 * l - 6 * c;
  }
  function i(c) {
    return 3 * c;
  }
  function o(c, l, h) {
    return ((n(l, h) * c + t(l, h)) * c + i(l)) * c;
  }
  function u(c, l, h) {
    return 3 * n(l, h) * c * c + 2 * t(l, h) * c + i(l);
  }
  function s(c, l, h, C, m) {
    var v, x, b = 0;
    do
      x = l + (h - l) / 2, v = o(x, C, m) - c, v > 0 ? h = x : l = x;
    while (Math.abs(v) > 1e-7 && ++b < 10);
    return x;
  }
  function a(c, l, h, C) {
    for (var m = 0; m < 4; ++m) {
      var v = u(l, h, C);
      if (v === 0)
        return l;
      var x = o(l, h, C) - c;
      l -= x / v;
    }
    return l;
  }
  function p(c, l, h, C) {
    if (!(0 <= c && c <= 1 && 0 <= h && h <= 1))
      return;
    var m = new Float32Array(e);
    if (c !== l || h !== C)
      for (var v = 0; v < e; ++v)
        m[v] = o(v * r, c, h);
    function x(b) {
      for (var g = 0, d = 1, T = e - 1; d !== T && m[d] <= b; ++d)
        g += r;
      --d;
      var S = (b - m[d]) / (m[d + 1] - m[d]), w = g + S * r, B = u(w, c, h);
      return B >= 1e-3 ? a(b, w, c, h) : B === 0 ? w : s(b, g, g + r, c, h);
    }
    return function(b) {
      return c === l && h === C || b === 0 || b === 1 ? b : o(x(b), l, C);
    };
  }
  return p;
}(), we = function() {
  var e = { linear: function() {
    return function(t) {
      return t;
    };
  } }, r = {
    Sine: function() {
      return function(t) {
        return 1 - Math.cos(t * Math.PI / 2);
      };
    },
    Expo: function() {
      return function(t) {
        return t ? Math.pow(2, 10 * t - 10) : 0;
      };
    },
    Circ: function() {
      return function(t) {
        return 1 - Math.sqrt(1 - t * t);
      };
    },
    Back: function() {
      return function(t) {
        return t * t * (3 * t - 2);
      };
    },
    Bounce: function() {
      return function(t) {
        for (var i, o = 4; t < ((i = Math.pow(2, --o)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - o) - 7.5625 * Math.pow((i * 3 - 2) / 22 - t, 2);
      };
    },
    Elastic: function(t, i) {
      t === void 0 && (t = 1), i === void 0 && (i = 0.5);
      var o = k(t, 1, 10), u = k(i, 0.1, 2);
      return function(s) {
        return s === 0 || s === 1 ? s : -o * Math.pow(2, 10 * (s - 1)) * Math.sin((s - 1 - u / (Math.PI * 2) * Math.asin(1 / o)) * (Math.PI * 2) / u);
      };
    }
  }, n = ["Quad", "Cubic", "Quart", "Quint"];
  return n.forEach(function(t, i) {
    r[t] = function() {
      return function(o) {
        return Math.pow(o, i + 2);
      };
    };
  }), Object.keys(r).forEach(function(t) {
    var i = r[t];
    e["easeIn" + t] = i, e["easeOut" + t] = function(o, u) {
      return function(s) {
        return 1 - i(o, u)(1 - s);
      };
    }, e["easeInOut" + t] = function(o, u) {
      return function(s) {
        return s < 0.5 ? i(o, u)(s * 2) / 2 : 1 - i(o, u)(s * -2 + 2) / 2;
      };
    }, e["easeOutIn" + t] = function(o, u) {
      return function(s) {
        return s < 0.5 ? (1 - i(o, u)(1 - s * 2)) / 2 : (i(o, u)(s * 2 - 1) + 1) / 2;
      };
    };
  }), e;
}();
function X(e, r) {
  if (f.fnc(e))
    return e;
  var n = e.split("(")[0], t = we[n], i = ye(e);
  switch (n) {
    case "spring":
      return xe(e, r);
    case "cubicBezier":
      return _(ze, i);
    case "steps":
      return _(Ve, i);
    default:
      return _(t, i);
  }
}
function be(e) {
  try {
    var r = document.querySelectorAll(e);
    return r;
  } catch {
    return;
  }
}
function N(e, r) {
  for (var n = e.length, t = arguments.length >= 2 ? arguments[1] : void 0, i = [], o = 0; o < n; o++)
    if (o in e) {
      var u = e[o];
      r.call(t, u, o, e) && i.push(u);
    }
  return i;
}
function q(e) {
  return e.reduce(function(r, n) {
    return r.concat(f.arr(n) ? q(n) : n);
  }, []);
}
function ve(e) {
  return f.arr(e) ? e : (f.str(e) && (e = be(e) || e), e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e]);
}
function ee(e, r) {
  return e.some(function(n) {
    return n === r;
  });
}
function re(e) {
  var r = {};
  for (var n in e)
    r[n] = e[n];
  return r;
}
function J(e, r) {
  var n = re(e);
  for (var t in e)
    n[t] = r.hasOwnProperty(t) ? r[t] : e[t];
  return n;
}
function Z(e, r) {
  var n = re(e);
  for (var t in r)
    n[t] = f.und(e[t]) ? r[t] : e[t];
  return n;
}
function Re(e) {
  var r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);
  return r ? "rgba(" + r[1] + ",1)" : e;
}
function He(e) {
  var r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = e.replace(r, function(s, a, p, c) {
    return a + a + p + p + c + c;
  }), t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n), i = parseInt(t[1], 16), o = parseInt(t[2], 16), u = parseInt(t[3], 16);
  return "rgba(" + i + "," + o + "," + u + ",1)";
}
function Ue(e) {
  var r = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e), n = parseInt(r[1], 10) / 360, t = parseInt(r[2], 10) / 100, i = parseInt(r[3], 10) / 100, o = r[4] || 1;
  function u(h, C, m) {
    return m < 0 && (m += 1), m > 1 && (m -= 1), m < 1 / 6 ? h + (C - h) * 6 * m : m < 1 / 2 ? C : m < 2 / 3 ? h + (C - h) * (2 / 3 - m) * 6 : h;
  }
  var s, a, p;
  if (t == 0)
    s = a = p = i;
  else {
    var c = i < 0.5 ? i * (1 + t) : i + t - i * t, l = 2 * i - c;
    s = u(l, c, n + 1 / 3), a = u(l, c, n), p = u(l, c, n - 1 / 3);
  }
  return "rgba(" + s * 255 + "," + a * 255 + "," + p * 255 + "," + o + ")";
}
function We(e) {
  if (f.rgb(e))
    return Re(e);
  if (f.hex(e))
    return He(e);
  if (f.hsl(e))
    return Ue(e);
}
function O(e) {
  var r = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);
  if (r)
    return r[1];
}
function Ne(e) {
  if (H(e, "translate") || e === "perspective")
    return "px";
  if (H(e, "rotate") || H(e, "skew"))
    return "deg";
}
function Y(e, r) {
  return f.fnc(e) ? e(r.target, r.id, r.total) : e;
}
function P(e, r) {
  return e.getAttribute(r);
}
function ne(e, r, n) {
  var t = O(r);
  if (ee([n, "deg", "rad", "turn"], t))
    return r;
  var i = W.CSS[r + n];
  if (!f.und(i))
    return i;
  var o = 100, u = document.createElement(e.tagName), s = e.parentNode && e.parentNode !== document ? e.parentNode : document.body;
  s.appendChild(u), u.style.position = "absolute", u.style.width = o + n;
  var a = o / u.offsetWidth;
  s.removeChild(u);
  var p = a * parseFloat(r);
  return W.CSS[r + n] = p, p;
}
function Me(e, r, n) {
  if (r in e.style) {
    var t = r.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), i = e.style[r] || getComputedStyle(e).getPropertyValue(t) || "0";
    return n ? ne(e, i, n) : i;
  }
}
function te(e, r) {
  if (f.dom(e) && !f.inp(e) && (!f.nil(P(e, r)) || f.svg(e) && e[r]))
    return "attribute";
  if (f.dom(e) && ee(je, r))
    return "transform";
  if (f.dom(e) && r !== "transform" && Me(e, r))
    return "css";
  if (e[r] != null)
    return "object";
}
function Ce(e) {
  if (f.dom(e)) {
    for (var r = e.style.transform || "", n = /(\w+)\(([^)]*)\)/g, t = /* @__PURE__ */ new Map(), i; i = n.exec(r); )
      t.set(i[1], i[2]);
    return t;
  }
}
function qe(e, r, n, t) {
  var i = H(r, "scale") ? 1 : 0 + Ne(r), o = Ce(e).get(r) || i;
  return n && (n.transforms.list.set(r, o), n.transforms.last = r), t ? ne(e, o, t) : o;
}
function ie(e, r, n, t) {
  switch (te(e, r)) {
    case "transform":
      return qe(e, r, t, n);
    case "css":
      return Me(e, r, n);
    case "attribute":
      return P(e, r);
    default:
      return e[r] || 0;
  }
}
function ae(e, r) {
  var n = /^(\*=|\+=|-=)/.exec(e);
  if (!n)
    return e;
  var t = O(e) || 0, i = parseFloat(r), o = parseFloat(e.replace(n[0], ""));
  switch (n[0][0]) {
    case "+":
      return i + o + t;
    case "-":
      return i - o + t;
    case "*":
      return i * o + t;
  }
}
function Te(e, r) {
  if (f.col(e))
    return We(e);
  if (/\s/g.test(e))
    return e;
  var n = O(e), t = n ? e.substr(0, e.length - n.length) : e;
  return r ? t + r : t;
}
function oe(e, r) {
  return Math.sqrt(Math.pow(r.x - e.x, 2) + Math.pow(r.y - e.y, 2));
}
function Ze(e) {
  return Math.PI * 2 * P(e, "r");
}
function $e(e) {
  return P(e, "width") * 2 + P(e, "height") * 2;
}
function Qe(e) {
  return oe(
    { x: P(e, "x1"), y: P(e, "y1") },
    { x: P(e, "x2"), y: P(e, "y2") }
  );
}
function Ee(e) {
  for (var r = e.points, n = 0, t, i = 0; i < r.numberOfItems; i++) {
    var o = r.getItem(i);
    i > 0 && (n += oe(t, o)), t = o;
  }
  return n;
}
function Ke(e) {
  var r = e.points;
  return Ee(e) + oe(r.getItem(r.numberOfItems - 1), r.getItem(0));
}
function Ie(e) {
  if (e.getTotalLength)
    return e.getTotalLength();
  switch (e.tagName.toLowerCase()) {
    case "circle":
      return Ze(e);
    case "rect":
      return $e(e);
    case "line":
      return Qe(e);
    case "polyline":
      return Ee(e);
    case "polygon":
      return Ke(e);
  }
}
function _e(e) {
  var r = Ie(e);
  return e.setAttribute("stroke-dasharray", r), r;
}
function Je(e) {
  for (var r = e.parentNode; f.svg(r) && f.svg(r.parentNode); )
    r = r.parentNode;
  return r;
}
function ke(e, r) {
  var n = r || {}, t = n.el || Je(e), i = t.getBoundingClientRect(), o = P(t, "viewBox"), u = i.width, s = i.height, a = n.viewBox || (o ? o.split(" ") : [0, 0, u, s]);
  return {
    el: t,
    viewBox: a,
    x: a[0] / 1,
    y: a[1] / 1,
    w: u,
    h: s,
    vW: a[2],
    vH: a[3]
  };
}
function Ye(e, r) {
  var n = f.str(e) ? be(e)[0] : e, t = r || 100;
  return function(i) {
    return {
      property: i,
      el: n,
      svg: ke(n),
      totalLength: Ie(n) * (t / 100)
    };
  };
}
function Ge(e, r, n) {
  function t(c) {
    c === void 0 && (c = 0);
    var l = r + c >= 1 ? r + c : 0;
    return e.el.getPointAtLength(l);
  }
  var i = ke(e.el, e.svg), o = t(), u = t(-1), s = t(1), a = n ? 1 : i.w / i.vW, p = n ? 1 : i.h / i.vH;
  switch (e.property) {
    case "x":
      return (o.x - i.x) * a;
    case "y":
      return (o.y - i.y) * p;
    case "angle":
      return Math.atan2(s.y - u.y, s.x - u.x) * 180 / Math.PI;
  }
}
function de(e, r) {
  var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, t = Te(f.pth(e) ? e.totalLength : e, r) + "";
  return {
    original: t,
    numbers: t.match(n) ? t.match(n).map(Number) : [0],
    strings: f.str(e) || r ? t.split(n) : []
  };
}
function ue(e) {
  var r = e ? q(f.arr(e) ? e.map(ve) : ve(e)) : [];
  return N(r, function(n, t, i) {
    return i.indexOf(n) === t;
  });
}
function Pe(e) {
  var r = ue(e);
  return r.map(function(n, t) {
    return { target: n, id: t, total: r.length, transforms: { list: Ce(n) } };
  });
}
function Xe(e, r) {
  var n = re(r);
  if (/^spring/.test(n.easing) && (n.duration = xe(n.easing)), f.arr(e)) {
    var t = e.length, i = t === 2 && !f.obj(e[0]);
    i ? e = { value: e } : f.fnc(r.duration) || (n.duration = r.duration / t);
  }
  var o = f.arr(e) ? e : [e];
  return o.map(function(u, s) {
    var a = f.obj(u) && !f.pth(u) ? u : { value: u };
    return f.und(a.delay) && (a.delay = s ? 0 : r.delay), f.und(a.endDelay) && (a.endDelay = s === o.length - 1 ? r.endDelay : 0), a;
  }).map(function(u) {
    return Z(u, n);
  });
}
function er(e) {
  for (var r = N(q(e.map(function(o) {
    return Object.keys(o);
  })), function(o) {
    return f.key(o);
  }).reduce(function(o, u) {
    return o.indexOf(u) < 0 && o.push(u), o;
  }, []), n = {}, t = function(o) {
    var u = r[o];
    n[u] = e.map(function(s) {
      var a = {};
      for (var p in s)
        f.key(p) ? p == u && (a.value = s[p]) : a[p] = s[p];
      return a;
    });
  }, i = 0; i < r.length; i++)
    t(i);
  return n;
}
function rr(e, r) {
  var n = [], t = r.keyframes;
  t && (r = Z(er(t), r));
  for (var i in r)
    f.key(i) && n.push({
      name: i,
      tweens: Xe(r[i], e)
    });
  return n;
}
function nr(e, r) {
  var n = {};
  for (var t in e) {
    var i = Y(e[t], r);
    f.arr(i) && (i = i.map(function(o) {
      return Y(o, r);
    }), i.length === 1 && (i = i[0])), n[t] = i;
  }
  return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n;
}
function tr(e, r) {
  var n;
  return e.tweens.map(function(t) {
    var i = nr(t, r), o = i.value, u = f.arr(o) ? o[1] : o, s = O(u), a = ie(r.target, e.name, s, r), p = n ? n.to.original : a, c = f.arr(o) ? o[0] : p, l = O(c) || O(a), h = s || l;
    return f.und(u) && (u = p), i.from = de(c, h), i.to = de(ae(u, c), h), i.start = n ? n.end : 0, i.end = i.start + i.delay + i.duration + i.endDelay, i.easing = X(i.easing, i.duration), i.isPath = f.pth(o), i.isPathTargetInsideSVG = i.isPath && f.svg(r.target), i.isColor = f.col(i.from.original), i.isColor && (i.round = 1), n = i, i;
  });
}
var Oe = {
  css: function(e, r, n) {
    return e.style[r] = n;
  },
  attribute: function(e, r, n) {
    return e.setAttribute(r, n);
  },
  object: function(e, r, n) {
    return e[r] = n;
  },
  transform: function(e, r, n, t, i) {
    if (t.list.set(r, n), r === t.last || i) {
      var o = "";
      t.list.forEach(function(u, s) {
        o += s + "(" + u + ") ";
      }), e.style.transform = o;
    }
  }
};
function Se(e, r) {
  var n = Pe(e);
  n.forEach(function(t) {
    for (var i in r) {
      var o = Y(r[i], t), u = t.target, s = O(o), a = ie(u, i, s, t), p = s || O(a), c = ae(Te(o, p), a), l = te(u, i);
      Oe[l](u, i, c, t.transforms, !0);
    }
  });
}
function ir(e, r) {
  var n = te(e.target, r.name);
  if (n) {
    var t = tr(r, e), i = t[t.length - 1];
    return {
      type: n,
      property: r.name,
      animatable: e,
      tweens: t,
      duration: i.end,
      delay: t[0].delay,
      endDelay: i.endDelay
    };
  }
}
function ar(e, r) {
  return N(q(e.map(function(n) {
    return r.map(function(t) {
      return ir(n, t);
    });
  })), function(n) {
    return !f.und(n);
  });
}
function De(e, r) {
  var n = e.length, t = function(o) {
    return o.timelineOffset ? o.timelineOffset : 0;
  }, i = {};
  return i.duration = n ? Math.max.apply(Math, e.map(function(o) {
    return t(o) + o.duration;
  })) : r.duration, i.delay = n ? Math.min.apply(Math, e.map(function(o) {
    return t(o) + o.delay;
  })) : r.delay, i.endDelay = n ? i.duration - Math.max.apply(Math, e.map(function(o) {
    return t(o) + o.duration - o.endDelay;
  })) : r.endDelay, i;
}
var ge = 0;
function or(e) {
  var r = J(me, e), n = J(G, e), t = rr(n, e), i = Pe(e.targets), o = ar(i, t), u = De(o, n), s = ge;
  return ge++, Z(r, {
    id: s,
    children: [],
    animatables: i,
    animations: o,
    duration: u.duration,
    delay: u.delay,
    endDelay: u.endDelay
  });
}
var I = [], Be = function() {
  var e;
  function r() {
    !e && (!he() || !y.suspendWhenDocumentHidden) && I.length > 0 && (e = requestAnimationFrame(n));
  }
  function n(i) {
    for (var o = I.length, u = 0; u < o; ) {
      var s = I[u];
      s.paused ? (I.splice(u, 1), o--) : (s.tick(i), u++);
    }
    e = u > 0 ? requestAnimationFrame(n) : void 0;
  }
  function t() {
    y.suspendWhenDocumentHidden && (he() ? e = cancelAnimationFrame(e) : (I.forEach(
      function(i) {
        return i._onDocumentVisibility();
      }
    ), Be()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", t), r;
}();
function he() {
  return !!document && document.hidden;
}
function y(e) {
  e === void 0 && (e = {});
  var r = 0, n = 0, t = 0, i, o = 0, u = null;
  function s(g) {
    var d = window.Promise && new Promise(function(T) {
      return u = T;
    });
    return g.finished = d, d;
  }
  var a = or(e);
  s(a);
  function p() {
    var g = a.direction;
    g !== "alternate" && (a.direction = g !== "normal" ? "normal" : "reverse"), a.reversed = !a.reversed, i.forEach(function(d) {
      return d.reversed = a.reversed;
    });
  }
  function c(g) {
    return a.reversed ? a.duration - g : g;
  }
  function l() {
    r = 0, n = c(a.currentTime) * (1 / y.speed);
  }
  function h(g, d) {
    d && d.seek(g - d.timelineOffset);
  }
  function C(g) {
    if (a.reversePlayback)
      for (var T = o; T--; )
        h(g, i[T]);
    else
      for (var d = 0; d < o; d++)
        h(g, i[d]);
  }
  function m(g) {
    for (var d = 0, T = a.animations, S = T.length; d < S; ) {
      var w = T[d], B = w.animatable, j = w.tweens, L = j.length - 1, M = j[L];
      L && (M = N(j, function(Fe) {
        return g < Fe.end;
      })[0] || M);
      for (var A = k(g - M.start - M.delay, 0, M.duration) / M.duration, U = isNaN(A) ? 1 : M.easing(A), E = M.to.strings, $ = M.round, Q = [], Ae = M.to.numbers.length, F = void 0, V = 0; V < Ae; V++) {
        var z = void 0, se = M.to.numbers[V], ce = M.from.numbers[V] || 0;
        M.isPath ? z = Ge(M.value, U * se, M.isPathTargetInsideSVG) : z = ce + U * (se - ce), $ && (M.isColor && V > 2 || (z = Math.round(z * $) / $)), Q.push(z);
      }
      var fe = E.length;
      if (!fe)
        F = Q[0];
      else {
        F = E[0];
        for (var R = 0; R < fe; R++) {
          E[R];
          var le = E[R + 1], K = Q[R];
          isNaN(K) || (le ? F += K + le : F += K + " ");
        }
      }
      Oe[w.type](B.target, w.property, F, B.transforms), w.currentValue = F, d++;
    }
  }
  function v(g) {
    a[g] && !a.passThrough && a[g](a);
  }
  function x() {
    a.remaining && a.remaining !== !0 && a.remaining--;
  }
  function b(g) {
    var d = a.duration, T = a.delay, S = d - a.endDelay, w = c(g);
    a.progress = k(w / d * 100, 0, 100), a.reversePlayback = w < a.currentTime, i && C(w), !a.began && a.currentTime > 0 && (a.began = !0, v("begin")), !a.loopBegan && a.currentTime > 0 && (a.loopBegan = !0, v("loopBegin")), w <= T && a.currentTime !== 0 && m(0), (w >= S && a.currentTime !== d || !d) && m(d), w > T && w < S ? (a.changeBegan || (a.changeBegan = !0, a.changeCompleted = !1, v("changeBegin")), v("change"), m(w)) : a.changeBegan && (a.changeCompleted = !0, a.changeBegan = !1, v("changeComplete")), a.currentTime = k(w, 0, d), a.began && v("update"), g >= d && (n = 0, x(), a.remaining ? (r = t, v("loopComplete"), a.loopBegan = !1, a.direction === "alternate" && p()) : (a.paused = !0, a.completed || (a.completed = !0, v("loopComplete"), v("complete"), !a.passThrough && "Promise" in window && (u(), s(a)))));
  }
  return a.reset = function() {
    var g = a.direction;
    a.passThrough = !1, a.currentTime = 0, a.progress = 0, a.paused = !0, a.began = !1, a.loopBegan = !1, a.changeBegan = !1, a.completed = !1, a.changeCompleted = !1, a.reversePlayback = !1, a.reversed = g === "reverse", a.remaining = a.loop, i = a.children, o = i.length;
    for (var d = o; d--; )
      a.children[d].reset();
    (a.reversed && a.loop !== !0 || g === "alternate" && a.loop === 1) && a.remaining++, m(a.reversed ? a.duration : 0);
  }, a._onDocumentVisibility = l, a.set = function(g, d) {
    return Se(g, d), a;
  }, a.tick = function(g) {
    t = g, r || (r = t), b((t + (n - r)) * y.speed);
  }, a.seek = function(g) {
    b(c(g));
  }, a.pause = function() {
    a.paused = !0, l();
  }, a.play = function() {
    a.paused && (a.completed && a.reset(), a.paused = !1, I.push(a), l(), Be());
  }, a.reverse = function() {
    p(), a.completed = !a.reversed, l();
  }, a.restart = function() {
    a.reset(), a.play();
  }, a.remove = function(g) {
    var d = ue(g);
    Le(d, a);
  }, a.reset(), a.autoplay && a.play(), a;
}
function pe(e, r) {
  for (var n = r.length; n--; )
    ee(e, r[n].animatable.target) && r.splice(n, 1);
}
function Le(e, r) {
  var n = r.animations, t = r.children;
  pe(e, n);
  for (var i = t.length; i--; ) {
    var o = t[i], u = o.animations;
    pe(e, u), !u.length && !o.children.length && t.splice(i, 1);
  }
  !n.length && !t.length && r.pause();
}
function ur(e) {
  for (var r = ue(e), n = I.length; n--; ) {
    var t = I[n];
    Le(r, t);
  }
}
function sr(e, r) {
  r === void 0 && (r = {});
  var n = r.direction || "normal", t = r.easing ? X(r.easing) : null, i = r.grid, o = r.axis, u = r.from || 0, s = u === "first", a = u === "center", p = u === "last", c = f.arr(e), l = parseFloat(c ? e[0] : e), h = c ? parseFloat(e[1]) : 0, C = O(c ? e[1] : e) || 0, m = r.start || 0 + (c ? l : 0), v = [], x = 0;
  return function(b, g, d) {
    if (s && (u = 0), a && (u = (d - 1) / 2), p && (u = d - 1), !v.length) {
      for (var T = 0; T < d; T++) {
        if (!i)
          v.push(Math.abs(u - T));
        else {
          var S = a ? (i[0] - 1) / 2 : u % i[0], w = a ? (i[1] - 1) / 2 : Math.floor(u / i[0]), B = T % i[0], j = Math.floor(T / i[0]), L = S - B, M = w - j, A = Math.sqrt(L * L + M * M);
          o === "x" && (A = -L), o === "y" && (A = -M), v.push(A);
        }
        x = Math.max.apply(Math, v);
      }
      t && (v = v.map(function(E) {
        return t(E / x) * x;
      })), n === "reverse" && (v = v.map(function(E) {
        return o ? E < 0 ? E * -1 : -E : Math.abs(x - E);
      }));
    }
    var U = c ? (h - l) / x : l;
    return m + U * (Math.round(v[g] * 100) / 100) + C;
  };
}
function cr(e) {
  e === void 0 && (e = {});
  var r = y(e);
  return r.duration = 0, r.add = function(n, t) {
    var i = I.indexOf(r), o = r.children;
    i > -1 && I.splice(i, 1);
    function u(h) {
      h.passThrough = !0;
    }
    for (var s = 0; s < o.length; s++)
      u(o[s]);
    var a = Z(n, J(G, e));
    a.targets = a.targets || e.targets;
    var p = r.duration;
    a.autoplay = !1, a.direction = r.direction, a.timelineOffset = f.und(t) ? p : ae(t, p), u(r), r.seek(a.timelineOffset);
    var c = y(a);
    u(c), o.push(c);
    var l = De(o, e);
    return r.delay = l.delay, r.endDelay = l.endDelay, r.duration = l.duration, r.seek(0), r.reset(), r.autoplay && r.play(), r;
  }, r;
}
y.version = "3.2.1";
y.speed = 1;
y.suspendWhenDocumentHidden = !0;
y.running = I;
y.remove = ur;
y.get = ie;
y.set = Se;
y.convertPx = ne;
y.path = Ye;
y.setDashoffset = _e;
y.stagger = sr;
y.timeline = cr;
y.easing = X;
y.penner = we;
y.random = function(e, r) {
  return Math.floor(Math.random() * (r - e + 1)) + e;
};
const fr = `<svg class="w-full h-full " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>`, lr = '<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>', vr = '<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>', dr = `<svg class='w-full h-full' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
let D;
class gr {
  constructor(r) {
    this.config = {
      success: {
        icon: vr,
        bgColor: "#57cc99",
        textColor: "#333333"
      },
      warning: {
        icon: dr,
        bgColor: "#ffd166",
        textColor: "#1e1e1e"
      },
      error: {
        icon: lr,
        bgColor: "#e56b6f",
        textColor: "#f6f6f6"
      },
      info: {
        icon: fr,
        bgColor: "#4361ee",
        textColor: "#ffffff"
      }
    }, this.element = r, D = this, this.prepareToast();
  }
  setConfigOfType(r, n) {
    return this.config.hasOwnProperty(r) ? (Object.keys(n).forEach((t) => {
      this.config[r].hasOwnProperty(t) && (this.config[r][t] = n[t]);
    }), this) : !1;
  }
  setStylesToParent() {
    const r = (n, t) => {
      this.element.style[n] || (this.element.style[n] = t);
    };
    r("position", "fixed"), r("top", "2vh"), r("right", "1vw"), r("zIndex", "9999"), r("borderRadius", "5px"), r("padding", "10px"), r("transform", "translateX(30%)"), r("opacity", "0"), r("boxShadow", "0 0 10px rgba(0,0,0,0.2)"), r("display", "flex"), r("alignItems", "center"), r("color", "white"), r("border", "0.2px solid white");
  }
  prepareIconElement() {
    this.iconElement = document.createElement("div"), this.iconElement.style.padding = "5px", this.iconElement.style.width = "2rem", this.iconElement.style.height = "2rem", this.element.appendChild(this.iconElement);
  }
  prepareMessageElement() {
    this.messageElement = document.createElement("div"), this.messageElement.style.padding = "5px", this.element.appendChild(this.messageElement);
  }
  prepareToast() {
    this.setStylesToParent(), this.prepareIconElement(), this.prepareMessageElement();
  }
  appendRelatedIcon(r) {
    r || (r = "info"), this.element.style.backgroundColor = this.config[r].bgColor, this.element.style.color = this.config[r].textColor, this.iconElement.innerHTML = this.config[r].icon;
  }
  static toast(r, n, t = 2e3) {
    if (!D)
      throw new Error("Toaster not initialized");
    D.messageElement.innerText = r, D.appendRelatedIcon(n), D.element.style.zIndex = 2147484002, y({
      targets: D.element,
      translateX: 0,
      opacity: 1,
      easing: "easeOutExpo",
      complete: function(i) {
        y({
          targets: D.element,
          translateX: "30%",
          easing: "easeOutExpo",
          opacity: 0,
          duration: 800,
          delay: t,
          // in milliseconds,
          complete: function() {
            D.element.style.zIndex = -1;
          }
        });
      }
    });
  }
}
export {
  gr as Toaster
};
