# specify the node base image with your desired version node:<version>
FROM node:18.17.0
ENV NODE_ENV=production
# Create app directory
WORKDIR /usr/src/app
ENV DATABASE_URL="mongodb://root:root@mongo:27017/userdb"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY prisma ./prisma/

# Install the node dependencies (good practice to use ci as it install the exact same versioned package of your project)
RUN npm install --production --silent && mv node_modules ../
RUN npx prisma db push

# Bundle app source
COPY . .

EXPOSE 5001

# Command for running python app
CMD [ "npm", "start" ]