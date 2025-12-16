# yourStack

A curated reading platform for the AI era. Discover, share, and discuss the latest in AI, software engineering, and research breakthroughs. We fetch data from dev.to, hackernews, techcrunch, and more to come. And generate your personalized news letter.

## 🚀 Status
Active Development

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Email:** [Nodemailer](https://nodemailer.com/) & [React Email](https://react.email/)

## ✨ Features

- **Curated Posts**: Categorized content (AI, Software Engineering, Research Breakthroughts).
- **Voting System**: Upvote/downvote posts to surface the best content.
- **Discussion**: Comment threads with nested replies.
- **Newsletter**: Subscription system with user preferences (interests, style).
- **Admin Dashboard**: backend management for content.

## 🏁 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn or pnpm
- PostgreSQL database

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd yourStack/stackfrontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `stackfrontend` directory:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/yourstack_db?schema=public"
    # Add other necessary env vars here (e.g. SMTP settings for Nodemailer)
    ```

4.  **Database Setup**
    ```bash
    # Generate Prisma client and run migrations
    npx prisma generate
    npx prisma migrate dev
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable React components.
- `prisma/`: Database schema and migrations.
- `lib/`: Utility functions and shared instances (Prisma client).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
