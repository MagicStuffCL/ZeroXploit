<?php 
    
$payloads_dir = "./payloads/custom/";
$handle=opendir($payloads_dir);

if ($handle) {
	while ($file = readdir($handle)){
		if($file != "." && $file != ".." && $file != "/" && (strpos($file,".bin"))){
			$dirlist[] = $file;
		}
	}                        
}       

closedir($handle);

$i = 0;
$options = "";

while(IsSet($dirlist[$i])){            
	$fileName = $dirlist[$i];
	$options .= "<option value='" . $fileName . "'>" . $fileName . "</option>";            
	$i++;                    
}

if ($options != "") {
	echo "<select name='selCustomPayload' id='selCustomPayload'>" . $options  . "</select>";
}else{
	echo "No custom payloads found!";
}

?>
