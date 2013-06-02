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
      $('#data_str').val(data)
      $('#data_str_backup').text(data)

      clear
      processing = new Processing($("#mycanvas")[0], 
        coffee_points(
          JSON.parse(data)))

  $('#btn_reset_data').on 'click', ->
    $('#data_str').val $('#data_str_backup').text()
    data_str = $('#data_str').val()
    processing = new Processing($("#mycanvas")[0], 
      coffee_points(
        JSON.parse(data_str)))

  $('#btn_solve_1').on 'click', ->
    $.post(
      '/solve_1st',
      "data":
        $('#data_str').val()
      "lb_pos":
        JSON.stringify [0, parseInt $('#canvas_height').text()]
      ,
      (data) ->
        $('#data_str').val(data)
        processing = new Processing($("#mycanvas")[0], coffee_points( JSON.parse(data)))
        $('#btn').attr 'disabled', false
    )
    $('#btn').attr 'disabled', true

  $('#btn_solve_2').on 'click', ->
    $.post(
      '/solve_2nd',
      "data":
        $('#data_str').val()
      ,
      (data) ->
        $('#data_str').val(data)
        processing = new Processing($("#mycanvas")[0], coffee_points( JSON.parse(data)))
        $('#btn').attr 'disabled', false
    )
    $('#btn').attr 'disabled', true

  $('#btn_draw_mst').on 'click', ->
    $.post(
      '/mst',
      "data":
        $('#data_str').val()
      ,
      (data) -> 
        processing = new Processing($("#mycanvas")[0],
          coffee_mst(JSON.parse(data)))
    )


coffee_points = (point_list, delay_factor=0.3) ->
  (p5) ->
    w = parseInt $('#canvas_width').text()
    h = parseInt $('#canvas_height').text()

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


coffee_mst = (edge_list) ->
  (p5) -> 
    w = parseInt $('#canvas_width').text()
    h = parseInt $('#canvas_height').text()

    p5.my_line = (ox, oy, nx, ny) ->
      @fill 200
      @stroke(200)
      @strokeWeight(5);
      @strokeCap(p5.ROUND);
      @line ox, oy, nx, ny

    p5.my_ellipse = (x, y, r1, r2, w=5) ->
      @stroke(180, 0, 90)
      @strokeWeight(w)
      @ellipse x, y, r1, r2
  
    p5.setup = ->
      @size w, h
      @noStroke()
      @background 125
  
      for edge in edge_list
        for point in edge
          @my_ellipse point[0], point[1], 10, 10
        [[x1, y1], [x2, y2]] = edge
        @my_line x1, (y1 - 1), x2, (y2 - 1)

      @noLoop


coffee_draw = (point_list, delay_factor=0.3) ->
  (p5) ->
    w = parseInt $('#canvas_width').text()
    h = parseInt $('#canvas_height').text()
    
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

      $('input[type="button"]').attr 'disabled', true

      for point in point_list
        @my_ellipse point[0], point[1], 10, 10, 5, @color(180, 0, 90) 

    p5.draw = ->

      while delay <= 0
        if (point_list.length - 1) is point_idx
          $('input[type="button"]').attr 'disabled', false

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

