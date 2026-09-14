const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    const latitude = await askQuestion("Latitude: ");
    const longitude = await askQuestion("Longitude: ");
    rl.close();
}

function askQuestion(question: String) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

main();
