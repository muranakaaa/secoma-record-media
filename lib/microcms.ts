import { createClient } from "microcms-js-sdk"

export const microcms = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_API_URL ?? "",
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? "",
})