"use client"

import BlogItem from "@/components/blog/BlogItem"
import { BlogType } from "@/types"
import { format } from "date-fns"

interface ArchiveProps {
  blogs: BlogType[]
}

const Archive = ({ blogs }: ArchiveProps) => {
  return (
    <div>
      <div className="font-bold border-l-4 border-black pl-2 mb-5">
        {format(new Date(blogs[0].publishedAt), "yyy年MM月")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default Archive