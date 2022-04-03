from glob import glob
import os
import shutil
import sys

try:
	FileName=sys.argv[2]
	if sys.argv[1] == 'GoldHenUpdate':
		for fls in glob('/usr/html/g*.bin'):
			os.remove(fls)
		try:
			os.remove("Bin/1.GoldHen.bin")
		except:
			pass
		shutil.copy(FileName,"/usr/html/{}".format(os.path.basename(FileName)))
		print("Gold Hen {} is Activated  :)".format(os.path.basename(FileName)))
	elif sys.argv[1] == 'USBimgUpdate':
		for fls in glob('/usr/html/*.img'):
			os.remove(fls)
		shutil.copy(FileName,"/usr/html/{}".format(os.path.basename(FileName)))
		print("USB Img {} is Activated  :)".format(os.path.basename(FileName)))
except Exception as e:
	print("Activation Failed !!! {}".format(str(e)))
