
import fs from 'fs';

const content = fs.readFileSync('e:/mini-project/src/App.tsx', 'utf8');
let b_balance = 0; // brackets {}
let p_balance = 0; // parentheses ()
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let char of line) {
        if (char === '{') b_balance++;
        if (char === '}') b_balance--;
        if (char === '(') p_balance++;
        if (char === ')') p_balance--;
    }
    if (b_balance < 0 || p_balance < 0) {
        console.log(`Imbalance detected at line ${i + 1}: b_balance ${b_balance}, p_balance ${p_balance}`);
    }
}
console.log(`Final balance: b_balance ${b_balance}, p_balance ${p_balance}`);
