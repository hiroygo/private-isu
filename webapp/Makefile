.PHONY: up
up:
	docker compose up

.PHONY: nginx-logrotate
nginx-logrotate:
	docker compose exec nginx /nginx-logrotate.sh

.PHONY: mysqldumpslow
mysqldumpslow:
	mysqldumpslow ./logs/mysql/mysql-slow.log
