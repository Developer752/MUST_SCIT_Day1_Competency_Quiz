import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getAllQuestionsForAdmin, getCourses } from "../utils/quizStore";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState({ total: 0, courses: 0, subjects: 0, adminAdded: 0 });

  useEffect(() => {
    const questions = getAllQuestionsForAdmin();
    const courses = getCourses();
    const subjects = courses.reduce((a, c) => a + c.subjects.length, 0);
    const adminAdded = questions.filter((q) => !q.isBase).length;
    setStats({ total: questions.length, courses: courses.length, subjects, adminAdded });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setLocation("/admin-login");
  };

  const cards = [
    {
      title: "Add Course",
      desc: "Create a new degree program visible in the navbar and home page",
      icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
      text: "text-amber-700",
      route: "/admin/add-course",
      testId: "btn-admin-add-course",
    },
    {
      title: "Add Subject",
      desc: "Add a new subject to any course (base or admin-created)",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      color: "from-teal-500 to-cyan-600",
      bg: "bg-teal-50",
      text: "text-teal-700",
      route: "/admin/add-subject",
      testId: "btn-admin-add-subject",
    },
    {
      title: "Add Question",
      desc: "Add a new MCQ question to any course and subject",
      icon: "M12 4v16m8-8H4",
      color: "from-indigo-500 to-purple-600",
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      route: "/admin/add",
      testId: "btn-admin-add",
    },
    {
      title: "Manage Questions",
      desc: "View and delete existing questions across all subjects",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "from-rose-500 to-pink-600",
      bg: "bg-rose-50",
      text: "text-rose-700",
      route: "/admin/manage",
      testId: "btn-admin-manage",
    },
    {
      title: "Quiz System",
      desc: "Go to the student-facing quiz system to preview changes",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      route: "/",
      testId: "btn-admin-preview",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-sm">QuizMaster Admin</span>
            <span className="hidden sm:inline text-slate-400 text-xs ml-2">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-slate-400 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            admin@gmail.com
          </span>
          <button
            data-testid="btn-admin-logout"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage quiz questions across all courses and subjects</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Questions", value: stats.total, color: "text-indigo-700", bg: "bg-indigo-50" },
            { label: "Courses", value: stats.courses, color: "text-purple-700", bg: "bg-purple-50" },
            { label: "Subjects", value: stats.subjects, color: "text-teal-700", bg: "bg-teal-50" },
            { label: "Admin Added", value: stats.adminAdded, color: "text-rose-700", bg: "bg-rose-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 text-center`}>
              <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs font-semibold text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <h2 className="text-lg font-bold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <button
              key={card.route}
              data-testid={card.testId}
              onClick={() => setLocation(card.route)}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-6 text-left"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} shadow-md mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <h3 className={`text-lg font-bold text-gray-900 mb-1 group-hover:${card.text} transition-colors`}>
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              <div className={`flex items-center gap-1 mt-4 text-sm font-semibold ${card.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                Open
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
