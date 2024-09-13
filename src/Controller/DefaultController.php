<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

/**
 * DefaultController.php
 *
 * Author: Bc. Dominik Mach
 *
 * Copyright: (c) 2024 Bc. Dominik Mach. All rights reserved.
 *
 * This software is furnished under a license and may be used and copied
 * only in accordance with the terms of such license and with the inclusion
 * of the above copyright notice. This software or any other copies thereof
 * may not be provided or otherwise made available to any other person.
 */
#[IsGranted("ROLE_USER")]
class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_dashboard')]
    public function index(EntityManagerInterface $em, CacheInterface $cache, HttpClientInterface $httpClient): Response
    {
        $user = $em->getRepository(User::class)->findOneBy(['id' => 2]);
        $mixes = $cache->get('mixes_data', function() use ($httpClient) {
            $response = $httpClient->request('GET', 'https://raw.githubusercontent.com/SymfonyCasts/vinyl-mixes/main/mixes.json');
            return $response->toArray();
        });
        return $this->render('default/dashboard.html.twig', [
            'controller_name' => 'DefaultController',
            'mixes' => $mixes,
            'user' => $user,
        ]);
    }

    #[Route('/dashboard', name: 'app_kanban')]
    public function kanban(): Response
    {
        return $this->render('default/kanban.html.twig', [
            'controller_name' => 'Kanban',
        ]);
    }

    #[Route('/statistics', name: 'app_statistics')]
    public function statistics(): Response
    {
        return $this->render('default/statistics.html.twig', [
            'controller_name' => 'Statistics',
        ]);
    }

    #[Route('/overview', name: 'app_overview')]
    public function overview(): Response
    {
        return $this->render('default/overview.html.twig', [
            'controller_name' => 'Overview',
        ]);
    }
}