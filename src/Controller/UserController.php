<?php

namespace App\Controller;

use App\Controller\Parent\DefaultController;
use App\Entity\User;
use App\Enum\AppDesignEnum;
use App\Form\PasswordType;
use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

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
#[IsGranted("ROLE_USER")]
class UserController extends DefaultController
{
    #[Route('/users', name: 'app_users')]
    public function users(EntityManagerInterface $em): Response
    {
        $users = $em->getRepository(User::class)->findAll();

        return $this->render('default/users.html.twig', [
            'users' => $users,
        ]);
    }

    #[Route('/account/{id}', name: 'app_account')]
    public function account(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em, int $id): Response {
        /** @var User $user */
        $actualUser = $this->getUser();
        $user = $id == $actualUser->getId() ? $actualUser : $em->getRepository(User::class)->findOneBy(['id' => $id]);

        $userForm = $this->createForm(UserType::class, $user);
        $passwordForm = $this->createForm(PasswordType::class);

        $userForm->handleRequest($request);
        $passwordForm->handleRequest($request);

        if ($userForm->isSubmitted() && $userForm->isValid()) {
            $this->updateForm($em, $user, 'User details have been updated');
            return $this->redirectToRoute('app_account', ['id' => $user->getId()]);
        }

        if ($passwordForm->isSubmitted() && $passwordForm->isValid()) {
            $data = $passwordForm->getData();

            if (!$passwordHasher->isPasswordValid($user, $data['currentPassword'])) {
                $passwordForm->get('currentPassword')->addError(new FormError('Current password is incorrect.'));
            } else {
                $user->setPassword(
                    $passwordHasher->hashPassword($user, $data['newPassword'])
                );

                $this->updateForm($em, $user, 'Your password has been changed successfully');
            }
            return $this->redirectToRoute('app_account', ['id' => $user->getId()]);
        }

        $response = new Response(null, Response::HTTP_OK);
        $response = $this->handleInvalidForm($passwordForm, $response, 'Unable to change password');
        $response = $this->handleInvalidForm($userForm, $response, 'Unable to change user details');

        return $this->render('default/account.html.twig', [
            'user' => $user,
            'userForm' => $userForm->createView(),
            'passwordForm' => $passwordForm->createView(),
        ], $response);
    }

    #[Route('/user/mode', name: 'ajax_user_mode')]
    public function updateConfiguration(Request $request, EntityManagerInterface $em, Security $security): Response
    {
        if (!$request->isXmlHttpRequest()) {
            return $this->json(['success' => false], Response::HTTP_NOT_FOUND);
        }

        if (!$user = $security->getUser()) {
            return $this->json(['success' => false], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        if (!isset($data['value']) || !isset($data['mode'])) {
            return $this->json(['success' => false, 'message' => 'Invalid mode or value'], Response::HTTP_BAD_REQUEST);
        }

        $mode = $data['mode'];
        $value = match ($data['value']) {
            true, false => $data['value'], // For sidebar spread mode
            'light' => AppDesignEnum::LIGHT, // For dark/light mode
            'dark' => AppDesignEnum::DARK, // For dark/light mode
            'auto' => AppDesignEnum::AUTO, // For dark/light mode
            default => null, // Default for undefined value
        };

        if ($value === null) {
            return $this->json(['success' => false]);
        }

        $user->$mode($value);
        $em->persist($user);
        $em->flush();

        return $this->json(['success' => true]);
    }
}