import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Icon, { IconData, IconName } from '../Icon'

interface MenuItem {
  name: string
  link?: string
  description?: string
  subMenuItems?: MenuItem[]
  icon?: IconData
}
interface MenuProps {
  menuItems: MenuItem[]
  isSubMenu?: boolean
}

const Menu = ({ menuItems, isSubMenu }: MenuProps) => {
  return (
    <ul className={`lg:flex lg:flex-row ${isSubMenu ? 'lg:flex-wrap' : ''}`}>
      {menuItems.map((menuItem, index) => (
        <li key={index} className="lg:w-[50%] ">
          {menuItem.link ? (
            <Link href={menuItem.link as string}>
              <a
                className={`group flex h-14  w-full items-center font-semibold active:text-pink-500 
                                ${
                                  index === menuItems.length - 1 && !isSubMenu
                                    ? 'border-b-0'
                                    : 'border-b-[1px]'
                                } 
                                lg:flex lg:h-full lg:flex-row lg:items-start lg:border-b-0 lg:py-6 lg:px-4 lg:text-slate-600 lg:hover:text-slate-400`}
              >
                {!isSubMenu && menuItem.name}
                {isSubMenu && (
                  <>
                    <span className="lg:hidden">{menuItem.name}</span>
                    {menuItem.icon ? (
                      <span className="hidden lg:block">
                        <Icon
                          icon={menuItem.icon.url as IconName}
                          className="mr-4 h-10 w-10 text-pink-500"
                        />
                      </span>
                    ) : (
                      ''
                    )}
                    <span className="hidden lg:block">
                      <span className="text-slate-700 group-hover:text-pink-500">
                        {menuItem.name}
                      </span>
                      <span className="hidden text-slate-500 group-hover:text-slate-500 lg:block">
                        {menuItem.description}
                      </span>
                    </span>
                  </>
                )}
              </a>
            </Link>
          ) : (
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="lg:py:5 flex h-14 w-full items-center justify-between border-b-[1px] font-semibold active:text-pink-500 lg:h-full lg:border-0 lg:py-6 lg:px-4 lg:text-slate-600  lg:hover:text-slate-400">
                    <span>{menuItem.name}</span>
                    <ChevronUpIcon
                      className={`transition-transform ${
                        open ? 'rotate-180 transform' : ''
                      } mr-2 h-6 w-6 `}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    className="lg:absolute lg:left-0 lg:w-full lg:bg-white lg:bg-opacity-95 lg:px-4 lg:drop-shadow lg:backdrop-blur"
                  >
                    <Disclosure.Panel
                      unmount={false}
                      className="sm:conatiner mx-auto px-4 lg:container"
                    >
                      {menuItem.subMenuItems && (
                        <Menu
                          menuItems={menuItem.subMenuItems}
                          isSubMenu={true}
                        />
                      )}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          )}
        </li>
      ))}
    </ul>
  )
}

const HeaderMenu = () => {
  const menuItems: MenuItem[] = [
    {
      name: 'Projects',
      link: '/projects',
    },
    {
      name: 'Services',
      subMenuItems: [
        {
          name: 'Next.js Website',
          link: '/services/nextjs-website-development',
          description: 'Hyper performant, built to last',
          icon: {
            isHeroIcon: true,
            url: 'FireIcon',
          },
        },
        {
          name: 'Web Design & Development',
          link: '/services/web-design-development',
          description: 'Building the best foundation for your web presence',
          icon: {
            isHeroIcon: true,
            url: 'GlobeAltIcon',
          },
        },
        {
          name: 'Budget Builds',
          link: '/services/budget-builds',
          description: 'Have a local business? Website builds for £5k',
          icon: {
            isHeroIcon: true,
            url: 'CurrencyPoundIcon',
          },
        },
        {
          name: 'Consultancy',
          link: '/services/consultancy',
          description: 'Rapid fire advice to transform your business',
          icon: {
            isHeroIcon: true,
            url: 'PresentationChartLineIcon',
          },
        },
      ],
    },
    {
      name: 'Blog',
      link: '/blog',
    },
  ]
  return <Menu menuItems={menuItems} />
}

export default HeaderMenu
