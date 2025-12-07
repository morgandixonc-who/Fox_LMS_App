export default function SettingsPage() {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="title">Settings</h1>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ marginBottom: '20px' }}>Account</h2>
                <div style={{
                    padding: '20px',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius)',
                    marginBottom: '20px'
                }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Username</label>
                        <input
                            defaultValue="DrFox"
                            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Email</label>
                        <input
                            defaultValue="fox@example.com"
                            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                        />
                    </div>
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '20px' }}>Subscription</h2>
                <div style={{
                    padding: '30px',
                    backgroundColor: '#fffbe6', /* Light yellow/gold */
                    border: '2px solid var(--primary)',
                    borderRadius: 'var(--radius)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--primary-dark)' }}>Fox Training Pro</h3>
                    <p style={{ marginBottom: '20px' }}>Unlock unlimited practice scenarios and advanced AI personas.</p>
                    <button className="btn btn-primary" style={{ width: '100%' }}>Upgrade to Pro</button>
                </div>
            </div>
        </div>
    );
}
