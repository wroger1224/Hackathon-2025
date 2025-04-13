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
                    content: "Turn the users input of their daily activity into the number of minutes that they were in motion. Also take their daily activity into account with their personal profile and output, a cover bunny, motivational message to congratulate them on doing the daily activity log"         
                },
                {
                    role: "user",
                    content: `Activity: ${activity}; User's Profile: ${userProfile}`
                }
            ],
            response_format: zodResponseFormat(ActivityAnalysis, "activity")
        });
        
        return completion.choices[0].message.content;
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
