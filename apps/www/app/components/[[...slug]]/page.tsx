'use client'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
const Page = () => {
  const { slug } = useParams()
  const Component = dynamic(() => import(`@/components/demo/${slug}-demo`), {
    ssr: false,
  })
  return <Component />
}

export default Page
