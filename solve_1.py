# coding: utf-8

from math import sqrt


def lsum(l):
    return reduce(lambda (lsm, (a, b)), (c, d):
        (lsm + sqrt((a - c)**2 + (b - d)**2), (c, d)),
        l,
        (0, (0, 0)))[0]


def cmp_lsum(a, b):
    return cmp(lsum(a), lsum(b))


if __name__ == '__main__':

    from solve_helper import gen_random_points, path_permutations

    pl = path_permutations(gen_random_points(100, 100, 4))

    spl = sorted(pl, cmp=cmp_lsum)

    print pl
    print 'sorted:' 
    print spl[0]

