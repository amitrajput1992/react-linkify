import React from "react";
import { renderToString } from "react-dom/server";
import { Match } from "linkify-it";
import defaultComponentDecorator from "../decorators/defaultComponentDecorator";
import defaultHrefDecorator from "../decorators/defaultHrefDecorator";
import defaultMatchDecorator from "../decorators/defaultMatchDecorator";
import defaultTextDecorator from "../decorators/defaultTextDecorator";

type Props = {
  renderAs?: "child" | "innerHTML",
  children: React.ReactNode,
  componentDecorator?: (decoratedHref: string, decoratedText: string, key: number) => React.ReactNode,
  hrefDecorator?: (href: string) => string,
  matchDecorator?: (match: string) => Match[] | null,
  textDecorator?: (text: string) => string,
};

const Linkify = (props: Props) => {
  const {
    matchDecorator = defaultMatchDecorator,
    componentDecorator = defaultComponentDecorator,
    textDecorator = defaultTextDecorator,
    hrefDecorator = defaultHrefDecorator,
    children,
    renderAs = "child"
  } = props;

  function parseString(string: string) {
    if (string === "") {
      return string;
    }

    const matches = matchDecorator(string);
    if (!matches) {
      return string;
    }

    const elements = [];
    let lastIndex = 0;
    matches.forEach((match, i) => {
      // Push preceding text if there is any
      if (match.index > lastIndex) {
        elements.push(string.substring(lastIndex, match.index));
      }

      const decoratedHref = hrefDecorator(match.url);
      const decoratedText = textDecorator(match.text);
      const decoratedComponent = componentDecorator(decoratedHref, decoratedText, i);
      elements.push(decoratedComponent);

      lastIndex = match.lastIndex;
    });

    // Push remaining text if there is any
    if (string.length > lastIndex) {
      elements.push(string.substring(lastIndex));
    }

    return (elements.length === 1) ? elements[0] : elements;
  }

  function parse(children: React.ReactNode | string | React.ReactNode[] | string[], key: number = 0): any {
    if (typeof children === "string") {
      return parseString(children);
    } else if (React.isValidElement(children) && (children.type !== "a") && (children.type !== "button")) {
      return React.cloneElement(children, { key: key }, parse(children.props.children));
    } else if (Array.isArray(children)) {
      return children.map((child, i) => parse(child, i));
    }

    return children;
  }

  if(renderAs === "child") {
    return (
      <React.Fragment>
        {parse(children)}
      </React.Fragment>
    );
  } else {
    // Support react components as innerHTML
    const content = parse(children);
    const stringifiedContent = htmlDecode(renderToString(content));

    return (
      <div dangerouslySetInnerHTML={{ __html: stringifiedContent }} />
    );
  }
};

function htmlDecode(input: string): string {
  const e = document.createElement("textarea");
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : (e.childNodes[0].nodeValue as string);
}

export default Linkify;
