import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCourses } from "../hooks/useCourses";
import logo from "../assets/logo.png";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const [courses] = useCourses();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" data-testid="nav-logo">
            <div className="w-15 h-15 rounded-xl   flex items-center justify-center ">
              <img src={logo}
                   alt="Logo"
                className="w-full h-full object-contain"/>

            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Day-1 Compantency by SCIT
            </span>
          </Link>

          {/* Desktop Course Links */}
          <div className="hidden lg:flex items-center gap-1">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                data-testid={`nav-course-${course.id}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${location === `/course/${course.id}`
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {course.name}
              </Link>
            ))}
          </div>

          {/* Home link + Hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              data-testid="nav-home"
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${location === "/" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <button
              data-testid="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            data-testid="nav-mobile-home"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <p className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Courses</p>
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              onClick={() => setMenuOpen(false)}
              data-testid={`nav-mobile-course-${course.id}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.color}`} />
              {course.name} — {course.fullName}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
