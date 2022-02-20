import { urlFor } from "../lib/sanity"
import Image from 'next/image'

interface LogoProps {
  logo: any
}
const Logo = ({ logo }: LogoProps) => {
  return (
    <div className="w-[79px h-[87px]">
      <Image src={urlFor(logo).width(79).height(87).url()} alt={logo.alt} width={79} height={87} />
    </div>
  )
}

export default Logo
