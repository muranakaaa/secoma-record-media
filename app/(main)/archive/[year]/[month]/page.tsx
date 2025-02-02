import { Suspense } from "react"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import { blogPerPage } from "@/lib/utils"
import Archive from "@/components/archive/Archive"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import Loading from "@/app/loading"

export const revalidate = 0

interface ArchivePageProps {
  params: {
    year: string
    month: string
  }
  searchParams: {
    [key: string]: string | undefined
  }
}

const ArchivePage = async ({ params, searchParams }: ArchivePageProps) => {
  const { year, month } = params
  const { page, perPage } = searchParams

  const limit = typeof perPage === "string" ? parseInt(perPage) : blogPerPage
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const formattedMonth = `${year}-${month.padStart(2, "0")}`

  const archiveBlogs = await microcms.getList<BlogType>({
    endpoint: "blog",
    queries: {
      limit: limit,
      offset: offset,
      filters: `publishedAt[begins_with]${formattedMonth}`,
      orders: "-publishedAt",
    },
  })

  const pageCount = Math.ceil(archiveBlogs.totalCount / limit)

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <Archive blogs={archiveBlogs.contents} pageCount={pageCount} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default ArchivePage