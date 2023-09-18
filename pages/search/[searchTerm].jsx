import Head from 'next/head'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'

export default function Search(initialData) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Search results for:{router.query.searchTerm}</title>
                <meta name="description" content={initialData.giphys.data.map((each,index)=>each.title+'')}></meta>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css" />
            </Head>
            <p>Go<Link href="/">home</Link></p>
            <h1>Search results for:{router.query.searchTerm}</h1>
            <div className="giphy-search-results-grid">
                {initialData.giphys.data.map((each, index) => {
                    return (
                        <div key={index}>
                            <h3>{each.title}</h3>
                            <img src={each.images.original.url} alt={each.title} />
                        </div>
                    )
                })}
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const searchTerm = context.query.searchTerm
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=2xu8dgU1KoOpI1qNt952dQnhhz9FOUDx&limit=6`)
    giphys = await giphys.json()
    return { props: { giphys: giphys } }
}