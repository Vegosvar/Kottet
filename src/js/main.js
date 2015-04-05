$(function () {
  var isIe = false

  if (navigator.userAgent.indexOf('MSIE') > -1 || /rv:11.0/i.test(navigator.userAgent)) {
    isIe = true
  }

  if (!Modernizr.svgasimg || isIe) {
    $('img[src*="svg"]').attr('src', function () {
      return $(this).attr('src').replace('.svg', '.png')
    })
  }

  $('.counter').counterUp({
    delay: 20,
    time: 1000
  })

  $('.iss').click(function () {
    $('.iss').removeClass('functional').addClass('houston_we_have_a_problem')
    $('.explosion').addClass('detonate')
  })

  $('.butterfly').click(function () {
    $('.butterfly').addClass('active')
    $('.butterfly_shadow').addClass('active')
  })

  $('.orange').click(function () {
    $('.orange').addClass('hide')
    $('.orange_eaten').addClass('show')
  })

  $('.orange_eaten').click(function () {
    $('.orange_eaten').removeClass('show')
    $('.orange_gone').addClass('show')
  })

  var number_regex = new RegExp(/,/g)

  var sanitize_number = function (number) {
    return parseInt(number.replace(number_regex, ''))
  }

  var create_bar = function (number_identifier, bar_identifier, count_percentage) {
    var initial_value = $(number_identifier).text()
    var previous_value
    var triggered = false

    setInterval(function () {
      if (initial_value === '0') {
        initial_value = $(number_identifier).text()
      }

      var value = $(number_identifier).text()

      if (value === initial_value && !triggered) {
        return
      }

      triggered = true

      var percentage

      if (count_percentage) {
        percentage = Math.round((sanitize_number(value) / sanitize_number(initial_value)) * 100) * (parseFloat($(bar_identifier).attr('data-percentage')) / 100)
      }

      if (previous_value !== value) {
        previous_value = value
        $(bar_identifier).css('height', (count_percentage ? percentage : value) + '%')
      }
    }, 100)
  }

  create_bar('.greenhouse_gas_emissions .numbers .counter', '.greenhouse_gas_emissions')
  create_bar('.land_use .numbers .counter', '.land_use')
  create_bar('.water_use .numbers .counter', '.water_use')

  create_bar('.chicken .numbers .counter', '.chicken .stat .content', true)
  create_bar('.pig .numbers .counter', '.pig .stat .content', true)
  create_bar('.cow .numbers .counter', '.cow .stat .content', true)
  create_bar('.lamb .numbers .counter', '.lamb .stat .content', true)
})

/*
$(document).ready(function () {
    var votes = null

    $('#ja').click(function () {
        socket.emit('vote', { vote: 'yes' })
    })

    $('#nej').click(function () {
        socket.emit('vote', { vote: 'no' })
    })

    $('#kanske').click(function () {
        socket.emit('vote', { vote: 'maybe'})
    })

    var displayDone = function () {
      $('.votingarea').html('<h3>Tack för din röst!</h3>')
    }

    var displayError = function (error) {
        $('.votingarea').html('<h3>Du har redan röstat!</h3>')
    }

    var displayResults = function () {
        $('.totalVotes').html('<span class="glyphicon glyphicon-signal"></span>  ' + totalVotes + ' röster')
        var yesPercent = Math.floor(votes.yes / totalVotes * 100)
        var noPercent = Math.floor(votes.no / totalVotes * 100)
        var maybePercent = Math.floor(votes.maybe / totalVotes * 100)
        yesPercent = (isNaN(yesPercent) ? 0 : yesPercent)
        noPercent = (isNaN(noPercent) ? 0 : noPercent)
        maybePercent = (isNaN(maybePercent) ? 0 : maybePercent)
        $('.yes').css('height', yesPercent + '%')
        $('.yes .procent').text(yesPercent + '%')
        $('.no').css('height', noPercent + '%')
        $('.no .procent').text(noPercent + '%')
        $('.maybe').css('height', maybePercent + '%')
        $('.maybe .procent').text(maybePercent + '%')
    }

    var socket = io.connect('https://voting.mjolken.se:443')

    socket.on('initial', function (data) {
        if (data.voted) {
           displayDone()
        }
    })

    socket.on('votes', function (data) {
        votes = data
        totalVotes = data.no + data.yes + data.maybe
        displayResults()
    })

    socket.on('voteresult', function (data) {
        $.cookie('hasVoted', true)
        if (data.error) {
            displayError()
        } else {
            displayDone()
        }
    })
})
*/

