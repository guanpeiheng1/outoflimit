#!python3
import appex, console, shutil
from os import path, mkdir

save_dir = path.expanduser('~/Documents/导入的脚本')
if not path.isdir(save_dir):
	mkdir(save_dir)

if appex.is_running_extension():
	get_path = appex.get_file_path()
	get_name = path.split(get_path)[-1]
	name = get_name.split('.')[0]
	ext = get_name.split('.')[-1]
	file_name = name + '.' + ext
	save_path = path.join(save_dir,file_name)
	num = 0
	while path.isfile(save_path):
		num += 1
		file_name = name + str(num) + '.' + ext
		save_path = path.join(save_dir,file_name)
	try:
		shutil.copy(get_path,save_path)
		console.hud_alert('导入成功！','',1)
	except:
		console.hud_alert('导入失败！','error',1)
		
