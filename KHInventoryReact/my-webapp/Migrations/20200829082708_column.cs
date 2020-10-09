using Microsoft.EntityFrameworkCore.Migrations;

namespace my_webapp.Migrations
{
    public partial class column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DistributionId",
                table: "MalInfos",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PerCustomerTotalMalQouta",
                table: "AnimalFoods",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DistributionId",
                table: "MalInfos");

            migrationBuilder.DropColumn(
                name: "PerCustomerTotalMalQouta",
                table: "AnimalFoods");
        }
    }
}
