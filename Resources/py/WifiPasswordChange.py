import os
import re
import sys

try:
	dt=open('/etc/hostapd.conf').read()
	match=re.findall('wpa_passphrase=.*?\n',dt)
	dt=dt.replace(match[0],'wpa_passphrase={}\n'.format(sys.argv[1]))
	open('/etc/hostapd.conf','w').write(dt)
	print("Wifi Access PiZero point password Updated :)")
except Exception as e:
	print("Wifi Access PiZero point password Update Failed !!!")
