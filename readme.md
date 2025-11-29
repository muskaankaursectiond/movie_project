# CPAN 212 – Final Project: Movies App

**Course:** CPAN 212 – Modern Web Technologies  
**Student Name:** Muskaan kaur
**Student Number:** N01711386  

This project is a full-stack **Movies Application** built using **Node.js, Express.js, Pug templates, MongoDB, and Mongoose**.  
It includes full **CRUD operations**, **user authentication**, and **route protection**, following all requirements of the CPAN 212 Final Project.



## Live Deployment (Render)
**Live App:** https://YOUR-RENDER-URL.onrender.com  


##  GitHub Repository
https://github.com/muskaankaursectiond/movie_project  


##  Features Implemented
## 1. Express Application with Pug Templates  
Server-side rendering using Pug for all pages.

## 2. MongoDB + Mongoose  
Movie model includes:
- name  
- description  
- year  
- genres  
- rating  
- user (who created it)

## 3. CRUD (Create, Read, Update, Delete) Movies  
- Add movie  
- Edit movie  
- Delete movie  
- Movie details page (`/movies/:id`)

## 4. User Authentication  
- Registration  
- Login  
- Logout  
- Sessions stored securely  
- Passwords hashed

## 5. Route Restrictions  
- Only logged-in users can add movies  
- Only the owner of the movie can edit or delete  
- Protected routes using middleware

## 6. Form Validation & Error Messages  
Errors are displayed on Pug pages.

## 7. Deployment  
App deployed using **GitHub + Render (free)**.



##  Technologies Used
- Node.js  
- Express.js  
- Pug template engine  
- MongoDB (Atlas)  
- Mongoose  
- Express-session  
- bcryptjs  
- Render (deployment)  


##  Installation Instructions (Local Setup)

## Clone repository
```bash
git clone https://github.com/muskaankaursectiond/movie_project
cd movies-project
