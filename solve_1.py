# coding: utf-8

from math import sqrt

from solve_helper import gen_random_points, path_permutations


def lsum(l):
    return reduce(lambda (lsm, (a, b)), (c, d):
        (lsm + sqrt((a - c)**2 + (b - d)**2), (c, d)),
        l,
        (0, (0, 0)))[0]


def cmp_lsum(a, b):
    return cmp(lsum(a), lsum(b))


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
    return (new_list_head,) + sorted(
        path_permutations(point_list),
        cmp=cmp_lsum,
        )[0]


if __name__ == '__main__':

    pl = path_permutations(gen_random_points(100, 100, 5))

    spl = sorted(pl, cmp=cmp_lsum)

    print pl
    print 'sorted:' 
    print spl[0]
   
    print 'solve_1st:' 
    print solve_1st(list(spl[0]), (0, 0))
