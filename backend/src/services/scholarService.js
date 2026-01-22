const axios = require('axios');
const cheerio = require('cheerio');

// Google Scholar 검색 (크롤링)
async function searchAcademic(query) {
  try {
    // Google Scholar 크롤링 시도
    console.log('🔍 Searching academic papers for:', query);
    
    // 실제 크롤링은 Google Scholar의 robots.txt 정책을 준수해야 함
    // 여기서는 시뮬레이션 데이터 사용
    return simulateAcademicSearch(query);

  } catch (error) {
    console.error('❌ Scholar search error:', error.message);
    return simulateAcademicSearch(query);
  }
}

function simulateAcademicSearch(query) {
  const keywords = query.toLowerCase();
  const papers = [];

  // 검색어에 따라 다른 논문 추천
  if (keywords.includes('물') || keywords.includes('수분') || keywords.includes('water')) {
    papers.push({
      id: Date.now() + 1,
      title: '수분 섭취와 건강에 관한 체계적 문헌고찰',
      author: '김의학, 이건강',
      publisher: '대한의학회지',
      year: '2025',
      type: 'academic',
      thumbnail: '📄',
      doi: '10.1234/kjm.2025.001',
      summary: '하루 물 섭취량과 건강 결과 사이의 관계를 분석한 최신 연구. 개인별 필요량의 차이와 일반적 권장사항의 한계를 논의합니다.'
    });
    
    papers.push({
      id: Date.now() + 2,
      title: 'Water Intake and Human Health: A Systematic Review',
      author: 'Smith, J., Johnson, K.',
      publisher: 'Journal of Nutrition',
      year: '2024',
      type: 'academic',
      thumbnail: '📄',
      doi: '10.1234/jn.2024.456',
      summary: '물 섭취량에 대한 국제 가이드라인 비교 연구. Evidence-based approach to hydration recommendations.'
    });
    
    papers.push({
      id: Date.now() + 3,
      title: '한국인의 수분 섭취 실태 및 권장량에 관한 연구',
      author: '박영양, 최건강',
      publisher: '한국영양학회지',
      year: '2025',
      type: 'academic',
      thumbnail: '📄',
      doi: '10.1234/kjn.2025.789',
      summary: '한국 성인의 실제 물 섭취량과 권장량을 비교 분석한 연구. 연령별, 성별 차이를 고려한 맞춤형 권장사항을 제시합니다.'
    });
  } else if (keywords.includes('건강') || keywords.includes('health')) {
    papers.push({
      id: Date.now() + 4,
      title: '현대인의 건강 관리와 과학적 접근',
      author: '정과학, 김연구',
      publisher: '한국보건학회지',
      year: '2024',
      type: 'academic',
      thumbnail: '📄',
      doi: '10.1234/kph.2024.111',
      summary: '과학적 근거 기반 건강 관리 방법에 대한 체계적 고찰'
    });
  }

  // 일반적인 논문 추가
  if (papers.length < 3) {
    papers.push({
      id: Date.now() + 5,
      title: `"${query.substring(0, 50)}"에 관한 연구 동향`,
      author: '연구팀',
      publisher: '학술지',
      year: '2024',
      type: 'academic',
      thumbnail: '📄',
      doi: '10.1234/journal.2024.xxx',
      summary: '해당 주제에 대한 최신 연구 동향과 과학적 근거를 정리한 논문'
    });
  }

  return papers;
}

// RISS 검색 (실제 구현 시)
async function searchRISS(query) {
  // RISS API 연동 예정
  // http://www.riss.kr/link?id=
  return [];
}

module.exports = {
  searchAcademic,
  searchRISS
};
