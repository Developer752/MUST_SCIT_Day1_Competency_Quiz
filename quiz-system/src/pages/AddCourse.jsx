import { useState } from "react";
import { useLocation } from "wouter";
import { addCourse, getAdminCourses, deleteCourse } from "../utils/quizStore";

const COLOR_OPTIONS = [
  { label: "Blue / Indigo",    color: "from-blue-600 to-indigo-700",   textColor: "text-blue-600",   bgLight: "bg-blue-50" },
  { label: "Violet / Purple",  color: "from-violet-600 to-purple-700", textColor: "text-violet-600", bgLight: "bg-violet-50" },
  { label: "Red / Rose",       color: "from-red-600 to-rose-700",      textColor: "text-red-600",    bgLight: "bg-red-50" },
  { label: "Emerald / Teal",   color: "from-emerald-600 to-teal-700",  textColor: "text-emerald-600",bgLight: "bg-emerald-50" },
  { label: "Orange / Amber",   color: "from-orange-600 to-amber-700",  textColor: "text-orange-600", bgLight: "bg-orange-50" },
  { label: "Pink / Fuchsia",   color: "from-pink-600 to-fuchsia-700",  textColor: "text-pink-600",   bgLight: "bg-pink-50" },
  { label: "Cyan / Sky",       color: "from-cyan-600 to-sky-700",      textColor: "text-cyan-600",   bgLight: "bg-cyan-50" },
  { label: "Yellow / Orange",  color: "from-yellow-500 to-orange-600", textColor: "text-yellow-600", bgLight: "bg-yellow-50" },
];

const empty = { name: "", fullName: "", description: "", colorIndex: 0 };

export default function AddCourse() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [adminCourses, setAdminCourses] = useState(getAdminCourses);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const reload = () => setAdminCourses(getAdminCourses());

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Short name is required (e.g. BSIT)";
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const chosen = COLOR_OPTIONS[form.colorIndex];
    addCourse({
      name: form.name.trim(),
      fullName: form.fullName.trim(),
      description: form.description.trim(),
      color: chosen.color,
      textColor: chosen.textColor,
      bgLight: chosen.bgLight,
    });
    setSuccess(true);
    setForm(empty);
    reload();
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    deleteCourse(id);
    setConfirmDelete(null);
    reload();
  };

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
          <span className="font-bold text-sm">Manage Courses</span>
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
            <h1 className="text-2xl font-black text-gray-900">Add New Course</h1>
            <p className="text-gray-500 text-sm mt-1">Create a new degree program visible to students</p>
          </div>

          {success && (
            <div data-testid="course-success-msg" className="flex items-center gap-2 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium text-sm mb-5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Course added! It is now live in the student quiz system.
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            {/* Short name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Short Name * <span className="text-gray-400 font-normal">(shown in navbar)</span></label>
              <input data-testid="input-course-name" type="text" placeholder="e.g. BS Data Science"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors ${errors.name ? "border-red-400" : "border-gray-200"}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Full name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Program Name *</label>
              <input data-testid="input-course-fullname" type="text" placeholder="e.g. Data Science"
                value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors ${errors.fullName ? "border-red-400" : "border-gray-200"}`} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
              <textarea data-testid="input-course-desc" rows={2} placeholder="Bachelor of Science in ..."
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none ${errors.description ? "border-red-400" : "border-gray-200"}`} />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Color theme */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Color Theme *</label>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_OPTIONS.map((opt, i) => (
                  <button key={i} type="button" data-testid={`color-option-${i}`}
                    onClick={() => setForm({ ...form, colorIndex: i })}
                    className={`h-10 rounded-xl bg-gradient-to-r ${opt.color} transition-all ${form.colorIndex === i ? "ring-4 ring-offset-2 ring-indigo-400 scale-105" : "opacity-70 hover:opacity-100"}`}
                    title={opt.label}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Selected: {COLOR_OPTIONS[form.colorIndex].label}</p>
            </div>

            {/* Preview */}
            <div className={`h-2 rounded-full bg-gradient-to-r ${COLOR_OPTIONS[form.colorIndex].color} opacity-80`} />

            <button data-testid="btn-submit-course" type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md">
              Add Course
            </button>
          </form>
        </div>

        {/* ── Admin-added courses list ── */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Admin-Added Courses
            <span className="ml-2 text-sm font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{adminCourses.length}</span>
          </h2>

          {adminCourses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <p className="text-gray-400 text-sm">No courses added yet. Use the form to create one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {adminCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${course.color}`} />
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold ${course.textColor} ${course.bgLight} px-2.5 py-1 rounded-full`}>
                          {course.name}
                        </span>
                        <span className="text-xs text-gray-400 bg-violet-50 text-violet-500 font-semibold px-2 py-0.5 rounded-full">Admin Created</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 mt-1">{course.fullName}</p>
                      <p className="text-xs text-gray-400 truncate">{course.description}</p>
                    </div>
                    <button data-testid={`btn-delete-course-${course.id}`}
                      onClick={() => setConfirmDelete(course.id)}
                      className="flex-shrink-0 w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setLocation("/admin/add-subject")}
            className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-indigo-300 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Subjects to Courses
          </button>
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
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Course?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">This will also delete all subjects and questions inside this course.</p>
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
