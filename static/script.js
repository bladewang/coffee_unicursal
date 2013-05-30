$ ->
  $('#btn').on 'click', ->
    data_str = $('#data_str').val()

    delete processing 
    
    $('#mycanvas').remove()
    $('body').prepend('<canvas id="mycanvas"></canvas>')

    processing = new Processing(
      document.getElementById(
        "mycanvas"), 
      coffee_draw(JSON.parse(data_str), 0.2))
  
  $('#btn_gen_points').on 'click', ->
    $.get '/rand_points/480/480/8', (data)->
       data_str = $('#data_str').val(data)


coffee_draw = (pl, delay_factor=0.3) ->
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
        delay_factor * parseInt(
          Math.sqrt (
            pw((tp_x - x), 2) + pw((tp_y - y), 2)))

      p5.setup = ->
        @size w, h
        @noStroke()
        @background 125

      p5.draw = ->
        @fill 200

        while delay <= 0

          @stroke(200, 0, 0)
          @strokeWeight(5)
          @ellipse x, y, 10, 10

          point_idx += 1
          [tp_x, tp_y] = point_list[point_idx]
          delay = delay_to_p(x, y, tp_x, tp_y) 

        [od_x, od_y] = [x, y]
        x += (tp_x - x) / delay
        y += (tp_y - y) / delay

        delay -= 1
        
        @stroke(200)
        @strokeWeight(5);
        @strokeCap(p5.ROUND);
        @line od_x, od_y, x, y

