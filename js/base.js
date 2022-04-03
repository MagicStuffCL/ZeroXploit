			var requireGoldhen = 0;
			function USBEmulation(val){
					var hr = new XMLHttpRequest();
					var url = "../script.php";
					var vars = "value="+val;	
					hr.open("POST", url, true);
					hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					hr.onreadystatechange = function() {
						if(hr.readyState == 4 && hr.status == 200) {
							var return_data = hr.responseText;
						}
					}
					hr.send(vars);
			}
			function UpdateTrainer(){
					showMessageColor("Updating trainers, you can close the window, this takes a few minutes","red");
					var hr = new XMLHttpRequest();
					var url = "../script.php";
					var vars = "value=UpdateTrainer";	
					hr.open("POST", url, true);
					hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");					
					hr.onreadystatechange = function() {						
						if(hr.readyState == 4 && hr.status == 200) {
							var return_data = hr.responseText;
						}
						else
						{
							sleep(80000).then(() =>
							{
								showMessageColor("Trainers updated, the date of the trainers will be updated in the next page reload","red");
							});
						}
					}
					hr.send(vars);
			}

			function showMessageColor(msg,color) {
			  document.getElementById("binloaderListening").innerHTML = msg;
			  /*$("#binloaderListening").addClass(color).addClass('blink');;*/
			}
			
			function showMessage(msg) {
			  document.getElementById("binloaderListening").innerHTML = msg;
			}

			function sleep(ms) {
			  return new Promise(resolve => setTimeout(resolve, ms));
			}

	
			//Original
			var exploitVer;

			$(function(){				

				if (document.cookie == "") { //get current REAL FW version on first run - if cookies are deleted while on spoofed FW it will redirect to FW not supported page ... ¯\_(ツ)_/¯
					document.cookie = "fw=" + navigator.userAgent.substring(navigator.userAgent.indexOf("PlayStation 4") + 14, navigator.userAgent.indexOf("PlayStation 4") + 18) + ";max-age=31536000";					
				}
								
				$("#exploitInfo").append("<br><br>Real FW: " + document.cookie.split("=")[1]);
				$("#exploitInfo").append("<br>Current FW (may be spoofed): " + navigator.userAgent.substring(navigator.userAgent.indexOf("PlayStation 4") + 14, navigator.userAgent.indexOf("PlayStation 4") + 18));
				
				var owl = $('.owl-carousel');

				owl.owlCarousel({
					loop:false,
					margin:10,
					autoWidth:false,
					dots:false,
					nav:true,
					navText: ['<div><svg id="svg-nav-900-prev" xmlns="http://www.w3.org/2000/svg" width="445" height="445" viewBox="0 0 444.5 444.5"><path d="M213.1 222.4L351.9 83.7c7.1-7 10.6-15.7 10.6-25.8 0-10.2-3.5-18.8-10.6-25.8l-21.4-21.4C323.4 3.5 314.8 0 304.6 0s-18.8 3.5-25.8 10.6L92.6 196.4c-7 7-10.6 15.7-10.6 25.8s3.5 18.8 10.6 25.8l186.1 185.9c7.1 7 15.7 10.6 25.8 10.6s18.8-3.5 25.8-10.6l21.4-21.4c7.1-7 10.6-15.6 10.6-25.7 0-10.1-3.5-18.7-10.6-26L213.1 222.4z"/></svg></div>', '<div><svg id="svg-nav-900-next" xmlns="http://www.w3.org/2000/svg" width="445" height="445" viewBox="0 0 444.8 444.8"><path d="M352 196.7L165.9 10.8C159 3.6 150.5 0 140.2 0c-10.3 0-18.8 3.6-25.7 10.8L92.8 32.3c-7 7-10.6 15.6-10.6 25.7 0 9.9 3.5 18.6 10.6 26l138.8 138.5L92.8 361.2c-7 7-10.6 15.6-10.6 25.7 0 9.9 3.5 18.6 10.6 26l21.7 21.4c7 7 15.6 10.6 25.7 10.6 10.1 0 18.7-3.5 25.7-10.6l186.1-185.9c7-7.4 10.6-16.1 10.6-26C362.6 212.3 359.1 203.8 352 196.7z"/></svg></div>'],
					navClass: ['owl-prev-900','owl-next-900'],
					items:6
				})				

				owl.on('changed.owl.carousel', function(event) {
					beep();
				})				
				
				$(document).on('keydown', function(e){

					if ($("#fanThresholdDialog").css("visibility") == "visible") {  // increase/decrease temp

						switch(e.keyCode) {
						
							//case 39: //keyboard right
							case 117: //PS4 R1
								$("#increaseTemp").click();
								break;
							
							//case 37: // keyboard left
							case 116: //PS4 L1
								$("#decreaseTemp").click();								
								break;
						} 
					
					}else{ //carousel

						switch(e.keyCode) {
						
							//case 39: //keyboard right
							case 117: //PS4 R1
								$('#svg-nav-900-next path').css('fill','#f00');
								owl.trigger('next.owl');							
								if (bNegativeTheme) {
									setTimeout(function(){ $('#svg-nav-900-next path').css('fill','#eee'); }, 120);
								}else{
									setTimeout(function(){ $('#svg-nav-900-next path').css('fill','#000'); }, 120);
								}
								break;
							
							//case 37: // keyboard left
							case 116: //PS4 L1
								$('#svg-nav-900-prev path').css('fill','#f00');							
								owl.trigger('prev.owl');
								if (bNegativeTheme) {
									setTimeout(function(){ $('#svg-nav-900-prev path').css('fill','#eee'); }, 120);
								}else{
									setTimeout(function(){ $('#svg-nav-900-prev path').css('fill','#000'); }, 120);
								}
								break;

							//case 38: // keyboard up			
						} 
					}
				});				
				
				
				$("#raspConfigCloseDialogButton").click(function(e) {
					$('#raspConfigDialog').css("visibility","hidden");
					$('#raspConfigDialogOverlay').css("visibility","hidden");
					$(this).css("visibility","hidden");
					
					return false;
				});

				$("#shutdownCloseDialogButton").click(function(e) {
					$('#shutdownDialog').css("visibility","hidden");
					$('#shutdownOverlay').css("visibility","hidden");
					$(this).css("visibility","hidden");
					
					return false;
				});

				$("#customPayloadsCloseDialogButton").click(function(e) {
					$('#customPayloadsDialog').css("visibility","hidden");
					$('#customPayloadsDialogOverlay').css("visibility","hidden");
					$('#customPayloadsSendPayloadButton').css("visibility","hidden");
					$(this).css("visibility","hidden");
					
					return false;
				});

				
				$("#linuxPayloadsCloseDialogButton").click(function(e) {
					$('#linuxPayloadsDialog').css("visibility","hidden");
					$('#linuxPayloadsDialogOverlay').css("visibility","hidden");
					$('#linuxPayloadsSendPayloadButton').css("visibility","hidden");
					$(this).css("visibility","hidden");					
					return false;
				});
			
				$("#fanThresholdCloseDialogButton").click(function(e) {
					$('#fanThresholdDialogOverlay').css("visibility","hidden");
					$('#fanThresholdDialog').css("visibility","hidden");
					$('#fanThresholdSendPayloadButton').css("visibility","hidden");	
					$(this).css("visibility","hidden");
				
					return false;
				});				

				$("#msgCloseDialogButton").click(function(e) {
					$('#msgDialog').css("visibility","hidden");
					$('#msgDialogOverlay').css("visibility","hidden");
					$(this).css("visibility","hidden");
					
					if ($("#msgDialogTitle").html() == "Host update") {
						window.location.replace("index.php"); //apply changes
					}else{
						return false;
					}
				});
				
				
				$("#customPayloadsSendPayloadButton").click(function(e) {
					var customPayload = $("#selCustomPayload").val();
					LoadedMSG="Custom payload loaded";
					PLfile = "payloads/custom/" + $("#selCustomPayload").val();
					out_jb = "AllPL";     
					load_poc();
				});

				$("#linuxPayloadsSendPayloadButton").click(function(e) {
					var linuxPayload = $("#selectLinux").val();
					LoadedMSG="Linux payload loaded";					
					if (linuxPayload == 1)
					{
						PLfile = "payloads/Linux/LinuxLoader.bin";
					}
					if (linuxPayload == 2)
					{
						PLfile = "payloads/Linux/LinuxLoader2gb.bin";
					}
					if (linuxPayload == 3)
					{
						PLfile = "payloads/Linux/LinuxLoader3gb.bin";
					}
					if (linuxPayload == 4)
					{
						PLfile = "payloads/Linux/LinuxLoader4gb.bin";
					}
					if (linuxPayload == 5)
					{
						PLfile = "payloads/Linux/LinuxLoader5gb.bin";
					}					
					var script = document.createElement('script');
					script.src = "js/Exploit/MiraLoader.js";
					document.getElementsByTagName('head')[0].appendChild(script); 
					load_poc2();
				});
				
				$("#increaseTemp").click(function(e) {
					var currentTemp = parseInt($("#tempContainer").text());					
					if (!isNaN(currentTemp)) {
						if (currentTemp + 1 > 79) {
							currentTemp = 79;
						}
						$("#tempContainer").text(currentTemp + 1);
					}
				});

				$("#decreaseTemp").click(function(e) {
					var currentTemp = parseInt($("#tempContainer").text());
					if (!isNaN(currentTemp)) {
						if (currentTemp - 1 < 61) {
							currentTemp = 61;
						}
						$("#tempContainer").text(currentTemp - 1);
					}
				});				

				$("#year").html(new Date().getFullYear());

				$.ajax({
					url: 'version.json',
					dataType : 'json',
					type:  'get',
					success:  function (response) {			
						$("#filesversion").html(response.version);
					},
					error: function(){ // will fire when timeout is reached
						$("#filesversion").html("ERROR");
					},
					timeout: 5000 // sets timeout to 5 seconds
				});							

				$("#fanThresholdSendPayloadButton").click(function(e) {
					var currentTemp = parseInt($("#tempContainer").text());
					var payloadFileName = "payloads/fan-threshold" + currentTemp + ".bin";
					LoadedMSG="Fan threshold adjusted on "+ currentTemp+ ".";
					PLfile = payloadFileName;
					out_jb = "AllPL";
					load_poc()
				});	

		
			});
			
	
			function beep() {
				$("#beep")[0].play();			
			}					


			function fanThreshold() {
				$('#fanThresholdDialogOverlay').css("visibility","visible");
				$('#fanThresholdDialog').css("visibility","visible");
				$('#fanThresholdCloseDialogButton').css("visibility","visible");	
				$('#fanThresholdSendPayloadButton').css("visibility","visible");			
			}
			function raspConfigurator(){
				$('#raspConfigDialogOverlay').css("visibility","visible");
				$('#raspConfigDialog').css("visibility","visible");
				$('#raspConfigCloseDialogButton').css("visibility","visible");	
			}
			function linuxPayloads(){
				$('#linuxPayloadsDialogOverlay').css("visibility","visible");
				$('#linuxPayloadsDialog').css("visibility","visible");
				$('#linuxPayloadsCloseDialogButton').css("visibility","visible");	
				$('#linuxPayloadsSendPayloadButton').css("visibility","visible");
				
			}
			function customPayloads() {
				$("#customPayloadsList").html("");
				$('#customPayloadsDialogOverlay').css("visibility","visible");
				$('#customPayloadsDialog').css("visibility","visible");
				$('#customPayloadsCloseDialogButton').css("visibility","visible");	
				
				$.ajax({
					url: 'getCustomPayloads.php',
					dataType : 'html',
					type:  'get',
					success:  function (response) {
						$("#customPayloadsList").html(response);
						if (response == 'No custom payloads found!') {
							$('#customPayloadsSendPayloadButton').css("visibility","hidden");
						}else{
							$('#customPayloadsSendPayloadButton').css("visibility","visible");							
						}
					},
					error: function(){ // will fire when timeout is reached
						$("#customPayloadsList").html("Error: Couldn't retrieve payloads list");
						$('#customPayloadsSendPayloadButton').css("visibility","hidden");
					},
					timeout: 10000 // sets timeout to 5 seconds
				});	
				
			}

			function shutdown() {

				if (confirm('Do you want to shutdown the RPi0 ?') == true) {
					$('#shutdownOverlay').css("visibility","visible");
					$('#shutdownDialog').css("visibility","visible");

					$("#shutdownInfoText").html("Shutting down RPi0, please, wait for the led on the raspberry to stop flashing.");
					$('#shutdownCloseDialogButton').css("visibility","visible");
					var hr = new XMLHttpRequest();
					var url = "../script.php";
					var vars = "value=Shutdown";	
					hr.open("POST", url, true);
					hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					hr.onreadystatechange = function() {
						if(hr.readyState == 4 && hr.status == 200) {
							var return_data = hr.responseText;
						}
					}
					hr.send(vars);
				}
			}
			
			function load_Orbis(){
				LoadedMSG="Orbis-Toolbox Loaded";
				PLfile = "payloads/OrbisToolbox900.bin";
				out_jb = "AllPL";     
				load_poc();
			}
			
			function load_TodexEnable(){
				LoadedMSG="Todex Loaded";
				PLfile = "payloads/todex-enable.bin";
				out_jb = "AllPL";     
				load_poc();
			}
			
			function load_TodexDisable(){
				LoadedMSG="Todex Disabled";
				PLfile = "payloads/todex-disable.bin";
				out_jb = "AllPL";     
				load_poc();
			}
				
			function goldhen22(){
				LoadedMSG="GoldHEN 2.2.2 Loaded";
				PLfile = "payloads/goldhen222.bin";
				out_jb = "AllPL";
				load_poc();	
			}

			function Bloader(){
				showMessage("Payload loading... please wait");
				var payload_buffer = chain.syscall(477, 0x0, 0x300000, 0x7, 0x1000, 0xFFFFFFFF, 0);
				var payload_loader = p.malloc32(0x1000);
				var BLDR = payload_loader.backing;
				BLDR[0]=0x56415741;BLDR[1]=0x83485541;BLDR[2]=0x894818EC;BLDR[3]=0xC748243C;BLDR[4]=0x10082444;BLDR[5]=0x483C2302;BLDR[6]=0x102444C7;BLDR[7]=0x00000000;BLDR[8]=0x000002BF;BLDR[9]=0x0001BE00;BLDR[10]=0xD2310000;BLDR[11]=0x00009CE8;BLDR[12]=0xC7894100;BLDR[13]=0x8D48C789;BLDR[14]=0xBA082474;BLDR[15]=0x00000010;BLDR[16]=0x000095E8;BLDR[17]=0xFF894400;BLDR[18]=0x000001BE;BLDR[19]=0x0095E800;BLDR[20]=0x89440000;BLDR[21]=0x31F631FF;BLDR[22]=0x0062E8D2;BLDR[23]=0x89410000;BLDR[24]=0x2C8B4CC6;BLDR[25]=0x45C64124;BLDR[26]=0x05EBC300;BLDR[27]=0x01499848;BLDR[28]=0xF78944C5;BLDR[29]=0xBAEE894C;BLDR[30]=0x00001000;BLDR[31]=0x000025E8;BLDR[32]=0x7FC08500;BLDR[33]=0xFF8944E7;BLDR[34]=0x000026E8;BLDR[35]=0xF7894400;BLDR[36]=0x00001EE8;BLDR[37]=0x2414FF00;BLDR[38]=0x18C48348;BLDR[39]=0x5E415D41;BLDR[40]=0x31485F41;BLDR[41]=0xC748C3C0;BLDR[42]=0x000003C0;BLDR[43]=0xCA894900;BLDR[44]=0x48C3050F;BLDR[45]=0x0006C0C7;BLDR[46]=0x89490000;BLDR[47]=0xC3050FCA;BLDR[48]=0x1EC0C748;BLDR[49]=0x49000000;BLDR[50]=0x050FCA89;BLDR[51]=0xC0C748C3;BLDR[52]=0x00000061;BLDR[53]=0x0FCA8949;BLDR[54]=0xC748C305;BLDR[55]=0x000068C0;BLDR[56]=0xCA894900;BLDR[57]=0x48C3050F;BLDR[58]=0x006AC0C7;BLDR[59]=0x89490000;BLDR[60]=0xC3050FCA;
				chain.syscall(74, payload_loader, 0x4000, (0x1 | 0x2 | 0x4));
				var pthread = p.malloc(0x10); {
				 chain.fcall(window.syscalls[203], payload_buffer, 0x300000);
				 chain.fcall(libKernelBase.add32(OFFSET_lk_pthread_create), pthread, 0x0, payload_loader, payload_buffer);
				}
				chain.run();
				Binset();
			   }
			
			function load_History(){
				LoadedMSG="History blocker Loaded";
				PLfile = "payloads/history-blocker.bin";
				out_jb = "AllPL";
				load_poc();
			}
			
			function load_FTP(){
				LoadedMSG="FTP Loaded";
				PLfile = "payloads/ftp.bin";
				out_jb = "AllPL";
				load_poc();
			}
			function load_Backup(){
				LoadedMSG="Backup Loaded";
				PLfile = "payloads/backup.bin";
				out_jb = "AllPL";
				load_poc();
			}
			function load_Restore(){
				LoadedMSG="Backup restored";
				PLfile = "payloads/restore.bin";
				out_jb = "AllPL";
				load_poc();
			}	
			function load_App2usb(){
				LoadedMSG="App2usb Loaded";
				PLfile = "payloads/app2usb.bin";
				out_jb = "AllPL";
				load_poc();
			}	
			function load_AppDumper(){
				LoadedMSG="AppDumper Loaded";
				PLfile = "payloads/app-dumper.bin";
				out_jb = "AllPL";
				load_poc();
			}	
			function load_ExitIDU(){
				LoadedMSG="ExitIDU Loaded";
				PLfile = "payloads/exit-idu.bin";
				out_jb = "AllPL";
				load_poc();
			}	
			function load_RIFRenamer(){
				LoadedMSG="RIFRenamer Loaded";
				PLfile = "payloads/rif-renamer.bin";
				out_jb = "AllPL";
				load_poc();
			}			
			function load_KernelClock(){
				LoadedMSG="KernelClock Loaded";
				PLfile = "payloads/kernel-clock.bin";
				out_jb = "AllPL";
				load_poc();
			}			
			function load_ModuleDumper(){
				LoadedMSG="ModuleDumper Loaded";
				PLfile = "payloads/module-dumper.bin";
				out_jb = "AllPL";
				load_poc();
			}	
			function load_Mira(){
				LoadedMSG="MiraLoader Loaded. Send payloads to port 9021";
				PLfile = "payloads/MiraLoader.bin";
				out_jb = "MLD";
				load_poc();
			}
			var exploitInfo = {
				"OrbisToolBox":"Enable Orbis ToolBox Options like fps counter and temperatures on game",
				"Linux":"Load linux in your PS4",
				"Mira Loader" : "Homebrew Enabler + Debug Settings",
				"GoldHEN":"SiSTr0's GoldHEN for 9.0!<br><br><lu><li>Homebrew Enabler + Debug Settings + VR support</li><li>Remote Package Install + Rest Mode Support + External HDD Support + Official External HDD Format Support</li><li>Debug Trophies Support + sys_dynlib_dlsym Patch + UART Enabler</li><li>Never Disable Screenshot + Remote Play Enabler + FW Update Block + CE-30391-6 Error CMOS Fix</li><li>FTP Server on 2121 port + BinLoader Server on 9090 port</li></ul>",
				"BinLoader":"BIN loader",
				"Disable Todex": "Disables Todex developers tools",
				"UpdateTrainer": "Update trainer db<br><br><lu><li>You need to have ftp enabled in goldhen options</li><li>Runs in the background, you can close the browser while it updates.</li><li>The update date of the trainer should change to the current one in a few minutes when refreshing the page.</li><li>Remember to have an active internet connection on your raspberry and be on the same local network as your ps4</li><li>You must run the update from your console for correct ip detection.</li></lu>",
				"Enable Todex":"Enabled Todex developers tools",
				"FTP":"Starts an FTP server on port 1337.<br><br>Originally created by <strong>xvortex</strong>",
				"Backup":"Backs up your PS4's databases, licenses, and user data. Note this may not be useful if you have to reinitalize as your keys may change.<br><br>Originally created by <strong>Stooged</strong>",
				"Restore":"Restores the data saved in the 'Backup' payload.<br><br>Originally created by <strong>Stooged</strong>",
				"AppToUSB":"Unofficial external drive support for applications. Reads app2usb.ini from the external drive for options.<br><br><strong>Important:</strong>You need to copy the .ini file to usb0:\PS4\AppToUsb.ini<br><br>Originally created by <strong>Stooged</strong>",
				"DisableASLR":"Disables the ASLR (Address space layout randomization) to make working with memory easier/repeatable.",
				"AppDumper":"Dumps and decrypts applications to a USB device. Can be configured with dumper.cfg on the root of the USB device.<br><br>Originally created by <strong>xvortex</strong>",
				"PermanentUART":"Enabled hardware based UART without a kernel patch, persists though updates.",
				"ModuleDumper":"Dumps the decrypted modules from /system, /system_ex, /update and the root of the filesystem to a USB device.",
				"KernelDumper":"Dumps your device's kernel from memory to a USB device.<br><br>Originally created by <strong>eversion</strong>",
				"ExitIDU":"Exits IDU mode and restarts the console.",
				"HistoryBlocker":"Blocks the browser from remembering and returning to the last opened page on start. Run again to enable/disable.<br><br>Originally created by <strong>Stooged</strong>",
				"KernelClock":"Changes the internal clock of the PS4, can be used to reactivate licenses/features.",
				"FanThreshold":"Sets the temperature threshold between 60 ºC and 80 ºC. <br><br>You can use R1/L1 to increase/decrease selected temperature.",
				"RIFRenamer":"Renames 'fake' RIFs to 'free' RIFs for better HEN compatibility. Use this if your PKGs only work with Mira+HEN.",
				"PS4Trainer":"Browse for cheats after WebRTE payload is sent.",
				"Parental-Controls":"Shows the current set Parental Controls passcode in a notification. It shows '0000' if no code is set.<br><br>Originally created by <strong>nekohaku</strong>",
				"Custom-Payloads":"Lists custom binary payloads uploaded to payloads/custom/ directory and let you send them to the bin laoder.",
				"ShutDown":"Safely shuts down the RPi0 to avoid FS corruption. Use this before powering off the console.",
				"RaspConfig":"Configure your raspberry to your needs ."
			};

			function showInfo(key) {
				$("#exploitInfo").html(exploitInfo[key]);
			}

			function clearInfo() {
				$("#exploitInfo").html("Select any option for details.");
			}