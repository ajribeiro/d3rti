
var firstYear = 1993;
var lastYear = (new Date()).getFullYear();
var firstMonth= 09;
var lastMonth= (new Date()).getMonth()+1;

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

function getHTTPObject() {
	if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		alert("Your browser does not support AJAX.");
		return null;
	}
}

function formatDate( date ) {
	var stryear = String(date.getFullYear());
	if (date.getMonth() < 9) {
		var strmonth = "0"+String(date.getMonth()+1);
	} else {
		var strmonth = String(date.getMonth()+1);
	}
	if (date.getDate() < 10) {
		var strday = "0"+String(date.getDate());
	} else {
		var strday = String(date.getDate());
	}
	return stryear+strmonth+strday;
}

function removeChildren( strIDName ) {
	div = document.getElementById(strIDName);
	while (div.hasChildNodes()) {
		div.removeChild(div.firstChild);
	}
	return 0;
}

function checkEnter(e) {
	// look for window.event in case event isn't passed in
	if (window.event) {
		e = window.event;
	}
	if (e.keyCode == 13) {
		document.getElementById('sixPlotJumpButton').click();
	}
}

function daysInMonth(iyear, imonth) {
	return 32 - new Date(iyear, imonth, 32).getDate();
}

function populateSelectElement(names, values, selected, selectElement) {
	for (var i=0; i<names.length; i++) {
		var optNew = document.createElement('option');
		optNew.text = names[i];
		optNew.value = values[i];
		if (selected[i] == 1) {
			optNew.selected = 1;
		}
		try {
			selectElement.add(optNew, null); // standards compliant; doesn't work in IE
		} catch(ex) {
			selectElement.add(optNew); // IE only
		}
	}
}

function ipRadarSelectionChanged(which) {
	if (document.getElementById("recalc_elev_options")) {
		ipUpdateInterferPos(which);
	}
	if (which == "north") {
		ipResetRadarSelection("south");
	} else {
		ipResetRadarSelection("north");
	}
}


function ipHemiSelectionChanged() {
	var hemi = document.getElementById("radarHemi").selectedIndex;
	if (hemi == 0) {
		var selectlist = document.getElementById("radarS");
		for (i = selectlist.length-1; i>=0; i--) {
			selectlist.remove(i);
		}
		selectlist.id = "radarN";
		ipPopulateNorthernRadars();
		selectlist.selectedIndex = 1
	} else {
		var selectlist = document.getElementById("radarN");
		for (i = selectlist.length-1; i>=0; i--) {
			selectlist.remove(i);
		}
		selectlist.id = "radarS";
		ipPopulateSouthernRadars();
		selectlist.selectedIndex = 4
	}
}

function ipUpdateInterferPos(which) {
	if (which == "north") {
		elem = document.getElementById("radarN")
	}
	if (which == "south") {
		elem = document.getElementById("radarS")
	}
	ind = elem.selectedIndex;
	if ( ind == 0 ) {
		return
	}
	rad = elem.options[ind].value;
	xpos  = 0.0;
	ypos  = 0.0;
	zpos  = 0.0;
	tdiff = 0.;
	scnb  = 0.;
	phid  = 1;
	switch (rad) {
		case "bks": ypos=-59.4;zpos=-2.7;tdiff=-.324;scnb=8.;break;
		case "cve": ypos=-80.0;break;
		case "cvw": ypos=-80.0;break;
		case "dce": ypos=-90.0;break;
		case "fhe": ypos=-80.0;break;
		case "fhw": ypos=-80.0;break;
		case "gbr": xpos=1.5;ypos=+100.0;tdiff=+0.478;break;
		case "han": ypos=+185.0;zpos=-2.2;tdiff=+0.181;break;
		case "hok": ypos=-100.0;zpos=2.9;break;
		case "inv": xpos=1.5;ypos=+100.0;break;
		case "kap": ypos=+100.0;zpos=-2.0;tdiff=+0.043;break;
		case "ksr": ypos=+100.0;break;
		case "kod": ypos=-100.0;break;
		case "pgr": ypos=-100.0;break;
		case "pyk": ypos=+100.0;tdiff=-0.083;break;
		case "rkn": ypos=-100.0;break;
		case "sas": ypos=-100.0;break;
		case "sto": ypos=+100.0;break;
		case "wal": ypos=+100.0;break;
		case "fir": break;
		case "hal": break;
		case "ker": break;
		case "mcm": ypos=+70.1;zpos=-4.1;break;
		case "san": ypos=+100.0;break;
		case "sps": ypos=+97.5;break
		case "sye": xpos=-5.0;ypos=+92.0;zpos=0.8;break;
		case "sys": xpos=-5.0;ypos=+92.0;zpos=0.8;break;
		case "tig": ypos=-100.0;break;
		case "unw": ypos=-100.0;break;
	}
	document.getElementById("tdiff").value = tdiff;
	document.getElementById("phidiff").value = phid;
	document.getElementById("scan_boresite_offset").value = scnb;
	document.getElementById("interfer_pos_x").value = xpos;
	document.getElementById("interfer_pos_y").value = ypos;
	document.getElementById("interfer_pos_z").value = zpos;
}

function ipResetRadarSelection(which) {
	if (which == "north") {
		if (document.getElementById("radarN").selectedIndex != 0) {
			document.getElementById("radarN").selectedIndex = 0;
		}
	}
	if (which == "south") {
		if (document.getElementById("radarS").selectedIndex != 0) {
			document.getElementById("radarS").selectedIndex = 0;
		}
	}
}

function ipPopulateNorthernRadars() {
	radarNames = ["Adak East","Adak West","Blackstone","Christmas Valley East","Christmas Valley West",
		"Clyde River","Fort Hays East","Fort Hays West","Goose Bay","Hankasalmi","Hokkaido","Inuvik","Kapuskasing",
		"King Salmon","Kodiak","Prince George","Pykkvibaer","Rankin Inlet","Saskatoon","Stokkseyri","Wallops Island",
		"Dome C East","Falkland Islands","Halley","Kerguelen","McMurdo Sound",
		"SANAE","South Pole","Syowa East","Syowa South","Tiger","Unwin","Zhongshan"];
	radarCodes = ["ade","adw","bks","cve","cvw",
		"cly","fhe","fhw","gbr","han","hok","inv","kap",
		"ksr","kod","pgr","pyk","rkn","sas","sto","wal","dce","fir","hal","ker","mcm",
		"san","sps","sye","sys","tig","unw","zho"];
	selected = [0,0,1,0,0,
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0]
	populateSelectElement(radarNames, radarCodes, selected, document.getElementById("radarN"));
}

function ipPopulateSouthernRadars() {
	radarNames = ["Southern Hemis.","Dome C East","Falkland Islands","Halley","Kerguelen","McMurdo Sound",
		"SANAE","South Pole","Syowa East","Syowa South","Tiger","Unwin","Zhongshan"];
	radarCodes = ["","dce","fir","hal","ker","mcm",
		"san","sps","sye","sys","tig","unw","zho"];
	selected = [1,0,0,0,0,
		0,0,0,0,0,0,0,0]
	populateSelectElement(radarNames, radarCodes, selected, document.getElementById("radarS"));
}

function populateYears() {
	var syear = 1993;
	var ayear = (new Date()).getFullYear();
	var nyears = ayear - syear;
	var yearNames = new Array(nyears);
	var selected = new Array(nyears);
	for (var i=nyears; i>=0; i--) {
		yearNames[i] = String(ayear-i);
		if (ayear-i == ayear) {
			selected[i] = 1;
		} else {
			selected[i] = 0;
		}
	}
	populateSelectElement(yearNames, yearNames, selected, document.getElementById("yr"));
}

function populateMonths() {
	var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var monthValues = new Array(12);
	var selected = new Array(12);
	var amonth = (new Date()).getMonth();
	for (var i=0; i<=11; i++) {
		if (i+1 < 10) {
			monthValues[i] = "0"+String(i+1);
		} else {
			monthValues[i] = String(i+1);
		}
		if (i == amonth) {
			selected[i] = 1;
		} else {
			selected[i] = 0;
		}
	}
	populateSelectElement(monthNames, monthValues, selected, document.getElementById("mon"));
}

function populateDays() {
	var adate = new Date();
	var ayear = adate.getFullYear();
	var amonth = adate.getMonth();
	var aday = adate.getDate();
	var ndays = daysInMonth(ayear, amonth);
	var dayNames = new Array(ndays);
	var selected = new Array(ndays);
	for (var i=0; i<ndays; i++) {
		if (i+1 < 10) {
			dayNames[i] = "0"+String(i+1);
		} else {
			dayNames[i] = String(i+1);
		}
		if (i+1 == aday) {
			selected[i] = 1;
		} else {
			selected[i] = 0;
		}
	}
	populateSelectElement(dayNames, dayNames, selected, document.getElementById("day"));
}

function populateLists() {
	div = document.getElementById("radarN");
	if (div != null) {
		ipPopulateNorthernRadars();
	}
	div = document.getElementById("radarS");
	if (div != null) {
		ipPopulateSouthernRadars();
	}
	div = document.getElementById("yr");
	if (div != null) {
		populateYears();
	}
	div = document.getElementById("mon");
	if (div != null) {
		populateMonths();
	}
	div = document.getElementById("day");
	if (div != null) {
		populateDays();
	}
}

function updateDayList() {
	var ayear = document.getElementById("yr").value;
	var amonth = document.getElementById("mon").value - 1;
	var selectedDay = document.getElementById("day").selectedIndex;
	var ndays = daysInMonth(ayear, amonth);
	var dayNames = new Array(ndays);
	var selected = new Array(ndays);
	for (var i=0; i<ndays; i++) {
		if (i+1 < 10) {
			dayNames[i] = "0"+String(i+1);
		} else {
			dayNames[i] = String(i+1);
		}
		if (i == selectedDay) {
			selected[i] = 1;
		} else {
			selected[i] = 0;
		}
	}
	removeChildren("day");
	populateSelectElement(dayNames, dayNames, selected, document.getElementById("day"));
}

function updateEndHour() {
	if (document.getElementById("edHr").selectedIndex < document.getElementById("stHr").selectedIndex) {
		document.getElementById("edHr").selectedIndex = (document.getElementById("stHr").selectedIndex+1) % document.getElementById("stHr").length;
	}
	if (document.getElementById("scanPlot")) {
		document.getElementById("ScanHr").selectedIndex = document.getElementById("stHr").selectedIndex;
	}
}

function updateEndMinute() {
	if (document.getElementById("edMin").selectedIndex < document.getElementById("stMin").selectedIndex) {
		document.getElementById("edMin").selectedIndex = (document.getElementById("stMin").selectedIndex+1) % document.getElementById("stMin").length;
	}
}

// not sure if IE compliant
function ipToggleParamTextInput() {	
	for (var i=0; i<document.plotForm.param.length; i++) {
		if (document.plotForm.param[i].checked) {
			if (document.plotForm.param[i].value == "elevation") {
				if (document.getElementById("recalc_elev_options") != null) {
					document.getElementById("recalc_elev_options").style.display = "block";
				}
			}
			document.getElementById(document.plotForm.param[i].value+"_scale_min").disabled = false;
			document.getElementById(document.plotForm.param[i].value+"_scale_max").disabled = false;
		} else {
			if (document.plotForm.param[i].value == "elevation") {
				if (document.getElementById("recalc_elev_options") != null) {
					document.getElementById("recalc_elev_options").style.display = "none";
					if (document.plotForm.recalc_elev.checked) {
						document.plotForm.recalc_elev.click();
					}
				}
			}
			document.getElementById(document.plotForm.param[i].value+"_scale_min").disabled = true;
			document.getElementById(document.plotForm.param[i].value+"_scale_max").disabled = true;
		}
	}
}

