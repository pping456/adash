import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const pieData = [
  { name: 'Available', value: 8, color: '#22c55e' },
  { name: 'Booked', value: 9, color: '#3b82f6' },
  { name: 'Occupied', value: 4, color: '#ef4444' },
  { name: 'Pending', value: 2, color: '#f59e0b' },
];

const weeklyData = [
  { day: 'Mon', bookings: 14, approved: 11, rejected: 3 },
  { day: 'Tue', bookings: 18, approved: 15, rejected: 3 },
  { day: 'Wed', bookings: 12, approved: 10, rejected: 2 },
  { day: 'Thu', bookings: 22, approved: 18, rejected: 4 },
  { day: 'Fri', bookings: 16, approved: 13, rejected: 3 },
];

const trendData = [
  { date: '18 May', bookings: 10 },
  { date: '19 May', bookings: 15 },
  { date: '20 May', bookings: 12 },
  { date: '21 May', bookings: 18 },
  { date: '22 May', bookings: 14 },
  { date: '23 May', bookings: 21 },
  { date: '24 May', bookings: 19 },
];

const blockData = [
  { block: 'Block A', rooms: 7, booked: 4 },
  { block: 'Block B', rooms: 14, booked: 10 },
  { block: 'Block C', rooms: 3, booked: 2 },
];

const Analytics = () => {
  const total = pieData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Analytics & Reports</h2>
        <p className="text-sm text-slate-500 mt-0.5">Booking overview and usage statistics across all campus rooms</p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pieData.map(d => (
          <div key={d.name} className="bg-white rounded-xl p-4 flex items-center gap-3" style={{ border: '1px solid #e5eaf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <span className="w-3 h-10 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <div>
              <p className="text-xl font-bold text-slate-800">{d.value}</p>
              <p className="text-xs text-slate-500">{d.name}</p>
              <p className="text-[11px] font-semibold mt-0.5" style={{ color: d.color }}>{Math.round(d.value / total * 100)}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Donut + Bar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white rounded-xl" style={{ border: '1px solid #e5eaf2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #f0f4f8' }}>
            <h3 className="font-semibold text-slate-800 text-sm">Booking Overview</h3>
            <p className="text-xs text-slate-400 mt-0.5">Room allocation status across all blocks</p>
          </div>
          <div className="p-4" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [`${value} rooms (${Math.round((value / total) * 100)}%)`, name]}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e5eaf2', fontSize: 12 }}
                />
                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="px-5 pb-4 grid grid-cols-2 gap-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2 rounded-lg p-2.5" style={{ background: '#f8fafc', border: '1px solid #f0f4f8' }}>
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                <span className="text-xs font-bold text-slate-700">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Bar Chart */}
        <div className="bg-white rounded-xl" style={{ border: '1px solid #e5eaf2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #f0f4f8' }}>
            <h3 className="font-semibold text-slate-800 text-sm">Weekly Booking Activity</h3>
            <p className="text-xs text-slate-400 mt-0.5">Bookings approved vs rejected this week</p>
          </div>
          <div className="p-4" style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e5eaf2', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="approved" name="Approved" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rejected" name="Rejected" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Trend Line + Block Utilization */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <div className="bg-white rounded-xl" style={{ border: '1px solid #e5eaf2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #f0f4f8' }}>
            <h3 className="font-semibold text-slate-800 text-sm">Booking Trends</h3>
            <p className="text-xs text-slate-400 mt-0.5">Daily bookings over the last 7 days</p>
          </div>
          <div className="p-4" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e5eaf2', fontSize: 12 }} />
                <Line type="monotone" dataKey="bookings" name="Bookings" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Block Utilization */}
        <div className="bg-white rounded-xl" style={{ border: '1px solid #e5eaf2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #f0f4f8' }}>
            <h3 className="font-semibold text-slate-800 text-sm">Room Utilization by Block</h3>
            <p className="text-xs text-slate-400 mt-0.5">Booked vs total rooms per block</p>
          </div>
          <div className="p-5 space-y-4">
            {blockData.map(b => {
              const pct = Math.round((b.booked / b.rooms) * 100);
              return (
                <div key={b.block}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-700">{b.block}</span>
                    <span className="text-xs text-slate-500">{b.booked} / {b.rooms} rooms</span>
                  </div>
                  <div className="h-2.5 rounded-full" style={{ background: '#f0f4f8' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: pct >= 80 ? '#ef4444' : pct >= 60 ? '#f59e0b' : '#3b82f6' }}
                    />
                  </div>
                  <p className="text-[11px] font-medium mt-1" style={{ color: pct >= 80 ? '#dc2626' : pct >= 60 ? '#d97706' : '#2563eb' }}>
                    {pct}% utilized
                  </p>
                </div>
              );
            })}

            {/* Quick stats */}
            <div className="mt-4 pt-4 grid grid-cols-3 gap-3" style={{ borderTop: '1px solid #f0f4f8' }}>
              {[
                { label: 'Total Rooms', value: '23', color: '#6366f1' },
                { label: 'Avg. Daily', value: '16.4', color: '#3b82f6' },
                { label: 'Peak Day', value: 'Thu', color: '#f59e0b' },
              ].map(s => (
                <div key={s.label} className="rounded-lg p-3 text-center" style={{ background: '#f8fafc', border: '1px solid #f0f4f8' }}>
                  <p className="text-base font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
