using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class RemovedICAndMgrTitlesFromLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IndividualContributorTitle",
                table: "Levels");

            migrationBuilder.DropColumn(
                name: "ManagerTitle",
                table: "Levels");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IndividualContributorTitle",
                table: "Levels",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ManagerTitle",
                table: "Levels",
                type: "text",
                nullable: true);
        }
    }
}
