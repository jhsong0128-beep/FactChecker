import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FactChecker - AI 기반 정보 검증 서비스',
  description: '텍스트, URL, 이미지 속 정보의 진실성을 AI로 빠르게 검증하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
