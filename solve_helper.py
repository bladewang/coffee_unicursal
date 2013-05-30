# coding: utf-8

from itertools import permutations
from random import randrange

def gen_random_points(width=100, height=100, count=1):
    
    return list(permutations([
        (randrange(width), randrange(height))
        for x in xrange(count)
        ]))

