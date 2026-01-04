// @ts-nocheck
import * as __fd_glob_8 from "../content/docs/components/input.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/components/index.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/components/checkbox.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/components/button.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/components/avatar.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/components/accordion.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/theming.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/installation.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"index.mdx": __fd_glob_0, "installation.mdx": __fd_glob_1, "theming.mdx": __fd_glob_2, "components/accordion.mdx": __fd_glob_3, "components/avatar.mdx": __fd_glob_4, "components/button.mdx": __fd_glob_5, "components/checkbox.mdx": __fd_glob_6, "components/index.mdx": __fd_glob_7, "components/input.mdx": __fd_glob_8, });