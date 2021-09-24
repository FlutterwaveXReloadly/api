FROM public.ecr.aws/lts/ubuntu:20.04_stable
LABEL author="gal1l0"
# add basic deps
RUN apt update && apt install -y curl
RUN apt install -y redis-server
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt update && apt install -y nodejs
RUN npm install -g yarn
# Force docker to install packages if package.json changed

ADD package.json /tmp
ADD yarn.lock /tmp
RUN cd /tmp && yarn install

RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app
ADD . /opt/app
EXPOSE 80
CMD ["sh", "start.sh"]

