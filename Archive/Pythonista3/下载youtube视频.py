#!/usr/bin/env python3
# coding: utf-8
# 作者 mersa kk
from __future__ import unicode_literals
import clipboard, re, appex, console, os
import youtube_dl
from urllib import parse
import ui
from objc_util import *
from ctypes import c_bool,c_int32,c_uint32, c_int64,byref,POINTER,c_void_p,pointer,addressof, c_double

filename = ''
a_filename = ''

CMTimeValue=c_int64
CMTimeScale=c_int32
CMTimeFlags=c_uint32
CMTimeEpoch=c_int64
class CMTime(Structure):
   _fields_=[('value',CMTimeValue),
   ('timescale',CMTimeScale),
   ('flags',CMTimeFlags),
   ('epoch',CMTimeEpoch)]
   def __init__(self,value=0,timescale=1,flags=0,epoch=0):
      self.value=value
      self.timescale=timescale
      self.flags=flags
      self.epoch=epoch
c.CMTimeGetSeconds.argtypes=[CMTime]
c.CMTimeGetSeconds.restype=c_double

kCMTimeZero = CMTime.in_dll(c,'kCMTimeZero')

class CMTimeRange(Structure):
   _fields_=[('start',CMTime),
   ('duration',CMTime)]
   def __init__(self,start,duration):
      self.start=start
      self.duration=duration

AVAsset, AVURLAsset, AVComposition, AVCompositionTrack, AVMutableComposition, AVMutableCompositionTrack, AVAssetTrack, AVAssetExportSession, PHPhotoLibrary = map(ObjCClass, ['AVAsset', 'AVURLAsset', 'AVComposition', 'AVCompositionTrack', 'AVMutableComposition', 'AVMutableCompositionTrack', 'AVAssetTrack', 'AVAssetExportSession', 'PHPhotoLibrary'])

outPutFilePath = ''

def mergeFinish():
	print('合并完成')
	if os.path.isfile(a_filename):
		os.remove(a_filename)
	if os.path.isfile(filename):
		os.remove(filename)
	console.hide_output()
	chosen = console.alert('下载成功', "视频已经保存在当前目录youtube_download文件夹下", 'Quick Look', 'Open in', '保存到相册')
	if chosen == 1:
		console.quicklook(outPutFilePath)
	elif chosen == 2:
		console.open_in(outPutFilePath)
	elif chosen == 3:
	    PHPhotoLibrary.requestAuthorization_(photoAuth)
	    

def mergeAV(audioPath, videoPath):
	#console.clear()
	#audioPath = os.path.expanduser('./123.m4a')
	#videoPath = os.path.expanduser('./122.mp4')
	audioAsset = AVURLAsset.assetWithURL_(nsurl(audioPath))
	videoAsset = AVURLAsset.assetWithURL_(nsurl(videoPath))

	compostion = AVMutableComposition.composition()

	video = compostion.addMutableTrackWithMediaType_preferredTrackID_('vide', 0)
	videoDu=CMTime(videoAsset.duration().a//2,videoAsset.duration().b,videoAsset.duration().c,videoAsset.duration().d)
	videoTRange=CMTimeRange(kCMTimeZero,videoDu)
	video.insertTimeRange_ofTrack_atTime_error_(videoTRange,videoAsset.tracksWithMediaType_('vide').firstObject(),kCMTimeZero,None,restype=c_bool,argtypes=[CMTimeRange,c_void_p,CMTime,POINTER(c_void_p)])
	
	audio = compostion.addMutableTrackWithMediaType_preferredTrackID_('soun', 0)
	audioDu=CMTime(audioAsset.duration().a//2,audioAsset.duration().b,audioAsset.duration().c,audioAsset.duration().d)
	audioTRange = CMTimeRange(kCMTimeZero,audioDu)
	audio.insertTimeRange_ofTrack_atTime_error_(audioTRange,audioAsset.tracksWithMediaType_('soun').firstObject(),kCMTimeZero,None,restype=c_bool,argtypes=[CMTimeRange,c_void_p,CMTime,POINTER(c_void_p)])

	session = AVAssetExportSession.alloc().initWithAsset_presetName_(compostion, 'AVAssetExportPresetHighestQuality')
	#outPutFilePath = os.path.expanduser(dest)
	outPutFileDir = './youtube_download'
	if not os.path.exists(outPutFileDir):
		os.makedirs(outPutFileDir)
	global outPutFilePath
	outPutFilePath = os.path.join(outPutFileDir, os.path.basename(filename))
	print(outPutFilePath)
	if os.path.isfile(outPutFilePath):
		os.remove(outPutFilePath)
	session.setOutputURL_(nsurl(outPutFilePath))
	session.setOutputFileType_('com.apple.quicktime-movie')
	session.setShouldOptimizeForNetworkUse_(False)
	print('正在合并,请耐心等待....')
	session.exportAsynchronouslyWithCompletionHandler_(mergeFinish)

def nsstr(s):
	return NSString.stringWithUTF8String_(s)

def UISaveVideoAtPathToSavedPhotosAlbum(videoPath, compleTarget, compleHandler, contextInfo):
	func = c.UISaveVideoAtPathToSavedPhotosAlbum
	func.argtypes = [c_void_p] * 4
	return func(nsstr(videoPath), compleTarget, compleHandler, contextInfo)
	
def photoAuth():
    #if status == 0 or status == 3:
    UISaveVideoAtPathToSavedPhotosAlbum(os.path.abspath(outPutFilePath).encode('utf-8'), None, None, None)
    '''
    else:
        console.alert('请到隐私开启相册的写入权限', "入权限打开才能写入", '确定')
    '''

def v_my_hook(d):
	if d['status'] == 'finished':
		global filename
		filename = d['filename']

def a_my_hook(d):
	if d['status'] == 'finished':
		print('开始合并音频视频......')
		global a_filename
		a_filename = d['filename']
		mergeAV(a_filename, filename)
			
if appex.is_running_extension() and re.search('https*:\/\/[^\s]+', appex.get_attachments()[0]) is not None:
	url = appex.get_attachments()[0]
else:
	clip = re.search('https*:\/\/[^\s]+', clipboard.get())
	if clip is None:
		url = console.input_alert('URL Input')
	else:
		url = clipboard.get()

console.clear()
v_ydl_opts = {
	'format': 'bestvideo[ext=mp4]',
	'outtmpl': '~/Documents/%(title)s.%(ext)s',
	'hls_prefer_native':True,
	'progress_hooks': [v_my_hook]
}
a_ydl_opts = {
	'format': 'bestaudio[ext=m4a]',
	'outtmpl': '~/Documents/%(title)s.%(ext)s',
	'hls_prefer_native':True,
	'progress_hooks': [a_my_hook]
}

url = parse.quote(url,  ':?=/')
with youtube_dl.YoutubeDL(v_ydl_opts) as ydl:
	print('正在下载视频......')
	ydl.download([url])
	print('视频下载完成')
	
with youtube_dl.YoutubeDL(a_ydl_opts) as ydl:
	print('正在下载音频......')
	ydl.download([url])
