import ReportForm from "@/components/ReportForm";
import ReportList from "@/components/ReportList";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ReportForm />
      <ReportList />
    </div>
  );
}