import { useState, useEffect } from "react";
import { getCourses } from "../utils/quizStore";

export function useCourses() {
  const [courses, setCourses] = useState(() => getCourses());

  useEffect(() => {
    const refresh = () => setCourses(getCourses());
    window.addEventListener("storage", refresh);
    window.addEventListener("quizStoreUpdated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("quizStoreUpdated", refresh);
    };
  }, []);

  return [courses, () => setCourses(getCourses())];
}
