'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewEntryCard = () => {
  const router = useRouter()

  const handleOnCLick =async() => {
    const {data} =  await createNewEntry()
    router.push(`/journal/${data.id}`)
  }
  
    return (
        <div
          className="cursor-pointer overflow-hidden rounded-lg shadow bg-slate-200">
          <div className="px-4 py-5 sm:p-6" onClick={handleOnCLick}>
            <span className="text-3xl">New Entry</span>
          </div>
        </div>
      )
}

export default NewEntryCard