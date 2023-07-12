.PHONY: build
build:
	docker compose build

.PHONY: up
up:
	docker compose up

.PHONY: nginx-logrotate
nginx-logrotate:
	docker compose exec nginx /nginx-logrotate.sh

.PHONY: mysqldumpslow
mysqldumpslow:
	bash -c 'mysqldumpslow <(docker exec webapp-mysql-1 cat /var/log/mysql/mysql-slow.log)'

.PHONY: stats
stats:
	docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

.PHONY: test
test:
	-docker compose exec mysql rm /var/log/mysql/mysql-slow.log
	docker compose exec mysql mysqladmin -uroot -proot flush-logs
	ab -c 4 -t 30 http://localhost/
