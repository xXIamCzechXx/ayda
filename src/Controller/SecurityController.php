<?php

namespace App\Controller;

use App\Controller\Parent\DefaultController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * Author: Bc. Dominik Mach
 *
 * Copyright: (c) 2024 Bc. Dominik Mach. All rights reserved.
 *
 * This software is furnished under a license and may be used and copied
 * only in accordance with the terms of such license and with the inclusion
 * of the above copyright notice. This software or any other copies thereof
 * may not be provided or otherwise made available to any other person.
 */
class SecurityController extends DefaultController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
         if ($this->getUser()) {
             return $this->redirectToRoute('app_dashboard');
         }

        $error = $authenticationUtils->getLastAuthenticationError(); // Get the login error if there is one
        $lastUsername = $authenticationUtils->getLastUsername(); // Last username entered by the user

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on firewall.');
    }
}