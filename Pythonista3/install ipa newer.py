# taken from http://www.piware.de/2011/01/creating-an-https-server-in-python/
# generate server.xml with the following command:
#    openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
# run as follows:
#    python simple-https-server.py
# then in your browser, visit:
#    https://localhost:4443

from threading import Thread
import http.server
import webbrowser
import time
import appex
import os, shutil

port_number = 7936
plist_url = "itms-services://?action=download-manifest&url=https://gitee.com/mersakk/ShuPlistServer/raw/master/1.plist"

filename = '1.ipa'
dest_dir = './ipa'
dest_path = os.path.join(dest_dir, filename)

def copy_file(path):
	if not os.path.exists(dest_dir):
		os.mkdir(dest_dir)
	if os.path.isfile(dest_path):
		os.remove(dest_path)
	shutil.copy(path, dest_path)
	
def delete_file():
	if os.path.isfile(dest_path):
		os.remove(dest_path)
	
httpd = None
thread = None
def startServer(port):
    Handler = http.server.SimpleHTTPRequestHandler
    
    global httpd
    httpd = http.server.HTTPServer(("", port), Handler)
    
    print("Start server at port", port)
    httpd.serve_forever()

def start(port):
    thread = Thread(target=startServer, args=[port])
    thread.start()
    
    startTime = int(time.time())
    while not httpd:
        if int(time.time()) > startTime + 60:
            print("Time out")
            break
    return httpd

def stop():
    if httpd:
        httpd.shutdown()
        httpd.server_close()
        
def openUrl():
    webbrowser.open(plist_url)
    print(plist_url + " is opened in browser")

def main():
    
    if appex.is_running_extension():
    	if appex.get_file_path():
    		print(appex.get_file_path())
    		copy_file(appex.get_file_path())
    		
    start(port_number)
    
    if httpd:
    	  openUrl()
    
    try:
    	while True: pass
    except KeyboardInterrupt:
    	delete_file()
    	print("delete ipa")
    	stop()
    	print("Server stopped")
    	appex.finish()
		
if __name__ == '__main__':
	main()
