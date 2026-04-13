import { useAllColleges } from "@/hooks/useColleges";
import Header from "@/components/Header";
import { useParams, Link } from "react-router-dom";
import { CalendarClock, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

const Deadlines = () => {
  const { type } = useParams<{ type: string }>();
  const isApplication = type === "application";
  const { data: colleges = [], isLoading } = useAllColleges();

  const grouped = useMemo(() => {
    const map = new Map<string, typeof colleges>();
    for (const c of colleges) {
      const deadline = isApplication ? c.applicationDeadline : c.testDeadline;
      if (!deadline) continue;
      if (!map.has(deadline)) map.set(deadline, []);
      map.get(deadline)!.push(c);
    }
    return [...map.entries()].sort((a, b) => {
      const da = new Date(a[0]).getTime();
      const db = new Date(b[0]).getTime();
      return da - db;
    });
  }, [colleges, isApplication]);

  const Icon = isApplication ? FileCheck : CalendarClock;
  const title = isApplication ? "Application Deadlines" : "Test Deadlines";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          {isApplication ? "Don't miss the last date to apply" : "Mark your entrance test dates"}
        </p>

        {isLoading ? (
          <div className="text-center py-16 text-muted-foreground">Loading...</div>
        ) : grouped.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No deadlines available.</div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([deadline, items]) => {
              const isPast = new Date(deadline) < new Date();
              return (
                <div key={deadline}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`text-lg font-bold ${isPast ? "text-destructive line-through" : "text-accent"}`}>
                      {deadline}
                    </div>
                    {isPast && <Badge variant="destructive" className="text-xs">Passed</Badge>}
                    <Badge variant="secondary" className="text-xs">{items.length} college{items.length > 1 ? "s" : ""}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items.map(c => (
                      <Link
                        key={c.id}
                        to={`/college/${c.id}`}
                        className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-bold text-primary">{c.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{c.city}, {c.state}</p>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0 ml-2">{c.type}</Badge>
                        </div>
                        {c.cutoff && (
                          <p className="text-xs text-muted-foreground mt-2">Cutoff: {c.cutoff}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Deadlines;
