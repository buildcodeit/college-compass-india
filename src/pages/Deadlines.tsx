import Header from "@/components/Header";
import { useAllColleges } from "@/hooks/useColleges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, ExternalLink, Hourglass, Play } from "lucide-react";
import { useMemo } from "react";

const formatDate = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const daysLeft = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "Closed";
  if (diff === 0) return "Today";
  return `${diff} Days Left`;
};

const registrationStartsSoon = ["IIM Shillong", "IIM Sambalpur"];

const Deadlines = () => {
  const { type } = useParams<{ type: string }>();
  const isApplication = type === "application";
  const { data: colleges = [], isLoading } = useAllColleges();

  const rows = useMemo(
    () =>
      colleges
        .filter((college) => (isApplication ? !!college.applicationDeadline : !!college.testDeadline))
        .sort((a, b) => {
          const da = new Date(isApplication ? a.applicationDeadline ?? "" : a.testDeadline ?? "").getTime();
          const db = new Date(isApplication ? b.applicationDeadline ?? "" : b.testDeadline ?? "").getTime();
          if (Number.isNaN(da) || Number.isNaN(db)) return 0;
          return da - db;
        }),
    [colleges, isApplication]
  );

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Header />
      <main className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
        <div className="rounded-xl border border-black/10 bg-[#f2f2f2] p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="text-4xl font-bold text-[#13151a]">Application Open</h1>
            {!isApplication && (
              <Button className="h-12 rounded-xl bg-[#992e31] px-6 text-xl font-semibold hover:bg-[#85282a]">
                <CalendarDays className="h-5 w-5" /> Exam Dates
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="py-16 text-center text-muted-foreground">Loading deadlines...</div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">No deadlines available.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-black/10 bg-white/20">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 text-left text-sm font-semibold uppercase tracking-wide text-[#444]">
                      <th className="px-4 py-4">{isApplication ? "College" : "Test"}</th>
                      <th className="px-4 py-4">{isApplication ? "Deadline" : "Exam Date"}</th>
                      <th className="px-4 py-4">{isApplication ? "Apply to College" : "Deadline"}</th>
                      <th className="px-4 py-4">{isApplication ? "Status" : "Link"}</th>
                      <th className="hidden px-4 py-4 lg:table-cell">{isApplication ? "" : "Form Filling"}</th>
                      <th className="hidden px-4 py-4 lg:table-cell">{isApplication ? "" : "Status"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((college) => {
                      const deadline = isApplication ? college.applicationDeadline : college.testDeadline;
                      const displayDate = formatDate(deadline) ?? "Deadline not available";
                      const left = daysLeft(deadline);
                      const isClosed = left === "Closed";

                      return (
                        <tr key={college.id} className="border-b border-black/10 align-middle text-[#222]">
                          <td className="px-4 py-4 text-2xl font-medium">{college.name}</td>
                          <td className="px-4 py-4">
                            <Badge
                              variant="secondary"
                              className={`rounded-full px-3 py-1 text-xl font-medium ${
                                isApplication ? "bg-[#ddd] text-[#2a2a2a]" : "bg-[#d9e3f3] text-[#1f5f9c]"
                              }`}
                            >
                              {isApplication ? left ?? displayDate : displayDate}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            {isApplication ? (
                              <Button asChild className="h-12 rounded-xl bg-[#992e31] px-6 text-3xl font-semibold hover:bg-[#85282a]">
                                <Link to={`/college/${college.id}`}>
                                  <ExternalLink className="h-5 w-5" /> Apply Now
                                </Link>
                              </Button>
                            ) : (
                              <Badge variant="secondary" className="rounded-full bg-[#eadede] px-3 py-1 text-xl text-[#9b3030]">
                                {displayDate}
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {isApplication ? (
                              <Badge className={`rounded-full px-3 py-1 text-lg ${isClosed ? "bg-[#e8d4d4] text-[#9b3030]" : "bg-[#cde0ca] text-[#0e7f1f]"}`}>
                                {isClosed ? "Closed" : "Open"}
                              </Badge>
                            ) : (
                              <Button asChild className="h-12 rounded-xl bg-[#992e31] px-6 text-3xl font-semibold hover:bg-[#85282a]">
                                <Link to={`/college/${college.id}`}>
                                  <ExternalLink className="h-5 w-5" /> Apply Now
                                </Link>
                              </Button>
                            )}
                          </td>
                          <td className="hidden px-4 py-4 lg:table-cell">
                            {!isApplication && (
                              <Button variant="outline" className="h-12 rounded-xl border-black/15 bg-[#efefef] px-5 text-3xl font-semibold text-[#1f1f1f] hover:bg-[#e8e8e8]">
                                <Play className="h-5 w-5 fill-current" /> Video
                              </Button>
                            )}
                          </td>
                          <td className="hidden px-4 py-4 lg:table-cell">
                            {!isApplication && (
                              <Badge className={`rounded-full px-3 py-1 text-lg ${isClosed ? "bg-[#e8d4d4] text-[#9b3030]" : "bg-[#cde0ca] text-[#0e7f1f]"}`}>
                                {isClosed ? "Closed" : "Open"}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {isApplication && (
                <aside className="space-y-6">
                  <div>
                    <h2 className="mb-4 text-4xl font-bold text-[#13151a]">Registration Starts Soon</h2>
                    <div className="space-y-4 border-y border-black/10 py-4">
                      {registrationStartsSoon.map((name) => (
                        <p key={name} className="text-3xl font-semibold text-[#1c1c1c]">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>

                  <Button className="h-14 w-full rounded-xl bg-[#992e31] text-3xl font-semibold hover:bg-[#85282a]">
                    <Play className="h-6 w-6 fill-current" /> Form Filling Videos
                  </Button>
                  <Button className="h-14 w-full rounded-xl bg-[#992e31] text-3xl font-semibold hover:bg-[#85282a]">
                    <Hourglass className="h-6 w-6" /> Application Closed
                  </Button>
                </aside>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Deadlines;
