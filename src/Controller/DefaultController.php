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

#[IsGranted("ROLE_USER")]
class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_default')]
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

    #[Route('/dashboard', name: 'app_dashboard')]
    public function dashboard(): Response
    {
        return $this->render('default/kanban.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    #[Route('/statistics', name: 'app_statistics')]
    public function statistics(): Response
    {
        return $this->render('default/statistics.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }
}