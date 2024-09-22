<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class AnniversaryProvider
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * Get the first 5 users whose work anniversaries are coming up next.
     *
     * @return User[]
     * @param int $limit
     */
    public function getUpcomingAnniversaries(int $limit = 3): array
    {
        $today = new \DateTime();
        $todayString = $today->format('m-d');

        $users = $this->em->getRepository(User::class)->createQueryBuilder('u')
            ->orderBy("CASE 
                WHEN DATE_FORMAT(u.workSince, '%m-%d') >= :today
                THEN DATE_FORMAT(u.workSince, '%m-%d')
                ELSE CONCAT('12-', DATE_FORMAT(u.workSince, '%d')) 
                END", 'ASC'
            )
            ->setParameter('today', $todayString)
            ->setMaxResults($limit);

        return $users->getQuery()->getResult();
    }
}