import { useSelector } from "react-redux";
import Widget from "../../../components/common/Widget/Widget";
import { User, Mail, Award, Trophy, Clock, Footprints } from "lucide-react";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="mb-6 bg-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-600">
          Manage your account and view your progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Information Widget */}
        <Widget className="col-span-1">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="text-blue-500" />
              Personal Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {user?.FirstName}{" "}
                {user?.LastName}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user?.Email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Department:</span>{" "}
                {user?.Department || "Not specified"}
              </p>
            </div>
          </div>
        </Widget>

        {/* Activity Stats Widget */}
        <Widget className="col-span-1">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Trophy className="text-orange-500" />
              Activity Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-blue-600">
                  {user?.TotalPoints || 0}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Milestones Reached</p>
                <p className="text-2xl font-bold text-green-600">
                  {user?.MilestonesReached || 0}
                </p>
              </div>
            </div>
          </div>
        </Widget>

        {/* Achievements Widget */}
        <Widget className="col-span-1">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Award className="text-yellow-500" />
              Achievements
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-700">Active Days</span>
                <span className="font-semibold">
                  {user?.ActiveDays || 0} days
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-700">Competitions Joined</span>
                <span className="font-semibold">
                  {user?.CompetitionsJoined || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-700">Current Streak</span>
                <span className="font-semibold">
                  {user?.CurrentStreak || 0} days
                </span>
              </div>
            </div>
          </div>
        </Widget>

        {/* Recent Activity Widget */}
        <Widget className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="text-purple-500" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="text-orange-500" />
                    <div>
                      <p className="font-medium">Activity Points Earned</p>
                      <p className="text-sm text-gray-600">
                        {new Date(
                          Date.now() - index * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-orange-600">
                      +{Math.floor(Math.random() * 40 + 20)} points
                    </p>
                    <p className="text-sm text-gray-600">
                      {Math.random() > 0.7 ? "🎯 Milestone Reached!" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default UserProfile;
