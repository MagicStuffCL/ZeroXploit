<?php 

if ($_POST['value'] == "enableKB"){
    $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "enableKeyBoard"'); 
    echo $output;
}

if ($_POST['value'] == "disableKB"){
    $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "disableKeyBoard"'); 
    echo $output;
}

if ($_POST['value'] == "singleKey"){
    $output = shell_exec('sudo /usr/bin/python3 /usr/html/Resources/AutoJb/autoSeq.py "singleKey" "'.$_POST['OpValue'].'"'); 
	echo $output;
}


?>

