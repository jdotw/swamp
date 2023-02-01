using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class UseJustUnitIdOnUnitAssignment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_unit_assignments_units_chapter_id",
                table: "unit_assignments");

            migrationBuilder.DropForeignKey(
                name: "fk_unit_assignments_units_practice_id",
                table: "unit_assignments");

            migrationBuilder.DropForeignKey(
                name: "fk_unit_assignments_units_squad_id",
                table: "unit_assignments");

            migrationBuilder.DropForeignKey(
                name: "fk_unit_assignments_units_team_id",
                table: "unit_assignments");

            migrationBuilder.DropForeignKey(
                name: "fk_unit_assignments_units_tribe_id",
                table: "unit_assignments");

            migrationBuilder.DropIndex(
                name: "ix_unit_assignments_chapter_id",
                table: "unit_assignments");

            migrationBuilder.DropIndex(
                name: "ix_unit_assignments_practice_id",
                table: "unit_assignments");

            migrationBuilder.DropIndex(
                name: "ix_unit_assignments_squad_id",
                table: "unit_assignments");

            migrationBuilder.DropIndex(
                name: "ix_unit_assignments_team_id",
                table: "unit_assignments");

            migrationBuilder.DropIndex(
                name: "ix_unit_assignments_tribe_id",
                table: "unit_assignments");

            migrationBuilder.DropColumn(
                name: "chapter_id",
                table: "unit_assignments");

            migrationBuilder.DropColumn(
                name: "practice_id",
                table: "unit_assignments");

            migrationBuilder.DropColumn(
                name: "squad_id",
                table: "unit_assignments");

            migrationBuilder.DropColumn(
                name: "team_id",
                table: "unit_assignments");

            migrationBuilder.DropColumn(
                name: "tribe_id",
                table: "unit_assignments");

            migrationBuilder.AddColumn<int>(
                name: "unit_id",
                table: "unit_assignments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_unit_id",
                table: "unit_assignments",
                column: "unit_id");

            migrationBuilder.AddForeignKey(
                name: "fk_unit_assignments_units_unit_id",
                table: "unit_assignments",
                column: "unit_id",
                principalTable: "Units",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_unit_assignments_units_unit_id",
                table: "unit_assignments");

            migrationBuilder.DropIndex(
                name: "ix_unit_assignments_unit_id",
                table: "unit_assignments");

            migrationBuilder.DropColumn(
                name: "unit_id",
                table: "unit_assignments");

            migrationBuilder.AddColumn<int>(
                name: "chapter_id",
                table: "unit_assignments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "practice_id",
                table: "unit_assignments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "squad_id",
                table: "unit_assignments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "team_id",
                table: "unit_assignments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "tribe_id",
                table: "unit_assignments",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_chapter_id",
                table: "unit_assignments",
                column: "chapter_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_practice_id",
                table: "unit_assignments",
                column: "practice_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_squad_id",
                table: "unit_assignments",
                column: "squad_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_team_id",
                table: "unit_assignments",
                column: "team_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_tribe_id",
                table: "unit_assignments",
                column: "tribe_id");

            migrationBuilder.AddForeignKey(
                name: "fk_unit_assignments_units_chapter_id",
                table: "unit_assignments",
                column: "chapter_id",
                principalTable: "Units",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_unit_assignments_units_practice_id",
                table: "unit_assignments",
                column: "practice_id",
                principalTable: "Units",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_unit_assignments_units_squad_id",
                table: "unit_assignments",
                column: "squad_id",
                principalTable: "Units",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_unit_assignments_units_team_id",
                table: "unit_assignments",
                column: "team_id",
                principalTable: "Units",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_unit_assignments_units_tribe_id",
                table: "unit_assignments",
                column: "tribe_id",
                principalTable: "Units",
                principalColumn: "id");
        }
    }
}
