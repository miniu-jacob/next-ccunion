---
title: Next.js Tutorial
slug: nextjs-tutorial
description: Learn the fundamentals of Next.js, the powerful React framework for building modern web applications.
---

## 📌 Introduction

Next.js is a **React framework** that enables features such as **server-side rendering (SSR)**, **static site generation (SSG)**, and **API routes**. It is one of the most popular frameworks for modern web development.

### 🔹 Why Use Next.js?

- **⚡ Fast Performance**: Optimized for speed with static generation and incremental static regeneration.
- **📡 API Routes**: Built-in API support without needing a backend.
- **🌍 SEO Friendly**: Server-side rendering improves search engine ranking.
- **💾 Data Fetching**: Supports multiple data fetching strategies like SSR, SSG, ISR, and CSR.

---

## 🎯 Setting Up a Next.js Project

### 1️⃣ **Install Next.js**

To start a new Next.js project, use the following command:

```sh
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

> 💡 This will create a new Next.js project and start the development server at `http://localhost:3000`.

### 2️⃣ **Project Structure**

A typical Next.js project looks like this:

```plaintext
my-next-app/
│── pages/         # Contains all the pages (e.g., index.js, about.js)
│── public/        # Static assets (images, icons, etc.)
│── styles/        # Global styles and CSS modules
│── components/    # Reusable UI components
│── api/           # API routes (serverless functions)
│── next.config.js # Next.js configuration file
│── package.json   # Project dependencies
```

---

## 🚀 Creating Pages in Next.js

### 1️⃣ **Basic Page (`pages/index.js`)**

Create a simple homepage in **`pages/index.js`**:

```js
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}
```

📌 Any file inside the `pages/` directory automatically becomes a **route**.

### 2️⃣ **Dynamic Routing**

Next.js allows dynamic routing by using square brackets `[]`.
For example, create a dynamic page **`pages/blog/[id].js`**:

```js
import { useRouter } from "next/router";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>Blog Post ID: {id}</h1>;
}
```

🔹 Now visiting **`/blog/123`** will render:

```plaintext
Blog Post ID: 123
```

---

## 🛠 **Data Fetching in Next.js**

Next.js provides multiple ways to fetch data:

### **1️⃣ Server-Side Rendering (SSR)**

📌 Fetches data on every request.

```js
export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}
```

### **2️⃣ Static Site Generation (SSG)**

📌 Fetches data at **build time** for better performance.

```js
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}
```

### **3️⃣ Incremental Static Regeneration (ISR)**

📌 Regenerates static pages after deployment.

```js
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts }, revalidate: 10 }; // Revalidates every 10 seconds
}
```

---

## ✅ **Next Steps**

Now that you know the basics of Next.js, here’s what you can explore next:

- 🏗 **Deploying Next.js with Vercel** (`vercel deploy`)
- 🔥 **Using Tailwind CSS with Next.js**
- 🔄 **Creating API Routes in Next.js**
- 🚀 **Building a Full-stack Next.js App with MongoDB**

📚 **Happy Coding with Next.js!** 🎉
