<?php

namespace App\Factory;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<User>
 */
final class UserFactory extends PersistentProxyObjectFactory
{
    /** @var UserPasswordHasherInterface $passwordHasher */
    private UserPasswordHasherInterface $passwordHasher;

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public static function class(): string
    {
        return User::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {
        return [
            'email' => self::faker()->email(),
            'firstName' => self::faker()->firstName(1), // 1 female / 0 male
            'lastName' => self::faker()->lastName(0), // 1 female / 0 male
            'plainPassword' => 'admin123',
            'createdAt' => self::faker()->dateTimeBetween('-7 months', '-10 days'),
            'updatedAt' => self::faker()->dateTimeBetween('-10 days', '-1 day'),
            'roles' => ["ROLE_USER"],
            'active' => true,
            'birthDate' => self::faker()->dateTimeBetween('-30 years', '-18 years'),
            'degree' => self::faker()->title(1),
            'description' => self::faker()->realTextBetween(60, 100),
            'monthlyHours' => 160,
            'holidayHours' => self::faker()->numberBetween(18, 32),
            'hourlyWage' => self::faker()->numberBetween(150, 340),
            'lang' => 'cz',
            'workSince' => self::faker()->dateTimeBetween('-4 years', '-3 months'),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            ->afterInstantiate(function(User $user): void {
                if ($user->getPlainPassword()) {
                    $user->setPassword(
                        $this->passwordHasher->hashPassword($user, $user->getPlainPassword())
                    );
                }
            })
        ;
    }
}
