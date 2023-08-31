import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"

const getEntries = async() => {
    const user = await getUserByClerkId()

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId:user.id
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    // await analyze('give solution for two-sum leetcode')
    return entries

    
}

const JournalPage = async() => {
    const entries = await getEntries();
    return (
        <div className="bg-zinc-400/10 p-10 h-full">
            <h2 className="text-3xl mb-8">Journals</h2> 
        <div className="grid grid-cols-3 gap-4 p-10">
            <NewEntryCard />
            {entries.map((entry) => 
                (
                    <Link href={`/journal/${entry.id}`} key = {entry.id}>
                        <EntryCard  entry={entry} />
                    </Link>
                )
            )}
        </div>
        </div>
    )
}

export default JournalPage