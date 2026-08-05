import React from 'react'

function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      {children}
    </div>
  )
}

export default ShopLayout
