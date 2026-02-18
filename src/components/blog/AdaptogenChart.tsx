import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { trait: "Stress Relief", Ashwagandha: 95, Reishi: 80, Rhodiola: 65, "Lion's Mane": 50 },
  { trait: "Energy & Focus", Ashwagandha: 45, Reishi: 30, Rhodiola: 88, "Lion's Mane": 85 },
  { trait: "Sleep Support", Ashwagandha: 70, Reishi: 92, Rhodiola: 20, "Lion's Mane": 35 },
  { trait: "Mood Lift", Ashwagandha: 78, Reishi: 65, Rhodiola: 75, "Lion's Mane": 70 },
  { trait: "Endurance", Ashwagandha: 55, Reishi: 40, Rhodiola: 90, "Lion's Mane": 60 },
  { trait: "Cognitive Clarity", Ashwagandha: 60, Reishi: 50, Rhodiola: 72, "Lion's Mane": 95 },
];

const COLORS = {
  Ashwagandha: "#2E7D5E",
  Reishi: "#7C5BA0",
  Rhodiola: "#C17D3C",
  "Lion's Mane": "#2B6CB0",
};

const AdaptogenChart = () => {
  return (
    <div className="not-prose my-12 rounded-2xl border border-ocean/10 bg-white p-6 md:p-8 shadow-sm">
      <h3 className="font-serif text-2xl text-ocean text-center mb-2">
        Adaptogen Comparison: What Each Does Best
      </h3>
      <p className="text-center text-ocean/60 text-sm font-sans mb-8">
        Relative strength across six wellness dimensions
      </p>
      <ResponsiveContainer width="100%" height={380}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="hsl(var(--ocean) / 0.1)" />
          <PolarAngleAxis
            dataKey="trait"
            tick={{ fontSize: 12, fontFamily: "sans-serif", fill: "hsl(var(--ocean))", fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(var(--ocean) / 0.15)",
              fontSize: "12px",
              fontFamily: "sans-serif",
            }}
          />
          <Radar name="Ashwagandha" dataKey="Ashwagandha" stroke={COLORS.Ashwagandha} fill={COLORS.Ashwagandha} fillOpacity={0.15} strokeWidth={2} />
          <Radar name="Reishi" dataKey="Reishi" stroke={COLORS.Reishi} fill={COLORS.Reishi} fillOpacity={0.15} strokeWidth={2} />
          <Radar name="Rhodiola" dataKey="Rhodiola" stroke={COLORS.Rhodiola} fill={COLORS.Rhodiola} fillOpacity={0.15} strokeWidth={2} />
          <Radar name="Lion's Mane" dataKey="Lion's Mane" stroke={COLORS["Lion's Mane"]} fill={COLORS["Lion's Mane"]} fillOpacity={0.15} strokeWidth={2} />
          <Legend
            wrapperStyle={{ fontSize: "13px", fontFamily: "sans-serif", paddingTop: "16px" }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(COLORS).map(([name, color]) => (
          <div key={name} className="flex items-start gap-2 p-3 rounded-xl bg-cream/60">
            <span className="w-3 h-3 rounded-full mt-0.5 shrink-0" style={{ backgroundColor: color }} />
            <div>
              <p className="font-semibold text-ocean text-xs font-sans">{name}</p>
              <p className="text-ocean/60 text-xs font-sans leading-snug mt-0.5">
                {name === "Ashwagandha" && "Daytime calm & stress"}
                {name === "Reishi" && "Evening rest & sleep"}
                {name === "Rhodiola" && "Energy & endurance"}
                {name === "Lion's Mane" && "Focus & clarity"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdaptogenChart;
