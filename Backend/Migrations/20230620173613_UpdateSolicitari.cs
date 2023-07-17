using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gestionare.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSolicitari : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Solicitari_AspNetUsers_UserId",
                table: "Solicitari");

            migrationBuilder.DropIndex(
                name: "IX_Solicitari_UserId",
                table: "Solicitari");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Solicitari");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Solicitari",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Solicitari_UserId",
                table: "Solicitari",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Solicitari_AspNetUsers_UserId",
                table: "Solicitari",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
