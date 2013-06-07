# coding: utf-8

from math import sqrt, e

from itertools import ifilter
from itertools import permutations
from random import randrange, random, randint, shuffle

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


def solve_by_random_guess(point_list, times=1000):
    best_path = point_list
    best_cost = lsum(point_list)

    for i in xrange(times):
        new_path = best_path[:]
        shuffle(new_path)
        new_cost = lsum(new_path)
        
        if new_cost < best_cost:
            best_path = new_path
            best_cost = new_cost

    return best_path
    

def solve_by_annealing(point_list, T=10000, cool=0.95, step=1, freezed=0.1):
    '''
    P = e ** (- (nv - ov) / T)
    costf = lsum
    '''

    shuffle(point_list)

    best_path = point_list
    best_cost = lsum(best_path)

    new_path = None
    new_cost = None

    def remold():
        new_path = best_path[:]
        idx = randrange(0, len(new_path))
        offset = randint(-step, step)
        nidx = idx + offset
        if nidx < 0:
            nidx = 0
        if nidx >= len(new_path):
            nidx = len(new_path) - 1

        new_path[idx], new_path[nidx] = new_path[nidx], new_path[idx] 
        return new_path

    def P():
        return (e ** (- (new_cost - best_cost) / T))

    while freezed < T:
        new_path = remold()
        new_cost = lsum(new_path)
        #print new_cost, best_cost, T
        if new_cost < best_cost or random() < P():  #fixme
            best_path = new_path
            best_cost = new_cost
        else:
            pass
        T *= cool

    return best_path


def solve_by_mst(mst, prim_point=None):
    if prim_point:
        pass
    else:
        pass
    return []


if __name__ == '__main__':

    n = 90
    print 'permutations for %d random points path:' % n
    pl = gen_random_points(100, 100, n)
    print tuple(pl)
    print
    print '%.3f' % lsum(pl)
    print
   
    if len(pl) < 10:
        print 'unicursal:' 
        ul = unicursal(pl)
        print '%.3f' % lsum(ul)
        print

    print 'random optimize:' 
    ul = solve_by_random_guess(pl)
    print '%.3f' % lsum(ul)
    print

    print 'anneal:' 
    ul = solve_by_annealing(pl, T=1000000, cool=0.99, step=3)
    print '%.3f' % lsum(ul)
    print
