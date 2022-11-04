const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { title, description } = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    const newTask = {
      id,
      title,
      description,
      createdAt,
      done: false,
    };

    await dynamodb
      .put({
        TableName: "TaskTable",
        Item: newTask,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newTask),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 409,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = {
  addTask,
};
