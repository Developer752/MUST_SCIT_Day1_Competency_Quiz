import { useLocation ,  Link} from "wouter";
import { useCourses } from "../hooks/useCourses";
export default function Home() {
  const [, setLocation] = useLocation();
  const [courses] = useCourses();

  const totalSubjects = courses.reduce((a, c) => a + c.subjects.length, 0);
  const totalQuestions = courses.reduce(
    (a, c) => a + c.subjects.reduce((b, s) => b + s.questions.length, 0),
    0
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            University Quiz Platform
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
            Test Your Knowledge.<br />
            <span className="text-yellow-300">Ace Your Degree.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Practice quizzes for all university degree programs — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              data-testid="btn-start-learning"
              onClick={() => courses[0] && setLocation(`/course/${courses[0].id}`)}
              className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-yellow-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              Start Learning
            </button>
            <button
              data-testid="btn-browse-courses"
              onClick={() => courses[1] && setLocation(`/course/${courses[1].id}`)}
              className="px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/25 transition-all border border-white/30 text-lg"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: courses.length, label: "Degree Programs" },
            { value: totalSubjects, label: "Subjects" },
            { value: totalQuestions + "+", label: "MCQ Questions" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl sm:text-4xl font-black text-indigo-700">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Course Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Choose Your Program</h2>
          <p className="text-gray-500 text-lg">Select a degree program to explore subjects and start quizzes</p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
            </svg>
            <p className="text-lg font-medium">No courses available yet.</p>
            <p className="text-sm mt-1">An admin can add courses from the Admin Panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                data-testid={`course-card-${course.id}`}
                onClick={() => setLocation(`/course/${course.id}`)}
                className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${course.color}`} />
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} shadow-md mb-4`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div className={`text-xs font-bold tracking-wider uppercase ${course.textColor} mb-1`}>
                    {course.name}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                    {course.fullName}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold ${course.bgLight} ${course.textColor} px-2.5 py-1 rounded-full`}>
                        {course.subjects.length} Subjects
                      </span>
                      <span className="text-xs text-gray-400">
                        {course.subjects.reduce((a, s) => a + s.questions.length, 0)} Qs
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-lg ${course.bgLight} ${course.textColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-br from-gray-50 to-indigo-50 py-14 px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-3">How It Works</h2>
          <p className="text-gray-500">Simple three-step process to test your knowledge</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              step: "01", title: "Pick a Program",
              desc: "Choose from available university degree programs in the navbar.",
              icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            },
            {
              step: "02", title: "Select a Subject",
              desc: "Each program has subjects. Pick one to begin your quiz.",
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            },
            {
              step: "03", title: "Get Your Grade",
              desc: "Answer MCQs and instantly see your score, percentage, and grade.",
              icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <div className="text-xs font-black text-indigo-400 tracking-widest mb-2">STEP {item.step}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-4 text-center">
        <p className="text-gray-400 text-sm">
          Established by SCIT Department of MUST  &copy; {new Date().getFullYear()} &nbsp;| Develop by |<a href="https://marketingboostersoftwarehouse.com/">Marketing Booster Software House Pvt.Ltd</a> |&nbsp;{" "}
           <Link
      href="/admin-login"
      className="text-indigo-500 hover:text-indigo-700 font-medium hover:underline transition-colors"
    >
      Admin Panel
    </Link>
        </p>
      </footer>
    </div>
  );
}



