import { Clock, ChevronDown, Footprints } from "lucide-react";
import { useState } from "react";

function TrackingHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  // Chart data with dates and activity points
  const chartData = [
    { date: "04/06", points: 36, minutes: 45},
    { date: "04/07", points: 24, minutes: 30},
    { date: "04/08", points: 48, minutes: 60},
    { date: "04/09", points: 60, minutes: 75},
    { date: "04/10", points: 44, minutes: 55},
    { date: "04/11", points: 20, minutes: 25},
    { date: "04/12", points: 40, minutes: 50},
  ];

  // Calculate maximum points for scaling
  const maxPoints = Math.max(...chartData.map((item) => item.points));
  const roundedMaxPoints = Math.ceil(maxPoints / 10) * 10; // Round up to nearest 10

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-sm p-6 w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Activity Tracking</h2>
          <p className="text-sm text-gray-500">Daily activity points</p>
        </div>

        <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md text-sm">
          <span>{selectedPeriod}</span>
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="relative h-[400px]">
        {/* Y-axis labels (points) */}
        <div className="absolute left-0 top-0 bottom-24 flex flex-col justify-between text-xs text-gray-500">
          <span>{roundedMaxPoints} pts</span>
          <span>{Math.floor(roundedMaxPoints * 0.75)} pts</span>
          <span>{Math.floor(roundedMaxPoints * 0.5)} pts</span>
          <span>{Math.floor(roundedMaxPoints * 0.25)} pts</span>
          <span>0 pts</span>
        </div>

        {/* Horizontal grid lines */}
        <div className="absolute left-16 right-6 top-0 bottom-24 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div key={idx} className="border-t border-gray-200 w-full"></div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="absolute left-16 right-6 top-0 bottom-24 flex justify-between">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center group relative"
              style={{ height: "100%" }}
            >
              <div className="h-full flex items-end">
                {/* Bar */}
                <div
                  className={`w-6 rounded-t-sm transition-all hover:opacity-80 ${
                    index === 3 ? "bg-[#FF9500]" : "bg-[#3B82F6]"
                  }`}
                  style={{
                    height: `${Math.max(
                      (item.points / roundedMaxPoints) * 100,
                      3
                    )}%`,
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="bg-black text-white rounded-md px-3 py-2 text-xs shadow-lg whitespace-nowrap">
                      <div className="flex items-center mb-1">
                        <Clock size={12} className="mr-1" />
                        <span>{item.points} points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* X-axis label (date) */}
              <span className="absolute bottom-[-24px] text-xs text-gray-500">
                {item.date}
              </span>
            </div>
          ))}
        </div>

        {/* Stat summary */}
        <div className="absolute bottom-0 left-16 right-6 flex justify-between border-t pt-4 border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500">Avg. Daily</p>
            <p className="font-bold text-gray-800">
              {Math.round(
                chartData.reduce((sum, item) => sum + item.points, 0) /
                  chartData.length
              )}{" "}
              pts
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Top Day</p>
            <p className="font-bold text-gray-800">
              {Math.max(...chartData.map((item) => item.points))} pts
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Weekly Total</p>
            <p className="font-bold text-gray-800">
              {chartData.reduce((sum, item) => sum + item.points, 0)} pts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingHistory;
