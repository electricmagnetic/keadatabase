FROM node:16
USER node
WORKDIR /home/node
ENV PATH /home/node/node_modules/.bin:$PATH

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . ./

EXPOSE 3000
CMD ["npm", "start"]

