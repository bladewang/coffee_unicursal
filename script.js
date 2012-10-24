$ ->
  $('#btn').on 'click', ->
    alert $('#txt').val()


coffee_draw = (p5) ->
  x = 20
  y = 201
  w = 240
  h = 240
  speed = 3
  vx = speed
  vy = speed

  p5.setup = ->
    @size w, h
    @fill 153
    @noStroke()
    @rect 0, 0, 30, 30

  p5.draw = ->
    @background 125
    @fill 255
    @text "Hello Web! #{x} #{y}", 20 , 20
    
    x += vx;
    y += vy;

    if (x < 0)
      vx = speed;
    if (x > w)
      vx = -speed;
    if (y < 0)
      vy = speed;
    if (y > h)
      vy = -speed;

    @ellipse x, y, 10, 10


$(document).ready ->
  processing = new Processing(
    document.getElementById(
      "mycanvas"), 
    coffee_draw)