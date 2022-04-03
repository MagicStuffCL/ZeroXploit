#!/usr/bin/env python3

import sys
import time
import os

NULL_CHAR = chr(0)

def write_report(ks):
    if str(ks).strip()=='':
        return
    report=NULL_CHAR*2+chr(int(ks))+NULL_CHAR*5
    if ks=="203":
    	report=chr(32)+NULL_CHAR+chr(51)+NULL_CHAR*5
    with open('/dev/hidg0', 'rb+') as fd:
        fd.write(report.encode())
    time.sleep(0.1)
    end=NULL_CHAR*8
    with open('/dev/hidg0', 'rb+') as fd:
        fd.write(end.encode())
    if sys.argv[1]!="singleKey":
	    time.sleep(0.3)

def goToWebPage():
    seq=[41,41,41,41,41,41,41,96,96,96,94,94,94,94,94,94,94,94,94,92,88,96,96,96,96,96,96,96,96,96,96,96,96,96,96,96,96,88,88,88]
    for ks in seq:
        write_report(ks)

if sys.argv[1]=="enableKeyBoard":
	os.system("sudo /sbin/modprobe -r g_mass_storage")
	os.system("sudo ls /sys/class/udc > /config/usb_gadget/g1/UDC")
	print("pi Keyboard Enabled :)")
	sys.exit()

if sys.argv[1]=="disableKeyBoard":
	os.system('echo "" > /config/usb_gadget/g1/UDC')
	print("pi Keyboard disabled :)")
	sys.exit()
	
if sys.argv[1]=="singleKey":

	write_report(sys.argv[2])
	sys.exit()

if sys.argv[1]=="IPUpdate":
	open('/etc/autoJB.conf','w').write(sys.argv[2])
	if sys.argv[2]=="no":
		print("Auto Jailbreak disabled")
	else:
		print("Auto Jailbreak set for {}\nMake Sure that Setting-> Login Setting ->Log Automatic is set".format(sys.argv[2]))
	sys.exit()
	
if not os.path.isfile('/usr/html/PS4Info.txt') and sys.argv[1]!='StartSequence':
	sys.exit()

if sys.argv[1] in ('WebKItClickOk'):
	open('/usr/html/PS4Info.txt','w').write('onWebKItClick')
	os.system('chmod ugo+rwx /usr/html/PS4Info.txt')
	time.sleep(2)
	write_report(41)
	sys.exit()
	
if sys.argv[1]  in('PageLoad'):
	open('/usr/html/PS4Info.txt','w').write('JBStared')
	sys.exit()
	
if sys.argv[1]=='USBLoadClickOk':
	open('/usr/html/PS4Info.txt','w').write('onUSBClick')
	time.sleep(15)
	os.system("sudo /sbin/modprobe -r g_mass_storage")
	time.sleep(2)
	os.system("sudo ls /sys/class/udc > /config/usb_gadget/g1/UDC")
	time.sleep(2)
	write_report(88)
	time.sleep(3)
	write_report(88)
	time.sleep(3)
	write_report(88)
	
	
#from OS
if sys.argv[1]=='StartSequence':
	upFlag=False
	import socket
	ct=1
	try:
		sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		while ct<20:
			result = sock.connect_ex((sys.argv[2],9295))
			if result == 0:
				upFlag=True
				break
				ct=+1
		sock.close()
	except Exception as e:
		print(str(e))
	time.sleep(4)

	if upFlag:
		open('/usr/html/PS4Info.txt','w').write('StartJBSequence')
		goToWebPage()	
	sys.exit()


if sys.argv[1]=='WebKitFail':
	#code
	pass
	
if sys.argv[1]=='JBFail':
	#Sequence for rebbot
	pass

