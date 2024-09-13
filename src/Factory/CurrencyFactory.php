<?php

namespace App\Factory;

use App\Entity\Currency;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<Currency>
 */
final class CurrencyFactory extends PersistentProxyObjectFactory
{
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
        return Currency::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {
        return [
            'iso' => self::faker()->countryISOAlpha3(),
            'name' => self::faker()->currencyCode(),
            'decimals' => self::faker()->numberBetween(0, 2),
            'symbolPosition' => 'right',
            'decimalSeparator' => ',',
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Currency $currency): void {})
        ;
    }
}
