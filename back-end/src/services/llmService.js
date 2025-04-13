const OpenAI = require("openai");
const { zodResponseFormat } = require("openai/helpers/zod");
const { z } = require("zod");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the activity analysis schema
const ActivityAnalysis = z.object({
  time: z
    .number()
    .int()
    .describe("The total number of minutes the user spent in motion/activity"),
  points: z
    .number()
    .int()
    .describe(
      "The total number of points the user earned for their activity. Between 0 and 100 points"
    ),
  motivationalResponse: z
    .string()
    .describe(
      "A personalized, encouraging message that acknowledges the user's activity and provides positive reinforcement"
    ),
});

// Define the weekly winner schema
const WeeklyWinner = z.object({
  userId: z.number().int().describe("The ID of the winning user"),
  reason: z
    .string()
    .describe(
      "A detailed explanation of why this user was chosen as the weekly winner"
    ),
});

class LLMService {
  async getActivityAnalysis(activity, userProfile) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Analyze the user's activity input to determine the total minutes spent being active. Award points (0-100) based on both the activity difficulty and the user's activity level profile, with lower activity level profiles earning more points for the same activity. For example: A 30-minute intense workout might award 80 points to a sedentary user, 60 points to a moderate user, and 40 points to a highly active user, reflecting the greater relative effort for less active individuals. Finally, generate a playful, encouraging response that celebrates their specific activity with humor and motivation. The response should be personalized to reference what they did and inspire them to keep going.",
        },
        {
          role: "user",
          content: `Activity: ${activity}; User's Profile: ${userProfile}`,
        },
      ],
      response_format: zodResponseFormat(ActivityAnalysis, "activity"),
    });
    const content = completion.choices[0].message.content;
    // Turn in to json
    const jsonContent = JSON.parse(content);

    return jsonContent;
  }

  async pickWeeklyWinner(users, activities) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Analyze the users' activity logs and select a weekly winner based on their consistency, effort, and improvement. Provide a detailed explanation of why they were chosen.",
        },
        {
          role: "user",
          content: `Users: ${JSON.stringify(
            users
          )}; Activities: ${JSON.stringify(activities)}`,
        },
      ],
      response_format: zodResponseFormat(WeeklyWinner, "winner"),
    });

    return completion.choices[0].message.content;
  }
}

module.exports = new LLMService();
