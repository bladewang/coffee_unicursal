# coding: utf-8

from flask import Flask, render_template
from json import dumps as json_dumps
from solve_helper import gen_random_points

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html',
        default_data=json_dumps([
            [240, 240], [220, 240], [220, 240],
            [220, 220], [260, 220], [260, 260],
            [180, 260], [180, 180], [300, 180],
            [300, 300], [140, 300], [140, 140],
            [300, 140],
            ]))


@app.route('/rand_points/<int:width>/<int:height>/<int:count>')
def rand_points(width=100, height=100, count=8):
    
    return json_dumps(gen_random_points(width, height, count))


if __name__ == '__main__':
    app.run(debug=True)
