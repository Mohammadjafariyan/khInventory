USE [khosrowshah]


SET IDENTITY_INSERT [dbo].[Distribution] ON 

select [CodeMelli]+'' from [dbo].[DistributionTemp]


INSERT  into [dbo].[Distribution]
 ([Id], [Etehadie], [Taavoni], [Shahrestan], [NamVaNameKhanevadegi], 
[CodeMelli], 
 [AddressVaNameRusta], 
 [Telephone], [ShomareOzviateTaavoni], [NoeFaaliat], [ZarfiatYaTedadeDamoTiur], [NodeNahade], [MeqdareTahviliKG], [QeymateHarKGbeRIAL], [MaheSahmie], [F16], [HomeTelephone])
 select [Id], [Etehadie], [Taavoni], [Shahrestan], [NamVaNameKhanevadegi], CONVERT (nvarchar,[CodeMelli] ), [AddressVaNameRusta], CONVERT (nvarchar,[Telephone] ), [ShomareOzviateTaavoni], [NoeFaaliat], [ZarfiatYaTedadeDamoTiur], [NodeNahade], [MeqdareTahviliKG], [QeymateHarKGbeRIAL], [MaheSahmie], [F16], [HomeTelephone] from  [dbo].[DistributionTemp]