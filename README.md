[![Build Status](https://app.travis-ci.com/amitrajput1992/react-linkify.svg?branch=master)](https://app.travis-ci.com/amitrajput1992/react-linkify)

# [react-linkify](https://github.com/amitrajput1992/react-linkify/)
React component to parse links (urls, emails, etc.) in text into clickable links

> Forked from the amazing https://github.com/tasti/react-linkify repo, converted to use latest features of typescript and react, ESM and CJS bindings

### Basic

Any link that appears inside the `Linkify` component will become clickable.

```
<Linkify>See examples at amitrajput1992.github.io/react-linkify/.</Linkify>
```

Renders to:

See examples at `amitrajput1992.github.io/react-linkify/`.

### Advanced

If you're feeling lazy, you can wrap `Linkify` around anywhere that you want links to become clickable. Even with nested elements, it traverses the tree to find links.

```
<Linkify>
  <div>react-linkify <span>(amitrajput1992.github.io/react-linkify/)</span></div>
    <div>React component to parse links (urls, emails, etc.) in text into clickable links</div>   
</Linkify>
```

Renders to:

react-linkify (`amitrajput1992.github.io/react-linkify/`)
React component to parse links (urls, emails, etc.) in text into clickable links


## Installation

```
yarn add @amit.rajput/react-linkify
```

or

```
npm install @amit.rajput/react-linkify --save
```

or

```
pnpm i @amit.rajput/react-linkify --save
```

## Usage

```js
import Linkify from '@amit.rajput/react-linkify';

React.render(
  <Linkify>Examples are available at amitrajput1992.github.io/react-linkify/.</Linkify>,
  document.body
);
```

## Props

**component**
The type of component to wrap links in.
_type:_ `any`
_default:_ `'a'`

**properties**
The props that will be added to every matched component.
_type:_ `object`
_default:_ `{}`

NOTE: Use `Linkify.MATCH` as a value to specify the matched link. The properties prop will always contain `{href: Linkify.MATCH, key: 'LINKIFY_KEY_#'}` unless overridden.


## Customization

You can access to the global `Linkify` instance used to linkify contents by importing it (`import { linkify } from '@amit.rajput/react-linkify'`).
That way you can customize as needed (e.g. disabling existing schemas or adding new ones).

Note that any customization made to that instance will affect every `Linkify` component you use.

## Examples

All kind of links detectable by
[linkify-it](https://github.com/markdown-it/linkify-it) are supported. For
examples, visit [their website](http://markdown-it.github.io/linkify-it/).
