using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class RenamedFormedAndDisbandedMembersInTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FormedDate",
                table: "Teams",
                newName: "FormedAtDate");

            migrationBuilder.RenameColumn(
                name: "DisbandedDate",
                table: "Teams",
                newName: "DisbandedAtDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FormedAtDate",
                table: "Teams",
                newName: "FormedDate");

            migrationBuilder.RenameColumn(
                name: "DisbandedAtDate",
                table: "Teams",
                newName: "DisbandedDate");
        }
    }
}
