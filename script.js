$ ->
  $('#btn').on 'click', ->
    alert $('#txt').val()


coffee_draw = (p5) ->
  w = 480
  h = 480
  speed = 3
  vx = speed
  vy = speed
  
  point_list = [
    [64, 94], [140, 130], [150,50],
    [0, 480], [20,30], [30, 20], [360, 200]]

  point_idx = 0
  delay = 0
  [x, y] = point_list[0]
  [tp_x, tp_y] = [0, 0]

  delay_to_p = (x, y, tp_x, tp_y) ->
    pw = Math.pow
    parseInt(
      Math.sqrt (
        pw((tp_x - x), 2) + pw((tp_y - y), 2)))

  p5.setup = ->
    @size w, h
    @noStroke()
    "
    @fill 153
    @rect 0, 0, 30, 30
    "
    @background 125

  p5.draw = ->
    @fill 153
    @rect 20, 10, 130, 20
    @fill 200
    @text "Hello World! #{x} #{y}", 20 , 20

    while delay is 0
      point_idx += 1
      [tp_x, tp_y] = point_list[point_idx]
      delay = delay_to_p(x, y, tp_x, tp_y) 

    x += (tp_x - x) / delay
    y += (tp_y - y) / delay

    delay -= 1

    x = parseInt x
    y = parseInt y

    @ellipse x, y, 10, 10


$(document).ready ->
  processing = new Processing(
    document.getElementById(
      "mycanvas"), 
    coffee_draw)
