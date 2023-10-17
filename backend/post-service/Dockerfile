# specify the node base image with your desired version node:<version>
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install the node dependencies (good practice to use ci as it install the exact same versioned package of your project)
RUN npm ci

# Bundle app source
COPY . .

EXPOSE 5002

# Command for running python app
CMD [ "npm", "start" ]