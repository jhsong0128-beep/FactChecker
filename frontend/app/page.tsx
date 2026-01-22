export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">
            FactChecker
          </div>
          <div className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-primary-600">
              기능
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary-600">
              작동 방식
            </a>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
              시작하기
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          정보의 진실을 <span className="text-primary-600">AI</span>로 검증하세요
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          텍스트, URL, 이미지 속 정보의 신뢰성을 몇 초 만에 확인할 수 있습니다.
          <br />
          출처 검증부터 도서관 자료 추천까지, 모든 것이 한 곳에서.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-primary-600 text-white text-lg rounded-lg hover:bg-primary-700 transition shadow-lg">
            무료로 시작하기
          </button>
          <button className="px-8 py-4 bg-white text-primary-600 text-lg rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition">
            데모 보기
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          주요 기능
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              다양한 입력 방식
            </h3>
            <p className="text-gray-600">
              텍스트, URL, 이미지까지 다양한 형태의 정보를 검증할 수 있습니다.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              AI 기반 분석
            </h3>
            <p className="text-gray-600">
              최신 GPT-4 기술로 정보의 맥락과 신뢰도를 정확하게 분석합니다.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              출처 추적
            </h3>
            <p className="text-gray-600">
              학술 자료, 정부 기관 자료 등 신뢰할 수 있는 출처를 자동으로 찾아줍니다.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              도서관 연동
            </h3>
            <p className="text-gray-600">
              국립중앙도서관 등에서 관련 자료를 빌릴 수 있는지 바로 확인하세요.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              검증 히스토리
            </h3>
            <p className="text-gray-600">
              과거 검증 결과를 폴더별로 정리하고 언제든지 다시 확인할 수 있습니다.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              빠른 결과
            </h3>
            <p className="text-gray-600">
              캐싱 기술을 활용하여 몇 초 안에 검증 결과를 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            어떻게 작동하나요?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                정보 입력
              </h3>
              <p className="text-gray-600">
                검증하고 싶은 정보를 텍스트, URL, 이미지로 입력합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                AI 분석
              </h3>
              <p className="text-gray-600">
                AI가 정보의 맥락과 신뢰도를 종합적으로 분석합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                출처 검색
              </h3>
              <p className="text-gray-600">
                관련된 학술 자료와 공식 출처를 자동으로 찾습니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                결과 제공
              </h3>
              <p className="text-gray-600">
                신뢰도 평가와 출처 정보를 명확하게 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Levels */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          3단계 신뢰도 평가
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-full text-lg font-bold mb-4">
              신뢰 가능
            </div>
            <p className="text-gray-600">
              여러 신뢰할 수 있는 출처에서 확인된 정보
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-block px-6 py-3 bg-yellow-100 text-yellow-800 rounded-full text-lg font-bold mb-4">
              주의 필요
            </div>
            <p className="text-gray-600">
              일부 출처만 확인되거나 상충하는 정보가 있는 경우
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-block px-6 py-3 bg-red-100 text-red-800 rounded-full text-lg font-bold mb-4">
              의심스러움
            </div>
            <p className="text-gray-600">
              신뢰할 출처를 찾기 어렵거나 반박 자료가 많은 경우
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            무료로 가입하고 매일 10회까지 정보를 검증할 수 있습니다.
          </p>
          <button className="px-8 py-4 bg-white text-primary-600 text-lg rounded-lg hover:bg-gray-100 transition shadow-lg">
            무료로 시작하기
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FactChecker</h3>
              <p className="text-gray-400">
                AI 기반 정보 검증 서비스
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">텍스트 검증</a></li>
                <li><a href="#" className="hover:text-white">URL 검증</a></li>
                <li><a href="#" className="hover:text-white">이미지 검증</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">회사</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">소개</a></li>
                <li><a href="#" className="hover:text-white">블로그</a></li>
                <li><a href="#" className="hover:text-white">채용</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">문서</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">문의하기</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FactChecker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
