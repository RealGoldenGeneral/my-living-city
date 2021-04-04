# Server Dockerfile

# Stage 1 - set Environment
FROM node:12

# Create Directory to store backend API
WORKDIR /usr/src/app/server

# Install Dependencies (Allows cacheing if dependencies installed first)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copies rest of source code into container
COPY . ./

# Environment Vars are now set in Dokku manually to prevent leaking secrets
# COPY .env.production .env

# Ensures that environment is run in production
ENV NODE_ENV production

# Opens port 3001 and starts application
EXPOSE 3001
CMD ["node", "server.js"]
USER node