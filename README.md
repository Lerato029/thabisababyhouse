# Software requirements documentation
### Thabisa Baby House 

**The Thabisa Baby House website will be a full-stack MERN application that will provide a platform for the public to contribute to aiding the NPO in providing a warm shelter, support, and care for abandoned babies while they wait for their permanent homes. It will also provide the governing body of the baby house more freedom to edit the information they want to be shown on the website.**

## `Table of Contents`  

[System Architectre](#architecture)  
[System Requirements](#requirements) 
[Configuration](#config)
[Environment Variables](#hide)
[Manual](#manual)
[Testing](#test)
[Security](#security)
[Deployment](#deployed) 
[Credits](#credits)  

<a name="architecture"/>  

## `System Architectre`

Node and React are used for the  backend and frontend respectively as they both use Javascript thus making the development process easier and 
MongoDB will be used for the API as it is cloud-based, scalable, and flexible. Next.js will be used to take advantage of the power of React while providing pages that will be rendered on the server and load faster to provide users with a pleasing experience on the dynamic site. 
Next.js also provides SEO (Search Engine Optimization) ready sites to increase the visibility of the website on relevant searches ease in deployment with Vercel. Bootstrap will be used due to its responsive and beautiful templates.

<a name="requirements"/>

## `System Requirements`

The Thabisa Baby House website is a platform to allow the baby house to manage its funding scheme and a platform for volunteers, donors, and the general public to be informed on how they can contribute to supporting abandoned babies during their journey towards finding permanent homes.
 It is based on the current website (found at: http://thabisababyhouse.co.za/ )  for the baby house which is currently static and in need of a revamp. It will allow ease for the admin in editing, updating donation packages, and managing donors and volunteers. 
Users won’t be just given the opportunity to read the information on the website but will be given opportunities to sign up and become members who can either purchase merchandise sold by the baby house, donate or sign up for volunteering. The WWF website (found at: https://www.worldwildlife.org/ ) has similar functionality as users are able to log in to an account, donate or purchase adopt packages and merchandise to contribute towards the conservation of wildlife.

#### Functional Requirements

The functional requirements are as follows:

 * Login/sign-up functionality
 * Users should be able to add, delete products for sale to their orders.
 * Users should be able to make online payments through PayPal or confirm order and pay through cash.
 * Users should have a list of previous orders/payments made through the website.
 * Users should be able to create, updated, and view their profiles on the website.
 * Users should be able to apply to volunteer to help.
 * There should be an admin account for the governing body of the baby house to be able to make changes to the information served on the website.
 * Admin account should allow a user to create, update or delete products available to be purchased.
 * Admin account should allow a user to change delivery statuses for orders made by other users.
 * The Admin account should allow the user to make changes to the other user's accounts as well as allocate admin roles to other users who might be a part of the staff.

#### Non-Functional Requirements

The non-functional requirements are as follows:

 * Data such as purchases, account details, and any other information on the website will be stored on a database.
 * The website should be easy to use and cater to different types of users.
 * The website should be easily deployed.
 * Javascript is the language chosen due to its popularity and can be implemented in the MERN stack to create powerful dynamic websites with ease and speed.
 * The website should be SEO ready and pages should be rendered on the server to provide fast performing website thus providing a pleasing experience for users even on a dynamic website.
 * The website should be responsive so that users can access the website on their mobile devices as well as on their desktop/laptop devices.
 
#### User Stories

![01](https://user-images.githubusercontent.com/79574031/120489236-c5ce5f80-c3b7-11eb-832e-0b861b4e7d25.PNG)
![02](https://user-images.githubusercontent.com/79574031/120489281-ce269a80-c3b7-11eb-8d03-494dbdde2d07.PNG)
![03](https://user-images.githubusercontent.com/79574031/120489310-d2eb4e80-c3b7-11eb-9a13-ebe5eb7f5a49.PNG)
![04](https://user-images.githubusercontent.com/79574031/120489324-d67ed580-c3b7-11eb-81fd-e7b23ba9a8b6.PNG)
![image](https://user-images.githubusercontent.com/79574031/124814889-d483d580-df66-11eb-99dd-0302c3c54b9d.png)
![06](https://user-images.githubusercontent.com/79574031/120763986-0c3ad000-c518-11eb-98da-2b352c0212cf.PNG)
![07](https://user-images.githubusercontent.com/79574031/120489389-e1396a80-c3b7-11eb-84a2-3d933c79ba84.PNG)
![08](https://user-images.githubusercontent.com/79574031/120489402-e4345b00-c3b7-11eb-9752-f29bf8b20d1b.PNG)


<a name="config"/>  

## `Configuration`
#### JSON WEB Tokens

<a name="manual/>  

## `Manual`
#### JSON WEB Tokens
         
<a name="test/>  

## `Running Tests`
#### JSON WEB Tokens
         
<a name="security"/>  

## `Security`
the structure of the application allows for safety of sensitive information and API keys which have been hidden in the .env.local file as shown in the config files above. For environment variables needed to be exposed to the browser NEXT_PUBLIC is appended to the beginning of the key.

#### Hashing
passwords are not just saved in their raw state but are hashed with bcrypt for better security.
![hashing](https://user-images.githubusercontent.com/79574031/124820964-69d69800-df6e-11eb-8394-dc0713a4fb37.PNG)
![timing attacks](https://user-images.githubusercontent.com/79574031/124830294-f33f9780-df79-11eb-8bdb-51656d3d64d0.PNG)


#### JSON WEB Tokens
Tokens generated with jwt to authenticate users in the auth middlware function.
![auth middleware](https://user-images.githubusercontent.com/79574031/124830010-9d6aef80-df79-11eb-9d77-04e2e4fc46c5.PNG)

#### MongoDB
MongoDB has secure features allowing to retrieve data from database but excluding sensitive information like passwords
![Uploading exlude passwords when reading data from users collections.PNG…]()


<a name="deployment"/>  

## `Deployment`
Since the application was created with Next.js which serves pages rendered from the server-side the client and server were deployed together using [Vercel(https://vercel.com) who happen to be the creators of Next.js and provid ease in adding environment variables on deployment.
Link to deployed app can be found [here](https://thabisa-baby-house.vercel.app/)

<a name="credits"/>

## `Credits`

 * Author: [Lerato Mokgwabona](https://github.com/Lerato029)
