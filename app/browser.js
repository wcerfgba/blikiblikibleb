/*
 * Browser-side version of BlikiBlikiBleb. Listens for changes on the URL
 * fragment and loads and renders Markdown from the server.
 */


// Core dependencies
let Promise = require('bluebird');
let PromiseListener = require('../src/Utilities/PromiseListener.js');


// Local dependencies
let Router = require('../src/Router/UrlFragmentListener');
let XhrRepository = require('../src/Repository/XhrRepository');
let renderer = require('../src/Renderer/BlikiBlikiMarkdownRenderer');
let DomContainerView = require('../src/View/DomContainerView');


// App components
let router = new Router();
let repository = new XhrRepository( (name) => `/assets/pages/${name}.md` );
let view = new DomContainerView('blikiblikibleb');


// The app, as a decorator of promises.
// Methods are wrapped in functions to preserve object ownership.
let app = (p) => {
  return p.then( (name) => repository.retrieve(name) )
          .then( (doc) => renderer.render(doc) )
          .then( (render) => view.setContent(render) );
}


// Init

view.install();

// Subscribe to route change promises.
let listener =
  new PromiseListener(
    () => router.onRouteChange(),
    app
  );


// Load the initial hash (or index).
let landing = router.getRoute() ? router.getRoute() : 'index';
app( Promise.resolve( landing ) );
