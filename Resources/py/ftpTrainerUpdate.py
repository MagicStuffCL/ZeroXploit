#!/usr/bin/env python3
import urllib.request, json, os
from multiprocessing.pool import ThreadPool
from glob import glob
import sys
import ntplib
from datetime import datetime, timezone
from time import ctime
from  urllib.request import urlretrieve
from ftplib import FTP

# def GetNTPDateTime(server):
    # try:
        # ntpDate = None
        # client = ntplib.NTPClient()
        # response = client.request(server, version=3)
        # ntpDate = datetime.fromtimestamp(response.tx_time)
        # return ntpDate.strftime("%d-%b-%Y")
    # except Exception as e:
        # print (e)
def GetNTPDateTime(server):
    try:
        ntpDate = None
        client = ntplib.NTPClient()
        response = client.request(server, version=3)
        ntpDate = datetime.fromtimestamp(response.tx_time)
        return ntpDate.strftime("%d-%b-%Y")
    except Exception as e:
        print (e)

def updateTrainer(ip):
	try:
		savepathgames = "/usr/html/Resources/OffTrainer/"
		saveupdatedate = "/usr/html/"
		path = "User/Documents"
		FTP_HOST = ip
		PORT=2121
		def download(url):
			file_name_start_pos = url.rfind("/") + 1
			file_name = url[file_name_start_pos:]
			try:
				if file_name.split('.')[-1] != 'jpg' or not os.path.isfile(savepathgames + file_name):
					urllib.request.urlretrieve(url, savepathgames + file_name)
			except:
				pass
				
		try:
			with urllib.request.urlopen("http://ps4trainer.com/Trainer/list.json") as url:
				data_json = url.read().decode('utf-8-sig')
				data = json.loads(data_json)        
				# poslastchar = data_json.rfind("}")
				# currentDate = GetNTPDateTime("ntp.shoa.cl")
				# data_json = data_json[:poslastchar - 1 ] + ',"' + 'TrainersUpdatedOn' + '"' +': ["' + currentDate + '"]\n' + data_json[poslastchar:]
				# f = open(savepathlist + "list.json", "w")
				# f.write(data_json)
				# f.close()
			gameurl=[]	
			for game in data['games']:
				gameurl.append(game['url'].replace(".", "http://ps4trainer.com/Trainer", 1))
			#gameurl=[]
			results = ThreadPool(8).imap_unordered(download, gameurl)
			for r in results:
				pass
			# createManiFest()
			os.system("sudo chmod -R ugo+rwx {}*".format(savepathgames))    
			# connect to the FTP server
			ftp = FTP()
			ftp.connect(FTP_HOST, PORT)
			ftp.login()
			# force UTF-8 encoding
			ftp.encoding = "utf-8"
			ftp.cwd('/user/data/GoldHEN/cheats/json/')
			for root, dirs, files in os.walk(savepathgames, topdown=True):
				for f in files:
					filePath = os.path.join(path,"/usr/html/Resources/OffTrainer",f)
					with open(filePath, 'rb') as fileObj:
						ftp.storbinary('STOR '+f,fileObj)
			ftp.quit()
			currentDate = GetNTPDateTime("ntp.shoa.cl")
			f = open(saveupdatedate + "TrainersUpdated.json", "w")
			dateUpdated = '{"TrainersUpdated": "' + currentDate + '"}'
			f.write(dateUpdated)
			f.close()
			print('Files updated :)')
		except Exception as e:
			print('Update Failed, Check for internet or enable ftp server from goldhen!!!{}'.format(str(e)))
	except Exception as e:
		print('Update Failed, Check for internet or enable ftp server from goldhen!!!{}'.format(str(e)))
updateTrainer(sys.argv[1])