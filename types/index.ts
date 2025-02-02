export interface AboutType {
  id: string
  content: string
  createdAt: string
  publishedAt: string
  updatedAt: string
}

export interface CategoryType {
  id: string
  name: string
  color: string
}

export interface BlogType {
  id: string
  title: string
  content: string
  image: {
    url: string
  }
  category: CategoryType
  createdAt: string
  publishedAt: string
  updatedAt: string
}

export interface ArchiveMonthType {
  year: number
  month: number
  count: number
}

export interface CategoryCountType {
  id: string
  name: string
  count: number
}

export interface SidebarData {
  latestBlogs: BlogType[]
  archiveMonths: ArchiveMonthType[]
  categoryCounts: CategoryCountType[]
}