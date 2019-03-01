---
title: domino- xml解析
date: 2019-02-28 17:49:55
tags: 
    - domino
categories:
    - domino
---

# domino 日常打卡-xml解析
解析xml的常用方法
``` lotus 
REM
	功能：将xml字符串转化为xml对象
%END REM
Function getdocflowxmltime(strXml As String ) As Double 
    On Error GoTo h
    Dim session As New NotesSession
	Dim domParser As NotesDOMParser   '定义xml 文档对象
	Dim documentList As NotesDOMNodeList
	Dim eNode As NotesDOMElementNode
	Dim i As Integer
	Dim allstat As Double 
    '找到每条文档对应的意见文档
	strXml = Replace(Replace(strXml,Chr(10),"") ,Chr(13),"")
	If strXml <> "" Then
		Set domParser=session.CreateDOMParser(strXml)
		domParser.Process
		Set documentList = domParser.Document.GetElementsByTagName ("NodeInfo")  '根据实际需求来处理
		For i = 1 To documentList.NumberOfEntries
			Set eNode = documentList.GetItem(i)
			'根据实际需求来解析		 
		Next
		
	End If
			
	
	getdocflowxmltime=allstat
	
	
	'msg(allstat)
	
	Exit Function 
h:
	showerror("getdocflowxmltime")	
End Function
```


