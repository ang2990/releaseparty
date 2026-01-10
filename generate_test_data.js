const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwzlowHP4tlMl4A0e4y9wVfknzPPu65X6JArMOUxfT-MdQFPTrk5YgDsj-mRab19IAV6g/exec';

const firstNames = ["Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Elijah", "Charlotte", "William", "Sophia", "James", "Amelia", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Evelyn", "Alexander", "Harper"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const artistNouns = ["Echo", "Void", "Static", "Neon", "Dust", "Shadow", "Pulse", "Wave", "Flow", "Rust", "Velvet", "Onyx", "Circuit", "Signal", "Ghost", "Solar", "Lunar", "Lunar", "Cyber", "Analog"];
const artistVerbs = ["Project", "Theory", "Collective", "Unit", "Sound", "System", "Group", "Phase", "Frequency", "Loop"];

function generateName(isArtist) {
    if (isArtist) {
        return artistNouns[Math.floor(Math.random() * artistNouns.length)] + " " + artistVerbs[Math.floor(Math.random() * artistVerbs.length)];
    }
    return firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)];
}

async function insertData() {
    console.log("Starting data insertion...");
    for (let i = 0; i < 50; i++) {
        const isArtist = Math.random() > 0.4;
        const role = isArtist ? "ARTIST" : "LISTENER";
        const name = generateName(isArtist);
        const email = name.toLowerCase().replace(/\s+/g, '.') + "@example.com";
        const link = isArtist ? `https://example.com/artist/${name.toLowerCase().replace(/\s+/g, '-')}` : `https://social.com/${name.toLowerCase().replace(/\s+/g, '')}`;
        const streams = isArtist ? (Math.floor(Math.random() * 5000000) + 1000).toLocaleString() : (Math.floor(Math.random() * 50000) + 100).toLocaleString();

        const payload = {
            timestamp: new Date().toISOString(),
            role,
            name,
            email,
            link,
            streams
        };

        try {
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            console.log(`[${i+1}/50] Inserted ${name} (${role})`);
        } catch (err) {
            console.error(`Failed to insert ${name}:`, err);
        }
        
        // Small delay to avoid hitting rate limits
        await new Promise(r => setTimeout(r, 200));
    }
    console.log("Finished inserting 50 rows.");
}

insertData();
