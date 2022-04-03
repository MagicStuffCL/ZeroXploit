import os
import sys
import re

try:
	APStatic="auto wlan0\niface wlan0 inet static\n    nohook wpa_supplicant\n    address 7.7.7.1\n    netmask 255.255.255.0\n    wait-delay 15"
	newInterFace=""	
	if sys.argv[2]!='Router':
		autoLoop="auto lo\niface lo inet loopback"
		lan="auto eth0\niface eth0 inet dhcp\n    pre-up /etc/network/nfs_check\n    hostname pizero"
		wlan="auto wlan0\niface wlan0 inet dhcp\n    pre-up wpa_supplicant -B -Dnl80211 -iwlan0 -c/etc/wpa_supplicant.conf\n    post-down killall -q wpa_supplicant\n    udhcpc_opts -t 20\n    wait-delay 15\n    hostname pizero"
		
		dt=open('/etc/network/interfaces').read()
		
		curConfig={'lan':"",'wlan':""}
		config={}
		ethConfigArr=re.findall('auto eth0.*?pizero',dt,re.S)
		if len(ethConfigArr):
			curConfig['lan']=ethConfigArr[0].replace('auto wlan0','').strip()
			
		wlanConfigArr=re.findall('auto wlan0.*?pizero',dt,re.S)
		if len(wlanConfigArr):
			curConfig['wlan']=wlanConfigArr[0].strip()

		if sys.argv[1]=='lan':
			config['lan']=lan
			if sys.argv[2]=='disable':
				config['lan']=""
			newInterFace='{}\n{}\n{}'.format(autoLoop,config['lan'],curConfig['wlan'])
							
		if sys.argv[1]=='wlan':
			try:
				os.remove('/etc/wpa_supplicant.conf')
			except:
				pass
			config['wlan']=wlan
			if sys.argv[2]=='disable':
				config['wlan']=""
			if sys.argv[2]=='enable':
				open('/etc/wpa_supplicant.conf','w').write(open('/usr/html/wpa_supplicant.conf').read().strip())
			try:
				os.remove('/usr/html/wpa_supplicant.conf')
			except:
				pass	
			newInterFace='{}\n{}\n{}'.format(autoLoop,curConfig['lan'],config['wlan'])
	hostapd="-x"
	announce="+x"
	if newInterFace.count('dhcp')<=0:
		newInterFace=APStatic
		hostapd="+x"
		announce="-x"
	os.system('chmod a{} /etc/init.d/S90hostapd'.format(hostapd))
	open('/etc/network/interfaces','w').write(newInterFace)
	os.system('chmod a{} /etc/init.d/S97pyAnnouncer'.format(announce))
	print('{} is now {} :)'.format(sys.argv[1].capitalize(),sys.argv[2]))
	
except Exception as err:
	print('Unable to {} the {} !!! {}'.format(sys.argv[2].capitalize(),sys.argv[1],str(err)))


