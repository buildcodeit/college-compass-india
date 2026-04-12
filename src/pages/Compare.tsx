import { useState } from "react";
import Header from "@/components/Header";
import { colleges } from "@/data/colleges";
import { College } from "@/types/college";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Compare = () => {
  const [selected, setSelected] = useState<College[]>([]);

  const addCollege = (id: string) => {
    if (selected.length >= 4) return;
    const c = colleges.find(c => c.id === id);
    if (c && !selected.find(s => s.id === id)) setSelected([...selected, c]);
  };

  const remove = (id: string) => setSelected(selected.filter(c => c.id !== id));

  const fields: { label: string; key: keyof College }[] = [
    { label: "Type", key: "type" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "NIRF Rank", key: "nirfRank" },
    { label: "Rating", key: "rating" },
    { label: "Fees", key: "fees" },
    { label: "Avg Placement", key: "placementsAvg" },
    { label: "Highest Placement", key: "placementsHighest" },
    { label: "Cutoff", key: "cutoff" },
    { label: "Established", key: "established" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Compare Colleges</h1>
        <p className="text-sm text-muted-foreground mb-6">Select up to 4 colleges to compare side by side</p>

        <div className="mb-6">
          <select
            onChange={e => { addCollege(e.target.value); e.target.value = ""; }}
            className="w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="" disabled>Add a college...</option>
            {colleges
              .filter(c => !selected.find(s => s.id === c.id))
              .map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {selected.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            Select colleges above to start comparing.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-muted-foreground p-3 border-b border-border w-40"></th>
                  {selected.map(c => (
                    <th key={c.id} className="text-left p-3 border-b border-border min-w-48">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-bold text-primary">{c.name}</span>
                        <button onClick={() => remove(c.id)} className="ml-2 text-muted-foreground hover:text-destructive">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map(f => (
                  <tr key={f.key} className="hover:bg-muted/50">
                    <td className="text-xs font-medium text-muted-foreground p-3 border-b border-border">{f.label}</td>
                    {selected.map(c => (
                      <td key={c.id} className="text-sm p-3 border-b border-border">
                        {String(c[f.key] ?? "N/A")}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="text-xs font-medium text-muted-foreground p-3 border-b border-border">Courses</td>
                  {selected.map(c => (
                    <td key={c.id} className="p-3 border-b border-border">
                      <div className="flex flex-wrap gap-1">
                        {c.courses.map(course => (
                          <Badge key={course} variant="secondary" className="text-xs">{course}</Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
