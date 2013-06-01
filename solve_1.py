# coding: utf-8

from math import sqrt

from solve_helper import gen_random_points, path_permutations


def lsum(l):
    return reduce(lambda (lsm, (a, b)), (c, d):
        (lsm + sqrt((a - c)**2 + (b - d)**2), (c, d)),
        l,
        (0, (0, 0)))[0]


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
    '''
    return min(
        path_permutations(point_list),
        key=lsum,
        )


if __name__ == '__main__':

    pl = gen_random_points(100, 100, 9)

    print pl
   
    print 'solve_1st:' 
    print solve_1st(pl, (0, 0))

    print 'solve_2nd:' 
    print solve_2nd(pl)
