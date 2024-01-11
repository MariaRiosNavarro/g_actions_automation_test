# g_actions_automation_tests

## Setup

```javascript

npm init -y

npm i express mongoose dotenv cors 

npm i -D jest supertest

```

## package.json add:

```json
"type": "module",
"scripts": {
    "dev": "node --watch server.js",
    "test": "NODE_OPTIONS=--experimental-vm-modules jest --verbose"
},
```

