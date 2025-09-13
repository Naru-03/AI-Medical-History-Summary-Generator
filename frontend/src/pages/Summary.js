// Summary page stub
import React, {
    useEffect,
    useState
} from 'react';
import {
    useNavigate
} from 'react-router-dom';

function Summary() {
    const [summary, setSummary] = useState('');
    const [sources, setSources] = useState([]);
    const [confidence, setConfidence] = useState('');
    const [conditions, setConditions] = useState([]);
    const [medications, setMedications] = useState([]);
    const [toast, setToast] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('summary');
        if (data) {
            const parsed = JSON.parse(data);
            setSummary(parsed.summary);
            setSources(parsed.sources);
            setConfidence(parsed.confidence);
            // Try to extract conditions/medications from summary string
            if (parsed.summary) {
                const condMatch = parsed.summary.match(/Conditions: ([^;]*)/);
                const medMatch = parsed.summary.match(/Medications: ([^;]*)/);
                setConditions(condMatch && condMatch[1] ? condMatch[1].split(',').map(s => s.trim()).filter(Boolean) : []);
                setMedications(medMatch && medMatch[1] ? medMatch[1].split(',').map(s => s.trim()).filter(Boolean) : []);
            }
        }
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
        setToast('Summary copied to clipboard!');
        setTimeout(() => setToast(''), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([summary], {
            type: 'text/plain'
        });
        element.href = URL.createObjectURL(file);
        element.download = 'medical_summary.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleClear = () => {
        localStorage.removeItem('summary');
        navigate('/dashboard');
    };

    return ( <
            div style = {
                {
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            } >
            <
            div style = {
                {
                    background: '#fff',
                    padding: '2.5rem 3rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    minWidth: '400px',
                    maxWidth: '600px'
                }
            } >
            <
            h2 style = {
                {
                    textAlign: 'center',
                    color: '#2d6cdf',
                    marginBottom: '2rem'
                }
            } > Medical Summary < /h2> <
            div style = {
                {
                    marginBottom: '1.5rem'
                }
            } >
            <
            strong > Summary: < /strong> <
            div style = {
                {
                    background: '#f1f5fb',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginTop: '0.5rem',
                    fontSize: '1.1rem'
                }
            } >
            {
                summary
            } <
            /div> <
            /div> <
            div style = {
                {
                    marginBottom: '1rem'
                }
            } >
            <
            strong > Conditions: < /strong> <
            ul style = {
                {
                    margin: '0.5rem 0 0 1rem'
                }
            } > {
                conditions && conditions.length > 0 ? conditions.map((c, i) => < li key = {
                        i
                    } > {
                        c
                    } < /li>) : < li > None < /li>
            } <
            /ul> <
            /div> <
            div style = {
                {
                    marginBottom: '1rem'
                }
            } >
            <
            strong > Medications: < /strong> <
            ul style = {
                {
                    margin: '0.5rem 0 0 1rem'
                }
            } > {
                medications && medications.length > 0 ? medications.map((m, i) => < li key = {
                        i
                    } > {
                        m
                    } < /li>) : < li > None < /li>
            } <
            /ul> <
            /div> <
            div style = {
                {
                    marginBottom: '1rem'
                }
            } >
            <
            strong > Confidence: < /strong> <
            span style = {
                {
                    color: confidence === 'High' ? '#38a169' : '#e53e3e',
                    fontWeight: 'bold',
                    marginLeft: '0.5rem'
                }
            } > {
                confidence
            } < /span> <
            /div> <
            div style = {
                {
                    marginBottom: '1rem'
                }
            } >
            <
            strong > Sources: < /strong> <
            ul style = {
                {
                    margin: '0.5rem 0 0 1rem'
                }
            } > {
                sources && sources.length > 0 ? sources.map((s, i) => < li key = {
                        i
                    } > {
                        s
                    } < /li>) : < li > None < /li>
            } <
            /ul> <
            /div> <
            div style = {
                {
                    fontSize: '0.9rem',
                    color: '#718096',
                    marginTop: '2rem',
                    textAlign: 'center'
                }
            } >
            Disclaimer: This summary is not diagnostic. For informational purposes only.
            </div> <
            /div> <
            /div>
        );
    }

    export default Summary;