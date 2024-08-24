# Variables
DOCKER_COMPOSE_FILE=docker-compose.yml
DOCKER_IMAGE_NAME=app
DOCKER_CONTAINER_NAME=app

# Build the Docker image
build:
	docker-compose -f $(DOCKER_COMPOSE_FILE) build

# Start the container
up:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

# Stop the container
down:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down

# View container logs
logs:
	docker-compose -f $(DOCKER_COMPOSE_FILE) logs -f

# Restart the container
restart:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

# Clean up the Docker image and containers
clean:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes --remove-orphans

# Show the status of containers
status:
	docker-compose -f $(DOCKER_COMPOSE_FILE) ps

# Run a shell inside the running container
shell:
	docker exec -it $(DOCKER_CONTAINER_NAME) sh