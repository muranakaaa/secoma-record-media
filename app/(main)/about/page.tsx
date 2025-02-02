import Loading from "@/app/loading"
import About from "../../../components/about/About"
import LayoutWithSidebar from "../../../components/layout/LayoutWithSidebar"
import { microcms } from "@/lib/microcms"
import { AboutType } from "@/types"
import { Suspense } from "react"

export const revalidate = 0

const AboutPage = async () => {
  const about = await microcms.getList<AboutType>({
    endpoint: "about",
    queries: {
      orders: "publishedAt",
      limit: 1,
    },
  })

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <About content={about.contents[0].content} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default AboutPage
