import Header from "@/components/header"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import Navbar from "@/components/navbar"
import Layout from "./layout"
 
type AppOwnProps = { example: string }
 
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  example,
}: AppProps & AppOwnProps) {
  return (
    <SessionProvider session={session}>
<Navbar />
      {/* <p>Data: {example}</p> */}
      <div className="container mx-auto px-4">

      <Component {...pageProps} />

      </div>
    </SessionProvider>
  )
}
 
MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx, example: 'data' }
}
