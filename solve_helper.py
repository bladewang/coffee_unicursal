# coding: utf-8

from itertools import permutations
from random import randrange

def gen_random_points(width=100, height=100, points_count=1):
    return  [
        (randrange(width), randrange(height))
        for x in xrange(points_count)
        ]

def path_permutations(points_list):
    return permutations(points_list)

if __name__ == '__main__':
    print 'permutations for 4 random points path:'
    print list(path_permutations(
            gen_random_points(100, 100, 4)
            ))

