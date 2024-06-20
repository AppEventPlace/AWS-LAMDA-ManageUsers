Configuracion y creación del Lambda a traves del Framework de serverless con Node HTTP API on AWS
1- configurar el usuario de CLI AWS para visual estudio con el comando: aws configure, inmediatamente proporcionar los datos: Clave de acceso Clave Secreta

2- Instalr las dependencias con los siguientes comandos npm i uuid npm i aws-sdk npm install -g serverless

3- ejecutar el comando: serverless y posteriormente seleccionar la siguiente opcion: AWS - Node.js - HTTP API -- seleccionar nombre del proyecto aws-lamda-crud-node

4- Para desplegar el lambda en AWS utilizar el siguiente comando:

serverless deploy --verbose -- desplegar

Serverless Framework Node HTTP API on AWS
This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the serverless/examples repository which includes Typescript, Mongo, DynamoDB and other examples.

Usage
Deployment
$ serverless deploy
After deploying, you should see output similar to:

Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node-http-api.zip file to S3 (711.23 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: serverless-http-api
stage: dev
region: us-east-1
stack: serverless-http-api-dev
resources: 12
api keys:
  None
endpoints:
  ANY - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  api: serverless-http-api-dev-hello
layers:
  None
Note: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to http event docs.

Invocation
After successful deployment, you can call the created application via HTTP:

curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
Which should result in response similar to the following (removed input content for brevity):

{
  "message": "Go Serverless v2.0! Your function executed successfully!",
  "input": {
    ...
  }
}
Local development
You can invoke your function locally by using the following command:

serverless invoke local --function hello
Which should result in response similar to the following:

{
  "statusCode": 200,
  "body": "{\n  \"message\": \"Go Serverless v2.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
Alternatively, it is also possible to emulate API Gateway and Lambda locally by using serverless-offline plugin. In order to do that, execute the following command:

serverless plugin install -n serverless-offline
It will add the serverless-offline plugin to devDependencies in package.json file as well as will add it to plugins in serverless.yml.

After installation, you can start local emulation with:

serverless offline
To learn more about the capabilities of serverless-offline, please refer to its GitHub repository.
