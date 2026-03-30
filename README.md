# Jira-Style Task Board (React + Next.js)

A Jira-inspired task board built with **Next.js**, **React Context**, and **useReducer** to explore real-world state management patterns like undo/redo, async flows, and immutable updates.

This project focuses on **architecture and reasoning**, not just UI.

---

## 🚀 Features

- 🧩 Task lifecycle: **Todo → In Progress → Done**
- ➕ Add, ✏️ update, 🗑 delete tasks
- 🔄 **Undo / Redo** using time-travel state (past / present / future)
- ⏳ Simulated backend with async delays & failure handling
- 🔍 Search by task title or ID
- 🚫 UI locking during async operations
- 🎨 Tailwind CSS for layout and styling

---

## 🧠 Architecture Overview

### State Management

- Centralized state using **useReducer**
- Reducer is the **single source of truth**
- State structure:
  ```ts
  past[] → tasks[] → future[]
  History resets correctly on fresh fetch
  ```

git clone https://github.com/your-username/jira-task-board.git
cd jira-task-board
npm install
npm run dev


Testing this on windows
