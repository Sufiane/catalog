# CATALOG API

### Context

Small Catalog API project using nest.js & sqlite as DB.

This API allows you to see and buy products from a catalog.

Some products are only available for connected users, others are available for all users.


### Features

- Authentication using JWT
- Get all products
- get one product
- Add products to cart
- get user cart
- update product quantity in cart
- delete product from cart

> The DB is already populated with users, to have an authorized access use one of the following credentials:
```json
{
	"email": "jeanmichel@airweb.fr",
	"password": "1bonjour"
}
```
_PS: all users use the same password format: `id + bonjour`_

### Installation

First install dependencies:

```
npm ci
```

Then run the server:

```
npm run start
```

a debug version is also available:

```
npm run start:dev
```

It will allow you to have startup logs and to see the server errors.

a production ready version is also available:

```
npm run start:prod
```

It'll build the project (compile ts files) and run the server.


### Calls examples

> Those curl calls can be imported in your Insomnia workspace, Postman or used directly in your terminal.

> For all calls requiring authentication, you need to provide the JWT token in the header.
> The following example will use an already existing JWT, if not working yuo should log yourself in and use the returned JWT.

###### Login:

_User a different user as you please_

```
curl --request POST \
--url http://localhost:3000/auth/login \
--header 'Content-Type: application/json' \
--data '{
"email": "jeanmichel@airweb.fr",
"password": "1bonjour"
}'
```

###### Get all public products:

```
curl --request GET \
--url http://localhost:3000/products
```

###### Get all private products:

```
curl --request GET \
--url http://localhost:3000/products/authenticated \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqZWFubWljaGVsQGFpcndlYi5mciIsImlhdCI6MTY1MDI4MTg3OCwiZXhwIjoxNjU1NDY1ODc4fQ.cdJOhqyNWZPdahO4c0pJzyzzZR-QDt4kRDsr7s-wVnY'
```

###### Add to cart:

_Change the productId and quantity as you please_

```
curl --request POST \
--url http://localhost:3000/carts \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqZWFubWljaGVsQGFpcndlYi5mciIsImlhdCI6MTY1MDI4MTg3OCwiZXhwIjoxNjU1NDY1ODc4fQ.cdJOhqyNWZPdahO4c0pJzyzzZR-QDt4kRDsr7s-wVnY' \
--header 'Content-Type: application/json' \
--data '{
"productId": 2,
"quantity": 10
}'
```

###### Get User cart:

```
curl --request GET \
--url http://localhost:3000/carts \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqZWFubWljaGVsQGFpcndlYi5mciIsImlhdCI6MTY1MDI4MTg3OCwiZXhwIjoxNjU1NDY1ODc4fQ.cdJOhqyNWZPdahO4c0pJzyzzZR-QDt4kRDsr7s-wVnY'
```
