import { WhatsAppFloating } from '@/components/whatsapp-floating'
import React from 'react'

function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      {children}
      <WhatsAppFloating />
    </div>
  )
}

export default ShopLayout
