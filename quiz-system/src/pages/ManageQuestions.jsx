import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { getAllQuestionsForAdmin, deleteQuestion, editQuestion, getCourses } from "../utils/quizStore";

const optionLabels = ["A", "B", "C", "D"];

const emptyEdit = { question: "", options: ["", "", "", ""], correct: "" };

export default function ManageQuestions() {
  const [, setLocation] = useLocation();
  const [questions, setQuestions]     = useState([]);
  const [filterCourse, setFilterCourse]   = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterType, setFilterType]       = useState("all");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [courses, setCourses]             = useState([]);

  // Edit state
  const [editingId, setEditingId]   = useState(null);
  const [editForm, setEditForm]     = useState(emptyEdit);
  const [editErrors, setEditErrors] = useState({});

  const reload = useCallback(() => {
    setQuestions(getAllQuestionsForAdmin());
    setCourses(getCourses());
  }, []);

  useEffect(() => {
    reload();
    window.addEventListener("quizStoreUpdated", reload);
    return () => window.removeEventListener("quizStoreUpdated", reload);
  }, [reload]);

  const handleDelete = (_id) => {
    deleteQuestion(_id);
    setConfirmDelete(null);
    if (editingId === _id) setEditingId(null);
  };

  const openEdit = (q) => {
    setEditingId(q._id);
    setEditForm({
      question: q.question,
      options: [...q.options],
      correct: String(q.correct),
    });
    setEditErrors({});
  };

  const closeEdit = () => { setEditingId(null); setEditErrors({}); };

  const validateEdit = () => {
    const e = {};
    if (!editForm.question.trim()) e.question = "Question is required";
    editForm.options.forEach((opt, i) => {
      if (!opt.trim()) e[`option${i}`] = "Required";
    });
    if (editForm.correct === "") e.correct = "Select the correct answer";
    return e;
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const errs = validateEdit();
    if (Object.keys(errs).length) { setEditErrors(errs); return; }
    editQuestion(editingId, {
      question: editForm.question.trim(),
      options:  editForm.options.map((o) => o.trim()),
      correct:  parseInt(editForm.correct, 10),
    });
    closeEdit();
  };

  const handleEditOption = (i, val) => {
    const options = [...editForm.options];
    options[i] = val;
    setEditForm({ ...editForm, options });
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterCourse  && q.courseId  !== filterCourse)  return false;
    if (filterSubject && q.subjectId !== filterSubject) return false;
    if (filterType === "base"  && !q.isBase)  return false;
    if (filterType === "admin" &&  q.isBase)  return false;
    return true;
  });

  const selectedCourse = courses.find((c) => c.id === filterCourse);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/admin")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
          <span className="text-slate-600">/</span>
          <span className="font-bold text-sm text-white">Manage Questions</span>
        </div>
        <button
          onClick={() => { localStorage.removeItem("adminLoggedIn"); setLocation("/admin-login"); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Manage Questions</h1>
            <p className="text-gray-500 text-sm mt-1">{filteredQuestions.length} of {questions.length} questions shown</p>
          </div>
          <button
            data-testid="btn-go-add"
            onClick={() => setLocation("/admin/add")}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Question
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            data-testid="filter-course"
            value={filterCourse}
            onChange={(e) => { setFilterCourse(e.target.value); setFilterSubject(""); }}
            className="px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name} — {c.fullName}</option>
            ))}
          </select>
          <select
            data-testid="filter-subject"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            disabled={!selectedCourse}
            className="px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">All Subjects</option>
            {selectedCourse?.subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select
            data-testid="filter-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
          >
            <option value="all">All Types</option>
            <option value="base">Base Questions</option>
            <option value="admin">Admin Added</option>
          </select>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No questions found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q._id}
                data-testid={`question-card-${idx}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* ── View mode ── */}
                {editingId !== q._id ? (
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                            {q.courseName}
                          </span>
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                            {q.subjectName}
                          </span>
                          {!q.isBase && (
                            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                              Admin Added
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-3 leading-relaxed">
                          {q.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                                i === q.correct
                                  ? "bg-green-50 text-green-700 border border-green-200"
                                  : "bg-gray-50 text-gray-600"
                              }`}
                            >
                              <span className="font-bold">{optionLabels[i]}.</span>
                              {opt}
                              {i === q.correct && (
                                <svg className="w-3.5 h-3.5 ml-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Action buttons */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          data-testid={`btn-edit-${idx}`}
                          onClick={() => openEdit(q)}
                          className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-500 hover:bg-indigo-500 hover:text-white flex items-center justify-center transition-all"
                          title="Edit question"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          data-testid={`btn-delete-${idx}`}
                          onClick={() => setConfirmDelete(q._id)}
                          className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                          title="Delete question"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Edit mode ── */
                  <form onSubmit={handleEditSubmit} className="p-5 space-y-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-indigo-600">Editing Question</span>
                      <button type="button" onClick={closeEdit} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Question text */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Question *</label>
                      <textarea
                        rows={2}
                        value={editForm.question}
                        onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                        className={`w-full px-3 py-2 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 resize-none ${editErrors.question ? "border-red-400" : "border-gray-200"}`}
                      />
                      {editErrors.question && <p className="text-red-500 text-xs mt-1">{editErrors.question}</p>}
                    </div>

                    {/* Options */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">Options *</label>
                      <div className="space-y-2">
                        {editForm.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {optionLabels[i]}
                            </span>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => handleEditOption(i, e.target.value)}
                              className={`flex-1 px-3 py-2 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${editErrors[`option${i}`] ? "border-red-400" : "border-gray-200"}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Correct answer */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">Correct Answer *</label>
                      <div className="grid grid-cols-4 gap-2">
                        {optionLabels.map((label, i) => (
                          <label
                            key={i}
                            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border-2 cursor-pointer transition-all text-xs font-semibold ${
                              editForm.correct === String(i)
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                            }`}
                          >
                            <input
                              type="radio"
                              name="edit-correct"
                              value={i}
                              checked={editForm.correct === String(i)}
                              onChange={(e) => setEditForm({ ...editForm, correct: e.target.value })}
                              className="sr-only"
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                      {editErrors.correct && <p className="text-red-500 text-xs mt-1">{editErrors.correct}</p>}
                    </div>

                    {/* Save / Cancel */}
                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={closeEdit}
                        className="px-5 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Question?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone. The question will be removed from the quiz system immediately.</p>
            <div className="flex gap-3">
              <button
                data-testid="btn-confirm-delete"
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                data-testid="btn-cancel-delete"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
