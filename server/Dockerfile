# Server Dockerfile

# Stage 1
FROM node:12

# Create Directory to store backend API
WORKDIR /usr/src/app/server

# Install Dependencies (Allows cacheing if dependencies installed first)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copies rest of source code into container
COPY . ./

# MUST HAVE .env.production which contains environment variables
# for application to run see "UserManual" documentation
COPY .env.production .env

# Ensures that environment is run in production
ENV NODE_ENV production

# Opens port 3001 and starts application
EXPOSE 3001
CMD ["node", "server.js"]
USER node