export function getGrade(percentage) {
  if (percentage >= 90) return { grade: "A+", label: "Outstanding", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", ring: "ring-yellow-400" };
  if (percentage >= 80) return { grade: "A", label: "Excellent", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", ring: "ring-green-400" };
  if (percentage >= 70) return { grade: "B", label: "Good", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", ring: "ring-blue-400" };
  if (percentage >= 60) return { grade: "C", label: "Average", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", ring: "ring-orange-400" };
  return { grade: "Fail", label: "Needs Improvement", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", ring: "ring-red-400" };
}

export default function Result({ correct, total, wrong, skipped }) {
  const percentage = Math.round((correct / total) * 100);
  const { grade, label, color, bg, border, ring } = getGrade(percentage);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {/* Grade Badge */}
      <div className={`col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl border-2 ${bg} ${border} ring-4 ${ring} ring-opacity-20`}>
        <span className={`text-5xl font-black ${color}`}>{grade}</span>
        <span className={`text-sm font-semibold ${color} mt-1`}>{label}</span>
      </div>

      <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
        <span className="text-3xl font-black text-indigo-700">{percentage}%</span>
        <span className="text-xs font-medium text-indigo-500 mt-1">Score</span>
      </div>

      <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-green-50 border border-green-100">
        <span className="text-3xl font-black text-green-600">{correct}</span>
        <span className="text-xs font-medium text-green-500 mt-1">Correct</span>
      </div>

      <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-red-50 border border-red-100">
        <span className="text-3xl font-black text-red-500">{wrong + (skipped || 0)}</span>
        <span className="text-xs font-medium text-red-400 mt-1">Wrong/Skipped</span>
      </div>
    </div>
  );
}
