import { Redirect } from "wouter";

export default function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
  if (!isAdmin) {
    return <Redirect to="/admin-login" />;
  }
  return children;
}
