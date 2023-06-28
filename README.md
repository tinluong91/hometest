# AlphaSense Home Test - TIN TRUNG LUONG <lttinspk@gmail.com>

- [AlphaSense Home Test - TIN TRUNG LUONG lttinspk@gmail.com](#alphasense-home-test---tin-trung-luong-lttinspkgmailcom)
  - [Tasks status](#tasks-status)
    - [React Client](#react-client)
    - [NodeJS backend](#nodejs-backend)
  - [Instructions](#instructions)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Run with docker](#run-with-docker)
    - [Prerequisites](#prerequisites)
    - [Run in the local with docker-compose](#run-in-the-local-with-docker-compose)

## Tasks status

> Completed all tasks

### React Client

- [x] Render simple client using reactjs, apollo client, typescript, bootstrap
- [x] Navigation menu to show all data of (users, posts, comments) with paging
- [x] Click to menu to show detail data
  - [x] Fetch a list of all Users with their email and name.
  - [x] Fetch a list of all Posts with their title and author name.
  - [x] Fetch detailed information for a single Post, including its title, content, author
name, and all comments with their content and author name
  - [x] Create / Update / Delete Posts and Users.
  - [x] Add a comment on the post

### NodeJS backend

- [x] Setup GraphQL server using nodejs, typescipt, graphql, apollo server
- [x] Define schema User, Post, Comment
- [x] Seed the server with mock data for testing purposes. There should be at least the following:
      - 10 Users
      - 3 Posts per User
      - 5 Comments per Post
- [x] Writing unit tests and functional tests for the server.

## Instructions

### Backend

> Setup database
> We can use mongo cloud or from local
> Setup from local: 

```bash
docker-compose up -d 
```

> ENVIRONMENT VARIABLES:
> - PORT=4000 (default)
> - Should create the `.env` file and place the `DATABASE_URL=mongodb://root:prisma@localhost:27017/hometest?authSource=admin` into it

- Change directory to the backend directory

```bash
cd /backend
```

- Install dependencies

```bash
yarn install
```

- Generate prisma client 
```bash
yarn prisma:generate
```
-  Generate typescript types from graphql schema

```bash
yarn codegen
```
- Run in development mode

```bash
yarn dev
```

- Run seed data 
```bash
Seed the server with mock data for testing purposes. There should be at least the
following:
- 10 Users
- 3 Posts per User
- 5 Comments per Pos
```
```bash
yarn seed
```

### Frontend

> ENVIRONMENT VARIABLES:
>
> - `REACT_APP_ENDPOINT=http://localhost:4000` (default)
> - Should create the `.env` file and place the `REACT_APP_ENDPOINT=http://localhost:4000` into it

- Change directory to the frontend directory

```bash
cd packages/client
```

- Install dependencies

```bash
yarn install
```

- Run in development mode

```bash
yarn start
```

- build

```bash
yarn build
```

## Run with docker

To quickly start the application with docker, please use `docker-compose`

### Prerequisites

- Docker 19+
- docker-compose

### Run in the local with docker-compose

- Access into /provision folder
```bash
cd provision
```
- Run seed data demo
```bash
docker-compose exec backend yarn seed
```
- run CMD

```bash
docker-compose up -d
```

- open the application at `http://localhost:8080`
- feel free to change the port (`8080`)

- Review Results

> Client


![alt text](./images/client.png)

> Backend
> 
![alt text](./images/backend.png)
