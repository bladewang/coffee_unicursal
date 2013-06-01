
from math import sqrt
from itertools import combinations


def distance_2d((x1, y1), (x2, y2)):
    return sqrt(
        (x1-x2)**2 + (y1-y2)**2
        )


def fullmap_of_pointslist(point_list, edge_length=distance_2d):
    '''
    >>> fullmap_of_pointslist([(0,0), (1,1), (2,2)])
    [(((0, 0), (1, 1)), 1.4142135623730951), (((0, 0), (2, 2)), 2.8284271247461903), (((0, 0), (3, 3)), 4.242640687119285), (((1, 1), (2, 2)), 1.4142135623730951), (((1, 1), (3, 3)), 2.8284271247461903), (((2, 2), (3, 3)), 1.4142135623730951)]
    '''

    return [
        ((p1, p2), edge_length(p1, p2))
        for (p1, p2) in combinations(point_list, 2)
        ]


def mst(edge_list):
    '''
    calculate Min Spanning Tree by kruskal algorithm.
    edge_list: [
        (((0,0), (1,1)), sqrt(2)),
        (((1,1), (2,2)), sqrt(2)),
        ...
        ]
    '''
    edge_list = edge_list[:]    # or mst() while clear argement edge_list after calculate.
    edge_list.sort(key=lambda (e, el): el)
    edge_list.reverse()
   
    mst = []
    
    p_in_mst = set()

    while edge_list:
        (e, el) = edge_list.pop()
        (p1, p2) = e
        if all((
            p1 in p_in_mst,
            p2 in p_in_mst,
        )):
            continue
        else:
            mst.append(e)
            p_in_mst.update(e)

    return mst
