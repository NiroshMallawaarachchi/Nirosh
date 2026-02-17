# Nirosh Mallawaarachchi LMS

Welcome to your personal Learning Management System.

## How to Use
1. Simply double-click `index.html` to open the LMS in your web browser.
2. **Navigation**:
   - Select **O/L Commerce** or **A/L Accounting** from the home screen.
   - Navigate through Grades and Lessons.
   - Click "Back" or use the Breadcrumbs to return.
3. **Uploading Files**:
   - Navigate to the specific folder (e.g., Grade 10 -> Notes).
   - Click the **"Upload"** button.
   - Fill in the details. *Note: Since this is a local offline version, the "file upload" just simulates adding a file to the list. The specific file path isn't stored on a server, but the entry is saved in your browser's Local Storage.*
4. **Data Persistence**:
   - All the "files" you add are saved in your browser. If you clear your browser cache, the list will reset.

## Features
- **Premium Design**: Modern, glassmorphism interface with animations.
- **Structured Content**: 
  - **O/L Commerce**: Separated by Grade 10/11, then by Notes/Papers/Videos.
  - **A/L Accounting**: 16 Lessons, each with Notes/Papers/Videos.
- **Admin Name**: "Nirosh Mallawaarachchi" displayed prominently.

## Customization
To change the Lesson names from "Lesson 1" to specific topics (e.g., "Introduction to Accounting"), you can edit the `app.js` file:
Look for the `init()` function and change the loop or manually set names.

Enjoy your LMS!
