using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class AddedRoleTypeToCapabilityType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleTypeId",
                table: "CapabilityTypes",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CapabilityTypes_RoleTypeId",
                table: "CapabilityTypes",
                column: "RoleTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_CapabilityTypes_RoleTypes_RoleTypeId",
                table: "CapabilityTypes",
                column: "RoleTypeId",
                principalTable: "RoleTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CapabilityTypes_RoleTypes_RoleTypeId",
                table: "CapabilityTypes");

            migrationBuilder.DropIndex(
                name: "IX_CapabilityTypes_RoleTypeId",
                table: "CapabilityTypes");

            migrationBuilder.DropColumn(
                name: "RoleTypeId",
                table: "CapabilityTypes");
        }
    }
}
