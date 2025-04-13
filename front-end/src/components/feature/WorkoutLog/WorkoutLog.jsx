import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserActivityThunk, updateUserActivityThunk, deleteUserActivityThunk } from "../../../reducers/userSlice";

const WorkoutLog = ({
}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [formData, setFormData] = useState({
    userInput: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        // Update existing activity
        await dispatch(updateUserActivityThunk({
          id: editingId,
          userActivity: {
            userInput: formData.userInput
          }
        })).unwrap();
        setEditingId(null);
      } else {
        // Add new activity
        await dispatch(createUserActivityThunk({
          userInput: formData.userInput
        })).unwrap();
      }
      // Reset form
      setFormData({
        userInput: "",
      });
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  const handleEdit = (activity) => {
    setEditingId(activity.userActivityID);
    setEditingText(activity.userInput);
  };

  const handleUpdate = async (activity) => {
    try {
      await dispatch(updateUserActivityThunk({
        id: activity.userActivityID,
        userActivity: {
          userInput: editingText
        }
      })).unwrap();
      setEditingId(null);
      setSuccessMessage("Workout updated successfully!");
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUserActivityThunk(id)).unwrap();
      setSuccessMessage("Workout deleted successfully!");
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Log Your Daily Activity!</label>
          <textarea
            value={formData.userInput}
            onChange={(e) =>
              setFormData({ ...formData, userInput: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Enter activities for the day..."
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
        {(!userData?.allActivities || userData.allActivities.length === 0) ? (
          <p className="text-gray-500">No workouts logged yet</p>
        ) : (
          JSON.parse(userData.allActivities).map((activity) => (
            <div key={activity.userActivityID} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {new Date(activity.lastUpdated).toLocaleDateString()} • {activity.totalPoints} points
                  </p>
                  {editingId === activity.userActivityID ? (
                    <div className="mt-2 space-y-2">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate(activity)}
                          className="bg-blue text-white px-3 py-1 rounded hover:bg-opacity-90"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-opacity-90"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-gray-700">{activity.userInput}</p>
                  )}
                </div>
                {editingId !== activity.userActivityID && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(activity)}
                      className="text-blue hover:text-opacity-80"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(activity.userActivityID)}
                      className="text-red-orange hover:text-opacity-80"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutLog;
