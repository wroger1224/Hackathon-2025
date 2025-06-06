import { Clock, ChevronDown, Footprints } from "lucide-react";
import { useState } from "react";

function TrackingHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  // Chart data with dates and activity minutes
  const chartData = [
    { date: "04/06", minutes: 45, steps: 5800 },
    { date: "04/07", minutes: 30, steps: 4500 },
    { date: "04/08", minutes: 60, steps: 7100 },
    { date: "04/09", minutes: 75, steps: 8800 },
    { date: "04/10", minutes: 55, steps: 6300 },
    { date: "04/11", minutes: 25, steps: 3200 },
    { date: "04/12", minutes: 50, steps: 6500 },
  ];

  // Calculate max values for scaling
  const maxMinutes = Math.max(...chartData.map((item) => item.minutes));
  const roundedMaxMinutes = Math.ceil(maxMinutes / 10) * 10; // Round up to nearest 10

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-sm p-6 w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Activity Tracking</h2>
          <p className="text-sm text-gray-500">Daily activity in moints</p>
        </div>

        <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md text-sm">
          <span>{selectedPeriod}</span>
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="relative h-80">
        {/* Y-axis labels (time in minutes) */}
        <div className="absolute left-0 top-4 h-64 flex flex-col justify-between text-xs text-gray-400">
          <span>{roundedMaxMinutes} moints</span>
          <span>{Math.floor(roundedMaxMinutes * 0.75)} mnts</span>
          <span>{Math.floor(roundedMaxMinutes * 0.5)} mnts</span>
          <span>{Math.floor(roundedMaxMinutes * 0.25)} mnts</span>
          <span>0 moints</span>
        </div>

        {/* Horizontal grid lines */}
        <div className="absolute left-12 right-4 top-4 h-64 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div key={idx} className="border-t border-gray-100 w-full"></div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between h-64 gap-2 pl-12 pr-4 pt-4 mt-4">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center group relative"
              style={{ width: "40px" }}
            >
              {/* Bar */}
              <div
                className={`rounded-t-md transition-all hover:opacity-80 ${
                  index === 3 ? "bg-[#FF9500]" : "bg-[#3B82F6]"
                }`}
                style={{
                  height: `${(item.minutes / roundedMaxMinutes) * 240}px`,
                  width: "24px",
                }}
              >
                {/* Tooltip */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-black text-white rounded-md px-3 py-2 text-xs shadow-lg whitespace-nowrap">
                    <div className="flex items-center mb-1">
                      <Clock size={12} className="mr-1" />
                      <span>{item.minutes} moints</span>
                    </div>
                    <div className="flex items-center">
                      <Footprints size={12} className="mr-1" />
                      <span>{item.steps} minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* X-axis label (date) */}
              <span className="text-xs text-gray-500 mt-2">{item.date}</span>
            </div>
          ))}
        </div>

        {/* Stat summary */}
        <div className="flex justify-between mt-6 border-t pt-4 border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500">Avg. Daily</p>
            <p className="font-bold text-gray-800">
              {Math.round(
                chartData.reduce((sum, item) => sum + item.minutes, 0) /
                  chartData.length
              )}{" "}
              mnts
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Top Day</p>
            <p className="font-bold text-gray-800">
              {Math.max(...chartData.map((item) => item.minutes))} mnts
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Weekly Total</p>
            <p className="font-bold text-gray-800">
              {chartData.reduce((sum, item) => sum + item.minutes, 0)} mnts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingHistory;
