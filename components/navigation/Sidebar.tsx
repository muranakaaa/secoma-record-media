"use client"

import Image from "next/image"
import Link from "next/link"

const Sidebar = () => {
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
    </div>
  )
}

export default Sidebar
