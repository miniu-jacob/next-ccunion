// lib/db/data/sample-blogs-data.ts

export interface Blog {
  slug: string;
  title: string;
  description: string;
  content: string;
  link: string;
  imageUrl: string;
}

const SampleBlogs: Blog[] = [
  {
    slug: "js-tutorial",
    title: "JS Tutorial",
    description: "Boost your website traffic with the latest SEO strategies.",
    content: `
# How to Improve Your SEO in 2024

SEO is constantly evolving. To stay ahead, follow these key strategies:

## 🔹 1. Optimize for Featured Snippets
Google's **Featured Snippets** provide instant answers. Structure your content to target them.

## 🔹 2. Focus on User Intent
Ensure your content **matches search intent** by providing real value.

## 🔹 3. Improve Core Web Vitals
Google ranks websites based on speed, **interactivity**, and visual stability.

> "Good SEO is about user experience first, search engines second."

[Read more about SEO](https://www.google.com)
    `,
    link: "/blog/js-tutorial",
    imageUrl:
      "https://images.unsplash.com/photo-1739826155350-db63e78c098c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slug: "ai-trends-2024",
    title: "Top AI Trends to Watch in 2024",
    description: "Explore the most exciting advancements in AI technology.",
    content: `
# Top AI Trends to Watch in 2024

Artificial Intelligence is reshaping industries. Here are the top AI trends:

## 🚀 1. AI-Powered Automation
From **chat bots** to robotic process automation, AI is increasing efficiency.

## 🤖 2. Generative AI Boom
AI models like **ChatGPT** are revolutionizing content creation.

## 🔍 3. AI Ethics & Regulations
Governments are working on laws to ensure **ethical AI usage**.

AI is the future. **Are you ready for it?**
[Learn more about AI](https://www.google.com)
    `,
    link: "/blog/ai-trends-2024",
    imageUrl:
      "https://images.unsplash.com/photo-1739005375704-fa5e6c68fc84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slug: "remote-work-success",
    title: "Tips for Success in Remote Work",
    description: "Stay productive and maintain work-life balance remotely.",
    content: `
# Tips for Success in Remote Work

Working remotely can be challenging. Here’s how to succeed:

## 🏡 1. Set Up a Dedicated Workspace
A separate workspace helps **boost productivity** and focus.

## ⏰ 2. Follow a Routine
Start and end work at the **same time** every day.

## 💬 3. Communicate Effectively
Use tools like **Slack, Zoom, and Notion** to stay connected.

> "Discipline equals freedom" – Jocko Will ink

[Discover more productivity hacks](https://www.google.com)
    `,
    link: "/blog/remote-work-success",
    imageUrl:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VvdWx8ZW58MHx8MHx8fDA%3D",
  },
  {
    slug: "web-design-best-practices",
    title: "Best Practices for Modern Web Design",
    description: "Enhance UX with these cutting-edge web design principles.",
    content: `
# Best Practices for Modern Web Design

A good website **engages users** and delivers value. Here’s how:

## 🎨 1. Minimalist Design
Keep it **clean** and **easy to navigate**.

## 📱 2. Mobile-First Approach
Over 60% of web traffic is **mobile**. Optimize accordingly.

## 🚀 3. Fast Loading Speed
Slow websites kill conversions. **Improve performance** with proper optimization.

[Check out top web design inspirations](https://www.google.com)
    `,
    link: "/blog/web-design-best-practices",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661948404806-391a240d6d40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2VvdWx8ZW58MHx8MHx8fDA%3D",
  },
  {
    slug: "digital-marketing-strategies",
    title: "Effective Digital Marketing Strategies",
    description: "Boost your online presence with these marketing techniques.",
    content: `
# Effective Digital Marketing Strategies

Marketing online is **constantly evolving**. Try these proven strategies:

## 🎯 1. Social Media Engagement
Build relationships through **Instagram, LinkedIn, and Twitter**.

## 💰 2. Paid Advertising
Leverage **Google Ads** and **Facebook Ads** for targeted reach.

## 📩 3. Email Marketing
The **highest ROI** comes from personalized email campaigns.

> "The best marketing doesn't feel like marketing." – Tom Fish bur neo

[Explore more marketing tips](https://www.google.com)
    `,
    link: "/blog/digital-marketing-strategies",
    imageUrl:
      "https://images.unsplash.com/photo-1554040305-68021c3fc4f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VvdWx8ZW58MHx8MHx8fDA%3D",
  },
];

export default SampleBlogs;
