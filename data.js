// Main Data Source - This file matches what everyone sees
// To update for everyone: 
// 1. Upload in the app
// 2. Click "Save Changes to File"
// 3. Replace this data.js file with the downloaded one

const globalLMSData = {
    'O/L Commerce': {
        'Grade 10': {
            'Notes': [],
            'Model Papers': [],
            'Unit Papers (Online)': [],
            'Videos': []
        },
        'Grade 11': {
            'Notes': [],
            'Model Papers': [],
            'Unit Papers (Online)': [],
            'Videos': []
        }
    },
    'A/L Accounting': {
        // Lessons 1-16 will be initialized if empty
    }
};

// Initialize A/L Accounting Lessons if they don't exist
for (let i = 1; i <= 16; i++) {
    const lessonKey = `Lesson ${i}`;
    if (!globalLMSData['A/L Accounting'][lessonKey]) {
        globalLMSData['A/L Accounting'][lessonKey] = {
            'Notes': [],
            'Unit Papers (Online)': [],
            'Videos': []
        };
    }
}
