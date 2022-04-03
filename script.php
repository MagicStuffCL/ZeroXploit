<?php 

if ($_POST['value'] == "RemoveUSB"){  
	$output = shell_exec('sudo /sbin/modprobe -r g_mass_storage');
}
if ($_POST['value'] == "UpdateTrainer"){  
	$ip = $_SERVER['REMOTE_ADDR'] ; 	
	$output = shell_exec('sudo /usr/bin/python3 Resources/py/ftpTrainerUpdate.py '.$ip);
	echo $output;
}
if ($_POST['value'] == "LoadUSB"){ 	
	$output = shell_exec('sudo /usr/bin/python3 Resources/py/removeUSBGadget.py');
	$output = shell_exec('sudo /sbin/modprobe -r g_mass_storage');
	$fileName=exec("ls  | grep '.img' | head -n1");
	$output = shell_exec('sudo /sbin/modprobe  g_mass_storage file=/usr/html/'.$fileName.' stall=0 removable=1');
}
if ($_POST['value'] == "LoadVirtualUSB"){ 
	$output = shell_exec('sudo /usr/bin/python3 Resources/py/removeUSBGadget.py');
	$output = shell_exec('sudo /sbin/modprobe -r g_mass_storage');
	
	$output = shell_exec('sudo /sbin/modprobe  g_mass_storage file='.$_POST['driveName'].' stall=0 removable=1');
}
if ($_POST['value'] == "Network"){
	if ($_POST['device'] == "wlan"){
		if ($_POST['OpType'] == "enable"){
			$fp = fopen('wpa_supplicant.conf', 'w');
			fwrite($fp,'network={'.PHP_EOL);
			fwrite($fp,'	ssid="'.trim($_POST['sid']).'"'.PHP_EOL);
			fwrite($fp,'	psk="'.trim($_POST['pwd']).'"'.PHP_EOL);
			fwrite($fp,'	key_mgmt=WPA-PSK'.PHP_EOL);
			fwrite($fp,'}');
			fclose($fp); 
		}
	}
	$output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/py/networkController.py "'.$_POST['device'].'" "'.$_POST['OpType'].'"');
	echo $output;
}
if ($_POST['value'] == "Reboot"){ 
	$output = shell_exec('sudo /sbin/reboot' );
}
if ($_POST['value'] == "Shutdown"){ 
	$output = shell_exec('sudo /sbin/poweroff' );
}

if ($_POST['value'] == "Payload"){
	$ip = $_SERVER['REMOTE_ADDR'];
	$port = "9090";
	$output = shell_exec('/usr/bin/python3 Resources/py/payloadSender.py '.'"'.$ip.'" "'.$port.'" "Bin/'.$_POST['pfile'].'"' );
	echo $output;
}
if ($_POST['value'] == "FanControll"){
	$ip = $_SERVER['REMOTE_ADDR'];
	$port = "9090";
	$output = shell_exec('/usr/bin/python3 Resources/py/payloadSender.py '.'"'.$ip.'" "'.$port.'" "'.$_POST['pfile'].'"' );
	echo $output;
}
if ($_POST['value'] == "resourceUpdate"){
	$output = shell_exec('/usr/bin/python3 Resources/py/resourceUpdate.py "'.$_POST['OpType'].'" "'.$_POST['OpValue'].'"');
	echo $output;
}
/*if ($_POST['value'] == "RootPassword"){
	$output = shell_exec('sudo /usr/bin/python3 Resources/py/RootPasswordChange.py '.'"'.$_POST['pwd'].'"');
	echo $output;
}*/
if ($_POST['value'] == "WifiPass-PiZero"){
	$output = shell_exec('sudo /usr/bin/python3 Resources/py/WifiPasswordChange.py '.'"'.$_POST['pwd'].'"');
	echo $output;
}
if ($_POST['value'] == "IdleTimer"){
	$output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/py/updateIdelTimer.py "'.$_POST['OpType'].'" "'.$_POST['Timer'].'"');
	echo $output;
}
if ($_POST['value'] == "AutoJb"){
    $output ="";
    $OpValue="";
    if ($_POST['opType'] == "StartJBSequence"){
    	$output = shell_exec('sudo /sbin/modprobe -r g_mass_storage');
        $OpValue = $_SERVER['REMOTE_ADDR'];
        $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "'.$_POST['opType'].'" "'.$OpValue.'"');
    }
    if ($_POST['opType'] == "PageLoad"){
        if (file_exists('PS4Info.txt')) {
            $output = file_get_contents('PS4Info.txt');
            shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "'.$_POST['opType'].'" "'.$OpValue.'"');
        } 
    }
	if ($_POST['opType'] == "WebKItClickOk"){
        $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "'.$_POST['opType'].'" "'.$OpValue.'"');
    }
    if ($_POST['opType'] == "USBLoadClickOk"){
        $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "'.$_POST['opType'].'" "'.$OpValue.'"');
    }
    if ($_POST['opType'] == "JBAfterClickOK"){
        $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "'.$_POST['opType'].'" "'.$OpValue.'"');
    }   
    if ($_POST['opType'] == "IPUpdate"){
    	$OpValue="no";
    	if($_POST['opVal']=="enable"){
	    	$OpValue = $_SERVER['REMOTE_ADDR'];
	    }
        $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "'.$_POST['opType'].'" "'.$OpValue.'"');
    }   
	echo $output;
}

if ($_POST['value'] == "getConfValue"){
    $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/py/getConfValue.py "'.$_POST['opType'].'"');
    echo $output;
}

if ($_POST['value'] == "DriveUpdate"){ 
    $output = "Parttion creation Failed !!!";
	$output = shell_exec('sudo /sbin/modprobe -r g_mass_storage');
	if ($_POST['opType'] == "Exfat"){
        shell_exec('sudo /bin/sh /usr/html/Resources/Shell/ExFatDrive.sh');
        $part4Size = exec("awk '{print $1}' /sys/class/block/mmcblk0p4/size");
        if($part4Size != "0" && $part4Size != "2"){
        	$output = "parttion created sucessfully :)";
        }
    }
    if ($_POST['opType'] == "Fat32Exfat"){
        shell_exec('sudo /bin/sh /usr/html/Resources/Shell/Fat32ExfatDrive.sh "'.$_POST['opValue'].'"');
        $part4Size = exec("awk '{print $1}' /sys/class/block/mmcblk0p4/size");
        if($part4Size == "0" || $part4Size == "2"){
        	$output = "parttion created sucessfully :)";
        }
    }
    echo $output;
}

?>

