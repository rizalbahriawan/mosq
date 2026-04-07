import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'content/announcements')
  const files = fs.readdirSync(dir)
  const announcements = files.map(f => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8')
    const { data, content } = matter(raw)
    return { ...data, body: content, slug: f.replace('.md', '') }
  })
  return { props: { announcements } }
}

export default function Home({ announcements }) {
  return (
    <main>
      <h1>Announcements</h1>
      {announcements.map(a => (
        <article key={a.slug}>
          <h2>{a.title}</h2>
          <p>{a.date}</p>
          {a.image && <img src={a.image} alt={a.title} style={{maxWidth:'100%'}} />}
          <p>{a.body}</p>
        </article>
      ))}
    </main>
  )
}