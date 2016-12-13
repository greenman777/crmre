#!/usr/bin/env python
# -*- coding: utf-8 -*-

import httplib2
import random
from xml.etree.ElementTree import Element, tostring
from xml.dom import minidom

from crmre import settings

class AtomParkSMS(object):
    
    def __init__(self,operation_name='',):
        
        httplib2.debuglevel = 9
        self.USER = settings.ATOMPARKSMS['USER']
        self.PASSWORD = settings.ATOMPARKSMS['PASSWORD']
        self.SENDER = settings.ATOMPARKSMS['SENDER']
        self.GATEWAY_URL = settings.ATOMPARKSMS['GATEWAY_URL']
        self.SEND_STATUS = {-1: u'Неправильный логин и/или пароль',
                            -2: u'Неправильный формат XML',
                            -3: u'Недостаточно средств',
                            -4: u'Нет верных номеров получателей',}
    def _get_headers(self,xml):
        
        boundary = '-' * 21 + str(int(random.random() * 1000))
        headers = {'Content-Type': 'multipart/form-data; boundary=%s' % boundary,}
        body = '--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="XML"\r\n\r\n' + xml + '\r\n--' + boundary + '--\r\n'
        
        return headers,body
    
    def _get_xml(self,sms):
        
        xml = tostring(sms,encoding='UTF-8')
        xml = minidom.parseString(xml).toprettyxml(indent=" ")
        xml = xml.encode('utf-8')
        
        return xml
    
    def _base_xml(self,operation_name):
        
        sms = Element('SMS')
        operations = Element('operations')
        operation = Element('operation')
        operation.text = operation_name
        
        operations.append(operation)
        sms.append(operations)
        
        authentification = Element('authentification')
        username = Element('username')
        password = Element('password')
        username.text = self.USER
        password.text = self.PASSWORD
        authentification.append(username)
        authentification.append(password)
        sms.append(authentification)
        
        return sms
        
    def send_sms(self,message_text='',phone_numbers=[]):
        
        sms = self._base_xml('SEND')
        
        message = Element('message')
        sender = Element('sender')
        sender.text = self.SENDER
        text = Element('text')
        text.text = message_text
        
        message.append(sender)
        message.append(text)
        sms.append(message)
        
        numbers = Element('numbers')
        for phone in phone_numbers:
            number = Element('number')
            number.text = phone
            numbers.append(number)
        
        sms.append(numbers)
        
        xml = self._get_xml(sms)
        
        headers,body = self._get_headers(xml)
        
        client = httplib2.Http()
        resp,content = client.request(self.GATEWAY_URL, method='POST', headers=headers, body=body)
        
        content_tree = minidom.parseString(content)
        status = int(content_tree.getElementsByTagName('status')[0].firstChild.data)
        if status > 0:
            return u"Успешно отправлено "+str(status)+u" сообщений"
        else:
            return self.SEND_STATUS[status]