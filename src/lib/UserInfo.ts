export class UserInfo {
    public username: string;
    public email: string;
    public xp: number;
    public streak: number;

    constructor(username: string, email: string, xp: number = 0, streak: number = 0) {
        this.username = username;
        this.email = email;
        this.xp = xp;
        this.streak = streak;
    }

    /**
     * Save the current user info to localStorage
     */
    save(): void {
        if (typeof window !== 'undefined') {
            const data = JSON.stringify({
                username: this.username,
                email: this.email,
                xp: this.xp,
                streak: this.streak
            });
            localStorage.setItem('fox_user_info', data);
        }
    }

    /**
     * Load user info from localStorage, or return default if not found
     */
    static load(): UserInfo {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('fox_user_info');
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    return new UserInfo(
                        parsed.username || 'DrFox',
                        parsed.email || 'fox@example.com',
                        parsed.xp || 0,
                        parsed.streak || 0
                    );
                } catch (e) {
                    console.error('Failed to parse user info', e);
                }
            }
        }
        // Return default "Guest" / Placeholder info
        return new UserInfo('DrFox', 'fox@example.com');
    }

    /**
     * Update specific fields and auto-save
     */
    update(fields: Partial<UserInfo>): void {
        if (fields.username !== undefined) this.username = fields.username;
        if (fields.email !== undefined) this.email = fields.email;
        if (fields.xp !== undefined) this.xp = fields.xp;
        if (fields.streak !== undefined) this.streak = fields.streak;

        this.save();
    }
}
