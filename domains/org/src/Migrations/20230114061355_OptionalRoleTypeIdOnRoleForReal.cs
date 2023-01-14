using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class OptionalRoleTypeIdOnRoleForReal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_roles_role_types_role_type_id",
                table: "roles");

            migrationBuilder.AlterColumn<int>(
                name: "role_type_id",
                table: "roles",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "fk_roles_role_types_role_type_id",
                table: "roles",
                column: "role_type_id",
                principalTable: "role_types",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_roles_role_types_role_type_id",
                table: "roles");

            migrationBuilder.AlterColumn<int>(
                name: "role_type_id",
                table: "roles",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_roles_role_types_role_type_id",
                table: "roles",
                column: "role_type_id",
                principalTable: "role_types",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
