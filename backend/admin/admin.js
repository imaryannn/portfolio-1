async function checkAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
        localStorage.setItem('adminToken', urlToken);
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', cleanUrl);
    }

    const token = localStorage.getItem('adminToken');
    if (token) {
        setAuthCookie(token);
    }

    if (!token && !window.location.pathname.includes('login.html')) {
        window.location.href = '/admin/login';
        return false;
    }
    if (token && !window.location.pathname.includes('login.html')) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                window.location.href = '/admin/login';
                return false;
            }
        } catch (error) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
            return false;
        }
    }
    return true;
}
function getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}
function setAuthCookie(token) {
    document.cookie = 'adminToken=' + encodeURIComponent(token) + '; path=/; max-age=86400; SameSite=Lax';
}

function clearAuthCookie() {
    document.cookie = 'adminToken=; path=/; max-age=0; SameSite=Lax';
}

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    clearAuthCookie();
    window.location.href = '/admin/login';
});
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
function showMessage(elementId, message, isError = false) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = message;
    element.classList.remove('success-msg', 'error-msg');
    element.classList.add(isError ? 'error-msg' : 'success-msg');
    element.classList.add('active');
    setTimeout(() => {
        element.classList.remove('active');
    }, 5000);
}
checkAuth();