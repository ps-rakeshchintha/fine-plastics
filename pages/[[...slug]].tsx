import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { groq } from 'next-sanity'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { getClient, urlFor } from '../lib/sanity'

const siteConfigQuery = groq`
  *[_type == "site-config"][0] {
    ...,
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
const pageQuery = groq`
  *[_type == "route" && slug.current == $slug][0]{
    page-> {
      title,
      description
    }
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

export const getStaticProps: GetStaticProps = async (context) => {
  const siteConfig = await getClient().fetch(siteConfigQuery)
  const slug = context.params?.slug ? (context.params?.slug as String[]).join("/") : "/";
  const pageData = await getClient().fetch(pageQuery, {
    slug
  })
  return {
    props: {
      siteConfig,
      pageData: pageData.page
    },
  }
}

const Home: NextPage = ({ siteConfig, pageData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header siteConfig={siteConfig} />
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>{pageData?.title}</title>
        </Head>
        {JSON.stringify(siteConfig)}
        <main className="container mx-auto 2xl:px-44">
          <h1 className='text-7xl'>{pageData?.title}</h1>
          <h2 className='text-3xl'>{pageData?.description}</h2>
        </main>
      </div>
      <Footer siteConfig={siteConfig.logo} />
    </>
  )
}

export default Home
