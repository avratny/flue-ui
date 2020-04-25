FROM nodered/node-red:latest

COPY --chown=node-red . /usr/src/node-red/flue

# Build custom node
RUN cd /usr/src/node-red/flue && npm i && npx gulp

# install newly build node into node red
RUN npm i ./flue

ENTRYPOINT ["npm", "start", "--", "--userDir", "/data"]
