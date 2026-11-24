import MediaLibrary from "@/components/pages/reporter/MediaLibrary";
import ReporterShell from "@/components/pages/reporter/ReporterShell";

export default function MyMedia() {
  return (
    <ReporterShell title="My media" href="/reporter/media">
      <MediaLibrary />
    </ReporterShell>
  );
}
