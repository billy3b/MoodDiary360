import { UserButton } from "@clerk/nextjs"
import Link from "next/dist/client/link"

const links = [
    { name: 'Home', href: '/' },
    { name: 'Journals', href: '/journal' },
    { name: 'History', href: '/history' },
  ]

const Dashboard =({children}) => {
    return <div className="h-screen w-screen relative">
        <aside className="absolute w-[200px] top-0 left-0 border-r border-black/10">
            <div>
                Mood
            </div>
            <ul>
                {links.map(link =>
                    <li key={link.href} className="px-2 py-6 text-xl">
                        <Link href={link.href}>{link.name}</Link>
                    </li>)}
            </ul>
        </aside>
        <div className="ml-[200px] h-full">

            <header className="h-[60px] border-b border-black/10">
                <div className="h-full w-full px-6 flex items-center justify-end">
                    <UserButton />
                </div>
            </header>
            <div className="h-[calc(100vh-60px)]">{children}</div>
        </div>
        </div>
}

export default Dashboard