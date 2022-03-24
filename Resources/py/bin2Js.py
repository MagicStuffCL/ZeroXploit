import sys
import os
from glob import glob
try:
	binFolder="/usr/html/Bin/JsBins"
	TargetFolder="/usr/html/Resources/jsLoader/JSFiles"
	for FileName in glob('{}/*.bin'.format(binFolder)):
			output_file = "{}/{}.js".format(TargetFolder,os.path.basename(FileName)[:-4])
			if os.path.isfile(output_file):
				continue
			with open(FileName, 'rb') as buf:
				payload = ["0x{:02x}".format(b) for b in buf.read()]
			size = len(payload)

			output = "var payload =\n["
			
			count = 0
			for x in payload:
				count = count + 1
				output += "{}".format(int(x, 16))
				if count < size:
					output += ","
			
			output += "];\n"
			output += "window.mira_blob_2_len = 0x102ac0;\nwindow.mira_blob_2 = malloc(window.mira_blob_2_len);\nwrite_mem(window.mira_blob_2, payload);"
			
			
			with open(output_file, "w") as buf:
				buf.write(output)
			print("create js for {}".format(os.path.basename(FileName)))
	for FileName in glob('{}/*.js'.format(TargetFolder)):
		input_file = "{}/{}.bin".format(binFolder,os.path.basename(FileName)[:-3])
		if not os.path.isfile(input_file):
			try:
				print("removed {}".format(os.path.basename(FileName)))
				os.remove(FileName)
			except:
				pass
				
except Exception as e:
	print("update Failed !!! {}".format(str(e)))
