



import Prelude
import PseudoTypes as P


Content

ContentPermutation
  Permutation(Content)

ContentView
  Settable(Content)
  P.UIComponent

ContentReference

ContentResolver
  ContentReference -> Content

ContentSelfResolvingReference
  ContentReference
  ContentResolver
  |- Content

ContentReferenceProvider
  Subscribable(ContentReference)




ContentReferenceProvider.subscribe
  |> ContentResolver
  |> ContentView.set




Markdown
  Content

HyperText
  Content

MarkdownRenderer
  Markdown -> HyperText
  |- ContentPermutation

MarkdownLink
  Url
  ContentReference

MarkdownLibrary
  MarkdownLink -> Markdown
  |- ContentResolver

UrlFragmentMarkdownLinkBuilder
  UrlFragment -> MarkdownLink

MarkdownLinkUrlFragmentListener
  UrlFragmentListener
    Subscribable(UrlFragment)
  UrlFragmentMarkdownLinkBuilder
  |- ContentReferenceProvider
















consider devictionary and blikiblikibleb, similar apps:

documents in storage which can be rendered and injected into a view.

abstract the request:

listen on server for http, serve raw or rendered from server's storage;
listen on client for fragment changes, serve raw or rendered from client's storage

abstract the storage:

server side hierarchy of files (backed by git?)
client side XHR-powered repo with raw and render caching

abstract the view:

use templates for html fragments of all sizes (component, document) and permit injection of raw document into template for render
serve the render as a http response (server) or dom transformation (client)

view is composed of
Receiver(Raw)
Request(Template, Raw)
Renderer(Request) : Render
Server(Render) : ???
// handoff

the app doesn't care about the view, it just serves the document to the view, just like the view serves the render to whoever (dom injector, http request)



Document {
  content
  name : DocumentName
}

Storage : Collection(Document)

Request : DocumentName

View : Receiver(Request)

Request -> Storage.findByName : Document -> View.receive .









// App
ref__doc =
  rawDoc__doc(
  ref__rawDoc(
  ref
))


// Request infrastructure
__ref = {
  browser: urlFragment,
    // From a UrlFragmentListener
  server: routeParam,
    // From a RequestParser
}


// Response infrastructure
doc__ = {
  browser: containerSetContent(doc),
  server: serve(doc),
}


// we defined the app stack (domain feature), along with a narrow interface (ref__doc) and example bindings at this interface (serving a http response or injecting into a live dom component, receiving a simple request (id) as a string from  a js listener or a web app server)
// now we can bind real components in with ease.

//but first we must finish the inner interface of the app stack.


ref__rawDoc = {
  server: loadAsset(ref),
  browser: xhrRepo(ref),
    // A magical component that retrieves assets over XHR (preconfigured url prefix of course) (and caches for later use?)
}

rawDoc__doc = markdownRenderer
  // Just render that shit.


// Finale
main =
doc__(
ref__doc(
__ref()
))



All we need to do now is define the latent components by binding them to existing libraries.


