const MAXX_VALUES = [
    'collaboration',
    'authenticity',
    'initiative',
    'perseverence',
    'curiosity'
];

class MaxxValueService {
    constructor() {
        // TODO: Initialize database connection when implemented
    }

    /**
     * Get the last week's Maxx value from the database
     * @returns {Promise<string>} The last week's value
     */
    async getLastWeeksValue() {
        // TODO: Implement database query to get last week's value
        // For now, return null to indicate no previous value
        return null;
    }

    /**
     * Select a new Maxx value for the week
     * @returns {Promise<string>} The selected value
     */
    async selectNewValue() {
        const lastWeeksValue = await this.getLastWeeksValue();
        const availableValues = MAXX_VALUES.filter(value => value !== lastWeeksValue);
        
        // Randomly select a value from the available options
        const randomIndex = Math.floor(Math.random() * availableValues.length);
        const selectedValue = availableValues[randomIndex];
        
        // TODO: Store the selected value in the database
        return selectedValue;
    }

    /**
     * Store the selected value in the database
     * @param {string} value - The value to store
     * @returns {Promise<void>}
     */
    async storeValue(value) {
        // TODO: Implement database storage
        throw new Error('Database storage not yet implemented');
    }
}

module.exports = new MaxxValueService();
