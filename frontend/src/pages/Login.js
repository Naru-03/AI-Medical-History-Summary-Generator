// Login page stub
import React, {
    useState
} from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await res.json();
        setLoading(false);
        if (data.success) {
            window.location.href = '/dashboard';
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <style>{`
                @keyframes floatSlow { 0% { transform: translateY(0) translateX(0) } 50% { transform: translateY(-20px) translateX(10px) } 100% { transform: translateY(0) translateX(0) } }
                @keyframes gradientShift { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
                .login-animated-bg { position: absolute; inset: 0; background: linear-gradient(120deg, #e0eafc, #cfdef3, #d4fcf0, #e0eafc); background-size: 200% 200%; animation: gradientShift 12s ease-in-out infinite; }
                .blob { position: absolute; width: 480px; height: 480px; border-radius: 9999px; filter: blur(60px); opacity: 0.35; }
                .blob.b1 { background: #93c5fd; top: -120px; left: -120px; animation: floatSlow 10s ease-in-out infinite; }
                .blob.b2 { background: #86efac; bottom: -160px; right: -80px; animation: floatSlow 12s ease-in-out infinite; }
                .blob.b3 { background: #c4b5fd; top: 20%; right: 25%; width: 360px; height: 360px; animation: floatSlow 11s ease-in-out infinite; }
            `}</style>
            <div className="login-animated-bg" />
            <div className="blob b1" />
            <div className="blob b2" />
            <div className="blob b3" />

            <div style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(255,255,255,0.85)',
                    padding: '2.25rem 2.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                    minWidth: '320px',
                    border: '1px solid rgba(226,232,240,0.8)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2d6cdf' }}>AI Medical History Summarizer</div>
                        <div style={{ color: '#64748b', marginTop: '0.25rem' }}>Sign in to continue</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            aria-label="Username"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '0.75rem', marginBottom: '0.9rem', borderRadius: '10px',
                                border: '1px solid #dbeafe', fontSize: '1rem', background: '#ffffff'
                            }}
                        />
                        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                aria-label="Password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%', padding: '0.75rem 2.75rem 0.75rem 0.75rem', borderRadius: '10px',
                                    border: '1px solid #dbeafe', fontSize: '1rem', background: '#ffffff'
                                }}
                            />
                            <button type="button" onClick={() => setShowPassword(v => !v)}
                                style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                                    background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 'bold' }}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '0.8rem', background: '#2d6cdf', color: '#fff', border: 'none',
                                borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
                                boxShadow: '0 6px 20px rgba(45,108,223,0.25)'
                            }}
                        >
                            {loading ? 'Logging in…' : 'Login'}
                        </button>
                    </form>
                    {error && (
                        <p style={{ color: '#e53e3e', background: '#fff5f5', borderRadius: '8px', padding: '0.6rem', marginTop: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;