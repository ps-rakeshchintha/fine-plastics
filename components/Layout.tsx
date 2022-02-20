import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="container mx-auto 2xl:px-44">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
