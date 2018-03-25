# Nearby shops App

## Idea of the app

This is an app that lists shops nearby.

### Features

  - As a User, I can sign up using my email & password
  - As a User, I can sign in using my email & password
  - As a User, I can display the list of shops sorted by distance
  - As a User, I can like a shop, so it can be added to my preferred shops
      Acceptance criteria: liked shops shouldn’t be displayed on the main page
  - As a User, I can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours
  - As a User, I can display the list of preferred shops
  - As a User, I can remove a shop from my preferred shops list

## Getting Started

### Technologies Used

- Java/Spring :
  - Backend : Spring Boot
  - Frontend : Angular 4
  - Database : MongoDB

### Application Data

A MongoDB dump with ~300 shops is provided. To import the data, you need to extract the zip file then execute the command below :

```
mongorestore --db shops shops/
```
→ → A shop database will be created with a shops collection.

→ → Dump File : [here](https://github.com/hiddenfounders/web-coding-challenge/blob/master/dump-shops.zip)

Next, we create a 2dsphere index, which supports geolocation queries over spherical spaces.

```
use shops
db.shops.createIndex( { location : "2dsphere" } )
```
Once this is set up, we can issue location-based queries, in this case using the ‘geoNear’ to get list of shops sorted by distance

## Build Application

Download and unzip the Application source repository , or clone it using Git: 
```
git clone https://github.com/Rachidba/Nearby-Shops-App.git
```

### Spring Boot API
You can deploy Spring Boot API with Maven Or with an IDE.

I workerd with IntelliJ IDEA 2017.3.5 (Community Edition).

Open Projetc with IntelliJ IDEA

Import maven dependencies:
Project > [your project name] > right click > Maven > Reimport

### Angular Client

```
cd angular-client
npm install 
ng build
ng build --prod
ng serve
```

