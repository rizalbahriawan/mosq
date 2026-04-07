import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'

type Announcement = {
    title: string
    date: string
    image?: string
    body: string
    slug: string
}

type Props = {
    announcements: Announcement[]
}

export const getStaticProps: GetStaticProps = async () => {
    const dir = path.join(process.cwd(), 'content/announcements')
    const files = fs.readdirSync(dir)

    const announcements: Announcement[] = files.map((f): Announcement => {
        const raw = fs.readFileSync(path.join(dir, f), 'utf8')
        const parsed = matter(raw)

        return {
            title: parsed.data.title,
            date: parsed.data.date,
            image: parsed.data.image || '',
            body: parsed.content,
            slug: f.replace('.md', ''),
        }

    })

    return {
        props: {
            announcements,
        },
    }
}

export default function Home({ announcements }: Props) {
    return ( 
    <main> 
        <h1>Announcements</h1>
        {
            announcements.map((a) => ( 
            <article key={a.slug}> <h2>{a.title}</h2> <p>{a.date}</p>
            {a.image && (
            <img
                src={a.image}
                alt={a.title}
                style={{ maxWidth: '100%' }}
                />
                )} 
            <ReactMarkdown>{a.body}</ReactMarkdown> </article>
            )
        )
        } 
    </main>
    )
}
