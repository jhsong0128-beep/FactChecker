const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const libraryService = require('../services/libraryService');
const scholarService = require('../services/scholarService');
const webSearchService = require('../services/webSearchService');

router.post('/', async (req, res) => {
  try {
    const { inputType, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    console.log(`📝 Verifying ${inputType}: ${content.substring(0, 50)}...`);

    // 1. AI 분석
    const aiAnalysis = await aiService.analyzeContent(content);

    // 2. 병렬로 출처 검색
    const [academicSources, books, webSources] = await Promise.all([
      scholarService.searchAcademic(content),
      libraryService.searchBooks(content),
      webSearchService.searchWeb(content)
    ]);

    // 3. 도서관 정보 추가
    const booksWithLibrary = await Promise.all(
      books.map(async (book) => {
        const libraryInfo = await libraryService.getLibraryInfo(book.isbn);
        return { ...book, library: libraryInfo };
      })
    );

    const result = {
      trustLevel: aiAnalysis.trustLevel,
      summary: aiAnalysis.summary,
      analysis: aiAnalysis.analysis,
      sources: {
        academic: academicSources,
        books: booksWithLibrary,
        web: webSources
      }
    };

    res.json(result);

  } catch (error) {
    console.error('❌ Verification error:', error);
    res.status(500).json({ 
      error: 'Verification failed',
      message: error.message 
    });
  }
});

module.exports = router;
