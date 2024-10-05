<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class NewRecruitsProvider
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * Get the first 3 users whose's started working most recently
     *
     * @return User[]
     * @param int $limit
     */
    public function getNewRecruits(int $limit = 3): array
    {
        $users = $this->em->getRepository(User::class)->createQueryBuilder('u')
            ->orderBy('u.workSince', 'DESC')
            ->setMaxResults($limit);

        return $users->getQuery()->getResult();
    }
}