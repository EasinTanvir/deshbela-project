import DashboardSummary from "@/components/pages/reporter/DashboardSummary";
import ReporterShell from "@/components/pages/reporter/ReporterShell";

export default function ReporterDashboard() {
  return (
    <ReporterShell title="Reporter dashboard" href="/reporter">
      <DashboardSummary />
    </ReporterShell>
  );
}
