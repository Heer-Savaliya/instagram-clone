# Heer Insta Clone

A fully responsive Instagram-like social media application built using React and Firebase. Users can post images, like and comment on posts, and view others' posts in real time.

🌐 [Live Demo](https://heer-insta-clone.netlify.app/)

## 🚀 Features

- 🔐 User Authentication (Login/Signup)
- 📸 Upload and share photos
- 💬 Like and comment on posts
- 👥 View other users' posts
- 🧠 Real-time updates with Firebase Firestore
- 🔄 Responsive design (Mobile & Desktop friendly)

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS (or CSS Modules, depending on your setup)
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Netlify

## 📁 Folder Structure

```bash
/heer-insta-clone/
│
├── public/             # Static files
├── src/
│   ├── components/     # Reusable React components (e.g., Feed, Post, Navbar)
│   ├── pages/          # Main pages (Home, Login, Signup, Profile)
│   ├── firebase.js     # Firebase configuration and initialization
│   └── App.js          # App routing and layout
│
├── .env               # Firebase config variables (not committed)
├── package.json
└── README.md
        