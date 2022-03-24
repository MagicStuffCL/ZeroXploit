import sys

if sys.argv[1]=='autoJB':
	print(open('/etc/autoJB.conf').read().strip())
if sys.argv[1]=='idleTimer':
	print(open('/etc/idleTimer.conf').read().strip())	
