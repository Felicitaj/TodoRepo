# TodoRepo

A full-stack Todo application that allows users to manage personal tasks and generate intelligent summaries of pending todos using **Cohere AI**, with summaries posted to a Slack channel. Built with **React**, **Node.js/Express**, and **Supabase**.

---

## Features

-  Add, edit, and delete to-do items
-  View current list of to-dos
-  Summarize todos using Cohere AI
-  Send summaries to a Slack channel via Webhook
-  RESTful API built with Node.js and Express
-  Supabase PostgreSQL for data storage
-  Responsive UI built with React and Tailwind CSS

---

##  Tech Stack

| Layer       | Technology         |
|-------------|---------------------|
| Frontend    | React, Tailwind CSS |
| Backend     | Node.js, Express    |
| Database    | Supabase (PostgreSQL) |
| AI Model    | Cohere LLM          |
| Messaging   | Slack Webhooks      |

---

##  Getting Started

### Prerequisites

- Node.js and npm installed
- Supabase account (free tier)
- Cohere AI account and API key
- Slack workspace with webhook permissions

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Felicitaj/TodoRepo.git
cd TodoRepo

### 2. Supabase Setup
2.1 Create a new project at Supabase.io
2.2 Enable Row-Level Security (RLS)
2.3 Add a simple access policy
2.4 Get your SUPABASE_URL and SUPABASE_ANON_KEY from the dashboard

---Allow delete for all
alter policy "Allow delete for all"
on "public"."todoDb"
to public
using (
true
);

---Allow update all
alter policy "Allow update all"
on "public"."todoDb"
to public
using (
true
with check (
true
);

---insert
alter policy "insert"
on "public"."todoDb"
to public
with check (
true
);

---read
alter policy "read"
on "public"."todoDb"
to public
using (
true
);

### 3. Cohere API Setup
3.1 Sign up at https://cohere.com
3.2 Go to your Cohere dashboard and generate an API key
3.3 Save the key for the backend .env

### 4. Slack Webhook Setup
4.1 Open your Slack workspace
4.2 Go to Apps → Search for Incoming Webhooks
4.3 Click Add Configuration, choose a channel, and copy the generated webhook URL
4.4 Use it in your backend .env

### 5. Environment Variables
5.1 Create backend/.env file
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
COHERE_API_KEY=your_cohere_api_key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url


