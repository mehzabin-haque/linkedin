# specify the node base image with your desired version node:<version>
FROM node:18.17.0
ENV NODE_ENV=production
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install the node dependencies (good practice to use ci as it install the exact same versioned package of your project)
RUN npm install --production --silent && mv node_modules ../

# Bundle app source
COPY . .

EXPOSE 5003

# Command for running python app
CMD [ "npm", "start" ]