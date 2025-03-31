"use client"
import { useEffect, useState } from "react";
import { fetchReports } from "@/lib/firebase";
import { groupReportsByDate } from "@/lib/reportUtils";
import { Report } from "@/types/Report";

const ReportList: React.FC = () => {
  const [weeklyReports, setWeeklyReports] = useState<Record<string, Report[]>>({});
  const [monthlyReports, setMonthlyReports] = useState<Record<string, Report[]>>({});
  const [yearlyReports, setYearlyReports] = useState<Record<string, Report[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      const data = await fetchReports();
      const { weekly, monthly, yearly } = groupReportsByDate(data);

      setWeeklyReports(weekly);
      setMonthlyReports(monthly);
      setYearlyReports(yearly);
      setLoading(false);
    };
    loadReports();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">📜 보고서 목록</h2>
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <>
          <ReportSection title="🗓 주간 보고" reports={weeklyReports} />
          <ReportSection title="📅 월간 보고" reports={monthlyReports} />
          <ReportSection title="📆 연간 보고" reports={yearlyReports} />
        </>
      )}
    </div>
  );
};

const ReportSection: React.FC<{ title: string; reports: Record<string, Report[]> }> = ({ title, reports }) => {
  return (
    <div className="mt-4">
      <h3 className="text-md font-bold">{title}</h3>
      {Object.keys(reports).length === 0 ? (
        <p>데이터 없음</p>
      ) : (
        Object.entries(reports).map(([key, items]) => (
          <div key={key} className="border-t mt-2 pt-2">
            <h4 className="font-semibold">{key}</h4>
            <ul className="list-disc pl-4">
              {items.map((report) => (
                <li key={report.id}>
                  <p>{report.content}</p>
                  <small className="text-gray-500">{new Date(report.createdAt.seconds * 1000).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportList;
