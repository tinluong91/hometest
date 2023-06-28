# Backend Dockerfile
FROM node:18.16.0-alpine

# Set the working directory in the container
WORKDIR /app/backend

# Copy the package.json and yarn.lock files
COPY package*.json ./
COPY yarn.lock ./
# Copy the backend source code
COPY . .

# Install backend dependencies
RUN yarn install



# Expose the backend port (change it if your backend runs on a different port)
EXPOSE 4000

# Generate Prisma client
# RUN pwd
RUN yarn prisma:generate

# Generate GraphQL codegen
RUN yarn codegen

# Start the backend server using "yarn dev"
CMD ["sh", "-c", "yarn install && yarn dev"]
