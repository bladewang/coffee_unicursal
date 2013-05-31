# coding: utf-8

from flask import Flask, render_template, request
from json import dumps as json_dumps
from json import loads as json_loads
from solve_helper import gen_random_points

from solve_1 import solve_1st, solve_2nd

app = Flask(__name__)


welcome_screen_points = [
    [240, 240], [220, 240], [220, 240],
    [220, 220], [260, 220], [260, 260],
    [180, 260], [180, 180], [300, 180],
    [300, 300], [140, 300], [140, 140],
    [300, 140],
    ]


def erro_screen_points():
    off = 50
    w = 50
    return json_dumps([
        [off + w, off],
        [off + 2 * w, off + w],
        [off + w, off + 2 * w],
        [off, off + w],
        [off + w, off]])


@app.route('/')
def hello_world():
    return render_template('index.html',
        canv_width=480,
        canv_height=480,
        default_data=json_dumps(welcome_screen_points))


@app.route('/solve_1st', methods=['POST', 'GET'])
def uri_solve_1st():
    '''
    >>> data_str 
    [[0,0], [1,2], [3,4] ...]
    '''
    try:
        plist = json_loads(request.form.get('data'))[:8]
        lbpos = json_loads(request.form.get('lb_pos'))
        return json_dumps(solve_1st(plist, lbpos))
    except: #FIXME: fix type of except
        return erro_screen_points()


@app.route('/solve_2nd', methods=['POST', 'GET'])
def uri_solve_2nd():
    '''
    >>> data_str 
    [[0,0], [1,2], [3,4] ...]
    '''
    try:
        plist = json_loads(request.form.get('data'))[:8]
        return json_dumps(solve_2nd(plist))
    
    except: #FIXME: fix type of except
        erro_screen_points()


@app.route('/rand_points/<int:width>/<int:height>/<int:count>')
def rand_points(width=100, height=100, count=8):
    
    return json_dumps(gen_random_points(width, height, count))


if __name__ == '__main__':
    app.run(debug=True)
