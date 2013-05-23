server {
    listen      80;
    server_name coffee.test.com;
    root        /Users/Blade/codes/gists/coffe_and_processing;

    location / {
        index   index.html index.php;
    }

    location ~* \.(gif|jpg|png)$ {
        expires 30d;
    }
}
