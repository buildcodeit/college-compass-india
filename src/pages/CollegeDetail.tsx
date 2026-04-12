import { useParams, Link } from "react-router-dom";
import { colleges } from "@/data/colleges";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Globe, Calendar, Star, BookOpen, DollarSign, TrendingUp, Award } from "lucide-react";

const CollegeDetail = () => {
  const { id } = useParams();
  const college = colleges.find(c => c.id === id);

  if (!college) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">College not found.</p>
          <Link to="/" className="text-primary underline mt-4 inline-block">Go back</Link>
        </div>
      </div>
    );
  }

  const infoItems = [
    { icon: MapPin, label: "Location", value: `${college.city}, ${college.state}` },
    { icon: Calendar, label: "Established", value: college.established?.toString() },
    { icon: Award, label: "NIRF Rank", value: college.nirfRank ? `#${college.nirfRank}` : "N/A" },
    { icon: Star, label: "Rating", value: college.rating?.toString() },
    { icon: DollarSign, label: "Fees", value: college.fees },
    { icon: TrendingUp, label: "Avg Placement", value: college.placementsAvg },
    { icon: TrendingUp, label: "Highest Placement", value: college.placementsHighest },
    { icon: BookOpen, label: "Cutoff", value: college.cutoff },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to colleges
        </Link>

        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-start justify-between mb-3">
            <h1 className="text-2xl font-bold text-primary">{college.name}</h1>
            <Badge variant="outline" className="text-xs">{college.type}</Badge>
          </div>
          {college.website && (
            <a href={college.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              <Globe className="h-3.5 w-3.5" /> {college.website}
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {infoItems.filter(i => i.value).map(item => (
            <div key={item.label} className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <item.icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </div>
              <p className="font-semibold text-foreground text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Courses Offered</h2>
          <div className="flex flex-wrap gap-2">
            {college.courses.map(course => (
              <Badge key={course} variant="secondary">{course}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
