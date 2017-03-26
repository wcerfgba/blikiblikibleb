/* IRouters provide a way to retrieve a route and subscribe to changes using
 * a promise-based interface.
 */

module.exports = {
  getRoute: function () { return route; },
  onRouteChange: function () { return promise; }
};
