# ExpenseTrack

ExpenseTrack is a web application designed to help you manage and track your expenses efficiently. Keep a record of your spending, categorize transactions, and gain insights into your financial habits.

## Docker Deployment
To build the Docker image for this application, run the following command in the project root directory:

```bash
npm run build
docker build -t expense-track-web .
```

After building the image, you can run it in a container:

```bash
docker run -d -p 4500:80 expense-track-web
```

**Note:** To run this application, you need an instance of the backend service available at [https://github.com/kartikeychoudhary/wheremybuckgoes](https://github.com/kartikeychoudhary/wheremybuckgoes) running. Ensure the backend URL is correctly configured in `src/environment/environment.ts` (for development) and `src/environment/environment.prod.ts` (for production builds).

## Development server
To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4500/`. The application will automatically reload whenever you modify any of the source files.

## Building
To create a production build of the project, run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/expense-track/browser/` directory. This build is optimized for performance and speed.
