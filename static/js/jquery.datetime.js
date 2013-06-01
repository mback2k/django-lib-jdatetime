/*
 * Copyright (c) 2009 Marc Hörsken <info@marc-hoersken.de>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/*!
 * The Date.setISO8601 function was created by Paul Sowden, thanks a lot!
 * http://delete.me.uk/2005/03/iso8601.html
 */
Date.prototype.setISO8601 = function(string) {
  var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
      "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
      "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
  var d = string.match(new RegExp(regexp));

  var offset = 0;
  var date = new Date(d[1], 0, 1);

  if (d[3]) { date.setMonth(d[3] - 1); }
  if (d[5]) { date.setDate(d[5]); }
  if (d[7]) { date.setHours(d[7]); }
  if (d[8]) { date.setMinutes(d[8]); }
  if (d[10]) { date.setSeconds(d[10]); }
  if (d[12]) { date.setMilliseconds(Number('0.' + d[12]) * 1000); }
  if (d[14]) {
    offset = (Number(d[16]) * 60) + Number(d[17]);
    offset *= ((d[15] == '-') ? 1 : -1);
  }

  offset -= date.getTimezoneOffset();
  time = (Number(date) + (offset * 60 * 1000));
  this.setTime(Number(time));

  return this;
};
Date.prototype.toDateTimeString = function() {
  return this.toDateString() + ' ' + this.toTimeString();
};
Date.prototype.toLocaleDateTimeString = function() {
  return this.toLocaleDateString() + ' ' + this.toLocaleTimeString();
};
(function($) {
    $.fn.extend({
      formatDatetime: function() {
        this.find('time.date[datetime]').each(function(i) {
          $(this).text(new Date().setISO8601(this.getAttribute('datetime')).toDateString()).removeClass('date');
        });
        this.find('time.time[datetime]').each(function(i) {
          $(this).text(new Date().setISO8601(this.getAttribute('datetime')).toTimeString()).removeClass('time');
        });
        this.find('time.datetime[datetime]').each(function(i) {
          $(this).text(new Date().setISO8601(this.getAttribute('datetime')).toDateTimeString()).removeClass('datetime');
        });
        this.find('time.localedate[datetime]').each(function(i) {
          $(this).text(new Date().setISO8601(this.getAttribute('datetime')).toLocaleDateString()).removeClass('localedate');
        });
        this.find('time.localetime[datetime]').each(function(i) {
          $(this).text(new Date().setISO8601(this.getAttribute('datetime')).toLocaleTimeString()).removeClass('localetime');
        });
        this.find('time.localedatetime[datetime]').each(function(i) {
          $(this).text(new Date().setISO8601(this.getAttribute('datetime')).toLocaleDateTimeString()).removeClass('localedatetime');
        });
        return this;
      }
    });
    $(document).ready(function() {
      $(document).formatDatetime();
    }).ajaxComplete(function(request, settings) {
      $(document).formatDatetime();
    });
})(jQuery);
