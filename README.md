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
#### Installation
Install app from [here](https://github.com/Lerato029/thabisababyhouse) into your local machine.

Then create .env.local file to add sensitive data
![13 add vars](https://user-images.githubusercontent.com/79574031/124834124-816a4c80-df7f-11eb-9e1e-872a9cd97656.PNG)

<a name="hide"/>  

#### Environment Variables

#### `PAYPAL_CLIENT_ID`
Sign up with paypal and create sandbox account [here](https://developer.paypal.com/classic-home/)

![2 login to dash board](https://user-images.githubusercontent.com/79574031/124834303-d017e680-df7f-11eb-86f4-88fb724240ee.PNG)

Create APP
![3 create app](https://user-images.githubusercontent.com/79574031/124835374-8203e280-df81-11eb-990d-56114785b555.PNG)

Navigate to app link and see client id there
![click on app link](https://user-images.githubusercontent.com/79574031/124835489-b37cae00-df81-11eb-8f5c-5105147d18af.PNG)
![get client id](https://user-images.githubusercontent.com/79574031/124835499-b9728f00-df81-11eb-9ae3-d209e817cf29.PNG)


#### MAILCHIMP
Sign up with mail chimp [here](https://login.mailchimp.com/signup/) to get

`MAILCHIMP_AUDIENCE`

Navigate to audience then all contacts. Hover over settings tabs and select audience names and defaults to get audience id.

![7 audience](https://user-images.githubusercontent.com/79574031/124835947-69e09300-df82-11eb-9fb6-26763ce81e44.PNG)

![8 audience names and defaults get client id](https://user-images.githubusercontent.com/79574031/124835959-6cdb8380-df82-11eb-8022-a05849472935.PNG)

`MAILCHIMP_API_KEY`

Go to this [page](https://mailchimp.com/help/about-api-keys/) to be directed to page where you can generate API key

![9 get to page to generate api key](https://user-images.githubusercontent.com/79574031/124836262-fc813200-df82-11eb-967b-ee28f3b19e8a.PNG)

![10 api keys](https://user-images.githubusercontent.com/79574031/124836225-e7a49e80-df82-11eb-904b-8f22737747ba.PNG)

`MAILCHIMP_API_SERVER`
the last 3 numbers on API key are the API server key an example would be us6


#### `MONGODB_URI`
Create account on [mongoDB](https://www.mongodb.com/), create new project, new user and password. Then head to clusters and click on connect.
![11 mongo db uri](https://user-images.githubusercontent.com/79574031/124836721-c09a9c80-df83-11eb-8417-2470371baea4.PNG)

See connection URI and append password where indicated and you can change default database name to something else
![12 make sure you have user for cluster and add user password to where specified](https://user-images.githubusercontent.com/79574031/124836823-ef187780-df83-11eb-9499-219599dced95.PNG)


#### TOKENS
You can assign any value to `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`


#### CLOUDINARY
For environment variables needed to be exposed to the browser NEXT_PUBLIC is appended to the beginning of the key. Sign up for free [here](https://cloudinary.com/) with cloudinary

`NEXT_PUBLIC_CLOUD_NAME`

![name](https://user-images.githubusercontent.com/79574031/124837422-115ec500-df85-11eb-97e0-9d2ae737d4c7.jpg)

`NEXT_PUBLIC_CLOUD_API`

Get image upload URL from API base URL drop down

![Inkedconfig_cloudinary api url no api keys_LI](https://user-images.githubusercontent.com/79574031/124837182-a3b29900-df84-11eb-9735-d7c5d2bd86ff.jpg)


`NEXT_PUBLIC_CLOUD_UPDATE`

Upload preset can be created on settings section of your dashboard

![upload preset](https://user-images.githubusercontent.com/79574031/124836865-05263800-df84-11eb-8f49-5bedc977c0f2.PNG)



<a name="manual"/>  

## `Manual`
#### Install Node Modules
![14 install node modules](https://user-images.githubusercontent.com/79574031/124837577-5e429b80-df85-11eb-958c-f20af561c315.PNG)

#### Run npm start to run app
![15 npm start](https://user-images.githubusercontent.com/79574031/124837649-8631ff00-df85-11eb-8fa6-0b129c08f692.PNG)

#### Landing Page
![16 landing page](https://user-images.githubusercontent.com/79574031/124837684-9f3ab000-df85-11eb-8391-cb5808142bdd.PNG)

#### You can sign in
![17 sign up form](https://user-images.githubusercontent.com/79574031/124837714-b11c5300-df85-11eb-9af1-83233501e5f9.PNG)

#### You can sign up 
![18 sign up](https://user-images.githubusercontent.com/79574031/124837776-d7da8980-df85-11eb-9bc4-ed6401ba5fe9.PNG)

#### Loading component for async functions
![19 loading](https://user-images.githubusercontent.com/79574031/124837874-ffc9ed00-df85-11eb-8d8f-634ccf0da352.PNG)

#### Toast components for error and success messages
![20 success](https://user-images.githubusercontent.com/79574031/124837924-1b34f800-df86-11eb-8919-da9f0af6935c.PNG)

#### Config root account on MonogoDB
Go back to MongoDB account and navigate to collection on clusters. Update a user to root true and role to admin
![21 navigate to clusters then collections in mongodb](https://user-images.githubusercontent.com/79574031/124838075-64854780-df86-11eb-8287-37855f1a9ac6.PNG)
![22 set root to true and role to admin](https://user-images.githubusercontent.com/79574031/124838083-67803800-df86-11eb-92ce-09e9582d111e.PNG)

## Admin Account features:
#### Create products
![23 create product](https://user-images.githubusercontent.com/79574031/124838677-9f3baf80-df87-11eb-96bc-791e5c10824d.PNG)

images uploaded to Cloudinary API and url stored to database
![23 upload images](https://user-images.githubusercontent.com/79574031/124838785-d8741f80-df87-11eb-9a79-6fab21a7f6de.PNG)
![24 add other fields](https://user-images.githubusercontent.com/79574031/124838818-e75ad200-df87-11eb-83b4-5fc1e3e028f6.PNG)
![25 create](https://user-images.githubusercontent.com/79574031/124838841-ed50b300-df87-11eb-9f25-05ebc56f5e7b.PNG)

#### Create, Update, Delete amd Read categories
![26 can crud categories](https://user-images.githubusercontent.com/79574031/124838861-f80b4800-df87-11eb-9b75-e1e104278c98.PNG)

#### Edit and Delete products
![29 able to delete all products on database](https://user-images.githubusercontent.com/79574031/124839016-46204b80-df88-11eb-885e-15f76831aed2.PNG)

update
![30 update product](https://user-images.githubusercontent.com/79574031/124839058-5afcdf00-df88-11eb-8364-7b299178b3ac.PNG)

#### View users, applications and orders
Orders and applications can be updated to delivered or approved when clicking on more link.
![40 admin](https://user-images.githubusercontent.com/79574031/124839415-0a39b600-df89-11eb-8fce-ef547b115fc3.PNG)

#### Update and Delete users
![42 update to admin](https://user-images.githubusercontent.com/79574031/124839601-5d136d80-df89-11eb-9b8b-87a75bf12fc9.PNG)
![41 delete users](https://user-images.githubusercontent.com/79574031/124839611-61d82180-df89-11eb-9589-ce3fc283157f.PNG)

## User Account features:

#### Subscribe to mailing list
![27 subscribe](https://user-images.githubusercontent.com/79574031/124838958-29841380-df88-11eb-8ccf-8285671eb451.PNG)
![28 response](https://user-images.githubusercontent.com/79574031/124838999-3d2f7a00-df88-11eb-8887-1c350a24d52b.PNG)

#### Apply to be be enlisted as volunteer
![32 real apply to volunteer other was donation](https://user-images.githubusercontent.com/79574031/124839257-bd55df80-df88-11eb-8f7b-d818588c9864.PNG)


#### Donate
![31 apply to volunteer](https://user-images.githubusercontent.com/79574031/124839176-9bf4f380-df88-11eb-878a-9894ce257c3f.PNG)
![31 paypal button](https://user-images.githubusercontent.com/79574031/124839248-b929c200-df88-11eb-8939-e25fa2114a3e.PNG)

#### Shop
![34 add to cart and go to cart](https://user-images.githubusercontent.com/79574031/124839307-d78fbd80-df88-11eb-9c21-8b74edf92d3a.PNG)
![35 cart](https://user-images.githubusercontent.com/79574031/124839315-dd859e80-df88-11eb-8ce5-77a4cf6ad8b7.PNG)
![36 cart details](https://user-images.githubusercontent.com/79574031/124839325-e0808f00-df88-11eb-9713-f3cc867b1336.PNG)
![37 pay now](https://user-images.githubusercontent.com/79574031/124839328-e2e2e900-df88-11eb-82bd-4152c2705016.PNG)
![38 success](https://user-images.githubusercontent.com/79574031/124839343-e6767000-df88-11eb-9586-ca2b6cd20f83.PNG)

#### Profile
can also upload image here, view applications and orders as well
![39 profile](https://user-images.githubusercontent.com/79574031/124839497-30f7ec80-df89-11eb-90ad-f32cd80f75e0.PNG)


         
<a name="test"/>  

## `Running Tests`
Make sure server is running and on a different terminal run `npm run test` and the following tests will run:
-Snapshot test to see if subscribe form renders correctly
-A API Route Unit Test testing the mailList module that adds users to the mailing list
-Client Module Unit Test testing getDate module that sends GET requests to REST API
 ![001_make sure you run app first](https://user-images.githubusercontent.com/79574031/124840471-5a197c80-df8b-11eb-83f1-1ad5487c9d07.PNG)
![run tests](https://user-images.githubusercontent.com/79574031/124840479-5ab21300-df8b-11eb-998b-c6dead91f6d2.PNG)
        
<a name="security"/>  

## `Security`
the structure of the application allows for safety of sensitive information and API keys which have been hidden in the .env.local file as shown in the config files above. 
#### Hashing
passwords are not just saved in their raw state but are hashed with bcrypt for better security.
![hashing](https://user-images.githubusercontent.com/79574031/124820964-69d69800-df6e-11eb-8394-dc0713a4fb37.PNG)
![timing attacks](https://user-images.githubusercontent.com/79574031/124830294-f33f9780-df79-11eb-8bdb-51656d3d64d0.PNG)


#### JSON WEB Tokens
Tokens generated with jwt to authenticate users in the auth middlware function.
![auth middleware](https://user-images.githubusercontent.com/79574031/124830010-9d6aef80-df79-11eb-9d77-04e2e4fc46c5.PNG)

#### MongoDB
MongoDB has secure features allowing to retrieve data from database but excluding sensitive information like passwords
![exlude passwords when reading data from users collections](https://user-images.githubusercontent.com/79574031/124833471-85499f00-df7e-11eb-82bd-1781b40f9d0d.PNG)



<a name="deployment"/>  

## `Deployment`
Since the application was created with Next.js which serves pages rendered from the server-side the client and server were deployed together using [Vercel(https://vercel.com) who happen to be the creators of Next.js and provid ease in adding environment variables on deployment.
Link to deployed app can be found [here](https://thabisa-baby-house.vercel.app/)

<a name="credits"/>

## `Credits`

 * Author: [Lerato Mokgwabona](https://github.com/Lerato029)

#### References
Hovhannisyan, R., 2020. How to validate an email address in JavaScript. [Online] 
Available at: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
[Accessed 6 July 2021].
Madu, M. F., 2021. Loading Animation For Website using HTML & CSS. [Online] 
Available at: https://codepen.io/fadzrinmadu/details/poeZNvq 
[Accessed 7 July 2021].


