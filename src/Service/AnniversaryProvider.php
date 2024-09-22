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
     * Retrieves user anniversaries within a specified date range from the current date.
     *
     * @param int $maxResults Maximum number of results to return.
     * @param int $range Number of days from today to consider for anniversaries.
     * @return array List of users with anniversaries within the given range.
     */
    public function getAnniversaries(int $maxResults, int $range): array
    {
        $today = new \DateTime();
        $endDate = (clone $today)->add(new \DateInterval("P{$range}D"));

        $repository = $this->em->getRepository(User::class);

        $query = $repository->createQueryBuilder('u')
            ->where('DATE_FORMAT(u.createdAt, \'%m-%d\') BETWEEN :start AND :end')
            ->setParameter('start', $today->format('m-d'))
            ->setParameter('end', $endDate->format('m-d'))
            ->setMaxResults($maxResults)
            ->getQuery();

        $users = $query->getResult();

        $anniversaries = [];
        foreach ($users as $user) {
            $years = $today->diff($user->getCreatedAt())->y;
            $anniversaries[] = ['user' => $user, 'years' => $years];
        }

        return $anniversaries;
    }
}