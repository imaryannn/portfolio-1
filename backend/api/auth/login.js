const { connectToDatabase } = require('../../lib/mongodb');
const { generateToken, comparePassword } = require('../../lib/auth');

const loginAttempts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function rateLimit(ip) {
    const now = Date.now();
    const record = loginAttempts.get(ip);
    if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
        loginAttempts.set(ip, { count: 1, windowStart: now });
        return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
    }
    if (record.count >= MAX_ATTEMPTS) {
        const retryAfter = Math.ceil((RATE_LIMIT_WINDOW - (now - record.windowStart)) / 1000);
        return { allowed: false, retryAfter };
    }
    record.count++;
    return { allowed: true, remaining: MAX_ATTEMPTS - record.count };
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const check = rateLimit(ip);
    if (!check.allowed) {
        res.setHeader('Retry-After', check.retryAfter);
        return res.status(429).json({ error: `Too many attempts. Retry after ${check.retryAfter}s` });
    }
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user._id.toString());
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};