const { v4 } = require("uuid");
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.addUser = async (event) => {
    let response;

    try {
        // Parsear el cuerpo de la solicitud
        const { nombre, apellido, fechaNacimiento, celular, email, usuario, contraseña } = JSON.parse(event.body);

        if (!nombre || !apellido || !fechaNacimiento || !celular || !email || !usuario || !contraseña) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Verificar si el email ya existe en la tabla Cliente
        const emailCheckParams = {
            TableName: 'Cliente',
            IndexName: 'EmailIndex', // Asegúrate de tener un índice global secundario en la tabla por el campo email
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        };

        let emailCheckResult;
        try {
            emailCheckResult = await dynamodb.query(emailCheckParams).promise();
        } catch (error) {
            throw new Error("Error al verificar el email en la base de datos");
        }

        if (emailCheckResult.Items.length > 0) {
            throw new Error("El usuario con este email ya existe");
        }

        const createDate = new Date();
        const id = celular;
        const rquid = v4();

        console.log("created id: ", id);

        const newTask = {
            rquid,
            id,
            nombre,
            apellido,
            fechaNacimiento,
            celular,
            email,
            usuario,
            contraseña,
            createDate
        };

        // Intentar insertar el nuevo usuario en DynamoDB
        await dynamodb.put({
            TableName: 'Cliente',
            Item: newTask,
        }).promise();

        // Respuesta exitosa
        const statusDesc = "Registro creado exitosamente";
        response = {
            statusCode: 201,
            headers: {
                "Content-Type": "application/json",
                "rquid": rquid
            },
            body: JSON.stringify({
                statusDesc,
                statusCode: 201,
                createDate
            }),
        };

    } catch (error) {
        console.error("Error al agregar el usuario:", error);

        // Manejo de errores
        let errorMessage = "Error interno del servidor";
        let errorDescription = error.message;
        let statusCode = 500;

        if (error.message === "Todos los campos son obligatorios" || error.message === "El usuario con este email ya existe") {
            errorMessage = error.message;
            statusCode = 400;
        } else if (error.message === "Error al verificar el email en la base de datos") {
            errorMessage = error.message;
            error= error;
            statusCode = 500;
        }

        response = {
            statusCode,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                statusDesc: errorMessage,
                statusMessage: errorDescription,
                statusCode,
            }),
        };
    }

    return response;
};
