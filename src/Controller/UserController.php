<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\PasswordType;
use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/account', name: 'app_account')]
    public function account(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em
    ): Response {
        /** @var User $user */
        $user = $this->getUser();

        $userForm = $this->createForm(UserType::class, $user);
        $userForm->handleRequest($request);

        $passwordForm = $this->createForm(PasswordType::class);
        $passwordForm->handleRequest($request);

        if ($userForm->isSubmitted() && $userForm->isValid()) {
            $em->persist($user);
            $em->flush();
            $this->addFlash('success', 'User details have been updated');
        }

        if ($passwordForm->isSubmitted() && $passwordForm->isValid()) {
            $data = $passwordForm->getData();

            if (!$passwordHasher->isPasswordValid($user, $data['currentPassword'])) {
                $passwordForm->get('currentPassword')->addError(new FormError('Current password is incorrect.'));
            } else {
                $user->setPassword(
                    $passwordHasher->hashPassword(
                        $user,
                        $data['newPassword']
                    )
                );

                $em->persist($user);
                $em->flush();
                $this->addFlash('success', 'Your password has been changed successfully.');

                return $this->redirectToRoute('app_account');
            }
        }

        $response = new Response(null, Response::HTTP_OK);

        if ($passwordForm->isSubmitted() && !$passwordForm->isValid()) {
            $response = new Response(null, Response::HTTP_UNPROCESSABLE_ENTITY);
            $this->addFlash('error', 'Změna hesla se nepovedla');
        }
        if ($userForm->isSubmitted() && !$userForm->isValid()) {
            $response = new Response(null, Response::HTTP_UNPROCESSABLE_ENTITY);
            $this->addFlash('error', 'Uživatele nebylo možné aktualizovat');
        }

        return $this->render('default/account.html.twig', [
            'form' => $userForm->createView(),
            'passwordForm' => $passwordForm->createView(),
        ], $response);
    }
}