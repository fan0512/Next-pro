import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Home(initialData) {
  const [formInputs, setFormInputs] = useState()
  const [searchTerm, setSearchTerm] = useState('cats')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setSearchResults(initialData.catGiphys.data)
  }, [initialData])

  const handleInputs = (event) => {
    let { name, value } = event.target
    setFormInputs({ ...formInputs, [name]: value });
  }

  const search = async (event) => {
    event.preventDefault()
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=2xu8dgU1KoOpI1qNt952dQnhhz9FOUDx&limit=6`)
    giphys = await giphys.json()
    setSearchResults(giphys.data)
    setSearchTerm(formInputs.searchTerm)
    console.log('success')
  }
  return (
    <>
    <div className="container" >
      <Head>
        <title>Giphy Search App</title>
        <meta name="description" content="This is an example of a meta description. This will often show up in search results."></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div className="logo-container">
        <Image src="/download.jpg"
                width="100"
                height="100"
                alt="logo"
                unsized
          />
      </div>
      <h1>Giphy Search App</h1>
      
      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInputs} type="text" required />
        <button>Search</button>
      </form>

      <h2>Search results for:{searchTerm}</h2>
      <Link
        href="/search/[pid]"
        as={`/search/${searchTerm}`}>
        {`http://localhost:3000/search/${searchTerm}`}
      </Link>
      <div className="giphy-search-results-grid">
        {searchResults.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          )
        })}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export async function getStaticProps() {
  let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=2xu8dgU1KoOpI1qNt952dQnhhz9FOUDx&limit=6')
  catGiphys = await catGiphys.json()
  return { props: { catGiphys: catGiphys } }
}