const { authenticate } = require('../../lib/auth');
const path = require('path');
const fs = require('fs');

const ADMIN_DIR = path.join(__dirname, '../../admin');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
};

const PUBLIC_PAGES = ['login.html', 'admin-base.css', 'admin-style.css', 'admin.js', 'config.js'];

function getTokenFromCookie(req) {
    const cookies = req.headers.cookie || '';
    const match = cookies.match(/(?:^|;\s*)adminToken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

module.exports = async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let filePath = url.pathname.replace(/^\/admin\//, '') || 'dashboard.html';

    if (filePath === '' || filePath === '/') {
        filePath = 'dashboard.html';
    }

    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    if (PUBLIC_PAGES.includes(filePath)) {
        return serveFile(filePath, res);
    }

    if (!req.headers.authorization) {
        const cookieToken = getTokenFromCookie(req);
        if (cookieToken) {
            req.headers.authorization = 'Bearer ' + cookieToken;
        } else if (req.query.token) {
            req.headers.authorization = 'Bearer ' + req.query.token;
        }
    }

    const user = authenticate(req);
    if (!user) {
        res.writeHead(302, { Location: '/admin/login' });
        res.end();
        return;
    }

    serveFile(filePath, res);
};

function serveFile(filePath, res) {
    const fullPath = path.resolve(ADMIN_DIR, filePath);

    if (!fullPath.startsWith(ADMIN_DIR)) {
        res.status(403).json({ error: 'Forbidden' });
        return;
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}
