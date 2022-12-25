using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Delivery.Migrations
{
  /// <inheritdoc />
  public partial class InitialCreate : Migration
  {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "squad_role_types",
          columns: table => new
          {
            id = table.Column<int>(type: "integer", nullable: false)
                  .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            name = table.Column<string>(type: "text", nullable: false),
            createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
            updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("pk_squad_role_types", x => x.id);
          });

      migrationBuilder.CreateTable(
          name: "squads",
          columns: table => new
          {
            id = table.Column<int>(type: "integer", nullable: false)
                  .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            name = table.Column<string>(type: "text", nullable: false),
            formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
            disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true),
            createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
            updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("pk_squads", x => x.id);
          });

      migrationBuilder.CreateTable(
          name: "tribe_role_types",
          columns: table => new
          {
            id = table.Column<int>(type: "integer", nullable: false)
                  .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            name = table.Column<string>(type: "text", nullable: false),
            createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
            updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("pk_tribe_role_types", x => x.id);
          });

      migrationBuilder.CreateTable(
          name: "tribes",
          columns: table => new
          {
            id = table.Column<int>(type: "integer", nullable: false)
                  .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            name = table.Column<string>(type: "text", nullable: false),
            formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
            disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true),
            createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
            updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("pk_tribes", x => x.id);
          });

      migrationBuilder.CreateTable(
          name: "squad_roles",
          columns: table => new
          {
            id = table.Column<int>(type: "integer", nullable: false)
                  .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            individualid = table.Column<int>(name: "individual_id", type: "integer", nullable: false),
            squadroletypeid = table.Column<int>(name: "squad_role_type_id", type: "integer", nullable: false),
            squadid = table.Column<int>(name: "squad_id", type: "integer", nullable: false),
            startdate = table.Column<DateTimeOffset>(name: "start_date", type: "timestamp with time zone", nullable: false),
            enddate = table.Column<DateTimeOffset>(name: "end_date", type: "timestamp with time zone", nullable: true),
            createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
            updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("pk_squad_roles", x => x.id);
            table.ForeignKey(
                      name: "fk_squad_roles_squad_role_types_squad_role_type_id",
                      column: x => x.squadroletypeid,
                      principalTable: "squad_role_types",
                      principalColumn: "id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "fk_squad_roles_squads_squad_id",
                      column: x => x.squadid,
                      principalTable: "squads",
                      principalColumn: "id",
                      onDelete: ReferentialAction.Cascade);
          });

      migrationBuilder.CreateTable(
          name: "tribe_roles",
          columns: table => new
          {
            id = table.Column<int>(type: "integer", nullable: false)
                  .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            individualid = table.Column<int>(name: "individual_id", type: "integer", nullable: false),
            triberoletypeid = table.Column<int>(name: "tribe_role_type_id", type: "integer", nullable: false),
            tribeid = table.Column<int>(name: "tribe_id", type: "integer", nullable: false),
            startdate = table.Column<DateTimeOffset>(name: "start_date", type: "timestamp with time zone", nullable: false),
            enddate = table.Column<DateTimeOffset>(name: "end_date", type: "timestamp with time zone", nullable: true),
            createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
            updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("pk_tribe_roles", x => x.id);
            table.ForeignKey(
                      name: "fk_tribe_roles_tribe_role_types_tribe_role_type_id",
                      column: x => x.triberoletypeid,
                      principalTable: "tribe_role_types",
                      principalColumn: "id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "fk_tribe_roles_tribes_tribe_id",
                      column: x => x.tribeid,
                      principalTable: "tribes",
                      principalColumn: "id",
                      onDelete: ReferentialAction.Cascade);
          });

      migrationBuilder.CreateIndex(
          name: "ix_squad_roles_squad_id",
          table: "squad_roles",
          column: "squad_id");

      migrationBuilder.CreateIndex(
          name: "ix_squad_roles_squad_role_type_id",
          table: "squad_roles",
          column: "squad_role_type_id");

      migrationBuilder.CreateIndex(
          name: "ix_tribe_roles_tribe_id",
          table: "tribe_roles",
          column: "tribe_id");

      migrationBuilder.CreateIndex(
          name: "ix_tribe_roles_tribe_role_type_id",
          table: "tribe_roles",
          column: "tribe_role_type_id");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "squad_roles");

      migrationBuilder.DropTable(
          name: "tribe_roles");

      migrationBuilder.DropTable(
          name: "squad_role_types");

      migrationBuilder.DropTable(
          name: "squads");

      migrationBuilder.DropTable(
          name: "tribe_role_types");

      migrationBuilder.DropTable(
          name: "tribes");
    }
  }
}
