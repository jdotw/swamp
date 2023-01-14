using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class AddedActiveAndRetiredFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "active_from_date",
                table: "role_types",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "retired_at_date",
                table: "role_types",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "active_from_date",
                table: "function_types",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "retired_at_date",
                table: "function_types",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "active_from_date",
                table: "role_types");

            migrationBuilder.DropColumn(
                name: "retired_at_date",
                table: "role_types");

            migrationBuilder.DropColumn(
                name: "active_from_date",
                table: "function_types");

            migrationBuilder.DropColumn(
                name: "retired_at_date",
                table: "function_types");
        }
    }
}
