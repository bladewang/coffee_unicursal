$ ->
  $('#btn').on 'click', ->
    data_str = $('#data_str').val()
    alert(data_str)

    delete processing 
    
    $('#mycanvas').remove()
    $('body').prepend('<canvas id="mycanvas"></canvas>')

    processing = new Processing(
      document.getElementById(
        "mycanvas"), 
      coffee_draw(JSON.parse(data_str)))

coffee_draw = (pl) ->
  (p5) ->
      w = 480
      h = 480
      speed = 3
      vx = speed
      vy = speed
      
      point_list = pl
      point_idx = 0
      delay = 0
      [x, y] = point_list[0]
      [tp_x, tp_y] = [0, 0]

      delay_to_p = (x, y, tp_x, tp_y) ->
        pw = Math.pow
        0.3 * parseInt(
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

        while delay <= 0
          point_idx += 1
          [tp_x, tp_y] = point_list[point_idx]
          delay = delay_to_p(x, y, tp_x, tp_y) 

        x += (tp_x - x) / delay
        y += (tp_y - y) / delay

        delay -= 1

        x = Math.round x
        y = Math.round y

        @ellipse x, y, 10, 10


