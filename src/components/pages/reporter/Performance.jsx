import PerformanceDetails from "@/components/pages/reporter/PerformanceDetails";
import ReporterShell from "@/components/pages/reporter/ReporterShell";

export default function Performance() {
  return (
    <ReporterShell title="Performance" href="/reporter/performance">
      <PerformanceDetails />
    </ReporterShell>
  );
}
