using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateV4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParameterBase",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    parentid = table.Column<int>(name: "parent_id", type: "integer", nullable: true),
                    discriminator = table.Column<string>(type: "text", nullable: false),
                    index = table.Column<int>(type: "integer", nullable: true),
                    externalid = table.Column<string>(name: "external_id", type: "text", nullable: true),
                    individualcontributortitle = table.Column<string>(name: "individual_contributor_title", type: "text", nullable: true),
                    managertitle = table.Column<string>(name: "manager_title", type: "text", nullable: true),
                    activefromdate = table.Column<DateTimeOffset>(name: "active_from_date", type: "timestamp with time zone", nullable: true),
                    retiredatdate = table.Column<DateTimeOffset>(name: "retired_at_date", type: "timestamp with time zone", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_parameter_base", x => x.id);
                    table.ForeignKey(
                        name: "fk_parameter_base_parameter_base_parent_id",
                        column: x => x.parentid,
                        principalTable: "ParameterBase",
                        principalColumn: "id");
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
                    parentid = table.Column<int>(name: "parent_id", type: "integer", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_types", x => x.id);
                    table.ForeignKey(
                        name: "fk_role_types_role_types_parent_id",
                        column: x => x.parentid,
                        principalTable: "role_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teams",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    type = table.Column<int>(type: "integer", nullable: false),
                    parentid = table.Column<int>(name: "parent_id", type: "integer", nullable: true),
                    formeddate = table.Column<DateTimeOffset>(name: "formed_date", type: "timestamp with time zone", nullable: false),
                    disbandeddate = table.Column<DateTimeOffset>(name: "disbanded_date", type: "timestamp with time zone", nullable: true),
                    createddate = table.Column<DateTimeOffset>(name: "created_date", type: "timestamp with time zone", nullable: false),
                    updateddate = table.Column<DateTimeOffset>(name: "updated_date", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_teams", x => x.id);
                    table.ForeignKey(
                        name: "fk_teams_teams_parent_id",
                        column: x => x.parentid,
                        principalTable: "teams",
                        principalColumn: "id");
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
                        name: "fk_level_assignments_parameter_base_level_id",
                        column: x => x.levelid,
                        principalTable: "ParameterBase",
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

            migrationBuilder.CreateIndex(
                name: "ix_level_assignments_level_id",
                table: "level_assignments",
                column: "level_id");

            migrationBuilder.CreateIndex(
                name: "ix_level_assignments_role_id",
                table: "level_assignments",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "ix_parameter_base_parent_id",
                table: "ParameterBase",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_assignments_person_id",
                table: "role_assignments",
                column: "person_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_assignments_role_id",
                table: "role_assignments",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_types_parent_id",
                table: "role_types",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_roles_role_type_id",
                table: "roles",
                column: "role_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_teams_parent_id",
                table: "teams",
                column: "parent_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "level_assignments");

            migrationBuilder.DropTable(
                name: "role_assignments");

            migrationBuilder.DropTable(
                name: "teams");

            migrationBuilder.DropTable(
                name: "ParameterBase");

            migrationBuilder.DropTable(
                name: "persons");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "role_types");
        }
    }
}
