using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using System.Collections.Generic;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace SendFeedbackLambda
{
    public class sendFeedback
    {
        public APIGatewayProxyResponse FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            try
            {
                if (request == null || string.IsNullOrEmpty(request.Body))
                {
                    return CreateResponse(400, "Request body is empty.");
                }

                var model = JsonSerializer.Deserialize<ContactModel>(request.Body);

                if (model == null ||
                    string.IsNullOrWhiteSpace(model.Name) ||
                    string.IsNullOrWhiteSpace(model.Subject) ||
                    string.IsNullOrWhiteSpace(model.Body))
                {
                    return CreateResponse(400, "Name, Subject and Body are required.");
                }

                // Mimic processing
                context.Logger.LogInformation($"Name: {model.Name}");
                context.Logger.LogInformation($"Subject: {model.Subject}");
                context.Logger.LogInformation($"Body: {model.Body}");

                return CreateResponse(200, new
                {
                    success = true,
                    message = "Feedback submitted successfully",
                    data = model
                });
            }
            catch (System.Exception ex)
            {
                context.Logger.LogError(ex.ToString());
                return CreateResponse(500, "Internal server error.");
            }
        }

        private APIGatewayProxyResponse CreateResponse(int statusCode, object body)
        {
            return new APIGatewayProxyResponse
            {
                StatusCode = statusCode,
                Body = JsonSerializer.Serialize(body),
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "application/json" }
                }
            };
        }
    }

    public class ContactModel
    {
        public string Name { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
