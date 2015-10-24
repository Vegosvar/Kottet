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

})