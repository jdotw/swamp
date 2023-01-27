using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "function_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    activefromdate = table.Column<DateTimeOffset>(name: "active_from_date", type: "timestamp with time zone", nullable: false),
                    retiredatdate = table.Column<DateTimeOffset>(name: "retired_at_date", type: "timestamp with time zone", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_function_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "levels",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    individualcontributortitle = table.Column<string>(name: "individual_contributor_title", type: "text", nullable: false),
                    managertitle = table.Column<string>(name: "manager_title", type: "text", nullable: false),
                    activefromdate = table.Column<DateTimeOffset>(name: "active_from_date", type: "timestamp with time zone", nullable: false),
                    retiredatdate = table.Column<DateTimeOffset>(name: "retired_at_date", type: "timestamp with time zone", nullable: false),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_levels", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "persons",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    externalid = table.Column<string>(name: "external_id", type: "text", nullable: false),
                    firstname = table.Column<string>(name: "first_name", type: "text", nullable: false),
                    middlenames = table.Column<string>(name: "middle_names", type: "text", nullable: true),
                    lastname = table.Column<string>(name: "last_name", type: "text", nullable: false),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_persons", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "role_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(type: "text", nullable: false),
                    activefromdate = table.Column<DateTimeOffset>(name: "active_from_date", type: "timestamp with time zone", nullable: false),
                    retiredatdate = table.Column<DateTimeOffset>(name: "retired_at_date", type: "timestamp with time zone", nullable: true),
                    parentroletypeid = table.Column<int>(name: "parent_role_type_id", type: "integer", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_types", x => x.id);
                    table.ForeignKey(
                        name: "fk_role_types_role_types_parent_role_type_id",
                        column: x => x.parentroletypeid,
                        principalTable: "role_types",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "units",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
                    disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true),
                    unittype = table.Column<string>(name: "unit_type", type: "text", nullable: false),
                    practiceid = table.Column<int>(name: "practice_id", type: "integer", nullable: true),
                    tribeid = table.Column<int>(name: "tribe_id", type: "integer", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_units", x => x.id);
                    table.ForeignKey(
                        name: "fk_units_units_practice_id",
                        column: x => x.practiceid,
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_units_units_tribe_id",
                        column: x => x.tribeid,
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    roletypeid = table.Column<int>(name: "role_type_id", type: "integer", nullable: true),
                    openfromdate = table.Column<DateTimeOffset>(name: "open_from_date", type: "timestamp with time zone", nullable: false),
                    closedatdate = table.Column<DateTimeOffset>(name: "closed_at_date", type: "timestamp with time zone", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_roles", x => x.id);
                    table.ForeignKey(
                        name: "fk_roles_role_types_role_type_id",
                        column: x => x.roletypeid,
                        principalTable: "role_types",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "level_assignments",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    levelid = table.Column<int>(name: "level_id", type: "integer", nullable: false),
                    roleid = table.Column<int>(name: "role_id", type: "integer", nullable: false),
                    startdate = table.Column<DateTimeOffset>(name: "start_date", type: "timestamp with time zone", nullable: false),
                    enddate = table.Column<DateTimeOffset>(name: "end_date", type: "timestamp with time zone", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_level_assignments", x => x.id);
                    table.ForeignKey(
                        name: "fk_level_assignments_levels_level_id",
                        column: x => x.levelid,
                        principalTable: "levels",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_level_assignments_roles_role_id",
                        column: x => x.roleid,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "role_assignments",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    personid = table.Column<int>(name: "person_id", type: "integer", nullable: false),
                    roleid = table.Column<int>(name: "role_id", type: "integer", nullable: false),
                    startdate = table.Column<DateTimeOffset>(name: "start_date", type: "timestamp with time zone", nullable: false),
                    enddate = table.Column<DateTimeOffset>(name: "end_date", type: "timestamp with time zone", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_assignments", x => x.id);
                    table.ForeignKey(
                        name: "fk_role_assignments_persons_person_id",
                        column: x => x.personid,
                        principalTable: "persons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_role_assignments_roles_role_id",
                        column: x => x.roleid,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "unit_assignments",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    roleid = table.Column<int>(name: "role_id", type: "integer", nullable: false),
                    functiontypeid = table.Column<int>(name: "function_type_id", type: "integer", nullable: false),
                    startdate = table.Column<DateTimeOffset>(name: "start_date", type: "timestamp with time zone", nullable: false),
                    enddate = table.Column<DateTimeOffset>(name: "end_date", type: "timestamp with time zone", nullable: true),
                    discriminator = table.Column<string>(type: "text", nullable: false),
                    unitid = table.Column<int>(name: "unit_id", type: "integer", nullable: true),
                    chapterid = table.Column<int>(name: "chapter_id", type: "integer", nullable: true),
                    practiceid = table.Column<int>(name: "practice_id", type: "integer", nullable: true),
                    squadid = table.Column<int>(name: "squad_id", type: "integer", nullable: true),
                    teamid = table.Column<int>(name: "team_id", type: "integer", nullable: true),
                    tribeid = table.Column<int>(name: "tribe_id", type: "integer", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_unit_assignments", x => x.id);
                    table.ForeignKey(
                        name: "fk_unit_assignments_function_types_function_type_id",
                        column: x => x.functiontypeid,
                        principalTable: "function_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_unit_assignments_roles_role_id",
                        column: x => x.roleid,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_unit_assignments_units_chapter_id",
                        column: x => x.chapterid,
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_unit_assignments_units_practice_id",
                        column: x => x.practiceid,
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_unit_assignments_units_squad_id",
                        column: x => x.squadid,
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_unit_assignments_units_team_id",
                        column: x => x.teamid,
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_unit_assignments_units_tribe_id",
                        column: x => x.tribeid,
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_unit_assignments_units_unit_id",
                        column: x => x.unitid,
                        principalTable: "units",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_level_assignments_level_id",
                table: "level_assignments",
                column: "level_id");

            migrationBuilder.CreateIndex(
                name: "ix_level_assignments_role_id",
                table: "level_assignments",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_assignments_person_id",
                table: "role_assignments",
                column: "person_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_assignments_role_id",
                table: "role_assignments",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_types_parent_role_type_id",
                table: "role_types",
                column: "parent_role_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_roles_role_type_id",
                table: "roles",
                column: "role_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_chapter_id",
                table: "unit_assignments",
                column: "chapter_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_function_type_id",
                table: "unit_assignments",
                column: "function_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_practice_id",
                table: "unit_assignments",
                column: "practice_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_role_id",
                table: "unit_assignments",
                column: "role_id");

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

            migrationBuilder.CreateIndex(
                name: "ix_unit_assignments_unit_id",
                table: "unit_assignments",
                column: "unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_practice_id",
                table: "units",
                column: "practice_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_tribe_id",
                table: "units",
                column: "tribe_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "level_assignments");

            migrationBuilder.DropTable(
                name: "role_assignments");

            migrationBuilder.DropTable(
                name: "unit_assignments");

            migrationBuilder.DropTable(
                name: "levels");

            migrationBuilder.DropTable(
                name: "persons");

            migrationBuilder.DropTable(
                name: "function_types");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "units");

            migrationBuilder.DropTable(
                name: "role_types");
        }
    }
}
