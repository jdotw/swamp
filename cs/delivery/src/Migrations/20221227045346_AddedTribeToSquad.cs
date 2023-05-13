using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Delivery.Migrations
{
    /// <inheritdoc />
    public partial class AddedTribeToSquad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "tribe_id",
                table: "squads",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "ix_squads_tribe_id",
                table: "squads",
                column: "tribe_id");

            migrationBuilder.AddForeignKey(
                name: "fk_squads_tribes_tribe_id",
                table: "squads",
                column: "tribe_id",
                principalTable: "tribes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_squads_tribes_tribe_id",
                table: "squads");

            migrationBuilder.DropIndex(
                name: "ix_squads_tribe_id",
                table: "squads");

            migrationBuilder.DropColumn(
                name: "tribe_id",
                table: "squads");
        }
    }
}
