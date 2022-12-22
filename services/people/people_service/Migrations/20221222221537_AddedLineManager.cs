using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace peopleservice.Migrations
{
    /// <inheritdoc />
    public partial class AddedLineManager : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "line_manager",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    individualid = table.Column<int>(name: "individual_id", type: "integer", nullable: false),
                    managerid = table.Column<int>(name: "manager_id", type: "integer", nullable: false),
                    startdate = table.Column<DateTimeOffset>(name: "start_date", type: "timestamp with time zone", nullable: false),
                    enddate = table.Column<DateTimeOffset>(name: "end_date", type: "timestamp with time zone", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_line_manager", x => x.id);
                    table.ForeignKey(
                        name: "fk_line_manager_individuals_individual_id",
                        column: x => x.individualid,
                        principalTable: "individuals",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_line_manager_individuals_manager_id",
                        column: x => x.managerid,
                        principalTable: "individuals",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_line_manager_individual_id",
                table: "line_manager",
                column: "individual_id");

            migrationBuilder.CreateIndex(
                name: "ix_line_manager_manager_id",
                table: "line_manager",
                column: "manager_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "line_manager");
        }
    }
}
