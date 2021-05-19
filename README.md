
## Installation:

Make sure your machine has installed [Angular CLI](https://angular.io/guide/setup-local), [Docker](https://docs.docker.com/get-docker/), [Node](https://nodejs.org/en/) 

Clone the project, the run:

```bash
docker build -t finlex-lists:dev . 
```
```bash
docker run -v ${PWD}:/app -v /app/node_modules -p 4201:4200 --rm finlex-lists:dev
```
### Important to note:

API provided in the task description [Dummy Rest API](http://dummy.restapiexample.com/) has it's limitations. For example when you do some changes on objects (POST, PUT, DELETE) you receive 200 Success but the database is not updated. So next time you call for all data, it will be the same as inital data.