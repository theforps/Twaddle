namespace Twaddle.Domain.Models;

public class BaseResponse<T>
{
    public T? Data { get; set; }
    public string? Description { get; set; }
    public int? StatusCode { get; set; }
}