import { Transition } from '@headlessui/react'
import { MoonIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'
import Button from '../Button'
import HeaderMenu, { MenuItem } from './HeaderMenu'
import Logo from '../Logo'

export interface HeaderProps {
  menuItems: MenuItem[];
  logo: any
}

const CTA = () => {
  return (
    <>
      <Button href="/contact" variant="primary">
        Contact
      </Button>
      <Button variant="light" className="flex items-center justify-center">
        <MoonIcon className="h-4 w-4" />
      </Button>
    </>
  )
}

const Header = ({ menuItems, logo }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <header className="bg-white bg-opacity-95 backdrop-blur">
      <nav className="sm:conatiner mx-auto lg:container">
        <div className="flex items-center justify-center px-6 align-middle lg:justify-between">
          <div className="absolute left-2 top-2 lg:hidden">
            <button className="group m-4" onClick={toggleMenu}>
              <span className="flex h-6 w-6 flex-col place-items-center items-center justify-around py-1">
                <span className={`inline-block h-[2px] w-5 bg-slate-400 transition-transform group-active:bg-pink-500 ${showMenu ? 'translate-y-1 rotate-45' : 'rotate-0'}`}></span>
                <span className={`inline-block h-[2px] w-5 bg-slate-400 transition-transform group-active:bg-pink-500 ${showMenu ? '-translate-y-1 -rotate-45' : 'rotate-0'}`}></span>
              </span>
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
          <div className="flex-1 p-4 text-center lg:flex-initial lg:text-left">
            <Link href="/">
              <a className="inline-block">
                <Logo logo={logo} />
                <span className="sr-only">Home</span>
              </a>
            </Link>
          </div>
          <div className="hidden lg:block">
            <HeaderMenu menuItems={menuItems} />
          </div>
          <div className="hidden gap-x-4 md:flex">
            <CTA />
          </div>
        </div>
        <Transition
          show={showMenu}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute left-0 w-full bg-white bg-opacity-95 py-6 px-4 drop-shadow backdrop-blur"
        >
          <HeaderMenu menuItems={menuItems} />
          <div className="grid gap-3 md:hidden">
            <CTA />
          </div>
        </Transition>
      </nav>
    </header>
  )
}

export default Header
