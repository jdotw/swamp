using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class AddedTitleTypeToRoleType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ManagerAssignments_Roles_RoleId",
                table: "ManagerAssignments");

            migrationBuilder.AddColumn<string>(
                name: "TitleType",
                table: "RoleTypes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_ManagerAssignments_Roles_RoleId",
                table: "ManagerAssignments",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ManagerAssignments_Roles_RoleId",
                table: "ManagerAssignments");

            migrationBuilder.DropColumn(
                name: "TitleType",
                table: "RoleTypes");

            migrationBuilder.AddForeignKey(
                name: "FK_ManagerAssignments_Roles_RoleId",
                table: "ManagerAssignments",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
