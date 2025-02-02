"use client"

import BlogItem from "@/components/blog/BlogItem"
import { BlogType } from "@/types"

interface BlogProps {
  blogs: BlogType[]
}

const Blog = ({ blogs }: BlogProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default Blog
