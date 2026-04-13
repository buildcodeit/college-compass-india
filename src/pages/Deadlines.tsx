import Header from "@/components/Header";
import { useAllColleges } from "@/hooks/useColleges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
 codex/add-college-and-test-deadlines-feature-8bulvs
import { CalendarDays, ExternalLink, Hourglass } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

const parseDate = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value: string | null) => {
  const date = parseDate(value);
  if (!date) return "Not announced";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getStatus = (value: string | null) => {
  const date = parseDate(value);
  if (!date) return { label: "TBA", tone: "muted" as const };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Closed", tone: "closed" as const };
  if (diffDays === 0) return { label: "Today", tone: "warning" as const };
  return { label: `${diffDays} days left`, tone: "open" as const };
};

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
 main

const Deadlines = () => {
  const { type } = useParams<{ type: string }>();
  const isApplication = type === "application";
  const { data: colleges = [], isLoading } = useAllColleges();

 codex/add-college-and-test-deadlines-feature-8bulvs
  const rows = useMemo(() => {
    const list = colleges
      .map((college) => {
        const primaryDate = isApplication ? college.applicationDeadline : college.testDeadline;
        return {
          ...college,
          primaryDate,
          primaryStatus: getStatus(primaryDate),
          applicationStatus: getStatus(college.applicationDeadline),
        };
      })
      .filter((college) => Boolean(college.primaryDate))
      .sort((a, b) => {
        const da = parseDate(a.primaryDate)?.getTime() ?? Number.POSITIVE_INFINITY;
        const db = parseDate(b.primaryDate)?.getTime() ?? Number.POSITIVE_INFINITY;
        return da - db;
      });

    return list;
  }, [colleges, isApplication]);

  const upcomingSoon = useMemo(
    () => rows.filter((row) => row.primaryStatus.tone === "open" || row.primaryStatus.tone === "warning").slice(0, 4),
    [rows]
  );

  const closedCount = useMemo(() => rows.filter((row) => row.primaryStatus.tone === "closed").length, [rows]);

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
 main

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Header />
 codex/add-college-and-test-deadlines-feature-8bulvs
      <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        <div className="rounded-xl border border-black/10 bg-[#f2f2f2] p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="text-3xl font-bold text-[#13151a]">{isApplication ? "Application Open" : "Test Deadlines"}</h1>
            {!isApplication && (
              <Button className="h-11 rounded-xl bg-[#992e31] px-5 text-base font-semibold hover:bg-[#85282a]">
                <CalendarDays className="h-4 w-4" /> Exam Dates

      <main className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
        <div className="rounded-xl border border-black/10 bg-[#f2f2f2] p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="text-4xl font-bold text-[#13151a]">Application Open</h1>
            {!isApplication && (
              <Button className="h-12 rounded-xl bg-[#992e31] px-6 text-xl font-semibold hover:bg-[#85282a]">
                <CalendarDays className="h-5 w-5" /> Exam Dates
 main
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="py-16 text-center text-muted-foreground">Loading deadlines...</div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">No deadlines available.</div>
          ) : (
 codex/add-college-and-test-deadlines-feature-8bulvs
            <div className={`grid grid-cols-1 gap-6 ${isApplication ? "xl:grid-cols-[2fr_1fr]" : ""}`}>
              <div className="overflow-hidden rounded-xl border border-black/10 bg-white/20">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 text-left text-xs font-semibold uppercase tracking-wide text-[#444] md:text-sm">
                      <th className="px-4 py-3">{isApplication ? "College" : "Test / College"}</th>
                      <th className="px-4 py-3">{isApplication ? "Deadline" : "Exam Date"}</th>
                      <th className="px-4 py-3">{isApplication ? "Apply" : "Application Deadline"}</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((college) => (
                      <tr key={college.id} className="border-b border-black/10 align-middle text-[#222]">
                        <td className="px-4 py-4">
                          <div className="text-lg font-medium">{college.name}</div>
                          <div className="text-xs text-muted-foreground">{college.city}, {college.state}</div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm font-medium bg-[#e4e4e4] text-[#2a2a2a]">
                            {formatDate(college.primaryDate)}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          {isApplication ? (
                            <Button asChild className="h-10 rounded-xl bg-[#992e31] px-4 text-sm font-semibold hover:bg-[#85282a]">
                              <a href={college.website || `/college/${college.id}`} target={college.website ? "_blank" : undefined} rel={college.website ? "noreferrer" : undefined}>
                                <ExternalLink className="h-4 w-4" /> Apply Now
                              </a>
                            </Button>
                          ) : (
                            <Badge variant="secondary" className="rounded-full bg-[#eadede] px-3 py-1 text-sm text-[#9b3030]">
                              {formatDate(college.applicationDeadline)}
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <Badge
                            className={`rounded-full px-3 py-1 text-sm ${
                              college.primaryStatus.tone === "closed"
                                ? "bg-[#e8d4d4] text-[#9b3030]"
                                : college.primaryStatus.tone === "warning"
                                  ? "bg-[#f2e7c8] text-[#8a5a00]"
                                  : college.primaryStatus.tone === "muted"
                                    ? "bg-[#e5e5e5] text-[#5c5c5c]"
                                    : "bg-[#cde0ca] text-[#0e7f1f]"
                            }`}
                          >
                            {college.primaryStatus.label}
                          </Badge>
                        </td>
                      </tr>
                    ))}

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
main
                  </tbody>
                </table>
              </div>

              {isApplication && (
 codex/add-college-and-test-deadlines-feature-8bulvs
                <aside className="space-y-4">
                  <div className="rounded-xl border border-black/10 bg-white/40 p-4">
                    <h2 className="mb-3 text-xl font-bold text-[#13151a]">Registration Starts Soon</h2>
                    {upcomingSoon.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No upcoming deadlines right now.</p>
                    ) : (
                      <div className="space-y-2">
                        {upcomingSoon.map((college) => (
                          <Link key={college.id} to={`/college/${college.id}`} className="block rounded-md p-2 text-sm font-medium hover:bg-black/5">
                            {college.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-black/10 bg-white/40 p-4">
                    <div className="flex items-center gap-2 text-[#992e31]">
                      <Hourglass className="h-4 w-4" />
                      <p className="font-semibold">Closed applications: {closedCount}</p>
                    </div>
                  </div>

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
 main
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
