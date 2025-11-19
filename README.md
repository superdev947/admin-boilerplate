# Admin Boilerplate

A modern, customizable admin dashboard boilerplate built with Next.js, TypeScript, and Tailwind CSS. This project provides a solid foundation for building scalable admin panels and internal tools, featuring modular architecture, reusable components, and best practices for rapid development.

## Features

- Next.js 13+ App Router
- TypeScript for type safety
- Tailwind CSS for utility-first styling
- Modular folder structure
- Authentication pages (login, register, forgot password)
- Dashboard and basic UI components
- Theming and layout support
- Example charts and statistics
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/superdev947/admin-boilerplate.git
cd admin-boilerplate

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:8080](http://localhost:8080) to view the app.

## Folder Structure

```
public/           # Static assets (images, logos, etc.)
src/
  @core/          # Core utilities, types, hooks, theme, and components
  @layouts/       # Layout components and styles
  @menu/          # Menu configs, components, and hooks
  app/            # Next.js app directory (pages, layouts, assets)
  components/     # Shared UI components
  configs/        # Theme and menu configuration
  libs/           # Third-party libraries and styles
  types/          # TypeScript type definitions
  utils/          # Utility functions
  views/          # Page and feature views
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ApexCharts](https://apexcharts.com/) (for charts)
- [React](https://react.dev/)

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
