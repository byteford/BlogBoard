#########################################################
# stage: 1 — the build environment
#########################################################


FROM node:12.2.0-alpine as express-app



# install and cache app dependencies
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY ./src ./src
COPY ./milestones.txt ./milestones.txt
CMD npm start