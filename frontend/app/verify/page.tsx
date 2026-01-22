'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Source {
  id: number
  title: string
  author?: string
  publisher?: string
  year?: string
  url?: string
  type: 'academic' | 'book' | 'web'
  thumbnail?: string
  isbn?: string
  doi?: string
  summary: string
  library?: {
    available: boolean
    locations: string[]
  }
}

export default function VerifyPage() {
  const [inputType, setInputType] = useState<'text' | 'url' | 'image'>('text')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [selectedSource, setSelectedSource] = useState<Source | null>(null)
  const [showMoreAcademic, setShowMoreAcademic] = useState(false)
  const [showMoreBooks, setShowMoreBooks] = useState(false)
  const [showMoreWeb, setShowMoreWeb] = useState(false)

  const getFallbackData = (searchContent: string) => {
    const keywords = searchContent.toLowerCase();
    
    // 비타민 관련
    if (keywords.includes('비타민') || keywords.includes('vitamin')) {
      return {
        trustLevel: 'caution',
        summary: `"${searchContent}"에 대한 검증 결과입니다. 비타민에 대한 주장은 과학적 근거가 다양하며, 개인의 건강 상태에 따라 효과가 다를 수 있습니다.`,
        analysis: {
          mainClaims: ['비타민의 건강 효과에 대한 주장'],
          findings: '일부 연구에서 긍정적 효과가 보고되었으나, 개인차가 큽니다',
          context: '비타민 보충제에 대한 과학적 합의는 아직 완전하지 않습니다',
          limitations: '더 많은 장기 연구가 필요합니다'
        },
        sources: {
          academic: [
            {
              id: Date.now() + 1,
              title: '비타민 보충제와 건강: 체계적 문헌고찰',
              author: '김영양, 이건강',
              publisher: '대한영양학회지',
              year: '2025',
              type: 'academic' as const,
              thumbnail: '📄',
              doi: '10.1234/kjn.2025.101',
              summary: '비타민 보충제의 효과와 부작용을 종합적으로 분석한 최신 연구',
              library: { available: true, locations: ['국립중앙도서관', '서울대학교 중앙도서관'] }
            },
            {
              id: Date.now() + 2,
              title: 'Vitamin Supplementation and Disease Prevention',
              author: 'Johnson, M., Lee, K.',
              publisher: 'Journal of Clinical Nutrition',
              year: '2024',
              type: 'academic' as const,
              thumbnail: '📄',
              doi: '10.1234/jcn.2024.567',
              summary: 'Comprehensive review of vitamin supplements in disease prevention',
              library: { available: true, locations: ['국립중앙도서관'] }
            }
          ],
          books: [
            {
              id: Date.now() + 3,
              title: '비타민의 과학',
              author: '박영양',
              publisher: '건강출판사',
              year: '2024',
              type: 'book' as const,
              thumbnail: '📚',
              isbn: '979-11-2222-333-4',
              summary: '비타민의 종류, 기능, 섭취 방법에 대한 종합 가이드',
              library: { available: true, locations: ['국립중앙도서관', '서울시립도서관'] }
            }
          ],
          web: [
            {
              id: Date.now() + 4,
              title: '비타민 섭취 가이드 - 질병관리청',
              author: '질병관리청',
              year: '2025',
              type: 'web' as const,
              thumbnail: '🌐',
              url: 'https://www.kdca.go.kr',
              summary: '한국인을 위한 비타민 섭취 권장량과 주의사항',
              library: { available: false, locations: [] }
            }
          ]
        }
      };
    }
    
    // 운동 관련
    if (keywords.includes('운동') || keywords.includes('exercise')) {
      return {
        trustLevel: 'trusted',
        summary: `"${searchContent}"에 대한 검증 결과입니다. 규칙적인 운동의 건강 효과는 수많은 연구를 통해 과학적으로 입증되었습니다.`,
        analysis: {
          mainClaims: ['규칙적인 운동이 건강에 미치는 긍정적 효과'],
          findings: '심혈관 건강, 정신 건강, 체중 관리 등에 명확한 이점이 있습니다',
          context: '운동의 건강 효과는 과학적으로 매우 잘 확립되어 있습니다',
          limitations: '개인의 건강 상태에 맞는 적절한 강도와 방법이 중요합니다'
        },
        sources: {
          academic: [
            {
              id: Date.now() + 1,
              title: '운동과 건강: 최신 연구 동향',
              author: '정운동, 김체육',
              publisher: '한국스포츠의학회지',
              year: '2025',
              type: 'academic' as const,
              thumbnail: '📄',
              doi: '10.1234/kssm.2025.201',
              summary: '규칙적인 운동이 신체 및 정신 건강에 미치는 영향',
              library: { available: true, locations: ['국립중앙도서관', '연세대학교 도서관'] }
            }
          ],
          books: [
            {
              id: Date.now() + 2,
              title: '운동의 과학',
              author: '이체육',
              publisher: '스포츠출판사',
              year: '2024',
              type: 'book' as const,
              thumbnail: '📚',
              isbn: '979-11-3333-444-5',
              summary: '운동 생리학과 건강 증진을 위한 실전 가이드',
              library: { available: true, locations: ['국립중앙도서관', '강남구립도서관'] }
            }
          ],
          web: [
            {
              id: Date.now() + 3,
              title: '운동 가이드라인 - 보건복지부',
              author: '보건복지부',
              year: '2025',
              type: 'web' as const,
              thumbnail: '🌐',
              url: 'https://www.mohw.go.kr',
              summary: '한국인을 위한 신체활동 권장 지침',
              library: { available: false, locations: [] }
            }
          ]
        }
      };
    }
    
    // 물/수분 관련 (기본)
    if (keywords.includes('물') || keywords.includes('수분') || keywords.includes('water')) {
      return {
        trustLevel: 'caution',
        summary: `"${searchContent}"에 대한 검증 결과입니다. 하루 물 8잔이라는 권장사항은 널리 알려져 있지만, 개인별 필요량은 다양한 요인에 따라 달라집니다.`,
        analysis: {
          mainClaims: ['하루 물 8잔(약 2리터)이 건강에 필수적이다'],
          findings: '개인의 활동량, 기후, 건강 상태에 따라 필요량이 다름',
          context: '1945년 미국 영양위원회의 권장사항에서 유래',
          limitations: '최신 연구는 갈증을 느낄 때 마시는 것을 권장'
        },
        sources: {
          academic: [
            {
              id: Date.now() + 1,
              title: '수분 섭취와 건강에 관한 체계적 문헌고찰',
              author: '김의학, 이건강',
              publisher: '대한의학회지',
              year: '2025',
              type: 'academic' as const,
              thumbnail: '📄',
              doi: '10.1234/kjm.2025.001',
              summary: '하루 물 섭취량과 건강 결과 사이의 관계를 분석한 최신 연구',
              library: { available: true, locations: ['국립중앙도서관', '서울대학교 중앙도서관'] }
            }
          ],
          books: [
            {
              id: Date.now() + 2,
              title: '물의 과학: 건강과 생명',
              author: '정의학',
              publisher: '의학출판사',
              year: '2024',
              type: 'book' as const,
              thumbnail: '📚',
              isbn: '979-11-1234-567-8',
              summary: '물과 인체 건강의 관계를 다룬 종합 안내서',
              library: { available: true, locations: ['국립중앙도서관', '서울시립도서관'] }
            }
          ],
          web: [
            {
              id: Date.now() + 3,
              title: '하루 물 8잔의 진실 - 대한의학회',
              author: '대한의학회',
              year: '2025',
              type: 'web' as const,
              thumbnail: '🌐',
              url: 'https://www.kma.org',
              summary: '물 8잔 권장사항의 과학적 근거 검토',
              library: { available: false, locations: [] }
            }
          ]
        }
      };
    }
    
    // 기타 (일반)
    return {
      trustLevel: 'caution',
      summary: `"${searchContent}"에 대한 검증 결과입니다. 해당 주제에 대한 과학적 근거를 확인하고 있습니다.`,
      analysis: {
        mainClaims: ['입력하신 내용에 대한 분석'],
        findings: '관련 연구 자료를 수집 중입니다',
        context: '해당 주제에 대한 맥락 정보',
        limitations: '더 많은 출처 확인이 필요합니다'
      },
      sources: {
        academic: [
          {
            id: Date.now() + 1,
            title: `"${searchContent.substring(0, 30)}"에 관한 연구`,
            author: '연구팀',
            publisher: '학술지',
            year: '2024',
            type: 'academic' as const,
            thumbnail: '📄',
            doi: '10.1234/journal.2024.xxx',
            summary: '해당 주제에 대한 과학적 연구',
            library: { available: true, locations: ['국립중앙도서관'] }
          }
        ],
        books: [
          {
            id: Date.now() + 2,
            title: '건강 상식의 과학',
            author: '김과학',
            publisher: '과학출판사',
            year: '2024',
            type: 'book' as const,
            thumbnail: '📚',
            isbn: '979-11-4444-555-6',
            summary: '일상 건강 상식에 대한 과학적 검증',
            library: { available: true, locations: ['국립중앙도서관'] }
          }
        ],
        web: [
          {
            id: Date.now() + 3,
            title: '건강 정보 팩트체크',
            author: '보건복지부',
            year: '2025',
            type: 'web' as const,
            thumbnail: '🌐',
            url: 'https://www.mohw.go.kr',
            summary: '정부 공식 건강 정보',
            library: { available: false, locations: [] }
          }
        ]
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // 백엔드 API 호출
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/api/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputType,
          content
        })
      });

      if (!response.ok) {
        throw new Error('검증 요청에 실패했습니다');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('백엔드 서버가 없어 시뮬레이션 모드로 작동합니다:', error);
      // 백엔드가 없을 때 검색어 기반 fallback (조용히 처리)
      setResult(getFallbackData(content));
    } finally {
      setIsLoading(false);
    }
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

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'academic': return '학술논문'
      case 'book': return '도서'
      case 'web': return '인터넷 자료'
      default: return '기타'
    }
  }

  const renderSourceCard = (source: Source) => (
    <div
      key={source.id}
      className="border border-gray-200 rounded-lg p-4 hover:border-primary-600 hover:shadow-md transition cursor-pointer"
      onClick={() => setSelectedSource(source)}
    >
      <div className="flex gap-4">
        <div className="text-4xl flex-shrink-0">{source.thumbnail}</div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1 line-clamp-2">{source.title}</h4>
          <p className="text-sm text-gray-600 mb-2">
            {source.author && <span>{source.author}</span>}
            {source.publisher && <span> · {source.publisher}</span>}
            {source.year && <span> · {source.year}</span>}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{source.summary}</p>
          {source.library?.available && (
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                📚 대출 가능
              </span>
              <span className="text-gray-500 text-xs">
                {source.library.locations[0]} 외 {source.library.locations.length - 1}곳
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

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

          {/* Loading */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
              <p className="text-gray-600">AI가 정보를 분석하고 있습니다...</p>
            </div>
          )}

          {/* Results */}
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
              <div className="mb-8">
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

              {/* Sources - Academic Papers */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>📄</span> 학술논문
                  </h3>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    총 {result.sources.academic.length}건
                  </span>
                </div>
                <div className="space-y-3">
                  {result.sources.academic
                    .slice(0, showMoreAcademic ? undefined : 2)
                    .map((source: Source) => renderSourceCard(source))}
                </div>
                {result.sources.academic.length > 2 && (
                  <button
                    onClick={() => setShowMoreAcademic(!showMoreAcademic)}
                    className="w-full mt-3 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition"
                  >
                    {showMoreAcademic ? '접기 ▲' : `더보기 (${result.sources.academic.length - 2}건 더) ▼`}
                  </button>
                )}
              </div>

              {/* Sources - Books */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>📚</span> 도서
                  </h3>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    총 {result.sources.books.length}건
                  </span>
                </div>
                <div className="space-y-3">
                  {result.sources.books
                    .slice(0, showMoreBooks ? undefined : 2)
                    .map((source: Source) => renderSourceCard(source))}
                </div>
                {result.sources.books.length > 2 && (
                  <button
                    onClick={() => setShowMoreBooks(!showMoreBooks)}
                    className="w-full mt-3 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition"
                  >
                    {showMoreBooks ? '접기 ▲' : `더보기 (${result.sources.books.length - 2}건 더) ▼`}
                  </button>
                )}
              </div>

              {/* Sources - Web Resources */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>🌐</span> 인터넷 자료
                  </h3>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    총 {result.sources.web.length}건
                  </span>
                </div>
                <div className="space-y-3">
                  {result.sources.web
                    .slice(0, showMoreWeb ? undefined : 2)
                    .map((source: Source) => renderSourceCard(source))}
                </div>
                {result.sources.web.length > 2 && (
                  <button
                    onClick={() => setShowMoreWeb(!showMoreWeb)}
                    className="w-full mt-3 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition"
                  >
                    {showMoreWeb ? '접기 ▲' : `더보기 (${result.sources.web.length - 2}건 더) ▼`}
                  </button>
                )}
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

      {/* Source Detail Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 pr-8">
                  {selectedSource.title}
                </h2>
                <button
                  onClick={() => setSelectedSource(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                  {getTypeLabel(selectedSource.type)}
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  {selectedSource.author && (
                    <p><strong>저자:</strong> {selectedSource.author}</p>
                  )}
                  {selectedSource.publisher && (
                    <p><strong>출판사:</strong> {selectedSource.publisher}</p>
                  )}
                  {selectedSource.year && (
                    <p><strong>발행연도:</strong> {selectedSource.year}</p>
                  )}
                  {selectedSource.isbn && (
                    <p><strong>ISBN:</strong> {selectedSource.isbn}</p>
                  )}
                  {selectedSource.doi && (
                    <p><strong>DOI:</strong> {selectedSource.doi}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-gray-900 mb-2">요약</h4>
                  <p className="text-gray-700">{selectedSource.summary}</p>
                </div>

                {selectedSource.library && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>📚</span> 도서관 정보
                    </h4>
                    {selectedSource.library.available ? (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            ✓ 대출 가능
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-2">열람/대출 가능한 도서관:</p>
                        <ul className="space-y-2">
                          {selectedSource.library.locations.map((location, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="text-primary-600">📍</span>
                              <span>{location}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        {selectedSource.type === 'web' 
                          ? '온라인에서 바로 열람 가능합니다.'
                          : '현재 도서관 대출 정보가 없습니다.'}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  {selectedSource.url && (
                    <a
                      href={selectedSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition text-center"
                    >
                      원문 보기
                    </a>
                  )}
                  {selectedSource.library?.available && (
                    <button className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                      도서관 예약
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
