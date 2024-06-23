export const metadata = {
  title: 'Yevhenii',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 24 }}>{children}</body>
    </html>
  )
}
