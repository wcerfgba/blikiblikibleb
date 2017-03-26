/* The BlikiBliki Markdown renderer uses a Markdown renderer after rewriting
 * CamelCaseWords as [CamelCaseLinks](#CamelCaseLinks).
 */

let markdownRenderer = require('./MarkdownRenderer');


let camelCaseLinks = (md) => {

  return md.replace(
    /(\s+)\[(\w+)\](\s+)/g,
    '$1[$2](#$2)$3'
  );

};


let filterMarkdown = (md) => {
  return camelCaseLinks(md);
};


let render = (md) =>
  markdownRenderer.render(
    filterMarkdown(
      md
    )
  );


module.exports = {
  render
};
