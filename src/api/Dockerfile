FROM node:14

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN yarn
CMD ["npx", "ts-node", "src/server.ts"]
