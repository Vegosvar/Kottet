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

  Voting.init({
    url: 'https://voting.mjolken.se:443',
    id: 'Kottet',
    no_percentages: true,
    choices: {
      yes: {
        button: '.btn-yes',
        result: '.item.yes',
        result_percentage: '.percentage.yes'
      },

      no: {
        button: '.btn-no',
        result: '.item.no',
        result_percentage: '.percentage.no'
      },

      maybe: {
        button: '.btn-maybe',
        result: '.item.maybe',
        result_percentage: '.percentage.maybe'
      }
    },

    elements: {
      total_votes: '.votes',
      success: '#voting-form',
      error: '#voting-form'
    },

    messages: {
      total_votes: '{{VOTES}}',
      success: '<div class="col-sm-12"><div class="answer"><h3>Rösten mottagen!</h3><p class="cookieText">Här får du en kaka som tack</p><a href="http://vegoteket.se/2014/03/kladdkaka/" title="Recept på kladdkaka" target="_blank"><img src="/assets/img/cookie.svg"></a></div></div>',
      error: '<div class="col-sm-12"><div class="answer"><h3>Du har redan röstat!</h3></div></div>'
    }
  })
})