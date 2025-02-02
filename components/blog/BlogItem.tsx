"use client"

import { BlogType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

interface BlogItemProps {
  blog: BlogType
}

const BlogItem = ({ blog }: BlogItemProps) => {
  const categoryColor = blog.category.color || "gray"

  return (
    <Link href={`/blog/${blog.id}`} className="border group">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={blog.image.url}
          width={768}
          height={432}
          alt="thumbnail"
          className="object-cover transition-transform duration-100 ease-in-out group-hover:scale-105"
          priority={false}
        />

        <div
          className="absolute top-0 left-0 text-xs text-white py-1.5 px-4"
          style={{ backgroundColor: categoryColor }}
        >
          {blog.category.name}
        </div>

      </div>

      <div className="p-5 space-y-5 hover:text-gray-500">
        <div>{blog.title}</div>
        <div className="text-xs text-gray-500">
          {format(new Date(blog.createdAt), "yyy/MM/dd")}
        </div>
      </div>
    </Link>
  )
}

export default BlogItem