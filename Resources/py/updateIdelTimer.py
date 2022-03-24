#python3
import sys
import os

try:
	if sys.argv[1]=='start':
		if not sys.argv[2].isnumeric():
			print("Require a Number, Idel Timer Update Failed !!! ")
			sys.exit()
		open('/etc/idleTimer.conf','w').write(sys.argv[2])
		os.system('chmod a+x /etc/init.d/S99IdelTimer')
		os.system('/etc/init.d/S99IdelTimer start')
	else:
		open('/etc/idleTimer.conf','w').write("0")
		os.system('/etc/init.d/S99IdelTimer stop')
		os.system('chmod a-x /etc/init.d/S99IdelTimer')
	#print("Idle Timer {}ed :)".format(sys.argv[1]))
except Exception as e:
	print("Idel Timer Update Failed !!! {}".format(str(e)))
