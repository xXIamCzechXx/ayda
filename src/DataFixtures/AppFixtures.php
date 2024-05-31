<?php

namespace App\DataFixtures;

use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product(); // To create an object without factory
        // $manager->persist($product); // Persisting the fixture without factory

        UserFactory::createOne([ // Main admin
            'email' => 'admin@admin.com',
            'plainPassword' => 'admin',
            'roles' => ['ROLE_ADMIN'],
        ]);
        UserFactory::createMany(5);

        $manager->flush(); // Flushes the database via Doctrine
    }
}