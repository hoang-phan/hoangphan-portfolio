# Hoang Phan Portfolio Website

My personal portfolio website, featuring NextJS and ThreeJS

## Development

To install the project, clone it then run

```sh
yarn install
```

Copy local env example and replace it with your credentials

```sh
cp .env.local.example .env.local
```

Run the development server:

```sh
yarn dev
```

**NOTE**: This project is meant to build with local backend at https://github.com/hoang-phan/hoangphan-portforlio-admin. You need to ensure your local backend is running, and modify the url in `.env.local`

```
NEXT_PUBLIC_API_URL="http://{yourlocalbackendurl}"
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

To build project, run

```
yarn build && yarn next export
```

Deploy the built static files in `out/` directory in any static site hosting.