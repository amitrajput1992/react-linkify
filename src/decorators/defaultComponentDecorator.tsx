import * as React from "react";

export default (decoratedHref: string, decoratedText: string, key: number): React.ReactNode => {
  return (
    <a href={decoratedHref} key={key}>
      {decoratedText}
    </a>
  );
};
