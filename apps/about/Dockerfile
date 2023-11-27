FROM node:16-slim
USER node
WORKDIR /home/node
ENV PATH /home/node/node_modules/.bin:$PATH

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . ./

ENV PORT 3001
EXPOSE 3001
CMD ["npm", "start"]

