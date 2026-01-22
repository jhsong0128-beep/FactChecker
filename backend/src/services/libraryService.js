const axios = require('axios');

// 국립중앙도서관 API 설정
const LIBRARY_API_BASE = 'https://www.nl.go.kr/kolisnet';

async function searchBooks(query) {
  try {
    // 실제 API 호출 (API 키가 있을 경우)
    if (process.env.LIBRARY_API_KEY && process.env.LIBRARY_API_KEY !== 'your-library-api-key-here') {
      const response = await axios.get(`${LIBRARY_API_BASE}/openapi/search`, {
        params: {
          cert_key: process.env.LIBRARY_API_KEY,
          title: query,
          result_type: 'json',
          page_no: 1,
          page_size: 5
        }
      });
      return parseLibraryResponse(response.data);
    }

    // 시뮬레이션 데이터
    console.log('⚠️ Library API key not configured, using simulation mode');
    return simulateBookSearch(query);

  } catch (error) {
    console.error('❌ Library search error:', error.message);
    return simulateBookSearch(query);
  }
}

async function getLibraryInfo(isbn) {
  if (!isbn) {
    return { available: false, locations: [] };
  }

  try {
    // 실제 API 호출
    if (process.env.LIBRARY_API_KEY && process.env.LIBRARY_API_KEY !== 'your-library-api-key-here') {
      const response = await axios.get(`${LIBRARY_API_BASE}/openapi/holdings`, {
        params: {
          cert_key: process.env.LIBRARY_API_KEY,
          isbn: isbn,
          result_type: 'json'
        }
      });
      return parseHoldingsResponse(response.data);
    }

    // 시뮬레이션
    return simulateLibraryInfo();

  } catch (error) {
    console.error('❌ Library info error:', error.message);
    return simulateLibraryInfo();
  }
}

function parseLibraryResponse(data) {
  // 실제 API 응답 파싱
  // TODO: 실제 구조에 맞게 수정
  return [];
}

function parseHoldingsResponse(data) {
  // 실제 API 응답 파싱
  // TODO: 실제 구조에 맞게 수정
  return { available: false, locations: [] };
}

function simulateBookSearch(query) {
  const keywords = query.toLowerCase();
  const books = [];

  // 검색어에 따라 다른 도서 추천
  if (keywords.includes('물') || keywords.includes('수분') || keywords.includes('water')) {
    books.push({
      id: Date.now() + 1,
      title: '물의 과학: 건강과 생명',
      author: '정의학',
      publisher: '의학출판사',
      year: '2024',
      type: 'book',
      thumbnail: '📚',
      isbn: '979-11-1234-567-8',
      summary: '물과 인체 건강의 관계를 과학적으로 다룬 종합 안내서. 수분 섭취의 생리학적 메커니즘과 건강 효과를 설명합니다.'
    });
    books.push({
      id: Date.now() + 2,
      title: '수분과 건강 가이드북',
      author: '이영양',
      publisher: '건강과생활',
      year: '2023',
      type: 'book',
      thumbnail: '📚',
      isbn: '979-11-5678-901-2',
      summary: '일상생활에서의 올바른 수분 섭취 방법과 실천 가이드'
    });
  } else if (keywords.includes('건강') || keywords.includes('health')) {
    books.push({
      id: Date.now() + 3,
      title: '현대인의 건강 가이드',
      author: '김건강',
      publisher: '메디컬북스',
      year: '2024',
      type: 'book',
      thumbnail: '📚',
      isbn: '979-11-2345-678-9',
      summary: '현대인을 위한 종합 건강 관리 가이드북'
    });
  }

  // 기본 도서 추가 (검색어와 무관하게)
  if (books.length < 3) {
    books.push({
      id: Date.now() + 4,
      title: '과학적으로 검증된 건강 상식',
      author: '박과학',
      publisher: '사이언스북스',
      year: '2024',
      type: 'book',
      thumbnail: '📚',
      isbn: '979-11-3456-789-0',
      summary: '일상 속 건강 상식을 과학적으로 검증한 책'
    });
  }

  return books;
}

function simulateLibraryInfo() {
  // 80% 확률로 대출 가능
  const available = Math.random() > 0.2;
  
  if (available) {
    const allLocations = [
      '국립중앙도서관',
      '서울대학교 중앙도서관',
      '연세대학교 학술정보원',
      '고려대학교 도서관',
      '서울시립도서관',
      '강남구립도서관',
      '경기도립중앙도서관'
    ];
    
    // 랜덤하게 2-4개 도서관 선택
    const count = Math.floor(Math.random() * 3) + 2;
    const locations = allLocations.sort(() => 0.5 - Math.random()).slice(0, count);
    
    return { available: true, locations };
  }

  return { available: false, locations: [] };
}

module.exports = {
  searchBooks,
  getLibraryInfo
};
