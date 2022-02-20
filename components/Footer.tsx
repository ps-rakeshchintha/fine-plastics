import Link from 'next/link'
import Button from './Button'
import Icon, { IconData, IconName } from './Icon'
import Logo from './Logo'

interface footerColumn {
  category: string
  links?: {
    name: string
    url: string
  }[]
  description?: string
  CTAButton?: {
    icon?: IconData
    text: string
    url: IconName | string
  }
}

const Footer = () => {
  const footerColumns: footerColumn[] = [
    {
      category: 'PROJECTS',
      links: [
        {
          name: 'Airtime Rewards',
          url: '/projects',
        },
        {
          name: 'Mojo Mortgages',
          url: '/projects',
        },
        {
          name: 'The Bang Co',
          url: '/projects',
        },
      ],
    },
    {
      category: 'LEGAL',
      links: [
        {
          name: 'Privacy',
          url: '/contact',
        },
        {
          name: 'Contact',
          url: '/contact',
        },
      ],
    },
    {
      category: 'LIKE WHAT YOU SEE?',
      description: 'Sign up for a 30 min chat and see if we can help',
      CTAButton: {
        icon: {
          isHeroIcon: true,
          url: 'CalendarIcon',
        },
        text: 'Book a meeting',
        url: '/contact',
      },
    },
  ]
  return (
    <footer className="container mx-auto divide-y py-12 px-4 ">
      <div className="flex flex-col pb-10 lg:flex-row">
        <div className="flex-1 mt-10">
          <Logo />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-10 md:grid-cols-4">
          {footerColumns.map((footerColumn, index) => (
            <div key={index} className={`${footerColumn.links ? 'col-span-1' : 'col-span-2'}`}>
              <h3 className="mb-4 font-semibold text-slate-600">{footerColumn.category}</h3>
              {footerColumn.links && (
                <ul>
                  {footerColumn.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="my-2  first:my-0">
                      <Link href={link.url}>
                        <a className="h-6 border-gray-500 hover:border-b-[1px]">{link.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {footerColumn.description && <p className="my-6 text-gray-800">{footerColumn.description}</p>}
              {footerColumn.CTAButton && (
                <Button variant="light" className="my-4 flex w-fit gap-2" href={footerColumn.CTAButton.url}>
                  {footerColumn.CTAButton.icon && footerColumn.CTAButton.icon.isHeroIcon && <Icon className="h-5 w-5" icon={footerColumn.CTAButton.icon.url as IconName} />}
                  {footerColumn.CTAButton.text}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="pt-10 text-center text-sm text-gray-800 md:text-left">© 2022 Built by CRR</div>
    </footer>
  )
}
export default Footer
