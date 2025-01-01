import '@/styles/globals.css'

export const metadata = {
  title: 'ניהול משק חקלאי',
  description: 'מערכת לניהול מכירות והוצאות במשק חקלאי',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  )
}
