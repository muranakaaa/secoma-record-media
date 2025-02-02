"use client"

import BlogItem from "@/components/blog/BlogItem"
import { BlogType } from "@/types"
import { blogPerPage } from "@/lib/utils"
import PaginationButton from "@/components/pagers/PaginationButton"

interface CategoryProps {
  blogs: BlogType[]
  pageCount: number
}

const Category = ({ blogs, pageCount }: CategoryProps) => {
  return (
    <div>
      <div className="font-bold border-l-4 border-black pl-2 mb-5">
        {blogs[0]?.category.name}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
      {blogs.length !== 0 && (
       <PaginationButton pageCount={pageCount} displayPerPage={blogPerPage} />
     )}
    </div>
  )
}

export default Category
