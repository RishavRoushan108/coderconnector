## frontend deployment

- 1.first create the instance
- 2.there i have created a secrete file
- 3.chmod 400 coderconnector.pem--> to give permission to this file
- 4.User@LAPTOP-RAKRCC5T MINGW64 ~/Downloads
- $ ssh -i "coderconnector.pem" ubuntu@ec2-13-61-15-0.eu-north-1.compute.amazonaws.com
- 5.ubuntu@ip-172-31-36-13:~$ --> this is ubuntu machine which is on server
- 6.ubuntu@ip-172-31-36-13:~$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
- 7.ubuntu@ip-172-31-36-13:~$ \. "$HOME/.nvm/nvm.sh"
- 8.ubuntu@ip-172-31-36-13:~$ nvm install 24.11.0
- 9.ubuntu@ip-172-31-36-13:~$ git clone https://github.com/RishavRoushan108/coderconnector.git
- 10.ubuntu@ip-172-31-36-13:~$ cd coderconnector
  ubuntu@ip-172-31-36-13:~/coderconnector$ ls
  backend frontend
  ubuntu@ip-172-31-36-13:~/coderconnector$ cd frontend
- 11.ubuntu@ip-172-31-36-13:~/coderconnector/frontend$ npm install
- 12.ubuntu@ip-172-31-36-13:~/coderconnector/frontend$ npm run build
- 13.ubuntu@ip-172-31-36-13:~$ sudo apt update
- 14.ubuntu@ip-172-31-36-13:~$ sudo apt install nginx
- 15.Do you want to continue? [Y/n] y
- 16.ubuntu@ip-172-31-36-13:~$ sudo systemctl start nginx
- 17.ubuntu@ip-172-31-36-13:~$ sudo systemctl enable nginx
- 18.make a port of 80 in instances
- 19.ubuntu@ip-172-31-36-13:~/coderconnector/frontend$ sudo scp -r dist/\* /var/www/html/
  ubuntu@ip-172-31-36-13:~/coderconnector/frontend$ cd /var/www/html/
  ubuntu@ip-172-31-36-13:/var/www/html$ ls
  assets index.html index.nginx-debian.html vite.svg

## backend deployment

- note-> git pull -> used to update the code in ec2 when change happen in git
  backend
- 1.ubuntu@ip-172-31-36-13:~$ cd coderconnector/backend -> go to backend
- 2.ubuntu@ip-172-31-36-13:~/coderconnector/backend$ npm install
- 3.ubuntu@ip-172-31-36-13:~/coderconnector/backend$ nano .env
  fill all detail -> Ctrl + X -> press y -> File Name to Write: .env -> press enter
- 4.allow your ip to db
- 5.ubuntu@ip-172-31-36-13:~/coderconnector/backend$ node server.js
- 6.ubuntu@ip-172-31-36-13:~/coderconnector/backend$ npm install pm2 -g -> help to run 24/7
- 7.ubuntu@ip-172-31-36-13:~/coderconnector/backend$ pm2 start server.js
  extra cmd->pm2 list, pm2 log , pm2 flush name(server) , pm2 delete name ,
  ubuntu@ip-172-31-36-13:~/coderconnector/backend$ pm2 start server.js --name "backend"
- 8.now i have to map the /api to 3000 with the help of ngnix
  ubuntu@ip-172-31-36-13:~/coderconnector/backend$ sudo nano /etc/nginx/sites-available/default
  server_name 13.60.37.69;
  fill the server name , location /api/ {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  }
- 9.ubuntu@ip-172-31-36-13:~/coderconnector/backend$ sudo systemctl restart nginx
