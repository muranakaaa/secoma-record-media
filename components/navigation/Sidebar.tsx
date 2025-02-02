"use client"

import { microcms } from "@/lib/microcms"
import {
  ArchiveMonthType,
  BlogType,
  CategoryCountType,
  SidebarData,
} from "@/types"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

const fetchSidebarData = async (): Promise<SidebarData> => {
  const allBlogs = await microcms.getAllContents<BlogType>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
    },
  })

  const latestBlogs = allBlogs.slice(0, 5)

  const extractArchiveMonths = (blogs: BlogType[]): ArchiveMonthType[] => {
    const monthCounts = new Map<string, ArchiveMonthType>()
    blogs.forEach((blog) => {
      const date = new Date(blog.publishedAt || blog.createdAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const key = `${year}-${month}`
      const current = monthCounts.get(key) || { year, month, count: 0 }
      monthCounts.set(key, { ...current, count: current.count + 1 })
    })
    return Array.from(monthCounts.values()).sort(
      (a, b) => b.year - a.year || b.month - a.month
    )
  }

  const extractCategoryCounts = (blogs: BlogType[]): CategoryCountType[] => {
    const categoryCounts = new Map<string, CategoryCountType>()
    blogs.forEach((blog) => {
      const { id, name } = blog.category
      const current = categoryCounts.get(id) || { id, name, count: 0 }
      categoryCounts.set(id, { ...current, count: current.count + 1 })
    })
    return Array.from(categoryCounts.values()).sort((a, b) => b.count - a.count)
  }

  return {
    latestBlogs,
    archiveMonths: extractArchiveMonths(allBlogs),
    categoryCounts: extractCategoryCounts(allBlogs),
  }
}

const Sidebar = () => {
  const { data: sidebarData, isLoading } = useQuery({
    queryKey: ["sidebarData"],
    queryFn: fetchSidebarData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })

  const latestBlogs = sidebarData?.latestBlogs || []
  const categoryCounts = sidebarData?.categoryCounts || []
  const archiveMonths = sidebarData?.archiveMonths || []

  return (
    <div className="space-y-10">
      <div className="border flex flex-col items-center justify-center p-5 space-y-5">
        <Link href="/about">
          <Image
            src="/profile-icon.jpg"
            width={120}
            height={120}
            alt="avatar"
            className="rounded-full"
            priority={false}
          />
        </Link>

        <div className="font-bold text-xl">村中</div>

        <div className="text-sm">
          三重出身の旅人。日本や世界各地を遊歴しています。旅を通して物事の移り変わりを感じるのが好きです。
        </div>
      </div>

      <div className="space-y-5">
        <div className="font-bold border-l-4 border-black pl-2">新着記事</div>

        <div className="border text-sm">
          {isLoading ? (
            <div className="p-3 animate-pulse">Loading...</div>
          ) : (
            latestBlogs.map((blog, index, array) => (
              <Link
                href={`/blog/${blog.id}`}
                className={`grid grid-cols-3 hover:text-gray-500 group ${
                  index !== array.length - 1 ? "border-b" : ""
                }`}
                key={index}
              >
                <div className="col-span-1">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={blog.image.url}
                      fill
                      alt="new blog"
                      className="object-cover transition-transform duration-100 ease-in-out group-hover:scale-105"
                      loading="lazy"
                      priority={false}
                      sizes="100%"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="p-5">{blog.title}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="font-bold border-l-4 border-black pl-2">カテゴリ</div>

        <div className="border text-sm">
          {isLoading ? (
            <div className="p-3 animate-pulse">Loading...</div>
          ) : (
            categoryCounts.map((category, index, array) => (
              <Link
                href={`/category/${category.id}`}
                className={`p-3 flex items-center justify-between hover:text-gray-500 ${
                  index !== array.length - 1 ? "border-b" : ""
                }`}
                key={index}
              >
                <div>{category.name}</div>
                <div className="border py-1 px-4 text-sm">{category.count}</div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="font-bold border-l-4 border-black pl-2">アーカイブ</div>

        <div className="border text-sm">
          {isLoading ? (
            <div className="p-3 animate-pulse">Loading...</div>
          ) : (
            archiveMonths.map((archive, index, array) => {
              return (
                <Link
                  href={`/archive/${archive.year}/${archive.month}`}
                  className={`p-3 flex items-center justify-between hover:text-gray-500 ${
                    index !== array.length - 1 ? "border-b" : ""
                  }`}
                  key={index}
                >
                  <div>
                    {format(
                      new Date(archive.year, archive.month - 1),
                      "yyy年MM月"
                    )}
                  </div>
                  <div className="border py-1 px-4 text-sm">
                    {archive.count}
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
