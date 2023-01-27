using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDeleteOfRoleType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_role_types_role_types_parent_id",
                table: "role_types");

            migrationBuilder.AddForeignKey(
                name: "fk_role_types_role_types_parent_id",
                table: "role_types",
                column: "parent_id",
                principalTable: "role_types",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_role_types_role_types_parent_id",
                table: "role_types");

            migrationBuilder.AddForeignKey(
                name: "fk_role_types_role_types_parent_id",
                table: "role_types",
                column: "parent_id",
                principalTable: "role_types",
                principalColumn: "id");
        }
    }
}
