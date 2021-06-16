# download an entire github repo.

import urllib.request, urllib.parse, urllib.error
import zipfile, sys, functools, re, os, tempfile
import appex, clipboard, console

def match_git(git):
	m = re.match((r'^http(s?)://([\w-]*\.)?github\.com/[\w-]+/[\w-]*/blob/[\w-]*.*/(?P<file>.+)\.(?P<suffix>\w+)$'), git)
	return m

def extract_git_id(git):
	m = re.match((r'^http(s?)://([\w-]*\.)?github\.com/(?P<user>[\w-]+)/(?P<repo>[\w-]*)'
	'((/tree|/blob)/(?P<branch>[\w-]*))?'), git)
	return m
	
def dlProgress(filename, count, blockSize, totalSize):
	if count*blockSize > totalSize:
		percent=100
	else:
		percent = max(min(int(count*blockSize*100/totalSize),100),0)
	sys.stdout.write("\r" + filename + " ... %d%%" % percent)
	sys.stdout.flush()
	
def file_download(url, match):
	print('Waiting...')
	git = match.groupdict()
	name = git['file'] + '.' + git['suffix']
	dir = os.path.expanduser('~/Documents/') + name
	with open(dir, 'wb') as file:
		urllib.request.urlretrieve(url, file.name, reporthook = functools.partial(dlProgress, url))
	print('\n' + name + ' download succeeded.')
	console.open_in(dir)

def git_download(url):
	base = 'https://github.com'
	match = extract_git_id(url)
	if match:
		print('Waiting...')
		git = match.groupdict()
		if not git['branch']:
			git['branch'] = 'master'
			
		url = '/'.join((base, git['user'], git['repo'], 'archive', git['branch'], '.zip'))
		try:
			with tempfile.NamedTemporaryFile(mode='w+b',suffix='.zip') as file:
				urllib.request.urlretrieve(url, file.name, reporthook = functools.partial(dlProgress, url))
				dir = os.path.expanduser('~/Documents/')
				zip = zipfile.ZipFile(file)
				zip.extractall(dir)
			print('\n' + git['repo'] + '-' + git['branch'] + ' download succeeded.')
		except:
			print('\nGit url did not return zip file.')
	else:
		print('Could not determine repo url from clipboard or extension.')
		
def main():
	if appex.is_running_extension():
		url = appex.get_url()
	else:
		url = clipboard.get()
	console.clear()
	match = match_git(url)
	if match:
		url = url.replace('/blob/', '/raw/')
		file_download(url, match)
	else:
		git_download(url)
		
if __name__=='__main__':
	main()
