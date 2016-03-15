### node
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get install -y nodejs
### git
    sudo apt-get install -y git
    sudo git clone http://github.com/ccnuyan/starc3_administrator
### build-essential
    sudo apt-get install -y build-essential
### npm
    sudo npm run itaobao
    sudo npm run build-web
### web
    docker rm -f admin-web
    docker build -t admin-web:0.0.1 -f Dockerfile.web .
    docker run -d -p 8300:8300 -v /root/source:/etc/source --name admin-web admin-web:0.0.1
    docker logs -f admin-web
### api
    docker rm -f admin-api
    docker build -t admin-api:0.0.1 -f Dockerfile.api .
    docker run -d -p 3300:3300 -v /root/source:/etc/source --name admin-api admin-api:0.0.1
    docker logs -f admin-api
