server {
    listen      80;
    server_name coffee.test.com;
    root        /home/blade/gists/coffe_processing;

    location / {
        index   index.html index.php;
    }

    location ~* \.(gif|jpg|png)$ {
        expires 30d;
    }
}
