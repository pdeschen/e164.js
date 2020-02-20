/*jslint browser: true, regexp: true, nomen: true, indent:2, white:true, sloppy:true, debug:true */
/*global exports, require, c, $, jQuery, document, window*/
/* vim: set ft=javascript: */

(function() {

	// Do not add fields directly to this data structure, they get populated by convert_napn.js, so find a new csv for npa_report.csv or add world wide entries to e164-world.json
var lookup, prefixes = {
	"1201": ["US","United States"],
	"1202": ["US","United States"],
	"1203": ["US","United States"],
	"1204": ["CA","Canada"],
	"1205": ["US","United States"],
	"1206": ["US","United States"],
	"1207": ["US","United States"],
	"1208": ["US","United States"],
	"1209": ["US","United States"],
	"1210": ["US","United States"],
	"1212": ["US","United States"],
	"1213": ["US","United States"],
	"1214": ["US","United States"],
	"1215": ["US","United States"],
	"1216": ["US","United States"],
	"1217": ["US","United States"],
	"1218": ["US","United States"],
	"1219": ["US","United States"],
	"1220": ["US","United States"],
	"1223": ["US","United States"],
	"1224": ["US","United States"],
	"1225": ["US","United States"],
	"1226": ["CA","Canada"],
	"1227": ["US","United States"],
	"1228": ["US","United States"],
	"1229": ["US","United States"],
	"1231": ["US","United States"],
	"1234": ["US","United States"],
	"1236": ["CA","Canada"],
	"1239": ["US","United States"],
	"1240": ["US","United States"],
	"1242": ["BS","Bahamas"],
	"1246": ["BB","Barbados"],
	"1248": ["US","United States"],
	"1249": ["CA","Canada"],
	"1250": ["CA","Canada"],
	"1251": ["US","United States"],
	"1252": ["US","United States"],
	"1253": ["US","United States"],
	"1254": ["US","United States"],
	"1256": ["US","United States"],
	"1257": ["CA","Canada"],
	"1260": ["US","United States"],
	"1262": ["US","United States"],
	"1263": ["CA","Canada"],
	"1264": ["AI","Anguilla"],
	"1267": ["US","United States"],
	"1268": ["AG","Antigua and Barbuda"],
	"1269": ["US","United States"],
	"1270": ["US","United States"],
	"1272": ["US","United States"],
	"1273": ["CA","Canada"],
	"1274": ["US","United States"],
	"1276": ["US","United States"],
	"1279": ["US","United States"],
	"1281": ["US","United States"],
	"1283": ["US","United States"],
	"1284": ["VG","British Virgin Islands"],
	"1289": ["CA","Canada"],
	"1301": ["US","United States"],
	"1302": ["US","United States"],
	"1303": ["US","United States"],
	"1304": ["US","United States"],
	"1305": ["US","United States"],
	"1306": ["CA","Canada"],
	"1307": ["US","United States"],
	"1308": ["US","United States"],
	"1309": ["US","United States"],
	"1310": ["US","United States"],
	"1312": ["US","United States"],
	"1313": ["US","United States"],
	"1314": ["US","United States"],
	"1315": ["US","United States"],
	"1316": ["US","United States"],
	"1317": ["US","United States"],
	"1318": ["US","United States"],
	"1319": ["US","United States"],
	"1320": ["US","United States"],
	"1321": ["US","United States"],
	"1323": ["US","United States"],
	"1325": ["US","United States"],
	"1326": ["US","United States"],
	"1327": ["US","United States"],
	"1330": ["US","United States"],
	"1331": ["US","United States"],
	"1332": ["US","United States"],
	"1334": ["US","United States"],
	"1336": ["US","United States"],
	"1337": ["US","United States"],
	"1339": ["US","United States"],
	"1340": ["VI","Virgin Islands, US"],
	"1341": ["US","United States"],
	"1343": ["CA","Canada"],
	"1345": ["KY","Cayman Islands"],
	"1346": ["US","United States"],
	"1347": ["US","United States"],
	"1351": ["US","United States"],
	"1352": ["US","United States"],
	"1353": ["US","United States"],
	"1354": ["CA","Canada"],
	"1360": ["US","United States"],
	"1361": ["US","United States"],
	"1364": ["US","United States"],
	"1365": ["CA","Canada"],
	"1367": ["CA","Canada"],
	"1368": ["CA","Canada"],
	"1369": ["US","United States"],
	"1380": ["US","United States"],
	"1382": ["CA","Canada"],
	"1385": ["US","United States"],
	"1386": ["US","United States"],
	"1387": ["CA","Canada"],
	"1401": ["US","United States"],
	"1402": ["US","United States"],
	"1403": ["CA","Canada"],
	"1404": ["US","United States"],
	"1405": ["US","United States"],
	"1406": ["US","United States"],
	"1407": ["US","United States"],
	"1408": ["US","United States"],
	"1409": ["US","United States"],
	"1410": ["US","United States"],
	"1412": ["US","United States"],
	"1413": ["US","United States"],
	"1414": ["US","United States"],
	"1415": ["US","United States"],
	"1416": ["CA","Canada"],
	"1417": ["US","United States"],
	"1418": ["CA","Canada"],
	"1419": ["US","United States"],
	"1423": ["US","United States"],
	"1424": ["US","United States"],
	"1425": ["US","United States"],
	"1428": ["CA","Canada"],
	"1430": ["US","United States"],
	"1431": ["CA","Canada"],
	"1432": ["US","United States"],
	"1434": ["US","United States"],
	"1435": ["US","United States"],
	"1437": ["CA","Canada"],
	"1438": ["CA","Canada"],
	"1440": ["US","United States"],
	"1441": ["BM","Bermuda"],
	"1442": ["US","United States"],
	"1443": ["US","United States"],
	"1445": ["US","United States"],
	"1447": ["US","United States"],
	"1448": ["US","United States"],
	"1450": ["CA","Canada"],
	"1458": ["US","United States"],
	"1460": ["CA","Canada"],
	"1463": ["US","United States"],
	"1464": ["US","United States"],
	"1468": ["CA","Canada"],
	"1469": ["US","United States"],
	"1470": ["US","United States"],
	"1473": ["GD","Grenada"],
	"1474": ["CA","Canada"],
	"1475": ["US","United States"],
	"1478": ["US","United States"],
	"1479": ["US","United States"],
	"1480": ["US","United States"],
	"1484": ["US","United States"],
	"1487": ["CA","Canada"],
	"1501": ["US","United States"],
	"1502": ["US","United States"],
	"1503": ["US","United States"],
	"1504": ["US","United States"],
	"1505": ["US","United States"],
	"1506": ["CA","Canada"],
	"1507": ["US","United States"],
	"1508": ["US","United States"],
	"1509": ["US","United States"],
	"1510": ["US","United States"],
	"1512": ["US","United States"],
	"1513": ["US","United States"],
	"1514": ["CA","Canada"],
	"1515": ["US","United States"],
	"1516": ["US","United States"],
	"1517": ["US","United States"],
	"1518": ["US","United States"],
	"1519": ["CA","Canada"],
	"1520": ["US","United States"],
	"1530": ["US","United States"],
	"1531": ["US","United States"],
	"1534": ["US","United States"],
	"1537": ["CA","Canada"],
	"1539": ["US","United States"],
	"1540": ["US","United States"],
	"1541": ["US","United States"],
	"1548": ["CA","Canada"],
	"1551": ["US","United States"],
	"1557": ["US","United States"],
	"1559": ["US","United States"],
	"1561": ["US","United States"],
	"1562": ["US","United States"],
	"1563": ["US","United States"],
	"1564": ["US","United States"],
	"1567": ["US","United States"],
	"1568": ["CA","Canada"],
	"1570": ["US","United States"],
	"1571": ["US","United States"],
	"1573": ["US","United States"],
	"1574": ["US","United States"],
	"1575": ["US","United States"],
	"1579": ["CA","Canada"],
	"1580": ["US","United States"],
	"1581": ["CA","Canada"],
	"1582": ["US","United States"],
	"1584": ["CA","Canada"],
	"1585": ["US","United States"],
	"1586": ["US","United States"],
	"1587": ["CA","Canada"],
	"1600": ["CA","Canada"],
	"1601": ["US","United States"],
	"1602": ["US","United States"],
	"1603": ["US","United States"],
	"1604": ["CA","Canada"],
	"1605": ["US","United States"],
	"1606": ["US","United States"],
	"1607": ["US","United States"],
	"1608": ["US","United States"],
	"1609": ["US","United States"],
	"1610": ["US","United States"],
	"1612": ["US","United States"],
	"1613": ["CA","Canada"],
	"1614": ["US","United States"],
	"1615": ["US","United States"],
	"1616": ["US","United States"],
	"1617": ["US","United States"],
	"1618": ["US","United States"],
	"1619": ["US","United States"],
	"1620": ["US","United States"],
	"1622": ["CA","Canada"],
	"1623": ["US","United States"],
	"1626": ["US","United States"],
	"1627": ["US","United States"],
	"1628": ["US","United States"],
	"1629": ["US","United States"],
	"1630": ["US","United States"],
	"1631": ["US","United States"],
	"1636": ["US","United States"],
	"1639": ["CA","Canada"],
	"1640": ["US","United States"],
	"1641": ["US","United States"],
	"1646": ["US","United States"],
	"1647": ["CA","Canada"],
	"1649": ["TC","Turks and Caicos Islands"],
	"1650": ["US","United States"],
	"1651": ["US","United States"],
	"1657": ["US","United States"],
	"1658": ["JM","Jamaica"],
	"1659": ["US","United States"],
	"1660": ["US","United States"],
	"1661": ["US","United States"],
	"1662": ["US","United States"],
	"1664": ["MS","Montserrat"],
	"1667": ["US","United States"],
	"1669": ["US","United States"],
	"1670": ["MP","Northern Mariana Islands"],
	"1671": ["GU","Guam"],
	"1672": ["CA","Canada"],
	"1678": ["US","United States"],
	"1679": ["US","United States"],
	"1680": ["US","United States"],
	"1681": ["US","United States"],
	"1682": ["US","United States"],
	"1683": ["CA","Canada"],
	"1684": ["AS","American Samoa"],
	"1689": ["US","United States"],
	"1701": ["US","United States"],
	"1702": ["US","United States"],
	"1703": ["US","United States"],
	"1704": ["US","United States"],
	"1705": ["CA","Canada"],
	"1706": ["US","United States"],
	"1707": ["US","United States"],
	"1708": ["US","United States"],
	"1709": ["CA","Canada"],
	"1710": ["US","United States"],
	"1712": ["US","United States"],
	"1713": ["US","United States"],
	"1714": ["US","United States"],
	"1715": ["US","United States"],
	"1716": ["US","United States"],
	"1717": ["US","United States"],
	"1718": ["US","United States"],
	"1719": ["US","United States"],
	"1720": ["US","United States"],
	"1721": ["SX","Sint Maarten (Dutch)"],
	"1724": ["US","United States"],
	"1725": ["US","United States"],
	"1726": ["US","United States"],
	"1727": ["US","United States"],
	"1730": ["US","United States"],
	"1731": ["US","United States"],
	"1732": ["US","United States"],
	"1734": ["US","United States"],
	"1737": ["US","United States"],
	"1740": ["US","United States"],
	"1742": ["CA","Canada"],
	"1743": ["US","United States"],
	"1747": ["US","United States"],
	"1753": ["CA","Canada"],
	"1754": ["US","United States"],
	"1757": ["US","United States"],
	"1758": ["LC","Saint Lucia"],
	"1760": ["US","United States"],
	"1762": ["US","United States"],
	"1763": ["US","United States"],
	"1764": ["US","United States"],
	"1765": ["US","United States"],
	"1767": ["DM","Dominica"],
	"1769": ["US","United States"],
	"1770": ["US","United States"],
	"1772": ["US","United States"],
	"1773": ["US","United States"],
	"1774": ["US","United States"],
	"1775": ["US","United States"],
	"1778": ["CA","Canada"],
	"1779": ["US","United States"],
	"1780": ["CA","Canada"],
	"1781": ["US","United States"],
	"1782": ["CA","Canada"],
	"1784": ["VC","Saint Vincent and the Grenadines"],
	"1785": ["US","United States"],
	"1786": ["US","United States"],
	"1787": ["PR","Puerto Rico"],
	"1801": ["US","United States"],
	"1802": ["US","United States"],
	"1803": ["US","United States"],
	"1804": ["US","United States"],
	"1805": ["US","United States"],
	"1806": ["US","United States"],
	"1807": ["CA","Canada"],
	"1808": ["US","United States"],
	"1809": ["DO","Dominican Republic"],
	"1810": ["US","United States"],
	"1812": ["US","United States"],
	"1813": ["US","United States"],
	"1814": ["US","United States"],
	"1815": ["US","United States"],
	"1816": ["US","United States"],
	"1817": ["US","United States"],
	"1818": ["US","United States"],
	"1819": ["CA","Canada"],
	"1820": ["US","United States"],
	"1825": ["CA","Canada"],
	"1828": ["US","United States"],
	"1829": ["DO","Dominican Republic"],
	"1830": ["US","United States"],
	"1831": ["US","United States"],
	"1832": ["US","United States"],
	"1835": ["US","United States"],
	"1838": ["US","United States"],
	"1839": ["US","United States"],
	"1840": ["US","United States"],
	"1843": ["US","United States"],
	"1845": ["US","United States"],
	"1847": ["US","United States"],
	"1848": ["US","United States"],
	"1849": ["DO","Dominican Republic"],
	"1850": ["US","United States"],
	"1851": ["CA","Canada"],
	"1854": ["US","United States"],
	"1856": ["US","United States"],
	"1857": ["US","United States"],
	"1858": ["US","United States"],
	"1859": ["US","United States"],
	"1860": ["US","United States"],
	"1862": ["US","United States"],
	"1863": ["US","United States"],
	"1864": ["US","United States"],
	"1865": ["US","United States"],
	"1867": ["CA","Canada"],
	"1868": ["TT","Trinidad and Tobago"],
	"1869": ["KN","Saint Kitts and Nevis"],
	"1870": ["US","United States"],
	"1871": ["CA","Canada"],
	"1872": ["US","United States"],
	"1873": ["CA","Canada"],
	"1876": ["JM","Jamaica"],
	"1878": ["US","United States"],
	"1879": ["CA","Canada"],
	"1901": ["US","United States"],
	"1902": ["CA","Canada"],
	"1903": ["US","United States"],
	"1904": ["US","United States"],
	"1905": ["CA","Canada"],
	"1906": ["US","United States"],
	"1907": ["US","United States"],
	"1908": ["US","United States"],
	"1909": ["US","United States"],
	"1910": ["US","United States"],
	"1912": ["US","United States"],
	"1913": ["US","United States"],
	"1914": ["US","United States"],
	"1915": ["US","United States"],
	"1916": ["US","United States"],
	"1917": ["US","United States"],
	"1918": ["US","United States"],
	"1919": ["US","United States"],
	"1920": ["US","United States"],
	"1925": ["US","United States"],
	"1928": ["US","United States"],
	"1929": ["US","United States"],
	"1930": ["US","United States"],
	"1931": ["US","United States"],
	"1934": ["US","United States"],
	"1935": ["US","United States"],
	"1936": ["US","United States"],
	"1937": ["US","United States"],
	"1938": ["US","United States"],
	"1939": ["PR","Puerto Rico"],
	"1940": ["US","United States"],
	"1941": ["US","United States"],
	"1942": ["CA","Canada"],
	"1947": ["US","United States"],
	"1949": ["US","United States"],
	"1951": ["US","United States"],
	"1952": ["US","United States"],
	"1954": ["US","United States"],
	"1956": ["US","United States"],
	"1959": ["US","United States"],
	"1970": ["US","United States"],
	"1971": ["US","United States"],
	"1972": ["US","United States"],
	"1973": ["US","United States"],
	"1975": ["US","United States"],
	"1978": ["US","United States"],
	"1979": ["US","United States"],
	"1980": ["US","United States"],
	"1984": ["US","United States"],
	"1985": ["US","United States"],
	"1986": ["US","United States"],
	"1989": ["US","United States"],
	"20": ["EG","Egypt"],
	"211": ["SS","South Sudan"],
	"212": ["MA","Morocco"],
	"213": ["DZ","Algeria"],
	"216": ["TN","Tunisia"],
	"218": ["LY","Libya"],
	"220": ["GM","Gambia"],
	"221": ["SN","Senegal"],
	"222": ["MR","Mauritania"],
	"223": ["ML","Mali"],
	"224": ["GN","Guinea"],
	"225": ["CI","Cote d'Ivoire"],
	"226": ["BF","Burkina Faso"],
	"227": ["NE","Niger"],
	"228": ["TG","Togo"],
	"229": ["BJ","Benin"],
	"230": ["MU","Mauritius"],
	"231": ["LR","Liberia"],
	"232": ["SL","Sierra Leone"],
	"233": ["GH","Ghana"],
	"234": ["NG","Nigeria"],
	"235": ["TD","Chad"],
	"236": ["CF","Central African Republic"],
	"237": ["CM","Cameroon"],
	"238": ["CV","Cape Verde"],
	"239": ["ST","Sao Tome and Principe"],
	"240": ["GQ","Equatorial Guinea"],
	"241": ["GA","Gabon"],
	"242": ["CG","Congo (Brazzaville)"],
	"243": ["CD","Congo, The Democratic Republic of the (Zaire)"],
	"244": ["AO","Angola"],
	"245": ["GW","Guinea-Bissau"],
	"246": ["DG","Diego Garcia"],
	"247": ["SH","Ascension"],
	"248": ["SC","Seychelles"],
	"249": ["SD","Sudan"],
	"250": ["RW","Rwanda"],
	"251": ["ET","Ethiopia"],
	"252": ["SO","Somalia"],
	"253": ["DJ","Djibouti"],
	"254": ["KE","Kenya"],
	"255": ["TZ","Tanzania"],
	"256": ["UG","Uganda"],
	"257": ["BI","Burundi"],
	"258": ["MZ","Mozambique"],
	"260": ["ZM","Zambia"],
	"261": ["MG","Madagascar"],
	"262269": ["YT","Mayotte"],
	"262": ["RE","Reunion"],
	"262639": ["YT","Mayotte"],
	"263": ["ZW","Zimbabwe"],
	"264": ["NA","Namibia"],
	"265": ["MW","Malawi"],
	"266": ["LS","Lesotho"],
	"267": ["BW","Botswana"],
	"268": ["SZ","Swaziland"],
	"269": ["KM","Comoros"],
	"27": ["ZA","South Africa"],
	"290": ["SH","Saint Helena and Tristan da Cunha"],
	"291": ["ER","Eritrea"],
	"297": ["AW","Arub"],
	"298": ["FO","Faroe Islands"],
	"299": ["GL","Greenland"],
	"30": ["GR","Greece"],
	"31": ["NL","Netherlands"],
	"32": ["BE","Belgium"],
	"33": ["FR","France"],
	"34": ["ES","Spain"],
	"350": ["GI","Gibraltar"],
	"351": ["PT","Portugal"],
	"352": ["LU","Luxembourg"],
	"353": ["IE","Ireland"],
	"354": ["IS","Iceland"],
	"355": ["AL","Albania"],
	"356": ["MT","Malta"],
	"357": ["CY","Cyprus"],
	"358": ["FI","Finland"],
	"35818": ["AX","Aland Islands"],
	"359": ["BG","Bulgaria"],
	"36": ["HU","Hungary"],
	"370": ["LT","Lithuania"],
	"371": ["LV","Latvia"],
	"372": ["EE","Estonia"],
	"373": ["MD","Moldova"],
	"374": ["AM","Armenia"],
	"375": ["BY","Belarus"],
	"376": ["AD","Andorra"],
	"377": ["MC","Monaco"],
	"378": ["SM","San Marino"],
	"379": ["VA","Vatican City State (Holy See)"],
	"380": ["UA","Ukraine"],
	"381": ["RS","Serbia"],
	"382": ["ME","Montenegro"],
	"385": ["HR","Croatia"],
	"386": ["SI","Slovenia"],
	"387": ["BA","Bosnia and Herzegovina"],
	"389": ["MK","Macedonia"],
	"39": ["IT","Italy"],
	"40": ["RO","Romania"],
	"41": ["CH","Switzerland"],
	"420": ["CZ","Czech Republic"],
	"421": ["SK","Slovakia"],
	"423": ["LI","Liechtenstein"],
	"43": ["AT","Austria"],
	"441481": ["GG","Guernsey"],
	"441534": ["JE","Jersey"],
	"441624": ["IM","Isle of Man"],
	"44": ["GB","United Kingdom"],
	"45": ["DK","Denmark"],
	"46": ["SE","Sweden"],
	"4779": ["SJ","Svalbard and Jan Mayen"],
	"47": ["NO","Norway"],
	"48": ["PL","Poland"],
	"49": ["DE","Germany"],
	"500": ["FK","Falkland Islands (Malvinas)"],
	"501": ["BZ","Belize"],
	"502": ["GT","Guatemala"],
	"503": ["SV","El Salvador"],
	"504": ["HN","Honduras"],
	"505": ["NI","Nicaragua"],
	"506": ["CR","Costa Rica"],
	"507": ["PA","Panama"],
	"508": ["PM","Saint Pierre and Miquelon"],
	"509": ["HT","Haiti"],
	"51": ["PE","Peru"],
	"52": ["MX","Mexico"],
	"5399": ["CU","Cuba (Guantanamo Bay)"],
	"53": ["CU","Cuba"],
	"54": ["AR","Argentina"],
	"55": ["BR","Brazil"],
	"56": ["CL","Chile"],
	"5632": ["CL","Easter Island"],
	"57": ["CO","Colombia"],
	"58": ["VE","Venezuela"],
	"590": ["GP","Guadeloupe"],
	"591": ["BO","Bolivia"],
	"592": ["GY","Guyana"],
	"593": ["EC","Ecuador"],
	"594": ["GF","French Guiana"],
	"595": ["PY","Paraguay"],
	"596": ["MQ","Martinique"],
	"597": ["SR","Suriname"],
	"598": ["UY","Uruguay"],
	"5993": ["BQ","Sint Eustatius"],
	"5994": ["BQ","Saba"],
	"5997": ["BQ","Bonaire"],
	"5999": ["CW","Curaao"],
	"60": ["MY","Malaysia"],
	"6189162": ["CC","Cocos (Keeling) Islands"],
	"6189164": ["CX","Christmas Island"],
	"61": ["AU","Australia"],
	"62": ["ID","Indonesia"],
	"63": ["PH","Philippines"],
	"64": ["NZ","Chatham Island (New Zealand)"],
	"65": ["SG","Singapore"],
	"66": ["TH","Thailand"],
	"670": ["TL","East Timor"],
	"672": ["AU","Australian External Territories"],
	"6723": ["NF","Norfolk Island"],
	"673": ["BN","Brunei Darussalam"],
	"674": ["NR","Nauru"],
	"675": ["PG","Papua New Guinea"],
	"676": ["TO","Tonga"],
	"677": ["SB","Solomon Islands"],
	"678": ["VU","Vanuatu"],
	"679": ["FJ","Fiji"],
	"680": ["PW","Palau"],
	"681": ["WF","Wallis and Futuna"],
	"682": ["CK","Cook Islands"],
	"683": ["NU","Niue"],
	"685": ["WS","Samoa"],
	"686": ["KI","Kiribati"],
	"687": ["NC","New Caledonia"],
	"688": ["TV","Tuvalu"],
	"689": ["PF","French Polynesia"],
	"690": ["TK","Tokelau"],
	"691": ["FM","Micronesia, Federated States of"],
	"692": ["MH","Marshall Islands"],
	"76": ["KZ","Kazakhstan"],
	"77": ["KZ","Kazakhstan"],
	"7": ["RU","Russia"],
	"800": ["ZZ","International Freephone Service"],
	"808": ["ZZ","International Shared Cost Service (ISCS)"],
	"81": ["JP","Japan"],
	"82": ["KR","South Korea"],
	"84": ["VN","Vietnam"],
	"850": ["KP","North Korea"],
	"852": ["HK","Hong Kong"],
	"853": ["MO","Macau"],
	"855": ["KH","Cambodia"],
	"856": ["LA","Laos"],
	"86": ["CN","China"],
	"870": ["ZZ","Inmarsat SNAC"],
	"878": ["ZZ","Universal Personal Telecommunications (UPT)"],
	"880": ["BD","Bangladesh"],
	"8810": ["ZZ","ICO Global (Mobile Satellite Service)"],
	"8811": ["ZZ","ICO Global (Mobile Satellite Service)"],
	"8812": ["ZZ","Ellipso (Mobile Satellite service)"],
	"8813": ["ZZ","Ellipso (Mobile Satellite service)"],
	"8816": ["ZZ","Iridium (Mobile Satellite service)"],
	"881": ["ZZ","Global Mobile Satellite System (GMSS)"],
	"8817": ["ZZ","Iridium (Mobile Satellite service)"],
	"8818": ["ZZ","Globalstar (Mobile Satellite Service)"],
	"8819": ["ZZ","Globalstar (Mobile Satellite Service)"],
	"88213": ["ZZ","EMSAT (Mobile Satellite service)"],
	"88216": ["ZZ","Thuraya (Mobile Satellite service)"],
	"886": ["TW","Taiwan"],
	"90": ["TR","Turkey"],
	"91": ["IN","India"],
	"92": ["PK","Pakistan"],
	"93": ["AF","Afghanistan"],
	"94": ["LK","Sri Lanka"],
	"95": ["MM","Burma"],
	"960": ["MV","Maldives"],
	"961": ["LB","Lebanon"],
	"962": ["JO","Jordan"],
	"963": ["SY","Syria"],
	"964": ["IQ","Iraq"],
	"965": ["KW","Kuwait"],
	"966": ["SA","Saudi Arabia"],
	"967": ["YE","Yemen"],
	"968": ["OM","Oman"],
	"970": ["PS","Palestinian territories"],
	"971": ["AE","United Arab Emirates"],
	"972": ["IL","Israel"],
	"973": ["BH","Bahrain"],
	"974": ["QA","Qatar"],
	"975": ["BT","Bhutan"],
	"976": ["MN","Mongolia"],
	"977": ["NP","Nepal"],
	"98": ["IR","Iran"],
	"992": ["TJ","Tajikistan"],
	"993": ["TM","Turkmenistan"],
	"994": ["AZ","Azerbaijan"],
	"99544": ["AB","Abkhazia"],
	"995": ["GE","Georgia"],
	"996": ["KG","Kyrgyzstan"],
	"998": ["UZ","Uzbekistan"]
};

numbersOnly = function(phone) {
  return phone.split(/[^\d]/).join('');
};

isSupportedPrefix = function(prefix) {
  return !!prefixes[prefix];
};

getPrefix = function(phone) {
  var prefix, c = phone.length;
  for (c; c >= 0; c=c-1) {
    prefix = phone.substring(0, c);
    if (isSupportedPrefix(prefix)) {
      return prefix;
    }
  }
};

getCountryName = function(prefix) {
  return isSupportedPrefix(prefix) && prefixes[prefix][1];
};

getCountryCode = function(prefix) {
  return isSupportedPrefix(prefix) && prefixes[prefix][0];
};

getPrefixInfo = function(prefix) {
  return {
    prefix: prefix,
    country: getCountryName(prefix),
    code: getCountryCode(prefix),
  };
};

lookup = function(phone) {
  if (!phone) {
    return;
  }
  var parsedPhone = numbersOnly(phone);
  var prefix = getPrefix(parsedPhone);
  if (prefix) {
    return getPrefixInfo(prefix);
  }
};


if (typeof exports !== "undefined"){
  exports.lookup = lookup;
  exports.prefixes = prefixes;
}
if (typeof window !== "undefined"){
  window.e164 = { lookup : lookup, prefixes: prefixes };
}

})();


