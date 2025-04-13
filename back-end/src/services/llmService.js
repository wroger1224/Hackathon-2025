const OpenAI = require('openai');
const { zodResponseFormat } = require('openai/helpers/zod');
const { z } = require('zod');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Define the activity analysis schema
const ActivityAnalysis = z.object({
    time: z.number().int().describe("The total number of minutes the user spent in motion/activity"),
    points: z.number().int().describe("The total number of points the user earned for their activity. Between 0 and 100 points"),
    motivationalResponse: z.string().describe("A personalized, encouraging message that acknowledges the user's activity and provides positive reinforcement")
});

// Define the weekly winner schema
const WeeklyWinner = z.object({
    userId: z.number().int().describe("The ID of the winning user"),
    reason: z.string().describe("A detailed explanation of why this user was chosen as the weekly winner")
});

class LLMService {
    async getActivityAnalysis(activity, userProfile) {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Turn the users input of their daily activity into the number of minutes that they were in motion. Additionally, give them points (between 0 and 100) based on the difficulty of the daily activity and their activity level int their profile. For example a sedentary person doing a 30 minute walk would get 30 points, a moderate person doing a 30 minute walk would get 20 points, and a high person doing a 30 minute walk would get 10 points. Finally, return a over funny, motivational message to congratulate them on doing the daily activity log."         
                },
                {
                    role: "user",
                    content: `Activity: ${activity}; User's Profile: ${userProfile}`
                }
            ],
            response_format: zodResponseFormat(ActivityAnalysis, "activity")
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
                    content: "Analyze the users' activity logs and select a weekly winner based on their consistency, effort, and improvement. Provide a detailed explanation of why they were chosen."
                },
                {
                    role: "user",
                    content: `Users: ${JSON.stringify(users)}; Activities: ${JSON.stringify(activities)}`
                }
            ],
            response_format: zodResponseFormat(WeeklyWinner, "winner")
        });
        
        return completion.choices[0].message.content;
    }
}

module.exports = new LLMService();
