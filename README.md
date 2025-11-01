# Full Stack Assignment

This assignment is a comprehensive full stack application built using the following technologies:

Preview URL: [View Live Site](https://full-stack-development-assignment.vercel.app/)

## Technologies Used

### Front-end
- **Next.js 14**: The latest version of Next.js, a popular React framework for building server-rendered and static websites.
- **TypeScript**: A statically typed superset of JavaScript, enhancing code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Back-end
- **Next.js API Routes**: Serverless API routes provided by Next.js for handling server-side logic.
- **Prisma ORM**: A modern Object-Relational Mapping (ORM) tool for interacting with databases.
- **PostgreSQL**: A powerful open-source relational database management system.
- **Neon Database Provider**: A high-performance database provider for PostgreSQL, used in conjunction with Prisma.

### Authentication
- **Next-Auth**: A comprehensive authentication library for Next.js applications, simplifying the implementation of secure authentication flows.

### Image Upload
- **Uploadthing**: A modern file upload library for the web, utilized for efficient and secure image uploads.

## Email Verification

The application includes an email verification feature powered by Next-Auth. For the free tier plan, only one email address can be used for testing purposes. During the development and testing phase, you can use the following email address: `generativeai1@gmail.com`.

Additionally, a "Resend Verification Email" functionality is available to streamline the email verification process.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Set up the environment variables (e.g., database credentials, authentication secrets)
4. Run the development server: `npm run dev` or `yarn dev`

The application will be available at `http://localhost:3000`.

## Deployment

The application can be deployed to various hosting platforms, such as Vercel, Netlify, or a custom server. Refer to the deployment documentation of your preferred platform for specific instructions.

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow for submitting pull requests:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Commit your changes
4. Push to your fork
5. Submit a pull request

## License

This project is licensed under the [MIT License](LICENSE).