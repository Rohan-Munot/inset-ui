'use client'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
const Page = () => {
  const { slug } = useParams()
  const Component = dynamic(() => import(`@/registry/default/${slug}`), {
    ssr: false,
  })
  return (
    <div className="h-full w-full rounded-4xl">
      <Component />
    </div>
  )
}

export default Page
