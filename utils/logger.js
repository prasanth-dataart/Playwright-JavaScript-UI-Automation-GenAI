/**
 * Logger - Centralized logging utility for debugging and test execution tracing
 */
class Logger {
    /**
     * Log info level message
     * @param {string} message
     */
    static info(message) {
        const timestamp = this.getTimestamp();
        console.log(`\x1b[36m[${timestamp}] [INFO]\x1b[0m ${message}`);
    }

    /**
     * Log warning level message
     * @param {string} message
     */
    static warn(message) {
        const timestamp = this.getTimestamp();
        console.warn(`\x1b[33m[${timestamp}] [WARN]\x1b[0m ${message}`);
    }

    /**
     * Log error level message
     * @param {string} message
     */
    static error(message) {
        const timestamp = this.getTimestamp();
        console.error(`\x1b[31m[${timestamp}] [ERROR]\x1b[0m ${message}`);
    }

    /**
     * Log success level message
     * @param {string} message
     */
    static success(message) {
        const timestamp = this.getTimestamp();
        console.log(`\x1b[32m[${timestamp}] [SUCCESS]\x1b[0m ${message}`);
    }

    /**
     * Log debug level message
     * @param {string} message
     */
    static debug(message) {
        const timestamp = this.getTimestamp();
        console.log(`\x1b[35m[${timestamp}] [DEBUG]\x1b[0m ${message}`);
    }

    /**
     * Log test step
     * @param {string} stepNumber
     * @param {string} description
     */
    static step(stepNumber, description) {
        const timestamp = this.getTimestamp();
        console.log(`\x1b[34m[${timestamp}] [STEP ${stepNumber}]\x1b[0m ${description}`);
    }

    /**
     * Log test case header
     * @param {string} testName
     */
    static testStart(testName) {
        console.log(`\n\x1b[1m\x1b[36m╔════════════════════════════════════════╗\x1b[0m`);
        console.log(`\x1b[1m\x1b[36m║ TEST: ${testName.padEnd(37)}\x1b[0m║\x1b[0m`);
        console.log(`\x1b[1m\x1b[36m╚════════════════════════════════════════╝\x1b[0m\n`);
    }

    /**
     * Log test case footer
     * @param {string} status - 'PASSED' or 'FAILED'
     */
    static testEnd(status) {
        const color = status === 'PASSED' ? '\x1b[32m' : '\x1b[31m';
        console.log(`\n${color}═══════════════════ TEST ${status} ═══════════════════\x1b[0m\n`);
    }

    /**
     * Get current timestamp
     * @private
     * @returns {string}
     */
    static getTimestamp() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3
        });
    }

    /**
     * Log a separator line
     * @param {string} title
     */
    static separator(title = '') {
        if (title) {
            console.log(`\x1b[90m━━━━━━━ ${title} ━━━━━━━\x1b[0m`);
        } else {
            console.log(`\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m`);
        }
    }
}

module.exports = Logger;
