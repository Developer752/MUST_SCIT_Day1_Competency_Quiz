export default function QuizBox({
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
  showResult,
  correctAnswer,
}) {
  const getOptionStyle = (index) => {
    if (!showResult) {
      if (selectedAnswer === index) {
        return "border-indigo-500 bg-indigo-50 text-indigo-800 shadow-sm";
      }
      return "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer";
    }
    if (index === correctAnswer) {
      return "border-green-500 bg-green-50 text-green-800";
    }
    if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
      return "border-red-400 bg-red-50 text-red-800";
    }
    return "border-gray-200 bg-white text-gray-400";
  };

  const getOptionIcon = (index) => {
    if (!showResult) {
      if (selectedAnswer === index) {
        return (
          <div className="w-6 h-6 rounded-full border-2 border-indigo-500 bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
        );
      }
      return <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0" />;
    }
    if (index === correctAnswer) {
      return (
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }
    if (index === selectedAnswer) {
      return (
        <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    }
    return <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex-shrink-0" />;
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-semibold text-indigo-600">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
            Q{questionNumber}
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed">{question}</h2>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            data-testid={`option-${index}`}
            onClick={() => !showResult && onSelectAnswer(index)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${getOptionStyle(index)}`}
          >
            <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {labels[index]}
            </span>
            {getOptionIcon(index)}
            <span className="font-medium text-sm sm:text-base flex-1">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
