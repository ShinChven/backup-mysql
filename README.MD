# Backup MySQL

> MySQL backup application with cron job.
> - Written in Node.js/TypeScript.
> - Support multiple MySQL servers and databases.
> - Dockerized.

![Pull count badge from shields.io](https://img.shields.io/docker/pulls/shinchven/backup-mysql?style=for-the-badge)
![Size badge from shields.io](https://img.shields.io/docker/image-size/shinchven/backup-mysql?style=for-the-badge)


## Config Before Start

Copy `config-example.yml` to `config/config.yml` and edit it.

```yml
cronTime: "*/5 * * * *"     # Cron time for backup task
defaultKeep: 7              # Default number of keep backups
outputDir: backups          # Output directory for backups
instances:                  # Instances to backup
  - host: 127.0.0.1         # Hostname or IP address of MySQL server
    port: 3306              # Port of MySQL server
    user: root              # Username of MySQL server
    password: P@ssw0rd      # Password of MySQL server
    databases:              # Databases to backup
      - name: database_name # Database name to backup
        keep: 5             # Number of keep backups for this database
```

**Note:** If the config file was changed, you should restart the application or container to reload configuration.

## Run as a Docker Container

### 1. Create a `docker-compose.yml` file:

```yml
version: "3.8"

services:
  BackupMySQL:
    image: shinchven/backup-mysql
    container_name: backup-mysql
    restart: always
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - ${PWD}/config:/usr/src/app/config   # Config file directory
      - ${PWD}/backups:/usr/src/app/backups # Backup file directory
```

### 2. Deploy The container:

```bash
docker-compose up -d
```

## Run The Application Directly

### Prerequisites

Install the following software:
- Bash or other shell, Windows is not supported
- MySQL Client
- gzip
- NodeJs
- ts-node

### Run

Clone this repository and run the following command:

```bash
npm install     # install dependencies
npm run compile # compile typescript to javascript
npm start       # start the application
```
