using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class AddedParentChildToTrack : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tracks_ParentId",
                table: "Tracks",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Tracks_ParentId",
                table: "Tracks",
                column: "ParentId",
                principalTable: "Tracks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Tracks_ParentId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_ParentId",
                table: "Tracks");
        }
    }
}
