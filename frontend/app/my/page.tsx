'use client'

import Link from 'next/link'

export default function MyPage() {
  // 시뮬레이션 데이터
  const verifications = [
    {
      id: 1,
      content: '하루 물 8잔을 마시는 것이 건강에 필수적이다',
      trustLevel: 'caution',
      date: '2026-01-22',
      saved: true
    },
    {
      id: 2,
      content: '비타민 C는 감기 예방에 효과적이다',
      trustLevel: 'trusted',
      date: '2026-01-21',
      saved: false
    },
    {
      id: 3,
      content: '뇌는 전체 에너지의 10%만 사용한다',
      trustLevel: 'suspicious',
      date: '2026-01-20',
      saved: true
    }
  ]

  const getTrustLevelColor = (level: string) => {
    switch(level) {
      case 'trusted': return 'bg-green-100 text-green-800'
      case 'caution': return 'bg-yellow-100 text-yellow-800'
      case 'suspicious': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrustLevelText = (level: string) => {
    switch(level) {
      case 'trusted': return '신뢰 가능'
      case 'caution': return '주의 필요'
      case 'suspicious': return '의심스러움'
      default: return '분석 중'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              FactChecker
            </Link>
            <nav className="flex gap-6">
              <Link href="/verify" className="text-gray-600 hover:text-primary-600">
                검증하기
              </Link>
              <Link href="/my" className="text-primary-600 font-medium">
                내 검증
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-primary-600">
                로그아웃
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">내 검증 히스토리</h1>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">12</div>
              <div className="text-gray-600">총 검증 수</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600">신뢰 가능</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">4</div>
              <div className="text-gray-600">주의 필요</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-3xl font-bold text-red-600 mb-2">3</div>
              <div className="text-gray-600">의심스러움</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex gap-4 items-center">
              <span className="text-gray-700 font-medium">필터:</span>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">
                전체
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                저장됨
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                최근 7일
              </button>
              <div className="ml-auto">
                <input
                  type="text"
                  placeholder="검색..."
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Verification List */}
          <div className="space-y-4">
            {verifications.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrustLevelColor(item.trustLevel)}`}>
                        {getTrustLevelText(item.trustLevel)}
                      </span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                      {item.saved && (
                        <span className="text-yellow-500">⭐</span>
                      )}
                    </div>
                    <p className="text-gray-900 text-lg mb-3">{item.content}</p>
                    <div className="flex gap-4">
                      <Link
                        href={`/verify/${item.id}`}
                        className="text-primary-600 text-sm font-medium hover:underline"
                      >
                        자세히 보기 →
                      </Link>
                      <button className="text-gray-600 text-sm font-medium hover:text-gray-900">
                        공유하기
                      </button>
                      <button className="text-gray-600 text-sm font-medium hover:text-red-600">
                        삭제
                      </button>
                    </div>
                  </div>
                  <button className="text-2xl text-gray-400 hover:text-yellow-500">
                    {item.saved ? '⭐' : '☆'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (if no data) */}
          {verifications.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                아직 검증 기록이 없습니다
              </h3>
              <p className="text-gray-600 mb-6">
                첫 정보를 검증해보세요!
              </p>
              <Link
                href="/verify"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
              >
                검증 시작하기
              </Link>
            </div>
          )}

          {/* Folders Section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">내 폴더</h2>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
                + 새 폴더
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition cursor-pointer">
                <div className="text-3xl mb-3">📁</div>
                <h3 className="font-bold text-gray-900 mb-1">건강 정보</h3>
                <p className="text-sm text-gray-600">5개 항목</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition cursor-pointer">
                <div className="text-3xl mb-3">📁</div>
                <h3 className="font-bold text-gray-900 mb-1">뉴스 팩트체크</h3>
                <p className="text-sm text-gray-600">3개 항목</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition cursor-pointer border-2 border-dashed border-gray-300">
                <div className="text-3xl mb-3">➕</div>
                <h3 className="font-bold text-gray-600 mb-1">새 폴더 만들기</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
