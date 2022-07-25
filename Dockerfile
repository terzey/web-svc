FROM node:16-alpine as build

ARG GITHUB_REF_NAME=local
ARG GITHUB_SHA=0000000

ADD . /tmp
RUN  cd /tmp && \
     sh ./build.json.sh > build.json && \
     npm install && \
     npm run build && \
     mv /tmp/dist /app && \
     rm -rf /tmp/node_modules && \
     npm install --omit=dev && \
     mv /tmp/node_modules /app

FROM node:16-alpine
LABEL Description="web-svc"

COPY --from=build /app /app
RUN addgroup -S appgroup && adduser -u 1001 -G appgroup -D appuser
USER appuser

EXPOSE 3000
STOPSIGNAL SIGINT
ENV NODE_ENV=production
WORKDIR /app
CMD ["node", "src/main.js"]
