server {
        listen 80;
        listen [::]:80;

        root /PATH_TO_PROJECT_FOLDER/api/public;
        index index.php index.html index.htm;

        server_name YOU_DOMAIN_NAME_OR_LOCALHOST;

        location / {
                try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
		try_files $uri /index.php =404;
                fastcgi_split_path_info ^(.+\.php)(/.+)$;
                fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                include fastcgi_params;
        }
}

