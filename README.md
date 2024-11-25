# Blog Posts Management with Next.js

This project is a comprehensive blog posts management application built with [Next.js](https://nextjs.org),
[React](https://reactjs.org), and [TypeScript](https://www.typescriptlang.org).
It leverages modern libraries and frameworks such as [Material-UI](https://mui.com) for styling,
[Redux Toolkit](https://redux-toolkit.js.org/) for state management, and [Formik](https://formik.org/docs/overview) for form handling.
The application is designed to provide a seamless and efficient user experience for managing blog posts and comments.

## Features

- **Performance Improvements**: Optimized rendering and state management for a smoother user experience.
- **User-Friendly Interface**: Intuitive and easy-to-navigate UI.
- **Robust State Management**: Efficient state handling with Redux Toolkit.
- **Form Handling**: Simplified form management with Formik.
- **Theming**: Customizable themes with Material-UI.
- **Virtualization**: Efficiently rendering large lists with React Virtuoso.
- **Simulate Infinity Scroll**: Seamless infinite scrolling for large data sets.

## Getting Started

### Environment Variables

Ensure you have the following environment variable defined in your `.env` file:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3000/
```

### Installation

### Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (>= 22.x)
- npm (>= 10.x)

### Installation

Install the dependencies:

```bash
npm install
```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

### Running the Production Server

After building the project, you can start the production server with:

```bash
npm start
```

## Conventions

- 'S' prefix is used for styled components

```tsx
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

const SCard = styled(Card)(({ theme }) => ({
  ...
}))
```

## Project Structure

## Project Structure

The project is organized as follows:

```plaintext
blog-posts/
├── src/                    # Source code
│   ├── app/                # Application root component
│   ├── components/         # UI components
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Redux store configuration
│   ├── services/           # API services
│   ├── theme/              # MUI theme configuration
│   └── types/              # TypeScript types and interfaces
├── next.config.js          # Next.js configuration
├── .env.example            # Environment variables
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Technologies Used

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Formik](https://formik.org/docs/overview)
- [Formik](https://formik.org/docs/overview)
- [Material-UI](https://mui.com)
- [React Virtuoso](https://virtuoso.dev/)
