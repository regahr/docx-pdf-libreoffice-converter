<h1 align="center">REST API Service Template</h1>

<div align="center">

Sprout Asia code template for REST API service

</div>

<p align="center">
  <p align="center">
    <a href="https://documenter.getpostman.com/view/17680144/UUy1dmcu">View API Documentation</a>
    ·
    <a href="https://github.com/SproutAsia/rest-service-template/issues">Report Bug</a>
    ·
    <a href="https://github.com/SproutAsia/rest-service-template/issues">Request Feature</a>
  </p>
</p>  

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#guides">Guides</a>
    <ul>
        <li><a href="#route">Route</a></li>
        <li><a href="#middleware">Middleware</a></li>
        <li><a href="#controller">Controller</a></li>
        <li><a href="#funtion">Functions</a></li>
        <li><a href="#unit-test">Unit-test</a></li>
      </ul>
      </li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:SproutAsia/rest-service-template.git
   ```
2. Install NPM packages
   ```sh
   yarn
   ```
3. Create .env based on .env.example
4. Fill local mongo by .jsons under /migration folder 
5. Start the application
   ```sh
   yarn dev
   ```

## Roadmap

- [ ] Earn

## Guides

The structure of this project is ROUTES -> MIDDLEWARE -> CONTROLLER -> FUNCTION -> CONTROLLER.
Every error throwed, must be catched and forwarded to Slack Integration.
Every defined DB collection must have its own respective Model.
Every modules must have its own respective unit test.

### Route
Route is where you setup the uri and mapped its middleware and controller to the module that you developed.
* route/index.js
  ```js
  ...
  router.use('/example', example);
  ...
  ```
* route/example.js
  ```js
  ...
  router.get('/:exampleId', exampleMid.getExample, exampleController.getExample);
  ...
  ```  

### Middleware
Middleware is where you setup the payload validation or authentication validation before it goes to controller.
* middlewares/example.middleware.js
  ```js
  export const ExampleMid = {
    async getExample(req, res, next) {
      const name = 'Get Example';
      try {
        const { authorization } = req.headers;
        if (authorization) {
          <!-- if nothing goes wrong, it goes next to controller -->
          next();
        }
        else {
          const message = 'You\'re not allowed to access this resource without token';
          <!-- MUST BE CATCHED AT CUSTOM ERROR RESPONSE -->
          res.status(401).json(errorResponse('ERROR', '06', message));
          if (process.env.NODE_ENV !== 'test') {
            <!-- MUST BE FORWARDED TO SLACK -->
            await postError(req, name, bugsLevel.MINOR, message);
          }
        }
      }
      catch (error) {
        const { message } = error;
        <!-- MUST BE CATCHED AT CUSTOM ERROR RESPONSE -->
        res.status(500).json(errorResponse('ERROR', '98', message));
        if (process.env.NODE_ENV !== 'test') {
          <!-- MUST BE FORWARDED TO SLACK -->
          await postError(req, name, bugsLevel.MAJOR, message);
        }
      }
    }
  }
  ```
### Controller
Controller is where you pass the data to function and catches any throwed error to be forwarded as custom error message and to Integrated Slack.
* controllers/example.controller.js
  ```js
  export const ExampleController = {
    async getExample(req, res) {
      const name = 'Get Example';
      try {
        const { authorization } = req.headers;
        const data = await ExampleFunc.fetchExampleByToken(authorization.split(' ')[1]);
        if (data) {
          res.status(200).json(okResponse('OK', '00', data, 'Get data successful'));
        }
        else {
          throw new Error('Critical failure, can\'t get data');
        }
      }
      catch (error) {
        const { message } = error;
        let metaResponse = {};
        if (message.includes(customErrorsConfig.INVITATION_NOT_FOUND.message)) {
          metaResponse = customErrorsConfig.INVITATION_NOT_FOUND;
        }
        else
        if (message.includes(customErrorsConfig.REGISTRATION_NOT_FOUND.message)) {
          metaResponse = customErrorsConfig.REGISTRATION_NOT_FOUND;
        }
        else
        if (message.includes(customErrorsConfig.SUBMITTED_REGISTRATION.message)) {
          metaResponse = customErrorsConfig.SUBMITTED_REGISTRATION;
        }
        else
        if (message.includes(customErrorsConfig.INVALIDATED_REGISTRATION.message)) {
          metaResponse = customErrorsConfig.INVALIDATED_REGISTRATION;
        }
        else
        if (message.includes(customErrorsConfig.TOKEN_INVALID.message)) {
          metaResponse = customErrorsConfig.TOKEN_INVALID;
        }
        else
        if (message.includes('Critical')) {
          metaResponse = customErrorsConfig.CRITICAL;
          metaResponse.message = message;
        }
        else {
          metaResponse = customErrorsConfig.UNCATEGORIZED;
          metaResponse.message = message;
        }

        <!-- MUST BE CATCHED AT CUSTOM ERROR RESPONSE -->
        res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
          metaResponse.code,
          metaResponse.message));
        if (process.env.NODE_ENV !== 'test') {
          <!-- MUST BE FORWARDED TO SLACK -->
          await postError(req, name, metaResponse.level, metaResponse.message);
        }
      }
    }
  }
  ```  
### Function
Function is where you code the logic of the actions from the module that you developed.
* functions/example.function.js
  ```js
  export const ExampleFunc = {
    async fetchExampleByToken(token) {
      const decoded = jwt.decode(token);
      if (!decoded) {
        throw new Error(customErrorsConfig.TOKEN_INVALID.message);
      }
      const { code } = decoded;
      if (code) {
        const fetchedData = await ExampleModel.findOne(
            // eslint-disable-next-line no-underscore-dangle
              { code: code }
            );
        return fetchedData    
      } else {
        throw new Error('Critical failure, can\'t continue');
      }
    }
  }
  ```
### Unit-test
To create unit test, you must provide the dummy data first, and then you passed the dummy data as mocked up data to be used by Sinon 
* tests/seeds/dummyData.js
  ```js
  ...
  export const dummyData = {
    DecodedToken: {
      code: 'EXAMPLETOKEN'
    },
    ExampleData: {
      _id: {
        $oid: '614bd625b9392a183a3e6283'
      },
      exampleString: "Just an example"
    },
  }
  ...
  ```
* tests/example.test.js
  ```js
  ...
  const sinon = require('sinon');

  describe('Example API Scenario Testing', async () => {
    let token;

    describe('Get Example', async () => {
      const endpoint = '';
      let sandbox = null;

      beforeEach(() => {
        sandbox = sinon.createSandbox();
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('it should be able to get example if the token is valid ', async () => {
        <!-- EVERY POSSIBLE NEEDED ACTIONS SHOULD BE MANIPULATED  -->
        sandbox.stub(jwt, 'decode').returns(dummyData.DecodedToken);
        <!-- EVERY POSSIBLE NEEDED ACTIONS SHOULD BE MANIPULATED  -->
        sandbox.stub(ExampleModel, 'findOne').returns(dummyData.ExampleData);
        const res = await api.getData('EXAMPLETOKEN', endpoint);
        res.should.have.status(200);
        res.body.should.have.property('code').eql('00');
        res.body.should.be.a('object');
      }).timeout(50000);
    )}
  )}  
  ```      

