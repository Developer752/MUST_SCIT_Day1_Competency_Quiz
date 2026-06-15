/**
 * quizStore.js
 * Merges static base quiz data with admin additions/deletions from localStorage.
 * Supports: admin-added courses, subjects, questions, edits, and deletions.
 * Dispatches "quizStoreUpdated" custom event on every mutation so UI stays live.
 */
import { courses as baseCourses } from "../data/quizData";

const ADDED_QUESTIONS_KEY   = "adminAddedQuestions";
const EDITED_QUESTIONS_KEY  = "adminEditedQuestions";
const DELETED_QUESTIONS_KEY = "adminDeletedQuestions";
const ADDED_COURSES_KEY     = "adminAddedCourses";
const ADDED_SUBJECTS_KEY    = "adminAddedSubjects";

// ─── ID helpers ───────────────────────────────────────────────────────────────

function uid() {
  return `${Date.now()}__${Math.random().toString(36).slice(2)}`;
}

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function generateBaseQId(courseId, subjectId, index) {
  return `base__${courseId}__${subjectId}__${index}`;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch (_) { return fallback; }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function notify() {
  window.dispatchEvent(new Event("quizStoreUpdated"));
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export function getAdminCourses() {
  return load(ADDED_COURSES_KEY, []);
}

export function addCourse({ name, fullName, description, color, textColor, bgLight }) {
  const courses = getAdminCourses();
  const id = slugify(name) + "__" + uid().slice(0, 6);
  const newCourse = { id, name, fullName, description, color, textColor, bgLight, isAdminCourse: true };
  save(ADDED_COURSES_KEY, [...courses, newCourse]);
  notify();
  return newCourse;
}

export function deleteCourse(id) {
  save(ADDED_COURSES_KEY, getAdminCourses().filter((c) => c.id !== id));
  save(ADDED_SUBJECTS_KEY, getAdminSubjects().filter((s) => s.courseId !== id));
  save(ADDED_QUESTIONS_KEY, load(ADDED_QUESTIONS_KEY, []).filter((q) => q.courseId !== id));
  notify();
}

// ─── Subjects ─────────────────────────────────────────────────────────────────

export function getAdminSubjects() {
  return load(ADDED_SUBJECTS_KEY, []);
}

export function addSubject({ courseId, name, description }) {
  const subjects = getAdminSubjects();
  const id = slugify(name) + "__" + uid().slice(0, 6);
  const newSubject = { id, courseId, name, description, isAdminSubject: true };
  save(ADDED_SUBJECTS_KEY, [...subjects, newSubject]);
  notify();
  return newSubject;
}

export function deleteSubject(id) {
  save(ADDED_SUBJECTS_KEY, getAdminSubjects().filter((s) => s.id !== id));
  save(ADDED_QUESTIONS_KEY, load(ADDED_QUESTIONS_KEY, []).filter((q) => q.subjectId !== id));
  notify();
}

// ─── Questions ────────────────────────────────────────────────────────────────

function loadAddedQuestions()   { return load(ADDED_QUESTIONS_KEY, []); }
function loadEditedMap()        { return load(EDITED_QUESTIONS_KEY, {}); }
function loadDeletedIds()       { return new Set(load(DELETED_QUESTIONS_KEY, [])); }
function saveAddedQuestions(l)  { save(ADDED_QUESTIONS_KEY, l); }
function saveEditedMap(m)       { save(EDITED_QUESTIONS_KEY, m); }
function saveDeletedIds(s)      { save(DELETED_QUESTIONS_KEY, [...s]); }

export function addQuestion({ courseId, subjectId, question, options, correct }) {
  const added = loadAddedQuestions();
  const newQ = { _id: `admin__${uid()}`, courseId, subjectId, question, options, correct };
  saveAddedQuestions([...added, newQ]);
  notify();
  return newQ;
}

export function editQuestion(_id, { question, options, correct }) {
  if (_id.startsWith("admin__")) {
    const added = loadAddedQuestions().map((q) =>
      q._id === _id ? { ...q, question, options, correct } : q
    );
    saveAddedQuestions(added);
  } else {
    const edited = loadEditedMap();
    edited[_id] = { question, options, correct };
    saveEditedMap(edited);
  }
  notify();
}

export function deleteQuestion(_id) {
  const deleted = loadDeletedIds();
  deleted.add(_id);
  saveDeletedIds(deleted);
  if (_id.startsWith("admin__")) {
    saveAddedQuestions(loadAddedQuestions().filter((q) => q._id !== _id));
  }
  notify();
}

// ─── Merged view ──────────────────────────────────────────────────────────────

function buildSubjectWithQuestions(course, subject, addedQuestions, deletedIds, editedMap) {
  const baseQs = (subject.questions || [])
    .map((q, i) => {
      const id = generateBaseQId(course.id, subject.id, i);
      const override = editedMap[id];
      return override ? { ...q, ...override, _id: id } : { ...q, _id: id };
    })
    .filter((q) => !deletedIds.has(q._id));

  const adminQs = addedQuestions.filter(
    (q) => q.courseId === course.id && q.subjectId === subject.id && !deletedIds.has(q._id)
  );

  return { ...subject, questions: [...baseQs, ...adminQs] };
}

/** Returns the full merged list of all courses (base + admin) with subjects and questions */
export function getCourses() {
  const addedQuestions = loadAddedQuestions();
  const deletedIds     = loadDeletedIds();
  const editedMap      = loadEditedMap();
  const adminSubjects  = getAdminSubjects();
  const adminCourses   = getAdminCourses();

  const mergedBase = baseCourses.map((course) => {
    const baseSubjects = course.subjects.map((s) =>
      buildSubjectWithQuestions(course, s, addedQuestions, deletedIds, editedMap)
    );
    const extraSubjects = adminSubjects
      .filter((s) => s.courseId === course.id)
      .map((s) => buildSubjectWithQuestions(course, s, addedQuestions, deletedIds, editedMap));

    return { ...course, subjects: [...baseSubjects, ...extraSubjects] };
  });

  const mergedAdmin = adminCourses.map((course) => {
    const subjects = adminSubjects
      .filter((s) => s.courseId === course.id)
      .map((s) => buildSubjectWithQuestions(course, s, addedQuestions, deletedIds, editedMap));
    return { ...course, subjects };
  });

  return [...mergedBase, ...mergedAdmin];
}

export function getCourseById(id) {
  return getCourses().find((c) => c.id === id) || null;
}

export function getSubjectById(courseId, subjectId) {
  const course = getCourseById(courseId);
  if (!course) return null;
  return course.subjects.find((s) => s.id === subjectId) || null;
}

/** Returns all questions flattened for admin UI */
export function getAllQuestionsForAdmin() {
  const addedQuestions = loadAddedQuestions();
  const deletedIds     = loadDeletedIds();
  const allCourses     = getCourses();
  const result         = [];

  allCourses.forEach((course) => {
    course.subjects.forEach((subject) => {
      (subject.questions || []).forEach((q) => {
        if (!deletedIds.has(q._id)) {
          result.push({
            ...q,
            courseId:    course.id,
            subjectId:   subject.id,
            courseName:  course.name,
            subjectName: subject.name,
            isBase:      !q._id?.startsWith("admin__"),
          });
        }
      });
    });
  });

  addedQuestions.forEach((q) => {
    if (!deletedIds.has(q._id) && !result.find((r) => r._id === q._id)) {
      result.push({ ...q, courseName: q.courseId, subjectName: q.subjectId, isBase: false });
    }
  });

  return result;
}

export { baseCourses };
