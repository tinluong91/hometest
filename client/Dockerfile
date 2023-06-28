# Client Dockerfile
FROM node:16-alpine as builder

# Set the working directory in the container
WORKDIR /app/client

# Copy the package.json and package-lock.json files
COPY package*.json ./
COPY yarn.lock ./

# Install client dependencies
RUN yarn install --only=production --legacy-peer-deps

# Copy the client source code
COPY . ./

# Build the client app
RUN yarn build

# Use nginx as the production server
FROM nginx:alpine

# Copy the built client files to the nginx web server
COPY --from=builder /app/client/build /usr/share/nginx/html

# Expose the client port (change it if your client runs on a different port)
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
