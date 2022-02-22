import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Icon, { IconData, IconName } from '../Icon'

export interface MenuItem {
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
        <li key={index} className={`${isSubMenu ? 'lg:w-[50%]' : ''} `}>
          {menuItem.link ? (
            <Link href={menuItem.link as string}>
              <a
                className={`group flex h-14  w-full items-center active:text-primary-600 
                                ${index === menuItems.length - 1 && !isSubMenu ? 'border-b-0' : 'border-b-[1px]'} 
                                lg:flex lg:h-full lg:flex-row lg:items-start lg:border-b-0 lg:py-6 lg:px-4 text-secondary-700 hover:text-secondary-600`}
              >
                {!isSubMenu && menuItem.name}
                {isSubMenu && (
                  <>
                    <span className="lg:hidden">{menuItem.name}</span>
                    {menuItem.icon ? (
                      <span className="hidden lg:block">
                        <Icon icon={menuItem.icon.url as IconName} className="mr-4 h-10 w-10 text-primary-600" />
                      </span>
                    ) : (
                      ''
                    )}
                    <span className="hidden lg:block">
                      <span className="text-secondary-700 group-hover:text-primary-600">{menuItem.name}</span>
                      <span className="hidden text-secondary-500 group-hover:text-secondary-500 lg:block">{menuItem.description}</span>
                    </span>
                  </>
                )}
              </a>
            </Link>
          ) : (
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="lg:py:5 flex h-14 w-full items-center justify-between border-b-[1px] font-semibold active:text-primary-600 lg:h-full lg:border-0 lg:py-6 lg:px-4 lg:text-secondary-700  lg:hover:text-secondary-600">
                    <span>{menuItem.name}</span>
                    <ChevronUpIcon className={`transition-transform ${open ? 'rotate-180 transform' : ''} mr-2 h-6 w-6 `} />
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
                    <Disclosure.Panel unmount={false} className="sm:conatiner mx-auto px-4 lg:container">
                      {menuItem.subMenuItems && <Menu menuItems={menuItem.subMenuItems} isSubMenu={true} />}
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

const HeaderMenu = ({ menuItems }: MenuProps) => {
  return <Menu menuItems={menuItems} />
}

export default HeaderMenu