// not sure if IE compliant
function ipToggleRecalcTextInput() {	
	if (document.plotForm.recalc_elev.checked) {
		document.getElementById("tdiff").disabled=false;
		document.getElementById("phidiff").disabled=false;
		document.getElementById("interfer_pos_x").disabled=false;
		document.getElementById("interfer_pos_y").disabled=false;
		document.getElementById("interfer_pos_z").disabled=false;
		document.getElementById("scan_boresite_offset").disabled=false;
	} else {
		document.getElementById("tdiff").disabled=true;
		document.getElementById("phidiff").disabled=true;
		document.getElementById("interfer_pos_x").disabled=true;
		document.getElementById("interfer_pos_y").disabled=true;
		document.getElementById("interfer_pos_z").disabled=true;
		document.getElementById("scan_boresite_offset").disabled=true;
	}
}

function ipToggleScanTextInput() {
	if (document.plotForm.only_scan_id.checked) {
		document.getElementById("scan_id").disabled=false;
	} else {
		document.getElementById("scan_id").disabled=true;
	}
}

function ipToggleScanNumberTextInput() {
	if (document.plotForm.tscann.checked) {
		document.getElementById("scan_number").disabled=false;
	} else {
		document.getElementById("scan_number").disabled=true;
	}
}

function ipCoordsChange() {
	var sel = document.plotForm.coords.selectedIndex;
	if (sel == 0) {
		document.getElementById("coords_min").value = 0;
		document.getElementById("coords_max").value = 110;
	}
	if (sel == 1) {
		document.getElementById("coords_min").value = 0;
		document.getElementById("coords_max").value = 3500;
	}
	if (sel == 2) {
		document.getElementById("coords_min").value = 30;
		document.getElementById("coords_max").value = 75;
	}
	if (sel == 3) {
		document.getElementById("coords_min").value = 30;
		document.getElementById("coords_max").value = 75;
	}
	if (sel == 4) {
		document.getElementById("coords_min").value = 0;
		document.getElementById("coords_max").value = 1500;
	}
	if (sel == 5) {
		document.getElementById("coords_min").value = 30;
		document.getElementById("coords_max").value = 75;
	}
	if (sel == 6) {
		document.getElementById("coords_min").value = 30;
		document.getElementById("coords_max").value = 75;
	}
	if (sel == 7) {
		document.getElementById("coords_min").value = 0;
		document.getElementById("coords_max").value = 3000;
	}
	if (sel == 8) {
		document.getElementById("coords_min").value = 30;
		document.getElementById("coords_max").value = 75;
	}
	if (sel == 9) {
		document.getElementById("coords_min").value = 30;
		document.getElementById("coords_max").value = 75;
	}
}

function ipPotMapLoadRadars() {
	removeChildren("radars");
	if (!document.getElementById("orig_fan").checked) {
		document.getElementById("fan_all").checked=false;
		document.getElementById("fan_all").disabled=true;
		return;
	}
	document.getElementById("fan_all").disabled=false;
	var radTab = document.createElement("table");
	radTab.setAttribute("width", "100%");
	var radTbody = document.createElement("tbody");
	var th = document.createElement("th");
	th.setAttribute("colspan","3");
	row = 0;
	for (var i=0; i < document.plotForm.hemisphere.length; i++) {
		if (document.plotForm.hemisphere[i].selected) {
			hem_value = document.plotForm.hemisphere[i].value;
			break;
		}
	}
	if(hem_value == 1) {
		txt = document.createTextNode("North Radars");
		names = ["Inuvik (inv 64)","Rankin (rkn 65)","Clyde River (cly 66)","King Salmon (ksr 16)","Kodiak (kod 7)",
			"Saskatoon (sas 5)","Goose Bay (gbr 1)","Pykkvibaer (pyk 9)","Prince George (pgr 6)",
			"Kapuskasing (kap 3)","Stokkseyri (sto 8)","Hankasalmi (han 10)","Hokkaido (hok 40)",
			"Blackstone (bks 33)","Wallops Island (wal 32)",
			"Fort Hays West (fhw 204)","Fort Hays East (fhe 205)",
			"Christmas Valley West (fhw 206)","Christmas Valley East (fhe 207)",
			"Adak West (adw 208)","Adak East (ade 209)"]
		vals = ["64","65","66","16","7",
			"5","1","9","6",
			"3","8","10","40",
			"33","32",
			"204","205",
			"206","207",
			"208","209"]
	}
	if(hem_value == -1) {
		txt = document.createTextNode("South Radars");
		names = ["Dome C East (dce 96)","Falkland Islands (fir 21)","Halley (hal 4)","McMurdo Sound (mcm 20)",
			"Syowa East (sye 13)","Tiger (tig 14)","SANAE (san 11)","South Pole (sps 22)","Syowa South (sys 12)",
			"Kerguelen (ker 15)","Unwin (unw 18)","Zhongshan (zho 19)"]
		vals = ["96","21","4","20",
			"13","14","11","22","12",
			"15","18","19"]
	}
	th.appendChild(txt);
	radTbody.appendChild(th);
	var tr = document.createElement("tr");
	for(var i=0; i<vals.length;i++) {
		var td = document.createElement("td");
		var radname = document.createTextNode(names[i]);
		var inp = document.createElement("input")
		inp.setAttribute("type","checkbox")
		inp.setAttribute("name","radars")
		inp.setAttribute("value",vals[i]);
		td.appendChild(inp);
		td.appendChild(radname);
		tr.appendChild(td);
		if((i+1)%3 == 0 && i > 0) {
			if(row%2 == 1) {
				tr.setAttribute("bgcolor","#e3dfc6");
			}
			row=!row;
			radTbody.appendChild(tr);
			var tr = document.createElement("tr");
		}
	}
	if (i%3 != 0) {
		do {
			tr.appendChild(document.createElement("td"));
			i += 1;
		} while (i%3 != 0)
		if(row%2 == 1) {
			tr.setAttribute("bgcolor","#e3dfc6");
		}
		radTbody.appendChild(tr);
	}
	radTab.appendChild(radTbody);
	div.appendChild(radTab);
}

function ipPotMapSelectAllRadars() {
	if (document.getElementById("fan_all").checked) {
		for (var i=0; i < document.plotForm.radars.length; i++) {
			document.plotForm.radars[i].checked = true;
		}
	} else {
		for (var x=0; x < document.plotForm.radar.length; x++) {
			document.plotForm.radars[x].checked = false;
		}
		document.getElementById("fan_all").value = "none";
	}
}

function sixPlotToggleSlow() {
	if (document.getElementById("slowValue").value == "0") {
		document.getElementById("slowValue").value = "1";
	} else {
		document.getElementById("slowValue").value = "0";
	}
	sixPlotJumpImage();
}

function sixPlotToggleRTI() {
	if (document.getElementById("rtiValue").value == "0") {
		document.getElementById("rtiValue").value = "1";
	} else {
		document.getElementById("rtiValue").value = "0";
	}
	sixPlotJumpImage();
}

function sixPlotToggleFilter() {
	if (document.getElementById("filterValue").value == "0") {
		document.getElementById("filterValue").value = "1";
	} else {
		document.getElementById("filterValue").value = "0";
	}
	sixPlotJumpImage();
}

function sixPlotToggleSource(source) {
	var curSource = document.getElementById("rtiSource").value;
	if (curSource != source) {
		document.getElementById("rtiSource").value = ""+source;
	}
	sixPlotJumpImage();
}

function sixPlotChangeImage( strdate ) {
	var scrollPos = document.getElementById("divImg").scrollTop;
	removeChildren("sixplot");
	sixPlotLoadImage( strdate.toString(), scrollPos );
}

function sixPlotJumpImage() {
	txt = document.getElementById("sixPlotDateInput");
	sixPlotChangeImage( txt.value );
}

function scrollToPlot( scrollPos ) {
	document.getElementById("divImg").scrollTop = scrollPos;
}

function sixPlotDownloadPDF() {
	filterFlag = (document.getElementById("filterValue").value == "1");
	rtiSource = (document.getElementById("rtiSource").value == "1");
	if (rtiSource) {
		return;
	}
	txt = document.getElementById("sixPlotDateInput");
	if (filterFlag) {
		window.location = "http://davit.ece.vt.edu/images/tenplot/"+txt.value+".f.tenplot.pdf";
	} else {
		window.location = "http://davit.ece.vt.edu/images/tenplot/"+txt.value+".tenplot.pdf";
	}
}

