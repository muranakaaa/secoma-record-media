import Loading from "@/app/loading"
import Category from "@/components/category/Category"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import { Suspense } from "react"

export const revalidate = 0

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = params

  const categoryBlogs = await microcms.getList<BlogType>({
    endpoint: "blog",
    queries: {
      filters: `category[equals]${categoryId}`,
      orders: "-publishedAt",
    },
  })

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <Category blogs={categoryBlogs.contents} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default CategoryPage
