import { Chatbot } from '@/components/Chatbot'
import Generate from '@/components/generate'

export default function Home() {
  return (
    <main className='flex h-screen  flex-col items-center  p-14'>
      <h2 className='mb-4 text-5xl'>CharlesGPT</h2>
      <Chatbot />
    </main>
  )
}
