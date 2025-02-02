"use client"

import BlogItem from "@/components/blog/BlogItem"
import { BlogType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"

interface BlogDetailProps {
  blog: BlogType
  relatedBlogs: BlogType[]
}

const BlogDetail = ({ blog, relatedBlogs }: BlogDetailProps) => {
  const categoryColor = blog.category.color || "gray"

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <div className="font-bold text-2xl">{blog.title}</div>
        <div className="text-sm">
          {format(new Date(blog.createdAt), "yyy/MM/dd")}
        </div>
      </div>

      <div className="aspect-video relative overflow-hidden">
        <Image
          src={blog.image.url}
          width={768}
          height={432}
          alt="thumbnail"
          className="object-cover"
          priority={false}
        />

        <div
          className="absolute top-0 left-0 text-xs text-white py-1.5 px-4"
          style={{ backgroundColor: categoryColor }}
        >
          {blog.category.name}
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: blog.content }} />

      <div className="font-bold border-l-4 border-black pl-2">関連記事</div>

      {relatedBlogs.length === 0 ? (
        <div className="text-center text-sm my-10">関連記事がありません</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedBlogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogDetail
