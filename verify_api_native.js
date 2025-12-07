// verify_api_native.js
// Node.js 18+ has native fetch

async function run() {
    try {
        console.log("Testing API...");
        const response = await fetch('http://localhost:3000/api/generate-descriptors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emotion: 'Joyful' })
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Body:', text.substring(0, 200) + "...");
    } catch (e) {
        console.error('Error:', e);
    }
}

run();
