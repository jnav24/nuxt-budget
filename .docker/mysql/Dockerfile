FROM mysql:5.7
ENV MYSQL_ROOT_PASSWORD=root
COPY ./.docker/mysql/init.sql /docker-entrypoint-initdb.d/
