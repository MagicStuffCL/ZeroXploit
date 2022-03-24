<!DOCTYPE html>
<html><head>
<title>PS4 9.00 FW Host v2.5 by GamerHack</title>
<link rel="stylesheet" href="style.css">
<script src="int64.js"></script>
<script src="rop.js"></script>
<script src="kexploit.js"></script>
<script src="webkit.js"></script>
</head>
<script>
function load_jsPayload(PLFile){
var script = document.createElement('script');script.src = PLFile;document.getElementsByTagName('head')[0].appendChild(script);
msgs.innerHTML="Loading "+PLFile.split("/").slice(-1)[0] +"... Please Wait !!!";
run_jb = "payload";
setTimeout(poc,1500);
}
</script>
<body class="bg">
<center>
<h1 id="msgs" style="color:white;font-size: 30px;">Webkit Bins</h1>
<hr>

<br>

<?php
        function cleanName($ActName) {
                    $NewName = substr($ActName, 0, -3);
                    $FinalName="";
                    $Arry=explode("-",$NewName);
                    foreach($Arry as $wd) {
                        $FinalName.=ucwords($wd);
                    }
                return $FinalName;
        }
        function createButtons($BaseFolder){
            $filenames = glob($BaseFolder.'/*.js');
            natcasesort($filenames);                   
            $NumOFelementinRow=6;
            #if (sizeof($filenames) != 0){
            #    $NumOFelementinRow=  intdiv(sizeof($filenames), 6)+1;  
            #}
            $Counter=0;
            foreach ($filenames as $filename) {
                $Clean=cleanName(end(explode("/",$filename)));
                
                echo "<button class='button' onclick=load_jsPayload('".$filename."')> ".$Clean." </button>&nbsp;&nbsp";
                $Counter+=1;

                if ($Counter==$NumOFelementinRow){
                    $Counter=0;
                    echo "<br><br>";
                }
               }
        }
        createButtons('JSFiles');
?>
<br><br>
<a href="/index.php"><button class="buttonDefault"> Return to Main Page </button></a>
<center>
</body>
</html>
