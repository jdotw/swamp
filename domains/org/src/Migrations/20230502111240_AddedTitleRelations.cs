using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class AddedTitleRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LevelId",
                table: "Titles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TrackId",
                table: "Titles",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Titles_LevelId",
                table: "Titles",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Titles_TrackId",
                table: "Titles",
                column: "TrackId");

            migrationBuilder.AddForeignKey(
                name: "FK_Titles_Levels_LevelId",
                table: "Titles",
                column: "LevelId",
                principalTable: "Levels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Titles_Tracks_TrackId",
                table: "Titles",
                column: "TrackId",
                principalTable: "Tracks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Titles_Levels_LevelId",
                table: "Titles");

            migrationBuilder.DropForeignKey(
                name: "FK_Titles_Tracks_TrackId",
                table: "Titles");

            migrationBuilder.DropIndex(
                name: "IX_Titles_LevelId",
                table: "Titles");

            migrationBuilder.DropIndex(
                name: "IX_Titles_TrackId",
                table: "Titles");

            migrationBuilder.DropColumn(
                name: "LevelId",
                table: "Titles");

            migrationBuilder.DropColumn(
                name: "TrackId",
                table: "Titles");
        }
    }
}
