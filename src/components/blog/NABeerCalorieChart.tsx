import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { name: "Regular Lager", calories: 150, na: false },
  { name: "Craft IPA", calories: 210, na: false },
  { name: "Stout / Porter", calories: 190, na: false },
  { name: "Wheat Beer", calories: 165, na: false },
  { name: "NA Lager", calories: 60, na: true },
  { name: "NA IPA", calories: 65, na: true },
  { name: "NA Stout", calories: 60, na: true },
  { name: "NA Wheat", calories: 50, na: true },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const isNA = payload[0].payload.na;
    return (
      <div className="bg-white border border-ocean/20 rounded-lg px-4 py-3 shadow-lg text-sm">
        <p className="font-semibold text-ocean mb-1">{label}</p>
        <p className="text-foreground/80">
          <span className="font-bold text-ocean">{payload[0].value}</span> calories per 12 oz
        </p>
        <p className={`text-xs mt-1 font-medium ${isNA ? "text-brand-green" : "text-foreground/50"}`}>
          {isNA ? "Alcohol-Free" : "Regular Beer"}
        </p>
      </div>
    );
  }
  return null;
};

const NABeerCalorieChart = () => {
  return (
    <div className="my-10 rounded-2xl border border-ocean/15 bg-white p-6 shadow-sm">
      <h3 className="font-serif text-2xl text-ocean mb-1 text-center">
        Calories: Regular Beer vs. NA Beer
      </h3>
      <p className="text-center text-foreground/60 text-sm mb-6">
        Per 12 oz serving — NA options consistently deliver 50–75% fewer calories
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={56}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v} cal`}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="calories" radius={[6, 6, 0, 0]} maxBarSize={52}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.na ? "#4a7c59" : "#1a3a5c"}
                fillOpacity={entry.na ? 1 : 0.55}
              />
            ))}
            <LabelList
              dataKey="calories"
              position="top"
              style={{ fontSize: 11, fill: "#374151", fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#1a3a5c", opacity: 0.55 }} />
          <span className="text-foreground/60">Regular Beer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-brand-green" />
          <span className="text-foreground/60">Alcohol-Free</span>
        </div>
      </div>
    </div>
  );
};

export default NABeerCalorieChart;
