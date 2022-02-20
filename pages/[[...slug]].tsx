import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { groq } from 'next-sanity'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { getClient, urlFor } from '../lib/sanity'

const siteConfigQuery = groq`
  *[_type == "site-config"][0] {
    logo ,
    mainNavigation[] -> {
      "name": page->title,
      "link": "/"+slug.current
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }
`
const routesQuery = groq`
  *[_type == "route"] {
    "slug": slug.current
  }
`

interface Route {
  slug: string;
}

export async function getStaticPaths() {
  const routes: Route[] = await getClient().fetch(routesQuery)

  // Get the paths we want to pre-render based on posts
  const paths = routes.map((route) => ({
    params: { slug: route.slug === "/" ? false : [route.slug] },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const siteConfig = await getClient().fetch(siteConfigQuery)
  return {
    props: {
      siteConfig,
    },
  }
}

const Home: NextPage = ({ siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header menuItems={siteConfig.mainNavigation} logo={siteConfig.logo} />
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>{siteConfig.title}</title>
        </Head>
        <main className="container mx-auto 2xl:px-44">
        </main>
      </div>
      <Footer logo={siteConfig.logo} />
    </>
  )
}

export default Home
