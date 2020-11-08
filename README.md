# Walmart backend

Simple backend server, made for Walmart Challenge.

First of all, copy and configurate .env variables:

```
cp .env.example .env
```

## Install

To install all dependencies, use the following command in the command prompt:

```
npm install
```

## Usage

To start the backend server (run index.js), use the following command in the command prompt:

```
npm start
```

## Testing

To run tests made with jest, use the following command in the command prompt:

```
npm run test
```

## Docker

To create the docker image, use the following command in the command prompt:

```
docker build -t walmart-backend .
```

To run container, use the following command in the command prompt:

```
docker run -d -p 27019:27019 walmart-backend
```
