$ ->
  clear = ->
    delete processing 
    $('#mycanvas').remove()
    $('body').prepend('<canvas id="mycanvas"></canvas>')

  $('#btn').on 'click', ->
    data_str = $('#data_str').val()
    clear
    processing = new Processing($("#mycanvas")[0], 
      coffee_draw(JSON.parse(data_str), 0.2))
  
  $('#btn_gen_points').on 'click', ->
    $.get '/rand_points/480/480/8', (data)->
      data_str = $('#data_str').val(data)

      clear
      processing = new Processing($("#mycanvas")[0], 
        coffee_points(
          JSON.parse(data)))

coffee_points = (point_list, delay_factor=0.3) ->
  (p5) ->
    w = 480
    h = 480

    p5.my_ellipse = (x, y, r1, r2, w=5) ->
      @stroke(180, 0, 90)
      @strokeWeight(w)
      @ellipse x, y, r1, r2

    p5.setup = ->
      @size w, h
      @noStroke()
      @background 125

      @my_ellipse point[0], point[1], 10, 10 for point in point_list
      @noLoop


coffee_draw = (point_list, delay_factor=0.3) ->
  (p5) ->
    w = 480
    h = 480
    
    point_idx = 0
    delay = 0
    [x, y] = point_list[0]
    [tp_x, tp_y] = [x, y]

    delay_to_p = (x, y, tp_x, tp_y) ->
      pw = Math.pow
      delay_factor * parseInt(
        Math.sqrt (
          pw((tp_x - x), 2) + pw((tp_y - y), 2)))

    p5.my_ellipse = (x, y, r1, r2, w=5, p_color=@color(230, 0, 0)) ->
      @stroke(p_color)
      @strokeWeight(w)
      @ellipse x, y, r1, r2

    p5.my_line = (ox, oy, nx, ny) ->
      @fill 200
      @stroke(200)
      @strokeWeight(5);
      @strokeCap(p5.ROUND);
      @line ox, oy, nx, ny

    p5.setup = ->
      @size w, h
      @noStroke()
      @background 125

      $('#btn').attr('disabled', true)
      $('#btn_gen_points').attr('disabled', true)
      @my_ellipse point[0], point[1], 10, 10, 5, @color(180, 0, 90) for point in point_list

    p5.draw = ->

      while delay <= 0
        if (point_list.length - 1) is point_idx
          $('#btn').attr('disabled', false)
          $('#btn_gen_points').attr('disabled', false)

        [tp_x, tp_y] = point_list[point_idx]
        @my_ellipse tp_x, tp_y, 10, 10

        @fill 0, 50, 200
        @text "#{point_idx}: (#{tp_x}, #{tp_y})", x, y

        point_idx += 1
        [tp_x, tp_y] = point_list[point_idx]
        delay = delay_to_p(x, y, tp_x, tp_y) 

      [od_x, od_y] = [x, y]
      x += (tp_x - x) / delay
      y += (tp_y - y) / delay

      delay -= 1
      
      @my_line od_x, od_y, x, y

$(document).ready ->
  data_str = $('#data_str').val()
  processing = new Processing($("#mycanvas")[0], 
    coffee_points(
      JSON.parse(data_str)))

