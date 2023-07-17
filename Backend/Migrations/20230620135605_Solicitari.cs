using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gestionare.Migrations
{
    /// <inheritdoc />
    public partial class Solicitari : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Solicitari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EchipamentId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Descriere = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Solicitari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Solicitari_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Solicitari_Echipamente_EchipamentId",
                        column: x => x.EchipamentId,
                        principalTable: "Echipamente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Solicitari_EchipamentId",
                table: "Solicitari",
                column: "EchipamentId");

            migrationBuilder.CreateIndex(
                name: "IX_Solicitari_UserId",
                table: "Solicitari",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Solicitari");
        }
    }
}
