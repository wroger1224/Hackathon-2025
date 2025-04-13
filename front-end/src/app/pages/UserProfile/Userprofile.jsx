import { useSelector } from "react-redux";
import Widget from "../../../components/common/Widget/Widget";
import { User, Mail, Award, Trophy, Clock } from "lucide-react";
import Ballpit from "../../../components/feature/FunStuff/Ballpit";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="relative w-full">
      <main className="min-h-screen">
        <div className="pb-[400px]">
          {/* Profile content with higher z-index */}
          <div className="relative z-10">
            {/* Profile Header */}
            <div className="mb-6 p-6 bg-white rounded-lg mt-4">
              <h1 className="text-2xl font-bold text-gray-800 bg-white inline-block px-4 py-2 rounded-lg">
                My Profile
              </h1>
              <p className="text-gray-600 bg-white/95 inline-block px-4 py-2 rounded-lg mt-2">
                Manage your account and view your progress
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {/* Personal Information Widget */}
              <Widget className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 transition-all">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <User className="text-blue-500" />
                    Personal Information
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Name:</span> Wren Roger
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      wren.roger@maxxpotential.com
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Department:</span>{" "}
                      {user?.Department || "Apprentice"}
                    </p>
                  </div>
                </div>
              </Widget>

              {/* Activity Stats Widget */}
              <Widget className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 transition-all">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Trophy className="text-orange-500" />
                    Activity Stats
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50/90 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-gray-600">Total Moints</p>
                      <p className="text-2xl font-bold text-blue-600">1000</p>
                    </div>
                    <div className="bg-green-50/90 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-gray-600">
                        Milestones Reached
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {user?.MilestonesReached || 4}
                      </p>
                    </div>
                  </div>
                </div>
              </Widget>

              {/* Achievements Widget */}
              <Widget className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 transition-all">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Award className="text-yellow-500" />
                    Achievements
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50/90 rounded backdrop-blur-sm">
                      <span className="text-gray-700">Active Days</span>
                      <span className="font-semibold">
                        {user?.ActiveDays || 1} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50/90 rounded backdrop-blur-sm">
                      <span className="text-gray-700">Competitions Joined</span>
                      <span className="font-semibold">
                        {user?.CompetitionsJoined || 1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50/90 rounded backdrop-blur-sm">
                      <span className="text-gray-700">Current Streak</span>
                      <span className="font-semibold">
                        {user?.CurrentStreak || 1} days
                      </span>
                    </div>
                  </div>
                </div>
              </Widget>

              {/* Recent Activity Widget */}
              <Widget className="col-span-1 md:col-span-2 lg:col-span-3 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 transition-all">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Clock className="text-purple-500" />
                    Recent Activity
                  </h2>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50/90 rounded backdrop-blur-sm hover:bg-gray-100/90 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Trophy className="text-orange-500" />
                          <div>
                            <p className="font-medium">
                              Activity Moints Earned
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(
                                Date.now() - index * 24 * 60 * 60 * 1000
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-orange-600">
                            +{Math.floor(Math.random() * 40 + 20)} moints
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
        </div>
      </main>

      {/* Ballpit overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Ballpit
          count={200}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
          colors={["#ff5c4d", "#ff9636", "#ffcd58", "#dad870", "#38b1f6"]}
          lightIntensity={50}
        />
      </div>
    </div>
  );
};

export default UserProfile;
