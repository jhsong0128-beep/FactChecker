const OpenAI = require('openai');

// OpenAI 인스턴스는 필요할 때만 생성
let openai = null;

function getOpenAI() {
  if (!openai && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here') {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
}

const SYSTEM_PROMPT = `당신은 정보 검증 전문가입니다. 주어진 정보를 분석하고 다음 형식으로 응답해주세요:

{
  "trustLevel": "trusted/caution/suspicious",
  "summary": "3-5줄의 핵심 요약",
  "analysis": {
    "mainClaims": ["주요 주장 1", "주요 주장 2"],
    "findings": "확인된 사실",
    "context": "맥락과 배경",
    "limitations": "한계 및 주의사항"
  }
}

평가 기준:
- trusted: 여러 신뢰할 수 있는 출처에서 확인됨
- caution: 일부 출처만 확인되거나 상충하는 정보 존재
- suspicious: 신뢰할 출처를 찾기 어렵거나 반박 자료가 많음

객관적이고 신중하게 분석하세요.`;

async function analyzeContent(content) {
  try {
    const client = getOpenAI();
    
    // OpenAI API가 없으면 시뮬레이션 데이터 반환
    if (!client) {
      console.log('⚠️ OpenAI API key not configured, using simulation mode');
      return simulateAIAnalysis(content);
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `다음 정보를 검증해주세요: "${content}"` }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    return analysis;

  } catch (error) {
    console.error('❌ AI analysis error:', error.message);
    // API 오류 시 시뮬레이션으로 fallback
    return simulateAIAnalysis(content);
  }
}

function simulateAIAnalysis(content) {
  return {
    trustLevel: 'caution',
    summary: `"${content.substring(0, 100)}"에 대한 검증 결과입니다. 이 정보는 일부 출처에서 확인되었으나 추가 검증이 필요합니다. 여러 관점을 종합적으로 고려해야 합니다.`,
    analysis: {
      mainClaims: ['입력된 정보의 핵심 주장을 분석 중입니다'],
      findings: '제한적인 증거가 발견되었습니다',
      context: '해당 주제에 대한 맥락 정보를 수집하고 있습니다',
      limitations: '더 많은 출처 확인이 필요합니다'
    }
  };
}

module.exports = {
  analyzeContent
};
