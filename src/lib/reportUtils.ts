import { Report } from "@/types/Report";

// 날짜별로 주, 월, 년도 그룹화
export const groupReportsByDate = (reports: Report[]) => {
  const weekly: Record<string, Report[]> = {};
  const monthly: Record<string, Report[]> = {};
  const yearly: Record<string, Report[]> = {};

  reports.forEach((report) => {
    const date = new Date(report.createdAt.seconds * 1000);
    const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const yearKey = `${date.getFullYear()}`;

    if (!weekly[weekKey]) weekly[weekKey] = [];
    if (!monthly[monthKey]) monthly[monthKey] = [];
    if (!yearly[yearKey]) yearly[yearKey] = [];

    weekly[weekKey].push(report);
    monthly[monthKey].push(report);
    yearly[yearKey].push(report);
  });

  return { weekly, monthly, yearly };
};

// 주차 계산 함수
const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
};
