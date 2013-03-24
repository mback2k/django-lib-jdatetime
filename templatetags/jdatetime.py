from django import template
from django.conf import settings
from django.template import defaultfilters
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter
def unidate(value, arg=None):
    if not value:
        return ''
    if arg is None:
        arg = settings.DATE_FORMAT
    return mark_safe('<time datetime="%s" class="date">%s</time>' % (
        value.isoformat(),
        defaultfilters.date(value, arg)
    ))

@register.filter
def unitime(value, arg=None):
    if not value:
        return ''
    if arg is None:
        arg = settings.TIME_FORMAT
    return mark_safe('<time datetime="%s" class="time">%s</time>' % (
        value.isoformat(),
        defaultfilters.time(value, arg)
    ))

@register.filter
def unidatetime(value, arg1=None, arg2=None):
    if not value:
        return ''
    if arg1 is None:
        arg1 = settings.DATE_FORMAT
    if arg2 is None:
        arg2 = settings.TIME_FORMAT
    return mark_safe('<time datetime="%s" class="datetime">%s %s</time>' % (
        value.isoformat(),
        defaultfilters.date(value, arg1),
        defaultfilters.time(value, arg2)
    ))

@register.filter
def localedate(value, arg=None):
    if not value:
        return ''
    if arg is None:
        arg = settings.DATE_FORMAT
    return mark_safe('<time datetime="%s" class="localedate">%s</time>' % (
        value.isoformat(),
        defaultfilters.date(value, arg)
    ))

@register.filter
def localetime(value, arg=None):
    if not value:
        return ''
    if arg is None:
        arg = settings.TIME_FORMAT
    return mark_safe('<time datetime="%s" class="localetime">%s</time>' % (
        value.isoformat(),
        defaultfilters.time(value, arg)
    ))

@register.filter
def localedatetime(value, arg1=None, arg2=None):
    if not value:
        return ''
    if arg1 is None:
        arg1 = settings.DATE_FORMAT
    if arg2 is None:
        arg2 = settings.TIME_FORMAT
    return mark_safe('<time datetime="%s" class="localedatetime">%s %s</time>' % (
        value.isoformat(),
        defaultfilters.date(value, arg1),
        defaultfilters.time(value, arg2)
    ))
