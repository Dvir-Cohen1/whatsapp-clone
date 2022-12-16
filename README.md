# whatsapp-clone

> Whatsapp clone is an app clone of whatsapp '[WhatsApp](https://www.whatsapp.com/)'.

## Requirements

- Node.js >= v12

## Application structure

- `/client/` directory - React front end code.
- `/server/` directory - Node.js back end code.
- `static/` directory - Compiled front end assets. Created by webpack when you run the
command `npm run build`. The Node.js back end serves serves these assets using the
[`express.static`](https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express) middleware.

## Usage

```bash
# Install dependencies for front end and back end
npm install

# Build front end assets with webpack
npm run build

# Run Node.js back end server and React front end server concurrently
npm run dev
```

Load up http://localhost:3000 in your browser to view the example app.

## Libraries and frameworks used

- [TypeScript](https://www.typescriptlang.org/) - "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.".

- [Express](https://expressjs.com/) - "Fast, unopinionated, minimalist web framework for Node.js".

- [React](https://reactjs.org/) - "A JavaScript library for building user interfaces".

- [Webpack](https://www.npmjs.com/package/webpack) - A popular tool for building
front end assets e.g. CSS and JavaScript.

- [Socket.io](https://socket.io/) - Sockets have traditionally been the solution around which most real-time chat systems are architected, providing a bi-directional communication channel between a client and a server.

- [Vite](https://vitejs.dev/guide/) - Vite (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects.r.

- [Tailwind css](https://tailwindcss.com/docs/installation) - Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file..


