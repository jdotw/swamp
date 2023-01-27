using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class RenamedHierarchyFieldsInRoleType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_role_types_role_types_parent_role_type_id",
                table: "role_types");

            migrationBuilder.RenameColumn(
                name: "parent_role_type_id",
                table: "role_types",
                newName: "parent_id");

            migrationBuilder.RenameIndex(
                name: "ix_role_types_parent_role_type_id",
                table: "role_types",
                newName: "ix_role_types_parent_id");

            migrationBuilder.AddForeignKey(
                name: "fk_role_types_role_types_parent_id",
                table: "role_types",
                column: "parent_id",
                principalTable: "role_types",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_role_types_role_types_parent_id",
                table: "role_types");

            migrationBuilder.RenameColumn(
                name: "parent_id",
                table: "role_types",
                newName: "parent_role_type_id");

            migrationBuilder.RenameIndex(
                name: "ix_role_types_parent_id",
                table: "role_types",
                newName: "ix_role_types_parent_role_type_id");

            migrationBuilder.AddForeignKey(
                name: "fk_role_types_role_types_parent_role_type_id",
                table: "role_types",
                column: "parent_role_type_id",
                principalTable: "role_types",
                principalColumn: "id");
        }
    }
}
