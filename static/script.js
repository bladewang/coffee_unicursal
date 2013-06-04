
clear = ->
  delete processing 
  $('#mycanvas').remove()
  $('body').prepend('<canvas id="mycanvas"></canvas>')

p_by_data = (p_gen, dat) ->
  new Processing($("#mycanvas")[0], p_gen(dat))

gen_rand_points = ->
  $.get '/rand_points/480/480/8', (data)->
    $('#data_str').val(data)
    $('#data_str_backup').text(data)
    clear
    p_by_data just_draw_points, JSON.parse(data)

$ ->

  $('#btn').on 'click', ->
    data_str = $('#data_str').val()
    clear
    p_by_data path_animation_creator, JSON.parse(data_str)
  
  $('#btn_gen_points').on 'click', ->
    $.get '/rand_points/480/480/8', (data)->
      $('#data_str').val(data)
      $('#data_str_backup').text(data)
      clear
      p_by_data just_draw_points, JSON.parse(data)

  $('#btn_reset_data').on 'click', ->
    $('#data_str').val $('#data_str_backup').text()
    data_str = $('#data_str').val()
    p_by_data just_draw_points, JSON.parse(data_str)

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
        p_by_data path_animation_creator, JSON.parse(data)
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
        p_by_data path_animation_creator, JSON.parse(data)
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
        p_by_data draw_mst, JSON.parse(data)
    )


canvas_width = parseInt $('#canvas_width').text()
canvas_height = parseInt $('#canvas_height').text()


extend = (obj, mixin) ->
  for name, method of mixin
    obj[name] = method
  obj


class stop_after_draw_p 

  constructor: (@point_list, @p_color) ->

  canvas_setup: ->
    @size canvas_width, canvas_height
    @noStroke
    @background 125

  my_ellipse: (x, y, r1, r2, wght=5, ecolor=undefined) ->
    @stroke (if ecolor? then ecolor else @p_color)
    @strokeWeight wght
    @ellipse x, y, r1, r2

  setup: ->
    @canvas_setup()
    for [x, y] in @point_list
      @my_ellipse x, y, 10, 10 
    @noLoop


just_draw_points = (point_list) ->
  (p5) ->
    extend p5, (new stop_after_draw_p(
      point_list,
      p5.color(180, 0, 90)))


class stop_after_draw_p_l extends stop_after_draw_p

  constructor: (@point_list, @edge_list, @p_color) ->
    super @point_list, @p_color

  my_line: (ox, oy, nx, ny) ->
    @stroke(200)
    @strokeWeight(5);
    @strokeCap(@ROUND);
    @line ox, oy, nx, ny

  setup: ->
    @canvas_setup()
    for [[x1, y1], [x2, y2]] in @edge_list
      @my_ellipse x1, y1, 10, 10
      @my_ellipse x2, y2, 10, 10
      @my_line x1, y1, x2, y2
    @noLoop


draw_mst = (edge_list) ->
  (p5) -> 
    extend p5, (new stop_after_draw_p_l(
      [],
      edge_list,
      p5.color(180, 0, 90)))


class path_animation extends stop_after_draw_p_l
  constructor: (@point_list, @edge_list, @p_color, @delay_factor=0.3, @after) ->
    super @point_list, @edge_list, @p_color
    @point_idx = 0
    @_c_steps = 0
    [@_cx, @_cy] = @point_list[0]
    [@tp_x, @tp_y] = [@_cx, @_cy]

  delay_to_p: (_cx, _cy, tp_x, tp_y) ->
    pw = Math.pow
    @delay_factor * parseInt(
      Math.sqrt (
        pw((tp_x - _cx), 2) + pw((tp_y - _cy), 2)))

  setup: ->
    $('input[type="button"]').attr 'disabled', true
    @canvas_setup()
    for [x, y] in @point_list
      @my_ellipse x, y, 10, 10, 5, @color(180, 0, 90) 

  draw: ->
    while @_c_steps <= 0
      if (@point_list.length - 1) is @point_idx
        $('input[type="button"]').attr 'disabled', false
        if @after? then @after()

      [@tp_x, @tp_y] = @point_list[@point_idx]
      @my_ellipse @tp_x, @tp_y, 10, 10

      @fill 0, 50, 200
      @text "#{@point_idx}: (#{@tp_x}, #{@tp_y})", @_cx, @_cy

      @point_idx += 1
      [@tp_x, @tp_y] = @point_list[@point_idx]
      @_c_steps = @delay_to_p(@_cx, @_cy, @tp_x, @tp_y) 

    [od_x, od_y] = [@_cx, @_cy]
    @_cx += (@tp_x - @_cx) / @_c_steps
    @_cy += (@tp_y - @_cy) / @_c_steps

    @_c_steps -= 1
    
    @my_line od_x, od_y, @_cx, @_cy


path_animation_creator = (point_list) ->
  (p5) ->
    extend p5, (new path_animation(
        point_list,
        [],
        p5.color(230, 0, 0)
        0.12)) 


welcome_animation_creator = (point_list) ->
  (p5) ->
    extend p5, (new path_animation(
        point_list,
        [],
        p5.color(230, 0, 0),
        0.15,
        ->
          clear()
          gen_rand_points())) 


$(document).ready ->
  data_str = $('#data_str').val()
  p_by_data welcome_animation_creator, JSON.parse(data_str)
  gen_rand_points
