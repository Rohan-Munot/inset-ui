// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "installation.mdx": () => import("../content/docs/installation.mdx?collection=docs"), "theming.mdx": () => import("../content/docs/theming.mdx?collection=docs"), "components/accordion.mdx": () => import("../content/docs/components/accordion.mdx?collection=docs"), "components/avatar.mdx": () => import("../content/docs/components/avatar.mdx?collection=docs"), "components/button.mdx": () => import("../content/docs/components/button.mdx?collection=docs"), "components/checkbox.mdx": () => import("../content/docs/components/checkbox.mdx?collection=docs"), "components/index.mdx": () => import("../content/docs/components/index.mdx?collection=docs"), "components/input.mdx": () => import("../content/docs/components/input.mdx?collection=docs"), }),
};
export default browserCollections;