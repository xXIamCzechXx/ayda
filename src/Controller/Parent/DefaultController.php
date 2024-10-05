<?php

namespace App\Controller\Parent;

use App\Entity\User;
use App\Form\PasswordType;
use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;

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
class DefaultController extends AbstractController
{
    /**
     * This feature is required mainly because of TurboFrames, that need HTTP_UNPROCESSABLE_ENTITY status code as Response when invalid
     * @param $form
     * @param Response $response
     * @param string $message
     * @return Response
     */
    protected function handleInvalidForm($form, Response $response, string $message = 'undefined'): Response
    {
        if ($form->isSubmitted() && !$form->isValid()) {
            $response = new Response(null, Response::HTTP_UNPROCESSABLE_ENTITY);
            $this->addFlash('error', $message);
        }

        return $response;
    }

    /**
     * @param EntityManagerInterface $em
     * @param $entity
     * @param string $message
     * @return void
     */
    protected function updateForm(EntityManagerInterface $em, $entity, string $message): void
    {
        $em->persist($entity);
        $em->flush();
        $this->addFlash('success', $message);
    }
}