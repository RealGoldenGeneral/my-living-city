# Server Dockerfile

# Stage 1
FROM node:12

# Create frontend directory
RUN mkdir -p /usr/src/app/server/
WORKDIR /usr/src/app/server/

# Install dependencies
COPY package*.json /usr/src/app/server/
RUN npm install
COPY . /usr/src/app/server/

# Open port 3001 for connections
EXPOSE 3001
CMD ["npm", "run", "dev"]