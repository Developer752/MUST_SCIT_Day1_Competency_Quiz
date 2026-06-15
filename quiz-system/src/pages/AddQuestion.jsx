import { useState } from "react";
import { useLocation } from "wouter";
import { getCourses, addQuestion } from "../utils/quizStore";

const emptyForm = {
  courseId: "",
  subjectId: "",
  question: "",
  options: ["", "", "", ""],
  correct: "",
};

export default function AddQuestion() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const allCourses = getCourses();
  const selectedCourse = allCourses.find((c) => c.id === form.courseId);

  const handleOption = (index, value) => {
    const options = [...form.options];
    options[index] = value;
    setForm({ ...form, options });
  };

  const validate = () => {
    const e = {};
    if (!form.courseId) e.courseId = "Select a course";
    if (!form.subjectId) e.subjectId = "Select a subject";
    if (!form.question.trim()) e.question = "Question is required";
    form.options.forEach((opt, i) => {
      if (!opt.trim()) e[`option${i}`] = "Option is required";
    });
    if (form.correct === "") e.correct = "Select the correct answer";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setErrors({});

    addQuestion({
      courseId: form.courseId,
      subjectId: form.subjectId,
      question: form.question.trim(),
      options: form.options.map((o) => o.trim()),
      correct: parseInt(form.correct, 10),
    });

    setSuccess(true);
    setForm(emptyForm);
    setTimeout(() => setSuccess(false), 3000);
  };

  const optionLabels = ["A", "B", "C", "D"];

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
          <span className="font-bold text-sm text-white">Add Question</span>
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-7">
          <h1 className="text-2xl font-black text-gray-900">Add New Question</h1>
          <p className="text-gray-500 text-sm mt-1">Add an MCQ to any course and subject</p>
        </div>

        {success && (
          <div data-testid="add-success-msg" className="flex items-center gap-2 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium text-sm mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Question added successfully! It is now live in the quiz system.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Course */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Course *</label>
            <select
              data-testid="select-course"
              value={form.courseId}
              onChange={(e) => setForm({ ...form, courseId: e.target.value, subjectId: "" })}
              className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors bg-white ${errors.courseId ? "border-red-400" : "border-gray-200"}`}
            >
              <option value="">-- Select Course --</option>
              {allCourses.map((c) => (
                <option key={c.id} value={c.id}>{c.name} — {c.fullName}{c.isAdminCourse ? " (Admin)" : ""}</option>
              ))}
            </select>
            {errors.courseId && <p className="text-red-500 text-xs mt-1">{errors.courseId}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
            <select
              data-testid="select-subject"
              value={form.subjectId}
              onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
              disabled={!selectedCourse}
              className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed ${errors.subjectId ? "border-red-400" : "border-gray-200"}`}
            >
              <option value="">-- Select Subject --</option>
              {selectedCourse?.subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.subjectId && <p className="text-red-500 text-xs mt-1">{errors.subjectId}</p>}
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Question *</label>
            <textarea
              data-testid="input-question"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              rows={3}
              placeholder="Enter the question text..."
              className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none ${errors.question ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question}</p>}
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Answer Options *</label>
            <div className="space-y-3">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {optionLabels[i]}
                  </span>
                  <input
                    data-testid={`input-option-${i}`}
                    type="text"
                    value={opt}
                    onChange={(e) => handleOption(i, e.target.value)}
                    placeholder={`Option ${optionLabels[i]}`}
                    className={`flex-1 px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors ${errors[`option${i}`] ? "border-red-400" : "border-gray-200"}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Correct Answer *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {optionLabels.map((label, i) => (
                <label
                  key={i}
                  data-testid={`radio-correct-${i}`}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                    form.correct === String(i)
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="correct"
                    value={i}
                    checked={form.correct === String(i)}
                    onChange={(e) => setForm({ ...form, correct: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.correct === String(i) ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                    {form.correct === String(i) && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  Option {label}
                </label>
              ))}
            </div>
            {errors.correct && <p className="text-red-500 text-xs mt-1">{errors.correct}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              data-testid="btn-submit-question"
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
            >
              Add Question
            </button>
            <button
              type="button"
              onClick={() => { setForm(emptyForm); setErrors({}); }}
              className="px-6 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
