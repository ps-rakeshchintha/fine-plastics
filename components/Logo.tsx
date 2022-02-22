import { urlFor } from "../lib/sanity"
import Image from 'next/image'
import SVG from 'react-inlinesvg'

interface LogoProps {
  logo: any
}
const Logo = ({ logo }: LogoProps) => {

  const renderLogo = (logo: any) => {
    if (!logo || !logo.asset) {
      return null
    }

    if (logo.asset._ref.indexOf('svg') > -1) {
      return <SVG src={urlFor(logo).url()} className="w-20" />
    }

    return <Image src={urlFor(logo).width(79).height(87).url()} alt={logo.alt} width={79} height={87} />
  }
  return renderLogo(logo)
}

export default Logo
