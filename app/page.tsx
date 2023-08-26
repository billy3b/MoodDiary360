import { auth } from "@clerk/nextjs";
import Link from "next/link";


export default async function Home() {
  const {userId} = await auth();

  let href = userId?'/journal':'/new-user';
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
      <div className="max-w-[900] mx-auto">
        <h1 className="text-6xl mb-4">MoodDiary360</h1>
        <p className="text-2xl text-white/60 mb-4">This is the best app for tracking your mood. Just be honest.</p>
        <div>
          <Link href ={href}>
            <button className="bg-blue-600 px-4 py-2 text-xl rounded-lg">get started</button>
          </Link>
        </div>
      </div>
    </div>
    )
}
