const fetch = require('node-fetch'); // Needs node-fetch or native fetch in Node 18+

async function testApi() {
    try {
        const res = await fetch('http://localhost:3000/api/generate-descriptors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emotion: 'Joyful' }),
        });

        console.log(`Status: ${res.status}`);
        const text = await res.text();
        console.log(`Body: ${text}`);
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

testApi();
