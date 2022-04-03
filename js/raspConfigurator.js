function SetNetwork(device,OpType){
    var sid="dummy";
    var pwd="dummy";
if (device=='wlan' && OpType=='enable'){
    sid=document.getElementById('SSID').value;
    pwd=document.getElementById('password').value;
    if (sid === "" || pwd === "") {
        alert("Valid Ssid and password please");
        return;
    }
}
var hr = new XMLHttpRequest();
const url = "../script.php";
const vars = "value="+"Network"+"&device="+encodeURIComponent(device)+"&OpType="+encodeURIComponent(OpType)+"&sid="+encodeURIComponent(sid)+"&pwd="+encodeURIComponent(pwd);
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
        alert(hr.responseText+'Will reflect on restarting the PS4');
    }
    location.reload();
}
hr.send(vars);

}
function postCommand(val){
var hr = new XMLHttpRequest();
const url = "../script.php";
const vars = "value="+encodeURIComponent(val);
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
        showMessageColor("Command has been executed","green");
       // alert(val+' Command has been executed');
    }
}
hr.send(vars);
}
function updatePass(){
var passType=document.getElementById('PasswordReset').value;
var Rootpwd=document.getElementById('WifiRootpwd').value;
if (Rootpwd === "") {
    alert("Valid password please");
    return;
}
var hr = new XMLHttpRequest();
const url = "../script.php";
const vars = "value="+encodeURIComponent(passType)+"&pwd="+encodeURIComponent(Rootpwd);
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
        alert(hr.responseText);
    }
    location.reload();
}
hr.send(vars);
}
function IdleTimerUpdate(OpType){
var Timer=document.getElementById('IdleTimer').value;
if ((parseInt(Timer) <"180" || parseInt(Timer) >"3600") && OpType ==="start") {
    alert("Please enter a value between 180 to 3600 !!!");
    return;
}
var hr = new XMLHttpRequest();
const url = "../script.php";
const vars = "value="+"IdleTimer"+"&OpType="+encodeURIComponent(OpType)+"&Timer="+encodeURIComponent(Timer);
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
        var resp=hr.responseText;
        if(resp.trim()===""){
            resp="Unable to "+OpType+" the service";
        }
        alert(resp);
    }
    location.reload();
}
hr.send(vars);
}

function driveUpdates(opType,MaxAvail){
    progress.innerHTML="Updating drive , Please wait...";
    var LinSize="0";
    if ( opType ==="Fat32Exfat"){
        LinSize=document.getElementById('driveUpdateLinSize').value;
        if ((parseInt(LinSize) <"1" || parseInt(LinSize) >(parseInt(MaxAvail)-1) )) {
            alert("Please enter a value between 1 to "+(parseInt(MaxAvail)-1) +" !!!");
            return;
        }
    }
    var hr = new XMLHttpRequest();
    const url = "script.php";
    const vars = "value="+"DriveUpdate"+"&opType="+encodeURIComponent(opType)+"&opValue="+encodeURIComponent(LinSize);
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState == 4 && hr.status == 200) {
            var resp=hr.responseText;
            alert(resp);
        }
        location.reload();
    }
    hr.send(vars);
}

function AutoJBUpdate(opType){
var hr = new XMLHttpRequest();
const url = "../script.php";
const vars = "value="+"AutoJb"+"&opType=IPUpdate"+"&opVal="+encodeURIComponent(opType);
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
        var resp=hr.responseText;
        if(resp.trim()===""){
            resp="Unable to "+opType+" the Auto Jailbreak";
        }
        alert(resp);
    }
    location.reload();
}
hr.send(vars);
}

function usbLoading(driveName){
var hr = new XMLHttpRequest();
const url = "../script.php";
const vars = "value=LoadVirtualUSB"+"&driveName="+encodeURIComponent(driveName);
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
        alert(' USB has been Loaded :)');
    }
}
hr.send(vars);
}