using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class AddedDeploymentTypeToDeployment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LevelAssignments");

            migrationBuilder.AddColumn<int>(
                name: "DeploymentTypeId",
                table: "Deployments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Deployments_DeploymentTypeId",
                table: "Deployments",
                column: "DeploymentTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deployments_DeploymentTypes_DeploymentTypeId",
                table: "Deployments",
                column: "DeploymentTypeId",
                principalTable: "DeploymentTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deployments_DeploymentTypes_DeploymentTypeId",
                table: "Deployments");

            migrationBuilder.DropIndex(
                name: "IX_Deployments_DeploymentTypeId",
                table: "Deployments");

            migrationBuilder.DropColumn(
                name: "DeploymentTypeId",
                table: "Deployments");

            migrationBuilder.CreateTable(
                name: "LevelAssignments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LevelId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    StartDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LevelAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LevelAssignments_Levels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LevelAssignments_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LevelAssignments_LevelId",
                table: "LevelAssignments",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_LevelAssignments_RoleId",
                table: "LevelAssignments",
                column: "RoleId");
        }
    }
}
