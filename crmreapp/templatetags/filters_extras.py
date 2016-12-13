#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django import template
import re

register = template.Library()

@register.filter
def splitstr(value, arg):
    # "разделяет строку по разделителю"
    return value.split(arg)

@register.filter
def cleanhtml(value):
    # "очищает текст от html тегов"
    p = re.compile(r'<.*?>')
    value_new = p.sub('', value)
    return value_new

@register.filter
def avitohtml(value):
    # "готовим html текст для авито"
    return value.replace("<b>",'<strong>').replace("</b>","</strong>").replace("<div>",'<p>').replace("</div>","</p>").replace("<i>",'<em>').replace("</i>","</em>")