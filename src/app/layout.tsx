import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GitHub Users',
  description: 'List of users:',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/editListIcon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
