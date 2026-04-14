"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";

import React from "react";

const components = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={props.src || ""}
      alt={props.alt || "Blog image by Adi Photography Peshawar"}
      width={800}
      height={450}
      className="rounded-card my-6"
      sizes="(max-width: 768px) 100vw, 720px"
    />
  ),
};

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose max-w-none">
      <MDXRemote
        compiledSource={source.compiledSource}
        scope={source.scope}
        frontmatter={source.frontmatter}
        components={components}
      />
    </div>
  );
}
