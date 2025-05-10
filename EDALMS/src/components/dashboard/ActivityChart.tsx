
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';

const data = [
  { date: '27 Dec', signups: 1 },
  { date: '22 Feb', signups: 3 },
  { date: '23 Feb', signups: 1 },
  { date: '24 Feb', signups: 1 },
];

const timeRanges = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"];

const ActivityChart = () => {
  const [selectedRange, setSelectedRange] = useState("Daily");

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">New Signups</CardTitle>
          <div className="flex items-center gap-2">
            <select 
              className="border border-gray-200 rounded p-1 text-sm"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
            >
              {timeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <input type="date" className="border border-gray-200 rounded p-1 text-sm" />
              <span className="text-sm text-gray-500">to</span>
              <input type="date" className="border border-gray-200 rounded p-1 text-sm" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="signups" fill="#FFA500" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
