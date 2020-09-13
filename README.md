# DubaiBlog

This is a responsive sample blog site showcasing some of Dubai's landmarks. It was built using the MEAN Stack and ParseServer.

## Requirements
Please note that these are the versions used to create the project. You might be able to run it with other versions too.

* npm 6.14.4
* node v10.19.0
* Parse server v2.7.4
* Angular 10

## How to run

Make sure to add an `.env` file to the root of the project

Open a terminal and cd to the project directory.
```
npm install
npm run start 
```
On another terminal:
```
npm run start-back
```

Angular will be running at `http://localhost:4300/`.

The API will be running at `http://localhost:5000/`.
*Make sure to change Angular's `environment` if your `.env`'s `SERVER_URL` differs from `http://localhost:5000/`

Navigate to `http://localhost:5000/dashboard` for the Parse dashboard.

## Other info

Everyone can view the landmarks on the site but only a user with super access (that means they have the Superuser role) can edit them.

The admin can also upload photos for the landmarks (max photo size is 5MB).
