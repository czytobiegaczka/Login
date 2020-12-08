FROM node:latest
WORKDIR /login
COPY package.json .
RUN npm install
RUN npm install mysql
COPY index.js .
COPY connection.js .
COPY biegi.html .
COPY index.html .
COPY month.html .
COPY protected.html .
COPY scripts.js .
COPY sha256.js .
COPY style.css .
CMD ["node","index.js","connection.js","biegi.html","index.html","month.html","protected.html","scripts.js","sha256.js","style.css"]