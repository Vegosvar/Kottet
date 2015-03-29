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