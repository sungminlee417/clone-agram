# Instagram Clone

<!-- ABOUT THE PROJECT -->

a

## About The Project

This application is an Instagram clone featuring both backend and frontend technologies using the PERN stack.

[![Instagram-Clone](/README-Resources/splashpage.png "Instagram Clone")](https://clonagram.onrender.com//)
![Instagram-Clone](/README-Resources/homepage.png "Instagram Clone")

### Posts

Users can view all posts created by all users. Users can also upload posts that they can share with the world. Users have the ability to edit and delete their own posts as well.

### Interact

Users have the ability to view, comment on, and/or like other user's posts. Users can also subscribe/follow other user's to see those user's posts on their homepage.

### AWS

Amazon's Web Service's Simple Cloud Service (S3) is implemented in the backend, and is used to store images uploaded by users.

## Technologies

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/en/2.2.x/)
- [Postgres](https://www.postgresql.org/)
- [SQLAlchemy](https://www.sqlalchemy.org/)

<!-- GETTING STARTED -->

## Setup

Clone repository

```bash
https://github.com/sungminlee417/instagram-clone.git
```

Install dependencies

```bash
pipenv install -r requirements.txt
```

Create a **.env** file based on the example to set up local environment variables.

Run the following lines of code to properly start up the Flask application.

```bash
pipenv shell
flask db upgrade
flask seed all
flask run
```

To start up the React app, run the following lines of code inside the react-app folder.

```bash
npm install
npm start
```
