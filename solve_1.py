# coding: utf-8

from math import sqrt

from solve_helper import gen_random_points, path_permutations


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


def solve_1st(point_list, l_bottom):
    '''
    point_list : [[0,0], [1,2], [3,4]...]
    l_bottom: [0,480]
    '''
    lbx, lby = l_bottom

    new_list_head = min(
        point_list,
        key=lambda (x, y): 
            sqrt((x - lbx) ** 2 + (y - lby) ** 2)
        )
    point_list.remove(new_list_head)
    return (new_list_head,) + min(
        path_permutations(point_list),
        key=lsum,
        )

def solve_2nd(point_list):
    '''
    point_list : [[0,0], [1,2], [3,4]...]
    #FIXME:
        [[69, 201], [100, 317], [111, 341], [149, 467], [177, 426], [403, 223], [387, 88], [270, 98]]
        与MST的结果不一样啊。
    '''
    return min(
        path_permutations(point_list),
        key=lsum,
        )

def solve_by_mst(mst, prim_point=None):
    if prim_point:
        pass
    else:
        pass
    return []


if __name__ == '__main__':

    pl = gen_random_points(100, 100, 9)

    print pl
   
    print 'solve_1st:' 
    print solve_1st(pl, (0, 0))

    print 'solve_2nd:' 
    print solve_2nd(pl)
