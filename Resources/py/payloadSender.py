import socket
import sys
import os

def send(ip, port, fileName):
    
	try:
		client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM, proto=0)
		client_socket.settimeout(3000)
		client_socket.connect((ip, port))
		with open(fileName, "rb") as fp:
			client_socket.sendfile(fp)
		print("Payload Sent Successfully :)")
	except Exception as err:
		err.errno=str(err.errno)
		if err.errno in ("111","101"):
			print("Enable: Setting -> GoldHen -> BinLoader. Then try again. !!!")
		else:
			print("Payload sending Failed !!! {}".format(str(e)))
	finally:
		client_socket.close()

send(sys.argv[1], int(sys.argv[2]), sys.argv[3])
