<?php

namespace App\DataFixtures;

use App\Factory\CurrencyFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product(); // To create an object without factory
        // $manager->persist($product); // Persisting the fixture without factory

//        UserFactory::createOne([ // Main admin
//            'email' => 'admin@admin.com',
//            'firstName' => 'Dominik',
//            'lastName' => 'Mach',
//            'plainPassword' => 'admin',
//            'avatar' => 'mach.png',
//            'roles' => ['ROLE_ADMIN'],
//        ]);
//        UserFactory::createMany(5);
        CurrencyFactory::createMany(5);

//        CurrencyFactory::createOne([
//            'symbol' => 'Kč',
//            'iso' => 'CZK',
//            'name' => sprintf('Měna %s', 'CZK'),
//        ]);
//
//        CurrencyFactory::createOne([
//            'symbol' => '€',
//            'iso' => 'EUR',
//            'name' => sprintf('Měna %s', 'EUR'),
//        ]);

        $manager->flush(); // Flushes the database via Doctrine
    }
}