function sixPlotLoadImage( date, scrollPos ) {
	var fimage;
	var flink;

	strdate = new String();
	if ( typeof(date) == "undefined" || date == null) {
		strdate = formatDate(new Date());
	} else {
		strdate = date.toString();
	}
	adate = new Date();
	adate.setFullYear(strdate.substring(0,4), strdate.substring(4,6)-1, strdate.substring(6,8));
	adate.setTime(adate.getTime() - 10*86400000);
	prev10Date = formatDate(adate);
	adate.setTime(adate.getTime() + 9*86400000);
	prevDate = formatDate(adate);
	adate.setTime(adate.getTime() + 2*86400000);
	nextDate = formatDate(adate);
	adate.setTime(adate.getTime() + 9*86400000);
	next10Date = formatDate(adate);

	filterFlag = (document.getElementById("filterValue").value == "1");
	rtiFlag = (document.getElementById("rtiValue").value == "1");
	rtiSource = (document.getElementById("rtiSource").value == "1");
	slowFlag = (document.getElementById("slowValue").value == "1");

	//load the display image, link to high res image, and date of the plot
	if (rtiFlag) {
		if (rtiSource) {
			hostaddr = "http://128.173.144.34/fourplots/";
			fending = ".four.jpg";
		} else {
			hostaddr = "http://davit.ece.vt.edu/images/tenplot/";
			fending = ".tenplot.jpg";
		}
		if(filterFlag == 0) {
			fimage = new Image();
			fimage.src = hostaddr+strdate+fending;
			flink = hostaddr+strdate+fending;
		} else {
			fimage = new Image();
			fimage.src = hostaddr+strdate+".f"+fending;
			flink = hostaddr+strdate+".f"+fending;
		}
	} else {
		if (slowFlag) {
			fimage = new Image();
			fimage.src = "http://sd-work2.ece.vt.edu/daily_movies/"+strdate+".allfov.slow.gif";
			flink = "http://sd-work2.ece.vt.edu/daily_movies/"+strdate+".allfov.slow.gif";
		} else {
			fimage = new Image();
			fimage.src = "http://sd-work2.ece.vt.edu/daily_movies/"+strdate+".allfov.fast.gif";
			flink = "http://sd-work2.ece.vt.edu/daily_movies/"+strdate+".allfov.fast.gif";
		}
	}

	//element where the slideshow will be loaded
	var div = document.getElementById("sixplot");

	//date header
	var header = document.createElement("h2");
	header.setAttribute("id","dateheader");

	var table = document.createElement("table");
	table.setAttribute("width", "100%");
	var tr = document.createElement("tr");
	
	// Show current date
	var td = document.createElement("td");
	td.setAttribute("align", "left");
	var txt = document.createTextNode(strdate.substring(0,4)+"/"+strdate.substring(4,6)+"/"+strdate.substring(6,8));
	td.appendChild(txt);
	tr.appendChild(td);

	// Jump to date text field
	td = document.createElement("td");
	td.setAttribute("align", "right");
	var inptxt = document.createElement("input");
	inptxt.setAttribute("id", "sixPlotDateInput");
	inptxt.setAttribute("type", "text");
	inptxt.setAttribute("name", "sixPlotDateInput");
	inptxt.setAttribute("onKeyPress", "javascript:checkEnter(event);");
	inptxt.setAttribute("value", strdate.substring(0,4)+strdate.substring(4,6)+strdate.substring(6,8));
	td.appendChild(inptxt);
	
	// Jump to date button
	var inpbtn = document.createElement("input");
	inpbtn.setAttribute("id", "sixPlotJumpButton");
	inpbtn.setAttribute("type", "button");
	inpbtn.setAttribute("name", "sixPlotJumpButton");
	inpbtn.setAttribute("value", "Jump");
	inpbtn.setAttribute("onClick", "javascript:sixPlotJumpImage();");
	td.appendChild(inpbtn);
	
	// Jump to today button
	var strtoday = formatDate(new Date());
	var inpbtn = document.createElement("input");
	inpbtn.setAttribute("id", "sixPlotTodayButton");
	inpbtn.setAttribute("type", "button");
	inpbtn.setAttribute("name", "sixPlotTodayButton");
	inpbtn.setAttribute("value", "Today");
	inpbtn.setAttribute("onClick", "javascript:sixPlotChangeImage("+strtoday.substring(0,4)+strtoday.substring(4,6)+strtoday.substring(6,8)+");");
	td.appendChild(inpbtn);
	tr.appendChild(td);

	table.appendChild(tr);
	header.appendChild(table);

	//put date header in slideshow element
	div.appendChild(header);

	// center the whole shebang
	var center = document.createElement("center");

	// Controls
	table = document.createElement("table");
	table.setAttribute("width", "100%");
// 	table.setAttribute("cellspacing", "10px");
	tr = document.createElement("tr");

	// make an empty field
	td = document.createElement("td");
	td.setAttribute("width", "25%");
	td.setAttribute("align", "left");
	td.setAttribute("style", "padding: 5px 5px;");
	a = document.createElement("a");
	a.setAttribute("href","javascript:sixPlotToggleRTI();");
	if (rtiFlag) {
		txt = document.createTextNode("Display Scan-Plot Movie");
	} else {
		txt = document.createTextNode("Display Range-Time Plots");
	}
	a.appendChild(txt);
	td.appendChild(a);
	tr.appendChild(td);
	
	//create a link element for -10 day's plot
	td = document.createElement("td");
	td.setAttribute("align", "center");
	td.setAttribute("style", "padding: 5px 5px;");
	a = document.createElement("a");
	a.setAttribute("class","button-link");
	a.setAttribute("href","javascript:sixPlotChangeImage("+prev10Date+");");
	var span = document.createElement("span");
	span.setAttribute("class","tenplot-navig");
	var spanico = document.createElement("span");
	spanico.setAttribute("class","iconFont");
	txt = document.createTextNode("[");
	spanico.appendChild(txt);
	span.appendChild(spanico);
	txt = document.createTextNode("-10 Days");
	span.appendChild(txt);
	a.appendChild(span);
	td.appendChild(a);
// 	tr.appendChild(td);

	//create a link element for previous day's plot
// 	td = document.createElement("td");
// 	td.setAttribute("align", "center");
// 	td.setAttribute("style", "padding: 5px 5px;");
	a = document.createElement("a");
	a.setAttribute("class","button-link");
	a.setAttribute("href","javascript:sixPlotChangeImage("+prevDate+");");
	var span = document.createElement("span");
	span.setAttribute("class","tenplot-navig");
	var spanico = document.createElement("span");
	spanico.setAttribute("class","iconFont");
	txt = document.createTextNode("<");
	spanico.appendChild(txt);
	span.appendChild(spanico);
	txt = document.createTextNode("-1 Day");
	span.appendChild(txt);
	a.appendChild(span);
	td.appendChild(a);
// 	tr.appendChild(td);

	//create a link element for next day's plot
// 	td = document.createElement("td");
// 	td.setAttribute("align", "center");
// 	td.setAttribute("style", "padding: 5px 5px;");
	a = document.createElement("a");
	a.setAttribute("class","button-link");
	a.setAttribute("href","javascript:sixPlotChangeImage("+nextDate+");");
	var span = document.createElement("span");
	span.setAttribute("class","tenplot-navig");
	txt = document.createTextNode("+1 Day");
	span.appendChild(txt);
	var spanico = document.createElement("span");
	spanico.setAttribute("class","iconFont");
	txt = document.createTextNode(">");
	spanico.appendChild(txt);
	span.appendChild(spanico);
	a.appendChild(span);
	td.appendChild(a);
// 	tr.appendChild(td);

	//create a link element for +10 day's plot
// 	td = document.createElement("td");
// 	td.setAttribute("align", "center");
// 	td.setAttribute("style", "padding: 5px 5px;");
	a = document.createElement("a");
	a.setAttribute("class","button-link");
	a.setAttribute("href","javascript:sixPlotChangeImage("+next10Date+");");
	var span = document.createElement("span");
	span.setAttribute("class","tenplot-navig");
	txt = document.createTextNode("+10 Days");
	span.appendChild(txt);
	var spanico = document.createElement("span");
	spanico.setAttribute("class","iconFont");
	txt = document.createTextNode("]");
	spanico.appendChild(txt);
	span.appendChild(spanico);
	a.appendChild(span);
	td.appendChild(a);
	tr.appendChild(td);

	// make a field for the filter button
	td = document.createElement("td");
	td.setAttribute("id", "filterText");
	td.setAttribute("width", "25%");
	td.setAttribute("align", "right");
	td.setAttribute("style", "padding: 5px 5px;");
	a = document.createElement("a");
	if (rtiFlag) {
		a.setAttribute("href","javascript:sixPlotToggleFilter();");
		if (filterFlag) {
			txt = document.createTextNode("Switch Filter off");
		} else {
			txt = document.createTextNode("Switch Filter on");
		}
	} else {
		a.setAttribute("href","javascript:sixPlotToggleSlow();");
		if (slowFlag) {
			txt = document.createTextNode("Switch to fast movie");
		} else {
			txt = document.createTextNode("Switch to slow movie");
		}
	}
	a.appendChild(txt);
	td.appendChild(a);
	tr.appendChild(td);
	table.appendChild(tr);
	center.appendChild(table);

	hr = document.createElement("hr");
	center.appendChild(hr);

	div.appendChild(center);

	var divIm = document.createElement("div");
	divIm.setAttribute("style", "max-height: 600px; overflow-y: scroll;");
	divIm.setAttribute("id","divImg");
	table = document.createElement("table");
	tr = document.createElement("tr");
	td = document.createElement("td");
	td.setAttribute("align", "center");
	td.setAttribute("width", "100%");
	//create image element
	var a = document.createElement("a");
	a.setAttribute("href",flink);
	a.setAttribute("target","_blank");
	var plot = document.createElement("img");
	plot.setAttribute("onload","scrollToPlot("+scrollPos+")");
	plot.setAttribute("id","show");
	plot.setAttribute("style","display: block;");
	//set image source, width, height
	plot.setAttribute("src",fimage.src);
	plot.setAttribute("width","100%");
// 	plot.setAttribute("height","95%");
	a.appendChild(plot);
	td.appendChild(a);
	tr.appendChild(td);
	table.appendChild(tr);

	//put image in scrollable div
	divIm.appendChild(table)

	//put image in plot
	div.appendChild(divIm);

	// Format plots and download pdf
	center = document.createElement("center");
	hr = document.createElement("hr");
	center.appendChild(hr);
	table = document.createElement("table");
	table.setAttribute("width", "100%");
	table.setAttribute("cellspacing", "10px");
	tr = document.createElement("tr");
	
	//Lasse's plots
// 	td = document.createElement("td");
// 	td.setAttribute("width", "33%");
// 	td.setAttribute("align", "center");
// 	td.setAttribute("colspan", "2");
// 	a = document.createElement("a");
// 	a.setAttribute("href","javascript:sixPlotToggleSource(0);");
// 	txt = document.createTextNode("Display Lasse's Plots");
// 	a.appendChild(txt);
// 	td.appendChild(a);
// 	tr.appendChild(td);

	// Download PDF button
	td = document.createElement("td");
	td.setAttribute("width", "100%");
	td.setAttribute("align", "center");
	td.setAttribute("colspan", "2");
	var pdfbutton = document.createElement("input");
	pdfbutton.setAttribute("id", "sixPlotPDFButton");
	pdfbutton.setAttribute("type","button");
	pdfbutton.setAttribute("value","Download PDF");
	pdfbutton.setAttribute("name","sixPlotPDFButton");
	pdfbutton.setAttribute("onClick","javascript:sixPlotDownloadPDF();");
	td.appendChild(pdfbutton);
	tr.appendChild(td);
	
	// AJ's plots
// 	td = document.createElement("td");
// 	td.setAttribute("width", "33%");
// 	td.setAttribute("align", "center");
// 	td.setAttribute("colspan", "2");
// 	a = document.createElement("a");
// 	a.setAttribute("href","javascript:sixPlotToggleSource(1);");
// 	txt = document.createTextNode("Display AJ's Plots");
// 	a.appendChild(txt);
// 	td.appendChild(a);
// 	tr.appendChild(td);
	
	table.appendChild(tr);
	center.appendChild(table);
	div.appendChild(center);

//	var newObject = jQuery.extend(true, {}, center);
//	var bottomCenter = JSON.parse(JSON.stringify(center));
//	div.appendChild(newObject);
}

function ipConstructURL(type) {
	if (type == "rtp") {
		return ipConstructRTPURL();
	} else if (type == "tsr") {
		return ipConstructTSRURL();
	} else if (type == "spl") {
		return ipConstructSPLURL();
	} else if (type == "mpp") {
		return ipConstructMPPURL();
	} else if (type == "tec") {
		return ipConstructTECURL();
	} else if (type == "tcm") {
		return ipConstructTCMURL();
	} else if (type == "tcf") {
		return ipConstructTCFURL();
	} else if (type == "elh") {
		return ipConstructELHURL();
	} else if (type == "fft") {
		return ipConstructFFTURL();
	} else if (type == "rtrtp") {
		return ipConstructRTRTPURL();
	} else if (type == "raypaths") {
		return ipConstructRAYURL();
	} else if (type == "radfov") {
		return ipConstructRADFOVURL();
	} else if (type == "rec") {
		return ipConstructRECURL();
	} else if (type == "radfind") {
		return ipConstructRADFINDURL();
	} else if (type == "acf") {
		return ipConstructACFURL();
	} else if (type == "ris") {
		return ipConstructRISURL();
	}
}


