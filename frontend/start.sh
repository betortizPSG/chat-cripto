#!/bin/ash

file="/usr/share/nginx/html/static/js/main*.js";
sed -i 's^__REACT_APP_SOCKET__^'$REACT_APP_SOCKET'^g' $file;
sed -i 's^__REACT_APP_API__^'$REACT_APP_API'^g' $file;
nginx -g 'daemon off;';