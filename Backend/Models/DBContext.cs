using Azure.Core;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Gestionare.Models;
using Microsoft.AspNetCore.Identity;

namespace Gestionare.Models;
public partial class DBContext : IdentityDbContext<IdentityUser>
{
    public DBContext(DbContextOptions<DBContext> options)
        : base(options)
    {

    }
    public DbSet<Echipamente> Echipamente { get; set; }
    public DbSet<Solicitari> Solicitari { get; set; }
    public DbSet<Aprobari> Aprobari { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseSqlServer("server=DESKTOP-B8A3M65\\SQLEXPRESS;Database=Licenta;Trusted_Connection=True;TrustServerCertificate=True;Integrated Security=true");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        

        modelBuilder.Entity<Solicitari>()
            .HasOne(s => s.Echipament)
            .WithMany()
            .HasForeignKey(s => s.EchipamentId);

        modelBuilder.Entity<Aprobari>()
               .HasOne(s => s.Solicitare)
               .WithMany()
               .HasForeignKey(s => s.SolicitareId);

        modelBuilder.Entity<Solicitari>()
                .HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId);


        base.OnModelCreating(modelBuilder);
    }



}

