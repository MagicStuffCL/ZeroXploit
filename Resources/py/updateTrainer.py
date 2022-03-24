#!/usr/bin/env python3
import urllib.request, json, os
from multiprocessing.pool import ThreadPool
from glob import glob
import sys
from  urllib.request import urlretrieve
import ntplib
from datetime import datetime, timezone
from time import ctime
def GetNTPDateTime(server):
    try:
        ntpDate = None
        client = ntplib.NTPClient()
        response = client.request(server, version=3)
        ntpDate = datetime.fromtimestamp(response.tx_time)
        return ntpDate.strftime("%d-%b-%Y")
    except Exception as e:
        print (e)

savepathgames = "/usr/html/Resources/OffTrainer/games/"
savepathlist = "/usr/html/Resources/OffTrainer/"

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
		poslastchar = data_json.rfind("}")
		currentDate = GetNTPDateTime("ntp.shoa.cl")
		data_json = data_json[:poslastchar - 1 ] + ',"' + 'TrainersUpdatedOn' + '"' +': ["' + currentDate + '"]\n' + data_json[poslastchar:]
		f = open(savepathlist + "list.json", "w")
		f.write(data_json)
		f.close()
	gameurl=[]	
	for game in data['games']:
		gameurl.append(game['url'].replace(".", "http://ps4trainer.com/Trainer", 1))
		gameurl.append("http://ps4trainer.com/Trainer/img/" + game['title'] + ".jpg")
	#gameurl=[]
	results = ThreadPool(8).imap_unordered(download, gameurl)
	for r in results:
		pass
	# createManiFest()
	os.system("sudo chmod -R ugo+rwx {}*".format(savepathlist))    
	print('Files updated :)')
except Exception as e:
	print('Update Failed, Check for internet !!!{}'.format(str(e)))
