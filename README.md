# Virtual Tutor App

This project is a prototype of a **Virtual Tutor** application built using [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and runs on the [Bun](https://bun.sh/) JavaScript runtime. The application aims to provide students with a platform to ask tailored questions related to their course modules, leveraging a Large Language Model (LLM) to generate personalised and meaningful responses.

## Features

- **Interactive Q&A**: Students can ask specific questions about their modules and receive customised answers.
- **User-Friendly Interface**: Simple and intuitive design for ease of use.
- **LLM Integration**: Utilises an LLM to enhance the learning experience by providing reconstructed information in meaningful ways.

## Prerequisites

Ensure you have the following installed on your system:

- **Bun**: Install from the [Bun installation guide](https://bun.sh/docs/install).
- **Git**: For cloning the repository.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Install the project dependencies using Bun:

```bash
bun install
```

## Running the Application

Start the development server with:

```bash
bun run dev
```

You should see output indicating the server is running, such as:

```bash
VITE v5.4.8 ready in xxx ms


➜ Local: http://localhost:5173/
```

### Access the Application

Open your web browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the application.

## Building for Production

To create an optimised production build:

```bash
bun run build
```

## Previewing the Production Build

To preview the production build locally:

```bash
bun run preview
```

This will start a local server at [http://localhost:4173/](http://localhost:4173/).
