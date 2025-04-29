FROM node:16-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

# Fix permission issues
RUN chmod -R 755 node_modules/.bin
COPY ./ ./

# Build for production
# RUN npm run build - 

# Optional: remove source files to reduce image size
# RUN rm -rf ./src

# Run in production mode
# CMD npm start

# Run in development mode with hot-reloading
CMD ["npm", "run", "dev"]