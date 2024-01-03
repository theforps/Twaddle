using Microsoft.EntityFrameworkCore;
using Twaddle.Domain;
using Twaddle.Repositories.Impl;
using Twaddle.Repositories.Interfaces;
using Twaddle.Services.Impl;
using Twaddle.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddTransient<IJoinRepository, JoinRepository>();

builder.Services.AddTransient<IJoinService, JoinService>();


string connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseNpgsql(connection));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();