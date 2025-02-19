// components/shared/contents/on-this-page.tsx

"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// 목차에 대한 인터페이스를 정의한다.
interface LinkType {
  id: string;
  text: string;
}

const TableOfContentPage = ({ htmlContent, className }: { htmlContent: string; className?: string }) => {
  // 링크(목차)에 대한 상태 관리
  const [links, setLinks] = useState<LinkType[] | null>(null);

  // content 내용이 변경되면 목차를 다시 만든다.
  useEffect(() => {
    // a). 가상의 <div> 를 만들어서 htmlContent 를 넣는다. document.createElement 를 사용한다.
    const temp = document.createElement("div");
    temp.innerHTML = htmlContent;

    // b). htmlContent 를 temp에 넣으면 안에 h2 태그들이 있을 것이다. 이것을 querySelectorAll로 찾는다.
    const headings = temp.querySelectorAll("h2, h3");

    // c). 빈 배열을 만들어 headings 를 순회하면서 id 와 text 를 추출한다.
    const generatedLinks: LinkType[] = []; // 초기화

    // d). headings 를 순회하면서 h2 태그에 id 가 없다면 자동으로 만든다. (ex: heading-1, heading-2 ...)
    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;

      // 순회하면서 id 가 없다면 만들어 주고 목차 배열(generatedLinks)에 추가한다. push() 메소드를 사용한다.
      generatedLinks.push({
        id: id,
        text: (heading as HTMLElement).innerText, // innerText 를 사용하여 텍스트를 추출한다.
      });
    });

    // e). 목차 상태(links)를 업데이트한다.
    setLinks(generatedLinks);
  }, [htmlContent]);

  return (
    <div className={cn("hidden md:block", className)}>
      {/* 목차가 항상 오른쪽으로 고정  */}
      <div className="sticky top-20">
        <h2>Table of Content</h2>
        <ul className="not-prose">
          {links &&
            links.map((link) => (
              <li key={link.id} className="pt-1">
                <a href={`#${link.id}`} className="text-blue-500 hover:underline">
                  {link.text.slice(0, 50)}
                  {link.text.length > 50 ? "..." : ""}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContentPage;
