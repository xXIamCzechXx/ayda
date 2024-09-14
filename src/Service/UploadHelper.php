<?php

namespace App\Service;

use Gedmo\Sluggable\Util\Urlizer;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploadHelper
{
    /**
     * @var string
     */
    private string $uploadsPath;

    /**
     * @param string $uploadsPath
     */
    public function __construct(string $uploadsPath)
    {
        $this->uploadsPath = $uploadsPath;
    }

    /**
     * @param UploadedFile $uploadedFile
     * @param string $dir
     * @param null $oldFile
     * @return string
     */
    public function uploadImage(UploadedFile $uploadedFile, string $dir = 'others', $oldFile = null): string
    {
        $destination = $this->uploadsPath.'/'.$dir;
        $originalFileName = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $newFileName = Urlizer::urlize($originalFileName) . '.' . $uploadedFile->guessExtension();

        // Removes old records of images if set
        if ($oldFile && $oldFile !== '' && file_exists($destination.'/'.$oldFile)) {
            unlink($destination.'/'.$oldFile);
        }

        // Ochrana proti zhroucení FTP - nepřepisuje obrázky, jenom updatuje název v db
        if (file_exists($destination.'/'.$newFileName)) {
            return $newFileName;
        }

        $uploadedFile->move($destination, $newFileName);

        return $newFileName;
    }

    /**
     * @param string $folder
     * @param string $path
     * @return string
     */
    public function getPublicPath(string $folder, string $path): string
    {
        return sprintf('uploads/%s/%s', $folder, $path);
    }
}