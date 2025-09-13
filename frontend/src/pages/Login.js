// Login page stub
import React, {
    useState
} from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

    return ( < div style = {
            {
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)'
            }
        } >
            <div style = {
                {
                    background: '#fff',
                    padding: '2rem 2.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    minWidth: '320px'
                }
            } >
            <h2 style = {
                {
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    color: '#2d6cdf'
                }
            } > Login </h2> <form onSubmit={
            handleSubmit
        } >
        <
        input
    type = "text"
    aria-label = "Username"
    placeholder = "Username"
    value = {
        username
    }
    onChange = {
        e => setUsername(e.target.value)
    }
    required style = {
        {
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '6px',
            border: '1px solid #dbeafe',
            fontSize: '1rem'
        }
    }
    /><input
    type = "password"
    aria-label = "Password"
    placeholder = "Password"
    value = {
        password
    }
    onChange = {
        e => setPassword(e.target.value)
    }required style = {
        {
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1.5rem',
            borderRadius: '6px',
            border: '1px solid #dbeafe',
            fontSize: '1rem'
        }
    }
    />
        <button
    type = "submit"
    disabled = {
        loading
    }
    style = {
        {
            width: '100%',
            padding: '0.75rem',
            background: '#2d6cdf',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(45,108,223,0.08)'
        }
    } > {
        loading ? 'Logging in...' : 'Login'
    } </button> </form > {
        error && <
            p style = {
                {
                    color: '#e53e3e',
                    background: '#fff5f5',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    marginTop: '1rem',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }
            } > {
                error
            } </p>
        } </div>
    </div >
    );
}

export default Login;