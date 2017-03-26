let Promise = require('bluebird');
let PromiseListener = require('../src/Utilities/PromiseListener.js');

let Router = require('../src/Router/UrlFragmentListener');
let XhrRepository = require('../src/Repository/XhrRepository');
let renderer = require('../src/Renderer/MarkdownRenderer');
let DomContainerView = require('../src/View/DomContainerView');


let router = new Router();
let repository = new XhrRepository( (name) => `/assets/pages/${name}.md` );
let view = new DomContainerView('blikiblikibleb');


view.install();

let listener =
	new PromiseListener(
		() => router.onRouteChange(),
		(p) => {
			return p.then( (name) => repository.retrieve(name) )
							.then( (doc) => renderer.render(doc) )
							.then( (render) => view.setContent(render) );
		}
	);
