import Live from "@/components/pages/live/Live";

export const metadata = {
  title: "Live",
  description: "Watch DESHBELA live streams of news events, press conferences and talk shows.",
  alternates: { canonical: "/live" },
};

export default function LivePage() {
  return <Live />;
}
