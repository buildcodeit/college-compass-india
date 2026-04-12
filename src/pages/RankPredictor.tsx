import { useState } from "react";
import Header from "@/components/Header";
import { getRecommendations } from "@/data/colleges";
import { College } from "@/types/college";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Target, TrendingUp, Shield } from "lucide-react";

const RankPredictor = () => {
  const [rank, setRank] = useState("");
  const [results, setResults] = useState<{ dream: College[]; reach: College[]; safe: College[] } | null>(null);

  const handlePredict = () => {
    const r = parseInt(rank);
    if (isNaN(r) || r <= 0) return;
    setResults(getRecommendations(r));
  };

  const TierSection = ({ title, icon: Icon, colleges, color }: { title: string; icon: any; colleges: College[]; color: string }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-5 w-5`} style={{ color }} />
        <h3 className="text-lg font-semibold" style={{ color }}>{title}</h3>
        <Badge variant="secondary" className="text-xs">{colleges.length}</Badge>
      </div>
      {colleges.length === 0 ? (
        <p className="text-sm text-muted-foreground pl-7">No colleges in this tier for your rank.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-7">
          {colleges.map(c => (
            <Link
              key={c.id}
              to={`/college/${c.id}`}
              className="bg-card border border-border rounded-md p-3 hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-semibold text-primary">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.city} · NIRF #{c.nirfRank} · {c.cutoff}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-primary mb-2">Rank-Based College Predictor</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter your JEE rank to see dream, reach, and safe colleges
        </p>

        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <label className="block text-sm font-medium text-foreground mb-2">Your JEE Rank</label>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Enter your rank (e.g., 5000)"
              value={rank}
              onChange={e => setRank(e.target.value)}
              className="max-w-xs"
              onKeyDown={e => e.key === "Enter" && handlePredict()}
            />
            <Button onClick={handlePredict} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Predict
            </Button>
          </div>
        </div>

        {results && (
          <div>
            <TierSection title="Dream Colleges" icon={Target} colleges={results.dream} color="hsl(var(--dream))" />
            <TierSection title="Reach Colleges" icon={TrendingUp} colleges={results.reach} color="hsl(var(--reach))" />
            <TierSection title="Safe Colleges" icon={Shield} colleges={results.safe} color="hsl(var(--safe))" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RankPredictor;
