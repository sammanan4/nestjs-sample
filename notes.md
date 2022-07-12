* Creating a new NestJS Project
```
nest new project-name
```

* Generating a new controller
```
nest g controller controller-name
```

* We can use typescript interfaces or classes (DTO => data transfer object in case of NestJS) for Body Params


* Creating a service
```
nest g service service-name
```

* Install mongoose, testing and config module
```
npm i --save @nestjs/config
npm install --save @nestjs/mongoose mongoose
npm i --save-dev @nestjs/testing
```

## JWT Auth

```
npm install --save @nestjs/passport @nestjs/jwt passport passport-jwt
npm install --save-dev @types/passport-jwt
```

```
nest g module auth
nest g service auth
nest g module user
nest g service user
nest g controller auth
```

```
npm i bcrypt
npm i @types/bcrypt
```