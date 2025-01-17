import LinkifyIt, { Match } from "linkify-it";
import tlds from "tlds";

const linkify = new LinkifyIt();
linkify.tlds(tlds);

export default (text: string): Match[] | null => {
  return linkify.match(text);
};
