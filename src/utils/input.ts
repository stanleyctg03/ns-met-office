import * as process from "node:process";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export function askQuestion(question: String): Promise<String> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

export function closeReadLine() {
    rl.close();
}