using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KhInventoryAuth.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnimalFoods",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    PerUnitPrice = table.Column<int>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    Remain = table.Column<int>(nullable: false),
                    ForTestField = table.Column<int>(nullable: false),
                    PerCustomerTotalMalQouta = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimalFoods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Distribution",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDeleted = table.Column<bool>(nullable: false),
                    MalCount = table.Column<int>(nullable: false),
                    Etehadie = table.Column<string>(maxLength: 255, nullable: true),
                    Taavoni = table.Column<string>(maxLength: 255, nullable: true),
                    Shahrestan = table.Column<string>(maxLength: 255, nullable: true),
                    NamVaNameKhanevadegi = table.Column<string>(maxLength: 255, nullable: true),
                    CodeMelli = table.Column<string>(nullable: true),
                    AddressVaNameRusta = table.Column<string>(maxLength: 255, nullable: true),
                    Telephone = table.Column<string>(nullable: true),
                    ShomareOzviateTaavoni = table.Column<double>(nullable: true),
                    NoeFaaliat = table.Column<string>(maxLength: 255, nullable: true),
                    ZarfiatYaTedadeDamoTiur = table.Column<double>(nullable: true),
                    NodeNahade = table.Column<string>(maxLength: 255, nullable: true),
                    MeqdareTahviliKG = table.Column<string>(maxLength: 255, nullable: true),
                    QeymateHarKGbeRIAL = table.Column<string>(maxLength: 255, nullable: true),
                    MaheSahmie = table.Column<string>(maxLength: 255, nullable: true),
                    F16 = table.Column<string>(maxLength: 255, nullable: true),
                    HomeTelephone = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Distribution", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MalInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameDamdar = table.Column<string>(maxLength: 255, nullable: true),
                    Rusta = table.Column<string>(maxLength: 255, nullable: true),
                    TotalMal = table.Column<double>(nullable: true),
                    TotalCow = table.Column<double>(nullable: true),
                    TotalGowMish = table.Column<double>(nullable: true),
                    Marhale1 = table.Column<string>(maxLength: 255, nullable: true),
                    Marhale2 = table.Column<double>(nullable: true),
                    PKFrom = table.Column<string>(maxLength: 255, nullable: true),
                    PKTo = table.Column<string>(maxLength: 255, nullable: true),
                    DistributionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MalInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AnimalFoodBuy",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDeleted = table.Column<bool>(nullable: false),
                    PerUnitPrice = table.Column<int>(nullable: false),
                    TotalPrice = table.Column<int>(nullable: false),
                    Quan = table.Column<int>(nullable: false),
                    AnimalFoodId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Fish = table.Column<string>(nullable: true),
                    DateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimalFoodBuy", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnimalFoodBuy_AnimalFoods_AnimalFoodId",
                        column: x => x.AnimalFoodId,
                        principalTable: "AnimalFoods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IssueAssignments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDeleted = table.Column<bool>(nullable: false),
                    AnimalFoodId = table.Column<int>(nullable: false),
                    PersonId = table.Column<int>(nullable: false),
                    Quan = table.Column<int>(nullable: false),
                    TotalPrice = table.Column<int>(nullable: false),
                    BankFish = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IssueAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IssueAssignments_AnimalFoods_AnimalFoodId",
                        column: x => x.AnimalFoodId,
                        principalTable: "AnimalFoods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IssueAssignments_Distribution_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Distribution",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnimalFoodBuy_AnimalFoodId",
                table: "AnimalFoodBuy",
                column: "AnimalFoodId");

            migrationBuilder.CreateIndex(
                name: "IX_IssueAssignments_AnimalFoodId",
                table: "IssueAssignments",
                column: "AnimalFoodId");

            migrationBuilder.CreateIndex(
                name: "IX_IssueAssignments_PersonId",
                table: "IssueAssignments",
                column: "PersonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnimalFoodBuy");

            migrationBuilder.DropTable(
                name: "IssueAssignments");

            migrationBuilder.DropTable(
                name: "MalInfos");

            migrationBuilder.DropTable(
                name: "AnimalFoods");

            migrationBuilder.DropTable(
                name: "Distribution");
        }
    }
}
