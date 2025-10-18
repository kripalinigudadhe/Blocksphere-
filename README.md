
🧱 BlockSphere — Modern Blogging Platform
🚀 Overview

BlockSphere is a dynamic and secure blog platform built using Node.js, Express.js, and MySQL.
It allows users to sign up, log in, create, edit, and manage blogs, and enables readers to comment and interact in real time.
Designed with a minimal and elegant frontend (HTML, CSS, JS) for simplicity and focus on content.

✨ Features

✅ User Authentication (Register / Login / JWT-based sessions)
✅ Create, Edit, and Delete Blog Posts
✅ Comment System for Readers
✅ RESTful API Architecture
✅ Secure Password Hashing with bcrypt
✅ MySQL Database Integration
✅ Responsive Frontend using HTML, CSS, JS
✅ Scalable Backend using Express.js

🧩 Tech Stack
Layer	Technology Used
Backend	Node.js, Express.js
Database	MySQL
Frontend	HTML, CSS, JavaScript
Authentication	JSON Web Token (JWT), bcrypt
Server	Express RESTful API
⚙️ Installation & Setup
1️⃣ Clone the repository:
git clone https://github.com/<your-username>/BlockSphere.git
cd BlockSphere

2️⃣ Install dependencies:
npm install

3️⃣ Configure the database:

Create a .env file in the root directory and add:

DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=blocksphere
JWT_SECRET=your_jwt_secret
PORT=5000

4️⃣ Run database migrations (optional, if script included):
npm run migrate

5️⃣ Start the server:
npm start


Server runs at → http://localhost:5000

🧠 API Endpoints
🔐 Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate user and return token
📝 Blog Posts
Method	Endpoint	Description
GET	/api/posts	Fetch all blog posts
GET	/api/posts/:id	Get single post details
POST	/api/posts	Create a new post
PUT	/api/posts/:id	Update an existing post
DELETE	/api/posts/:id	Delete a post
💬 Comments
Method	Endpoint	Description
GET	/api/comments/:postId	Get all comments for a post
POST	/api/comments/:postId	Add a comment to a post
💻 Folder Structure
BlockSphere/
│
├── backend/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── package.json
└── README.md

🧑‍💻 Future Enhancements

🔸 User profiles & avatars

🔸 Tagging and categories

🔸 Like & share system

🔸 Dark mode toggle

🔸 Admin dashboard for blog management

💬 Contributing

Contributions are welcome!
If you'd like to improve BlockSphere, fork the repo and open a pull request.

📜 License

This project is licensed under the MIT License.

🪄 Example Prompts for README Generation

Use these if you want to let ChatGPT or Copilot expand the README further:

🗣 “Write a section describing how JWT authentication works in my Node.js Express blog app.”

⚙️ “Add setup steps for connecting MySQL with Express using Sequelize.”

🎨 “Generate a feature list table for BlockSphere with icons and short one-liners.”

💡 “Add example API request and response for creating a blog post.”
