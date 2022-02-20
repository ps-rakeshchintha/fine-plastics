import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { groq } from 'next-sanity';
import Head from 'next/head';
import Image from 'next/image';
import { getClient, urlFor } from '../lib/sanity';


const postQuery = groq`
  *[_type == "site-config"][0] {
    ...,
    logo,
    mainNavigation[] -> {
      ...,
      "title": page->title
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

const Home: NextPage = ({ siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{siteConfig.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className='h-[87px] w-[79px'>
          <Image src={urlFor(siteConfig.logo).width(79).height(87).url()} alt={siteConfig.logo.alt} width={79} height={87} />
        </div>

        {JSON.stringify(siteConfig)}
      </div>
    </div>
  )
}

export default Home
