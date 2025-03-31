"use client"
import { useState } from "react";
import { saveReport } from "@/lib/firebase";

const ReportForm: React.FC = () => {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report.trim()) return;

    setLoading(true);
    await saveReport(report);
    setReport(""); // 입력 초기화
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">일일 보고 작성</h2>
      <textarea
        className="w-full border rounded p-2"
        rows={4}
        placeholder="오늘의 업무 내용을 입력하세요..."
        value={report}
        onChange={(e) => setReport(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "제출 중..." : "제출"}
      </button>
    </form>
  );
};

export default ReportForm;