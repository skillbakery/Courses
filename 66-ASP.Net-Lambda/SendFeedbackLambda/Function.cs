using System;
using System.Text;
using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using System.Collections.Generic;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace SendFeedbackLambda
{
    public class SendFeedback
    {
        public APIGatewayProxyResponse FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            try
            {
                if (request == null)
                    return CreateResponse(400, "Request is null.");

                ContactModel model = null;
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                // 1. Prefer Body (real API Gateway / Function URL / most clients)
                if (!string.IsNullOrWhiteSpace(request.Body))
                {
                    string bodyJson = request.IsBase64Encoded
                        ? Encoding.UTF8.GetString(Convert.FromBase64String(request.Body))
                        : request.Body;

                    try
                    {
                        model = JsonSerializer.Deserialize<ContactModel>(bodyJson, options);
                    }
                    catch (JsonException ex)
                    {
                        context.Logger.LogError($"Body deserialization failed: {ex.Message}");
                    }
                }

                // 2. Fallback: Lambda console / direct invoke → try whole request as payload
                if (model == null || string.IsNullOrWhiteSpace(model.Name))
                {
                    try
                    {
                        // Serialize whole request → deserialize with case-insensitivity
                        string fullJson = JsonSerializer.Serialize(request);
                        model = JsonSerializer.Deserialize<ContactModel>(fullJson, options);
                    }
                    catch (JsonException ex)
                    {
                        context.Logger.LogError($"Full event deserialization failed: {ex.Message}");
                    }
                }

                // 3. Ultimate fallback: manual extraction (handles extra fields + any casing)
                if (model == null || string.IsNullOrWhiteSpace(model.Name))
                {
                    try
                    {
                        string json = JsonSerializer.Serialize(request);
                        var doc = JsonDocument.Parse(json);
                        var root = doc.RootElement;

                        model = new ContactModel
                        {
                            Name = GetString(root, "name") ?? GetString(root, "Name"),
                            Subject = GetString(root, "subject") ?? GetString(root, "Subject"),
                            Body = GetString(root, "body") ?? GetString(root, "Body")
                        };
                    }
                    catch (Exception ex)
                    {
                        context.Logger.LogError($"Manual extraction failed: {ex.Message}");
                    }
                }

                if (model == null ||
                    string.IsNullOrWhiteSpace(model.Name) ||
                    string.IsNullOrWhiteSpace(model.Subject) ||
                    string.IsNullOrWhiteSpace(model.Body))
                {
                    return CreateResponse(400, "Name, Subject and Body are required. Check payload format and casing.");
                }

                context.Logger.LogInformation($"Success - Name: {model.Name}, Subject: {model.Subject}");

                return CreateResponse(200, new
                {
                    success = true,
                    message = "Feedback submitted successfully",
                    data = model
                });
            }
            catch (Exception ex)
            {
                context.Logger.LogError(ex.ToString());
                return CreateResponse(500, "Internal server error.");
            }
        }

        private static string GetString(JsonElement element, string propertyName)
        {
            return element.TryGetProperty(propertyName, out var prop) && prop.ValueKind == JsonValueKind.String
                ? prop.GetString()
                : null;
        }

        private APIGatewayProxyResponse CreateResponse(int statusCode, object bodyObj)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            string json = JsonSerializer.Serialize(bodyObj, options);

            return new APIGatewayProxyResponse
            {
                StatusCode = statusCode,
                Body = json,
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "application/json" },
                    { "Access-Control-Allow-Origin", "*" },
                    { "Access-Control-Allow-Headers", "Content-Type,Authorization" },
                    { "Access-Control-Allow-Methods", "POST,OPTIONS,GET" }
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