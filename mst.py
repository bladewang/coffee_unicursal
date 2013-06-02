# coding: utf-8

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

    unions = {} # 在拼凑 mst 的过程中，保存各个联通分量。

    def union_find(point):
        for (union_id, points) in unions.items():
            if  (point in points):
                return union_id
            else:
                continue
        return point

    def is_connected(point1, point2):
        return union_find(point1) == union_find(point2)

    def update_union(p1, p2):
        uid_p1 = union_find(p1)
        uid_p2 = union_find(p2)
        if unions.get(uid_p1) and unions.get(uid_p2):
            unions[uid_p1].update(unions.pop(uid_p2))
        else:
            (union_id, new_point) = (uid_p1 in unions) and (uid_p1, p2) or (uid_p2, p1)
            unions.setdefault(union_id, set([union_id])).add(new_point)
    
    edge_list = edge_list[:]    # or mst() while clear argement edge_list after calculate.
    edge_list.sort(key=lambda (e, el): el)
    edge_list.reverse()
   
    mst = []
    
    while edge_list:
        (e, el) = edge_list.pop()
        (p1, p2) = e
        if is_connected(p1, p2):
            continue
        else:
            mst.append(e)
            update_union(p1, p2)

    return mst
