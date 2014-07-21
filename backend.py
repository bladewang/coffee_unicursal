# coding: utf-8

from flask import Flask, render_template, request
from json import dumps as json_dumps
from json import loads as json_loads

from unicursal_solver import gen_random_points
from unicursal_solver import unicursal_from_lb, unicursal
from unicursal_solver import solve_by_annealing, rotate_path
import mst

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
def index():
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
        plist = json_loads(request.form.get('data'))
        lbpos = json_loads(request.form.get('lb_pos'))
        return json_dumps(unicursal_from_lb(plist, lbpos))
    except: #FIXME: fix type of except
        return erro_screen_points()


@app.route('/solve_2nd', methods=['POST', 'GET'])
def uri_solve_2nd():
    '''
    >>> data_str 
    [[0,0], [1,2], [3,4] ...]
    '''
    plist = json_loads(request.form.get('data'))
    try:
        if len(plist) < 9:
            return json_dumps(unicursal(plist))
        else:
            return json_dumps(
                rotate_path(
                    solve_by_annealing(
                        plist, T=1000000, cool=0.999, step=len(plist))))
    
    except: #FIXME: fix type of except
        erro_screen_points()


@app.route('/mst', methods=['POST', 'GET'])
def get_mst():

    points = map(tuple, json_loads(request.form.get('data')))

    return json_dumps(
        mst.mst(
            mst.fullmap_of_pointslist(points)))


@app.route('/rand_points/<int:width>/<int:height>/<int:count>')
def rand_points(width=100, height=100, count=8):
    
    return json_dumps(gen_random_points(width, height, count))


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
