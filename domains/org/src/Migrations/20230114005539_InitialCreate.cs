using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_function_types", x => x.id);
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
                name: "practices",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
                    disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_practices", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "role_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(type: "text", nullable: false),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "teams",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    purpose = table.Column<string>(type: "text", nullable: false),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
                    disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_teams", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tribes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
                    disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_tribes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "chapters",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    practiceid = table.Column<int>(name: "practice_id", type: "integer", nullable: false),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
                    disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_chapters", x => x.id);
                    table.ForeignKey(
                        name: "fk_chapters_practices_practice_id",
                        column: x => x.practiceid,
                        principalTable: "practices",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    isactive = table.Column<bool>(name: "is_active", type: "boolean", nullable: false),
                    roletypeid = table.Column<int>(name: "role_type_id", type: "integer", nullable: true),
                    personid = table.Column<int>(name: "person_id", type: "integer", nullable: false),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_roles", x => x.id);
                    table.ForeignKey(
                        name: "fk_roles_persons_person_id",
                        column: x => x.personid,
                        principalTable: "persons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_roles_role_types_role_type_id",
                        column: x => x.roletypeid,
                        principalTable: "role_types",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "squads",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tribeid = table.Column<int>(name: "tribe_id", type: "integer", nullable: false),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
                    disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_squads", x => x.id);
                    table.ForeignKey(
                        name: "fk_squads_tribes_tribe_id",
                        column: x => x.tribeid,
                        principalTable: "tribes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "functions",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    functiontypeid = table.Column<int>(name: "function_type_id", type: "integer", nullable: true),
                    roleid = table.Column<int>(name: "role_id", type: "integer", nullable: false),
                    tribeid = table.Column<int>(name: "tribe_id", type: "integer", nullable: true),
                    squadid = table.Column<int>(name: "squad_id", type: "integer", nullable: true),
                    practiceid = table.Column<int>(name: "practice_id", type: "integer", nullable: true),
                    chapterid = table.Column<int>(name: "chapter_id", type: "integer", nullable: true),
                    teamid = table.Column<int>(name: "team_id", type: "integer", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_functions", x => x.id);
                    table.ForeignKey(
                        name: "fk_functions_chapters_chapter_id",
                        column: x => x.chapterid,
                        principalTable: "chapters",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_functions_function_types_function_type_id",
                        column: x => x.functiontypeid,
                        principalTable: "function_types",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_functions_practices_practice_id",
                        column: x => x.practiceid,
                        principalTable: "practices",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_functions_roles_role_id",
                        column: x => x.roleid,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_functions_squads_squad_id",
                        column: x => x.squadid,
                        principalTable: "squads",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_functions_teams_team_id",
                        column: x => x.teamid,
                        principalTable: "teams",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_functions_tribes_tribe_id",
                        column: x => x.tribeid,
                        principalTable: "tribes",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_chapters_practice_id",
                table: "chapters",
                column: "practice_id");

            migrationBuilder.CreateIndex(
                name: "ix_functions_chapter_id",
                table: "functions",
                column: "chapter_id");

            migrationBuilder.CreateIndex(
                name: "ix_functions_function_type_id",
                table: "functions",
                column: "function_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_functions_practice_id",
                table: "functions",
                column: "practice_id");

            migrationBuilder.CreateIndex(
                name: "ix_functions_role_id",
                table: "functions",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "ix_functions_squad_id",
                table: "functions",
                column: "squad_id");

            migrationBuilder.CreateIndex(
                name: "ix_functions_team_id",
                table: "functions",
                column: "team_id");

            migrationBuilder.CreateIndex(
                name: "ix_functions_tribe_id",
                table: "functions",
                column: "tribe_id");

            migrationBuilder.CreateIndex(
                name: "ix_roles_person_id",
                table: "roles",
                column: "person_id");

            migrationBuilder.CreateIndex(
                name: "ix_roles_role_type_id",
                table: "roles",
                column: "role_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_squads_tribe_id",
                table: "squads",
                column: "tribe_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "functions");

            migrationBuilder.DropTable(
                name: "chapters");

            migrationBuilder.DropTable(
                name: "function_types");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "squads");

            migrationBuilder.DropTable(
                name: "teams");

            migrationBuilder.DropTable(
                name: "practices");

            migrationBuilder.DropTable(
                name: "persons");

            migrationBuilder.DropTable(
                name: "role_types");

            migrationBuilder.DropTable(
                name: "tribes");
        }
    }
}
