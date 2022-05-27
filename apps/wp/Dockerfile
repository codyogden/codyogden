FROM composer as vendor
ARG ACF_PRO_LICENSE=$ACF_PRO_LICENSE

ENV ACF_PRO_LICENSE=$ACF_PRO_LICENSE

WORKDIR /build

COPY composer.json composer.json
COPY composer.lock composer.lock

RUN composer install --no-interaction

FROM wordpress:php8.0 as production

WORKDIR /var/www/html

COPY --from=vendor /build .
COPY ./wp-content ./wp-content
COPY ./wp-config.php .

# Remove default `wp-content` dir & files
RUN rm -rf /usr/src/wordpress/wp-content
