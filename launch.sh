
pushd .

cp ./coffee.test.com /usr/local/openresty/nginx/conf/sites-enabled/

cd /usr/local/openresty/nginx/ && sbin/nginx -s stop && sbin/nginx -c  "$(pwd)/conf/nginx.conf" 

popd 
