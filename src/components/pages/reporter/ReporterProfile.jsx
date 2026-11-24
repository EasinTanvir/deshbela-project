import ReporterProfileDetails from "@/components/pages/reporter/ReporterProfileDetails";
import ReporterShell from "@/components/pages/reporter/ReporterShell";

export default function ReporterProfile() {
  return (
    <ReporterShell title="My profile" href="/reporter/profile">
      <ReporterProfileDetails />
    </ReporterShell>
  );
}
