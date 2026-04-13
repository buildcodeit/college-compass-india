import Header from "@/components/Header";
import { useAllColleges } from "@/hooks/useColleges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ExternalLink, Hourglass } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

const EXAM_PATTERNS = [
  "CAT",
  "XAT",
  "SNAP",
  "NMAT",
  "CMAT",
  "MAT",
  "ATMA",
  "CUET",
  "JEE",
  "NEET",
  "SET",
  "IPMAT",
  "SVUET",
] as const;

const APPLICATION_PORTAL_MAP: Record<string, string> = {
  "nayanta university": "https://nayanta.edu.in/admissions/",
  "somaiya vidyavihar university": "https://admission.somaiya.edu/",
  "iift": "https://iift.ac.in/",
  "iim sirmaur": "https://www.iimsirmaur.ac.in/admission-1",
  "tapmi": "https://www.tapmi.edu.in/admissions/",
  "flame university": "https://www.flame.edu.in/admissions",
  "nirma university": "https://admissions.nirmauni.ac.in/",
  "iim udaipur": "https://www.iimu.ac.in/programs/mba/admissions",
  "nalsar university": "https://www.nalsar.ac.in/admissions",
  "ashoka university": "https://www.ashoka.edu.in/admissions/",
  "bennett university": "https://www.bennett.edu.in/admission/",
  "mahindra university": "https://www.mahindrauniversity.edu.in/admissions/",
  "o p jindal": "https://jgu.edu.in/admissions/",
};

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
  if (!date) return { label: "TBA", tone: "secondary" as const };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Closed", tone: "destructive" as const };
  if (diffDays === 0) return { label: "Today", tone: "outline" as const };
  return { label: `${diffDays} days left`, tone: "default" as const };
};

const getApplicationLink = (name: string, website: string | null) => {
  const normalized = name.toLowerCase();
  const matched = Object.entries(APPLICATION_PORTAL_MAP).find(([key]) => normalized.includes(key));
  if (matched) return matched[1];
  if (website) return website;
  return `https://www.google.com/search?q=${encodeURIComponent(`${name} admissions portal`)}`;
};

const inferExamName = (cutoff: string | null, collegeName: string) => {
  if (cutoff) {
    const upper = cutoff.toUpperCase();
    const found = EXAM_PATTERNS.find((exam) => upper.includes(exam));
    if (found) return found;
  }

  if (/iim/i.test(collegeName)) return "CAT";
  if (/somaiya/i.test(collegeName)) return "SVUET";
  return "College Entrance Test";
};

const badgeClass = {
  default: "bg-primary/10 text-primary",
  destructive: "bg-destructive/10 text-destructive",
  outline: "bg-amber-100 text-amber-700 border border-amber-200",
  secondary: "bg-muted text-muted-foreground",
} as const;

const Deadlines = () => {
  const { type } = useParams<{ type: string }>();
  const isApplication = type === "application";
  const { data: colleges = [], isLoading } = useAllColleges();

  const applicationRows = useMemo(
    () =>
      colleges
        .filter((college) => Boolean(college.applicationDeadline))
        .map((college) => ({
          ...college,
          status: getStatus(college.applicationDeadline),
          applyLink: getApplicationLink(college.name, college.website),
        }))
        .sort((a, b) => {
          const da = parseDate(a.applicationDeadline)?.getTime() ?? Number.POSITIVE_INFINITY;
          const db = parseDate(b.applicationDeadline)?.getTime() ?? Number.POSITIVE_INFINITY;
          return da - db;
        }),
    [colleges]
  );

  const testRows = useMemo(() => {
    const grouped = new Map<string, {
      examName: string;
      examDate: string | null;
      status: ReturnType<typeof getStatus>;
      colleges: { id: string; name: string; website: string | null }[];
    }>();

    colleges
      .filter((college) => Boolean(college.testDeadline))
      .forEach((college) => {
        const examName = inferExamName(college.cutoff, college.name);
        const examDate = college.testDeadline;
        const key = `${examName}__${examDate}`;
        if (!grouped.has(key)) {
          grouped.set(key, {
            examName,
            examDate,
            status: getStatus(examDate),
            colleges: [],
          });
        }

        grouped.get(key)?.colleges.push({
          id: college.id,
          name: college.name,
          website: college.website,
        });
      });

    return [...grouped.values()].sort((a, b) => {
      const da = parseDate(a.examDate)?.getTime() ?? Number.POSITIVE_INFINITY;
      const db = parseDate(b.examDate)?.getTime() ?? Number.POSITIVE_INFINITY;
      return da - db;
    });
  }, [colleges]);

  const closedApplications = useMemo(
    () => applicationRows.filter((row) => row.status.tone === "destructive"),
    [applicationRows]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">{isApplication ? "Application Deadlines" : "Test Deadlines"}</CardTitle>
            {!isApplication && (
              <Badge variant="outline" className="gap-1">
                <CalendarDays className="h-3.5 w-3.5" /> Grouped by test + date
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="py-16 text-center text-muted-foreground">Loading deadlines...</p>
            ) : isApplication ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="overflow-auto rounded-lg border">
                  <table className="w-full min-w-[760px]">
                    <thead>
                      <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                        <th className="px-4 py-3">College</th>
                        <th className="px-4 py-3">Deadline</th>
                        <th className="px-4 py-3">Apply</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicationRows.map((row) => (
                        <tr key={row.id} className="border-b">
                          <td className="px-4 py-3">
                            <p className="font-medium">{row.name}</p>
                            <p className="text-xs text-muted-foreground">{row.city}, {row.state}</p>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary">{formatDate(row.applicationDeadline)}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button asChild size="sm" disabled={row.status.tone === "destructive"}>
                              <a href={row.applyLink} target="_blank" rel="noreferrer">
                                <ExternalLink className="h-4 w-4" /> Apply now
                              </a>
                            </Button>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass[row.status.tone]}`}>
                              {row.status.label}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Application Closed</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {closedApplications.length === 0 ? (
                        <p className="text-muted-foreground">No expired application dates.</p>
                      ) : (
                        closedApplications.slice(0, 8).map((row) => (
                          <div key={row.id} className="rounded-md border px-3 py-2">
                            <p className="font-medium">{row.name}</p>
                            <p className="text-xs text-muted-foreground">Expired on {formatDate(row.applicationDeadline)}</p>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p><strong>{applicationRows.length}</strong> colleges with application deadlines.</p>
                      <p><strong>{closedApplications.length}</strong> deadlines already closed.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="overflow-auto rounded-lg border">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-4 py-3">Test</th>
                      <th className="px-4 py-3">Exam date</th>
                      <th className="px-4 py-3">Accepted by colleges</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testRows.map((row) => (
                      <tr key={`${row.examName}-${row.examDate}`} className="border-b align-top">
                        <td className="px-4 py-3 font-medium">{row.examName}</td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary">{formatDate(row.examDate)}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {row.colleges.map((college) => (
                              <a
                                key={college.id}
                                href={getApplicationLink(college.name, college.website)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex rounded-full border px-2.5 py-1 text-xs hover:bg-muted"
                                title="Open application/registration page"
                              >
                                {college.name}
                              </a>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass[row.status.tone]}`}>
                            {row.status.label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Deadlines;
