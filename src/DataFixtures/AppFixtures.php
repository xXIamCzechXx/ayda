<?php

namespace App\DataFixtures;

use App\Entity\Currency;
use App\Factory\CountryFactory;
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

        $czkCurrency = CurrencyFactory::createOne([
            'symbol' => 'Kč',
            'decimals' => 0,
            'iso' => 'CZK',
            'name' => sprintf('Měna %s', 'CZK'),
        ]);

        $eurCurrency = CurrencyFactory::createOne([
            'symbol' => '€',
            'symbolPosition' => 'left',
            'decimals' => 2,
            'decimalSeparator' => '.',
            'iso' => 'EUR',
            'name' => sprintf('Měna %s', 'EUR'),
        ]);

        UserFactory::createOne([ // Main admin
            'email' => 'admin@admin.com',
            'firstName' => 'Dominik',
            'lastName' => 'Mach',
            'plainPassword' => 'admin',
            'avatar' => 'mach.png',
            'roles' => ['ROLE_ADMIN'],
            'currency' => $czkCurrency,
        ]);
        UserFactory::createMany(5, [
            'currency' => $czkCurrency,
        ]);

        CountryFactory::createOne([
            'currency' => $czkCurrency,
            'iso' => 'CZ',
            'name' => 'Česká Republika',
        ]);

        CountryFactory::createOne([
            'currency' => $eurCurrency,
            'iso' => 'SVK',
            'name' => 'Slovenská Republika',
        ]);

        $manager->flush(); // Flushes the database via Doctrine
    }
}