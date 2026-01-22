'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 시뮬레이션: 실제로는 백엔드 API 호출
    alert('로그인 기능은 백엔드 연동 후 활성화됩니다!')
    router.push('/verify')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary-600">
            FactChecker
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">로그인</h1>
          <p className="text-gray-600 mt-2">정보 검증을 시작하세요</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-600" />
                <span className="ml-2 text-sm text-gray-600">로그인 유지</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:underline">
                비밀번호 찾기
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
            >
              로그인
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <span className="text-xl">G</span> Google로 로그인
              </button>
              <button className="w-full py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition flex items-center justify-center gap-2">
                <span className="text-xl">K</span> Kakao로 로그인
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link href="/register" className="text-primary-600 font-medium hover:underline">
              회원가입
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
