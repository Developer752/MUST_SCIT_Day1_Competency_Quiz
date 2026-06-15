import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Result, { getGrade } from "../components/Result";
import { getSubjectById } from "../utils/quizStore";

export default function ResultPage() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("quizResult");
      if (stored) setResult(JSON.parse(stored));
    } catch (_) {}
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-3">No result found</h2>
          <button onClick={() => setLocation("/")} className="text-indigo-600 hover:underline font-medium">
            Go home
          </button>
        </div>
      </div>
    );
  }

  const { grade, label, color, bg, border } = getGrade(result.percentage);
  const subject = getSubjectById(result.courseId, result.subjectId);

  const getMessage = () => {
    if (result.percentage >= 90) return "Exceptional work! You have mastered this subject.";
    if (result.percentage >= 80) return "Great job! You have a strong understanding of this material.";
    if (result.percentage >= 70) return "Good effort! Review the missed questions to strengthen your knowledge.";
    if (result.percentage >= 60) return "You passed! With more practice you can do even better.";
    return "Keep studying! Review the material and try again — you can do this.";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bg} ${border} border text-sm font-semibold ${color} mb-4`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Quiz Complete — Grade {grade}
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">{result.subjectName}</h1>
          <p className="text-gray-500 text-sm">{result.courseName} — {label}</p>
          <p className="text-gray-600 mt-3 text-sm">{getMessage()}</p>
        </div>

        {/* Score breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <Result
            correct={result.correct}
            total={result.total}
            wrong={result.wrong}
          />
        </div>

        {/* Question Review */}
        {subject && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Question Review
              <span className="ml-auto text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                {subject.questions.length} questions
              </span>
            </h2>
            <div className="space-y-4">
              {subject.questions.map((q, i) => {
                const userAnswer = result.answers[i];
                const isCorrect = userAnswer === q.correct;
                const isSkipped = userAnswer === null || userAnswer === undefined;
                const isAdminAdded = q._id && q._id.startsWith("admin__");

                return (
                  <div
                    key={i}
                    data-testid={`review-question-${i}`}
                    className={`p-4 rounded-xl border-2 ${
                      isSkipped ? "border-gray-200 bg-gray-50"
                        : isCorrect ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${
                        isSkipped ? "bg-gray-400" : isCorrect ? "bg-green-500" : "bg-red-400"
                      }`}>
                        {isSkipped ? "–" : isCorrect ? "✓" : "✗"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <p className="text-sm font-semibold text-gray-800">
                            Q{i + 1}. {q.question}
                          </p>
                          {isAdminAdded && (
                            <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full flex-shrink-0">
                              Admin Added
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-green-700 font-medium">
                            Correct: {q.options[q.correct]}
                          </p>
                          {!isCorrect && !isSkipped && (
                            <p className="text-xs text-red-600 font-medium">
                              Your answer: {q.options[userAnswer]}
                            </p>
                          )}
                          {isSkipped && (
                            <p className="text-xs text-gray-500 font-medium">Skipped / Timed out</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action buttons — Retry Quiz removed */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            data-testid="btn-choose-subject"
            onClick={() => setLocation(`/course/${result.courseId}`)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            More Subjects
          </button>
          <button
            data-testid="btn-go-home"
            onClick={() => setLocation("/")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
