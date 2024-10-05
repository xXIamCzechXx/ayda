<?php

namespace App\Controller;

use App\Controller\Parent\DefaultController;
use App\Entity\User;
use App\Service\UploadHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

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
class FileUploadController extends DefaultController
{
    #[Route('/file-upload/{folder}/{userId}', name: 'app_file_upload')]
    public function uploadFile(Request $request, UploadHelper $uploadHelper, EntityManagerInterface $em, $folder, $userId): JsonResponse
    {
        /** @var User $user */
        if (!$user = $em->getRepository(User::class)->findOneBy(['id' => $userId])) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        $uploadedFiles = $request->files->get('file');
        $uploadedFile = null;

        foreach ($uploadedFiles as $file) {
            if ($file instanceof UploadedFile) {
                $fileName = $uploadHelper->uploadImage($file, $folder, $user->getAvatar());
                $user->setAvatar($fileName);
                $uploadedFile = $fileName;
            }
        }

        if (!$uploadedFile) {
            return new JsonResponse(['error' => 'uploadedFile is not defined'], 500);
        }

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['path' => $uploadHelper->getPublicPath($folder, $uploadedFile)]);
    }
}
