/* The Markdown renderer implements the IRenderer interface and uses the
 * marked library for both client- and server-side rendering.
 */

let marked = require('marked');

module.exports = {
  render: marked
};
