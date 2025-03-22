
# AI TODO App

A smart and efficient AI-powered Todo Management application designed to help you organize, track, and complete your tasks with ease.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**AI TODO App** leverages modern technologies to bring you a seamless task management experience. Built with Node.js using ES modules, the project integrates AI capabilities to provide intelligent suggestions and automate routine tasks. With robust database management through PostgreSQL and Drizzle ORM, the app ensures efficient storage and retrieval of your data.

---

## Features

- **AI Integration:** Utilize generative AI to enhance task management.
- **Efficient Database Management:** Built using PostgreSQL and Drizzle ORM.
- **Easy Migrations:** Seamless database migrations using Drizzle-Kit.
- **Interactive CLI:** Simple and interactive command-line interface using readline-sync.
- **Modular & Scalable:** Designed with scalability and ease of maintenance in mind.

---

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Migration Tool:** Drizzle-Kit
- **AI Integration:** @google/generative-ai
- **Environment Management:** dotenv
- **CLI:** readline-sync

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Iammilansoni/AI_TODO_Management_App.git
   cd AI_TODO_Management_App
   ```

2. **Install Dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory with the following content (update values accordingly):

   ```env
   DATABASE_URL=your_database_connection_string
   API_KEY=your_google_ai_api_key
   ```

---

## Usage

After installation and environment setup, start the application by running:

```bash
node index.js
```

If the application offers an interactive CLI, follow the on-screen prompts to manage your tasks effectively.

---

## Scripts

The following npm scripts are available in the project:

- **Generate:** Generate necessary files using Drizzle-Kit.
  
  ```bash
  npm run generate
  ```

- **Migrate:** Apply database migrations.
  
  ```bash
  npm run migrate
  ```

- **Studio:** Launch Drizzle-Kit studio for database management.
  
  ```bash
  npm run studio
  ```

- **Dotenv:** Execute environment-related operations.
  
  ```bash
  npm run dotenv
  ```

---

## Configuration

Below is an overview of the `package.json` configuration:

```json
{
  "name": "ai-todo-app",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "generate": "drizzle-kit generate",
    "migrate": "drizzle-kit migrate",
    "studio": "drizzle-kit studio",
    "dotenv": "dotenv"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^22.10.10",
    "@types/pg": "^8.11.11",
    "drizzle-kit": "^0.30.2"
  },
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "dotenv": "^16.4.7",
    "drizzle-orm": "^0.38.4",
    "pg": "^8.13.1",
    "readline-sync": "^1.4.10"
  }
}
```

Feel free to update the details as your project evolves.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```

4. Push to your branch:

   ```bash
   git push origin feature/YourFeature
   ```

5. Open a pull request with a detailed description of your changes.

Please ensure your contributions adhere to the project's code style and include appropriate tests or documentation updates.

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or further information, please reach out:

- **GitHub:** [Iammilansoni](https://github.com/Iammilansoni)
- **Email:** [milansoni96946@gmail.com](mailto:milansoni96946@gmail.com)

---

Happy Coding!
