import { useState } from "react";

const WorkoutLog = () => {
  const [logs, setLogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    activity: "",
    duration: "",
    intensity: "medium",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      // Update existing log
      setLogs(
        logs.map((log) =>
          log.id === editingId ? { ...formData, id: editingId } : log
        )
      );
      setEditingId(null);
    } else {
      // Add new log
      setLogs([...logs, { ...formData, id: Date.now() }]);
    }
    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      activity: "",
      duration: "",
      intensity: "medium",
      notes: "",
    });
  };

  const handleEdit = (log) => {
    setEditingId(log.id);
    setFormData(log);
  };

  const handleDelete = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Activity</label>
            <input
              type="text"
              value={formData.activity}
              onChange={(e) =>
                setFormData({ ...formData, activity: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g., Running, Weightlifting"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Intensity</label>
            <select
              value={formData.intensity}
              onChange={(e) =>
                setFormData({ ...formData, intensity: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Any additional notes..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          {editingId !== null ? "Update Workout" : "Log Workout"}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Previous Workouts</h3>
        {logs.length === 0 ? (
          <p className="text-gray-500">No workouts logged yet</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{log.activity}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(log.date).toLocaleDateString()} • {log.duration}{" "}
                    minutes •
                    {log.intensity.charAt(0).toUpperCase() +
                      log.intensity.slice(1)}{" "}
                    intensity
                  </p>
                  {log.notes && (
                    <p className="mt-2 text-gray-700">{log.notes}</p>
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(log)}
                    className="text-blue hover:text-opacity-80"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="text-red-orange hover:text-opacity-80"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutLog;
