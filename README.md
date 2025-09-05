# LinkTree Clone (Next.js & MongoDB)

A full-stack, responsive "link-in-bio" platform inspired by Linktree. Built with the Next.js App Router, this application allows users to sign up with Google, create a unique public page, and manage a collection of their important links with built-in analytics.

---

## 📸 Screenshots

**Homepage**
<img width="1913" height="969" alt="Homepage Screenshot" src="https://github.com/user-attachments/assets/18dbe052-452b-405a-a437-9f21795b2bea" />

**User Dashboard**
<img width="1901" height="969" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/16dea2ea-8df9-4ccf-8124-a0f9c502c2d3" />

**Public Profile Page**
<img width="934" height="968" alt="Public Profile Screenshot" src="https://github.com/user-attachments/assets/beb9de2d-c202-4e70-829d-4bb7c94e5304" />

---

## ✨ Live Demo

**(Add your deployment link here once you host it online)**

[Link to Live Demo](https://your-live-demo-url.com)

---

## 🚀 Features

* **Google Authentication:** Secure sign-up and login using Google OAuth 2.0 and JWT.
* **Customizable Public Page:** Claim a unique username and customize your page with a profile picture, bio, and custom backgrounds (color or image).
* **Dynamic Link Management:** Easily add, edit, delete, and reorder links with custom titles, subtitles, and thumbnail images.
* **Built-in Analytics:** Track page performance with data for total page views and individual link clicks.
* **Interactive Charts:** Visualize view and click data over time with a dynamic chart.
* **Responsive Design:** A clean UI that works seamlessly on both desktop and mobile devices.

---

## 💻 Tech Stack

* **Framework:** Next.js 14+ (App Router)
* **Styling:** Tailwind CSS
* **Database:** MongoDB Atlas with Mongoose
* **Authentication:** Google OAuth 2.0, JWT
* **File Storage:** AWS S3
* **Libraries:** React, Recharts, Font Awesome, date-fns

---

## 🛠️ Run Locally

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [Git](https://git-scm.com/)
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
* An [AWS S3](https://aws.amazon.com/s3/) account

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Sayan1425/linktree.git](https://github.com/Sayan1425/linktree.git)
    cd linktree
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root of the project and add the following variables.

    ```env
    # MongoDB Connection String from Atlas
    MONGODB_URI=your_mongodb_connection_string

    # A long, random, secret string for signing JWTs
    JWT_SECRET=your_super_secret_jwt_string

    # Your Google OAuth Client ID from Google Cloud Console
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

    # AWS S3 Credentials for file uploads
    BUCKET_NAME=your_s3_bucket_name
    S3_ACCESS_KEY=your_aws_s3_access_key
    S3_SECRET_ACCESS_KEY=your_aws_s3_secret_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.