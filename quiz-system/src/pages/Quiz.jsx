import { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "wouter";
import { getCourseById, getSubjectById } from "../utils/quizStore";
import QuizBox from "../components/QuizBox";

const TIMER_SECONDS = 30;

export default function Quiz() {
  const { course: courseId, subject: subjectId } = useParams();
  const [, setLocation] = useLocation();

  const course = getCourseById(courseId);
  const subject = getSubjectById(courseId, subjectId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = useCallback(() => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;

    if (currentIndex + 1 < subject.questions.length) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(TIMER_SECONDS);
      setShowAnswer(false);
    } else {
      const questions = subject.questions;
      let correct = 0;
      newAnswers.forEach((ans, i) => {
        if (ans === questions[i].correct) correct++;
      });

      const result = {
        courseId,
        subjectId,
        courseName: course.name,
        subjectName: subject.name,
        answers: newAnswers,
        correct,
        total: questions.length,
        wrong: questions.length - correct,
        percentage: Math.round((correct / questions.length) * 100),
        date: new Date().toISOString(),
      };

      localStorage.setItem("quizResult", JSON.stringify(result));

      try {
        const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
        history.push(result);
        localStorage.setItem("quizHistory", JSON.stringify(history));
      } catch (_) {}

      setLocation("/result");
    }
  }, [answers, currentIndex, selectedAnswer, subject, course, courseId, subjectId, setLocation]);

  useEffect(() => {
    if (showAnswer) return;
    if (timeLeft <= 0) {
      setShowAnswer(true);
      setTimeout(() => {
        setSelectedAnswer(null);
        handleNext();
      }, 1200);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showAnswer, handleNext]);

  if (!course || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Quiz not found</h2>
          <button onClick={() => setLocation("/")} className="text-indigo-600 hover:underline">Go home</button>
        </div>
      </div>
    );
  }

  const question = subject.questions[currentIndex];
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerDanger = timeLeft <= 10;

  const handleSelect = (index) => {
    if (showAnswer) return;
    setSelectedAnswer(index);
  };

  const handleNextClick = () => {
    if (selectedAnswer === null && !showAnswer) return;
    setShowAnswer(true);
    setTimeout(() => handleNext(), 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            data-testid="btn-quit-quiz"
            onClick={() => setLocation(`/course/${courseId}`)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quit
          </button>
          <div className="text-center">
            <p className="text-xs text-gray-400 font-medium">{course.name}</p>
            <p className="text-sm font-bold text-gray-700">{subject.name}</p>
          </div>
          {/* Timer */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-colors ${timerDanger ? "border-red-300 bg-red-50 timer-pulse" : "border-gray-200 bg-white"}`}>
            <svg className={`w-4 h-4 ${timerDanger ? "text-red-500" : "text-indigo-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span data-testid="quiz-timer" className={`text-sm font-black tabular-nums ${timerDanger ? "text-red-600" : "text-gray-700"}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Timer progress bar */}
        <div className="h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timerDanger ? "bg-red-400" : "bg-indigo-500"}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>

        {/* Quiz Box */}
        <QuizBox
          question={question.question}
          options={question.options}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelect}
          questionNumber={currentIndex + 1}
          totalQuestions={subject.questions.length}
          showResult={showAnswer}
          correctAnswer={question.correct}
        />

        {/* Navigation */}
        <div className="flex justify-end mt-6">
          <button
            data-testid="btn-next-question"
            onClick={handleNextClick}
            disabled={selectedAnswer === null && !showAnswer}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {currentIndex + 1 === subject.questions.length ? "Finish Quiz" : "Next"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {subject.questions.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 h-2.5 bg-indigo-600"
                  : answers[i] !== undefined
                  ? "w-2.5 h-2.5 bg-indigo-300"
                  : "w-2.5 h-2.5 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
