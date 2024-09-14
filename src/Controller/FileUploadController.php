<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UploadHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Class FileUploadController
 * This class handles file uploads in the Symfony application.
 *
 * @package AppBundle\Controller
 */
class FileUploadController extends AbstractController
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
