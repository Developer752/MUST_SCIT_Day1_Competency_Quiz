import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import Quiz from "./pages/Quiz";
import ResultPage from "./pages/ResultPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddQuestion from "./pages/AddQuestion";
import ManageQuestions from "./pages/ManageQuestions";
import AddCourse from "./pages/AddCourse";
import AddSubject from "./pages/AddSubject";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-6">Page not found</p>
        <a href="/" className="text-indigo-600 hover:underline font-medium">Go Home</a>
      </div>
    </div>
  );
}

// Layout wrapper for student-facing pages (with Navbar)
function StudentLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Student Routes */}
      <Route path="/">
        <StudentLayout><Home /></StudentLayout>
      </Route>
      <Route path="/course/:name">
        {(params) => <StudentLayout><Subjects params={params} /></StudentLayout>}
      </Route>
      <Route path="/quiz/:course/:subject">
        {(params) => <StudentLayout><Quiz params={params} /></StudentLayout>}
      </Route>
      <Route path="/result">
        <StudentLayout><ResultPage /></StudentLayout>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin">
        <ProtectedRoute><AdminDashboard /></ProtectedRoute>
      </Route>
      <Route path="/admin/add">
        <ProtectedRoute><AddQuestion /></ProtectedRoute>
      </Route>
      <Route path="/admin/manage">
        <ProtectedRoute><ManageQuestions /></ProtectedRoute>
      </Route>
      <Route path="/admin/add-course">
        <ProtectedRoute><AddCourse /></ProtectedRoute>
      </Route>
      <Route path="/admin/add-subject">
        <ProtectedRoute><AddSubject /></ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
