# EsiRenderer component

This component handles ESI (Edge side include) include tags. If you're completly new to this, I suggest to watch [this video](https://www.youtube.com/watch?v=4PoNBZl4t0Y).

The concept of ESI includes works really well on a static, non SPA page. But when we introduce SSR hydration and client side navigation, it gets a little bit more complicated. Thats why we need e separate component to handle this for us.

**Note:** The source URL which is passed as `esiSrc` needs to be on the same akamai property as the host, in our case Akamai (or it needs to be whitelisted, you need to contact the Akamai support for that).

## How does it work

You only need to supply the `esiSrc` prop and your component will run on SSR/Client.

```html
<EsiRenderer esiSrc="http://example.com/link-to-my-html-snippet" />
```

### On the Server

On the server the component renders a `<esi:include src="http://example.com/link-to-my-html-snippet"></esi:include>` tag.

Note: Your website needs to go through a CDN like akamai or a local nodesi proxy, in order to replace the `esi:include` tag with the correct html snippet.

### SSR hydration

React is smart enough to keep the rendered html from the server, when the components initially mounts on the client.

We achived this with the following code:

```tsx
// render esi:include on the server, render nothing on the client
const esiIncludeTag = `<esi:include src="${this.props.esiSrc}" onerror="continue"></esi:include>`;

return (
  <div
    className="esi_server"
    dangerouslySetInnerHTML={{ __html: esiIncludeTag }}
  />
);
```

If there are any `<script>`s (inline or references to external scripts) in your snippet. They will be executed when the page initially renders in the browser.

### On the Client

If your component is rendered on the client (does not apply SSR hydration), for example after a client side navigation. Then we `fetch` the html directly from the `esiSrc` url and inject it in a `<div>` using `dangerouslySetInnerHTML`. Because react has a build in security rule to **not** execute any script tags within `dangerouslySetInnerHTML`, we append the scripts manually to the body of our HTML document. This happens in the `<ClientSideESI />` component.
