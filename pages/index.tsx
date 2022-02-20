import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { groq } from 'next-sanity'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { getClient, urlFor } from '../lib/sanity'

const postQuery = groq`
  *[_type == "site-config"][0] {
    logo ,
    mainNavigation[] -> {
      "name": page->title,
      "link": slug.current
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }
`

export const getStaticProps: GetStaticProps = async (context) => {
  const siteConfig = await getClient().fetch(postQuery)
  return {
    props: {
      siteConfig,
    },
  }
}

const Home: NextPage = ({
  siteConfig,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>{siteConfig.title}</title>
        </Head>
        <main className="container mx-auto 2xl:px-44">
          {JSON.stringify(siteConfig)}
          <div className="w-[79px h-[87px]">
            <Image
              src={urlFor(siteConfig.logo).width(79).height(87).url()}
              alt={siteConfig.logo.alt}
              width={79}
              height={87}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Home
