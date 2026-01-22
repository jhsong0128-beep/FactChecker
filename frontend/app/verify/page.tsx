'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VerifyPage() {
  const [inputType, setInputType] = useState<'text' | 'url' | 'image'>('text')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 시뮬레이션: 실제로는 백엔드 API를 호출
    setTimeout(() => {
      setResult({
        trustLevel: 'caution',
        summary: '이 정보는 일부 출처에서만 확인되었습니다. 추가적인 검증이 필요합니다.',
        analysis: {
          mainClaims: ['검증이 필요한 주장입니다'],
          findings: '제한적인 증거가 발견되었습니다',
          context: '맥락 분석 결과',
          limitations: '추가 검증이 필요합니다'
        },
        sources: [
          {
            title: '관련 학술 자료 (예시)',
            url: 'https://example.com',
            type: 'academic',
            reason: '신뢰할 수 있는 출처'
          }
        ]
      })
      setIsLoading(false)
    }, 2000)
  }

  const getTrustLevelColor = (level: string) => {
    switch(level) {
      case 'trusted': return 'bg-green-100 text-green-800 border-green-200'
      case 'caution': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'suspicious': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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
              <Link href="/verify" className="text-primary-600 font-medium">
                검증하기
              </Link>
              <Link href="/my" className="text-gray-600 hover:text-primary-600">
                내 검증
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-primary-600">
                로그인
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            정보 검증하기
          </h1>

          {/* Input Type Selector */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              입력 방식 선택
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setInputType('text')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                  inputType === 'text'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">📝</div>
                <div className="font-medium">텍스트</div>
              </button>
              <button
                onClick={() => setInputType('url')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                  inputType === 'url'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">🔗</div>
                <div className="font-medium">URL</div>
              </button>
              <button
                onClick={() => setInputType('image')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                  inputType === 'image'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">🖼️</div>
                <div className="font-medium">이미지</div>
              </button>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {inputType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  검증할 텍스트를 입력하세요
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  rows={6}
                  placeholder="예: 하루 물 8잔을 마시는 것이 건강에 필수적이다"
                  required
                />
              </div>
            )}

            {inputType === 'url' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  검증할 URL을 입력하세요
                </label>
                <input
                  type="url"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="https://example.com/article"
                  required
                />
              </div>
            )}

            {inputType === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이미지를 업로드하세요
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-600 transition cursor-pointer">
                  <div className="text-4xl mb-2">📤</div>
                  <p className="text-gray-600">클릭하거나 드래그하여 이미지 업로드</p>
                  <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF (최대 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setContent(e.target.files[0].name)
                      }
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !content}
              className="w-full mt-6 py-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {isLoading ? '분석 중...' : '검증 시작'}
            </button>
          </form>

          {/* Results */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
              <p className="text-gray-600">AI가 정보를 분석하고 있습니다...</p>
            </div>
          )}

          {result && !isLoading && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">검증 결과</h2>

              {/* Trust Level Badge */}
              <div className="mb-6">
                <span className={`inline-block px-6 py-3 rounded-full border-2 text-lg font-bold ${getTrustLevelColor(result.trustLevel)}`}>
                  {getTrustLevelText(result.trustLevel)}
                </span>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">요약</h3>
                <p className="text-gray-700 leading-relaxed">{result.summary}</p>
              </div>

              {/* Analysis */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">상세 분석</h3>
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  <div>
                    <strong className="text-gray-700">주요 논점:</strong>
                    <p className="text-gray-600 mt-1">{result.analysis.mainClaims.join(', ')}</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">확인된 사실:</strong>
                    <p className="text-gray-600 mt-1">{result.analysis.findings}</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">맥락:</strong>
                    <p className="text-gray-600 mt-1">{result.analysis.context}</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">한계:</strong>
                    <p className="text-gray-600 mt-1">{result.analysis.limitations}</p>
                  </div>
                </div>
              </div>

              {/* Sources */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">참고 출처</h3>
                <div className="space-y-3">
                  {result.sources.map((source: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary-600 transition">
                      <h4 className="font-medium text-gray-900 mb-1">{source.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{source.reason}</p>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 text-sm hover:underline">
                        출처 보기 →
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
                  저장하기
                </button>
                <button
                  onClick={() => {
                    setResult(null)
                    setContent('')
                  }}
                  className="flex-1 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  새로 검증하기
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
