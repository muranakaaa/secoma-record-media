import Loading from "@/app/loading"
import BlogDetail from "@/components/blog/BlogDetail"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import { Suspense } from "react"

export const revalidate = 0

interface BlogDetailPageProps {
  params: {
    blogId: string
  }
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { blogId } = params

  let blog: BlogType | null = null
  let relatedBlogs: BlogType[] = []

  try {
    blog = await microcms.get({
      endpoint: "blog",
      contentId: blogId,
    })

    if (blog?.category) {
      const relatedBlogsResponse = await microcms.getList<BlogType>({
        endpoint: "blog",
        queries: {
          filters: `category[equals]${blog.category.id}[and]id[not_equals]${blogId}`,
          limit: 6,
          orders: "-publishedAt",
        },
      })
      relatedBlogs = relatedBlogsResponse.contents
    }
  } catch (e) {
    console.log(e)
  }

  if (!blog) {
    return <div className="text-center text-sm my-10">ブログがありません</div>
  }

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default BlogDetailPage
