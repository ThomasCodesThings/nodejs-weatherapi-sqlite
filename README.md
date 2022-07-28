# Weather API with SQLite3 database

Get basic information about weather(temperature, wind, rain, etc.) on any coordinates. Runs on Node.js v16, Express, and SQLite3. Uses mocha and chai for testing.

## Usage
`ip_address:3456/api/weather/?lat=52.520008&lon=13.404954`

`api/weather/` - base route
`lat` - latitude, must be a number in range <-90,90>
`lon` - longitude, must be a number in range <-180, 180>

### Output
#### Successful output
JSON object like:
``` {"coordinates{"lat":52.520008,"lon":13.404954},temperature":12.650000000000034,"wind":{"speed":0.89,"degree":231,"direction":"SW"},"time":"Thu, 28 Jul 2022 04:29:06 GMT","clouds":0,"rain":0,"humidity":71,"snow":0,"location":{"city":"Mitte","country":"DE"},"id":2}```
Usual response code is 200 (OK).
##### Details
`coordinates.lat` - latitude coordinate
`coordinates.lon` - longitude coordinate
`temperature` - temperature in °C
`wind.speed` - measured wind speed (in meters per second)
`wind.degree` - wind degree (used to calculate wind direction)
`wind.diretion` - wind direction
`time` - local time when was this weather measured
`clouds` - cloudness, %
`rain` - rain volume past 1 hour, mm
`snow` - snow volume past 1 hour, mm
`humidity`- humidity, %
`location.city`- city name if known, if not its 'Unknown'
`location.country` - country shortcut if known, if not its 'Unknown'
`id` - id of saved object in sqlite3 database

#### Unsuccessful output
`{"error":"Lon must be a number between -180 and 180"}`
Error with message that specifies what went wrong, usual response code is 400 (Bad Request).

### Installation guide:
#### Before you start

    mkdir <project_dir>
    git clone https://github.com/ThomasCodesThings/DjangoPostManager.git <project_dir>
    cd <project_dir>

 - [Docker installation](#docker)
 - [Linux installation](#linux)

### Versions
| Version | Changes |
|--|--|
| 1.0 | first working version |

## Docker
 0. [Before you begin](#0-before-you-begin)
 1. [Install Docker and Docker Compose](#1-install-docker-and-docker-compose)
 2. [Build an Docker Image](#2-build-an-docker-image)
 3. [Run a docker container](#3-run-a-docker-container)

### 0. Before you begin
Update your list of available packages to get most recent version

    sudo apt update

### 1. Install Docker and Docker Compose
#### Remove old docker containers in your system
    sudo apt-get remove docker docker-engine docker.io
#### Install Docker and Docker Compose
```
apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
#### For windows just download [Docker desktop](https://www.docker.com/get-started/)

### 2. Build an Docker Image

    docker build -t <app_name>:<version> .
For example **docker build -t nodejs-weatherapi-sqlite:1.0 .**
Now when build runs successfully you should see following image in your **docker images**

     REPOSITORY                   TAG       IMAGE ID       CREATED         SIZE
	 nodejs-weatherapi-sqlite     1.0       4b00b14bcf57   10 hours ago    953MB
    
### 3. Run a docker container

    docker run -p 3456:3456 --name nodejs-weatherapi-sqlite <IMAGE_ID>
   You should see following output:

    > start
	> node server.js

	Sqlite3 database started
	Server started on port 3456

### Notes
You can run it locally with

    npm start

 ## Testing
 There are 24 tests written with mocha and chai
 To run these tests run
 

    npm test
**Output**

    
    > test
    > mocha --timeout 10000
    
    Sqlite3 database started
    Tested with input parameters:
    Lat: 67.23
    Lon: 18.88
    Server started on port 3456
    
    
      Weather API
        GET /api/weather
          With valid input
            √ expect to return a code 200 response
            √ response body is expected to be an object
            √ response body is expected to have all properties
            √ all base parameters should have its expected type
            √ check coordinates object to have its expected values and types
            √ check temperature to have its expected type
            √ check wind object to have its expected values and types
            √ check if clouds have its expected type
            √ check if rain have its expected type
            √ check if humidity have its expected type
            √ check if snow have its expected type
            √ check if location have its expected type
            √ check time to have its expected type
            √ check _id to have its expected type
            √ check if data were saved correctly to database
          With invalid input
            √ expect to return a 400 response with error message about missing lat and lon parameters
            √ expect to return a 400 response with error message about missing lat parameter
            √ expect to return a 400 response with error message about missing lon parameter
            √ expect to return a 400 response with error message about invalid lat data type (given data type of not Number)        √ expect to return a 400 response with error message about invalid lon data type (given data type of not Number)        √ expect to return a 400 response with error message about invalid lat and lon data type (given data type of not Number)
            √ expect to return 400 response with error message about invalid range of lat parameter
            √ expect to return 400 response with error message about invalid range of lon parameter
            √ expect to return 400 response with error message about invalid range of lat and lon parameter
    
    
      24 passing (291ms)

 
