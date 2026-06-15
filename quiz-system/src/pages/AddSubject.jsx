import { useState } from "react";
import { useLocation } from "wouter";
import { addSubject, deleteSubject, getAdminSubjects, getCourses } from "../utils/quizStore";

const empty = { courseId: "", name: "", description: "" };

export default function AddSubject() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [filterCourse, setFilterCourse] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [adminSubjects, setAdminSubjects] = useState(getAdminSubjects);

  const allCourses = getCourses();

  const reload = () => setAdminSubjects(getAdminSubjects());

  const validate = () => {
    const e = {};
    if (!form.courseId) e.courseId = "Select a course";
    if (!form.name.trim()) e.name = "Subject name is required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    addSubject({ courseId: form.courseId, name: form.name.trim(), description: form.description.trim() });
    setSuccess(true);
    setForm(empty);
    reload();
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    deleteSubject(id);
    setConfirmDelete(null);
    reload();
  };

  const getCourseLabel = (courseId) => {
    const c = allCourses.find((c) => c.id === courseId);
    return c ? `${c.name} — ${c.fullName}` : courseId;
  };

  const filteredSubjects = filterCourse
    ? adminSubjects.filter((s) => s.courseId === filterCourse)
    : adminSubjects;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/admin")} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
          <span className="text-slate-600">/</span>
          <span className="font-bold text-sm">Manage Subjects</span>
        </div>
        <button onClick={() => { localStorage.removeItem("adminLoggedIn"); setLocation("/admin-login"); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* ── Form ── */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-black text-gray-900">Add New Subject</h1>
            <p className="text-gray-500 text-sm mt-1">Add a subject to any existing course</p>
          </div>

          {success && (
            <div data-testid="subject-success-msg" className="flex items-center gap-2 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium text-sm mb-5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Subject added! Students can now see it under the selected course.
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            {/* Course */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Course *</label>
              <select data-testid="select-course-for-subject"
                value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white transition-colors ${errors.courseId ? "border-red-400" : "border-gray-200"}`}>
                <option value="">-- Select Course --</option>
                {allCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.fullName}{c.isAdminCourse ? " (Admin)" : ""}
                  </option>
                ))}
              </select>
              {errors.courseId && <p className="text-red-500 text-xs mt-1">{errors.courseId}</p>}
            </div>

            {/* Subject name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Subject Name *</label>
              <input data-testid="input-subject-name" type="text" placeholder="e.g. Artificial Neural Networks"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors ${errors.name ? "border-red-400" : "border-gray-200"}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
              <textarea data-testid="input-subject-desc" rows={2}
                placeholder="Brief description of the subject..."
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none ${errors.description ? "border-red-400" : "border-gray-200"}`} />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <div className="flex gap-3">
              <button data-testid="btn-submit-subject" type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md">
                Add Subject
              </button>
              <button type="button" onClick={() => setLocation("/admin/add")}
                className="px-5 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 text-sm transition-colors">
                Add Questions
              </button>
            </div>
          </form>
        </div>

        {/* ── Admin subjects list ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Admin-Added Subjects
              <span className="ml-2 text-sm font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{adminSubjects.length}</span>
            </h2>
          </div>

          {/* Filter */}
          <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white mb-4">
            <option value="">All Courses</option>
            {allCourses.map((c) => (
              <option key={c.id} value={c.id}>{c.name} — {c.fullName}</option>
            ))}
          </select>

          {filteredSubjects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <p className="text-gray-400 text-sm">No subjects added yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {filteredSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{subject.name}</p>
                    <p className="text-xs text-indigo-500 font-medium truncate">{getCourseLabel(subject.courseId)}</p>
                    <p className="text-xs text-gray-400 truncate">{subject.description}</p>
                  </div>
                  <button data-testid={`btn-delete-subject-${subject.id}`}
                    onClick={() => setConfirmDelete(subject.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Subject?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">All questions added to this subject will also be removed.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors">Delete</button>
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
