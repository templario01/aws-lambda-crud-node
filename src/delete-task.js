const AWS = require("aws-sdk");

const deleteTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const result = await dynamodb
      .delete({
        TableName: "TaskTable",
        Key: {
          id,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Task deleted",
        data: result.$response.data,
      }),
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
  deleteTask,
};
