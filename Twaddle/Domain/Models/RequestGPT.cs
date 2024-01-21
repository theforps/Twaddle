namespace Twaddle.Domain.Models;

public class RequestGPT
{
    public string modelUri { get; set; }

    public Dictionary<string, int> completionOptions = new Dictionary<string, int>()
    {
        { "temperature", 0 },
        { "maxTokens", 2000}
    };

    public Dictionary<string, string>[] messages { get; set; }
}