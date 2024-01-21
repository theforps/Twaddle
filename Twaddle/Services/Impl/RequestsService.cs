using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Twaddle.Domain.Models;
using Twaddle.Services.Interfaces;

namespace Twaddle.Services.Impl;

public class RequestsService : IRequestsService
{
    private readonly IConfiguration _configuration;

    public RequestsService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<string> GetIamToken()
    {
        HttpClientHandler clientHandler = new HttpClientHandler();
        clientHandler.ServerCertificateCustomValidationCallback = 
            (sender, cert, chain, sslPolicyErrors) => { return true; };
        
        HttpClient httpClient = new HttpClient(clientHandler);
        
        var oAuth = _configuration.GetSection("YandexGPT:yandexPassportOauthToken").Value;
        var urlForGet = _configuration.GetSection("YandexGPT:urlForGetIamToken").Value;

        var data = new Dictionary<string, string>();
        data.Add("yandexPassportOauthToken", oAuth);

        string payload = JsonConvert.SerializeObject(data);
        
        StringContent content = new StringContent(payload, Encoding.UTF8, "application/json");
        
        string response = await httpClient.PostAsync(urlForGet, content)
            .Result
            .Content.ReadAsStringAsync();

        var result = JObject.Parse(response)!["iamToken"]!.ToString();
        
        return result;
    }

    public async Task<List<int>> GetOrderOfUsers(string token, string ownProfile, string otherProfiles)
    {
        HttpClientHandler clientHandler = new HttpClientHandler();
        clientHandler.ServerCertificateCustomValidationCallback = 
            (sender, cert, chain, sslPolicyErrors) => { return true; };
        
        HttpClient httpClient = new HttpClient(clientHandler);
        httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
        
        var modelUri = _configuration.GetSection("YandexGPT:modelUri").Value;
        var systemMessage = _configuration.GetSection("YandexGPT:systemMessage").Value;
        var ownMessage = _configuration.GetSection("YandexGPT:ownMessage").Value;
        var nextMessage = _configuration.GetSection("YandexGPT:nextMessage").Value;
        var urlForGet = _configuration.GetSection("YandexGPT:urlForGetAnswer").Value;
        
        RequestGPT requestGpt = new RequestGPT()
        {
            modelUri = modelUri,
            messages = new []
            {
              new Dictionary<string, string>()
              {
                  {"role", "system"},
                  {"text" , systemMessage}
              },
              new Dictionary<string, string>()
              {
                  {"role", "user"},
                  {"text" , ownMessage + ownProfile + "\n" + nextMessage + otherProfiles}
              }
            },
        };

        string payload = JsonConvert.SerializeObject(requestGpt);
        
        StringContent content = new StringContent(payload, Encoding.UTF8, "application/json");
        
        string response = await httpClient.PostAsync(urlForGet, content)
            .Result
            .Content.ReadAsStringAsync();

        var jsonObject = JObject.Parse(response)["result"];
        var jsonArray = (JArray)jsonObject["alternatives"];
        var finalObject = JObject.Parse(jsonArray[0].ToString())["message"]["text"].ToString();

        var result = new List<int>();
        var numbersString = finalObject.Substring(
            finalObject.IndexOf('[')+1,
            finalObject.IndexOf(']') - finalObject.IndexOf('[') - 1
            );
        var numberArray = numbersString.Split(new char[]{',', '[', ']'});
        
        
        for (int i = 0; i < numberArray.Length; i++)
        {
            if (int.TryParse(numberArray[i], out int idToAdd))
            {
                result.Add(idToAdd);
            }
        }
        
        return result;
    }
}