<?php

namespace App\Factory;

use App\Entity\Team;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<Team>
 */
final class TeamFactory extends PersistentProxyObjectFactory
{
    const ADMIN = 'Ayda developer';
    const TEAMS = [
        'CEO',
        'FEO',
        'HR manager',
        'Team leader',
        'Marketing specialist',
        'Programmer',
        'Copywriter',
        'Accountant',
        'Janitor',
        'Salesperson',
    ];

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
    }

    public static function class(): string
    {
        return Team::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {
        return [
            'name' => self::TEAMS[self::faker()->numberBetween(0, 9)],
            'color' => self::faker()->hexColor(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Team $team): void {})
        ;
    }
}
