using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gestionare.Migrations
{
    /// <inheritdoc />
    public partial class Aprobari : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aprobari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descriere = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aprobata = table.Column<bool>(type: "bit", nullable: false),
                    SolicitareId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aprobari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Aprobari_Solicitari_SolicitareId",
                        column: x => x.SolicitareId,
                        principalTable: "Solicitari",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aprobari_SolicitareId",
                table: "Aprobari",
                column: "SolicitareId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aprobari");
        }
    }
}