function ipConstructTECURL() {
	shr = document.plotForm.stHr.value;
	smin = document.plotForm.stMin.value;
	
	var hem_value = "";
	for(var i=0; i < document.plotForm.hemisphere.length; i++) {
		if(document.plotForm.hemisphere[i].selected) {
			hem_value = document.plotForm.hemisphere[i].value;
			break;
		}
	}
	if(hem_value == "") {
		alert("Please select a hemisphere.");
		return null;
	}

	medianf = "0";
	dlat = "0";
	dlon = "0";
	slat = "0";
	thresh = "0";
	gradient = "0";

	if (document.plotForm.blnkmap.checked) {
		tparam = "blnkmap";
		tscale = "0_0";
	} else {
		if (document.plotForm.med_filt.checked) {
			medianf = "1";
			dlat = document.plotForm.dlat.value
			dlon = document.plotForm.dlon.value
			slat = document.plotForm.slat.value
			thresh = document.plotForm.thresh.value
			if (document.plotForm.gradient.checked) {
				gradient = "1";
			}
		} else {
			medianf = "0";
			dlat = "0";
			dlon = "0";
			slat = "0";
			thresh = "0";
			gradient = "0";
		}
		if (document.plotForm.ptec.checked) {
			tparam = "tec";
			tscale = document.plotForm.tec_scale_min.value+'_'+
				document.plotForm.tec_scale_max.value;
		} else  {
			tparam = "dtec";
			tscale = document.plotForm.dtec_scale_min.value+'_'+
				document.plotForm.dtec_scale_max.value;
		}
	}

	if (document.plotForm.plot_cell.checked) {
		region = document.plotForm.min_beam.value+'_'+
			document.plotForm.max_beam.value+'_'+
			document.plotForm.min_gate.value+'_'+
			document.plotForm.max_gate.value;
	} else {
		region = "0_0"
	}

	var coo_value = "";
	for(var i=0; i < document.plotForm.coords.length; i++) {
		if(document.plotForm.coords[i].selected) {
			coo_value = document.plotForm.coords[i].value;
		}
	}

	world = "0";
	if(document.plotForm.coords[3].selected) {
		world = "1";
	}

	xra_value = document.plotForm.xmin.value+'_'+document.plotForm.xmax.value;
	yra_value = document.plotForm.ymin.value+'_'+document.plotForm.ymax.value;

	pmap = "0";
	phmb = "0";
	term = "0";
	prad = "0";
	if (document.plotForm.conv_map.checked) {
		pmap = "1";
	}
	if (document.plotForm.hm_bnd.checked) {
		phmb = "1";
	}
	if (document.plotForm.trmtr.checked) {
		term = "1"
	}
	st_ids = "";
	if (document.plotForm.orig_fan.checked) {
		prad = "1";
		for (var i=0; i < document.plotForm.radars.length; i++) {
			if(document.plotForm.radars[i].checked) {
				if (st_ids == "") {
					st_ids = document.plotForm.radars[i].value;
				} else {
					st_ids = st_ids+'_'+document.plotForm.radars[i].value;
				}
			}
		}
	}

	if (document.plotForm.paramfov.checked) {
		rparam = "none";
		rscale = "0_0";
	} else {
		if (document.plotForm.paramvel.checked) {
			rparam = "velocity";
			rscale = document.plotForm.velocity_scale_min.value+'_'+
				document.plotForm.velocity_scale_max.value;
		} else {
			rparam = "power";
			rscale = document.plotForm.power_scale_min.value+'_'+
				document.plotForm.power_scale_max.value;
		}
	}
	
	gfl_value = "";
	for (var i=0; i<document.plotForm.gflag.length;i++) {
		if (document.plotForm.gflag[i].checked) {
			gfl_value = document.plotForm.gflag[i].value;
			break;
		}
	}
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	var url = "/assets/php/plot_tec.php?plotTEC=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+shr+
		"&smin="+smin+
		"&hemi="+hem_value+
		"&tparam="+tparam+
		"&tscale="+tscale+
		"&medianf="+medianf+
		"&dlat="+dlat+
		"&dlon="+dlon+
		"&slat="+slat+
		"&thresh="+thresh+
		"&gradient="+gradient+
		"&coord="+coo_value+
		"&world="+world+
		"&xrange="+xra_value+
		"&yrange="+yra_value+
		"&pmap="+pmap+
		"&phmb="+phmb+
		"&term="+term+
		"&prad="+prad+
		"&st_ids="+st_ids+
		"&rparam="+rparam+
		"&rscale="+rscale+
		"&region="+region+
		"&gflag="+gfl_value+
		"&debug="+deb_value;
	return url;
}

function ipConstructTCMURL() {
	shr = document.plotForm.stHr.value;
	smin = document.plotForm.stMin.value;
	fhr = document.plotForm.edHr.value;
	fmin = document.plotForm.edMin.value;
	
	var hem_value = "";
	for(var i=0; i < document.plotForm.hemisphere.length; i++) {
		if(document.plotForm.hemisphere[i].selected) {
			hem_value = document.plotForm.hemisphere[i].value;
			break;
		}
	}
	if(hem_value == "") {
		alert("Please select a hemisphere.");
		return null;
	}

	if (document.plotForm.ptec.checked) {
		tparam = "tec";
		tscale = document.plotForm.tec_scale_min.value+'_'+
			document.plotForm.tec_scale_max.value;
	} else  {
		tparam = "dtec";
		tscale = document.plotForm.dtec_scale_min.value+'_'+
			document.plotForm.dtec_scale_max.value;
	}

	medianf = "0";
	dlat = "0";
	dlon = "0";
	slat = "0";
	thresh = "0";
	gradient = "0";
	if (document.plotForm.med_filt.checked) {
		medianf = "1";
		dlat = document.plotForm.dlat.value
		dlon = document.plotForm.dlon.value
		slat = document.plotForm.slat.value
		thresh = document.plotForm.thresh.value
		if (document.plotForm.gradient.checked) {
			gradient = "1";
		}
	}

	var coo_value = "";
	for(var i=0; i < document.plotForm.coords.length; i++) {
		if(document.plotForm.coords[i].selected) {
			coo_value = document.plotForm.coords[i].value;
		}
	}

	world = "0";
	if(document.plotForm.coords[3].selected) {
		world = "1";
	}

	xra_value = document.plotForm.xmin.value+'_'+document.plotForm.xmax.value;
	yra_value = document.plotForm.ymin.value+'_'+document.plotForm.ymax.value;
	
	pmap = "0";
	phmb = "0";
	term = "0";
	if (document.plotForm.conv_map.checked) {
		pmap = "1";
	}
	if (document.plotForm.hm_bnd.checked) {
		phmb = "1";
	}
	if (document.plotForm.trmtr.checked) {
		term = "1"
	}
	prad = "0";
	st_ids = "";
	if (document.plotForm.orig_fan.checked) {
		prad = "1";
		for (var i=0; i < document.plotForm.radars.length; i++) {
			if(document.plotForm.radars[i].checked) {
				if (st_ids == "") {
					st_ids = document.plotForm.radars[i].value;
				} else {
					st_ids = st_ids+'_'+document.plotForm.radars[i].value;
				}
			}
		}
	}

	if (document.plotForm.paramfov.checked) {
		rparam = "none";
		rscale = "0_0";
	} else {
		if (document.plotForm.paramvel.checked) {
			rparam = "velocity";
			rscale = document.plotForm.velocity_scale_min.value+'_'+
				document.plotForm.velocity_scale_max.value;
		} else {
			rparam = "power";
			rscale = document.plotForm.power_scale_min.value+'_'+
				document.plotForm.power_scale_max.value;
		}
	}
	
	gfl_value = "";
	for (var i=0; i<document.plotForm.gflag.length;i++) {
		if (document.plotForm.gflag[i].checked) {
			gfl_value = document.plotForm.gflag[i].value;
			break;
		}
	}

	if (document.plotForm.plot_cell.checked) {
		region = document.plotForm.min_beam.value+'_'+
			document.plotForm.max_beam.value+'_'+
			document.plotForm.min_gate.value+'_'+
			document.plotForm.max_gate.value;
	} else {
		region = "0_0"
	}

	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	var url = "/assets/php/plot_tec.php?plotTCM=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+shr+
		"&smin="+smin+
		"&fhr="+fhr+
		"&fmin="+fmin+
		"&hemi="+hem_value+
		"&tparam="+tparam+
		"&tscale="+tscale+
		"&medianf="+medianf+
		"&dlat="+dlat+
		"&dlon="+dlon+
		"&slat="+slat+
		"&thresh="+thresh+
		"&gradient="+gradient+
		"&coord="+coo_value+
		"&world="+world+
		"&xrange="+xra_value+
		"&yrange="+yra_value+
		"&pmap="+pmap+
		"&phmb="+phmb+
		"&term="+term+
		"&prad="+prad+
		"&st_ids="+st_ids+
		"&rparam="+rparam+
		"&rscale="+rscale+
		"&region="+region+
		"&gflag="+gfl_value+
		"&debug="+deb_value;
	return url;
}

function ipConstructTCFURL() {
	shr = document.plotForm.stHr.value;
	smin = document.plotForm.stMin.value;
	
	var hem_value = "";
	for(var i=0; i < document.plotForm.hemisphere.length; i++) {
		if(document.plotForm.hemisphere[i].selected) {
			hem_value = document.plotForm.hemisphere[i].value;
			break;
		}
	}
	if(hem_value == "") {
		alert("Please select a hemisphere.");
		return null;
	}

	tscale = document.plotForm.tec_scale_min.value+'_'+
		document.plotForm.tec_scale_max.value;

	dlat = document.plotForm.dlat.value;
	dlon = document.plotForm.dlon.value;
	slat = document.plotForm.slat.value;
	thresh = document.plotForm.thresh.value;

	var coo_value = "";
	for(var i=0; i < document.plotForm.coords.length; i++) {
		if(document.plotForm.coords[i].selected) {
			coo_value = document.plotForm.coords[i].value;
		}
	}

	xra_value = document.plotForm.xmin.value+'_'+document.plotForm.xmax.value;
	yra_value = document.plotForm.ymin.value+'_'+document.plotForm.ymax.value;

	pmap = "0";
	phmb = "0";
	if (document.plotForm.conv_map.checked) {
		pmap = "1";
	}
	if (document.plotForm.hm_bnd.checked) {
		phmb = "1";
	}

	st_ids = "";
	if (document.plotForm.orig_fan.checked) {
		prad = "1";
		for (var i=0; i < document.plotForm.radars.length; i++) {
			if(document.plotForm.radars[i].checked) {
				if (st_ids == "") {
					st_ids = document.plotForm.radars[i].value;
				} else {
					st_ids = st_ids+'_'+document.plotForm.radars[i].value;
				}
			}
		}
	}


	if (document.plotForm.lin.checked) {
		linear = "1";
		vscale = document.plotForm.velocity_scale_min.value+'_'+
			document.plotForm.velocity_scale_max.value;
	} else  {
		linear = "0";
		vscale = document.plotForm.velocity_scale_min.value+'_'+
			document.plotForm.velocity_scale_max.value;
	}

	gfl_value = "";
	for (var i=0; i<document.plotForm.gflag.length;i++) {
		if (document.plotForm.gflag[i].checked) {
			gfl_value = document.plotForm.gflag[i].value;
			break;
		}
	}

	average = document.plotForm.average.value;
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	var url = "/assets/php/plot_tec.php?plotTCF=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+shr+
		"&smin="+smin+
		"&hemi="+hem_value+
		"&tscale="+tscale+
		"&dlat="+dlat+
		"&dlon="+dlon+
		"&slat="+slat+
		"&thresh="+thresh+
		"&coord="+coo_value+
		"&xrange="+xra_value+
		"&yrange="+yra_value+
		"&pmap="+pmap+
		"&phmb="+phmb+
		"&st_ids="+st_ids+
		"&vscale="+vscale+
		"&linear="+linear+
		"&average="+average+
		"&gflag="+gfl_value+
		"&debug="+deb_value;
	return url;
}

