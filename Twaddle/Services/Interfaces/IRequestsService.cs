namespace Twaddle.Services.Interfaces;

public interface IRequestsService
{
    Task<string> GetIamToken();
    Task<List<int>> GetOrderOfUsers(string token, string ownProfile, string otherProfiles);
}