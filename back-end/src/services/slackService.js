const { WebClient } = require('@slack/web-api');
require('dotenv').config({ path: './back-end/.env' });

class SlackService {
    constructor() {
        this.client = new WebClient(process.env.SLACK_BOT_TOKEN);
    }

    /**
     * Get channel name from database
     * @returns {Promise<string>} Channel name
     */
    async getChannelName() {
        // TODO: Implement database query to get channel name
        return process.env.SLACK_CHANNEL_NAME || 'general';
    }

    /**
     * Format weekly summary from teams data
     * @param {Array} teams - Array of team objects from database
     * @returns {string} Formatted message for Slack
     */
    formatWeeklySummary(teams) {
        if (!teams || teams.length === 0) {
            return "No teams data available for weekly summary.";
        }

        let message = "*Weekly Team Summary*\n\n";
        teams.forEach(team => {
            message += `*${team.name}*\n`;
            message += `Members: ${team.members.join(', ')}\n`;
            message += `Progress: ${team.progress || 'No progress reported'}\n\n`;
        });

        return message;
    }

    /**
     * Format weekly theme message
     * @param {string} theme - The weekly theme
     * @returns {string} Formatted theme message
     */
    formatWeeklyTheme(theme) {
        return `*This Week's Theme*\n${theme}\n\nLet's get creative and see what you can come up with! 🎨`;
    }

    /**
     * Post a message to a Slack channel
     * @param {string} message - The message to post
     * @param {string} [channel] - Optional channel name, defaults to channel from getChannelName
     * @returns {Promise<Object>} Slack API response
     */
    async postMessage(message, channel) {
        try {
            const targetChannel = channel || await this.getChannelName();
            const result = await this.client.chat.postMessage({
                channel: targetChannel,
                text: message,
                mrkdwn: true
            });
            return result;
        } catch (error) {
            console.error('Error posting message to Slack:', error);
            throw error;
        }
    }
}

module.exports = new SlackService();