function ipConstructMPPURL() {
	shr = document.plotForm.stHr.value;
	smin = document.plotForm.stMin.value;
	
	var hem_value = "";
	for(var i=0; i < document.plotForm.hemisphere.length; i++) {
		if(document.plotForm.hemisphere[i].selected) {
			hem_value = document.plotForm.hemisphere[i].value;
			break;
		}
	}
	if(hem_value == "") {
		alert("Please select a hemisphere.");
		return null;
	}

	var sca_value = "";
	sca_value = document.getElementById("velocity_scale_min").value+"_"+
		document.getElementById("velocity_scale_max").value;

	var coo_value = "";
	for(var i=0; i < document.plotForm.coords.length; i++) {
		if(document.plotForm.coords[i].selected) {
			coo_value = document.plotForm.coords[i].value;
		}
	}


	latpltrng = document.plotForm.latpltrng.value;

	if(latpltrng == "50") {
		xra_value = "-40"+"_"+"40";
		yra_value = "-40"+"_"+"40";
	}

	if(latpltrng == "55") {
		xra_value = "-34"+"_"+"34";
		yra_value = "-34"+"_"+"34";
	}

	if(latpltrng == "60") {
		xra_value = "-31"+"_"+"31";
		yra_value = "-31"+"_"+"31";
	}

	if(latpltrng == "65") {
		xra_value = "-24"+"_"+"24";
		yra_value = "-24"+"_"+"24";
	}

	if(latpltrng == "70") {
		xra_value = "-20"+"_"+"20";
		yra_value = "-20"+"_"+"20";
	}

	if(latpltrng == "75") {
		xra_value = "-14"+"_"+"14";
		yra_value = "-14"+"_"+"14";
	}

	if(latpltrng == "80") {
		xra_value = "-10"+"_"+"10";
		yra_value = "-10"+"_"+"10";
	}
	
	var mod_value= "";
	for(var i=0; i < document.plotForm.model.length; i++) {
		if(document.plotForm.model[i].checked) {
			mod_value = document.plotForm.model[i].value;
		}
	}
	
	var st_ids = "";
	var orig_fan = "0";

	no_plot_imf_ind = 0
	no_fov_names = 0


	if (document.plotForm.nopltimf.checked) {
		no_plot_imf_ind = 1
	}

	if (document.plotForm.nonamesfov.checked) {
		no_fov_names = 1
	}

	dms_ssj_overlay = 0
	dms_ssies_overlay = 0
	poes_data_overlay = 0
	r1_oval_overlay = 0
	r2_oval_overlay = 0

	if (document.plotForm.ovdmsssj.checked) {
		dms_ssj_overlay = 1
	}

	if (document.plotForm.ovdmsssies.checked) {
		dms_ssies_overlay = 1
	}

	if (document.plotForm.ovpoes.checked) {
		poes_data_overlay = 1
	}

	if (document.plotForm.ovr1oval.checked) {
		r1_oval_overlay = 1
	}

	if (document.plotForm.ovr2oval.checked) {
		r2_oval_overlay = 1
	}


	var rmcntrfill = 0;

	if (document.plotForm.rmcntrfill.checked) {
		rmcntrfill = 1
	}

	if (document.plotForm.orig_fan.checked) {
		orig_fan = "1";
		for (var i=0; i < document.plotForm.radars.length; i++) {
			if(document.plotForm.radars[i].checked) {
				if (st_ids == "") {
					st_ids = document.plotForm.radars[i].value;
				} else {
					st_ids = st_ids+'_'+document.plotForm.radars[i].value;
				}
			}
		}
	}
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	var url = "/assets/php/plot_lib.php?plotPOT=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+shr+
		"&smin="+smin+
		"&hemi="+hem_value+
		"&no_fov_names="+no_fov_names+
		"&no_plot_imf_ind="+no_plot_imf_ind+
		"&dms_ssj_overlay="+dms_ssj_overlay+
		"&dms_ssies_overlay="+dms_ssies_overlay+
		"&poes_data_overlay="+poes_data_overlay+
		"&r1_oval_overlay="+r1_oval_overlay+
		"&r2_oval_overlay="+r2_oval_overlay+
		"&rmcntrfill="+rmcntrfill+
		"&scale="+sca_value+
		"&coord="+coo_value+
		"&xrange="+xra_value+
		"&yrange="+yra_value+
		"&model="+mod_value+
		"&orig_fan="+orig_fan+
		"&st_ids="+st_ids+
		"&debug="+deb_value;
	return url;
}

