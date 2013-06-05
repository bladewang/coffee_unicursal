# coding: utf-8

from math import sqrt

from itertools import ifilter
from itertools import permutations
from random import randrange

def gen_random_points(width=100, height=100, points_count=1):
    return  [
        (randrange(width), randrange(height))
        for x in xrange(points_count)
        ]


def lsum(l):
    path_length = 0
    last_point = None
    for (nx, ny) in l:
        if last_point:
            (ox, oy) = last_point
            path_length += sqrt((nx - ox) ** 2 + (ny - oy) ** 2)
        else:
            pass
        last_point = (nx, ny)
    return path_length


def unicursal_from_lb(point_list, l_bottom):
    '''
    point_list : [[0,0], [1,2], [3,4]...]
    l_bottom: [0,480]
    '''
    lbx, lby = l_bottom

    first_point = min(
        point_list,
        key=lambda (x, y): 
            sqrt((x - lbx) ** 2 + (y - lby) ** 2)
        )

    return min(
        ifilter(
            lambda pth:
                pth[0] == first_point,
            permutations(point_list)),
        key=lsum,
        )

def unicursal(point_list):
    '''
    point_list : [[0,0], [1,2], [3,4]...]
    '''
    return min(
        permutations(point_list),
        key=lsum,
        )

def solve_by_mst(mst, prim_point=None):
    if prim_point:
        pass
    else:
        pass
    return []


if __name__ == '__main__':

    print 'permutations for 9 random points path:'
    pl = gen_random_points(100, 100, 9)
    print tuple(pl)
   
    print 'unicursal_from_lb:' 
    print unicursal_from_lb(pl, (0, 0))

    print 'unicursal:' 
    print unicursal(pl)
