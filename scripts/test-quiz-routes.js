#!/usr/bin/env node

/**
 * Test script to validate all quiz routes and data integrity
 */

const { getAllQuizIds, getQuizById, isValidQuizId, getQuizForSEO } = require('../lib/quiz-data.ts');

console.log('🧪 Testing Quiz Routes and Data Integrity...\n');

// Test 1: Get all quiz IDs
console.log('1. Testing getAllQuizIds()...');
const allQuizIds = getAllQuizIds();
console.log(`✅ Found ${allQuizIds.length} quizzes`);
console.log('Quiz IDs:', allQuizIds.slice(0, 5), allQuizIds.length > 5 ? '...' : '');

// Test 2: Validate each quiz ID
console.log('\n2. Testing quiz validation...');
let validCount = 0;
let invalidCount = 0;

allQuizIds.forEach(quizId => {
  if (isValidQuizId(quizId)) {
    validCount++;
  } else {
    invalidCount++;
    console.log(`❌ Invalid quiz ID: ${quizId}`);
  }
});

console.log(`✅ Valid quizzes: ${validCount}`);
console.log(`❌ Invalid quizzes: ${invalidCount}`);

// Test 3: Test quiz data integrity
console.log('\n3. Testing quiz data integrity...');
let dataIssues = 0;

allQuizIds.forEach(quizId => {
  const quiz = getQuizById(quizId);
  if (!quiz) {
    console.log(`❌ Quiz not found: ${quizId}`);
    dataIssues++;
    return;
  }

  // Check required fields
  if (!quiz.title || !quiz.description || !quiz.emoji) {
    console.log(`❌ Missing required fields in quiz: ${quizId}`);
    dataIssues++;
  }

  // Check questions
  if (!quiz.questions || quiz.questions.length === 0) {
    console.log(`❌ No questions in quiz: ${quizId}`);
    dataIssues++;
  }

  // Check results
  if (!quiz.results || quiz.results.length === 0) {
    console.log(`❌ No results in quiz: ${quizId}`);
    dataIssues++;
  }

  // Check scoring config
  if (quiz.scoringConfig && quiz.scoringConfig.rules) {
    const resultIds = quiz.results.map(r => r.id);
    const referencedIds = new Set();
    
    quiz.scoringConfig.rules.forEach(rule => {
      Object.keys(rule.results).forEach(resultId => {
        referencedIds.add(resultId);
      });
    });

    // Check for missing result definitions
    referencedIds.forEach(resultId => {
      if (!resultIds.includes(resultId)) {
        console.log(`❌ Missing result definition in quiz ${quizId}: ${resultId}`);
        dataIssues++;
      }
    });
  }
});

console.log(`✅ Data integrity issues found: ${dataIssues}`);

// Test 4: Test SEO data
console.log('\n4. Testing SEO data...');
let seoIssues = 0;

allQuizIds.forEach(quizId => {
  const seoData = getQuizForSEO(quizId);
  if (!seoData) {
    console.log(`❌ No SEO data for quiz: ${quizId}`);
    seoIssues++;
  } else {
    if (!seoData.title || !seoData.description) {
      console.log(`❌ Missing SEO fields in quiz: ${quizId}`);
      seoIssues++;
    }
  }
});

console.log(`✅ SEO data issues found: ${seoIssues}`);

// Test 5: Test specific problematic quizzes
console.log('\n5. Testing specific quizzes...');
const problematicQuizzes = ['office-politics', 'meeting-culture', 'workplace-personality'];

problematicQuizzes.forEach(quizId => {
  console.log(`\nTesting ${quizId}...`);
  const quiz = getQuizById(quizId);
  
  if (!quiz) {
    console.log(`❌ Quiz not found: ${quizId}`);
    return;
  }

  console.log(`✅ Quiz found: ${quiz.title}`);
  console.log(`   Questions: ${quiz.questions?.length || 0}`);
  console.log(`   Results: ${quiz.results?.length || 0}`);
  
  if (quiz.scoringConfig && quiz.scoringConfig.rules) {
    const resultIds = quiz.results.map(r => r.id);
    const referencedIds = new Set();
    
    quiz.scoringConfig.rules.forEach(rule => {
      Object.keys(rule.results).forEach(resultId => {
        referencedIds.add(resultId);
      });
    });

    const missingResults = Array.from(referencedIds).filter(id => !resultIds.includes(id));
    if (missingResults.length > 0) {
      console.log(`❌ Missing results: ${missingResults.join(', ')}`);
    } else {
      console.log(`✅ All scoring rules have corresponding results`);
    }
  }
});

console.log('\n🎉 Quiz route testing completed!');
console.log(`\nSummary:`);
console.log(`- Total quizzes: ${allQuizIds.length}`);
console.log(`- Valid quizzes: ${validCount}`);
console.log(`- Data issues: ${dataIssues}`);
console.log(`- SEO issues: ${seoIssues}`);

if (dataIssues === 0 && seoIssues === 0) {
  console.log('\n✅ All quizzes are working correctly!');
} else {
  console.log('\n❌ Some issues found. Please check the output above.');
}

