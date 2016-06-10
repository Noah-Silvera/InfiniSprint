"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * ReactDOM v15.1.0
 *
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
// Based off https://github.com/ForbesLindesay/umd/blob/master/template.js
;(function (f) {
  // CommonJS
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f(require('react'));

    // RequireJS
  } else if (typeof define === "function" && define.amd) {
      define(['react'], f);

      // <script>
    } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          // works providing we're not in "use strict";
          // needed for Java 8 Nashorn
          // see https://github.com/facebook/react/issues/3037
          g = this;
        }
        g.ReactDOM = f(g.React);
      }
})(function (React) {
  return React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9saWIvcmVhY3RfZG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxDQUFDLENBQUMsVUFBUyxDQUFULEVBQVk7O0FBRVosTUFBSSxRQUFPLE9BQVAseUNBQU8sT0FBUCxPQUFtQixRQUFuQixJQUErQixPQUFPLE1BQVAsS0FBa0IsV0FBckQsRUFBa0U7QUFDaEUsV0FBTyxPQUFQLEdBQWlCLEVBQUUsUUFBUSxPQUFSLENBQUYsQ0FBakI7OztBQUdELEdBSkQsTUFJTyxJQUFJLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQTNDLEVBQWdEO0FBQ3JELGFBQU8sQ0FBQyxPQUFELENBQVAsRUFBa0IsQ0FBbEI7OztBQUdELEtBSk0sTUFJQTtBQUNMLFlBQUksQ0FBSjtBQUNBLFlBQUksT0FBTyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDLGNBQUksTUFBSjtBQUNELFNBRkQsTUFFTyxJQUFJLE9BQU8sTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUN4QyxjQUFJLE1BQUo7QUFDRCxTQUZNLE1BRUEsSUFBSSxPQUFPLElBQVAsS0FBZ0IsV0FBcEIsRUFBaUM7QUFDdEMsY0FBSSxJQUFKO0FBQ0QsU0FGTSxNQUVBOzs7O0FBSUwsY0FBSSxJQUFKO0FBQ0Q7QUFDRCxVQUFFLFFBQUYsR0FBYSxFQUFFLEVBQUUsS0FBSixDQUFiO0FBQ0Q7QUFFRixDQTNCQSxFQTJCRSxVQUFTLEtBQVQsRUFBZ0I7QUFDakIsU0FBTyxNQUFNLDRDQUFiO0FBQ0QsQ0E3QkEiLCJmaWxlIjoiY2xpZW50L2xpYi9yZWFjdF9kb20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlYWN0RE9NIHYxNS4xLjBcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG4vLyBCYXNlZCBvZmYgaHR0cHM6Ly9naXRodWIuY29tL0ZvcmJlc0xpbmRlc2F5L3VtZC9ibG9iL21hc3Rlci90ZW1wbGF0ZS5qc1xuOyhmdW5jdGlvbihmKSB7XG4gIC8vIENvbW1vbkpTXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmKHJlcXVpcmUoJ3JlYWN0JykpO1xuXG4gIC8vIFJlcXVpcmVKU1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFsncmVhY3QnXSwgZik7XG5cbiAgLy8gPHNjcmlwdD5cbiAgfSBlbHNlIHtcbiAgICB2YXIgZztcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgZyA9IHdpbmRvdztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGcgPSBnbG9iYWw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgZyA9IHNlbGY7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdvcmtzIHByb3ZpZGluZyB3ZSdyZSBub3QgaW4gXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAvLyBuZWVkZWQgZm9yIEphdmEgOCBOYXNob3JuXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMDM3XG4gICAgICBnID0gdGhpcztcbiAgICB9XG4gICAgZy5SZWFjdERPTSA9IGYoZy5SZWFjdCk7XG4gIH1cblxufSkoZnVuY3Rpb24oUmVhY3QpIHtcbiAgcmV0dXJuIFJlYWN0Ll9fU0VDUkVUX0RPTV9ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
