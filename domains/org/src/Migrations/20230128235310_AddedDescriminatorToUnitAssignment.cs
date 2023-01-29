using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Org.Migrations
{
    /// <inheritdoc />
    public partial class AddedDescriminatorToUnitAssignment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "discriminator",
                table: "unit_assignments",
                newName: "assignment_type");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "assignment_type",
                table: "unit_assignments",
                newName: "discriminator");
        }
    }
}
