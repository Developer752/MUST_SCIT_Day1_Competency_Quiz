import { useLocation } from "wouter";

export default function SubjectCard({ subject, courseId, color, bgLight, textColor }) {
  const [, setLocation] = useLocation();

  return (
    <div
      data-testid={`subject-card-${subject.id}`}
      onClick={() => setLocation(`/quiz/${courseId}/${subject.id}`)}
      className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bgLight} mb-4`}>
        <svg className={`w-6 h-6 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">
        {subject.name}
      </h3>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{subject.description}</p>

      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${bgLight} ${textColor} px-3 py-1 rounded-full`}>
          {subject.questions.length} Questions
        </span>
        <div className={`flex items-center gap-1 text-sm font-medium ${textColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
          <span>Start Quiz</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
