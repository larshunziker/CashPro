# On CI systems like jenkins we need a way to run multiple testings at the same time. We expect the
# CI systems to define an Environment variable CI_BUILD_TAG which uniquely identifies each build.
# If it's not set we assume that we are running local and just call it rasch-stack.
CI_BUILD_TAG ?= rasch-stack

docker-compose = docker-compose --project-name $(CI_BUILD_TAG) --file docker-compose.ci.yaml
docker-compose-exec = $(docker-compose) exec -T --env CHANGE_TITLE="$(CHANGE_TITLE)"

ci.up:
	# During CI we need .git folders within the DockerImage, but they are ignored usually (which is good)
	# so we ignore the dockerignore for building
	mv .dockerignore .dockerignore.ignore
	$(docker-compose) up --build -d
	mv .dockerignore.ignore .dockerignore
	touch $@

ci.persistgraphql:
	$(docker-compose-exec) node yarn run persistgraphql:all

.PHONY: ci.lint
ci.lint: ci.up
	$(docker-compose-exec) node yarn run lint:ci

.PHONY: ci.cd.lint
ci.cd.lint: ci.up
	$(docker-compose-exec) node yarn run lint:cd

.PHONY: ci.test
ci.test: ci.up
	$(docker-compose-exec) node yarn run test:ci

.PHONY: ci.down
ci.down:
	$(docker-compose) down -v
	$(MAKE) clean

.PHONY: ci.ci
ci: ci.up ci.persistgraphql ci.lint ci.test

.PHONY: clean
clean:
	rm ci.up