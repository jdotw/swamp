using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace peopleservice.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "individuals",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    externalid = table.Column<string>(name: "external_id", type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_individuals", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "identities",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    individualid = table.Column<int>(name: "individual_id", type: "integer", nullable: false),
                    firstname = table.Column<string>(name: "first_name", type: "text", nullable: true),
                    middlenames = table.Column<string>(name: "middle_names", type: "text", nullable: true),
                    lastname = table.Column<string>(name: "last_name", type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_identities", x => x.id);
                    table.ForeignKey(
                        name: "fk_identities_individuals_individual_id",
                        column: x => x.individualid,
                        principalTable: "individuals",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_identities_individual_id",
                table: "identities",
                column: "individual_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "identities");

            migrationBuilder.DropTable(
                name: "individuals");
        }
    }
}
