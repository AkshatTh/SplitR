# 💸 SplitR - Smart Expense Splitting SaaS

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v14%2B-green.svg)
![React](https://img.shields.io/badge/React-v18-blue.svg)
![Status](https://img.shields.io/badge/Status-Maintained-orange.svg)

> **"Track less, Live more."**
> A full-stack financial application that simplifies group travel expenses using graph-based algorithms to minimize transaction volume.

![SplitR Banner](https://github.com/user-attachments/assets/28828840-78c0-4468-bbea-a3024c00d876)

---

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🧠 The "Minimize Cash Flow" Algorithm](#-the-minimize-cash-flow-algorithm)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Reference](#-api-reference)
- [📸 Screenshots](#-screenshots)
- [👤 Author](#-author)

---

## ✨ Key Features

### 🔐 Authentication & Security
- **JWT Authorization:** Secure, stateless authentication using JSON Web Tokens.
- **Password Hashing:** Bcrypt encryption ensures user passwords are never stored in plain text.
- **Route Protection:** Custom middleware validates tokens for protected resources.

### 💸 Expense Management
- **Complex Splitting:** Support for **Equal Splits** (default) and **Exact Amount Splits** (custom values).
- **Group Dashboard:** Real-time summary of "Total Spent", "Your Share", and "Net Balance" per group.
- **Activity Feed:** A chronological ledger of all expenses with detailed metadata (who paid, who owes what).

### ⚡ Algorithm Engine
- **Debt Simplification:** Reduces the number of transactions in a group.
    - *Scenario:* Alice owes Bob ₹500, Bob owes Charlie ₹500.
    - *Standard App:* 2 Transactions.
    - *SplitR:* 1 Transaction (Alice pays Charlie ₹500 directly).

### 📊 Analytics
- **Spending Charts:** Interactive Chart.js visualizations showing monthly spending trends.
- **Lifetime Stats:** Tracks total expenditure across all groups.

---

## 🛠️ Tech Stack

| Domain | Technology | Use Case |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Component-based UI architecture |
| | CSS3 / Glassmorphism | Modern styling with variables & grid layouts |
| | Chart.js | Data visualization for financial stats |
| | Axios | HTTP client for API requests |
| **Backend** | Node.js | Runtime environment |
| | Express.js | RESTful API framework |
| | Mongoose | ODM for MongoDB interactions |
| | JSON Web Token | Authentication mechanism |
| **Database** | MongoDB Atlas | Cloud-based NoSQL database |

---

## 🧠 The "Minimize Cash Flow" Algorithm

The core differentiator of SplitR is its backend logic. We use a **Greedy Algorithm** to simplify the debt graph.

### How it works:
1.  **Net Balance:** Calculate the net amount for every person (`Credit - Debit`).
2.  **Heap Separation:** Split users into two lists: `Debtors` (Negative balance) and `Creditors` (Positive balance).
3.  **Greedy Matching:**
    - Find the person who owes the **most** amount.
    - Find the person who is owed the **most** amount.
    - Match them! Transfer the minimum of the two amounts.
4.  **Recursion:** Repeat until all balances reach zero.

```javascript
// Actual logic implementation snippet
while (debtors.length && creditors.length) {
    let debtor = debtors[0];   // Maximum Debtor
    let creditor = creditors[0]; // Maximum Creditor

    // Find minimum of two amounts
    let amount = Math.min(Math.abs(debtor.amount), creditor.amount);

    // Record the simplified transaction
    transactions.push({ from: debtor.name, to: creditor.name, amount });

    // Update balances and remove settled users
    debtor.amount += amount;
    creditor.amount -= amount;
}
```

---

## 📂 Project Structure

```bash
SplitR/
├── backend/
│   ├── config/         # Database connection logic
│   ├── controllers/    # Request logic (Expense, Group, User)
│   ├── middleware/     # Auth & Error handling
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Route definitions
│   └── server.js       # Entry point
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components (Spinner, Forms)
│   │   ├── context/    # Global State (if used)
│   │   ├── pages/      # Dashboard, Login, GroupDetails
│   │   └── App.jsx     # Main Router
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Connection String (Atlas or Local)

### Installation

1.  **Clone the Repo**
    ```bash
    git clone [https://github.com/yourusername/splitr.git](https://github.com/yourusername/splitr.git)
    cd splitr
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Run the Application**
    * **Backend:** `cd backend && npm run server` (Runs on Port 5000)
    * **Frontend:** `cd frontend && npm run dev` (Runs on Port 5173)

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the `backend` folder.

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Backend Port | `5000` |
| `MONGO_URI` | MongoDB Connection String | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for tokens | `mysecretkey123` |

---

## 📡 API Reference

#### Groups

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/groups` | Get all groups for the logged-in user |
| `POST` | `/api/groups` | Create a new group |
| `PUT` | `/api/groups/:id/member` | Add a member to a group |
| `PUT` | `/api/groups/:id/member/remove` | **(Admin)** Remove a member |

#### Expenses

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/expenses/:groupId` | Get all expenses for a group |
| `POST` | `/api/expenses` | Add a new expense |
| `GET` | `/api/expenses/my-stats` | Get personal spending stats (Chart data) |
| `GET` | `/api/expenses/debts/:groupId` | **Run the Minimization Algorithm** |

---

## 📸 Screenshots

| **Dashboard View** | **Expense Feed** |
|:---:|:---:|
| ![Dashboard](https://github.com/user-attachments/assets/28828840-78c0-4468-bbea-a3024c00d876) | ![Feed](https://github.com/user-attachments/assets/8625c654-80eb-4d45-9678-efde6e94322e) |
| *Visualizes spending trends* | *Detailed transaction history* |

| **Algorithm In Action** | **Group Management** |
|:---:|:---:|
| ![Algorithm](https://github.com/user-attachments/assets/f37b6caf-5158-4f9e-8e4d-5583d069cc21) | ![Admin](https://github.com/user-attachments/assets/b5961441-4f40-4ef9-b8b9-c3eb02807ac5) |
| *Simplifies complex debts* | *Admin controls for groups* |

---

## 👤 Author

**Akshat**

- 💼 [LinkedIn](https://linkedin.com/in/your-profile)
- 🐙 [GitHub](https://github.com/your-username)

---

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/yourusername/splitr/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Give a ⭐️ if this project helped you!*

---
Built with ❤️ by **Akshat**
