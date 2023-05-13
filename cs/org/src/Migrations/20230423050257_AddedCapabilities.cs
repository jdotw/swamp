using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class AddedCapabilities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleTypes_RoleTypes_ParentId",
                table: "RoleTypes");

            migrationBuilder.CreateTable(
                name: "Capabilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    CapabilityTypeId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Capabilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Capabilities_CapabilityTypes_CapabilityTypeId",
                        column: x => x.CapabilityTypeId,
                        principalTable: "CapabilityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Capabilities_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Capabilities_CapabilityTypeId",
                table: "Capabilities",
                column: "CapabilityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Capabilities_RoleId",
                table: "Capabilities",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleTypes_RoleTypes_ParentId",
                table: "RoleTypes",
                column: "ParentId",
                principalTable: "RoleTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleTypes_RoleTypes_ParentId",
                table: "RoleTypes");

            migrationBuilder.DropTable(
                name: "Capabilities");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleTypes_RoleTypes_ParentId",
                table: "RoleTypes",
                column: "ParentId",
                principalTable: "RoleTypes",
                principalColumn: "Id");
        }
    }
}
