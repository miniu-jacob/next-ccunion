// app/[locale]/(root)/blogpost/[slug]/page.tsx

import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
// import remarkFrontmatter from "remark-frontmatter";
// import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
// import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
// import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeSlug from "rehype-slug";
import fs from "fs";
import matter from "gray-matter";
import TableOfContentPage from "@/components/shared/contents/table-of-content";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

// URL: https://ondrejsevcik.com/blog/building-perfect-markdown-processor-for-my-blog

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const result = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    } as Options)
    .use(rehypeAutolinkHeadings);

  const filePath = `contents/${slug}.md`;

  // Read File
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // gray-matter 를 사용하여 포맷된 데이터를 추출.
  const { data, content } = matter(fileContent);

  const htmlContent = (await result.process(content)).toString();

  return (
    <MaxWidthWrapper className="prose dark:prose-invert">
      <div className="flex">
        <div className="px-16">
          <h1>{data.title}</h1>
          <div
            className="prose dark:prose-invert prose-pre:bg-opacity-40 prose-pre:backdrop-blur-sm max-w-3xl "
            dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
        <TableOfContentPage className="text-sm md:w-[250px]" htmlContent={htmlContent} />
      </div>
    </MaxWidthWrapper>
  );
};

export default BlogPostPage;
