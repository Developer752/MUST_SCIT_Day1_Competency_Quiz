import { useParams, useLocation } from "wouter";
import { getCourseById } from "../utils/quizStore";
import SubjectCard from "../components/SubjectCard";

export default function Subjects() {
  const { name } = useParams();
  const [, setLocation] = useLocation();
  const course = getCourseById(name);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Course not found</h2>
          <button onClick={() => setLocation("/")} className="text-indigo-600 hover:underline">
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className={`bg-gradient-to-r ${course.color} text-white py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <button
            data-testid="btn-back-courses"
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <p className="text-white/70 text-sm font-medium uppercase tracking-wider">{course.name}</p>
              <h1 className="text-3xl font-black text-white">{course.fullName}</h1>
            </div>
          </div>
          <p className="text-white/75 mt-3 text-base">{course.description}</p>

          <div className="flex items-center gap-4 mt-5">
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
              {course.subjects.length} Subjects
            </span>
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
              {course.subjects.reduce((a, s) => a + s.questions.length, 0)} Total Questions
            </span>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-gray-700 mb-6">Select a Subject to Begin</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {course.subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              courseId={course.id}
              color={course.color}
              bgLight={course.bgLight}
              textColor={course.textColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
