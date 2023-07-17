using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gestionare.Migrations
{
    /// <inheritdoc />
    public partial class Echipamentee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Echipamente");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Echipamente",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
