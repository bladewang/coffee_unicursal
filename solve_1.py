# coding: utf-8

from itertools import permutations
from random import randrange
from math import sqrt


def lsum(l):
    return reduce(lambda (lsm, (a, b)), (c, d):
        (lsm + sqrt((a - c)**2 + (b - d)**2), (c, d)),
        l,
        (0, (0, 0)))[0]


def cmp_lsum(a, b):
    return cmp(lsum(a), lsum(b))


if __name__ == '__main__':

    pl = list(permutations([
        (randrange(100), randrange(100))
        for x in xrange(4)
        ]))

    spl = sorted(pl, cmp=cmp_lsum)

    print pl
    print 'sorted:' 
    print spl[0]

