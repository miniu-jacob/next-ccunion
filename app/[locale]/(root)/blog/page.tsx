// app/[locale]/(root)/blog/page.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import fs from "fs";
import matter from "gray-matter";
import { Metadata } from "next";
import path from "path";
// import path from "path";
// import { Link } from "@/i18n/routing";

export interface Blog {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
}

// 메타데이터를 만들어준다.
const PAGE_TITLE = "Blogs";
export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: "Chungcheong Entrepreneurs Association Group",
};

const BlogList = async () => {
  const contentDir = path.join(process.cwd(), "contents");
  let fileList: string[]; // 파일 리스트
  try {
    fileList = fs.readdirSync(contentDir, "utf-8");
    console.log("[DEBUG] getStaticProps - File successfully read: ", fileList);
  } catch (error) {
    console.error("[ERROR] getStaticProps - Failed to read directory: ", error);
    fileList = [];
  }

  const blogs: Blog[] = fileList.map((file) => {
    const fileContent = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(fileContent);
    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      imageUrl: data?.imageUrl,
    };
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center my-2">Our Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 space-x-2">
        {blogs.map((blog: Blog, index: number) => (
          <div key={index} className="shadow-lg rounded-lg overflow-hidden flex flex-col">
            <Image
              className="w-auto h-64 object-cover object-center md:h-72"
              src={blog?.imageUrl || "/images/banner1.jpg"}
              alt={blog.title}
              width={600}
              height={192}
              style={{ aspectRatio: "16/9" }}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="mb-4">{blog.description}</p>
              <Link href={`/blogpost/${blog.slug}`} className={buttonVariants({ variant: "default" })}>
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
