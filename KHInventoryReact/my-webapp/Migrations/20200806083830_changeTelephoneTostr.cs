using Microsoft.EntityFrameworkCore.Migrations;

namespace my_webapp.Migrations
{
    public partial class changeTelephoneTostr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_IssueAssignments_Persons_PersonId",
                table: "IssueAssignments");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.AlterColumn<string>(
                name: "Telephone",
                table: "Distribution",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CodeMelli",
                table: "Distribution",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Distribution",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_IssueAssignments_Distribution_PersonId",
                table: "IssueAssignments",
                column: "PersonId",
                principalTable: "Distribution",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_IssueAssignments_Distribution_PersonId",
                table: "IssueAssignments");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Distribution");

            migrationBuilder.AlterColumn<double>(
                name: "Telephone",
                table: "Distribution",
                type: "float",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "CodeMelli",
                table: "Distribution",
                type: "float",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    MilliCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_IssueAssignments_Persons_PersonId",
                table: "IssueAssignments",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
