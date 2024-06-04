import './globals.css'
import type { Metadata } from 'next'
import { Chakra_Petch, Inter, Montserrat, Open_Sans, Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Nunito } from 'next/font/google'
import { ModalProvider } from '@/components/modal-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crisp-provider'

import { dark } from '@clerk/themes';
import { AdminModalProvider } from '@/components/admin/admin-modal-provider'


// const inter = Outfit({ subsets: ['latin'] })

const inter = Chakra_Petch({
  subsets: ["latin"],
  weight: "300"
});

export const metadata: Metadata = {
  title: 'CashOut Trivia | Next-Gen Trivia Experience',
  description: 'Next-Gen Trivia Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: "#ed2324",
        colorText: "white"
      },
      elements: {
        formButtonPrimary: {
          backgroundColor: "bg-gradient-to-r from-red-500 to-red-800",
        }
      }
    }}
    
    
    >
    <html lang="en" className='bg-[#1A1818]'>
      <CrispProvider />
      <body className={inter.className}>
      <ModalProvider />
      <ToasterProvider />
     
        {children}
     
      </body>
    </html>
    </ClerkProvider>
  )
}