function ipConstructSPLURL() {
	shr = document.plotForm.stHr.value;
	smin = document.plotForm.stMin.value;
	if (document.getElementById("scanPlot")) {
		shr = document.plotForm.ScanHr.value;
		smin = document.plotForm.ScanMin.value;
     		document.getElementById("outputPlotRight").style.display = "block";
		document.getElementById("showhideScan").innerHTML = "(Hide)";
	}

	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	if (document.getElementById('radarS')) {
		for(var i=0; i < document.plotForm.radarS.length; i++) {
			if(document.plotForm.radarS[i].selected) {
				if (document.plotForm.radarS[i].value != "") {
					radS_value = document.plotForm.radarS[i].value;
					break;
				}
			}
		}
	}
	if (document.getElementById('radarN')) {
		for(var i=0; i < document.plotForm.radarN.length; i++) {
			if(document.plotForm.radarN[i].selected) {
				if (document.plotForm.radarN[i].value != "") {
					radN_value = document.plotForm.radarN[i].value;
					break;
				}
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}
	
	dft_value = "";
	for (var i=0; i<document.plotForm.dataformat.length;i++) {
		if (document.plotForm.dataformat[i].selected) {
			dft_value = document.plotForm.dataformat[i].value;
			break;
		}
	}

	var par_value = "";
	var sca_value = "";
	for(var i=0; i < document.plotForm.param.length; i++) {
		if(document.plotForm.param[i].checked) {
			if (par_value == "") {
				par_value = document.plotForm.param[i].value;
				sca_value = document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			} else {
				par_value = par_value + "_" + document.plotForm.param[i].value;
				sca_value = sca_value + "_" + 
					document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			}
		}
	}
	if (par_value == "") {
		alert("Please select at least 1 parameter to plot.");
		return null;
	}

	var coo_value = "";
	for(var i=0; i < document.plotForm.coords.length; i++) {
		if(document.plotForm.coords[i].selected) {
			coo_value = document.plotForm.coords[i].value;
		}
	}

	xra_value = "0_0"
	yra_value = "0_0"
	//xra_value = document.plotForm.xmin.value+'_'+document.plotForm.xmax.value;
	//yra_value = document.plotForm.ymin.value+'_'+document.plotForm.ymax.value;

	scn_value = "";
	if (document.getElementById("scan_number")) {
		if (document.plotForm.scan_number.disabled) {
			scn_value = "-1";
		} else {
			scn_value = document.plotForm.scan_number.value;
		}
	} else {
		scn_value = "-1";
	}
	
	cha_value = "";
	for (var i=0; i<document.plotForm.channel.length;i++) {
		if (document.plotForm.channel[i].selected) {
			cha_value = document.plotForm.channel[i].value;
			break
		}
	}
	
	sid_value = "";
	if (document.plotForm.only_scan_id.checked) {
		sid_value = document.getElementById("scan_id").value;
	} else {
		sid_value = -1;
	}
	
	gfl_value = "";
	for (var i=0; i<document.plotForm.gflag.length;i++) {
		if (document.plotForm.gflag[i].selected) {
			gfl_value = document.plotForm.gflag[i].value;
			break;
		}
	}
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";
	
	filt_value = "0";
	if (document.getElementById("filter").checked)
		filt_value = "1";
	
	fov_value = "0";
	if (document.getElementById("showfov")) {
		if (document.getElementById("showfov").checked)
			fov_value = "1";
	} else fov_value = "1";

	var url = "/assets/php/plot_lib.php?plotFAN=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+shr+
		"&smin="+smin+
		"&radar="+rad_value+
		"&param="+par_value+
		"&scale="+sca_value+
		"&coord="+coo_value+
		"&xrange="+xra_value+
		"&yrange="+yra_value+
		"&scannu="+scn_value+
		"&channel="+cha_value+
		"&scanid="+sid_value+
		"&data_format="+dft_value+
		"&gflag="+gfl_value+
		"&debug="+deb_value+
		"&filter="+filt_value+
		"&fov="+fov_value;
	return url;
}

function ipConstructTSRURL() {
	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	if (document.getElementById('radarS')) {
		for(var i=0; i < document.plotForm.radarS.length; i++) {
			if(document.plotForm.radarS[i].selected) {
				if (document.plotForm.radarS[i].value != "") {
					radS_value = document.plotForm.radarS[i].value;
					break;
				}	
			}
		}
	}
	if (document.getElementById('radarN')) {
		for(var i=0; i < document.plotForm.radarN.length; i++) {
			if(document.plotForm.radarN[i].selected) {
				if (document.plotForm.radarN[i].value != "") {
					radN_value = document.plotForm.radarN[i].value;
					break;
				}
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}
	
	dft_value = "";
	for (var i=0; i<document.plotForm.dataformat.length;i++) {
		if (document.plotForm.dataformat[i].selected) {
			dft_value = document.plotForm.dataformat[i].value;
			break;
		}
	}

	var par_value = "";
	var sca_value = "";
	for(var i=0; i < document.plotForm.param.length; i++) {
		if(document.plotForm.param[i].checked) {
			if (par_value == "") {
				par_value = document.plotForm.param[i].value;
				sca_value = document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			} else {
				par_value = par_value + "_" + document.plotForm.param[i].value;
				sca_value = sca_value + "_" + 
					document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			}
		}
	}
	if (par_value == "") {
		alert("Please select at least 1 parameter to plot.");
		return null;
	}

	bea_value = "";
	for (var i=0; i<document.plotForm.beam.length;i++) {
		if (document.plotForm.beam[i].selected) {
			bea_value = document.plotForm.beam[i].value;
			break
		}
	}

	gat_value = "";
	for (var i=0; i<document.plotForm.gate.length;i++) {
		if (document.plotForm.gate[i].selected) {
			gat_value = document.plotForm.gate[i].value;
			break
		}
	}
	
	cha_value = "";
	for (var i=0; i<document.plotForm.channel.length;i++) {
		if (document.plotForm.channel[i].selected) {
			cha_value = document.plotForm.channel[i].value;
			break
		}
	}
	
	sid_value = "";
	if (document.plotForm.only_scan_id.checked) {
		sid_value = document.getElementById("scan_id").value;
	} else {
		sid_value = -1;
	}
	
	gfl_value = "";
	for (var i=0; i<document.plotForm.gflag.length;i++) {
		if (document.plotForm.gflag[i].checked) {
			gfl_value = document.plotForm.gflag[i].value;
			break;
		}
	}
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

 var url = "/assets/php/plot_lib.php?plotTSR=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+document.plotForm.stHr.value+
		"&smin="+document.plotForm.stMin.value+
		"&fhr="+document.plotForm.edHr.value+
		"&fmin="+document.plotForm.edMin.value+
		"&radar="+rad_value+
		"&param="+par_value+
		"&scale="+sca_value+
		"&beam="+bea_value+
		"&gate="+gat_value+
		"&channel="+cha_value+
		"&scanid="+sid_value+
		"&gflag="+gfl_value+
		"&data_format="+dft_value+
		"&debug="+deb_value;
	return url;
}

function ipConstructRECURL() {
	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	for(var i=0; i < document.plotForm.radarS.length; i++) {
		if(document.plotForm.radarS[i].selected) {
			if (document.plotForm.radarS[i].value != "") {
				radS_value = document.plotForm.radarS[i].value;
				break;
			}
		}
	}
	for(var i=0; i < document.plotForm.radarN.length; i++) {
		if(document.plotForm.radarN[i].selected) {
			if (document.plotForm.radarN[i].value != "") {
				radN_value = document.plotForm.radarN[i].value;
				break;
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}

	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

 var url = "/assets/php/plot_lib.php?printREC=yes"+
		"&year="+document.plotForm.yr.value+
		"&month="+document.plotForm.mon.value+
		"&day="+document.plotForm.day.value+
		"&shr="+document.plotForm.stHr.value+
		"&smin="+document.plotForm.stMin.value+
		"&fhr="+document.plotForm.edHr.value+
		"&fmin="+document.plotForm.edMin.value+
		"&radar="+rad_value+
		"&debug="+deb_value;
	return url;
}

function ipConstructACFURL() {
	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	if (document.getElementById('radarS') != null) {
		for(var i=0; i < document.plotForm.radarS.length; i++) {
			if(document.plotForm.radarS[i].selected) {
				if (document.plotForm.radarS[i].value != "") {
					radS_value = document.plotForm.radarS[i].value;
					break;
				}
			}
		}
	}
	if (document.getElementById('radarN') != null) {
		for(var i=0; i < document.plotForm.radarN.length; i++) {
			if(document.plotForm.radarN[i].selected) {
				if (document.plotForm.radarN[i].value != "") {
					radN_value = document.plotForm.radarN[i].value;
					break;
				}
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}

	bea_value = "";
	for (var i=0; i<document.plotForm.beam.length;i++) {
		if (document.plotForm.beam[i].selected) {
			bea_value = document.plotForm.beam[i].value;
			break
		}
	}

	meth_value = "";
	for (var i=0; i<document.plotForm.meth.length;i++) {
		if (document.plotForm.meth[i].checked) {
			meth_value = document.plotForm.meth[i].value;
			break
		}
	}

	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";
alert("sdkjfsdjkfhk")
 var url = "/assets/php/plot_lib.php?plotACF=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+document.plotForm.stHr.value+
		"&smin="+document.plotForm.stMin.value+
		"&ssec="+document.plotForm.stSec.value+

		"&meth="+meth_value+
		"&beam="+bea_value+
		"&radar="+rad_value+
		"&debug="+deb_value;
	return url;
}

function ipConstructRISURL() {

	var all = "0";
	var north = "0";
	var south = "0";
	var high = "0";
	var mid = "0";

	var hemi_value = "0";
//	if (document.getElementById("hemisphere") != null) {
//		for(var i=0; i < document.plotForm.hemisphere.length; i++) {
//			if(document.plotForm.hemisphere[i].selected) {
//				hemi_value = document.plotForm.hemisphere[i].value;
//				break;
//			}
//		}
//	}

	if (hemi_value != "0") {
		if (hemi_value == "1") {
			north = "1";
		} else {
			south = "1";
		}
	} else {
		if (document.plotForm.all.checked) {
			all = "1";
		} else if (document.plotForm.nh.checked) {
			north = "1";
		} else if (document.plotForm.sh.checked) {
			south = "1";
		} else if (document.plotForm.hl.checked) {
			high = "1";
		} else {
			mid = "1";
		}
	}
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

 var url = "/assets/php/plot_lib.php?plotRIS=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&all="+all+
		"&north="+north+
		"&south="+south+
		"&high="+high+
		"&mid="+mid+
		"&debug="+deb_value;
	return url;
}

function ipConstructRTPURL() {
	// show scan plot option
	if (document.getElementById("scanPlot")) {
		document.getElementById("scanPlot").style.display = "block";
		document.getElementById("showhideScan").innerHTML = "(Show)"
	}

	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	if (document.getElementById('radarS') != null) {
		for(var i=0; i < document.plotForm.radarS.length; i++) {
			if(document.plotForm.radarS[i].selected) {
				if (document.plotForm.radarS[i].value != "") {
					radS_value = document.plotForm.radarS[i].value;
					break;
				}
			}
		}
	}
	if (document.getElementById('radarN') != null) {
		for(var i=0; i < document.plotForm.radarN.length; i++) {
			if(document.plotForm.radarN[i].selected) {
				if (document.plotForm.radarN[i].value != "") {
					radN_value = document.plotForm.radarN[i].value;
					break;
				}
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}

	var par_value = "";
	var sca_value = "";
	for(var i=0; i < document.plotForm.param.length; i++) {
		if(document.plotForm.param[i].checked) {
			if (par_value == "") {
				par_value = document.plotForm.param[i].value;
				sca_value = document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			} else {
				par_value = par_value + "_" + document.plotForm.param[i].value;
				sca_value = sca_value + "_" + 
					document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			}
		}
	}
	if (par_value == "") {
		alert("Please select at least 1 parameter to plot.");
		return null;
	}
	
	dft_value = "";
	for (var i=0; i<document.plotForm.dataformat.length;i++) {
		if (document.plotForm.dataformat[i].selected) {
			dft_value = document.plotForm.dataformat[i].value;
			break;
		}
	}

	var coo_value = "";
	for(var i=0; i < document.plotForm.coords.length; i++) {
		if(document.plotForm.coords[i].selected) {
			coo_value = document.plotForm.coords[i].value;
		}
	}
	
	csc_value = document.plotForm.coords_min.value+'_'+document.plotForm.coords_max.value;

	bea_value = "";
	for (var i=0; i<document.plotForm.beam.length;i++) {
		if (document.plotForm.beam[i].selected) {
			bea_value = document.plotForm.beam[i].value;
			break
		}
	}
	
	cha_value = "";
	for (var i=0; i<document.plotForm.channel.length;i++) {
		if (document.plotForm.channel[i].selected) {
			cha_value = document.plotForm.channel[i].value;
			break
		}
	}
	
	sid_value = "";
	if (document.plotForm.only_scan_id.checked) {
		sid_value = document.getElementById("scan_id").value;
	} else {
		sid_value = -1;
	}
	
	gfl_value = "";
	for (var i=0; i<document.plotForm.gflag.length;i++) {
		if (document.plotForm.gflag[i].selected) {
			gfl_value = document.plotForm.gflag[i].value;
			break;
		}
	}
	
	recalc_elev_value = "0";
	tdiff_value = "0";
	phidiff_value = "0";
	interfer_pos_value = "0_0_0";
	scan_boresite_offset_value = "0";
	if (document.plotForm.recalc_elev.checked) {
		recalc_elev_value = "1";
		tdiff_value = document.getElementById("tdiff").value;
		phidiff_value = document.getElementById("phidiff").value;
		ix_value = document.getElementById("interfer_pos_x").value;
		iy_value = document.getElementById("interfer_pos_y").value;
		iz_value = document.getElementById("interfer_pos_z").value;
		interfer_pos_value = ix_value+'_'+iy_value+'_'+iz_value;
		scan_boresite_offset_value = document.getElementById("scan_boresite_offset").value;
	}
	
	filt_value = "0";
	if (document.getElementById("filter").checked)
		filt_value = "1";
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	var url = "/assets/php/plot_lib.php?plotRTI=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+document.plotForm.stHr.value+
		"&smin="+document.plotForm.stMin.value+
		"&fhr="+document.plotForm.edHr.value+
		"&fmin="+document.plotForm.edMin.value+
		"&radar="+rad_value+
		"&param="+par_value+
		"&dataformat="+dft_value+
		"&scale="+sca_value+
		"&coord="+coo_value+
		"&cscal="+csc_value+
		"&beam="+bea_value+
		"&channel="+cha_value+
		"&scanid="+sid_value+
		"&gflag="+gfl_value+
		"&recalc_elev="+recalc_elev_value+
		"&tdiff="+tdiff_value+
		"&phidiff="+phidiff_value+
		"&interfer_pos="+interfer_pos_value+
		"&scan_boresite_offset="+scan_boresite_offset_value+
		"&debug="+deb_value+
		"&filter="+filt_value;
	return url;
}

function ipConstructELHURL() {
	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	for(var i=0; i < document.plotForm.radarS.length; i++) {
		if(document.plotForm.radarS[i].selected) {
			if (document.plotForm.radarS[i].value != "") {
				radS_value = document.plotForm.radarS[i].value;
				break;
			}
		}
	}
	for(var i=0; i < document.plotForm.radarN.length; i++) {
		if(document.plotForm.radarN[i].selected) {
			if (document.plotForm.radarN[i].value != "") {
				radN_value = document.plotForm.radarN[i].value;
				break;
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}

	var par_value = "";
	var yrange_value = "";
	for(var i=0; i < document.plotForm.param.length; i++) {
		if(document.plotForm.param[i].checked) {
			if (par_value == "") {
				par_value = document.plotForm.param[i].value;
				yrange_value = document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			} else {
				par_value = par_value + "_" + document.plotForm.param[i].value;
				yrange_value = yrange_value + "_" + 
					document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			}
		}
	}
	if (par_value == "") {
		alert("Please select at least 1 parameter to plot.");
		return null;
	}

	var coo_value = "";
	for(var i=0; i < document.plotForm.coords.length; i++) {
		if(document.plotForm.coords[i].selected) {
			coo_value = document.plotForm.coords[i].value;
		}
	}
	
	xrange_value = document.plotForm.coords_min.value+'_'+document.plotForm.coords_max.value;

	bea_value = "";
	for (var i=0; i<document.plotForm.beam.length;i++) {
		if (document.plotForm.beam[i].selected) {
			bea_value = document.plotForm.beam[i].value;
			break
		}
	}
	
	cha_value = "";
	for (var i=0; i<document.plotForm.channel.length;i++) {
		if (document.plotForm.channel[i].selected) {
			cha_value = document.plotForm.channel[i].value;
			break
		}
	}
	
	sid_value = "";
	if (document.plotForm.only_scan_id.checked) {
		sid_value = document.getElementById("scan_id").value;
	} else {
		sid_value = -1;
	}

	if (document.plotForm.hist_scale_min.value == 0.) {
		hist_min = "0";
	} else {
		hist_min = document.plotForm.hist_scale_min.value;
	}
	if (document.plotForm.hist_scale_max.value == 0.) {
		hist_max = "0";
	} else {
		hist_max = document.plotForm.hist_scale_max.value;
	}
	hist_scale_value = hist_min+"_"+hist_max

	norm_value = "";
	if (document.plotForm.normalize.checked) {
		norm_value = "1";
	} else {
		norm_value = "0";
	}
	
	recalc_elev_value = "0";
	tdiff_value = "0";
	phidiff_value = "0";
	interfer_pos_value = "0_0_0";
	scan_boresite_offset_value = "0";
	if (document.plotForm.recalc_elev.checked) {
		recalc_elev_value = "1";
		tdiff_value = document.getElementById("tdiff").value;
		phidiff_value = document.getElementById("phidiff").value;
		ix_value = document.getElementById("interfer_pos_x").value;
		iy_value = document.getElementById("interfer_pos_y").value;
		iz_value = document.getElementById("interfer_pos_z").value;
		interfer_pos_value = ix_value+'_'+iy_value+'_'+iz_value;
		scan_boresite_offset_value = document.getElementById("scan_boresite_offset").value;
	}
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	var url = "/assets/php/plot_lib.php?plotELH=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+document.plotForm.stHr.value+
		"&smin="+document.plotForm.stMin.value+
		"&fhr="+document.plotForm.edHr.value+
		"&fmin="+document.plotForm.edMin.value+
		"&radar="+rad_value+
		"&param="+par_value+
		"&yrange="+yrange_value+
		"&hist_scale="+hist_scale_value+
		"&coord="+coo_value+
		"&xrange="+xrange_value+
		"&beam="+bea_value+
		"&channel="+cha_value+
		"&scanid="+sid_value+
		"&normalize="+norm_value+
		"&recalc_elev="+recalc_elev_value+
		"&tdiff="+tdiff_value+
		"&phidiff="+phidiff_value+
		"&interfer_pos="+interfer_pos_value+
		"&scan_boresite_offset="+scan_boresite_offset_value+
		"&debug="+deb_value;
	return url;
}

// For ray-tracing rtp plot
function ipConstructRTRTPURL() {
	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	if (document.getElementById('radarS') != null) {
		for(var i=0; i < document.plotForm.radarS.length; i++) {
			if(document.plotForm.radarS[i].selected) {
				if (document.plotForm.radarS[i].value != "") {
					radS_value = document.plotForm.radarS[i].value;
					break;
				}
			}
		}
	}
	if (document.getElementById('radarN') != null) {
		for(var i=0; i < document.plotForm.radarN.length; i++) {
			if(document.plotForm.radarN[i].selected) {
				if (document.plotForm.radarN[i].value != "") {
					radN_value = document.plotForm.radarN[i].value;
					break;
				}
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}

	var par_value = "";
	var sca_value = "";
	for(var i=0; i < document.plotForm.param.length; i++) {
		if(document.plotForm.param[i].checked) {
			if (par_value == "") {
				par_value = document.plotForm.param[i].value;
				sca_value = document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			} else {
				par_value = par_value + "_" + document.plotForm.param[i].value;
				sca_value = sca_value + "_" + 
					document.getElementById(document.plotForm.param[i].value+"_scale_min").value+"_"+
					document.getElementById(document.plotForm.param[i].value+"_scale_max").value;
			}
		}
	}
	if (par_value == "") {
		alert("Please select at least 1 parameter to plot.");
		return null;
	}

	var coo_value = "";
	for(var i=0; i < document.plotForm.coords.length; i++) {
		if(document.plotForm.coords[i].selected) {
			coo_value = document.plotForm.coords[i].value;
		}
	}
	
	csc_value = document.plotForm.coords_min.value+'_'+document.plotForm.coords_max.value;

	bea_value = "";
	for (var i=0; i<document.plotForm.beam.length;i++) {
		if (document.plotForm.beam[i].selected) {
			bea_value = document.plotForm.beam[i].value;
			break
		}
	}
	
	freq_value = "";
	for (var i=0; i<document.plotForm.freq.length;i++) {
		if (document.plotForm.freq[i].selected) {
			freq_value = document.plotForm.freq[i].value;
			break
		}
	}
	
	gfl_value = "";
	for (var i=0; i<document.plotForm.gflag.length;i++) {
		if (document.plotForm.gflag[i].selected) {
			gfl_value = document.plotForm.gflag[i].value;
			break;
		}
	}

	hop_value = "";
	for (var i=0; i<document.plotForm.nhop.length;i++) {
		if (document.plotForm.nhop[i].selected) {
			hop_value = document.plotForm.nhop[i].value;
			break
		}
	}
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	force_value = "0";
	if (document.getElementById("forcerun").checked)
		force_value = "1";

	var url = "/assets/php/plot_lib.php?plotRTRTI=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+document.plotForm.stHr.value+
		"&smin="+"00"+
		"&fhr="+document.plotForm.edHr.value+
		"&fmin="+"00"+
		"&radar="+rad_value+
		"&param="+par_value+
		"&scale="+sca_value+
		"&coord="+coo_value+
		"&cscal="+csc_value+
		"&beam="+bea_value+
		"&freq="+freq_value+
		"&gflag="+gfl_value+
		"&nhop="+hop_value+
		"&debug="+deb_value+
		"&force="+force_value;
	return url;
}

// For ray-tracing raypath plot
function ipConstructRAYURL() {
	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	if (document.getElementById('radarS') != null) {
		for(var i=0; i < document.plotForm.radarS.length; i++) {
			if(document.plotForm.radarS[i].selected) {
				if (document.plotForm.radarS[i].value != "") {
					radS_value = document.plotForm.radarS[i].value;
					break;
				}
			}
		}
	}
	if (document.getElementById('radarN') != null) {
		for(var i=0; i < document.plotForm.radarN.length; i++) {
			if(document.plotForm.radarN[i].selected) {
				if (document.plotForm.radarN[i].value != "") {
					radN_value = document.plotForm.radarN[i].value;
					break;
				}
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere.");
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}

	sca_value = "";
	sca_value = document.getElementById("edens_scale_min").value+"_"+
					document.getElementById("edens_scale_max").value;

	bea_value = "";
	for (var i=0; i<document.plotForm.beam.length;i++) {
		if (document.plotForm.beam[i].selected) {
			bea_value = document.plotForm.beam[i].value;
			break
		}
	}
	
	freq_value = "";
	for (var i=0; i<document.plotForm.freq.length;i++) {
		if (document.plotForm.freq[i].selected) {
			freq_value = document.plotForm.freq[i].value;
			break
		}
	}

	hop_value = "";
	for (var i=0; i<document.plotForm.nhop.length;i++) {
		if (document.plotForm.nhop[i].selected) {
			hop_value = document.plotForm.nhop[i].value;
			break
		}
	}

	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	force_value = "0";
	if (document.getElementById("forcerun").checked)
		force_value = "1";

	var url = "/assets/php/plot_lib.php?plotRTRAY=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&shr="+document.plotForm.stHr.value+
		"&smin="+"00"+
		"&fhr="+document.plotForm.edHr.value+
		"&fmin="+"00"+
		"&radar="+rad_value+
		"&beam="+bea_value+
		"&freq="+freq_value+
		"&scale="+sca_value+
		"&nhop="+hop_value+
		"&time="+document.plotForm.pathtimes.value+
		"&debug="+deb_value+
		"&force="+force_value;
	return url;
}

// For field-of-view plot
function ipConstructRADFOVURL() {
	var radS_value = "";
	var radN_value = "";
	var rad_value = "";
	if (document.getElementById('radarS') != null) {
		for(var i=0; i < document.plotForm.radarS.length; i++) {
			if(document.plotForm.radarS[i].selected) {
				if (document.plotForm.radarS[i].value != "") {
					radS_value = document.plotForm.radarS[i].value;
					break;
				}
			}
		}
	}
	if (document.getElementById('radarN') != null) {
		for(var i=0; i < document.plotForm.radarN.length; i++) {
			if(document.plotForm.radarN[i].selected) {
				if (document.plotForm.radarN[i].value != "") {
					radN_value = document.plotForm.radarN[i].value;
					break;
				}
			}
		}
	}
	if(radS_value != "" && radN_value != "") {
		alert("Select only one radar, either from Southern or Northern Hemisphere. "+radN_value+", "+radS_value);
		return null;
	}
	rad_value = radS_value+radN_value;
	if(rad_value == "") {
		alert("Please select at least 1 radar.");
		return null;
	}

	bea_value = "";
	if (document.getElementById('beam') != null) {
		for (var i=0; i<document.plotForm.beam.length;i++) {
			if (document.plotForm.beam[i].selected) {
				bea_value = document.plotForm.beam[i].value;
				break
			}
		}
	} else {
		bea_value = "-1";
	}
	
	deb_value = "0";
	if (document.getElementById("debug").checked)
		deb_value = "1";

	var url = "/assets/php/plot_lib.php?plotRADFOV=yes"+
		"&date="+document.plotForm.yr.value+
			document.plotForm.mon.value+
			document.plotForm.day.value+
		"&radar="+rad_value+
		"&beam="+bea_value+
		"&debug="+deb_value;
	return url;
}

// Implement business logic
function ipUpdatePlot(type) {


	callURL = ipConstructURL(type);
	if (callURL == null) {
		return;
	}

	httpObject = getHTTPObject();
	if (httpObject != null) {
		var inputs = document.getElementsByTagName('input');
		for (var i=0; i<inputs.length;i++) {
			if (inputs[i].type == "button") {
				inputs[i].disabled = true;
			}
		}
// 		document.getElementById("plotButton").disabled = true;
		var myplot = document.getElementById("outputPlot");
		removeChildren("outputPlot");
		var cent = document.createElement("center");
		var imag = document.createElement("img");
		imag.setAttribute("src","http://vt.superdarn.org/show_image.php?id=297");
		imag.setAttribute("height","150");
		imag.setAttribute("width","150");
		cent.appendChild(imag);
		myplot.appendChild(cent);
		var url = ""
		if (window.location.hostname != "davit.ece.vt.edu") {
			url = "curl_proxy.php?ws_path="+encodeURIComponent(callURL);
//		} else if (window.location.hostname == "128.173.144.82") {
//			url = callURL;
		} else {
			alert("Unknown domain. I'll redirect you.");
			window.location = "http://vt.superdarn.org/";
			return;
		}
		httpObject.open("GET", url, true);
		httpObject.send(null);
		httpObject.onreadystatechange = function() {
			ipUpdateOutputPlot(type);
		}
	} else {
		alert("httpObject Error.");
	}

}

// Implement business logic
function ipUpdatePlots(type,outWinId,waitId) {


	callURL = ipConstructURL(type);
	if (callURL == null) {
		return;
	}

	httpObject = getHTTPObject();
	if (httpObject != null) {
		var inps = document.getElementsByTagName("input");
		for (i=0;i<inps.length;i++) {
			if (inps[i].type == "button") {
				inps[i].disabled = true
			}
		}
		var myplot = document.getElementById(outWinId);
		removeChildren(outWinId);
		var cent = document.createElement("center");
		var imag = document.createElement("img");
		imag.setAttribute("src","http://vt.superdarn.org/show_image.php?id="+waitId);
// 		imag.setAttribute("height","100");
		imag.setAttribute("width","150");
		cent.appendChild(imag);
		myplot.appendChild(cent);
		var url = ""
		if (window.location.hostname != "davit.ece.vt.edu") {
			url = "curl_proxy.php?ws_path="+encodeURIComponent(callURL);
//		} else if (window.location.hostname == "128.173.144.82") {
//			url = callURL;
		} else {
			alert("Unknown domain. I'll redirect you.");
			window.location = "http://vt.superdarn.org/";
			return;
		}
		httpObject.open("GET", url, true);
		httpObject.send(null);
		httpObject.onreadystatechange = function() {
			if (httpObject.readyState == 4 && httpObject.status == 200) {
				document.getElementById(outWinId).innerHTML = "<pre>"+httpObject.responseText+"</pre>";
				for (i=0;i<inps.length;i++) {
					if (inps[i].type == "button") {
						inps[i].disabled = false
					}
				}
			}
		}
	} else {
		alert("httpObject Error.");
	}

}

function noOp() {
	alert("Wait for it...");
}

function ipUpdateOutputPlot(type) {
	// only if req shows "loaded"
	if (httpObject.readyState == 4 && httpObject.status == 200) {
		document.getElementById("outputPlot").innerHTML = "<h3><pre>"+httpObject.responseText+"</pre></h3>";
		var inputs = document.getElementsByTagName('input');
		for (var i=0; i<inputs.length;i++) {
			if (inputs[i].type == "button") {
				inputs[i].disabled = false;
			}
		}
// 		document.getElementById("plotButton").disabled = false;
	}
	return;
}

function ipToggleHistScale() {
	if (document.plotForm.normalize.checked) {
		document.plotForm.hist_scale_min.value = 0.0;
		document.plotForm.hist_scale_max.value = 0.1;
	} else {
		if (document.plotForm.beam.selectedIndex == 17) {
			document.plotForm.hist_scale_min.value = 0.0;
			document.plotForm.hist_scale_max.value = 1000.0;
		} else {
			document.plotForm.hist_scale_min.value = 0.0;
			document.plotForm.hist_scale_max.value = 100.0;
		}
	}
}

function appendHeaderInvPlot(  ) {
	var ayear = parseInt(document.invform.ayear.value)
	var fimage = new Image();
	fimage.src = "http://davit.ece.vt.edu/images/d_inventory_"+ayear.toString()+".jpg";
	var flink = "http://davit.ece.vt.edu/images/d_inventory_"+ayear.toString()+".ps";

	// create table
	table = document.createElement("table");
	table.setAttribute("width", "620px");
	table.setAttribute("cellPadding", "10px");
	table.setAttribute("cellSpacing", "5px");
	tr = document.createElement("tr");
	td = document.createElement("th");
	td.setAttribute("width", "25%");
	td.setAttribute("align", "right");
	a = document.createElement("a");
	a.setAttribute("href","javascript:prevInvPlot();");
	txt = document.createTextNode("Previous Year");
	a.appendChild(txt);
	td.appendChild(a);
	tr.appendChild(td);
	td = document.createElement("th");
	td.setAttribute("width", "50%");
	td.setAttribute("align", "center");
	txt = document.createTextNode(ayear.toString());
	td.appendChild(txt);
	tr.appendChild(td);
	td = document.createElement("th");
	td.setAttribute("width", "25%");
	td.setAttribute("align", "left");
	a = document.createElement("a");
	a.setAttribute("href","javascript:nextInvPlot();");
	txt = document.createTextNode("Next Year");
	a.appendChild(txt);
	td.appendChild(a);
	tr.appendChild(td);
	table.appendChild(tr);
	tr = document.createElement("tr");
	td = document.createElement("td");
	td.setAttribute("colspan", "3");
	td.setAttribute("align", "center");
	//create image element
	a = document.createElement("a");
	a.setAttribute("href",flink);
	plot = document.createElement("img");
	plot.setAttribute("id","show");
	//set image source, width, height
	plot.setAttribute("src",fimage.src);
//	plot.setAttribute("width","95%");
//	plot.setAttribute("height","95%");
	a.appendChild(plot);
	td.appendChild(a);
	tr.appendChild(td);
	table.appendChild(tr);
	tr = document.createElement("tr");
	td = document.createElement("th");
	td.setAttribute("width", "25%");
	td.setAttribute("align", "right");
	a = document.createElement("a");
	a.setAttribute("href","javascript:prevInvPlot();");
	txt = document.createTextNode("Previous Year");
	a.appendChild(txt);
	td.appendChild(a);
	tr.appendChild(td);
	td = document.createElement("th");
	td.setAttribute("width", "50%");
	td.setAttribute("align", "center");
	txt = document.createTextNode(ayear.toString());
	td.appendChild(txt);
	tr.appendChild(td);
	td = document.createElement("th");
	td.setAttribute("width", "25%");
	td.setAttribute("align", "left");
	a = document.createElement("a");
	a.setAttribute("href","javascript:nextInvPlot();");
	txt = document.createTextNode("Next Year");
	a.appendChild(txt);
	td.appendChild(a);
	tr.appendChild(td);
	table.appendChild(tr);
	// put everything together
	document.getElementById("invplot").appendChild(document.createElement("p"));
	document.getElementById("invplot").appendChild(document.createElement("p"));
	document.getElementById("invplot").appendChild(table);
}

function nextInvPlot() {
	var ayear = parseInt(document.invform.ayear.value)
	if (ayear == lastYear) {
		return;
	}
	if (ayear == 0) {
		ayear = lastYear - 1;
	}
	removeChildren("invplot");
	ayear += 1;
	document.invform.ayear.value = ayear.toString()
	appendHeaderInvPlot();
}

function prevInvPlot() {
	var ayear = parseInt(document.invform.ayear.value)
	if (ayear == firstYear) {
		return;
	}
	removeChildren("invplot");
	ayear -= 1;
	document.invform.ayear.value = ayear.toString()
	appendHeaderInvPlot();
}

//added by Brian 10/17/2012
function appendHeaderInvPlotM() {
        var ayear = parseInt(document.invformM.ayear.value)
        var amonth = parseInt(document.invformM.amonth.value)
        var fimage = new Image();
        if(amonth > 9){
            fimage.src = "http://davit.ece.vt.edu/images/month_inv/mon_inventory_"+ayear.toString()+amonth.toString()+".jpg";
            var flink = "http://davit.ece.vt.edu/images/month_inv/mon_inventory_"+ayear.toString()+amonth.toString()+".ps";
        }else{
            fimage.src = "http://davit.ece.vt.edu/images/month_inv/mon_inventory_"+ayear.toString()+"0"+amonth.toString()+".jpg";
            var flink = "http://davit.ece.vt.edu/images/month_inv/mon_inventory_"+ayear.toString()+"0"+amonth.toString()+".ps";
        }

        // create table
        table = document.createElement("table");
        table.setAttribute("width", "620px");
        table.setAttribute("cellPadding", "10px");
        table.setAttribute("cellSpacing", "5px");
        tr = document.createElement("tr");
        td = document.createElement("th");
        td.setAttribute("width", "25%");
        td.setAttribute("align", "right");
        a = document.createElement("a");
        a.setAttribute("href","javascript:prevInvPlotM();");
        txt = document.createTextNode("Previous Month");
        a.appendChild(txt);
        td.appendChild(a);
        tr.appendChild(td);
        td = document.createElement("th");
        td.setAttribute("width", "50%");
        td.setAttribute("align", "center");
        txt = document.createTextNode(amonth.toString() +"/"+ ayear.toString());
        td.appendChild(txt);
        tr.appendChild(td);
        td = document.createElement("th");
        td.setAttribute("width", "25%");
        td.setAttribute("align", "left");
        a = document.createElement("a");
        a.setAttribute("href","javascript:nextInvPlotM();");
        txt = document.createTextNode("Next Month");
        a.appendChild(txt);
        td.appendChild(a);
        tr.appendChild(td);
        table.appendChild(tr);
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.setAttribute("colspan", "3");
        td.setAttribute("align", "center");
        //create image element
        a = document.createElement("a");
        a.setAttribute("href",flink);
        plot = document.createElement("img");
        plot.setAttribute("id","show");
        //set image source, width, height
        plot.setAttribute("src",fimage.src);
        //      plot.setAttribute("width","95%");
        //      plot.setAttribute("height","95%");
        a.appendChild(plot);
        td.appendChild(a);
        tr.appendChild(td);
        table.appendChild(tr);
        tr = document.createElement("tr");
        td = document.createElement("th");
        td.setAttribute("width", "25%");
        td.setAttribute("align", "right");
        a = document.createElement("a");
        a.setAttribute("href","javascript:prevInvPlotM();");
        txt = document.createTextNode("Previous Month");
        a.appendChild(txt);
        td.appendChild(a);
        tr.appendChild(td);
        td = document.createElement("th");
        td.setAttribute("width", "50%");
        td.setAttribute("align", "center");
        txt = document.createTextNode(amonth.toString() +"/"+ ayear.toString());
        td.appendChild(txt);
        tr.appendChild(td);
        td = document.createElement("th");
        td.setAttribute("width", "25%");
        td.setAttribute("align", "left");
        a = document.createElement("a");
        a.setAttribute("href","javascript:nextInvPlotM();");
        txt = document.createTextNode("Next Month");
        a.appendChild(txt);
        td.appendChild(a);
        tr.appendChild(td);
        table.appendChild(tr);
        // put everything together
        document.getElementById("invplotM").appendChild(document.createElement("p"));
        document.getElementById("invplotM").appendChild(document.createElement("p"));
        document.getElementById("invplotM").appendChild(table);
}

function nextInvPlotM() {
        var ayear = parseInt(document.invformM.ayear.value)
        var amonth = parseInt(document.invformM.amonth.value)
        if (ayear == lastYear && amonth == lastMonth) {
            return;
        }
        if (ayear == 0) {
            ayear = lastYear;
        }
        if (amonth == 0){
            amonth = lastMonth-1;
        }
        removeChildren("invplotM");
        amonth +=1;
        if(amonth== 13){
            amonth=1;
            ayear +=1;
        }
        if(amonth== 3 && ayear==1994){
            amonth=12;
            ayear=2000;
        }
        document.invformM.ayear.value = ayear.toString()
        document.invformM.amonth.value= amonth.toString()
        appendHeaderInvPlotM();
}

function prevInvPlotM() {
        var ayear = parseInt(document.invformM.ayear.value)
        var amonth = parseInt(document.invformM.amonth.value)
        if (ayear == firstYear) {
            return;
        }
        removeChildren("invplotM");
        amonth -= 1;
        if (amonth == 0){
            amonth=12;
            ayear -= 1;
        }
        if ( amonth == 11 && ayear==2000){
            amonth=2;
            ayear=1994;
        }
        document.invformM.ayear.value = ayear.toString()
        document.invformM.amonth.value = amonth.toString()
        appendHeaderInvPlotM();
}

function queryDB(cpid, radar, year, month, day){
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
}else{// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange=function(){
      //alert(xmlhttp.readyState + " " + xmlhttp.status);
  if (xmlhttp.readyState==4 && xmlhttp.status==200){
    document.getElementById("result").innerHTML=xmlhttp.responseText;
  }
}
var url="query.php?cpid="+cpid+"&radar="+radar+"&year="+year+"&month="+month+"&day="+day;
xmlhttp.open("GET",url, true);
xmlhttp.send(null);
}

